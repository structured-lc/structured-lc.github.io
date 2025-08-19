### Leetcode 2328 (Hard): Number of Increasing Paths in a Grid [Practice](https://leetcode.com/problems/number-of-increasing-paths-in-a-grid)

### Description  
Given a 2D integer grid of size m×n, you need to count the total number of strictly increasing paths. From any cell, you can move to any of its four adjacent (up/down/left/right) neighbors, but only if the neighbor's value is strictly greater than the current cell's value. Each path is a sequence of cells with increasing values at every step, and paths can start at any cell. Return the total number of such unique-paths modulo 10⁹+7. Paths are unique if they have different sequences of visited cells.

### Examples  

**Example 1:**  
Input: `grid = [[1,1],[3,4]]`  
Output: `8`  
Explanation:  
Single cell paths: (4 cells),  
Other increasing paths: [1→3], [1→4], [3→4] (starting from each possible 1), totaling 8 unique paths.

**Example 2:**  
Input: `grid = [[1],[2]]`  
Output: `3`  
Explanation:  
Paths: [1], [2], [1→2].

**Example 3:**  
Input: `grid = [[3,4,5],[3,2,6],[2,2,1]]`  
Output: `13`  
Explanation:  
Some valid paths:  
[1], [2](×3), [3](×2), [4], [5], , [2→3], [3→4], [4→5], [5→6], [3→6]. Each sequence of cells corresponds to a unique path.


### Thought Process (as if you’re the interviewee)  
- The **brute-force** idea would be to start a DFS from every cell, exploring all strictly increasing paths. But this leads to exponential time as there may be a huge overlap in the subproblems.
- Many subpaths are recalculated, so **memoization** is key. We can cache the result for each cell: the number of increasing paths starting from that cell.
- For each cell, we can try to move in four directions. If the neighbor has a larger value, recursively count paths starting from there.
- Add 1 for the path consisting of just the starting cell itself.
- Finally, sum the results for all cells.
- Since the grid can be up to 1000×1000 and there are at most 4 moves per cell, this approach gives O(mn) time if we memoize results.

### Corner cases to consider  
- Single cell grid (trivially 1 path).
- All values identical (each cell is a valid path itself, no length-2+ paths).
- Large grid with increasing numbers only along one row/column.
- Grid with all decreasing values (again, only single cell paths).

### Solution

```python
MOD = 10**9 + 7

def countPaths(grid):
    # Dimensions
    m, n = len(grid), len(grid[0])
    # Memoization table: dp[i][j] stores number of increasing paths from (i, j)
    dp = [[-1 for _ in range(n)] for _ in range(m)]
    # Directions: up, down, left, right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    
    def dfs(i, j):
        # If already computed, return
        if dp[i][j] != -1:
            return dp[i][j]
        # Every cell is a path of length 1
        res = 1
        for dx, dy in dirs:
            ni, nj = i + dx, j + dy
            if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] > grid[i][j]:
                res = (res + dfs(ni, nj)) % MOD
        dp[i][j] = res
        return res

    total = 0
    for i in range(m):
        for j in range(n):
            total = (total + dfs(i, j)) % MOD
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) — Each cell is visited once and recursive calls are memoized, each cell computed once, each check up to 4 neighbors.
- **Space Complexity:** O(m × n) for the memoization table, and O(m × n) for recursion stack in the worst case (if all cells are increasing from a corner).


### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted strictly *decreasing* paths?  
  *Hint: You can simply flip the direction of the grid comparison in DFS.*

- How would you solve if diagonal moves were allowed?  
  *Hint: Add four more directions to dirs (for diagonals).*

- Can you modify it to count only paths of length at least k?  
  *Hint: Pass a length parameter and adjust when to count as a valid path.*


### Summary
We use **DFS with memoization** (top-down dynamic programming) to efficiently count the number of strictly increasing paths in a grid. Each cell is a subproblem, and overlapping subproblems are cached. This approach is a classic "DP on grid" pattern and can be applied to many path counting and graph traversal problems with constraints on allowed moves.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort), Memoization(#memoization), Matrix(#matrix)

### Similar Problems
- Longest Increasing Path in a Matrix(longest-increasing-path-in-a-matrix) (Hard)
- All Paths From Source to Target(all-paths-from-source-to-target) (Medium)
- Maximum Strictly Increasing Cells in a Matrix(maximum-strictly-increasing-cells-in-a-matrix) (Hard)