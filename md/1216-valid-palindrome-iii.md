### Leetcode 1216 (Hard): Valid Palindrome III [Practice](https://leetcode.com/problems/valid-palindrome-iii)

### Description  
Given a string *s* and an integer *k*, determine if *s* is a **k-palindrome**. A **k-palindrome** means that you can turn *s* into a palindrome by removing at most *k* characters. Return **true** if it’s possible, **false** otherwise.  
A palindrome is a string that reads the same forward and backward.

### Examples  

**Example 1:**  
Input: `s = "abcdeca", k = 2`  
Output: `true`  
*Explanation: Remove 'b' and 'e' ⇒ "acdca", which is a palindrome. This requires 2 removals, equal to *k**[1].*

**Example 2:**  
Input: `s = "acdcb", k = 1`  
Output: `false`  
*Explanation: Removing any single character doesn't yield a palindrome. More than 1 removal is required.*[1]

**Example 3:**  
Input: `s = "aba", k = 0`  
Output: `true`  
*Explanation: "aba" is already a palindrome, no removals needed. 0 ≤ *k**[1].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try every possible way of removing up to *k* characters and check for a palindrome each time. This approach is exponential in time and not feasible for strings longer than a few characters.
- **Observation**: The minimal number of removals needed to make *s* a palindrome equals the difference between the string’s length and the length of its **longest palindromic subsequence** (LPS).
- **Plan**: Find the LPS length by using dynamic programming (DP):
  - Create a DP table `dp[i][j]` representing the length of the LPS in *s[i..j]*.
  - If `s[i] == s[j]`, then the LPS is `dp[i+1][j-1] + 2`.
  - Otherwise, LPS is `max(dp[i+1][j], dp[i][j-1])`.
  - Fill the table bottom-up.
  - The minimal number of removals needed is `n - dp[n-1]`, where *n* = len(s).
  - If this minimal value is ≤ *k*, then return **true**; else, **false**[2].
- **Why DP**: Avoids recomputation and guarantees polynomial time.

### Corner cases to consider  
- Empty string: Should return **true** (requires 0 removals).
- All identical characters: Should return **true** for any *k*.
- Already a palindrome: Should return **true** if *k* ≥ 0.
- *k* = 0: Only exact palindromes pass.
- *k* ≥ len(s): Always **true**; can delete everything.
- String with two distinct characters, *k* < 1: Should return **false**.

### Solution

```python
def isValidPalindrome(s: str, k: int) -> bool:
    n = len(s)
    # dp[i][j] = minimum removals to turn s[i..j] into a palindrome
    dp = [[0] * n for _ in range(n)]

    # Build DP table from smaller substrings to larger ones
    for length in range(2, n + 1):  # substring lengths
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] if i + 1 <= j - 1 else 0
            else:
                dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1])

    return dp[0][n - 1] <= k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  The DP table is of size n×n, and each entry is filled once based on previous results.

- **Space Complexity:** O(n²)  
  The 2D DP table needs n² storage. No additional heavy structures or recursion stack required.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you reduce the space complexity of your solution?  
  *Hint: Notice that you only access the previous row and current row/column in the DP table for each update.*

- Can you return the sequence of indices you need to remove, not just the boolean result?  
  *Hint: Backtrack using your DP table to retrieve the removed indices/characters.*

- How would you handle the case where you want minimal and lexicographically smallest palindrome after removals?  
  *Hint: Track or favor earlier/lower indices when multiple options are equally good.*

### Summary
This problem uses the **Longest Palindromic Subsequence** dynamic programming pattern, a classic example often seen in string DP challenges. The same pattern can help in questions asking for minimal edits to reach palindromic forms, or for comparing sequences for minimal transformations (like edit distance). The approach is efficient, and can often be optimized in space if only the last computed results are needed at any point.