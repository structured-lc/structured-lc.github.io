### Leetcode 65 (Hard): Valid Number [Practice](https://leetcode.com/problems/valid-number)

### Description  
Given a string, determine if it is a valid number.  
A valid number can have:
- Optional leading/trailing whitespace
- An optional '+' or '-' sign
- Digits before and/or after a decimal point (at least one digit somewhere)
- An optional exponent part ('e' or 'E'), followed by an optional sign and at least one digit  
For example, `"2"`, `"0089"`, `"-0.1"`, `"+3.14"`, `"4."`, `".9"`, and `"2e10"` are all valid numbers.  
Invalid numbers include `"abc"`, `"1a"`, `"1e"`, and `"e3"`.

### Examples  

**Example 1:**  
Input: `s = "0"`  
Output: `True`  
Explanation: The string is a simple integer.

**Example 2:**  
Input: `s = " 0.1 "`  
Output: `True`  
Explanation: Spaces are allowed before/after. The number has a digit before and after a decimal point.

**Example 3:**  
Input: `s = "e9"`  
Output: `False`  
Explanation: Starts with 'e' but no number before it.

**Example 4:**  
Input: `s = "3.5e+2"`  
Output: `True`  
Explanation: Contains a decimal part, followed by an exponent and sign, and all rules satisfied.

**Example 5:**  
Input: `s = "1e"`  
Output: `False`  
Explanation: No digits after the exponent.

### Thought Process (as if you’re the interviewee)  
To solve this, I’d first identify and handle each valid component:
- Skip leading/trailing whitespace.
- Optionally handle sign at the start or after 'e'/'E'.
- Track digits and '.' (allowing at most one '.' before any 'e'/'E').
- If there's an exponent ('e'/'E'), ensure there’s at least one digit before it, and strictly digits (with optional sign) after it.
I’d parse the string in one pass, keeping track of:
- If we've seen any digits before the exponent.
- If a decimal point or exponent sign has occurred (each at most once, and with ordering constraints).
- If at least one valid digit present before and after exponent if exponent is used.
Regex can solve this, but in interviews it's better to show explicit parsing logic, demonstrating careful handling of edge cases.

### Corner cases to consider  
- Input is just a sign, e.g. `"+"`, `"-"`
- Input is just an exponent, e.g. `"e"`, `"E"`, `"e3"`
- Decimals without digits, e.g. `"."`
- Exponent with no digits after, e.g. `"1e"`, `"1e+"`, `"1e-"`
- Multiple decimal points, e.g. `"1.2.3"`
- Multiple exponents, e.g. `"1e2e3"`
- Incorrect chars, e.g. `" 6e-1f"`, `".e1"`
- Spaces within, e.g. `"2 2"`

### Solution

```python
def isNumber(s: str) -> bool:
    # Remove leading/trailing spaces
    s = s.strip()
    if not s:
        return False

    n = len(s)
    i = 0

    # Flags for tracking number's components
    seen_digit = False
    seen_dot = False
    seen_exp = False

    while i < n:
        char = s[i]

        if char.isdigit():
            seen_digit = True

        elif char in ('+', '-'):
            # Sign is valid only at start or just after 'e'/'E'
            if i > 0 and s[i-1].lower() != 'e':
                return False

        elif char == '.':
            # '.' valid only if not seen before and no 'e'/'E' yet
            if seen_dot or seen_exp:
                return False
            seen_dot = True

        elif char in ('e', 'E'):
            # 'e'/'E' valid only if no previous 'e'/'E' and must follow digit
            if seen_exp or not seen_digit:
                return False
            seen_exp = True
            seen_digit = False   # Require digit after e/E

        else:
            # Invalid character
            return False

        i += 1

    # Must see at least one digit (after 'e' if present)
    return seen_digit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan the string once, handling each character individually.
- **Space Complexity:** O(1) — We use only a constant number of variables for tracking state.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you extend this to allow hexadecimal, binary, or octal formats?
  *Hint: Think about prefixed notations like '0x', '0b', '0o' and update the digit recognition logic.*

- What if whitespaces are allowed inside the number?
  *Hint: Would breaking at first invalid char be enough, or would you allow internal grouping separators?*

- Can you write this without using extra variables/flags, or with a finite state automaton?
  *Hint: Model the parsing as explicit states and transitions.*

### Summary
This problem uses the **parsing pattern** to validate number syntax, with careful state-tracking for decimal points, exponents, and digit requirements. It's a classic for string parsing and is seen in input validation or lightweight interpreters. The main challenge lies in proper handling of all corner cases and not allowing forbidden sequences.


### Flashcard
Parse the string, handling optional sign, digits, decimal, and exponent, ensuring valid format for each component.

### Tags
String(#string)

### Similar Problems
- String to Integer (atoi)(string-to-integer-atoi) (Medium)