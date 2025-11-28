### Leetcode 3549 (Hard): Multiply Two Polynomials [Practice](https://leetcode.com/problems/multiply-two-polynomials)

### Description  
Given two polynomials, each represented as an integer array, where the iᵗʰ element is the coefficient for xⁱ, return their product as a new coefficient array in the same format.  
For example, poly1 = [a₀, a₁, ..., aₙ] represents a₀ + a₁x¹ + ... + aₙxⁿ.

### Examples  

**Example 1:**  
Input: `poly1 = [3, 5, 6]`, `poly2 = [6, 8]`  
Output: `[18, 54, 76, 48]`  
Explanation:  
poly1 = 3x² + 5x¹ + 6  
poly2 = 6x¹ + 8  
- (6 × 6)x⁰ = 36x⁰  
- (6 × 8)x¹ = 48x¹  
- (5 × 6)x¹ = 30x¹  
- (5 × 8)x² = 40x²  
- (3 × 6)x² = 18x²  
- (3 × 8)x³ = 24x³  
Adding like terms:  
x³: 24  
x²: 18 + 40 = 58  
x¹: 30 + 48 = 78  
x⁰: 36  
Result: `[18, 54, 76, 48]`

**Example 2:**  
Input: `poly1 = [3, 6, -9]`, `poly2 = [9, -8, 7, 2]`  
Output: `[27, 54, -39, 28, 42, -18]`  
Explanation:  
poly1 = 3x² + 6x¹ - 9  
poly2 = 9x³ - 8x² + 7x¹ + 2  
Multiply each term and sum exponents. Collect coefficients for each xᵈ.  
Details omitted for brevity.

**Example 3:**  
Input: `poly1 = [5, 0, 10, 6]`, `poly2 = [1, 2, 4]`  
Output: `[5, 10, 30, 26, 52, 24]`  
Explanation:  
poly1 = 5 + 0x¹ + 10x² + 6x³  
poly2 = 1 + 2x¹ + 4x²  
Standard array-based multiplication.  
Resulting: 5 + 10x¹ + 30x² + 26x³ + 52x⁴ + 24x⁵

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Multiply every coefficient of poly1 by every coefficient of poly2. For each pair (i, j), the resulting product adds to the coefficient of xⁱ⁺ʲ.  
  Use an array of size (m + n - 1) for m and n as lengths of poly1 and poly2.  

- **Optimizations:**  
  - Brute-force nested loop is O(m × n), which is acceptable for small input (constraints are likely ≤ 500).  
  - For very large input, use the Fast Fourier Transform (FFT) for O(n log n) multiplication.  
  - However, interviewers may expect brute-force unless specifically hinted otherwise.

- **Why this approach:**  
  The brute-force approach is simple, clear, and gives correct results for the typical input sizes expected. If asked for optimization, explain FFT and when it is worth implementing.

### Corner cases to consider  
- One or both input arrays are empty.  
- One or both input arrays are .  
- Arrays of length 1 (single constant term).  
- Negative coefficients.  
- Leading or trailing zeros (polynomial degree < array length - 1).  

### Solution

```python
def multiply_polynomials(poly1, poly2):
    m = len(poly1)
    n = len(poly2)
    # Resulting polynomial will have degree m + n - 2
    res = [0] * (m + n - 1)
    
    # Multiply every term of first polynomial with every term of second polynomial
    for i in range(m):
        for j in range(n):
            res[i + j] += poly1[i] * poly2[j]
    
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m and n are lengths of poly1 and poly2. Each term in poly1 is multiplied with each in poly2 once.
- **Space Complexity:** O(m + n), for the result array of size (m + n - 1). No extra space besides output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for extremely large polynomials (thousands of coefficients)?  
  *Hint: Can you use a divide-and-conquer technique or FFT for faster multiplication?*

- What if the polynomials are sparse (most coefficients are zero)?  
  *Hint: Consider using a hashmap to store nonzero terms only.*

- How would you handle coefficients modulo a prime, or if overflow is possible?  
  *Hint: Carefully apply modular arithmetic at each multiplication and summation step.*

### Summary  
This problem is a classic use of the convolution (schoolbook) multiplication pattern, combining each pair of coefficients at every possible exponent sum.  
The coding pattern is nested iteration with indexed accumulation, applicable in integer multiplication (like Karatsuba), polynomial operations, digital signal processing (convolution), and more.  
For very large input, FFT-based polynomial multiplication is optimal. For sparse cases, hashmap-based accumulation for nonzero terms saves work.  
The brute-force approach is straightforward, efficient enough for standard input limits, and demonstrates clear thinking and code clarity.


### Flashcard
Multiply each coefficient of poly1 by each coefficient of poly2; add products to result array at index i+j; O(m × n) is acceptable for typical constraints.

### Tags
Array(#array), Math(#math)

### Similar Problems
