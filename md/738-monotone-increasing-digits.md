### Leetcode 738 (Medium): Monotone Increasing Digits [Practice](https://leetcode.com/problems/monotone-increasing-digits)

### Description  
Given an integer `n`, find the **largest number less than or equal to `n` whose digits are in non-decreasing order** (each digit is less than or equal to the digit to its right). For example, for n=332, the answer would be 299 because 299 ≤ 332, and its digits never decrease from left to right. The challenge is to modify `n` (possibly by changing digits) to make the number as big as possible, with this property maintained.

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `9`  
*Explanation: 10 is not monotone increasing (1 > 0). Changing to 9 is the largest possible value less than or equal to 10 with increasing digits (just one digit).*

**Example 2:**  
Input: `n = 1234`  
Output: `1234`  
*Explanation: Every digit is ≤ the next: 1 ≤ 2 ≤ 3 ≤ 4, so 1234 is already monotone increasing.*

**Example 3:**  
Input: `n = 332`  
Output: `299`  
*Explanation: 332 is not monotone increasing at index 1 (3 > 2). If you lower the leftmost 3 by 1 (to 2) and set the digits to its right to 9, you get 299, which is the largest monotone increasing number ≤ 332.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try every number from n down to 0, return the first that is monotone increasing. This is very inefficient — O(n) time.
- **Greedy/optimized approach:**  
  - Convert the number to a string (or list of digits) for easy manipulation.
  - Scan the number from left to right until the monotone property is violated (i.e., digit[i] > digit[i+1]).
  - Once found:
    - Decrease digit[i] by 1.
    - Set all digits after position i to '9' to make the remaining number as large as possible.
    - However, changing digit[i] may create a new violation to the left (e.g., if changing a 3 to a 2 makes the previous digit now larger than 2). So, continue moving left and fixing any violations, each time decreasing the violating digit and setting all digits to its right to '9'.
  - Finally, convert back to integer and return.
- **Trade-offs:**  
  - Time: Much faster than brute-force; processes each digit at most twice.
  - Code is a bit more complex, but direct and optimal for interview performance.

### Corner cases to consider  
- Input is 0.
- Numbers already monotone (e.g. 111, 13579).
- Numbers with repeated digits (e.g. 332, 3343).
- Numbers with a violation at the leftmost digit (e.g. 210).
- Numbers with a violation late in the number (e.g. 12344321).
- Numbers with all digits 9 (e.g. 9, 99, 999).

### Solution

```python
def monotoneIncreasingDigits(n: int) -> int:
    digits = list(str(n))
    marker = len(digits)
    
    # Move left to right, look for first violation
    for i in range(len(digits) - 1, 0, -1):
        if digits[i] < digits[i - 1]:
            digits[i - 1] = str(int(digits[i - 1]) - 1)
            marker = i  # mark the position after which all become '9'
    
    # Set all digits to the right of the marker to '9'
    for i in range(marker, len(digits)):
        digits[i] = '9'
    
    return int(''.join(digits))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d), where d is the number of digits in n. Each digit is processed at most twice: once for scanning violations, and once for setting 9's.
- **Space Complexity:** O(d), extra space for storing digits as a list (excluding output conversion). No recursion or deep stacks are involved.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return not just the value, but also the *digits* modified, or lowest number above n with monotone increasing digits?  
  *Hint: Think about extending the logic to either minimize or increase the number.*

- How would this work if the input number is given as a linked list of digits?  
  *Hint: You'll need to manipulate pointers and possibly reverse-reflect your left-to-right logic.*

- Can you solve this without converting the number to a string/list (purely mathematical operations)?  
  *Hint: Think about place values, extracting and updating digits.*

### Summary
This problem uses the **greedy** and **digit manipulation** pattern. It’s a classic example of scanning from right-to-left to fix violations in a number-like structure, and replacing subsequent parts with maximal/minimal values to form a desired monotonic sequence. This logic appears in a variety of digit-based optimization and integer transformation questions, such as serializing numbers with constraints or optimizing outputs in combinatorial digit settings.


### Flashcard
Convert to digits, scan left to right for first violation (digit[i] > digit[i+1]); decrement digit[i] and set all following digits to 9.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
- Remove K Digits(remove-k-digits) (Medium)