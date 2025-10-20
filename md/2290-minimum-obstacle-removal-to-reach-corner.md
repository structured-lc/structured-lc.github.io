### Leetcode 2290 (Hard): Minimum Obstacle Removal to Reach Corner [Practice](https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner)

### Description  
You’re given a 2D integer grid where each cell contains either a 0 (empty) or 1 (obstacle). You can move up, down, left, or right. The task is to find the minimum number of obstacles you need to remove to get from the top-left corner (0, 0) to the bottom-right (m-1, n-1). Removing an obstacle (cell with 1) lets you pass through as if it’s a 0.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,1],[1,1,0],[1,0,0]]`  
Output: `2`  
*Explanation: One optimal path is right → down → down → right, removing the obstacles at (0,1) and (1,1).*

**Example 2:**  
Input: `grid = [[0,0,0],[1,1,0],[1,1,0]]`  
Output: `0`  
*Explanation: A path (right, right, down, down) exists passing only through 0s. No removals needed.*

**Example 3:**  
Input: `grid = [[0,1,1],[1,0,1],[1,1,0]]`  
Output: `1`  
*Explanation: Path: right → down → right → down (removing the obstacle at (0,1)).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths, count the minimum obstacles removed per path, and select the minimum. This is exponential and not feasible for large grids.
- **Observing Properties:** This is a shortest-path graph problem, where traversing a 0-cost edge means not removing anything, and 1-cost means removing an obstacle.
- **Optimized Approach:** Use Dijkstra's algorithm with a min-heap (priority queue). Each cell is a node, and moving costs 0 or 1 according to the cell value. Always expand the position with the fewest obstacles removed so far.
  - Justification: We want the path with the lowest cumulative removal cost.
  - Implementation: Priority queue holds (obstacles_removed, r, c). For each neighbor, if a cheaper way is found, update and push to the heap.
- **Why not BFS only?** Plain BFS doesn’t handle weighted graphs correctly when edge costs >0 (here, cost is 0 or 1). Dijkstra handles both.

### Corner cases to consider  
- Single cell grid (start & end the same).
- All zeros; no obstacles.
- All ones except start/end.
- Obstacle at start or end (should not occur per constraints but check handling).
- No possible path (surrounded by obstacles).
- Multiple equally optimal paths.

### Solution

```python
import heapq

def minimumObstacles(grid):
    m, n = len(grid), len(grid[0])
    # Directions: up, down, left, right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    # Initialize the removal cost matrix with infinity
    removal = [[float('inf')] * n for _ in range(m)]
    removal[0][0] = 0

    heap = []
    # Heap: (obstacles_removed_so_far, row, col)
    heapq.heappush(heap, (0, 0, 0))

    while heap:
        obstacles, r, c = heapq.heappop(heap)
        # If we reach the end, return the answer
        if r == m-1 and c == n-1:
            return obstacles

        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                new_obstacles = obstacles + grid[nr][nc]
                if new_obstacles < removal[nr][nc]:
                    removal[nr][nc] = new_obstacles
                    heapq.heappush(heap, (new_obstacles, nr, nc))
    return -1  # If unreachable
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × log(m × n)), since each cell may be pushed onto the heap possibly once (with better cost), and each heap operation is log(total cells).
- **Space Complexity:** O(m × n) for the cost matrix and heap storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of removing obstacles, you could only pass through them a limited number of times?
  *Hint: Can you modify the state to keep track of remaining "passes"?*

- Can you reconstruct the path, not just the minimum obstacle removals?
  *Hint: Maintain a parent/pointer dictionary for traceback.*

- What if movement costs were arbitrary positive integers, not just 0 or 1?
  *Hint: Can your algorithm handle all positive edge weights? (Yes; that’s Dijkstra).*

### Summary
This problem is a classic **Dijkstra’s shortest-path** pattern, specialized for grid traversal with 0/1 weights (sometimes called 0-1 BFS). The same technique applies to **minimum cost pathfinding** on weighted grids, and can be adapted for related problems like minimum time, energy, or other constraints. Recognizing when to use a priority queue (for weighted graphs) is key in interview-level graph and grid traverse problems.


### Flashcard
Treat grid as a graph where moving through obstacles costs 1; use Dijkstra’s to find the path with least removals.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Shortest Path(#shortest-path)

### Similar Problems
- Shortest Path in a Grid with Obstacles Elimination(shortest-path-in-a-grid-with-obstacles-elimination) (Hard)