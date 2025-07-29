### Leetcode 1012 (Hard): Numbers With Repeated Digits [Practice](https://leetcode.com/problems/numbers-with-repeated-digits)

### Description  
Given a positive integer **n**, return the number of integers in the range **[1, n]** that have **at least one repeated digit**. In other words, count the numbers ≤ n that do **not** have all unique digits.

Example: For n = 100, count how many numbers ≤ 100 have at least one repeating digit (like 11, 22, etc.).

### Examples  

**Example 1:**  
Input: `n = 20`  
Output: `1`  
*Explanation: Only 11 (≤ 20) has a repeated digit.*

**Example 2:**  
Input: `n = 100`  
Output: `10`  
*Explanation: Numbers with repeated digits ≤ 100 are: 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100. That's 10 numbers.*

**Example 3:**  
Input: `n = 1000`  
Output: `262`  
*Explanation: There are 262 numbers between 1 and 1000 (inclusive) with at least one repeated digit.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  - Iterate from 1 to n.
  - For each number, check if any digit is repeated (convert to string or use a digit set).
  - Count those with repeated digits.
  - **Problem:** For n up to 10⁹, this will time out (too slow).
  
- **Optimized idea:**  
  - Instead of counting numbers with repeated digits, it's easier to:
    - Count numbers with ALL UNIQUE digits (call this "good" numbers).
    - The answer will be **n - count\_unique\_digit\_numbers**.
  - Use **permutation and digit DP**:
    - For numbers with unique digits, use combinatorics: for k-digit numbers,
      choose non-repeating digits from 10 possible digits (no leading zeros).
    - For numbers the same length as n, use a recursive function (DFS or DP)
      to avoid counting numbers greater than n and to carefully count digits without repetition.
  - The digit DP must handle:
    - Mask to track which digits are used (bitmask).
    - Are we at a "tight" position (i.e., constrained by n's digits)?
    - Have we started leading digits (because prefix zeros aren't allowed).

### Corner cases to consider  
- n = 1 (single digit)
- All digits the same (like 11, 111)
- n < 10 (no repeated digits possible)
- Input where all numbers have unique digits (e.g., n = 9)
- The upper limit (n = 10⁹, check performance)
- Numbers with leading zeros (must be avoided in counting)

### Solution

```python
def numDupDigitsAtMostN(n: int) -> int:
    """
    Counts how many numbers ≤ n have at least one repeated digit.
    Approach: Count the numbers with all unique digits (without repetition),
    and subtract from n.
    """

    from math import factorial

    def count_unique_digits(n: int) -> int:
        # Helper function: Counts numbers with UNIQUE digits in [1, n]
        digits = list(map(int, str(n)))
        n_digits = len(digits)
        res = 0

        # Count numbers with k digits (k < n_digits)
        for k in range(1, n_digits):
            # First digit: 1-9 (can't be 0)
            count = 9
            # Remaining k-1 digits: pick from (9, 8, ..., 10-(k-1))
            curr = 9
            for i in range(1, k):
                count *= curr
                curr -= 1
            res += count

        # Now count numbers with same number of digits as n
        used = set()
        for i, d in enumerate(digits):
            for x in range(0 if i else 1, d):
                if x in used:
                    continue
                # Remaining positions: (n_digits - i - 1)
                remain = 10 - (i + 1)
                cnt = 1
                curr = remain
                for j in range(i+1, n_digits):
                    cnt *= curr
                    curr -= 1
                res += cnt
            if d in used:
                break
            used.add(d)
        return res

    # The final answer is total numbers minus unique-digit numbers
    unique_digit_count = count_unique_digits(n)
    return n - unique_digit_count

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀n × log₁₀n)  
  - log₁₀n for number of digits,  
  - For each digit, constant work (permutation),  
  - No need to check each number individually.
- **Space Complexity:** O(log₁₀n)  
  - For recursion/stack and used set per digit count.  
  - No extra storage based on n's value.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is extremely large (10¹⁸)?  
  *Hint: Can you use memoization with DP and bitmasking to avoid recomputation?*

- How would you list (output) all numbers ≤ n with repeated digits instead of just counting them?  
  *Hint: Backtrack through possible positions and collect those with repeated digits.*

- What changes if leading zeros are allowed?  
  *Hint: Permutations at each position become easier, but may need more adjustment for the count.*

### Summary
This problem is a classic example of **digit DP** and **combinatorics**: instead of brute-force enumeration, we "count by construction" the valid (non-repeating) numbers and take the complement. The pattern and reasoning are common for problems about digits/statistics within numbers, and can be extended to problems like "numbers without a certain digit", "numbers with K unique digits", or even general constraints on digit usage. This approach is much faster and is key for large input sizes.