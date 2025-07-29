### Leetcode 2520 (Easy): Count the Digits That Divide a Number [Practice](https://leetcode.com/problems/count-the-digits-that-divide-a-number)

### Description  
Given an integer `num`, count how many digits within `num` can divide `num` evenly (where division leaves zero remainder). For each digit `d` of `num`, if `num % d == 0`, then `d` divides `num`. All digits in `num` are guaranteed to be nonzero — you never have to worry about dividing by zero.

### Examples  

**Example 1:**  
Input: `num = 7`  
Output: `1`  
*Explanation: The only digit is 7. 7 % 7 = 0, so the answer is 1.*

**Example 2:**  
Input: `num = 121`  
Output: `2`  
*Explanation: The digits are 1, 2, and 1.  
For the first 1: 121 % 1 = 0  
For 2: 121 % 2 = 1 (not divisible)  
For the second 1: 121 % 1 = 0  
So two digits divide 121. Output is 2.*

**Example 3:**  
Input: `num = 1248`  
Output: `4`  
*Explanation: Digits are 1, 2, 4, 8.  
1248 % 1 = 0  
1248 % 2 = 0  
1248 % 4 = 0  
1248 % 8 = 0  
All digits divide 1248. Output is 4.*

### Thought Process (as if you’re the interviewee)  
To solve this:  
- I need to look at each digit in the number, one at a time.  
- For every digit, check if `num % digit == 0`. If true, increment a counter.  
- I should skip any zero digits, but the problem guarantees there are none.  
- I can extract digits either by converting the number to a string (easy and readable), or by repeated division/modulo by 10 (avoids string conversion).  
- Since numbers are small (no constraints on huge input), both methods will be efficient. I’ll choose the arithmetic way to avoid "Python string shortcuts," as in a real interview.

### Corner cases to consider  
- Single-digit input (e.g., 9)  
- Numbers with repeated digits (e.g., 111, 222)  
- Numbers where one or more digits do not divide `num`  
- Digits that are 1 (always divide any num)  
- All digits are the same  
- Very large input (as an int, not exceeding system int bounds)

### Solution

```python
def countDigits(num: int) -> int:
    orig = num
    count = 0
    while num > 0:
        digit = num % 10
        if orig % digit == 0:
            count += 1
        num //= 10
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀n), where n = input number. We process each digit once (number of digits is ⌊log₁₀(num)⌋ + 1).
- **Space Complexity:** O(1), since only a few integer variables are used (no extra array or recursion).

### Potential follow-up questions (as if you’re the interviewer)  

- What if digits could be zero?
  *Hint: You'd need to explicitly skip division by zero when iterating.*

- How would you solve this if the input was given as a string?
  *Hint: Loop through each character, convert to int, check divisibility.*

- Can you return the actual digits (not just the count) that divide the number?
  *Hint: Accumulate divisible digits into a list before returning.*

### Summary
This problem uses the “digit by digit scan” pattern — iterate through all the digits of a number and check a simple condition. The main coding pattern is extracting and examining each digit using arithmetic. This arises often in digit-based math problems, such as reversing numbers or finding palindromic numbers. Recognizing cases where you shouldn’t divide by zero is common and often tested as an interview pitfall.