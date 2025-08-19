### Leetcode 867 (Easy): Transpose Matrix [Practice](https://leetcode.com/problems/transpose-matrix)

### Description  
Given a 2D integer array (matrix), return **its transpose**.  
The *transpose* of a matrix means **flipping** the matrix over its main diagonal, so that the rows become columns and columns become rows.  
More precisely, the value at position (r, c) in the original matrix becomes position (c, r) in the transposed matrix.

### Examples  

**Example 1:**  
Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `[[1,4,7],[2,5,8],[3,6,9]]`  
*Explanation: First row [1,2,3] becomes first column, [4,5,6] becomes second column, etc.*

**Example 2:**  
Input: `matrix = [[1,2,3],[4,5,6]]`  
Output: `[[1,4],[2,5],[3,6]]`  
*Explanation: Matrix has 2 rows and 3 columns. After transpose, it has 3 rows and 2 columns. First column is [1,4], second is [2,5], third is [3,6].*

**Example 3:**  
Input: `matrix = [[4]]`  
Output: `[[4]]`  
*Explanation: Single element stays in the same position. Transpose of a 1×1 matrix is itself.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force / Direct approach:**  
  - Since the number of rows and columns may differ, create a new matrix with dimensions [number of columns][number of rows].  
  - For each (r, c) in the input, set output[c][r] = input[r][c].
  - This is straightforward, clear, and avoids in-place confusion.
- **Why not in-place?:**  
  - In-place transpose is only possible for square matrices.  
  - Here, since non-square matrices are allowed, we must allocate a new output matrix.

- **Python tricks?**  
  - Some languages let you do this concisely (e.g., zip), but in interviews we usually write out the explicit row-column iteration to show clear understanding.

- **Trade-offs:**  
  - Time: O(rows × cols), touching every element once.
  - Space: Allocate a new matrix of size [cols][rows].  
  - It’s simple, efficient, and handles all input sizes.

### Corner cases to consider  
- **Empty matrix**: [[]], e.g., no rows or rows but each row empty.
- **Single row**: `[[a, b, c]]` — Becomes column-wise.
- **Single column**: `[[a], [b], [c]]` — Becomes row-wise.
- **Jagged/non-uniform input**: Input specifies well-formed matrix—no jagged sublists.
- **All values are same / negative / zero**.
- **1×1 matrix**: Transpose of [[x]] should be [[x]].

### Solution

```python
def transpose(matrix):
    # Get number of rows and columns in input matrix
    rows = len(matrix)
    cols = len(matrix[0]) if rows else 0

    # Initialize result matrix with dimensions [cols][rows]
    result = [[0] * rows for _ in range(cols)]

    # Swap row and column indices
    for r in range(rows):
        for c in range(cols):
            result[c][r] = matrix[r][c]

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(rows × cols)  
  - Every value is read once and placed in the output.
- **Space Complexity:** O(rows × cols)  
  - A new matrix of the same number of total elements (just shape swapped) is allocated.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you transpose a matrix in-place if you **know it is square**?
  *Hint: For an n×n matrix, swap elements above the diagonal with those below.*

- How would you **stream** the transposed matrix, if the input matrix is too big to fit in memory?
  *Hint: Read input row by row, buffer columns, and write out by columns.*

- Could you **generalize this to n-dimensional tensors**?
  *Hint: Swapping axes / using permutations of dimensions.*

- Can you **transpose using recursion** or other paradigms (map, reduce)?

### Summary
This problem is a classic example of **matrix manipulation**.  
The pattern—traversing a matrix and swapping dimensions—is common in data manipulation (rotating images, data science table reshaping, etc.).  
The approach shown focuses on clear index mapping and space allocation, and illustrates how to work with 2D arrays directly.  
Patterns here apply to other problems involving “reshape” or transformation of 2D data.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
