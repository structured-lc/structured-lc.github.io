### Leetcode 695 (Medium): Max Area of Island [Practice](https://leetcode.com/problems/max-area-of-island)

### Description  
Given a 2D binary grid where `1` represents land and `0` represents water, an island is a group of connected `1`s (horizontally or vertically, not diagonally). The goal is to find the size (number of `1`s) of the largest island in the grid. If there is no island, return 0.

### Examples  

**Example 1:**  
Input: `grid = [[0,0,1,0,0],[0,1,1,1,0],[0,0,0,0,0],[1,1,0,0,0]]`  
Output: `5`  
*Explanation: Start from (0,2), traverse all connected land horizontally and vertically. The largest connected group is area 5.*

**Example 2:**  
Input: `grid = [[1,1,0,0],[0,1,0,1],[1,0,0,1]]`  
Output: `3`  
*Explanation: Top left 2×2 block forms an island of area 3.*

**Example 3:**  
Input: `grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0]]`  
Output: `0`  
*Explanation: There is no land; the maximum area is 0.*

### Thought Process (as if you’re the interviewee)  
First, I would scan the entire grid and, whenever I discover unvisited land (`1`), I would trigger a traversal (either DFS or BFS) to compute that island's area. Every visited cell is marked (set to `0` or use a visited set) to avoid revisiting. For each found island, I compare its area to the current maximum. Brute-force would be to try every starting cell and re-explore, but that would result in revisiting the same cells; thus, I optimize by marking visited cells.

Depth-First Search is a natural fit, since I can recurse in all four directions for each land cell until I reach water or out-of-bounds. The traversal will have to update a global maximum area.

### Corner cases to consider  
- Entire grid is water (`0`)
- All cells are land (`1`)
- Multiple small islands vs. one big island
- Non-rectangular islands
- Grid of size 1×1
- Land cells that only touch diagonally (should not be considered the same island)

### Solution

```python
def maxAreaOfIsland(grid):
    rows = len(grid)
    cols = len(grid[0]) if grid else 0
    
    def dfs(r, c):
        # If out of bounds or water, return 0
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
            return 0
        # Mark visited
        grid[r][c] = 0
        area = 1
        # Explore all four directions
        area += dfs(r+1, c)
        area += dfs(r-1, c)
        area += dfs(r, c+1)
        area += dfs(r, c-1)
        return area

    max_area = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                # Start DFS from this cell, update max_area
                max_area = max(max_area, dfs(r, c))
    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) — Every cell is visited at most once during DFS.
- **Space Complexity:** O(m × n) in the worst-case for recursion stack (all land), or O(1) if the grid is all water.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count the total number of islands, in addition to finding the largest?
  *Hint: Maintain a count variable, increment for each DFS/BFS that finds new land.*

- Can you use an iterative approach instead of recursion to avoid stack overflow on large grids?
  *Hint: Implement DFS using a stack or use BFS with a queue.*

- How would you find the perimeter of the largest island?
  *Hint: While visiting each land cell, count edges touching water or grid edge.*

### Summary
This is a classic graph traversal problem, applying DFS/BFS to connected components in grids. The approach also works for questions that require marking/visiting islands, counting island perimeters, or similar "flood fill" operations—key topics in grid and matrix interview questions.


### Flashcard
For each unvisited land cell, use DFS/BFS to compute area, mark visited cells, and track the maximum area found.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Battleships in a Board(battleships-in-a-board) (Medium)
- Island Perimeter(island-perimeter) (Easy)
- Largest Submatrix With Rearrangements(largest-submatrix-with-rearrangements) (Medium)
- Detonate the Maximum Bombs(detonate-the-maximum-bombs) (Medium)
- Maximum Number of Fish in a Grid(maximum-number-of-fish-in-a-grid) (Medium)