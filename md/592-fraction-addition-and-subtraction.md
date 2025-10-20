### Leetcode 592 (Medium): Fraction Addition and Subtraction [Practice](https://leetcode.com/problems/fraction-addition-and-subtraction)

### Description  
You are given a string that represents an arithmetic expression involving addition and subtraction of fractions, for example: `"-1/2+1/2+1/3"`. Your task is to compute the result and return it as an irreducible fraction in the form `"numerator/denominator"`. If the result is an integer, you must still return it in fraction form with denominator 1 (e.g., `"2/1"`). The input expression only contains numerals, `'/'`, `'+'`, and `'-'`, with each fraction in the form `±numerator/denominator`. The goal is to simulate the calculation and reduce the answer to its simplest form.

### Examples  

**Example 1:**  
Input: `"-1/2+1/2"`  
Output: `"0/1"`  
*Explanation: -1/2 + 1/2 = 0/1 (sums to zero, must use denominator 1).*

**Example 2:**  
Input: `"-1/2+1/2+1/3"`  
Output: `"1/3"`  
*Explanation: -1/2 + 1/2 = 0/1, then 0/1 + 1/3 = 1/3.*

**Example 3:**  
Input: `"1/3-1/2"`  
Output: `"-1/6"`  
*Explanation: 1/3 - 1/2 = (2-3)/6 = -1/6 after converting both to denominator 6 and subtracting numerators.*

### Thought Process (as if you’re the interviewee)  
I'd start by noting that we need to parse the given string, which contains several fractions possibly separated by `'+'` and `'-'` signs. For each fraction, I need to track its sign and perform addition or subtraction.

A brute-force approach would be:
- Parse each fraction and its sign one by one.
- Store an accumulating numerator and denominator as I process each.
- At each iteration, apply fraction addition/subtraction by converting each to a common denominator. This can be achieved using least common multiple (LCM) for the denominators, then scale and add/subtract numerators.
- After processing all fractions, reduce the final result using the greatest common divisor (GCD).

Optimizing further, I'd avoid forming large numbers by reducing after every addition/subtraction step, not just at the end. Trade-off: more frequently calculating GCD, but keeps intermediate numbers small and avoids overflow.

This final approach keeps the solution efficient and avoids the use of Python's Fraction or similar built-ins, which matches real interview expectations.

### Corner cases to consider  
- The result is zero (e.g., fractions cancel out).
- All fractions are negative.
- The input starts with a negative sign.
- The result is an integer (must return `s/1` format).
- Very large numerators or denominators, testing for overflow or reduction.
- No "+" at the start (i.e., expression may start with a negative or positive number).
- Multiple digits in numerators or denominators.

### Solution

```python
def fractionAddition(expression):
    # Helper to compute greatest common divisor
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    res_num, res_den = 0, 1  # Start from 0/1 (neutral element for addition)
    i = 0
    n = len(expression)

    while i < n:
        # Parse sign
        sign = 1
        if expression[i] in '+-':
            if expression[i] == '-':
                sign = -1
            i += 1

        # Parse numerator
        num = 0
        while i < n and expression[i].isdigit():
            num = num * 10 + int(expression[i])
            i += 1

        # Parse '/'
        i += 1  # Skip '/'

        # Parse denominator
        den = 0
        while i < n and expression[i].isdigit():
            den = den * 10 + int(expression[i])
            i += 1

        num = sign * num

        # Compute new numerator and denominator
        # res_num/res_den + num/den => new_num/new_den
        new_den = res_den * den
        new_num = res_num * den + num * res_den

        # Reduce the result immediately
        div = gcd(abs(new_num), new_den)
        res_num = new_num // div
        res_den = new_den // div

    # Ensure denominator is positive
    if res_den < 0:
        res_num = -res_num
        res_den = -res_den

    return f"{res_num}/{res_den}"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the input string. Each parsing and arithmetic operation is constant time per fraction, GCD calculations are efficient and limited by magnitude of (numerator, denominator).
- **Space Complexity:** O(1) extra space (not counting input or output), only a small number of integer variables required for tracking progress.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle floating-point numbers instead of integer fractions?  
  *Hint: Think about how rounding and precision affect the outcome. Consider using decimal or rational types for precision.*

- Can you support full arithmetic precedence (e.g., parentheses, multiplication of fractions)?  
  *Hint: You'd need to implement or use a proper arithmetic expression parser.*

- How would you represent the result as a mixed number (e.g., `1 2/3` instead of `5/3`)?  
  *Hint: Separate the integer part (numerator // denominator) and the fractional part (numerator % denominator).*

### Summary
This problem is a classic exercise in parsing and simulating arithmetic with rational numbers and strings. The core pattern is parsing input, incremental arithmetic (combining fractions by scaling to a common denominator), and reducing the result by dividing by the GCD. This is a common pattern whenever problems require exact fraction arithmetic or rational simulation without built-in types, and can be reused in parsing calculators, implementing custom numerical classes, etc.


### Flashcard
Parse and sum fractions by converting to common denominators; reduce result to lowest terms at the end.

### Tags
Math(#math), String(#string), Simulation(#simulation)

### Similar Problems
- Solve the Equation(solve-the-equation) (Medium)