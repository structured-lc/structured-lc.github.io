### Leetcode 1293 (Hard): Shortest Path in a Grid with Obstacles Elimination [Practice](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination)

### Description  
Given a `m x n` grid, where each cell is either **empty** (0) or an **obstacle** (1), and an integer **k**, you can eliminate up to k obstacles. Find the length of the shortest path from the top-left (0, 0) to the bottom-right (m-1, n-1), moving only in 4 directions. You may eliminate at most k obstacles along the way. Return the length of the shortest such path; if not possible, return -1.

### Examples  
**Example 1:**  
Input: `grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]]`, `k = 1`  
Output: `6`  
*Explanation: The shortest path is right → right → down → down → right → down (length 6), eliminating one obstacle at (1,1).*

**Example 2:**  
Input: `grid = [[0,1,1],[1,1,1],[1,0,0]]`, `k = 1`  
Output: `-1`  
*Explanation: Can't reach the bottom-right, even after eliminating 1 obstacle.*

**Example 3:**  
Input: `grid = [[0,0,0],[0,1,0],[0,0,0]]`, `k = 2`  
Output: `4`  
*Explanation: Path right → down → down → right uses at most 2 obstacle removals (none needed here).*

### Thought Process (as if you’re the interviewee)  
The classic shortest path in a grid is solved using BFS. Here, each state depends not only on the position, but **also how many obstacles you have eliminated so far** (since you have a limited quota k). 

- At each BFS node, keep track of (row, col, remaining_k)
- Use a queue for BFS, tracking the minimal path length to reach every state
- Use a visited set or 3D matrix to store the least obstacle eliminations used at (row, col) seen so far -- only proceed if you reach (i, j) with fewer eliminated obstacles than before
- For each move, if next cell is obstacle: decrement k; if free cell, proceed; skip if k < 0
- Stop as soon as (m-1, n-1) is reached

### Corner cases to consider  
- The start or end cell is an obstacle
- k is 0
- All cells are obstacles except start/end
- The grid is 1x1
- Large k (≥ m + n)

### Solution

```python
from collections import deque

def shortestPath(grid, k):
    m, n = len(grid), len(grid[0])
    # visited[r][c] = minimal obstacles eliminated to reach (r, c)
    visited = [[-1] * n for _ in range(m)]
    queue = deque()
    queue.append((0, 0, k, 0))  # (row, col, remaining_k, steps)

    # (row, col, k_left) as a state
    directions = [(0,1), (0,-1), (1,0), (-1,0)]
    while queue:
        i, j, k_left, steps = queue.popleft()
        if i == m-1 and j == n-1:
            return steps
        for dr, dc in directions:
            ni, nj = i + dr, j + dc
            if 0 <= ni < m and 0 <= nj < n:
                nk = k_left - grid[ni][nj]
                if nk < 0:
                    continue
                # If this cell has been reached with less or equal eliminations left, skip
                if visited[ni][nj] != -1 and visited[ni][nj] >= nk:
                    continue
                visited[ni][nj] = nk
                queue.append((ni, nj, nk, steps+1))
    return -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n × k). Each cell can be visited with different k_left values, but never more than (m × n × k) states.
- **Space Complexity:** O(m × n × k) for the queue and visited states.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you reconstruct the path, not just compute its length?  
  *Hint: Save parent pointers or path history at each queue node.*

- If obstacles are dynamic (can appear/disappear), how to adapt?  
  *Hint: Use dynamic programming or repeated BFS after each change, but beware of recomputation costs.*

- Can you adapt the approach to weighted grids (e.g., moving through an obstacle has cost c > 1)?  
  *Hint: Use Dijkstra instead of BFS, prioritizing lower cost accumulations.*

### Summary
The problem illustrates **BFS in a grid with an expanded state space** (tracking both coordinates and an obstacle-elimination counter). Tracking seen states across this extra dimension is a classic BFS optimization for limited resource pathfinding.