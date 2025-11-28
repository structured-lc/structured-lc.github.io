### Leetcode 3672 (Medium): Sum of Weighted Modes in Subarrays [Practice](https://leetcode.com/problems/sum-of-weighted-modes-in-subarrays)

### Description  
Given an array of integers, return the sum over all contiguous subarrays of the array, where for each subarray, you compute its mode (the most frequent element), multiply the mode's value by its frequency, and add this weighted mode for each subarray to the total sum.  
Essentially, for every subarray, find the mode (if multiple values tie for highest frequency, choose the smallest), multiply the mode's value × its frequency in the current subarray, and accumulate this across all subarrays.

### Examples  

**Example 1:**  
Input: `[1,2,2]`  
Output: `10`  
*Explanation:  
Subarrays: [1], [2], [2], [1,2], [2,2], [1,2,2]  
For each:  
[1]: mode 1 × 1 = 1  
[2]: mode 2 × 1 = 2  
[2]: mode 2 × 1 = 2  
[1,2]: modes are 1 & 2, both freq 1, pick min → 1 × 1 = 1  
[2,2]: mode 2 × 2 = 4  
[1,2,2]: mode 2 × 2 = 4  
Sum = 1+2+2+1+4+4 = 14*

**Example 2:**  
Input: `[3,3,1]`  
Output: `14`  
*Explanation:  
Subarrays: [3], [3], [1], [3,3], [3,1], [3,3,1]  
[3]: 3×1 = 3  
[3]: 3×1 = 3  
[1]: 1×1 = 1  
[3,3]: 3×2 = 6  
[3,1]: min of modes: both 1×1, so take 1 × 1 = 1  
[3,3,1]: 3×2 = 6  
Sum = 3+3+1+6+1+6 = 20*

**Example 3:**  
Input: `[2]`  
Output: `2`  
*Explanation:  
Single subarray [2]: mode 2 × 1 = 2*


### Thought Process (as if you’re the interviewee)  
First, consider brute-force:  
- Try all subarrays: There are n(n+1)/2 subarrays.  
- For each, determine mode and its frequency.  
- This would take O(n³) if we scan for mode in each subarray. Too slow for n up to 10⁴.

Optimization:  
- Need a faster way to compute mode as the window grows.  
- For each starting index, we can extend the end index, use a hash map to store counts, keep track of current mode and frequency.  
- When extending right, update only the frequency counts and adjust mode.  
- This gives O(n²) since updating mode can be done in O(1) if we store a list of numbers with max frequency as we go.

Final approach:  
- Use two loops, outer for start index i, inner for end index j ≥ i.  
- For each extension, update count of nums[j], and if that value ties or overtakes mode, update mode accordingly.
- Edge case: multiple modes, always pick smallest value.

Trade-offs: O(n²) but simple, practical for constraints where n ≤ 1000–2000. For n much larger, likely need segment tree or more advanced approach.

### Corner cases to consider  
- Empty array (should return 0).
- All same elements (mode is that element for all subarrays).
- No repeated elements (mode is just first element in each subarray).
- Multiple modes tie (pick the smallest numerically).
- Array with negatives, zeros.
- One element (output is that element × 1).

### Solution

```python
def sum_of_weighted_modes(nums):
    n = len(nums)
    total = 0
    for start in range(n):
        freq = {}
        mode_val = None
        mode_freq = 0
        # for tie-breaking when multiple modes, keep a set of candidates
        candidates = set()
        for end in range(start, n):
            num = nums[end]
            freq[num] = freq.get(num, 0) + 1
            if freq[num] > mode_freq:
                mode_freq = freq[num]
                mode_val = num
                candidates = {num}
            elif freq[num] == mode_freq:
                candidates.add(num)
                mode_val = min(candidates)
            # Add weighted mode for current subarray
            total += mode_val * mode_freq
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
    *For every possible subarray (O(n²)), we process mode update in O(1) on average (freq map, candidates set stays small).*
- **Space Complexity:** O(k)  
    *Here, k = number of unique elements in nums. We store frequency map for current window. Candidates set at most k.*

### Potential follow-up questions (as if you’re the interviewer)  

- How would you improve performance for much larger arrays?  
  *Hint: Consider data structures (e.g., segment tree, MaxHeap), or preprocessing ranges.*

- Can you compute the weighted mode for only certain subarrays, say those of fixed length k?  
  *Hint: Use a sliding window and maintain freq counts.*

- What if the mode is always unique (no ties)? Could you optimize further?  
  *Hint: Skip candidate set, update mode as soon as top frequency is reached.*

### Summary
This problem uses the **sliding window frequency counting** pattern — maintaining mode as subarrays grow.  
It focuses on efficiently updating frequency and tracking the mode (with tie-breaking).  
This pattern is common in problems with subarray/statistics, and similar logic is used in maximum subarray, longest repeating character, and range frequency queries.  
Could be adapted with advanced data structures (segment tree, heaps) for even faster solutions if constraints are tighter.


### Flashcard
For each starting index, extend right endpoint while maintaining frequency map; track mode and its frequency incrementally; O(n²) with optimized mode tracking.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window), Counting(#counting), Ordered Set(#ordered-set)

### Similar Problems
