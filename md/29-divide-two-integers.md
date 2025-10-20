### Leetcode 29 (Medium): Divide Two Integers [Practice](https://leetcode.com/problems/divide-two-integers)

### Description  
Given two integers, **dividend** and **divisor**, compute the quotient after dividing the dividend by the divisor **without** using multiplication, division, or modulus operators.  
The result must be *truncated toward zero* (i.e., round towards zero).  
If the result overflows the 32-bit signed integer range `[−2³¹, 2³¹ − 1]`, return `2³¹ − 1` (2147483647).  
Divisor will never be 0.

### Examples  

**Example 1:**  
Input: `dividend = 10, divisor = 3`  
Output: `3`  
*Explanation: 10 ÷ 3 = 3.333..., truncate to 3.*

**Example 2:**  
Input: `dividend = 7, divisor = -3`  
Output: `-2`  
*Explanation: 7 ÷ (–3) = –2.333..., truncate to –2.*

**Example 3:**  
Input: `dividend = -2147483648, divisor = -1`  
Output: `2147483647`  
*Explanation: The true quotient is 2147483648, but it overflows 32-bit int, so return 2147483647.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Repeatedly subtract the absolute value of the divisor from the absolute value of the dividend, counting how many times this can be done before the result goes negative.  
  - This is too slow for large inputs (could take O(n) operations, where n = absolute value of dividend).

- **Bit Manipulation (Optimized Approach):**  
  Instead of subtracting one divisor at a time, double the divisor (using left shift) as much as possible without exceeding the dividend.  
  - For every iteration, find the largest `2ᶜ × divisor` ≤ dividend, subtract this from dividend, and accumulate the result (the shifted count).
  - This reduces the number of operations to O(log n), by subtracting large chunks at each step.
  - *Sign* is handled at the end: if exactly one of dividend, divisor is negative, make the result negative.
  - Edge cases: Handle overflow (dividend = –2³¹, divisor = –1).

- **Why bit manipulation?**  
  It's the only way, since no multiplication/division/mod allowed, but left shifts are valid for powers of two scaling.

### Corner cases to consider  
- Divisor is 1 or –1 (can create overflow when dividing –2³¹ by –1).
- Dividend is 0 (result is always 0, no matter the divisor).
- Dividend and divisor have the same absolute values.
- Results near integer overflow boundaries: –2³¹, 2³¹–1.
- Negative numbers.
- Signs of dividend and divisor: positive/negative combinations.
- Divisor is larger in absolute value than dividend (result is 0).
- Divisor is –2³¹.

### Solution

```python
def divide(dividend: int, divisor: int) -> int:
    # Constants for 32-bit signed int range
    INT_MAX = 2 ** 31 - 1
    INT_MIN = -2 ** 31

    # Edge case: overflow
    if dividend == INT_MIN and divisor == -1:
        return INT_MAX

    # Determine result sign
    sign = -1 if (dividend < 0) != (divisor < 0) else 1

    # Work with positive values
    a = abs(dividend)
    b = abs(divisor)
    quotient = 0

    # Subtract largest double of divisor each time
    while a >= b:
        count = 0
        while a >= (b << (count + 1)):
            count += 1
        quotient += 1 << count
        a -= b << count

    # Apply sign
    result = sign * quotient

    # Check boundary
    if result < INT_MIN:
        return INT_MIN
    if result > INT_MAX:
        return INT_MAX
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), where n = |dividend|.  
  At each step, we subtract the largest chunk (powers of two times divisor), which reduces a by at least half each time.
- **Space Complexity:** O(1).  
  Only a fixed amount of extra space is used, independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the range was different (e.g., 64-bit integers)?  
  *Hint: Consider what happens to overflow checks and constants.*

- Can you explain why left shifting works and why it’s safe to use here?  
  *Hint: Relate it to multiplying by powers of two.*

- How would you handle this if the rules allowed floating-point math?  
  *Hint: You could use division and then convert or truncate, but that's not allowed in this problem.*

### Summary
This problem is a **bit manipulation pattern** using exponential search with left shifts to optimize repeated subtraction, and is a classic example of how to simulate division operations when basic arithmetic is restricted. Variations of this approach appear in other “implement arithmetic from primitives” problems, such as implementing multiplication, bit count, or even sqrt(x) without direct operators.


### Flashcard
Use bit shifts to double the divisor and subtract largest possible multiples from dividend, counting how many times, for O(log₂n) division without using multiplication or division.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
