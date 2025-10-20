### Leetcode 2507 (Medium): Smallest Value After Replacing With Sum of Prime Factors [Practice](https://leetcode.com/problems/smallest-value-after-replacing-with-sum-of-prime-factors)

### Description  
Given a positive integer **n**, repeatedly replace **n** by the sum of its prime factors (counting multiplicities), until **n** stops changing. The process is:
- For each replacement, if a prime divides **n** multiple times, count those prime factors for each occurrence.
- Return the smallest value that **n** takes (where a further replacement would not reduce it).

**Put simply:**  
Keep breaking down **n** into its prime factors (including multiplicity), sum those, and repeat—until the result stops decreasing. Return that value.

### Examples  

**Example 1:**  
Input: `n = 15`  
Output: `5`  
Explanation:  
- Start: 15.  
- 15 = 3 × 5 → sum = 3 + 5 = 8.  
- 8 = 2 × 2 × 2 → sum = 2 + 2 + 2 = 6.  
- 6 = 2 × 3 → sum = 2 + 3 = 5.  
- 5 is prime, so it stays 5.

**Example 2:**  
Input: `n = 3`  
Output: `3`  
Explanation:  
- 3 is already a prime, so no changes are made.

**Example 3:**  
Input: `n = 12`  
Output: `5`  
Explanation:  
- Start: 12.  
- 12 = 2 × 2 × 3 → sum = 2 + 2 + 3 = 7.  
- 7 is prime → remains 7.

_(Note: The expected output from the original examples is always the final, smallest value the process ever takes—repeat until a fixed point.)_

### Thought Process (as if you’re the interviewee)  
I'd restate the process:  
- For input **n**, at each step, factorize it and sum the prime factors (including repetitions).
- Repeat: assign the sum back to **n**, until no further decrease is possible (that is, **n** doesn't change after factoring and summing).
- When that happens, return **n**.

To do this efficiently:
- I need a helper to compute the sum of prime factors.
  - For any **n**, try to divide by all numbers from 2 up to ⌊n/2⌋ (since the largest prime factor can at most be **n** itself).
  - For each prime dividing **n**, count and sum it as many times as it divides **n**.
- Edge case: if **n** is a prime, the only prime factor is itself.
- As a brute-force, simply loop this process until no change occurs.
- This process is fast because **n** shrinks rapidly, and each pass reduces it until a stable state.

Trade-offs:
- Since n ≤ 10⁵, repeated trial division per step is acceptable.
- Memory overhead is O(1).  
- More optimal factorization algorithms are possible but not required for n ≤ 10⁵.

### Corner cases to consider  
- n is already a prime: should return n directly.
- n = 2 (the smallest allowed): process should result in n itself.
- n with all the same prime factors (e.g., 2⁴): process yields their sum once then smallest value.
- n is a product of several distinct primes.
- Large n (close to 10⁵): test performance of factorization.

### Solution

```python
def smallestValue(n: int) -> int:
    # Helper to compute sum of prime factors (with multiplicities)
    def sum_prime_factors(num: int) -> int:
        s = 0
        # Check for factor 2 first (even numbers)
        while num % 2 == 0:
            s += 2
            num //= 2
        # Check odd factors up to sqrt(num)
        p = 3
        while p * p <= num:
            while num % p == 0:
                s += p
                num //= p
            p += 2
        # If num is a prime > 2
        if num > 1:
            s += num
        return s

    while True:
        s = sum_prime_factors(n)
        if s == n:
            return n
        n = s
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each iteration, prime factorization of n takes up to O(√n). In practice, n drops quickly per iteration; typical number of iterations is log n or better because the number shrinks with each sum. For constraints up to 10⁵, this is efficient.

- **Space Complexity:**  
  O(1) extra space. Only a few integer counters for calculation; no recursion or large data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n could be as large as 10⁹ or even larger?  
  *Hint: Is trial division for prime factorization still feasible? Can you precompute primes or use advanced factorization?*

- Can you optimize the algorithm if this needed to process many values of n in a row?  
  *Hint: Would precomputing smallest prime factors (using sieve up to max n) help?*

- What changes if you replaced "sum" with "product" of the prime factors?  
  *Hint: Trace an example: n = 12, what sequence do you get?*

### Summary
This problem uses a classic **prime factorization and replacement loop**: repeatedly applying a transformation (sum of all prime factors, with multiplicity) until reaching a stable fixed-point value.  
The core coding pattern is **loop until no change/fixed point**, and the prime factorization as a helper function. This pattern appears in other problems involving iterative mathematical transformations, e.g., digital root, repeated transformations, and dynamic process stabilization.  
The factorization code is direct and easily adaptable; this “replace and repeat” style is a useful tool for other number theory and convergence pattern problems.


### Flashcard
Repeatedly factorize n and sum its prime factors (with repetition) until value stops decreasing – optimized by trial division up to √n.

### Tags
Math(#math), Simulation(#simulation), Number Theory(#number-theory)

### Similar Problems
- Happy Number(happy-number) (Easy)
- 2 Keys Keyboard(2-keys-keyboard) (Medium)
- Count Ways to Make Array With Product(count-ways-to-make-array-with-product) (Hard)
- Distinct Prime Factors of Product of Array(distinct-prime-factors-of-product-of-array) (Medium)
- Minimum Division Operations to Make Array Non Decreasing(minimum-division-operations-to-make-array-non-decreasing) (Medium)