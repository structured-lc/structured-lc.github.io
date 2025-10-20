### Leetcode 221 (Medium): Maximal Square [Practice](https://leetcode.com/problems/maximal-square)

### Description  
Given a 2D grid of characters `'0'` and `'1'`, **find the area of the largest square** containing only `1`s and return its area. You may assume the grid is at least one cell and not null. Each square must be aligned with the matrix (no rotation). The goal is to efficiently compute the largest possible square of 1s and its area.

### Examples  

**Example 1:**  
Input:  
`matrix = [ ["1","0","1","0","0"], ["1","0","1","1","1"], ["1","1","1","1","1"], ["1","0","0","1","0"] ]`  
Output:  
`4`  
*Explanation: The largest square of 1s has a side length of 2, so area = 2 × 2 = 4. It appears in rows 2 and 3, columns 2 and 3.*

**Example 2:**  
Input:  
`matrix = [ ["0","1"], ["1","0"] ]`  
Output:  
`1`  
*Explanation: The largest square of 1s is a single cell (side length 1), so area = 1.*

**Example 3:**  
Input:  
`matrix = [ ["0"] ]`  
Output:  
`0`  
*Explanation: There are no cells with `1`, so the maximal square area is 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For every cell, try to build all possible squares until you hit a `0`. This results in O(n³) time (not ideal for large matrices), as you'd check each square of increasing size at every `1` cell.

- **Optimization - Dynamic Programming (DP):**  
  Use a DP table where each entry `dp[i][j]` represents the maximum side of square ending at cell `(i, j)`.  
  The recurrence:  
  - if `matrix[i][j] == '1'`, then  
    `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`  
    (look up, left, and upper-left neighbors).  
  - if `matrix[i][j] == '0'`, then `dp[i][j] = 0`.

  This works because you can only extend a square by 1 if all three neighbors have squares of at least that side.

- **Why choose DP?**  
  - Efficient: O(m × n) time and O(m × n) space (often compressed to O(n) space).
  - Easy to update, only need previous row/column.
  - Extensible for related rectangle problems.

### Corner cases to consider  
- Empty matrix.
- Matrix of all `'0'`s.
- Matrix of all `'1'`s.
- Squares in varied positions (not at (0, 0)).
- Non-square (rectangular) matrices.
- Single row or single column.

### Solution

```python
def maximalSquare(matrix):
    if not matrix or not matrix[0]:
        return 0

    m, n = len(matrix), len(matrix[0])
    # DP array (using an extra row and column to avoid edge checks)
    dp = [ [0] * (n+1) for _ in range(m+1) ]
    max_side = 0

    for i in range(1, m+1):
        for j in range(1, n+1):
            if matrix[i-1][j-1] == '1':
                # Update dp based on minimum of left, up, and diagonal up-left
                dp[i][j] = 1 + min(
                    dp[i-1][j],
                    dp[i][j-1],
                    dp[i-1][j-1]
                )
                max_side = max(max_side, dp[i][j])
            # No need to update if matrix[i-1][j-1] == '0', stays zero
    return max_side * max_side  # area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m and n are number of rows and columns. Each cell is processed once.
- **Space Complexity:** O(m × n) for the DP array. Space can be optimized to O(n) if only two rows are maintained, as each cell depends only on the current and previous row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find the maximal rectangle of 1s (not just square)?  
  *Hint: Transform the problem and use a histogram method.*

- How can you further optimize space in your DP solution?  
  *Hint: Only two rows, or even one row, are needed at a time.*

- Can you recover the coordinates of the square (top-left and bottom-right) as well?  
  *Hint: Track position whenever updating max_side.*

### Summary
This problem is a classic use case of **dynamic programming on a 2D grid**, specifically for finding largest contiguous shapes (here, a square). The DP formula leverages relationships with neighbors to efficiently build up possible side lengths and tracks the largest found. The approach generalizes to many 'largest submatrix' pattern problems and is foundational for matrix-based DP questions.


### Flashcard
Use DP where dp[i][j] is the largest square ending at (i, j); update as 1 + min(top, left, top-left) if cell is '1'.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Maximal Rectangle(maximal-rectangle) (Hard)
- Largest Plus Sign(largest-plus-sign) (Medium)
- Count Artifacts That Can Be Extracted(count-artifacts-that-can-be-extracted) (Medium)
- Stamping the Grid(stamping-the-grid) (Hard)
- Maximize Area of Square Hole in Grid(maximize-area-of-square-hole-in-grid) (Medium)