### Leetcode 1582 (Easy): Special Positions in a Binary Matrix [Practice](https://leetcode.com/problems/special-positions-in-a-binary-matrix)

### Description  
Given an m × n binary matrix, a cell (i, j) is called a *special position* if it contains a 1 and all other elements in row i and column j are 0. Return the number of special positions in the matrix.

### Examples  
**Example 1:**  
Input: `[[1,0,0],[0,0,1],[1,0,0]]`  
Output: `1`  
*Explanation: Only cell (1,2) is special; its row and column have just one '1'.*

**Example 2:**  
Input: `[[1,0,0],[0,1,0],[0,0,1]]`  
Output: `3`  
*Explanation: Diagonal ones are all special (each row & column have only one '1').*

### Thought Process (as if you’re the interviewee)  
- The naive way is to iterate through the matrix, and for every '1', check if the rest of the row and column are all zeros.
- This can be optimized by first pre-computing the sum of each row and column.
- For each cell with '1', if row_sum[i] == 1 and col_sum[j] == 1, it's special.
- This improves checks from O(mn(m+n)) to O(mn).

### Corner cases to consider  
- All zeros matrix: should return 0.
- All ones in any row/column: no special positions.
- Multiple '1's in the same row or column: only those alone are special.
- Empty matrix or single element.

### Solution

```python
def numSpecial(mat):
    m, n = len(mat), len(mat[0])
    row_sum = [sum(row) for row in mat]
    col_sum = [sum(mat[i][j] for i in range(m)) for j in range(n)]
    count = 0
    for i in range(m):
        for j in range(n):
            if mat[i][j] == 1 and row_sum[i] == 1 and col_sum[j] == 1:
                count += 1
    return count
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n) — compute row and column sums, then iterate over all cells.
- **Space Complexity:** O(m + n) — store row/col sums.

### Potential follow-up questions (as if you’re the interviewer)  
- How would the solution change if matrix is very sparse?  
  *Hint: Consider using coordinate-lists or hashmaps for rows/columns with '1'.*

- What if the input cannot fit into memory?  
  *Hint: Use streaming, chunked reading, external memory algorithms.*

### Summary
This problem utilizes prefix sum-style precomputation and is a staple for scanning matrices for isolated features. This approach applies to unique row/column conflicts, text editors, or image processing.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Difference Between Ones and Zeros in Row and Column(difference-between-ones-and-zeros-in-row-and-column) (Medium)