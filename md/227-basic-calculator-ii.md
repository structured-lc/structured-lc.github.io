### Leetcode 227 (Medium): Basic Calculator II [Practice](https://leetcode.com/problems/basic-calculator-ii)

### Description  
Given a string `s` representing a basic mathematical expression with **non-negative integers**, spaces, and the operators **+, -, \*, /** (*no parentheses*), evaluate the expression and return the result as an integer.  
- Division should truncate toward zero.
- The string may contain spaces.
- All operations are binary and have normal arithmetic operator precedence (\* and / before + and -).

### Examples  

**Example 1:**  
Input: `"3+2*2"`  
Output: `7`  
*Explanation: Evaluate: 2 × 2 = 4, then 3 + 4 = 7.*

**Example 2:**  
Input: `" 3/2 "`  
Output: `1`  
*Explanation: 3 ÷ 2 = 1.5, truncated toward zero yields 1.*

**Example 3:**  
Input: `" 3+5 / 2 "`  
Output: `5`  
*Explanation: 5 ÷ 2 = 2, then 3 + 2 = 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Parse the string left to right and evaluate each operation.  
  - Does not work directly—operator precedence for \* and / over + and - causes issues.

- **Improved Approach:**  
  - Use a **stack** to handle operator precedence.  
  - For each character:
    - If current char is a digit, build the current number.
    - When encountering an operator (or at the end), handle previous number and operator:
      - For ‘+’ and ‘-’, push ±number onto the stack.
      - For ‘\*’ and ‘/’, pop last number from stack, apply operation immediately, push result back.
  - Sum all values in the stack at the end.
  - This approach ensures correct operator precedence and processes the string in one pass.[1][2]

- **Trade-offs:**  
  - Stack-based methods are efficient and readable, and they naturally deal with operator precedence without a parser.

### Corner cases to consider  
- String has leading/trailing/multiple internal spaces.
- Contains only one number, e.g. `"42"`.
- Consecutive operations only with “\*” or “/”.
- Division by zero is not specified (assume input is valid).
- Very large numbers (consider integer overflow).
- Single operator at the start or end (invalid—problem says input is valid).
- All operators are one kind: `"2*3*4"` or `"8/2/2"`.
- No spaces, many spaces, or uneven spacing.

### Solution

```python
def calculate(s: str) -> int:
    # Initialize the stack, current number, and current sign
    stack = []
    num = 0
    op = '+'
    n = len(s)

    for i, char in enumerate(s):
        if char.isdigit():
            num = num * 10 + int(char)
        # If char is an operator or we're at end of string
        if (char in "+-*/" or i == n - 1):
            if op == '+':
                stack.append(num)
            elif op == '-':
                stack.append(-num)
            elif op == '*':
                stack.append(stack.pop() * num)
            elif op == '/':
                prev = stack.pop()
                # Integer division truncating toward zero
                stack.append(int(prev / num))
            op = char
            num = 0
        # Ignore spaces

    return sum(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each character is processed once. All stack operations are O(1).
- **Space Complexity:** O(n)  
  - In the worst case (e.g. all addition/subtraction), stack holds up to n/2 numbers.

### Potential follow-up questions (as if you’re the interviewer)  

- **What changes if the input contains parentheses?**  
  *Hint: You’ll need a recursive approach or a stack-of-stacks to handle nested evaluation.*

- **Can you handle floating-point numbers and division with decimals?**  
  *Hint: Adjust parsing to build float, change division logic to avoid truncation.*

- **How would you extend this to support variables and assignment?**  
  *Hint: You’ll need a symbol table (dictionary) to store and retrieve variable values.*

### Summary
This is a **classic stack-based parsing** problem, commonly encountered when evaluating mathematical expressions respecting operator precedence. The stack holds results that can’t be combined until higher precedence (multiplication/division) are resolved. The approach is reusable for more complex expression evaluators—such as handling parentheses, or interpreters/calculators for scripting languages. This pattern (single-pass with stack for precedence management) is common in parsing and calculator problems.


### Flashcard
Use a stack to handle operator precedence; scan left to right, pushing numbers for +/-, and immediately computing × and ÷ before pushing results.

### Tags
Math(#math), String(#string), Stack(#stack)

### Similar Problems
- Basic Calculator(basic-calculator) (Hard)
- Expression Add Operators(expression-add-operators) (Hard)
- Basic Calculator III(basic-calculator-iii) (Hard)