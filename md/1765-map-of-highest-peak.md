### Leetcode 1765 (Medium): Map of Highest Peak [Practice](https://leetcode.com/problems/map-of-highest-peak)

### Description  
You are given a matrix isWater of size m × n representing a map of land and water cells:
- isWater[i][j] = 1 means cell (i, j) is water.
- isWater[i][j] = 0 means cell (i, j) is land.

Assign each cell a non-negative height, following these rules:
- Water cells must have height 0.
- Any two adjacent cells (4-directional: north, south, east, west) must have an absolute height difference ≤ 1.
 
Find any height assignment such that the **maximum height** in the matrix is maximized, and return the resulting height matrix.

### Examples  

**Example 1:**  
Input: `isWater = [[0,1],[0,0]]`  
Output: `[[1,0],[2,1]]`  
*Explanation: Water cell (0,1) is 0. Adjacent land cells are set to be as high as possible, keeping difference ≤ 1 and all non-negative. The land cell (1,0) is farthest from all water, so it gets height 2.*

**Example 2:**  
Input: `isWater = [[0,0,1],[1,0,0],[0,0,0]]`  
Output: `[[1,1,0],[0,1,1],[1,2,2]]`  
*Explanation: All water cells are 0. Land cells get minimal height based on nearest water, each step away increases height by 1.*

**Example 3:**  
Input: `isWater = [[1,1,1],[1,0,1],[1,1,1]]`  
Output: `[[0,0,0],[0,1,0],[0,0,0]]`  
*Explanation: The only land cell is at (1,1) and is surrounded by water, so it gets height 1 (1 away from the nearest water).*


### Thought Process (as if you’re the interviewee)  
First, brute force: For each land cell, try to assign the highest possible height by checking all possible outwards expansions—this is infeasible for large grids due to exponential complexity.

Instead, we want each land cell’s height to represent its minimum possible distance from any water cell. The closer a land cell is to water, the lower its height. The farthest land cells can maximize their height, as required by the problem.

So, treating all water cells as level 0 seeds, we expand outward using multi-source BFS, assigning each unvisited neighbor a height one greater than the cell from which we arrive.

Why BFS? It guarantees minimum distance expansion, and simultaneously satisfies the difference ≤ 1 constraint between adjacent cells. BFS is optimal over DFS here, since DFS may not provide minimum path guarantees in a grid.

Trade-off: BFS efficiently computes the result in O(m × n) time/space. No further optimization is necessary.


### Corner cases to consider  
- All water (no land cells): Output is all zeros.
- All land (no water cells): Problem guarantees at least one water, but if it happened, initial heights would all be -1/unassigned.
- Multiple isolated water sources: Map must "grow" from all water cells.
- 1x1 or 1xn or mx1 grids.
- Input already at final heights (no change needed).
- Big grid with scattered water cells.


### Solution

```python
from collections import deque

def highestPeak(isWater):
    m, n = len(isWater), len(isWater[0])
    # Initialize all heights to -1 (unvisited)
    height = [[-1 for _ in range(n)] for _ in range(m)]
    queue = deque()

    # Add all water cells as starting points, height = 0
    for i in range(m):
        for j in range(n):
            if isWater[i][j] == 1:
                height[i][j] = 0
                queue.append((i, j))

    # 4 directions: North, South, East, West
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]

    # Multi-source BFS
    while queue:
        x, y = queue.popleft()
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            # Out of bounds or already visited
            if 0 <= nx < m and 0 <= ny < n and height[nx][ny] == -1:
                height[nx][ny] = height[x][y] + 1
                queue.append((nx, ny))
    return height
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), since each cell is visited at most once in the BFS.
- **Space Complexity:** O(m × n), needed for the queue and the output height matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if diagonal adjacency (8 directions) was allowed?  
  *Hint: Update adjacent cell neighbor rules for BFS.*

- Can you solve the problem without explicitly using a visited matrix?  
  *Hint: Output matrix doubles as visited tracker.*

- How could you return not just the maximum possible height, but also its coordinates?  
  *Hint: Scan the output matrix after BFS for the largest value.*

### Summary
This is a classic application of **multi-source BFS** in a grid, similar to the "01 Matrix" problem. The main pattern is BFS grid expansion from multiple sources. This technique is widely applicable to grid shortest path, flooding, or zone assignment problems where minimal expansion distance is needed from multiple origins.