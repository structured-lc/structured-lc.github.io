### Leetcode 1281 (Easy): Subtract the Product and Sum of Digits of an Integer [Practice](https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer)

### Description  
Given an integer n, return the result of subtracting the sum of its digits from the product of its digits: result = (product of digits) − (sum of digits).

### Examples  
**Example 1:**  
Input: `n = 234`  
Output: `15`  
*Explanation: 2×3×4 = 24, 2+3+4 = 9, 24−9 = 15.*

**Example 2:**  
Input: `n = 4421`  
Output: `21`  
*Explanation: 4×4×2×1 = 32, 4+4+2+1 = 11, 32−11 = 21.*

**Example 3:**  
Input: `n = 5`  
Output: `0`  
*Explanation: 5×1 = 5, 5 = 5, so 5−5 = 0.*


### Thought Process (as if you’re the interviewee)  
The brute-force solution is to extract all digits one by one, multiply them for the product and add them for the sum, then return product−sum. An optimized solution uses simple digit extraction with integer modulo and division since n can be split into digits easily.

Python note: Use integer arithmetic, do not use shortcuts like str(), as per interview style.


### Corner cases to consider  
- n is a single digit.
- n contains zeros (product might become zero).
- n near limit values (check for overflow or negative numbers if allowed; assume n ≥ 0 for LeetCode).


### Solution

```python
def subtract_product_and_sum(n):
    result_sum = 0
    result_product = 1
    while n > 0:
        digit = n % 10
        result_sum += digit
        result_product *= digit
        n //= 10
    return result_product - result_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d), where d is the number of digits in n.
- **Space Complexity:** O(1); only a few integer variables used.


### Potential follow-up questions (as if you’re the interviewer)  

- How would this work for negative numbers?
  *Hint: Take abs(n) or handle sign separately.*
- What if n could include very large numbers (as a string)?
  *Hint: Work digit-by-digit from string without casting to int.*
- Can you do the same with recursion?
  *Hint: Write a recursive helper for digit extraction.*

### Summary
This is a direct arithmetic digit processing problem. The coding pattern is common for problems requiring manual digit extraction (mod 10 and div by 10), useful anywhere you can't use high-level string methods or are working with numeric-only representations.

### Tags
Math(#math)

### Similar Problems
