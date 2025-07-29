### Leetcode 73 (Medium): Set Matrix Zeroes [Practice](https://leetcode.com/problems/set-matrix-zeroes)

### Description  
You are given an m × n integer matrix. If any element in the matrix is 0, set its entire row and column to 0—do this **in place** (modify the matrix directly, without using extra matrix storage). The challenge is to achieve this efficiently and minimize extra space use.

### Examples  

**Example 1:**  
Input: `matrix = [[1,1,1],[1,0,1],[1,1,1]]`  
Output: `[[1,0,1],[0,0,0],[1,0,1]]`  
*Explanation: The 0 at position (1,1) sets row 1 and column 1 to all zeros.*

**Example 2:**  
Input: `matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]`  
Output: `[[0,0,0,0],[0,4,5,0],[0,3,1,0]]`  
*Explanation: Zeros at (0,0) and (0,3) cause first and last columns/rows to be set fully to 0.*

**Example 3:**  
Input: `matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`  
Output: `[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]`  
*Explanation: No zero exists, so the matrix remains unchanged.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each zero, mark all cells in its row and column as zero. But if we do this directly, new zeros will propagate to more rows/cols and corrupt the answer.
  
- **Marking approach:**  
  Use two extra arrays to record which rows and columns should be zeroed, then in a second pass zero those rows and columns. This requires O(m + n) space.

- **Optimal in-place approach:**  
  To further optimize space to O(1), utilize the **first row and first column** of the matrix as markers. As we scan cells, if matrix[i][j] == 0, we set matrix[i] and matrix[j] to 0. In a final pass (excluding first row/col), for each cell matrix[i][j], set to 0 if its row or column is marked. Handle first row and first column separately, as they’re used as markers.

*This technique is crucial for in-place matrix problems!*

### Corner cases to consider  
- Single row or column
- Entire matrix is zero
- No zeros in matrix
- Zero at matrix (affects both marker row and column)
- Zeros only in first row/column
- Empty matrix

### Solution

```python
def setZeroes(matrix):
    if not matrix:
        return
    m, n = len(matrix), len(matrix[0])
    
    # Flags to determine if first row or first column should be zeroed
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))
    
    # Use first row and first column as markers for zero-rows and zero-columns
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # Zero out cells except first row and first column based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Zero first row if needed
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0

    # Zero first column if needed
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Every cell is visited at most twice: once for marking, once for zeroing.

- **Space Complexity:** O(1)  
  No extra memory proportional to input size is used; only a few flags.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must return a new matrix instead of modifying in place?  
  *Hint: You can simply make a copy and work with extra space for marking.*

- How do you optimize for very sparse matrices?  
  *Hint: Consider using a hash set for the indices of rows/columns to zero, or process only specific rows/cols.*

- How would you proceed if the input size exceeded RAM (very large matrices)?  
  *Hint: Process in blocks or streams, or use external storage for marking.*

### Summary  
This problem applies the **in-place marking pattern**: reusing the matrix’s own rows/columns to track which rows and columns to zero, reducing space to O(1). This technique is broadly applicable for matrix-in-place problems, such as marking visited nodes or propagating special flags. The main coding pattern here is *state compression by reusing input array cells*.