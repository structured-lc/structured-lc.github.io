### Leetcode 566 (Easy): Reshape the Matrix [Practice](https://leetcode.com/problems/reshape-the-matrix)

### Description  
Given a 2D matrix `mat` with `m` rows and `n` columns, and two integers `r` and `c`, reshape `mat` into a new matrix with `r` rows and `c` columns containing all the elements of the original matrix in row-major order.
If the total number of elements in the new matrix does not equal the old one, return the original matrix.  
The reshaping must preserve the element order (left-to-right, top-to-bottom).

### Examples  

**Example 1:**  
Input: `mat = [[1,2],[3,4]], r = 1, c = 4`  
Output: `[[1,2,3,4]]`  
Explanation:  
Original is 2×2. Possible to reshape to 1×4, elements in row order: [1,2,3,4].  
So the new matrix is:  
```
[[1, 2, 3, 4]]
```

**Example 2:**  
Input: `mat = [[1,2],[3,4]], r = 2, c = 4`  
Output: `[[1,2],[3,4]]`  
Explanation:  
Original has 4 elements, target matrix needs 8. Impossible to reshape, so return original.

**Example 3:**  
Input: `mat = [[1],[2],[3],[4]], r = 2, c = 2`  
Output: `[[1,2],[3,4]]`  
Explanation:  
Original in row order: [1,2,3,4]. Arranged as 2×2:  
```
[[1, 2],
 [3, 4]]
```

### Thought Process (as if you’re the interviewee)  
- First, count the total number of elements in the original matrix. It's m × n.
- To reshape, the new matrix must also have exactly r × c elements. If not, reshaping isn’t possible; return the original matrix.
- The brute-force approach would flatten the matrix into a 1D list, then split it back into rows of length c to form the target shape.
- An optimized approach (to avoid extra flattening space) uses direct index mapping:
    - Each element’s global index (across the flattened matrix) is mapped to its new (row, col) position in the reshaped matrix using division/modulo.
    - For each element at (i, j) in the old matrix, its overall index is: idx = i × n + j.
    - Its position in the new matrix is: (idx // c, idx % c).
- Choose index mapping because it traverses the matrix with O(1) extra space and preserves order.

### Corner cases to consider  
- The reshape is impossible (e.g., trying to reshape 6 elements to a 7-element matrix).
- The original matrix is empty.
- r or c is 0, or negative (though the problem likely guarantees valid input).
- The target shape matches the original.
- Input matrix has only one row, one column, or just one element.

### Solution

```python
def matrixReshape(mat, r, c):
    m = len(mat)
    n = len(mat[0]) if m > 0 else 0

    # If reshape not possible, return original
    if m * n != r * c:
        return mat

    # Prepare the output matrix filled with zeroes
    result = [[0 for _ in range(c)] for _ in range(r)]

    # Go through each element by row-major order and place it
    for i in range(m):
        for j in range(n):
            idx = i * n + j
            new_row = idx // c
            new_col = idx % c
            result[new_row][new_col] = mat[i][j]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) (must visit each element exactly once)
- **Space Complexity:** O(r × c) for the new matrix; no extra space used for flattening

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix entries are objects, not just numbers?
  *Hint: Ensure order is preserved; avoid shallow/deep copy issues.*
- Can you do this in-place if extra memory is restricted?
  *Hint: Think about the implications; might not be possible for arbitrary reshaping unless shape matches.*
- How would you generalize this for 3D matrices?
  *Hint: Extend index-mapping logic to higher dimensions; requires careful calculation of flat index and position.*

### Summary
This problem is a classic example of **index mapping** in arrays/matrices. The core is to compute the 1D flattened index and translate between 2D and 1D coordinates using division and modulus. The coding pattern is broadly useful for image transformations, memory layout changes, or any data reshaping where order preservation and correct mapping are required.