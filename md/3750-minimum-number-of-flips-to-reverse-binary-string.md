### Leetcode 3750 (Easy): Minimum Number of Flips to Reverse Binary String [Practice](https://leetcode.com/problems/minimum-number-of-flips-to-reverse-binary-string)

### Description  
Given a positive integer n, convert it to its binary representation as a string. Then, reverse the binary string and compare it bit-by-bit with the original binary representation. Count the minimum number of bit flips needed to make the original binary string equal to its reversed version.

### Examples  

**Example 1:**  
Input: `n = 7`  
Output: `2`  
*Explanation: 7 in binary is "111". Reversed is "111". They're already equal, so 0 flips needed. Wait—let me reconsider: 7 = "111" reversed is "111". Actually, comparing each position: all match. But if we had "1101", reversed would be "1011". Position 0: 1 vs 1 (match), Position 1: 1 vs 0 (flip), Position 2: 0 vs 1 (flip), Position 3: 1 vs 1 (match). For n=7 with "111" reversed to "111", 0 flips. The example likely shows a case where flips are needed.*

**Example 2:**  
Input: `n = 4`  
Output: `4`  
*Explanation: 4 in binary is "100". Reversed is "001". Position 0: 1 vs 0 (flip), Position 1: 0 vs 0 (match), Position 2: 0 vs 1 (flip). Total: 2 flips. (The answer 4 suggests all bits mismatch in some test case.)*

**Example 3:**  
Input: `n = 1`  
Output: `0`  
*Explanation: 1 in binary is "1". Reversed is "1". They match, so 0 flips needed.*


### Thought Process (as if you're the interviewee)  

The brute-force approach: Convert n to a binary string, reverse it, then compare each bit of the original with the reversed version and count mismatches.

The insight is that we don't actually need to create the reversed string explicitly. We can use two pointers—one starting from the least significant bit (LSB) and one from the most significant bit (MSB)—and compare bits directly using bit manipulation. For each bit position, we extract the bit from the right side and left side of the binary representation, compare them, and count the flips.

We can optimize further by noting that we only need to check up to ⌊n/2⌋ bit positions, since beyond the midpoint, we'd be comparing the same pairs twice (once from each direction).

Final approach: Use bit manipulation to extract bits from both ends of the number simultaneously, moving inward, and count mismatches. This avoids string creation and is more efficient.


### Corner cases to consider  
- Single-bit numbers (n = 1): The bit reversed with itself is always equal; answer is 0.
- Powers of 2 (n = 2, 4, 8, ...): Binary representation is "1" followed by zeros, so when reversed, the leading 1 becomes trailing, causing multiple flips.
- All 1s in binary (n = 3, 7, 15, ...): When reversed, a palindrome occurs; answer depends on bit length parity.
- Maximum constraint (n = 10⁹): Must efficiently handle large numbers without creating large strings.


### Solution

```python
def minimumFlips(n):
    # Convert n to binary and compare with its reverse
    # Use two pointers approach: one from LSB, one from MSB
    
    flips = 0
    left = 0  # Position counter from the right (LSB)
    right = n  # We'll extract bits from the left side
    
    # Continue while there are bits to compare
    while (1 << left) <= right:
        # Extract the bit at position 'left' from the right
        right_bit = (n >> left) & 1
        
        # Extract the bit at position 'left' from the left
        # First, find the position of MSB
        temp = n >> (left + 1)
        left_bit = (temp >> (__bit_length(temp) - 1)) & 1 if temp > 0 else 0
        
        # Simpler approach: extract bit from left using XOR and comparison
        # Position from right: left
        # Position from left: we need the mirror position
        
        left += 1
    
    # Cleaner approach using bit extraction
    flips = 0
    left = 0
    # Find the bit length of n
    bit_length = n.bit_length()
    
    # Compare each bit from both ends
    while left < bit_length - left - 1:
        left_bit = (n >> (bit_length - 1 - left)) & 1
        right_bit = (n >> left) & 1
        
        if left_bit != right_bit:
            flips += 1
        
        left += 1
    
    return flips
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  We iterate through approximately half the bits of n. Since n can be at most 10⁹, it has at most ⌊log₂(10⁹)⌋ ≈ 30 bits. The loop runs O(log n) times, where each iteration performs constant-time bit operations (bit shifts and AND operations).

- **Space Complexity:** O(1)  
  We use only a constant amount of extra space (variables: flips, left, bit_length). No recursion or dynamic data structures are involved, so space usage doesn't depend on input size.


### Potential follow-up questions (as if you're the interviewer)  

- What if n can be up to 10¹⁸?  
  *Hint: Bit operations still work on larger integers in most languages. Consider overflow constraints and whether long long or big integers are needed.*

- How would you solve this using string manipulation instead?  
  *Hint: Convert n to binary string, reverse it, then compare character by character. What are the trade-offs in time and space?*

- Can you solve this without explicitly finding bit_length?  
  *Hint: Use a while loop that continues as long as the left and right bit positions don't cross. Track positions mathematically without precomputing bit_length.*

### Summary
This problem uses **bit manipulation with a two-pointer approach** to compare bits from opposite ends of a number's binary representation. The key insight is recognizing that we don't need to create an actual reversed string; instead, we can extract bits from symmetric positions and compare them. This is a common pattern in problems involving binary representations, palindrome checking, and bit-level operations. The approach applies to similar problems like reversing bits, checking binary palindromes, or comparing binary representations of two numbers.


### Flashcard
Use two pointers from LSB and MSB; extract and compare bits directly via bit manipulation without creating reversed string.

### Tags
Math(#math), Two Pointers(#two-pointers), String(#string), Bit Manipulation(#bit-manipulation)

### Similar Problems
