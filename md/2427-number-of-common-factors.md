### Leetcode 2427 (Easy): Number of Common Factors [Practice](https://leetcode.com/problems/number-of-common-factors)

### Description  
Given two positive integers **a** and **b**, find how many integers **x** exist such that **x** divides both **a** and **b** (i.e., **x** is a *common factor* of **a** and **b**).  
In other words: *Count the number of positive integers that are factors of both a and b.*

### Examples  

**Example 1:**  
Input: `a = 12, b = 6`  
Output: `4`  
*Explanation: Common factors of 12 and 6 are: 1, 2, 3, 6.*

**Example 2:**  
Input: `a = 25, b = 30`  
Output: `2`  
*Explanation: Common factors of 25 and 30 are: 1, 5.*

**Example 3:**  
Input: `a = 17, b = 23`  
Output: `1`  
*Explanation: The only common factor is 1 since both numbers are prime and have no other common divisors.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force way is to check every possible number **x** from 1 to min(a, b) and count if **x** divides both **a** and **b**.
- For each **x** in 1 … min(a, b): if both **a % x == 0** and **b % x == 0**, increment the count.

This is fine for small numbers, but for larger inputs, checking every number up to min(a, b) is inefficient.

**Optimization:**  
Notice that an integer **x** is a common factor of both **a** and **b** if and only if it is a factor of GCD(a, b).  
So:
- Compute gcd(a, b).
- Count the number of factors of the gcd.

To efficiently count the divisors of the number `gcd`, loop from 1 to √gcd and for every divisor found, count both the divisor and its pair (unless they are equal).

This approach reduces unnecessary checks and provides an efficient solution.

### Corner cases to consider  
- a and b are equal (all factors of a).
- a or b is 1.
- a and b are co-prime (only common factor is 1).
- Large numbers and their divisibility.
- Both inputs are prime but different.

### Solution

```python
def commonFactors(a: int, b: int) -> int:
    # Compute the greatest common divisor
    def gcd(x, y):
        while y:
            x, y = y, x % y
        return x
    
    g = gcd(a, b)
    count = 0
    i = 1
    while i * i <= g:
        if g % i == 0:
            count += 1   # i is a divisor
            if i != g // i:
                count += 1   # g // i is also a divisor, if different
        i += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√gcd(a, b)), since we only loop up to the square root of the GCD and count divisors in pairs.
- **Space Complexity:** O(1), uses constant space (only a few variables, recursion stack is not deep).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers can be large (up to 10¹²)?  
  *Hint: Are your loops efficient enough? Can you optimize divisor counting further?*

- How would you return all the actual common factors and not just count them?  
  *Hint: Store both i and g // i when iterating up to √gcd.*

- What if you needed to do this for multiple queries efficiently?  
  *Hint: Consider preprocessing or memoization if the same pairs repeat or numbers are limited.*

### Summary
This problem uses the classic pattern of **GCD and divisor counting**: the set of common factors for two numbers a and b is exactly the set of divisors of gcd(a, b). This approach is efficient and common in number theory, and is closely related to problems involving GCD, LCM, or divisor enumeration. Similar logic appears in problems asking for common multiples, greatest divisors, or shared factors in arrays.


### Flashcard
Count factors of GCD(a,b) instead of checking every number up to min(a,b) since common factors must divide the GCD.

### Tags
Math(#math), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
- Count Primes(count-primes) (Medium)