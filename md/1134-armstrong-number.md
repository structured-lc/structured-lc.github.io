### Leetcode 1134 (Easy): Armstrong Number [Practice](https://leetcode.com/problems/armstrong-number)

### Description  
Given a positive integer n, determine if it is an **Armstrong number**. A number is called an Armstrong number if it is a k-digit number and, when you take each digit to the k-th power and sum these values, you get the original number n.  
For example, for n = 153 (which has 3 digits), we check if 1³ + 5³ + 3³ == 153.

### Examples  

**Example 1:**  
Input: `153`  
Output: `True`  
*Explanation: 153 is a 3-digit number. 1³ + 5³ + 3³ = 1 + 125 + 27 = 153, which equals the original number.*

**Example 2:**  
Input: `123`  
Output: `False`  
*Explanation: 123 is a 3-digit number. 1³ + 2³ + 3³ = 1 + 8 + 27 = 36, which does NOT equal 123.*

**Example 3:**  
Input: `370`  
Output: `True`  
*Explanation: 370 is a 3-digit number. 3³ + 7³ + 0³ = 27 + 343 + 0 = 370.*

### Thought Process (as if you’re the interviewee)  
To determine if n is an Armstrong number:
- First, count the number of digits (k) in n.  
- For each digit, calculate digitᵏ and sum up these values.  
- If the sum matches the original number, it is an Armstrong number.

**Brute-force approach:**  
- Convert the number to a string to iterate digit by digit.
- For each digit, raise it to the power of the total number of digits.
- Sum all these powered digits.
- Compare the sum to the original number.

This approach is straightforward and acceptable for the given constraints (n can go up to 10⁸).  
**Trade-offs:**  
- Converting to a string simplifies digit counting and processing, though this could be done mathematically with division and modulus as well.  
- Time and space are efficient because the number of digits is small.

### Corner cases to consider  
- n is a single digit (0–9): Should always return True, since digit¹ = digit.
- n = 0: By definition, 0¹ = 0, so should return True.
- Leading zeros: Not possible for integers but worth mentioning in theory.
- Very large k (edge of constraints, e.g., 99999999).
- Non-Armstrong numbers just above or below Armstrong numbers (testing off-by-one logic).

### Solution

```python
def isArmstrong(n: int) -> bool:
    # Convert n to string to easily extract digits and determine k
    digits = str(n)
    k = len(digits)
    # Compute the sum of each digit raised to the k-th power
    total = 0
    for c in digits:
        total += int(c) ** k
    # If the sum equals n, it's an Armstrong number
    return total == n
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k is the number of digits in n (since we process each digit exactly once).
- **Space Complexity:** O(1) extra space if not counting string conversion; O(k) for the string representation of n (k is at most 8 for constraint n < 10⁸).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you check if there are any Armstrong numbers in a given range [a, b]?
  *Hint: Loop from a to b and apply the Armstrong check for each number.*

- Optimize your solution to work without converting the integer to a string.
  *Hint: Use modulus (n % 10) to extract last digit and integer division (n // 10) to process the number.*

- How would you generalize this to different numerical bases (e.g., base 8)?
  *Hint: Compute digits in the target base and raise each to appropriate power.*

### Summary
This problem applies the **digit-manipulation** pattern, a simple but classic check using basic loops and exponentiation. The same approach can be used for problems involving digit properties (e.g., palindromic numbers, special numbers, base conversions) and is a good exercise for integer processing and modular arithmetic.


### Flashcard
Sum digitᵏ for all digits in n (where k is number of digits); if sum equals n, it’s an Armstrong number.

### Tags
Math(#math)

### Similar Problems
