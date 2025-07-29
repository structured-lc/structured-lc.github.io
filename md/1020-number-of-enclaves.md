### Leetcode 1020 (Medium): Number of Enclaves [Practice](https://leetcode.com/problems/number-of-enclaves)

### Description  
You are given a 2D binary grid of size m × n, where **0** represents a sea cell and **1** represents a land cell.  
A move consists of walking from one land cell to an adjacent (up, down, left, right) land cell, or walking off the boundary of the grid.  
You need to return the number of **land cells** in the grid that **cannot reach** the boundary of the grid via any sequence of moves—that is, the count of “enclaves”: land cells that can never walk off the grid no matter how you move.

### Examples  

**Example 1:**  
Input:  
```
grid = [
  [0,0,0,0],
  [1,0,1,0],
  [0,1,1,0],
  [0,0,0,0]
]
```  
Output: `3`  
*Explanation: Only the three land cells at positions (1,2), (2,1), (2,2) are completely surrounded by sea, so cannot reach any boundary cell.*

**Example 2:**  
Input:  
```
grid = [
  [0,1,1,0],
  [0,0,1,0],
  [0,0,1,0],
  [0,0,0,0]
]
```  
Output: `0`  
*Explanation: All land cells are either on the border or connected to the border—none are isolated as enclaves.*

**Example 3:**  
Input:  
```
grid = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
```  
Output: `0`  
*Explanation: All land cells touch a boundary (even through connected cells), so there are no enclaves.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each land cell, check whether it can reach the boundary using BFS/DFS. This is extremely inefficient because we could run up to m × n searches, each possibly traversing a large portion of the grid.

- **Optimized approach:**  
  Notice that any land cell connected (directly or indirectly) to the boundary is *not* an enclave.  
  - So:  
    - Find all boundary land cells.
    - Mark all land cells connected to these boundary cells (using DFS or BFS).
    - The cells that remain as land and are unvisited afterwards are enclaves.
  - This reduces the problem to a multi-source flood-fill from the border.

- **Trade-offs:**  
  - BFS is more space-intensive (queue), DFS uses recursion stack.  
  - The time and space are both linear in the total number of cells.

- I’ll use DFS to mark all accessible land cells from the boundary, and then count what’s left.

### Corner cases to consider  
- Grid full of all sea (all 0): answer is 0.
- Grid full of all land (all 1): answer is 0 (all touch border).
- 1×N or M×1 grid (long strip): same logic applies.
- Land cell not connected to border at all (island inside sea).
- No land cells at all.
- Irregular shapes, holes in the middle, etc.

### Solution

```python
def numEnclaves(grid):
    # Helper DFS to flood-fill from a given cell
    def dfs(x, y):
        # Out of bounds or not land, return
        if x < 0 or x >= len(grid) or y < 0 or y >= len(grid[0]) or grid[x][y] != 1:
            return
        grid[x][y] = 0  # Mark as visited by setting to sea
        # Visit all adjacent
        dfs(x+1, y)
        dfs(x-1, y)
        dfs(x, y+1)
        dfs(x, y-1)

    rows, cols = len(grid), len(grid[0])

    # 1. Remove all land cells connected to borders
    for r in range(rows):
        for c in [0, cols-1]:
            if grid[r][c] == 1:
                dfs(r, c)
    for c in range(cols):
        for r in [0, rows-1]:
            if grid[r][c] == 1:
                dfs(r, c)

    # 2. Count remaining land cells (enclaves)
    result = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                result += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  We visit every cell at most once: the DFS is only called for unvisited land cells, and each is set to sea only once.
- **Space Complexity:** O(m × n) worst-case (recursion stack or queue for flood-fill), plus O(1) extra if done in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if diagonal moves were allowed as well?
  *Hint: Change DFS/BFS to cover 8 directions instead of 4.*
- Can you solve it with BFS instead of DFS? Would that help for very large grids?
  *Hint: Implement a queue-based BFS instead of recursion to avoid stack overflow.*
- What if you could not modify the original grid?  
  *Hint: You'd need an explicit visited array or set, at O(m × n) extra space.*

### Summary

This problem is a classic **flood fill** / **multi-source DFS or BFS**.  
The key insight is that all land cells reachable from the border aren’t enclaves—remove those first, then count what’s left.  
This technique applies to other “closed area” grid problems, like counting islands, lakes, or unconnected regions. Pattern: **Flood-fill from all boundaries, then examine the residue.**