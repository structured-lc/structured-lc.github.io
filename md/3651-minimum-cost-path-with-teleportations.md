### Leetcode 3651 (Hard): Minimum Cost Path with Teleportations [Practice](https://leetcode.com/problems/minimum-cost-path-with-teleportations)

### Description  
Given an m × n grid of non-negative integers, where grid[i][j] is the cost to enter cell (i, j), find the minimum cost to go from the top-left (0,0) to the bottom-right (m-1, n-1). At any time you can:
- Move **right** or **down** to an adjacent cell (paying that cell's cost).
- Up to **k** times, you can **teleport** from any cell to any other cell in the grid for free (no move cost), and teleportation does not consume the target cell’s cost.

Return the minimum *cost* required to reach the bottom-right cell using at most **k** teleportations.

### Examples  

**Example 1:**  
Input: `grid=[[1,3,1],[1,5,1],[4,2,1]]`, `k=1`  
Output: `3`  
*Explanation: Teleport from (0,0) to (2,2) in a single jump (cost 1 for starting cell only and 1 for destination cell only), total cost: 1 + 1 = 2, but since each teleport ignores the cost of cells in between, must count start and end costs.*

**Example 2:**  
Input: `grid=[[1,2,3],[4,5,6],[7,8,9]]`, `k=0`  
Output: `21`  
*Explanation: No teleportation is allowed, so the minimum cost path is right→right→down→down (or other equivalent paths). Path: 1→2→3→6→9, cost = 1+2+3+6+9=21.*

**Example 3:**  
Input: `grid=[[5,4,1],[2,7,8],[1,6,3]]`, `k=2`  
Output: `4`  
*Explanation: Teleport from (0,0) to (2,2). Only pay cost for start (0,0) + end (2,2), total: 5+3=8.  
But it may be smaller to use teleport twice, for example: (0,0)→(2,0) [teleport], (2,0)→(2,2) [go right, right]: 5+1+6+3=15 or similarly more cost-efficient routes. Try all combinations for min cost.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every path, for each teleportation, branch to every possible cell—exponential time, infeasible for large m, n, k.
- Notice that with **no teleportation (k=0)**, this is the classic DP min-path-sum problem (can solve with O(m×n) time/space DP).
- With **teleportation**, model as an augmented state: position (i, j) and teleports used so far (t: 0 ≤ t ≤ k).
- For each state, maintain the minimal cost to reach (i, j) with t teleportations used.
- Use **Dijkstra’s algorithm** with state = (i, j, t): either move right/down (pay cell cost), or teleport anywhere (increment t, no movement cost). For each teleport, can instantly move to any cell, possibly updating best cost.
- At each cell, for each t, update the best cost. Teleporting can create “shortcut” states.
- For efficient teleport updates (across the grid), keep track of the current minimal cost for each t among all cells, propagate globally on each teleport.
- This is a classic "multiple-state Dijkstra" with an additional dimension (number of teleports used).

### Corner cases to consider  
- grid has only one cell (return its cost, even if k > 0).
- k = 0 (classic min-cost path problem, no teleports at all).
- k is huge (≥ m×n), can always teleport straight to target cell, only pay (0,0) + (m-1,n-1).
- grid has very high costs except at teleportation source or destination.
- All grid values are zero.
- All teleport paths are worse than normal path (teleport isn’t always optimal).

### Solution

```python
import heapq

def minCostPathWithTeleportation(grid, k):
    m, n = len(grid), len(grid[0])
    # State: (cost_so_far, i, j, teleports_used)
    heap = [(grid[0][0], 0, 0, 0)]
    # dp[i][j][t]: min cost to reach (i,j) with t teleports used
    dp = [[[float('inf')] * (k + 1) for _ in range(n)] for _ in range(m)]
    dp[0][0][0] = grid[0][0]

    # Precompute all cells for teleportation targets
    cells = [(i, j) for i in range(m) for j in range(n)]
    
    while heap:
        cost, x, y, t = heapq.heappop(heap)
        # If reached end, return
        if x == m - 1 and y == n - 1:
            return cost
        # Already found better path to (x, y, t)
        if dp[x][y][t] < cost:
            continue
        # Standard moves: right/down
        for dx, dy in ((0, 1), (1, 0)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < m and 0 <= ny < n:
                ncost = cost + grid[nx][ny]
                if dp[nx][ny][t] > ncost:
                    dp[nx][ny][t] = ncost
                    heapq.heappush(heap, (ncost, nx, ny, t))
        # Teleportation: can teleport to any cell, up to k times
        if t < k:
            for tx, ty in cells:
                # Must not teleport to self
                if (tx, ty) != (x, y):
                    ncost = cost + grid[tx][ty]
                    if dp[tx][ty][t+1] > ncost:
                        dp[tx][ty][t+1] = ncost
                        heapq.heappush(heap, (ncost, tx, ty, t + 1))
    return -1  # if unreachable
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × m² × n²)  
  For each teleport level (≤ k), at each cell (m×n), we may teleport to any other cell (m×n possibilities), or perform two normal moves.
- **Space Complexity:** O(k × m × n) for the DP and heap structures, storing the best path to each cell at each teleport count.

### Potential follow-up questions (as if you’re the interviewer)  

- If you can only teleport to cells in the same row or column?
  *Hint: How would you limit the teleportation options efficiently?*

- Can you optimize teleportation updates further?
  *Hint: Try to avoid O(m²×n²) teleport updates by tracking minimal cost per teleport level, and only broadcasting that min cost to all cells in O(m×n) time.*

- What if teleporting does not cost the target cell’s fee?
  *Hint: Carefully update the cost calculation: don’t add target cell’s cost on teleport.*

### Summary
This problem is a **multi-state shortest path** challenge extending the standard DP grid (min-path-sum) with a special "global jump" or teleport operation, handled as Dijkstra with an extra state. The pattern is common in graph problems involving resource-limited power-ups (like teleportations, edge reversals, or special free moves). Variants appear in competitive programming and in game state design, wherever cost-limited "jumps" or conversions are allowed.

### Tags

### Similar Problems
