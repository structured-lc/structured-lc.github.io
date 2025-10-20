### Leetcode 712 (Medium): Minimum ASCII Delete Sum for Two Strings [Practice](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings)

### Description  
Given two strings, **s₁** and **s₂**, return the *minimum possible sum* of ASCII values of characters you need to delete from the two strings so that the resulting strings are equal.  
You can delete characters from either string in any order. The goal is to make the two strings exactly equal, minimizing the total deleted ASCII values.

### Examples  

**Example 1:**  
Input: `s1 = "sea", s2 = "eat"`  
Output: `231`  
*Explanation: Delete `'s'` from "sea" (ASCII 115) and `'t'` from "eat" (ASCII 116).  
Sum = 115 + 116 = 231.*

**Example 2:**  
Input: `s1 = "delete", s2 = "leet"`  
Output: `403`  
*Explanation:  
Delete `'d'` and `'e'` from "delete" (ASCII 100 + 101), or any set leading to matching strings. The minimum sum of ASCII deleted is 403.*

**Example 3:**  
Input: `s1 = "ab", s2 = "cd"`  
Output: `394`  
*Explanation: Need to delete all characters: `'a'` (97), `'b'` (98), `'c'` (99), `'d'` (100).  
Total = 97 + 98 + 99 + 100 = 394.*


### Thought Process (as if you’re the interviewee)  
Brute-force: Try every possible way to delete characters from both strings until they are equal, keeping track of ASCII sum. This is clearly exponential and intractable for strings of reasonable length.

Optimization: This problem is best suited for **dynamic programming**—it's very similar to finding the minimum edit distance, but instead of counting operations, we sum ASCII values of deleted characters.

Key idea:  
- Use a 2D DP table where `dp[i][j]` is the minimum ASCII delete sum needed to make `s1[i:]` and `s2[j:]` equal.
- If `s1[i]` == `s2[j]`, we don't need to delete either; move both pointers forward.
- Else, try deleting either `s1[i]` or `s2[j]` and take the minimum sum among both choices.

Recurrence:
- If s1[i] == s2[j]:  
   dp[i][j] = dp[i+1][j+1]
- Else:  
   dp[i][j] = min( ASCII(s1[i]) + dp[i+1][j], ASCII(s2[j]) + dp[i][j+1] )

Initialize:
- If we run out of one string (i.e., i==len(s1)), we must delete all remaining characters from s2. Similarly for s1.

This problem is bottom-up tabulation, with DP table size (len(s1)+1) × (len(s2)+1).

### Corner cases to consider  
- One or both strings are empty (must delete all characters from the non-empty one).
- Strings are already equal (no deletions required; sum is 0).
- Strings have no common characters (must delete all characters from both).
- Repeated characters and substring matches.
- Large strings (ensure O(mn) solution, where m and n are string lengths).

### Solution

```python
def minimumDeleteSum(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    # dp[i][j]: min ASCII delete sum for s1[i:] and s2[j:]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases: delete all remaining characters
    for i in range(m - 1, -1, -1):
        dp[i][n] = dp[i + 1][n] + ord(s1[i])
    for j in range(n - 1, -1, -1):
        dp[m][j] = dp[m][j + 1] + ord(s2[j])

    # Fill the table bottom up
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if s1[i] == s2[j]:
                dp[i][j] = dp[i + 1][j + 1]  # No deletion needed
            else:
                # Minimum of deleting s1[i] or deleting s2[j]
                dp[i][j] = min(
                    ord(s1[i]) + dp[i + 1][j],
                    ord(s2[j]) + dp[i][j + 1]
                )
    return dp[0][0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n), where m = len(s1) and n = len(s2).  
  Because we fill each cell in the DP matrix exactly once.
- **Space Complexity:** O(m×n) for the DP table.  
  This can be optimized to O(min(m,n)) if we only keep two rows at a time, but O(m×n) is standard and easiest to reason about.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you optimize the space usage further?  
  *Hint: Only previous and current rows are needed at any time.*

- What if deletion had unequal costs or costs were given instead of ASCII?  
  *Hint: Replace ord(s1[i]) and ord(s2[j]) with given costs.*

- How would you return the actual sequence of deleted characters, not just the sum?  
  *Hint: Store the choice at each step and reconstruct via tracing back through DP.*

### Summary
This problem is a classic example of **2D dynamic programming** for string similarity, very similar to edit distance, longest common subsequence, and minimum insert/delete distance problems. The main twist is optimizing for sum of deleted ASCII values instead of operation counts.  
This approach is broadly useful for any problems involving optimal subsequences or minimum change costs on two sequences.


### Flashcard
Use DP where dp[i][j] is the minimum ASCII delete sum to make s1[i:] and s2[j:] equal; recurse by deleting from either string.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Edit Distance(edit-distance) (Medium)
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- Delete Operation for Two Strings(delete-operation-for-two-strings) (Medium)