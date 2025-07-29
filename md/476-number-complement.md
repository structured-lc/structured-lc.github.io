### Leetcode 476 (Easy): Number Complement [Practice](https://leetcode.com/problems/number-complement)

### Description  
Given a **positive integer** `num`, return its **complement**.  
The complement of a number is formed by flipping every bit of its binary representation—only up to the most significant bit. You do **not** consider leading zeros.

For example:  
- The complement of `5` (binary `101`) is `2` (binary `010`).  
- Flipping means every `1` becomes `0` and vice versa, for all bits up to the leftmost `1`.

### Examples  

**Example 1:**  
Input: `num = 5`  
Output: `2`  
*Explanation: 5 in binary is `101`.  
 Flipping all bits (`1→0`, `0→1`) gives `010` = 2.*

**Example 2:**  
Input: `num = 1`  
Output: `0`  
*Explanation: 1 in binary is `1`.  
 Flipping the single bit results in `0`.*

**Example 3:**  
Input: `num = 10`  
Output: `5`  
*Explanation: 10 in binary is `1010`.  
 Flipping gives `0101` = 5.*

### Thought Process (as if you’re the interviewee)  

Let's first consider a **brute-force** approach:  
- Convert `num` to binary (as a string), flip every bit (`'1'` to `'0'` and `'0'` to `'1'`), and then convert back to integer.
- This works, but using string manipulations is not optimal and not idiomatic in most languages for bit problems.

Instead, let's try to use **bit manipulation**:  
- Only the bits up to the most significant `1` in `num` should be considered.
- For example, for `num = 5` (binary `101`), we want a mask `111`. Flipping gives correct result.

**Optimized approach:**  
- Compute a mask with all bits set to `1` where the mask is the same length (in bits) as `num`.
- XOR the mask and `num`. XOR flips all bits, which gives the complement.

**How to find this mask?**  
- Start with `mask = 1`.  
- Keep shifting left and OR-ing with current mask until mask is greater than or equal to `num`.
- Example: `num = 5` (binary `101`):   
  - mask progress: `1` (`001`), `3` (`011`), `7` (`111`) → stop when `mask >= num`.
- Now `mask ^ num` = complement.

This way, there's no string conversion, and it uses only O(1) space and O(log(num)) time.

### Corner cases to consider  
- n = 1 (single bit)
- n is a power of two (e.g., 2, 4, 8)
- Large n near 2³¹ (maximum constraint)
- Ensure no leading zeros are included in the result.
- Only consider bits up to the highest set bit.

### Solution

```python
def findComplement(num: int) -> int:
    # Edge case: num is 0, by definition complement would usually be all 1's,
    # but per constraints, num ≥ 1.

    mask = 1
    temp = num
    # Build the mask with all bits set to 1, length equal to num's binary length
    while temp:
        mask = (mask << 1) | 1
        temp >>= 1

    # Subtract 1 from mask to adjust for the extra shift
    mask >>= 1

    # XOR num with the mask flips the bits where mask has 1s
    return num ^ mask
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₂n) — Building the mask takes one loop per bit in `num`. Each iteration halves `temp`.
- **Space Complexity:** O(1), as no extra space used aside from counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the requirements changed to include leading zeros (e.g., fixed 32 or 64 bits)?
  *Hint: How would the mask need to change?*

- How would you handle input if it could be 0?
  *Hint: Per constraints, num ≥ 1, but allowing 0 may need a custom rule.*

- Can you do this in constant time, for a small fixed bit width?
  *Hint: Precompute a mask for fixed bit-width (e.g., 32 or 64 bits).*

### Summary
We used **bit manipulation** to dynamically generate a mask of all 1s matching the bit length of the input and then flipped the bits using XOR, all in O(log n) time and O(1) space. This approach is a classic example of binary manipulation, widely applicable to problems that require flipping bits, finding number complements, and masking bits up to the most significant 1.