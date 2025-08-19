### Leetcode 883 (Easy): Projection Area of 3D Shapes [Practice](https://leetcode.com/problems/projection-area-of-3d-shapes)

### Description  
You are given an n×n grid where each cell `grid[i][j]` represents the height of a stack of 1×1×1 cubes placed on the cell at position (i, j). The problem asks for the sum of the areas of the projections of this 3D shape onto the xy-plane (top view), yz-plane (side view), and zx-plane (front view). In other words, if you look from above, from the front (along the x-axis), and from the side (along the y-axis), imagine the "shadow" the towers make on each corresponding 2D plane—find the total area of all three shadows combined.

### Examples  

**Example 1:**  
Input: `grid = [[1,2],[3,4]]`  
Output: `17`  
*Explanation:*
- **Top (xy-plane)**: every cell with at least one cube contributes 1, so all four cells are counted ⇒ 4.
- **Front (zx-plane)**: for each column, take the tallest stack: max(1,3)=3, max(2,4)=4 ⇒ 3+4=7.
- **Side (yz-plane)**: for each row, take the tallest stack: max(1,2)=2, max(3,4)=4 ⇒ 2+4=6.
- **Total = 4 + 7 + 6 = 17**.

**Example 2:**  
Input: `grid = [[2]]`  
Output: `5`  
*Explanation:*
- **Top (xy-plane)**: 1 (since this cell > 0).
- **Front (zx-plane)**: max(2)=2.
- **Side (yz-plane)**: max(2)=2.
- **Total = 1 + 2 + 2 = 5**.

**Example 3:**  
Input: `grid = [[1,0],[0,2]]`  
Output: `8`  
*Explanation:*
- **Top (xy-plane)**: 2 (cells  and [1][1]).
- **Front (zx-plane)**: max(1,0)=1, max(0,2)=2 ⇒ 1+2=3.
- **Side (yz-plane)**: max(1,0)=1, max(0,2)=2 ⇒ 1+2=3.
- **Total = 2 + 3 + 3 = 8**.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each projection, we can directly compute their area using simple iteration:
  - **Top view (xy-plane)**: Count cells where grid[i][j] > 0.
  - **Front view (zx-plane)**: For each column, take the maximum value.
  - **Side view (yz-plane)**: For each row, take the maximum value.
- **Optimization:** Since we need both max per row and per column, and we know the grid is square (n × n), we can compute all three projections in a single loop by tracking max per row and max per column for each iteration.
- **Why this approach?** It’s concise, easily readable, and does not require any extra data structures besides a few variables to store intermediate max values. The time complexity is O(n²) and that is optimal, as we must examine every cell.

### Corner cases to consider  
- grid has only one cell (`[]` or `[[n]]`)
- grid contains only zeros (all towers missing)
- towers of varying heights, including maximum allowed heights
- grid is as small as possible (n=1) or as large as allowed (n=50)
- all towers are the same height

### Solution

```python
def projectionArea(grid):
    n = len(grid)
    area_xy = 0  # Top view (xy plane): count of nonzero cells
    area_yz = 0  # Side view (yz plane): sum of max in each row
    area_zx = 0  # Front view (zx plane): sum of max in each column

    for i in range(n):
        max_row = 0
        max_col = 0
        for j in range(n):
            # Top view: count cell if there's any cube
            if grid[i][j] > 0:
                area_xy += 1
            # Track tallest in this row (for yz)
            if grid[i][j] > max_row:
                max_row = grid[i][j]
            # Track tallest in this column (for zx)
            if grid[j][i] > max_col:
                max_col = grid[j][i]
        area_yz += max_row
        area_zx += max_col

    return area_xy + area_yz + area_zx
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), as we iterate over every cell of the n×n grid to compute projections.
- **Space Complexity:** O(1) extra space – only a fixed number of integer variables are used. The input grid is not modified.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is not always square (rectangular)?
  *Hint: How would you generalize column/row iteration for non-square grids?*

- How would you visualize projections for arbitrary shapes, not just cubes?
  *Hint: Think about defining faces of non-cube shapes and how projection area changes.*

- Can you optimize if a large number of cells are zero (sparse grid)?
  *Hint: Consider processing only nonzero cells, or using compressed representations for sparsity.*

### Summary
We use a simple geometry/counting pattern: count visible areas when projecting a set of cubes onto the xy, yz, and zx planes. For each projection, we scan either rows or columns for the tallest cube or count nonzero cells. This is a direct application of 2D traversal and maximum finding—a frequent pattern in "matrix projections" and "2D grid shadows." This pattern also applies to other problems such as skyline silhouette, shadow casting, and 2D compression of 3D shapes.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Matrix(#matrix)

### Similar Problems
