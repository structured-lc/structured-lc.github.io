### Leetcode 3622 (Easy): Check Divisibility by Digit Sum and Product [Practice](https://leetcode.com/problems/check-divisibility-by-digit-sum-and-product)

### Description  
Given a positive integer **n**, determine if **n** is divisible by the sum of its digit sum and digit product.  
Let **S** be the sum of the digits of **n** and **P** be the product of the digits of **n**.  
Return `True` if \( n \bmod (S + P) = 0 \), otherwise return `False`.  
The challenge is to extract each digit, compute their sum and product, then check this divisibility.

### Examples  

**Example 1:**  
Input: `n = 99`  
Output: `True`  
*Explanation: The digits are 9 and 9. S = 9+9 = 18, P = 9×9 = 81, S+P = 99. 99 % 99 = 0, so return True.*

**Example 2:**  
Input: `n = 23`  
Output: `False`  
*Explanation: The digits are 2 and 3. S = 2+3 = 5, P = 2×3 = 6, S+P = 11. 23 % 11 ≠ 0, so return False.*

**Example 3:**  
Input: `n = 101`  
Output: `False`  
*Explanation: The digits are 1, 0, and 1. S = 1+0+1 = 2, P = 1×0×1 = 0, S+P = 2+0 = 2. 101 % 2 ≠ 0, so return False.*

### Thought Process (as if you're the interviewee)  
First, I need to **extract all the digits of n**, which is best done using a while loop and repeatedly taking `n % 10` and `n //= 10`.  
As I extract each digit, I will **add it to a running digit sum** and **multiply to a running digit product** (starting from 1).  
Special care is needed if any digit is 0 since multiplying by 0 will make the product 0, but that's valid per the description.  
Once I have both sum (S) and product (P), simply compute \( S+P \), and check if \( n \bmod (S+P) = 0 \).  
There’s no need for optimization beyond linear time in the number of digits, as that's already fast enough even for \( n < 10^6 \).

### Corner cases to consider  
- Input value is a single-digit, e.g., 5  
- Input contains zero(s) in one or more positions (e.g., 101, 10, 1002)  
- n is 0 or negative (by description, n is always positive, but in practice, handle gracefully)  
- The sum plus product equals zero (not possible for n > 0)
- All digits are 1 (e.g., 1111)
- Large values, close to 10⁶

### Solution

```python
def check_divisibility(n):
    original_n = n
    digit_sum = 0
    digit_product = 1
    has_digit = False  # To handle single-digit n correctly

    while n > 0:
        digit = n % 10
        has_digit = True
        digit_sum += digit
        digit_product *= digit
        n //= 10

    # When n is a single digit (e.g., n = 5)
    if not has_digit:
        digit_sum = original_n
        digit_product = original_n

    check_value = digit_sum + digit_product
    if check_value == 0:
        return False  # to avoid ZeroDivisionError, though not possible per constraints

    return (original_n % check_value) == 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d), where d is the number of digits in n. Each digit is processed once.
- **Space Complexity:** O(1), only uses a constant number of variables regardless of input size.

### Follow-up questions  
- What if n can be negative or zero? (How would you change input handling and edge cases?)  
- Can you do it without extra multiplication for digit product, if space or overflow is a concern?  
- How would you adapt the logic if asked for the largest such divisor out of all (S+P) computed for substrings of n?