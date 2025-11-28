### Leetcode 3448 (Hard): Count Substrings Divisible By Last Digit [Practice](https://leetcode.com/problems/count-substrings-divisible-by-last-digit)

### Description  
Given a string `s` containing digits (`'0'`-`'9'`), count the number of substrings such that the value of the substring as an integer is **divisible by its last digit (if last digit ≠ 0)**.  
- For each substring, interpret it as a decimal number (leading zeros allowed).
- If the last digit is `0`, ignore that substring (since division by zero is undefined).
- Otherwise, the substring is counted if it is divisible by its last digit.

### Examples  

**Example 1:**  
Input: `s = "123"`  
Output: `4`  
*Explanation: Substrings:*  
- "1" (1 % 1 = 0, valid)  
- "2" (2 % 2 = 0, valid)  
- "3" (3 % 3 = 0, valid)  
- "12" (last digit 2, 12 % 2 = 0, valid)  
- "23" (last digit 3, 23 % 3 = 2, invalid)  
- "123" (last digit 3, 123 % 3 = 0, valid)  
**Total valid substrings: 4**

**Example 2:**  
Input: `s = "105"`  
Output: `3`  
*Explanation:*
- "1" (1 % 1 = 0, valid)  
- "0" (last digit is 0 – invalid, skip)  
- "5" (5 % 5 = 0, valid)  
- "10" (last digit 0 – invalid, skip)  
- "05" (last digit 5, 5 % 5 = 0, valid; note: leading zero is allowed)  
- "105" (last digit 5, 105 % 5 = 0, valid)  
**Total valid substrings: 3**

**Example 3:**  
Input: `s = "232"`  
Output: `4`  
*Explanation:*  
- "2" (2 % 2 = 0, valid)  
- "3" (3 % 3 = 0, valid)  
- "2" (2 % 2 = 0, valid)  
- "23" (last digit 3, 23 % 3 = 2, invalid)  
- "32" (last digit 2, 32 % 2 = 0, valid)  
- "232" (last digit 2, 232 % 2 = 0, valid)  
**Total valid substrings: 4**

### Thought Process (as if you’re the interviewee)  

First, consider the brute-force approach:  
- For every possible substring, convert to an integer, check if the last digit is nonzero, and see if the value is divisible by that digit.
- There are O(n²) substrings, and each conversion/check is O(1), leading to O(n²) time and O(1) space.

This is too slow for large strings.

**Optimization:**  
Notice that the key is to efficiently check many substrings ending at each position. 
- Since only last digits 1 through 9 matter (last digit ≠ 0), we can use dynamic programming (DP) to keep track of how many substrings ending at each character have a particular remainder mod k for *all k=1..9*.
- For each position and for each possible ending digit (divisor), update transition from previous values:  
  - Extend previous substrings by appending current digit, updating remainders accordingly.  
  - Start new substring of length 1 (the current digit).  
  - Count how many end with remainder 0 (i.e., divisible) with last digit divider.

- This gives an efficient O(9²×n) = O(n) solution because both possible digit and divisor range over 1..9.

**Trade-offs:**  
- The DP takes O(n) space, but could be compressed to O(1) for speed at cost of code complexity.
- Leading zeros are handled without extra work (we treat substrings as numbers, zeroes are accepted).

### Corner cases to consider  
- `s` contains zeros ("0", "10", etc.): substrings ending in zero must be ignored.
- All single-digit substrings are valid if digit ≠ 0.
- Very long strings with repeated digits ("111...").
- Leading zeros ("0023", "000").
- Empty string (undefined, but LeetCode constraints ensure s is non-empty).
- Strings where no valid substring exists (e.g. "000").

### Solution

```python
def countSubstrings(s: str) -> int:
    n = len(s)
    # dp[num][rem]: count of substrings ending at previous index,
    #               where last digit is num, remainder is rem mod num
    dp = [[0] * 10 for _ in range(10)]  # dp[num][rem], num in 1..9
    res = 0

    for ch in s:
        digit = int(ch)
        new_dp = [[0] * 10 for _ in range(10)]

        # start a new substring with current digit
        if digit != 0:
            new_dp[digit][digit % digit] += 1

        # extend all previous substrings
        for num in range(1, 10):     # possible divisor
            for rem in range(num):   # possible remainders
                count = dp[num][rem]
                if count > 0:
                    # Shift left by 1 digit: new_rem = (rem*10 + digit) % num
                    new_rem = (rem * 10 + digit) % num
                    new_dp[num][new_rem] += count

        # Count valid substrings ending at this char (divisible by last digit)
        if digit != 0:
            res += new_dp[digit][0]

        dp = new_dp

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  For each character (n total), we do work for each divisor 1–9 and remainder 0..8. All loops’ total work is bounded by a small constant × n, so overall O(n).
- **Space Complexity:** O(1).  
  Arrays are fixed small size: 10 × 10, independent of input length. No large per-character structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want substrings divisible by their **first digit**?
  *Hint: Can you preprocess possible starting digits?*

- Can we return **all such substrings**, not just count them?
  *Hint: Modify your DP or store start indices.*

- How would your approach change if the **alphabet included non-digits**?
  *Hint: Pre-validate or skip invalid substrings.*

### Summary
This problem uses the classic **DP on substrings counting with remainder bucket** pattern.  
- The state compresses all possible remainders for divisors 1–9.
- This technique is useful for substring divisibility, matching remainder rules, and any DP where multiple counters must evolve per position.  
- It avoids brute-force and is used in substring counting problems with modularity or divisibility constraints.


### Flashcard
For each position, use modular arithmetic to check divisibility without converting full substring to integer; track remainders efficiently.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Divisible Substrings(number-of-divisible-substrings) (Medium)