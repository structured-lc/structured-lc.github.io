### Leetcode 1289 (Hard): Minimum Falling Path Sum II [Practice](https://leetcode.com/problems/minimum-falling-path-sum-ii)

### Description  
Given an n × n integer matrix `grid`, select one element from each row such that no two elements selected are from the same column, and sum them up. Find the **minimum possible sum**.
- For each row, pick exactly one element, ensuring you never pick the same column twice consecutively.
- Return the minimum sum possible for such a "falling path" from top to bottom.

### Examples  

**Example 1:**  
Input: `[[1,2,3],[4,5,6],[7,8,9]]`  
Output: `13`  
*Explanation: Pick 1 from first row, 5 from second (not col 0), and 7 from third (not col 1): 1 + 5 + 7 = 13*

**Example 2:**  
Input: `[[2,2,1],[3,3,3],[1,1,1]]`  
Output: `4`  
*Explanation: 1 from (0,2), 3 from (1,0), 1 from (2,1): 1+3+1 = 5, but better sequence gives 4*

**Example 3:**  
Input: `[]`  
Output: `7`  
*Explanation: Only one row/col, path sum = 7*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to try all possible assignments with backtracking, but that's O(nⁿ) (huge!).

A better solution is to use **dynamic programming**: For each cell in the current row, calculate the minimum path sum to it by taking the minimum of all path sums from the previous row *except* the same column.

To optimize, for each previous row, track the **minimum and second minimum** values along with their column indices.
- For each cell, if it's not in the minColumn, use prevMin; else use prevSecondMin.
- This way, we avoid an O(n²) inner loop – instead, O(n) per row total.

### Corner cases to consider  
- 1x1 matrix
- All values are the same
- Negative or large values
- Edge col cases (first, last col)

### Solution

```python
def minFallingPathSum(grid):
    n = len(grid)
    prev_min1 = prev_min2 = 0
    prev_idx1 = -1
    for row in grid:
        min1 = min2 = float('inf')
        idx1 = -1
        curr = [0] * n
        for j in range(n):
            # Cannot pick same col as last min
            if j != prev_idx1:
                curr[j] = prev_min1 + row[j]
            else:
                curr[j] = prev_min2 + row[j]
            # Track new row's min and second min
            if curr[j] < min1:
                min2, idx2 = min1, idx1
                min1, idx1 = curr[j], j
            elif curr[j] < min2:
                min2 = curr[j]
        prev_min1, prev_min2, prev_idx1 = min1, min2, idx1
    return prev_min1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²) (one pass per row × column, min/second min tracking in O(1) per cell)
- **Space Complexity:** O(n) for temp array per row.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the grid is not square (m × n)?  
  *Hint: Just use min(m, n) as for rectangular DP, rules same*

- How to reconstruct the actual path, not just its sum?  
  *Hint: Store tracebacks as you compute min path*

- Can this be solved in-place for extra memory savings?  
  *Hint: Update rows as you go, only store prev_row*

### Summary
This is a good example of the **dynamic programming (row by row, state compression/min tracking)** pattern, optimized via min/second min tracking per row. This trick appears in unique DP grid/scheduling minimization questions.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Minimum Falling Path Sum(minimum-falling-path-sum) (Medium)