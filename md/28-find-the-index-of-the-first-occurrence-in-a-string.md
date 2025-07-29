### Leetcode 28 (Easy): Find the Index of the First Occurrence in a String [Practice](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string)

### Description  
Given two strings, **haystack** and **needle**, return the index of the first occurrence of *needle* in *haystack*. If *needle* is not part of *haystack*, return -1.  
Essentially, you’re being asked: *At what position does the pattern “needle” first appear within the string “haystack”?* Scan through *haystack* to find exactly where *needle* starts (if at all). If it never appears, return -1.

### Examples  

**Example 1:**  
Input: `haystack = "sadbutsad"`, `needle = "sad"`  
Output: `0`  
*Explanation: “sad” appears first at index 0. Even though it appears again at index 6, we take the first occurrence.*  

**Example 2:**  
Input: `haystack = "leetcode"`, `needle = "leeto"`  
Output: `-1`  
*Explanation: "leeto" is not found in "leetcode", so output is -1.*  

**Example 3:**  
Input: `haystack = "abcabcabc"`, `needle = "cab"`  
Output: `2`  
*Explanation: The substring "cab" first appears starting at index 2.*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each position in *haystack* where *needle* could possibly start (from index 0 to len(haystack) - len(needle)), compare the substring of length len(needle) to *needle*. If you find a match, return that starting index.
- **Why not use built-ins?**  
  Many interviews don’t allow using built-in functions like `str.find()` or `str.index()`. So, you need a manual sliding window approach.
- **Optimized approach:**  
  - *Naive Window Matching*: Slide a window of length len(needle) across *haystack*. At each step, check if the substring matches *needle*. Time is O((n - m + 1) × m).
  - *Further Optimization*: Algorithms like KMP or Rabin-Karp can reduce repeated comparisons, but naive sliding window is often sufficient for this problem’s constraints and is acceptable unless the interviewer explicitly asks for optimal string matching algorithms.
- **Why settle on sliding window?**  
  It’s simple, easy to reason about, and works efficiently enough for small to moderate input sizes.

### Corner cases to consider  
- *needle* is longer than *haystack* → immediately return -1.
- *needle* is an empty string → usually, return 0 (definition: empty substring appears at index 0).
- *haystack* is empty & *needle* is not → return -1.
- *needle* and *haystack* are the same string → return 0.
- *needle* occurs multiple times in *haystack* → return the first index.
- Both strings consist of one character.

### Solution

```python
def strStr(haystack: str, needle: str) -> int:
    # If needle is empty, it's conventionally found at index 0
    if not needle:
        return 0
    n = len(haystack)
    m = len(needle)
    # Only need to check up to n - m, since needle can't fit beyond that
    for i in range(n - m + 1):
        # Compare substring of haystack with needle
        if haystack[i:i + m] == needle:
            return i
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n - m + 1) × m), where n = length of *haystack*, m = length of *needle*. For each window start (up to n - m + 1), we may do up to m character comparisons.
- **Space Complexity:** O(1), since only variables are used for indices; no extra data structures are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- *How would you improve your solution for very large inputs or repeated string search?*  
  *Hint: Study algorithms like KMP (Knuth-Morris-Pratt) or Rabin-Karp for efficient substring search by preprocessing the pattern to skip unnecessary comparisons.*

- *How would your solution change if asked to find all occurrences, not just the first?*  
  *Hint: Continue searching after a match, saving all indices where matching occurs.*

- *How does your code behave if needle is an empty string?*  
  *Hint: Clarify and justify the expected behavior based on string/substring definition or problem statement.*

### Summary
This problem demonstrates the **sliding window** and **naive string matching** patterns. The approach is simple: slide a window of length equal to *needle* over *haystack* and compare character by character. This solution is robust, readable, and foundational for learning more advanced pattern searching algorithms like **KMP** and **Rabin-Karp**, which are applicable to large-scale text searching and editor “find” features.