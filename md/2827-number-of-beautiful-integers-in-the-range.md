### Leetcode 2827 (Hard): Number of Beautiful Integers in the Range [Practice](https://leetcode.com/problems/number-of-beautiful-integers-in-the-range)

### Description  
Given three positive integers **low**, **high**, and **k**:  
Find how many integers in the range [low, high] are **"beautiful"**, where an integer is defined as *beautiful* if:

- The **count of even digits** and **count of odd digits** in the number are **equal**.
- The integer is **divisible by k**.

Return the count of beautiful integers within the given range.

### Examples  

**Example 1:**  
Input: `low = 10, high = 20, k = 3`  
Output: `2`  
Explanation:  
Beautiful integers are `[12, 18]`.  
- 12: even=1, odd=1, 12 is divisible by 3  
- 18: even=1, odd=1, 18 is divisible by 3

**Example 2:**  
Input: `low = 1, high = 10, k = 1`  
Output: `1`  
Explanation:  
Beautiful integer is ``.  
- 10: even=1, odd=1, 10 is divisible by 1

**Example 3:**  
Input: `low = 5, high = 5, k = 2`  
Output: `0`  
Explanation:  
There are no beautiful integers in this range.

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  *Iterate from low to high, count even and odd digits for every number, and check divisibility by k. Return how many are beautiful.*
  *But constraints can be large (high ≤ 10⁹) — brute-force will time out.*

- The real bottleneck:  
  *Efficiently count numbers with equal even/odd digit counts and divisibility by k in large numeric ranges. This is a classic "digit DP" (dynamic programming over digits) problem.*

- Digit DP breakdown:  
  - Build the number from left to right, keeping track of:
    - Position in the number (from most significant digit)
    - Remainder modulo k so far
    - Difference between even and odd digit counts (for n digits, beautiful means the difference is zero)
    - Leading zeros (to avoid counting leading-digit artifacts)
    - Boundness (limit, i.e., are we still tight to the upper/lower bounds?)
  - **Count** all valid numbers up to high, then subtract count up to low-1.

- Why digit DP is optimal:  
  - It compresses repeated subproblems with memoization.
  - Handles constraints efficiently.

- Tradeoffs:  
  - Space: Need to memoize on all the above states.
  - Code is more complex but runs in O(digits × k × diff-range) time.

### Corner cases to consider  
- low and high are the same.
- k = 1 (all even/odd-balanced numbers qualify)
- Numbers with leading zeros (should not count, except when necessary for smaller numbers).
- Ranges where no beautiful number exists.
- Numbers whose total digit count is odd (can't split evenly between even/odd digits).

### Solution

```python
def numberOfBeautifulIntegers(low: int, high: int, k: int) -> int:
    from functools import lru_cache

    def count_beautiful(u: int) -> int:
        s = str(u)
        n = len(s)
        
        # Only try numbers with even #digits, else cannot have equal even/odd
        # For each possible even-length up to n
        def dp(pos, mod, diff, even_needed, is_tight, is_start):
            # pos: current position in digit string
            # mod: value modulo k so far
            # diff: count_even - count_odd so far
            # even_needed: number of even digits still to place
            # is_tight: still restricted by prefix of 's'
            # is_start: haven't placed a digit yet (so leading zeros)
            if pos == len(mask):
                return int(mod == 0 and even_needed == 0 and diff == 0)
            res = 0
            up = int(mask[pos]) if is_tight else 9
            for d in range(0, up + 1):
                if is_start and d == 0:
                    res += dp(
                        pos + 1,
                        mod, diff, even_needed, 
                        is_tight and d == up, True)
                else:
                    if len(mask) % 2 == 1:
                        continue  # len(mask) should be even
                    # For beautiful: need equal evens and odds in final number
                    new_even_needed = even_needed - (1 if d % 2 == 0 else 0)
                    new_diff = diff + (1 if d % 2 == 0 else -1)
                    res += dp(
                        pos + 1,
                        (mod * 10 + d) % k,
                        new_diff,
                        new_even_needed,
                        is_tight and d == up,
                        False
                    )
            return res

        total = 0
        for L in range(2, len(s) + 1, 2):   # only lengths with even #digits
            # Set mask to the prefix of length L from s, or just 9s for less-than-max numbers
            if L < len(s):
                mask = '9' * L
                tight = False
            else:
                mask = s
                tight = True
            # Half even, half odd must be placed
            half = L // 2
            @lru_cache(None)
            def memo(pos, mod, even_needed, diff, tight, is_start):
                if pos == L:
                    return int(mod == 0 and even_needed == 0 and diff == 0 and not is_start)
                ans = 0
                up = int(mask[pos]) if tight else 9
                for d in range(0, up + 1):
                    if is_start and d == 0:
                        ans += memo(pos + 1, mod, even_needed, diff, tight and d == up, True)
                    else:
                        next_even_needed = even_needed - (1 if d % 2 == 0 else 0)
                        next_diff = diff + (1 if d % 2 == 0 else -1)
                        ans += memo(
                            pos + 1,
                            (mod * 10 + d) % k,
                            next_even_needed,
                            next_diff,
                            tight and d == up,
                            False
                        )
                return ans

            total += memo(0, 0, half, 0, tight, True)
        return total

    # Inclusion-Exclusion principle: High - (Low-1)
    return count_beautiful(high) - count_beautiful(low - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(d² \* k \* d), where d = number of digits (max 10 for 10⁹).  
  - For each even digit-length L (≤ 10), several DP states for mod, diff (= -d..d), even_needed, tight, is_start.
  - Acceptable due to heavy memoization and constraint on digit length.

- **Space Complexity:**  
  O(d \* k \* d) for DP memoization (number of states), negligible extra space for stack because digit count is small.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to return all the beautiful numbers, not just the count?  
  *Hint: Store path/digits in the DP as you recurse, output solutions when at base case.*

- Can the condition be generalized to "even digits - odd digits == C" for any integer C?  
  *Hint: Adjust the diff variable, but counting with constraints becomes more flexible.*

- How does the approach change if k could be greater than 20, or up to 10⁹?  
  *Hint: The DP would use much more memory/time as mod can be large – can you do better, or must you filter after generation?*

### Summary
This problem is a classic example of **digit DP**: dynamic programming over the digits of a number, tracking constraints on digits and combining with number-theoretic properties (like divisibility). The counting pattern used here—DP over digit positions with bound/memoization—is very common for problems about "numbers with digit properties in a range."  
This technique applies to many LeetCode hard problems involving ranges or digit-specific constraints, such as "count of numbers with X digits," "numbers without certain patterns," or "numbers divisible by Y." Mastering digit DP is essential for higher-level interview settings.