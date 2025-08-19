### Leetcode 1190 (Medium): Reverse Substrings Between Each Pair of Parentheses [Practice](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses)

### Description  
Given a string consisting of lowercase English letters and parentheses, reverse every substring enclosed by matching parentheses, starting from the innermost. The final result should be the string with all parentheses removed and all specified reversals applied.

For example, if a substring is wrapped in parentheses, reverse only its content. If substrings are nested, always reverse from the innermost outwards, applying each reversal before considering the next enclosing pair.

### Examples  

**Example 1:**  
Input: `(abcd)`  
Output: `dcba`  
*Explanation: Only one pair of parentheses, so reverse the whole substring inside.*

**Example 2:**  
Input: `(u(love)i)`  
Output: `iloveu`  
*Explanation:  
1. Reverse "love" (inside the innermost parentheses) ⇒ "evol".
2. Plug back: `(u(evol)i)`
3. Reverse content inside outer parentheses: "u", "evol", "i" ⇒ "iloveu".*

**Example 3:**  
Input: `(ed(et(oc))el)`  
Output: `leetcode`  
*Explanation:  
1. Reverse "oc" (innermost) ⇒ "co".
2. Plug it back: `(ed(etco)el)`
3. Reverse "etco" ⇒ "octe": `(edocte el)`
4. Reverse "edocteel" ⇒ "leetcode".*

**Example 4:**  
Input: `a(bcdefghijkl(mno)p)q`  
Output: `apmnolkjihgfedcbq`  
*Explanation:  
1. Reverse "mno" ⇒ "onm".
2. Plug: `a(bcdefghijkl(onm)p)q`
3. Reverse "bcdefghijkl(onm)p" ⇒ "ponmlkjihgfedcb"
4. Full string: `apmnolkjihgfedcbq`.*

### Thought Process (as if you’re the interviewee)  
This is a classic string manipulation with **nested structures**—natural candidates for a stack-based approach.

- **Brute-force idea**: Scan the string to find matching parentheses, reverse the substrings, repeat until no parentheses are left. Inefficient since it may need repeated rescans and substring manipulations.
- **Stack approach** (optimal): Use a stack to efficiently manage nested parentheses:
  - Iterate through the string.  
  - For every non-`)` character (including letters and `(`), push to the stack.
  - When a `)` is found:
    - Pop from the stack until `(` is found, collecting the popped characters.
    - Reverse the collected substring (since stack pops in reverse order).
    - Push the reversed substring back onto the stack as individual characters, so they can be part of further reversals if more nesting is present.
  - Build the result from the stack contents at the end.
- This approach elegantly handles arbitrary nesting and is both time- and space- efficient.

### Corner cases to consider  
- Empty string: Input is `""`.
- No parentheses: Input like `"abc"`.
- Deeply nested parentheses: Such as `"a(b(c(d)e)f)g"`.
- Multiple adjacent parentheses: Input like `"(ab)(cd)"`.
- Parentheses with no characters: Input like `"()"`.
- Only letters or only parentheses.
- Input starting or ending with parentheses.

### Solution

```python
def reverseParentheses(s: str) -> str:
    stack = []
    for char in s:
        if char != ')':
            # Push all chars except ')' onto the stack
            stack.append(char)
        else:
            # On ')', pop to build substring until '(' is found
            substr = []
            while stack and stack[-1] != '(':
                substr.append(stack.pop())
            # Pop the '(' itself
            if stack and stack[-1] == '(':
                stack.pop()
            # Reverse substring (already in reversed order from stack pops)
            stack.extend(substr)
    # The stack contains the final result (with no parentheses), so join and return
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is pushed and popped at most once from the stack, resulting in linear processing time regardless of nesting.
- **Space Complexity:** O(n)  
  The stack may hold up to all the characters of the input string in the worst case (for example, all letters or all open parentheses).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the parentheses were of different types (e.g., `{`, `[`, `(`)?
  *Hint: Think about how to distinguish and pair different bracket types.*
  
- Can you perform the operation in place, without extra space proportional to string size?
  *Hint: Consider in-place string manipulations, but also think about immutability in languages like Python or Java.*

- How would you handle input with invalid parentheses (unmatched brackets)?
  *Hint: Discuss error handling and validation during iteration.*

### Summary
This solution uses the **stack** pattern, common in problems involving nested structures or paired delimiters. It's highly applicable for tasks like expression parsing, validating brackets, or evaluating mathematical expressions. The stack efficiently supports backtracking and reversal for nested layers, ensuring that inner substrings are processed before outer ones.

### Tags
String(#string), Stack(#stack)

### Similar Problems
