### Leetcode 1271 (Easy): Hexspeak [Practice](https://leetcode.com/problems/hexspeak)

### Description  
Given a positive decimal integer (as a string), convert it to base-16 (hexadecimal) and replace all valid digits to form a new string:
- Replace digits: '0' with 'O', '1' with 'I'.
- All other valid hex "digits": 'A'-'F' can appear as-is.
- If any digits '2'-'9' appear in the hex representation, return "ERROR" because those are not allowed in Hexspeak.

### Examples  

**Example 1:**  
Input: `num = "257"`  
Output: `IOI`  
*Explanation: 257 in hex is 0x101, which becomes "IOI" after replacement.*

**Example 2:**  
Input: `num = "3"`  
Output: `ERROR`  
*Explanation: 3 in hex is "3", but '3' is not allowed in Hexspeak.*

**Example 3:**  
Input: `num = "47"`  
Output: `ERROR`  
*Explanation: 47 in hex is "2F". Digit '2' is forbidden, so output is "ERROR".*


### Thought Process (as if you’re the interviewee)  

I’ll convert the number to hexadecimal, then scan each digit. If I see '0' or '1', replace as required. If it’s 'A'-'F', leave as-is—they’re valid.
If I see any digit '2'-'9', instantly return "ERROR". Build result string as I scan left-to-right.
This is a simple character mapping problem with a check for invalid digits.

### Corner cases to consider  
- Output string must be uppercase.
- Input converts to hex which starts with forbidden digits.
- Value too large for int? (If necessary handled by language.)
- '0' and '1' must be replaced even if at the start or end.

### Solution

```python
def toHexspeak(num: str) -> str:
    # Convert decimal string to int, then to hexadecimal (without '0x' prefix), uppercase
    hex_str = hex(int(num))[2:].upper()
    mapping = {'0': 'O', '1': 'I',
               'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F'}
    result = []
    for c in hex_str:
        if c in mapping:
            result.append(mapping[c])
        else:
            # Forbidden digits '2'-'9'
            return "ERROR"
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), k = number of digits in hex representation.
- **Space Complexity:** O(k), proportional to result string.


### Potential follow-up questions (as if you’re the interviewer)  

- What if input number is very large (long int or big integer)?  
  *Hint: Python handles arbitrary size, but check language constraints.*

- How would you generalize to a custom Hexspeak encoding?  
  *Hint: Provide a replacement mapping as a parameter.*

- Could you do this in-place for a mutable array?  
  *Hint: Yes, for languages with mutable strings/arrays.*

### Summary
This problem is a direct string and digit mapping with rejection for invalid characters. It’s an example of string sanitization and encoding pattern that can be reused for validating and transforming inputs (encoding/decoding).

### Tags
Math(#math), String(#string)

### Similar Problems
