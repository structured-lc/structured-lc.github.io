### Leetcode 7 (Medium): Reverse Integer [Practice](https://leetcode.com/problems/reverse-integer)

### Description  
Given a signed 32-bit integer `x`, reverse its digits and return the reversed integer. If reversing `x` causes the value to go outside the signed 32-bit integer range (−2,147,483,648 to 2,147,483,647), then return 0. Assume the environment does not allow storing 64-bit integers.

Essentially, extract each digit from the right, build the reversed number, and check for overflow before adding each new digit.

### Examples  

**Example 1:**  
Input: `123`  
Output: `321`  
*Explanation: Remove and append 3, then 2, then 1: 321*

**Example 2:**  
Input: `-456`  
Output: `-654`  
*Explanation: Remove and append 6, then 5, then 4. The sign stays negative: -654*

**Example 3:**  
Input: `1534236469`  
Output: `0`  
*Explanation: Reversing this causes overflow (becomes 9646324351), which is greater than 2,147,483,647 → return 0*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Convert the number to a string, reverse it (handling the sign), and convert back.  
    - *Issue:* Using string functions is usually discouraged in interviews; also, still need to handle overflow case.
- **Optimal idea:**  
    - Process digit by digit using modulus and integer division.
    - Prepare the result by `res = res × 10 + digit` as we extract each digit.
    - Before every append, check if this will cause overflow by comparing to 2,147,483,647 (for positive) and −2,147,483,648 (for negative) ahead of time.
    - If overflow will occur, return 0 right away.
    - Keep handling the original sign for negative numbers.
- *Why this approach:*  
  - Efficient, avoids string conversion, always O(log₁₀n).
  - Checking for overflow before every operation is necessary because Python doesn't overflow, but C++/Java do.

### Corner cases to consider  
- x is zero (output should be zero)
- x is negative (must keep the sign)
- x ends with zeros, e.g., 1200 → 21 (no leading zeroes in the result)
- x is already a palindrome (e.g., 121 → 121)
- x is at the 32-bit integer boundary (overflow)
- x is a single digit (output is the same number)

### Solution

```python
def reverse(x: int) -> int:
    res = 0
    negative = x < 0
    x = abs(x)
    INT_MAX = 2_147_483_647
    INT_MIN = -2_147_483_648

    while x != 0:
        digit = x % 10
        x = x // 10

        # Check for overflow before multiplying by 10 and adding digit
        if (not negative and (res > INT_MAX // 10 or (res == INT_MAX // 10 and digit > 7))):
            return 0
        if (negative and (res > abs(INT_MIN) // 10 or (res == abs(INT_MIN) // 10 and digit > 8))):
            return 0

        res = res * 10 + digit

    return -res if negative else res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀n), since we process each digit of the integer exactly once as we divide by 10 at each step.
- **Space Complexity:** O(1), only a few integer variables are used; no additional storage dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to handle arbitrary-precision integers?  
  *Hint: You wouldn’t need to check for overflow, but code logic remains.*

- Can you avoid using string conversion completely for all problems like this?  
  *Hint: Modulus and division can handle digit extraction just as effectively.*

- How would this work in a language without an explicit overflow return (e.g., Python)?  
  *Hint: Must manually check if result exceeds 32-bit integer range before returning.*

### Summary
This problem is a classic example of **digit manipulation and overflow checking** for integer problems. The approach is common and also applies to problems like integer palindrome checks. The main patterns are “process one digit at a time from right to left using modulus/division,” and “preemptively check for overflows before updating the result.” This strategy appears frequently in interview problems that require you to simulate number operations digit by digit.

### Tags
Math(#math)

### Similar Problems
- String to Integer (atoi)(string-to-integer-atoi) (Medium)
- Reverse Bits(reverse-bits) (Easy)
- A Number After a Double Reversal(a-number-after-a-double-reversal) (Easy)
- Count Number of Distinct Integers After Reverse Operations(count-number-of-distinct-integers-after-reverse-operations) (Medium)