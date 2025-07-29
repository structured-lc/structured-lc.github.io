### Leetcode 1692 (Hard): Count Ways to Distribute Candies [Practice](https://leetcode.com/problems/count-ways-to-distribute-candies)

### Description  
Given n identical candies and k children, each child may get any number of candies (including zero), but there are some restrictions: for the i (1 ≤ i ≤ k) child, they must get **at least** `lower[i]` candies and at most `upper[i]` candies. Return the total number of **ways to distribute the candies** so that all these bounds are satisfied. (Output modulo 10⁹+7.)

### Examples  

**Example 1:**  
Input: `n=5`, `k=2`, `lower=[1,2]`, `upper=[3,3]`  
Output: `2`  
*Explanation: (1,4) and (2,3) are valid; (3,2) is invalid because 3>upper.*

**Example 2:**  
Input: `n=6`, `k=3`, `lower=[0,1,3]`, `upper=[3,3,3]`  
Output: `1`  
*Explanation: Only (2,1,3) satisfies all bounds.*

**Example 3:**  
Input: `n=3`, `k=4`, `lower=[0,0,0,0]`, `upper=[1,1,1,1]`  
Output: `4`  
*Explanation: All ways to give at most 1 candy to each child so total is 3; (1,1,1,0) and its permutations.*

### Thought Process (as if you’re the interviewee)  
This is a "**stars and bars** with bounds" combinatorics problem. First, subtract lower[i] from n for each child (filling in minimums). Now, for each child, the extra they can get is (upper[i]-lower[i]); for k children we want total number of integer solutions where each extra is in [0, upper[i]-lower[i]]. This is handled via **inclusion-exclusion**: For each subset of the k children, subtract the cases where you assign more than upper[i] to some children (by overfilling and counting these cases accordingly with alternating +/− signs).

### Corner cases to consider  
- All lower[i]=upper[i]=0: Only one way (n must be zero).
- Impossible distributions (sum of lower[i]>n or sum of upper[i]<n): Return 0.
- Some children can't get any candies.

### Solution

```python
MOD = 10**9 + 7
from math import comb

def countWays(n, k, lower, upper):
    # Adjust n for minimum bounds
    n -= sum(lower)
    if n < 0:
        return 0
    bounds = [upper[i] - lower[i] for i in range(k)]
    res = 0
    # Inclusion-Exclusion Principle
    for mask in range(1 << k):
        total = n
        bits = 0
        for i in range(k):
            if (mask >> i) & 1:
                total -= bounds[i] + 1   # overstep bound for child i
                bits += 1
        if total < 0:
            continue
        # stars and bars: C(total + k -1, k - 1)
        ways = comb(total + k - 1, k - 1)
        if bits % 2 == 0:
            res = (res + ways) % MOD
        else:
            res = (res - ways) % MOD
    return res % MOD
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(2ᵏ × k) (because all subsets of children)
- **Space Complexity:** O(1) (apart from small integers)


### Potential follow-up questions (as if you’re the interviewer)  
- Can you optimize for large k?  
  *Hint: Can you avoid full inclusion-exclusion?*

- What if upper[i]=∞?  
  *Hint: Can use just lower bounds and classic stars and bars.*

- Can you handle multiple constraints per child?  
  *Hint: Consider more complex constraint systems or DP.*

### Summary
This is a constrained integer partition problem, solved via "stars and bars with inclusion-exclusion principle". It's a classic in combinatorics and appears in many applications involving bounded resource allocation.