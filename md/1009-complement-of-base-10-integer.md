### Leetcode 1009 (Easy): Complement of Base 10 Integer [Practice](https://leetcode.com/problems/complement-of-base-10-integer)

### Description  
Given a non-negative integer n, return the complement of its binary representation as a base-10 integer.  
The **complement** is formed by flipping every bit (changing 1 → 0 and 0 → 1) only up to the highest set bit (ignoring leading zeros).  
For instance, if n is 5 (which is "101" in binary), the complement flips all bits: ‘101’ → ‘010’, so the answer is 2.

### Examples  

**Example 1:**  
Input: `5`  
Output: `2`  
*Explanation: 5 in binary is 101. Flipping each bit gives 010, which is 2 in decimal.*

**Example 2:**  
Input: `7`  
Output: `0`  
*Explanation: 7 in binary is 111. After flipping all bits up to the highest one, we get 000, which converts to 0.*

**Example 3:**  
Input: `10`  
Output: `5`  
*Explanation: 10 in binary is 1010. Its complement is 0101, which is 5 in decimal.*

### Thought Process (as if you’re the interviewee)  
First, I need to flip each bit of n, **but only the bits up to and including the most significant 1**. This is not simply using Python’s `~` (~n), because that would flip all 32/64 bits and include irrelevant leading zeros.

**Brute-force idea:**  
Convert n to a binary string, flip each bit, then convert back to an integer.  
- Downside: conversion overhead and unnecessary string manipulation.

**Optimal (bit manipulation):**  
- Find a mask: a number with all bits set to 1, the same length as n’s binary representation.
- Example: For n = 5 (101), mask should be 111 (7 in decimal).
- Flip n using XOR: mask ⊕ n.
- **Building the mask:** Start with 1, and left-shift bits until the mask covers all digits of n.
- This runs in O(log n) time, and only uses integer operations.

### Corner cases to consider  
- n = 0 (special: its complement should be 1 since 0 is just “0”, whose complement “1” gives 1)
- n is a power of 2 (e.g., n = 8 is 1000; complement should be 0111 = 7)
- Large numbers at bounds (to check no overflow)
- Single-bit numbers (n = 1)

### Solution

```python
def bitwiseComplement(n: int) -> int:
    # Edge case: 0 has binary '0', which should flip to '1'
    if n == 0:
        return 1

    # Create a mask with all 1's up to the most significant bit of n
    mask = 1
    temp = n
    while temp:
        mask = mask << 1
        temp = temp >> 1
    mask -= 1  # After the loop, mask has one extra left shift

    # Flip all bits of n using XOR with mask
    return n ^ mask
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  We scan the bits of n to build the mask. Each iteration right-shifts n, so overall operations are proportional to the number of bits (log n).
- **Space Complexity:** O(1)  
  Uses only a constant amount of extra memory regardless of n’s size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your function behave if negative integers were allowed?  
  *Hint: How is complement defined for two’s-complement signed ints?*

- Can you compute the complement without any explicit loops?  
  *Hint: Try leveraging bit_length or in-place mask generation.*

- How would you handle binary representations of fixed width (e.g., always 8 bits)?  
  *Hint: Are leading zeros still ignored, or do you flip all 8 bits?*

### Summary
This problem is a classic use-case for **bit manipulation**. The code uses a **masking pattern**: generate a mask of all 1’s covering the significant bits of n, then XOR to flip relevant bits. This approach is compact and avoids string conversion. The technique of generating dynamic bit masks applies broadly in digital logic, networking, and problems involving bitwise operations.


### Flashcard
Find mask with all bits set up to highest 1 in n, then return mask XOR n for the bitwise complement.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
