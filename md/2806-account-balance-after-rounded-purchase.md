### Leetcode 2806 (Easy): Account Balance After Rounded Purchase [Practice](https://leetcode.com/problems/account-balance-after-rounded-purchase)

### Description  
You start with an account balance of 100. Given a purchase amount (an integer 1-100), round that amount to the nearest multiple of 10 (if a tie, round up) and subtract it from your balance. Return the resulting balance after the purchase.

### Examples  

**Example 1:**  
Input: `purchaseAmount = 15`  
Output: `90`  
*Explanation: 15 rounds up to 20 (since it’s exactly halfway), so 100 - 20 = 80.*

**Example 2:**  
Input: `purchaseAmount = 23`  
Output: `80`  
*Explanation: 23 rounds down to 20 (since 3 < 5), so 100 - 20 = 80.*

**Example 3:**  
Input: `purchaseAmount = 38`  
Output: `60`  
*Explanation: 38 rounds up to 40 (since 8 ≥ 5), so 100 - 40 = 60.*

### Thought Process (as if you’re the interviewee)  
First, round the purchase amount to the nearest multiple of 10. If the units digit (purchaseAmount % 10) is 5 or more, round up. Otherwise, round down. This is the classic rule of rounding to nearest 10, with tiebreaks going up. After rounding, subtract the rounded amount from 100 and return that.  
A brute-force way would check all possible multiples of 10 and pick the closest, but a simple calculation is enough:  
- If remainder (purchaseAmount % 10) ≥ 5, round up.  
- Else, round down.

This approach is O(1) time and O(1) space, as a direct calculation with no loops.

### Corner cases to consider  
- purchaseAmount = 0 (not given by the constraints, but be alerted)
- purchaseAmount < 10 or exactly 10
- purchaseAmount ending exactly with a 5 (should round up)
- purchaseAmount = 100 (max value)
- If all digits are at lower boundary (closest to previous 10) or upper boundary (closest to next 10)

### Solution

```python
def accountBalanceAfterPurchase(purchaseAmount: int) -> int:
    # Find the units digit
    remainder = purchaseAmount % 10

    # If units digit ≥ 5, round up to next 10
    if remainder >= 5:
        rounded = ((purchaseAmount // 10) + 1) * 10
    else:
        # else, round down
        rounded = (purchaseAmount // 10) * 10

    # Subtract the rounded amount from an initial balance of 100
    return 100 - rounded
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Just a few arithmetic operations, no loops or recursion.
- **Space Complexity:** O(1). Only a few integer variables, no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if ties (units digit 5) must round down instead of up?  
  *Hint: Adjust the if-condition to check for remainder > 5 instead of ≥ 5.*

- Suppose the initial account balance isn’t always 100, but is given as input?  
  *Hint: Use the provided balance variable in your return statement.*

- What if you needed to support rounding to the nearest 100 (not 10) when purchaseAmount can be up to 1000?  
  *Hint: Replace 10 with 100 in your rounding calculation.*

### Summary
This problem is a classic “round to the nearest multiple” with a tiebreaks-up rule, and direct arithmetic makes the code simple and efficient. The pattern is very common for rounding or bucketing problems, so this technique applies anywhere you need to group or round input values (e.g., batch processing, grading scales, or interval-based logic).

### Tags
Math(#math)

### Similar Problems
