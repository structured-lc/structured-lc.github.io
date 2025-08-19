### Leetcode 1277 (Medium): Count Square Submatrices with All Ones [Practice](https://leetcode.com/problems/count-square-submatrices-with-all-ones)

### Description  
Given an m × n binary matrix of 0's and 1's, count how many square submatrices have all ones.  
A square submatrix means a square region of contiguous cells (size k × k for k ≥ 1) that is fully inside the matrix and every entry is 1.

### Examples  

**Example 1:**  
Input: `matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]`  
Output: `15`  
*Explanation: Ten 1×1 squares (all ones), four 2×2 squares, and one 3×3 square. The positions of each can be checked by iterating over the matrix. So, 10 + 4 + 1 = 15.*

**Example 2:**  
Input: `matrix = [[1,0,1],[1,1,0],[1,1,0]]`  
Output: `7`  
*Explanation: Six 1×1 squares, and one 2×2 square (bottom left).*

**Example 3:**  
Input: `matrix = [[1]]`  
Output: `1`  
*Explanation: Only one single cell, which itself is a (1×1) submatrix.*

### Thought Process (as if you’re the interviewee)  
- Start with the brute-force approach:  
  For every possible top-left corner and every square size k, check if the corresponding k×k submatrix is all ones. This leads to O(m×n×min(m,n)²) time, which is too slow for large matrices.
- To optimize, think about how to reuse computations:  
  Notice that a k×k square of ones ending at (i, j) requires squares of size (k-1) all ones at (i-1, j), (i, j-1), and (i-1, j-1), plus this cell itself being 1.
- This suggests Dynamic Programming:  
  Let dp[i][j] = the largest size of square submatrix with all ones that uses (i, j) as its bottom-right corner.
    - If matrix[i][j] == 0 ⇒ dp[i][j] = 0.
    - If i==0 or j==0 ⇒ dp[i][j] = matrix[i][j] (boundary).
    - Otherwise: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if matrix[i][j] == 1.
  - The answer is the sum of all dp[i][j].  
- This is O(m×n) both in time and space, and can be done in-place to save space.

### Corner cases to consider  
- Empty matrix (`matrix = []` or `matrix = [[]]`)
- Matrix with only 0’s
- Matrix with only 1’s
- Matrix with only one row or one column
- Very large matrices near the size limits
- Multiple disconnected clusters of ones


### Solution

```python
def countSquares(matrix):
    # Get dimensions
    m, n = len(matrix), len(matrix[0]) if matrix else 0
    res = 0

    # Iterate in-place; matrix[i][j] will store the size of largest square submatrix with bottom-right at (i, j)
    # If we want to avoid modifying the input, we can copy the matrix or use a dp array.
    for i in range(m):
        for j in range(n):
            if matrix[i][j] == 1:
                if i == 0 or j == 0:
                    # First row or column, only itself can be the square
                    res += 1
                else:
                    # Expand based on min of (top, left, top-left)
                    matrix[i][j] = min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1
                    res += matrix[i][j]
            # Else, cell is zero, can't be part of any square
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n).  
  For each cell, we perform a constant number of operations.
- **Space Complexity:** O(1) extra if we modify the matrix in place, otherwise O(m×n) if using a separate dp array.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return the *largest* possible square (starting position + size), not just the count?  
  *Hint: Track the maximum dp[i][j] and its coordinates while filling the dp.*

- How would your approach change if the matrix was sparse with large dimensions?  
  *Hint: Consider space-efficient structures, and only store nonzero entries.*

- Can you extend the solution to count rectangular (not just square) submatrices where all cells are one?  
  *Hint: Think of ways to use histogram/stack-based methods like in the maximal rectangle problem.*


### Summary  
This uses a classic **dynamic programming** pattern on a 2D grid, where you build up a solution based on smaller subproblems (left, top, top-left neighbors) to answer a local query at each cell.  
It’s an example of local DP table building for 2D matrix substructure problems, which is similar to the maximal square problem. Variations of this approach apply to other 2D grid/rectangle/square counting problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Minimum Cost Homecoming of a Robot in a Grid(minimum-cost-homecoming-of-a-robot-in-a-grid) (Medium)
- Count Fertile Pyramids in a Land(count-fertile-pyramids-in-a-land) (Hard)