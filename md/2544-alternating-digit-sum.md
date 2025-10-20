### Leetcode 2544 (Easy): Alternating Digit Sum [Practice](https://leetcode.com/problems/alternating-digit-sum)

### Description  
Given a positive integer **n**, assign each digit of **n** a sign, starting from the most significant (leftmost) digit. The leftmost digit is **positive**, and each subsequent digit alternates in sign (positive, negative, positive, ...). Compute the sum of these signed digits and return the result.  
This is essentially: sum digit₀ − digit₁ + digit₂ − digit₃ + ... for all digits of **n**, from left to right.

### Examples  

**Example 1:**  
Input: `521`  
Output: `4`  
*Explanation: +5 -2 +1 = 4.*

**Example 2:**  
Input: `111`  
Output: `1`  
*Explanation: +1 -1 +1 = 1.*

**Example 3:**  
Input: `886996`  
Output: `0`  
*Explanation: +8 -8 +6 -9 +9 -6 = 0.*

### Thought Process (as if you’re the interviewee)  
First, I consider converting the number into a string to easily process its digits from left to right, since the sign alternates as we move left to right. I can iterate through the string, applying `+` for even indices and `-` for odd indices.  
A brute-force approach would be to extract all digits, iterate, and maintain the alternating sign.  
This problem does not require any use of advanced data structures—just careful indexing and integer operations. Reading from left to right allows for clear sign alternation and is intuitive.

The main trade-off: 
- Processing as a string means a bit more overhead for conversion, but this makes the alternating sign logic much simpler and avoids reversing numbers or extra computations.  
- Alternatively, you could process digits as integers from right-to-left and then reverse the sign assignment at the end, but left-to-right is clearer for this task.

### Corner cases to consider  
- Single digit input: Should be returned as-is (since the only digit has a positive sign).
- Leading zeros are impossible for positive integers.
- Numbers with two digits: Should return digit₀ − digit₁.
- Large numbers (maximum digit count).
- All digits are the same (e.g., `11111`), just to ensure alternation works.

### Solution

```python
def alternateDigitSum(n: int) -> int:
    # Convert the number to a string to access digits from left (most significant) to right
    s = str(n)
    total = 0
    # Sign starts as +1 for most significant digit
    sign = 1
    for i, digit in enumerate(s):
        # Add or subtract this digit based on position
        total += sign * int(digit)
        # Alternate sign for next digit
        sign *= -1
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k is the number of digits in n. Each digit is processed exactly once.
- **Space Complexity:** O(k) due to string conversion of n—no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you cannot convert n to a string?  
  *Hint: Work with integer division and modulo to extract digits right-to-left, then post-process.*

- How would you implement this to minimize space?  
  *Hint: Avoid string conversion, work with integer division, but be careful with sign alternation order.*

- Can you do it in one pass directly from integer without converting to string?  
  *Hint: Store digits and use the length to determine sign at each position, or process in reverse with a final sign flip.*

### Summary
This problem uses a **single-pass iteration pattern** with basic alternation logic. It’s a good example of **digit-by-digit processing** and simple sign alternation. This pattern can also be applied to other problems involving alternate sign sums or digit manipulations, such as "subtract the sum of even and odd positioned digits" or similar integer digit transforms.


### Flashcard
Iterate digits left to right, alternating signs, and sum the results—convert to string for easy digit access.

### Tags
Math(#math)

### Similar Problems
- Add Digits(add-digits) (Easy)
- Minimum Sum of Four Digit Number After Splitting Digits(minimum-sum-of-four-digit-number-after-splitting-digits) (Easy)
- Separate the Digits in an Array(separate-the-digits-in-an-array) (Easy)
- Compute Alternating Sum(compute-alternating-sum) (Easy)