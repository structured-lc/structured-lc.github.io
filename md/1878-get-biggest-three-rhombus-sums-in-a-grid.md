### Leetcode 1878 (Medium): Get Biggest Three Rhombus Sums in a Grid [Practice](https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid)

### Description  
Given an m × n integer grid, a **rhombus sum** is the sum of border elements that make up a rhombus shape (like a diamond or rotated square) in the grid. The rhombus is defined by its center and a "size" parameter representing distance from the center to its corners, and its corners must fall within the grid. The smallest rhombus is just a single grid cell. Your task is to find the three largest **distinct** rhombus sums in the grid and return them in descending order. If less than three exist, return all found.

### Examples  

**Example 1:**  
Input: `grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]`  
Output: `[228,216,211]`  
*Explanation:  
The largest three distinct rhombus border sums come from large rhombus shapes with different centers and sizes. The process sums only the border elements for each rhombus shape possible and selects the three highest unique totals.*

**Example 2:**  
Input: `grid = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `[20,9,8]`  
*Explanation:  
- The largest border sum is from a size-1 rhombus at grid[1][1]: sum = (2+4+6+8) = 20.  
- Single cell values act as their own rhombuses: 9 at grid[2][2] and 8 at grid[2][1].*

**Example 3:**  
Input: `grid = [[7,7,7]]`  
Output: ``  
*Explanation: Only single-cell rhombuses are possible, and all values are the same, so only one distinct sum.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each cell, treat it as a potential rhombus center. For every feasible size, walk each border cell (since the rhombus is made of four connected lines), sum their values, and store unique results.
  
- **Optimizing:**  
  Observations:
  - The smallest rhombus is just one cell (area zero).
  - A rhombus of size `sz` centered at (i, j) extends sz cells up/down and 2×sz cells horizontally.
  - To fit, all corners must be inside the grid.
  - For uniqueness and top 3, keep a min-heap/set of sums; prune to 3 as we go.
  - Calculating border sums efficiently: Each border is along a diagonal, so with some cleverness or precomputed diagonals, this can be improved, but a direct O(n³) is acceptable for small grids.

- **Final choice:**  
  Focus on direct simulation: try all centers, for all sizes, gather the border cell totals, use a set to deduplicate, sort and select top 3.

### Corner cases to consider  
- All grid values are the same.
- Only one cell or one row/column in grid.
- Rhombuses touching grid borders.
- Multiple rhombuses yielding the same sum.
- Large grids for time constraints.

### Solution

```python
def getBiggestThree(grid):
    m, n = len(grid), len(grid[0])
    res = set()
    
    for i in range(m):
        for j in range(n):
            # size 0 (just the cell itself)
            res.add(grid[i][j])
            
            # try increasing rhombus size
            sz = 1
            while True:
                # calculate all 4 corners
                top = (i - sz, j)
                left = (i, j - sz)
                right = (i, j + sz)
                bottom = (i + sz, j)
                # Check if all corners are inside
                if not (0 <= top[0] < m and 0 <= left[1] < n and
                        0 <= right[1] < n and 0 <= bottom[0] < m):
                    break
                total = 0
                x, y = i, j
                # Up-right diagonal
                for k in range(1, sz + 1):
                    total += grid[i - k][j + k]
                # Down-right diagonal
                for k in range(1, sz + 1):
                    total += grid[i + k][j + k]
                # Down-left diagonal
                for k in range(1, sz + 1):
                    total += grid[i + k][j - k]
                # Up-left diagonal
                for k in range(1, sz + 1):
                    total += grid[i - k][j - k]
                # subtract 4 corner cells (they were double added)
                total += grid[i - sz][j]     # top
                total += grid[i + sz][j]     # bottom
                total += grid[i][j - sz]     # left
                total += grid[i][j + sz]     # right
                total -= (grid[i - sz][j] + grid[i + sz][j] +
                          grid[i][j - sz] + grid[i][j + sz])
                res.add(total)
                sz += 1
    ans = sorted(res, reverse=True)
    return ans[:3]
```

### Time and Space complexity Analysis  

- **Time Complexity:** For each cell (m\*n), for each possible size (up to min(m, n)), we may walk O(size) steps per side (total sides=4), so O(m × n × min(m, n)) in practice for small grid sizes.
- **Space Complexity:** O(1) for output and temporary storage (since we keep at most all unique sums in a set, at most m \* n distinct values for small grid).

### Potential follow-up questions (as if you’re the interviewer)  

- How can you speed this up for much larger grids?  
  *Hint: Precompute diagonal prefix sums to get border sums in constant time.*

- What if you needed the k biggest unique rhombus sums for some big k?  
  *Hint: Use a min-heap of size k for efficient top-k tracking.*

- Could you solve if rhombus interiors (not just borders) were counted?  
  *Hint: Would need to account for all cells in the full rhombus, which is more complicated but possible with dynamic programming.*

### Summary
This approach leverages **brute-force grid simulation** with a set to deduplicate and manual perimeter tracing, a common grid-traversal pattern. Diagonal sum precomputing is a universal grid trick that optimizes many border-shape problems. Similar simulation and prefix-sum ideas apply to matrix shape queries like largest border/diamond/square/triangle-sum problems.


### Flashcard
Brute-force by treating each cell as a rhombus center. Optimize by observing rhombus properties and grid constraints.

### Tags
Array(#array), Math(#math), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Count Fertile Pyramids in a Land(count-fertile-pyramids-in-a-land) (Hard)