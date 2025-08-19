### Leetcode 263 (Easy): Ugly Number [Practice](https://leetcode.com/problems/ugly-number)

### Description  
Given an integer n, determine if it is an **ugly number**. An ugly number is a **positive integer** whose only prime factors are **2, 3, or 5**. In other words, you repeatedly divide n by 2, 3, and 5 as long as possible, and if what's left is 1, then n is ugly.  
Note that 1 is considered an ugly number, and any number less than or equal to 0 is **not** ugly.

### Examples  

**Example 1:**  
Input: `n = 6`  
Output: `True`  
*Explanation: 6 = 2 × 3. Both 2 and 3 are allowed prime factors, so 6 is ugly.*

**Example 2:**  
Input: `n = 8`  
Output: `True`  
*Explanation: 8 = 2 × 2 × 2. The only prime factor is 2, so 8 is ugly.*

**Example 3:**  
Input: `n = 14`  
Output: `False`  
*Explanation: 14 = 2 × 7. 7 is not an allowed prime factor, so 14 is not ugly.*

**Example 4:**  
Input: `n = 1`  
Output: `True`  
*Explanation: 1 is treated as an ugly number by definition since it has no prime factors and satisfies the condition.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to **find the prime factorization** of n, then check if all the factors are only 2, 3, or 5. But factoring is unnecessary here.
- Instead, notice the problem actually wants us to **keep dividing** n by 2, 3, and 5 as many times as possible. If we’re left with 1 at the end, then n only had those as prime factors.
- This process is **efficient** as we only perform a logarithmic number of divisions per factor and don't explicitly search for all prime factors.
- For negative numbers or zero, the answer is immediately false as ugly numbers must be positive.

### Corner cases to consider  
- n = 0 (zero): not ugly  
- n < 0 (negative numbers): not ugly  
- n = 1 (edge case): ugly by definition  
- n = 2, 3, 5, any single allowed prime: ugly  
- n > 1 and contains prime factors outside of 2, 3, 5: not ugly

### Solution

```python
def isUgly(n: int) -> bool:
    # Ugly numbers must be positive
    if n <= 0:
        return False

    # Repeatedly divide out allowed prime factors
    for factor in [2, 3, 5]:
        while n % factor == 0:
            n //= factor

    # In the end, if we have reduced n to 1, it's ugly
    return n == 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n). For each of the three factors, we repeatedly divide n by that factor. In the worst case (n is a large power of 2, 3, or 5), this is at most log₂n + log₃n + log₅n operations, which is still O(log n).
- **Space Complexity:** O(1). We do all computations in place, using a constant amount of extra memory regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to determine the kᵗʰ ugly number?  
  *Hint: Use a min heap (priority queue) or dynamic programming to generate and keep track of ugly numbers in ascending order.*

- What if the allowed prime factors set was arbitrary (e.g., not just 2, 3, 5)?  
  *Hint: Generalize the repeated division process for a given list of allowed primes.*

- Can you do it recursively?  
  *Hint: You can use recursion to divide by 2, 3, and 5 and check if it eventually becomes 1.*

### Summary
The main approach is repeatedly **dividing by 2, 3, and 5** to "strip away" any allowed prime factors. The division stops when it’s no longer possible, and if the remaining number is 1, the original number is "ugly." This **prime factors reduction** is a common pattern in number theory problems, useful also in problems that ask for numbers with only certain factors, like "super ugly numbers" or custom factor sets.

### Tags
Math(#math)

### Similar Problems
- Happy Number(happy-number) (Easy)
- Count Primes(count-primes) (Medium)
- Ugly Number II(ugly-number-ii) (Medium)