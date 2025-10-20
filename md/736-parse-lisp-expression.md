### Leetcode 736 (Hard): Parse Lisp Expression [Practice](https://leetcode.com/problems/parse-lisp-expression)

### Description  
You are given a string representing a Lisp-like expression that you must parse and evaluate to return an integer value.  
Expressions can be:
- A signed integer (e.g. `"2"`, `"-5"`)
- A variable (lowercase word) whose value is defined in the nearest enclosing scope
- A let-expression:  
  `(let v₁ e₁ v₂ e₂ ... vₙ eₙ expr)`  
  Each `vᵢ` is assigned the value of `eᵢ` in sequence, then the result is the value of the final `expr`. Variables are scoped within this expression.
- An add-expression:  
  `(add e₁ e₂)` is the sum of `e₁` and `e₂`
- A mult-expression:  
  `(mult e₁ e₂)` is the product of `e₁` and `e₂`
The parser needs to handle nested expressions and variable scoping as in a real Lisp interpreter.

### Examples  

**Example 1:**  
Input: `(add 1 2)`  
Output: `3`  
*Explanation: Simple addition. 1 + 2 = 3.*

**Example 2:**  
Input: `(mult 3 (add 2 3))`  
Output: `15`  
*Explanation: First `add 2 3` evaluates to 5, then `mult 3 5` is 15.*

**Example 3:**  
Input: `(let x 2 (mult x 5))`  
Output: `10`  
*Explanation:  
- Assign x = 2 in the current scope.
- Evaluate `(mult x 5)`: x resolves to 2, so `2 * 5 = 10`.*

**Example 4:**  
Input: `(let x 2 x 3 (add x x))`  
Output: `6`  
*Explanation:  
- Assign x = 2, then x = 3 (overwrites in same scope).
- Finally evaluate `(add x x)` → 3 + 3 = 6.*

**Example 5:**  
Input: `(let x 1 y 2 x (add x y) (add x y))`  
Output: `5`  
*Explanation:  
- Assign x = 1, y = 2.
- Assign x = (add x y) = 3.
- Evaluate (add x y) = 3 + 2 = 5.*

**Example 6:**  
Input: `(let x 2 (add (let x 3 (let x 4 x)) x))`  
Output: `6`  
*Explanation:  
- The inner-most (let x 4 x) gives 4, then (let x 3 ...) makes x=3, but the next scope returns 4.
- Add 4 and the outer x=2; 4 + 2 = 6.*

### Thought Process (as if you’re the interviewee)  
First, I notice that this is parsing and evaluating a custom language, so recursion and scoping are key.  
A brute-force solution might tokenize the entire input and try to manually interpret each string, but given the possibility of nested expressions and variable scopes, it gets complicated to do this iteratively.

A better idea is to **write a recursive function** that:
- Takes the current expression string and a variable scope mapping (dictionary).
- For numbers, simply return as int.
- For variables, look up value in the current or any enclosing scope.
- For let/add/mult expressions, parse out each subexpression:
    - For "add" and "mult", recursively evaluate their two parts.
    - For "let", update the scope with each variable assignment (being careful to make a local "copy" for each recursive layer).
- Use parsing logic that can accurately extract tokens or subexpressions, even if they’re parenthesized and nested.

Scope is important: for each let expression, create a new dictionary that copies the outer scope and adds/overwrites as variables are set. When exiting, the outer scope is restored.

Final approach: recursive descent parser that carefully manages variable scoping using dictionaries or stacks.

### Corner cases to consider  
- Deeply nested expressions, e.g. many layers of `(let x ... (add (let y ...)))`
- Re-assignment of same variable within a `let`
- Variable with same name at different depths (should use innermost definition)
- Directly evaluating numbers or variables (not always parenthesized)
- Negative numbers and integer parsing
- Variables referencing other variables
- No extraneous whitespace (inputs are always legal)
- Very large/small numbers

### Solution

```python
class Solution:
    def evaluate(self, expression: str) -> int:
        # Helper to tokenize input with respect to parentheses
        def parse(s):
            tokens, bal, token = [], 0, ""
            for c in s + " ":
                if c == '(':
                    bal += 1
                if c == ')':
                    bal -= 1
                if c == ' ' and bal == 0:
                    if token:
                        tokens.append(token)
                        token = ""
                else:
                    token += c
            return tokens
        
        def eval_expr(expr, scope):
            if expr[0] != '(':  # either number or variable
                if expr[0] in '-0123456789':
                    return int(expr)
                return scope[expr]
            # remove parentheses
            e = expr[1:-1]
            if e.startswith("add"):
                tokens = parse(e[4:])
                return eval_expr(tokens[0], scope) + eval_expr(tokens[1], scope)
            elif e.startswith("mult"):
                tokens = parse(e[5:])
                return eval_expr(tokens[0], scope) * eval_expr(tokens[1], scope)
            elif e.startswith("let"):
                tokens = parse(e[4:])
                local = scope.copy()
                # process variable assignments
                i = 0
                while i + 1 < len(tokens):
                    # last expr: not an assignment
                    if i + 2 == len(tokens):
                        break
                    local[tokens[i]] = eval_expr(tokens[i+1], local)
                    i += 2
                return eval_expr(tokens[-1], local)
        return eval_expr(expression, {})
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the expression. Each character is processed at most a constant number of times due to recursive descent and tokenization.
- **Space Complexity:** O(N), due to recursion stack for nested expressions and extra dictionaries for variable scopes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle expressions that are not syntactically valid?
  *Hint: Add syntax validation before or while parsing/tokens.*

- How could you optimize scope/dictionary copying to reduce space/time?
  *Hint: Use stack of scopes and only store diffs.*

- How would you extend this to support additional operations, such as subtraction or division?
  *Hint: Modularize operation-handling by mapping operation names to functions.*

### Summary
This problem is a classic example of **recursive parsing and evaluation** with variable scoping, a pattern seen in language interpreters and some compilers. The approach centers around recursive descent parsing and scope management using dictionaries. This technique generalizes to many problems requiring parsing and interpreting nested/structured expressions, such as evaluating arithmetic expressions with variables, or implementing other scripting/DSL interpreters.


### Flashcard
Write recursive evaluator that parses expressions by type (let/add/mult), maintains variable scope dictionary, and handles nested expressions through recursion.

### Tags
Hash Table(#hash-table), String(#string), Stack(#stack), Recursion(#recursion)

### Similar Problems
- Ternary Expression Parser(ternary-expression-parser) (Medium)
- Number of Atoms(number-of-atoms) (Hard)
- Basic Calculator IV(basic-calculator-iv) (Hard)