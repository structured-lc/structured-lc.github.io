### Leetcode 43 (Medium): Multiply Strings [Practice](https://leetcode.com/problems/multiply-strings)

### Description  
Given two non-negative integers **num1** and **num2** represented as strings, return their product, also in string format.  
- You **cannot** use any built-in library function for large integers or directly convert the inputs to integers.
- The inputs consist only of the digits '0'–'9', with no extra leading zeros (except possibly for the single digit "0").

### Examples  

**Example 1:**  
Input: `num1 = "2", num2 = "3"`  
Output: `"6"`  
*Explanation: 2 × 3 = 6.*

**Example 2:**  
Input: `num1 = "123", num2 = "456"`  
Output: `"56088"`  
*Explanation: 123 × 456 = 56088. (123 × 6 = 738. 123 × 50 = 6150. 123 × 400 = 49200. Then sum: 49200 + 6150 + 738 = 56088.)*

**Example 3:**  
Input: `num1 = "0", num2 = "52"`  
Output: `"0"`  
*Explanation: Any number multiplied by 0 is 0.*

### Thought Process (as if you’re the interviewee)  

Let’s break down the multiplication process:

- We cannot simply convert the string to an integer and multiply due to constraints.
- We must **simulate grade-school multiplication**:  
   - Multiply each digit of num1 by each digit of num2.
   - Each multiplication result contributes to a digit position determined by the sum of their indices.
   - Take care of carries in each position.

Brute-force:  
- Simulate the above using nested loops.
- Store the results in an array of size (len(num1) + len(num2)) to account for the maximum length a product can reach.
- Process carries in another loop.
- Build the final string, skipping leading zeros.

Optimized approach:  
- This brute-force simulation is about as optimal as it gets, since every digit must be combined with every other digit.

Trade-offs:  
- Time complexity is O(m × n) (where m, n are input lengths); this is optimal, since all digit pairs must be checked.
- This method avoids using any built-in big integer routines as required.

### Corner cases to consider  
- Either num1 or num2 is "0".
- Either num1 or num2 is "1".
- Different length strings (e.g., "99", "12345").
- Leading zeros (only legal if input is exactly "0").
- Very large inputs (up to 200 digits).
- Both num1 and num2 are single digit strings.

### Solution

```python
def multiply(num1: str, num2: str) -> str:
    # Handle zero multiplication edge case
    if num1 == "0" or num2 == "0":
        return "0"

    m, n = len(num1), len(num2)
    # Result can be at most m + n digits
    res = [0] * (m + n)

    # Reverse both numbers for easier indexing (optional)
    for i in range(m - 1, -1, -1):
        d1 = ord(num1[i]) - ord('0')
        for j in range(n - 1, -1, -1):
            d2 = ord(num2[j]) - ord('0')
            # Multiply and add to the current position
            mul = d1 * d2
            # Positions for add/carry
            p1, p2 = i + j, i + j + 1
            total = mul + res[p2]
            # Carry to the left, remainder stays
            res[p2] = total % 10
            res[p1] += total // 10

    # Skip leading zeros
    result = []
    for digit in res:
        if not (len(result) == 0 and digit == 0):
            result.append(str(digit))
    return ''.join(result) if result else "0"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) for m = len(num1), n = len(num2), since we multiply every digit pair.
- **Space Complexity:** O(m + n) for the result array to hold all the digit segments.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input contained negative numbers?  
  *Hint: Consider sign handling and result formatting.*

- How would you handle decimal string multiplication, e.g., "1.23" × "4.56"?  
  *Hint: Remove dots, track decimal places, adjust result.*

- Can you optimize for cases where one of the numbers is much smaller than the other?  
  *Hint: Redundant, as O(m × n) is already optimal for strings; for very large numbers, algorithms like Karatsuba could be considered.*

### Summary
This is a classic **simulation problem** of grade-school multiplication, requiring careful index and carry management, and string skipping of leading zeros.  
It’s a common pattern for string-based arithmetic where native integer types are too small, and applies to other problems like **Add Strings**, **Add Two Numbers**, and arbitrary-precision math with strings.

### Tags
Math(#math), String(#string), Simulation(#simulation)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Plus One(plus-one) (Easy)
- Add Binary(add-binary) (Easy)
- Add Strings(add-strings) (Easy)
- Apply Discount to Prices(apply-discount-to-prices) (Medium)