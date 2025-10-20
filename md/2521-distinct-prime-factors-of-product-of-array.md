### Leetcode 2521 (Medium): Distinct Prime Factors of Product of Array [Practice](https://leetcode.com/problems/distinct-prime-factors-of-product-of-array)

### Description  
Given an array of positive integers, **nums**, return the number of **distinct prime factors** present in the product of all the elements of **nums**.  
In other words:  
- Imagine multiplying all the numbers in the array together (the product).
- Find all the prime numbers that divide this product at least once.
- Return how many distinct primes there are.

A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.

### Examples  

**Example 1:**  
Input: `nums = [2,4,3,7,10,6]`  
Output: `4`  
*Explanation:  
Product = 2 × 4 × 3 × 7 × 10 × 6 = 10080 = 2⁵ × 3² × 5 × 7  
Distinct primes are 2, 3, 5, 7. Return 4.*

**Example 2:**  
Input: `nums = [2,4,8,16]`  
Output: `1`  
*Explanation:  
Product = 2 × 4 × 8 × 16 = 1024 = 2¹⁰  
Only 2 is a prime factor. Return 1.*

**Example 3:**  
Input: `nums = [5,15,10,20]`  
Output: `3`  
*Explanation:  
Product = 5 × 15 × 10 × 20 = 15000 = 2³ × 3 × 5⁴  
Distinct primes are 2, 3, 5. Return 3.*


### Thought Process (as if you’re the interviewee)  
First, we could try to multiply all values and then factorize the product. But even for small arrays, the product could be way too huge (overflow).  
Instead, every prime factor of the product must be a prime factor of at least one element in nums.  
So, for each number in nums, we:
- Find and collect its unique prime factors.
- To avoid duplicates, use a set.
- The answer is the size of the set at the end.

For prime factorization per number, since 2 ≤ nums[i] ≤ 1000, we can do simple trial division up to sqrt(nums[i]), which is efficient for such small numbers.

Trade-offs:
- We never actually compute or store the product, so we avoid overflow.
- The space is for the set of all prime factors found — at most all the primes ≤ 1000.

### Corner cases to consider  
- Array with only one element; e.g.,   
- All elements are identical; e.g., [13,13,13]
- Elements already prime; e.g., [2,3,5,7]
- Elements all composite but sharing the same prime factor; e.g., [4,8,16]
- Array of minimum allowed length: 1
- Numbers at boundaries: 2, 1000

### Solution

```python
def distinctPrimeFactors(nums):
    # Helper function to find all unique prime factors of a number
    def prime_factors(n):
        factors = set()
        # Check for divisibility by 2 first
        while n % 2 == 0:
            factors.add(2)
            n //= 2
        # Check odd divisors from 3 upwards
        divisor = 3
        while divisor * divisor <= n:
            while n % divisor == 0:
                factors.add(divisor)
                n //= divisor
            divisor += 2
        # If remaining n is a prime > 2
        if n > 1:
            factors.add(n)
        return factors
    
    all_primes = set()
    for number in nums:
        all_primes.update(prime_factors(number))
    return len(all_primes)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For each number (up to 10⁴), we run trial division up to sqrt(1000), which is at most 32 checks per number (`O(n × sqrt(m))` with m=1000).
  - So `O(n × sqrt(1000)) ≈ O(n)`, where n = len(nums).

- **Space Complexity:**  
  - At most the number of different primes ≤ 1000 can be stored in the set, so O(1) (since 1000 is a constant).
  - Temporary variables/factors set per call also remains small.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums[i] could be much larger, say up to 10¹⁶?  
  *Hint: Need an efficient integer factorization (Pollard’s rho, sieve precomputation) or probabilistic primality tests.*

- Can you return the list of distinct prime factors, not just their count, in sorted order?  
  *Hint: Use a set as above, then sort before returning.*

- How would you optimize if you had to answer multiple queries over different ranges (subarrays) of nums?  
  *Hint: Consider segment tree or precompute factor sets for all prefixes/suffixes.*

### Summary
This problem is a neat application of **collecting all prime factors from array elements**, specifically using a set to avoid redundant storage. The brute-force approach of calculating and factoring the product is avoided due to potential overflow and inefficiency.  
This "union of small decompositions" pattern is common in GCD/LCM/subarray factorization tasks and can be seen in problems involving number-theoretic preprocessing for arrays.


### Flashcard
For each number in array, find its prime factors via trial division up to √num, collect all unique primes in a set, return set size.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Number Theory(#number-theory)

### Similar Problems
- 2 Keys Keyboard(2-keys-keyboard) (Medium)
- Largest Component Size by Common Factor(largest-component-size-by-common-factor) (Hard)
- Closest Divisors(closest-divisors) (Medium)
- Smallest Value After Replacing With Sum of Prime Factors(smallest-value-after-replacing-with-sum-of-prime-factors) (Medium)
- Count the Number of Square-Free Subsets(count-the-number-of-square-free-subsets) (Medium)