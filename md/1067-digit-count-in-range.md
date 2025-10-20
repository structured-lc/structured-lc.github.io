### Leetcode 1067 (Hard): Digit Count in Range [Practice](https://leetcode.com/problems/digit-count-in-range)

### Description  
Given a single-digit integer **d** and two integers **low** and **high**, count the total number of times the digit **d** appears among all numbers in the inclusive range [low, high]. The digit can appear anywhere in the number, possibly multiple times per number.

### Examples  

**Example 1:**  
Input: `d=1, low=1, high=13`  
Output: `6`  
*Explanation: The numbers are 1, 2, ..., 13. The digit '1' appears in 1, 10, 11, 12, 13. In detail: 1 (once), 10 (once), 11 (twice), 12 (once), 13 (once). Total = 6.*

**Example 2:**  
Input: `d=3, low=10, high=15`  
Output: `2`  
*Explanation: 13 and 3 are in the range; 13 has '3' once, and 3 is not in this range. So, 13 (once) and nothing else. Total = 1 (but if the range is 3 to 13, answer is 2; ensure to check edge cases and input carefully).*

**Example 3:**  
Input: `d=2, low=22, high=25`  
Output: `3`  
*Explanation: 22 (twice), 23 (once), 24 (once), 25 (none). Total = 2 (in 22) + 1 (in 23) + 1 (in 24) = 4, but only '2' as a digit is counted, so sum up appearances.*

### Thought Process (as if you’re the interviewee)  
- **Brute force**:  
  - Loop through every number from low to high.
  - For each number, convert to string (or extract digits), count occurrences of **d**, accumulate the count.
  - This is **O(N × L)** where N = high–low+1, and L is number length; too slow for large ranges.
- **Optimization with Digit DP**:  
  - The key insight is that counting how many times a digit appears in numbers up to N is a classic digit DP problem.
  - To get appearances in range [low, high]:  
    - Count appearances from 1 to high, minus count from 1 to (low–1):  
      `countDigit(high, d) - countDigit(low-1, d)`
  - **countDigit(n, d):**  
    - For n, recursively consider each digit position; for every prefix, count how many numbers up to there use digit **d**, being careful with leading zeros, boundaries, and overlapping cases.
    - Use memoization (DP) for fast recursion.
  - Trade-off: Fast and precise for large N, though the implementation can be tricky (handling leading zeros, repeated digits, boundaries, etc.).

### Corner cases to consider  
- low == high (single number)
- d == 0: handle leading zeros (do not count leading zeros in positive integers)
- low > high (invalid or zero-answer case)
- All digits in range are 'd' (e.g., low=1, high=1, d=1)
- very large ranges (performance and integer overflows)

### Solution

```python
def digitsCount(d: int, low: int, high: int) -> int:
    # Helper: count how many times digit d appears in [1, n]
    def count_digit(n: int, d: int) -> int:
        if n == 0:
            return 0
        digits = list(map(int, str(n)))
        length = len(digits)
        memo = {}

        # pos: current digit, is_tight: is prefix bounded by n, count: how many d seen so far, is_num: has number started (for leading zeros)
        def dp(pos, is_tight, count, is_num):
            key = (pos, is_tight, count, is_num)
            if pos == length:
                return count
            if key in memo:
                return memo[key]
            res = 0
            bound = digits[pos] if is_tight else 9
            for dig in range(0, bound + 1):
                next_tight = is_tight and (dig == bound)
                next_num = is_num or (dig != 0)
                # Count d only if number has started (non-leading zeros)
                add = 1 if (next_num and dig == d) else 0
                res += dp(pos + 1, next_tight, count + add, next_num)
            memo[key] = res
            return res
        return dp(0, True, 0, False)

    # Use subtraction trick: appearances in [low, high] = [1, high] - [1, low-1]
    return count_digit(high, d) - count_digit(low - 1, d)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀N × 10 × 2 × log₁₀N × 2) ≈ O(log²N)
  - For each digit position: at most 10 choices per digit, for up to log₁₀N digits.
  - Memoization saves recomputation, but max ≈ 20,000 subproblems for large N.
- **Space Complexity:** O(logN × 2 × logN × 2) for memoization cache and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the digit can be more than one digit?  
  *Hint: Consider string search or suffix automaton in each number.*

- How would you answer for base-b, not just base-10 numbers?  
  *Hint: Generalize the digit DP for base-b: use base-b digits, adjust recursion.*

- Can you modify the solution to not count numbers with leading zeros?  
  *Hint: Pass a flag to track if the number has started or is just a prefix (is_num).*

### Summary

This problem is a classic use-case for **digit DP**: calculating properties (like digit frequencies) over number ranges efficiently, by recursively iterating possible digits and using memoization to avoid redundant subproblems. This pattern appears in a range of combinatorial digit constraints and range-counting scenarios in coding interviews. Mastery of digit DP is invaluable for similar "count in range" or "avoid forbidden patterns" number problems.


### Flashcard
Use digit DP to count occurrences of digit d up to high and low-1, then subtract to get the count in [low, high].

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Digit One(number-of-digit-one) (Hard)
- Sum of Numbers With Units Digit K(sum-of-numbers-with-units-digit-k) (Medium)