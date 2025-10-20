### Leetcode 8 (Medium): String to Integer (atoi) [Practice](https://leetcode.com/problems/string-to-integer-atoi)

### Description  
Given a string, implement a function to convert it into a 32-bit signed integer, closely mimicking the behavior of the C/C++ `atoi` function.  
- The function should:  
  - **Skip all leading whitespace**.
  - **Check if the next character is '+' or '-'** to determine the sign (default positive if absent).
  - **Read digits until a non-digit is found or the end of the string is reached**.
  - Ignore all characters after the digits.
  - **Return 0 if no digits are found** after optional sign processing.
  - If the resulting integer overflows a 32-bit signed integer, **return the closest boundary value** (`-2,147,483,648` or `2,147,483,647`) instead.

### Examples  

**Example 1:**  
Input: `"42"`  
Output: `42`  
*Explanation: Leading whitespaces: none. No sign (assume positive). Parse digits "42".*

**Example 2:**  
Input: `"   -42"`  
Output: `-42`  
*Explanation: Skip whitespaces. Read '-' (negative). Parse "42" as digits. Return -42.*

**Example 3:**  
Input: `"4193 with words"`  
Output: `4193`  
*Explanation: Parse "4193" as digits up to first non-digit (' '), ignore the rest.*

**Example 4:**  
Input: `"words and 987"`  
Output: `0`  
*Explanation: First non-whitespace character is not a digit/sign ⇒ return 0.*

**Example 5:**  
Input: `"-91283472332"`  
Output: `-2147483648`  
*Explanation: Result is less than -2,147,483,648, so clamp to lower bound.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify the requirements:
- Ignore leading whitespace.
- Handle optional sign.
- Parse contiguous digits only.
- Stop at first non-digit, ignore everything after.
- Handle overflow by clamping.

**Brute-force approach:**  
- Try converting the entire string using Python’s int or with regex.
- But: Not allowed—must mimic behavior explicitly, step by step, and not use libraries or shortcuts.

**Optimized, step-by-step approach:**
1. Use a pointer/index to traverse the string.
2. Skip leading spaces.
3. If next char is ‘+’/‘-’, set a sign variable.
4. Parse digits, updating a number variable as we go.
5. At each step, check for overflow by comparing before adding the digit.
6. Stop on first non-digit after processing digits.

This approach is easy to follow during interviews, handles all corner cases, and is efficient.

### Corner cases to consider  
- Empty string or only spaces → return 0
- Only ‘+’ or only ‘-’ → return 0
- Multiple signs (e.g. "+-12") → return 0 (invalid)
- String with digits mixed after characters → ignore after first non-digit (e.g. “12abc34” → 12)
- Leading zeroes (e.g. "00000123") → treat as 123
- Overflow or underflow cases, like "9223372036854775808" → clamp to upper bound 2,147,483,647
- String with whitespace after sign/digits (e.g. "   -42  ") → ignore everything after digits
- No digits present at all (e.g. "--", "+a") → return 0

### Solution

```python
def myAtoi(s: str) -> int:
    INT_MAX = 2_147_483_647
    INT_MIN = -2_147_483_648

    n = len(s)
    i = 0

    # 1. Skip leading whitespaces
    while i < n and s[i] == ' ':
        i += 1

    # 2. Handle optional sign
    sign = 1
    if i < n and (s[i] == '+' or s[i] == '-'):
        if s[i] == '-':
            sign = -1
        i += 1

    # 3. Read digits and build result
    num = 0
    while i < n and s[i].isdigit():
        digit = int(s[i])
        # 4. Check for overflow/underflow before multiplication/addition
        if num > (INT_MAX - digit) // 10:
            return INT_MAX if sign == 1 else INT_MIN
        num = num * 10 + digit
        i += 1

    return sign * num
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is processed at most once.
- **Space Complexity:** O(1), since only a constant number of variables is used (ignores input size, no extra storage or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- (How would you handle input in different numeral systems, such as hexadecimal or binary?)  
  *Hint: Think about prefix detection and appropriate digit set.*

- (Can you support floating-point numbers in a similar conversion function?)  
  *Hint: Consider handling decimal points and possible exponential notation.*

- (How would you make this solution support arbitrarily large integers?)  
  *Hint: Remove the clamping—Python int supports arbitrary precision.*

### Summary
This problem uses the **state machine/scanning pattern**, processing input step-by-step and handling conditions as encountered, a common approach for parser-like problems. The code is structured to handle edge conditions and overflow efficiently, with only constant extra space. This pattern is often seen in implementing custom parsers, language interpreters, or data ingress pipelines where strict input validation is required.


### Flashcard
Parse the string step by step: skip whitespace, handle sign, read digits, and clamp to 32-bit integer bounds if overflow.

### Tags
String(#string)

### Similar Problems
- Reverse Integer(reverse-integer) (Medium)
- Valid Number(valid-number) (Hard)
- Check if Numbers Are Ascending in a Sentence(check-if-numbers-are-ascending-in-a-sentence) (Easy)