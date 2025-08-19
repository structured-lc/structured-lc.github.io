### Leetcode 709 (Easy): To Lower Case [Practice](https://leetcode.com/problems/to-lower-case)

### Description  
Given a string, convert all uppercase English letters in the string to their lowercase form and return the resulting string. The string may contain letters, numbers, and other characters, but only uppercase English letters (‘A’-‘Z’) need to be converted. All other characters should remain unchanged.  
For example, if the input is `"Hello123"`, it should return `"hello123"`.

### Examples  

**Example 1:**  
Input: `"Hello"`  
Output: `"hello"`  
*Explanation: Each uppercase letter ('H') is converted to its lowercase. Other lowercase letters remain unchanged.*

**Example 2:**  
Input: `"here"`  
Output: `"here"`  
*Explanation: All letters are already lowercase. No conversion needed.*

**Example 3:**  
Input: `"LOVELY"`  
Output: `"lovely"`  
*Explanation: Each uppercase letter ('L', 'O', 'V', 'E', 'L', 'Y') is converted to lowercase.*

### Thought Process (as if you’re the interviewee)  
Start by noting that each uppercase English letter has an ASCII value from 65 ('A') to 90 ('Z'). Each lowercase letter is exactly 32 greater in ASCII value than its uppercase counterpart (‘a’ is 97).  
- **Brute-force:** Iterate through each character in the string.  
  - If it's an uppercase letter (between 'A' and 'Z'), convert it to lowercase by adding 32 to its ASCII/ordinal value.  
  - Otherwise, keep the character as is.  
- **Optimization:** The brute-force method is efficient (\(O(n)\) time, one pass). Using built-in methods like `.lower()` would be fastest but is often not allowed in interviews, so manual implementation is preferred. This method is simple and handles any string.  
- **Trade-offs:**  
  - Manual implementation avoids hidden library details.
  - Time and space are both \(O(n)\), minimal and linear to input size.

### Corner cases to consider  
- Empty string (`""`)  
- String with numbers or symbols only (e.g. `"12345!@#"`)  
- String with mix of cases, e.g. `"AbC123!"`  
- String with all lowercase (should remain unchanged)  
- String with all uppercase  
- String with no alphabetical characters

### Solution

```python
def to_lower_case(s: str) -> str:
    # Create an empty result string
    result = ""
    for c in s:
        # Get ASCII value of the character
        n = ord(c)
        # If the character is uppercase ('A'=65 to 'Z'=90)
        if 65 <= n <= 90:
            # Convert to lowercase by adding 32
            result += chr(n + 32)
        else:
            # Keep the character as is
            result += c
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n): We iterate over each character of the input string exactly once, performing constant-time operations per character.
- **Space Complexity:**  
  - O(n): We construct a new string of the same length as input, so space usage is proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input contains unicode or non-English letters?  
  *Hint: How does ASCII/ordinal conversion work for accented or extended characters?*

- How would you change the code to convert only the first character to lowercase (like `.capitalize()`) rather than the entire string?  
  *Hint: Consider how to check and convert just the first character and concatenate the remainder.*

- Can you explain how you could generalize this logic to convert to uppercase instead?  
  *Hint: What are the ASCII ranges for lowercase letters? What offset is needed?*

### Summary  
This problem demonstrates a classic **string iteration and transformation** pattern where each character is examined and selectively modified. It reinforces understanding of **character encoding (ASCII)** and efficient in-place conversion tricks. The pattern is broadly applicable to string sanitation, validation, or normalization problems, and forms a baseline for implementing methods typically handled by standard libraries.

### Tags
String(#string)

### Similar Problems
- Capitalize the Title(capitalize-the-title) (Easy)