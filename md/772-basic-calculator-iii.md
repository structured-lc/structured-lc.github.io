### Leetcode 772 (Hard): Basic Calculator III [Practice](https://leetcode.com/problems/basic-calculator-iii)

### Description  
Implement a **basic calculator** that can evaluate a string containing non-negative integers, '+', '-', '\*', '/', parentheses '(', ')', and spaces.  
The calculator should respect the standard operator precedence:
- Multiplication and division have higher precedence than addition and subtraction.
- Parentheses can override precedence, so always compute their contents first.
- Divisions should truncate towards zero.  
No usage of built-in string evaluation like `eval` is allowed.  
The input expression is always valid and evaluates to an integer.

### Examples  

**Example 1:**  
Input: `2*(5+5\*2)/3+(6/2+8)`  
Output: `21`  
*Explanation:*
- Evaluate the innermost parentheses:  
  - `5 + 5\*2` → `5 + 10 = 15`  
  - `6/2 + 8` → `3 + 8 = 11`  
- So expression becomes: `2\*15/3 + 11`  
  - `2\*15 = 30`  
  - `30/3 = 10`  
  - `10 + 11 = 21`

**Example 2:**  
Input: `(2+6\*3+5-(3\*14/7+2)\*5)+3`  
Output: `-12`  
*Explanation:*
- Evaluate innermost:  
  - `3\*14/7 + 2` → `42/7 + 2 = 6 + 2 = 8`  
  - `(2 + 6\*3 + 5 - 8\*5) + 3`  
  - `6\*3 = 18`  
  - `2 + 18 + 5 = 25`  
  - `8\*5 = 40`  
  - `25 - 40 = -15`  
  - `-15 + 3 = -12`

**Example 3:**  
Input: `6-4 / 2 `  
Output: `4`  
*Explanation:*  
- `4 / 2 = 2`  
- `6 - 2 = 4`

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Attempting to parse and evaluate directly would fail due to precedence and parentheses.  
- **Stack-based parsing:** Use **two stacks**: one for numbers (operands), one for operators.
  - When encountering a digit, convert to full number and push.
  - When encountering an operator, process existing stacks for higher/equal precedence operators.
  - When encountering '(', push to operators stack.
  - When encountering ')', process the stack until '(' is found.
  - At the end, process any remaining operators.

This approach works efficiently and naturally handles precedence and nested parentheses. The alternative is recursive descent parsing, but stack-based is direct and iterative.

### Corner cases to consider  
- Expressions with multiple nested parentheses, e.g., `((2+3)\*(2+2))`
- Spaces at the start, end, or between characters, e.g., `  2 + 3 \* 5 `
- Leading negative/positive, e.g., `-5+3`
- Integer division should truncate toward zero, e.g., `-7 / 2` should yield `-3`
- No parentheses and only numbers/operators, e.g., `42`
- Single number input, e.g., `1`

### Solution

```python
def calculate(s: str) -> int:
    def precedence(op):
        if op in ('+', '-'): return 1
        if op in ('*', '/'): return 2
        return 0

    def apply_op(a, b, op):
        if op == '+': return a + b
        if op == '-': return a - b
        if op == '*': return a * b
        if op == '/':
            # truncate towards zero
            return int(a / b)
        return 0

    nums = []
    ops = []
    i = 0
    n = len(s)

    while i < n:
        if s[i] == ' ':
            i += 1
            continue
        if s[i] == '(':
            ops.append(s[i])
            i += 1
        elif s[i].isdigit():
            num = 0
            while i < n and s[i].isdigit():
                num = num * 10 + int(s[i])
                i += 1
            nums.append(num)
        elif s[i] == ')':
            while ops and ops[-1] != '(':
                b = nums.pop()
                a = nums.pop()
                op = ops.pop()
                nums.append(apply_op(a, b, op))
            ops.pop()  # remove '('
            i += 1
        else:  # operator
            while ops and ops[-1] != '(' and precedence(ops[-1]) >= precedence(s[i]):
                b = nums.pop()
                a = nums.pop()
                op = ops.pop()
                nums.append(apply_op(a, b, op))
            ops.append(s[i])
            i += 1

    while ops:
        b = nums.pop()
        a = nums.pop()
        op = ops.pop()
        nums.append(apply_op(a, b, op))

    return nums[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is processed a constant number of times (pushed/popped from a stack).
- **Space Complexity:** O(n), for using stacks to store numbers and operators, especially for deeply nested parentheses.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle supporting floating point numbers?
  *Hint: Consider how parsing and division/operations would differ.*

- How would the solution scale with huge expressions (millions of operations)?
  *Hint: Stack depth and memory can become an issue; maybe stream processing.*

- Can you modify the parser to output the expression tree instead of directly evaluating?
  *Hint: Instead of applying ops, build and return tree nodes.*

### Summary
This solution uses the classic **infix expression evaluation with two stacks** (numbers and operators), handling operator precedence and parentheses. It's a variant of the Shunting Yard algorithm, a standard parsing approach used in calculator and interpreter projects. This pattern is commonly applied wherever nested or precedence-sensitive expressions must be safely evaluated without using unsafe built-ins.

### Tags
Math(#math), String(#string), Stack(#stack), Recursion(#recursion)

### Similar Problems
- Basic Calculator(basic-calculator) (Hard)
- Basic Calculator II(basic-calculator-ii) (Medium)
- Basic Calculator IV(basic-calculator-iv) (Hard)
- Build Binary Expression Tree From Infix Expression(build-binary-expression-tree-from-infix-expression) (Hard)