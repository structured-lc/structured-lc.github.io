### Leetcode 3426 (Hard): Manhattan Distances of All Arrangements of Pieces [Practice](https://leetcode.com/problems/manhattan-distances-of-all-arrangements-of-pieces)

### Description  
Given an m × n grid and k identical pieces (no more than one in any cell), compute the sum (over all valid placements of k pieces) of the total Manhattan distances between every pair of pieces. Return this sum modulo 10⁹+7.

Each arrangement is a set of k distinct cells on the grid; for each, consider all 0 ≤ i < j < k, sum |xᵢ - xⱼ| + |yᵢ - yⱼ| (Manhattan distance between piece i and piece j). Compute the sum over all possible such arrangements.

### Examples  

**Example 1:**  
Input: `m = 2, n = 2, k = 2`  
Output: `8`  
*Explanation: There are 6 possible pairs: (0,0)-(0,1), (0,0)-(1,0), (0,0)-(1,1), (0,1)-(1,0), (0,1)-(1,1), (1,0)-(1,1). Each has Manhattan distance 1 or 2. Total: 8.*

**Example 2:**  
Input: `m = 1, n = 3, k = 2`  
Output: `4`  
*Explanation: Pairs: (0,0)-(0,1)=1, (0,0)-(0,2)=2, (0,1)-(0,2)=1. These 3 × C(1,1)=3 arrangements. Sum: 4.*

**Example 3:**  
Input: `m = 3, n = 3, k = 2`  
Output: `72`  
*Explanation: There are C(9,2)=36 arrangements; each pair is repeated. Sum all pairwise distances (see code comment).*

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:** For all possible subsets of k cells out of m × n, sum all pairwise Manhattan distances.  
- This is infeasible for larger m, n, k—the total number of arrangements is C(m\*n, k).
- **Insight:** Every unordered pair of cells (a, b) appears in exactly C(m\*n−2, k−2) arrangements (since k−2 other pieces go in remaining cells).
- Thus, instead of enumerating every arrangement, compute:  
  (number of times each pair appears) × (sum of Manhattan distances over all unordered pairs).
- **Further:** The Manhattan distance between (x₁, y₁) and (x₂, y₂) splits into row and column part: |x₁ - x₂| + |y₁ - y₂|.
    - When summing over all unordered pairs, the row and column contributions are separable.
    - For row contribution: for each possible row distance d = 1..m-1, there are (m-d) pairs of rows at distance d, and for each, each pair of columns is possible: n².
    - So total row contribution: n² × ∑₍d=1₎^{m-1} d × (m-d)
    - Column part is analogous: m² × ∑₍d=1₎^{n-1} d × (n-d)

- **Final total:** (number of times each pair occurs) × (row_contribution + col_contribution)
    - Where number of times each pair appears is C(m\*n−2, k−2)

- **Tradeoff:** Mathematical approach avoids enumeration, can be done in O(1) (ignoring factorial computations).

### Corner cases to consider  
- k = 1 (no pair, so answer is 0)
- m = 1 or n = 1 (row or column grid)
- k > m\*n (invalid, should not occur)
- Very large m, n, k (modulo and big ints needed)
- k = m\*n (all cells used: every pair possible)

### Solution

```python
import math

MOD = 10**9 + 7

class Solution:
    def distanceSum(self, m: int, n: int, k: int) -> int:
        # Corner case: k < 2, no pairs
        if k < 2: return 0

        total = 0

        # Row part: n² × sum_{d=1}^{m-1} d × (m-d)
        row_contrib = n * n * sum(d * (m - d) for d in range(1, m))
        # Column part: m² × sum_{d=1}^{n-1} d × (n-d)
        col_contrib = m * m * sum(d * (n - d) for d in range(1, n))

        pair_sum = (row_contrib + col_contrib) % MOD

        # Each pair appears in C(m*n-2, k-2) arrangements
        comb = math.comb(m * n - 2, k - 2) if k >= 2 else 0

        result = (pair_sum * comb) % MOD
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n + logN)  
    - row_contrib and col_contrib are computed by single loops (up to m and n).
    - math.comb can be O(k) for large parameters (or constant if Python's internal is optimized).
- **Space Complexity:** O(1) extra space (no data structures scale with input).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the k pieces are distinguishable (not identical)?
  *Hint: Consider if pair symmetry still applies.*

- If some cells are blocked or unavailable, how would you adapt the formula?
  *Hint: Only sum over allowed cell pairs and recompute combinations.*

- Can you efficiently handle online updates for k, m, or n after preprocessing?
  *Hint: Precompute and cache partial sums/combinations.*

### Summary
This problem leverages combinatorial counting (combinations and pair frequencies) and symmetry in the Manhattan metric to avoid brute-force enumeration—an instance of the "multiply by frequency" technique. It can be applied to similar problems involving pairwise metrics over subsets of grids (e.g., VLSI, distributions, combinatorial counting, etc.). Pattern: **pairwise counting, symmetry, mathematical reduction**.

### Tags
Math(#math), Combinatorics(#combinatorics)

### Similar Problems
