### Leetcode 3612 (Medium): Process String with Special Operations I [Practice](https://leetcode.com/problems/process-string-with-special-operations-i)

### Description  
Given a string **s** consisting of lowercase English letters and the special characters `*`, `#`, and `%`, build the **result** string by processing `s` from left to right as follows:

- If the character is a lowercase letter, append it to result.
- If it's `*`, remove the last character from result (if it exists).
- If it's `#`, duplicate the current result and append it to itself.
- If it's `%`, reverse the current result.

Return the final string after processing all the characters in **s**.

### Examples  

**Example 1:**  
Input: `s = "ab*c"`  
Output: `ac`  
*Explanation: Add 'a' (result="a"), add 'b' ("ab"), `*`: remove 'b' ("a"), add 'c' ("ac").*

**Example 2:**  
Input: `s = "a#"`  
Output: `aa`  
*Explanation: 'a' → "a", `#`: duplicate ("aa").*

**Example 3:**  
Input: `s = "ab%*c"`  
Output: `cb`  
*Explanation: 'a' ("a"), 'b' ("ab"), `%`: reverse ("ba"), `*`: remove 'a' ("b"), 'c' ("bc").*


### Thought Process (as if you’re the interviewee)  
- This is a **string simulation** problem.
- For each character, implement the corresponding behavior as described in the rules.
- Use a list to build the result for efficient appends and pops.
- For `#` (duplicate), join current list and double its content. For `%` (reverse), reverse the list.
- Be careful with edge cases (e.g., `*` when result is empty).

### Corner cases to consider  
- Result starts and stays empty (e.g., only `*`, `%`, `#` operations)
- Multiple `#` or `%` in a row
- `*` applied when result is already empty
- Input string with only special characters

### Solution

```python
def process_string(s: str) -> str:
    res = []
    for c in s:
        if 'a' <= c <= 'z':
            res.append(c)
        elif c == '*':
            if res:
                res.pop()
        elif c == '#':
            res += res[:]
        elif c == '%':
            res.reverse()
    return ''.join(res)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n×k), where n = len(s), k = length of result at each duplication (`#`) or reverse (`%`). In worst case, repeated `#` operations can grow the string exponentially.
- **Space Complexity:** O(total length of result), could be large due to duplications.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you limit result length to avoid huge memory usage?
  *Hint: Bound the length or stop duplicates exceeding a threshold.*
- What if you're only required to output the final result length, not the string?
  *Hint: Use only a counter, not the actual string.*
- How would you do this with additional operations, or nested operations?
  *Hint: Generalize logic or use a stack to track changes.*

### Summary
This is a straightforward **string simulation** problem, suitable for practicing array/list edits and simulating editor-like commands. The pattern is common in undo/redo, stack-machine simulations, and text processing tools.