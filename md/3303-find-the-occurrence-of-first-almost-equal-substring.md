### Leetcode 3303 (Hard): Find the Occurrence of First Almost Equal Substring [Practice](https://leetcode.com/problems/find-the-occurrence-of-first-almost-equal-substring)

### Description  
Given two strings, **s** (the text) and **t** (the pattern), return the starting index of the **first substring in s that is "almost equal" to t**.  
A substring of s is "almost equal" to t if:

- They have equal length.
- They differ **at most at one position** (i.e., their Hamming distance ≤ 1).

If no such substring exists, return -1.

### Examples  

**Example 1:**  
Input: `s = "abac", t = "babc"`  
Output: `1`  
*Explanation: s[1:5] = "bac" (length 3) isn't valid, but since the input pattern length is 4, the only possible substring is s[0:4]=="abac", which compares to "babc". Hamming distance = 1 (difference at index 1), so index 0 is valid.*

**Example 2:**  
Input: `s = "abcdef", t = "abcfef"`  
Output: `0`  
*Explanation: The substring s[0:6] = "abcdef" compared to "abcfef" differs at index 3 (d vs f), which is 1 character. So the result is 0.*

**Example 3:**  
Input: `s = "xyz", t = "abc"`  
Output: `-1`  
*Explanation: No substring "almost equal" to t as all substrings differ at all three positions.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Iterate over all possible substrings of s of length len(t).
  - For each, compare it to t and count the number of mismatches.
  - If mismatches ≤ 1, return the starting index.

- **Optimization:**  
  - Since t is fixed and its length is small compared to s, the brute-force approach is reasonable.
  - For very large s/t, we might precompute differences (like a rolling array of mismatches).
  - No need for advanced string matching algorithms because the matching is non-contiguous (only mismatch count matters, not sequence).

- **Choice:**  
  - Final approach is a simple sliding window with a nested mismatch comparison for each window.
  - Trade-off: Code is clear, and for len(s), len(t) ≤ 10⁵ it’s sufficiently efficient.

### Corner cases to consider  
- s shorter than t ⇒ should immediately return -1.
- Empty t ⇒ according to most definitions, should return 0 (empty string is substring of any string), but check requirements.
- t of length 1 ⇒ any single character in s matching or differing by 1 character (always matches).
- Completely equal substring: check if function correctly identifies and returns zero mismatches as valid.
- All characters differ in every substring: should return -1.
- Multiple candidate substrings: should return the first occurrence.

### Solution

```python
def findAlmostEqualSubstring(s: str, t: str) -> int:
    n, m = len(s), len(t)
    # If t is longer than s, cannot find matching substring
    if m > n:
        return -1

    # Go through every substring of length m in s
    for i in range(n - m + 1):
        # Count number of differences
        mismatches = 0
        for j in range(m):
            if s[i + j] != t[j]:
                mismatches += 1
                if mismatches > 1:
                    break
        # If at most one mismatch, return the index
        if mismatches <= 1:
            return i

    # No valid substring was found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n - m + 1) × m) in worst case.  
  For each position in s (up to n - m + 1), we may compare up to m characters.  
  If t is long and almost never matches, this could be slow.
- **Space Complexity:** O(1)  
  Uses only pointers and counters. No extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there can be up to **k** mismatches instead of just 1?  
  *Hint: Change the mismatch boundary from 1 to k; consider optimization by early breaking for mismatches > k.*

- How to improve for **very large inputs** or repeated search for different t?  
  *Hint: Precompute hash codes or mismatch positions using rolling hash or prefix arrays.*

- What if the pattern t can contain wildcards (e.g., '?'), matching any character?  
  *Hint: Modify comparison to treat wildcard as always matching for that position.*

### Summary
We used a **character-by-character sliding window** comparison, counting mismatches for each possible window.  
This pattern appears in *approximate* string matching, and also in problems like "minimum window substring with at most k errors"/Hamming distance.  
For small mismatch thresholds and moderate-length patterns, this brute-force window scan is simple, readable, and effective.  
The approach is widely applicable in substring matching problems where *exact* matching is relaxed to allow a small error margin.