### Leetcode 50 (Medium): Pow(x, n) [Practice](https://leetcode.com/problems/powx-n)

### Description  
Implement a function to calculate \( x^n \), where `x` is a floating point number and `n` is an integer (can be negative, zero, or positive). You must not use library functions such as `pow` or `**`. The solution should handle edge cases and compute the result efficiently even for large magnitudes of `n`.

### Examples  

**Example 1:**  
Input: `x = 2.0, n = 10`  
Output: `1024.0`  
*Explanation: 2.0 × 2.0 × ... (10 times) = 1024.0*

**Example 2:**  
Input: `x = 2.1, n = 3`  
Output: `9.261`  
*Explanation: 2.1 × 2.1 × 2.1 = 9.261*

**Example 3:**  
Input: `x = 2.0, n = -2`  
Output: `0.25`  
*Explanation: 2.0⁻² = 1/(2.0 × 2.0) = 0.25*

### Thought Process (as if you’re the interviewee)  
The naive approach would be to multiply `x` by itself `n` times, which is O(|n|) time. However, this doesn’t scale for very large exponents and is inefficient.

To optimize, we can use **Binary Exponentiation (Fast Exponentiation)**:
- This approach relies on the properties:
  - For even n: `xⁿ = (x²)^(n/2)`
  - For odd n: `xⁿ = x × xⁿ⁻¹`
- We can recursively or iteratively break down the problem by repeatedly halving the exponent and squaring the base.
- For negative exponents, compute the positive exponent and take its reciprocal: `x⁻ⁿ = 1 / xⁿ`.

This reduces the time complexity to O(log|n|), making it suitable even for large exponents.

### Corner cases to consider  
- n = 0 (should return 1 regardless of x)
- n < 0 (should return reciprocal, handle potential overflow for extreme negative n)
- x = 0 (especially for negative n; mathematically invalid, but in most implementations return `inf` or handle as an error)
- x = 1 or x = -1 with any n (result always 1 or alternates between 1 and -1)
- n is Integer.MIN_VALUE (for 32-bit systems, cannot simply negate, must use long or similar)
- Very large |n| (performance)

### Solution

```python
def myPow(x: float, n: int) -> float:
    # Handle negative exponents & prevent overflow for extreme negative numbers
    N = n
    if N < 0:
        x = 1 / x
        N = -N

    result = 1.0
    current_product = x

    while N > 0:
        # If the least significant bit is set, multiply into result
        if N % 2 == 1:
            result *= current_product
        # Square the base each time, halve the exponent
        current_product *= current_product
        N //= 2

    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log|n|), since we halve the exponent in each step—binary exponentiation.
- **Space Complexity:** O(1), as we use a constant amount of extra space (no recursion stack or large data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle extremely large exponents and bases that might cause floating-point overflow or underflow?  
  *Hint: Consider floating-point limitations and early returns for special cases.*

- What if n is less than Integer.MIN_VALUE, or what about precision errors for very large or very small answer magnitudes?  
  *Hint: Discuss use of 64-bit integers, or breaking the multiplication earlier to avoid overflow, and expectations for floating-point accuracy.*

- Can you implement this recursively as well? How does recursive stack size impact your design?  
  *Hint: Translate the logic directly to recursion, and discuss recursion depth vs iteration.*

### Summary
This problem is a classic application of the **Binary Exponentiation** (a divide-and-conquer pattern, often called fast power or exponentiation by squaring). The technique is common in mathematical computation problems to reduce O(n) exponentiation to O(log n), and appears in tasks ranging from modular exponentiation (in cryptography, combinatorics) to certain dynamic programming recurrences. The approach is highly reusable across languages and scenarios where efficient power computation is required.


### Flashcard
Use binary exponentiation to compute xⁿ in O(log|n|) time by repeatedly squaring the base and halving the exponent; for n < 0, return 1/x⁻ⁿ.

### Tags
Math(#math), Recursion(#recursion)

### Similar Problems
- Sqrt(x)(sqrtx) (Easy)
- Super Pow(super-pow) (Medium)
- Count Collisions of Monkeys on a Polygon(count-collisions-of-monkeys-on-a-polygon) (Medium)