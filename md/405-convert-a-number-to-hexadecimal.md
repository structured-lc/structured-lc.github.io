### Leetcode 405 (Easy): Convert a Number to Hexadecimal [Practice](https://leetcode.com/problems/convert-a-number-to-hexadecimal)

### Description  
Given any **integer** (can be negative), return a **string that represents its hexadecimal form**. The function should cover all cases, including zero and negative numbers.  
- For **negative integers**, use the **two's complement** (as done in 32-bit systems).
- Hexadecimal digits use `'0'-'9'` and `'a'-'f'` (lowercase only).
- No **leading zeros** unless the value is `0`.
- You **may not** use built-in methods that directly convert a number to hexadecimal.

### Examples  

**Example 1:**  
Input: `num = 26`  
Output: `"1a"`  
*Explanation: 26 in decimal is 1 × 16¹ + 10 × 16⁰ = "1a".*

**Example 2:**  
Input: `num = -1`  
Output: `"ffffffff"`  
*Explanation: In 32-bit two's complement, -1 is 0xffffffff (all bits 1). The function outputs 8 'f's.*

**Example 3:**  
Input: `num = 0`  
Output: `"0"`  
*Explanation: Zero is simply `"0"` in any base.*

### Thought Process (as if you’re the interviewee)  
First, I need to convert a decimal number to hexadecimal, mapping each 4-bit “nibble” into a digit (0-9 or a-f). For **positive numbers**, I can repeatedly divide by 16, taking the remainder each time and mapping to the appropriate hex digit.

**Negative numbers** are trickier: in Python, negative right shift and modulo behave differently than two's complement on a fixed-width integer. Since the problem says to use two’s complement for negatives, I should treat negative input as if it is a 32-bit unsigned int (i.e., add 2³² to negatives: num += 2\*\*32).

I'll loop: each time, get `num % 16` (or `num & 0xf`), map to '0'-'9' or 'a'-'f', shift right 4 bits, until `num` becomes zero.

No use of hex() or similar library functions, since that’s restricted.

**Optimal approach:** Bit manipulation and mapping each 4-bit chunk, as above. Simple, direct, and works for edge cases.

### Corner cases to consider  
- Input is `0` ⇒ Should return `"0"`.
- Input is **negative** ⇒ Should show two's complement (e.g., `-1` ⇒ `"ffffffff"`, `-2147483648` ⇒ `"80000000"`).
- Input is in the highest/lowest possible range for 32-bit signed integer.
- Input's hexadecimal representation is less than 8 digits (should avoid leading zeros).
- Input leads to consecutive 'f's (e.g., -1, -2, -15).
- Only mapping lowercase letters for digits ≥ 10.

### Solution

```python
def toHex(num: int) -> str:
    # Handle zero immediately
    if num == 0:
        return "0"

    # Map values 0-15 to hex digits
    hex_chars = "0123456789abcdef"
    result = []

    # For negative numbers, get their 32-bit two's complement value
    # (since Python's ints have arbitrary precision)
    if num < 0:
        num += 2 ** 32

    # Process 4 bits at a time, stop when num becomes zero
    while num > 0:
        digit = num & 0xf  # get lowest 4 bits
        result.append(hex_chars[digit])
        num >>= 4          # shift right 4 bits

    # Digits are collected in reverse order
    return ''.join(reversed(result))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₆ n) ⇒ O(1) since 32-bit input means at most 8 hex digits. Each iteration processes 4 bits (one hex digit).
- **Space Complexity:** O(1) extra space since the result list's length is at most 8, which is a small constant.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if we needed the hexadecimal with a prefix (like `"0x"`)?  
  *Hint: Consider prepending after conversion.*

- Could you adapt this code to support 64-bit numbers?  
  *Hint: Think about how many hex digits you'd need.*

- What if the function should output **uppercase** hex digits?  
  *Hint: Modify the digit to character mapping.*

### Summary
This is a direct application of **bit manipulation and number base conversion**. The problem is a good example of manually handling number format conversions and two's complement for negative numbers—key skills for systems and embedded interviews. The same pattern (repeated division and mapping) can be extended to convert to other bases (binary, octal, custom bases) or to handle different output formats.