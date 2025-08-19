### Leetcode 2303 (Easy): Calculate Amount Paid in Taxes [Practice](https://leetcode.com/problems/calculate-amount-paid-in-taxes)

### Description  
Given a list of income tax brackets, where each bracket is defined by an upper bound and a percentage rate, calculate how much tax you owe for a given income. Each bracket taxes the income that falls within its own range at its rate.  
- For example, for each bracket, only the income between this bracket's lower limit (exclusive) and its upper limit (inclusive), if any, is taxed at its rate. If your income falls within a bracket, tax only up to your income.

### Examples  

**Example 1:**  
Input: `brackets = [[3,50],[7,10],[12,25]], income = 10`  
Output: `2.65000`  
*Explanation:  
- First 3 dollars at 50% ⇒ 3 × 0.50 = 1.50  
- Next (7 - 3 = 4) dollars at 10% ⇒ 4 × 0.10 = 0.40  
- Next (10 - 7 = 3) dollars at 25% ⇒ 3 × 0.25 = 0.75  
Total = 1.50 + 0.40 + 0.75 = 2.65*

**Example 2:**  
Input: `brackets = [[1,0],[4,25],[5,50]], income = 2`  
Output: `0.25000`  
*Explanation:  
- First dollar at 0% ⇒ 1 × 0 = 0  
- Next (2 - 1 = 1) dollar at 25% ⇒ 1 × 0.25 = 0.25  
Total = 0 + 0.25 = 0.25*

**Example 3:**  
Input: `brackets = [[2,50]], income = 10`  
Output: `1.00000`  
*Explanation:  
- Only one bracket: pay on first 2 dollars at 50% ⇒ 2 × 0.50 = 1.00  
Remaining 8 dollars are not taxed (no bracket for them).*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that tax is computed bracket by bracket, so income covered by one bracket is not double-taxed in higher brackets.  
A brute-force way is to iterate the brackets, for each bracket compute the taxable amount (within bracket’s range and up to income), multiply by rate, and subtract from remaining income.

We continue to the next bracket only if the income exceeds the upper bound of the current bracket.  
The final approach is to simulate the process sequentially since brackets are sorted, keeping track of the lower bound (start at 0), calculating the tax for the min(upper - lower, income - lower) in each bracket, and adding it up until all income is processed.

### Corner cases to consider  
- income is 0  
- brackets with 0% rate  
- all brackets cover less than the income (income never capped)  
- income smaller than lower bound of first bracket (should pay 0 tax)  
- only one bracket, or brackets do not sum cover up to income  
- floating-point precision of answers

### Solution

```python
def calculateTax(brackets, income):
    tax = 0.0
    prev_upper = 0
    for upper, percent in brackets:
        # Compute the amount within this bracket's range
        amount = min(upper, income) - prev_upper
        if amount > 0:
            tax += amount * percent / 100.0
        prev_upper = upper
        if income <= upper:
            break
    return tax
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of brackets. We do one pass through all tax brackets.
- **Space Complexity:** O(1), as we use only a fixed number of variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the brackets were not sorted?
  *Hint: How would unsorted brackets affect your approach?*

- How would you handle more complex tax rules (with deductions, credits, or multi-dimensional brackets)?
  *Hint: Could you still keep it O(n)?*

- How to avoid floating-point inaccuracy in your answer?
  *Hint: What data type or library could you use for money calculations?*

### Summary
This problem uses the **interval simulation** coding pattern, similar to processing event ranges or scanline algorithms. It’s appropriate when calculations depend on sequential, partitioned segments of data. The design is simple, linear time, and highly readable. This sort of pattern also appears in progressive tax calculation, segmented pricing models, or histogram interval operations.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
