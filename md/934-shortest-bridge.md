### Leetcode 934 (Medium): Shortest Bridge [Practice](https://leetcode.com/problems/shortest-bridge)

### Description  
You're given an n × n binary grid where **1** represents land and **0** represents water. There are exactly **two islands** (groups of 1s connected 4-directionally, not diagonally). You can flip 0s to 1s to connect the two islands into one. Find the **minimum number of 0s** you must flip to connect them.

### Examples  

**Example 1:**  
Input: `[[0,1],[1,0]]`  
Output: `1`  
*Explanation: Flipping the single water cell (grid) to 1 connects the two islands.*

**Example 2:**  
Input:  
```
[[0,1,0],
 [0,0,0],
 [0,0,1]]
```
Output: `2`  
*Explanation: Need to flip two 0s (such as grid[1][1] and grid[2][1]) to connect the top and bottom islands.*

**Example 3:**  
Input:  
```
[[1,1,1,1,1],
 [1,0,0,0,1],
 [1,0,1,0,1],
 [1,0,0,0,1],
 [1,1,1,1,1]]
```
Output: `1`  
*Explanation: Islands are adjacent through a single 0; flipping grid[2][2] immediately connects them.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try **every possible pair** of border cells from different islands and calculate the Manhattan distance for all \(0\)s between them. This is slow (O(n⁴)) because for each border cell on island one, you check every border cell of island two.

- **Optimization:**  
  Instead, **expand** from one island using BFS.  
  - First, find and mark all cells belonging to one island (e.g., change their value to 2).
  - Add all their coordinates to a queue as the starting layer (frontier) for BFS.
  - Then, using BFS from the entire first island's perimeter, expand outward layer by layer, flipping 0s as you go.
  - The moment you touch any cell in the other island (cell is 1), you've built the shortest bridge—return the number of layers taken.

  BFS is appropriate here because it explores all options at the same distance before moving further, guaranteeing the shortest path in unweighted graphs.

- **Why this works:**  
  BFS ensures minimal bridge length. Marking avoids revisiting or revisiting already processed cells.

### Corner cases to consider  
- n = 2 (smallest case)
- Islands already adjacent or touching diagonally
- Islands separated by a single 0
- Large grids with complex island shapes
- Islands surrounded by water (not just simple edge cases)
- Avoid flipping original land (1s) or already visited (2s)

### Solution

```python
from collections import deque

def shortestBridge(grid):
    n = len(grid)
    directions = [(-1,0), (1,0), (0,-1), (0,1)]  # up, down, left, right

    def dfs(x, y, island):
        # Standard DFS to mark the first island as 2
        if x < 0 or x >= n or y < 0 or y >= n or grid[x][y] != 1:
            return
        grid[x][y] = 2
        island.append((x, y))
        for dx, dy in directions:
            dfs(x + dx, y + dy, island)

    # 1. Find the first island and mark it as 2, collect its boundary
    found = False
    island = []
    for i in range(n):
        if found:
            break
        for j in range(n):
            if grid[i][j] == 1:
                dfs(i, j, island)
                found = True
                break

    # 2. BFS from all boundary cells of the first island
    q = deque(island)
    steps = 0

    while q:
        for _ in range(len(q)):
            x, y = q.popleft()
            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                if 0 <= nx < n and 0 <= ny < n:
                    if grid[nx][ny] == 1:
                        return steps
                    if grid[nx][ny] == 0:
                        grid[nx][ny] = 2  # mark as visited
                        q.append((nx, ny))
        steps += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  Explanation:  
  - DFS marks the first island—each cell visited once.
  - BFS traverses all cells, possibly the entire grid, but each cell is processed at most once.

- **Space Complexity:** O(n²)  
  Justification:  
  - Space for the queue used in BFS.
  - Modified grid takes O(n²), but that doesn't count as extra space if allowed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are **more than two islands**?
  *Hint: How would you adapt BFS to connect multiple components efficiently?*

- Can you solve it **without modifying the original input** grid?
  *Hint: Use an auxiliary visited structure, similar to paint fill algorithms.*

- What if water cells cost different amounts to flip (e.g., weighted bridge)?
  *Hint: What graph algorithm handles weighted shortest paths? (Dijkstra’s instead of BFS)*

### Summary
This problem follows a **two-phase flood fill/BFS** pattern (first mark, then expand).  
The marking phase ensures only the *external surface* is considered for expansion, and multi-source BFS ensures we find the shortest unweighted bridge.  
This grid + BFS technique is common in problems about shortest path, connected components, or expansion from a region—applicable in maze solving, network spread, and island-connecting puzzles.