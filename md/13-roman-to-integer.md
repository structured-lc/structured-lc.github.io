### Leetcode 13 (Easy): Roman to Integer [Practice](https://leetcode.com/problems/roman-to-integer)

### Description  
Given a Roman numeral represented as a string (e.g. "XIV"), convert it to its integer (numeric) value.  
Roman numerals are based on combinations of these symbols:
- I = 1  
- V = 5  
- X = 10  
- L = 50  
- C = 100  
- D = 500  
- M = 1000  

Normally, values are added together: "VIII" = 5 + 3 = 8.  
But if a smaller symbol precedes a larger one, it is subtracted: "IV" = 5 - 1 = 4.  
Your task: Parse the string and compute the correct integer, respecting these rules.

### Examples  

**Example 1:**  
Input: `"III"`  
Output: `3`  
*Explanation: I + I + I = 1 + 1 + 1 = 3*

**Example 2:**  
Input: `"IV"`  
Output: `4`  
*Explanation: I before V means subtract: 5 - 1 = 4*

**Example 3:**  
Input: `"IX"`  
Output: `9`  
*Explanation: I before X means subtract: 10 - 1 = 9*

**Example 4:**  
Input: `"LVIII"`  
Output: `58`  
*Explanation: L + V + III = 50 + 5 + 3 = 58*

**Example 5:**  
Input: `"MCMXCIV"`  
Output: `1994`  
*Explanation: M + CM + XC + IV = 1000 + (1000-100) + (100-10) + (5-1) = 1000 + 900 + 90 + 4 = 1994*

### Thought Process (as if you’re the interviewee)  
My first step would be to map each Roman numeral to its value, for example `'I':1`, `'V':5`, ..., `'M':1000`.  
I'll need to walk through the string and for each character, decide whether to add or subtract its value.  
The rule is:  
- If the current character is less than the next one, subtract it.  
- Otherwise, add it.  
This handles cases like "IV" (subtract), and "VI" (add).  
We can either iterate left-to-right or right-to-left – both work, but I prefer left-to-right for readability.  
We'll sum all values as we process them, adjusting for subtractive cases.

**Optimization:** All operations use a single scan and constant space for the map. This is as optimal as possible given the problem.  

### Corner cases to consider  
- Empty string: Should return 0 or error (if allowed).
- Invalid Roman numerals (like "IC" or "VV"): Problem does not specify how to handle, usually assume input is valid.
- Only one symbol: e.g. "V" → 5.
- Very long strings (max input size).
- Multiple subtractive notations (like "MCMXCIV").

### Solution

```python
def romanToInt(s: str) -> int:
    # Mapping from symbol to value
    roman = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    result = 0
    n = len(s)
    for i in range(n):
        # If this value is less than the value to its right, subtract it
        if i < n - 1 and roman[s[i]] < roman[s[i + 1]]:
            result -= roman[s[i]]
        else:
            result += roman[s[i]]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We scan each character in the input string once, where n = length of s.
- **Space Complexity:** O(1). Only a fixed-size dictionary for the numerals is used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution to handle invalid input, e.g. repeated invalid sequences?
  *Hint: Add input validation or throw exceptions for bad tokens.*

- Suppose the input could be very large (n > 10⁶). Would your solution still work?
  *Hint: Analyze for potential algorithmic/space bottlenecks, but since work is O(n) it scales well.*

- Can you extend this to convert integers to Roman numerals?
  *Hint: Work backwards using largest possible numerals, subtracting as you go.*

### Summary
This approach uses the **single-pass scan with greedy addition/subtraction** pattern.  
It's common in parsing problems (not only Roman numerals, but also for: currency, time parsing, etc.), where a structure has both additive and subtractive rules determined by the order of symbols.  
Key ideas: mapping, pattern recognition in iteration, and handling "look ahead" for special cases.

### Tags
Hash Table(#hash-table), Math(#math), String(#string)

### Similar Problems
- Integer to Roman(integer-to-roman) (Medium)