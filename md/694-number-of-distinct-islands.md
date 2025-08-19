### Leetcode 694 (Medium): Number of Distinct Islands [Practice](https://leetcode.com/problems/number-of-distinct-islands)

### Description  
You are given a 2D grid of 0s and 1s, where **1** represents land and **0** represents water. An **island** is a group of land cells connected **horizontally or vertically** (not diagonally). Two islands are considered the **same** if one can be translated (shifted in any direction, but not rotated or reflected) to exactly match the other’s shape and size. Your task is to return the **number of distinct island shapes** in the grid.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,0,0,0],[1,0,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]`  
Output: `1`  
*Explanation: There are two islands (top-left and bottom-right), both shaped the same as an “L”. Only one distinct shape exists.*

**Example 2:**  
Input: `grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]`  
Output: `3`  
*Explanation: There are several islands, each forming distinct shapes. After translating to canonical positions, we observe three unique island forms.*

**Example 3:**  
Input: `grid = [[1,0,1],[0,0,0],[1,0,1]]`  
Output: `4`  
*Explanation: Every land cell is isolated and forms a 1×1 island. All are distinct single-cell islands, so the output is 4.*

### Thought Process (as if you’re the interviewee)  
Start by considering how to identify islands in a grid. The standard approaches use either DFS or BFS to traverse and mark land cells. The challenge here is to detect and compare island **shapes** regardless of their grid position.

**Brute force idea:**  
- For each island, collect all its land cells.
- Normalize each island's shape by shifting to an origin (relative coordinates).
- Add each shape (as a tuple of coordinates) to a set to count unique shapes.

**Optimized idea:**  
- To avoid the complexity of sorting or relative coordinates, encode the traversal path (as a string) during DFS (e.g., by noting moves "up", "down", "left", "right" and explicitly marking "back" when retreating).
- This path uniquely encodes the shape of the island — two islands with the same traversal path (from their own origins) must have the same shape.
- Use a set to store unique traversal paths.

**Why use DFS path encoding?**  
- It’s simple to implement and avoids issues with positions.
- No need for expensive coordinate transformations or sorting.

**Trade-offs:**  
- If islands are very large and complex, path strings could be lengthy, but overall this method is fast and memory efficient for moderate grid sizes.

### Corner cases to consider  
- Empty grid (`[]`)
- Grid with all water (`[[0,0],[0,0]]`)
- Grid with all land (single giant island)
- Disconnected single-land-cell islands
- Multiple identical shaped islands in different positions
- Islands touching the grid edge

### Solution

```python
def numDistinctIslands(grid):
    # Dimensions of the grid
    m, n = len(grid), len(grid[0]) if grid else 0
    visited = set()
    unique_shapes = set()

    # Directions: Down, Up, Right, Left (with consistent coding for each move)
    directions = [ (1,0,'D'), (-1,0,'U'), (0,1,'R'), (0,-1,'L') ]

    def dfs(x, y, path, origin_x, origin_y):
        # Mark visited
        visited.add((x, y))
        for dx, dy, move in directions:
            nx, ny = x + dx, y + dy
            if (0 <= nx < m and 0 <= ny < n and
                grid[nx][ny] == 1 and (nx, ny) not in visited):
                # Record move relative to starting point
                path.append(move)
                dfs(nx, ny, path, origin_x, origin_y)
                path.append('B')  # Mark backtracking to ensure uniqueness

    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1 and (i, j) not in visited:
                path = []
                dfs(i, j, path, i, j)
                # Each path describes an island shape fully
                shape = ''.join(path)
                unique_shapes.add(shape)
    return len(unique_shapes)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited once; DFS for each land cell, and string operations are proportional to the total number of land cells.

- **Space Complexity:** O(m × n)  
  Storing the visited set and up to O(m×n) path strings for unique islands (in the worst case where every land cell is a separate island).

### Potential follow-up questions (as if you’re the interviewer)  

- What if islands that are **rotations** or **reflections** of each other should count as identical?  
  *Hint: How could you canonicalize or normalize island shapes to compare them up to rotation/reflection?*

- How would your approach change if the input grid was very **large** (e.g., 10000 × 10000)?  
  *Hint: Memory optimization, iterative DFS/BFS, streaming shapes instead of full storage.*

- How would you find and return the **largest** island instead of counting distinct ones?  
  *Hint: Track island size during traversal and store only the maximum.*

### Summary
This problem uses a **DFS traversal** and path encoding pattern to uniquely describe and distinguish each island shape in the grid. The key pattern is the use of traversal “signatures” (movement patterns during DFS) to detect sameness. This approach and encoding trick is broadly useful in grid-based **flood-fill** or pattern matching problems, and can generalize to similar “distinct shape” or “distinct area” detection tasks.

### Tags
Hash Table(#hash-table), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Hash Function(#hash-function)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Number of Distinct Islands II(number-of-distinct-islands-ii) (Hard)
- Count Sub Islands(count-sub-islands) (Medium)