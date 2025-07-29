### Leetcode 439 (Medium): Ternary Expression Parser [Practice](https://leetcode.com/problems/ternary-expression-parser)

### Description  
Given a string expression representing arbitrarily nested ternary expressions, evaluate the expression and return the result.

You can always assume that the given expression is valid and only contains digits, '?', ':', 'T', and 'F' where 'T' is true and 'F' is false.

### Examples  

**Example 1:**  
Input: `expression = "T?2:3"`  
Output: `"2"`  
*Explanation: If true, then result is 2; otherwise result is 3.*

**Example 2:**  
Input: `expression = "F?1:T?4:5"`  
Output: `"4"`  
*Explanation: The conditional expressions group right-to-left. F?1:(T?4:5) → F?1:4 → 4*

**Example 3:**  
Input: `expression = "T?T?F:5:3"`  
Output: `"F"`  
*Explanation: The conditional expressions group right-to-left. T?(T?F:5):3 → T?F:3 → F*

### Thought Process (as if you're the interviewee)  
This problem involves parsing and evaluating nested ternary expressions. The key insights:

1. **Right-to-left evaluation**: Ternary expressions are right-associative
2. **Recursive structure**: Each ternary expression can contain nested ternary expressions
3. **Base cases**: Single characters (T, F, or digits)

Approaches:
1. **Recursive descent parsing**: Parse from left to right with proper precedence
2. **Stack-based evaluation**: Use stack to handle nested expressions
3. **Right-to-left scanning**: Process from right to left to handle associativity

The recursive approach mirrors the natural structure of ternary expressions.

### Corner cases to consider  
- Single character (T, F, or digit)
- No nested expressions
- Deeply nested expressions
- Multiple digits in result
- All true conditions
- All false conditions

### Solution

```python
def parseTernary(expression):
    # Base case: single character
    if len(expression) == 1:
        return expression
    
    # Find the main ternary operator
    # We need to find the '?' that corresponds to the outermost expression
    
    # The first character is the condition
    condition = expression[0]
    
    # Find the matching ':' for the first '?'
    question_count = 0
    colon_index = -1
    
    for i in range(1, len(expression)):
        if expression[i] == '?':
            question_count += 1
        elif expression[i] == ':':
            if question_count == 0:
                colon_index = i
                break
            question_count -= 1
    
    # Extract true and false branches
    true_branch = expression[2:colon_index]
    false_branch = expression[colon_index + 1:]
    
    # Recursively evaluate based on condition
    if condition == 'T':
        return parseTernary(true_branch)
    else:
        return parseTernary(false_branch)

# Stack-based approach
def parseTernaryStack(expression):
    stack = []
    
    # Process from right to left
    for i in range(len(expression) - 1, -1, -1):
        char = expression[i]
        
        if char.isdigit() or char in 'TF':
            # Push operand to stack
            stack.append(char)
        elif char == '?':
            # Pop condition, true_val, false_val and evaluate
            true_val = stack.pop()
            false_val = stack.pop()
            condition = stack.pop()
            
            # Push result back to stack
            if condition == 'T':
                stack.append(true_val)
            else:
                stack.append(false_val)
        # Skip ':' as it's just a separator
    
    return stack[0]

# Iterative approach with proper parsing
def parseTernaryIterative(expression):
    def find_matching_colon(start):
        """Find the colon that matches the question mark at start."""
        count = 0
        for i in range(start + 1, len(expression)):
            if expression[i] == '?':
                count += 1
            elif expression[i] == ':':
                if count == 0:
                    return i
                count -= 1
        return -1
    
    def evaluate(expr):
        if len(expr) == 1:
            return expr
        
        condition = expr[0]
        colon_pos = find_matching_colon(0)
        
        true_part = expr[2:colon_pos]
        false_part = expr[colon_pos + 1:]
        
        if condition == 'T':
            return evaluate(true_part)
        else:
            return evaluate(false_part)
    
    return evaluate(expression)

# Alternative stack approach processing left to right
def parseTernaryLeftToRight(expression):
    stack = []
    i = 0
    
    while i < len(expression):
        char = expression[i]
        
        if char in 'TF' or char.isdigit():
            stack.append(char)
        elif char == '?':
            # We have a condition on stack, next is true value
            pass  # Just move to next character
        elif char == ':':
            # We have condition and true value, next is false value
            # But we need to wait for the false value
            pass
        
        # Check if we can evaluate a complete ternary expression
        if len(stack) >= 3 and i > 0 and expression[i-1] != '?':
            # Try to evaluate if we have a complete pattern
            # This approach gets complex, recursive is cleaner
            pass
        
        i += 1
    
    # This approach needs more complex logic, recursive is better
    return parseTernary(expression)

# Clean recursive solution with helper
def parseTernaryClean(expression):
    def parse(index):
        """Parse starting from index, return (result, next_index)."""
        if index >= len(expression):
            return "", index
        
        char = expression[index]
        
        # If it's a simple value, return it
        if char in 'TF' or char.isdigit():
            if index + 1 < len(expression) and expression[index + 1] == '?':
                # This is a condition, parse the ternary
                condition = char
                # Skip the '?'
                true_val, next_idx = parse(index + 2)
                # Skip the ':'
                false_val, final_idx = parse(next_idx + 1)
                
                if condition == 'T':
                    return true_val, final_idx
                else:
                    return false_val, final_idx
            else:
                # Simple value
                return char, index + 1
        
        return "", index + 1
    
    result, _ = parse(0)
    return result

# Most straightforward recursive approach
def parseTernarySimple(expression):
    if len(expression) == 1:
        return expression
    
    # Find the main '?' and ':' pair
    condition = expression[0]
    
    # Count nested ternary expressions to find the right ':'
    count = 0
    for i in range(2, len(expression)):
        if expression[i] == '?':
            count += 1
        elif expression[i] == ':':
            if count == 0:
                # This is our matching ':'
                true_expr = expression[2:i]
                false_expr = expression[i+1:]
                
                if condition == 'T':
                    return parseTernarySimple(true_expr)
                else:
                    return parseTernarySimple(false_expr)
            else:
                count -= 1
    
    return expression  # Should not reach here for valid input

# Using deque for cleaner stack operations
def parseTernaryDeque(expression):
    from collections import deque
    
    stack = deque()
    
    # Process from right to left
    for char in reversed(expression):
        if char.isdigit() or char in 'TF':
            stack.append(char)
        elif char == '?':
            # We have condition on stack, followed by true and false values
            condition = stack.pop()
            true_val = stack.pop()
            false_val = stack.pop()
            
            result = true_val if condition == 'T' else false_val
            stack.append(result)
        # Skip ':' characters
    
    return stack[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the expression. Each character is processed a constant number of times.
- **Space Complexity:** O(n) for the recursion stack in worst case (deeply nested expressions) or O(n) for the explicit stack approach.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to handle ternary expressions with string values instead of single characters?  
  *Hint: Modify parsing to handle multi-character tokens, use tokenization before evaluation.*

- What if the ternary operator had different precedence rules (left-associative instead of right-associative)?  
  *Hint: Change the parsing order and the way you find matching operators.*

- How would you extend this to handle other operators like && and || in the conditions?  
  *Hint: Build a full expression parser with operator precedence and recursive descent parsing.*

- Can you optimize this for repeated evaluation of the same expression with different variable values?  
  *Hint: Build an abstract syntax tree (AST) once and evaluate it multiple times.*

### Summary
This problem demonstrates recursive parsing of nested expressions with proper precedence handling. The key insight is recognizing the right-associative nature of ternary operators and using recursion to handle the nested structure naturally. This pattern is fundamental in compiler design, expression evaluation, and parsing algorithms. Understanding how to match operators across nested structures is crucial for building interpreters and evaluating complex expressions.
