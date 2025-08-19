### Leetcode 1837 (Easy): Sum of Digits in Base K [Practice](https://leetcode.com/problems/sum-of-digits-in-base-k)

### Description  
Given an integer **n** (in decimal/base 10) and a base **k**, convert **n** to base **k**, then calculate and return the sum of all its digits (where each digit is interpreted in base 10). For example, for n = 34 and k = 6, represent 34 in base 6 (which is "54"), then sum 5 + 4 = 9.

### Examples  

**Example 1:**  
Input: `n = 34, k = 6`  
Output: `9`  
*Explanation: 34₁₀ = 54₆ (because 5×6 + 4 = 34). Sum is 5 + 4 = 9.*

**Example 2:**  
Input: `n = 10, k = 10`  
Output: `1`  
*Explanation: 10₁₀ = 10₁₀. Sum is 1 + 0 = 1.*

**Example 3:**  
Input: `n = 15, k = 2`  
Output: `4`  
*Explanation: 15₁₀ = 1111₂. Sum is 1 + 1 + 1 + 1 = 4.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that we need to convert **n** to its representation in base **k** (not just remainder or direct sum), then sum its digits in that base.  
The brute-force way is to:
- Convert **n** to a string in base **k**, then sum each character as integer.
But we can do better, directly working with integers:
- Repeatedly get the last digit (n % k), add to a sum, and divide n by k.
- This leverages the mathematical property of base conversion, with **O(logₖ n)** steps.
This is efficient and avoids unnecessary string operations.  
Edge cases are handled naturally: n=0 has one digit (0), other small numbers will exit loop after a few steps.

### Corner cases to consider  
- n = 1 (smallest n), any k  
- k = 2 or 10 (minimum and maximum k)  
- n already < k (only one digit in the new base)  
- Maximum n = 100  
- n is a multiple of k (to ensure correct digit extraction)  

### Solution

```python
def sumBase(n: int, k: int) -> int:
    total = 0
    while n > 0:
        digit = n % k    # get least significant digit in base k
        total += digit   # add digit to sum
        n //= k          # remove this digit by integer division
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(logₖ n)  
  At each step, n is divided by k. The loop runs roughly logₖ n times.
- **Space Complexity:** O(1)  
  Only a few variables are used—no extra space that grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If k can be very large (say up to n), how would your approach change?
  *Hint: What does the calculation n % k yield when k > n?*

- Can you do it using recursion instead of a loop?
  *Hint: Think about the base case when n < k.*

- How would you return the base-k representation as a string instead of just the sum?
  *Hint: Store each digit (n % k) and build the string in reverse.*

### Summary
This is a classic **base conversion** and **digit extraction** pattern, commonly solved using modulus and integer division in a while loop. The coding approach is direct and applies to digit problems in any base, with variants seen in checksums, digital roots, or custom base formatting tasks. There is no need for library shortcuts or string manipulation; the integer-based method is simple, efficient, and robust.

### Tags
Math(#math)

### Similar Problems
-   Count Symmetric Integers(count-symmetric-integers) (Easy)