### Leetcode 1003 (Medium): Check If Word Is Valid After Substitutions [Practice](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions)

### Description  
Given a string **s**, determine if it is *valid*—meaning it can be constructed from an empty string by repeatedly inserting the substring `"abc"` at any position, any number of times.  
For example:  
- You start with `""`, and at each step, may insert `"abc"` anywhere in the string built so far.  
- At the end, if it is possible to get exactly **s** via this process, **s** is considered valid.  
- The substring `"abc"` must appear together (not individually or out of order), but may be inserted at any point in the string-in-progress[1][4][5].

### Examples  

**Example 1:**  
Input: `aabcbc`  
Output: `true`  
*Explanation: Start with "" → insert "abc" → "abc" ➔ insert another "abc" at the start → "aabcbc".*

**Example 2:**  
Input: `abcabcababcc`  
Output: `true`  
*Explanation:  
- "" → "abc" → "abcabc"  
- insert "abc" between the first "a" and "b": "abc" + "abc" = "abcabc"  
- Later insert "abc" at various positions to reach the required string.*

**Example 3:**  
Input: `abccba`  
Output: `false`  
*Explanation: "cba" cannot be formed via valid insertions, as only "abc" can be inserted at a time and "cba" breaks the pattern.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try to simulate all possible ways to insert "abc" into a blank string to reach **s**. This quickly becomes infeasible as the size grows.
- **Reverse Simulation:** Instead of simulating insertions, consider *removing* "abc" from the string wherever it appears, since every insert must have resulted from a "abc". Remove "abc" repeatedly until no such substring is left. If the string is empty at the end, it was valid. However, simple repeated substring replacements may not be efficient.
- **Stack Approach:** Process the string left-to-right, adding characters to a stack. Any time the top of the stack is "a", "b", "c" (in order), pop them. WHY? Because since "abc" is the only insert, any group of contiguous "abc" at the end must have come together, and the possible nesting/insertion points always ultimately reconstruct as stacks of this form.  
- **Chosen Approach:** The stack method is efficient (linear scan, each character pushed and possibly popped once) and robust, cleanly handling all edge cases.

### Corner cases to consider  
- Empty string: should be invalid (since you can't get "" by inserting any "abc")
- Strings shorter than 3 chars: can't be valid, as "abc" is the only insertion allowed.
- Strings with characters other than 'a', 'b', 'c': should be invalid.
- Strings starting/ending with partial "abc": for example, "ab", "bc", "cab", etc.; all invalid.
- Repetitive patterns with extra chars, e.g., "aabcbcc", etc.
- Interleaved/corrupted order, e.g., "acbbac", "bac", etc.

### Solution

```python
def isValid(s: str) -> bool:
    stack = []
    for ch in s:
        stack.append(ch)
        # Check if last three are 'a' 'b' 'c'
        if len(stack) >= 3 and stack[-3] == 'a' and stack[-2] == 'b' and stack[-1] == 'c':
            # Remove 'a', 'b', 'c'
            stack.pop()
            stack.pop()
            stack.pop()
    # Valid if nothing left
    return len(stack) == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each character is pushed and (at most) popped once.  
  - No nested scans or extra passes.
- **Space Complexity:** O(n)
  - In the worst case, the entire string is stored in the stack if no "abc" pattern forms.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `"abc"` is replaced by a different constant pattern?  
  *Hint: Adjust the window size and comparison to match the new pattern.*

- Can this be done in-place with O(1) extra space?  
  *Hint: Consider modifying the original string with a pointer, but for the pattern check, space may be necessary.*

- How do you handle extremely large strings or streamed input?  
  *Hint: The stack approach works in a streaming fashion—no need to load entire string at once; process chunk by chunk.*

### Summary
This problem is a classic example of using a **stack-based pattern recognition** technique: process input left-to-right, push to a stack, and pop when a specific valid pattern (here, "abc") is detected. Such problems show up in **parsing, syntax checking, and bracket matching**. The stack ensures local order and efficiently captures the allowed nested insertions/removals. This is a common coding pattern for problems involving *balanced substrings* or reversible construction.

### Tags
String(#string), Stack(#stack)

### Similar Problems
- Valid Parentheses(valid-parentheses) (Easy)