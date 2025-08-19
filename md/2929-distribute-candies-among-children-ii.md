### Leetcode 2929 (Medium): Distribute Candies Among Children II [Practice](https://leetcode.com/problems/distribute-candies-among-children-ii)

### Description  
Given two integers, **n** (number of candies) and **limit** (maximum a child can receive), calculate how many ways you can distribute all the candies among 3 children so that no child gets more than **limit** candies. Each distribution should use all candies and every child’s count must be 0 ≤ x ≤ limit.

### Examples  

**Example 1:**  
Input: `n = 5, limit = 2`  
Output: `3`  
*Explanation: The only valid distributions are (1,2,2), (2,1,2), and (2,2,1). No child gets more than 2.*

**Example 2:**  
Input: `n = 3, limit = 3`  
Output: `10`  
*Explanation: Valid ways are: (0,0,3), (0,1,2), (0,2,1), (0,3,0), (1,0,2), (1,1,1), (1,2,0), (2,0,1), (2,1,0), (3,0,0).*

**Example 3:**  
Input: `n = 7, limit = 3`  
Output: `0`  
*Explanation: Each child can get at most 3, but 3+3+3 = 9 > 7, so at least one gets less. Trying all combinations with each ≤ 3, you can't sum to 7. There are no valid ways.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea: enumerate all triplets (a, b, c) such that a + b + c = n and 0 ≤ a, b, c ≤ limit. For each, count if valid.
- For a triple for- loop, for a=0..limit, b=0..limit: c = n - a - b. If c in range, count.
- Since n, limit ≤ 10⁶, but **with only 3 children**, even O(limit²) is tractable if carefully bounded.
- The final approach:  
  - Iterate a from 0 to min(limit, n). For each, iterate b from 0 to min(limit, n-a). Compute c = n - a - b.  
  - If c ∈ [0, limit], it's valid, count it.
- This is more efficient than generating all 3-tuples up to limit because it skips impossible c directly.

### Corner cases to consider  
- n = 0 (zero candies): only possible if all children get 0.
- limit = 0 (can only give no candies to anyone).
- limit > n: can any child get up to n? Sure, count as usual.
- n > 3×limit (impossible to distribute without exceeding the limit).
- Cases where only one distribution possible (e.g. n=0).
- Large values at the limit boundary.

### Solution

```python
def distribute_candies(n, limit):
    # Initialize ways counter
    ways = 0
    # Try all possible values for the first child (a)
    for a in range(0, min(limit, n) + 1):
        # For each a, try values for the second child (b)
        # b can go from 0 to min(limit, n - a)
        max_b = min(limit, n - a)
        for b in range(0, max_b + 1):
            # Third child gets c = n - a - b
            c = n - a - b
            # Check if c is within the limit
            if 0 <= c <= limit:
                ways += 1
    return ways
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(limit²)  
  For each a (from 0 to min(limit, n)), for each b (from 0 to min(limit, n-a)), one calculation for c and one check. For the problem's constraints (small n, limit), this is acceptable.
- **Space Complexity:** O(1)  
  Only a few integer variables for iteration and counting. No extra data structures grow with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of children is not fixed to 3 but is k?  
  *Hint: How would you generalize the triple loop? Is there a combinatorial formula?*

- Can you solve this without explicit enumeration using combinatorics?  
  *Hint: Stars and Bars Principle—but bound each child’s candies.*

- What if the number of candies or limit can be very large, and we need it modulo 10⁹+7?  
  *Hint: Use closed-form or fast recursions instead of brute-force enumeration.*

### Summary
This approach uses **bounded brute-force enumeration for small k** (here, 3), leveraging that it's feasible for reasonable `limit` and `n`. The problem is a variation of **integer partitioning with capped summands**, a classic combinatorics/interview topic. The same logic extends (using more efficient methods) to k children—e.g., by inclusion-exclusion principle, or generating functions for advanced cases. This pattern is seen in distributing items with upper-limits, like dice counting, resource allocation, or bounded knapsack subproblems.

### Tags
Math(#math), Combinatorics(#combinatorics), Enumeration(#enumeration)

### Similar Problems
- Count Ways to Distribute Candies(count-ways-to-distribute-candies) (Hard)