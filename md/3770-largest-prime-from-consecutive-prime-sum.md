### Leetcode 3770 (Medium): Largest Prime from Consecutive Prime Sum [Practice](https://leetcode.com/problems/largest-prime-from-consecutive-prime-sum)

### Description  
Given an integer `n`, find the **largest prime number** that is less than or equal to `n` and can be expressed as the sum of one or more **consecutive prime numbers starting from 2**. For example, you can form sums like 2, 2+3=5, 2+3+5=10, 2+3+5+7=17, etc. Return the largest such prime ≤ n, or -1 if no such prime exists.

### Examples  

**Example 1:**  
Input: `n = 10`  
Output: `5`  
*Explanation: The consecutive prime sums ≤ 10 are: 2, 5 (2+3), 10 (2+3+5). Of these, 5 is the largest prime.*

**Example 2:**  
Input: `n = 20`  
Output: `17`  
*Explanation: The consecutive prime sums ≤ 20 are: 2, 5 (2+3), 10 (2+3+5), 17 (2+3+5+7), 20 (2+3+5+7). Of these, 17 is prime and the largest.*

**Example 3:**  
Input: `n = 2`  
Output: `2`  
*Explanation: The only consecutive prime sum ≤ 2 is 2 itself, which is prime.*


### Thought Process (as if you're the interviewee)  
The brute-force approach would check every number up to n for primality and for every number check if it's a sum of consecutive primes—this is inefficient.

A better approach: (1) Generate all primes up to n using the Sieve of Eratosthenes, which is O(n log log n). (2) Compute consecutive prime sums starting from 2 using a prefix sum technique—iterate through primes and keep adding them, checking if each prefix sum is prime. (3) Track the maximum prime sum found. This avoids repeatedly checking primality and ensures we only consider sums that start from 2 and are consecutive.

The key insight is that we don't iterate through all numbers; instead, we work directly with primes and their sums, which significantly reduces the search space.

### Corner cases to consider  
- `n = 2`: Only prime is 2 itself; should return 2.
- `n < 2`: No primes exist; should return -1.
- Very large `n`: Sieve must efficiently generate all primes up to n.
- No valid consecutive prime sum is prime: For instance, sums might exceed n or none might be prime; return -1.
- Single prime vs. sum of multiple primes: Both are valid consecutive sums.

### Solution

```python
def largestPrime(n):
    # Step 1: Sieve of Eratosthenes to find all primes up to n
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark all multiples of i as not prime
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    
    # Step 2: Collect all primes up to n
    primes = [i for i in range(2, n + 1) if is_prime[i]]
    
    # Step 3: Find consecutive prime sums and track the largest prime
    max_prime = -1
    prefix_sum = 0
    
    for prime in primes:
        prefix_sum += prime
        
        # If prefix sum exceeds n, stop (all further sums will exceed n)
        if prefix_sum > n:
            break
        
        # Check if this prefix sum is a prime
        if is_prime[prefix_sum]:
            max_prime = prefix_sum
    
    return max_prime
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log log n) for the Sieve of Eratosthenes, plus O(p) where p is the number of primes up to n. Since the number of primes up to n is approximately n / ln(n), the overall complexity is O(n log log n).
- **Space Complexity:** O(n) for the `is_prime` array and the `primes` list, which together store all primes and a boolean array of size n.

### Potential follow-up questions  

- (Follow-up question 1)  
  *What if you needed to find all consecutive prime sums that are prime (not just the largest)? How would you modify the approach?*  
  *Hint: Store all valid sums in a data structure instead of tracking only the maximum; the sieve and iteration logic remain the same.*

- (Follow-up question 2)  
  *How would you optimize if n is extremely large (e.g., 10⁷) and memory is a constraint?*  
  *Hint: Consider a segmented sieve to generate primes in chunks rather than storing all at once.*

- (Follow-up question 3)  
  *Can you solve this without the Sieve of Eratosthenes? What trade-offs would that introduce?*  
  *Hint: You could check primality of each sum on-the-fly, but this increases time complexity since primality testing becomes O(√m) per sum.*

### Summary
This problem combines two key techniques: the **Sieve of Eratosthenes** for efficient prime generation and **prefix sums** for computing consecutive additions. By iterating through primes and maintaining a running sum, we avoid redundant primality checks and unnecessary iterations. We break early when the sum exceeds n, leveraging the fact that subsequent sums will only grow larger. This pattern is widely applicable in problems involving prime sieves, consecutive subarrays, and optimization via prefix sums.

### Flashcard
Use the Sieve of Eratosthenes to generate all primes up to n, then iterate through primes maintaining a prefix sum, checking if each sum is prime and tracking the maximum—breaking early when the sum exceeds n.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
