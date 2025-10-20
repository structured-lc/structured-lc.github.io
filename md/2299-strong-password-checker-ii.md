### Leetcode 2299 (Easy): Strong Password Checker II [Practice](https://leetcode.com/problems/strong-password-checker-ii)

### Description  
Given a string `password`, determine if it is a **strong** password.  
A password is considered strong if it satisfies **all** the following rules:  
- It has at least 8 characters.
- It contains at least one lowercase letter.
- It contains at least one uppercase letter.
- It contains at least one digit.
- It contains at least one special character from the set: `!@#$%^&*()-+`
- It does **not** contain two identical characters in a row (i.e., no two consecutive characters are the same).

You must return `True` if the password is strong, else `False`.

### Examples  

**Example 1:**  
Input: `password = "IloveLe3tcode!"`  
Output: `True`  
*Explanation: Meets all criteria — length ≥ 8, has lowercase, uppercase, digit, special character, and no consecutive identical characters.*

**Example 2:**  
Input: `password = "Me+You--IsMyDream"`  
Output: `False`  
*Explanation: Has two consecutive '-' characters, so fails the "no consecutive identical characters" rule.*

**Example 3:**  
Input: `password = "1aB!"`  
Output: `False`  
*Explanation: Length is only 4, so fails minimum length requirement.*

### Thought Process (as if you’re the interviewee)  
Let’s systematically check each rule for the password:
- **Brute-force:**  
  - Check length.
  - Track lowercase, uppercase, digit, special char presence with flags.
  - Iterate and check for two adjacent same chars.

We can do everything in a single loop for efficiency.
- Before starting the loop, check length.
- Then, use boolean flags for each character category.
- Compare current and previous character for the consecutive identical check.
- We can stop early if any rule fails.
- This is straightforward with O(n) complexity and easy to implement/read.

**Why not use regular expressions?**  
- Simple checks, so for interviews explicit code is often preferred over black-box regex.

### Corner cases to consider  
- Very short passwords (< 8).
- Password meets all but ***one*** criterion (e.g. no digit, or no special char).
- Password contains two identical characters anywhere in sequence.
- All special characters, or all of a single type (invalid).
- Edge: Only 8 characters, barely meets or doesn’t.
- Password composed only of allowed characters, but only one category.

### Solution

```python
def strongPasswordCheckerII(password: str) -> bool:
    # Rule 1: Length at least 8
    if len(password) < 8:
        return False

    has_lower = False
    has_upper = False
    has_digit = False
    has_special = False
    special_chars = set("!@#$%^&*()-+")

    prev = ''
    for c in password:
        if c == prev:
            # Rule 6: No two identical characters in a row
            return False
        prev = c

        if c.islower():
            has_lower = True
        elif c.isupper():
            has_upper = True
        elif c.isdigit():
            has_digit = True
        elif c in special_chars:
            has_special = True

    # Return True if all flags are satisfied
    return has_lower and has_upper and has_digit and has_special
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the password. Each character is visited once.
- **Space Complexity:** O(1). Flags and temp variables use constant space; no memory grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to check passwords against a banned password list?
  *Hint: Think about dictionary/set lookups and data structures for quick checking.*

- How would you support Unicode characters?
  *Hint: Consider using str category checks and broader character classes.*

- What if the required rules or special character set are dynamic?
  *Hint: How would you generalize the logic? Consider passing in sets/dictionaries or configurations.*

### Summary
This problem is a classing **string scanning and flag checking** pattern, with a twist for checking adjacent characters.  
Similar patterns are common in validation tasks, e.g., email/ID validation, and can be applied in any scenario needing all-or-none checks across a set of conditions in a single pass.  
A clean scan with early exit is often optimal for these.


### Flashcard
Check password rules in one pass: length, character types, no two identical adjacent characters.

### Tags
String(#string)

### Similar Problems
- Strong Password Checker(strong-password-checker) (Hard)
- Validate IP Address(validate-ip-address) (Medium)