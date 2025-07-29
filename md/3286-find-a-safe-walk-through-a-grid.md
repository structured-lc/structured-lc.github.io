### Leetcode 3286 (Medium): Find a Safe Walk Through a Grid [Practice](https://leetcode.com/problems/find-a-safe-walk-through-a-grid)

### Description  
Given a grid of integers where each cell represents the damage you take when stepping on it, and an initial health value, determine if it is possible to start at the top-left cell and reach the bottom-right cell (moving only up, down, left, or right) **such that at no point does your total health drop to zero or below**. You subtract the grid value from your health each time you step into a cell (including the starting cell). The walk is "safe" if it never kills you on the way.

### Examples  

**Example 1:**  
Input: `grid = [[1,2],[1,4]], health = 6`  
Output: `True`  
*Explanation:*
- Start at (0,0): health = 6 - 1 = 5
- Move to (1,0): health = 5 - 1 = 4
- Move to (1,1): health = 4 - 4 = 0 (But must remain > 0, so this path fails)
- Try (0,1): health = 5 - 2 = 3, then (1,1): health = 3 - 4 = -1 (also fails)
- **No safe path?** (If allowed to stay at health=0, True; if must always be >0, then False. Assume must be >0 after all steps except possibly start.)

**Example 2:**  
Input: `grid = [[1,1,1],[2,2,2],[3,3,3]], health = 7`  
Output: `True`  
*Explanation:*
- Multiple paths to goal, all deplete health gradually but none go to zero before the end.

**Example 3:**  
Input: `grid = [[3,4,5],[4,5,6],[5,6,7]], health = 10`  
Output: `False`  
*Explanation:*
- All possible paths take more health than you have—you run out of health before reaching the bottom-right corner.

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach: **DFS from (0,0) to (m-1,n-1), tracking remaining health** at each step, pruning paths that go below 1 health.
- This is **exponential** (4ᶰ cells per path), so not feasible for large grids.

Instead, we want to **find a path where, after subtracting the values along the way, health always stays positive**.
- This is similar to finding a "least-cost path" but with a constraint: remaining health at each step must be > 0.
- Using **BFS (or Dijkstra, as edge weights are positive)**, we can try all possible paths, but for each cell, remember the maximum health remaining we've seen — if a new path reaches with more, we continue; if less or equal, prune.

- We can keep a 2D array `max_health[r][c]` for highest remaining health seen at (r, c).
- BFS queue starts from (0,0) with `health - grid`.
- At each step, for each valid move, if new health > 0 and is greater than any previously recorded at this cell, keep going.
- If we reach (m-1,n-1) with health > 0, return `True`.

**Trade-off:** This approach is both optimal and efficient, typical BFS/priority-queue grid traversal with pruning.

### Corner cases to consider  
- Health is exactly the sum needed: can you land on last cell with health exactly 1?
- Negative grid values ("healing" cells)—if allowed, may make the path easier.
- Single cell grid.
- No possible path (all grid cells huge in value, insufficient health).
- Starting cell itself kills you (grid ≥ health).

### Solution

```python
from collections import deque

def findSafeWalk(grid, health):
    m, n = len(grid), len(grid[0])
    max_health = [[-1] * n for _ in range(m)]

    # Initial health after starting cell
    start = health - grid[0][0]
    if start <= 0:
        return False

    queue = deque()
    queue.append((0, 0, start))
    max_health[0][0] = start

    # 4 movement directions
    directions = [(-1,0), (1,0), (0,-1), (0,1)]

    while queue:
        r, c, rem = queue.popleft()
        if r == m - 1 and c == n - 1:
            return True  # Found a path

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                new_health = rem - grid[nr][nc]
                # Only proceed if alive and better than previously recorded
                if new_health > 0 and new_health > max_health[nr][nc]:
                    max_health[nr][nc] = new_health
                    queue.append((nr, nc, new_health))

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n). Each cell is processed at most once per health value, but as soon as we visit a cell with equal or better health, we prune. So, in practice, closer to O(m × n) for reasonable grid values and pruned visits.
- **Space Complexity:** O(m × n), due to the `max_health` tracking array and queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal steps are allowed?  
  *Hint: Add extra movement directions (dr,dc) for diagonals.*

- How would you return the actual path taken, not just True/False?  
  *Hint: Store parents or reconstruct using a previous pointer map.*

- What if grid values can be negative (healing cells)?  
  *Hint: Algorithm supports it, but may need to visit a cell multiple times at higher health.*

### Summary
This approach combines BFS with state pruning to ensure only *better* health states continue, a common and powerful grid traversal/shortest-path pattern. The pattern is widely used for weighted grid pathfinding problems—such as "minimum cost path", "maze with obstacles and energy", and can be easily adapted where the state is more than just coordinates (e.g., carrying keys, lives, etc.).