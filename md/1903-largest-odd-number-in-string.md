### Leetcode 1903 (Easy): Largest Odd Number in String [Practice](https://leetcode.com/problems/largest-odd-number-in-string)

### Description  
Given a string `num` representing a large non-negative integer (no leading zeros), find and return the **largest-valued odd integer** (as a substring) contained in `num`. An odd integer is defined as one whose last digit is 1, 3, 5, 7, or 9. If there is no such substring, return the empty string `""`.  
A substring here means a contiguous sequence of characters from the original string (including possibly the whole string).

### Examples  

**Example 1:**  
Input: `num = "52"`  
Output: `"5"`  
*Explanation: Substrings: "5", "2", "52". The largest odd integer is "5" (since both "2" and "52" end with an even digit).*

**Example 2:**  
Input: `num = "4206"`  
Output: `""`  
*Explanation: Substrings are "4", "2", "0", "6", "42", etc., but none of them are odd. Hence, return the empty string.*

**Example 3:**  
Input: `num = "35427"`  
Output: `"35427"`  
*Explanation: The entire string is already odd (last digit is 7), so "35427" is the answer.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way would be to check all possible substrings, convert each to an integer, and check if it's odd—but that is unnecessary and inefficient.
- Notice: **Any substring ending anywhere but at an odd digit will be even**, so the largest possible odd-valued substring must end at the rightmost odd digit in the original string.
- Therefore, starting from the end of the string, look for the first odd digit. The substring from index 0 up to (and including) that digit forms the largest odd integer possible as a substring.
- This is efficient (O(n)), simple, and avoids all unneeded work.

### Corner cases to consider  
- If the string is empty, return `""`.
- If there are no odd digits in the string at all, return `""`.
- If the string consists of a single digit that is even, return `""`.
- If the string starts with zeros but includes odd digits (though the problem says no leading zeros).
- If the whole string is already an odd number, it should return the full string.
- If the odd digit is at the first index (e.g., `"5xxxx"`), return just `"5"`.


### Solution

```python
def largestOddNumber(num: str) -> str:
    # Scan the string from right to left
    for i in range(len(num) - 1, -1, -1):
        # Check if the current digit is odd
        if int(num[i]) % 2 == 1:
            # Return substring from start up to and including this digit
            return num[:i + 1]
    # If no odd digit found, return empty string
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We iterate from the right-most character to the left, examining each digit once (where n = len(num)).
- **Space Complexity:** O(1) extra space  
  Only a few variables for the loop; the substring returned only points to part of the input, not duplicating storage. No auxiliary arrays, just a slice of the input string.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input string could have leading zeros?  
  *Hint: How do leading zeros affect integer values or the logic?*

- Can you do this in a streaming fashion (without storing the whole string in memory)?  
  *Hint: Can you keep track of the largest odd-ended prefix as digits are received one by one?*

- How would you generalize this for even values, or for numbers divisible by any other digit?  
  *Hint: Replace the parity check with whatever divisibility criteria you need.*

### Summary
The approach uses **reverse scanning** (right-to-left traversal), a common pattern for problems involving properties determined by trailing digits (such as parity). Greedy logic applies: to maximize the value, keep as many leading digits as possible by stopping at the first odd digit from the end. This pattern is useful for string slicing questions, number manipulation in string-form, and questions involving number properties (odd/even, divisibility, etc.).

### Tags
Math(#math), String(#string), Greedy(#greedy)

### Similar Problems
- Largest 3-Same-Digit Number in String(largest-3-same-digit-number-in-string) (Easy)