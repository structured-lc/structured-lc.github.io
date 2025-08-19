### Leetcode 3071 (Medium): Minimum Operations to Write the Letter Y on a Grid [Practice](https://leetcode.com/problems/minimum-operations-to-write-the-letter-y-on-a-grid)

### Description  
You are given an *n × n* grid (where *n* is odd) and each cell contains a value 0, 1, or 2. You can change the value of any cell to 0, 1, or 2 in a single operation. You need to transform the grid such that:
- All cells that are part of the letter 'Y' have the same value.
- All other cells have another (different) value.
- The minimum number of operations is required.

The 'Y' is defined as:
- Both diagonals meeting at the center (top-left to center, top-right to center),
- And a vertical line from the center cell straight down to the last row.

### Examples  

**Example 1:**  
Input: `grid = [[0,2,1],[1,2,0],[2,2,2]]`  
Output: `2`  
*Explanation:  
The cells forming the 'Y' are: (0,0),(0,2), (1,1), (2,1).  
You can change grid[2] from 1→2 and grid[1][1] from 2→2 (no-op), the rest are already 2.  
For the rest (non-Y), you pick the next most frequent value (0). Total changes needed = 2.*

**Example 2:**  
Input: `grid = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `4`  
*Explanation:  
You need to assign two distinct values: 3 'Y' arms become one common value, the remaining 4 cells another value. It will take 4 operations to segregate the values.*

**Example 3:**  
Input: `grid = [[0,0,1],[2,1,2],[2,2,2]]`  
Output: `2`  
*Explanation:  
'Y' cells: (0,0), (0,2), (1,1), (2,1). Most frequent in 'Y' is 2 (2 cells already have 2), change (0,2) from 1→2, (1,1) from 1→2. One non-Y cell needs to be changed. Minimal changes: 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  For each possible pair of values (‘Y’ and non-‘Y’) from 0, 1, 2 (the 3 possible values), try all possible assignments:
  - For each possible value for the 'Y' cells,
  - For each possible *different* value for the non-'Y' cells,
  - Count how many operations would be needed to convert the 'Y' cells to the chosen value,
  - Count how many operations are needed to convert the non-'Y' cells to the non-'Y' value,
  - Keep track of the minimum across all combinations.

- **Optimization:**  
  Precompute the list of all 'Y' positions, and all non-Y positions.  
  For each, count frequency of 0, 1, 2 and compute how many changes would be needed for each assignment efficiently.

- **Trade-offs:**  
  Input size is small (n ≤ 49 as per the problem, since n is odd), so the brute-force on three possible value pairs (3×2 = 6 cases) per grid is efficient.
  
  I’d choose this approach as it is clear, easy to debug, and the complexity is low enough for constraints.

### Corner cases to consider  
- n = 1 (the smallest grid, single cell is both 'Y' and the complement)
- All grid cells are already the same value (no changes needed for some assignments)
- All grid cells are different
- Most frequent value in 'Y' is the same as outside (that’s not allowed for final values)
- Check that 'Y' shape is identified correctly for any odd n

### Solution

```python
def minimumOperations(grid):
    n = len(grid)
    from collections import Counter

    # Get the set of coordinates for Y pattern
    y_cells = set()
    mid = n // 2
    for i in range(n):
        # Both diagonals to the center cell
        if i <= mid:
            y_cells.add((i, i))
            y_cells.add((i, n - 1 - i))
        # Vertical arm from center down
        if i >= mid:
            y_cells.add((i, mid))

    non_y_cells = set((i, j) for i in range(n) for j in range(n)) - y_cells

    # Count frequencies for Y and non-Y cells
    y_count = [0, 0, 0]
    non_y_count = [0, 0, 0]
    for i in range(n):
        for j in range(n):
            v = grid[i][j]
            if (i, j) in y_cells:
                y_count[v] += 1
            else:
                non_y_count[v] += 1

    res = float('inf')
    # Try all different pairs for Y value and non-Y value
    for y_val in [0, 1, 2]:
        for non_y_val in [0, 1, 2]:
            if y_val == non_y_val:
                continue
            # Number of Y cells to change: those not already y_val
            # Number of Non-Y cells to change: those not already non_y_val
            ops = (len(y_cells) - y_count[y_val]) + (len(non_y_cells) - non_y_count[non_y_val])
            res = min(res, ops)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  You scan the grid once (O(n²)) to get counts, then try 6 value pairs (O(1)).  
- **Space Complexity:** O(1)  
  Only fixed size counters for value frequency, and set of positions (O(n²) for sets, but can be optimized to O(1) as positions are traversed once).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid allowed more than 3 values?  
  *Hint: Adjust the brute-force search to handle all unique value pairs among the value range.*

- Could you deal with rectangular grids rather than square?  
  *Hint: Define the center and arms accounting for grid size parity and orientation.*

- How would you handle the case where changing a cell's value is not always allowed?  
  *Hint: Add constraints: skip/penalize impossible or costly assignments.*

### Summary
This problem is a classic "pattern transformation with minimum cost" type, frequently applicable in grid coloring, subgrid selection, and template matching problems. The solution uses value counting and brute-forces all possible choices efficiently. Knowing how to cleanly extract a pattern from a matrix and do frequency analysis is broadly useful for image processing, Sudoku- and Minesweeper-style puzzles, and interview challenges involving grids.

### Tags
Array(#array), Hash Table(#hash-table), Matrix(#matrix), Counting(#counting)

### Similar Problems
