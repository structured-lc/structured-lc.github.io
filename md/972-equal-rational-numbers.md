### Leetcode 972 (Hard): Equal Rational Numbers [Practice](https://leetcode.com/problems/equal-rational-numbers)

### Description  
Given two strings, each representing a non-negative rational number, determine whether they represent the **same rational number**.  
Numbers can be written as:
- Integer only (e.g. `"123"`)
- Integer + decimal (e.g. `"123.456"`)
- Integer + decimal + **repeating part** in parentheses (e.g. `"123.456(789)"`)
You must accurately handle infinite recurring decimals due to the repeating part. For example, `"0.9(9)"` represents 0.999... which is mathematically equal to `1.0`.

### Examples  

**Example 1:**  
Input: `S = "0.(52)", T = "0.5(25)"`  
Output: `True`  
*Explanation: Both represent 0.525252… so they are equal.*

**Example 2:**  
Input: `S = "0.1666(6)", T = "0.1(6)"`  
Output: `True`  
*Explanation: "0.1666(6)" means 0.166666..., "0.1(6)" means 0.166666..., both are the same.*

**Example 3:**  
Input: `S = "0.9(9)", T = "1."`  
Output: `True`  
*Explanation: "0.9(9)" = 0.999…, which equals 1.0 exactly.*

### Thought Process (as if you’re the interviewee)  
Start by parsing the string into three parts:  
- **Integer part**
- **Non-repeating decimal part**
- **Repeating part** (if any, modeled in parenthesis)

A **naive approach** is to expand both numbers as floats (generate enough digits), but this is imprecise due to floating point errors and doesn’t always work for true equality.

**Optimal approach:**
- Convert each number into a canonical fraction (numerator/denominator) representation.
- For the repeating part: model its value using a geometric series and derive the exact fraction.
- Combine integer, non-repeating, and repeating fractions into a total fraction.
- Reduce (simplify) the fraction.
- Finally, compare the cross-products of two canonical fractions for equality.

This accurate math-based reduction handles all edge cases, including numbers like `"0.2499(9)" == "0.25"`.

### Corner cases to consider  
- Inputs with no decimal or repeating part: `"1"` vs `"1.0"` vs `"1.000000(0)"`
- Empty repeating part: `"0.5(0)" == "0.5"`
- Repeating zeros: `"3.400(0)" == "3.4"`
- Repeating nines: `"2.99(9)" == "3"`
- All digits repeating: `"0.(3)"` (one third)
- Leading/trailing zeros in decimal or repeating part
- Different representations for same value: `"0.5(4)" == "0.54(54)"` (should solve to 0.545454...)

### Solution

```python
def isRationalEqual(S: str, T: str) -> bool:
    # Helper to parse the string and convert it to numerator/denominator
    def parse(num):
        if '(' in num:
            non_rep, rep = num.split('(')
            rep = rep.rstrip(')')
        else:
            non_rep, rep = num, ''
        if '.' in non_rep:
            int_part, nonrep_part = non_rep.split('.')
        else:
            int_part, nonrep_part = non_rep, ''
        # Convert both non-repeating and repeating to a fraction: numerator/denominator
        int_part = int(int_part)
        if not nonrep_part and not rep:
            return int_part, 1
        # Value = int_part + nonrep_part / 10^len + rep / (10^nonrep_len * (10^rep_len - 1))
        res_numer = int_part
        res_denom = 1
        # non-repeating decimal part
        if nonrep_part:
            numer = int(nonrep_part)
            denom = 10 ** len(nonrep_part)
            res_numer = res_numer * denom + numer
            res_denom *= denom
        # repeating decimal part
        if rep:
            rep_len = len(rep)
            nonrep_len = len(nonrep_part)
            numer = int(rep)
            denom = (10 ** rep_len - 1) * (10 ** nonrep_len)
            res_numer = res_numer * denom + numer
            res_denom *= denom
        # Reduce fraction
        from math import gcd
        g = gcd(res_numer, res_denom)
        return res_numer // g, res_denom // g
    a1, b1 = parse(S)
    a2, b2 = parse(T)
    return a1 * b2 == a2 * b1  # cross multiply to check equality
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L), where L is the maximum string length (bounded, since input formats are short)  
- **Space Complexity:** O(1) extra space (no significant extra space except integer variables and tiny string splits)

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution handle very large repeating parts (e.g. thousands of digits of repetition)?  
  *Hint: Think about how fraction numerators/denominators can grow and integer overflow risks.*

- What if the input allowed negative numbers or scientific notation?  
  *Hint: How should the parser be adapted for a broader set of number representations?*

- Can you return a canonical fraction form for a given rational input instead of equality comparison?  
  *Hint: Extend the parse logic to always return reduced numerator/denominator.*

### Summary
This problem uses **parsing** and **number theory** to precisely compare **rational values** represented as strings, transforming all forms (integer, decimal, periodic) into reduced fractions for **exact equivalence checking**.  
The canonical fraction approach prevents issues with floating point precision and is a robust pattern for representing and comparing repeating decimals—used in problems involving rational numbers, periodic decimals, or when precise equality is required despite floating-point quirks.

### Tags
Math(#math), String(#string)

### Similar Problems
