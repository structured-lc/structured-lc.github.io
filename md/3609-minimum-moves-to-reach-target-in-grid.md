### Leetcode 3609 (Hard): Minimum Moves to Reach Target in Grid [Practice](https://leetcode.com/problems/minimum-moves-to-reach-target-in-grid)

### Description  
You are given an m × n grid. Each cell may be open or blocked (unpassable). You start at a given position (sx, sy) and must reach the target (tx, ty) in as few moves as possible. You can move up, down, left, or right, only to adjacent open cells. Some versions of the problem allow you to "break" at most k walls (turn blocked cells into open ones). Find the minimum number of moves needed to reach the target, or -1 if impossible.

### Examples  

**Example 1:**  
Input: `grid = [[0,0,0],[1,1,0],[0,0,0]], start=(0,0), target=(2,2), k=1`  
Output: `4`  
*Explanation: You can break one wall at (1,1), path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2).*  

**Example 2:**  
Input: `grid = [[0,1],[1,0]], start=(0,0), target=(1,1), k=1`  
Output: `2`  
*Explanation: (0,0)→(0,1) [break wall], (0,1)→(1,1).*  

**Example 3:**  
Input: `grid = [[0,1,1],[1,1,1],[1,1,0]], start=(0,0), target=(2,2), k=1`  
Output: `-1`  
*Explanation: Not possible with only 1 wall break available.*  

### Thought Process (as if you’re the interviewee)  
- This is a shortest path problem on a grid, possibly with wall-breaking.
- Classic BFS for unweighted shortest path, but state is (x, y, wall_breaks_used).
- For k=0, standard BFS is enough.
- For k>0, use BFS with 3D visited: at (x, y) with used<k wall breaks.
- Always expand as soon as possible; no need for Dijkstra since each move has the same cost.
- Return the number of moves when (tx, ty, any wall-break-count ≤ k) is first reached.

### Corner cases to consider  
- Start equals target.
- No path even with all wall breaks.
- Multiple shortest paths.
- All cells blocked except start and target.
- k=0 (no wall breaks).

### Solution

```python
from collections import deque

def minMovesToTarget(grid, start, target, k):
    m, n = len(grid), len(grid[0])
    sx, sy = start
    tx, ty = target
    visited = [[[False]*(k+1) for _ in range(n)] for _ in range(m)]
    q = deque()
    q.append((sx, sy, 0, 0))  # x, y, steps, used wall breaks
    visited[sx][sy][0] = True
    directions = [(-1,0),(1,0),(0,-1),(0,1)]
    while q:
        x, y, steps, used = q.popleft()
        if (x, y) == (tx, ty):
            return steps
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < m and 0 <= ny < n:
                nused = used + grid[nx][ny]
                if nused <= k and not visited[nx][ny][nused]:
                    visited[nx][ny][nused] = True
                    q.append((nx, ny, steps+1, nused))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × (k+1)). Each grid cell can be visited at each wall-break-count ≤ k.
- **Space Complexity:** O(m × n × (k+1)), for visited and the queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only break walls on corners or edges?  
  *Hint: Add cell property check before wall-breaking.*

- What if breaking a wall costs more than a regular move?  
  *Hint: Dijkstra instead of BFS and edge costs.*

- How to count number of shortest paths?  
  *Hint: Use dynamic programming along with BFS.*

### Summary
This is a BFS variant with additional state (wall breaks used). This pattern is widely used in "grid with obstacles" problems and can be generalized to weighted moves, portal jumps, or variable move costs.


### Flashcard
Use BFS with state (x, y, walls_broken) to find shortest path; each move costs 1, and you can break ≤ k walls to pass through obstacles.

### Tags
Math(#math)

### Similar Problems
