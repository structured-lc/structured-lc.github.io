### Leetcode 3602 (Easy): Hexadecimal and Hexatrigesimal Conversion [Practice](https://leetcode.com/problems/hexadecimal-and-hexatrigesimal-conversion)

### Description  
You are given a non-negative integer n. Convert it to:
- Hexadecimal (base-16) as a string using digits 0-9 and a-f.
- Hexatrigesimal (base-36) as a string using digits 0-9 and lowercase letters a-z.
Return both results as a tuple of strings.

### Examples  
**Example 1:**  
Input: `n = 255`  
Output: `('ff', '73')`  
*Explanation: 255 in hex is 'ff', in base-36 is '73'.*

**Example 2:**  
Input: `n = 0`  
Output: `('0', '0')`  
*Explanation: "0" in any base is still zero.*

**Example 3:**  
Input: `n = 36`  
Output: `('24', '10')`  
*Explanation: 36 in hex is '24' and in base-36 is '10'.*


### Thought Process (as if you’re the interviewee)  
- For base-16, can use built-in hex conversion but need to remove prefix and lowercase.
- For base-36, write a conversion loop (repeated division, collect remainder, map digits 0-9 and a-z).
- Handle n=0 as a special case.
- Return both values as strings.

### Corner cases to consider  
- n = 0 (special handling, return '0').
- Very large n.

### Solution

```python
def hexadecimal_and_hexatrigesimal_conversion(n):
    # Hexadecimal: built-in, strip '0x' prefix
    hex_str = hex(n)[2:].lower()
    # Base 36 loop
    if n == 0:
        base36 = '0'
    else:
        chars = '0123456789abcdefghijklmnopqrstuvwxyz'
        val, arr = n, []
        while val > 0:
            val, rem = divmod(val, 36)
            arr.append(chars[rem])
        base36 = ''.join(reversed(arr))
    return (hex_str, base36)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(log₁₆ n + log₃₆ n)
- **Space Complexity:** O(1) (both outputs at most O(log n) string length)

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to convert both ways (string to int as well)?
  *Hint: Use int(s, b) in Python for any base ≤36.*

- What if you wanted output in uppercase?
  *Hint: Add .upper() to the string result.*

- Can this handle negative numbers? Should it?
  *Hint: Adjust logic to handle negatives if the spec expands.*

### Summary
Classical numeric base conversion. Base-16 and base-36 are common; this can generalize to other small integer bases. Useful for ID encoding, compact fingerprints, etc.