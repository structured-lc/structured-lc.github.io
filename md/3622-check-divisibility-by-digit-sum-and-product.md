### Leetcode 3622 (Easy): Check Divisibility by Digit Sum and Product [Practice](https://leetcode.com/problems/check-divisibility-by-digit-sum-and-product)

### Description  
Given a positive integer n, determine whether n is divisible by the sum of its digits plus the product of its digits.  
In other words, calculate S = sum of digits of n, P = product of digits of n, and return true if n mod (S + P) == 0; otherwise, return false.

### Examples  

**Example 1:**  
Input: `n = 99`  
Output: `true`  
*Explanation: Digits are 9 and 9. Sum = 9 + 9 = 18, Product = 9 × 9 = 81, S + P = 99. 99 mod 99 = 0 → true.*

**Example 2:**  
Input: `n = 23`  
Output: `false`  
*Explanation: Digits are 2 and 3. Sum = 2 + 3 = 5, Product = 2 × 3 = 6, S + P = 11. 23 mod 11 = 1 → false.*

**Example 3:**  
Input: `n = 101`  
Output: `false`  
*Explanation: Digits are 1, 0, 1. Sum = 1 + 0 + 1 = 2, Product = 1 × 0 × 1 = 0. S + P = 2 + 0 = 2. 101 mod 2 = 1 → false.*

### Thought Process (as if you’re the interviewee)  
First, I want to extract each digit from n, so iteratively dividing and taking remainder by 10 is a natural brute-force approach.  
For every digit, I'll maintain a running total for both the digit sum (S) and product (P).  
Special care is needed if there are zeros among the digits, because the product P will become zero (by multiplication rule) — this is fine per the problem statement.  
Once I have S and P, I compute total = S + P, and finally check if n is divisible by total (n % (S + P) == 0).  
This is an O(d) solution where d is the number of digits, which is highly efficient for n up to 10⁶.  
I see little room for algorithmic optimization since every digit must be inspected; the logic is mostly linear and arithmetic.

### Corner cases to consider  
- n has only one digit (e.g. n = 7 or n = 0)
- There is a zero among the digits (e.g. n = 105)
- n contains all the same digits (e.g. n = 7777)
- S + P equals zero — not possible since n > 0 (sum of digits ≥ 1), so no division by zero possible
- Smallest possible input (n = 1)
- Largest single-digit input (n = 9)
- Product is zero due to zeros in digits (e.g. n = 101)

### Solution

```python
def isDivisibleByDigitSumAndProduct(n: int) -> bool:
    original = n
    digit_sum = 0
    digit_product = 1

    # Extract digits one by one
    temp = n
    while temp > 0:
        digit = temp % 10    # Get last digit
        digit_sum += digit   # Add to sum
        digit_product *= digit  # Multiply into product
        temp //= 10          # Remove last digit

    total = digit_sum + digit_product
    # Check divisibility
    return original % total == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d), where d is the number of digits in n. Each loop iteration processes one digit. For n ≤ 10⁶, d ≤ 6.
- **Space Complexity:** O(1), constant extra space regardless of input size; only a few primitive variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if n can be up to 10¹⁸?  
  *Hint: Would you need to avoid integer overflow for the product or use string processing for very large numbers?*

- How would you handle the case where S + P could be zero (say, if the input was allowed to be zero or negative)?  
  *Hint: What checks would you embed to prevent division/modulus by zero?*

- Could you generalize this to check divisibility by other digit functions (e.g., sum\*product, abs(sum-product))?  
  *Hint: Would the digit extraction pattern still apply? Which mathematical properties change?*

### Summary
We used a standard *digit extraction and aggregation* pattern to solve this problem efficiently.  
This is a common approach for *digit property* problems, such as sum of digits, product of digits, or even palindromic digit checks and is generally applicable wherever we need to analyze numerically significant properties of an integer's digits.