### Leetcode 726 (Hard): Number of Atoms [Practice](https://leetcode.com/problems/number-of-atoms)

### Description  
You're given a string representing a **chemical formula**. The formula can contain element names (starting with an uppercase letter, optionally followed by lowercase letters), numbers representing element counts, and parentheses to group sub-formulas with possible multipliers. Your task is to **count each atom** and return a string listing all atoms in alphabetical order, followed by their counts (if more than 1), e.g., `"H2O"` for 2 hydrogens and 1 oxygen. The parser must handle nested parentheses, missing counts (default to 1), and correct multiplication for groups or sub-formulas.

### Examples  

**Example 1:**  
Input: `H2O`  
Output: `H2O`  
*Explanation: "H" has count 2, "O" has count 1.*

**Example 2:**  
Input: `Mg(OH)2`  
Output: `H2MgO2`  
*Explanation: "Mg" (1), parenthesis group "OH" (so O:1, H:1) multiplied by 2, so O:2, H:2.*

**Example 3:**  
Input: `K4(ON(SO3)2)2`  
Output: `K4N2O14S4`  
*Explanation:  
- "K": 4,  
- "ON(SO3)2" ×2  
    - "O": 1, "N": 1,  
    - "(SO3)2": S:2, O:6 (S:1×2; O:3×2)  
  So after expanding and multiplying by outer ×2:  
    - N: 1×2=2, O: (1+6)×2=14, S:2×2=4.*

### Thought Process (as if you’re the interviewee)  
First, I'd look at the problem as parsing a context-free grammar with nested parentheses and multipliers, which hints at recursion or stacks.

**Brute-force idea:**  
I could scan the string and, every time I see '(', recursively parse the sub-formula, and every time I see an uppercase letter, read the element name and its count. However, managing nested parentheses using only indices could get messy.

**Optimize with stack:**  
Use a stack to maintain the current mapping of element counts at each level. When we see '(', push a new counter onto the stack. When we see ')', pop the mapping, multiply all counts by the multiplier following the ')', and merge back to the previous stack level. 

This stack-based solution neatly handles arbitrarily nested parentheses and multiplicative grouping. At the end, sort the element names and concatenate to build the result string.

Trade-offs:  
- Recursion and stack both work. Explicit stack is easier for iterative parsing.
- Need careful handling of numbers (may have multiple digits!).
- Must build correct result string per problem requirements.

### Corner cases to consider  
- Nested parentheses: `"((H)2O)2"`
- No count after group/element (imply count = 1): `"CO"`
- Large numbers: `"C12H22O11"`
- Element names with more than one character: `"He2O"`
- Empty or invalid formula (unlikely per prompt, but worth thinking about)
- Adjacent parenthesis without count: `"(H2)O"`

### Solution

```python
def countOfAtoms(formula: str) -> str:
    from collections import defaultdict

    # Helper function to parse a number starting at index i
    def parse_num():
        nonlocal i
        if i == n or not formula[i].isdigit():
            return 1
        num = 0
        while i < n and formula[i].isdigit():
            num = num * 10 + int(formula[i])
            i += 1
        return num

    # Helper function to parse an element name starting at index i
    def parse_name():
        nonlocal i
        name = formula[i]  # always uppercase at start
        i += 1
        while i < n and formula[i].islower():
            name += formula[i]
            i += 1
        return name

    stack = [defaultdict(int)]
    i, n = 0, len(formula)

    while i < n:
        if formula[i] == '(':
            stack.append(defaultdict(int))
            i += 1
        elif formula[i] == ')':
            i += 1
            mult = parse_num()
            top = stack.pop()
            for atom, count in top.items():
                stack[-1][atom] += count * mult
        else:  # parse element name
            name = parse_name()
            count = parse_num()
            stack[-1][name] += count

    result = ''
    for atom in sorted(stack[-1]):
        count = stack[-1][atom]
        result += atom + (str(count) if count > 1 else '')
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k log k)
  - n = length of the formula (each character processed once)
  - k = number of unique atom types (sorting at end)
- **Space Complexity:** O(n + k)
  - Stack can be size ≈ nesting depth (at most n)
  - The count dictionary can have up to k elements (atom types)

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to support invalid or malformed formulas?  
  *Hint: Consider adding validation and exception handling in parsing step.*

- Can you return the atom list as a dictionary instead of a string?  
  *Hint: Output formatting can be abstracted from core parsing logic.*

- How would you handle formulas with hydration notation (e.g., CuSO4·5H2O)?  
  *Hint: Recognize and split on special separators, then parse separately.*

### Summary
This approach uses the **stack and hash map** pattern, a common way to tackle problems involving parsing with nested scopes and accumulation (like matching parentheses or arithmetic expressions). It's robust, extendable, and straightforward for similar parsing problems such as evaluating expressions (“Basic Calculator”, etc.), XML parsing, or IR building in compilers.