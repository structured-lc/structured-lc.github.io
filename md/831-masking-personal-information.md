### Leetcode 831 (Medium): Masking Personal Information [Practice](https://leetcode.com/problems/masking-personal-information)

### Description  
Given a string representing either an email address or a phone number, mask the personal information following these rules:

- **Email:**  
  - The email has a name and domain: "NAME@DOMAIN".
  - Convert all characters to lowercase.
  - Mask the name or "local" part by keeping only the first and last letter, replacing everything in-between with exactly five asterisks (`*****`).
  - The resulting format: `first_letter*****last_letter@domain` (all lowercase).

- **Phone number:**  
  - Phone numbers may contain between 10–13 digits, with the extra (up to 3) being a "country code". Non-digit characters (such as '+', '-', '(', ')', and spaces) are possible but should be ignored for parsing.
  - Mask all but the last 4 digits.
  - If a country code exists, output `+**-***-***-XXXX` where the number of asterisks equals the country code length; otherwise, output `***-***-XXXX` for numbers with no country code.

### Examples  

**Example 1:**  
Input: `"LeetCode@LeetCode.com"`  
Output: `"l*****e@leetcode.com"`  
*Explanation: "L" and "e" are preserved from the local part, everything else is replaced by five asterisks. All converted to lowercase. "LeetCode.com" becomes "leetcode.com".*

**Example 2:**  
Input: `"AB@qq.com"`  
Output: `"a*****b@qq.com"`  
*Explanation: "A" and "B" are preserved, all else (even if not present) is replaced by five asterisks.*

**Example 3:**  
Input: `"1(234)567-890"`  
Output: `"***-***-7890"`  
*Explanation: Only digits are considered (`1234567890`, 10 digits, so no country code). Only the last four digits are exposed. Output format is "***-***-7890".*

**Example 4:**  
Input: `"+86(10)12345678"`  
Output: `"+**-***-***-5678"`  
*Explanation: Digits are "861012345678" (12 digits; country code is "86", rest is local). Two asterisks for the country code, "***-***-5678" for the local part.*

### Thought Process (as if you’re the interviewee)  
First, I need to identify whether the input is an email or a phone number. I can check for the "@" symbol — if present, it's an email; otherwise, it's a phone number.

**Email:**
- Split around "@". Convert both the local part (before @) and the domain to lowercase.
- Replace everything except the first and last character of the local name with five asterisks, regardless of the local name length (guaranteed to be at least 2 letters).
- Concatenate masked name, "@", and domain.

**Phone number:**
- Strip out all non-digit characters.
- Count digits; the last 10 are always the "local" number, extra digits at the front are the country code (there can be 0 to 3 country code digits).
- Build mask: prepend "+", then correct number of asterisks for the country code (if any), then "-***-***-XXXX" where XXXX are the last 4 digits.

I would avoid using built-in library functions for tasks like masking or string manipulation beyond basic indexing and loops. This keeps the solution close to what is allowed in most interviews.

### Corner cases to consider  
- **Short local name in email:** Even if the local name is just 2 letters, we still mask the middle with five asterisks.
- **Phone numbers with no country code:** Exactly 10 digits.
- **Phone number with varying country code length** (0-3 digits).
- **Input with mixed or upper case letters:** Everything needs to be converted to lowercase.
- **Irregular separation in phone number:** Input like "12 34-5.6(7)8-90" should be cleaned to digits properly.
- **Special symbols, unexpected formatting:** Only digits matter.

### Solution

```python
def maskPII(s: str) -> str:
    # Check if the input is an email address
    if '@' in s:
        # Convert to lowercase, split into local and domain parts
        local, domain = s.split('@')
        local = local.lower()
        domain = domain.lower()
        # Mask all but the first and last letter in the local part with five asterisks
        masked_local = local[0] + '*****' + local[-1]
        return masked_local + '@' + domain

    # Otherwise, it's a phone number
    # Collect only the digits
    digits = [c for c in s if c.isdigit()]
    n = len(digits)
    # Last 10 digits are the local number; the rest is country code
    local = ''.join(digits[-10:])
    country_code_len = n - 10
    # Build the masked phone number
    masked = "***-***-" + local[-4:]
    if country_code_len == 0:
        return masked
    else:
        return "+" + "*" * country_code_len + "-" + masked
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of the input string. We perform a constant number of passes—one to check if it's an email or phone, one to process/mask.
- **Space Complexity:** O(N), for intermediate variables: lowercase strings, digit list, and output string. Every mask is independent of the input, but substringing and list building can take O(N).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle invalid email or phone number formats?
  *Hint: Consider adding validation steps before masking.*

- How would you internationalize (i18n) email or phone masking for other languages/alphabets?
  *Hint: Work with Unicode and locale-specific rules.*

- How would you extend the function to mask multiple types of personal data in a document/string?
  *Hint: Consider generalizing with regular expressions and matching multiple types.*

### Summary
This problem is a **string parsing and manipulation** question, often seen in data sanitization/security domains. The approach—detecting format, normalizing input, and outputting masked result—is a common pattern for anonymizing personal identifiers and can be adapted for masking credit cards, SSNs, etc. The use of indexing and careful string building (no libraries for shortcuts) is directly applicable to similar data transformation and parsing tasks in interviews.

### Tags
String(#string)

### Similar Problems
