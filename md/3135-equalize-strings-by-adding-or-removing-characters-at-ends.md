### Leetcode 3135 (Medium): Equalize Strings by Adding or Removing Characters at Ends [Practice](https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends)

### Description  
Given two strings `initial` and `target`, you may, in each operation, add any character at the beginning or end of `initial`, or remove any character from the beginning or end. Compute the minimum number of such operations needed to transform `initial` into `target`.

In practical terms: At each step, you may remove or add a character to either end of the string you are building. Your goal is to match `initial` to `target` with as few such actions as possible.

### Examples  

**Example 1:**  
Input: `initial = "axxy", target = "yabx"`  
Output: `6`  
Explanation:  
Add 'y' to the front: "yaxxy"  
Remove from end: "yaxx"  
Remove from end: "yax"  
Remove from end: "ya"  
Add 'b' to end: "yab"  
Add 'x' to end: "yabx"  
Total = 6 operations.

**Example 2:**  
Input: `initial = "abcde", target = "xdeab"`  
Output: `8`  
Explanation:  
Longest common substring is "de".  
Remove 'a', 'b', 'c' from start of initial (3) → "de"  
Add 'x', 'a', 'b' to end of result (3), add 'x' to front (1), add 'b' to end (1)  
(Alternatively, different orderings, but minimum number of needed operations is 8.)

**Example 3:**  
Input: `initial = "xyz", target = "xyz"`  
Output: `0`  
Explanation:  
No operations are needed as both strings are already equal.

### Thought Process (as if you’re the interviewee)  
- First, notice that the allowed operations (add/remove at either end) mean we can only "align" substrings at any position.  
- The goal is to make the two strings equal using minimum number of steps. If there is any substring that appears unchanged (i.e., a contiguous substring) in both initial and target, then we can leave this part untouched and only need to transform the non-overlapping parts.  
- The core insight is to find the longest **common substring** between `initial` and `target`. Suppose such a substring is of length `mx`.  
- Then, we remove any characters in `initial` not belonging to the substring (m - mx total removes) and add any missing in `target` (n - mx total adds), where m and n are the lengths of initial and target, respectively.  
- Thus, the minimal number of moves is:  
    - number of elements to delete from initial = m - mx  
    - number of elements to add to reach target = n - mx  
    - total = (m - mx) + (n - mx) = m + n - 2 × mx  
- The problem thus reduces to calculating the **longest common substring** (not subsequence!), which can be done in O(m × n) using DP.

### Corner cases to consider  
- Both strings already equal (expect 0).
- No common substring at all (must remove all from initial, add all from target).
- Initial or target is length 1.
- One string is a substring of the other.
- Both strings empty (problem constraint: length ≥ 1, so this shouldn't occur).

### Solution

```python
def minOperations(initial: str, target: str) -> int:
    m, n = len(initial), len(target)
    # dp[i][j]: longest common substring ending at initial[i-1] and target[j-1]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if initial[i - 1] == target[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
            else:
                dp[i][j] = 0
    # Result: m + n - 2 × max_len
    return m + n - 2 * max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  We fill a DP table of size (m + 1) × (n + 1), updating each cell once.
- **Space Complexity:** O(m × n), due to the DP table.  
  Space can be reduced to O(min(m, n)) if rolling arrays are used, since only previous row is required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only add/remove characters from the end (not the front)?  
  *Hint: How does that restrict possible substrings you can align?*

- Can the solution be improved for very long strings (e.g., up to 10⁶ in length)?  
  *Hint: Consider whether a suffix automaton or rolling hash can help find the longest common substring faster.*

- What if instead of substrings, you were allowed to match any subsequence?  
  *Hint: Think about Longest Common Subsequence (LCS) DP or optimized variants.*

### Summary
This problem uses the classic **dynamic programming** pattern for **longest common substring** detection, then a simple arithmetic transformation to compute the minimal required changes. The key realization is aligning the largest unchanged block possible (“anchor”) and minimizing left/right edits. Similar substring DP scans are common in edit-distance, diff, and string alignment problems.

### Tags
String(#string), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window), Hash Function(#hash-function)

### Similar Problems
