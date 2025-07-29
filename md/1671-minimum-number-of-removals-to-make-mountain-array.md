### Leetcode 1671 (Hard): Minimum Number of Removals to Make Mountain Array [Practice](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array)

### Description  
Given an array `nums`, return the minimum number of elements to remove to make it a mountain array. A **mountain array** satisfies:
- Length ≥ 3
- There exists some 0 < i < n-1 such that:
  - `nums < ... < nums[i] > ... > nums[n-1]`
  - In other words: strictly increasing to a peak, then strictly decreasing.

### Examples  

**Example 1:**  
Input: `nums = [2,1,1,5,6,2,3,1]`  
Output: `3`  
*Explanation: Remove nums = 2, nums[1] = 1, nums = 3. Result: [1,5,6,2,1], which is a mountain: 1 < 5 < 6 > 2 > 1.*

**Example 2:**  
Input: `nums = [2,2,1,1,3,1]`  
Output: `2`  
*Explanation: Remove nums=2 and nums[2]=1 for [2,1,3,1]. Which is not a valid mountain, so remove 2 and 2 for [1,3,1].*

**Example 3:**  
Input: `nums = [1,2,3,4,4,3,2,1]`  
Output: `1`  
*Explanation: Remove any one of the 4s in the middle for a valid mountain.*


### Thought Process (as if you’re the interviewee)  
- To form a mountain at index `i`, need:
  - A strictly increasing sequence from start to `i`
  - A strictly decreasing sequence from `i` to end
  - Each must have ≥ 1 element (i.e., mountain must have both sides, can't peak at start or end)
- Key: For each index `i`, compute:
  - `inc[i]`: length of longest strictly increasing subsequence ending at i
  - `dec[i]`: length of longest strictly decreasing subsequence starting at i
- For each i, if both inc[i] > 1 and dec[i] > 1, the mountain can peak at i; total mountain length = inc[i] + dec[i] - 1.
- Minimum removal = n - (max mountain length found, over all i).
- Use DP for LIS and LDS (O(n²)), but can do in O(n log n) per side with binary search, though O(n²) is sufficient for n ≤ 1000.


### Corner cases to consider  
- Array length < 3 (impossible, must remove all or nothing)
- Plateaus: repeated numbers; must be strictly increasing/decreasing
- Mountain at edge (invalid; must have at least one element before and after the peak)


### Solution

```python
def minimumMountainRemovals(nums):
    n = len(nums)
    # Compute LIS ending at each i
    inc = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i] and inc[j] + 1 > inc[i]:
                inc[i] = inc[j] + 1
    # Compute LDS starting at each i
    dec = [1] * n
    for i in range(n-1, -1, -1):
        for j in range(n-1, i, -1):
            if nums[j] < nums[i] and dec[j] + 1 > dec[i]:
                dec[i] = dec[j] + 1
    result = n
    for i in range(1, n-1):
        if inc[i] > 1 and dec[i] > 1:
            mountain_len = inc[i] + dec[i] - 1
            result = min(result, n - mountain_len)
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²) for DP solution (acceptable for n ≤ 1000); O(n log n) possible with patience sorting/binary search.
- **Space Complexity:** O(n), two arrays for DP.


### Potential follow-up questions (as if you’re the interviewer)  
- Can you speed up your solution to O(n log n)?
  *Hint: Use LIS/LDS optimized with binary search.*

- How do you modify the solution if some removals are penalized differently (costed)?
  *Hint: Consider weighted LIS/LDS.*

- Can you return the indices of the elements to remove for the minimal removal?
  *Hint: Track DP backtracking pointers for reconstruction.*

### Summary
This is a dynamic programming and two-pass LIS/LDS problem—commonly tested. The bipartite DP pattern (prefix and suffix DPs) is broadly applicable: for unimodal arrays, valley/peak questions, and palindromic sequence questions.