### Leetcode 766 (Easy): Toeplitz Matrix [Practice](https://leetcode.com/problems/toeplitz-matrix)

### Description  
Given an **m × n** matrix, determine if it is a **Toeplitz matrix**.  
A Toeplitz matrix is defined as a matrix where **every diagonal from top-left to bottom-right has the same element**. For every element at position (i, j), it must hold that `matrix[i][j] == matrix[i+1][j+1]` for all possible i and j within bounds.  
In other words, each value in the matrix should match the value of the element diagonally below and to the right, except for elements in the last row or last column (since they have no such neighbor)[1][2][4].

### Examples  

**Example 1:**  
Input: `matrix = [[1,2,3,4], [5,1,2,3], [9,5,1,2]]`  
Output: `True`  
*Explanation:  
Every diagonal from top-left to bottom-right has the same element:  
- `[1,1,1]`  
- `[2,2,2]`  
- `[3,3]`  
- `[4]`  
- `[5,5]`  
- ``  
All diagonals are consistent, so the matrix is Toeplitz.*

**Example 2:**  
Input: `matrix = [[1,2], [2,2]]`  
Output: `False`  
*Explanation:  
The diagonal `[1,2]` starts at (0,0) and goes to (1,1); `1 ≠ 2`, so the matrix is not Toeplitz.*

**Example 3:**  
Input: `matrix = []`  
Output: `True`  
*Explanation:  
A single-element matrix is always Toeplitz.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to check every diagonal starting at each cell in the first row and first column. But there's a simpler approach:

- Loop through the matrix.
- For each element (except those in the last row or last column), compare it to the element diagonally down and to the right:  
  `matrix[i][j] == matrix[i+1][j+1]`
- If any comparison fails, immediately return False.
- If all pass, return True.

This approach is efficient because:
- We're only checking neighbors, making the code simple and fast.
- There’s no need to explicitly extract diagonals.

The final approach is to iterate matrix elements (excluding last row and last col) and check diagonal consistency, as this minimizes both time and space.

### Corner cases to consider  
- Empty matrix (`[]`)
- Matrix with only one element
- Matrix where all elements are the same
- Single row or single column matrices
- Large matrices (performance)
- Diagonals of length 1 (corners)

### Solution

```python
def isToeplitzMatrix(matrix):
    rows = len(matrix)
    if rows == 0:
        return True  # Edge case: empty matrix is Toeplitz
    cols = len(matrix[0])
    # Iterate through all elements except last row and column
    for i in range(rows - 1):
        for j in range(cols - 1):
            # Compare current element with its bottom-right neighbor
            if matrix[i][j] != matrix[i + 1][j + 1]:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  Every element (except those in last row/col) is checked once.
- **Space Complexity:** O(1).  
  No extra space used beyond loop variables; we do not create any copy of the matrix or other data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only part of the matrix (not the full matrix) is stored in memory at once?  
  *Hint: Process each row and keep only the previous row, or even just the previous row shifted by one element.*

- How to check the Toeplitz property if the matrix is large and read from a file (streaming row by row)?  
  *Hint: For each new row, only keep one row of memory and verify each element except the first with the previous row shifted right by one.*

- Could you check if the matrix is Toeplitz with submatrices or blocks distributed across machines?  
  *Hint: Diagonal information near the borders of blocks/submatrices matters for distributed checking.*

### Summary
The approach uses the **neighbor diagonal check** coding pattern, commonly seen in matrix-related problems (e.g. islands, flood fill, and DP on grids). 
This problem is a classic in checking neighbor relations efficiently, and the pattern generalizes to validating sequential grid or matrix constraints with just local comparisons.