### Leetcode 892 (Easy): Surface Area of 3D Shapes [Practice](https://leetcode.com/problems/surface-area-of-3d-shapes)

### Description  
You are given an n × n grid where each cell, grid[i][j], represents a pile of stacked 1×1×1 cubes sitting on that cell. Each value grid[i][j] is the height of the pile (number of cubes) at that position.  
Your task: Find the total surface area of the entire 3D shape formed by these stacks.  
- Each cube has 6 faces.  
- When two cubes are adjacent (whether stacked vertically or in neighboring cells), some faces aren’t visible (they’re hidden/covered).
- The surface area is the total number of visible faces: sides, tops, and bottoms, after accounting for faces covered by adjacent cubes.

### Examples  

**Example 1:**  
Input: `[[2]]`  
Output: `10`  
*Explanation: There are two cubes stacked; visible faces: 2 (top/bottom) + 4×2 (sides) = 10.*

**Example 2:**  
Input: `[[1,2],[3,4]]`  
Output: `34`  
*Explanation:  
- Top/bottom faces: 2 × 4 cells = 8  
- Each cell: add 4 × height for side faces  
- Subtract hidden faces where cubes touch (between adjacent cells, min(height₁, height₂) per touching side)*

**Example 3:**  
Input: `[[1,0],[0,2]]`  
Output: `16`  
*Explanation:  
- No hidden faces between non-adjacent cubes.  
- Surface area is the sum over all visible sides, tops, and bottoms.*

### Thought Process (as if you’re the interviewee)  
First, I’d start by calculating every cube’s contribution as if all faces were visible:  
- Each stack contributes 4 × h (sides) + 2 (top + bottom).  

But adjacent cubes touch, which hides faces between them.  
- For every pair of adjacent cells (right/bottom neighbors), the touching sides don’t count as visible; only the outer faces are visible for that face.  
- For every pair of neighbors, deduct 2 × min(h₁, h₂) from the total area: one for each hidden face between the two stacks.

Algorithm overview:
- For every cell in the grid:
  - If it’s nonzero (has cubes), add 2 (top and bottom) and 4 × h (sides).
  - For each adjacent cell to the right and bottom, subtract 2 × min(h, hₙ) (since both side faces are hidden if present).

This is efficient because each pair is only visited once and it avoids double-counting hidden faces.

### Corner cases to consider  
- Empty grid (though constraints guarantee at least one cell).
- All grid values are zero (should return 0).
- Very tall stacks: large numbers to check integer arithmetic.
- Non-rectangular stacks (some cells 0, some >0), ensuring no out-of-bounds for neighbors.

### Solution

```python
def surfaceArea(grid):
    n = len(grid)
    area = 0

    for i in range(n):
        for j in range(n):
            h = grid[i][j]
            if h > 0:
                # Add all sides and top/bottom by default
                area += 2 + 4 * h

                # Subtract faces hidden by cell below (i+1, j)
                if i + 1 < n:
                    area -= 2 * min(h, grid[i + 1][j])

                # Subtract faces hidden by cell to right (i, j+1)
                if j + 1 < n:
                    area -= 2 * min(h, grid[i][j + 1])
    return area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - We visit each cell once and for each, check two neighbors (right, down).  
- **Space Complexity:** O(1)  
  - Only uses a constant number of variables for counters; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid was m × n, not guaranteed to be square?  
  *Hint: Would your neighbor checks need to change indexing?*

- What if the cubes were not stacked directly upwards, but the input gave x, y, z positions?  
  *Hint: How would you handle arbitrary placements and check for shared faces?*

- How would you generalize the solution to handle negative values (e.g., holes or trenches)?  
  *Hint: What business rules might be needed for negative heights?*

### Summary  
The solution uses a **grid traversal pattern** with immediate-neighbor subtraction to count visible faces efficiently. The key idea is to add the total possible surface, then subtract the hidden faces between adjacent stacks by scanning only rightward and downward neighbors for each cell.  
This approach is typical of grid and geometry problems, where local interactions (adjacency) need to be accounted for efficiently.  
This pattern occurs in problems like "Island Perimeter" and can be useful wherever you need to compute shared boundaries in grids.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Matrix(#matrix)

### Similar Problems
