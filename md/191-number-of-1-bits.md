### Leetcode 191 (Easy): Number of 1 Bits [Practice](https://leetcode.com/problems/number-of-1-bits)

### Description  
Given a **32-bit unsigned integer** `n`, return the number of '1' bits in its binary representation (also known as the Hamming weight).  
The function should count how many bits are set to 1 in the number, iterating over the bits if necessary, or by using an optimized bit manipulation strategy.

### Examples  

**Example 1:**  
Input: `n = 11`  
Output: `3`  
Explanation:  
11 in binary is `00000000000000000000000000001011`.  
There are three 1's at positions 0, 1, and 3 (from the right).

**Example 2:**  
Input: `n = 128`  
Output: `1`  
Explanation:  
128 in binary is `00000000000000000000000010000000`.  
There is exactly one '1' bit at position 7.

**Example 3:**  
Input: `n = 4294967293`  
Output: `31`  
Explanation:  
4294967293 in binary is `11111111111111111111111111111101`.  
There are thirty-one 1's.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Convert the number to its binary string and count the '1's. However, using string operations is less efficient and usually discouraged for such bit-counting problems.
- **Bitwise approach**: Since we’re working with fixed 32 bits, iterate through each bit. For each bit, check if it is 1 using `n & 1`, add to the count, and shift n to the right by 1. This takes exactly 32 iterations, which is effectively constant time for this context.
- **Optimized bit trick (Brian Kernighan's Algorithm)**: Rather than check every bit, remove the rightmost '1' from `n` in every iteration using `n = n & (n - 1)`. This works because each operation directly erases the least significant set bit. The loop runs only as many times as there are '1's in the number, making it very efficient if the number has relatively few '1's.
- **Why this method?** The second (optimized) approach avoids unnecessary checks and is elegant—it leverages properties of two's complement numbers and bit operations.

### Corner cases to consider  
- `n = 0` (zero): Should return 0 (no set bits).
- `n = 2³² - 1` (all bits set): Should return 32.
- Numbers with a single bit set (powers of two).
- Very large and very small unsigned integers (within 32-bit range).

### Solution

```python
def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n = n & (n - 1)    # Remove the rightmost 1-bit
        count += 1         # Increment for each removed 1-bit
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(𝑘), where 𝑘 is the number of set bits in `n` (in the worst case, all 32 bits are set, so O(32), which is considered O(1) for a 32-bit integer).
- **Space Complexity:** O(1). Only a constant number of variables is used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to call this function many times for the same number?  
  *Hint: Can you cache the result?*

- How would you adapt this for a 64-bit integer or variable integer sizes?  
  *Hint: Change iteration range or use bit tricks that work for all sizes.*

- Can this be solved using parallel or hardware-level instructions?  
  *Hint: Explore modern CPU instructions or language built-in bit-counting functions.*

### Summary
This problem emphasizes bit manipulation and counting—the classic **bit counting/hamming weight** pattern. The Brian Kernighan’s algorithm is highly efficient, running in proportion to the number of set bits rather than all bits. This pattern recurs in tasks like checking parity, performing bitwise checks, and working with masks in optimization or cryptography problems.


### Flashcard
Count set bits by repeatedly checking n & 1 and right-shifting n, or use n = n & (n−1) to clear lowest set bit each time.

### Tags
Divide and Conquer(#divide-and-conquer), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Reverse Bits(reverse-bits) (Easy)
- Power of Two(power-of-two) (Easy)
- Counting Bits(counting-bits) (Easy)
- Binary Watch(binary-watch) (Easy)
- Hamming Distance(hamming-distance) (Easy)
- Binary Number with Alternating Bits(binary-number-with-alternating-bits) (Easy)
- Prime Number of Set Bits in Binary Representation(prime-number-of-set-bits-in-binary-representation) (Easy)
- Convert Date to Binary(convert-date-to-binary) (Easy)