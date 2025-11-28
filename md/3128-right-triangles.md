### Leetcode 3128 (Medium): Right Triangles [Practice](https://leetcode.com/problems/right-triangles)

### Description  
Given a binary matrix `grid`, count the number of right triangles that can be formed by picking three `1`s such that:
- One of them is the *right angle vertex*.
- There is another `1` in the same row (different column).
- There is a third `1` in the same column (different row).

The triangle sides must be parallel to the axes, meaning the triangle's right angle is always at the intersection of a row and column. Each triangle is uniquely determined by picking its right-angle `1` and then a `1` from its row and a `1` from its column.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,0],[1,1,0],[0,0,1]]`  
Output: `4`  
*Explanation: The right triangles are:*
- *At (0,0): choose (0,1) (same row) and (1,0) (same column).*
- *At (0,1): choose (0,0) (row) and (1,1) (col).*
- *At (1,0): choose (1,1) (row) and (0,0) (col).*
- *At (1,1): choose (1,0) (row) and (0,1) (col).*

**Example 2:**  
Input: `grid = [[1,0],[1,1]]`  
Output: `1`  
*Explanation: Only one right triangle: at (1,1), with (1,0) (row) and (0,1) (col).*

**Example 3:**  
Input: `grid = [[0,0],[0,0]]`  
Output: `0`  
*Explanation: No triangles can be formed since there are no ones.*

### Thought Process (as if you’re the interviewee)  
To solve this, my first instinct is to try all possible triplets of `1`'s and check if they can form such a triangle, but that would be O(n³), which is too slow for large grids.

Observing the constraints, I note that each right triangle is uniquely determined by picking its *right angle* at a cell with a `1`. For every such cell, the number of right triangles with a right angle at (i, j) is:
- (number of other `1`’s in the same row) × (number of other `1`’s in the same column)

So for each grid[i][j] == 1, we:
- Count ones in row i (excluding (i, j)), call it rowCnt.
- Count ones in column j (excluding (i, j)), call it colCnt.
- The number of triangles at (i, j) is rowCnt × colCnt.
We sum this up for every cell.

To optimize, we can precompute the number of ones in every row and column in O(n²) time, so at each (i, j), we have these counts readily.

### Corner cases to consider  
- The grid contains only zeroes — output is 0.
- The grid contains only one `1` — output is 0.
- A row or column contains only one `1` — cannot contribute.
- Very large and sparse grid — make sure to use efficient row and column counts.

### Solution

```python
def numberOfRightTriangles(grid):
    # Number of rows and columns
    rows, cols = len(grid), len(grid[0])
    # Precompute # of ones in each row and column
    row_ones = [0] * rows
    col_ones = [0] * cols
    
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == 1:
                row_ones[i] += 1
                col_ones[j] += 1
    
    total_triangles = 0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == 1:
                # Ones in row i, excluding (i,j)
                row_count = row_ones[i] - 1
                # Ones in col j, excluding (i,j)
                col_count = col_ones[j] - 1
                # Both counts must be ≥ 1 to form a triangle
                if row_count > 0 and col_count > 0:
                    total_triangles += row_count * col_count
    return total_triangles
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n is #rows and m is #columns. 
  - O(n × m) to count ones in row and columns.
  - O(n × m) to process each cell and compute triangles.
- **Space Complexity:** O(n + m) for the row and column counts arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if grid is very sparse and extremely large?
  *Hint: Store only non-zero positions, and count ones on-the-fly with hash maps for rows and columns.*

- How would you count right triangles if diagonals (not just rows and columns) are allowed?
  *Hint: Precompute and count in all four diagonal directions per cell as well.*

- Can you avoid over-counting triangles if some rows/cols repeat?
  *Hint: Carefully subtract the pivot ones, and ensure each triangle's pivot is counted only once.*

### Summary
The approach builds on combinatorics and precomputation — for each possible pivot, multiply the number of available choices in its row and column (excluding itself). The coding pattern is akin to using *prefix sums* or *preprocessing for frequent queries on subarrays/submatrices*, and this thinking is common in problems that involve counting pairs or triplets based on shared attributes.


### Flashcard
For each cell with a `1`, count other `1`'s in its row and column; multiply these counts to get right triangles with right angle at that cell.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Combinatorics(#combinatorics), Counting(#counting)

### Similar Problems
