### Leetcode 64 (Medium): Minimum Path Sum [Practice](https://leetcode.com/problems/minimum-path-sum)

### Description  
Given an `m × n` grid filled with **non-negative integers**, your task is to find a path from the **top-left corner** (0, 0) to the **bottom-right corner** (m-1, n-1) that **minimizes the sum of all numbers along the path**.  
You can move **only right or down** at any step.  
Return the minimum path sum possible.

### Examples  

**Example 1:**  
Input: `grid = [[1,3,1],[1,5,1],[4,2,1]]`  
Output: `7`  
*Explanation: The path 1 → 3 → 1 → 1 → 1 gives a sum of 7.*

**Example 2:**  
Input: `grid = [[1,2,3],[4,5,6]]`  
Output: `12`  
*Explanation: The path 1 → 2 → 3 → 6 totals 12.*

**Example 3:**  
Input: `grid = [[1]]`  
Output: `1`  
*Explanation: Single cell path; sum is 1.*

### Thought Process (as if you’re the interviewee)  
The brute-force way is to try every possible path from top-left to bottom-right, summing the values and picking the smallest sum.  
But since at each cell you can only go right or down, and there are exponentially many paths (`2^(m+n)`), this approach is too slow.  

We can recognize **overlapping subproblems** and use **Dynamic Programming**:
- At each cell (i, j), the minimal path sum is the cell's value plus the minimum of the path sums arriving from the cell above or the cell to the left.
- We build up from the top-left, filling a `dp` table where `dp[i][j]` is the minimal path sum to (i, j).
- Optionally, we can **reuse the input grid for O(1) extra space per cell**.

**Why DP?**  
- Efficient (O(m × n)), avoids repeat work by caching.
- Simple transitions: current cell only needs left and up neighbors.

### Corner cases to consider  
- 1 × 1 grid (single element).
- All 0 grid values (easiest sum).
- All cells with the same value.
- Only 1 row or 1 column.
- Large grids (stress test for DP).
- Big numbers: avoid overflow (if language is not Python).
- Paths forced to go along one edge before moving (e.g., all right then all down).

### Solution

```python
def minPathSum(grid):
    m, n = len(grid), len(grid[0])

    # We can fill the grid in place, since each cell only needs left and up neighbors.

    for i in range(m):
        for j in range(n):

            if i == 0 and j == 0:
                continue  # start cell
            elif i == 0:
                # First row: can only come from the left
                grid[i][j] += grid[i][j-1]
            elif j == 0:
                # First column: can only come from above
                grid[i][j] += grid[i-1][j]
            else:
                # Minimum of coming from the top or from the left
                grid[i][j] += min(grid[i-1][j], grid[i][j-1])

    return grid[m-1][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  Each cell is visited exactly once, filling its minimal sum.

- **Space Complexity:** O(1) **extra** space if modifying the input grid;  
  otherwise, O(m × n) if allocating a separate DP table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can also move diagonally down-right?  
  *Hint: Update the dp transition to consider (i-1, j-1).*

- What if you want to reconstruct and print the actual path, not just its sum?  
  *Hint: Maintain pointers to track the parent of each cell, then backtrack after reaching (m-1, n-1).*

- What if some cells are blocked (cannot step on certain grid positions)?  
  *Hint: Model blocked cells with a special value (like None or inf), and skip them in your DP.*

### Summary
This problem is classic **dynamic programming on a grid**—sometimes called a “min path sum in a matrix” problem.  
It teaches the pattern of building a solution using previously computed subproblem results, with DP transitions based on allowed moves (right and down).  
This approach is broadly useful in pathfinding, robotics, and games, and is the foundation for variations like unique paths, maximal path sum, and obstacle grids.


### Flashcard
Use DP: min path sum to (i,j) = grid[i][j] + min(top, left); fill the grid in-place or with a DP table.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Unique Paths(unique-paths) (Medium)
- Dungeon Game(dungeon-game) (Hard)
- Cherry Pickup(cherry-pickup) (Hard)
- Minimum Path Cost in a Grid(minimum-path-cost-in-a-grid) (Medium)
- Maximum Number of Points with Cost(maximum-number-of-points-with-cost) (Medium)
- Minimum Cost Homecoming of a Robot in a Grid(minimum-cost-homecoming-of-a-robot-in-a-grid) (Medium)
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)
- Check if There is a Path With Equal Number of 0's And 1's(check-if-there-is-a-path-with-equal-number-of-0s-and-1s) (Medium)
- Minimum Cost of a Path With Special Roads(minimum-cost-of-a-path-with-special-roads) (Medium)