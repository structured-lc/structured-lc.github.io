### Leetcode 1614 (Easy): Maximum Nesting Depth of the Parentheses [Practice](https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses)

### Description  
Given a valid parentheses string `s`, return the **maximum nesting depth** of nested parentheses in the string. Ignore all non-parenthesis characters.

### Examples  
**Example 1:**  
Input: `s = "(1+(2*3)+((8)/4))+1"`  
Output: `3`  
*Explanation: Maximum depth is 3 for the deepest "((8)/4)".*

**Example 2:**  
Input: `s = "(1)+((2))+(((3)))"`  
Output: `3`  
*Explanation: Deepest is "(((3)))" with depth 3.*

**Example 3:**  
Input: `s = "1+2*3+4"`  
Output: `0`  
*Explanation: No parentheses at all.*

### Thought Process (as if you’re the interviewee)  
This is a **stack or counter problem**. Each '(' increases current depth; ')' decreases it. Track the **maximum** reached during the scan.
- Initialize depth=0, max_depth=0
- Iterate through string
    - If '(': increase depth by 1, if needed update max_depth
    - If ')': decrease depth by 1
- Ignore other characters
- At end, max_depth is answer

### Corner cases to consider  
- No parentheses (should return 0)
- Only one level: `()`
- Deeply nested only at the start/end
- Extra characters between parentheses

### Solution

```python
def maxDepth(s: str) -> int:
    depth = max_depth = 0
    for ch in s:
        if ch == '(':   # open paren, increase depth
            depth += 1
            if depth > max_depth:
                max_depth = depth
        elif ch == ')':    # close paren, decrease depth
            depth -= 1
    return max_depth
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is length of s (single scan, constant operations).
- **Space Complexity:** O(1), only a few counters used.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the string can contain invalid parentheses?
  *Hint: Need to handle negative depth/check mismatch.*

- Return not just max depth, but the start/end indices of the deepest substring.
  *Hint: Store index when depth increases to a new max.*

- If allowed any bracket types ('{', '[', etc.), handle all with depth.
  *Hint: Use stack or enhanced tracking per bracket kind.*

### Summary
This is a classic **parenthesis matching/counter pattern**. Core to many parsing tasks, including evaluating mathematical expressions or parsing code.

### Tags
String(#string), Stack(#stack)

### Similar Problems
- Maximum Nesting Depth of Two Valid Parentheses Strings(maximum-nesting-depth-of-two-valid-parentheses-strings) (Medium)