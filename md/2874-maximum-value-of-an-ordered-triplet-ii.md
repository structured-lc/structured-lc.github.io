### Leetcode 2874 (Medium): Maximum Value of an Ordered Triplet II [Practice](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii)

### Description  
Given an array `nums`, find the **maximum value** over all triplets of indices `(i, j, k)` such that `0 ≤ i < j < k < n` (where `n` is the length of `nums`).  
The value of a triplet is defined as:  
  **(nums[i] – nums[j]) × nums[k]**  
Return the largest value from any valid triplet. If all possible triplets result in a negative value, return `0`.  
Choose i, j, k so that the calculated value is maximized.

### Examples  

**Example 1:**  
Input: `[12,6,1,2,7]`  
Output: `77`  
*Explanation: The best triplet is (0,2,4): (12–1)×7 = 11×7 = 77.*

**Example 2:**  
Input: `[1,10,3,4,19]`  
Output: `133`  
*Explanation: The best triplet is (1,2,4): (10–3)×19 = 7×19 = 133.*

**Example 3:**  
Input: `[1,2,3]`  
Output: `0`  
*Explanation: There's only one triplet (0,1,2): (1–2)×3 = (–1)×3 = –3, which is negative. So return 0.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force: For every triplet (i, j, k) with 0 ≤ i < j < k < n, compute (nums[i] – nums[j]) × nums[k] and track the max.  
- This is O(n³), which is way too slow for n up to 10⁵.

Let's analyze the formula: For each j (the middle element),  
- nums[i] should be maximized for i < j (so the difference is large)
- nums[k] should be maximized for k > j (since we multiply by it)
So, for each j in 1..n–2, we want:
- the max value of nums[i] for i < j (call this max_left[j])
- the max value of nums[k] for k > j (call this max_right[j])
Then, for each j:
  (max_left[j] – nums[j]) × max_right[j]
Track the overall maximum—as a negative value is possible, but only positive values count. If all possible values are negative, return 0.

This approach is O(n):  
- Precompute max_left and max_right in O(n)
- One loop for the answer

Trade-offs:  
- O(n) time and space for the helper arrays (acceptable given constraints).

### Corner cases to consider  
- Array of length exactly 3 (just one triplet, possibly negative)
- All elements the same
- Strictly increasing/decreasing arrays
- Triplets that result in negative/zero values only
- Large numbers (for overflow issues, if relevant)
- Input with min/max bounds

### Solution

```python
def maxTripletValue(nums):
    n = len(nums)
    # Precompute max_left: max value to left of each index (not including current)
    max_left = [0] * n
    current_max = nums[0]
    for j in range(1, n):
        max_left[j] = current_max
        current_max = max(current_max, nums[j])
    
    # Precompute max_right: max value to right of each index (not including current)
    max_right = [0] * n
    current_max = nums[-1]
    for j in range(n - 2, -1, -1):
        max_right[j] = current_max
        current_max = max(current_max, nums[j])

    max_value = 0
    # Try all possible centers
    for j in range(1, n - 1):
        val = (max_left[j] - nums[j]) * max_right[j]
        if val > max_value:
            max_value = val
    return max_value
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
 Precomputing `max_left` and `max_right` each takes O(n), and scanning for the result is another O(n).

- **Space Complexity:** O(n)  
 The `max_left` and `max_right` arrays each take O(n) space. There's no extra recursion or large stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if returning the triplet indices is needed, not just the max value?  
  *Hint: Track the indices along with the values in the `max_left` and `max_right` arrays.*

- How would you solve this if space is at a premium?  
  *Hint: Can you process in-place or with rolling variables if you only need the value at each j?*

- How to handle signed or negative numbers in the array?  
  *Hint: Be careful with maximizing (nums[i] – nums[j]) × nums[k] when negative values are possible; might need min as well as max.*

### Summary
This problem demonstrates a classic **preprocessing for range maximums** pattern: precompute max values to the left and right of each position for efficient queries. The sliding window or preprocessing pattern is common in range maximum/minimum, stock buy/sell, and subarray problems. By reformulating and optimizing brute-force loops, we achieve efficiency suitable for large inputs.


### Flashcard
For each j in 1..n–2, track max to the left and right; compute (max_left[j] – nums[j]) × max_right[j] and return the maximum.

### Tags
Array(#array)

### Similar Problems
- Trapping Rain Water(trapping-rain-water) (Hard)
- Sum of Beauty in the Array(sum-of-beauty-in-the-array) (Medium)
- Minimum Sum of Mountain Triplets II(minimum-sum-of-mountain-triplets-ii) (Medium)