### Leetcode 172 (Medium): Factorial Trailing Zeroes [Practice](https://leetcode.com/problems/factorial-trailing-zeroes)

### Description  
Given a non-negative integer **n**, determine how many **trailing zeroes** are in the decimal representation of n! (the factorial of n).  
For example, for n = 5, 5! = 120, which has one trailing zero.  
You are **not** required to compute the entire factorial.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `0`  
*Explanation: 3! = 6, which has 0 trailing zeroes.*

**Example 2:**  
Input: `n = 5`  
Output: `1`  
*Explanation: 5! = 120. Only one trailing zero (from 2 × 5).*

**Example 3:**  
Input: `n = 25`  
Output: `6`  
*Explanation:  
25! = ...3000000 (ends with 6 trailing zeroes).  
Count factors of 5: 25 // 5 = 5, then 25 // 25 = 1, so 5 + 1 = 6.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Calculate n! and count how many zeros at the end.  
  **Problem:** n! grows too fast (even for small n), causing overflow or inefficiency.
- **Why do trailing zeroes appear?**  
  Each trailing zero is produced by a factor 10, i.e., a pair of 2 × 5.  
  Factorial (n!) always has more 2s, so the number of trailing zeroes is determined by the count of 5s in n!.
- **How to count 5s in n!:**  
  - For n, count all multiples of 5, then multiples of 25 (since each such number adds an extra 5), then 125, etc.
  - Sum up n // 5 + n // 25 + n // 125 + ... until n // power_of_5 is zero.
  - This is efficient because the loop runs at most O(log₅ n) times.
- **Example for n=100:**  
  100 // 5 = 20  
  100 // 25 = 4  
  100 // 125 = 0  
  So, total = 20 + 4 = 24 trailing zeroes.

### Corner cases to consider  
- n = 0 (0! = 1, so zero trailing zeroes)
- n < 5 (No trailing zero, since no factor 5)
- Large n (should not calculate n! directly)
- n is a power of 5 or has many repeated 5s (e.g., n=25, 125, etc.)

### Solution

```python
def trailingZeroes(n):
    count = 0
    # Continuously divide n by 5, add the quotient to the count
    while n > 0:
        n //= 5
        count += n
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₅ n)  
  Each division by 5 reduces n, so the loop runs about log₅ n times.
- **Space Complexity:** O(1)  
  Uses only a small, constant amount of extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you extend this to calculate the number of trailing zeroes in n! for any given base b (not just base 10)?  
  *Hint: Factorize b and count the limiting factors in n! using similar logic.*

- What if n is extremely large (e.g., n = 10⁹)? How does your solution scale?  
  *Hint: Your algorithm should not actually compute or store n! at all.*

- Can you find the number of ending zeros not in n! but in C(n, k) (n choose k)?  
  *Hint: Use similar factor counting for both numerator and denominator.*

### Summary
This solution is a classic use of **factor counting**, specifically for powers of 5, in factorials—one of the common medium-level math interview patterns.  
No need to compute large factorials; instead, use **arithmetic + loop** to build a logarithmic-time answer.  
Similar patterns occur in combinatorics and problems that involve divisibility/counting within large products.


### Flashcard
Count the number of times 5 divides into n, n/5, n/25, etc.; sum these to get the number of trailing zeroes in n!.

### Tags
Math(#math)

### Similar Problems
- Number of Digit One(number-of-digit-one) (Hard)
- Preimage Size of Factorial Zeroes Function(preimage-size-of-factorial-zeroes-function) (Hard)
- Abbreviating the Product of a Range(abbreviating-the-product-of-a-range) (Hard)
- Maximum Trailing Zeros in a Cornered Path(maximum-trailing-zeros-in-a-cornered-path) (Medium)