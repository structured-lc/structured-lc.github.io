### Leetcode 1391 (Medium): Check if There is a Valid Path in a Grid [Practice](https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid)

### Description  
Given a grid where each cell is a street type (1-6), check if there's a valid path from top-left (0,0) to bottom-right (m-1,n-1). Each street type connects to certain directions only (e.g., type 1: left-right, type 2: up-down, etc). Moves are only valid if streets connect in both directions.

### Examples  
**Example 1:**  
Input: `grid=[[2,4,3],[6,5,2]]`  
Output: `True`  
*Explanation: There is a valid connection from (0,0) to (1,2), following legal street joins.*

**Example 2:**  
Input: `grid=[[1,2,1],[1,2,1]]`  
Output: `False`  
*Explanation: No continuous path matches the street constraints.*

**Example 3:**  
Input: `grid=[[1,1,2]]`  
Output: `False`  
*Explanation: Can't exit the grid with legal roads.*

### Thought Process (as if you’re the interviewee)  
Need to simulate movement using grid traversal (BFS or DFS). At each cell, can move in legal directions if connecting cell type can match (e.g. left-right must both allow). Need a map of which types connect where, and which pairs are valid (e.g., if I go right, next must allow left enter). Mark visited cells to avoid cycles. BFS preferred for iterative, DFS for recursion.

### Corner cases to consider  
- Grid is 1x1 (trivially valid)
- Grid is all the same type
- Blocked corners or dead-ends
- Cycle or backtracking avoidance
- No possible moves from start

### Solution

```python
class Solution:
    def hasValidPath(self, grid):
        m, n = len(grid), len(grid[0])
        # Maps for movement: {direction: (dx, dy)}
        dirs = {'left': (0, -1), 'right': (0, 1), 'up': (-1, 0), 'down': (1, 0)}
        # Street type: allowed movements and enter matches
        connections = {
            1: [('left', 'right'), ('right', 'left')],
            2: [('up', 'down'), ('down', 'up')],
            3: [('left', 'down'), ('down', 'left')],
            4: [('right', 'down'), ('down', 'right')],
            5: [('left', 'up'), ('up', 'left')],
            6: [('right', 'up'), ('up', 'right')],
        }
        from collections import deque
        dq = deque()
        dq.append((0,0))
        visited = set()
        while dq:
            x, y = dq.popleft()
            if (x,y) == (m-1,n-1):
                return True
            if (x,y) in visited:
                continue
            visited.add((x,y))
            tp = grid[x][y]
            for move_from, move_to in connections[tp]:
                dx, dy = dirs[move_from]
                nx, ny = x + dx, y + dy
                if 0 <= nx < m and 0 <= ny < n:
                    ntp = grid[nx][ny]
                    # Check if the target can connect enter from move_to
                    if any(mt == opposite(move_from) for mf, mt in connections[ntp]):
                        dq.append((nx,ny))
        return False

# Helper to get opposite direction
opposite_direction = {'left':'right','right':'left','up':'down','down':'up'}
def opposite(d): return opposite_direction[d]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m×n), since each cell visited once
- **Space Complexity:** O(m×n) for BFS queue and visited set

### Potential follow-up questions (as if you’re the interviewer)  
- How would your solution adapt if there were obstacles?
  *Hint: Mark obstacles and skip in BFS.*

- Is there a way to precompute or cache the connection rules for speed?
  *Hint: Yes, preprocessing street/connectivity matrix.*

- Can you reconstruct the path, not just verify if it exists?
  *Hint: Record parent pointers during BFS.*

### Summary
A grid traversal problem with movement constraints. Uses BFS/DFS and connection mapping. Coding pattern is similar to graph traversal with legality checks at every step.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
-  Check if There Is a Valid Parentheses String Path(check-if-there-is-a-valid-parentheses-string-path) (Hard)