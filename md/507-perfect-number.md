### Leetcode 507 (Easy): Perfect Number [Practice](https://leetcode.com/problems/perfect-number)

### Description  
A **perfect number** is a positive integer that is equal to the sum of all its positive divisors except itself.  
Given a positive integer `num`, determine whether it is a perfect number.  
For example, if `num = 28`, its divisors (excluding itself) are 1, 2, 4, 7, 14. Since 1 + 2 + 4 + 7 + 14 = 28, 28 is a perfect number.

### Examples  

**Example 1:**  
Input: `28`  
Output: `True`  
*Explanation: 1, 2, 4, 7, 14 are divisors of 28, and 1 + 2 + 4 + 7 + 14 = 28.*

**Example 2:**  
Input: `6`  
Output: `True`  
*Explanation: 1, 2, 3 are divisors; 1 + 2 + 3 = 6.*

**Example 3:**  
Input: `12`  
Output: `False`  
*Explanation: 1, 2, 3, 4, 6 are divisors; 1 + 2 + 3 + 4 + 6 = 16 ≠ 12.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Iterate through all numbers from 1 to num-1, summing all that divide `num`. If the sum equals `num`, it's perfect.  
  Downside: O(n) time — too slow for large input.

- **Optimization:**  
  Since divisors come in pairs (i, num // i), loop only up to √num.  
  For each divisor `i` (where 2 ≤ i ≤ √num), if num % i == 0, both `i` and `num // i` are divisors (exclude adding `num` itself).  
  Always add 1 as it’s a divisor of every number except num=1.

- **Final Approach:**  
  - Return False for num == 1 (not perfect).
  - Initialize sum = 1.
  - For each i in 2 to √num:  
    - If num % i == 0, add i and num // i to sum (avoid double-counting when i == num // i).
  - Check if the sum equals num.

### Corner cases to consider  
- num = 1 (not perfect; should return False)
- num = 2 (too small; should return False)
- num is a large prime (sum will always be 1 < num)
- num is a square number (not double-count its square root when dividing)
- Maximum input num (10⁸)

### Solution

```python
def checkPerfectNumber(num: int) -> bool:
    # 1 is not a perfect number by definition
    if num == 1:
        return False
    
    sum_divisors = 1  # 1 is a proper divisor of all numbers except 1
    
    # Check all divisors up to ⌊num**0.5⌋
    i = 2
    while i * i <= num:
        if num % i == 0:
            sum_divisors += i
            if i != num // i:
                sum_divisors += num // i
        i += 1
    
    return sum_divisors == num
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n) — Only iterate up to ⌊√n⌋; for each factor i, work is constant.
- **Space Complexity:** O(1) — Uses a fixed amount of extra space; no arrays or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find all perfect numbers less than N?
  *Hint: Build on this approach by applying it to all numbers up to N (sieve or precompute).*

- Are there any known formulas or sequences for perfect numbers?
  *Hint: Recall the Euclid-Euler theorem links even perfect numbers with Mersenne primes.*

- What if you had to support checking perfect numbers for numbers much larger than 10⁸?
  *Hint: Precompute and store known perfect numbers; there are very few below large thresholds.*

### Summary
This approach demonstrates the **divisor sum** coding pattern, looping only up to √n to efficiently find all proper divisors. The same logic is commonly used in problems asking for sum or count of divisors. It also shows handling of duplication for square roots and explicitly considers numbers with small inputs or special properties (like 1 or squares). The main trade-off is between brute-force O(n) and optimized O(√n) with the latter being highly efficient for this problem.