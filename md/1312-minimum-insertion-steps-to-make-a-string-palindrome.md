### Leetcode 1312 (Hard): Minimum Insertion Steps to Make a String Palindrome [Practice](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome)

### Description  
Given a string s, return the minimum number of insertions required to make s a palindrome. You can insert any character at any position in the string any number of times.

### Examples  
**Example 1:**  
Input: `s = "zzazz"`  
Output: `0`  
*Explanation: The string is already a palindrome.*

**Example 2:**  
Input: `s = "mbadm"`  
Output: `2`  
*Explanation: Insert 'b' at end: mbadmb, then 'a' at end: mbadbam; now palindrome with 2 insertions.*

**Example 3:**  
Input: `s = "leetcode"`  
Output: `5`  
*Explanation: Insert 'e' 4 times and 'l' once for a palindrome ("leetcodocteel").*

### Thought Process (as if you’re the interviewee)  
The core insight: The least number of insertions needed equals the string length minus the length of the longest palindromic subsequence (LPS) in s. If you can keep the LPS as is, all other characters must be inserted (mirrored) to make the whole string a palindrome.

An efficient way is to use DP. Let dp[i][j] = minimum insertions to make s[i..j] a palindrome. If s[i] == s[j], no insertion needed at those ends; dp[i][j] = dp[i+1][j-1]. If not equal, insert character on the left or right: dp[i][j] = min(dp[i+1][j], dp[i][j-1]) + 1.

### Corner cases to consider  
- An already palindromic string.
- Single character string.
- Empty string (should be 0).
- All characters different (worst case).

### Solution

```python
def minInsertions(s):
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n+1):  # window size
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1]
            else:
                dp[i][j] = min(dp[i+1][j], dp[i][j-1]) + 1
    return dp[0][n-1] if n else 0
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²), for double loop over substring starts and ends.
- **Space Complexity:** O(n²), storing DP table.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize the space to O(n)?  
  *Hint: Only previous row needed at each stage, use rolling array.*

- How to actually construct the palindrome with minimum insertions?  
  *Hint: Trace through dp table, build string by decisions.*

- What if string is very long (n > 10⁴)?  
  *Hint: DP is too slow; use center expansion or approximate methods.*

### Summary
This classic problem reduces to finding longest palindromic subsequence and uses the DP table over all substrings. It's an archetype of dynamic programming on substrings, commonly seen in editing distance and palindromic sequence problems.