### Leetcode 87 (Hard): Scramble String [Practice](https://leetcode.com/problems/scramble-string)

### Description  
Given two strings **s1** and **s2** of the same length, determine if **s2** is a scrambled version of **s1**. A scrambled string is defined recursively:  
- If the strings are equal, they are scrambled.  
- Otherwise, you can split **s1** into two non-empty substrings at any index and swap or not swap the two halves, then recursively check if the scrambled result equals **s2**.  
The goal: return **True** if **s2** can be obtained from **s1** by performing any sequence of these split/swap operations, otherwise return **False**.

### Examples  

**Example 1:**  
Input: `s1 = "great", s2 = "rgeat"`  
Output: `True`  
*Explanation: "great" → split as "gr" + "eat", swap: "eatgr" → split "eat" as "e" + "at", don't swap: "e"+"at"+"gr" → result "rgeat".*

**Example 2:**  
Input: `s1 = "abcde", s2 = "caebd"`  
Output: `False`  
*Explanation: No way to split and scramble "abcde" to form "caebd".*

**Example 3:**  
Input: `s1 = "a", s2 = "a"`  
Output: `True`  
*Explanation: Both strings are the same.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try every possible way to split both strings and recursively check for all combinations with/without swapping. For each split, try both the unswapped and swapped possibilities. Base cases: if strings are equal (return True), or have different character sets (return False).
  - But this leads to a huge number of recursive calls (exponential).

- **Optimization with DP:**  
  Use memoization to avoid redundant work.  
  - Formulate recursion based on substrings: `isScramble(s1[i:i+length], s2[j:j+length])`
  - Store results in a 3D DP cache: `dp[i][j][length]` = True/False if `s1[i:i+length]` is a scramble of `s2[j:j+length]`.
  - At every level, try every possible split and check recursively if (splitA==splitB and splitB==splitA) for unswapped and swapped combinations.

- **Why DP:**  
  Because many subproblems repeat. DP turns the exponential recursion into O(n⁴) by storing intermediate results.

### Corner cases to consider  
- Both strings are empty: should return True.
- Strings are the same (single character or entire string).
- Strings of different lengths: should return False (guaranteed equal length here).
- One or both strings contain repeated characters.
- Scramble with all characters same: e.g., "aaa", "aaa".

### Solution

```python
def isScramble(s1: str, s2: str) -> bool:
    # Length check
    n = len(s1)
    if n != len(s2):
        return False

    # When the two strings are equal, it's trivially a scramble
    if s1 == s2:
        return True

    # Fast fail: different character counts
    if sorted(s1) != sorted(s2):
        return False

    # 3D DP table: dp[length][i][j] = s1[i:i+length] scramble s2[j:j+length]
    dp = [[[False] * n for _ in range(n)] for _ in range(n + 1)]

    # Base case: substrings of length 1
    for i in range(n):
        for j in range(n):
            dp[1][i][j] = s1[i] == s2[j]

    # Build up for lengths 2..n
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            for j in range(n - length + 1):
                for k in range(1, length):
                    # Unswapped: s1[i:i+k] with s2[j:j+k], s1[i+k:i+length] with s2[j+k:j+length]
                    if dp[k][i][j] and dp[length - k][i + k][j + k]:
                        dp[length][i][j] = True
                        break
                    # Swapped: s1[i:i+k] with s2[j+length-k:j+length], s1[i+k:i+length] with s2[j:j+length-k]
                    if dp[k][i][j + length - k] and dp[length - k][i + k][j]:
                        dp[length][i][j] = True
                        break

    return dp[n][0][0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n⁴)  
  *Justification:* For each substring length (n levels), n² possible (i,j) starting pairs, and for each, up to n splits.
  
- **Space Complexity:** O(n³)  
  *Justification:* The DP table stores state for (length, i, j), i.e., (n+1) × n × n.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize space usage?
  *Hint: Since DP builds only on smaller substrings, consider rolling arrays or hash maps.*

- What if s1 and s2 could be different lengths?
  *Hint: Add length checks and clarify input guarantees.*

- How would you modify the function if repeated scrambling yields the same string (idempotent)?
  *Hint: Analyze if problem constraints or recurrence changes.*

### Summary
This problem uses **dynamic programming** over substrings (a classic 3D DP pattern – similar to problems like palindrome partitioning, regular expression matching). The key ideas are recursive decomposition and memoization. Recognizing overlapping subproblems and substructure is essential for scalability. The DP pattern here appears for many substring comparison or string segment problems, and is good practice for tricky DP interviews.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
