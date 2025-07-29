### Leetcode 2831 (Medium): Find the Longest Equal Subarray [Practice](https://leetcode.com/problems/find-the-longest-equal-subarray)

### Description  
You are given a 0-indexed integer array `nums` and an integer `k`.  
A subarray is called **equal** if all of its elements are equal.  
You may delete at most `k` elements from the array, anywhere.  
Return the length of the **longest possible equal subarray** you can obtain, after deleting at most `k` elements.  
A subarray is a contiguous part of the array.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,3,1,3]`, `k = 3`  
Output: `3`  
Explanation: Optimal to delete indices 2 (`2`), 4 (`1`), and 0 (`1`). The result is `[3,3,3]` (indices 1, 3, 5).  
The longest equal subarray is of length 3. No longer is possible.

**Example 2:**  
Input: `nums = [1,1,2,2,1,1]`, `k = 2`  
Output: `4`  
Explanation: Delete indices 2 (`2`) and 3 (`2`). Now, `[1,1,1,1]` remains (indices 0,1,4,5).  
Longest equal subarray is length 4.

**Example 3:**  
Input: `nums = [1,2,3,4]`, `k = 0`  
Output: `1`  
Explanation: Cannot delete any elements (`k=0`). Any number alone is a subarray of length 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every possible subarray, check if it can be made equal by deleting at most `k` elements (count the most frequent number and see if the rest ≤ k).  
    - This is O(n³), not feasible for large arrays.

- **Optimize by fixing a value:**  
  For each possible value appearing in `nums`, collect all indices where it appears.  
  For indices list, use a sliding window on the positions:  
  - For every window [l, r], the number of elements you **keep** is `r - l + 1`,  
  - The number of elements you **delete** to make them contiguous is `indices[r] - indices[l] + 1 - (r - l + 1)`, which counts non-matching numbers between these positions.
  - We keep expanding right until number of deletions exceeds k, then slide left forward.
  - For each value, track the maximum window with deletions ≤ k.
  - Total time is O(n), since each index is processed once per value.

- **Why choose this?**
    - Efficient: O(n) overall.
    - Clean: Handles all values and their groups independently.
    - No need for advanced data structures — just sliding window and arrays.

### Corner cases to consider  
- Empty array (len=0) — should return 0.
- k=0 — can’t delete, so only pure groups count.
- All elements already equal — should return the length of nums.
- No repeated elements — answer should be 1 or less (unless deletions allowed).
- k very large — can delete all but the most frequent element's group.
- Array of length 1.

### Solution

```python
def longestEqualSubarray(nums, k):
    # Dictionary to track indices for each value
    from collections import defaultdict
    val_indices = defaultdict(list)
    for idx, num in enumerate(nums):
        val_indices[num].append(idx)
    
    max_len = 0

    # For each value, sliding window over indices where it appears
    for positions in val_indices.values():
        left = 0
        # Loop right pointer over this value's positions
        for right in range(len(positions)):
            # Number of non-value elements between left and right in the array
            # Between positions[left] and positions[right], total elements = positions[right] - positions[left] + 1
            # Kept elements = right - left + 1
            # Must delete = total - kept
            while (
                positions[right] - positions[left] + 1 - (right - left + 1) > k
            ):
                left += 1
            max_len = max(max_len, right - left + 1)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Explanation: Every index appears in only one group and its window is processed once—total work is O(n).
- **Space Complexity:** O(n).  
  Justification: Dictionaries and lists to store indices per value, at most O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we are allowed to make at most k changes (change value instead of delete)?
  *Hint: Think about replacing out-of-group numbers rather than removing them.*

- How to return the exact subarray (indices) rather than just the length?
  *Hint: Store the window bounds during max calculation.*

- What if nums is a stream and deletions must be performed online?
  *Hint: Need to design a data structure for frequency count and window management.*

### Summary
This problem uses the **sliding window** and **grouping by value** pattern to efficiently find the largest subarray of equal values after limited deletions. The same technique applies to problems like "longest substring with at most k replacements" and other frequency-within-window-style questions. The approach avoids brute-force over all subarrays by treating each value group independently and carefully counting needed deletions.