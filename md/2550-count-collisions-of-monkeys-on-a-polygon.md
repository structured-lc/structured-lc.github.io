### Leetcode 2550 (Medium): Count Collisions of Monkeys on a Polygon [Practice](https://leetcode.com/problems/count-collisions-of-monkeys-on-a-polygon)

### Description  
Given **n** monkeys, each placed at a distinct vertex of an n-sided regular polygon, every monkey simultaneously chooses to jump to the adjacent vertex on either its left (counter-clockwise) or right (clockwise). If two or more monkeys land on the same vertex after jumping, a **collision** happens.  
The task: **Count the number of distinct ways** the monkeys can move such that at least one collision happens. Return your answer modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `14`  
*Explanation: 2⁴ = 16 possible movement patterns. Only two patterns (all clockwise or all counter-clockwise) result in no collisions. All other 14 ensure at least one collision.*

**Example 2:**  
Input: `n = 3`  
Output: `6`  
*Explanation: 2³ = 8 total movement patterns. Only 2 patterns have no collision. Other 6 cause at least one collision.*

**Example 3:**  
Input: `n = 5`  
Output: `30`  
*Explanation: 2⁵ = 32 total movement patterns. Only 2 no-collision cases. 32 - 2 = 30 patterns have a collision.*

### Thought Process (as if you’re the interviewee)  
To start, for each monkey there are 2 choices (clockwise or counter-clockwise), so there are 2ⁿ total combinations.  
When might there **not** be a collision?  
- If all monkeys move clockwise, each lands on the next vertex. Since their order is preserved, there are no collisions.
- If all monkeys move counter-clockwise, same result—no collisions.

Any deviation from all-in-one-direction causes at least one overlap (collision), because this disrupts the permutation cycle and leads to overlapping moves due to the structure of the polygon.

So, **only 2 out of 2ⁿ total configurations** have no collisions (all-cw, all-ccw). All others lead to at least one collision.

Thus, the answer is simply `2ⁿ - 2` (modulo 10⁹+7).

**Optimizations:**  
- For big n, we must use fast exponentiation (exponentiation by squaring) for the calculation.

### Corner cases to consider  
- n = 1: Only one monkey, 2¹ = 2 patterns. But both moves bring monkey to itself, so all have no collision.
- n = 2: Two monkeys, 2² = 4 options but only all same direction don't collide.
- Very large n: Must avoid overflow, use modulo 10⁹+7.
- Edge case: Ensure answer is non-negative after modulo (if subtraction leads to negative).

### Solution

```python
def countCollisions(n):
    MOD = 10 ** 9 + 7
    # Calculate 2^n % MOD
    total = pow(2, n, MOD)
    # Subtract the two non-collision cases
    result = (total - 2) % MOD
    # For n=1, can't have negative result, so ensure non-negative answer
    return result if result >= 0 else (result + MOD)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), due to fast exponentiation (`pow` in Python is efficient).
- **Space Complexity:** O(1), as only a few variables are used and no recursion or data structures depend on n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of 2 directions, monkeys could move to any other vertex?
  *Hint: Consider permutations or arrangements. How does problem structure change?*
  
- How would you compute the **expected number** of collisions?
  *Hint: Use concepts from probability, linearity of expectation.*

- If the monkeys jump multiple times, how many collisions after t steps?
  *Hint: Think about cycles or Markov processes on the polygon.*

### Summary
This problem uses the **counting principle** and combinatorics: for n monkeys, 2ⁿ possible moves, minus the only 2 collision-free cases. The pattern—subtracting exceptional cases from a full set—is common in combinatorial problems, e.g. derangements, cycle arrangements, etc. Fast exponentiation for large n is a frequent coding interview pattern and broadly applicable for modular arithmetic in combinatorics.

### Tags
Math(#math), Recursion(#recursion)

### Similar Problems
- Pow(x, n)(powx-n) (Medium)