### Leetcode 224 (Hard): Basic Calculator [Practice](https://leetcode.com/problems/basic-calculator)

### Description  
Given a string representing a mathematical expression with **non-negative integers**, the **addition (+)** and **subtraction (-)** operators, and possible use of **parentheses** for grouping, evaluate and return the expression’s result. The input is always a *valid* expression, can contain spaces, and all results fit within a standard 32-bit integer.  
You must not use the Python `eval()` function or similar shortcuts. Your solution must correctly respect order of operations (parentheses) and handle nested brackets and multi-digit numbers.

### Examples  

**Example 1:**  
Input: `"(1+(4+5+2)-3)+(6+8)"`  
Output: `23`  
*Explanation: (1 + (4 + 5 + 2) - 3) + (6 + 8) ⟶ (1 + 11 - 3) + 14 ⟶ 9 + 14 ⟶ 23*

**Example 2:**  
Input: `" 2-1 + 2 "`  
Output: `3`  
*Explanation: Spaces are ignored; calculate left to right: 2 - 1 + 2 ⟶ 1 + 2 ⟶ 3.*

**Example 3:**  
Input: `"(7)-(0)+(4)"`  
Output: `11`  
*Explanation: (7) - (0) + (4) ⟶ 7 - 0 + 4 ⟶ 11*

### Thought Process (as if you’re the interviewee)  
First, I need to parse the string from left to right, handling spaces, parsing multi-digit numbers, and respecting parentheses.  
A naive solution would parse numbers and simply evaluate left to right, but that would not correctly handle nested parentheses.  

The optimal approach is to use a **stack**:

- When we see a number, we form the full value (handle multi-digit).
- When we see a `+` or `-`, we keep track of the current sign for the next number.
- When we see `'('`, we “push” the current result and sign onto a stack and reset them for the new expression context.
- When we see `')'`, we complete the calculation inside, then “pop” the previous result and sign, and combine.
- For each character, we update our running result.

The stack approach is natural for handling nesting, very efficient, and works in one pass (O(n) time/space).

### Corner cases to consider  
- Numbers with more than one digit  
- Spaces between operators and numbers  
- Nested parentheses: e.g., `"1-(3-(4+5))"`  
- Expressions starting with a negative number  
- Single number, e.g., `"42"`  
- No parentheses  
- Parentheses around the entire expression  
- Input with no spaces at all  
- Input with all spaces

### Solution

```python
def calculate(s: str) -> int:
    stack = []
    ans = 0        # Cumulative result
    num = 0        # Current number being formed
    sign = 1       # 1 for +, -1 for -
    i = 0
    n = len(s)
    
    while i < n:
        char = s[i]
        
        if char.isdigit():
            num = 0
            # Form the entire number (could be multiple digits)
            while i < n and s[i].isdigit():
                num = num * 10 + int(s[i])
                i += 1
            ans += sign * num
            continue  # already incremented i for digit(s)
        
        elif char == '+':
            sign = 1
        
        elif char == '-':
            sign = -1
        
        elif char == '(':
            # Push result and sign for the new context
            stack.append(ans)
            stack.append(sign)
            ans = 0
            sign = 1
        
        elif char == ')':
            # Finish the expression inside the parenthesis
            ans = stack.pop() * ans  # sign before '('
            ans += stack.pop()       # result before '('
        
        # Ignore spaces

        i += 1
        
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we scan each character only once, parsing numbers, handling signs/parentheses in one pass.
- **Space Complexity:** O(n) in the worst case, if all characters are in parentheses or we repeatedly nest, since each ‘(’ pushes two items onto the stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to handle multiplication and division?
  *Hint: You’ll need to follow operator precedence, and may need to modify your stack logic or use multiple stacks.*

- Can you implement the solution recursively instead of using an explicit stack?
  *Hint: Write a helper function that evaluates a substring and uses the call stack as the parse stack.*

- How would your approach change if the input could include negative numbers directly, e.g., `"-(3+2)"`?
  *Hint: Pay attention to unary negation and operator placement; treat it in the sign management logic.*

### Summary
This problem is a classic **expression evaluation** scenario. The key pattern used is **stack-based parsing** to handle nested subexpressions, a fundamental parsing technique. This coding approach applies to arithmetic interpreters, compilers, and cases when you must parse or evaluate expressions with nesting and order. The pattern can also be seen in problems involving directory path simplification, evaluating reverse polish notation, and balanced parenthesis validation, among others.


### Flashcard
Parse string with a stack; handle numbers, signs, and parentheses by pushing/popping context and accumulating results.

### Tags
Math(#math), String(#string), Stack(#stack), Recursion(#recursion)

### Similar Problems
- Evaluate Reverse Polish Notation(evaluate-reverse-polish-notation) (Medium)
- Basic Calculator II(basic-calculator-ii) (Medium)
- Different Ways to Add Parentheses(different-ways-to-add-parentheses) (Medium)
- Expression Add Operators(expression-add-operators) (Hard)
- Basic Calculator III(basic-calculator-iii) (Hard)
- The Score of Students Solving Math Expression(the-score-of-students-solving-math-expression) (Hard)
- Minimize Result by Adding Parentheses to Expression(minimize-result-by-adding-parentheses-to-expression) (Medium)