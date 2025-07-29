### Leetcode 640 (Medium): Solve the Equation [Practice](https://leetcode.com/problems/solve-the-equation)

### Description  
Given a linear algebraic equation in string format, only involving '+', '-', 'x', and digits, solve for the value of **x**. The input is a single string containing a left side and right side separated by '=', e.g. "2x+3=5+x-2".  
Return the solution as a string in the format `"x=#value"`. If there is **no solution**, return `"No solution"`. If there are **infinite solutions**, return `"Infinite solutions"`.  
Assume the solution, if it exists, is always an integer.
  
### Examples  

**Example 1:**  
Input: `x+5-3+x=6+x-2`  
Output: `x=2`  
*Explanation:*
- Group all terms with **x** on the left: x + x - x = 2 - 5 + 3 + 6 - 2  
- Left side becomes 2x, right side is 4.  
- 2x = 4 ⇒ x = 2.

**Example 2:**  
Input: `x=x`  
Output: `Infinite solutions`  
*Explanation:*
- Both sides are the same, so any value of **x** satisfies the equation (0x = 0).

**Example 3:**  
Input: `2x=x`  
Output: `x=0`  
*Explanation:*
- Subtract x both sides: 2x - x = 0 → x = 0.

### Thought Process (as if you’re the interviewee)  
First, split the equation into **left** and **right** sides at the '='.  
For each side, parse the terms—keeping track of the **coefficient of x** and the **sum of constants**.  
Combine the x terms on one side, the constants on the other.  
This reduces to a simple linear equation:  
(aₗ - aᵣ)·x = (bᵣ - bₗ)  
If aₗ - aᵣ = 0 and bₗ = bᵣ, there are infinite solutions.  
If aₗ - aᵣ = 0 and bₗ ≠ bᵣ, there's no solution.  
Otherwise, x = (bᵣ - bₗ) / (aₗ - aᵣ)  
To parse each side, scan the string, extract numbers/coefficients, pay attention to signs, and handle special cases like just `x` or `-x` (equals 1 and -1 coefficient).

This single-pass parsing per side (O(n)) is robust and easy to debug compared to using regex or trying to eval individual terms.

### Corner cases to consider  
- Coefficient of x is missing (`x` or `-x`).
- Coefficient is multi-digit (e.g., `12x`, `-20x`).
- Terms like `+x`, `-x`, or `x` at the start of the string.
- Leading or trailing constants without x.
- Zero coefficient after combining.
- Equation like `"0x=0"` or `"0x=5"` (infinite/no solution).
- Multiple consecutive + and -.
- One side has no `x`, e.g., `"3=3"` (infinite) or `"2=3"` (no solution).

### Solution

```python
def solveEquation(equation: str) -> str:
    # Helper to parse one side of the equation
    def parse(side: str):
        n, i = len(side), 0
        x_coef = 0
        const = 0
        sign = 1  # Current term's sign
        while i < n:
            if side[i] == '+':
                sign = 1
                i += 1
            elif side[i] == '-':
                sign = -1
                i += 1
            num = 0
            has_num = False
            while i < n and side[i].isdigit():
                num = num * 10 + int(side[i])
                has_num = True
                i += 1
            if i < n and side[i] == 'x':
                if not has_num:  # Cases like '+x' or '-x' or 'x'
                    num = 1
                x_coef += sign * num
                i += 1
            else:
                if has_num:
                    const += sign * num
        return x_coef, const

    left, right = equation.split('=')
    x_l, c_l = parse(left)
    x_r, c_r = parse(right)
    # Move all x to one side, constants to other
    x_coef = x_l - x_r
    const = c_r - c_l
    if x_coef == 0:
        if const == 0:
            return "Infinite solutions"
        else:
            return "No solution"
    # Integer division guaranteed if solution is unique
    return f"x={const // x_coef}"

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of the equation string.  
  We scan each character once per side (left/right), then combine results.
- **Space Complexity:** O(1).  
  No extra storage apart from fixed counters. No recursion or auxiliary structures based on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the equation has other variable names?  
  *Hint: You could generalize parsing to handle any variable, and return results for all variables.*

- Can you handle equations with parentheses (nested expressions)?  
  *Hint: You’d need a stack-based parser or recursive descent to account for operator precedence.*

- How would you handle floating-point results or non-integer solutions?  
  *Hint: Track division and check if `const` is divisible by `x_coef`, otherwise return as a fraction or decimal.*

### Summary
This is a **string parsing + linear equation reduction** problem.  
The main pattern is "scan-and-accumulate coefficients/constants", which is common in parsing math expressions and symbolic computation.  
This approach is **robust against tricky sign/coefficients** cases, and the scan-per-side pattern applies to polynomial sum parsing and integration problems.  
You can use similar logic for general algebraic simplification or interpreter foundation tasks.