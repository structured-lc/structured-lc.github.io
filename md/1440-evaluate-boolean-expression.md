### Leetcode 1440 (Medium): Evaluate Boolean Expression [Practice](https://leetcode.com/problems/evaluate-boolean-expression)

### Description  
Given a string representing a valid boolean expression, evaluate it and return its value (true or false). The expression may include:
- 't' for true, 'f' for false
- logical NOT ('!'), AND ('&'), OR ('|') operators
- Parentheses '(' and ')'
- Operators can have multiple arguments, separated by commas within parentheses, e.g., `|(t,f)`, `&(t,f,t)`, `!(f)`

### Examples  

**Example 1:**  
Input: `"!(f)"`  
Output: `true`  
*Explanation: NOT of false is true*

**Example 2:**  
Input: `"|(f,t)"`  
Output: `true`  
*Explanation: OR of false and true is true*

**Example 3:**  
Input: `"&(t,f)"`  
Output: `false`  
*Explanation: AND of true and false is false*

**Example 4:**  
Input: `"|(&(t,f,t),!(t))"`  
Output: `false`  
*Explanation: Evaluate inner AND: (t,f,t) → false, then NOT of t → false, OR(false, false) → false*


### Thought Process (as if you’re the interviewee)  

First, notice that the expression can have nested operations and operators can have multiple arguments.

Brute-force: Parse the expression recursively, evaluating the result from the inside out. But since parsing nested parentheses can be tricky, a stack-based approach is more robust.

Optimal:
- Iterate over each character. Push 't', 'f', operators, and '(' to the stack as you encounter them.
- When you hit a ')', collect all values and operators since the last '('. Depending on the operator before '(', pop values and apply the operator.
- Replace the evaluated block with its boolean result, proceeding until the entire string is evaluated.

This is efficient for this problem and avoids writing a custom recursive parser.


### Corner cases to consider  
- Single value expressions, like 't' or 'f'
- Nested expressions with varying operator arity
- Multiple operator arguments (e.g., &(t,t,f,f))
- Mixed nested depth and combination of all operators
- Edge: Completely nested, like !(|(f,&(t)))


### Solution

```python
# Evaluate a boolean expression using a stack approach

def parseBoolExpr(expression: str) -> bool:
    stack = []
    for ch in expression:
        if ch == ',':
            continue
        elif ch == ')':
            vals = []
            while stack and stack[-1] != '(':
                vals.append(stack.pop())
            stack.pop()  # Remove '('
            op = stack.pop()  # Get operator before '('
            if op == '!':
                res = 't' if vals[0] == 'f' else 'f'
            elif op == '&':
                res = 't' if all(v == 't' for v in vals) else 'f'
            elif op == '|':
                res = 't' if any(v == 't' for v in vals) else 'f'
            stack.append(res)
        else:
            stack.append(ch)
    return stack[0] == 't'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the expression string; we visit each character once and all stack operations are O(1).
- **Space Complexity:** O(n), worst case all characters are stacked due to nesting; no extra data structures apart from the stack.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input expression is not guaranteed to be valid?  
  *Hint: How can you handle invalid syntax or illegal nesting?*

- Can you support additional operators, like XOR or implication?  
  *Hint: Extend the case logic in the evaluation step.*

- How to modify the code to return the result as a string, or print a trace of the computation?  
  *Hint: Track subexpression results and build an output log as you evaluate.*

### Summary
This problem leverages the classical stack-based parsing pattern used for evaluating expressions with parentheses and operators. The key insight is processing the innermost expressions first, which naturally fits a stack, and is extendable to support any new operators. This technique is very common in expression evaluation, calculators, and compilers.