### Leetcode 1092 (Hard): Shortest Common Supersequence  [Practice](https://leetcode.com/problems/shortest-common-supersequence)

### Description  
Given two strings, **str1** and **str2**, your task is to find *the shortest string which contains both str1 and str2 as subsequences*. This string is called the **Shortest Common Supersequence** (SCS) of str1 and str2. If there are multiple valid shortest supersequences, any of them is acceptable. You must return an actual SCS string, not just its length.

### Examples  

**Example 1:**  
Input: `str1 = "abac"`, `str2 = "cab"`  
Output: `"cabac"`  
*Explanation: Both "cabac" and "cabac" are possible shortest common supersequences. One way to form "cabac":  
- "cabac" contains "abac" as a subsequence (positions 2,3,4,5).  
- "cabac" contains "cab" as a subsequence (positions 1,2,3).*

**Example 2:**  
Input: `str1 = "geek"`, `str2 = "eke"`  
Output: `"geeke"`  
*Explanation: One possible SCS:  
- "geeke" contains "geek" (positions 1,2,3,4)  
- "geeke" contains "eke" (positions 2,3,5).*

**Example 3:**  
Input: `str1 = "AGGTAB"`, `str2 = "GXTXAYB"`  
Output: `"AGXGTXAYB"`  
*Explanation: "AGGTAB" and "GXTXAYB" are both subsequences of "AGXGTXAYB", which is a shortest possible string under the constraints.*

### Thought Process (as if you’re the interviewee)  

First, I’d consider brute-force: try all possible ways to interleave the two strings to create a supersequence, and return the shortest one that has both as subsequences. This is not feasible for even modest input lengths due to exponential growth.

Noticing the similarity to **Longest Common Subsequence (LCS)**, I realize that the SCS can be constructed by **merging the two strings using the LCS**. LCS gives the maximum string common to both, so by aligning both strings around the LCS, we can avoid repeating shared parts.

Key steps:
- Compute the **LCS** between str1 and str2 using dynamic programming.
- Use the LCS to reconstruct the SCS: 
  - For each character in LCS, take all characters from str1 and str2 that appear **before** the current LCS character and append them to the result, then append the current LCS character once.
  - Continue this for all characters in the LCS, then append any remaining characters of str1 and str2.

Alternatively, we can use a direct SCS DP algorithm:
- Build a DP table where `dp[i][j]` is the length of SCS for str1[0:i] and str2[0:j].
- The table is filled bottom-up:
  - If either string is empty, SCS is just the other string.
  - If str1[i-1] == str2[j-1], add 1 to the SCS of previous indices.
  - Otherwise, add 1 to the min(SCS using str1 or str2 up to previous char).
- Reconstruct the SCS by backtracking through the DP table and taking characters accordingly.

The second method is often simpler for coding. It avoids explicit construction of the LCS but does nearly the same job.

### Corner cases to consider  
- One or both strings are empty (SCS is the other string)
- The strings are identical (SCS is the string itself)
- No common characters (SCS is just str1 + str2)
- All characters are common but in a different order
- Strings have repeating characters

### Solution

```python
def shortestCommonSupersequence(str1: str, str2: str) -> str:
    m, n = len(str1), len(str2)
    # dp[i][j]: length of SCS for str1[0:i] and str2[0:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + 1
    # Reconstruct SCS from the DP table
    i, j = m, n
    res = []
    while i > 0 and j > 0:
        if str1[i-1] == str2[j-1]:
            res.append(str1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] < dp[i][j-1]:
            res.append(str1[i-1])
            i -= 1
        else:
            res.append(str2[j-1])
            j -= 1
    while i > 0:
        res.append(str1[i-1])
        i -= 1
    while j > 0:
        res.append(str2[j-1])
        j -= 1
    res.reverse()
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m and n are the lengths of str1 and str2.  
  Filling the DP table and reconstructing the path both take O(m × n) operations.

- **Space Complexity:** O(m × n) for the DP table, plus O(m + n) for the result string and reconstruction path.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you only needed the **length** of the SCS, not the string itself?  
  *Hint: You can just compute the DP table and return dp[m][n].*

- How would you extend this to **more than two strings**?  
  *Hint: Consider how LCS and SCS definitions can be generalized to k strings with k-dimensional DP.*

- Can you make the solution **space efficient**?  
  *Hint: Only two rows of the DP table are needed at a time for the length computation, but for reconstruction you may need the full table or back pointers.*

### Summary
This problem is a **classic dynamic programming pattern**, specifically an extension of the Longest Common Subsequence and Edit Distance problems. The DP approach aligns with many sequence alignment and merge problems in text processing and bioinformatics. The reconstruction technique is also widely used in DP-based path recovery, and the general structure—build table, then reconstruct by trace—appears often in Leetcode and technical interviews.