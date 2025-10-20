### Leetcode 1162 (Medium): As Far from Land as Possible [Practice](https://leetcode.com/problems/as-far-from-land-as-possible)

### Description  
Given a binary grid where **1** represents land and **0** represents water, find the water cell (0) that is as far as possible from any land cell (1), using **Manhattan distance** (distance between \((x₀, y₀)\) and \((x₁, y₁)\) is |x₀ − x₁| + |y₀ − y₁|). Return the distance for the farthest water cell. If there is no water cell or no land cell, return -1.  
In essence: for each water cell, find its nearest land and determine which water cell has the largest such minimal distance.

### Examples

**Example 1:**  
Input=`[[1,0,1],[0,0,0],[1,0,1]]`,  
Output=`2`  
Explanation. All land are at corners. The center cell (1,1) is the farthest water and has distance 2 to any land.

**Example 2:**  
Input=`[[1,0,0],[0,0,0],[0,0,0]]`,  
Output=`4`  
Explanation. The farthest water is at (2,2) with Manhattan distance 4 from land at (0,0).

**Example 3:**  
Input=`[[0,0],[0,0]]`  
Output=`-1`  
Explanation. There are no land cells, so the answer is -1.

### Thought Process (as if you’re the interviewee)  

First, brute-force: For each water cell, search all land cells and compute their distances, taking the minimum. This is O((n²)²) and very inefficient for large grids.

Next, optimize:
- Think in terms of finding the shortest distance from any water cell to the closest land cell.
- This is similar to the multi-source shortest path problem with uniform weights—a perfect case for **BFS**.
- Instead of BFS from each water, do BFS from all land simultaneously. Add all land cells to the queue first, then spread outwards (`multi-source BFS`). Each water cell is visited at its minimal distance from any land.

Why choose this: BFS guarantees minimal step/discovery for unweighted graphs; multi-source BFS lets us solve this efficiently.

### Corner cases to consider  
- Grid contains only land (`[[1,1],[1,1]]`): should return -1  
- Grid contains only water (`[[0,0,0],[0,0,0]]`): should return -1  
- All water is adjacent to land (distance 1 max)  
- Non-square grid: e.g., 3×1, 1×5, etc.  
- Tiny grid: e.g., one cell, single row/col.

### Solution

```python
from collections import deque

def maxDistance(grid):
    # Get grid size
    n = len(grid)
    # Directions: up, down, left, right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    
    # Collect all land cells
    queue = deque()
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                queue.append((i, j))
    
    # All land or all water: return -1
    if not queue or len(queue) == n * n:
        return -1
    
    dist = -1
    # Multi-source BFS from all initial land cells
    while queue:
        dist += 1
        for _ in range(len(queue)):
            x, y = queue.popleft()
            # Spread to all 4 directions
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                # Bound and only spread to unvisited water
                if 0 <= nx < n and 0 <= ny < n and grid[nx][ny] == 0:
                    grid[nx][ny] = 2  # Mark as visited (avoid revisiting)
                    queue.append((nx, ny))
    return dist
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — Every cell is processed at most once, each in O(1), for n × n grid.
- **Space Complexity:** O(n²) — At worst, up to all cells can be added to the queue and marked as visited.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to also return the position(s) of the farthest water cell(s)?
  *Hint: Keep track of cell coordinates at each BFS level.*

- How would you adapt the solution if diagonal movement was also allowed?
  *Hint: Add diagonal directions to dirs list. Manhattan distance changes accordingly.*

- Can you do this without modifying the original grid?
  *Hint: Use a separate visited matrix.*

### Summary
This problem is a classic example of the **Multi-Source BFS** pattern for shortest paths in an unweighted grid. The pattern applies to any scenario where many sources expand and we want to track the shortest reach to each target class. This approach is common in problems like "rot all oranges", "zombie in matrix", or “walls and gates”.


### Flashcard
Multi-source BFS from all land cells simultaneously; the farthest water cell reached gives the maximum distance from land.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Shortest Distance from All Buildings(shortest-distance-from-all-buildings) (Hard)
- K Highest Ranked Items Within a Price Range(k-highest-ranked-items-within-a-price-range) (Medium)
- Maximum Manhattan Distance After K Changes(maximum-manhattan-distance-after-k-changes) (Medium)