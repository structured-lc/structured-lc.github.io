### Leetcode 3115 (Medium): Maximum Prime Difference [Practice](https://leetcode.com/problems/maximum-prime-difference)

### Description  
You are given an integer array nums.  
Return the **maximum distance between the indices of two (not necessarily different) prime numbers** in nums.  
A prime number is defined as a natural number greater than 1 with no divisors other than 1 and itself.  
You need to find all indices in nums where the element is prime, and compute the largest difference between any two such indices (could be the same index, as in the case when there's only one prime).  

### Examples  

**Example 1:**  
Input: `nums = [4,2,9,5,3]`  
Output: `3`  
*Explanation: Primes are at indices 1, 3, and 4. Maximum distance is |4 - 1| = 3.*

**Example 2:**  
Input: `nums = [4,8,2,8]`  
Output: `0`  
*Explanation: Only one prime at index 2, so distance is |2 - 2| = 0.*

**Example 3:**  
Input: `nums = [11,4,6,8,17,4]`  
Output: `4`  
*Explanation: Primes at indices 0 and 4; |4 - 0| = 4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-Force:** Iterate through all pairs of indices \(i, j\) where nums[i] and nums[j] are both prime, track max |i - j|. This is O(n²), which is too slow for large arrays.
- **Optimization:**  
  - Since the difference is maximized between the smallest and largest prime indices, extract all indices containing a prime and just compute max_index - min_index.
  - Find the first (min_index) and last (max_index) occurrence of a prime in a single scan.
  - As nums[i] is always ≤ 100, we can precompute all primes in [1, 100] for quick lookup.

**Trade-offs:**  
- Best time complexity is O(n).
- Extra space is O(1) for prime lookup (since nums[i] ≤ 100).

### Corner cases to consider  
- Only one prime in the array (should return 0).
- Primes clustered at the start or end.
- All elements prime.
- Primes at both extremes (index 0 and last index).
- Large input length (check solution efficiency).
- nums contains minimum allowed values (1, not a prime).
- nums contains duplicates.

### Solution

```python
def maximumPrimeDifference(nums):
    # Helper to build a set of all primes up to 100 using sieve of Eratosthenes
    def build_prime_set(limit=100):
        is_prime = [False, False] + [True] * (limit - 1)
        for i in range(2, int(limit**0.5) + 1):
            if is_prime[i]:
                for multiple in range(i * i, limit + 1, i):
                    is_prime[multiple] = False
        return set(i for i, v in enumerate(is_prime) if v)
    
    primes = build_prime_set()
    
    min_idx = None
    max_idx = None
    
    # Scan to find the minimum and maximum indices where value is prime
    for idx, val in enumerate(nums):
        if val in primes:
            if min_idx is None:
                min_idx = idx
            max_idx = idx
    # Guaranteed at least one prime, so min_idx and max_idx aren't None
    return max_idx - min_idx
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Single pass through nums (length n), each operation is O(1) due to precomputed primes.
- **Space Complexity:** O(1)  
  - Only extra space is the set of primes up to 100 (constant size), and a few variables for indices.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if nums[i] could be as large as 10⁹?  
  *Hint: Efficiently check primality for large numbers, possibly use Miller-Rabin for deterministic primality check up to practical input limits or caching.*

- What if you needed the indices themselves corresponding to the furthest apart primes, not just the distance?  
  *Hint: Store min_idx and max_idx as you scan.*

- What’s the maximum distance if you consider only distinct prime values, not indices?  
  *Hint: Track indices for the first occurrence of each unique prime, then compute min/max among those.*

### Summary
This problem is a scanning/index-difference coding pattern, optimal with a single-pass scan while maintaining tracking variables (`min_idx`, `max_idx`).  
The approach leverages small input constraints (nums[i] ≤ 100) to precompute primes and check efficiently.  
This scan-min/max-index technique can be generally applied to range-maximum-difference questions and is a common trick in problems involving positions of selected values in arrays.


### Flashcard
Extract all indices where elements are prime. Return max_index − min_index (difference between last and first prime occurrence).

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
