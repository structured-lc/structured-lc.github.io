### Leetcode 730 (Hard): Count Different Palindromic Subsequences [Practice](https://leetcode.com/problems/count-different-palindromic-subsequences)

### Description  
Given a string **s** consisting only of the characters 'a', 'b', 'c', and 'd', count how many **distinct non-empty palindromic subsequences** are present in **s**.  
- A subsequence can be formed by deleting zero or more characters (not necessarily contiguous) but keeping the order.
- A palindrome reads the same forward and backward.
- Two subsequences are considered different if they differ at any position.
- Return the answer **modulo** 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `s = "bccb"`  
Output: `6`  
Explanation: The 6 different non-empty palindromic subsequences are `'b'`, `'c'`, `'bb'`, `'cc'`, `'bcb'`, `'bccb'`.

**Example 2:**  
Input: `s = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"`  
Output: `104860361`  
Explanation: There are 3,104,860,382 different non-empty palindromic subsequences, which equals 104,860,361 modulo 10⁹ + 7.

**Example 3:**  
Input: `s = "a"`  
Output: `1`  
Explanation: Only palindromic subsequence is `'a'`.

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  Try generating all possible subsequences, for each check if it’s a palindrome, and count unique ones.  
  **Issues:** Time complexity is exponential (2ⁿ subsequences + duplicate checks), not feasible for n up to 1000.

- **Observations:**  
  - Only need to consider 'a', 'b', 'c', 'd', so can tailor solution.
  - Count *distinct* palindromic subsequences, not just total.

- **Optimal Approach:**  
  Use **Dynamic Programming**.  
  - Define **dp[i][j][k]** as the number of palindromic subsequences in s[i:j+1] that start and end with the kᵗʰ character ('a', 'b', 'c', or 'd').
  - For every [i, j], for each character c:
    - If s[i] == s[j] == c:
      - The palindromic subsequences are:
        - "c"
        - "cc" if i ≠ j
        - All palindromic subsequences inside s[i+1:j] that start/end with any character, can be wrapped with c at left/right.
        - So: dp[i][j][k] = 2 + sum of dp[i+1][j-1][:] (sum over all 4 letters)
    - If s[i] != c, then skip s[i] (dp[i+1][j][k])  
    - If s[j] != c, then skip s[j] (dp[i][j-1][k])
    - If neither are c, only look inside (dp[i+1][j-1][k])

  - Initialize dp[i][i][k] = 1 if s[i] == kᵗʰ char.
  - Final answer: sum over k = 0..3 of dp[n-1][k].

- **Why DP works:**  
  Avoids duplicate subsequences, only counts unique, is feasible for input size (O(n² \* 4)).

### Corner cases to consider  
- Empty string (not allowed by constraints, but should handle)
- One character
- String with all same character (e.g., "aaaaaa")
- String with all distinct characters ("abcd")
- Alternate characters ("ababab", "cdcdcd")
- Very long string (n=1000)

### Solution

```python
def countPalindromicSubsequences(s):
    MOD = 10**9 + 7
    n = len(s)
    # dp[i][j][k]: number of palindromic subsequences in s[i:j+1]
    # that start and end with chr(ord('a') + k)
    dp = [[[0] * 4 for _ in range(n)] for _ in range(n)]

    for i in range(n):
        for k in range(4):
            if ord(s[i]) - ord('a') == k:
                dp[i][i][k] = 1

    for length in range(2, n + 1):
        for i in range(0, n - length + 1):
            j = i + length - 1
            for k in range(4):
                ch = chr(ord('a') + k)
                if s[i] == s[j] == ch:
                    # 2: 'ch' and 'chch' (if i != j) + all palindromic subsequences inside
                    dp[i][j][k] = 2
                    if j > i + 1:
                        for m in range(4):
                            dp[i][j][k] += dp[i + 1][j - 1][m]
                    dp[i][j][k] %= MOD
                else:
                    val = 0
                    if s[i] != ch:
                        val += dp[i + 1][j][k]
                    if s[j] != ch:
                        val += dp[i][j - 1][k]
                    if s[i] != ch and s[j] != ch:
                        val -= dp[i + 1][j - 1][k]
                    dp[i][j][k] = val % MOD

    return sum(dp[0][n - 1][k] for k in range(4)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 4) (where n is the length of s, and 4 for the different possible starting/ending characters)
- **Space Complexity:** O(n² × 4) for the DP array

### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed characters set is arbitrary, not just 'a'-'d'?  
  *Hint: How would your DP scale if there were more distinct characters?*

- Can you recover all palindromic subsequences, not just count them?  
  *Hint: Consider memory and output constraints.*

- How would the solution change if you only need the count of *all* (not unique) palindromic subsequences?  
  *Hint: Standard DP over pairs (i, j), without the set uniqueness requirement.*

### Summary
This problem is a classic **Dynamic Programming over substrings + states** problem, using a 3D DP table to eliminate duplicates and efficiently count unique palindromic subsequences.  
The DP patterns here (start/end constraints, inclusion-exclusion) are broadly applicable in many substring/subsequence and counting problems.