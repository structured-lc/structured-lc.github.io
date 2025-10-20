### Leetcode 1727 (Medium): Largest Submatrix With Rearrangements [Practice](https://leetcode.com/problems/largest-submatrix-with-rearrangements)

### Description  
Given a binary matrix (contains only 0s and 1s), you can *rearrange the columns in any order you like (independently for each row)*. The goal is to find the area of the *largest submatrix* (rectangle) consisting of only 1s that you can form by rearranging columns of the original matrix. You must return the area (height × width) of this largest possible all-1s submatrix.

### Examples  

**Example 1:**  
Input: `matrix = [[0,0,1],[1,1,1],[1,0,1]]`  
Output: `4`  
*Explanation: After rearranging columns, you can make the bottom two rows as:  
`[[1,1,1],[1,1,0]]`  
In the second and third columns, there's a 2×2 all 1s submatrix, so area = 4.*

**Example 2:**  
Input: `matrix = [[1,0,1,0,1]]`  
Output: `3`  
*Explanation: The only row can be rearranged to `[1,1,1,0,0]`, and the largest possible rectangle of 1s is length 3, area = 3.*

**Example 3:**  
Input: `matrix = [[1,1,0],[1,0,1],[0,1,1]]`  
Output: `2`  
*Explanation: Several 2×1 rectangles of 1s can be formed by rearrangements, but the maximum area is 2.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would check all possible column permutations and all possible rectangles, but this is infeasible: for a matrix with n columns there are n! possible permutations.

Instead, notice that column order only matters per row, so we can independently rearrange each row's columns to maximize the number of stacked 1s in every possible rectangle.

Key insight:  
If at each row we know *the height of consecutive 1s in each column up to that row* (like a histogram), sorting each row's heights in descending order allows us to optimally “align” tall columns for maximum area.

For each row:
- For each column, record how many consecutive 1s are stacked up to this row.
- Sort these values in descending order.
- For each index j in the sorted row, calculate area as `height * (j + 1)` (where height is the sorted value at position j).
- Keep the maximum area seen.

This is efficient (O(m × n log n)), because at each row we do O(n) work for counting and O(n log n) for sorting.

### Corner cases to consider  
- All zeros matrix (maximum area = 0)
- All ones matrix (maximum area = rows × cols)
- Only one row or one column
- Rows or columns with alternating 1 and 0
- Rectangles that don’t need full row/column
- Large input size (should be efficient)

### Solution

```python
def largestSubmatrix(matrix):
    m = len(matrix)
    n = len(matrix[0])
    # Build up the count of consecutive 1s in each column up to each row
    for i in range(1, m):
        for j in range(n):
            if matrix[i][j]:
                matrix[i][j] += matrix[i-1][j]
    max_area = 0
    # For each row, sort in descending order and try possible rectangles
    for row in matrix:
        sorted_row = sorted(row, reverse=True)
        for width in range(n):
            height = sorted_row[width]
            area = height * (width + 1)
            if area > max_area:
                max_area = area
    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n log n).  
  For each row, sorting takes n log n time and we do this for m rows.
- **Space Complexity:** O(1) additional space if modifying the input matrix in place; otherwise O(n) if making a copy per row for sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large matrices (constraints, memory)?  
  *Hint: Can you process row by row, in place, without storing the entire matrix in memory?*

- Can you adapt the solution if you are not allowed to rearrange columns every row but only once globally?  
  *Hint: What changes if sorting is allowed only once for all rows?*

- How would you modify this to return the coordinates of the submatrix, not just the area?  
  *Hint: Need to keep track of column indices after sorting.*

### Summary
This problem leverages the *histogram stacking* dynamic programming pattern, commonly used in questions about largest rectangles in binary matrices (i.e., "maximal rectangle" or "largest rectangle in histogram"). The major twist is the per-row column rearrangement, which is handled optimally by sorting. The O(m × n log n) approach is both efficient and generalizes well to other 2D rectangle counting problems involving binary matrices and stacking.


### Flashcard
Build histogram of consecutive 1s per column up to each row, sort each row's heights descending, then compute max rectangle area using histogram technique.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Matrix(#matrix)

### Similar Problems
- Max Area of Island(max-area-of-island) (Medium)