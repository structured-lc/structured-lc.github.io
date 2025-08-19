### Leetcode 2970 (Easy): Count the Number of Incremovable Subarrays I [Practice](https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i)

### Description  
Given an array of positive integers `nums`, count the number of subarrays such that if you remove that subarray (from some starting index `l` to some ending index `r`), the remaining elements of `nums` form a strictly increasing sequence.  
A subarray is a contiguous section of the original array. The array after removal merges the prefix `[0, l)` and suffix `(r, n-1]` together. The problem asks: how many (l, r) pairs (with 0 ≤ l ≤ r < n) lead to a strictly increasing result after such a removal?

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`  
Output: `10`  
*Explanation: Every possible subarray removal results in a strictly increasing array, since the input is already strictly increasing. There are n × (n+1) / 2 = 4 × 5 / 2 = 10 subarrays in total.*

**Example 2:**  
Input: `nums = [6,5,7,8]`  
Output: `7`  
*Explanation: There are 7 subarrays whose removal keeps the rest strictly increasing. Examples include removing , [5], , , [5,7], [5,7,8], and [6,5]. Removing [5] leaves [6,7,8], which is strictly increasing; removing [5,7] leaves [6,8], which is increasing, and so on.*

**Example 3:**  
Input: `nums = [8,7,6,6]`  
Output: `3`  
*Explanation: Only 3 subarrays are valid for removal: , , . Any other removal does not leave the rest strictly increasing.*

### Thought Process (as if you’re the interviewee)  
Let me first clarify the problem by restating:
- I need to find **how many subarrays I can remove such that the array left is strictly increasing**.  
- Subarray is determined by start and end indices (l, r), and removed completely.
- After removal, the rest is the original left and right segments stitched together.  
- To check if the remaining array is strictly increasing, the critical join points are at the end of prefix (`nums[l-1]`) and start of suffix (`nums[r+1]`), provided those indices exist.

**Brute-force approach:**  
- For all possible (l, r) pairs, remove nums[l:r+1] and check if the concatenated prefix + suffix is strictly increasing. This is O(n³) since checking if an array is strictly increasing is O(n) and there are O(n²) subarray pairs.

**Optimizing:**  
- Precompute for each index if prefix [0..i] is strictly increasing (use array `is_inc_pre`).
- Similarly for suffix [i..n-1].
- Now iterate over all possible subarrays to check:  
  - Is prefix [0..l-1] strictly increasing?  
  - Is suffix [r+1..n-1] strictly increasing?  
  - If both true, check boundary: Does nums[l-1] < nums[r+1]? (if both indices exist).
- Since validating all (l, r) pairs is O(n²), this is good for n up to 200.

But the optimal solution uses a two-pointer technique:
- Find the longest strictly increasing prefix. If the entire array is strictly increasing, answer is n × (n+1) / 2.
- Otherwise, for each possible left endpoint (from 0 to prefixEnd) and each possible right endpoint (from n-1 down), count possible removals such that prefix is strictly increasing, suffix is strictly increasing, and join is valid.

The two-pointer approach takes advantage of the following:
- Step through possible removal windows, and shift left/right boundaries in O(n).  
- Code becomes O(n) in the best case.

### Corner cases to consider  
- All elements strictly increasing (full removal possible for every subarray).
- All elements equal or decreasing (almost nothing removable).
- Single element array (removal always possible).
- Array of length 2.
- The joining boundary at the ends (when removing at the start or end).
- Repeated elements (test strictness).

### Solution

```python
def incremovableSubarrayCount(nums):
    n = len(nums)
    
    # Find the longest increasing prefix
    left = 0
    while left + 1 < n and nums[left] < nums[left + 1]:
        left += 1
    # If the whole array is strictly increasing
    if left == n - 1:
        return n * (n + 1) // 2
    
    res = left + 2  # Subarrays that can be removed at the start

    # Try removing subarrays at the end
    right = n - 1
    for r in range(n - 1, 0, -1):
        # Move left as far left as possible such that join is increasing
        while left >= 0 and nums[left] >= nums[r]:
            left -= 1
        res += left + 2
        # If can't extend further left (prefix stops being strictly increasing)
        if r - 1 >= 0 and nums[r - 1] >= nums[r]:
            break
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) —  
  - One pass for the increasing prefix.
  - One reverse pass for the suffix, each time only moving the left pointer in total O(n) times.
- **Space Complexity:** O(1) —  
  - Only constant size scalars used, no extra storage besides input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the *actual subarrays* that can be removed, not just the count?  
  *Hint: Keep track of the indices where you found valid removals.*

- Suppose the array may contain negative numbers. Would your logic still work?  
  *Hint: Think about strict increasing with negatives and boundary conditions.*

- Can you extend this to “not strictly increasing” after removal?  
  *Hint: Modify your boundary checks to allow equal values as well.*

### Summary

This problem is an application of the two-pointer technique and precomputing prefixes/suffixes for checking array monotonicity.  
The pattern is often used wherever merging two parts of a sequence efficiently while preserving an invariant is needed (e.g., longest increasing/decreasing subsequence problems, sliding windows, etc.).  
Avoiding brute-force enumeration of subarrays is key to efficiency—even though subarray removal seems like O(n²), careful two-pointer reasoning unlocks the O(n) solution.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Enumeration(#enumeration)

### Similar Problems
- Shortest Subarray to be Removed to Make Array Sorted(shortest-subarray-to-be-removed-to-make-array-sorted) (Medium)
- Number of Subarrays That Match a Pattern I(number-of-subarrays-that-match-a-pattern-i) (Medium)