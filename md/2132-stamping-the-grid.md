### Leetcode 2132 (Hard): Stamping the Grid [Practice](https://leetcode.com/problems/stamping-the-grid)

### Description  
Given an m × n binary matrix grid, where grid[i][j] is 0 (empty) or 1 (occupied), and given stampHeight and stampWidth:

- Cover all empty (0) cells using any number of stamps (each of size stampHeight × stampWidth).
- A stamp **must not cover** any cell with a 1 (occupied).
- Stamps **may overlap** each other.
- No stamp can go out of the grid boundaries, and you cannot rotate a stamp.

Return **True** if you can cover all empty cells, otherwise False.

### Examples  

**Example 1:**  
Input: `grid = [[0,0,0],[0,0,0],[0,0,0]], stampHeight = 2, stampWidth = 2`  
Output: `True`  
*Explanation: All 0s can be covered using four 2×2 stamps (with overlaps allowed).*

**Example 2:**  
Input: `grid = [[0,0,1],[0,0,0],[0,0,0]], stampHeight = 2, stampWidth = 2`  
Output: `True`  
*Explanation: The cell at (0,2) is blocked. The other 0s are covered with three 2×2 stamps (e.g., placed covering subareas below and to the left of the 1).*

**Example 3:**  
Input: `grid = [[0,0,1],[0,1,0],[1,0,0]], stampHeight = 2, stampWidth = 2`  
Output: `False`  
*Explanation: The cell at (0,0) cannot be covered by any legal 2×2 stamp, since any stamp including it must cover a 1 cell as well.*

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For every empty cell, try all possible positions of the stamp and see if it can be covered *somehow* without covering any occupied cells. However, this is too slow for large grids, as there are O(mn) positions and checking each covers many cells.

- **Optimization using prefix sums:**  
  Instead of checking each stamp's region separately, precompute prefix sums for:
  1. The occupied cells (to check if a rectangle is valid for stamp placement in O(1) time).
  2. Which cells are covered by at least one stamp (using difference arrays).
  
  The core idea:
  - For each possible stamp **placement** (i,j) that lies *entirely inside the grid*, check in O(1) if the whole stamp rectangle has only 0s.
  - Mark, via a difference array, which cells this stamp covers.
  - After all possible stamp placements, compute (via prefix sum of the diff matrix) which cells are *covered by at least one stamp*.
  - If any 0-cell is not covered, return False; else, True.

- **Trade-offs:**  
  This approach makes use of 2D prefix sums and difference arrays to both *check* and *apply* multiple overlapping intervals in O(1) time per operation.

### Corner cases to consider  
- All zeros: Should return True.
- All ones: Should return True (no coverage needed).
- Empty grid (0×0): Should trivially return True.
- Stamp is larger than grid: Should return True if no 0s, else False.
- Zeros surrounded by 1s such that no stamp covers that cell: Should return False.
- Smallest possible grid or stamp (1×1).

### Solution

```python
def possibleToStamp(grid, stampHeight, stampWidth):
    m, n = len(grid), len(grid[0])

    # Compute prefix sum of grid to quickly check if a region is only 0's
    psum = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m):
        for j in range(n):
            psum[i+1][j+1] = (grid[i][j]
                              + psum[i][j+1]
                              + psum[i+1][j]
                              - psum[i][j])

    # Helper to get the sum of a submatrix (top,left) to (bottom,right), inclusive
    def region_sum(x1, y1, x2, y2):
        return (psum[x2+1][y2+1] - psum[x1][y2+1] - psum[x2+1][y1] + psum[x1][y1])

    # Place stamps where possible, mark using difference array
    diff = [[0]*(n+2) for _ in range(m+2)] # pad to avoid index error on borders
    for i in range(m - stampHeight + 1):
        for j in range(n - stampWidth + 1):
            # Check if this region is all zeros
            if region_sum(i, j, i + stampHeight - 1, j + stampWidth - 1) == 0:
                # Mark coverage: (i,j) => (i+stampHeight-1, j+stampWidth-1)
                diff[i][j] += 1
                diff[i+stampHeight][j] -= 1
                diff[i][j+stampWidth] -= 1
                diff[i+stampHeight][j+stampWidth] += 1

    # Compute which cells are covered by at least one stamp (using prefix sum of diff)
    coverage = [[0]*n for _ in range(m)]
    for i in range(m):
        run = [0]*(n+2)
        for j in range(n):
            if i > 0:
                diff[i][j] += diff[i-1][j]
            run[j] = diff[i][j] if j == 0 else run[j-1] + diff[i][j]
            coverage[i][j] = run[j]

    # For every empty cell, check if it's covered
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 0 and coverage[i][j] == 0:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(mn), where m × n is the size of the grid. Each operation—building prefix sums, traversing stamp placements, and checking grid—takes linear time.

- **Space Complexity:**  
  O(mn) for the prefix sum, diff, and coverage grids—proportional to the grid size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if stamps can be rotated?
  *Hint: Consider all rotations/variants when checking placement feasibility.*

- What if you must use the **minimal** possible number of stamps?
  *Hint: Now it’s an NP-hard coverage problem (like set cover).*

- Could you output the positions of all used stamps?
  *Hint: Store placement positions during marking phase, then print them after.*

### Summary
This is a classic 2D range query and interval update task, solved via 2D prefix sums (for O(1) rectangular "zero check") and 2D difference matrices (for quick marking of covered regions). The coding pattern is widely useful in range update/counting, with applications in image processing, dynamic programming, and grid-rectangle problems.

### Tags
Array(#array), Greedy(#greedy), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximal Square(maximal-square) (Medium)
- Bomb Enemy(bomb-enemy) (Medium)
- Matrix Block Sum(matrix-block-sum) (Medium)