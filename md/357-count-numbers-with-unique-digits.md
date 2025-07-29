### Leetcode 357 (Medium): Count Numbers with Unique Digits [Practice](https://leetcode.com/problems/count-numbers-with-unique-digits)

### Description  
Given a non-negative integer **n**, count how many numbers exist with unique digits in the range **0 ≤ x < 10ⁿ**.  
A number has **unique digits** if no digit appears more than once in it (e.g., 123 is valid, 121 is not).  
For numbers with more than one digit, leading zeros are not allowed.  

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `91`  
*Explanation: There are 9 one-digit numbers (1–9) and 81 two-digit numbers with unique digits (10, 12, ..., 98). Total: 9 + 81 + 1 (for 0) = 91.*

**Example 2:**  
Input: `n = 1`  
Output: `10`  
*Explanation: The numbers 0–9 all have unique digits. There are 10 total.*

**Example 3:**  
Input: `n = 0`  
Output: `1`  
*Explanation: The only number in the range is 0, which counts as a valid unique-digit number.*

### Thought Process (as if you’re the interviewee)  

- Brute-force approach would be to generate every number in `0 ≤ x < 10ⁿ` and check each for unique digits. This quickly becomes infeasible for large n because the number of combinations grows exponentially.
- Since n ≤ 8, we can instead use a mathematical or combinatorial approach:
    - For k-digit numbers, the first digit (if not single-digit) can be chosen in 9 ways (1–9).
    - Next, there are 9 remaining choices (since zero can now be picked), then 8, etc.
    - The total number of unique-digit numbers is the sum for all digit lengths from 1 to n.
- The final approach is to use a loop to calculate unique numbers for each digit length and accumulate the total, using multiplication for the choices.

### Corner cases to consider  
- n = 0 (output should be 1)
- n = 1 (covers all single-digit numbers 0–9)
- n > 10 (since there are only 10 digits, maximum is for n = 10. For all n > 10, output does not increase.)
- Numbers starting with 0 are only allowed for the single-digit (zero itself), not for multi-digit numbers.
- Large input (e.g., n = 8) should be handled efficiently.

### Solution

```python
def countNumbersWithUniqueDigits(n):
    # Only 1 possibility: 0
    if n == 0:
        return 1

    # Start with 10 for n==1 (0–9)
    total = 10

    # For larger n, compute for 2..n digit length
    unique_digits = 9  # choices for first digit (1-9)
    available = 9      # remaining digits (0-9 excluding used)

    for i in range(2, n + 1):
        unique_digits *= available
        total += unique_digits
        available -= 1  # each time we use a digit, one fewer choice

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
    For each digit length up to n, we do constant-time calculations.
- **Space Complexity:** O(1)  
    No extra data structures used; just integer variables for accumulation.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you account for numbers with unique digits in a different base?  
  *Hint: Adjust the combinatorics for k possible symbols rather than 10.*

- How to modify the code to also list the actual unique-digit numbers within the given range?  
  *Hint: Use backtracking to generate all possible unique-digit numbers.*

- Can you solve the problem by digit-dynamic-programming (DP by digits)?  
  *Hint: Try using DP where state is position, tightness, and mask of used digits.*

### Summary
This solution uses a **permutational counting principle** to efficiently find how many unique-digit numbers exist for a given n. The approach leverages multiplication for positional digit choices, a common pattern for counting distinct possibilities, and is broadly applicable to unique arrangements or permutations problems.