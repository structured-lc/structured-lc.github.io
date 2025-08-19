### Leetcode 770 (Hard): Basic Calculator IV [Practice](https://leetcode.com/problems/basic-calculator-iv)

### Description  
You are given an algebraic expression as a string and a map that provides values for some variables in the expression. The expression uses lowercase letter variables, integers, addition, subtraction, multiplication, and parentheses. Your task is to substitute given values for variables, perform the operations in the correct precedence (parentheses → multiplication → addition/subtraction), simplify and combine like terms, then output a list of strings—one for each term—sorted by degree (variable count) and lexicographically. Coefficients of 1 or -1 should be shown explicitly except for the constant term.

### Examples  

**Example 1:**  
Input:  
expression=`"e + 8 - a + 5"`,  
evalvars=`["e"]`,  
evalints=`[1]`  
Output: `["-1*a","14"]`  
*Explanation: Replace `e` with 1: "1 + 8 - a + 5" ⇒ 14 - a. Output as ["-1*a", "14"] (sorted by variable degree, a before constants).*

**Example 2:**  
Input:  
expression=`"a * b * b + b * a * b + c * a * b"`,  
evalvars=`["b"]`,  
evalints=`[2]`  
Output: `["6*a","1*a*c"]`  
*Explanation: Replace `b` with 2: "a\*2\*2 + 2\*a\*2 + c\*a\*2" ⇒ 4a + 4a + 2ac ⇒ 8a + 2ac. Sort by degree: a > ac.*

**Example 3:**  
Input:  
expression=`"(a - b) * (b - c) + (b - c) * (b - c)"`,  
evalvars=`["a","b","c"]`,  
evalints=`[1,2,3]`  
Output: `["-1"]`  
*Explanation: a=1, b=2, c=3: (1-2)\*(2-3) + (2-3)\*(2-3) ⇒ (-1)\*(-1) + (-1)\*(-1) ⇒ 1+1=2. Only output ["2"].*

### Thought Process (as if you’re the interviewee)  
- Start by parsing/substituting variables with their values.
- Tokenize the expression: break into numbers, operators, variables, and parentheses.
- Observing operator precedence: parentheses take highest, then multiplication, then addition/subtraction.
- Simplify each term as you go, combining like terms (i.e., same set of variables—order-insensitive).
- Store terms as `key-tuple : coefficient`, where key-tuple is a sorted tuple of variables (after removing variables replaced by values).
- For each operation, work in a recursive fashion for parentheses, otherwise do precedence handling with a stack or via recursive descent.
- After evaluation, collect the map into result strings, sorted by number of variables (descending) and lexicographically.
- Final formatting: show coefficients, use '\*' between variable names, order as per problem output rules.

### Corner cases to consider  
- No variables to substitute, expression reduces to numbers.
- Variables occur multiple times in products: a\*b*b.
- Terms with coefficient 0 (should be dropped).
- Very large or deeply nested parentheses.
- Negative coefficients or subtraction combining into 0.
- Variables not in evalvars: remains as variable.
- Term constants (no variables left after substitution).

### Solution

```python
from collections import Counter, defaultdict

def basicCalculatorIV(expression, evalvars, evalints):
    # Map provided variables to their values
    val_dict = dict(zip(evalvars, evalints))
    
    # Tokenizer to split tokens
    def tokenize(expr):
        tokens = []
        i, n = 0, len(expr)
        while i < n:
            if expr[i] == ' ':
                i += 1
            elif expr[i] in "+-*()":
                tokens.append(expr[i])
                i += 1
            else:
                j = i
                while j < n and expr[j] not in " +-*()":
                    j += 1
                tokens.append(expr[i:j])
                i = j
        return tokens
    
    # Helper to add or combine two terms (Counters)
    def combine(a, b, sign=1):
        for k, v in b.items():
            a[k] += sign * v
        return a
    
    # Multiply two terms
    def multiply(a, b):
        res = Counter()
        for k1, v1 in a.items():
            for k2, v2 in b.items():
                # merge variable parts
                if k1 == '':
                    vpart = k2
                elif k2 == '':
                    vpart = k1
                else:
                    vpart = '*'.join(sorted(k1.split('*') + k2.split('*')))
                res[vpart] += v1 * v2
        return res
    
    # Parse expression with recursive descent
    def parse(tokens):
        def parseTerm():
            token = tokens.pop(0)
            if token == '(':
                res = parseExpr()
                tokens.pop(0) # pop ')'
                return res
            elif token.isdigit():
                return Counter({'': int(token)})
            elif token.isalpha():
                if token in val_dict:
                    return Counter({'': val_dict[token]})
                return Counter({token: 1})
            return Counter()
        
        def parseFactor():
            stack = [parseTerm()]
            while tokens and tokens[0] == '*':
                tokens.pop(0)
                stack.append(parseTerm())
            res = stack[0]
            for i in range(1, len(stack)):
                res = multiply(res, stack[i])
            return res
        
        def parseExpr():
            res = parseFactor()
            while tokens and (tokens[0] == '+' or tokens[0] == '-'):
                op = tokens.pop(0)
                fac = parseFactor()
                if op == '+':
                    res = combine(res, fac)
                else:
                    res = combine(res, fac, -1)
            return res
        return parseExpr()
    
    # Main logic
    tokens = tokenize(expression)
    count = parse(tokens)
    
    # Remove zero-coefficient terms
    count = {k: v for k, v in count.items() if v != 0}
    
    # Collect and sort by degree desc and lex
    def sort_key(item):
        k, v = item
        vars_split = k.split('*') if k else []
        return (-len(vars_split), vars_split)
    items = sorted(count.items(), key=sort_key)
    
    # Format output
    res = []
    for vars_part, coeff in items:
        if coeff == 0:
            continue
        s = str(coeff)
        if vars_part:
            s += '*' + vars_part
        res.append(s)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × M), where N = number of tokens and M = unique monomials. Parsing takes O(N), combining terms in Counter can be O(M), and multiplication may temporarily generate more terms.
- **Space Complexity:** O(M), where M is the number of unique monomials in expression, plus O(depth) for call stack due to recursion for deeply nested parentheses.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input expression could include division or exponents?  
  *Hint: Handling would need support for new precedence and term merging logic, possibly requiring greatest common divisor reduction for division.*
  
- How to handle extremely large expressions or variables with arbitrary length?  
  *Hint: Optimize by lazily combining like terms, or using hash-based representations.*

- Can the output include terms in non-canonical order or support customizing the sort order?  
  *Hint: Change the sorting key in formatting step.*

### Summary
This problem applies the *expression parsing* and *evaluation* pattern, including custom operator precedence, variable/value substitution, and canonical result ordering. The techniques (tokenization, recursive descent parser, combining like terms using hash maps/Counters, dealing with operator precedence) are critical for custom interpreters, compilers, and advanced calculators. This pattern generalizes to polynomial arithmetic, symbolic algebra, and any context where parsing followed by structured domain-specific evaluation is needed.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Stack(#stack), Recursion(#recursion)

### Similar Problems
- Parse Lisp Expression(parse-lisp-expression) (Hard)
- Basic Calculator III(basic-calculator-iii) (Hard)