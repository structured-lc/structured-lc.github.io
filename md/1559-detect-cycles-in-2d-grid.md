### Leetcode 1559 (Medium): Detect Cycles in 2D Grid [Practice](https://leetcode.com/problems/detect-cycles-in-2d-grid)

### Description  
Given a 2D grid of characters, determine if there exists a **cycle** consisting of cells with the same value.  
A **cycle** is defined as a path of length 4 or more that starts and ends at the same cell, with each consecutive pair of cells in the path being adjacent (up, down, left, or right), and each cell in the cycle containing the **same character**.  
You can revisit a cell more than once, but you cannot move back to the immediate previous cell (no immediate backtracking).

### Examples  

**Example 1:**  
Input: `grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]`  
Output: `True`  
*Explanation: The entire outer 'a' region forms a cycle, as starting from any 'a' on the edge, you can loop around back to the starting cell using only cells with 'a', and the path length is ≥4.*

**Example 2:**  
Input: `grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]`  
Output: `True`  
*Explanation: The 'c' cells form cycles in the grid, for example by moving along the border of all the 'c's.*

**Example 3:**  
Input: `grid = [["a","b","b"],["b","z","b"],["b","b","a"]]`  
Output: `False`  
*Explanation: There is no way to form a closed cycle of length ≥4 using only adjacent cells with the same character.*

### Thought Process (as if you’re the interviewee)  

- First, realize this is a **grid-based cycle detection** problem. A grid is effectively a graph where each cell is a node and each cell can connect to its same-valued neighbors up, down, left, or right.
- The brute-force idea would be to do a DFS from every cell, tracking visited cells and previous coordinates, and check if we can revisit a cell from a valid direction to form a cycle of length ≥4.
- Optimizing: To avoid recomputing for every cell, we'll use a 2D visited matrix to mark explored nodes. For each cell, if we encounter a visited neighbor that isn't the immediate parent, we've detected a cycle.
- To prevent immediate backtracking, always track the previous cell (`parent`) in the DFS, and do not traverse it again immediately.
- Use DFS since it's simpler for cycle detection in a grid, but BFS or Union Find are also possible; DFS is the most straightforward for path-based cycle detection.

### Corner cases to consider  
- A grid where all values are the same (should form a cycle except in tiny grids).
- A grid with no adjacent matching cells (no cycle).
- Single-row or single-column grids (cycles impossible).
- Smallest possible cycles (length = 4).
- Grids with holes/non-rectangular regions made by different letters.

### Solution

```python
def containsCycle(grid):
    # Dimensions of the grid
    m, n = len(grid), len(grid[0])
    # Track visited nodes
    visited = [[False] * n for _ in range(m)]

    # Directions: right, down, left, up
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    
    def dfs(x, y, from_x, from_y, char):
        if visited[x][y]:
            return True

        visited[x][y] = True

        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            # Check in bounds
            if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == char:
                # Don't go back to the cell we just came from
                if (nx, ny) == (from_x, from_y):
                    continue
                # If neighbor has been visited before -- a cycle!
                if dfs(nx, ny, x, y, char):
                    return True
        return False

    for i in range(m):
        for j in range(n):
            if not visited[i][j]:
                if dfs(i, j, -1, -1, grid[i][j]):
                    return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited at most once during DFS, and each visit explores up to 4 neighbors; the total work is proportional to the number of cells.
- **Space Complexity:** O(m × n)  
  Space is used for the `visited` matrix, and the recursion stack can also be O(m × n) in the worst case for a single component.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this to detect the smallest cycle?
  *Hint: Track the cycle length and return early when the minimal required length is found.*
- Could you solve this using Union-Find?  
  *Hint: Union current cell with neighbors and check if two adjacent same-value cells are already connected before the union.*
- What if the grid is very large and recursion could cause a stack overflow?  
  *Hint: Implement DFS iteratively or use BFS.*

### Summary
This problem is a classic application of **graph cycle detection** in a 2D grid.  
The approach uses **DFS with parent tracking** to avoid trivial cycles (immediate backtracking) and detects cycles by encountering previously visited nodes not equal to the parent.
It’s a common interview pattern, useful in maze problems, region finding, and grid cycle detection.  
The solution can be adapted with BFS or Union Find; the DFS method here is a general graph traversal template used across grid/search problems.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
