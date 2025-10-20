### Leetcode 343 (Medium): Integer Break [Practice](https://leetcode.com/problems/integer-break)

### Description  
Given an integer n (n ≥ 2), split it into the sum of at least two positive integers and return the **maximum product** you can get from those integers.  
For example, for n = 10, one way to split it is 3 + 3 + 4, and the product is 36.  
The challenge is to figure out how to split n so that the product of its parts is as large as possible.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `1`  
*Explanation: The only way to split 2 is 1 + 1. 1 × 1 = 1.*

**Example 2:**  
Input: `n = 10`  
Output: `36`  
*Explanation: 10 can be split as 3 + 3 + 4 for a product 3 × 3 × 4 = 36, which is greater than, for example, 5 + 5 = 25.*

**Example 3:**  
Input: `n = 8`  
Output: `18`  
*Explanation: The optimal split is 3 + 3 + 2 for 3 × 3 × 2 = 18.*

### Thought Process (as if you’re the interviewee)  
Start by considering all possible ways to break n into at least two parts and calculate their product (brute-force). But this becomes slow as n increases, due to the exponential number of splits.

Then think about dynamic programming: for each number up to n, use previously computed optimal products to build up the answer efficiently.

But by analyzing patterns in the products, we notice:
- Breaking into as many 3's as possible gives the best product.
- If you have a remainder of 1 after dividing n by 3, it's better to use a 4 (i.e., two 2's); so subtract 4 and use 4 × the product of remaining 3's.
- If the remainder is 2, use the remaining 2.

This approach is optimal due to mathematical properties: e.g., 2 × 2 × 2 < 3 × 3, and splitting larger numbers further usually helps the product grow.  
Thus, instead of splitting and testing, use this pattern directly for linear time.

### Corner cases to consider  
- n = 2: Only split possible is 1 + 1.
- n = 3: Must split into at least 2 parts, best is 2 + 1.
- n = 4: Both 2 + 2 and 3 + 1 should be checked (2 × 2 is optimal).
- Make sure the function never returns n itself, always a product of parts.

### Solution

```python
def integerBreak(n):
    # Handle the smallest cases directly.
    if n == 2:
        return 1
    if n == 3:
        return 2
    
    product = 1
    # Remove 3's until n becomes 4 or less
    while n > 4:
        product *= 3
        n -= 3
    # Multiply by the remaining n (which is 2, 3, or 4)
    product *= n
    return product
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). In practice, loop runs n // 3 times, so linear.
- **Space Complexity:** O(1). Only a few integer variables are used; no extra array or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this with pure dynamic programming?
  *Hint: Try storing the optimal product for each number up to n and build up result bottom-up.*

- Can you return all different ways to split n that yield the maximal product?
  *Hint: Modify logic to keep track of the splits that generate the max product, perhaps via backtracking or by storing paths.*

- How does this generalize if product of at least k parts is required?
  *Hint: Change your base cases and/or DP array initialization for arbitrary k.*

### Summary
The approach here is a neat example of **greedy optimization**, using mathematical reasoning about how to maximize products via integer splits. This sort of logic (breaking a number to maximize/minimize a function over its parts) appears in both math competitions and dynamic programming problems, especially those involving integer partitions or optimization of sum/product relationships.


### Flashcard
For n ≥ 4, break into as many 3's as possible for maximum product; use DP or math for O(1) solution.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximize Number of Nice Divisors(maximize-number-of-nice-divisors) (Hard)