### Leetcode 2304 (Medium): Minimum Path Cost in a Grid [Practice](https://leetcode.com/problems/minimum-path-cost-in-a-grid)

### Description  
Given an m × n grid of **distinct integers** and a moveCost table, find the minimum total cost to move from any cell in the **top row** to any cell in the **bottom row**.  
The cost of a "path" is the **sum of the grid values visited (one cell per row)** plus the sum of "move costs".  
The moveCost matrix is indexed by (value in current cell, destination column in the next row), and its value represents the extra cost to move from current cell to that column in the next row.  
At each step (except the last row), you can jump from any cell in the current row to any cell in the next row. The path length equals the number of rows.

### Examples  

**Example 1:**  
Input:  
``grid = [[5,3],[4,0],[2,1]]``,  
``moveCost = [[9,4],[6,7],[5,8],[7,6],[8,9],[14,3]]``  
Output: ``17``  
*Explanation:*
- One optimal path: 3 (top), move to col 1 (0), then move to col 1 (1).  
- Cost: 3 + moveCost[3][1]=6 + 0 + moveCost[1]=7 + 1 = 3+6+0+7+1 = 17.

**Example 2:**  
Input:  
``grid = [[5,1,2],[4,0,3]]``,  
``moveCost = [[12,10,15],[20,23,8],[21,7,1],[8,1,13],[9,10,25],[5,3,2]]``  
Output: ``6``  
*Explanation:*
- Path: start at 1 (col 1), move to 0 (col 1).  
- Cost: 1 + moveCost[1][1]=23 + 0 = 1 + 23 + 0 = 24 (But optimal is [2→3]: 2 + moveCost[2][2]=1 + 3 = 2+1+3 = 6).  
- Best path: start at col 2 in row 0 (value=2), jump to col 2 in row 1 (value=3); cost is 2 + moveCost[2][2]=1 + 3 = 6.

**Example 3:**  
Input:  
``grid = [[1],[2],[3]]``,  
``moveCost = [,,]``  
Output: ``6``  
*Explanation:*
- Only one possible path: 1 → 2 → 3, no real move choices.
- The path is the sum of all values: 1+2+3=6 + move costs (always 100; only once from 1 to 2 and 2 to 3). But moveCost is always on move, but since each row only has one column, only the path plus 100×2 moveCost = 1+100+2+100+3 = 206.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths from every starting cell in the first row, considering every option in each next row. Recursion or DFS, keeping track of cost at each step. Quickly becomes infeasible for large grids (exponential paths).
- **Optimal DP:** Realize overlaps: the minimum cost to reach cell (i, j) only depends on all possible parents in row i-1.  
  - DP definition: `dp[i][j] = min` cost to reach cell (i, j).
  - Base case: `dp[j] = grid[j]`.
  - At each cell (i, j):  
    For every k in 0..n-1 (prev row):  
      dp[i][j] = min(dp[i][j], dp[i-1][k] + moveCost[grid[i-1][k]][j] + grid[i][j])
- **Why optimal:** Follows "path to cell only cares about its min incoming cost", can be done in O(m*n^2).
- **Trade-offs:** DP uses O(mn) space but can be optimized to just O(n).

### Corner cases to consider  
- Only one row: no movement costs, just the min value in the first row.
- Only one column: always a single path straight down; just compute sum of values + moveCost if applied.
- MoveCost values are large: all must be considered, no skipping.
- Negative or zero grid values (if allowed).
- Maximal input sizes for time complexity.

### Solution

```python
def minPathCost(grid, moveCost):
    m, n = len(grid), len(grid[0])
    # dp[row][col]: min cost to reach grid[row][col]
    dp = [grid[0][j] for j in range(n)]  # costs at first row

    for i in range(1, m):
        next_dp = [float('inf')] * n
        for curr_col in range(n):  # currently at (i, curr_col)
            for prev_col in range(n):  # possible prev col in (i-1)
                move = moveCost[grid[i-1][prev_col]][curr_col]
                cost = dp[prev_col] + move + grid[i][curr_col]
                if cost < next_dp[curr_col]:
                    next_dp[curr_col] = cost
        dp = next_dp  # move to next row

    return min(dp)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n²). For each of m-1 rows, for every column, check n possible parents from above.
- **Space Complexity:** O(n). Only two rows are stored at any time for DP.

### Potential follow-up questions (as if you’re the interviewer)  

- What if moves were only allowed to adjacent columns (col ± 1)?  
  *Hint: Could you optimize to O(m × n) using adjacency property?*

- How would you print the actual path, not just its cost?  
  *Hint: Track parent index for each cell in the DP.*

- How would you handle updates to moveCost or grid values efficiently?  
  *Hint: Consider which parts of the DP need to be recomputed for each update.*

### Summary
This problem is a textbook example of **dynamic programming on a grid** with custom transitions.  
It’s related to "minimum cost path" problems—a common pattern useful for matrix pathfinding with nontrivial transition costs (such as grid travel with per-move penalties).  
The rolling DP row pattern for space optimization is standard whenever transitions only depend on the previous row, and can be applied in various path or scheduling DP problems.