### Leetcode 1027 (Medium): Longest Arithmetic Subsequence [Practice](https://leetcode.com/problems/longest-arithmetic-subsequence)

### Description  
Given an array of integers `nums`, return the length of the **longest arithmetic subsequence** in `nums`.  
An **arithmetic subsequence** is a subsequence (not necessarily contiguous, but must retain original order) where the difference between every two consecutive elements is the same.  
For example, in `[3,6,9,12]`, `[3,9,12]` is also an arithmetic subsequence (with difference 6 between first and second, and 3 between second and third), but the *longest* involves all elements with difference 3 between each[1][2].

### Examples  

**Example 1:**  
Input: `nums = [3,6,9,12]`  
Output: `4`  
Explanation: The entire array is an arithmetic sequence, with difference 3 between each number.

**Example 2:**  
Input: `nums = [9,4,7,2,10]`  
Output: `3`  
Explanation: The longest arithmetic subsequence is `[4,7,10]` (difference 3 between each).

**Example 3:**  
Input: `nums = [20,1,15,3,10,5,8]`  
Output: `4`  
Explanation: The longest arithmetic subsequence is `[20,15,10,5]` (difference -5 between each).

### Thought Process (as if you’re the interviewee)  
My brute-force thought would be to generate all possible subsequences, check which are arithmetic, and take the longest. But this is extremely inefficient (exponential time), especially since `nums` can have up to 1000 elements.  

A more optimal way is to use **Dynamic Programming**:
- For each index `i`, I can keep a map (dictionary) that records, for every possible difference `diff`, the length of the longest arithmetic subsequence ending at `i` with that difference.
- For every prior index `j < i`, compute the difference `diff = nums[i] - nums[j]`.
    - If there's already a sequence ending at `j` with this `diff`, we can extend it by 1 (since `nums[j]`, `nums[i]` differ by `diff`).
    - Otherwise, we can start a new sequence of length 2 (`nums[j]`, `nums[i]`).
- At each iteration, update and remember the max length found[1][2][3].

This DP approach has time and space complexity of O(n²), which is acceptable for `n` up to 1000[3].  
Trade-off: Space could be a concern (O(n²)), but we need that to track all sequences for all possible differences.

### Corner cases to consider  
- Array has only two elements (minimum possible arithmetic subsequence is length 2).
- All numbers are the same (difference is 0).
- Array has increasing, decreasing, and mixed values.
- Large negative or positive differences.
- No arithmetic subsequence longer than 2.

### Solution

```python
def longestArithSeqLength(nums):
    n = len(nums)
    if n <= 2:
        return n

    # dp[i] = dictionary: diff → length of arithmetic subseq ending at i with that diff
    dp = [{} for _ in range(n)]
    max_len = 2

    for i in range(n):
        for j in range(i):
            diff = nums[i] - nums[j]
            # If previous arithmetic subsequence exists, extend it. Else, start new of length 2.
            prev_len = dp[j].get(diff, 1)
            dp[i][diff] = prev_len + 1
            max_len = max(max_len, dp[i][diff])

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  For each pair (i, j) with i > j, we calculate and update a value.
- **Space Complexity:** O(n²).  
  Each of the n elements may, in the worst case, have O(n) entries in their dictionary for all possible differences.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual subsequence, not just its length?  
  *Hint: You could store back-pointers in the DP map.*

- Could you do better than O(n²) in time or space?  
  *Hint: Think about constraints on range of numbers or differences, or whether you can compress differences.*

- What if the array contains very large numbers or very small numbers—will difference calculation or hash-table space usage become a concern?  
  *Hint: Discuss integer overflow and hash collisions in some languages.*

### Summary
This problem uses the **dynamic programming with hashmap/memoization** pattern, tracking the longest subsequence length for every index + difference combination.  
It's a classic **DP on subsequences** problem, similar to Longest Increasing Subsequence (LIS), but generalized to arbitrary difference rather than one specific gap.  
This approach is found in problems involving counting/length-finding on sequences with varying relationships and is widely applicable whenever the state depends on both index and a "feature" (like difference, ratio, etc).