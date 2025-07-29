### Leetcode 1318 (Medium): Minimum Flips to Make a OR b Equal to c [Practice](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c)

### Description  
You are given three positive integers — **a**, **b**, and **c**.  
Your task is to determine the **minimum number of bit flips needed in a or b** such that for every bit,  
\[
(a~\text{OR}~b) = c
\]
A "flip" means changing any individual bit of a or b from 0 to 1 or from 1 to 0.  
You can **only flip bits in a or b, not c**.  
The result should be the fewest flips required so that the binary representation of (a OR b) matches c at every bit position.


### Examples  

**Example 1:**  
Input: `a=2, b=6, c=5`  
Output: `3`  
*Explanation:*
- Binary representations (8 bits for clarity):  
  a = `0000 0010`  
  b = `0000 0110`  
  c = `0000 0101`  
- Bitwise OR:  
  a | b = `0000 0110`  
  To match c, you need to:
    - At bit 0: a=0, b=0, c=1  ⇒ flip either a or b (1 flip)
    - At bit 2: a=0, b=1, c=0  ⇒ flip b (1 flip)
    - At bit 1: a=1, b=1, c=0  ⇒ flip both a and b (but only one needs to change from 1 to 0 to become 0 with OR, but since both are 1, need to flip both, so 2 flips)  
  But minimal flips overall: total = `3`

**Example 2:**  
Input: `a=4, b=2, c=7`  
Output: `1`  
*Explanation:*
- a = `100`, b = `010`, c = `111`
- a|b = `110`
  - To get c, at bit 0: a=0, b=0, c=1 ⇒ flip either a or b (1 flip)
  - Other bits already match
- Total flips: `1`

**Example 3:**  
Input: `a=1, b=2, c=3`  
Output: `0`  
*Explanation:*
- a = `001`, b = `010`, c = `011`
- a|b = `011` = c  
- No bits need to be flipped.


### Thought Process (as if you’re the interviewee)  
First, I need to compare the (a OR b) result with c, bit by bit.

Brute-force approach:
- Convert a, b, c to binary strings of equal length.
- Iterate through each bit (from 0 to 31 for 32-bit integers).
  - At each position:
    - If (a OR b) at that bit matches c, do nothing.
    - If they differ, count the number of flips needed:
      - If c's bit is 0: both a and b must be 0. If either is 1, flip it. (So, potentially 1 or 2 flips)
      - If c's bit is 1: at least one of a or b must be 1. If both are 0, flip one (1 flip).

Optimization:
- No need to convert to strings or extra arrays. Simply process with bitwise operations (shift and AND).
- Iterate while any of a, b, or c has unprocessed bits.

Final approach:
- Loop while (a, b, or c) is non-zero.
- At each iteration:
  - Extract lowest bit of a, b, and c.
  - Apply logic above to count minimum flips.
- Shift all numbers right by one for next bit.

This is O(1) in terms of steps since integer size is fixed (e.g. 32 bits), and O(1) space.


### Corner cases to consider  
- All numbers already match: a OR b == c.
- a, b, c are all 0 (should output 0).
- Maximum integer values.
- a or b is 0, c is nonzero (must flip a or b bits).
- a and b both have '1' at a position where c is 0 (need 2 flips at that bit).
- Large numbers with different bitlengths.


### Solution

```python
def minFlips(a: int, b: int, c: int) -> int:
    flips = 0
    
    while a or b or c:
        bit_a = a & 1
        bit_b = b & 1
        bit_c = c & 1
        
        if bit_c == 0:
            # Both a and b must be 0. If any is 1, must flip each 1 to 0.
            if bit_a == 1:
                flips += 1
            if bit_b == 1:
                flips += 1
        else:
            # At least one of a or b must be 1. If both are 0, flip one to 1.
            if bit_a == 0 and bit_b == 0:
                flips += 1
        
        a >>= 1
        b >>= 1
        c >>= 1
        
    return flips
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(1)    
  The total iterations are bounded by the number of bits in the integers (typically 32 or 64). Each iteration is constant time.
  
- **Space Complexity:** O(1)    
  Only a constant number of variables are needed (no extra space proportional to input).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle negative or very large numbers?  
  *Hint: Consider signed binary representations and bit masks.*

- What if you could also flip bits of c?  
  *Hint: Logic would need to account for adjusting c as well as a, b.*

- Could you output the actual indices of bits you need to flip?  
  *Hint: Track index (bit position) in your loop and collect when a flip is made.*


### Summary
This solution demonstrates a classic usage of *bitwise manipulation* and greedy choices at each bit. The key pattern is "count the minimal per-position changes to match a binary property," and arises in problems involving **bit masks**, **digital circuits (logic gates)**, and even **xor puzzles**. This single-pass, position-wise scan is highly efficient for bitwise alignment problems.