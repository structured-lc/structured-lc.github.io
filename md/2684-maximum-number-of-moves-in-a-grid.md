### Leetcode 2684 (Medium): Maximum Number of Moves in a Grid [Practice](https://leetcode.com/problems/maximum-number-of-moves-in-a-grid)

### Description  
You are given an m × n grid of positive integers. You may start at any cell in the first (leftmost) column. From a cell at (row, col), you can move to one of three cells in the next column: directly right (row, col+1), diagonally up-right (row-1, col+1), or diagonally down-right (row+1, col+1). The constraint is that the destination cell’s value must be strictly greater than the current cell’s value. The goal is to find the maximum number of such moves you can make in one path through the grid.

### Examples  

**Example 1:**  
Input:  
`grid = [[2,4,3,5],[5,4,9,3],[3,6,2,2]]`  
Output:  
`3`  
*Explanation:*
- One path: Start at (1,0) → (2,1) [5→6] → (1,2) [6→9] → (0,3) [9→5, invalid]  
- A valid sequence: (1,0) [5] → (2,1)  → (1,2)  → stops (no move possible).  
- The maximum number of moves (steps, not cells): **3** (i.e., 3 transitions to next column)

**Example 2:**  
Input:  
`grid = [[8,3,5,9],[4,3,6,9],[7,15,3,2],[10,12,8,6],[11,1,7,3]]`  
Output:  
`0`  
*Explanation:*
- Any possible neighbor in the next column is not strictly greater than the current value, so no moves are possible.

**Example 3:**  
Input:  
`grid = [[1,1,1],[1,1,1],[1,1,1]]`  
Output:  
`0`  
*Explanation:*
- All values are the same, so there’s never a strictly increasing move.

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each cell in the first column, try all possible paths using DFS—on each move, check all valid directions, keep a running count of moves, and take the maximum found overall.

- **Problems with brute-force:**  
  Time complexity is high (exponential): each cell has up to three possible moves per call, and paths may overlap, repeating the same subproblems.

- **Optimization — DP with Memoization:**  
  Since the subproblems overlap (the maximum moves from any cell for a specific column are re-used), use top-down DP (DFS + memoization) where `dp[r][c]` stores the maximum number of moves starting from cell (r, c).  
  For each cell in column 0, run DFS to compute the answer, memoizing results for reuse.

- **Space optimization:**  
  Since only the current column and the next column matter at each stage, you can optimize to use 2D arrays for just two columns in bottom-up DP.

- **Why use top-down DP:**  
  Natural way to code (recursive DFS with caching), and avoids recomputation.

### Corner cases to consider  
- Grid has only one column (no moves possible).
- All values are equal: no valid move possible.
- Single row or single column grids.
- Strictly increasing rows/columns: can you traverse all columns?
- No valid next step for any position in the first column.
- Grid contains local maxima (can't proceed past).

### Solution

```python
def maxMoves(grid):
    # Dimensions
    m, n = len(grid), len(grid[0])

    # DP cache: cache[(r,c)] = max moves from (r,c)
    from functools import lru_cache

    # Possible move directions: up-right, right, down-right
    directions = [(-1,1), (0,1), (1,1)]

    @lru_cache(None)
    def dfs(row, col):
        max_steps = 0
        for dr, dc in directions:
            nr, nc = row + dr, col + dc
            # Check valid cell and strictly increasing
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] > grid[row][col]:
                moves = 1 + dfs(nr, nc)
                if moves > max_steps:
                    max_steps = moves
        return max_steps

    # Try from every cell in first column
    result = 0
    for r in range(m):
        steps = dfs(r, 0)
        if steps > result:
            result = steps
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited at most once during memoized DFS; for each, we check up to 3 neighbors.

- **Space Complexity:** O(m × n)  
  Due to recursion stack (up to m × n unique states), and memoization table storing one value per cell.

### Potential follow-up questions (as if you’re the interviewer)  

- What if moves are allowed to wrap between top and bottom rows (i.e., row index becomes cyclic)?  
  *Hint: Update the neighbor calculation to allow row indices to loop around.*

- How would you get the number of *distinct* maximal length paths, not just the max moves?  
  *Hint: Add counting logic to DP, and only count paths matching the global maximal moves.*

- What if moves are allowed for non-strictly increasing values (i.e., can move to equal or greater cells)?  
  *Hint: Adjust the strictness check for grid[nr][nc] ≥ grid[row][col].*

### Summary
This problem showcases classic grid-based *DFS + memoization* (top-down DP), a common pattern when paths overlap and optimal substructure exists. Efficiently caching the maximum result for subproblems makes the search tractable. This pattern applies in many variations of path-finding, word-search, and grid traversal problems found in dynamic programming interviews.