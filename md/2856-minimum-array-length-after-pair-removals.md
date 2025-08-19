### Leetcode 2856 (Medium): Minimum Array Length After Pair Removals [Practice](https://leetcode.com/problems/minimum-array-length-after-pair-removals)

### Description  
Given a **sorted array** of integers, you can **repeatedly remove two elements (at indices i and j, with i < j) if nums[i] < nums[j]**. After each such operation (removal of a valid pair), the array length decreases by 2.  
Your task is to return the **minimum length of the array after performing as many valid removal operations as possible**.  
Effectively: Pair off as many smaller elements with strictly greater elements as possible, removing both each time, and return the number of elements left when no such move remains.

### Examples  

**Example 1:**  
Input: `nums = [1,3,4,9]`  
Output: `0`  
*Explanation: Pair 1 with 3, and 4 with 9. The array becomes empty (length 0).*

**Example 2:**  
Input: `nums = [1,2,2,2,3,3]`  
Output: `2`  
*Explanation:  
Pair 1 with 2 → [2,2,3,3].  
Pair 2 with 3 → [2,3].  
No more pairings possible as 2 ≱ 3.  
2 elements remain.*

**Example 3:**  
Input: `nums = [2,2,2,4]`  
Output: `2`  
*Explanation:  
Pair 2 with 4 → [2,2].  
No further pairs can be made since both remaining are equal.  
2 elements remain.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible pairs (i, j) with i < j, nums[i] < nums[j], and recursively remove them.  
  - Exponential time: Not feasible.
- **Observation:**  
  - Since the array is sorted, always pair the *smallest* remaining element with the *largest* available *distinct* element.  
  - Each time, to maximize removals, you should pair the largest frequency element with others.  
  - However, if some number appears k times and ⌊n/2⌋ < max frequency, some copies of it cannot be paired.
- **Optimal:**  
  - Compute the frequency of each unique element.  
  - Let n = len(nums), max_freq = maximum frequency among elements.  
  - The answer is **max(max_freq × 2 - n, n % 2)**, but, more simply:  
    - If max_freq ≤ ⌊n/2⌋: All elements can be paired, so answer is n % 2 (0 if even n, 1 if odd n).
    - Otherwise: Unpaired elements = max_freq - (n - max_freq); final length = 2 × max_freq - n.
- **Quickly, the most general formula:**  
  - answer = max(2 × max_freq - n, n % 2)
- **Implementation details:**  
  - Use a Counter to get frequencies.  
  - Calculate as above.
- **Trade-offs:**  
  - No need for O(n²) search, only need O(n) scan for counts.

### Corner cases to consider  
- Array is empty (n = 0).  
- All elements are identical.  
- Array has only one element.  
- Already paired (all elements unique, even length).  
- Odd-length arrays.  
- Large max frequency compared to rest.

### Solution

```python
def minLengthAfterRemovals(nums):
    # Count frequency of each element
    count = {}
    max_freq = 0
    n = len(nums)
    
    for num in nums:
        count[num] = count.get(num, 0) + 1
        if count[num] > max_freq:
            max_freq = count[num]
            
    # If the most frequent number appears more than half the time,
    # they can't all be paired.
    if max_freq > n // 2:
        return 2 * max_freq - n
    else:
        # Else, all can be paired, maybe leaving one if n is odd.
        return n % 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we only need one pass to count frequencies.
- **Space Complexity:** O(n), for storing the count of each unique element in the input array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is not sorted?
  *Hint: Would sorting affect your solution? How would you handle duplicates?*

- Can you output the actual pairs removed, not just the length?
  *Hint: What tracking structure would you need?*

- How would you solve if 'nums[i] ≤ nums[j]' (not strictly less) is allowed?
  *Hint: How does handling of equal elements change?*

### Summary
This approach uses the **greedy pairing** pattern: always try to pair most frequent elements with distinct others. It leverages counting and math to avoid unnecessary brute-force search or simulation.  
This pattern is common in problems involving pairing, grouping, and matching in a sorted or partially sorted list, especially where the counts/frequencies heavily constrain what can be done.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Binary Search(#binary-search), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Find the Maximum Number of Marked Indices(find-the-maximum-number-of-marked-indices) (Medium)