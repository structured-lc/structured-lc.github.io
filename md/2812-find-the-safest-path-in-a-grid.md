### Leetcode 2812 (Medium): Find the Safest Path in a Grid [Practice](https://leetcode.com/problems/find-the-safest-path-in-a-grid)

### Description  
Given an n×n grid filled with 0s (empty) and 1s (thieves), find a path from the top-left (0,0) to the bottom-right (n-1,n-1) with the **maximum possible safeness factor**.  
- The **safeness factor** of a path is the minimum Manhattan distance from any cell in that path to any thief cell.  
- You can move in four directions (up, down, left, right) to adjacent cells.
- Return the maximum safeness factor you can achieve for *any* path from start to end.

### Examples  

**Example 1:**  
Input: `grid = [[0,0,1],[0,0,0],[0,0,0]]`  
Output: `2`  
*Explanation: Thief is at (0,2). The path (0,0) → (1,0) → (2,0) → (2,1) → (2,2) stays at least distance 2 away from the thief at all steps.*

**Example 2:**  
Input: `grid = [[0,0,0],[0,1,0],[0,0,0]]`  
Output: `1`  
*Explanation: Thief at (1,1). All valid top-left to bottom-right paths get at least as close as distance 1 to the thief cell.*

**Example 3:**  
Input: `grid = [[1,0,0],[0,0,0],[0,0,0]]`  
Output: `0`  
*Explanation: Thief at the starting position. The minimum distance to a thief is 0 because you start on a thief.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - For every path from (0,0) to (n-1,n-1), compute the minimum distance to any thief cell along the path. Keep the path with the highest such value.
  - This is exponentially slow; we cannot enumerate all paths due to combinatorial explosion.

- **Optimize:**  
  - Notice: For any cell, its *safeness value* is the Manhattan distance to the **closest thief** cell.
  - For any candidate path, the *safeness factor* is the minimum of the safeness values along that path.

- **Step 1: Precompute safeness value for each cell:**  
  - Use multi-source BFS (start from all thief cells at once, spreading out).  
  - Each cell gets marked with its Manhattan distance to the nearest thief.
  - This is standard grid BFS from multiple sources.

- **Step 2: Pathfinding on this safeness grid, maximize the minimal value along the path:**  
  - Formalized as: find a path from (0,0) to (n-1,n-1) so that the minimum cell safeness value along the path is maximized.
  - This is a special kind of path problem: "maximum-minimum path".
  - Best solved by Dijkstra-like greedy BFS:
    - Use a max-heap, always expand the path that currently could give us the highest minimum safeness so far.
    - For each cell, only process if the current path gives higher minimum safeness than any previous path reaching this cell.

- **Alternative:**  
  - You could binary search the answer, checking for a given safeness factor whether a path exists (requires BFS or DFS for each trial).
  - However, the Dijkstra-based approach is simpler and optimal.

- **Why this approach:**  
  - Preprocessing ensures we can look up closeness to any thief in O(1).
  - The main pathfinding is then effectively just maximizing the minimal label on the path, which is classic with heaps.

### Corner cases to consider  
- Thieves at the start or end cell (distance 0 from the path).
- Grid entirely 0 (max safeness possible).
- Grid entirely 1 (all thieves, path impossible unless (0,0) and (n-1,n-1) are the same).
- Multiple thieves, path squeezed between two thieves, creating bottlenecks.
- Very small grids (1×1, 2×2).
- No thieves at all.

### Solution

```python
from collections import deque
import heapq

def maximumSafenessFactor(grid):
    n = len(grid)
    DIRS = [(0,1), (0,-1), (1,0), (-1,0)]
    
    # Step 1: Compute safeness value for each cell by multi-source BFS from all thieves
    safeness = [[-1 for _ in range(n)] for _ in range(n)]
    queue = deque()
    
    # Add all thief positions (cells with 1) to the queue
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                safeness[i][j] = 0
                queue.append((i, j))
    
    # BFS: Each layer increases Manhattan distance by 1
    while queue:
        x, y = queue.popleft()
        for dx, dy in DIRS:
            nx, ny = x + dx, y + dy
            if 0 ≤ nx < n and 0 ≤ ny < n and safeness[nx][ny] == -1:
                safeness[nx][ny] = safeness[x][y] + 1
                queue.append((nx, ny))
    
    # Step 2: Dijkstra's (max-heap, maximize min. safeness along path)
    visited = [[-1 for _ in range(n)] for _ in range(n)]
    # Heap item: (-safeness_along_path, x, y)
    heap = [(-safeness[0][0], 0, 0)]
    visited[0][0] = safeness[0][0]
    
    while heap:
        curr_safeness, x, y = heapq.heappop(heap)
        curr_safeness = -curr_safeness
        
        if (x, y) == (n-1, n-1):
            return curr_safeness
        
        for dx, dy in DIRS:
            nx, ny = x + dx, y + dy
            if 0 ≤ nx < n and 0 ≤ ny < n:
                # Minimum safeness encountered so far on path
                next_safeness = min(curr_safeness, safeness[nx][ny])
                if next_safeness > visited[nx][ny]:
                    visited[nx][ny] = next_safeness
                    heapq.heappush(heap, (-next_safeness, nx, ny))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² log n)  
  - O(n²) to compute safeness matrix (all cells visited once in BFS).
  - O(n² log n) for the Dijkstra traversal (every cell may enter heap up to O(1) times due to safeness strictly increasing).
- **Space Complexity:** O(n²)  
  - O(n²) for the safeness grid, visited grid, and the heap at worst.

### Potential follow-up questions (as if you’re the interviewer)  

- If the grid is very large, could you optimize space usage in your algorithm?  
  *Hint: When BFS or heap is sparse, consider in-place or iterative optimizations.*

- If the grid had more than two values (representing multiple danger levels, not just thief/not-thief), would your approach change?  
  *Hint: Modify the initial BFS to start from all "dangerous" cells.*

- Could you output not just the max safeness, but an actual safest path (as a sequence of cells)?  
  *Hint: Maintain a parent pointer or reconstruct using visited states.*

### Summary

This is a **multi-source BFS for safety labeling**, followed by a **maximum-minimum-path BFS/Dijkstra** on a grid. The “maximize the minimal value on a path” pattern is a classic application for heap-based search. The approach is broadly useful for "optimal bottleneck path" problems and grid escape/avoidance scenarios.