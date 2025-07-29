### Leetcode 1682 (Medium): Longest Palindromic Subsequence II [Practice](https://leetcode.com/problems/longest-palindromic-subsequence-ii)

### Description  
Given a string s, return the length of the **longest palindromic subsequence** of s that is **not a subsequence of s with all identical characters**. In other words, return the length of the longest palindromic subsequence that contains at least two different characters.

### Examples  
**Example 1:**  
Input: `s = "bbabab"`  
Output: `5`  
*Explanation: The sequence "babab" is palindromic, uses two letters ('a', 'b').*

**Example 2:**  
Input: `s = "aaaaa"`  
Output: `0`  
*Explanation: The only palindromic subsequence is "aaaaa", all chars same (invalid). So, return 0.*

**Example 3:**  
Input: `s = "abcdef"`  
Output: `1`  
*Explanation: Every single character is a palindrome, but need at least two different chars. No longer palindromic subsequence, so answer is 1 if s has different chars else 0.*

### Thought Process (as if you’re the interviewee)  
- Standard DP approach for longest palindromic subsequence returns the max length palindrome.
- But need to avoid the case where all characters used are the same (e.g., "aaaaa").
- Can use 3D DP: for each substring, and for each pair of enclosing chars c1 ≠ c2, track max length.
- Or, brute-force try all possible pairs of characters as endpoints and DP inside.
- For each pair (c, d) with c ≠ d, compute the largest palindromic subsequence starting and ending with c and d, then maximize over all such pairs.

### Corner cases to consider  
- All characters same: answer is 0.
- s has no palindromic subsequence longer than 1 unless at least two kinds of characters.
- Minimum length string: length 1 or 2.
- Only two different characters, in odd positions.

### Solution

```python
def longestPalindromeSubseq2(s: str) -> int:
    n = len(s)
    # dp[i][j]: length of longest palindromic subseq in s[i:j+1]
    dp = [[0] * n for _ in range(n)]
    for i in range(n-1, -1, -1):
        dp[i][i] = 1
        for j in range(i+1, n):
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])

    maxlen = 0
    # Try all character pairs (a,b) where a≠b
    for a in set(s):
        for b in set(s):
            if a == b: continue
            # Compute LPS bounded by a at left and b at right
            l, r = 0, n-1
            while l < n and s[l] != a:
                l += 1
            while r >= 0 and s[r] != b:
                r -= 1
            if l < r:
                maxlen = max(maxlen, dp[l][r])
    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N²) for the DP + O(σ² N) for the pair scanning (σ = unique chars, small for a-z).
- **Space Complexity:** O(N²) for the DP array.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the subsequence itself, not just its length?
  *Hint: Standard DP backtracking plus keep track of included endpoints.*

- Can you optimize for space?
  *Hint: Only previous and current DP rows needed for 2D DP.*

- What changes if you allow three different chars instead of two?
  *Hint: Try all triplet endpoints, higher-order DP.*

### Summary
Classic dynamic programming question with extra filtering by character uniqueness. The classic longest palindromic subsequence DP adapts well, but needs additional checking for endpoint characters. Pattern applies to advanced palindromic substructure with extra constraints.