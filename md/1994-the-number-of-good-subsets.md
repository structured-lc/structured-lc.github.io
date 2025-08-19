### Leetcode 1994 (Hard): The Number of Good Subsets [Practice](https://leetcode.com/problems/the-number-of-good-subsets)

### Description  
Given an array of integers `nums`, count the number of *good* subsets.  
A subset is *good* if the product of its elements is a product of one or more **distinct** prime numbers.  
A *good* subset cannot contain any repeated prime factors in its product (e.g. 2×2×3 isn’t valid, as ‘2’ repeats).  
The integer 1 has no prime factors and can be freely included (each ‘1’ can go into a subset or not).  
Return the answer modulo 10⁹ + 7.

Example:  
- For `nums = [1,2,3,4]`:  
  - [2,3], [1,2,3], [1,3] are good (products: 6=2×3, 6=2×3, 3),  
  - [4], [1,4] are *not* good (as 4=2×2 has repeated primes).

### Examples  

**Example 1:**  
Input: `[1,2,3,4]`  
Output: `6`  
*Explanation: Good subsets: [2], [3], [2,3], [1,2], [1,3], [1,2,3].
Note: [4], [1,4] are not good since 4=2×2 repeats 2.*

**Example 2:**  
Input: `[4,2,3,15]`  
Output: `5`  
*Explanation: Good subsets: [2], [3], , [2,3], [3,15].*

**Example 3:**  
Input: `[1,1,1]`  
Output: `0`  
*Explanation: No numbers (except 1s), so no subset with any prime. Can't make a "good" subset.*

### Thought Process (as if you’re the interviewee)  

- **Brute force idea**: Generate all possible subsets, calculate product for each, then check if product factors into distinct primes only (no repeats). But there are up to 2ⁿ subsets—prohibitively large for n=10⁵.
- **Optimize**:  
  - Only numbers 1 to 30 are allowed, so all valid prime factorizations can be precomputed.
  - For each occurrence count of each value in nums, use a bitmask to track distinct primes-multiplied so far.  
  - Use dynamic programming (DP): dp[mask] = number of ways to build subsets whose product has set of primes represented by ‘mask’. For each num, update all compatible ‘dp’ entries using bit manipulation (if its primes and mask don’t overlap).
  - Special care for number 1: can freely multiply every subset count by number of 1s (+1).
- Prime handling: Only include numbers with no repeated prime within themselves (e.g., skip 4=2×2, 8=2×2×2, 9=3×3, etc.).

- **Why this approach?**
  - It leverages the small value bound (30), handling the massive n only via counts.
  - DP by mask is feasible, as there are at most 10 primes ≤ 30, so mask sizes are manageable (2¹⁰=1024).
  - Bitmask DP is a recurring technique for subset combination/counting where feature overlap is key.

### Corner cases to consider  
- All ones in nums (no valid subset).
- Duplicates of composite numbers with repeated primes (e.g. 4, 8, 9, 12).
- nums without any primes at all.
- nums = [2] (single valid subset).
- nums with multiple 1s.
- Large input sizes (10⁵ elements).

### Solution

```python
MOD = 10 ** 9 + 7

def numberOfGoodSubsets(nums):
    from collections import Counter

    # List of all primes ≤ 30
    primes = [2,3,5,7,11,13,17,19,23,29]
    # Precompute each number's "prime mask" if its factorization is valid (no repeated factors)
    num_mask = {}
    for n in range(2, 31):
        x, mask, is_valid = n, 0, True
        for i, p in enumerate(primes):
            cnt = 0
            while x % p == 0:
                x //= p
                cnt += 1
            if cnt > 1:
                is_valid = False
                break
            elif cnt == 1:
                mask |= (1 << i)
        if is_valid and x == 1:
            num_mask[n] = mask

    count = Counter(nums)
    dp = [0] * (1 << len(primes))
    dp[0] = 1  # Empty subset

    for n in range(2, 31):    # skip '1's for now
        if n not in num_mask or n not in count:
            continue
        mask = num_mask[n]
        freq = count[n]
        # Go backwards to not double use elements in same round
        for prev in range((1 << len(primes)) - 1, -1, -1):
            if prev & mask == 0:
                # Choose n freq times (add freq new ways)
                dp[prev | mask] = (dp[prev | mask] + dp[prev] * freq) % MOD

    # Now handle 1s: Each can either be in or not for each subset
    pow1 = pow(2, count[1], MOD) if 1 in count else 1
    # Exclude dp[0] (empty subset) from the answer
    ans = sum(dp[1:]) % MOD
    ans = (ans * pow1) % MOD
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing (prime masks): O(1) (since range is [2,30]).
  - DP update: For each valid number (≤ 30), for each mask (1024), so O(30 × 1024) = O(30_000) steps.
  - So total time, ignoring Counter build and other O(1) preprocessing, is well within contest/interview constraints.

- **Space Complexity:**  
  - dp array: 2¹⁰ = 1024 size.
  - num_mask: up to 29 entries.
  - count: up to 30 entries.
  - So O(1) total extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the upper limit on nums[i] increases beyond 30?
  *Hint: How scalable is prime identification and mask-based DP if there are more primes?*

- What if you want to count the number of good subsets of *size* k?
  *Hint: Can you track size as an additional DP dimension?*

- Suppose the nums list contains zeros. How would you handle that?
  *Hint: A zero always ruins the product—should you treat it differently?*

### Summary
This problem is a classic *bitmask subset DP* on small-dimension combinatorics.  
The key insight is leveraging the restriction that all nums[i] ≤ 30, allowing for per-value frequency tracking and DP "masking" by prime combinations.  
The structure and DP pattern is common in subset-sum, bitmask-DP, and problems where you’re combining independent "traits" with overlap constraints.  
This approach generalizes to many problems where you count valid subsets meeting non-overlapping feature or divisibility rules.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Counting(#counting), Number Theory(#number-theory), Bitmask(#bitmask)

### Similar Problems
- Smallest Sufficient Team(smallest-sufficient-team) (Hard)
- Fair Distribution of Cookies(fair-distribution-of-cookies) (Medium)
- Number of Ways to Wear Different Hats to Each Other(number-of-ways-to-wear-different-hats-to-each-other) (Hard)