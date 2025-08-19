### Leetcode 3519 (Hard): Count Numbers with Non-Decreasing Digits  [Practice](https://leetcode.com/problems/count-numbers-with-non-decreasing-digits)

### Description  
Given two numbers **l** and **r** (as strings, since they can be very big), and an integer **b** for the base (2 ≤ b ≤ 10), return the count of integers in the inclusive range [l, r] whose digits, when written in base **b**, are **non-decreasing**—that is, for every adjacent pair of digits, the next digit is ≥ the previous digit.  
Return the result modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `l = "23", r = "28", b = 8`  
Output: `3`  
*Explanation: The numbers from 23 to 28 in base 8:*
- 23 = 27₈ → 2,7 (non-decreasing)
- 24 = 30₈ → 3,0 (**not** non-decreasing)
- 25 = 31₈ → 3,1 (**not** non-decreasing)
- 26 = 32₈ → 3,2 (**not** non-decreasing)
- 27 = 33₈ → 3,3 (non-decreasing)
- 28 = 34₈ → 3,4 (non-decreasing)  
*Only 27₈, 33₈, and 34₈ are non-decreasing. Output is 3.*

**Example 2:**  
Input: `l = "2", r = "7", b = 2`  
Output: `4`  
*Explanation: Numbers 2,3,4,5,6,7 in base 2 are 10,11,100,101,110,111. Non-decreasing: 11, 111. Output: 2 (if leading zeros not counted), but include all valid non-decreasing representations within range.*

**Example 3:**  
Input: `l = "1", r = "100", b = 10`  
Output: `54`  
*Explanation: All numbers from 1 to 100. Single-digit numbers are obviously non-decreasing. For two digits ab, a ≤ b.*

### Thought Process (as if you’re the interviewee)  
Start by noting a brute-force approach is to:
- Iterate from l to r.
- For each, convert to base b.
- Check if digits are non-decreasing.

But l, r can be very big (up to 10¹⁸), so brute-force isn’t feasible.  
This is a classic **digit DP** question:
- For a given upper bound, count all non-decreasing numbers less than or equal to the bound.
- Use DP to memoize states: position in digit, the last digit used (since next must be ≥), and a tight/limit flag.

For range [l, r], answer = count(≤ r) − count(< l).  
But because input is a string, count(≤ l − 1) is used for inclusive.

Each DP state:
- i: position/index in number
- last_digit: previous digit used (for base b, 0 ≤ d < b)
- tight: if current prefix matches upper limit
- num_started: if we have started picking any non-zero digits (avoid leading zeros for dp constraints)

**Trade-off:**  
This method is efficient even for big numbers, works up to 100 digits (time: O(n × b × n) or O(digits × b) for b ≤ 10).

### Corner cases to consider  
- l = r (single number)
- l = "0"
- Base = 2 (smallest base)
- Leading zeros (don’t allow leading zeros to be counted as valid non-decreasing digits)
- Numbers with only one digit
- l and r at edges of base, e.g., l = "8", r = "15", b = 8
- Big number input (string overflows integer)

### Solution

```python
MOD = 10 ** 9 + 7

def countNumbersWithNonDecreasingDigits(l: str, r: str, b: int) -> int:
    from functools import lru_cache

    # Helper: convert decimal string to digits in base b (MSD to LSD)
    def dec_to_base(num, b):
        n = int(num)
        res = []
        if n == 0:
            return [0]
        while n > 0:
            res.append(n % b)
            n //= b
        return res[::-1]  # Most significant digit first

    # Digit DP core: count numbers ≤ digits (given as array)
    def dp(digits):
        n = len(digits)
        @lru_cache(None)
        def f(pos, last, tight, started):
            if pos == n:
                return int(started)  # only count if at least one digit picked
            ans = 0
            upper = digits[pos] if tight else b - 1
            for d in range(0, upper + 1):
                # if not started, skip leading zeros (unless d=0)
                if not started and d == 0:
                    ans = (ans + f(pos+1, 0, tight and (d == upper), False)) % MOD
                else:
                    if not started or d >= last:
                        ans = (ans + f(pos+1, d, tight and (d == upper), True)) % MOD
            return ans

        return f(0, 0, True, False)

    def decrement(num_str, b):
        # Return string num_str - 1 as string for non-negative num_str
        n = int(num_str)
        return str(max(n - 1, 0))

    L = dec_to_base(decrement(l, b), b)
    R = dec_to_base(r, b)
    return (dp(tuple(R)) - dp(tuple(L))) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d × b) per query, where d is the number of digits in base b (max ≈ 60), and b ≤ 10. Memoization can be at most d × b × 2 × 2.
- **Space Complexity:** O(d × b), for memoization table and digit storage.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize for strictly increasing digits?
  *Hint: Adjust the DP’s valid transition to require d > last_digit instead of d ≥ last_digit.*
- What if digits can be decreasing, or a custom comparison function is given?
  *Hint: Change DP constraint logic; pass in a comparator or encode decrease direction.*
- How to optimize if b is very large (arbitrary base)?
  *Hint: DP becomes infeasible, need new combinatorial or mathematical insights.*

### Summary
This problem is a classic **Digit DP** application: counting numbers with given digit constraints in a range.  
It leverages recursion with memoization over digit positions, tight/limit propagation, and required digit ordering.  
This pattern appears in problems that ask for counting numbers with certain digit properties—common in “number of X in [a,b]” queries—often requiring DP on digits for efficiency.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Count of Integers(count-of-integers) (Hard)
- Number of Beautiful Integers in the Range(number-of-beautiful-integers-in-the-range) (Hard)