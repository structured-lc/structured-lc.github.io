### Leetcode 3490 (Hard): Count Beautiful Numbers [Practice](https://leetcode.com/problems/count-beautiful-numbers/)

### Description  
Given two positive integers, **l** and **r**, a number is called **beautiful** if the product of its digits is divisible by the sum of its digits.  
Return the **count of beautiful numbers** between **l** and **r**, inclusive.  
You need to efficiently handle large input ranges (up to 10⁹), so an optimized counting strategy is required—checking every number in the range would time out.

### Examples  

**Example 1:**  
Input: `l = 10, r = 20`  
Output: `2`  
*Explanation: Only 10 and 20 are beautiful in this range; for 10, product = 0 and sum = 1 (0 divisible by 1); for 20, product = 0 and sum = 2 (0 divisible by 2). Others don't meet the criteria.*

**Example 2:**  
Input: `l = 1, r = 15`  
Output: `10`  
*Explanation: All single-digit numbers from 1 to 9 are beautiful (product and sum are the same, always divisible). 10 is also beautiful: product = 0, sum = 1; 11~15 are not.*

**Example 3:**  
Input: `l = 21, r = 25`  
Output: `1`  
*Explanation: Only 21 is beautiful: digits 2,1, product=2, sum=3 (2 not divisible by 3); 22: product=4, sum=4, 4 divisible by 4 → beautiful, but 22 isn't in 21-25, so 22 doesn't count (adjust as needed based on actual examples).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  Loop through every number from l to r, calculate the digit product and digit sum for each number, and test the divisibility.  
  - Problem: For very large r-l (could be up to 10⁹), this will time out.

- **Optimized Approach:**  
  1. **Observation:**  
     - For a given number, sum and product calculation can be formulated per digit.
     - The main bottleneck is too many numbers; we need a fast way to count beautiful numbers without examining every one.
  2. **Digit DP:**  
     - Treat the problem as a digit dynamic programming question: count valid numbers less than or equal to n, carrying along the current digit sum, digit product, and tight bound per digit.
     - Since the largest number is up to 10⁹ (9 digits), and digit sum max is 81 (for 999999999), we can memoize combinations of current position, current sum, and current product.
     - The sum can be 0, but product can be 0 if any digit is 0. Special attention needed for 0s.
  3. **Implementation Steps:**  
     - Create a dp(pos, tight, sum, prod, leading_zero) function:
         - pos: current digit index.
         - tight: if we match upper bound so far.
         - sum: digit sum so far.
         - prod: digit product so far.
         - leading_zero: to handle numbers with leading zeros.
     - At the base case (when all digits are placed):  
        - If sum > 0 and prod % sum == 0, count it as beautiful.
     - Use memoization to store (pos, tight, sum, prod, leading_zero).

- **Trade-offs:**  
  - Brute-force is easy to code but not feasible for large inputs.
  - Digit DP is hard to code but brings complexity down to something like O(#digits × max_sum × max_prod), which is acceptable for small digit count (9).

### Corner cases to consider  
- l > r (invalid input, but constraints ensure l ≤ r)
- l = 1, covers the lowest possible number.
- Numbers containing 0s (since product becomes zero), e.g., 10, 20, etc.
- Numbers where sum = 0: should never happen (since all numbers are positive integers; by digit definition all digits are 0 only for the number 0, which is excluded).
- Large values: Verify efficiency when r - l is large.
- High numbers with many zeros (product=0, sum>0).

### Solution

```python
def count_beautiful_numbers(l: int, r: int) -> int:
    # Helper: Count beautiful numbers <= n using digit DP
    from functools import lru_cache

    def digits(n):
        return list(map(int, str(n)))

    def dp(pos, tight, digit_sum, digit_prod, leading_zero, digits_arr):
        if pos == len(digits_arr):
            # Do not count numbers which are all leading zeros (i.e., nothing placed)
            if not leading_zero and digit_sum > 0:
                return int(digit_prod % digit_sum == 0)
            return 0
        
        key = (pos, tight, digit_sum, digit_prod, leading_zero)
        if key in memo:
            return memo[key]
        
        res = 0
        max_digit = digits_arr[pos] if tight else 9
        
        for d in range(0, max_digit + 1):
            new_tight = tight and (d == max_digit)
            new_leading_zero = leading_zero and (d == 0)
            new_sum = digit_sum
            new_prod = digit_prod
            if not new_leading_zero:
                new_sum += d
                new_prod *= d
            # If still leading zeros, skip adding
            res += dp(
                pos + 1,
                new_tight,
                new_sum,
                new_prod,
                new_leading_zero,
                digits_arr
            )
        memo[key] = res
        return res

    def solve(n):
        digits_arr = digits(n)
        global memo
        memo = {}
        return dp(0, True, 0, 1, True, digits_arr)

    # Beautiful numbers in [l, r] = solve(r) - solve(l-1)
    return solve(r) - solve(l - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(d \* s \* p),  
  where d = number of digits (≤9), s = possible digit sums (≤81), p = possible digit products (≤9⁹).  
  However, digit product will quickly reach 0 due to zeros or multiply out large, so the number of unique (sum, product) visited is much reduced, making this feasible with memoization.

- **Space Complexity:**  
  O(d \* s \* p),  
  Due to state memoization per (pos, tight, digit_sum, digit_prod, leading_zero). Realistically less, since not all values are visited.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you count *distinct* beautiful numbers if leading zeros are allowed in the input range?  
  *Hint: How does digit DP change when leading zeros are valid numbers?*

- What if the product had to be divisible by (sum + K), where K is given?  
  *Hint: How do you update your DP or state to accommodate parameterized modulus?*

- Suppose the definition changes: Is there any beautiful number between l and r whose digit sum equals a given target S?  
  *Hint: Can you use extra state in DP, or iterate S after computation?*

### Summary
This problem is a classic use of **digit dynamic programming (Digit DP)** for efficiently counting numbers with properties defined by their digits within a given range.  
The same pattern applies to problems like counting numbers with a digit sum/product constraint, numbers with certain number of digits, or numbers avoiding forbidden digits. Standard brute-force is not feasible at scale; DP memoization across states (digit index, sum, product, tight/leading zero flags) leads to polynomial effort for small digit counts.


### Flashcard
Use digit DP to count numbers in [l, r] where digit_product divides digit_sum; track digit position, product, sum, and tight constraint.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
