### Leetcode 537 (Medium): Complex Number Multiplication [Practice](https://leetcode.com/problems/complex-number-multiplication)

### Description  
Given two strings representing complex numbers in the form "a+bi" (where a and b are integers, and i is the imaginary unit), return their product as a string in the same form.  
You must correctly multiply the complex numbers, remembering that i² = -1.

### Examples  

**Example 1:**  
Input: `"1+1i","1+1i"`  
Output: `"0+2i"`  
*Explanation: (1+1i) × (1+1i) = 1×1 + 1×1i + 1i×1 + 1i×1i = 1 + 1i + 1i + (1i×1i). Since i² = -1, 1i×1i = -1. So: 1 + 1i + 1i - 1 = (1-1) + (1+1)i = 0 + 2i.*

**Example 2:**  
Input: `"1+-1i","1+-1i"`  
Output: `"0+-2i"`  
*Explanation: (1-1i) × (1-1i) = 1×1 - 1i×1 - 1i×1 + (-1i×-1i) = 1 - 1i - 1i + 1 (since i² = -1 for -1i × -1i = -1 × -1 × i² = 1×-1 = -1). So: 1+1 = 2; -1i-1i=-2i. Output: 2-2i.*

**Example 3:**  
Input: `"2+3i","-1+4i"`  
Output: `"-14+5i"`  
*Explanation: (2+3i) × (-1+4i) = 2×(-1) + 2×4i + 3i×(-1) + 3i×4i = -2 + 8i -3i + 12i² = -2 + 5i + 12×(-1) = -2 + 5i -12 = -14 + 5i.*


### Thought Process (as if you’re the interviewee)  
First, *parse* each complex number string into its real and imaginary integer components.  
For "a+bi", split on '+' and remove the "i" suffix to get the real (a) and imaginary (b) parts.

Multiplying two complex numbers — (a+bi) × (c+di) — uses this formula:
- Real part: a×c - b×d
- Imaginary part: a×d + b×c

We can extract a, b, c, d using basic string manipulation.  
Once we have those values, we compute the new real and imaginary parts per the formula, and format them as "real+imaginaryi".

Brute-force and optimized approaches are identical here due to constant-size inputs and simple math.  
I'll choose clear, readable string parsing for robustness.

### Corner cases to consider  
- One or both inputs are zero (e.g. "0+0i", "0+5i", etc.)
- Negative numbers in real or imaginary parts ("-2+3i")
- Inputs with "+0i" or "-0i"
- Both numbers are purely real or purely imaginary ("3+0i", "0+2i")
- Results where real or imaginary part is zero ("0+1i", "5+0i")

### Solution

```python
def complexNumberMultiply(num1: str, num2: str) -> str:
    # Helper to parse 'a+bi' into (a, b)
    def parse_complex(s):
        real, imag = s[:-1].split("+")
        return int(real), int(imag)
    
    a, b = parse_complex(num1)
    c, d = parse_complex(num2)
    
    # (a+bi) × (c+di) = (a×c - b×d) + (a×d + b×c)i
    real = a * c - b * d
    imag = a * d + b * c
    
    return f"{real}+{imag}i"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — All operations (split, substring, multiplication) are done on small, fixed strings; no iteration over input size.
- **Space Complexity:** O(1) — Only uses a constant amount of extra space for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support input with spaces or unexpected formatting?
  *Hint: Think about additional validation or regex parsing.*

- How can you extend this to parse and multiply complex numbers with decimal (float) parts?
  *Hint: Consider parsing to float instead of int.*

- Can you generalize your method to multiply complex numbers represented as a tuple/class, not strings?
  *Hint: Omit string parsing and operate directly on number pairs.*

### Summary
This problem is a classic *parsing + math* question.  
The key step is robust extraction of components from the input string, and then applying a well-known multiplication formula for complex numbers.  
The pattern of parsing composite string representations, performing element-wise operations, and re-assembling output is common in interview settings and appears in problems involving fractions, dates, intervals, and rational numbers.

### Tags
Math(#math), String(#string), Simulation(#simulation)

### Similar Problems
