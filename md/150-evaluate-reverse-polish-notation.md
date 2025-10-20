### Leetcode 150 (Medium): Evaluate Reverse Polish Notation [Practice](https://leetcode.com/problems/evaluate-reverse-polish-notation)

### Description  
Given an array of strings called `tokens`, representing an arithmetic expression in **Reverse Polish Notation (RPN)**, evaluate the expression and return the integer result.  
In RPN, every operator follows all of its operands — meaning you never need parentheses to dictate order. Valid operators are `+`, `-`, `*`, `/`. Division between two integers should truncate toward zero (i.e., 3/2 = 1, -3/2 = -1).

### Examples  

**Example 1:**  
Input: `["2", "1", "+", "3", "*"]`  
Output: `9`  
*Explanation: ((2 + 1) × 3) = 9*

**Example 2:**  
Input: `["4", "13", "5", "/", "+"]`  
Output: `6`  
*Explanation: (4 + (13 ÷ 5)) = 4 + 2 = 6*

**Example 3:**  
Input: `["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]`  
Output: `22`  
*Explanation:  
- (9 + 3) = 12  
- (12 × -11) = -132  
- (6 ÷ -132) = 0 ⟶ division truncates toward zero  
- (10 × 0) = 0  
- (0 + 17) = 17  
- (17 + 5) = 22*

### Thought Process (as if you’re the interviewee)  
Reverse Polish Notation eliminates the need for parentheses by always putting operators after operands. The natural way to process RPN is **using a stack**:
- Iterate through `tokens`:
  - If a token is a number, push it onto the stack.
  - If it is an operator, pop the top two numbers, apply the operator, and push the result back.
Brute-force would be to parse and evaluate with repeated scans or string manipulation, but the stack approach is more direct, clean, and efficient.

**Special requirement:**  
Integer division must truncate toward zero, not negative infinity (as in Python's `//` for negative numbers). To handle this, after dividing, use `int(a / b)` instead of `a // b`, so that -1.5 truncates to -1 (towards zero), not -2.

**Trade-offs:**  
- The stack method gives O(n) time and space.  
- No need to pre-process or build expression trees — stack handles everything.

### Corner cases to consider  
- Only one number (e.g. `["42"]`).
- Division resulting in truncation toward zero (e.g. `["-3", "2", "/"]`).
- Very long valid expressions.
- Negative numbers and zero in input.
- Malformed input (spec doesn’t require handling invalid input).
- More operators than possible operands (syntactically incorrect, may ignore per spec).

### Solution

```python
def evalRPN(tokens):
    stack = []
    for token in tokens:
        if (len(token) > 1) or token.isdigit():
            # Handles multi-digit and negative numbers
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == "+":
                stack.append(a + b)
            elif token == "-":
                stack.append(a - b)
            elif token == "*":
                stack.append(a * b)
            elif token == "/":
                # Truncate toward zero, not toward -∞
                stack.append(int(a / b))
    return stack[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each token is processed once; each operation (push, pop, arithmetic) is O(1).
- **Space Complexity:** O(n) — In the worst case (all operands, one operator at the end), the stack can grow to hold almost all tokens.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support more operators, such as exponentiation or supporting functions like max/min?  
  *Hint: Add cases to the operator checks; generalize operation handling.*

- How could you handle variables or context in the expression, e.g., `["x", "1", "+"]` if you’re given a dictionary for variable bindings?  
  *Hint: When encountering a non-numeric token, look up its value in the supplier dictionary.*

- Can this be done in-place to minimize stack space?  
  *Hint: Overwrite the input array; careful index management.*

### Summary
The problem leverages the **stack** pattern, processing tokens left-to-right and evaluating on-the-fly. This is a classic example of stack applications, useful for evaluating postfix, prefix, or even infix expressions (with more work). Recognizing pattern-matching and stack-based processing is essential for many interview problems (like tree traversals, parenthesis matching, and interpreters).


### Flashcard
Use a stack to process tokens left-to-right; push numbers, pop two for each operator, compute, and push the result back—final stack value is the answer.

### Tags
Array(#array), Math(#math), Stack(#stack)

### Similar Problems
- Basic Calculator(basic-calculator) (Hard)
- Expression Add Operators(expression-add-operators) (Hard)