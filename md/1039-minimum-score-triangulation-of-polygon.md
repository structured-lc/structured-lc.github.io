### Leetcode 1039 (Medium): Minimum Score Triangulation of Polygon [Practice](https://leetcode.com/problems/minimum-score-triangulation-of-polygon)

### Description  
Given a convex n-sided polygon labeled with integer values in the array `A` (clockwise order), you must triangulate the polygon (split it into n−2 triangles). Each triangle's value is the product of its three vertices, and the score of a triangulation is the sum of these triangle values. The goal is to determine the **smallest possible total score** achievable by triangulating the polygon.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `6`  
Explanation: The polygon already forms a single triangle, so the only possible score is 1×2×3 = 6.

**Example 2:**  
Input: `[3,7,4,5]`  
Output: `144`  
Explanation:  
- Possible triangulations:  
  - (3×7×5) + (4×5×7) = 245  
  - (3×4×5) + (3×4×7) = 60 + 84 = 144  
- The minimum total score is **144**[1][3].

**Example 3:**  
Input: `[1,3,1,4,1,5]`  
Output: `13`  
Explanation: One optimal sequence forms triangles with values: 1×1×3 + 1×1×4 + 1×1×5 + 1×1×1 = 13[1][4].

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  Try every possible way to divide the polygon into triangles recursively. Each time we choose a third point to form a triangle, recursively solve the two resulting sub-polygons. This approach quickly becomes intractable as the number of ways grows exponentially.

- **Optimal approach - Dynamic Programming**:  
  Since the problem asks for the minimum score of partitioning into triangles, and the score of a partition only depends on which triangle boundaries are chosen (not the actual shape), we can use DP.  
  Let `dp[i][j]` represent the **minimum score to triangulate the subpolygon** from vertex `i` to vertex `j` (exclusive).  
  For any two points, try every possible third vertex `k` such that i < k < j, split the polygon into segments (i, k) and (k, j), and choose the split that minimizes the score:  
  `dp[i][j] = min(dp[i][k] + dp[k][j] + A[i] * A[k] * A[j])`  
  This is a classic DP with O(n³) time, which is acceptable for n ≤ 50.  
  We use memoization to avoid re-computation.

### Corner cases to consider  
- The polygon has exactly 3 vertices (base case: only one triangle).
- All vertices have equal values (various triangulations yield the same score).
- Highly skewed input where the length is at the minimum or maximum bound.
- Ensuring input always represents a convex polygon (guaranteed by constraints).

### Solution

```python
def minScoreTriangulation(A):
    n = len(A)
    # dp[i][j] holds the min triangulation score for subpolygon A[i..j]
    dp = [[0 for _ in range(n)] for _ in range(n)]
    
    # Build up gradually: window size from 3 to n
    for l in range(3, n + 1):  # length of subpolygon
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i][j] = float('inf')
            for k in range(i + 1, j):
                # triangulate (i, k, j) and sum scores of left and right parts
                score = dp[i][k] + dp[k][j] + A[i] * A[k] * A[j]
                if score < dp[i][j]:
                    dp[i][j] = score
    return dp[0][n - 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³).  
  There are O(n²) subproblems (`i, j` pairs), and for each subproblem, we check up to n options for k.

- **Space Complexity:** O(n²) for the DP table. No additional storage apart from this table and simple variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct the actual triangulation (not just the minimum score)?  
  *Hint: Store the `k` value that gave the minimal value for each dp[i][j] and backtrack to recover the split sequence.*

- If the polygon was not convex, would the problem change?  
  *Hint: Triangulation of non-convex polygons would require different techniques and validity checks.*

- Can you optimize space usage for this DP?  
  *Hint: Since each dp[i][j] only depends on smaller ranges, look for ways to reuse or compress storage.*

### Summary
This problem is a classic example of **interval dynamic programming** for optimal substructure problems with splitting points. The pattern closely resembles matrix chain multiplication and can be generalized for many problems that ask for optimal ways to “break” or “group” intervals. DP allows us to systematically try all splits while avoiding recomputation via memoization.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
