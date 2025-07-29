### Leetcode 1895 (Medium): Largest Magic Square [Practice](https://leetcode.com/problems/largest-magic-square)

### Description  
Given an m × n grid of integers, find the size (side length) of the largest square subgrid such that it is a **magic square**: all rows, columns, and both diagonals of this k × k subgrid must sum to the same value. The numbers need not be unique. A 1 × 1 subgrid is trivially a magic square.  
Return the largest such k.

### Examples  

**Example 1:**  
Input: `grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]`  
Output: `3`  
*Explanation: The 3×3 square at grid[1][1] (==5) contains  
```
5 1 6  
5 4 3  
2 7 3  
```
- Each row, column, and diagonal sums to 12.*

**Example 2:**  
Input: `grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]`  
Output: `2`  
*Explanation: The 2×2 square at grid[1][1] (==3) is  
```
3 3  
3 3  
```
- Each row, column, and diagonal sums to 6.*

**Example 3:**  
Input: `grid = [[1,2],[3,4]]`  
Output: `1`  
*Explanation: No 2×2 square is magic, but any 1×1 cell is trivially magic.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each possible square in the grid, check if every row, column, diagonal, and anti-diagonal sums to the same value. For an m × n grid, there are about O(mn × k²) checks per k, leading to a high time complexity.
- **Optimization Insight:**  
    - Compute prefix sums for rows and columns to quickly get sums of any segment.
    - Similarly, precompute main and anti-diagonal prefix sums to accelerate diagonal checks.
    - Process from larger possible sizes (min(m, n)) down to 1. As soon as a magic square is found, that's the largest (early stop).

- **Space/Time Trade-off:**  
    - Prefix sums require extra O(mn) storage.
    - Row, column, and diagonal checks with prefix sums become O(1) per check.

- **Final Algorithm:**  
    1. Precompute prefix sums for rows, columns, both diagonals.
    2. Iterate over all top-left corners.
    3. For each possible size (down from max), check if square starting here is magic using fast sum checks.
    4. Return the largest size found.

### Corner cases to consider  
- 1×1 grid.
- All numbers the same (should allow maximum-size square).
- No magic square except smallest (1×1).
- Grid is not square (m ≠ n).
- Rows or columns sum, but not diagonals.
- Multiple small magic squares.

### Solution

```python
def largestMagicSquare(grid):
    m, n = len(grid), len(grid[0])
    # Precompute prefix sums for rows and columns
    row_sum = [[0]*(n+1) for _ in range(m)]
    col_sum = [[0]*n for _ in range(m+1)]
    for i in range(m):
        for j in range(n):
            row_sum[i][j+1] = row_sum[i][j] + grid[i][j]
            col_sum[i+1][j] = col_sum[i][j] + grid[i][j]

    # Precompute diagonals and anti-diagonal prefix sums
    diag = [[0]*(n+1) for _ in range(m+1)]         # main diagonal
    anti_diag = [[0]*(n+2) for _ in range(m+1)]    # anti-diagonal (offset by 1 for easier index)
    for i in range(m):
        for j in range(n):
            diag[i+1][j+1] = diag[i][j] + grid[i][j]
            anti_diag[i+1][j] = anti_diag[i][j+1] + grid[i][j]

    # Try all possible square sizes (largest first)
    for size in range(min(m, n), 0, -1):
        for i in range(m - size + 1):
            for j in range(n - size + 1):
                s = row_sum[i][j+size] - row_sum[i][j]  # Target sum
                flag = True
                # Row and column sums
                for x in range(size):
                    if (row_sum[i+x][j+size] - row_sum[i+x][j]) != s:
                        flag = False; break
                    if (col_sum[i+size][j+x] - col_sum[i][j+x]) != s:
                        flag = False; break
                if not flag: continue
                # Diagonals
                if (diag[i+size][j+size] - diag[i][j]) != s:
                    continue
                if (anti_diag[i+size][j] - anti_diag[i][j+size]) != s:
                    continue
                return size
    return 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × k), where k is the maximum side length (≤ min(m, n)). Each square tested uses O(k) time due to prefix sums.  
- **Space Complexity:** O(mn) for prefix sum tables of rows, columns, diagonals.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the values in the grid can be negative—does the approach change?  
  *Hint: Negative values do not affect the sum checks, but be careful with prefix sum boundaries.*

- What if the grid is extremely large, say 10,000 × 10,000, but only one square needs to be checked?  
  *Hint: Precompute prefix sums only for the required cell ranges, or avoid unnecessary preprocessing.*

- How could you extend this for higher dimensions (3D cubes being magic)?  
  *Hint: Extend prefix sum logic for extra axes and main diagonals in 3D.*

### Summary
This problem uses the **2D prefix sum** pattern to efficiently compute sum checks for multiple submatrices (rows, columns, diagonals) within O(1) time per check, after preprocessing. This approach generalizes to any problem involving sum constraints over sliding windows or subgrids, e.g., maximum sum submatrix, uniform subgrid validation, and many grid-based search tasks.