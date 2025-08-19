### Leetcode 2485 (Easy): Find the Pivot Integer [Practice](https://leetcode.com/problems/find-the-pivot-integer)

### Description  
Given a positive integer `n`, find the **pivot integer** x such that the sum of integers from 1 to x (inclusive) is equal to the sum of integers from x to n (inclusive).  
If such an x exists, return it. Otherwise, return -1. There is at most one pivot integer for any input n.

### Examples  

**Example 1:**  
Input: `n = 8`  
Output: `6`  
*Explanation: The sum 1+2+3+4+5+6 = 21, the sum 6+7+8 = 21. So x = 6.*

**Example 2:**  
Input: `n = 1`  
Output: `1`  
*Explanation: The sum 1 = 1; so x = 1 is valid since both sums are 1.*

**Example 3:**  
Input: `n = 4`  
Output: `-1`  
*Explanation: No integer x (1 ≤ x ≤ 4) gives equal sums. All possible x fail the condition.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all values of x from 1 to n. For each, compute sum₁ = 1+2+...+x and sum₂ = x+...+n, compare if equal. This uses two loops or prefix sums.  
  For each x:  
    - sum₁ = x × (x+1) ÷ 2  
    - sum₂ = n × (n+1) ÷ 2 - (x-1) × x ÷ 2  
  This is O(n), which is acceptable for n ≤ 1000.

- **Optimize with Math:**  
  The equation:  
  sum₁ = sum₂  
  x × (x+1)/2 = n × (n+1)/2 - (x-1)×x/2  
  Rearranging gives:  
  x² = n × (n+1)/2  
  So:  
  x = sqrt(n × (n+1)/2)  
  x must be an integer.

- **Approach Used:**  
  Compute k = n × (n+1)/2.  
  If k is a perfect square, return x = sqrt(k); else return -1.  
  This is O(1).

### Corner cases to consider  
- n = 1 (should handle smallest input)
- n > 1 but no possible pivot integer (e.g., n = 4)
- Large n close to 1000 (integer overflow? But constraints are safe.)
- n where k is not a perfect square

### Solution

```python
def pivotInteger(n):
    # Compute total sum, which is n × (n+1) ÷ 2
    total = n * (n + 1) // 2
    
    # Try to find integer x such that x² == total
    x = int(total ** 0.5)
    
    # If x² == total, return x; else -1
    if x * x == total:
        return x
    else:
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), because we use only arithmetic operations and a square-root.
- **Space Complexity:** O(1), no extra storage except a few variables; no recursion or additional data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be very large (e.g., up to 10⁹)?
  *Hint: Watch out for integer overflow in the calculation, and use data types that can hold large values for n × (n+1)/2.*

- How would you modify your solution if asked for all possible pivot integers in [1, n]?
  *Hint: The math constraint allows at most one pivot integer here, but in similar problems, consider iterating and checking the sum formula for each x.*

- Can this be extended for non-consecutive ranges or custom sequences?
  *Hint: The formula is based on the sum of arithmetic progression. With custom sequences, consider prefix sums.*

### Summary
This problem uses a **math insight pattern**, reducing a search to a simple property of arithmetic series: x² = n×(n+1)/2. The trick is to check if the total sum up to n is a perfect square — then its root is the answer. This “use math to avoid iteration” pattern is common, especially in digit, sum, and index pivot problems. It’s useful in any situation involving balancing sums or symmetry in arithmetic series.

### Tags
Math(#math), Prefix Sum(#prefix-sum)

### Similar Problems
- Bulb Switcher(bulb-switcher) (Medium)