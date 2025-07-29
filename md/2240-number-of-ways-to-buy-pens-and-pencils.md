### Leetcode 2240 (Medium): Number of Ways to Buy Pens and Pencils [Practice](https://leetcode.com/problems/number-of-ways-to-buy-pens-and-pencils)

### Description  
You are given three integers:  
- **total**: how much money you have  
- **cost1**: price of one pen  
- **cost2**: price of one pencil  

You may buy any number of pens and pencils (including zero), but can’t spend more than your total budget. Return the number of different ways you can buy pens and pencils where every way is a pair (number of pens, number of pencils) such that (pens × cost1 + pencils × cost2) ≤ total.

### Examples  

**Example 1:**  
Input: `total = 20, cost1 = 10, cost2 = 5`  
Output: `9`  
*Explanation:*
- Buy 0 pens: can buy 0,1,2,3,4 pencils (5 ways)
- Buy 1 pen: can buy 0,1 pencils (2 ways)
- Buy 2 pens: can buy 0 pencils (1 way)
- Buy 0 pens and 0 pencils (counts as one way; already included above)
Total = 5 + 2 + 1 = 8, but must also account for buying 1 pen and 2 pencils (yes, 1×10+2×5=20), so 9 in total.

**Example 2:**  
Input: `total = 5, cost1 = 10, cost2 = 10`  
Output: `1`  
*Explanation:*
- Only way is to buy 0 pens and 0 pencils (5 < 10). Only 1 way.

**Example 3:**  
Input: `total = 9, cost1 = 2, cost2 = 3`  
Output: `8`  
*Explanation:*
For each pens from 0 up to ⌊9/2⌋ = ⌊4.5⌋ = 4:
- pens=0: up to 3 pencils (0,1,2,3) → 4 ways
- pens=1: up to 2 pencils (0,1,2) → 3 ways
- pens=2: up to 1 pencil (0,1) → 2 ways
- pens=3: up to 0 pencils (0) → 1 way
- pens=4: only 0 pencils (budget will allow 4×2=8, left 1)  
Total = 4+3+2+1+1 = 11, but need to check: (for every valid pen count, add floor((remaining budget)/cost2) + 1 ways)

### Thought Process (as if you’re the interviewee)  
Brute-force approach: Try all possible combinations of pens and pencils (nested loops). For every count of pens (0 to ⌊total/cost1⌋), try all possible count of pencils (0 to ⌊possible for remaining budget⌋). This would work but would be too slow for large total.

Optimization: Instead of double for-loop, for each number of pens, directly compute the maximal pencils fitting in the remaining budget as:  
If you buy *p* pens, you spend *p × cost1*, and have remaining = total - p × cost1.  
Number of pencils you can buy is ⌊remaining / cost2⌋ (plus zero pencils possibility).  
So for each *p*, simply add (⌊(total - p × cost1) / cost2⌋ + 1) ways.  
Repeat for every possible pen count (p from 0 to ⌊total/cost1⌋).  
This is linear in total/cost1.

This avoids redundant checks and is efficient even for large integers.

### Corner cases to consider  
- total < cost1 and total < cost2: only zero items can be bought, so only 1 way.
- cost1 == cost2
- cost1 > total and/or cost2 > total
- cost1 or cost2 == 1 (maximal number of combinations)
- total == 0 (only (0, 0) is possible)
- Negative or zero costs (problem constraint: costs > 0 expected)
- Large input values (possible overflow — should use long/int64 in implementation)

### Solution

```python
def waysToBuyPensPencils(total: int, cost1: int, cost2: int) -> int:
    ways = 0
    max_pens = total // cost1
    for pen_count in range(max_pens + 1):
        remaining = total - pen_count * cost1
        # For the current pen count, max pencils possible
        max_pencils = remaining // cost2
        # For each pen_count, include all possible numbers of pencils (from 0 up to max_pencils)
        ways += max_pencils + 1
    return ways
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(⌊total / cost1⌋).  
  We iterate over every possible number of pens (from 0 to ⌊total/cost1⌋). For each, calculation is O(1).
- **Space Complexity:** O(1).  
  We use only a fixed number of variables. No extra storage grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have a cap on the number of pens or pencils you can buy?
  *Hint: Add min(max allowed, total // cost) constraints for the loops.*
  
- How do you extend this to 3 or more types of items?
  *Hint: For two items we used one linear loop; for three, nested two loops, and so on.*
  
- Suppose pens and pencils must be bought in pairs (e.g., only consider combinations where pens == pencils)?
  *Hint: Only count tuples (x, y) where x == y, and x × cost1 + y × cost2 ≤ total.*

### Summary
This problem uses the *combinatorial counting* pattern by fixing one variable (number of pens) and analytically counting the number of possibilities for the other (number of pencils). The key trick is to recognize the pattern in the constraints (linear budget equation) and avoid brute-force enumeration. This approach generalizes to many “number of solutions to linear equation under constraints” type problems.