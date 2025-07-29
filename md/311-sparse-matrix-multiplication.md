### Leetcode 311 (Medium): Sparse Matrix Multiplication [Practice](https://leetcode.com/problems/sparse-matrix-multiplication)

### Description  
Given two 2D matrices, mat1 (m × k) and mat2 (k × n), compute their product matrix (m × n). Both matrices are **sparse** (mostly zeros). Multiply them efficiently by leveraging their sparsity. For each cell [i][j] in the result, compute the sum of mat1's iᵗʰ row and mat2's jᵗʰ column products. Assume multiplication is always possible (the number of columns of mat1 equals the number of rows of mat2).

### Examples  

**Example 1:**  
Input:  
mat1 = `[[1,0,0], [-1,0,3]]`  
mat2 = `[[7,0,0], [0,0,0], [0,0,1]]`  
Output:  
`[[7,0,0], [-7,0,3]]`  
*Explanation:*
- For result, only mat1\*mat2=1×7=7 (rest are zero).
- For result[1][2], mat1[1]\*mat2[2] + mat1[1][2]\*mat2[2][2] = (-1)×0 + 3×1 = 3.

**Example 2:**  
Input:  
mat1 = `[]`  
mat2 = `[]`  
Output:  
`[]`  
*Explanation:*  
Both matrices are 1×1 zero.

**Example 3:**  
Input:  
mat1 = `[[0,0,1]]`  
mat2 = `[[1],[2],[3]]`  
Output:  
`[[3]]`  
*Explanation:*
- Only mat1[2]\*mat2[2]=1×3=3 contributes.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - For each position (i, j) in the result, compute sum over k: mat1[i][k] × mat2[k][j].  
  - Time: O(m × k × n). Works, but inefficient if most values are zero.
- **Optimization using Sparsity:**  
  - Since most entries are zeros, only multiply and add non-zero mat1[i][k] and mat2[k][j] pairs.  
  - Precompute for each row of mat1 the non-zero (col, val) pairs; likewise for columns of mat2.  
  - Only consider pairs where multiplication will be non-zero.  
  - This can save a lot of computation for large, sparse matrices.

I’d choose the sparse optimization, as it reduces unnecessary calculation and leverages the problem's key property: sparsity.

### Corner cases to consider  
- Empty matrices (`mat1 = []` or `mat2 = []`)
- Single-row or single-column matrices
- All zeros in either matrix
- Very large matrices that are extremely sparse
- Matrices with only one non-zero value
- Negative numbers in matrices

### Solution

```python
def multiply(mat1, mat2):
    m, k, n = len(mat1), len(mat1[0]), len(mat2[0])
    result = [[0] * n for _ in range(m)]

    # Precompute non-zero entries for each row in mat1
    mat1_nonzero = []
    for i in range(m):
        nonzero = []
        for col in range(k):
            if mat1[i][col] != 0:
                nonzero.append( (col, mat1[i][col]) )
        mat1_nonzero.append(nonzero)

    # Precompute non-zero entries for each row in mat2
    mat2_nonzero = []
    for row in range(k):
        nonzero = []
        for j in range(n):
            if mat2[row][j] != 0:
                nonzero.append( (j, mat2[row][j]) )
        mat2_nonzero.append(nonzero)

    for i in range(m):
        for col1, val1 in mat1_nonzero[i]:
            for col2, val2 in mat2_nonzero[col1]:
                result[i][col2] += val1 * val2

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - If S₁ is the number of non-zero elements in mat1 and S₂ in mat2, then each non-zero in mat1[i] only multiplies with non-zeros in the corresponding mat2 row.
  - So, time is O(m + k + n + T), where T is the sum of multiply-adds needed (data dependent, typically ≪ m×k×n for sparse matrices).

- **Space Complexity:**  
  - O(m + k + m×n): extra space for sparse representations of mat1 and mat2, and the result matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrices are extremely large and cannot fit in memory?
  *Hint: How can you compute the multiplication row by row or in batches?*

- How would you implement this if the matrices are stored as linked lists of non-zeros, or as coordinate triplets?
  *Hint: Would you preprocess into a dictionary or merge lists while traversing?*

- How would you handle the matrix multiplication if one of the matrices is dense and the other is sparse?
  *Hint: Can you still exploit sparsity from one side? Will performance degrade?*

### Summary
This approach uses **sparse matrix traversal** to efficiently multiply two matrices by focusing only on non-zero values. The pattern (sparse + memory-efficient preprocessing) is very common in handling large, mostly empty arrays/matrices—applied in fields like scientific computing, search engines, or machine learning when working with sparse data.