### Leetcode 3195 (Medium): Find the Minimum Area to Cover All Ones I [Practice](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i)

### Description  
Given a **2D binary array** grid, find a rectangle with horizontal and vertical sides of the **smallest possible area** such that **all the 1's in the grid lie inside** this rectangle.  
Return the minimum area of such a rectangle.  
The rectangle can be anywhere within the grid, but must cover all the 1's. The input is guaranteed to have at least one 1.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,0],[1,0,1]]`  
Output: `6`  
*Explanation: The 1's are at positions (0,1), (1,0), and (1,2). The top-left of the rectangle is (0,0), bottom-right is (1,2). The minimum rectangle covers 2 rows × 3 columns = 6 cells.*

**Example 2:**  
Input: `grid = [[1,0],[0,0]]`  
Output: `1`  
*Explanation: There is just one 1 at (0,0). The rectangle is 1 row × 1 column = 1 cell.*

**Example 3:**  
Input: `grid = [[0,0,0],[0,1,0],[0,0,0]]`  
Output: `1`  
*Explanation: The only 1 is at (1,1). Minimal rectangle is the cell itself, area = 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Check every possible rectangle and test if it covers all the 1’s. But for a grid up to 1000 × 1000, this is not feasible.

- **Observations:**  
  The minimum rectangle must be aligned to the furthest 1’s:  
  - The topmost row (minimum row index with a 1) — call it `min_row`
  - The bottommost row (maximum row index with a 1) — `max_row`
  - The leftmost column (minimum column index with a 1) — `min_col`
  - The rightmost column (maximum column index with a 1) — `max_col`

- **Algorithm:**  
  Scan the grid once:
  - For every cell with a 1, update the min and max for row and column.
  - Compute area = (max_row - min_row + 1) × (max_col - min_col + 1)

- **Trade-offs:**  
  - Time efficiency: O(m × n), optimal for this problem.
  - Space efficiency: O(1) additional space, since we only need the min/max indices.

### Corner cases to consider  
- Single 1 (rectangle should be size 1).
- All 1’s (rectangle is the whole grid).
- 1’s in a line (vertical or horizontal).
- 1’s at edges/corners.
- Grid dimension is 1 in at least one direction (rows or columns).

### Solution

```python
def min_area_cover_all_ones(grid):
    # Find the min and max rows and columns where 1 appears
    min_row = len(grid)
    max_row = -1
    min_col = len(grid[0])
    max_col = -1

    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == 1:
                # Update min/max row and col
                min_row = min(min_row, r)
                max_row = max(max_row, r)
                min_col = min(min_col, c)
                max_col = max(max_col, c)

    # Compute area: (row_span) × (col_span)
    height = max_row - min_row + 1
    width = max_col - min_col + 1
    return height * width
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of rows and n is the number of columns. Every cell is checked once.
- **Space Complexity:** O(1), only a few integer variables are used beyond the input grid.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also want to return the rectangle's coordinates?  
  *Hint: Store min/max row and column, then return [(min_row, min_col), (max_row, max_col)].*

- How would you handle if you can rotate the rectangle (not just axis-aligned)?  
  *Hint: You’d need the minimum bounding box of points, potentially using computational geometry algorithms.*

- What if the rectangle should be as small as possible but is allowed to exclude some 1's as long as at least k are covered?  
  *Hint: Consider sliding window or dynamic programming, as the greedy method won’t always work.*

### Summary
This problem uses the classic **minimum bounding rectangle** pattern for a set of points in a grid. The solution is a single linear scan tracking the furthest top, bottom, left, and right 1’s to define the rectangle. This pattern is common whenever you need to enclose or process a group of related coordinates, such as image processing, map bounding boxes, or clustering problems.