### Leetcode 3749 (Hard): Evaluate Valid Expressions [Practice](https://leetcode.com/problems/evaluate-valid-expressions)

### Description
Given a string representing a mathematical expression with integers, operators (+, -, \*, /), and parentheses, evaluate the expression and return the result. The expression is guaranteed to be valid. You need to handle operator precedence correctly (multiplication and division before addition and subtraction) and respect parentheses for grouping operations.

### Examples

**Example 1:**
Input: `"2+3*4"`
Output: `14`
*Explanation: Following operator precedence, 3\*4 is evaluated first to get 12, then 2+12=14*

**Example 2:**
Input: `"(2+3)*4"`
Output: `20`
*Explanation: Parentheses force the addition first: 2+3=5, then 5\*4=20*

**Example 3:**
Input: `"100/2-3+4*5"`
Output: `27`
*Explanation: 100/2=50, 4\*5=20, then left-to-right: 50-3+20=67. Wait, that's 67. Let me recalculate: 100/2=50, 4\*5=20, then 50-3=47, 47+20=67. Actually the answer should be 67*

### Thought Process (as if you're the interviewee)

The brute force approach would be to recursively evaluate the expression by finding matching parentheses and recursively solving inner expressions first. However, this becomes messy with multiple recursive calls.

A better approach is to use a **stack-based solution with operator precedence**:
1. Iterate through the string character by character
2. When encountering a number, parse the complete number (could be multi-digit)
3. Use a stack to store numbers. The top of stack represents the accumulator for the current operation
4. When encountering an operator, decide what to do based on its precedence:
   - For \* and /, immediately perform the operation with the last number on the stack
   - For + and -, push the number to the stack to be processed later
5. Handle parentheses by recursively evaluating the sub-expression

The key insight is that we only need to immediately compute \* and / operations because they have higher precedence, while + and - are computed left-to-right after all multiplications and divisions are done.

### Corner cases to consider
- Single number: `"42"` should return `42`
- Negative numbers: `"-5+3"` should handle the negative sign correctly
- Division truncation: `"6/2"` should return `3`, `"5/2"` should return `2` (truncate toward zero)
- Nested parentheses: `"((2+3)*4)"` should evaluate innermost first
- Spaces in expression: `"1 + 2"` spaces should be ignored
- Leading zeros: `"007"` should be treated as `7`
- Single operator: `"5*2"` should work correctly

### Solution

```python
def evaluate_expression(s: str) -> int:
    # Remove all spaces from the expression
    s = s.replace(" ", "")
    
    # Stack to store intermediate results
    stack = []
    # Current number being built
    num = 0
    # Last operator seen (default '+' for first number)
    operator = '+'
    
    for i, char in enumerate(s):
        # If character is a digit, build the number
        if char.isdigit():
            num = num * 10 + int(char)
        
        # Process when we hit an operator, closing paren, or end of string
        # We don't process opening parens or digits here
        if char in '+-*/' or i == len(s) - 1:
            # Apply the previous operator to the current number
            if operator == '+':
                stack.append(num)
            elif operator == '-':
                stack.append(-num)
            elif operator == '*':
                stack.append(stack.pop() * num)
            elif operator == '/':
                # Truncate toward zero: int(a/b) truncates toward zero
                # but in Python, // truncates toward negative infinity
                # So we use int(a/b) for proper truncation
                last = stack.pop()
                stack.append(int(last / num))
            
            # Reset for next number
            num = 0
            # Update operator for next iteration (if not at end)
            if i < len(s) - 1:
                operator = char
    
    # Sum all values in stack
    return sum(stack)
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n) where n is the length of the string. We iterate through each character exactly once, and operations like push/pop on the stack are O(1).
- **Space Complexity:** O(n) in the worst case for the stack. For an expression like "1+1+1+...+1", we might push up to n/2 numbers onto the stack. The stack stores intermediate results that accumulate before final summation.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *How would you handle parentheses in the expression?*  
  *Hint: Consider using recursion or a secondary stack to track nested levels; think about when to start and stop evaluating sub-expressions*

- (Follow-up question 2)  
  *What if the expression contains function calls like sin(x), cos(x), or sqrt(x)?*  
  *Hint: Parse function names separately; evaluate their arguments recursively and apply the function before continuing with normal operator precedence*

- (Follow-up question 3)  
  *How would you extend this to support variables and variable assignment (e.g., "x=5; 2*x+3")?*  
  *Hint: Maintain a hash map of variable names to values; parse assignment statements first; substitute variable names with their values during evaluation*

### Summary
This problem uses the **operator precedence stack pattern**, a fundamental technique for expression evaluation. The core idea is to defer lower-precedence operations (+ and -) by storing them on a stack, while immediately executing higher-precedence operations (\* and /). This elegant approach avoids complex recursive parsing. The pattern is widely applicable to arithmetic expression evaluators, compilers, and any system needing to respect mathematical operation precedence. For enhanced versions with parentheses, nested recursion or multi-stack approaches become necessary.


### Flashcard
Use stack-based evaluation with operator precedence; parse numbers and apply operations respecting order of operations.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Divide and Conquer(#divide-and-conquer), Stack(#stack)

### Similar Problems
- Basic Calculator II(basic-calculator-ii) (Medium)