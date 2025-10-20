### Leetcode 1143 (Medium): Longest Common Subsequence [Practice](https://leetcode.com/problems/longest-common-subsequence)

### Description  
Given two strings, find the length of the longest subsequence that is common to both. A subsequence is a sequence derived from the string by deleting some or no characters without changing the order of the remaining elements. The task is to compute the length of this longest common subsequence (LCS) but not necessarily the subsequence itself.

### Examples  

**Example 1:**  
Input: `text1 = "abcde"`, `text2 = "ace"`  
Output: `3`  
*Explanation: The longest common subsequence is "ace". The order must be maintained but characters do not need to be contiguous.*

**Example 2:**  
Input: `text1 = "abc"`, `text2 = "abc"`  
Output: `3`  
*Explanation: Every character matches in order; the whole string is the LCS.*

**Example 3:**  
Input: `text1 = "abc"`, `text2 = "def"`  
Output: `0`  
*Explanation: No common subsequence exists between the two strings.*

### Thought Process (as if you’re the interviewee)  
To solve this, a brute-force method would try all possible subsequences of one string and check if they are subsequences of the other, but this is exponential and very slow.

Noticing overlapping subproblems and optimal substructure hints at dynamic programming:

- Define `dp[i][j]` as the length of the LCS of the suffixes `text1[0:i]` and `text2[0:j]`.
- If `text1[i-1] == text2[j-1]`, the character is part of the LCS, so `dp[i][j] = dp[i-1][j-1] + 1`.
- Otherwise, take the maximum by skipping one character from either string: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

We'll build a (m+1)×(n+1) table for strings of length m and n. The answer is in `dp[m][n]` after filling the table.

The reason for using a bottom-up table (instead of recursion with memoization) is because it is easier to avoid recursion stack overhead, and we can optimize space to two rows if needed.

### Corner cases to consider  
- Either string is empty → LCS length is 0.
- Strings have no characters in common.
- Strings are identical.
- Strings share a single character.
- Very large input sizes.

### Solution

```python
def longestCommonSubsequence(text1: str, text2: str) -> int:
    # Initialize a (m+1) x (n+1) DP table with 0s
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill the table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # If the current chars match, extend the result from the subproblem
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # Otherwise, take the best from ignoring a char from either string
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    # The answer is at the bottom right
    return dp[m][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m·n) for building the DP table of size (m+1)×(n+1), where m and n are lengths of the two input strings.
- **Space Complexity:** O(m·n) for the full DP table. This can be reduced to O(min(m, n)) using only two rows, since each cell depends only on the previous row and itself.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual LCS, not just its length?  
  *Hint: Track matching steps or pointers as you build the table and backtrack afterwards.*

- Can you optimize the space complexity further?  
  *Hint: Only two rows (current and previous) are required at any time.*

- What if you need to find the LCS for more than two strings?  
  *Hint: Consider extending DP to more dimensions.*

### Summary
This problem is a classic example of the **dynamic programming** pattern, specifically the 2D DP table approach for sequence alignment problems. The key is recognizing overlapping subproblems and optimal substructure. This technique appears in DNA sequence alignment, text diff tools, and various edit distance computations. The code can be adapted for related problems like minimum insertions/deletions to convert one string to another.


### Flashcard
Use DP: dp[i][j] = dp[i−1][j−1]+1 if chars match, else max(dp[i−1][j], dp[i][j−1]); answer is dp[m][n].

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Palindromic Subsequence(longest-palindromic-subsequence) (Medium)
- Delete Operation for Two Strings(delete-operation-for-two-strings) (Medium)
- Shortest Common Supersequence (shortest-common-supersequence) (Hard)
- Maximize Number of Subsequences in a String(maximize-number-of-subsequences-in-a-string) (Medium)
- Subsequence With the Minimum Score(subsequence-with-the-minimum-score) (Hard)