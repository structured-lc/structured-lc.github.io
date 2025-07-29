### Leetcode 1175 (Easy): Prime Arrangements [Practice](https://leetcode.com/problems/prime-arrangements)

### Description  
Given an integer n, return the number of permutations of the numbers from 1 to n such that **all the prime numbers are placed at prime indices (1-indexed)**.  
A number is prime if it is greater than 1 and not the product of two smaller positive integers.  
Return the answer modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `12`  
*Explanation: The valid arrangements have all primes (2, 3, 5) at prime indices (2, 3, 5). For example, [1,2,5,4,3] is valid, but [5,2,3,4,1] is not because 5 (prime) is at index 1 (not prime).*

**Example 2:**  
Input: `n = 100`  
Output: `682289015`  
*Explanation: The number of valid ways for 100 is a large number and should be returned modulo 10⁹+7.*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: There are no prime numbers, so only 1 permutation (just [1]) is possible.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Generate all n! permutations and check each for the property: every prime number is on a prime index. This is extremely slow for larger n due to factorial growth.

- **Optimized approach:**  
  Recognize that the constraint is: prime numbers must go to prime indices, and non-prime numbers fill the remaining slots.  
  - Let `p` = number of primes ≤ n.
  - The number of prime indices up to n is also `p` (since indices are 1..n, same as the count of primes).
  - So, place all prime numbers in all possible orderings in the prime spots (`p!` ways).
  - Place all non-primes in the other spots (`(n-p)!` ways).
  - The answer is `p! × (n-p)!` (modulo 10⁹+7).

- **Trade-offs:**  
  - Efficient since we only need to count primes up to n and do two small factorials.
  - With n ≤ 100, prime counting and factorials are both fast.

### Corner cases to consider  
- n = 1 (no primes, should return 1)
- n is a prime (primes and indices match exactly)
- All inputs where n ≤ 3
- Very large n (n = 100, check modulo handling)

### Solution

```python
def numPrimeArrangements(n):
    MOD = 10**9 + 7

    # Sieve of Eratosthenes to count the number of primes ≤ n
    def count_primes(x):
        sieve = [True] * (x + 1)
        sieve[0] = sieve[1] = False
        for i in range(2, int(x**0.5) + 1):
            if sieve[i]:
                for j in range(i*i, x+1, i):
                    sieve[j] = False
        return sum(sieve)

    # Helper: compute factorial modulo MOD
    def fact(k):
        res = 1
        for i in range(2, k+1):
            res = (res * i) % MOD
        return res

    p = count_primes(n)
    return (fact(p) * fact(n - p)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log log n) for sieve to count primes (Eratosthenes),  
  O(n) to compute both factorials. So overall O(n log log n) for n ≤ 100.

- **Space Complexity:**  
  O(n) for the sieve array used in prime counting.  
  Extra space for simple integer variables, but no recursion or complex structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large n, e.g., n > 10⁶?  
  *Hint: Sieve may still be fast, but precomputing/store factorials modulo or using repeated squaring for computation may help.*

- Can you solve if one position is fixed, e.g., number k must go to index i?  
  *Hint: Consider how fixing one slot affects the placements (prime/non-prime counts).*

- If primes need to go to *non-prime* indices instead, how does your solution change?  
  *Hint: Swap counts – prime indices take non-primes, and vice versa.*

### Summary
The main pattern here is **combinatorics with constraints**, split into independent factorial subproblems based on problem properties (e.g., primes-to-prime-indices). This is a classic counting problem reduced to "divide into slots based on type, fill each independently," and is common in arrangement and permutation interview questions with placement constraints.