### Leetcode 97 (Medium): Interleaving String [Practice](https://leetcode.com/problems/interleaving-string)

### Description  
Given three strings **s1**, **s2**, and **s3**, determine if **s3** is formed by an *interleaving* of **s1** and **s2**.  
*Interleaving* means that when merging the characters of **s1** and **s2** to form **s3**, both strings must retain their original left-to-right order, but characters from each can be chosen in any sequence. Each character from **s1** and **s2** must be used exactly once, and all characters must appear in **s3**.

### Examples  

**Example 1:**  
Input: `s1 = "aab"`, `s2 = "axy"`, `s3 = "aaxaby"`  
Output: `True`  
*Explanation: Take 'a' from s1, 'a' from s1, 'x' from s2, 'a' from s1, 'b' from s1, and 'y' from s2. All letters from s1 and s2 appear in order in s3, so it's a valid interleaving.*

**Example 2:**  
Input: `s1 = "abc"`, `s2 = "def"`, `s3 = "adbcef"`  
Output: `True`  
*Explanation: Possible interleaving: a(s1), d(s2), b(s1), c(s1), e(s2), f(s2). s1 and s2 keep their internal order.*

**Example 3:**  
Input: `s1 = "aa"`, `s2 = "ab"`, `s3 = "abaa"`  
Output: `False`  
*Explanation: 's3' can't be made by combining 's1' and 's2' while preserving the order of both.*

### Thought Process (as if you’re the interviewee)  
Brute-force would try every possible way of picking from s1 or s2 at each step to match s3, creating a tree of recursive calls.  
But this has exponential time, as at each step there are two choices (take from s1 or s2), leading to lots of overlapping subproblems.

To optimize, we can use **dynamic programming**.  
- Let’s define `dp[i][j]` as True if s1 up to index i and s2 up to j can form s3 up to i + j.
- If the characters match (either from s1 or s2), check if the previous state is True.
- Base case: `dp = True`
- Gradually build dp table up to dp[len(s1)][len(s2)].

For space optimization, since at each step we only need the previous row, a 1D array of size len(s2)+1 suffices.

### Corner cases to consider  
- s1, s2, or s3 are empty (including all empty)
- Length mismatch (`len(s1) + len(s2) != len(s3)`)
- Repeating characters in s1 or s2
- s3 has extra/missing characters not in s1 or s2
- Both s1 and s2 have similar prefixes or suffixes
- Strings with only one character

### Solution

```python
def isInterleave(s1: str, s2: str, s3: str) -> bool:
    # If the lengths don't add up, s3 can't be an interleaving
    if len(s1) + len(s2) != len(s3):
        return False

    # dp[j]: whether s1[:i], s2[:j] can form s3[:i + j]
    dp = [False] * (len(s2) + 1)
    dp[0] = True

    # First, fill dp for s2 only (s1 is empty)
    for j in range(1, len(s2) + 1):
        dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
        
    for i in range(1, len(s1) + 1):
        # For j == 0, s2 is empty
        dp[0] = dp[0] and s1[i - 1] == s3[i - 1]
        for j in range(1, len(s2) + 1):
            # From top or left in dp table
            dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or \
                    (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) where m = len(s1), n = len(s2). Each cell in the DP table is computed once.
- **Space Complexity:** O(n), where n = len(s2). We only use a single 1D array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to actually construct all possible interleavings, not just check feasibility?  
  *Hint: Try a backtracking approach. Can you optimize with memoization?*

- How would you handle streaming input, where s3 arrives one character at a time?  
  *Hint: Can you use a rolling DP as the stream progresses?*

- What about if there are more than two strings?  
  *Hint: How can you generalize the DP table dimensions? Consider k-dimensional DP.*

### Summary
The problem uses the **dynamic programming** pattern, optimizing a brute-force recursion via state memoization (2D to 1D array for space).  
It’s a classical *string DP* problem seen in parsing, edit distance, and merge problems.  
This pattern is broadly applicable anywhere you need to check if one sequence can be built by interleaving multiple sub-sequences while preserving their internal ordering.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
