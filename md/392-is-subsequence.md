### Leetcode 392 (Easy): Is Subsequence [Practice](https://leetcode.com/problems/is-subsequence)

### Description  
Given two strings, **s** and **t**, determine if **s** is a subsequence of **t**.  
A **subsequence** of a string is formed by deleting zero or more characters from the original string without changing the relative order of the remaining characters. For this problem, return `True` if every character in **s** can be found in **t** in order (but not necessarily contiguous); otherwise, return `False`.


### Examples  

**Example 1:**  
Input: `s = "abc", t = "ahbgdc"`  
Output: `True`  
*Explanation: The characters 'a', 'b', and 'c' all appear in "ahbgdc" in the correct order (possibly with other characters in between), so "abc" is a subsequence of "ahbgdc".*

**Example 2:**  
Input: `s = "axc", t = "ahbgdc"`  
Output: `False`  
*Explanation: While 'a' and 'c' show up in order, 'x' does not appear in "ahbgdc", making "axc" not a subsequence.*

**Example 3:**  
Input: `s = "", t = "abc"`  
Output: `True`  
*Explanation: An empty string is a subsequence of any string by definition.*

### Thought Process (as if you’re the interviewee)  
First, let's clarify what a subsequence means: we "pick out" each character of **s** from **t** in order, possibly skipping over other characters in **t**.  
- The brute-force approach would be to try every possible subset of characters of **t** and compare each with **s**, but that's extremely inefficient.  
- Instead, a **two-pointer** approach works well here:  
  - Use one pointer for **s**, one for **t**.
  - For each character in **t**, if it matches the current character in **s**, move the **s** pointer forward.
  - If all characters in **s** are matched (the **s** pointer reaches the end), then **s** is a subsequence of **t**.
- This approach is efficient because each character in **t** is visited once, and the order is preserved automatically.

I choose the two-pointer method because it is simple to implement, reads cleanly, and has optimal time complexity for this problem.

### Corner cases to consider  
- **s** is empty: should return `True`.
- **t** is empty: should return `True` only if **s** is also empty.
- **s** is longer than **t**: impossible for **s** to be a subsequence; must return `False`.
- All characters in **s** are the same, or none of them exist in **t**.
- Both **s** and **t** are empty (should return `True`).


### Solution

```python
def isSubsequence(s: str, t: str) -> bool:
    # Edge case: empty s is always a subsequence
    if not s:
        return True

    # Pointers for s and t
    i, j = 0, 0
    while i < len(s) and j < len(t):
        # If characters match, move both pointers
        if s[i] == t[j]:
            i += 1
        # Always move t's pointer
        j += 1

    # If we've matched all characters in s, return True
    return i == len(s)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of **t**.  
  Each character in **t** is traversed at most once. The pointer for **s** only moves when a match occurs.

- **Space Complexity:** O(1).  
  Only a constant amount of additional space is used for variables and pointers (no extra storage proportional to input sizes).


### Potential follow-up questions (as if you’re the interviewer)  

- If **s** is very short, but you need to check millions of different **s** strings against the same very long **t**, how might you optimize?
  *Hint: Pre-process **t** to build an index mapping for faster lookups; consider binary search for each character of **s**.*

- How would you handle Unicode or case-insensitivity?
  *Hint: Clarify requirements; consider normalizing input strings before processing.*

- What if edits were allowed (i.e., is **s** a "near subsequence" of **t** with at most one character difference)?
  *Hint: Consider dynamic programming similar to edit distance problems.*

### Summary
The **two-pointer pattern** is used, which efficiently checks for a subsequence in linear time.  
This approach is commonly applied to problems involving the ordering or matching between two lists or strings (e.g., merging sorted arrays, validating shuffle patterns).  
It's optimal for cases where order matters but contiguity isn't required.