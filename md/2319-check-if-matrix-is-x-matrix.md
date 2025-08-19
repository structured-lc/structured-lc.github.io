### Leetcode 2319 (Easy): Check if Matrix Is X-Matrix [Practice](https://leetcode.com/problems/check-if-matrix-is-x-matrix)

### Description  
Given an n × n 2D integer array, return true if the matrix is an **X-Matrix**.  
A matrix is an X-Matrix if **all the diagonal elements (i.e., both the main and anti-diagonal)** are **non-zero**, and **all other elements are 0**.  
The main diagonal elements are where `i == j`. The anti-diagonal elements are where `i + j == n - 1`.  
All other values should be exactly 0.

### Examples  

**Example 1:**  
Input: `grid = [[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]]`  
Output: `true`  
*Explanation:  
Diagonals (rows in []):  
- Row 0: [2,_,_,1] → main diag (2), anti (1)  
- Row 1: [_,3,1,_]  
- Row 2: [_,5,2,_]  
- Row 3: [4,_,_,2]  
All diagonal elements (2, 3, 2, 2, 1, 1, 4, 5) are non-zero and all others are zero.*

**Example 2:**  
Input: `grid = [[5,7,0],[0,3,1],[0,5,0]]`  
Output: `false`  
*Explanation:  
Non-zero 7 at cell (0,1) is not on any diagonal, so this is not an X-Matrix.*

**Example 3:**  
Input: `grid = [[1,0,1],[0,1,0],[1,0,1]]`  
Output: `true`  
*Explanation:  
All elements on the main and anti-diagonals are non-zero (1s), all other elements are 0.*

---

### Thought Process (as if you’re the interviewee)  
- At first, brute-force: Check every position (i, j) in the grid.
    - If (i == j) or (i + j == n - 1): it should be non-zero.
    - Else: it should be exactly 0.
- Use two nested loops for i, j in 0 to n-1.
- Return False as soon as one rule is violated.
- Space complexity is O(1), no extra storage.
- Time is O(n²), which is fine since n ≤ 100.
- There is no obvious way to optimize further; all cells must be checked in worst case.

---

### Corner cases to consider  
- n = 3 (minimum allowed): smallest X is possible.
- All diagonals have nonzero, but off-diagonals are nonzero: (should return false).
- All diagonals have nonzero, all off-diagonals are zero: valid.
- Zeros on a diagonal: invalid.
- Large n, full of zeros: invalid.
- Matrix where main and anti-diagonal overlap (center of odd n): should still be non-zero.

---

### Solution

```python
def checkXMatrix(grid):
    n = len(grid)
    for i in range(n):
        for j in range(n):
            # Check if on main or anti-diagonal
            if i == j or i + j == n - 1:
                # Diagonal cells must be non-zero
                if grid[i][j] == 0:
                    return False
            else:
                # Non-diagonal cells must be zero
                if grid[i][j] != 0:
                    return False
    return True
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), as every cell in the n × n grid is checked once.
- **Space Complexity:** O(1), as no additional space proportional to n is used.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the function if you wanted to return all positions where the matrix fails to be an X-Matrix?  
  *Hint: Instead of returning early, collect and return offending cell indices.*

- How could you solve this for a non-square (m × n) matrix?  
  *Hint: The problem's definition only makes sense for square matrices; for rectangles, you’d need to redefine diagonals.*

- Can you write a version that uses recursion?  
  *Hint: You can process one cell, then recurse through the grid, though iteration is simpler in Python.*

---

### Summary
This problem is a classic **"matrix traversal with positional logic"** pattern. You perform a simple check based on coordinates, walking each cell and applying rules. It's similar in form to problems like "matrix diagonal sum", "check diagonal symmetry", or "set matrix zeroes"—a core building block for 2D grid reasoning. The O(n²) time is as good as possible for matrix-wide verification.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
- Matrix Diagonal Sum(matrix-diagonal-sum) (Easy)