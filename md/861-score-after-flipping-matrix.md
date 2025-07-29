### Leetcode 861 (Medium): Score After Flipping Matrix [Practice](https://leetcode.com/problems/score-after-flipping-matrix)

### Description  
Given a binary matrix grid (each cell is 0 or 1), you can flip any row or column (multiple times). Flipping means changing all 0s to 1s and 1s to 0s in that row/column. The score of the matrix is the sum of each row considered as a binary number.  
Your task: Maximize the total score by optimal flips.

### Examples  

**Example 1:**  
Input: `grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]`  
Output: `39`  
*Explanation:  
- Flip the first row: [[1,1,0,0],[1,0,1,0],[1,1,0,0]]  
- Flip the second column: [[1,1,0,0],[1,1,1,0],[1,0,0,0]]  
- Each row as binary: [1100] = 12, [1110] = 14, [1000] = 8  
- Score = 12 + 14 + 8 = 34*

**Example 2:**  
Input: `grid = [[1]]`  
Output: `1`  
*Explanation:  
Only one element: [1] = 1.*

**Example 3:**  
Input: `grid = [[0,1],[1,1]]`  
Output: `5`  
*Explanation:  
- Flip the first row: [[1,0],[1,1]]
- Convert to numbers: =2, =3 → 2 + 3 = 5
*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try every possible combination of row and column flips; calculate the resulting score. Not feasible—there are 2^(rows) row flips × 2^(cols) column flips.

- **Optimization/Greedy:**  
  The leftmost bit in each row contributes the most to the total score (most significant).  
  - Always make the first column all 1s by flipping rows as needed (since flipping twice reverts to original).  
  - For each of the remaining columns, check if the number of 0s exceeds 1s; if yes, flip the column (because more 1s make for a higher score).  
  - At the end, interpret each row as a binary number and sum.

- **Why is this optimal?**  
  Flipping to maximize 1s in higher-value columns always maximizes total sum, as binary place values decrease left to right.

### Corner cases to consider  
- Matrix is empty (`grid=[]`), or 0×0 dimension.
- All 0s or all 1s.
- Matrix with just 1 row or 1 column.
- Very large grid with minimal/maximum flips.
- No flips necessary (already optimal).
- Matrix with alternating 1s and 0s.

### Solution

```python
def matrixScore(grid):
    rows, cols = len(grid), len(grid[0])
    
    # Step 1: Ensure the most significant bit (left-most) is 1 in every row
    for r in range(rows):
        if grid[r][0] == 0:
            # Flip this row
            for c in range(cols):
                grid[r][c] ^= 1
    
    result = 0
    # Step 2: For each column, if more 0s than 1s, flip column
    for c in range(cols):
        ones = sum(grid[r][c] == 1 for r in range(rows))
        zeros = rows - ones
        # After potentially flipping, the count of 1s is max(ones, zeros)
        max_ones = max(ones, zeros)
        result += max_ones * (1 << (cols - c - 1))  # column weight
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = number of rows, n = number of columns.  
  Each row and column is visited at most once.
- **Space Complexity:** O(1) extra space (if grid can be modified), or O(m × n) if making a copy of grid.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can only flip rows or only columns?  
  *Hint: Does the order of operations matter for maximizing leftmost bits?*

- Can you solve this problem without modifying the input grid?  
  *Hint: Simulate flips or keep track with auxiliary data?*

- What if the grid is not binary (contains more than 0/1)?  
  *Hint: How does this affect flip operations and score calculations?*

### Summary
This problem leverages the **greedy** algorithmic pattern—by always flipping to maximize 1s in the most significant (leftmost) bit positions, you guarantee the largest possible sum. This pattern appears in other binary matrix maximization/minimization tasks, and also relates to **bit manipulation** and **dynamic programming** in broader contexts.