### Leetcode 840 (Medium): Magic Squares In Grid [Practice](https://leetcode.com/problems/magic-squares-in-grid)

### Description  
Given a grid of integers, find out how many 3×3 contiguous subgrids are *magic squares*.  
A 3×3 magic square is:
- A 3×3 grid filled with distinct numbers **from 1 to 9** (inclusive)
- Each row, each column, and both diagonals have the **same sum** (which is always 15 for 1–9)  
We need to count such 3×3 subgrids in the input grid.

### Examples  

**Example 1:**  
Input: `grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]`  
Output: `1`  
*Explanation:  
There's only one magic square:  
```
4 3 8
9 5 1
2 7 6
```
All numbers 1–9 are present, distinct, and each row/col/diagonal sum is 15.*

**Example 2:**  
Input: `grid = []`  
Output: `0`  
*Explanation:  
The grid is too small to have a 3×3 subgrid, so output is 0.*

**Example 3:**  
Input: `grid = [[5,5,5],[5,5,5],[5,5,5]]`  
Output: `0`  
*Explanation:  
Even though the sums are all the same (15), the numbers aren't all unique from 1–9—so it's not a magic square.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible 3×3 subgrid in the larger grid. For each, check if it's a magic square by:
    - Collecting all 9 numbers, checking if all are distinct and 1–9
    - Checking every row, column, and diagonal sum (they must all be 15)
- **Optimization:** Since there are at most (rows-2)×(cols-2) subgrids, and checking one subgrid is constant work, this approach is fast enough (since grid size ≤ 10)
- **Final approach:** Brute-force is acceptable. To save time, we can check first if the center of the subgrid is 5 (the center of any 3×3 magic square with 1–9 must be 5), then check distinctness/range/sums

### Corner cases to consider  
- Grid smaller than 3×3 (no possible magic subgrids)
- Subgrids missing numbers (not all 1–9)
- Subgrids with repeated numbers
- Sums are correct but numbers aren't 1–9
- Process all possible locations, even edges/corners

### Solution

```python
def numMagicSquaresInside(grid):
    # Dimensions
    rows, cols = len(grid), len(grid[0])
    count = 0

    # Helper to check if a 3x3 subgrid is magic
    def is_magic(r, c):
        # Collect all numbers in the 3x3 window
        nums = [grid[r+i][c+j] for i in range(3) for j in range(3)]
        # Magic squares use numbers 1..9, all distinct
        if sorted(nums) != list(range(1, 10)):
            return False
        # Check rows, columns, diagonals
        for i in range(3):
            if sum(grid[r+i][c+j] for j in range(3)) != 15:
                return False
            if sum(grid[r+j][c+i] for j in range(3)) != 15:
                return False
        if grid[r][c] + grid[r+1][c+1] + grid[r+2][c+2] != 15:
            return False
        if grid[r][c+2] + grid[r+1][c+1] + grid[r+2][c] != 15:
            return False
        return True

    # Iterate over all possible 3x3 subgrids
    for i in range(rows - 2):
        for j in range(cols - 2):
            if grid[i+1][j+1] == 5:
                if is_magic(i, j):
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((rows-2) × (cols-2))  
    - For each possible top-left corner of a 3×3 subgrid, checking if it's magic is O(1) (fixed 9 elements & sum checks)
- **Space Complexity:** O(1)  
    - Only uses a small fixed-size list for checking numbers; no extra space usage based on input size

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this to magic squares of any size k×k instead of 3×3?  
  *Hint: What defines a magic square of size k? Is there an efficient way to check uniqueness and sum?*

- What if you are only allowed a single pass through the grid?  
  *Hint: Consider sliding window techniques and precomputing row/column sums.*

- Can you output the coordinates of each magic subgrid, not just count them?  
  *Hint: Store the top-left index each time you find a valid square.*

### Summary
This problem uses a fixed sliding window and validation/checking pattern for subgrid properties—a common grid pattern approach.  
The brute-force O(n\*m) strategy is efficient due to grid size limits.  
Key patterns: fixed-size sliding window, subgrid checks, uniqueness via counting/sorting, and constant-time validation steps.  
This technique applies to many grid problems, such as detecting submatrices with certain properties, Sudoku-like puzzles, and local region analysis.