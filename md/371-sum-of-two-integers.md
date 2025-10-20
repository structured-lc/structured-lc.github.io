### Leetcode 371 (Medium): Sum of Two Integers [Practice](https://leetcode.com/problems/sum-of-two-integers)

### Description  
Given two integers, return their sum **without using** the `+` or `-` operators.  
You must compute the result using **bitwise operations**. The integers can be positive, negative, or zero and should be handled as 32-bit signed values, simulating regular integer behavior in most programming languages.

### Examples  

**Example 1:**  
Input: `a = 1, b = 2`  
Output: `3`  
*Explanation: 1 + 2 = 3. Bitwise iteration simulates this sum without using arithmetic operators.*

**Example 2:**  
Input: `a = 2, b = 3`  
Output: `5`  
*Explanation: 2 + 3 = 5. The result is obtained by using bitwise XOR and carry logic for addition.*

**Example 3:**  
Input: `a = -2, b = 3`  
Output: `1`  
*Explanation: -2 + 3 = 1. Handles negative numbers correctly by simulating 32-bit signed integer overflow.*

### Thought Process (as if you’re the interviewee)  
Initially, one might think to use a loop and increment or decrement to simulate addition, but this is inefficient and not permitted in interviews.  
To add two numbers without using `+` or `-`, consider how addition works at the **bit level**:  
- **XOR (^)** computes the sum without carrying, i.e., handles simple addition of bits.  
- **AND (&) with shift (<<)** finds where carries occur and shifts them to the next higher bit.

Repeat this process:  
- XOR to get bits to add (without carry).
- AND then shift left to get the carry bits.
- Assign new values of a and b to repeat, until there's nothing left to carry (i.e., b == 0).

Since Python integers can grow arbitrarily large but we must simulate **32-bit signed integer overflow**, we need masking (using `0xFFFFFFFF`) and a check post-process for negative results.

This bitwise iterative approach is both space- and time-efficient, directly simulates addition logic by how hardware does it.

### Corner cases to consider  
- Adding zero to any number (should return the number itself)
- Both inputs are negative
- Both inputs are positive and their sum exceeds 32-bit signed integer max (should wrap/overflow appropriately)
- Inputs with different signs, resulting in zero or negative numbers
- Extremely large positive/negative values (e.g., 2³¹ - 1 and -2³¹)

### Solution

```python
def getSum(a: int, b: int) -> int:
    # 32-bit mask (all 1's: 0xFFFFFFFF)
    mask = 0xFFFFFFFF
    # Integer max for 32 bits (for negative check)
    MAX = 0x7FFFFFFF

    while b != 0:
        # Find carry bits (positions where both have 1's)
        carry = (a & b) & mask
        # Add without carry (XOR)
        a = (a ^ b) & mask
        # Carry needs to be added in next higher bit position
        b = (carry << 1) & mask

    # If a is a positive 32-bit result, return as-is
    # If a is out of 32-bit range (negative), convert to Python signed int
    return a if a <= MAX else ~(a ^ mask)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  - The number of iterations is bounded by 32 (maximum number of bits). Each iteration is constant time.
- **Space Complexity:** O(1)  
  - Only a few integer variables used, no extra space proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to support integers larger than 32 bits in a language with arbitrary-precision ints?  
  *Hint: Think of how to simulate N-bit limits using masks and overflow checks.*

- How do you handle floating-point numbers instead of integers?  
  *Hint: Explore hardware-level representation of floats and bitwise manipulation.*

- Explain why this works for both positive and negative numbers in Python, where ints are of arbitrary size.  
  *Hint: Focus on masking results to 32 bits and understanding two's complement representation.*

### Summary
The **bitwise carry-propagation** solution demonstrates a deep understanding of low-level data representation and is a classic example of simulating integer operations with bit manipulation. This pattern (decompose to sum and carry, repeat until done) is broadly applicable in interview settings, for questions like adding numbers without arithmetic, hardware simulation, and even implementing basic arithmetic logic units (ALUs).


### Flashcard
Use bitwise XOR for sum without carry, AND+shift for carry; repeat until carry is zero.

### Tags
Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)