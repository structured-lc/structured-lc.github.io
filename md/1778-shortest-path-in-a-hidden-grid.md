### Leetcode 1778 (Medium): Shortest Path in a Hidden Grid [Practice](https://leetcode.com/problems/shortest-path-in-a-hidden-grid)

### Description  
You control a robot in an **unknown m × n grid** where cells may be blocked. The robot starts on an unknown empty cell (the starting position is not given). The grid also contains a target cell, but you do not know its location either.

Your only way to interact with the grid is through a `GridMaster` object providing:
- `canMove(dir)`: returns True if you can move in direction 'U', 'D', 'L', or 'R'.
- `move(dir)`: moves the robot in the specified direction (if it's legal).
- `isTarget()`: returns True if the robot is currently on the target.

Your **goal**: Find the length of the shortest path from the start to the target cell (moving one step at a time in the cardinal directions), or return -1 if it is impossible.  
You are not given the grid map or the (row, col) of the starting or target cells up front.

### Examples  

**Example 1:**  
Input: `A 3x3 hidden grid, S=Start, T=Target, #=Blocked`
```
[['.','.','.'],
 ['.','#','.'],
 ['#','T','.']]
S is at (0,0) (not known to you). Target 'T' at (2,1)
```
Output: `4`  
Explanation: Move sequence could be R, D, D, L (→, ↓, ↓, ←).

**Example 2:**  
Input: `A grid where target is not reachable`
```
[['.','#','.'],
 ['#','S','#'],
 ['#','T','#']]
```
Output: `-1`  
Explanation: The start cell is blocked off from the target, so no path exists.

**Example 3:**  
Input: `A grid where the robot starts on the target`  
Output: `0`  
Explanation: `isTarget()` would immediately return True, so the answer is 0.

### Thought Process (as if you’re the interviewee)  
- At first, I would consider standard BFS for shortest path. However, since the grid is **hidden** and we only have local movement and target information, we need to explore the grid ourselves.
- My idea is to first **fully explore** the reachable part of the grid from the start, marking which cells are blocked, open, or the target. To do this, I need to simulate my knowledge using the robot's APIs. This can be done with **DFS**, where each recursive call explores an adjacent move, marks that cell as visited, and then backtracks to the original position.
- As I discover the map, I can note the (virtual) coordinates of the start (e.g., (0,0)) and any coordinates for targets I find during exploration.
- Once the map is built, I can use **standard BFS** on this "known" map to find the shortest path from the start to the target, tracking cells we've discovered and their connections.
- This is similar to "Robot Room Cleaner" problem, where you need to DFS to map the hidden space, then run BFS for shortest path.
- The only trade-off is time/space: since the maximum number of cells is up to 10⁶, we can use a fixed-size 2D array with offset (e.g., 500,500 as the origin) to represent coordinates safely.

### Corner cases to consider  
- Robot's starting cell is already the target ⇒ return 0.
- Target is not reachable due to blocked cells ⇒ return -1.
- The grid is just 1 cell, and it is the target.
- There are multiple directions possible from start–ensure all are explored.
- Returning to previous positions (avoid duplicates/loops).
- Not overshooting array bounds in implementation.

### Solution

```python
# Directions: mapping and movement deltas
DIRS = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}
REVERSE = {'U': 'D', 'D': 'U', 'L': 'R', 'R': 'L'}

class Solution:
    def findShortestPath(self, master: 'GridMaster') -> int:
        n = 1000   # virtual grid size (safe for |cells| ≤ 1e6)
        OFFSET = 500  # treat (OFFSET, OFFSET) as the origin (robot start)
        grid = [[-1] * n for _ in range(n)]    # -1 = unknown, 0 = open, 2 = target, 1 = blocked
        start = (OFFSET, OFFSET)
        target_pos = None
        
        # Step 1: DFS the grid to map what is possible, find target position
        def dfs(x, y):
            if master.isTarget():
                grid[x][y] = 2
                nonlocal target_pos
                target_pos = (x, y)
            else:
                grid[x][y] = 0
                
            for d, (dx, dy) in DIRS.items():
                nx, ny = x+dx, y+dy
                if grid[nx][ny] != -1:
                    continue   # already explored this cell
                if not master.canMove(d):
                    grid[nx][ny] = 1   # blocked
                    continue
                master.move(d)
                dfs(nx, ny)
                master.move(REVERSE[d])   # backtrack for exploration
        
        dfs(*start)
        if not target_pos:
            return -1  # Target unreachable
        
        # Step 2: BFS for shortest path on discovered grid
        from collections import deque
        q = deque()
        q.append((start[0], start[1], 0))
        seen = set([start])
        while q:
            x, y, dist = q.popleft()
            if (x, y) == target_pos:
                return dist
            for d, (dx, dy) in DIRS.items():
                nx, ny = x+dx, y+dy
                if (0 <= nx < n and 0 <= ny < n and
                    grid[nx][ny] in {0,2} and (nx,ny) not in seen):
                    seen.add((nx,ny))
                    q.append((nx,ny,dist+1))
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m × n is the number of reachable cells. Each cell is visited at most once in both DFS (mapping) and BFS (path finding).
- **Space Complexity:** O(m × n) for the grid map, plus O(m × n) for visited / BFS queue structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize memory usage if the grid can be truly massive?
  *Hint: Use dictionaries instead of large arrays, or explore only up to the target.*

- How would you handle multiple targets or allow diagonal moves?
  *Hint: Adapt BFS/DFS neighbor checks/finding criteria.*

- What if you cannot move back (no backtrack with master.move)?
  *Hint: You would need to perform BFS instead of DFS, planning every move carefully—this makes the problem much harder.*

### Summary
This approach uses a **backtracking DFS (with one step return for each exploration)** to **explore and map the unknown grid** (as seen in "Robot Room Cleaner" types of problems), and then a standard **BFS** to compute the true shortest path. The **DFS + BFS pattern** is common in situations where the grid or graph is "discovered" on the fly before classic algorithms can operate. Variants of this pattern apply to real-world robotics, path planning, and search in unknown environments.


### Flashcard
Explore the hidden grid using DFS to map reachable cells and then apply BFS for the shortest path to the target.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix), Interactive(#interactive)

### Similar Problems
- Robot Room Cleaner(robot-room-cleaner) (Hard)
- Minimum Path Cost in a Hidden Grid(minimum-path-cost-in-a-hidden-grid) (Medium)