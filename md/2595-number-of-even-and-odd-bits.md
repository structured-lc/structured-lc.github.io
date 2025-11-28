### Leetcode 2595 (Easy): Number of Even and Odd Bits [Practice](https://leetcode.com/problems/number-of-even-and-odd-bits)

### Description  
Given a positive integer n, count how many bits are set to 1 at even and odd indices in n's binary representation (0-indexed from the right, i.e., least significant bit is at index 0).  
Return `[even, odd]`:  
- `even`: number of 1's at even indices (0ᵗʰ, 2ⁿᵈ, 4ᵗʰ, …)
- `odd`: number of 1's at odd indices (1ˢᵗ, 3ʳᵈ, 5ᵗʰ, …)

### Examples  

**Example 1:**  
Input: `n = 17`  
Output: `[2,0]`  
*Explanation: 17 in binary is 10001. The 1s are at indices 0 and 4 (both even), none at odd indices.*

**Example 2:**  
Input: `n = 2`  
Output: `[0,1]`  
*Explanation: 2 in binary is 10. The 1 is at index 1 (odd), none at even indices.*

**Example 3:**  
Input: `n = 45`  
Output: `[2,1]`  
*Explanation: 45 in binary is 101101. 1s at indices 0, 2, 3, 5. Even indices (0, 2, 4): bits 1, 1, 0 → 2 ones. Odd indices (1, 3, 5): bits 0, 1, 1 → 1 + 1 = 2, but only at 3,5 set so count = 2 (oops, see below). Correction: bit 1 (index 1) is 0, bit 3 is 1, bit 5 is 1; so total odd-ones = 2. So actually Output: [2,2].*


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Convert n to its binary string, reverse it, and loop. For each bit, if bit is '1', increment even or odd counter depending on index parity. This is simple but string conversion is unnecessary.

- **Optimal/bit manipulation:**  
  Instead of string conversion, traverse the binary representation using bit operations.  
  - Keep two counters: even (index % 2 == 0), odd (index % 2 == 1)
  - Start with index = 0 (even).
  - For each bit: if least significant bit is 1, increment the proper counter.
  - Right shift n by 1 and increment index.
  - Repeat until n is 0.

- **Why this approach:**  
  - No conversions, only integer & bit operations.
  - Each bit is checked exactly once.
  - Time is proportional to number of bits (O(log n)).
  - Space is O(1).


### Corner cases to consider  
- n = 1: single bit only at index 0.
- n = 2: only set at index 1.
- n = 0: not a valid input (n is always positive), don’t need to handle.
- n with only odd-index bits set (like 0b10, 0b1010).
- n with all bits set.
- n is a power of two.
- n has alternate 1s and 0s.


### Solution

```python
def evenOddBit(n):
    # even counts 1s at even indices, odd counts 1s at odd indices
    even = 0
    odd = 0
    idx = 0  # current bit index, starting from 0 (even)
    while n > 0:
        # check least significant bit
        if n & 1:
            if idx % 2 == 0:
                even += 1
            else:
                odd += 1
        # right shift to process next bit
        n >>= 1
        idx += 1
    return [even, odd]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), where log n is the number of bits in n, since we process each bit once.
- **Space Complexity:** O(1), no additional data structures or recursion used except for counters.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend the function to return the indices where the 1s occur?
  *Hint: Store indices in an extra list each (for even/odd) as you scan.*

- Can you generalize the solution to support counting 1s at every kᵗʰ position?
  *Hint: Use modulo k instead of 2 when mapping indices.*

- If you received a list of numbers, how would you compute total even/odd 1s for all of them?
  *Hint: Loop through the list and use the function for each n, summing results.*

### Summary
The problem leverages **bit manipulation**, scanning each bit of n efficiently. It's a classic *parity-indexed bit count* problem, highlighting patterns in binary digits depending on index. The approach avoids string operations, and this pattern can apply to problems involving parity of bit positions, masking, or other low-level operations with binary representations.


### Flashcard
Use bit manipulation: iterate through bits with index counter; increment even/odd counters based on bit position parity.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
- Find Numbers with Even Number of Digits(find-numbers-with-even-number-of-digits) (Easy)