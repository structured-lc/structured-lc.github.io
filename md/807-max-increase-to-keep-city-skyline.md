### Leetcode 807 (Medium): Max Increase to Keep City Skyline [Practice](https://leetcode.com/problems/max-increase-to-keep-city-skyline)

### Description  
Given a `n × n` grid, where each cell `grid[r][c]` represents the **height** of a building in a city block, determine the **maximum total sum** by which the heights of buildings can be increased **without altering the city’s skyline** from any direction (top, bottom, left, right).  
The skyline, when viewed from the top or bottom (columns), is defined by the tallest building in that column. When viewed from the left or right (rows), it’s defined by the tallest building in that row.  
Increase each building's height as much as possible **without exceeding either the row or column’s current max height** (so the “outline” of the city remains unchanged).

### Examples  

**Example 1:**  
Input: `grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]`  
Output: `35`  
*Explanation:  
- Row maxes:   [8, 7, 9, 3]  
- Column maxes: [9, 4, 8, 7]  
- For each cell, max possible = min(row max, col max).  
- Total increased sum: 3+3+5+2+5+0+3+4+0+2+3+3+0+1+7+3 = 35*

**Example 2:**  
Input: `grid = [[1,2],[3,4]]`  
Output: `1`  
*Explanation:  
- Row maxes: [2, 4]  
- Col maxes: [3, 4]  
- Only cell (0,0) can be raised from 1 to min(2,3)=2 (+1).*

**Example 3:**  
Input: `grid = [[0,0],[0,0]]`  
Output: `0`  
*Explanation:  
- All heights are already at the maximum possible for the skyline—nothing can increase.*

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For every building, try all possible increases, checking if the skyline is preserved from all four sides. This is inefficient because it repeats work and is not scalable.
- **Optimized approach:**  
  Realize that for any building at (r, c), the *maximum* possible new height is `min(row_max[r], col_max[c])` (so the row and column skyline aren't changed).  
  - Calculate row-wise maxes (`left/right` skyline).
  - Calculate column-wise maxes (`top/bottom` skyline).
  - For each cell, allowed increase = min(row_max, col_max) - current height.
  - Sum up these increases for the total answer.  
  This avoids repeated validation checks and reduces the work from exponential to efficient passes over the data.

This approach directly leverages the skyline preservation property: do not exceed the highest in its row or column, and raise each as much as this allows.

### Corner cases to consider  
- All heights are already the row and column max: no building can increase.
- Grid has only one row or column (single row/column, all cells share the same row/column max).
- Multiple cells with same value within a row or column.
- Zeros or minimum height cells.
- Max increase per cell is zero (already at min(row_max, col_max)).
- Empty grid (though per constraints n ≥ 2).

### Solution

```python
def maxIncreaseKeepingSkyline(grid):
    n = len(grid)
    # Find max in every row (left/right skyline)
    row_max = [max(row) for row in grid]
    # Find max in every column (top/bottom skyline)
    col_max = [max(grid[r][c] for r in range(n)) for c in range(n)]

    total_increase = 0
    for r in range(n):
        for c in range(n):
            # Maximum allowed height at [r][c] is constrained by its row and column
            allowed_height = min(row_max[r], col_max[c])
            increase = allowed_height - grid[r][c]
            total_increase += increase
    return total_increase
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the grid size.  
  Calculation of row and column maxes are O(n²), and the final summing is also O(n²).
- **Space Complexity:** O(n), for row and column max arrays of size n each. Input grid uses O(n²) but is not counted as extra usage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid wasn’t square (n × m), but rectangular?  
  *Hint: Skyline logic stays, just track row_max of length n and col_max of length m.*

- What if you wanted to minimize the amount you decrease (lower) buildings to preserve skyline?  
  *Hint: Could only decrease those above skyline, but in this problem, only increases are allowed.*

- How would you optimize this if n is extremely large?  
  *Hint: Parallelize max calculations, or process rows/columns in chunks.*

### Summary

This approach fits the **matrix row/column property** pattern: preprocess row-wise and column-wise maximum values, use their intersection for each cell to constrain updates. This is common in problems asking for optimization under row/column max/min constraints, such as in certain dynamic programming or greedy grid questions.  
The skyline "unification" step is a classic for spatial constraint problems and applies similarly in graphics, DP, or city planning simulations.


### Flashcard
For each cell, increase its height up to min(max in its row, max in its column) to keep skylines unchanged, then sum all increases.

### Tags
Array(#array), Greedy(#greedy), Matrix(#matrix)

### Similar Problems
