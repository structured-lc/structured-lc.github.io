### Leetcode 3348 (Hard): Smallest Divisible Digit Product II [Practice](https://leetcode.com/problems/smallest-divisible-digit-product-ii)

### Description  
Given a string **num** representing a positive integer (without leading zeros) and an integer **t**, return the *smallest zero-free* number (none of its digits are 0) that is greater than or equal to num such that the **product of its digits** is divisible by **t**.  
If no such number exists, return "-1".

A number is *zero-free* if all digits are in 1–9.  
The key is:  
- Output a number ≥ num, with no zeros, and the product of its digits is divisible by t.
- If it's impossible, return "-1".

### Examples  

**Example 1:**  
Input: `num = "1234", t = 256`  
Output: `1488`  
*Explanation: The smallest zero-free number ≥ 1234 whose digit product is 1×4×8×8 = 256 (which is divisible by 256) is 1488. No smaller zero-free number ≥ 1234 works.*

**Example 2:**  
Input: `num = "12355", t = 50`  
Output: `12355`  
*Explanation: 12355 is already zero-free and 1×2×3×5×5 = 150, which is divisible by 50.*

**Example 3:**  
Input: `num = "11111", t = 26`  
Output: `-1`  
*Explanation: There is no zero-free number ≥ 11111 where the product of its digits is divisible by 26 (since 26 = 2×13, and no digit nor product of digits can provide a 13 factor using only digits 1-9).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all zero-free numbers ≥ num, check if digit product divisible by t. This is completely infeasible: there are up to 10¹⁰⁶ numbers of length up to 20.

- **Constraints & Observations:**  
  - Only digits 1-9 are allowed (zero-free requirement).
  - Product of digits: Need to make it divisible by t.  
  - If t contains a prime factor > 9, impossible, since no digit nor their product can generate that prime factor.
  - Each digit can only provide factors up to 9, so prime factorization of t must be fully constructible by multiplying 1–9 digits.
  - We want *smallest* such number ≥ num.  
    - That’s a typical “digit DP” or simulation/change-from-leftmost” problem.

- **Main approach:**  
  1. **Pre-check:** If t has a prime factor > 9, impossible: return '-1'.
  
  2. **Digit DP:**  
     - dp(idx, tight, first_changed, product_so_far):  
       - For each position idx in num, with flag `tight` (if previous digits follow `num`, i.e., can we choose freely yet), and `first_changed` (did we already exceed `num` somewhere?), and current factorization/multiset of unused required factors.
       - Try all digits 1..9 for this position (must be ≥ num[idx] if tight), and for each, update the remaining required product/factorization.
       - Goal: Build minimal number ≥ num that meets product constraint.
  
  3. **Backtracking:**  
     - If digit DP exceeds practical runtime (since t can be as large as 10¹⁴), but num length is up to 20, try to change the first possible digit upwards and greedily fill further digits with 1’s, then increment later digits as needed.
  
  4. **Edge case:**  
     - If num itself is zero-free and product divisible by t, just return num.

- **Why this is efficient:**  
  - Prime factors of t are limited.
  - Number of digits is at most 20.
  - State of dp can be represented as (idx, required factors), which is manageable.

### Corner cases to consider  
- t has a prime factor > 9 → impossible  
- num contains zeros  
- Product for all possible numbers is too small (can't reach required divisibility)  
- t is 1 (every zero-free number is acceptable)  
- num itself is valid (zero-free & product divisible by t)  
- All digits of num are '9's  
- num is just above a “bottleneck” (like '19999', must change to '21111'...)

### Solution

```python
def smallestDivisibleDigitProductII(num: str, t: int) -> str:
    from collections import Counter

    # Returns count of each prime factor in d, or None if any factor > 9
    def prime_factorization(d):
        res = Counter()
        for p in range(2, 10):
            while d % p == 0:
                res[p] += 1
                d //= p
        return res if d == 1 else None

    need_factors = prime_factorization(t)
    if need_factors is None:
        return "-1"

    n = len(num)
    ans = None

    # Helper to try constructing result starting from index i
    def try_build(i):
        nonlocal ans
        # For each position from i, try to increment, then fill min possible satisfying product
        for pos in range(i, n):
            orig = int(num[pos])
            # Try next digits ≥ orig+1 (since we must increase at this position)
            for d in range((orig + 1) if pos == i else 1, 10):
                if d == 0:
                    continue
                digits = [int(c) for c in num[:pos]] + [d]
                rem_len = n - len(digits)
                # Fill rest with 1's, then later we can try to increase them to use up all factors
                fill_digits = [1] * rem_len
                candidate = digits + fill_digits
                # Now try to assign required factors to digits (possibly increasing digits)
                # Get product's current factor count
                used = Counter()
                for dd in candidate:
                    pf = prime_factorization(dd)
                    if pf:
                        used += pf

                remain = need_factors - used
                # Try to assign factors by increasing 1's to other digits as low as possible
                # Greedy: assign biggest factor to biggest available 1
                updates = fill_digits[:]
                idxs = range(len(fill_digits))
                left = list(remain.elements())
                updates = [1] * len(idxs)
                for i, p in enumerate(sorted(left, reverse=True)):
                    if i >= len(updates):
                        break
                    updates[i] = p
                candidate_digits = digits + updates
                if 0 in candidate_digits:
                    continue
                prod = 1
                for v in candidate_digits:
                    prod *= v
                if prod % t == 0:
                    res = ''.join(str(x) for x in candidate_digits)
                    if res >= num and (ans is None or res < ans):
                        ans = res

    # Check whether num itself qualifies
    if '0' not in num:
        prod = 1
        for c in num:
            prod *= int(c)
        if prod % t == 0:
            return num

    # Try all positions to increment
    for i in range(n):
        try_build(i)

    return ans if ans is not None else "-1"
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Worst-case: O(n × 9ⁿ), but due to early pruning (most digits are 1 after increment), and only working with manageable prime factors (≤9), realistically feasible for n ≤ 20.
  - For each position to change, check all 1–9 digits, and factor assignment is greedy.

- **Space Complexity:**  
  - O(1) extra (only small arrays and counters per attempt), ignoring input/output size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we allowed zeros in the resulting number?  
  *Hint: The product being zero makes all t valid. But be careful with leading zeros and which numbers count as "valid".*

- What if you needed the k-th smallest, not just smallest?  
  *Hint: Explore generalized BFS or extensions of the DP for finding k-th results.*

- Could you generate all such numbers within some range?  
  *Hint: Use similar digit-DP/backtrack pattern, but enumerate multiple results instead of stopping at first.*

### Summary
This problem uses a **digit dynamic programming** and **greedy construction/backtrack** pattern, with heavy use of **prime factorization** and pruning based on digits 1–9. The technique of constructing minimal valid values under digit constraints appears in counting/constructing number problems, and understanding when product constraints can/cannot be met is crucial. This construction approach is applicable in problems involving minimal/maximal digit sequence with arithmetic constraints on their product, sum, or modulo.