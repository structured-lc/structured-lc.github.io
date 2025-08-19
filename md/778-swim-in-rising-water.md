### Leetcode 778 (Hard): Swim in Rising Water [Practice](https://leetcode.com/problems/swim-in-rising-water)

### Description  
You are given an n × n integer matrix called **grid** where each cell grid[i][j] represents the *elevation* at that point (i, j).  
Rain starts to fall, and at time t, the water depth is t everywhere.  
You can swim from a cell to a 4-directionally adjacent cell (up/down/left/right) **if and only if** both the current cell and the destination cell have elevation ≤ t. You always start at the top-left cell (0, 0) and need to reach the bottom-right cell (n-1, n-1).  
Return the **minimum time** required to reach the bottom-right corner.

### Examples  

**Example 1:**  
Input: `grid = [[0,2],[1,3]]`  
Output: `3`  
Explanation:  
- At time 0: You are at (0,0), but can't move to any neighbors (elevations 2,1), which are all higher than 0.  
- At time 1: You can move right or down, but neither both reach target.
- At time 3: Water is at level 3; you can move through the path (0,0) → (1,0) → (1,1): all elevations ≤ 3.

**Example 2:**  
Input: `grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]`  
Output: `16`  
Explanation:  
We need to wait until time 16 so that a path connecting (0,0) to (4,4) is open. The lowest possible such *maximum elevation* along any path from top-left to bottom-right is 16.

**Example 3:**  
Input: `grid = [[7,34,16],[25,80,64],[94,32,44]]`  
Output: `80`  
Explanation:  
The highest elevation along the optimal path is 80, so we must wait until water reaches depth 80 to complete the swim.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
    - Try all possible paths from (0,0) to (n-1,n-1), keeping track of the max elevation encountered on each path. Return the minimal of these maximums.
    - Very slow: exponential in n. Not feasible for n up to 50.

- **Observations:**  
    - We are NOT trying to minimize path length, but to minimize the **largest elevation on the path**.
    - The answer is the minimal value of max(grid[i][j]) along any valid path between the two corners.

- **Approach 1: Modified BFS with priority queue (Dijkstra-like):**
    - Classic Dijkstra's, but with max-elevation as the "cost."
    - Use a min-heap to always explore the neighbor with the smallest elevation so far.
    - For each cell, the "cost" to reach it is max(current cost, grid[i][j]).
    - As soon as we reach (n-1, n-1), return the cost.

- **Approach 2: Binary search + DFS/BFS:**  
    - We can binary search on "time" t (from start height to max in grid). For each t, do BFS/DFS to check if you can reach destination when water is at t.
    - O(n² log(max elevation)), which is efficient.

- **Why Dijkstra is ideal here:**  
    - We need to track the *minimum possible highest elevation* along any path, not just simple reachability.

### Corner cases to consider  
- n=1 (single cell): trivial, answer is grid.
- All elevations are strictly increasing: need to wait for highest.
- Paths blocked by high elevation "walls".
- Multiple optimal paths.
- Elevation values are at min/max range.
- Non-square (shouldn’t happen, by problem).

### Solution

```python
from heapq import heappush, heappop

def swimInWater(grid):
    n = len(grid)
    visited = [[False] * n for _ in range(n)]
    # Min-heap where each entry is (max_elevation_along_path, row, col)
    heap = [(grid[0][0], 0, 0)]
    dir4 = [(-1,0),(1,0),(0,-1),(0,1)]
    while heap:
        elev, x, y = heappop(heap)
        if visited[x][y]:
            continue
        visited[x][y] = True
        if x == n-1 and y == n-1:
            return elev
        for dx, dy in dir4:
            nx, ny = x+dx, y+dy
            if 0 <= nx < n and 0 <= ny < n and not visited[nx][ny]:
                heappush(heap, (max(elev, grid[nx][ny]), nx, ny))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - Dijkstra’s runs in O(n² log n), since grid has size n × n and each cell can be inserted into heap at most once; heap operations cost log(n²).
- **Space Complexity:**  
    - O(n²) for visited + O(n²) for heap in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- If the grid is *very* large (e.g., 10⁴ × 10⁴), how would you scale it?
  *Hint: Can you use A* search with a heuristic? Prune unhelpful paths earlier.*

- What if you can move diagonally as well?
  *Hint: Change the neighbors list from 4 to 8 directions and revisit the effect on complexity.*

- If grid heights are not unique, how will your algorithm change?
  *Hint: Consider if unique heights matter to correctness — eg: visited, heap.*

### Summary
This problem uses the **modified Dijkstra’s algorithm** pattern — instead of summing edge costs, we track max cost along any path.  
It’s a classic application of “minimize the maximum” along a path, common in problems with obstacles or variable path costs (see also: Path with Minimum Effort, 1631).  
This pattern is very useful in grid pathfinding scenarios where *bottleneck constraints* are key, rather than total sum.

### Tags
Array(#array), Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
- Path With Minimum Effort(path-with-minimum-effort) (Medium)