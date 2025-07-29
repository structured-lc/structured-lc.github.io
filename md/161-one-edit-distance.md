### Leetcode 161 (Medium): One Edit Distance [Practice](https://leetcode.com/problems/one-edit-distance)

### Description  
Given two strings, **s** and **t**, determine if they are **exactly one edit distance apart**.  
An edit is defined as:
- **Insert** a character into one string,
- **Delete** a character from one string, or
- **Replace** a character in one string.  
Two strings are one edit distance apart if by applying exactly one such edit, the strings become equal. Return `True` if this is possible, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `s = "ab"`, `t = "acb"`  
Output: `True`  
*Explanation: Insert 'c' into s at index 1 to get t.*

**Example 2:**  
Input: `s = "cab"`, `t = "ad"`  
Output: `False`  
*Explanation: More than one edit is needed (both characters and length differ in more than one place).*

**Example 3:**  
Input: `s = "1203"`, `t = "1213"`  
Output: `True`  
*Explanation: Replace '0' in s with '1' at index 2 to get t.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way would be to generate all strings one edit away from s and check if t is one of those, but that's very inefficient.
- **Key observation**: If s and t are one edit apart, their lengths **differ by at most 1**.
- If the strings are equal in length: there must be **exactly one different character** (→ replacement).
- If lengths differ by 1: you can only insert or delete one character.
- Compare both strings character by character, track the first index where they differ.
    - If found:
        - If same length: the rest should match after "replacement".
        - If s is longer: the rest of s (skipping this char) must match t (→ "delete" from s).
        - If t is longer: the rest of t (skipping this char) must match s (→ "insert" into s).
    - If traversed all of the shorter string and found no diffs: difference could only be at the **end** (last char).
- This approach is clean, O(n) time and O(1) space, much better than brute force.

### Corner cases to consider  
- Both empty strings (`""`, `""`) — should return False (zero edits).
- Single character strings (`"a"`, `""` or `""`, `"a"`) — must return True (insert/delete at end).
- Completely equal strings with length > 0 — should return False.
- Only first or last character differs (`"abc"`, `"bbc"` or `"abc"`, `"abd"`).
- Lengths differ by more than one (`"abc"`, `"a"`).

### Solution

```python
def isOneEditDistance(s: str, t: str) -> bool:
    len_s, len_t = len(s), len(t)

    # Ensure s is not longer (for symmetry, can swap s and t)
    if len_s > len_t:
        return isOneEditDistance(t, s)

    # Length difference more than 1: impossible in one edit
    if len_t - len_s > 1:
        return False

    for i in range(len_s):
        if s[i] != t[i]:
            # If equal length: check the rest is equal (replace case)
            if len_s == len_t:
                return s[i+1:] == t[i+1:]
            # If t is longer: check skipping one char in t (insert case)
            else:
                return s[i:] == t[i+1:]

    # All previous chars match: only possible edit is adding a char at the end
    return len_s + 1 == len_t
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the shorter string. At most one full pass through the input strings.
- **Space Complexity:** O(1) extra space, only using pointers/indexes and no additional data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to check if two strings are at most k-edit distance apart?
  *Hint: Think about dynamic programming.*

- Can you list all possible strings that are one edit distance from a given string?
  *Hint: Generate all possible insert/Delete/Replace possibilities.*

- How would you return the specific edit operation needed (what char, where)?
  *Hint: Track the index and characters involved during first mismatch.*

### Summary
This approach uses a linear scan and **two pointers** to check if the two strings differ by exactly one edit, handling insert, delete, and replace in one pass.  
It leverages the property that valid single-edit transformations occur when lengths differ by at most one and mismatches are limited to just one.  
The pattern is **two-pointer** and **string compare**, a common technique applicable to many "edit distance" and diff-style problems.