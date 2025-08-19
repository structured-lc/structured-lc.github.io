### Leetcode 132 (Hard): Palindrome Partitioning II [Practice](https://leetcode.com/problems/palindrome-partitioning-ii)

### Description  
Given a string `s`, partition it so that every substring in the partition is a **palindrome**. The goal is to find the **minimum number of cuts** needed—each cut splits the string between two characters. Each substring between cuts must be a palindrome.  
For example, for `"aab"`, we want to make as few cuts as possible such that every resulting substring is a palindrome.  

### Examples  

**Example 1:**  
Input: `s = "aab"`  
Output: `1`  
*Explanation: Cut after "aa" → "aa" | "b". Both substrings are palindromes. Only 1 cut needed.*

**Example 2:**  
Input: `s = "a"`  
Output: `0`  
*Explanation: A single character is always a palindrome, so 0 cuts are needed.*

**Example 3:**  
Input: `s = "ab"`  
Output: `1`  
*Explanation: Only possible palindrome partitions are "a" | "b". Each letter is a palindrome, so 1 cut is needed.*

### Thought Process (as if you’re the interviewee)  
First, consider a brute-force approach: try every possible way to cut the string and check each substring to see if it is a palindrome. This explodes combinatorially and is too slow for large `n`.

To optimize:
- For each possible cut, check if the substring after the cut is a palindrome. If it is, add 1 to the minimum cuts from the prefix.
- Since **checking for palindromes repeatedly** is expensive, precompute and store which substrings are palindromes in a 2D table.
- Use **Dynamic Programming (DP)**:
  - Let `dp[i]` be the minimum cuts needed for `s[0:i+1]`.
  - For every `j ≤ i`, if `s[j:i+1]` is a palindrome, then `dp[i] = min(dp[i], dp[j-1]+1)` (if `j > 0`), else if `j==0`, then `dp[i] = 0`.

Why choose this DP approach:
- **Time**: Can check and cut palindromic substrings in O(n²).
- **Trade-offs**: Uses O(n²) space for palindrome table but runs fast enough for n up to 2000.

### Corner cases to consider  
- String of length 1 (already a palindrome, 0 cuts).
- String where all characters are the same (e.g. "aaa").
- String with no palindromic substrings longer than 1.
- Palindrome at the beginning or end.
- Empty input (not possible per constraints but worth considering).

### Solution

```python
def minCut(s: str) -> int:
    n = len(s)
    # palindrome[i][j] = True if s[i:j+1] is a palindrome
    palindrome = [[False] * n for _ in range(n)]

    # Single letters are palindromes
    for i in range(n):
        palindrome[i][i] = True

    # Check for palindromes of length 2+
    for length in range(2, n + 1):
        for i in range(0, n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                if length == 2 or palindrome[i + 1][j - 1]:
                    palindrome[i][j] = True

    # dp[i]: min cuts needed for s[0:i+1]
    dp = [float('inf')] * n

    for i in range(n):
        if palindrome[0][i]:  # whole s[0..i] is palindrome
            dp[i] = 0
        else:
            for j in range(1, i + 1):
                if palindrome[j][i]:
                    dp[i] = min(dp[i], dp[j - 1] + 1)
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). Preprocessing all palindromic substrings takes O(n²). Each dp[i] iteration checks up to i substrings.
- **Space Complexity:** O(n²) to store the palindrome table for all substring pairs, and O(n) for the dp array.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize space further?
  *Hint: Could you avoid the full O(n²) palindrome table, perhaps only storing for current and previous rows?*
- What if the string `s` is very long (e.g., >10⁵), but you only need to output the cut positions, not the count?
  *Hint: Try modifying DP or using memory-efficient palindrome checks “on the fly”.*
- How would you list all minimal-cut palindromic partitions?
  *Hint: Trace back all minimum-cut partitions with a path or parent array.*

### Summary
Uses the **"Palindrome DP"** or "Minimum Cuts DP" pattern: precompute and reuse palindrome sub-results. Dynamic Programming is critical here for both checking substrings and propagating minimum cut results.  
Patterns from this problem are widely reusable for toughest palindrome and substring splitting problems, including Leetcode 131, word breaks, and interval DP.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Palindrome Partitioning(palindrome-partitioning) (Medium)
- Palindrome Partitioning IV(palindrome-partitioning-iv) (Hard)
- Maximum Number of Non-overlapping Palindrome Substrings(maximum-number-of-non-overlapping-palindrome-substrings) (Hard)
- Number of Great Partitions(number-of-great-partitions) (Hard)