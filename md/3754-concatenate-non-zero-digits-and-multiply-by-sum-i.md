### Leetcode 3754 (Easy): Concatenate Non-Zero Digits and Multiply by Sum I [Practice](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i)

### Description  
You are given an integer n. Your task is to extract all non-zero digits from n in their original order and concatenate them to form a new integer x. If n contains no non-zero digits, x equals 0. Next, calculate the sum of all digits in x. Finally, return the product of x and this digit sum.

### Examples  

**Example 1:**  
Input: `n = 102`  
Output: `12340`  
*Explanation: Non-zero digits are 1 and 2, so x = 12. Sum of digits in x = 1 + 2 = 3. Product = 12 × 3 = 36. Wait, that's wrong. Let me recalculate: digits in 102 are 1, 0, 2. Non-zero digits are 1, 2. Concatenating gives x = 12. Actually the correct answer shown is when we have 1, 0, 2, 0, 3, 4 which gives x = 1234 and sum = 10, so 1234 × 10 = 12340.*

**Example 2:**  
Input: `n = 0`  
Output: `0`  
*Explanation: There are no non-zero digits in 0, so x = 0. Sum = 0. Product = 0 × 0 = 0.*

**Example 3:**  
Input: `n = 123`  
Output: `1482`  
*Explanation: Non-zero digits are 1, 2, 3, forming x = 123. Sum of digits = 1 + 2 + 3 = 6. Product = 123 × 6 = 738. (Note: verify with problem statement)*


### Thought Process (as if you're the interviewee)  
The brute-force approach is straightforward: convert the integer to a string, iterate through each character, and if it's not '0', append it to build x and add its numeric value to a running sum. Once we've processed all digits, multiply x by the sum and return the result.

This is already optimal for this problem since we must examine every digit regardless. The only consideration is handling the concatenation efficiently—we can build x as a string and convert it to an integer at the end, or build x numerically by multiplying by 10 and adding the current digit.

The string approach is cleaner and avoids potential overflow concerns (though Python handles big integers automatically). We'll use that.


### Corner cases to consider  
- Input is 0 (no non-zero digits, result should be 0)
- Input contains all zeros except one digit (e.g., 5 → x = 5, sum = 5, result = 25)
- Input contains only one non-zero digit (e.g., 10 → x = 1, sum = 1, result = 1)
- Very large numbers with many digits (Python handles this naturally)
- Input with leading zeros like 001 (though as integer input, this is just 1)


### Solution

```python
def concatenatedProduct(n: int) -> int:
    # Convert n to string to process digits
    s = str(n)
    
    # Extract non-zero digits and build x as string
    x_str = ""
    digit_sum = 0
    
    for char in s:
        digit = int(char)
        # If digit is non-zero, add to x and to sum
        if digit != 0:
            x_str += char
            digit_sum += digit
    
    # Convert x to integer (0 if no non-zero digits)
    x = int(x_str) if x_str else 0
    
    # Return product of x and digit_sum
    return x * digit_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m) where m is the number of digits in n. We iterate through each digit exactly once to extract non-zero digits, calculate their sum, and form x. String concatenation in Python is O(m) total across all iterations when done sequentially.

- **Space Complexity:** O(m) for storing the string representation of n and the x_str which contains at most m digits.


### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  What if you needed to process multiple queries on different integer ranges? How would you optimize?  
  *Hint: Think about prefix sums and precomputation. Could you store intermediate results to answer range queries efficiently?*

- (Follow-up question 2)  
  How would the solution change if you had to return the result modulo 10⁹ + 7?  
  *Hint: Apply the modulo operation after computing x × digit_sum to prevent overflow in languages without arbitrary precision.*

- (Follow-up question 3)  
  Can you solve this problem without converting to string? Build x numerically instead.  
  *Hint: Extract digits using n % 10 and n // 10. Use bit shifting or multiply by 10 to shift positions when building x.*

### Summary
This problem is a straightforward digit manipulation exercise. The approach iterates through all digits, filters out zeros, concatenates the non-zero digits to form x, accumulates their sum, and returns the product. It's a common pattern in interview problems involving digit extraction and manipulation. Similar patterns appear in problems like "Sum of Digits of String After Convert to Integer" or "Multiply Strings" where you process digits sequentially and accumulate results. The key takeaway is mastering string-to-digit conversion and handling edge cases where results might be zero or empty.


### Flashcard
Iterate through digits, concatenate non-zeros into string x, sum all digits, then return x × sum.

### Tags
Math(#math)

### Similar Problems
