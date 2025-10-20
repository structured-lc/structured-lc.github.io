### Leetcode 20 (Easy): Valid Parentheses [Practice](https://leetcode.com/problems/valid-parentheses)

### Description  
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the string is valid.  
A string is **valid** if:
- Every opening bracket has a corresponding closing bracket of the same type.
- Brackets are closed in the correct order (no interleaving).
- Every closing bracket closes the most recently opened but unclosed bracket.

For example, "()", "()[]{}", and "{[]}" are valid; "(]", "([)]" are not.

### Examples  

**Example 1:**  
Input: `s = "()"`  
Output: `True`  
*Explanation: The parentheses open and close correctly.*

**Example 2:**  
Input: `s = "()[]{}"`  
Output: `True`  
*Explanation: Each type of bracket opens and closes in the proper order.*

**Example 3:**  
Input: `s = "(]"`  
Output: `False`  
*Explanation: The round and square brackets are mismatched ("(" and "]").*

**Example 4:**  
Input: `s = "([)]"`  
Output: `False`  
*Explanation: They are closed in the wrong order—the '[' is not closed before ')'.*

**Example 5:**  
Input: `s = "{[]}"`  
Output: `True`  
*Explanation: All brackets are opened and closed in the proper nested order.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force** would try all permutations of removals or check every close with every open—this is inefficient and complex.
- The key insight: Each closing bracket must pair with the *most recent* unclosed opening bracket—this is the **stack** behavior.
- Traverse the string:
  - If an opening bracket, push onto a stack.
  - If a closing bracket, check whether it matches the bracket at the top of the stack:
    - If stack is empty, or types don’t match, return False.
    - Otherwise, pop the stack.
- At the end, if **stack is empty**, all brackets have matched; otherwise, they're unbalanced.
- Trade-offs: 
  - Efficient: Each character is processed once.
  - Stack uses extra space, but only O(n).
  - Elegant and simple. Stacks are made for this pattern.


### Corner cases to consider  
- Empty string: Should return True (all brackets matched—none to match).
- Single opening or closing bracket: Always False.
- Only opening brackets, or only closing brackets: False.
- Incorrectly nested brackets (e.g., "([)]").
- Strings with all types but correctly closed (e.g., "{[()]()}").
- Very long strings.


### Solution

```python
def isValid(s: str) -> bool:
    # Map closing brackets to corresponding opening brackets
    pairs = {')': '(', '}': '{', ']': '['}
    stack = []

    # Iterate through each character
    for char in s:
        if char in '({[':
            # It's an opening bracket; push onto stack
            stack.append(char)
        else:
            # It's a closing bracket
            if not stack:
                # No corresponding opening bracket
                return False
            if stack[-1] != pairs[char]:
                # Mismatched types
                return False
            stack.pop()  # Pop the matching opening bracket

    # All brackets must be closed properly—stack should be empty
    return not stack
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we process each character in the input string exactly once.
- **Space Complexity:** O(n), in the worst case if all characters are opening brackets and go onto the stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify the code to return the index of the first invalid bracket?  
  *Hint: Instead of returning early, track indices of stack pushes and pops.*

- How would you validate a string with arbitrary bracket types or user-defined pairs?  
  *Hint: Replace the fixed pairs dictionary with a dynamic input or map.*

- How can you do this if you can’t use additional space (no stack)?  
  *Hint: Can only solve in-place for restricted subsets, not for arbitrary nesting.*


### Summary
This problem is a **stack** pattern classic, used to check for correct matching of nested structures. Stacks enable elegant solutions for properly nested bracket problems and are commonly used in parsing, expression evaluation, and compilers. Recognizing when a problem requires "last opened, first closed" is a vital interview skill. This pattern is also applicable for binary tree traversals, undo operations, and depth-first search.


### Flashcard
Use a stack to match each closing bracket with the most recent unclosed opening bracket; valid if stack is empty at the end.

### Tags
String(#string), Stack(#stack)

### Similar Problems
- Generate Parentheses(generate-parentheses) (Medium)
- Longest Valid Parentheses(longest-valid-parentheses) (Hard)
- Remove Invalid Parentheses(remove-invalid-parentheses) (Hard)
- Check If Word Is Valid After Substitutions(check-if-word-is-valid-after-substitutions) (Medium)
- Check if a Parentheses String Can Be Valid(check-if-a-parentheses-string-can-be-valid) (Medium)
- Move Pieces to Obtain a String(move-pieces-to-obtain-a-string) (Medium)