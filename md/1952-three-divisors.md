### Leetcode 1952 (Easy): Three Divisors [Practice](https://leetcode.com/problems/three-divisors)

### Description  
Given an integer n, determine if n has exactly **three positive divisors** — that is, only 1, x, and n itself. You need to return True if this is the case, otherwise return False.  
For example: n = 4 ⇒ divisors are 1, 2, 4 ⇒ exactly three divisors, so return True.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `False`  
*Explanation: Divisors are 1, 2 (only two, not three).*

**Example 2:**  
Input: `n = 4`  
Output: `True`  
*Explanation: Divisors are 1, 2, 4 (three divisors).*

**Example 3:**  
Input: `n = 9`  
Output: `True`  
*Explanation: Divisors are 1, 3, 9 (three divisors).*

**Example 4:**  
Input: `n = 16`  
Output: `False`  
*Explanation: Divisors are 1, 2, 4, 8, 16 (five divisors, not three).*

### Thought Process (as if you’re the interviewee)  
Brute-force approach would be:  
- Try every integer from 1 to n and count how many numbers divide n.  
- Return True if the count is exactly three.  
- This is O(n) and very slow for large n.

But let’s reason: When does an integer have exactly three divisors?  
- Let's look at the pattern:  
  - 2 → divisors: [1, 2]  → count = 2  
  - 4 → divisors: [1, 2, 4] → count = 3  
  - 9 → divisors: [1, 3, 9] → count = 3  
  - 8 → divisors: [1, 2, 4, 8] → count = 4  
- 4 and 9 are **perfect squares of primes** (4=2², 9=3²).

Why?  
- If n = p² (p is a prime), then divisors are: 1, p, p² → that's 3.  
- If n is not a perfect square, or its square root isn't a prime, count of divisors will be different.

So, algorithm:
- Calculate integer square root s = ⌊n¹ᐟ²⌋.
- If s×s ≠ n: return False (n is not a perfect square)
- Check if s is a prime (iterate from 2 to ⌊s¹ᐟ²⌋).
- If s is prime, return True; else, False.

This approach is O(√n) for primality check, and works even for large n.

### Corner cases to consider  
- n = 1: divisors = [1] ⇒ should return False  
- n = 2: divisors = [1,2] ⇒ False  
- n is a square of a non-prime: e.g. 1 = 1×1, 4 = 2×2, 9 = 3×3, 16 = 4×4. Only count those where root is prime.  
- Large perfect squares  
- n < 4: never True

### Solution

```python
def isThree(n):
    # 1 cannot have three divisors
    if n == 1:
        return False
    
    # Compute integer square root
    s = int(n ** 0.5)
    if s * s != n:
        return False  # Not a perfect square
    
    # Check if s is a prime number
    if s < 2:
        return False
    for i in range(2, int(s ** 0.5) + 1):
        if s % i == 0:
            return False
    # n is the square of a prime number
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n)  
  - Calculating s is O(1).  
  - Primality test on s is O(√s), and s ≤ √n, so this is acceptable even for large n.

- **Space Complexity:** O(1)  
  - Only a constant amount of extra variables is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to find all numbers up to N that have exactly three divisors?  
  *Hint: Find all primes up to √N, then use them to compute p² ≤ N.*

- If you are allowed to preprocess, how can you answer multiple queries efficiently?  
  *Hint: Sieve of Eratosthenes for all primes up to √maxN and precompute p².*

- How would your solution change if the number could have negative values?  
  *Hint: Negative integers are not standardly considered for positive divisors, so define requirements.*

### Summary
This problem is a classic example of pattern recognition and mathematical reasoning.  
It uses the insight that only perfect squares of primes have exactly three divisors.  
It’s based on **number theory** and is related to prime-checking and square-root operations.  
This reasoning pattern is common in divisor-counting and mathematical interview questions,  
and can be adapted to sieve-based problems or problems about properties of divisors.

### Tags
Math(#math), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
- Find Greatest Common Divisor of Array(find-greatest-common-divisor-of-array) (Easy)
- Smallest Even Multiple(smallest-even-multiple) (Easy)