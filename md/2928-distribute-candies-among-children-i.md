### Leetcode 2928 (Easy): Distribute Candies Among Children I [Practice](https://leetcode.com/problems/distribute-candies-among-children-i)

### Description  
You have **n candies** and need to distribute them among **3 children** so that each child gets between **0** and **limit** candies (inclusive), and **all candies are used**.  
Return the number of ways to distribute the candies satisfying these constraints.

### Examples  

**Example 1:**  
Input: `n=5, limit=2`  
Output: `6`  
*Explanation:  
Possible distributions \([a, b, c]\) with \(a+b+c = 5\), \(0 \leq a, b, c \leq 2\):  
- [1,2,2]  
- [2,1,2]  
- [2,2,1]  
- (No other way; all must be ≤ 2)*

**Example 2:**  
Input: `n=3, limit=3`  
Output: `10`  
*Explanation:  
All possible splits \([a, b, c]\) where \(a+b+c=3\), \(0 \leq a, b, c \leq 3\):  
- [0,0,3], [0,1,2], [0,2,1], [0,3,0], [1,0,2], [1,1,1], [1,2,0], [2,0,1], [2,1,0], [3,0,0]*

**Example 3:**  
Input: `n=8, limit=2`  
Output: `0`  
*Explanation:  
Maximum possible per child is 2. But 3×2 = 6 < 8, so there is **no way** to distribute 8 candies with this limit.*

### Thought Process (as if you’re the interviewee)  
First, this is a variation of the “stars and bars” (also called balls and bins/combinations with constraints):  
- For 3 children and n candies with **no upper bound**, the number of solutions is: C(n+3-1,3-1) = C(n+2,2).  
- The **limit** caps how many candies each child can get.

**Brute Force:**  
Try every possible assignment for a, b, c from 0..limit such that a + b + c = n.  
- Triple nested loop—possible since limit is small, but not optimal.

**Optimized approach:**  
- For each value a in 0..limit, and b in 0..limit, c = n - a - b.
- Only count if 0 ≤ c ≤ limit.  
- Reduce to two loops (a, b); check if c in bounds.  
- Time: O(limit²)

**Can we do even better?**  
- Some solutions use combinatorics with inclusion-exclusion, but for small constraints, the double loop is simple and sufficient.

### Corner cases to consider  
- n = 0 (all children get 0)
- limit = 0 (must distribute 0 candies)
- n > 3 × limit (impossible, result 0)
- n < 0 (invalid input)
- limit > n

### Solution

```python
def distributeCandies(n: int, limit: int) -> int:
    count = 0
    # Try every possible combo for the first and second child
    for a in range(0, min(limit, n) + 1):
        for b in range(0, min(limit, n - a) + 1):
            c = n - a - b
            # Check if third child's share is within the limit
            if 0 <= c <= limit:
                count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(limit²)  
  We loop at most (limit+1) × (limit+1) times: one loop for 'a', nested loop for 'b'.

- **Space Complexity:** O(1)  
  Only a constant number of variables. No extra storage that grows with n or limit.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of children is generalized to k?  
  *Hint: Think recursive or use combinatorial formulas with inclusion-exclusion; brute force becomes infeasible.*

- What if each child has a **different** individual limit?  
  *Hint: Instead of same `limit`, use [l₁, l₂, l₃] for each child and adapt the approach.*

- Can you solve this in O(1) time using combinatorial formulas?  
  *Hint: Review “stars and bars” with upper limits and use inclusion-exclusion principle.*

### Summary
This problem is a classic **bounded integer composition** with three parts (“stars and bars” with a cap).  
The pattern: **Enumerate all solutions with upper bounds via nested loops**—a practical approach for small fixed k (children) and reasonable limit. For large limits or more children, combinatorial/inclusion-exclusion or DP is better. This pattern appears in problems of distributing indistinguishable items to groups with max/min constraints.