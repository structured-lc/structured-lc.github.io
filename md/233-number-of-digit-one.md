### Leetcode 233 (Hard): Number of Digit One [Practice](https://leetcode.com/problems/number-of-digit-one)

### Description  
Given a non-negative integer `n`, count the total number of times the digit **1** appears in all numbers from 1 up to and including `n`. You need to count every occurrence of '1' in every digit position for all these numbers.

For example, for `n = 13`, you would count the '1's in 1, 10, 11, 12, and 13—all positions where a '1' appears.

### Examples  

**Example 1:**  
Input: `n = 13`  
Output: `6`  
*Explanation: Numbers with '1': 1, 10, 11 (twice), 12, 13. Total = 6.*

**Example 2:**  
Input: `n = 0`  
Output: `0`  
*Explanation: No numbers contain a '1' in this range.*

**Example 3:**  
Input: `n = 20`  
Output: `12`  
*Explanation: Numbers with '1': 1, 10, 11 (twice), 12, 13, 14, 15, 16, 17, 18, 19.*

### Thought Process (as if you’re the interviewee)  

First, consider the **brute-force** approach: loop from 1 to n, and for every number, count the '1's in its digits. That would work, but for large `n` (up to 10⁹), this is far too slow.

Instead, **optimize** by analyzing the problem digit by digit:
- For each digit position (ones, tens, hundreds, etc.), count how many times the digit '1' can appear in that place, given all numbers from 1 to n.
- The idea is to count, for each position, three parts:
  - **higher**: digits left of current position
  - **current**: digit at current position
  - **lower**: digits right of current position

For position with base `factor` (1, 10, 100...), calculate:
- `higher = n // (factor × 10)`
- `current = (n // factor) % 10`
- `lower = n % factor`

The contribution to the answer from this position:
- If current == 0: contribution = higher × factor
- If current == 1: contribution = higher × factor + (lower + 1)
- If current > 1: contribution = (higher + 1) × factor

Loop over all digit positions, summing contributions.

This approach runs in O(log n) time—much faster for large n.

### Corner cases to consider  
- n = 0 (should output 0)
- n = 9, n = 10 (boundary with/without '1')
- n with repeated ones, e.g., n = 111, n = 1001
- Numbers ending with zeros, like n = 100, n = 1000
- Large n (performance and overflow safety)

### Solution

```python
def countDigitOne(n: int) -> int:
    count = 0
    factor = 1  # Position: units, tens, hundreds, etc.
    while n // factor:
        higher = n // (factor * 10)
        current = (n // factor) % 10
        lower = n % factor
        
        if current == 0:
            count += higher * factor
        elif current == 1:
            count += higher * factor + (lower + 1)
        else:
            count += (higher + 1) * factor
        
        factor *= 10
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log₁₀ n)
  - Because we process each digit position once, and max number of positions is log₁₀ n.
- **Space Complexity:** O(1)
  - No extra space proportional to input size; only a few integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the digit to count is not '1' but any digit 0–9?
  *Hint: How do the formulas generalize if you were counting '2's or '3's?*

- Could you count digit '1' in a range [L, R] (not just 1 to n)?
  *Hint: Given a range, could you subtract counts up to (L–1) from counts up to R?*

- How would you adapt this for hexadecimal or base-k numbers?
  *Hint: Try modifying how you identify digits per position, and the digit place value.*

### Summary

This problem uses the **digit-place counting pattern**—a classic interview technique to efficiently count digit appearances without brute force. It's generic and adaptable, for example, to count any digit, solve similar "digit sum" problems, or answer how often a pattern appears in a number range. This technique is often found in digital root, digit DP, and base conversion interview problems.