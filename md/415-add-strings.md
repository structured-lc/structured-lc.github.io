### Leetcode 415 (Easy): Add Strings [Practice](https://leetcode.com/problems/add-strings)

### Description  
Given two **non-negative integers as strings** (e.g., `"123"` and `"456"`), add the numbers and return the sum as a string.  
- Don't convert the entire string to an integer directly.  
- Mimic the manual digit-by-digit addition as we would do by hand: add from the rightmost digit, handle carrying, continue leftwards.  
- Inputs have no leading zeros (except "0" itself).

For instance, `"123"` + `"456"` → `"579"`.  
Numbers can be very large, up to 10,000 digits.

### Examples  

**Example 1:**  
Input: `num1 = "123", num2 = "456"`  
Output: `"579"`  
*Explanation: 3+6=9, 2+5=7, 1+4=5, so we get "579".*

**Example 2:**  
Input: `num1 = "11", num2 = "123"`  
Output: `"134"`  
*Explanation: Add from right: 1+3=4, carry 0; 1+2=3, carry 0; 0+1=1, so "134".*

**Example 3:**  
Input: `num1 = "456", num2 = "77"`  
Output: `"533"`  
*Explanation:  
   - Rightmost: 6+7=13, put 3, carry 1  
   - Next: 5+7=12, plus carry=13, put 3, carry 1  
   - Next: 4+0=4, plus carry=5, so put 5  
   - Result in reverse: "335", reverse is "533".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Could convert num1 and num2 to integers, add them, and convert back to string—but problem disallows that for very large numbers.

- **Manual addition (preferred):**  
  - Start pointers at the end of both strings (rightmost digit).
  - Use a carry variable initialized to 0.
  - Loop from right to left:
    - For each index, add the digits (treat missing digit as 0), plus any carry.
    - Store result digit (total mod 10), update carry (total div 10).
    - Move both pointers left.
  - If there's still a carry after finishing, append it.
  - Reverse the result list and join into a string.

This avoids numerical overflow, matches manual addition, and works for huge inputs.

### Corner cases to consider  
- Strings of **different lengths** (e.g., "1" + "9999")
- **Carry at the highest digit** (e.g., "999" + "1" = "1000")
- One or both strings are **"0"**
- Large input size (up to 10,000 digits)
- Both strings are identical or have repeating digits

### Solution

```python
def addStrings(num1: str, num2: str) -> str:
    # Initialize pointers for both numbers (rightmost digit)
    i, j = len(num1) - 1, len(num2) - 1
    carry = 0
    result = []
    
    # Loop while either string has digits left or there's carry
    while i >= 0 or j >= 0 or carry:
        # Get current digit, or 0 if index out of range
        digit1 = int(num1[i]) if i >= 0 else 0
        digit2 = int(num2[j]) if j >= 0 else 0
        
        # Compute sum and update carry
        total = digit1 + digit2 + carry
        carry = total // 10
        current_digit = total % 10
        
        # Append result digit
        result.append(str(current_digit))
        
        # Move to next digit left for each number
        i -= 1
        j -= 1

    # Digits are in reverse order, so reverse and join
    return ''.join(result[::-1])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = max(len(num1), len(num2)). We process each digit of both strings once.
- **Space Complexity:** O(n) for the output string (since we store the sum digit-by-digit), plus minor variables. No recursion or significant extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **decimal numbers** in the input?  
  *Hint: Consider splitting at the decimal and adding integer and fractional parts separately, then combining with carry.*

- How would you **subtract** strings instead of adding?  
  *Hint: Adjust borrow logic, mind negative result cases.*

- Can you support numbers with **thousands separators** (e.g., "1,000,001")?  
  *Hint: Strip out non-digit characters before processing, reinsert after.*

### Summary
This solution implements the **digit-by-digit simulation of human addition** for arbitrarily large numbers without integer conversion.  
It applies the *Two Pointers* pattern with a *carry-forward* mechanism; similar logic is widely useful for big-integer arithmetic, manual subtraction, or in problems like merging in reverse or processing from both ends. This code is robust, efficient, and interview-ready.


### Flashcard
Simulate grade-school addition from right to left with carry variable—add corresponding digits (treating missing as 0) plus carry, store remainder and update carry.

### Tags
Math(#math), String(#string), Simulation(#simulation)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Multiply Strings(multiply-strings) (Medium)
- Add to Array-Form of Integer(add-to-array-form-of-integer) (Easy)