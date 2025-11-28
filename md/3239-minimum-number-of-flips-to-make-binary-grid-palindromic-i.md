### Leetcode 3239 (Medium): Minimum Number of Flips to Make Binary Grid Palindromic I [Practice](https://leetcode.com/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-i)

### Description  
Given an m × n binary matrix (**grid**), you can flip any cell (from 0→1 or 1→0). A *row* or *column* is *palindromic* if it reads the same forward and backward. Return the **minimum number of cell flips** needed so that **either all rows or all columns** are palindromic.

### Examples  

**Example 1:**  
Input: `grid = [[1,0,0],[0,0,0],[0,0,1]]`  
Output: `2`  
*Explanation: Flipping the (1,0) and (1,2) cells changes grid to:  
```
[
 [1,0,0],
 [0,0,0],
 [0,0,1]
]
⟶
[
 [1,0,0],
 [0,0,0],  # flip (1,0) to 1, flip (1,2) to 1
 [0,0,1]
]
All rows become palindromic.*
  
**Example 2:**  
Input: `grid = [[0,1],[0,1],[0,0]]`  
Output: `1`  
*Explanation: Flip cell (2,1) to 1:  
```
[
 [0,1],
 [0,1],
 [0,0]
]
⟶
[
 [0,1],
 [0,1],
 [0,1]
]
Now all columns are palindromic.*
  
**Example 3:**  
Input: `grid = [[1],]`  
Output: `0`  
*Explanation:  
```
[
 [1],
 [0]
]
```
Each row already is palindromic (since length = 1). No flips are needed.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try flipping every cell combination, checking after each the "palindromic" property for rows and columns. This is infeasible for m × n up to 25.
- **Observation:**  
  - To make all *rows* palindromic: for each row, each symmetric pair (j, n-1-j) must be equal. If not, flip one cell in the pair.
  - Similarly for *columns*: for each column, for symmetric pair (i, m-1-i), flip when different.
  - For each row: count how many flips to make it palindromic, sum over all rows.
  - For columns: do the same, sum flips for all columns.
  - Answer is min(total row flips, total column flips).
- **Optimization:**  
  - Process both options in linear time:  
    For rows, for every row r, for every pair (j, n-1-j) with j < n//2, if grid[r][j] ≠ grid[r][n-1-j], increment flips.
    For columns, for every col c, for every pair (i, m-1-i) with i < m//2, if grid[i][c] ≠ grid[m-1-i][c], increment flips.
    Return min(total_row_flips, total_col_flips).

This guarantees the minimal total cell flips to achieve either all rows palindromic **or** all columns palindromic.

### Corner cases to consider  
- Grid is only 1 row or 1 column  
- Grid is already palindromic in rows and columns  
- All entries are the same  
- Odd/even-sized rows and columns  
- Non-square grids (rectangular)  
- Large grid with no symmetry at all

### Solution

```python
def minFlips(grid):
    m = len(grid)
    n = len(grid[0])
    
    # Count flips to make all rows palindromic
    row_flips = 0
    for i in range(m):
        for j in range(n // 2):
            if grid[i][j] != grid[i][n - 1 - j]:
                row_flips += 1
    
    # Count flips to make all columns palindromic
    col_flips = 0
    for j in range(n):
        for i in range(m // 2):
            if grid[i][j] != grid[m - 1 - i][j]:
                col_flips += 1
    
    return min(row_flips, col_flips)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  For both row and column calculations, each cell is visited at most once.
- **Space Complexity:** O(1)  
  Only counters are used; no extra significant storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need both all rows **and** all columns to be palindromic?
  *Hint: Think of overlap and constraints between flipping schemes for rows and columns together.*

- What if instead of binary grid, it's ternary (values 0,1,2)?
  *Hint: How do you resolve minimum changes among more than two symbols?*

- Can you output one valid set of cell positions to flip (not just the count)?
  *Hint: Track which cell indices you flip while counting.*

### Summary
The approach uses a **greedy counting pattern** with symmetric index pairs to compute the minimal flips needed, either row-wise or column-wise. The minimum between these two options yields the optimal answer. This pattern (palindrome-restoration by pairwise comparison) also applies to classic string/array problems like "minimum insertions to make a string palindrome". The method is both optimal and efficient for the constraints.


### Flashcard
For rows: each symmetric pair (j, n-1-j) must match—count mismatches. For columns: each symmetric pair (i, m-1-i) must match—count mismatches. Return minimum.

### Tags
Array(#array), Two Pointers(#two-pointers), Matrix(#matrix)

### Similar Problems
- Minimum Number of Moves to Make Palindrome(minimum-number-of-moves-to-make-palindrome) (Hard)