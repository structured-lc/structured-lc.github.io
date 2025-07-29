### Leetcode 2482 (Medium): Difference Between Ones and Zeros in Row and Column [Practice](https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column)

### Description  
Given a 0-indexed m × n binary matrix `grid` (containing only 0s and 1s), construct and return a difference matrix `diff` of the same size such that for each cell (i, j):
- Let onesRowᵢ be the number of 1s in row i.
- Let onesColⱼ be the number of 1s in column j.
- Let zerosRowᵢ be the number of 0s in row i.
- Let zerosColⱼ be the number of 0s in column j.

Then,
```
diff[i][j] = onesRowᵢ + onesColⱼ - zerosRowᵢ - zerosColⱼ
```
You need to calculate this value for every cell in the matrix and return the resulting matrix.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,1],[1,0,1],[0,0,1]]`  
Output: `[[0,0,4],[0,0,4],[-2,-2,2]]`  
*Explanation:  
For cell (0,0): onesRow₀=2, onesCol₀=1, zerosRow₀=1, zerosCol₀=2 ⇒ diff=2+1−1−2=0  
For cell (0,1): onesRow₀=2, onesCol₁=1, zerosRow₀=1, zerosCol₁=2 ⇒ diff=2+1−1−2=0  
For cell (0,2): onesRow₀=2, onesCol₂=3, zerosRow₀=1, zerosCol₂=0 ⇒ diff=2+3−1−0=4  
...and similarly for other cells.*

**Example 2:**  
Input: `grid = [[1,0],[0,1]]`  
Output: `[[0,0],[0,0]]`  
*Explanation:  
For all cells, onesRow and onesCol are 1, zerosRow and zerosCol are also 1, so diff=1+1−1−1=0.*

**Example 3:**  
Input: `grid = [[1]]`  
Output: `[]`  
*Explanation: Only one cell: onesRow₀=1, onesCol₀=1, zerosRow₀=0, zerosCol₀=0 ⇒ diff=1+1−0−0=2.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to, for every cell, count the number of 1s and 0s in its row and column, and compute the formula. This is O(mn(m+n)) which is too slow for large matrices.

To optimize, precompute:
- The count of ones and zeros for each row and column in O(mn) time by scanning the matrix twice.
- Then, fill the result matrix in a single pass, using the precomputed counts to compute diff[i][j] as specified.

This reduces the time complexity to O(mn), which is optimal since every cell must be processed at least once. The space complexity is O(m+n) for the storage of counts, and O(mn) for the output.

I choose the counting arrays approach because it's both intuitive and efficient—preprocessing lets us answer each cell's query in O(1).

### Corner cases to consider  
- Single cell matrix (`1×1`)
- All zeros or all ones matrix
- Empty matrix (`[]`), although problem likely guarantees at least 1 row/column
- Row or column with only ones or with only zeros

### Solution

```python
def onesMinusZeros(grid):
    m, n = len(grid), len(grid[0])

    # Count ones in each row and column
    ones_row = [0] * m
    ones_col = [0] * n

    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                ones_row[i] += 1
                ones_col[j] += 1

    # Zeros can be found by subtracting from total size
    zeros_row = [n - ones_row[i] for i in range(m)]
    zeros_col = [m - ones_col[j] for j in range(n)]

    diff = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            diff[i][j] = ones_row[i] + ones_col[j] - zeros_row[i] - zeros_col[j]

    return diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n) for initial scan (to count ones in each row/col) and a second O(m × n) pass to fill the diff matrix. So, total O(m × n).
- **Space Complexity:** O(m + n) for the row and column counts (ones and zeros), plus O(m × n) for the output matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you are asked for the maximum value in the output diff matrix.  
  *Hint: Can you track it during the fill loop?*

- What if the matrix is extremely large and does not fit in memory?  
  *Hint: Can counts for each row be processed on the fly, or can you stream data with limited storage?*

- What if the grid's elements are not strictly 0/1, but arbitrary integers?  
  *Hint: How would the diff definition change for non-binary grids?*

### Summary
This problem is a classic example of the "precompute row/column stats to answer per-cell queries efficiently" pattern, commonly seen in 2D matrix problems. Here, precomputing counts allows O(1) lookup per cell for fast matrix computation. This approach (row/column prefix sums or counts) is broadly reusable for questions requiring you to aggregate or compare across rows/columns, such as finding submatrix sums, computing regions, or data summarization in grids.