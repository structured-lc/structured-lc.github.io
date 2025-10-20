### Leetcode 2523 (Medium): Closest Prime Numbers in Range [Practice](https://leetcode.com/problems/closest-prime-numbers-in-range)

### Description  
Given two integers **left** and **right**, find the pair of prime numbers (nums₁, nums₂) such that **left ≤ nums₁ < nums₂ ≤ right**, nums₁ and nums₂ are both prime, and the difference between nums₂ and nums₁ is the smallest among all such pairs in the range. If several such pairs have the same minimum difference, choose the one with the smaller nums₁. If there are fewer than two primes in the range, return [-1, -1].  
A prime is an integer >1 with no positive divisors other than 1 and itself.

### Examples  

**Example 1:**  
Input: `left = 10, right = 19`  
Output: `[11, 13]`  
Explanation:  
The primes in [10,19] are [11, 13, 17, 19]. Differences: 13-11=2, 17-13=4, 19-17=2. The smallest difference is 2, existing for [11,13] and [17,19]. Since 11 < 17, output [11,13].

**Example 2:**  
Input: `left = 4, right = 6`  
Output: `[-1, -1]`  
Explanation:  
There’s only one prime (5) in [4,6], so not enough primes to form a pair. Return [-1, -1].

**Example 3:**  
Input: `left = 19, right = 31`  
Output: `[19, 23]`  
Explanation:  
Primes in the range: [19, 23, 29, 31]. 23-19=4, 29-23=6, 31-29=2. The smallest difference is 2 for [29,31], but since 19<29, and 19 and 23 have a difference of 4, [29,31] is chosen since their diff (2) is smaller. So output [29,31].

### Thought Process (as if you’re the interviewee)  
Let's break the problem into steps:

- **Brute-force Idea:**  
  Iterate through every number from left to right. For every pair (i, j) with left ≤ i < j ≤ right, check if both are prime, then compute the difference. Store the pair with the minimum difference.  
  This is inefficient, as checking primality repeatedly is slow for large ranges.

- **Optimization:**  
  Use a modified **Sieve of Eratosthenes**:
    - Find all primes up to right using a sieve for fast primality tests.
    - Filter those within [left, right].  
    - Iterate through the sorted list of primes, comparing only adjacent pairs. This is key: The minimum difference will always be between consecutive primes in the range.

- **Reasoning:**  
  Building the prime list up-front is O(N log log N), much faster than checking primality repeatedly. Since the smallest gap must be between adjacent primes, we avoid O(n²) comparisons.

- **Edge Cases:**  
  If fewer than two primes are found in the range, return [-1, -1].

### Corner cases to consider  
- No primes in the range: e.g. left=14, right=15.
- Only one prime in the range: e.g. left=8, right=11.
- The closest pair is at the ends: e.g. left=2, right=3.
- Range with many primes and minimum gap is at more than one place (must return the one with smallest first).
- Very small or very large input ranges.

### Solution

```python
def closest_primes(left: int, right: int) -> list[int]:
    # Step 1: Use sieve to find all primes up to 'right'
    n = right + 1
    is_prime = [True] * n
    is_prime[:2] = [False, False]  # 0 and 1 are not prime

    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n, i):
                is_prime[j] = False

    # Step 2: Collect all primes in [left, right]
    primes_in_range = [i for i in range(left, right + 1) if is_prime[i]]

    # Step 3: Find closest pair of primes
    if len(primes_in_range) < 2:
        return [-1, -1]

    min_diff = right - left + 1  # init to max possible diff
    res = [-1, -1]

    for i in range(1, len(primes_in_range)):
        diff = primes_in_range[i] - primes_in_range[i - 1]
        if diff < min_diff:
            min_diff = diff
            res = [primes_in_range[i - 1], primes_in_range[i]]

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Sieve of Eratosthenes is O(N log log N) where N = right.  
  Filtering primes in range is O(N).  
  Scanning adjacent pairs is O(M), where M is number of primes in [left, right].

- **Space Complexity:**  
  O(N) for the is_prime array (N = right+1).  
  Plus O(M) for list of primes in range.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range [left, right] is extremely large (right > 10^8)?
  *Hint: Consider segmented sieve or more memory-efficient primality checks.*

- How would you modify your code to return all pairs with the minimum difference, not just one?
  *Hint: Store all pairs with diff = min_diff.*

- Can you do this without extra O(N) space?
  *Hint: Explore rolling sieve or checking primality on the fly (less efficient, but saves memory).*

### Summary
This problem is a classic application of the **Sieve of Eratosthenes** for fast prime detection, combined with the observation that the minimal difference between two primes in a range always occurs between adjacent primes. This approach is general for “primes in an interval” and “closest/farthest pair”-type interview questions, and this coding pattern appears often in problems involving prime gaps, segment analysis, and interval scanning.


### Flashcard
Sieve primes up to right, collect in sorted list, find consecutive pair with minimum gap; return [-1,-1] if fewer than 2 primes exist.

### Tags
Math(#math), Number Theory(#number-theory)

### Similar Problems
- Count Ways to Make Array With Product(count-ways-to-make-array-with-product) (Hard)