### Leetcode 2575 (Medium): Find the Divisibility Array of a String [Practice](https://leetcode.com/problems/find-the-divisibility-array-of-a-string)

### Description  
Given a string of digits (`word`) and an integer `m`, form an array where for each i, we check if the prefix word[0..i] (i.e., the substring from the first character up to iᵗʰ position) is divisible by `m`. The output is an array of 1s and 0s: put 1 if the prefix (`word[0..i]`) is divisible by `m`, else 0.  
You cannot cast the prefix to an int directly due to the possibility of the string being very long; instead, you must update the remainder incrementally for each new digit.

### Examples  

**Example 1:**  
Input: `word = "998244353", m = 3`  
Output: `[0, 0, 0, 1, 0, 1, 0, 0, 0]`  
*Explanation: For each prefix:*
- "9" % 3 = 0 → 1  
- "99" → 99 % 3 = 0 → 1  
But the array is all 0's except at `word[3]` ("9982") and `word[5]` ("998244"), which are divisible by 3.

**Example 2:**  
Input: `word = "1010", m = 10`  
Output: `[0, 1, 0, 1]`  
*Explanation:*
- "1" = 1 % 10 = 1 → 0  
- "10" = 10 % 10 = 0 → 1  
- "101" = 101 % 10 = 1 → 0  
- "1010" = 1010 % 10 = 0 → 1

**Example 3:**  
Input: `word = "12345", m = 6`  
Output: `[0, 0, 0, 1, 0]`  
*Explanation:*  
- "1" = 1  
- "12" = 12 % 6 = 0 → 1  
- "123" = 123 % 6 = 3 → 0  
- "1234" = 1234 % 6 = 4 → 0  
- "12345" = 12345 % 6 = 3 → 0

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each prefix, convert `word[0:i+1]` to an int and check modulo `m`. But if the string is very long, direct conversion will be inefficient or could overflow.
- **Optimize:** Instead of converting, keep track of the current remainder. For each digit, update:  
  remainder = (remainder × 10 + int(current_digit)) % m  
  This keeps the value manageable and allows checking divisibility efficiently.
- This approach is efficient, linear in time, and uses only constant extra space for tracking the current remainder. It’s the same trick as used for streaming modular arithmetic and avoids large number conversions.

### Corner cases to consider  
- Empty string (should return empty array)
- m = 1 (all elements should be 1, as every number is divisible by 1)
- Repeated digits (e.g. '00000')
- Very large strings (ensure no overflow)
- Single character string
- m greater than the numerical value of any prefix

### Solution

```python
def divisibilityArray(word: str, m: int) -> list[int]:
    ans = []
    remainder = 0  # Track current prefix remainder mod m
    for c in word:
        # Update remainder for new digit
        remainder = (remainder * 10 + int(c)) % m
        # Append 1 if divisible, else 0
        ans.append(1 if remainder == 0 else 0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of `word`, since we process each digit once.
- **Space Complexity:** O(n) for the output array, with O(1) extra space for the running remainder.

### Potential follow-up questions (as if you’re the interviewer)  

- What if m is very large (larger than any prefix in `word`)?
  *Hint: How is modulus computed when m is very large?*

- Can this be done in-place if allowed to overwrite the input?
  *Hint: What is the minimal storage needed?*

- If you needed to find divisibility for multiple different values of m simultaneously, how could you adapt the approach?
  *Hint: Multiple remainders, one for each `m`.*

### Summary
This problem uses a common **prefix property pattern**: processing “rolling” or progressively larger chunks of a sequence, updating a computation efficiently. The **running/modulo trick** is crucial for efficiency in string-to-integer problems, especially with very large numbers. This pattern is also used in problems involving rolling hash or checking divisibility without explicit integer conversion.


### Flashcard
Track the running remainder as you scan the string left to right; for each digit, update remainder = (remainder × 10 + digit) mod m and mark 1 if remainder is 0, else 0.

### Tags
Array(#array), Math(#math), String(#string)

### Similar Problems
- Subarray Sums Divisible by K(subarray-sums-divisible-by-k) (Medium)
- Make Sum Divisible by P(make-sum-divisible-by-p) (Medium)