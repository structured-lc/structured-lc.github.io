### Leetcode 583 (Medium): Delete Operation for Two Strings [Practice](https://leetcode.com/problems/delete-operation-for-two-strings)

### Description  
Given two strings, **word1** and **word2**, you are asked to find the minimum number of operations required to make them the same. In each operation, you may delete exactly one character from either string. The goal is to transform both strings into an identical string by performing the least possible total deletions.

### Examples  

**Example 1:**  
Input: `word1 = "sea", word2 = "eat"`  
Output: `2`  
*Explanation: Delete 's' from "sea" to get "ea", and delete 't' from "eat" to get "ea". Thus, 2 deletions are required.*

**Example 2:**  
Input: `word1 = "leetcode", word2 = "etco"`  
Output: `4`  
*Explanation: Remove 'l' and 'd' from "leetcode", remove 'e' and 'o' from "etco", both become "etc". Total 4 deletions.*

**Example 3:**  
Input: `word1 = "vultr", word2 = "lt"`  
Output: `3`  
*Explanation: Remove 'v', 'u', and 'r' from "vultr" to get "lt". 3 deletions required. "lt" and "lt" are equal.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would be to recursively try all deletion combinations for both strings until they’re equal, but this is highly inefficient.
- To optimize, observe that the **minimum number of deletions** to make the strings equal is related to removing characters **not in their longest common subsequence (LCS)**.
- If the length of LCS is `k`, then the total deletions needed = (len(word1) - k) + (len(word2) - k).
- This is a classic **dynamic programming** problem:
  - Let dp[i][j] = LCS of word1[0:i] and word2[0:j].
  - dp[*] = 0 and dp[*] = 0 because empty strings have no common subsequence.
- We'll use a 2D DP table to compute this.

### Corner cases to consider  
- One or both strings are empty (`""`): All characters have to be deleted from the non-empty string.
- Strings are already equal: No deletions needed.
- Strings have no characters in common: Delete all characters from both.
- Strings of length 1.
- Strings of maximum allowed length (500).

### Solution

```python
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    # dp[i][j]: LCS length between word1[:i] and word2[:j]
    dp = [[0]*(n+1) for _ in range(m+1)]
    
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                # Characters match, extend LCS by 1
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                # Take the best of skipping one char from either string
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    lcs = dp[m][n]
    # Total deletions: all non-LCS characters in both strings
    return (m - lcs) + (n - lcs)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = len(word1), n = len(word2). Filling each cell of the DP table takes O(1), and the table size is (m+1) × (n+1).
- **Space Complexity:** O(m × n) due to the DP table. Can be optimized to O(min(m, n)) by reusing 1D DP arrays, but 2D is clearer for interviews.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to print the resulting string after all deletions (the common subsequence)?
  *Hint: Reconstruct the LCS from the DP table by tracing back from dp[m][n].*

- Can you optimize the space complexity?
  *Hint: The current row only depends on the previous row, so use two 1D arrays.*

- What changes if only deletions on one string are allowed?
  *Hint: You'd need to transform one string into the other, akin to the Edit Distance problem but allowed operations are limited.*

### Summary
The problem leverages the **Longest Common Subsequence** dynamic programming pattern, which appears in string transformation, diff tools, and genetic sequence analysis. The solution reduces all unnecessary deletions to only what isn’t part of the LCS, which is both intuitive and efficient for the problem’s constraints. This DP template is highly reusable for related edit distance and LCS problems.