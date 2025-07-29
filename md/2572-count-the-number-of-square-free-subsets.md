### Leetcode 2572 (Medium): Count the Number of Square-Free Subsets [Practice](https://leetcode.com/problems/count-the-number-of-square-free-subsets)

### Description  
Given a positive integer array `nums`, count the number of **non-empty subsets** whose product is a **square-free integer**.  
*A square-free integer is one not divisible by any perfect square > 1 (i.e., no factor 4, 9, 16, 25, etc.).*  
Return **the count modulo 10⁹ + 7**.

### Examples  

**Example 1:**  
Input: `nums = [3,4,4,5]`  
Output: `3`  
*Explanation: The valid square-free subsets are [3], [5], [3,5]. Subsets like [4] or [3,4] are invalid because 4 contains the square 4 (2×2).*

**Example 2:**  
Input: `nums = [1]`  
Output: `1`  
*Explanation: [1] is the only non-empty subset, and 1 is square-free.*

**Example 3:**  
Input: `nums = [1,1,1]`  
Output: `7`  
*Explanation: Any non-empty combination of the three 1's: [1], [1,1], [1,1], [1,1,1]. Total = 2³ – 1 = 7.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Generate all non-empty subsets, compute each product and check if it’s square-free (check for divisibility by 4, 9, 16, 25, ...).  
  **Downside:** O(2ⁿ × product-check), too slow for n up to 1000.

- **Optimization:**  
  - Numbers from 1 to 30: Only these possible in nums (constraint).
  - Precompute for each number if it is square-free.
  - Track for each prime (up to 29) its presence in subset using bitmask.
  - For each num (not containing a repeated prime), mark which primes it contains via bitmask.
  - Use DP: dp[state] = count of ways to build subset with a combination of used primes (represented as state).
  - Handle 1's separately (can be freely included in any subset).

- **Why this approach:**  
  - Brute-force is infeasible; DP on bitmasks leverages small possible numbers (1…30) efficiently.
  - Encoding used primes by bitmask and combining counts guarantees no repeated primes (hence, square-free).

### Corner cases to consider  
- Array with all 1's  
- Array contains only perfect squares (like [4, 9, 25])  
- Large counts of repeated values  
- Numbers not square-free (multiply to squareful products in some subsets)  
- Empty input  
- Some numbers greater than 30 (shouldn't occur by constraint)

### Solution

```python
from typing import List
from functools import lru_cache

class Solution:
    def squareFreeSubsets(self, nums: List[int]) -> int:
        MOD = 10 ** 9 + 7
        # List of primes up to 30
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        # Precompute for each number 1..30 its mask, if valid
        def get_mask(num: int) -> int:
            mask = 0
            for i, prime in enumerate(primes):
                cnt = 0
                temp = num
                while temp % prime == 0:
                    temp //= prime
                    cnt += 1
                if cnt > 1:
                    return -1  # Not square-free
                if cnt == 1:
                    mask |= (1 << i)
            return mask

        from collections import Counter
        freq = Counter(nums)
        masks = []
        for x in range(2, 31):
            mask = get_mask(x)
            if mask != -1 and freq[x] > 0:
                masks.append( (x, mask, freq[x]) )
        one_count = freq[1] if 1 in freq else 0
        # DP: state = bitmask of used primes
        dp = [0] * (1 << len(primes))
        dp[0] = 1
        for x, mask, count in masks:
            # Iterate in reverse to avoid using the same number twice
            for state in range((1 << len(primes)) - 1, -1, -1):
                if (state & mask) == 0:
                    dp[state | mask] = (dp[state | mask] + dp[state] * count) % MOD
        # Total ways: all non-empty dp except state=0 (which is empty)
        result = (sum(dp) - 1) % MOD
        # Multiply by all possible choices for 1's (can be included/excluded freely)
        if one_count:
            # Every subset can be multiplied with (2^one_count) choices for 1's
            result = (result * pow(2, one_count, MOD)) % MOD
            # Also count subsets made of only 1's: 2^one_count - 1
            result = (result + pow(2, one_count, MOD) - 1) % MOD
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(30 × 2¹⁰) = O(30,720) per DP step (since only numbers 2..30 considered, 10 primes max for bitmasks).  
  The most costly part is iterating masks and states, but these stay constant.

- **Space Complexity:**  
  O(2¹⁰) for the dp array (1024), negligible for storing frequencies and masks.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your method change if the array `nums` could contain numbers greater than 30?  
  *Hint: Direct bitmasking would not work; must factor all primes up to sqrt(max(nums)).*

- What if the subset must be of size k specifically?  
  *Hint: Need to add combinatorial DP dimension to track subset sizes.*

- Can you return all such subsets (not just the count)?  
  *Hint: Not feasible for large input unless n is very small.*

### Summary
This problem uses **bitmask dynamic programming** over prime factors for all numbers up to 30, leveraging the small input domain.  
The pattern 'DP on subset states' is common in counting constraint optimizations, especially where mutually exclusive features (like overlapping prime factors) must be tracked.  
Similar approaches appear in "Subset Sum with Restrictions", "Product of Subsets", and problems involving "square-free" or "coprime" subset selections.