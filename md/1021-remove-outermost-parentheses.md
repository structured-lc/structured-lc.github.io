### Leetcode 1021 (Easy): Remove Outermost Parentheses [Practice](https://leetcode.com/problems/remove-outermost-parentheses)

### Description  
Given a string **S** consisting of valid parentheses, break it up into its **primitive** substrings (smallest possible valid pieces that can't be further split into two non-empty valid pairs). For each primitive, remove its outermost pair of parentheses and concatenate the result for all primitives.  
The task is to return the final string after all such outermost parentheses have been removed from every primitive.

### Examples  

**Example 1:**  
Input: `(()())(())`  
Output: `()()()`  
*Explanation: The string is made of primitives "(()())" and "(())".  
Removing their outermost parentheses gives "()()" and "()", concatenated as "()()()".*

**Example 2:**  
Input: `(()())(())(()(()))`  
Output: `()()()()(())`  
*Explanation: Primitive decomposition is "(()())", "(())", "(()(()))".  
Removing their outermost parentheses: "()()", "()", "()(())", giving "()()()()(())".*

**Example 3:**  
Input: `()()`  
Output: ``  
*Explanation: Both "()" primitives, removing outermost parentheses from each leaves an empty string. Result is blank.*

### Thought Process (as if you’re the interviewee)  
My first thought: Brute force would be to split the string at each primitive, then for each primitive, drop its first and last characters (which are always '(' and ')').  
But detecting the primitives is key — how do I know where one primitive ends and the next starts?

A better approach is to use a **counter** (or stack):
- Iterate through the string, 
- Increase the counter for every '(',
- Decrease for every ')'.
- A primitive always starts when the counter goes from 0→1 and ends when it returns to 0.
- For all characters **except the very first '(' and the matching closing ')' for each primitive**, add them to the result.  
- So, for every '(', if counter > 0 before increment, append; for every ')', if counter > 1 after decrement, append.

This approach is efficient (single pass, O(n)), doesn't require any real splitting, and is easy to implement.

### Corner cases to consider  
- S is empty (`""`)
- All S is "()" pairs (expect output "")
- Deeply nested: `"(((())))"`
- Multiple consecutive primitives: `"()()()"`
- Primitives of length 2: `"()"`, `"()()"`
- Input is already flat with no nested pairs
- Very long string

### Solution

```python
def removeOuterParentheses(S: str) -> str:
    result = []
    depth = 0  # Track current nesting depth

    for c in S:
        if c == '(':
            if depth > 0:
                result.append('(')  # Only add if not the outermost '('
            depth += 1
        elif c == ')':
            depth -= 1
            if depth > 0:
                result.append(')')  # Only add if not the outermost ')'

    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of S.  
  Each parenthesis is visited once, simple counter operations only.

- **Space Complexity:** O(n), to store the resulting characters.  
  No extra space besides the output buffer.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contains invalid parentheses?
  *Hint: Does your code assume validity? How to detect invalid states?*

- How would you adapt this to work with other types of brackets, or mix of brackets and braces?
  *Hint: Would your one-counter solution generalize?*

- Can this be solved in place to save space if input string is mutable?
  *Hint: What if you could overwrite input or use pointer indices?*

### Summary
This is a classic use of the **counter or stack** pattern to manage **nested structures** in a string, especially for processing parentheses, brackets, or similar. The approach is single-pass and requires only enough memory to hold the result.  
Similar counter-based logic appears frequently in parsing tasks, generating/validating parentheses, and even compiler design basics.

### Tags
String(#string), Stack(#stack)

### Similar Problems
