### Leetcode 664 (Hard): Strange Printer [Practice](https://leetcode.com/problems/strange-printer)

### Description  
Given a string **s** of lowercase English letters, determine the minimum number of turns a *strange printer* needs to print it using these rules:
- In one turn, the printer can print a sequence of the same character, overwriting existing characters anywhere between any chosen start and end positions.
- The goal is to produce the exact string **s** in the minimum number of turns.

### Examples  

**Example 1:**  
Input: `s = "aaabbb"`  
Output: `2`  
*Explanation: In the first turn, print 'a' over the first three positions ("aaa---"), then in the second turn, print 'b' over the last three ("---bbb").*

**Example 2:**  
Input: `s = "aba"`  
Output: `2`  
*Explanation: First print 'a' across the entire string ("aaa"), then overwrite the middle character with 'b' at position 1 ("aba").*

**Example 3:**  
Input: `s = "abc"`  
Output: `3`  
*Explanation: Print 'a' at position 0, then 'b' at position 1, then 'c' at position 2; each letter is unique and thus requires a separate print.*

### Thought Process (as if you’re the interviewee)  
First, I notice that:
- The printer can only print the same character in one turn, anywhere in the string.
- It can overwrite existing characters.

**Brute-force approach:**  
Try all possible ways of splitting the string, printing substrings character by character. However, this quickly becomes intractable due to exponential possibilities.

**Dynamic Programming Optimization:**  
- Let **dp[i][j]** represent the minimum turns to print the substring from i to j (inclusive).
- If **s[i] == s[j]**, the last operation for s[j] may have been covered by a previous operation, so we can try to combine them, reducing the number of turns.
- The recurrence is:
  - **dp[i][j] = min(dp[i][k] + dp[k+1][j])** for i ≤ k < j.
  - If s[i] == s[j], we can merge their prints: **dp[i][j] = dp[i][j-1]**.
- For efficiency, compress consecutive same characters at the preprocessing step to reduce redundant calculations.

This approach uses overlapping subproblems and optimal substructure, favoring DP.

### Corner cases to consider  
- Empty string (should return 0).
- String of length 1 (should return 1).
- All identical characters (should return 1).
- Alternating characters (e.g., "ababab").
- Long runs of the same character in the middle or at the ends.

### Solution

```python
def strangePrinter(s: str) -> int:
    # Remove consecutive duplicate characters for DP optimization
    compact = []
    for ch in s:
        if not compact or compact[-1] != ch:
            compact.append(ch)
    s = ''.join(compact)
    n = len(s)
    if n == 0:
        return 0

    # dp[i][j] = min turns to print s[i:j+1]
    dp = [[0]*n for _ in range(n)]

    # base: each single character just needs 1 turn
    for i in range(n):
        dp[i][i] = 1

    # consider substrings of increasing length
    for length in range(2, n+1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = dp[i][j-1] + 1  # baseline: print s[j] separately
            # try to merge turn with previous matching char
            for k in range(i, j):
                if s[k] == s[j]:
                    # printing s[k+1:j] and s[i:k] can share a turn for s[j]
                    dp[i][j] = min(
                        dp[i][j],
                        dp[i][k] + dp[k+1][j-1]
                    )
    return dp[0][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - n is the length of the compressed string (after removing consecutive duplicates).
  - There are O(n²) DP states, and for each, up to O(n) possible splits.
- **Space Complexity:** O(n²)  
  - DP table of size n × n.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you further optimize the time complexity using memoization or heuristic pruning?  
  *Hint: Think about cases when you can avoid recalculating DP entries or merge intervals.*

- How would the solution change if the printer could print any sequence (not just identical characters)?  
  *Hint: What does the DP recurrence become if the operation constraint is lifted?*

- What if you needed to print palindromic strings optimally?  
  *Hint: How would the overlapping prints interact for palindromes?*

### Summary

This is a **2D interval dynamic programming** problem, where optimal solutions for substrings combine to make optimal solutions for the full string. Removing consecutive duplicates simplifies the state-space. This DP pattern is common in substring and interval merge problems, such as "Burst Balloons" and "Palindrome Partitioning". The core insight: Think of every unique segment as a subproblem and recursively build up to find the fewest print operations.