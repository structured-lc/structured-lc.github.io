### Leetcode 1694 (Easy): Reformat Phone Number [Practice](https://leetcode.com/problems/reformat-phone-number)

### Description  
Given a phone number string containing digits, spaces, and dashes, return the phone number reformatted so that every group contains exactly 3 or 2 digits. The rules are:
- Remove all spaces and dashes.
- Re-group the digits from left to right into groups of 3, except for the last 2 to 4 digits which must be split into groups of 2.
- Groups are joined by dashes.

### Examples  

**Example 1:**  
Input: `number = "1-23-45 6"`  
Output: `"123-456"`  
*Explanation: Remove symbols, group as .*

**Example 2:**  
Input: `number = "123 4-567"`  
Output: `"123-45-67"`  
*Explanation: Remove symbols ➔ 1234567. Group as .*

**Example 3:**  
Input: `number = "--17-5 229 35-39475 "`  
Output: `"175-229-353-94-75"`  
*Explanation: Remove all symbols ➔ 1752293539475. Group as .*

### Thought Process (as if you’re the interviewee)  
- First, clean the input to keep only digits.
- Then, process from left to right creating groups. Most of the time groups are of 3.
- Special cases occur when the last group might be of size 4, in which case split it as two groups of 2.
- Carefully watch out for the last 4, 3, or 2 digits.

### Corner cases to consider  
- Short input (<3 digits)
- Exactly 4 digits at the end (should be split as 2+2)
- Input with only delimiters and spaces
- Input with only digits and no grouping needed

### Solution

```python
def reformatPhoneNumber(number):
    # Remove non-digit characters
    digits = []
    for ch in number:
        if ch.isdigit():
            digits.append(ch)
    n = len(digits)
    res = []
    i = 0
    while n - i > 4:
        res.append(''.join(digits[i:i+3]))
        i += 3
    # Handle the tail
    if n - i == 4:
        res.append(''.join(digits[i:i+2]))
        res.append(''.join(digits[i+2:i+4]))
    else:
        res.append(''.join(digits[i:]))
    return '-'.join(res)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) for scanning and O(n) for grouping.  
- **Space Complexity:** O(n) for storing cleaned digits and result.

### Potential follow-up questions (as if you’re the interviewer)  
- How should you handle non-digit characters like letters?  
  *Hint: Ignore as per problem, or raise error if invalid input.*

- Could this be done in a single pass with no extra storage?  
  *Hint: Use indexes and in-place string building, but may not be necessary for clarity.*

- How to adapt if groups must be of size 3 or 4 instead of 3 or 2?  
  *Hint: Change the grouping logic for new size constraints.*

### Summary
Classic string parsing and grouping. This same logic can apply to formatting license keys, social security numbers, or other fixed groupings in data cleaning.

### Tags
String(#string)

### Similar Problems
