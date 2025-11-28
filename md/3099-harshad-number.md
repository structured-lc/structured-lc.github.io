### Leetcode 3099 (Easy): Harshad Number [Practice](https://leetcode.com/problems/harshad-number)

### Description  
A **Harshad number** (also called a **Niven number**) is a positive integer that is divisible by the sum of its digits. Given a positive integer \( x \), return `True` if it is a Harshad number; otherwise, return `False`.

You must calculate the sum of the digits of \( x \) and check if \( x \) divided by this sum leaves no remainder.

### Examples  

**Example 1:**  
Input: `x = 18`  
Output: `True`  
*Explanation: The sum of digits is 1 + 8 = 9. 18 is divisible by 9 (18 ÷ 9 = 2), so it's a Harshad number.*

**Example 2:**  
Input: `x = 19`  
Output: `False`  
*Explanation: The sum of digits is 1 + 9 = 10. 19 is not divisible by 10, so it's not a Harshad number.*

**Example 3:**  
Input: `x = 21`  
Output: `True`  
*Explanation: The sum of digits is 2 + 1 = 3. 21 ÷ 3 = 7, so it's a Harshad number.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Extract each digit from the input number by repeatedly using modulus (`%`) and integer division (`//`).  
  - Add the extracted digits to get the sum of the digits.  
  - Check if the original number is divisible by this sum (number % digit_sum == 0).

- There are no expensive operations or optimizations required as the number of digits in any integer is at most log₁₀n, and summing the digits is an O(log₁₀n) operation.

- **Edge cases** are straightforward (single-digit numbers always return true).

- This single-pass digit summation is optimal and simple.

### Corner cases to consider  
- Input is a single digit (e.g. 5)  
- Input is a large number (to make sure the solution scales well to multiple digits)  
- The sum of digits is 0 (not possible for positive integers, but should be mentioned)  
- The input contains leading zeros (not possible for integers, but important for string inputs, not applicable here)  
- x = 10, 12, etc. (check divisibility carefully)  
- Input is exactly divisible by the digit sum but is a prime number or composite (divisibility only by digit sum matters here)

### Solution

```python
def isHarshad(x: int) -> bool:
    # Initialize digit sum to 0
    digit_sum = 0
    n = x
    
    # Calculate sum of digits
    while n > 0:
        digit_sum += n % 10
        n //= 10
        
    # Check if x is divisible by its digit sum
    return x % digit_sum == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(log₁₀x), where x is the input integer. The loop runs once per digit in x.
- **Space Complexity:**  
  - O(1): Only a constant number of integer variables (`digit_sum`, `n`) are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to find all Harshad numbers in a range [1, n]?  
  *Hint: Check each number in the range using the same divisibility property.*

- What if the number is given as a string to support very large inputs?  
  *Hint: Iterate through the string, sum digit characters, and cast as needed.*

- Can you generalize this for other number systems (bases)?  
  *Hint: The approach works for any base by summing the digits as represented in that base.*

### Summary
This problem fits the "Digit Manipulation" pattern—extracting and processing digits using arithmetic operators and basic loops. The method is efficient and concise, with applications in digital root calculations, checksum algorithms, and divisibility checks. Recognizing problems that require extracting or processing digits directly leads to straightforward solutions using these simple loops.


### Flashcard
Extract digits via modulo and division; sum them; check if original number is divisible by digit sum (Harshad condition).

### Tags
Math(#math)

### Similar Problems
