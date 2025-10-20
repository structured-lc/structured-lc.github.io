### Leetcode 204 (Medium): Count Primes [Practice](https://leetcode.com/problems/count-primes)

### Description  
Given an integer **n**, count how many prime numbers exist strictly less than **n**.  
A *prime* is a natural number greater than 1 that has no positive divisors other than 1 and itself.  
Explain how many such numbers lie in `[2, n-1]`.

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `4`  
*Explanation: The primes less than 10 are 2, 3, 5, and 7. So the output is 4.*

**Example 2:**  
Input: `n = 0`  
Output: `0`  
*Explanation: There are no primes less than 0.*

**Example 3:**  
Input: `n = 1`  
Output: `0`  
*Explanation: Primes must be greater than 1. So, none below 1.*

### Thought Process (as if you’re the interviewee)  
- The brute force way is to check each number less than **n** to see if it is prime (divide by all numbers up to its square root). For each number, checking primality is O(√k), making total time about O(n√n). This is too slow for large n.
- To optimize, use the **Sieve of Eratosthenes**:
  - Create a boolean list is_prime indicating whether each number < n is prime.
  - Mark all multiples of each prime (starting from 2) as not prime.
  - Only need to process up to ⌊√n⌋, as larger multiples would already have been marked by a smaller prime factor.
  - Finally, count the True values in is_prime[2:n], as these represent all primes < n.
- Sieve is much faster, at O(n log log n) time and O(n) space.
- This approach is both historically proven and efficient in practice for reasonable n.

### Corner cases to consider  
- n ≤ 2 (no primes in this range)
- n = 3 (only 2 is prime)
- Very large n (stress Sieve efficiency)
- Edge cases like n is prime itself (do not count n itself)
- n is negative or zero (should return 0)

### Solution

```python
def countPrimes(n: int) -> int:
    # There are no primes less than 2
    if n <= 2:
        return 0

    # Initialize a boolean array to track primality
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False  # 0 and 1 are not primes

    # Sieve of Eratosthenes process
    i = 2
    while i * i < n:
        if is_prime[i]:
            # Mark all multiples of i as not prime, start from i*i
            j = i * i
            while j < n:
                is_prime[j] = False
                j += i
        i += 1

    # Count the number of primes less than n
    return sum(is_prime)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log log n)  
  *The outer loop runs for primes ≤ ⌊√n⌋, and the inner marking (across the whole range) divides out as log log n over all numbers.*
- **Space Complexity:** O(n)  
  *For the is_prime list of length n; no extra storage or recursion.*

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this to return the actual list of primes less than n?  
  *Hint: Return the list indices where is_prime is True.*

- Can this be optimized to use less space?  
  *Hint: Consider bit arrays or only odd numbers.*

- How would you count primes in a very large range, say up to 10¹²?  
  *Hint: Look into segmented sieve methods.*

### Summary
This problem leverages the classic **Sieve of Eratosthenes** pattern—one of the most fundamental sieve techniques in computational number theory. The core idea is to iteratively mark non-primes, yielding an efficient O(n log log n) prime counting solution. This “marking multiples” approach is broadly useful for problems involving number properties over ranges, such as prime factorization, counting square-free numbers, and similar computational mathematics questions.


### Flashcard
Use Sieve of Eratosthenes—mark multiples of each prime up to √n as non-prime, then count remaining primes below n.

### Tags
Array(#array), Math(#math), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
- Ugly Number(ugly-number) (Easy)
- Ugly Number II(ugly-number-ii) (Medium)
- Perfect Squares(perfect-squares) (Medium)
- Number of Common Factors(number-of-common-factors) (Easy)
- Prime Pairs With Target Sum(prime-pairs-with-target-sum) (Medium)
- Find the Count of Numbers Which Are Not Special(find-the-count-of-numbers-which-are-not-special) (Medium)