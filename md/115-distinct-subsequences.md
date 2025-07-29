### Leetcode 115 (Hard): Distinct Subsequences [Practice](https://leetcode.com/problems/distinct-subsequences)

### Description  
Given two strings **s** (the source) and **t** (the target), count the number of **distinct subsequences** in **s** that equal **t**.  
A subsequence keeps the relative order of characters, but they don't need to be consecutive.  
Each character in **s** can be used at most once per subsequence, positions can't be reused.  
Example: For `s = "rabbbit"`, `t = "rabbit"`, there are 3 ways to form `"rabbit"` from `"rabbbit"` by picking different 'b's.

### Examples  

**Example 1:**  
Input: `s = "rabbbit", t = "rabbit"`  
Output: `3`  
*Explanation: Possible ways are ra_bbit, rab_bit, rabb_it (choose different 'b's in s).*

**Example 2:**  
Input: `s = "babgbag", t = "bag"`  
Output: `5`  
*Explanation: The 5 ways are: b_a_g___, b___g_a_, b____ag_, _a_g_a_, ____gag (keeping order and skipping characters allowed).*

**Example 3:**  
Input: `s = "a", t = "a"`  
Output: `1`  
*Explanation: Only one way, as both strings are just "a".*

### Thought Process (as if you’re the interviewee)  
First, let's clarify what a "distinct subsequence" means.  
- It means picking characters from **s** (in order) to build **t**.
- We only care about the order, not contiguity.
- The output is how many different ways to do this.

**Brute-force:**  
Try every subset of s's indices that has length equal to t, check if the corresponding characters make t.  
- Exponential time (too slow for s or t up to 1000).

**Dynamic Programming:**  
Let’s define `dp[i][j]` = number of ways s[i:] can form t[j:].  
- If t is empty (`j = len(t)`), there's 1 way: delete all remaining characters in s.
- If s is empty (`i = len(s)`) but t isn't, that's 0 ways.
- State transition:
    - If s[i] == t[j]:  
        dp[i][j] = dp[i+1][j+1] + dp[i+1][j]  
        (match s[i] with t[j] OR skip s[i])
    - If s[i] != t[j]:  
        dp[i][j] = dp[i+1][j]  
        (skip s[i])
- This way, we only consider deletes, not swaps.

**Space Optimization:**  
Since we only need the next row, we can use two 1-D arrays (or even overwrite in one).

**Why this approach?**  
- Subproblems overlap, making DP natural.
- Much faster than brute-force (O(m×n)), fits constraints.

### Corner cases to consider  
- s or t is empty (`s = ""` or `t = ""`)
- t longer than s (`len(t) > len(s)`)
- All characters are equal (e.g., `s = "aaaaa", t = "aaa"`)
- s and t are exactly the same
- No possible match (t contains character not in s)

### Solution

```python
def numDistinct(s: str, t: str) -> int:
    m, n = len(s), len(t)
    # dp[i][j]: ways s[i:] forms t[j:]
    dp = [0] * (n + 1)
    dp[n] = 1  # empty t can always be formed

    # iterate s from right to left
    for i in range(m - 1, -1, -1):
        # need to work right-to-left for t, because dp[j] from previous i+1
        prev = dp[:]  # keep previous values
        for j in range(n - 1, -1, -1):
            if s[i] == t[j]:
                dp[j] = prev[j] + prev[j + 1]
            else:
                dp[j] = prev[j]
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = len(s), n = len(t).  
  Each cell in the dp table is computed once.
- **Space Complexity:** O(n), just one array of length n+1 for current and a copy for prev row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s and t could have up to 10⁵ characters each?  
  *Hint: Can you optimize further? Consider that t might be very short compared to s.*

- Can you recover all possible subsequences, not just count them?  
  *Hint: Recursion + backtracking. May not scale for large inputs.*

- How would you solve if you were allowed to change up to k characters in s?  
  *Hint: Adapt dp logic with extra dimension for number of changes.*

### Summary
This problem is a classic example of the **dynamic programming: subsequence counting** pattern.  
It's applicable in string pattern matching, genetics (DNA subpatterns), and text parsing where order matters but not contiguity.  
Patterns used: **2D DP with space optimization**, **subproblem state modeling**.  
Similar: Leetcode 1143 (Longest Common Subsequence), Edit Distance, etc.