### Leetcode 10 (Hard): Regular Expression Matching [Practice](https://leetcode.com/problems/regular-expression-matching)

### Description  
Given a string **s** and a pattern **p**, implement regular expression matching with support for `.` and `*`.  
- `.` matches **any single character**.
- `*` matches **zero or more of the preceding element**.

Determine if the entire string **s** matches the entire pattern **p**. The pattern is always well-formed (no invalid `*` placements). The match must cover **the entire input string**.

### Examples  

**Example 1:**  
Input: `s = "aa", p = "a"`  
Output: `False`  
*Explanation: "a" matches only the first 'a'. The pattern does not account for the second 'a', so no full match.*

**Example 2:**  
Input: `s = "aa", p = "a*"`  
Output: `True`  
*Explanation: `*` allows 'a' to repeat zero or more times. Here, it matches both 'a's in "aa".*

**Example 3:**  
Input: `s = "ab", p = ".*"`  
Output: `True`  
*Explanation: `.` matches any character, and `*` allows that any number of times — so it matches "ab".*

**Example 4:**  
Input: `s = "aab", p = "c*a*b"`  
Output: `True`  
*Explanation: "c*" can be zero 'c's, "a*" matches "aa", and then "b" matches 'b'.*

**Example 5:**  
Input: `s = "mississippi", p = "mis*is*p*."`  
Output: `False`  
*Explanation: The pattern fails to account for the whole string, because 'p*.' can't absorb "ppi".*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Start by attempting to recursively check all ways `*` could match zero-or-more of its preceding character, and check each path. This explores every branch, but is highly inefficient (exponential time).

- **Optimization:**  
  Notice repeated subproblems: e.g., matching the rest of `s` given the rest of `p` after consuming a character or skipping over a `*`.  
  Use **Dynamic Programming (DP)** with **memoization** to cache results for each (s_index, p_index) pair so we don't recompute matches for overlapping subproblems.  
  Specifically, use DP table or recursion with memo to store: "`dp[i][j]` = True/False, does `s[i:]` match `p[j:]`?"

- **Approach:**  
  For each position, if the next character in `p` is '\*', we can:
  - Match **zero** times: skip `p[j]` and '\*' (move by 2 in pattern)
  - Match **one or more**: if `s[i]` matches `p[j]` (or `p[j] == '.'`), advance in `s` but keep `p[j]` (try to match more)
  If no '\*', just match current chars and advance both.

  This DP reduces time complexity to O(m × n), where m and n are the lengths of `s` and `p`.

### Corner cases to consider  
- Empty `s` and/or empty `p`
- `*` as second character (e.g., `a*` vs empty string)
- Multiple consecutive stars not allowed, but many stars in the pattern
- Patterns that can match empty strings, e.g., `"a*"`, `".*"`, or `""`
- Patterns ending in `*`, e.g., `"ab*"`
- Long patterns/strings with lots of backtracking needed

### Solution

```python
def isMatch(s: str, p: str) -> bool:
    # Memoization dictionary: (i, j) -> isMatch(s[i:], p[j:])
    memo = {}

    def dp(i, j):
        if (i, j) in memo:
            return memo[(i, j)]

        # If we've reached end of pattern
        if j == len(p):
            # If we've also reached end of string, it's a match
            return i == len(s)

        # First character matches if string isn't empty and current pattern char is '.' or equals s[i]
        first_match = (i < len(s)) and (p[j] == s[i] or p[j] == '.')

        # Next part of pattern is *, can match zero or more of p[j]
        if (j + 1) < len(p) and p[j + 1] == '*':
            # Two choices:
            # 1. Skip 'char*' (move past both, match zero)
            # 2. If first matches, stay at p[j], move in s (match one+)
            memo[(i, j)] = (dp(i, j + 2) or 
                            (first_match and dp(i + 1, j)))
            return memo[(i, j)]
        else:
            # If not *, both must match and advance
            memo[(i, j)] = first_match and dp(i + 1, j + 1)
            return memo[(i, j)]

    return dp(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = len(s), n = len(p).  
  Each (i, j) subproblem is solved at most once due to memoization.
- **Space Complexity:** O(m × n):  
  For the memo dictionary, storing results for each subproblem. Plus the recursion stack depth ≤ m + n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change the code if the pattern allowed '+' (one or more) or '?' (zero or one) operators as well?  
  *Hint: Extend your DP logic for new quantifiers.*

- How would you optimize for limited memory or if s/p was very large?  
  *Hint: Can you use bottom-up DP? Doe the pattern allow for pruning?*

- Can this algorithm be made to output the actual substrings that matched each pattern group?  
  *Hint: Track which branch each DP step took using parent pointers.*

### Summary

This problem uses the classic **dynamic programming with memoization** pattern for recursive, overlapping subproblems. The branching logic for `*` (zero-or-more) is essential to efficient regex-style matching. This approach generalizes to other pattern-matching problems like wildcard/glob matching, string edit distance, and parsing-based DP problems.