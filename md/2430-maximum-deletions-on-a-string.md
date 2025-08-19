### Leetcode 2430 (Hard): Maximum Deletions on a String [Practice](https://leetcode.com/problems/maximum-deletions-on-a-string)

### Description  
Given a string `s` of lowercase English letters, you can **delete the entire string**, or **repeatedly delete a prefix** if and only if the first i letters are identical to the next i letters (for any 1 ≤ i ≤ ⌊n/2⌋, where n is the length of the current string). After such a deletion, you recursively repeat the process on the remaining suffix.  
The task is to compute the **maximum number of deletions you can perform to delete the whole string**.

### Examples  

**Example 1:**  
Input: `s = "abcabcdabc"`  
Output: `2`  
*Explanation:  
- You can remove the first 3 letters ("abc") since the next 3 are also "abc", leaving "abcdabc".  
- Next, you can remove the first 4 letters ("abcd"), leaving "abc".  
- Now, "abc" can't be split, so delete it as a whole.  
Total deletions: 2.*

**Example 2:**  
Input: `s = "aaabaab"`  
Output: `1`  
*Explanation:  
- No prefix can be deleted as required.  
- Only operation: delete the whole string as one step.*

**Example 3:**  
Input: `s = "ababab"`  
Output: `3`  
*Explanation:  
- Delete the first 2 letters ("ab"), next two are "ab", leaving "abab".  
- Delete next 2 letters ("ab"), next two are also "ab", leaving "ab".  
- Delete entire string.  
Total deletions: 3.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:** Try every possible prefix at each step to see if it can be deleted by matching the next substring, and use recursion to compute the maximum deletions. But this is exponential (too slow).
- **Optimization:**  
  - Notice many subproblems overlap—use DP with memoization: let `dp[i]` be the max deletions for string s[i:].
  - To check if s[i:i+j] == s[i+j:i+2j], we need efficient substring comparisons.
  - Precompute **Longest Common Prefix (LCP)** for every (i, j) position, so we can check if two substrings are identical in O(1).  
- **Final Approach:**  
  - Precompute lcp[i][j]: length of common prefix between s[i:] and s[j:].
  - For each index i (starting from the back), for each possible prefix length j (1 ≤ j ≤ (n - i) // 2), if lcp[i][i+j] ≥ j, update dp[i] from dp[i+j]+1.
  - Take the maximum value at dp.  
- **Trade-offs:**  
  - Substring comparison is bottleneck; LCP table brings it to O(1).  
  - Time and space are both O(n²), which is manageable for moderate n (up to 1000).

### Corner cases to consider  
- Empty string `""` (should trivially return 0).
- All identical characters, e.g., `"aaaaaa"` (maximal splitting).
- No two identical consecutive segments, e.g., `"abcdef"`.
- Very long string with repeated blocks.
- Odd length vs. even length strings.

### Solution

```python
def deleteString(s: str) -> int:
    n = len(s)
    # lcp[i][j] = length of longest common prefix of s[i:] and s[j:]
    lcp = [[0] * (n + 1) for _ in range(n + 1)]

    # Compute lcp from the end so child states are ready for parent states
    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if s[i] == s[j]:
                lcp[i][j] = lcp[i + 1][j + 1] + 1

    # dp[i]: max deletions for s[i:]
    dp = [1] * n
    for i in range(n - 1, -1, -1):
        for j in range(1, (n - i) // 2 + 1):
            # If prefix length j equals next j chars
            if lcp[i][i + j] >= j:
                dp[i] = max(dp[i], dp[i + j] + 1)
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), because LCP table has n² entries and for every i we might check up to O(n) j's.
- **Space Complexity:** O(n²), for the LCP table and the DP array.

### Potential follow-up questions (as if you’re the interviewer)  

- If the string is very long (e.g., n > 10⁵), can you optimize space usage?
  *Hint: Is it possible to avoid building the full LCP table, maybe using rolling hash or KMP-style preprocessing?*

- What if you wanted to return the actual sequence of deletions instead of just their count?
  *Hint: Track the prefix lengths chosen at each DP step to reconstruct the path.*

- Can you solve the problem if characters can be uppercase or string can be unicode?
  *Hint: Does your solution generalize, or do hash/table sizes/character comparisons need adjustment?*

### Summary
This problem uses the **DP with memoization and preprocessing for substring comparison** pattern, building on LCP or hash-based string matching. It's an important template for problems where a substring needs to be compared to another substring efficiently, and where optimal substructure and overlapping subproblems make DP effective. Similar techniques are used in "Longest Duplicate Substring" and "String Compression" type problems.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Shortest Palindrome(shortest-palindrome) (Hard)
- Longest Happy Prefix(longest-happy-prefix) (Hard)
- Remove All Occurrences of a Substring(remove-all-occurrences-of-a-substring) (Medium)