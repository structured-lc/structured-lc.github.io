### Leetcode 1421 (Easy): NPV Queries [Practice](https://leetcode.com/problems/npv-queries)

### Description  
Given several queries where each asks you to evaluate the Net Present Value (NPV) for a given array and a discount rate. For each query, return the NPV computed as sum of all cashflows[i] divided by (1 + rate)ⁱ, for i = 0..n-1.

### Examples  
**Example 1:**  
Input: `cashflows=[100, 200, 300], rate=0.1`  
Output: `527.099`  
*Explanation: 100/1 + 200/1.1 + 300/1.21` = 100 + 181.818 + 247.935 = 529.753 (rounded as needed)*

**Example 2:**  
Input: `cashflows=[500, 0, -100], rate=0.05`  
Output: `399.614`  
*Explanation: Includes negative and zero values as well.*

**Example 3:**  
Input: `cashflows=[0,0,0], rate=0.2`  
Output: `0.0`  
*Explanation: All zero cashflows, NPV is zero.*

### Thought Process (as if you’re the interviewee)  
- The formula for NPV is sum of (cashflow / pow(1+rate, i)) for i from 0 to n-1.
- For each query, iterate over all cashflows, keep a running discount multiplier, and sum up each cashflow's present value contribution.
- Ensure handling of 0 cashflows, negative cashflows, and non-integer discount rates.
- Watch out for floating point precision, especially if rate or values are large.

### Corner cases to consider  
- rate = 0 (no discounting)
- All cashflows are zero
- Negative cashflows
- Very large or very small rates
- Empty cashflow list

### Solution

```python
def compute_npv(cashflows, rate):
    npv = 0.0
    discount = 1.0
    for i, amount in enumerate(cashflows):
        npv += amount / discount
        discount *= (1 + rate)
    return npv
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), where N is number of cashflows.
- **Space Complexity:** O(1), just accumulators and one variable for discount.

### Potential follow-up questions (as if you’re the interviewer)  
- How to handle multiple queries efficiently for the same cashflows but different rates?  
  *Hint: Can you precompute powers for common i's?*
- How do floating point errors affect accuracy with very large N or rates?  
  *Hint: Try decimal or other libraries if needed.*
- How to incorporate varying rates for each year?  
  *Hint: Use a list of rates instead of one.*

### Summary
This is a straightforward application of a given formula, using a loop and careful number handling. The approach of iterative discounting and application of a formula per index shows up in time-value-of-money and many amortization pattern problems.


### Flashcard
Calculate NPV by summing cashflows discounted by the rate, handling floating-point precision.

### Tags
Database(#database)

### Similar Problems
