### Leetcode 1034 (Medium): Coloring A Border [Practice](https://leetcode.com/problems/coloring-a-border)

### Description  
Given a 2D grid of integers where each entry represents a color, two adjacent (4-directionally) cells of the same color are considered part of the same connected component. For a given starting cell (r₀, c₀), you are to color the **border** of the connected component containing (r₀, c₀) with a given new color, and return the modified grid. 

A cell is on the border if:
- It is on the edge of the grid, or
- It is adjacent (up/down/left/right) to a cell not in the component (i.e., a different color).

The rest of the component’s non-border cells remain unchanged.

### Examples  

**Example 1:**  
Input: `grid=[[1,1],[1,2]], r0=0, c0=0, color=3`  
Output: `[[3,3],[3,2]]`  
*Explanation: Start at (0,0) with color 1. The connected component is {(0,0),(0,1),(1,0)}. All of these are on the border (touch grid edge or neighbor of a different color), so all are colored with 3. (1,1) is not connected.*

**Example 2:**  
Input: `grid=[[1,2,2],[2,3,2]], r0=0, c0=1, color=3`  
Output: `[[1,3,3],[2,3,3]]`  
*Explanation: Start at (0,1) with color 2. The component is {(0,1),(0,2),(1,2)}. All are border cells and changed to 3.*

**Example 3:**  
Input: `grid=[[1,1,1],[1,1,1],[1,1,1]], r0=1, c0=1, color=2`  
Output: `[[2,2,2],[2,1,2],[2,2,2]]`  
*Explanation: Start at center. The component is the whole grid. All edge cells (border) are changed to 2. Center remains 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Traverse all cells, identify the full connected component starting at (r₀, c₀) via BFS or DFS. For each cell, check if it is a border by testing if it is at the edge or adjacent to a different color.
- **Optimized:** While traversing via DFS/BFS, immediately check “is this a border?” by either:
  - Marking visited cells (e.g., negate or use an auxiliary visited set).
  - After the component is identified, in a second pass, color all marked border cells.
- Use a temporary mark for visited cells to avoid revisiting, but don’t corrupt those yet-to-be-processed.
- DFS is preferred for succinctness.

**Trade-offs:**
- BFS is less likely to cause stack overflow, but DFS is simpler in code here.
- We must not color non-border cells, so border identification during traversal is key.

### Corner cases to consider  
- Component is only one cell (should always be border).
- Component is exactly the grid.
- Color to apply is same as existing color (output mustn’t double-paint).
- Grid has only one row/column.
- Starting cell is already on the border.
- Disconnected regions with same color.

### Solution

```python
def colorBorder(grid, r0, c0, color):
    m, n = len(grid), len(grid[0])
    component_color = grid[r0][c0]
    visited = [[False] * n for _ in range(m)]
    borders = []

    def is_border(r, c):
        # Checks if cell (r, c) is a border cell for the component
        if r == 0 or c == 0 or r == m-1 or c == n-1:
            return True
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < m and 0 <= nc < n:
                if not visited[nr][nc] and grid[nr][nc] != component_color:
                    return True
        return False

    def dfs(r, c):
        visited[r][c] = True
        if is_border(r, c):
            borders.append((r, c))
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] == component_color:
                dfs(nr, nc)

    dfs(r0, c0)

    for r, c in borders:
        grid[r][c] = color
    return grid
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n) in the worst case (if the component is the whole grid). Each cell is visited at most once.
- **Space Complexity:** O(m×n) for `visited` matrix and recursion stack in the worst case (component is the entire grid).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large grids where DFS recursion might blow the stack?  
  *Hint: Can BFS/queue (iterative) traversal be used for safety?*

- Can you handle the problem in-place without extra space for `visited`?  
  *Hint: Use negative or otherwise out-of-band values as marks during traversal, then restore it after.*

- If the input grid is not rectangular (e.g., ragged 2D list), how would you adapt?  
  *Hint: Always check the bounds for each row before accessing columns.*

### Summary
This problem uses the classic **flood fill** and **component border detection** pattern. It’s a common application of DFS/BFS with border identification—a pattern that also appears in image region segmentation, game map traversal, and advanced paint-fill tools. Detecting and processing only border cells is key, differentiating this problem from full-region/coloring variants.


### Flashcard
Use DFS/BFS to find the connected component, marking border cells (adjacent to edge or different color), then color only the border.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Island Perimeter(island-perimeter) (Easy)