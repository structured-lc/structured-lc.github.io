### Leetcode 3643 (Easy): Flip Square Submatrix Vertically [Practice](https://leetcode.com/problems/flip-square-submatrix-vertically)

### Description  
Given an integer matrix `grid` of size m×n, an integer `x` and `y` representing the top-left position (row and column) of a square submatrix, and an integer `k` representing its side length, **flip** the k×k square submatrix **vertically** (reverse the order of its rows), in place, and return the updated matrix.  
You only need to flip the specified submatrix, other values outside remain unchanged.

### Examples  

**Example 1:**  
Input:  
`grid = [[1,2,3],[4,5,6],[7,8,9]], x = 0, y = 0, k = 2`  
Output:  
`[[4,5,3],[1,2,6],[7,8,9]]`  
*Explanation: Submatrix at top-left (0,0) of size 2×2: [[1,2],[4,5]]. Flip vertically → [[4,5],[1,2]]. Only rows 0 and 1 in columns 0,1 are swapped.*

**Example 2:**  
Input:  
`grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12]], x=1, y=1, k=2`  
Output:  
`[[1,2,3,4],[5,10,11,8],[9,6,7,12]]`  
*Explanation: Submatrix at (1,1) of size 2×2: [[6,7],[10,11]]. Flip vertically → [[10,11],[6,7]]. Only rows 1 and 2, columns 1 and 2 are swapped.*

**Example 3:**  
Input:  
`grid = [[1]], x = 0, y = 0, k = 1`  
Output:  
`[[1]]`  
*Explanation: Submatrix is the cell itself. Flipping vertically does nothing; output is unchanged.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force**: Copy the k×k square into a temp matrix, reverse its rows, then write back—O(k²) space, not optimal.
- **Optimal**: Since only rows of the submatrix are reversed, we can swap entire slices of columns (subarrays) in rows, in place:
    - For each row in the first ⌊k/2⌋ rows within the submatrix:
        - Swap row at i = x to x+⌊k/2⌋-1 with the corresponding symmetric row at x+k-1-(i-x), for columns y to y+k-1.
    - This gets both ends and works in place.
- **Trade-off**: This approach is simple, O(1) extra space, works directly and avoids off-by-one errors.

### Corner cases to consider  
- Submatrix is just 1 cell (k=1).
- Submatrix at the edge or corner of the grid.
- Submatrix may be the whole grid.
- k may be even or odd.
- The grid may have only one row or one column.

### Solution

```python
def flipSquareSubmatrixVertically(grid, x, y, k):
    # Flip rows of k×k submatrix from top (x) to bottom (x+k-1)
    for i in range(k // 2):
        # Compute symmetric row indices within submatrix
        top = x + i
        bottom = x + k - 1 - i
        # Swap subarrays (columns y to y+k-1)
        for col in range(k):
            grid[top][y + col], grid[bottom][y + col] = grid[bottom][y + col], grid[top][y + col]
    return grid
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k²)  
  Traverse ⌊k/2⌋ rows, for each swap k column elements ⇒ total swaps are (k/2) × k = O(k²).
- **Space Complexity:** O(1)  
  Only uses a small number of variables for swapping; no extra matrix created.

### Potential follow-up questions  

- What if we need to flip the submatrix **horizontally** instead?
  *Hint: Swap columns instead of rows for each within the submatrix.*

- Support **non-square** submatrices (rectangles)?
  *Hint: Adjust loop bounds to handle height and width, not only k.*

- Can you flip the submatrix **both vertically and horizontally** in one pass?
  *Hint: Need to consider both row and column swaps, possibly layer-wise.*

### Summary
The approach leverages the fact that flipping vertically is just reversing row order for specific columns. In-place swapping of row slices (within submatrix columns) is an efficient coding pattern often applicable in matrix manipulation, such as rotating, mirroring, or transforming submatrices without allocating extra space. This is commonly found in grid-based problems in interviews and contests.

### Tags
Array(#array), Two Pointers(#two-pointers), Matrix(#matrix)

### Similar Problems
