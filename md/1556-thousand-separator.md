### Leetcode 1556 (Easy): Thousand Separator [Practice](https://leetcode.com/problems/thousand-separator)

### Description  
Given an integer `n`, return it as a formatted string where every three digits, counting from the right, are separated by a dot (`.`). No separator is added for groups with fewer than three digits. This formatting is similar to adding a "thousand separator" but with dots instead of commas.

### Examples  

**Example 1:**  
Input: `987`  
Output: `987`  
*Explanation: The input has only three digits, so no separator is required.*

**Example 2:**  
Input: `1234`  
Output: `1.234`  
*Explanation: Starting from the right, group the last three digits. The leftmost digit (`1`) forms its own group. So you get "1.234".*

**Example 3:**  
Input: `123456789`  
Output: `123.456.789`  
*Explanation: The number is grouped as "123", "456", and "789" from left to right, separated by dots.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach:**  
  - Convert the integer to a string.
  - Starting from the right, insert a separator for every three digits.
  - This can be done by iterating backward, counting digits and inserting a dot after every third digit (except at the end).

- **Optimized approach:**  
  - To avoid complex insertions in the string, collect the result in a list while processing from right to left, then reverse it at the end.
  - Alternatively, iterate from left to right and calculate where the dots go using string length and the current index; this avoids reversal.
  - Both methods are efficient and have similar complexity; pick the one that produces cleaner code.

- Libraries like `str.format()` or f-strings with comma formatting exist, but in an interview setting, we should refrain from shortcuts and show manual string processing.

- **Trade-offs:**  
  - Iterating and manipulating a string is straightforward, with negligible time difference compared to built-in formatting for small/medium-sized `n`.  
  - Reversing the list at the end is acceptable since max length is fixed by max integer size.

### Corner cases to consider  
- `n = 0` (single digit, no separator)
- `n` with less than 4 digits (e.g., 1, 12, 123)
- `n` with number of digits exactly a multiple of 3 (e.g., 1000, 1000000)
- `n` with digits not multiple of 3 (e.g., 12345)
- All digits are the same (e.g., 1111111)
- No leading/trailing separators or extra dots

### Solution

```python
def thousandSeparator(n: int) -> str:
    # Convert the number to its string representation
    s = str(n)
    length = len(s)
    # Prepare a list to build the result efficiently
    res = []
    for i, ch in enumerate(s):
        # Add a dot if we are at a position that is a multiple of 3 from the right (except the first digit)
        if i > 0 and (length - i) % 3 == 0:
            res.append('.')
        # Append current digit
        res.append(ch)
    # Join all characters to get the final string
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀(n))  
  We process each digit exactly once. The number of digits in `n` is O(log₁₀(n)), so the complexity is linear in the number of digits.

- **Space Complexity:** O(log₁₀(n))  
  The extra list to hold the characters grows proportional to the length of the input number (number of digits and separators).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change the separator character (e.g., use space, comma) or support a custom separator?  
  *Hint: Make the separator a function argument.*

- What if the input can be negative or includes decimals?  
  *Hint: Consider handling a minus sign or processing the fractional part separately.*

- How would you handle international number formatting requirements or large inputs (e.g., BigIntegers)?  
  *Hint: Modularize logic and ensure it works for arbitrary-length strings.*

### Summary
This problem is a classic example of **string manipulation** and **grouping**. The technique is the same as formatting numbers with thousand separators but can be adapted for any separator or group size. It is applicable to formatting outputs in finance, internationalization, or any domain where human-readable numbers are needed. The coding pattern—processing strings in groups from the end or using modular conditions—also applies to problems like word wrapping, group encoding, or digit grouping tasks.

### Tags
String(#string)

### Similar Problems
