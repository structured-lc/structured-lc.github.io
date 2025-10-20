### Leetcode 1291 (Medium): Sequential Digits [Practice](https://leetcode.com/problems/sequential-digits)

### Description  
Given two integers, **low** and **high**, find all positive integers in that range whose digits are all sequential (i.e., each digit is exactly one greater than the previous digit). Return the answer as a sorted list in increasing order. For example, 123 and 4567 are sequential digits, but 124 and 1457 are not.

### Examples  
**Example 1:**  
Input: `low = 100, high = 300`  
Output: `[123, 234]`  
*Explanation: 123 and 234 are the numbers in range 100 to 300 whose digits are sequential.*

**Example 2:**  
Input: `low = 1000, high = 13000`  
Output: `[1234, 2345, 3456, 4567, 5678, 6789, 12345]`  
*Explanation: All numbers between 1000 and 13000 with strictly sequential digits are included.*

**Example 3:**  
Input: `low = 58, high = 155`  
Output: `[  123 ]`  
*Explanation: 123 is the only number between 58 and 155 with sequential digits.*

### Thought Process (as if you’re the interviewee)  
First, brute-force over the possible numbers in the range is not efficient, because the numbers can be large and most numbers don't satisfy the sequential digits property.

Instead, notice that every number with sequential digits comes from a substring of the string '123456789'. For example: pick start index 0 and length 3 for 123, start 1 length 3 for 234, etc.

So, for each possible length L in the range from the number of digits of `low` to of `high`, slide a window of length L along '123456789' from left to right, and for each such substring, check if it's between `low` and `high`. Collect all valid numbers and return them sorted (they'll naturally be sorted if we go left to right, increasing window lengths).

This avoids generating all numbers in [low, high], and only produces potential candidates.

### Corner cases to consider  
- `low` and `high` with same or different digit counts
- Inputs where no such numbers exist within the range
- Very large or small values for `low` and `high`, including values near 10 or near 1,000,000,000
- Ensure output is sorted

### Solution

```python
def sequentialDigits(low, high):
    result = []
    digits = '123456789'

    min_len = len(str(low))
    max_len = len(str(high))

    for size in range(min_len, max_len + 1):
        for start in range(0, 10 - size):
            num = int(digits[start: start + size])
            if low <= num <= high:
                result.append(num)
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) for practical usage—there are at most 36 possible sequential numbers since the largest is 123456789. Looping over all substrings is constant multiplier regardless of input range.
- **Space Complexity:** O(1) extra space (excluding output). Output list stores at most 36 numbers. No extra complex data structures.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you extend this approach if the sequential digits could "wrap" (e.g., after 9 comes 0)?  
  *Hint: Consider constructing a circular digit string and handle single-digit overflows.*

- What if you could use decreasing digits as well (e.g., 654, 321)?  
  *Hint: Use '987654321' and repeat similar sliding window logic in reverse.*

- Suppose the range was extremely large; can you avoid generating all substrings?  
  *Hint: Compute minimum and maximum lengths dynamically and only generate numbers that could fall in the interval.*

### Summary
This problem uses a **sliding window** technique over a fixed string ('123456789') to generate candidate sequential digit numbers, illustrating an efficient filtering by construction. The sliding window and substring extraction patterns are common and applicable elsewhere, especially in digit-based number problems and windowed string analysis.


### Flashcard
Generate sequential digits by sliding a window over the string '123456789' for each possible length.

### Tags
Enumeration(#enumeration)

### Similar Problems
