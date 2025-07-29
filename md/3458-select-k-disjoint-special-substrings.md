### Leetcode 3458 (Medium): Select K Disjoint Special Substrings [Practice](https://leetcode.com/problems/select-k-disjoint-special-substrings)

### Description  
Given a string `s` of length n and an integer k, determine whether it is possible to select **k disjoint special substrings** from `s`.  
A **special substring** is a (contiguous) substring `s[l...r]` such that every character that appears in `s[l...r]` does **not** appear elsewhere in `s` (outside `[l, r]`).  
You need to check if there exists k such disjoint (non-overlapping) special substrings in `s`.

### Examples  

**Example 1:**  
Input: `s = "abcdeffedcba", k = 2`  
Output: `True`  
*Explanation: The two substrings `"cd"` and `"ef"` can be selected. All characters in them do not appear outside their respective substrings.*

**Example 2:**  
Input: `s = "abacaba", k = 1`  
Output: `True`  
*Explanation: Selecting `"c"` at index 3 is valid — 'c' is only present there.*

**Example 3:**  
Input: `s = "abcde", k = 2`  
Output: `True`  
*Explanation: Pick "a" and "b" (or "c" and "d", etc), each character is unique and forms its own special substring.*

### Thought Process (as if you’re the interviewee)  

Start with a brute-force approach:
- Consider all substrings. For each, check if the set of its characters is disjoint from all characters outside it. This is **very slow** (O(n³) minimum).

Optimize:
- Realize the **special substring** property is fully described by character **first and last occurrence positions**. For a substring `[l, r]` to be special, every character in it must have `first[c]=l` and `last[c]=r`.
- Precompute for each character its **first** and **last** position.
- For each endpoint `i`, check if substring `[l, i]` (with l = first occurrence of s[i]) is special using first/last arrays.

DP approach:
- Treat as interval covering: can we choose k disjoint intervals `[l, r]` as above?
- Use dynamic programming: `dp[i] = max number of disjoint special substrings in first i chars`.
- For each i, either:
    - skip (`dp[i] = dp[i-1]`), _or_
    - take a new special substring ending at i, which starts at l = first[s[i]]: `dp[i] = max(dp[i], 1 + dp[first[s[i]]])` (previous intervals can reach up to (l-1)).
- At the end, return `dp[n] ≥ k`.

This is O(n) and relies on first/last arrays and careful DP.  
This method avoids overlap and efficiently finds the max number of disjoint specials.

### Corner cases to consider  
- Empty string or k = 0: Always True (can select 0 substrings).
- All unique characters: Each single char is special; can form up to n specials.
- All identical chars: Only the entire string is special, since all positions share the char.
- Characters with overlapping appearances; adjacent or nested intervals.
- k > max achievable substrings: return False.
- Input with only 1 character and k > 1: impossible.

### Solution

```python
def select_k_disjoint_special_substrings(s: str, k: int) -> bool:
    n = len(s)
    if k == 0:
        return True

    # First and last appearance for each character ('a'-'z')
    first = [n] * 26
    last = [-1] * 26

    for i, c in enumerate(s):
        idx = ord(c) - ord('a')
        if first[idx] == n:
            first[idx] = i
        last[idx] = i

    # Greedily expand each interval for specials (union)
    # For each appearance of a new char, expand to cover first-last of all chars in region
    seen_order = []
    for i, c in enumerate(s):
        idx = ord(c) - ord('a')
        if first[idx] == i:
            seen_order.append(c)

    for c in seen_order:
        a = ord(c) - ord('a')
        l, r = first[a], last[a]
        # Expand this interval to maximum for all internal chars
        j = l
        while j <= r:
            b = ord(s[j]) - ord('a')
            l = min(l, first[b])
            r = max(r, last[b])
            j += 1
        first[a] = l
        last[a] = r

    # DP: dp[i] = max disjoint specials for first i letters
    dp = [0] * (n + 1)
    for i, c in enumerate(s):
        a = ord(c) - ord('a')
        # If this char ends a special substring
        if last[a] == i and first[a] != n and (i == last[a]):
            # Can either take or skip this interval
            start = first[a]
            dp[i+1] = max(dp[i], 1 + dp[start])
        else:
            dp[i+1] = dp[i]
    return dp[n] >= k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
    - One pass for first/last, one pass for greedy expansion, and one pass for dp. Each pass is O(n), no nested loops.

- **Space Complexity:** O(n).  
    - Extra arrays for dp (n+1), first/last (constant 26), and seen_order (≤26), so total O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the alphabet was Unicode or much larger (not just 'a'-'z')?  
  *Hint: Use dicts instead of lists for first/last arrays.*

- What if the substrings must be contiguous and form a partition of s?  
  *Hint: How would you greedily segment s to maximize the count?*

- Find the minimum number of disjoint special substrings to cover the entire string.  
  *Hint: Change k-subsets to covering all (greedy works, similar to "Partition Labels").*

### Summary
This is a DP + greedy interval merge problem that closely parallels the "Partition Labels" pattern in greedy string segmentation problems. We precompute character ranges and DP to maximize non-overlapping special substrings. The pattern is commonly reused in string partitioning and interval selection problems.