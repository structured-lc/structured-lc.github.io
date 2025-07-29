### Leetcode 9 (Easy): Palindrome Number [Practice](https://leetcode.com/problems/palindrome-number)

### Description  
Given an integer, determine if it is a **palindrome**.  
A palindrome number reads **the same forward and backward**, like 121 or 1221.  
Negative numbers are not palindrome numbers (since the minus sign only appears on the left).  
For example, 121 → True, 123 → False, -121 → False.

### Examples  

**Example 1:**  
Input: `x = 121`  
Output: `True`  
*Explanation: 121 reads the same forwards and backwards.*

**Example 2:**  
Input: `x = -121`  
Output: `False`  
*Explanation: Negative sign is only on the left; reading backward gives 121-, which is not a valid number, so return False.*

**Example 3:**  
Input: `x = 10`  
Output: `False`  
*Explanation: Reversed, it's 01 (not equal to 10; also leading zeros not allowed in normal notation).*

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- The naive way is to **convert the integer to a string** and check if this string is the same forwards and backwards (string reversal).  
- Downside: relies on extra space for the string representation and may be forbidden in some interviews.

Optimized, without converting to string:  
- Revert the integer *digit by digit* and compare with the original number.  
- To avoid integer overflow and save space, **reverse only half the number**:
  - For an input x, build the reversed value y:  
    - In each loop, pop the *last digit* from x and push to y.
    - Stop when y ≥ x (we’ve reversed half).
- For even-length numbers, x == y at the end.
- For odd-length numbers, we ignore the middle digit: x == y // 10.
- Check negative numbers or numbers ending in 0 (excluding 0 itself): These can never be palindromes.

**Tradeoffs:**  
- Avoids string conversion and extra space.
- No risk of overflow since only half the number is reversed.

### Corner cases to consider  
- **Negative numbers**: always return False.
- **Numbers ending with 0** (but not 0): not palindromes (e.g., 10).
- **Single-digit numbers**: always a palindrome.
- **Leading zeros** after reversal: not allowed, so those numbers (e.g., 100) are not palindromes.
- **0 itself**: is a palindrome.

### Solution

```python
def isPalindrome(x: int) -> bool:
    # Negative numbers and numbers ending with 0 (but not 0) cannot be palindromes
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    reversed_half = 0
    # Reverse the last half of the number
    while x > reversed_half:
        digit = x % 10
        reversed_half = reversed_half * 10 + digit
        x //= 10

    # For even length: x == reversed_half
    # For odd length: x == reversed_half // 10 (ignore the middle digit)
    return x == reversed_half or x == reversed_half // 10
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀n)  
  - We reverse *half* of the digits of n. Each division by 10 removes a digit.
- **Space Complexity:** O(1)  
  - Only a few variables—no extra storage proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the logic change if you were not allowed to use any extra space at all (not even variables for half-reversal)?  
  *Hint: Think about manipulating digits in-place or working with math.*

- What if you needed to check for palindrome in a string or linked list?  
  *Hint: Two-pointer technique for string, slow/fast pointers for linked list.*

- Can you solve this for numbers in a different base (like binary)?  
  *Hint: Extract digits in base-k and compare.*

### Summary
This problem uses the **reverse half approach**, a common coding pattern that efficiently avoids unnecessary space and overflow by comparing digits from both ends. It is a variation of the two-pointer and number-manipulation techniques found in palindrome problems (strings, arrays, linked lists). This approach is efficient and broadly applicable to palindromic checks across data types, especially when extra space is to be minimized.