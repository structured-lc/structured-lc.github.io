### Leetcode 902 (Hard): Numbers At Most N Given Digit Set [Practice](https://leetcode.com/problems/numbers-at-most-n-given-digit-set)

### Description  
Given a set of allowed **digits** (as strings) and a number **n**, return how many positive integers ≤ n can be constructed using only the digits in the set. The digits can be used repeatedly and the formed numbers cannot have leading zeros.  
For example, with digits = [“1”, “3”, “5”] and n = 135, valid numbers are 1, 3, 5, 11, 13, ..., etc., as long as they are ≤ 135 and only use those digits.

### Examples  

**Example 1:**  
Input: `digits = ["1","3","5","7"], n = 100`
Output: `20`
*Explanation: All numbers ≤ 100 using only 1,3,5,7: 1,3,5,7,11,13,15,17,31,...,77 (20 in total).*

**Example 2:**  
Input: `digits = ["1","4","9"], n = 1000000000`
Output: `29523`
*Explanation: There are 29523 positive integers ≤ 1,000,000,000 that can be formed using 1,4,9.*

**Example 3:**  
Input: `digits = ["7"], n = 8`
Output: `1`
*Explanation: Only the number 7 can be formed using just 7, and it is ≤ 8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Generate all numbers by recursively appending digits, checking if they are ≤ n. This is extremely inefficient since n can be very large.

- **Optimized approach (Digit DP):**  
  - **Observation:**  
    All numbers shorter than the number of digits in n are automatically valid (since they’re less than n).  
    For numbers with the same length as n, we must check digit by digit to ensure we do not exceed n.
  - **Strategy:**
    1. **Count all numbers of length < len(n):**  
       For length l, there are len(digits)^l such numbers.
    2. **Count numbers with length = len(n):**  
       Use recursion (digit DP): At each position, try all valid digits, being careful not to exceed n.
       Use memoization to avoid recomputation.
  - **Why digit DP?**  
    Because for every digit position, the state is determined by (index in n, is the prefix still equal to n?, have we started the number yet?) so memoization is feasible and efficient.
  - **Space vs. Time:**  
    The recursion depth and state space only depend on the number of digits of n, which is up to 10.

### Corner cases to consider  
- digits set contains "0" (can't be leading digit)
- n is single-digit (small n)
- digits do not include digits extractable from n
- digits contains only one digit
- n is smaller than the smallest digit
- Handling of numbers with leading zeros (shouldn’t count)

### Solution

```python
def atMostNGivenDigitSet(digits, n):
    s = str(n)
    m = len(s)
    digits_int = [int(d) for d in digits]

    # Count numbers with length < len(n)
    total = 0
    for l in range(1, m):
        total += len(digits) ** l

    from functools import lru_cache

    @lru_cache(None)
    def dp(i, is_limit, is_num):
        # i: position we're filling in s
        # is_limit: are we bound by n's digit at this position?
        # is_num: have we started placing digits yet?
        if i == m:
            return int(is_num)  # 1 if we've started and filled something

        res = 0
        if not is_num:
            # we can skip placing, i.e., start from next pos
            res += dp(i + 1, False, False)

        # Try each digit
        up = int(s[i]) if is_limit else 9
        for d in digits_int:
            if d == 0 and not is_num:
                continue  # avoid leading zero   
            if d > up:
                continue  # can't go beyond limit
            res += dp(i + 1, is_limit and (d == up), True)
        return res

    return total + dp(0, True, False)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × len(digits)), where m = # digits in n. There are m positions, and at each branch, up to len(digits) options. Memoization ensures each (i, is_limit, is_num) state is computed only once.
- **Space Complexity:** O(m × 2 × 2) due to the memoization cache (m positions, is_limit and is_num are booleans), plus recursion stack up to m.

### Potential follow-up questions (as if you’re the interviewer)  

- What if certain digits can only be used a limited number of times?  
  *Hint: Track remaining usage count for each digit in state.*

- How would you output all such numbers, rather than just counting them?  
  *Hint: Instead of returning a count at the end of recursion, collect valid numbers into a result list.*

- Can this solution handle extremely large n (with hundreds of digits) efficiently?  
  *Hint: Analyze how state space and transitions scale with input size.*

### Summary
This problem is a classic example of **digit dynamic programming (digit DP)**, which is used for counting or generating numbers with certain properties under upper/lower digit constraints. Recognizing it lets you count efficiently in O(number of digits × set size) time. This pattern is common for number construction, number bounds with custom digit sets, and similar combinatorial counting challenges.


### Flashcard
Use digit DP; count all numbers with fewer digits than n, then for equal-length numbers, build digit by digit without exceeding n.

### Tags
Array(#array), Math(#math), String(#string), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming)

### Similar Problems
