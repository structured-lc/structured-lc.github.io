### Leetcode 3606 (Easy): Coupon Code Validator [Practice](https://leetcode.com/problems/coupon-code-validator)

### Description  
Given a coupon code as a string, determine if it is valid based on the following rules:
- The coupon code must be exactly 10 characters long.
- It can contain only uppercase English letters (A-Z) and digits (0-9).
- The code must have at least two digits.
Return True if the code is valid, else False.

### Examples  

**Example 1:**  
Input: `code = "A1B2C3D4E5"`  
Output: `True`  
*Explanation: Length is 10, all valid characters, contains 5 digits.*

**Example 2:**  
Input: `code = "A1B2CDEFGH"`  
Output: `True`  
*Explanation: Length is 10, valid characters, contains 2 digits.*

**Example 3:**  
Input: `code = "A1*B2C3D4!"`  
Output: `False`  
*Explanation: Contains invalid characters ('*', '!').*

### Thought Process (as if you’re the interviewee)  
- Check if length is exactly 10.
- Check if all characters are uppercase letters or digits.
- Count how many digits (must have at least two).
- If all criteria are met, return True; else, return False.

### Corner cases to consider  
- String of wrong length.
- Code has special characters or lowercase letters.
- Not enough digits.
- Empty string or null input (if allowed).

### Solution

```python
def isValidCouponCode(code):
    if len(code) != 10:
        return False
    digit_count = 0
    for c in code:
        if 'A' <= c <= 'Z' or '0' <= c <= '9':
            if '0' <= c <= '9':
                digit_count += 1
        else:
            return False
    return digit_count >= 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) since the code length is always 10.
- **Space Complexity:** O(1) since no extra memory used except simple counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if code length is variable?  
  *Hint: Add a length bound parameter to function.*

- How would you adapt to accept lowercase letters as well?  
  *Hint: Strip .upper() or add to allowed chars.*

- Could you use regular expressions for this?  
  *Hint: Yes, regex patterns can compact validation.*

### Summary
This is a classic input validation problem. It uses simple string traversal and counting, and can be solved with regular expressions or on-the-fly logic depending on requirements.


### Flashcard
Validate length = 10, all characters are uppercase letters or digits, and digit count ≥ 2.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
