### Leetcode 3304 (Medium): Find the K-th Character in String Game I [Practice](https://leetcode.com/problems/find-the-k-th-character-in-string-game-i/)

### Description
You start with a string `word = "a"`. In each operation, you append a transformed copy of the current string where every character is shifted to the next letter in the alphabet (with 'z' wrapping to 'a'). Given an integer `k`, return the kᵗʰ character in the final string after performing enough operations so that the string has at least `k` characters.

The sequence evolves as: `"a"` → `"ab"` → `"abbc"` → `"abbcbccd"` → ...

### Examples

**Example 1:**  
Input: `k = 3`  
Output: `"b"`  
*Explanation: After operation 1: "ab" (length 2). After operation 2: "abbc" (length 4). The 3rd character is "b".*

**Example 2:**  
Input: `k = 1`  
Output: `"a"`  
*Explanation: The initial string is "a", so the 1st character is "a".*

**Example 3:**  
Input: `k = 8`  
Output: `"c"`  
*Explanation: After operation 1: "ab". After operation 2: "abbc". After operation 3: "abbcbccd" (length 8). The 8th character is "d".*

### Thought Process (as if you're the interviewee)

**Brute Force Approach:**
The straightforward approach is to simulate the entire process. Keep appending the transformed copy until we have at least `k` characters, then return the character at index `k - 1`. This is intuitive but has limitations when `k` is very large.

**Optimized Approach:**
Instead of building the entire string, we can use a mathematical/bit manipulation insight. Notice that:
- The character at position `k` depends on how many times position `k` has been "transformed" (shifted).
- We can trace back which operations affected position `k` by recursively checking which half of the string it belongs to.
- The number of transformations applied to a character at position `k` can be determined by the bit pattern of `k - 1`.

**Key Insight:**
The position `k - 1` (0-indexed) in binary tells us exactly how many times that position has been shifted. Specifically, the number of set bits in `k - 1` equals the number of times that character has been incremented from 'a'.

This is because at each level of recursion, if position `k` falls in the second half (the transformed part), it means it has been shifted once more.

**Why This Works:**
- Start with 0 (representing 'a')
- For each operation, positions in the second half get incremented
- The binary representation of `k - 1` encodes which "halves" the position falls into
- Count the 1-bits → this is the total shift from 'a'

### Corner cases to consider
- `k = 1`: The answer is always "a" (0 set bits in 0)
- `k` is a power of 2: Position is at the boundary between halves
- Large `k` values (up to 10⁵): The bit manipulation approach handles this efficiently without building the actual string
- Character wraparound: 'z' + 1 should become 'a', handled by modulo 26

### Solution

```python
def kthCharacter(k: int) -> str:
    # Convert k from 1-indexed to 0-indexed
    # Count how many times this position has been transformed
    
    # The key insight: the number of transformations applied to position k-1
    # equals the number of set bits (1s) in the binary representation of k-1
    
    # This is because:
    # - Start with "a" at every position
    # - Each operation doubles the string and increments characters in the new half
    # - A position k falls into the "transformed half" if a certain bit is set
    # - The count of set bits tells us total increments from 'a'
    
    position = k - 1  # Convert to 0-indexed
    
    # Count the number of 1s in binary representation of position
    shift_count = bin(position).count('1')
    
    # Start from 'a' and apply the shifts
    result_char = chr(ord('a') + shift_count)
    
    return result_char
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(log k)  
  The `bin()` function and `.count('1')` operation take O(log k) time because we're working with the binary representation of a number, which has log₂(k) bits. Alternatively, using bit manipulation directly with a loop would also be O(log k).

- **Space Complexity:** O(log k)  
  The `bin()` function creates a string representation of the binary form, which requires O(log k) space. If we use a direct bit-counting loop instead, we can achieve O(1) space.

### Potential follow-up questions

- What if we need to handle multiple queries for different values of `k` efficiently?  
  *Hint: Precompute bit counts or use a lookup table; consider if the answers follow a pattern.*

- What if the string can wrap around multiple times (like 'z' → 'a' → 'b')? How would you generalize this?  
  *Hint: Use modulo arithmetic; the shift\_count would be taken modulo 26 to handle wraparound.*

- How would you solve this problem if the transformation rule was different (e.g., shift by 2 instead of 1)?  
  *Hint: The shift\_count would need to be multiplied by the transformation step; combine with modulo 26 for wraparound.*

### Summary
This problem leverages a clever mathematical insight: the bit representation of an index encodes the recursive structure of the expanded string. By counting set bits in `k - 1`, we determine how many times a position has been transformed without building the actual string. This transforms a potentially exponential simulation into a logarithmic solution. This pattern is common in problems involving recursive string/array doubling, binary trees indexed by position, and problems where the answer depends on the binary decomposition of an index.

### Tags
String(#string)

### Similar Problems
