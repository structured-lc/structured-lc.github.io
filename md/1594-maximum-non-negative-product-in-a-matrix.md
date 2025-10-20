### Leetcode 1594 (Medium): Maximum Non Negative Product in a Matrix [Practice](https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix)

### Description  
Given an m × n grid of integers, each move you can go **right or down**. Start at top-left (0,0) and reach bottom-right (m-1,n-1), multiplying the numbers you cross. Find the **maximum non-negative product modulo 10⁹+7** along a path. If no such path exists, return -1. The grid can have negative numbers, and number of rows/columns is at least 1.

### Examples  
**Example 1:**  
Input: `grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]`  
Output: `-1`  
*Explanation: Any path yields a negative product; so output -1.*

**Example 2:**  
Input: `grid = [[1,-2,1],[1,-2,1],[3,-4,1]]`  
Output: `8`  
*Explanation: Path: (0,0)->(1,0)->(2,0)->(2,1)->(2,2), product = 1 × 1 × 3 × -4 × 1 = -12. But the path (0,0)->(0,1)->(0,2)->(1,2)->(2,2) = 1×-2×1×1×1 = -2. The maximum non-negative product is 8. (Find the path (0,0)->(1,0)->(1,1)->(2,1)->(2,2): 1×1×-2×-4×1=8.*

**Example 3:**  
Input: `grid = [[1, 3],[0,-4]]`  
Output: `0`  
*Explanation: Take the path through the 0. 1→0→0, product is 0.*

### Thought Process (as if you’re the interviewee)  
Since there are negative numbers, the **max product so far** could flip to min product after multiplying with a negative, and vice versa. So, for each cell, track **both the max and min product** reaching it. At (i,j), the max product is the **max of previous max/min × grid[i][j]**. Bottom-right cell: if the max is negative, no non-negative product exists. Edge cases: be careful with zeros (they can "reset" the product to 0, possibly being the maximum). DP solution is natural here.

### Corner cases to consider  
- Zeros in the grid
- Only negative paths possible
- All positive numbers
- Only one cell
- Large numbers causing overflow (but use modulo)

### Solution

```python
MOD = 10**9 + 7
def maxProductPath(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    max_dp = [[0]*n for _ in range(m)]
    min_dp = [[0]*n for _ in range(m)]
    max_dp[0][0] = min_dp[0][0] = grid[0][0]
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue
            vals = []
            if i > 0:
                vals.extend([max_dp[i-1][j], min_dp[i-1][j]])
            if j > 0:
                vals.extend([max_dp[i][j-1], min_dp[i][j-1]])
            max_prod = max(val * grid[i][j] for val in vals)
            min_prod = min(val * grid[i][j] for val in vals)
            max_dp[i][j] = max_prod
            min_dp[i][j] = min_prod
    res = max_dp[-1][-1]
    return res % MOD if res >= 0 else -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(mn), as it visits every cell once.
- **Space Complexity:** O(mn) for the two DP tables (max and min product per cell).

### Potential follow-up questions (as if you’re the interviewer)  
- How to optimize for space?
  *Hint: Only last row/column needed at a time – use rolling arrays.*

- What if you could also move left or up? (cycles possible)
  *Hint: Need to avoid infinite loops – new problem, use BFS with memo.*

- What if you must print the path as well?
  *Hint: Trace back the path by storing parent cells with DP.*

### Summary
This is a DP problem with max/min tracking, common when sign flips are possible (like "Max Product Subarray"). The dual-table pattern is widely applicable in problems involving negative transitions.


### Flashcard
Track both max and min product at each cell in DP (since negatives flip min/max); edge case: zero can reset product.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
