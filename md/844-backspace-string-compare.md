### Leetcode 844 (Easy): Backspace String Compare [Practice](https://leetcode.com/problems/backspace-string-compare)

### Description  
Given two strings, **S** and **T**, compare them to determine if they are equal after applying the effect of backspace characters ('#').  
A '#' means delete the immediately preceding character (if any).  
Simulate the process for both strings: for each '#', remove the character before it. Once processed, return `True` if the resulting strings are identical; otherwise, return `False`.  
Imagine typing characters into a text editor where '#' represents pressing backspace.

### Examples  

**Example 1:**  
Input: `S = "ab#c", T = "ad#c"`  
Output: `True`  
*Explanation: S becomes "ac" (type 'a', 'b', '#', 'c'), T becomes "ac" (type 'a', 'd', '#', 'c'). They match.*

**Example 2:**  
Input: `S = "ab##", T = "c#d#"`  
Output: `True`  
*Explanation: S becomes "" (a, b, #, #), T becomes "" (c, #, d, #). Both are empty.*

**Example 3:**  
Input: `S = "a#c", T = "b"`  
Output: `False`  
*Explanation: S becomes "c" (a, #, c), T becomes "b". They differ.*

### Thought Process (as if you’re the interviewee)  
At first glance, the problem suggests simulating the "backspace" operation, so the naive way is to build the final string for both S and T individually and compare.

- **Brute-force approach:**  
  - Iterate over S and T.
  - For each character, if not '#', append to a list (acting like a stack).
  - If '#', pop an element if the list/stack is not empty.
  - After processing both, compare the two lists for equality.

This approach is very readable, simple, but requires O(n) space.

- **Optimized approach (O(1) extra space):**  
  - Use two pointers starting from the end of S and T.
  - Skip characters that should be erased due to backspaces.
  - Compare the actual characters (after skipping backspaced ones) one by one, repeating until the start of both strings.
  - This avoids building the strings, thus saving space.

**Tradeoff:**  
Stack method is intuitive and easier to implement; two-pointer saves space but is a bit trickier.

### Corner cases to consider  
- Inputs with only '#' characters, e.g., `S = "###"`, `T = "#######"`
- Mismatched string lengths, e.g., `S = "#"`, `T = ""`
- Consecutive '#' at start or end, e.g., `S = "##a"`, `T = "a"`
- Inputs where backspaces exceed the string length, e.g., `S = "###a###"`, `T = "#b#"`
- Both strings empty, or one string empty

### Solution

```python
def backspaceCompare(S: str, T: str) -> bool:
    def next_valid_char_index(s, i):
        backspace = 0
        while i >= 0:
            if s[i] == '#':
                backspace += 1
                i -= 1
            elif backspace > 0:
                backspace -= 1
                i -= 1
            else:
                break
        return i

    i, j = len(S) - 1, len(T) - 1
    while i >= 0 or j >= 0:
        i = next_valid_char_index(S, i)
        j = next_valid_char_index(T, j)
        if i >= 0 and j >= 0:
            if S[i] != T[j]:
                return False
        elif i >= 0 or j >= 0:
            # One string has characters left and the other doesn't
            return False
        i -= 1
        j -= 1
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n and m are lengths of S and T.  
  Each character is traversed at most once because the backspace skipping is efficient.

- **Space Complexity:** O(1) extra space.  
  No extra storage proportional to input sizes is used (other than simple integer counters).

### Potential follow-up questions (as if you’re the interviewer)  

- How might you handle Unicode or multibyte character inputs?
  *Hint: Consider indexing consequences with multibyte characters.*

- What if the input strings are very long and you can't keep them entirely in memory?
  *Hint: Could you process the input as streams?*

- How would your solution change if backspaces can be represented by other characters (configurable)?
  *Hint: Generalize the logic for any given backspace symbol.*

### Summary
This problem demonstrates the *two-pointer* technique for simulating edits from right-to-left in O(1) space, a classic approach for questions where operations (like stack pops or backspaces) can "cancel out" earlier characters. The stack approach is also common for string edit simulations but incurs O(n) space. The two-pointer pattern is reusable for "edit distance", "compare after operations", or "move-and-compare" problems, especially where backward comparison is needed.

### Tags
Two Pointers(#two-pointers), String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
- Crawler Log Folder(crawler-log-folder) (Easy)
- Removing Stars From a String(removing-stars-from-a-string) (Medium)