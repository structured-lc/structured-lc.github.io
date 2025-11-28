### Leetcode 3460 (Medium): Longest Common Prefix After at Most One Removal [Practice](https://leetcode.com/problems/longest-common-prefix-after-at-most-one-removal)

### Description  
Given two strings **s** and **t**, return the length of the **longest common prefix** between **s** and **t** after removing at most one character from **s**.  
- You may choose to remove **no character**.
- The "common prefix" means the prefix shared by both strings after possible removal.

For example, given  
s = "madxa", t = "madam"  
You may remove at most one character from s (or none) to maximize the prefix shared with t.

### Examples  

**Example 1:**  
Input: `s = "madxa", t = "madam"`  
Output: `4`  
Explanation: Remove s[3] ('x') to get "mada". The longest common prefix with t is "mada", which is length 4.

**Example 2:**  
Input: `s = "leetcode", t = "eetcode"`  
Output: `7`  
Explanation: Remove s ('l') to get "eetcode". Now s and t match completely, so longest common prefix = 7.

**Example 3:**  
Input: `s = "one", t = "one"`  
Output: `3`  
Explanation: No removal is needed; the full strings match.

**Example 4:**  
Input: `s = "a", t = "b"`  
Output: `0`  
Explanation: The first characters don't match, so the prefix is empty.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try removing each character from s (including the option of removing none, total ⌊n + 1⌋ possibilities), and for each case, compute the longest common prefix between the resulting string and t.  
  This is inefficient for large strings (each removal step is O(n)), leading to O(n²) complexity.

- **Optimized Approach:**  
  Use **two pointers** with a **skip flag**:
    - Iterate both s and t from the start.
    - If characters match, advance both.
    - If characters mismatch and we haven't removed yet, try "skipping" the current character in s exactly once and see how far the prefix goes.
    - Compute two possibilities for each mismatch: one with the skip happening **now**, another with skip not being used (if we have not skipped yet).

  Since we only remove at most one char and want the longest prefix, we can consider, for each position, either matching s and t as-is, or matching after skipping one character in s.  
  This can be handled efficiently with one scan (O(n)) as we'll never need to "backtrack" twice.

  **Why this approach:**  
  - It's much faster (O(n)) and uses only O(1) extra space.
  - We just have to try each possible skip position once.

### Corner cases to consider  
- Both strings identical; should return their length.
- First characters don't match; should return 0.
- s is length 1; after removal it's empty (prefix is at most 0 or 1).
- s and t have no matching prefix at all.
- The optimal removal is not the first mismatch (e.g. removing later gives longer match).
- Removing **no** character might be optimal.

### Solution

```python
def longestCommonPrefixAfterDeletion(s: str, t: str) -> int:
    def common_prefix(sa, ta):
        # Compute length of prefix match between sa and ta
        n = min(len(sa), len(ta))
        for i in range(n):
            if sa[i] != ta[i]:
                return i
        return n

    n = len(s)
    max_len = 0

    # Try removing no character
    max_len = common_prefix(s, t)

    # Try removing s[i] for all 0 ≤ i < n
    for i in range(n):
        # Remove s[i] and compare prefix with t
        s_removed = s[:i] + s[i+1:]
        curr_len = common_prefix(s_removed, t)
        max_len = max(max_len, curr_len)

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in this brute-force form (since for each position in s you may remove, you compare up to n with t).  
For a tighter O(n) solution, you could implement a two-pointers method with a skip flag.

- **Space Complexity:** O(1) extra space (ignoring input strings; we only use a few variables, not counting any string slicing since that's O(n) per slice).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle much larger strings (length up to 10⁶)?
  *Hint: Try to avoid O(n²) time or repeated string slicing—can you do this with constant space and linear time?*

- What if you're allowed to remove at most k characters from s?
  *Hint: Consider dynamic programming approaches, tracking skips used so far.*

- What changes if removal is allowed on both s and t?
  *Hint: Now the problem becomes more like edit distance calculation.*

### Summary
This problem combines the **longest common prefix** pattern with **one allowed skip** (or edit) on the source string. The brute-force solution is straightforward but not optimal for large inputs. The common interview optimization is using a **two-pointer technique with a skip flag**, which is a classic approach for "allow one mistake/skip" prefix and substring comparison problems. This is a common string manipulation and two-pointer interview pattern, also relevant for problems like substring search with errors, Plagiarism detection, or near-duplicate matching.


### Flashcard
Two-pointer with skip flag: match s and t character-by-character, allowing at most one character skip in s to maximize common prefix length.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Longest Common Prefix(longest-common-prefix) (Easy)