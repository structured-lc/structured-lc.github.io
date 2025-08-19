### Leetcode 1771 (Hard): Maximize Palindrome Length From Subsequences [Practice](https://leetcode.com/problems/maximize-palindrome-length-from-subsequences)

### Description  
Given two strings, **word1** and **word2**, you can select any non-empty subsequence from each string—let's call them subsequence₁ (from word1) and subsequence₂ (from word2). Concatenate them as `subsequence₁ + subsequence₂` to form a new string.  
Your objective: **Return the length of the longest palindrome you can construct** using this method. If no such palindrome exists, return 0.

A **subsequence** is a sequence you can get by deleting (possibly zero) characters from a string without changing the order of the remaining characters.  
A **palindrome** is a string that reads the same forward and backward.

### Examples  

**Example 1:**  
Input: `word1 = "cacb", word2 = "cbba"`  
Output: `5`  
*Explanation: Choose "ab" from word1, "cba" from word2 and concatenate to form "abcba", which is a palindrome.*

**Example 2:**  
Input: `word1 = "ab", word2 = "ab"`  
Output: `3`  
*Explanation: Choose "ab" from word1, "a" from word2 and concatenate to form "aba", which is a palindrome.*

**Example 3:**  
Input: `word1 = "aa", word2 = "bb"`  
Output: `0`  
*Explanation: Since no palindrome can be made by combining a non-empty subsequence from each, return 0.*

### Thought Process (as if you’re the interviewee)  
Let me start by reframing the problem for clarity:
- Select any non-empty subsequence from each string.
- Concatenate subsequence₁ + subsequence₂.
- Among all such possible combinations, find the maximum possible palindrome length.

**Brute-Force Idea:**  
Consider all non-empty subsequences for both strings, concatenate, and check if the result is a palindrome, keeping track of the best.  
However, both strings can be up to length 1000, so the number of subsequences is exponential (2ⁿ for a string of length n). Brute-force is not feasible.

**Key Insight:**  
To form a palindrome by combining from both strings, the palindrome's left part must take its prefix from word1 and its right part from word2.  
If we concatenate word1 and word2 into s = word1 + word2 (length n = len(word1) + len(word2)),  
then our problem reduces to finding the **longest palindromic subsequence of s where the palindrome uses at least one character from word1 and at least one from word2** (i.e., the palindrome’s “left boundary” is in word1 and the right boundary is in word2).

**DP Optimization:**  
Let s = word1 + word2.  
Define dp[i][j]: the length of the longest palindromic subsequence for s[i..j].

Standard LPS DP recurrence:
- If s[i] == s[j], dp[i][j] = dp[i+1][j-1] + 2.
- Else, dp[i][j] = max(dp[i+1][j], dp[i][j-1]).

But, we need the palindrome to use at least one character from each word. So,  
- Consider all indexes i in word1 (0 ≤ i < len(word1)),  
  and j in word2 (len(word1) ≤ j < n),  
  and for all s[i] == s[j]:  
    - The palindrome may start at i and end at j,
    - The core substring s[i+1..j-1] can be any palindromic content,
    - The overall palindrome length at dp[i][j] (including s[i] and s[j]) is dp[i+1][j-1] + 2.

Iterate for all i, j as above, and track the maximum palindrome length found under this constraint.

This reduces the exponential time to O(n²), which is feasible for n up to 2000.

### Corner cases to consider  
- No characters in common between word1 and word2 (output should be 0).
- Smallest input sizes (len(word1) == 1, len(word2) == 1).
- Both word1 and word2 are palindromes by themselves.
- All characters are the same in both words.
- Words with no palindromic subsequence spanning both.

### Solution

```python
def longestPalindrome(word1: str, word2: str) -> int:
    # Concatenate the two words to get the full string
    s = word1 + word2
    n = len(s)
    m = len(word1)
    
    # DP array: dp[i][j] is the length of longest palindromic subsequence in s[i..j]
    dp = [[0] * n for _ in range(n)]
    
    # Every single character is a palindrome of length 1
    for i in range(n):
        dp[i][i] = 1
    
    # Fill the DP table
    for length in range(2, n + 1):    # substring length
        for i in range(0, n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                if length == 2:
                    dp[i][j] = 2
                else:
                    dp[i][j] = dp[i + 1][j - 1] + 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

    # Now, consider boundaries: must use ≥1 character from both word1 and word2
    res = 0
    for i in range(m):
        for j in range(m, n):
            if s[i] == s[j]:
                # Palindrome starts at s[i], ends at s[j]
                # The inside part is s[i+1..j-1]
                current_len = dp[i + 1][j - 1] + 2 if i + 1 <= j - 1 else 2
                res = max(res, current_len)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n = len(word1) + len(word2). This is because the DP fills a table of size n × n and each cell is computed in constant time.
- **Space Complexity:** O(n²) for the DP table storing the results for every substring s[i..j].

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reduce the space complexity from O(n²) to O(n)?
  *Hint: Try to only store necessary previous rows/columns since each dp[i][j] only depends on neighboring entries.*

- How would you handle the case where instead of two fixed words, you are given k words?
  *Hint: Consider generalizing the DP to track boundaries for all k parts.*

- What if instead of subsequences, the problem was restricted to substrings?
  *Hint: How would this change the core DP, and could you use a different approach?*

### Summary
This is a classic **dynamic programming** problem—specifically, the *Longest Palindromic Subsequence (LPS)* DP, but with additional boundary constraints requiring at least one character from each of two disjoint string ranges. The coding pattern matches range-based DP on substrings and is seen in other palindrome DP and partition DP problems.  
Recognizing how to restrict solutions to ensure both input strings contribute is key. This approach and pattern are applicable to variations involving “join two (or more) parts to make optimal palindromes or subsequences under certain boundaries.”

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Palindromic Subsequence(longest-palindromic-subsequence) (Medium)