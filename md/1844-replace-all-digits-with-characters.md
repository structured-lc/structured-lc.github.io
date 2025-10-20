### Leetcode 1844 (Easy): Replace All Digits with Characters [Practice](https://leetcode.com/problems/replace-all-digits-with-characters)

### Description  
Given a string `s` where characters at even indices (0, 2, 4, ...) are lowercase English letters and at odd indices (1, 3, 5, ...) are digits (0–9), construct a new string by replacing every digit at odd index `i` with the character formed by shifting the letter at the previous index (`i-1`) forward in the alphabet by the value of the digit. The operation never goes past 'z'.

### Examples  

**Example 1:**  
Input: `s = "a1c1e1"`  
Output: `"abcdef"`  
*Explanation: 'a' shifted by 1 → 'b', 'c' shifted by 1 → 'd', 'e' shifted by 1 → 'f'.*

**Example 2:**  
Input: `s = "a1b2"`  
Output: `"abbc"`  
*Explanation: 'a' shifted by 1 → 'b', 'b' shifted by 2 → 'c'.*

**Example 3:**  
Input: `s = "x5y3"`  
Output: `"xcyb"`  
*Explanation: 'x' shifted by 5 → 'c' (since 'x' + 5 = 'c'), 'y' shifted by 3 → 'b'.*

### Thought Process (as if you’re the interviewee)  
Starting out, the brute-force approach is to iterate through the string. For each character:
- If it's at an even index (letter), copy it as is.
- If it's at an odd index (digit), shift the character before it by the digit's value to get the new letter.

This is efficient—one pass (O(n)), with only character arithmetic, no extra data structures required. There's no need to optimize further because the input size is small and the in-place idea already achieves both minimal time and space.

Trade-offs: All approaches that keep the logic single pass and use no extra space except output are optimal here. Using list comprehension can make the implementation more concise, but doesn't change the asymptotic complexity.

### Corner cases to consider  
- Input string of length 1 (e.g. `"a"`): should return `"a"`.
- Digits are always present at odd indices only; input always follows constraints.
- Input without any digits: not possible per constraints.
- Shifting stays within 'z': stated in problem constraints, no wrap-around needed.
- Long input strings: make sure code handles any reasonable length.

### Solution

```python
def replaceDigits(s: str) -> str:
    # Initialize an empty list to store the result characters
    res = []
    
    # Iterate through the string by index and character
    for i, c in enumerate(s):
        if i % 2 == 0:
            # Even index: must be a letter, add as is
            res.append(c)
        else:
            # Odd index: must be a digit
            prev_char = s[i - 1]
            shift = int(c)
            # Shift previous letter by digit value
            shifted = chr(ord(prev_char) + shift)
            res.append(shifted)
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We iterate through all n characters of the string once.
- **Space Complexity:** O(n) — Output list uses space proportional to the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- *What if input violates the format (e.g., digits at even indices)?*  
  Hint: Validate the input by checking index and character type.

- *Can you do it in-place (if extra memory was a concern)?*  
  Hint: In Python, strings are immutable, but with a character array you could.

- *How would you handle uppercase/lowercase or wrap-around situations?*  
  Hint: Adjust shifting logic and modulus for 26 letters, account for ASCII values of 'a' and 'A'.

### Summary
This approach is a simple **string transformation pattern** applied in a single left-to-right pass. It combines type checking (digit/letter) and basic character shifting using ordinal values. The technique is commonly used in problems involving Caesar ciphers, digit-to-character conversions, and in-place string modifications.


### Flashcard
Iterate string, replace even indices with letters, odd indices with shifted letters from previous.

### Tags
String(#string)

### Similar Problems
- Shifting Letters(shifting-letters) (Medium)