### Leetcode 2484 (Hard): Count Palindromic Subsequences [Practice](https://leetcode.com/problems/count-palindromic-subsequences)

### Description  
Given a string s consisting of only the characters 'a', 'b', 'c', and 'd', return the number of **different non-empty palindromic subsequences** in s.  
A **subsequence** is any sequence that can be derived from s by deleting some or no characters without changing the order.  
A **palindrome** is any sequence that reads the same forwards and backwards.  
Two palindromic subsequences are considered **different** if their composition or their positions in the string are different.  
The result can be very large, so return it modulo 1,000,000,007.

### Examples  

**Example 1:**  
Input: `"bccb"`  
Output: `6`  
Explanation:  
Distinct palindromic subsequences are: `"b"`, `"c"`, `"bb"`, `"cc"`, `"bcb"`, `"bccb"`.

**Example 2:**  
Input: `"abcd"`  
Output: `4`  
Explanation:  
Each character alone is a palindrome: `"a"`, `"b"`, `"c"`, `"d"`. No longer palindrome exists.

**Example 3:**  
Input: `"aaa"`  
Output: `3`  
Explanation:  
Distinct palindromic subsequences: `"a"`, `"aa"`, `"aaa"`.


### Thought Process (as if you’re the interviewee)  
First, brute-force would require generating all subsequences and checking for palindromicity, but this is exponential and not feasible for n up to 1000.  
To optimize, notice that **DP** can be used: For each substring s[i:j], count the number of distinct palindromic subsequences.  
- Let dp[i][j] be the number of distinct palindromic subsequences in s[i..j].  
- If s[i] == s[j], any palindrome in s[i+1..j-1] can have s[i] and s[j] attached to both ends, making new longer palindromes.  
- We must avoid double-counting subsequences; distinguishing if two ends have the same character and if inner substrings have that character.  
- We need to handle overlapping palindromes through inclusion/exclusion.  
- Use memoization with top-down recursion or a bottom-up table.  
- Since the character set is only 'a', 'b', 'c', 'd', we may be able to optimize further, but the generic DP works well for n up to 1000.

Trade-offs:
- DP approach brings time complexity down to O(n²).
- We need to be careful not to double count, and need to use modulo at each step to avoid overflow.

### Corner cases to consider  
- Empty string (n = 0): should not occur by constraints.
- All characters equal (e.g., "aaaa").
- All distinct characters.
- Palindrome in the whole string.
- String of length 1.

### Solution

```python
# Count distinct non-empty palindromic subsequences in s (only 'a'-'d'), modulo 1_000_000_007

def countPalindromicSubsequences(s: str) -> int:
    MOD = 10**9 + 7
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    # Single letter substrings => 1 distinct palindrome
    for i in range(n):
        dp[i][i] = 1
    
    # Consider substrings of increasing length
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                left = i + 1
                right = j - 1
                # Move inwards: find first s[left] == s[i] and s[right] == s[j]
                while left <= right and s[left] != s[i]:
                    left += 1
                while left <= right and s[right] != s[j]:
                    right -= 1
                if left > right:
                    # s[i] and s[j] are unique in s[i+1..j-1]
                    dp[i][j] = 2 * dp[i + 1][j - 1] + 2
                elif left == right:
                    # one more s[i] in s[i+1..j-1]
                    dp[i][j] = 2 * dp[i + 1][j - 1] + 1
                else:
                    # more than one s[i] in s[i+1..j-1]
                    dp[i][j] = 2 * dp[i + 1][j - 1] - dp[left + 1][right - 1]
            else:
                # Exclude s[i] or s[j]
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]
            dp[i][j] %= MOD
    return dp[0][n - 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since we fill a 2D dp table of size n × n, and each cell does O(1) work (except the pointers, but they sum to O(n) per row).
- **Space Complexity:** O(n²) for the dp table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string can have more than four characters (e.g., arbitrary lowercase letters)?  
  *Hint: How does the solution scale and does the exclusive inclusion logic change?*

- How would you retrieve the actual palindromic subsequences, instead of just counting?  
  *Hint: Can you reconstruct via backtracking through the dp table?*

- Can this be made space-efficient if only the count and not the path is required?  
  *Hint: Can DP be reduced to O(n) with rolling arrays?*


### Summary
This problem is a classic application of **dynamic programming on substrings**, especially for palindromic counting or generation.  
It appears in many related problems (count palindrome substrings, longest palindromic subsequence, etc).  
The most challenging part is **avoiding double-counting** by inclusion-exclusion in overlapping cases.  
The use of two pointers to find copies inside the substring s[i+1..j-1] is a common trick for such problems.


### Flashcard
DP on substrings: if s[i] = s[j], dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1] + (dp[i+1][j-1] + 1).

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Arithmetic Slices II - Subsequence(arithmetic-slices-ii-subsequence) (Hard)
- Count Different Palindromic Subsequences(count-different-palindromic-subsequences) (Hard)
- Unique Length-3 Palindromic Subsequences(unique-length-3-palindromic-subsequences) (Medium)