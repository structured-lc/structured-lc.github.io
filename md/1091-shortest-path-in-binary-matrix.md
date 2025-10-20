### Leetcode 1091 (Medium): Shortest Path in Binary Matrix [Practice](https://leetcode.com/problems/shortest-path-in-binary-matrix)

### Description  
Given an n×n binary matrix (a “grid”) where each cell is either 0 (open) or 1 (blocked), find the length of the shortest path from the top-left corner (0, 0) to the bottom-right corner (n−1, n−1), moving only through open (0) cells. You may move up, down, left, right, or diagonally (8 directions total) to any adjacent cell.  
The path’s length is the total number of cells visited. If no valid path exists, return -1.

### Examples  

**Example 1:**  
Input: `grid = [[0,1],[1,0]]`  
Output: `2`  
*Explanation: Start at (0, 0). Move diagonally to (1, 1). The path is [(0, 0), (1, 1)] with length 2.*

**Example 2:**  
Input: `grid = [[0,0,0],[1,1,0],[1,1,0]]`  
Output: `4`  
*Explanation: Start at (0, 0), path is (0, 0)→(0, 1)→(0, 2)→(1, 2)→(2, 2).*

**Example 3:**  
Input: `grid = [[1,0,0],[1,1,0],[1,1,0]]`  
Output: `-1`  
*Explanation: Start is blocked (cell is 1), so there is no path.*

### Thought Process (as if you’re the interviewee)  
To find a **shortest path** in a grid with possible obstacles, the classic approach is **Breadth-First Search** (BFS).  
- Brute-force DFS would explore all possible paths, but in an unweighted grid, BFS guarantees the shortest path since it explores all nodes at each distance before moving to the next.
- Use a queue to manage cells to visit and mark visited ones to avoid infinite loops.
- Since 8 directions are allowed, for each step consider all possible 8 neighbors.
- If the start or end cell is blocked (1), immediately return -1.
- The BFS queue holds (row, col, path_length), and we can mark a cell as visited by changing the grid value to 1 as we go.

This approach ensures minimal steps and is efficient since each cell is processed at most once.

### Corner cases to consider  
- **Start or end cell blocked:** grid == 1 or grid[n-1][n-1] == 1.
- **1x1 grid:** grid=[] should return 1, grid=[[1]] should return -1.
- **No possible path due to walls/surrounding 1s.**
- **All zeros grid:** Should take the direct diagonal.
- **Non-square or empty input:** Problem states n×n, but robust checks never hurt.

### Solution

```python
from collections import deque

def shortestPathBinaryMatrix(grid):
    n = len(grid)
    # Check if the start or end cell is blocked
    if grid[0][0] != 0 or grid[n-1][n-1] != 0:
        return -1
    
    # If grid is 1x1 and open, return 1
    if n == 1:
        return 1
    
    # Possible 8 directions
    directions = [
        (1, 0), (0, 1), (-1, 0), (0, -1),
        (1, 1), (1, -1), (-1, -1), (-1, 1)
    ]
    queue = deque()
    queue.append((0, 0, 1))  # row, col, path length
    grid[0][0] = 1  # Mark as visited
    
    while queue:
        r, c, length = queue.popleft()
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            # Check grid bounds and if cell is open
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                if nr == n - 1 and nc == n - 1:
                    return length + 1
                queue.append((nr, nc, length + 1))
                grid[nr][nc] = 1  # Mark as visited
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since each cell is visited at most once.
- **Space Complexity:** O(n²) for the queue in the worst-case, and in-place grid marking (no extra visited matrix).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were only allowed 4 directions (no diagonals)?  
  *Hint: Update the directions array to just up/down/left/right and adjust BFS logic.*

- How would you reconstruct and return the actual path, not just its length?  
  *Hint: Trace parents with a dictionary, then backtrack from target cell when found.*

- Can you handle grids that are not square (m × n)?  
  *Hint: Generalize all grid bounds and access logic; the BFS idea is the same.*

### Summary
This problem uses the **Breadth-First Search** (**BFS**) pattern for shortest path in an unweighted grid. BFS is a common technique for matrix/graph traversal where the earliest arrival at a node gives the minimal path. You can reuse this pattern for maze solving, number of islands, or shortest path on chessboards.


### Flashcard
BFS from (0,0) to (n-1,n-1) exploring all 8 directions, use queue and visited set; return path length when destination reached or -1 if unreachable.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)