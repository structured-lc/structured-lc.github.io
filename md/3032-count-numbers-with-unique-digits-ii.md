### Leetcode 3032 (Easy): Count Numbers With Unique Digits II [Practice](https://leetcode.com/problems/count-numbers-with-unique-digits-ii)

### Description  
Given two positive integers **a** and **b**, count how many integers in the range [a, b] (inclusive) have **all unique digits** (no digit repeats within the number). For example, 123 is valid, 112 is not.

### Examples  

**Example 1:**  
Input: `a = 1, b = 20`  
Output: `19`  
Explanation:  
All numbers from 1 to 20 except '11' have unique digits. Only '11' has repeated digits.

**Example 2:**  
Input: `a = 9, b = 19`  
Output: `10`  
Explanation:  
Numbers 9 through 19: Only '11' is invalid (repeated digit). All others are valid.

**Example 3:**  
Input: `a = 80, b = 120`  
Output: `27`  
Explanation:  
Among 41 numbers (80 to 120), there are 27 numbers with all unique digits and 14 numbers with repeated digits.

### Thought Process (as if you’re the interviewee)  

To solve this problem efficiently for large ranges, we want to avoid brute-forcing through every number from a to b.  
A brute force approach would check every number individually for unique digits, which is inefficient for large ranges.

To optimize, we use the "Digit DP" (digit dynamic programming) technique. The idea is to define a function that counts numbers with unique digits up to a given integer n. If we can do that, our answer for the interval [a, b] becomes:  
count_unique(b) - count_unique(a - 1)

Within count_unique(n):  
- At each digit, we decide which digit to put, keeping track of the digits already used using a bitmask (0-9, so 10 bits).  
- If we reuse a digit, we discard that branch.  
- We need to handle the bounds correctly (whether we can choose < the digit in 'n' at a given place).  
- We memoize state as (pos, mask, tight) where:
  - pos: current position in the string
  - mask: bitmask of used digits
  - tight: true if so far we're the same as the prefix of n (so future digits mustn't exceed n's digits).  
- For leading zeros, usually skip at the enter of dp, or only allow on non-first position.

This lets us count all numbers ≤ n with unique digits, efficiently!

### Corner cases to consider  
- **a > b**: Invalid range – should return 0.
- **a = b**: Single number – check if unique digits or not.
- Range includes numbers with more digits than available unique digits (≥11 digits, can't have all unique digits).
- **Leading zeros:** Not possible in standard integer representation, so ignore.
- Range covers negative numbers: constraints say a, b are positive, so no negatives.
- Very large range, e.g., up to 10⁹.
- Single-digit numbers (trivially all valid).

### Solution

```python
def count_numbers_with_unique_digits(a: int, b: int) -> int:
    # Helper to count unique-digit numbers up to n
    def count_unique(n: int) -> int:
        s = str(n)
        length = len(s)
        
        from functools import lru_cache

        @lru_cache(None)
        def dfs(pos: int, mask: int, tight: bool, started: bool) -> int:
            if pos == length:
                return 1 if started else 0  # Only count numbers that have started (avoid leading zeros)
            total = 0
            # Digits to try: 0 to upper
            upper = int(s[pos]) if tight else 9
            for d in range(0, upper + 1):
                if not started and d == 0:
                    # Still at leading zero (optional for non-strictly positive)
                    total += dfs(pos + 1, mask, tight and d == upper, False)
                else:
                    if (mask & (1 << d)) == 0:
                        total += dfs(pos + 1, mask | (1 << d), tight and d == upper, True)
            return total

        return dfs(0, 0, True, False)
    
    if a > b:
        return 0
    return count_unique(b) - count_unique(a - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(d × 2¹⁰), where **d** is the number of digits in b.  
  - For each position (max 10), and for each bitmask (max 1024), and tight × started (small factor).

- **Space Complexity:**  
  O(d × 2¹⁰ × 2 × 2) due to memoization cache on (pos, mask, tight, started). It does not depend directly on input range size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle numbers in bases other than 10?  
  *Hint: Generalize the mask to cover b possible digits (radix-b).*

- Could we count numbers with exactly k unique digits in a range?  
  *Hint: Add a parameter to dfs for "number of unique digits so far" and only count if at the end we have k.*

- What if we allow leading zeros or negative numbers?  
  *Hint: Adjust constraints in the dp and the valid number check.*

### Summary
This problem uses the **Digit DP** pattern, particularly useful for "count numbers with property P in a range" types where P is about digits and no repetition.  
This pattern is common for digit constraints, palindrome counting, and similar range queries.  
Mastering digit dp helps handle a wide variety of unique-digit and bounding problems efficiently.


### Flashcard
Use digit DP to count numbers with unique digits up to n; answer is count(b) − count(a−1).

### Tags
Hash Table(#hash-table), Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Count Numbers with Unique Digits(count-numbers-with-unique-digits) (Medium)