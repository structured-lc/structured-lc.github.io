### Leetcode 190 (Easy): Reverse Bits [Practice](https://leetcode.com/problems/reverse-bits)

### Description  
Given a 32-bit unsigned integer, reverse its bits so the output is the integer whose binary is the mirrored version of the input's binary.  
For example, the most significant bit (leftmost) of the input becomes the least significant bit (rightmost) in the output, and so on for each bit.  
Imagine you have a binary number, and you need to "flip" it so the bits are in the opposite order, then return the corresponding integer value.

### Examples  

**Example 1:**  
Input: `n = 43261596`  
Output: `964176192`  
Explanation:  
- Input in binary: `00000010100101000001111010011100`  
- Output in binary: `00111001011110000010100101000000`

**Example 2:**  
Input: `n = 4294967293`  
Output: `3221225471`  
Explanation:  
- Input in binary: `11111111111111111111111111111101`  
- Output in binary: `10111111111111111111111111111111`

**Example 3:**  
Input: `n = 0`  
Output: `0`  
Explanation:  
- Input in binary: `00000000000000000000000000000000`  
- Output is also all zeros.

### Thought Process (as if you’re the interviewee)  
To solve this, the brute-force idea is to manually reverse each bit of the 32-bit integer. We could:
- Initialize a result variable as 0.
- For each of the 32 bits:
  - Extract the current least significant bit from `n` using bitwise AND (`n & 1`).
  - Shift this extracted bit into the appropriate position in the result (left shift by (31 - i)).
  - Update the result with bitwise OR.
  - Right shift `n` by 1 to process the next bit.

This brute-force method is clear and easy to understand.  
An alternative would be to convert to a binary string, reverse it, and parse back, but that's not efficient and doesn't leverage bitwise operations.

We choose the bitwise approach for its efficiency, clarity, and interview-friendliness. It's easy to reason about time/space, and works in all languages.

### Corner cases to consider  
- Input is 0: Should return 0.
- Input is all 1s: Should return the same number (all 1s but reversed).
- Input where only one bit is set (e.g., 2³⁰): Checks if that bit appears at position 1 after reversing.
- Large and small numbers, making sure no bits are lost.

### Solution

```python
def reverseBits(n: int) -> int:
    result = 0
    for i in range(32):
        # Extract the least significant bit of n
        bit = n & 1
        
        # Shift bit to its reverse position and OR with result
        result |= bit << (31 - i)
        
        # Shift n right to get the next bit
        n >>= 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(32) ⇒ O(1), because the number of bits is fixed and independent of input size.
- **Space Complexity:** O(1), since only a constant number of variables are used, regardless of input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to call this function repeatedly?  
  *Hint: Is there preprocessing or memoization that can help if this is part of a performance-critical system?*

- How would you adapt the solution for a variable (not always 32 bits) input size?  
  *Hint: What changes if the input size is not fixed?*

- Can you optimize further using parallel/bit-twiddling tricks?  
  *Hint: Explore divide-and-conquer or swapping pairs of bits in log steps for higher performance.*

### Summary
This problem uses the classic **bit manipulation** pattern, where you process and shift bits directly using bitwise operations. The approach is constant time due to the fixed bit-width. It's an excellent illustration of bitwise AND, OR, and shifts. This pattern is also useful in reversing bytes, mirroring data, and cryptographic applications.