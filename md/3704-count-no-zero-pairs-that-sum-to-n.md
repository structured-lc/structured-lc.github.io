### Leetcode 3704 (Hard): Count No-Zero Pairs That Sum to N [Practice](https://leetcode.com/problems/count-no-zero-pairs-that-sum-to-n)

### Description  
Given an integer n, count the number of pairs of positive integers (a, b) such that:
- a + b = n
- Both a and b are **no-zero integers** (i.e., their decimal representation does **not** contain the digit 0)

Return the number of such pairs.

The tricky part is efficiently counting valid pairs for large n, when brute-force isn't feasible.

### Examples  

**Example 1:**  
Input: `n = 11`  
Output: `8`  
*Explanation: Possible pairs (a, b) with no zeros in a or b: (2,9), (3,8), (4,7), (5,6), (6,5), (7,4), (8,3), (9,2). (1,10) and (10,1) are invalid because 10 has a zero.*

**Example 2:**  
Input: `n = 100`  
Output: `0`  
*Explanation: All valid pairs must be positive integers without zero in their digits, but every possible combination includes at least one number with a zero (e.g., 1 + 99 = 100, but 10, 20, … all have zeros), so count is 0.*

**Example 3:**  
Input: `n = 22`  
Output: `16`  
*Explanation: Valid pairs are (2,20), (3,19), (4,18), (5,17), (6,16), (7,15), (8,14), (9,13), (13,9), (14,8), (15,7), (16,6), (17,5), (18,4), (19,3), (20,2). However, we must exclude pairs where either number contains 0, so actual answer involves checking each to ensure neither has zero.*

### Thought Process (as if you’re the interviewee)  

First, the brute-force idea:  
- Iterate over a = 1 to n-1.
- Let b = n - a.
- For each pair (a, b), check if neither a nor b contains the digit 0.
- Increment count if valid.

But for large n (up to 10¹⁸), this is too slow.

**Optimization ideas:**  
- We need a way to count, not enumerate, valid (a, b), where both numbers do **not** contain zero, and a + b = n.
- This is a classic **Digit DP** problem:  
  - We process n digit by digit, simulating addition to split it as (a, b).
  - At each digit, try all combinations of non-zero digits for a and b such that their sum (with possible carry) gives the corresponding digit in n.
  - Use memoization to store already computed states.

**Trade-offs:**  
- Brute force is easy but slow (O(n)).
- Digit DP is more complex but efficient: O(#digits × #carry states × #isLeadingZero states), manageable since n has ≤18 digits.

**Choose digit DP for efficiency on large n.**

### Corner cases to consider  
- n is small (n < 10): Needs correct handling; only few possible pairs.
- n has zeros in its digits (may affect carry/valid digit consideration).
- Cases where n = 10ᵏ (large number, but solution may be zero).
- Only one valid pair, e.g., n = 2.

### Solution

```python
from functools import lru_cache

def countNoZeroPairs(n: int) -> int:
    s = str(n)
    length = len(s)
    
    # dp(idx, carry, tight)
    # idx: current digit index
    # carry: 0 or 1 (carry from previous addition)
    # tight: whether we are at the upper bound (1 means all digits chosen so far match n)
    @lru_cache(maxsize=None)
    def dp(idx, carry, tight):
        if idx == length:
            # If we've used all digits and no carry, it's a valid split
            return 1 if carry == 0 else 0
        
        res = 0
        limit = int(s[idx]) if tight else 9
        # Both digits for a and b must be 1-9 (no zeros)
        for da in range(1, 10):
            for db in range(1, 10):
                total = da + db + carry
                this_digit = total % 10
                new_carry = total // 10
                if this_digit > limit:
                    continue
                # If tight, we can't exceed current digit of n
                if tight and this_digit != limit:
                    continue
                # Advance to next digit
                next_tight = tight and (this_digit == limit)
                res += dp(idx + 1, new_carry, next_tight)
        return res
    
    return dp(0, 0, True)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d × 2 × 2 × 9²), where d is the number of digits in n. For each digit, 2 possible carries, 2 possible tight constraints, and 9 options for each digit of a and b.
- **Space Complexity:** O(d × 2 × 2), memoization stores per state (digit, carry, tight).

### Potential follow-up questions (as if you’re the interviewer)  

- What if “no-zero” constraint allowed zeros anywhere but the first digit?
  *Hint: Could you generalize your digit selection condition?*

- How to count ordered (a, b) pairs versus unique pairs (i.e. a ≤ b)?
  *Hint: Where can you add a constraint to the counting in your DP?*

- If the sum is not n but n or fewer, how would you adapt your approach?
  *Hint: Would you need a different DP, or can you sum over multiple end states?*

### Summary
This is a classic **Digit DP** problem, where you process numbers digit-by-digit using recursion and memoization, modeling constraints (here, no zeros, sum to n, handle carry). This technique is broadly applicable to counting problems involving digit-based rules, like “numbers with certain digit patterns” or “numbers matching conditions under arithmetic.”

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
