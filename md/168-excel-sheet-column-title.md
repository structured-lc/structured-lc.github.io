### Leetcode 168 (Easy): Excel Sheet Column Title [Practice](https://leetcode.com/problems/excel-sheet-column-title)

### Description  
Given an integer columnNumber (≥1), convert it to its corresponding column title as used in Excel sheets. This is similar to converting a decimal number to base 26, but with 'A' to 'Z' representing digits 1 to 26 (not 0 to 25). For example, 1 maps to 'A', 2 to 'B', ..., 26 to 'Z', 27 to 'AA', 28 to 'AB', and so on.

### Examples  

**Example 1:**  
Input: `1`,  
Output: `A`  
*Explanation: 1 maps directly to 'A' (the first column in Excel).*

**Example 2:**  
Input: `28`,  
Output: `AB`  
*Explanation: 28 - 1 = 27. 27 // 26 = 1, 27 % 26 = 1. The rightmost character is 'B' (second letter), and the next character is 'A' (first letter): "AB".*

**Example 3:**  
Input: `701`,  
Output: `ZY`  
*Explanation: 701 - 1 = 700. 700 // 26 = 26, 700 % 26 = 24. The rightmost is 'Y', 26 - 1 = 25, corresponding to 'Z': "ZY".*

### Thought Process (as if you’re the interviewee)  

- At first glance, it is similar to converting to base-26, with a small twist: there’s no '0', so 'A' starts at 1.
- Traditional base conversion gives us modulo and division, but because 'A' should represent 1 (not 0), we must subtract 1 from columnNumber before the modulo step.
- For each character:
  - Subtract 1 from columnNumber.
  - Get the remainder (columnNumber % 26) and map to correct letter ('A' + remainder).
  - Reduce columnNumber by dividing by 26 (integer division).
- Edge case: Repeat until columnNumber becomes zero.
- We build the string from right to left.

### Corner cases to consider  
- columnNumber = 1 → should return 'A'
- columnNumber = 26 → should return 'Z'
- columnNumber = 27 → should return 'AA'
- Large values (e.g., 2147483647) — make sure efficiency and loop termination.
- Off-by-one errors with the zero-index adjustment (subtracting 1 at right step).

### Solution

```python
def convertToTitle(columnNumber: int) -> str:
    # Initialize an array to build the result in reverse
    result = []
    while columnNumber > 0:
        columnNumber -= 1  # Adjust because Excel columns are 1-indexed
        rem = columnNumber % 26
        char = chr(ord('A') + rem)
        result.append(char)
        columnNumber //= 26
    # The result is built backwards so reverse and join
    return ''.join(reversed(result))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₍₂₆₎ N) — Each loop divides by 26, so the number of iterations is proportional to the number of "digits" in base-26 representation of N.
- **Space Complexity:** O(1) extra (ignore output string), since the list of characters is bounded by the number of digits (≤7 for 32-bit int).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is 0 or negative?  
  *Hint: Excel doesn't have columns for zero or negatives, but how would you handle invalid input?*

- Can you reverse the process? (Given a title, find the number.)  
  *Hint: Implement base-26 conversion, 'A'→1, 'B'→2, ..., 'Z'→26.*

- How would you generalize for a custom alphabet or different base?  
  *Hint: Make the alphabet and base configurable.*

### Summary
The problem is a clever variant of "base conversion" with a non-zero starting digit. Key nuance: adjust index by subtracting 1 before modulo, so output matches Excel's unique mapping. The coding pattern is common for "number to string/base" conversions and can be reused for similar encoding challenges.