### Leetcode 2719 (Hard): Count of Integers [Practice](https://leetcode.com/problems/count-of-integers)

### Description  
Given two numeric strings **num1** and **num2**, and two integers **min_sum** and **max_sum**, count how many integers **x** are in the range **num1 ≤ x ≤ num2** such that the **sum of digits of x** is between **min_sum** and **max_sum** (inclusive).

This is a classic digit DP problem: brute forcing all possible numbers in the range is not feasible because both the range and digit sums can get large. Instead, we must efficiently count valid numbers using dynamic programming that walks through each digit and accumulates choices.

### Examples  

**Example 1:**  
Input: `num1="1", num2="5", min_sum=1, max_sum=5`  
Output: `5`  
*Explanation: All numbers 1, 2, 3, 4, 5 have digit sums between 1 and 5 (inclusive).*

**Example 2:**  
Input: `num1="10", num2="20", min_sum=1, max_sum=2`  
Output: `2`  
*Explanation: Only 10 (1+0=1) and 11 (1+1=2) are valid between 10 and 20.*

**Example 3:**  
Input: `num1="100", num2="200", min_sum=1, max_sum=5`  
Output: `6`  
*Explanation: Numbers 100 (1+0+0=1), 101 (1+0+1=2), 102 (1+0+2=3), 103 (1+0+3=4), 104 (1+0+4=5), and 110 (1+1+0=2) are valid (there are 6 of them in this sum range).*

### Thought Process (as if you’re the interviewee)  
Brute-force would mean checking all numbers x where num1 ≤ x ≤ num2, but that's too slow for long inputs.

Instead, this is a textbook use-case for **digit dynamic programming** (digit DP):

- We want to "count" numbers between **num1** and **num2** where their digit sum is in a given range.
- We can model the count as a function **count(num, min_sum, max_sum):** number of numbers ≤ num with the digit sum in [min_sum, max_sum].
- To get [num1, num2], count for num2 and subtract count for num1-1.

The digit DP recursion goes over each digit position, tracks the current sum and whether we're still at the upper bound. Memoization is essential for performance.

- State: (pos, curr_sum, tight)
    - `pos`: current index in the string
    - `curr_sum`: sum of digits chosen so far
    - `tight`: are we still on the upper-bound prefix (must not exceed the current digit in num); when false, any digit 0–9 allowed

At the last position, if the sum is in the valid range, count it.

### Corner cases to consider  
- num1 == num2 (single number range)
- Leading zeros: Inputs don't contain them, but recursive calls can generate them (smallest numbers)
- min_sum = 0, max_sum = large (all numbers valid)
- num1 = "0"
- num1 > num2 (invalid input, but problem likely guarantees num1 ≤ num2)
- min_sum > max_sum (no valid numbers)
- When num1 is "1" (no lower numbers), need to handle num1-1 carefully

### Solution

```python
MOD = 10**9 + 7

def count(num: str, min_sum: int, max_sum: int) -> int:
    from functools import lru_cache

    n = len(num)

    @lru_cache(maxsize=None)
    def dp(pos, curr_sum, tight):
        # At end of the digits:
        if pos == n:
            return 1 if min_sum <= curr_sum <= max_sum else 0
        
        res = 0
        
        lo = 0
        hi = int(num[pos]) if tight else 9
        
        for d in range(lo, hi+1):
            # If tight, next_tight keeps tight only when d == hi
            next_tight = tight and (d == hi)
            res += dp(pos + 1, curr_sum + d, next_tight)
            res %= MOD
        return res

    return dp(0, 0, True)

def decrement_str(num: str) -> str:
    # Helper to compute num-1 as a string, respecting leading zeros.
    # Used for inclusive bounds in range.
    x = list(num)
    i = len(x) - 1
    while i >= 0 and x[i] == '0':
        x[i] = '9'
        i -= 1
    if i >= 0:
        x[i] = str(int(x[i]) - 1)
    # Remove leading zeroes if necessary (not for padding)
    return ''.join(x).lstrip('0') or '0'

def count_of_integers(num1: str, num2: str, min_sum: int, max_sum: int) -> int:
    # Pad num1 with leading zeros to match num2's length
    if len(num1) < len(num2):
        num1 = '0' * (len(num2) - len(num1)) + num1
        
    # Count numbers ≤ num2, minus numbers ≤ num1-1
    cnt2 = count(num2, min_sum, max_sum)
    num1m1 = decrement_str(num1)
    # Pad num1m1 if needed (after leading zero strip)
    if len(num1m1) < len(num2):
        num1m1 = '0' * (len(num2) - len(num1m1)) + num1m1
    cnt1 = count(num1m1, min_sum, max_sum)
    return (cnt2 - cnt1 + MOD) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(L × S × 2 × 10),  
  where L = max length of num2, S = max_sum, 2 for tight / non-tight, 10 for each digit 0–9. This is efficient for reasonable constraints.

- **Space Complexity:**  
  O(L × S × 2), for the DP memoization table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if min_sum or max_sum can be negative or very large?  
  *Hint: Think about how DP size or bounds are affected and whether it's feasible to represent all states.*

- How would you adapt the approach if the question asked for numbers whose digit product is in a range, instead of digit sum?  
  *Hint: DP state would now have to track product, which blows up in size; is that feasible or can you prune impossible states?*

- How would you modify the approach for numbers with specific digit patterns (e.g., all even digits, palindrome)?  
  *Hint: Add appropriate state parameters to the DP (e.g., is_palindrome, is_even), or preprocess the possibilities.*

### Summary
This problem uses the **digit dynamic programming** pattern—a classic for counting or optimizing over number ranges with digit-based properties. Digit DP efficiently traverses possible digit-choices while reusing subproblems via memoization. This idea recurs in many Leetcode Hard problems (e.g., numbers without consecutive ones, at most k non-zero digits, etc). Understanding "digit DP" is vital for tackling a broad class of combinatorial counting and digit restriction problems.