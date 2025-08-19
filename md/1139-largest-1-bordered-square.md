### Leetcode 1139 (Medium): Largest 1-Bordered Square [Practice](https://leetcode.com/problems/largest-1-bordered-square)

### Description  
Given a 2D binary grid filled with `0`s and `1`s, find the area of the largest square subgrid where every cell on its border is `1`. Only the cells on the square's edges (not necessarily its interior) must be `1`. If no such square exists, return `0`. The square's area is calculated as side × side.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,1],[1,0,1],[1,1,1]]`  
Output: `9`  
*Explanation: All cells of the 3×3 grid have 1s on their border, so the largest such square has area 9.*

**Example 2:**  
Input: `grid = [[1,1,0,0]]`  
Output: `1`  
*Explanation: Only single-cell squares are possible here. The largest has area 1.*

**Example 3:**  
Input: `grid = [[0,0],[0,0]]`  
Output: `0`  
*Explanation: There are no cells with 1s, so no valid square exists.*

### Thought Process (as if you’re the interviewee)  
At first, brute force comes to mind: for every possible square in the grid, check if its borders are all `1`. But iterating over all possible sub-squares and checking their borders individually would be too costly, especially for large grids. This would result in time complexity O(n³ × side), which is not efficient.

To optimize, I can utilize **dynamic programming**:
- For each cell `(i, j)`, calculate:
  - The number of consecutive `1`s to its left (including itself).
  - The number of consecutive `1`s above it (including itself).
- Store these counts for every cell.
- Then, for each cell (as a potential bottom-right corner of a square), try out possible square sizes (from large to small). The square ending at `(i, j)` is valid if:
  - The left and right borders have ≥ k consecutive 1s vertically.
  - The top and bottom borders have ≥ k consecutive 1s horizontally.
- Return area k × k for the largest k found.

This DP approach makes border checks O(1) per candidate, and the main runtime O(n³) as you check all possible squares[1][2].

### Corner cases to consider  
- All zeros: grid has no ones, should return 0.
- Single row or column: only 1×1 squares may be possible.
- Only the border cells are `1`, but center(s) are `0`.
- Multiple candidate squares: pick the area with the largest k.
- Minimum grid size (1×1), or non-square grids.
- Grids where all cells are `1`.

### Solution

```python
def largest1BorderedSquare(grid):
    m, n = len(grid), len(grid[0])
    # DP matrices for consecutive 1s to left and up
    left = [[0] * n for _ in range(m)]
    up   = [[0] * n for _ in range(m)]

    # Fill DP arrays
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                left[i][j] = left[i][j-1] + 1 if j > 0 else 1
                up[i][j]   = up[i-1][j]   + 1 if i > 0 else 1

    max_side = 0
    # Try each cell as bottom-right of square
    for i in range(m):
        for j in range(n):
            # Try all possible square sizes ending at (i, j)
            small = min(left[i][j], up[i][j])
            while small > 0:
                # Check top and left borders
                if left[i - small + 1][j] >= small and up[i][j - small + 1] >= small:
                    max_side = max(max_side, small)
                    break  # Larger squares checked already
                small -= 1

    return max_side * max_side
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × min(m, n))  
  For every cell, at worst, we try all possible square sides up to min(m, n).  
- **Space Complexity:** O(m × n)  
  Two DP matrices of the same size as the input grid are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the square can have some zeros inside (only the border must be 1)?
  *Hint: This doesn't change the algorithm, as only borders matter.*

- How to adjust the solution for rectangles with all 1 borders?
  *Hint: Add logic to handle rectangles instead of just squares.*

- How would you optimize if only the area (not actual cells) is needed?
  *Hint: Current solution already returns the area; storing only max_side is enough.*

### Summary
This problem leverages the **2D prefix sum / dynamic programming over grids** pattern to preprocess consecutive runs of 1s. This reduces the complexity of checking potential borders from O(k) to O(1), yielding an efficient solution. The same technique is used in other subgrid or submatrix “all border ___” or “all cells satisfy ___” problems. Pattern is versatile for maximal rectangle/square/region detection problems in 2D arrays.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
