### Leetcode 461 (Easy): Hamming Distance [Practice](https://leetcode.com/problems/hamming-distance)

### Description  
The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers x and y, return the Hamming distance between them.

### Examples  

**Example 1:**  
Input: `x = 1, y = 4`  
Output: `2`  
*Explanation: 1 = 0001, 4 = 0100. Bits differ at positions 0 and 2 (0-indexed from right), so Hamming distance is 2.*

**Example 2:**  
Input: `x = 3, y = 1`  
Output: `1`  
*Explanation: 3 = 011, 1 = 001. Bits differ only at position 1, so Hamming distance is 1.*

### Thought Process (as if you're the interviewee)  
This is a bit manipulation problem. The Hamming distance is essentially counting the number of 1s in the XOR of the two numbers, since XOR gives 1 when bits differ and 0 when they're the same.

Approaches:
1. **XOR + bit counting**: XOR the numbers, then count set bits in result
2. **Bit-by-bit comparison**: Compare each bit position individually
3. **Built-in functions**: Use language-specific bit counting functions

The XOR approach is most elegant since it directly captures the "difference" concept.

### Corner cases to consider  
- Both numbers are the same (Hamming distance = 0)
- One number is 0
- Numbers with different bit lengths
- Maximum integer values
- Negative numbers (though problem specifies non-negative)

### Solution

```python
def hammingDistance(x, y):
    # XOR gives 1 where bits differ, 0 where they're same
    xor_result = x ^ y
    
    # Count number of 1s in the XOR result
    count = 0
    while xor_result:
        count += xor_result & 1  # Check if last bit is 1
        xor_result >>= 1         # Right shift to check next bit
    
    return count

# Alternative using built-in bit counting
def hammingDistanceBuiltIn(x, y):
    return bin(x ^ y).count('1')

# Brian Kernighan's algorithm for bit counting (more efficient)
def hammingDistanceBrianKernighan(x, y):
    xor_result = x ^ y
    count = 0
    
    # Each iteration removes one set bit
    while xor_result:
        xor_result &= xor_result - 1  # Remove rightmost set bit
        count += 1
    
    return count

# Bit-by-bit comparison approach
def hammingDistanceBitByBit(x, y):
    count = 0
    
    # Continue while either number has bits left
    while x or y:
        # Check if last bits are different
        if (x & 1) != (y & 1):
            count += 1
        
        # Right shift both numbers
        x >>= 1
        y >>= 1
    
    return count

# Using lookup table for faster bit counting (for specific use cases)
def hammingDistanceLookup(x, y):
    # Precomputed bit counts for 0-255
    bit_count = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4,
                 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
                 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
                 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
                 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
                 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
                 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
                 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
                 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5,
                 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
                 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
                 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
                 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6,
                 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
                 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7,
                 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8]
    
    xor_result = x ^ y
    count = 0
    
    # Process 8 bits at a time
    while xor_result:
        count += bit_count[xor_result & 0xFF]
        xor_result >>= 8
    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(max(x,y))) or O(1) since integers have fixed bit width (typically 32 or 64 bits). Brian Kernighan's algorithm is O(number of set bits).
- **Space Complexity:** O(1) for all approaches except lookup table which uses O(256) = O(1) space.

### Potential follow-up questions (as if you're the interviewer)  

- How would you calculate Hamming distance for arrays of integers?  
  *Hint: Apply the same logic element-wise and sum up all individual Hamming distances.*

- What if you needed to find the pair with minimum Hamming distance in an array?  
  *Hint: Use trie to group numbers with similar bit patterns, or sort and compare adjacent elements.*

- Can you extend this to calculate Hamming distance for strings?  
  *Hint: Compare characters instead of bits, counting positions where characters differ.*

### Summary
This problem demonstrates fundamental bit manipulation techniques, particularly XOR operation and bit counting. The Hamming distance concept is widely used in error correction codes, cryptography, and similarity measures. The XOR + bit counting pattern is a common approach for problems involving bit differences, making it an essential technique for bit manipulation problems.


### Flashcard
XOR the two numbers, then count the number of 1s in the result to get the Hamming distance.

### Tags
Bit Manipulation(#bit-manipulation)

### Similar Problems
- Number of 1 Bits(number-of-1-bits) (Easy)
- Total Hamming Distance(total-hamming-distance) (Medium)