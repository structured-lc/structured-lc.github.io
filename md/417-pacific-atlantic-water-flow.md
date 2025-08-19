### Leetcode 417 (Medium): Pacific Atlantic Water Flow [Practice](https://leetcode.com/problems/pacific-atlantic-water-flow)

### Description  
Given a matrix of m × n integers representing land heights, find all coordinates where water can flow to both the Pacific and Atlantic Oceans.  
- The **Pacific Ocean** touches the left and top edges of the matrix.
- The **Atlantic Ocean** touches the right and bottom edges.
Water can only flow from cell (i, j) to its neighbor (i', j') if height[i'][j'] ≤ height[i][j] (water can flow from higher or equal to lower/equal height, moving in 4 directions).  
Return a list of grid coordinates [i, j] from which water can flow to **both** oceans.

### Examples  

**Example 1:**  
Input:  
`heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]`  
Output:  
`[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]`  
*Explanation: Water at [2,2] (with height 5) can flow to both oceans by moving towards the edges downhill or on flat land.*

**Example 2:**  
Input:  
`heights = [[2,1],[1,2]]`  
Output:  
`[[0,0],[0,1],[1,0],[1,1]]`  
*Explanation: Every cell is either on the edge or connects to both sides via a neighbor cell of equal or lower height.*

**Example 3:**  
Input:  
`heights = [[3]]`  
Output:  
`[[0,0]]`  
*Explanation: The only cell touches both oceans, so it's included.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each cell, run DFS/BFS to check if water can reach both oceans. This is slow—O(m²n²) time—since we'd explore the grid for every cell.
- Optimization: Reverse the perspective. Instead of checking from each cell outward, start from the Pacific and Atlantic edges and perform BFS/DFS **inwards**.
  - For the Pacific, start DFS/BFS at every cell on the top and left edges.
  - For the Atlantic, start at the bottom and right edges.
  - For both, only traverse from a cell to a neighbor *if the neighbor's height is ≥ current cell*.
  - Mark all cells reachable for each ocean in two separate sets/visited matrices.
  - Find the intersection: cells marked as reachable from both oceans are the solution.
- Why: This lets us cover all cells for each ocean in O(mn) time and is extremely efficient for matrix traversal, avoiding repeated visits.

### Corner cases to consider  
- Empty matrix input (0×0 grid)
- Single row or single column
- All heights equal (every cell should be included)
- Matrix with only one cell
- High plateau surrounded by lower borders
- Cells at the border (should always be included)

### Solution

```python
def pacificAtlantic(heights):
    # Directions: up, down, left, right
    directions = [(-1,0), (1,0), (0,-1), (0,1)]
    if not heights or not heights[0]:
        return []

    m, n = len(heights), len(heights[0])
    pacific = set()
    atlantic = set()

    def dfs(row, col, visited, prevHeight):
        # Stop traversal if out of bounds, or lower height, or already visited
        if (
            row < 0 or row >= m or
            col < 0 or col >= n or
            (row, col) in visited or
            heights[row][col] < prevHeight
        ):
            return
        visited.add((row, col))
        for dr, dc in directions:
            newRow, newCol = row + dr, col + dc
            dfs(newRow, newCol, visited, heights[row][col])

    # Pacific: Top and left edges
    for i in range(m):
        dfs(i, 0, pacific, heights[i][0])
        dfs(i, n-1, atlantic, heights[i][n-1])
    for j in range(n):
        dfs(0, j, pacific, heights[0][j])
        dfs(m-1, j, atlantic, heights[m-1][j])

    # Intersection: cells reachable from both oceans
    return list(pacific & atlantic)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  - Each cell is visited at most twice (once for Pacific, once for Atlantic).
- **Space Complexity:** O(m × n)  
  - For the visited sets for each ocean and recursion stack depth.

### Potential follow-up questions (as if you’re the interviewer)  

- If input grid is very large, how would you do this without recursion?
  *Hint: Consider iterative BFS with a queue instead of recursion to avoid deep recursion stack.*

- How would you change the approach if diagonal flows were allowed?
  *Hint: Add diagonal directions in your neighbor traversal list.*

- Can you do this efficiently for streaming height updates (matrix updated repeatedly)?
  *Hint: Consider caching and only recomputing affected regions, possibly with memoization.*

### Summary
We use a dual DFS/BFS from both oceans' edges (graph multi-source traversal) to efficiently mark reachability, then combine results using set intersection. This *reverse flood* or *graph coloring from edge* approach is often used for multi-source reachability on grids, and shows up in problems involving propagation, influence, and region-filling (also known as multi-source BFS/DFS in grids).

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
