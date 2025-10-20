### Leetcode 1106 (Hard): Parsing A Boolean Expression [Practice](https://leetcode.com/problems/parsing-a-boolean-expression)

### Description  
You are given a boolean expression as a string, which can contain:
- The constants: `"t"` (true) and `"f"` (false)
- Logical NOT: `"!(expr)"`
- Logical AND: `"&(expr1,expr2,...)"`
- Logical OR: `"|(expr1,expr2,...)"`

Parentheses are used for grouping, and commas separate sub-expressions. Your job is to parse and evaluate the expression, returning the final boolean result (`True` or `False`). Expressions may be deeply nested, and are always guaranteed to be valid.

### Examples  

**Example 1:**  
Input: `!(f)`  
Output: `True`  
*Explanation: NOT of False is True.*

**Example 2:**  
Input: `|(f,t)`  
Output: `True`  
*Explanation: OR of False and True is True.*

**Example 3:**  
Input: `&(t,f)`  
Output: `False`  
*Explanation: AND of True and False is False.*

**Example 4:**  
Input: `|(&(t,f,t),!(t))`  
Output: `False`  
*Explanation:  
- `&(t,f,t)` = False (since one is False)  
- `!(t)` = False  
- `| (False, False)` = False*

### Thought Process (as if you’re the interviewee)  
First, I notice that the expression is made up of nested sub-expressions using logical NOT, AND, OR, and the constants 't' and 'f'.  
A brute-force approach would involve recursively breaking the string down at each operator, but because of deep nesting and potentially large input sizes (up to 20,000 characters), recursion depth could be a problem.

A more robust and scalable solution is to use a **stack-based approach**:
- As I traverse the expression, every time I see a value or operator, I push it onto the stack.
- When I hit a `)`, it means I've reached the end of a sub-expression.
  - I then pop values off the stack until I find the matching operator.
  - I compute the logical result for that scope and push the result back to the stack.
- After finishing the traversal, the stack will have the final result.

This pattern efficiently handles arbitrary nesting, doesn't risk hitting Python's recursion limits, and is both time and space efficient for this problem size.

### Corner cases to consider  
- Single value expression: `"t"` or `"f"`  
- NOT with only one argument: `"!(t)"` or `"!(f)"`  
- Nested logical operators, e.g., `"!(&(!(&(f)),|(t,f)))"`  
- Expressions with multiple operands: `"&(t,t,t,t)"`  
- Deeply nested balancing: `"|(t,(&(f,!(f)),t))"`

### Solution

```python
def parseBoolExpr(expression: str) -> bool:
    stack = []
    for char in expression:
        if char == ',' or char == '(':
            continue
        if char in ('t', 'f', '!', '&', '|'):
            stack.append(char)
        elif char == ')':
            # Gather all operands for this expression
            vals = []
            while stack[-1] in ('t', 'f'):
                vals.append(stack.pop())
            op = stack.pop()
            # Evaluate based on the operator
            if op == '!':
                # Not: should have exactly one value
                res = 't' if vals[0] == 'f' else 'f'
            elif op == '&':
                res = 't' if all(v == 't' for v in vals) else 'f'
            elif op == '|':
                res = 't' if any(v == 't' for v in vals) else 'f'
            stack.append(res)
    # Final result
    return stack[0] == 't'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Every character is visited once and all stack operations are O(1).
- **Space Complexity:** O(n) in the worst case due to the stack, especially if all tokens are pushed before any reduction.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle expressions with custom (user-defined) logical operators?  
  *Hint: Generalize by allowing a function handler for operators and mapping symbols to behaviors*

- Could you write this solution recursively, and what are the trade-offs?  
  *Hint: Recursion is clean for parsing, but risks stack overflow on deep nesting; use only when input size is small*

- How might you adapt your solution to return the computation steps or a parse tree for debugging or pretty-printing?  
  *Hint: Instead of evaluating immediately, construct and return a tree structure, then evaluate or walk it*

### Summary
This problem follows a classic **expression parsing** pattern, best handled with a stack to manage nested expressions and operator evaluation. The stack-based method avoids deep recursion and is robust for large, deeply-nested inputs—making it ideal for parsing and evaluating not just boolean, but also arithmetic or logic expressions with precedence and grouping. This parsing pattern appears in compilers, calculators, and interpreter implementations.


### Flashcard
Use stack to evaluate nested boolean expressions; push values until hitting ')', then pop and apply operator, push result back.

### Tags
String(#string), Stack(#stack), Recursion(#recursion)

### Similar Problems
