### Leetcode 2165 (Medium): Smallest Value of the Rearranged Number [Practice](https://leetcode.com/problems/smallest-value-of-the-rearranged-number)

### Description  
Given an integer **num**, rearrange its digits so that its value is minimized, with no leading zeros. The sign of **num** must remain unchanged. For positive numbers, the result should be the smallest non-negative integer formed by its digits (no leading zeros). For negative numbers, the result should be the smallest (most negative) integer formed by rearranging its digits but still negative—not positive.

### Examples  

**Example 1:**  
Input: `num = 310`  
Output: `103`  
*Explanation: Arrangements are 013, 031, 103, 130, 301, 310. The smallest value without leading zeros is 103.*

**Example 2:**  
Input: `num = -7605`  
Output: `-7650`  
*Explanation: Some arrangements: -7650, -6705, -5076, -0567. The smallest value (most negative) without leading zeros is -7650.*

**Example 3:**  
Input: `num = 1000`  
Output: `1000`  
*Explanation: Arrangements: 0001, 0010, 0100, 1000. Only 1000 avoids leading zeros.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Generate all possible permutations of digits (excluding the sign), filter out results with leading zeros, and pick the smallest (or most negative if negative) value.  
  However, for numbers with many digits, this is exponential and not scalable.

- **Optimized approach:**  
  - For **positive numbers**:  
    - Convert **num** to its string digits.
    - Sort digits in ascending order.
    - Place the first non-zero digit at the front (to avoid leading zeros), followed by all zeros, then remaining digits.
  - For **negative numbers**:  
    - Convert **num** to its absolute value string digits.
    - Sort digits in descending order (this makes the number more negative after re-adding the sign).
    - Join digits and reapply the negative sign.

- **Trade-offs:**  
  - Sorting digits is both fast and easy to implement (O(d log d), d = #digits).  
  - Edge cases (e.g., all zeros, sign preservation) must be handled cleanly.

### Corner cases to consider  
- Input is zero (`num = 0`).
- Input is already minimizing (e.g., `num = 1000`).
- Input is single-digit positive or negative.
- Input contains all the same digit.
- Input has trailing or leading zeros in its digits.
- Very large or very small input values (near ±10¹⁵).

### Solution

```python
def smallestNumber(num: int) -> int:
    # When num is zero, return zero directly
    if num == 0:
        return 0

    # Work with absolute value for simplicity
    abs_digits = list(str(abs(num)))
    
    if num > 0:
        # Sort digits ascending for positive numbers
        abs_digits.sort()
        # Move first non-zero digit to the front to avoid leading zeros
        for i in range(len(abs_digits)):
            if abs_digits[i] != '0':
                # Swap first non-zero with front
                abs_digits[0], abs_digits[i] = abs_digits[i], abs_digits[0]
                break
        return int("".join(abs_digits))
    else:
        # For negative: sort descending to get maximum numeric value (results in smallest number when negative)
        abs_digits.sort(reverse=True)
        return -int("".join(abs_digits))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(d log d), where d is the number of digits in num. This is due to sorting the digit characters.
- **Space Complexity:** O(d) for storing the digits as a list. No significant extra space other than that.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is provided as a string with possible leading zeros?
  *Hint: Carefully parse and sanitize input before sorting.*

- Can you solve it without using sorting (O(d) time), e.g., using counting sort or digit buckets?
  *Hint: Count digit occurrences, and reconstruct output efficiently.*

- How do you handle numbers outside of 64-bit integer range?
  *Hint: Manipulate values as strings or digit arrays, not integers.*

### Summary
The approach is a classic **greedy/digit sort** technique: for positives, arrange digits to form the least integer; for negatives, arrange digits to get the most negative value. It’s efficient because digits are few (≤16), making sort practical. This pattern arises in problems about number rearrangement and is broadly applicable whenever digit order matters for minimum or maximum values.


### Flashcard
For positive numbers, sort digits ascending and move the first non-zero to the front; for negative, sort descending and place the minus sign.

### Tags
Math(#math), Sorting(#sorting)

### Similar Problems
- Largest Number(largest-number) (Medium)