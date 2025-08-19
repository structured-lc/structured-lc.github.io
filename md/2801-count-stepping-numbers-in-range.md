### Leetcode 2801 (Hard): Count Stepping Numbers in Range [Practice](https://leetcode.com/problems/count-stepping-numbers-in-range)

### Description  
Given two positive integers **low** and **high** represented as strings, find the number of **stepping numbers** in the inclusive range [low, high].  
A **stepping number** is an integer where each adjacent pair of digits has an absolute difference of exactly 1.  
For example, 123 and 434 are stepping numbers (adjacent differences are all 1), but 145 and 650 are not.  
Return the count **modulo 10⁹ + 7**.  
A number should not have leading zeros, except zero itself.

### Examples  

**Example 1:**  
Input: `low = "10", high = "21"`  
Output: `3`  
*Explanation: The stepping numbers between 10 and 21 are: 10, 12, 21.*

**Example 2:**  
Input: `low = "0", high = "0"`  
Output: `1`  
*Explanation: 0 is a stepping number by definition.*

**Example 3:**  
Input: `low = "100", high = "130"`  
Output: `2`  
*Explanation: The stepping numbers are: 121, 123.*

### Thought Process (as if you’re the interviewee)  

First, brute-force is not feasible here. Simply iterating from **low** to **high** and checking for stepping numbers would take too long, since the limits (`high` and `low` are strings, not ints!) imply numbers with up to 100 digits.  
What is a **stepping number**? If at each step, the absolute difference between adjacent digits is 1, it's valid.  
To efficiently count them in range, use **digit dynamic programming (digit DP)**:  
- For a given upper bound, count all stepping numbers ≤ `X`.  
- Do this once with `high`, once with `low - 1`, and subtract the results to get the answer for [low, high].  
- Main DP state: current position, previous digit, leading zeros, and tight upper bound.

Optimization trade-off:  
- Brute-force: O(10^100) — not feasible.  
- Digit DP: O(digits × 10 × 2 × 2) — feasible, as digits ≤ 100.

### Corner cases to consider  
- Single-digit range, including `'0'` (should count 0 itself).
- Ranges where **low > high**: must handle correctly (result 0).
- Large ranges (low and high with many digits).
- Numbers with leading zeros, which aren’t allowed except for `'0'`.
- Input where low and high are both stepping numbers.

### Solution

```python
MOD = 10**9 + 7

from functools import cache

class Solution:
    def countSteppingNumbers(self, low: str, high: str) -> int:
        # Helper to count stepping numbers ≤ bound (inclusive)
        def count(bound: str) -> int:
            n = len(bound)

            @cache
            def dfs(pos: int, prev_digit: int, leading_zero: bool, tight: bool) -> int:
                if pos == n:
                    # At least one non-leading digit placed
                    return 0 if leading_zero else 1

                res = 0
                up = int(bound[pos]) if tight else 9

                for d in range(0, up + 1):
                    is_leading = leading_zero and d == 0
                    if prev_digit == -1 or is_leading:
                        # Any digit allowed if leading, or first nonzero digit
                        res += dfs(pos + 1, d if not is_leading else -1, is_leading, tight and (d == up))
                    else:
                        if abs(d - prev_digit) == 1:
                            res += dfs(pos + 1, d, False, tight and (d == up))
                return res % MOD

            return dfs(0, -1, True, True)

        # Compute (all step nums ≤ high) - (all ≤ low-1)
        high_count = count(high)
        # Convert low-1 to string (keep leading zeros if any)
        # but careful if low is '0'
        low_minus_one = str(int(low) - 1) if int(low) > 0 else '0'
        # If low == '0', avoid negative numbers
        low_count = count(low_minus_one)

        return (high_count - low_count + MOD) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d × 10 × 2 × 2), where d is the number of digits in high. Each state is (position, prev_digit, leading_zero, tight), totaling <= 100 × 12 × 2 × 2 = around 5,000 states per call (efficient).
- **Space Complexity:** O(d × 12 × 2 × 2) for recursion + memoization cache. Strings processed as input, negligible extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual list of stepping numbers instead of just the count?  
  *Hint: Modify the recursion to collect numbers when hitting the base case.*

- How would you solve it without recursion?  
  *Hint: Consider iterative DP for less stack usage.*

- How would the approach differ if leading zeros were allowed (except as prefix)?  
  *Hint: Adjust DP to always allow zeros at any position.*

### Summary
This problem uses the **Digit DP** technique: counting special numbers in a range using recursive (with memoization) dynamic programming on digit positions. The computation is split into prefix sums (`count(≤high)` minus `count(≤low-1)`), which is a very common trick for digit-type problems. This pattern also appears in "Count numbers with certain digit/property," "Sum of digits in range," and related integer range problems.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Stepping Numbers(stepping-numbers) (Medium)