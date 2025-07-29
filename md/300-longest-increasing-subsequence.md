### Leetcode 300 (Medium): Longest Increasing Subsequence [Practice](https://leetcode.com/problems/longest-increasing-subsequence)

### Description  
Given an integer array, find the length of the **longest strictly increasing subsequence** (LIS).  
A subsequence is a sequence derived by deleting some or no elements from the original array without changing the order of the remaining elements. For LIS, each next element must be strictly greater than the previous one.

### Examples  

**Example 1:**  
Input: `[10,9,2,5,3,7,101,18]`  
Output: `4`  
*Explanation: The LIS is `[2,3,7,101]`. There are longer subsequences but not strictly increasing. The length is 4.*

**Example 2:**  
Input: `[0,1,0,3,2,3]`  
Output: `4`  
*Explanation: The LIS can be `[0,1,2,3]`.*

**Example 3:**  
Input: `[7,7,7,7,7,7,7]`  
Output: `1`  
*Explanation: All elements are the same, so the longest strictly increasing subsequence contains just one number.*

### Thought Process (as if you’re the interviewee)  
Brute-force would try all possible subsequences, but this is exponential (clearly too slow as the number of subsequences is 2ⁿ).

A classic dynamic programming approach:
- For every index i, let `dp[i]` be the length of the LIS **ending** at i.
- Initialize every `dp[i]` to 1 (every element is a subsequence).
- For each i, check all j < i; if `nums[j] < nums[i]`, then `dp[i]` can potentially be `dp[j] + 1`.
- At the end, the answer is `max(dp)`.

Time complexity: O(n²)

For stronger performance, use a combination of a greedy and binary search approach. Maintain a tails list:
- For each number, use binary search to find where it could be placed/replaced in tails.
- This reduces time to O(n log n), but only gives the length of LIS (not the actual subsequence).

### Corner cases to consider  
- The array is empty (`[]`)
- All elements are identical
- All elements are in descending order
- One element
- Strictly increasing array

### Solution

```python
def lengthOfLIS(nums):
    n = len(nums)
    if n == 0:
        return 0

    # dp[i] = length of longest increasing subsequence ending at index i
    dp = [1] * n

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — two nested loops: for each element i, check all j < i.
- **Space Complexity:** O(n) — for the dp array, size proportional to input length.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct the actual LIS (not just its length)?  
  *Hint: Maintain a predecessor array and backtrack after filling dp.*

- Can you reduce the time complexity below O(n²)?  
  *Hint: Try using a list and binary search to simulate the tails of possible increasing subsequences.*

- How would the solution change if you wanted non-decreasing, not strictly increasing subsequences?  
  *Hint: Adjust the comparison operator for equal values.*

### Summary
This is a classic **dynamic programming** problem—subsequence, not subarray, and order matters.  
It demonstrates a _DP + two-pointer/scan_ pattern, and can be optimized with binary search.  
This pattern is widely used in sequence problems like LIS, Longest Increasing Path in Matrix, or versions on strings and more.