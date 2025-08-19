### Leetcode 2577 (Hard): Minimum Time to Visit a Cell In a Grid [Practice](https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid)

### Description  
You are given an m × n grid where each cell contains a non-negative integer. The value of grid[i][j] represents the earliest time you can enter cell (i, j).  
- You start at the top-left (0, 0) at time 0.
- Each move to any of the four adjacent cardinal cells (up/down/left/right) takes exactly 1 second.
- You cannot enter a cell before its available time.
- Find the minimum time needed to reach the bottom-right (m-1, n-1). Return -1 if it's impossible.

### Examples  

**Example 1:**  
Input: `grid = [[0,2,4],[3,2,1],[1,0,4]]`  
Output: `4`  
*Explanation: Entry to each cell must respect its minimum time. One shortest path: (0,0) → (1,0) → (2,0) → (2,1) → (2,2) with times [0,3,4,4,4].*

**Example 2:**  
Input: `grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]`  
Output: `7`  
*Explanation: Path is (0,0) → (0,1) → (1,1) → (1,2) → (0,2) → (0,3) → (1,3) → (2,3). Each move enters as soon as possible, but waits at some cells for grid's ready time.*

**Example 3:**  
Input: `grid = [[0,1,2],[1,2,3],[2,3,4]]`  
Output: `6`  
*Explanation: Must proceed through increasing minimum cell times: can't shortcut, must wait as needed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths (classic BFS/DFS), but with timing: for each cell, you can only move if time reached is ≥ grid[r][c]. This will TLE for large grids due to exponential explosion.
- **Optimize: Dijkstra (Modified):** Since each cell can have a "ready after" time, the minimal reach time for each cell can be seen as a weighted shortest path where cell’s earliest available time is a constraint.  
  - Use a priority queue (min-heap) to always expand the cell with the smallest arrival time.  
  - From cell (r, c) at curr_time, for each move, calculate next_time:
    - next_time = max(curr_time + 1, grid[nr][nc])
    - If odd/even parity of (next_time - grid[nr][nc]) is not matching, may need to wait another second.
  - Continue until reaching (m-1, n-1).
- This strategy balances always moving forward as soon as possible, while minimizing unnecessary waiting.

### Corner cases to consider  
- Path blocked right after the first move (adjacent cell greater than time + 1, and no alternate path).
- Cells where parity of arrival time and cell timing prevent entry (must sometimes wait extra second to satisfy constraints).
- Tiny grids: 1×1 (start is end).
- Large numbers in grid, large waits.
- No possible path due to isolation by high/min times.

### Solution

```python
import heapq

def minimumTime(grid):
    m, n = len(grid), len(grid[0])
    # If the adjacent cell to (0,0) is unreachable at time 1 (impossible to move out)
    if grid[0][1] > 1 and grid[1][0] > 1:
        return -1
    
    # Distance/earliest arrival matrix
    earliest = [[float('inf')] * n for _ in range(m)]
    earliest[0][0] = 0
    # Min-heap: (curr_time, r, c)
    heap = [(0, 0, 0)]
    drc = [(-1,0), (1,0), (0,-1), (0,1)]

    while heap:
        curr_time, r, c = heapq.heappop(heap)
        if (r, c) == (m-1, n-1):
            return curr_time
        for dr, dc in drc:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                next_time = max(curr_time + 1, grid[nr][nc])
                # Parity fix: you can only enter if (next_time - grid[nr][nc]) % 2 == 0
                if (next_time - grid[nr][nc]) % 2 != 0:
                    next_time += 1
                if next_time < earliest[nr][nc]:
                    earliest[nr][nc] = next_time
                    heapq.heappush(heap, (next_time, nr, nc))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × log(m × n)), since each cell can go into the heap at most once with the minimal arrival time. Heap operations are log of number of cells.
- **Space Complexity:** O(m × n) for the earliest time table and the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal moves are allowed?  
  *Hint: Update drc to include diagonal directions and adjust parity logic if needed.*

- How would you reconstruct the shortest path taken?  
  *Hint: Store parent/pred links during expansion and backtrack.*

- Suppose only some cells are blocked instead of all having a minimum time, how would this simplify the solution?  
  *Hint: It reduces to classical BFS or Dijkstra with obstacles.*

### Summary
This problem uses a **shortest-path variation (Dijkstra)** in a grid with arrival timing constraints. The pattern of always selecting the minimal-possible "state" (arrival time) is classic in pathfinding, and the solution closely mirrors other grid-based minimum-cost reachability problems. Variations of this approach show up in networking (routing with delays), dynamic games, and robot pathing with priorities.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Shortest Path(#shortest-path)

### Similar Problems
- Find Minimum Time to Reach Last Room I(find-minimum-time-to-reach-last-room-i) (Medium)
- Find Minimum Time to Reach Last Room II(find-minimum-time-to-reach-last-room-ii) (Medium)