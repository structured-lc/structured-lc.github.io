### Leetcode 2565 (Hard): Subsequence With the Minimum Score [Practice](https://leetcode.com/problems/subsequence-with-the-minimum-score)

### Description  
Given two strings **s** and **t**, your task is to make **t** a subsequence of **s** by removing a contiguous segment from **t** (possibly none, possibly all). The "score" of such a removal is `right - left + 1`, where `left` and `right` are the indices of the first and last removed characters. Your goal is to minimize this score, that is, to remove the smallest possible segment (possibly of length 0 if no removal is needed) so that the remaining characters of **t** (in order) form a subsequence of **s**.

### Examples  

**Example 1:**  
Input: `s = "abacaba", t = "bzaa"`  
Output: `1`  
*Explanation: Remove t[1], which is 'z'. The resulting "baa" is a subsequence of s. So, score = 1.*

**Example 2:**  
Input: `s = "abcde", t = "axcde"`  
Output: `1`  
*Explanation: Remove t[1], which is 'x'. The remaining string "acde" is a subsequence of "abcde".*

**Example 3:**  
Input: `s = "abcdef", t = "abcdef"`  
Output: `0`  
*Explanation: t is already a subsequence of s; nothing needs to be removed.*

### Thought Process (as if you’re the interviewee)  

The brute-force approach would try all possible segments to remove from **t** and check in each case if the remaining characters of **t** (after removal) form a subsequence of **s**. That would involve O(n²) possible removals and an O(m + n) check for each (where m = len(s), n = len(t)), which is too slow.

To optimize:
- Notice you can precompute where `t[0:k]` is a prefix subsequence of **s** and where `t[l:]` is a suffix subsequence of **s**.
- Use two pointers or arrays: 
  - `left[i]` is the minimum index in **s** so that `t[0:i]` is a subsequence of `s[0:left[i]]`.
  - `right[i]` is the maximum index in **s** for which `t[i:]` is a subsequence of `s[right[i]:]`.
- For every possible segment `t[l:r]` to remove, left up to `l-1` and right from `r` should together form a subsequence of s without overlapping. Using precomputed indices, check this efficiently.

Thus, the solution is to optimize by,
- Precomputing for all prefixes and suffixes.
- Scanning through all possible removal positions in O(n) time, keeping track of the best score.

This is a classic application of two-pointer or sliding window techniques, and also uses the principle of precomputing prefix and suffix relations.

### Corner cases to consider  
- **t** is already a subsequence of **s** (score = 0).
- All of **t** must be removed (no character forms a subsequence, score = len(t)).
- **t** is empty (score = 0).
- Duplicate characters or all characters the same in **t**.
- **t** longer than **s**.

### Solution

```python
def minimumScore(s: str, t: str) -> int:
    m, n = len(s), len(t)
    # left[i]: the minimal index in s so that t[0:i] is a subsequence of s[0:left[i]]
    left = [float('inf')] * n
    right = [-1] * n

    # Compute left[]
    i = j = 0
    while i < m and j < n:
        if s[i] == t[j]:
            left[j] = i
            j += 1
        i += 1

    # Compute right[]
    i = m - 1
    j = n - 1
    while i >= 0 and j >= 0:
        if s[i] == t[j]:
            right[j] = i
            j -= 1
        i -= 1

    # If t is already a subsequence of s
    if right[0] != -1:
        return 0

    res = n  # worst case: remove whole t
    j = 0    # right end for removal

    # Try all possible left ends 'i' to remove t[i:j], update j as needed
    for i in range(-1, n):
        # Move j to the right until right[j] > left[i] (j > i)
        while j < n and (i == -1 or (right[j] <= left[i])):
            j += 1
        # length of segment to remove is j - i - 1
        res = min(res, j - i - 1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m = len(s), n = len(t). Both prefix and suffix scans are O(m + n), and the final loop is O(n).
- **Space Complexity:** O(n), for the prefix (left) and suffix (right) arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if segments to remove are not required to be contiguous?  
  *Hint: Try dynamic programming to choose arbitrary positions to remove.*

- How would this change if you needed to find all possible minimal segments, not just the length of the shortest?  
  *Hint: Trace all valid (i, j) pairs or store paths during DP.*

- What if characters can be replaced as well as deleted in **t**?
  *Hint: Consider edit distance–like approaches (Levenshtein distance).*

### Summary
This solution uses the **two pointer** (prefix and suffix scan) pattern combined with preprocessing, a frequent pattern in substring and subsequence problems. It exploits the property of subsequences to efficiently determine for every possible split in **t** (removal window) whether the rest can match **s**, using precomputed prefix/suffix indices to drastically speed up the search. Variations of this approach are common in sequence comparison, windowing, and edit problems.