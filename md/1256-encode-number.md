### Leetcode 1256 (Medium): Encode Number [Practice](https://leetcode.com/problems/encode-number)

### Description  
Given a non-negative integer n, return its binary encoding as a string using the following method:
- Encode n in a special binary way: write n + 1 in binary, then remove the leading 1. Return the resulting string.

### Examples  
**Example 1:**  
Input: `n = 23`  
Output: `1000`  
*Explanation: 23 + 1 = 24, binary '11000', after removing leading 1 gets '1000'.*

**Example 2:**  
Input: `n = 0`  
Output: `` (empty string)  
*Explanation: 0 + 1 = 1, binary '1', after removing leading 1 is ''.*

**Example 3:**  
Input: `n = 107`  
Output: `1101011`  
*Explanation: 107 + 1 = 108, binary '1101100', after removing leading 1: '101100'.* (Note: As per encoding, but check with implementation)

### Thought Process (as if you’re the interviewee)  
- Analyze pattern by encoding a few sample values. For n = 0 → '', n = 1 → '0', n = 2 → '1', n = 3 → '00' etc.
- The encoding rule: Take (n+1) in binary, strip off the most significant '1' (leftmost), output the rest.
- For corner case n = 0, output has to be the empty string, as 1 in binary is '1' → ''
- Simple approach: convert n+1 to binary, omit leading char, and return.

### Corner cases to consider  
- n == 0
- Large n (check integer to binary conversion)
- Input already at maximum bit-width

### Solution

```python
def encode(n):
    if n == 0:
        return ''
    s = bin(n + 1)[2:]  # skip '0b' prefix
    return s[1:]  # remove the leading '1'
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) — since converting integer to binary takes as many steps as there are bits in n+1.
- **Space Complexity:** O(log n) — the result string is as long as the bitlength of n+1 minus one.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to decode the encoded string back to n?
  *Hint: Add '1' at front, parse as binary, subtract 1.*

- How would you handle leading/trailing zero issues?
  *Hint: Follow strict encoding/decoding rules as per definition.*

- Can you implement both encode and decode to verify correctness?
  *Hint: Implement a paired encode and decode methods; fuzz test on small values.*

### Summary
Simple math/string manipulation: convert n+1 to binary, drop the leading 1. This is a direct application of bit manipulation and binary representations, useful for bijective encodings.


### Flashcard
Convert n+1 to binary, drop the leading '1', and return the rest as the encoded string.

### Tags
Math(#math), String(#string), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Convert to Base -2(convert-to-base-2) (Medium)