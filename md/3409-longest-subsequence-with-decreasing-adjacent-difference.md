### Leetcode 3409 (Medium): Longest Subsequence With Decreasing Adjacent Difference [Practice](https://leetcode.com/problems/longest-subsequence-with-decreasing-adjacent-difference)

### Description  
Given an array of integers **nums**, find the length of the longest subsequence where the **absolute differences between consecutive elements** form a **non-increasing sequence**. That is, for a subsequence seq₀, seq₁, ..., seqₘ, it should hold that |seq₁ - seq₀| ≥ |seq₂ - seq₁| ≥ ... ≥ |seqₘ - seqₘ₋₁|.  
A **subsequence** is any sequence obtained by deleting some (or no) elements without changing the order of the remaining elements.

### Examples  

**Example 1:**  
Input: `nums = [16, 6, 3]`  
Output: `3`  
*Explanation: The full sequence [16, 6, 3].  
|6 - 16| = 10, |3 - 6| = 3.  
10 ≥ 3, so the differences are non-increasing.*

**Example 2:**  
Input: `nums = [4, 2, 10, 8]`  
Output: `2`  
*Explanation: Longest subsequence can be [4, 2], [2, 10], [10, 8], or [4, 10], all length 2.  
For example, [2, 10]: |10 - 2| = 8 (no further element, difference constraint is trivially satisfied).*

**Example 3:**  
Input: `nums = [5, 5, 5, 5]`  
Output: `4`  
*Explanation: The whole sequence.  
Differences between every adjacent elements are 0, which is non-increasing (all equal).*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Try all possible subsequences, check whether the adjacent differences form a non-increasing sequence.
  - For each pair of indices, recursively branch on whether to pick or skip the next number.
  - Too slow: there are 2ⁿ possible subsequences.

- **DP Approach:**  
  - Let’s define dp[i][d] = the maximum length of a valid subsequence ending at index i where the last adjacent difference is d.
  - For every element nums[i], we can try to extend previous subsequences ending at nums[j] (j < i) if the new difference |nums[i] - nums[j]| ≤ previous difference.
  - For each i, try all previous j (< i). Transition is based on valid non-increasing difference.
  - Since differences are non-increasing, and absolute differences range from [0, max(nums)-min(nums)], we can use a DP table mapping previous value and last difference.
  - A more efficient approach is to precompute dp[value][diff] where value is the current element and diff is current last difference.

- **Why this approach:**  
  - Avoids redundant recomputation for all possible difference sequences.
  - By mapping [value][diff], we leverage the fact that state transitions only depend on value and previous (non-increasing) absolute difference.
  - Trade-off: uses more space (potential O(R²), where R = max(nums)), but routes towards polynomial time.

### Corner cases to consider  
- Single element array (length 1)
- All elements identical (difference always zero)
- Strictly increasing or decreasing arrays
- Arrays with alternating increase and decrease
- Large numbers or negative numbers
- Arrays with only two elements

### Solution

```python
def longestSubsequence(nums):
    # Get the range of nums to size dp accordingly
    mn = min(nums)
    mx = max(nums)
    # Offset is used to map actual values to zero-based indices
    offset = -mn
    n = len(nums)
    R = mx - mn + 1
    
    # dp[last_value][last_diff] = length of best sequence ending with value and diff
    dp = [ [0] * (R) for _ in range(R) ]
    res = 1

    for i in range(n):
        x = nums[i] + offset
        for y in range(R):
            diff = abs(x - y)
            if dp[y][diff] + 1 > dp[x][diff]:
                # Extend subsequence from previous value y with difference diff
                dp[x][diff] = dp[y][diff] + 1
                res = max(res, dp[x][diff])
        # Each single element is always a valid subsequence
        if dp[x][0] == 0:
            dp[x][0] = 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R² + nR), where R = max(nums) - min(nums) + 1.  
  For each element, we try every previous value in range R for all possible differences.
- **Space Complexity:** O(R²), as we store a table of size R × R for dp.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct the actual subsequence, not just length?  
  *Hint: Track previous indices/values in dp and backtrack after computation.*

- What if negative numbers are allowed in nums?  
  *Hint: Offset negative numbers to map into 0-based dp table.*

- How would you handle input where nums is very large but has small range?  
  *Hint: Use hash maps instead of large arrays for sparsity.*

### Summary
This problem is a variation of the Longest Subsequence DP pattern, with constraints on adjacent differences. The DP solution maps each potential ending value and last difference state, leading to an O(R²) table. This stateful DP table is a common approach for sequence and subsequence problems involving constraints about order or difference, and can also be adapted for "Longest Arithmetic Subsequence" and "Longest Subsequence with Difference Condition" types of problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- Longest Increasing Subsequence II(longest-increasing-subsequence-ii) (Hard)