### Leetcode 3064 (Medium): Guess the Number Using Bitwise Questions I [Practice](https://leetcode.com/problems/guess-the-number-using-bitwise-questions-i)

### Description  
You are given a hidden integer `n` in the range 1 to 2³⁰-1. You have access to an API `commonSetBits(num)`, which returns the number of set bits (i.e. 1s) in the same positions in `n` and `num`. In other words, it returns the count of 1s in the bitwise AND of `n` and `num`. Your task is to determine the exact value of `n` using only this API.

### Examples  

**Example 1:**  
Input: `n = 31`  
Output: `31`  
*Explanation: Since 31 in binary is 11111, querying each bit position with 1, 2, 4, 8, 16 (corresponding to bitmask checks) tells you all bits are set.*

**Example 2:**  
Input: `n = 33`  
Output: `33`  
*Explanation: 33 in binary is 100001, so only the first and sixth bits are set. The output reveals which bits are set by the API queries.*

**Example 3:**  
Input: `n = 6`  
Output: `6`  
*Explanation: 6 in binary is 110. By checking single-bit masks 1, 2, 4, ... up to 2²⁹, only bits 1 and 2 (i.e., 2 and 4) return 1, reconstructing n as 2+4.*

### Thought Process (as if you’re the interviewee)  
First, observe that `commonSetBits(num)` counts the number of positions where both `n` and `num` have a 1. The simplest way to uniquely determine every bit of `n` is to query the API with a bitmask that only has a single bit set for each position (i.e., powers of 2: 1, 2, 4, ..., 2²⁹).

For each bit position `i` (from 0 to 29), call `commonSetBits(1 << i)`. If the result is 1, then the iᵗʰ bit in `n` is set; otherwise, it's not set. Assemble the bits accordingly.

This approach only needs 30 queries and works for any valid n. It's efficient and the most straightforward, as it gives O(1) complexity relative to the max bit length.

### Corner cases to consider  
- `n` has only one bit set (e.g., n=1, n=2⁹).
- `n` is the maximum allowed by constraints (2³⁰-1; all bits set).
- `n` has alternate bits set (e.g., n=42, which is 101010).
- Ensure bitwise checks handle the range up to 30 bits (not missing 2²⁹).
- The API may have undefined behavior for num outside [0, 2³⁰-1]; always stay in range.

### Solution

```python
# We are given access to the API: `commonSetBits(num)`
# Returns the count of bits where both `n` and `num` are 1 in that position

def guessNumber():
    result = 0
    for i in range(30):  # since 2^30 - 1 is the max n, so 0 to 29
        bit_mask = 1 << i
        # Check if iᵗʰ bit in n is set by querying with single bit
        if commonSetBits(bit_mask):
            result |= bit_mask  # set the iᵗʰ bit in result
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(30) = O(1). We make exactly 30 API calls, independent of n.
- **Space Complexity:** O(1), only a fixed number of variables to track result and bit masks.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you optimize further if you could batch multiple bits in a single query to minimize the number of queries?
  *Hint: Is there a way to deduce more than one bit with each API call?*

- What would change if the API returned the actual AND, not the count of set bits?
  *Hint: How could you directly extract which bits are set from a bitwise AND?*

- How would your approach change if n could have more than 30 bits?
  *Hint: Think about scalable approaches and variable API constraints.*

### Summary
We used a classic bit manipulation and mask-building approach to reconstruct the hidden integer by querying the iᵗʰ bit individually via API calls. This pattern—reconstructing a binary value through bitwise probing—is common in interactive/guessing problems and can appear in reverse engineering, security, or "twenty questions"-style algorithms. The strategy is efficient and optimal given the constraints.


### Flashcard
Query API with powers of 2 (1, 2, 4, ..., 2²⁹); if commonSetBits(1 << i) = 1, set iᵗʰ bit in result.

### Tags
Bit Manipulation(#bit-manipulation), Interactive(#interactive)

### Similar Problems
