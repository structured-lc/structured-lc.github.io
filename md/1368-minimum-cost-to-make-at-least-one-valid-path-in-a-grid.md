### Leetcode 1368 (Hard): Minimum Cost to Make at Least One Valid Path in a Grid [Practice](https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid)

### Description  
Given an m × n grid, each cell contains a sign pointing in one of four directions: right (1), left (2), down (3), or up (4). Starting at the top-left cell (0, 0), you can follow the arrows to other cells—if you follow the direction in a cell, it costs 0.  
You can also **change** the direction in any cell at a cost of 1 (once per cell). The goal is to find the **minimum cost** needed so that there is **at least one valid path** from the top-left (0, 0) to the bottom-right (m-1, n-1).

### Examples  

**Example 1:**  
Input: `grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]`  
Output: `3`  
Explanation:  
(0,0) → (0,1) → (0,2) → (0,3)  
(change to down; cost=1) ↓  
(1,3) → (1,2) → (1,1) → (1,0)  
(change to down; cost=1) ↓  
(2,0) → (2,1) → (2,2) → (2,3)  
(change to down; cost=1) ↓  
(3,3)  
Total cost = 3.

**Example 2:**  
Input: `grid = [[1,1,3],[3,2,2],[1,1,4]]`  
Output: `0`  
Explanation:  
You can follow all the arrows without changing any signs:  
(0,0) → (0,1) → (0,2) ↓  
(1,2) ← (1,1) ← (1,0) ↓  
(2,0) → (2,1) → (2,2)

**Example 3:**  
Input: `grid = [[4]]`  
Output: `0`  
Explanation:  
Single cell, already at bottom-right, no changes needed.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every combination of sign changes across all cells. For each, check if a valid path exists from start to end. But this is exponential in m × n and not feasible.
- **Observation:** The path cost is only affected when we need to move in a direction different from the current arrow.
- **Optimization:**  
  - Treat the grid as a **graph**: each cell is a node, and you can move in 4 directions from each cell (up/down/left/right).
  - **Move cost** is 0 if you follow the current arrow in that cell, else 1 (change arrow).
  - We want the minimum total cost to reach (m-1, n-1) from (0,0), so this is essentially a **shortest path problem with 0/1 edge weights**.
  - Use **0-1 BFS** with a deque:  
    - Move in the proper arrow direction (no cost), push to front of deque.
    - If changing direction (cost=1), push to back.
- Why is this optimal? Because in 0-1 BFS, lower-cost routes are always explored before higher-cost ones, guaranteeing minimal cost discovery.

### Corner cases to consider  
- Single cell grid `[[any arrow]]` (already at destination, cost 0)
- Grid filled with same direction (might already be a valid path)
- No valid path possible even after changes (shouldn't happen as you can change every sign if needed)
- Grids with only one row or one column (straight path, possibly no changes needed)
- Direction points outside the grid (should handle boundaries properly)
- Maximal grid size (time/space optimality is crucial)

### Solution

```python
from collections import deque

def minCost(grid):
    m, n = len(grid), len(grid[0])
    # Directions: right=1, left=2, down=3, up=4
    dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    cost = [[float('inf')] * n for _ in range(m)]
    cost[0][0] = 0

    dq = deque()
    dq.append((0, 0))

    while dq:
        x, y = dq.popleft()
        for d, (dx, dy) in enumerate(dirs, 1):
            nx, ny = x + dx, y + dy
            if 0 <= nx < m and 0 <= ny < n:
                # If current sign matches direction, cost stays; else +1
                new_cost = cost[x][y] + (0 if grid[x][y] == d else 1)
                if new_cost < cost[nx][ny]:
                    cost[nx][ny] = new_cost
                    if grid[x][y] == d:
                        dq.appendleft((nx, ny))
                    else:
                        dq.append((nx, ny))
    return cost[m-1][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  Each cell is visited at most once per unique cost value (cost is always non-increasing for a cell), so it's linear in the number of cells.
- **Space Complexity:** O(m × n).  
  For the `cost` table and the queue which may store up to all grid cells.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were to find the number of valid minimal cost paths, not just the cost?  
  *Hint: Use dynamic programming with path counting alongside the cost calculation.*

- How would you handle a grid with obstacles (impassable cells)?  
  *Hint: Skip or do not update cells blocked by obstacles in BFS.*

- Is there a Dijkstra-like approach that works as efficiently as 0-1 BFS here?  
  *Hint: Yes, but 0-1 BFS is more space/time efficient for this particular 0/1 edge weight setup.*

### Summary
This problem is a classic **0-1 BFS / Shortest Path with zero-one edge weights**. It’s a common pattern for minimum-cost grid traversal where some transitions cost 0 and others cost 1.  
This approach is widely applicable in board games, puzzles, or shortest-path questions where cost is incurred for certain transitions but not for others.  
Core skills: graph traversal, BFS optimization, grid algorithms, shortest path with edge weights 0/1.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Shortest Path(#shortest-path)

### Similar Problems
- Minimum Weighted Subgraph With the Required Paths(minimum-weighted-subgraph-with-the-required-paths) (Hard)
- Disconnect Path in a Binary Matrix by at Most One Flip(disconnect-path-in-a-binary-matrix-by-at-most-one-flip) (Medium)