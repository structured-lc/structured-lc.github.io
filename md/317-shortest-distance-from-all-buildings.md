### Leetcode 317 (Hard): Shortest Distance from All Buildings [Practice](https://leetcode.com/problems/shortest-distance-from-all-buildings)

### Description  
Given an m × n grid where each cell is either:
- **0**: empty land,
- **1**: building,
- **2**: obstacle,

You must place a house on an empty land (0) such that the **sum of Manhattan distances** from this cell to **all buildings** (1s) is minimized.  
- You may move in four directions (up, down, left, right).  
- You cannot pass through buildings or obstacles.
- *Return* the minimum total distance from your chosen empty land to all buildings, or -1 if such placement is impossible.

### Examples  

**Example 1:**  
Input: `grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]`  
Output: `7`  
*Explanation:  
The shortest total distance for any empty land to all buildings is at (1,2), with travel distance = 7.
- Distances: (1,2) → (0,0) = 3; (1,2) → (0,4) = 3; (1,2) → (2,2) = 1; 3 + 3 + 1 = 7.*

**Example 2:**  
Input: `grid = [[1,0]]`  
Output: `1`  
*Explanation:  
Only possible place is (0,1): distance to (0,0) is 1.*

**Example 3:**  
Input: `grid = [[1]]`  
Output: `-1`  
*Explanation:  
No empty land to place the house.*

### Thought Process (as if you’re the interviewee)  

First, brute-force: For every empty land (cell with 0), compute the sum of distances to all buildings using BFS/DFS individually.  
- Too slow: For each empty cell, BFS to each building → O((mn)\*mn) worst case.

Optimized approach:  
- Start a BFS (level-order traversal) **from each building** (not each empty cell):
    - Create two m×n grids:
        - **distance_sum[i][j]**: sum of distances from buildings to cell (i,j).
        - **reach_count[i][j]**: number of buildings that reached cell (i,j).
    - For each building, do BFS adding to distance_sum, incrementing reach_count for every empty cell reached.
    - At the end, look for the empty cell(s) where reach_count equals the total number of buildings, choose the min distance_sum among them.
        - If not all buildings can reach a cell, that cell is disqualified.

This approach guarantees you only visit valid empty lands once per building, much more efficient.

### Corner cases to consider  
- No empty land in grid, e.g. grid full of buildings or obstacles.
- Not all buildings are mutually reachable (disjoint sections).
- Smallest grid: 1×1, only building.
- Obstacles block all empty cells from any building (unreachable).
- Only one building.
- Only one empty cell.

### Solution

```python
from collections import deque

def shortestDistance(grid):
    m, n = len(grid), len(grid[0])
    buildings = sum(cell == 1 for row in grid for cell in row)
    distance_sum = [[0] * n for _ in range(m)]
    reach_count = [[0] * n for _ in range(m)]
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]

    def bfs(building_x, building_y):
        visited = [[False]*n for _ in range(m)]
        queue = deque()
        queue.append((building_x, building_y, 0))
        visited[building_x][building_y] = True

        while queue:
            x, y, dist = queue.popleft()
            for dx, dy in dirs:
                i, j = x + dx, y + dy
                if 0 <= i < m and 0 <= j < n and not visited[i][j] and grid[i][j] == 0:
                    visited[i][j] = True
                    distance_sum[i][j] += dist + 1
                    reach_count[i][j] += 1
                    queue.append((i, j, dist + 1))

    # BFS from each building
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                bfs(i, j)
    
    res = float('inf')
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 0 and reach_count[i][j] == buildings:
                res = min(res, distance_sum[i][j])
    return res if res != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((m × n)²)  
  - For each building (≤ m × n), we perform BFS over the grid (O(mn)), hence up to O((mn)²) in the worst case.
- **Space Complexity:** O(m × n)  
  - For distance_sum, reach_count matrices, and the per-building BFS queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are a million buildings?  
  *Hint: How would you prune unreachable computation? Could you cache or parallelize?*

- Can you optimize for real-time updates if obstacles are added/removed dynamically?  
  *Hint: Dynamic BFS update or incremental computation, or more advanced pathfinding structures.*

- What if the movement is allowed diagonally as well?  
  *Hint: Adjust BFS neighbors; Manhattan distance changes to Chebyshev distance.*

### Summary
This problem is a classic **multi-source BFS** pattern, but we must run BFS separately for each building and accumulate distances and reachability. The key is to reverse the naive approach (BFS from empty cells) and leverage a bottom-up BFS from each building.  
This grid-based BFS is a frequently-used template in pathfinding, island/region counting, and similar problems where reachability and minimum distance sum must be computed over multiple sources.


### Flashcard
Perform BFS from each building to efficiently calculate distances to all empty cells.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Walls and Gates(walls-and-gates) (Medium)
- Best Meeting Point(best-meeting-point) (Hard)
- As Far from Land as Possible(as-far-from-land-as-possible) (Medium)