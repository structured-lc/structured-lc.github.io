### Leetcode 3565 (Medium): Sequential Grid Path Cover [Practice](https://leetcode.com/problems/sequential-grid-path-cover)

### Description  
Given a grid of size m × n, where some cells are labeled from 1 to k (each exactly once) and all other cells are 0, find a path that visits every cell exactly once and visits cells labeled 1, 2, ..., k in order. You can start at any cell, and you may move up, down, left, or right. Return a list of cell coordinates representing the visiting order. If no such path exists, return an empty list.


### Examples  

**Example 1:**  
Input: `grid = [[0,0,0],[0,1,2]], k = 2`  
Output: `[[0,0],[1,0],[1,1],[1,2],[0,2],[0,1]]`  
*Explanation: Path visits every cell once and hits 1 at (1,1) before 2 at (1,2).*

**Example 2:**  
Input: `grid = [[1,0,4],[3,0,2]], k = 4`  
Output: `[]`  
*Explanation: Not possible to visit all cells in such a path with all constraints.*

**Example 3:**  
Input: `grid = [[0,1,0],[0,0,0],[0,0,2]], k = 2`  
Output: `[[0,0],[1,0],[2,0],[2,1],[1,1],[0,1],[0,2],[1,2],[2,2]]`  
*Explanation: Path starts at (0,0), hits 1 at (0,1) before 2 at (2,2), every cell is visited once.*


### Thought Process (as if you’re the interviewee)  
- First, this is a **Hamiltonian path on a grid** with an additional order constraint: when you reach a cell labeled x, you must have visited all cells labeled < x first.
- **Brute force:** Try every possible permutation of cells, check if it’s a valid path and respects the label ordering. Clearly infeasible for anything except the very smallest grids.
- **Optimization:**  
   - Since grid size ≤ 5 × 5 (max 25 cells), we can use state compression—bitmask to remember visited cells.
   - For each DFS step, keep track of:
      - the visited bitmask
      - current position
      - which label you’re up to (`next_label`)
   - When stepping into a label cell, only allow stepping into it if it’s the next label you expect.
   - If you reach the end with all cells visited and the label constraint fully satisfied, return the path.
- The grid is small, so recursive backtracking with memoization is feasible. This is a classic grid-based stateful DFS/Backtracking with additional constraints.


### Corner cases to consider  
- Only one cell in the grid, no label (trivial path of length 1).
- No label cells at all (should still be a Hamiltonian path with no ordering).
- Labels not reachable from each other (the label-sequence disconnects the path).
- Label numbers not consecutive or missing (should never happen per constraints, but good for validation).
- More than one possible correct path (return any).
- k = m × n (every cell is a distinct label).
- k = 1 (only one labeled cell, order doesn’t matter).


### Solution

```python
def sequential_grid_path_cover(grid, k):
    m, n = len(grid), len(grid[0])
    total = m * n

    label_pos = [None] * (k + 1)  # label_pos[x] = (i, j) for label x ∈ 1..k
    zeros = []
    for i in range(m):
        for j in range(n):
            val = grid[i][j]
            if val == 0:
                zeros.append((i, j))
            else:
                label_pos[val] = (i, j)

    # Build all candidate starting positions
    starts = []
    if 1 in grid[0] or 1 in grid[-1]:  # First label could be anywhere, or no label at all
        starts = [label_pos[1]] if k ≥ 1 else zeros + [label_pos[x] for x in range(1, k + 1)]
    else:
        starts = zeros + [label_pos[x] for x in range(1, k + 1)]

    DIRS = [(-1,0),(1,0),(0,-1),(0,1)]

    def inside(x, y):
        return 0 ≤ x < m and 0 ≤ y < n

    def dfs(x, y, visited, label_idx, path):
        idx = x * n + y
        if visited & (1 << idx):
            return None
        # If this is a label cell, must be correct one
        cell_label = grid[x][y]
        if 1 ≤ cell_label ≤ k:
            if cell_label != label_idx + 1:
                return None
            label_idx += 1

        visited |= (1 << idx)
        path.append([x, y])

        if len(path) == total:
            if label_idx == k:  # All reached
                return path[:]
            path.pop()
            return None

        for dx, dy in DIRS:
            nx, ny = x + dx, y + dy
            if inside(nx, ny):
                res = dfs(nx, ny, visited, label_idx, path)
                if res:
                    return res

        path.pop()
        return None

    # Try every possible starting cell
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 0 or grid[i][j] == 1:
                res = dfs(i, j, 0, 0, [])
                if res:
                    return res
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(4^(m×n)) in worst case (each cell can move in 4 directions, every state must be tracked; but due to pruning and constraints, typically faster on small grid). Exact bound is factorial with strong pruning.
- **Space Complexity:** O(m×n) for recursion/call stack plus bitmask for visited, and O(m×n) for result path (the maximum depth is total cells).


### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid size were larger (say, 10×10)?  
  *Hint: Try to relate to NP-hard Hamiltonian path and discuss why exponential algorithms don't scale for larger grids.*

- How would you modify your approach if revisiting cells was allowed?  
  *Hint: State transitions would be much easier, but label order constraint still applies!*

- Can you find the total number of valid sequential grid paths?  
  *Hint: Modify DFS to count instead of returning early, beware of exponential time.*


### Summary
This problem uses the backtracking search pattern for finding **Hamiltonian paths with ordering constraints** in a grid. It's classic in that bitmask/state compression is used for feasibility due to small input size. The search approach and pruning strategy are common in **combinatorial search / constraint propagation** problems, and variants appear in puzzles, robot movement problems, and tour/pathfinding scenarios with hard state requirements.