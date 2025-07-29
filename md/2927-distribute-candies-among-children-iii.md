### Leetcode 2927 (Hard): Distribute Candies Among Children III [Practice](https://leetcode.com/problems/distribute-candies-among-children-iii)

### Description  
You are given **n** candies and need to distribute them among **3 children**. No child may receive more than **limit** candies. 
Return the **number of ways** to distribute the candies where each child can get from 0 up to **limit** candies (inclusive), and the total candies distributed is exactly **n**.

### Examples  

**Example 1:**  
Input: `n = 5, limit = 2`  
Output: `3`  
Explanation: Ways are (1,2,2), (2,1,2), and (2,2,1). Each child gets at most 2.

**Example 2:**  
Input: `n = 3, limit = 3`  
Output: `10`  
Explanation: Ways are (0,0,3), (0,1,2), (0,2,1), (0,3,0), (1,0,2), (1,1,1), (1,2,0), (2,0,1), (2,1,0), and (3,0,0).

**Example 3:**  
Input: `n = 7, limit = 3`  
Output: `6`  
Explanation: Valid ways: (1,3,3), (2,2,3), (2,3,2), (3,1,3), (3,2,2), (3,3,1). (Note: All numbers ≤ 3 and sum to 7.)

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible combinations for the three children using three nested loops (0..min(limit, n)), and count only those where their sum is exactly n.  
  This is too slow for large n (up to 10⁸).

- **Combination formula (Stars and Bars):**  
  Without the limit constraint, the number of non-negative integer solutions to a₁ + a₂ + a₃ = n is C(n+2, 2).

- **Upper bound Constraint:**  
  To account for the “≤ limit” rule:  
  - Inclusion-Exclusion Principle:  
    - Count total, subtract cases where at least one child gets more than limit, then add back over-counted cases where two get more than limit, etc.
    - For each subset of children (1 to 3), subtract/add cases where those children exceed the limit (i.e., assign at least limit+1 candies to them).

- **Final formula:**  
  Total ways = C(n+2,2)  
  - 3 × C(n-(limit+1)+2,2)   (one child > limit)  
  + 3 × C(n-2*(limit+1)+2,2) (two children > limit)  
  - 1 × C(n-3*(limit+1)+2,2) (all three > limit)  
  (Only count terms where the argument to C is ≥ 2, else treat as 0.)

- **Efficient Combination Calculation:**  
  Since n can be very large, explicitly precomputing factorials isn’t feasible.  
  Use a direct formula for C(k,2):  
  - C(k,2) = k×(k−1)/2, and return 0 if k < 2.


### Corner cases to consider  
- n < 0, or limit < 0 (but constraints guarantee inputs are ≥ 1)
- n < limit (candidates can get all candies, still valid)
- limit large (limit > n)
- n = 0 (all get 0 candies)
- No valid way (e.g., n > 3×limit)

### Solution

```python
def distributeCandies(n: int, limit: int) -> int:
    # Helper for combinations C(k, 2)
    def comb2(k):
        if k < 2:
            return 0
        # C(k, 2) = k*(k-1)//2
        return k * (k - 1) // 2

    # Inclusion-exclusion
    total = comb2(n + 2)
    subtract1 = 3 * comb2(n - (limit + 1) + 2)
    add2 = 3 * comb2(n - 2 * (limit + 1) + 2)
    subtract3 = comb2(n - 3 * (limit + 1) + 2)

    ans = total - subtract1 + add2 - subtract3
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Only a constant number of arithmetic computations and conditional checks, regardless of n or limit.
- **Space Complexity:** O(1)  
  No extra storage proportional to input. Only uses a small number of integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this solution to **k children**?  
  *Hint: Think about generalizing the inclusion-exclusion principle to k variables.*

- If **some children must get at least 1 candy**, how would the formula change?  
  *Hint: Adjust the sum and limits before applying the stars-and-bars.*

- Can you enumerate all valid distributions for small n and limit?  
  *Hint: Use backtracking or recursion for small constraints.*

### Summary
This problem uses the **stars and bars** combinatorial method with inclusion-exclusion to handle upper limits.  
The key pattern is applying combinatorics and the inclusion-exclusion principle to distribution questions with upper bounds.  
This coding strategy appears in many “partition with bounds” problems, coin change variants, and integer solution count of equations under constraints.