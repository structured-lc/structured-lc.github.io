### Leetcode 2915 (Medium): Length of the Longest Subsequence That Sums to Target [Practice](https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target)

### Description  
You are given an array of integers, `nums`, and an integer `target`.  
Your task is to find the **maximum length** of any subsequence of `nums` whose elements sum exactly to `target`. If there is no such subsequence, return -1.  
A subsequence consists of any subset of elements from `nums` in the original order (not necessarily contiguous).

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4, 5]`, `target = 9`  
Output: `3`  
*Explanation: One valid subsequence is [2, 3, 4] (2 + 3 + 4 = 9). There is no longer subsequence with sum 9; single-element and two-element sums are too small, and longer are too large.*

**Example 2:**  
Input: `nums = [4, 1, 2, 1]`, `target = 6`  
Output: `3`  
*Explanation: The subsequence [4, 1, 1] sums up to 6. This is the longest subsequence possible for the target sum.*

**Example 3:**  
Input: `nums = [1, 2, 3]`, `target = 7`  
Output: `-1`  
*Explanation: No subsequence of any length sums to 7.*

### Thought Process (as if you’re the interviewee)  
First, I’d try to consider all possible subsequences and their sums, tracking the length if the sum equals target. But there are 2ⁿ subsequences, so this brute-force approach is exponential and not scalable.

The problem asks for the *maximum* length among all possible subsequences with a particular sum (not the *number* of subsequences).  
This suggests dynamic programming (DP), similar to subset-sum, but instead of simply checking if a sum is possible, we need to track the *maximum possible length* for each achievable sum.

Key idea:  
- For every position in `nums`, for each sum we could reach before, try extending it by adding the current `nums[i]`.  
- Maintain a DP table: `dp[j] = maximum length of a subsequence that sums to j`.  
- Each number is used at most once (each number in a subsequence is selected or not).

We can optimize the DP:
- Start with `dp=0` (sum 0 achievable with length 0).
- For each number, iterate sums from target down to the number (to avoid reuse), and try updating `dp[j]`.
- At the end, if `dp[target] > 0`, return that length, else return -1.

### Corner cases to consider  
- Empty array (`nums = []`)
- No possible subsequence sums to target
- All numbers are 0, and `target = 0`
- Negative numbers in `nums`
- Multiple subsequences sum to target, need maximum length
- Numbers larger than `target`, which should be ignored

### Solution

```python
def lengthOfLongestSubsequence(nums, target):
    # dp[j]: maximum length of a subsequence that sums to j
    n = len(nums)
    dp = [-float('inf')] * (target + 1)
    dp[0] = 0  # sum 0 can be achieved with 0 elements

    for num in nums:
        # iterate backwards to avoid reusing same number
        for j in range(target, num - 1, -1):
            if dp[j - num] != -float('inf'):
                dp[j] = max(dp[j], dp[j - num] + 1)
    return dp[target] if dp[target] > 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × target), because for each element, we potentially update up to `target` DP entries.
- **Space Complexity:** O(target), since we only need a 1D array of size target+1 for dynamic programming.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed the **count of subsequences** that sum to target, not the maximum length?  
  *Hint: Can you modify DP to count, not just track max length? Think combinatorics.*

- What if the array could have **negative numbers**?
  *Hint: How would you modify DP index range or storage? Is the range of possible sums bounded?*

- Can the solution be optimized further for space if `target` is very large but numbers in `nums` are small?
  *Hint: Are there pruning strategies or alternate data structures you could use?*

### Summary
This problem is a variation on the **subset sum** dynamic programming pattern, with an added twist to track the **maximum length** of valid subsequences, rather than mere existence.  
The in-place 1D DP array pattern shown here is common for knapsack-type problems, especially where selection (not arrangement) of elements matters.  
This approach generalizes to problems like "subset sum minimum/maximum subset length" or "knapsack with cardinality constraints."