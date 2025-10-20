### Leetcode 44 (Hard): Wildcard Matching [Practice](https://leetcode.com/problems/wildcard-matching)

### Description  
Given a string **s** and a pattern **p**, determine if **s** matches **p** where:
- `'?'` matches exactly one arbitrary character.
- `'*'` matches any sequence of characters (including the empty sequence).
You need to check if the entire string **s** matches the entire pattern **p**, not just a part[2][4].

### Examples  

**Example 1:**  
Input: `s = "aa", p = "a"`  
Output: `False`  
*Explanation: Pattern expects a single 'a', but the string is "aa", which is too long.*

**Example 2:**  
Input: `s = "aa", p = "*"`  
Output: `True`  
*Explanation: `*` matches any sequence (even an empty one), so it covers both characters.*

**Example 3:**  
Input: `s = "cb", p = "?a"`  
Output: `False`  
*Explanation: `?` matches 'c', but 'b' ≠ 'a', so not a full match.*

**Example 4:**  
Input: `s = "adceb", p = "*a*b"`  
Output: `True`  
*Explanation: 
- `*` covers 'adce', then 'a' matches 'a', and `*` covers nothing before 'b' matches 'b'.*

**Example 5:**  
Input: `s = "acdcb", p = "a*c?b"`  
Output: `False`  
*Explanation: `*` can cover 'c', but the last `?` needs to match 'b', which doesn't work as pattern runs out[2].*

### Thought Process (as if you’re the interviewee)  
Start with brute force:  
- Try to match each position, handling `?` and `*` recursively.
- For `*`, try zero or many letter matches.
- For `?`, only match one character.
- This quickly becomes exponential due to overlapping subproblems.

Optimization:  
- Realize we're re-exploring the same (i, j) pairs in string and pattern.
- Switch to **dynamic programming**:
  - Use `dp[i][j]` to denote if `s[0:i]` matches `p[0:j]`.
  - Fill in DP table:
    - If `p[j-1]` is `?` or matches `s[i-1]`, then inherit from `dp[i-1][j-1]`.
    - If `p[j-1]` is `*`, two choices:
      - Match zero characters: inherit from `dp[i][j-1]`.
      - Match one/more: inherit from `dp[i-1][j]`.
    - Start with base cases: empty pattern matches empty string.
  - Can further optimize to a 1D DP as only previous row is needed.

Why this?  
- DP gives O(n × m) performance for both time and space, where n, m are lengths of s and p.  
- Handles all wildcards, and avoids redundant traversals[2][4].

### Corner cases to consider  
- Empty string or empty pattern
- Multiple consecutive `*`s in pattern (should treat as single `*`)
- Pattern contains only `*`
- String and pattern both empty
- No wildcards, direct string comparison
- Wildcard at beginning/end
- Pattern longer than string but contains `*`s

### Solution

```python
def isMatch(s: str, p: str) -> bool:
    # Collapse multiple consecutive '*'s into one
    new_p = []
    for char in p:
        if not (new_p and new_p[-1] == '*' and char == '*'):
            new_p.append(char)
    p = ''.join(new_p)

    m, n = len(s), len(p)
    # dp[i][j] means s[0:i] matches p[0:j]
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    # Empty pattern matches only empty string, except for '*'s at the beginning
    for j in range(1, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 1]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                # Star can match zero (dp[i][j-1]) or one more character (dp[i-1][j])
                dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
            elif p[j - 1] == '?' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            # else: by default is False

    return dp[m][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = len(s), n = len(p); we fill a table of size (m+1) × (n+1).
- **Space Complexity:** O(m × n), for the DP table.  
  Can be optimized to O(min(m, n)) by using two 1D arrays, as only the previous row or column is needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if * only matches non-empty sequences?
  *Hint: How would the transition for '*' change in the DP?*

- How would you optimize space further for large input?
  *Hint: Can you use just two rows or even one?*

- How would you return the actual matching substring(s) instead of just true/false?
  *Hint: Think about backtracking or storing extra info during DP fill.*

### Summary
This problem is a classic example of **DP for pattern/string matching**, similar to regular expression matching and edit distance problems. The DP pattern of matching prefixes with careful wildcard handling appears in multiple forms (sequence alignment, regex, etc.). Key patterns: two-pointer state transitions, row/column dependencies, and wildcard character decisions.


### Flashcard
Use dynamic programming table dp[i][j] to track matches between s[0:i] and p[0:j], handling '*' and '?' with recurrence relations.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Recursion(#recursion)

### Similar Problems
- Regular Expression Matching(regular-expression-matching) (Hard)
- Substring Matching Pattern(substring-matching-pattern) (Easy)