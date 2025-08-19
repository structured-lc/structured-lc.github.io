### Leetcode 516 (Medium): Longest Palindromic Subsequence [Practice](https://leetcode.com/problems/longest-palindromic-subsequence)

### Description  
Given a string s, find the **length** of the longest subsequence in s that is a palindrome.  
A **subsequence** is a sequence that can be derived from another string by deleting some or no elements without changing the order. The resulting sequence must read the same forwards and backwards (i.e., be a palindrome).  
Your task: Return the maximum possible length for such a palindromic subsequence.

### Examples  

**Example 1:**  
Input: `s = "bbbab"`  
Output: `4`  
*Explanation: The longest palindromic subsequence is "bbbb" (indices 0,1,2,4).*

**Example 2:**  
Input: `s = "cbbd"`  
Output: `2`  
*Explanation: The longest palindromic subsequence is "bb". "cb" or "bd" are not valid because they're not palindromic.*

**Example 3:**  
Input: `s = "agbdba"`  
Output: `5`  
*Explanation: The longest palindromic subsequence is "abdba".*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all possible subsequences, check if each is a palindrome, return the max length.  
  This would take O(2ⁿ × n) time since there are 2ⁿ subsequences and checking each takes up to n. Not feasible for n > 20.

- **Optimization - DP:**  
  The subproblem: LPS(i, j) = length of longest palindromic subsequence in s[i:j+1].  
  If s[i] == s[j], then LPS(i, j) = 2 + LPS(i+1, j-1)  
  Else, LPS(i, j) = max(LPS(i+1, j), LPS(i, j-1))  
  This forms an overlapping subproblem structure, suitable for dynamic programming.

- **Bottom-Up DP Approach:**  
  - Use a 2D dp table, where dp[i][j] is the answer for i to j.  
  - For each substring length (from 1 up to n), compute all substrings of that length, filling out the dp table.  
  - The answer is dp[n-1].  
  - Since every single character is a palindrome of length 1, initialize dp[i][i] = 1 for 0 ≤ i < n.

- **Space optimization:**  
  - Since each dp[i][j] only depends on previous row and previous column, can optimize to O(n) space by keeping only two rows at a time[2].

- **Why DP?**  
  - Palindromic subsequence is a classic overlapping subproblem, optimal-substructure case.  
  - Brute force is far too slow, so DP is ideal.

### Corner cases to consider  
- **Empty string:** Should return 0.  
- **Single character:** Any single character is a palindrome of length 1.  
- **All characters same:** The whole string is a palindrome.  
- **No palindromic subsequence longer than 1:** All unique characters (e.g. "abcd").

### Solution

```python
def longestPalindromeSubseq(s: str) -> int:
    n = len(s)
    if n == 0:
        return 0
    # dp[i][j]: length of LPS in s[i:j+1]
    dp = [[0] * n for _ in range(n)]

    # all substrings of length 1 are palindrome of length 1
    for i in range(n):
        dp[i][i] = 1

    # build up the answer from shorter substrings to longer
    for length in range(2, n+1):  # length of substring
        for i in range(n-length+1):
            j = i + length - 1
            if s[i] == s[j]:
                if length == 2:
                    dp[i][j] = 2  # two equal chars
                else:
                    dp[i][j] = 2 + dp[i+1][j-1]
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])

    return dp[0][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the length of s.  
  Each substring pair (i, j) (i ≤ j) is processed once.
- **Space Complexity:** O(n²) for the 2D DP table.  
  With space optimization, can be reduced to O(n), but 2D is clearer for interviews.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reconstruct the actual longest palindromic subsequence, not just its length?  
  *Hint: Backtrack from dp[n-1] and build the subsequence using the choices made.*

- Can you further optimize the space complexity?  
  *Hint: Since each dp[i][j] depends only on dp[i+1][j-1], dp[i][j-1], and dp[i+1][j], a rolling array can be used.*

- What changes if we allowed rearranging the string for maximum palindromic subsequence length?  
  *Hint: All repeated characters can be paired; the problem reduces to counting character frequencies.*

### Summary
This problem is a classic example of **dynamic programming on substrings**, leveraging overlapping subproblems and optimal substructure.  
The main pattern is like **"Longest Common Subsequence"**: choose or skip current character(s) and recurse.  
DP on substrings applies to problems such as **Palindrome Partitioning**, **Regular Expression Matching**, and **Edit Distance**.  
Subsequence DP problems appear often when order matters but continuity does not.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Palindromic Substring(longest-palindromic-substring) (Medium)
- Palindromic Substrings(palindromic-substrings) (Medium)
- Count Different Palindromic Subsequences(count-different-palindromic-subsequences) (Hard)
- Longest Common Subsequence(longest-common-subsequence) (Medium)
- Longest Palindromic Subsequence II(longest-palindromic-subsequence-ii) (Medium)
- Maximize Palindrome Length From Subsequences(maximize-palindrome-length-from-subsequences) (Hard)
- Maximum Product of the Length of Two Palindromic Subsequences(maximum-product-of-the-length-of-two-palindromic-subsequences) (Medium)