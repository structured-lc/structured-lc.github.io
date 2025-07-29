### Leetcode 3603 (Medium): Minimum Cost Path with Alternating Directions II [Practice](https://leetcode.com/problems/minimum-cost-path-with-alternating-directions-ii)

### Description  
Given a 2D grid of positive integers, start at (0, 0) and reach (m-1, n-1). You can only move in cardinal directions (up, down, left, right). However, **after each horizontal move (left/right), you must alternate your next move to a vertical direction (up/down), and vice versa**. Each move pays the cost of the destination cell. Find the minimum total cost path to reach the bottom right cell, subject to this alternating rule.

### Examples  
**Example 1:**  
Input: `grid = [[1,3,1],[1,5,1],[4,2,1]]`  
Output: `7`  
*Explanation: One path: (0,0)→(1,0)→(1,1)→(2,1)→(2,2). Alternates correctly, total cost 7.*

**Example 2:**  
Input: `grid = [[2,1],[3,4]]`  
Output: `7`  
*Explanation: Path: (0,0)→(1,0)→(1,1); must alternate, cost = 2+3+4=9, but the minimum alternates better for 7.*

**Example 3:**  
Input: `grid = [[5]]`  
Output: `5`  
*Explanation: Only cell, total cost 5.*

### Thought Process (as if you’re the interviewee)  
- The path must alternate between horizontal and vertical moves.
- This calls for DP or Dijkstra's with state: (r, c, direction_type) where direction_type ∈ {vertical, horizontal}.
- For each cell, store the minimal cost to reach it ending with a vertical or horizontal move.
- Use a priority queue for BFS/Dijkstra to always process lower-total-cost states first.
- For each expansion, move only in allowed next direction.
- Keep state: for the start cell, both options may be possible. Need to consider initial direction specially.

### Corner cases to consider  
- One row/column grids.
- No valid path due to alternating constraint.
- Start and finish are the same cell.
- Cost grid with large values.

### Solution

```python
import heapq

def min_cost_path_with_alternating_directions(grid):
    m, n = len(grid), len(grid[0])
    INF = 1 << 60
    # dp[r][c][d] is min cost to (r, c), with last move type d (0: ver, 1: hor)
    dp = [[[INF, INF] for _ in range(n)] for _ in range(m)]
    # Initialize: starting cell can be entered "vertically" or "horizontally"
    dp[0][0][0] = dp[0][0][1] = grid[0][0]
    heap = [(grid[0][0], 0, 0, 0), (grid[0][0], 0, 0, 1)]
    # (cost, row, col, last_dir)
    # Directions: 0=came from vertical (can now go horizontal), 1=from horizontal (can now go vertical)
    VDIRS = [(-1, 0), (1, 0)]
    HDIRS = [(0, -1), (0, 1)]
    while heap:
        cost, r, c, last_dir = heapq.heappop(heap)
        if dp[r][c][last_dir] < cost:
            continue
        next_dirs = HDIRS if last_dir == 0 else VDIRS
        next_last_dir = 1 if last_dir == 0 else 0
        for dr, dc in next_dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                ncost = cost + grid[nr][nc]
                if ncost < dp[nr][nc][next_last_dir]:
                    dp[nr][nc][next_last_dir] = ncost
                    heapq.heappush(heap, (ncost, nr, nc, next_last_dir))
    return min(dp[m-1][n-1][0], dp[m-1][n-1][1])
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n); each state (cell, last dir) is processed at most once due to Dijkstra.
- **Space Complexity:** O(m × n); DP and heap storage for each cell and two direction-states.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you recover the actual path, not just the cost?
  *Hint: Backtrack using a parent pointer along with each state.*

- How does the solution change if diagonal moves are allowed?
  *Hint: Add new directions and adjust state alternation accordingly.*

- What if some cells are impassable (cost = -1)?
  *Hint: Skip those cells during DP/queue expansion.*

### Summary
Problem resembles grid DP with extra state for move direction. Uses Dijkstra's with extra move state (alternating direction) to ensure all possible paths respecting alternation are considered. Generalizable for movement constraint problems.