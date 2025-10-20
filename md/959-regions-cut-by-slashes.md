### Leetcode 959 (Medium): Regions Cut By Slashes [Practice](https://leetcode.com/problems/regions-cut-by-slashes)

### Description  
You're given an n × n grid, where each 1 × 1 square contains either `'/'`, `'\'`, or a blank space `' '`. Each character divides the square into contiguous regions. You need to count the total number of separate regions formed when all the slashes partition the grid.  
- A `'/'` divides the square from top-right to bottom-left.
- A `'\'` divides the square from top-left to bottom-right.
- A space `' '` leaves the cell whole.

The challenge is to correctly count all separate regions, even when regions are split inside and/or across the cells.  

### Examples  

**Example 1:**  
Input: `[" /","/ "]`  
Output: `2`  
*Explanation: The grid looks like:*  
```
  / 
 /  
```  
There are two distinct regions created by the slashes.

**Example 2:**  
Input: `[" /","  "]`  
Output: `1`  
*Explanation: Only one region exists, as there's a single slash at the top left.*

**Example 3:**  
Input: `["/\\","\\/"]`  
Output: `5`  
*Explanation:  
First row: '/\'  
Second row: '\/'  
This intricate arrangement forms 5 distinct regions as the slashes intersect in complicated ways.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force/Naive:**  
  One idea is to expand each 1×1 cell into smaller cells (like a 3×3 grid for every original cell), draw slashes accordingly, and do a flood fill (DFS/BFS) for each region.  
  But this is space and time inefficient, especially as n increases.

- **Optimized Approach:**  
  Instead, notice that each 1×1 cell can be split into **four triangles** (think: NE, NW, SW, SE corners).  
  - Number all triangles uniquely by flattening the 2D grid with 4 triangles per cell.
  - Use Union-Find (Disjoint Set Union, DSU) to merge connected triangles.
    - Within a cell:
      - `'/'`: union top and left, bottom and right triangles.
      - `'\'`: union top and right, bottom and left triangles.
      - `' '`: union all 4 triangles together (cell is undivided).
    - Across adjacent cells:
      - Merge right triangle of (i,j) with left triangle of (i, j+1).
      - Merge bottom triangle of (i,j) with top triangle of (i+1, j).
  - Finally, count unique regions by the number of DSU sets.

  This approach is space-efficient, accurate, and leverages proven connectivity logic.

### Corner cases to consider  
- All `n × n` spaces are `' '`: one big region  
- All `n × n` filled with only `'/'` or only `'\'`: check for correct region-counting
- Minimum grid size: n = 1  
- Complex overlaps: Adjacent cells with mixing slashes
- Grids with no divisions at all (region count is 1)

### Solution

```python
def regionsBySlashes(grid):
    n = len(grid)
    # Each cell is split into 4 triangles: 0=top, 1=right, 2=bottom, 3=left
    parent = [i for i in range(4 * n * n)]
    
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    
    def union(x, y):
        px, py = find(x), find(y)
        if px != py:
            parent[py] = px
            
    for r in range(n):
        for c in range(n):
            idx = 4 * (r * n + c)
            char = grid[r][c]
            # Connect triangles within the cell
            if char == '/':
                # connect top-left, bottom-right (0-3, 1-2)
                union(idx + 0, idx + 3)
                union(idx + 1, idx + 2)
            elif char == '\\':
                # connect top-right, bottom-left (0-1, 2-3)
                union(idx + 0, idx + 1)
                union(idx + 2, idx + 3)
            else: # ' '
                # connect all 4 triangles
                union(idx + 0, idx + 1)
                union(idx + 1, idx + 2)
                union(idx + 2, idx + 3)
            # Connect triangles between adjacent cells
            # Connect bottom of current cell to top of cell below
            if r + 1 < n:
                union(idx + 2, (idx + 4 * n) + 0)
            # Connect right of current cell to left of cell to the right
            if c + 1 < n:
                union(idx + 1, (idx + 4) + 3)
    
    # The number of unique parents is the number of regions
    regions = sum(parent[i] == i for i in range(4 * n * n))
    return regions
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) — Each cell is processed in constant time, and union/find operations are *practically* constant with path compression.
- **Space Complexity:** O(n²) — DSU array holds 4×n² elements; no extra space proportional to anything larger than the grid.

### Potential follow-up questions (as if you’re the interviewer)  

- If the input grid were very large, could we optimize memory further?  
  *Hint: Could you compress regions or skip blank cells?*

- Can you return the actual shape/coordinates of each region?  
  *Hint: You'd need to track cell connections and shape info in DSU or via BFS.*

- Can this be solved without Union-Find?  
  *Hint: It's possible using grid expansion (flood fill), but less efficient for space.*

### Summary
This problem is an excellent example of the **Union-Find (Disjoint Set Union)** pattern used to count *connected components* in non-trivial, partitioned domains. The clever part is mapping each grid cell to multiple logical regions (triangles), then performing merges according to both within-cell and between-cell logic.  
This modeling can be applied to other problems involving arbitrary regions and graph connectivity — for example, counting *islands* in matrices, or analyzing regions in *puzzle* grids.


### Flashcard
Split each cell into 4 triangles, use Union-Find to merge connected triangles within and between cells, and count the number of connected components for the regions.

### Tags
Array(#array), Hash Table(#hash-table), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
