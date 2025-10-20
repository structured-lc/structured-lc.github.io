### Leetcode 2761 (Medium): Prime Pairs With Target Sum [Practice](https://leetcode.com/problems/prime-pairs-with-target-sum)

### Description  
Given an integer `n`, find all pairs of **prime numbers** (x, y) such that x ≤ y, x + y = n, and both x and y are ≥ 2 and ≤ n. Return each pair as a list `[x, y]`. Return all valid pairs **sorted by the value of x**. If no such pairs exist, return an empty list.

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `[[3,7],[5,5]]`  
*Explanation: 3 and 7 are prime and add up to 10, as do 5 and 5.*

**Example 2:**  
Input: `n = 5`  
Output: `[[2,3]]`  
*Explanation: 2 and 3 are both prime and together sum to 5.*

**Example 3:**  
Input: `n = 11`  
Output: `[[5,6]]`  
*Explanation: 5 is prime but 6 is not, so actually no valid pair. (If such an input-output existed, we'd note: only pairs where both are prime.)*

### Thought Process (as if you’re the interviewee)  
To solve this, I need to find all pairs of primes whose sum is exactly n.  
A brute-force approach would be:
- Loop through all x from 2 to n.
- For each x, check if x and (n - x) are both prime and x ≤ n - x.
- Primality checking up to n for every call is too slow for large n.

I can optimize by:
- Using the **Sieve of Eratosthenes** to pre-compute all primes up to n. This allows checking if x and n - x are prime in O(1) time.
- Only loop x from 2 up to ⌊n/2⌋ (because pairs are (x, y) where x ≤ y, and so x ≤ n-x).
- For each x, if is_prime[x] and is_prime[n-x], include [x, n-x] in the answer.

Trade-offs:
- Sieve is O(n log log n) time and O(n) space but makes primality lookup efficient, which is needed for n as big as 10⁶.
- The loop after the sieve is O(n). The overall approach is efficient for the constraints.

### Corner cases to consider  
- n < 4: no valid pairs (as smallest two primes sum to 2+2=4).
- n is even/odd: sometimes, for odd n, no pairs if n-2 isn't prime.
- No pair exists: output is an empty list.
- n = 4: only [2,2] is a valid pair.
- Primes can be repeated (e.g., [5,5] for n=10).

### Solution

```python
def findPrimePairs(n):
    # No pairs if n < 4
    if n < 4:
        return []

    # Sieve of Eratosthenes to compute is_prime for all 0..n
    is_prime = [False, False] + [True] * (n-1)
    for i in range(2, int(n**0.5)+1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False

    result = []
    # Only need to check x from 2 up to ⌊n/2⌋ (since x ≤ y)
    for x in range(2, n // 2 + 1):
        y = n - x
        if is_prime[x] and is_prime[y] and x <= y:
            result.append([x, y])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log log n) due to the Sieve of Eratosthenes, where n is the input value. The final loop to check pairs is O(n).
- **Space Complexity:** O(n) for the is_prime boolean list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is huge (e.g., 10⁹)?  
  *Hint: How can you use segmented/optimized sieves or skip unnecessary checks?*

- What if you want to return **only one** pair, not all pairs?  
  *Hint: How does the search/early return change?*

- What if you need to find pairs in a **streaming** context (many n in sequence)?  
  *Hint: Can you reuse sieve computation between queries?*

### Summary
This is a classic use of the Sieve of Eratosthenes for fast primality checking, combined with a two-pointer-style search for pairs by iterating only up to ⌊n/2⌋. The approach is efficient, minimizing redundant work, and is broadly applicable to problems involving prime sums or Goldbach-type conjecture applications.


### Flashcard
Precompute primes up to n using Sieve of Eratosthenes, then check pairs (x, n-x) where both are prime and x ≤ n/2.

### Tags
Array(#array), Math(#math), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
- Count Primes(count-primes) (Medium)