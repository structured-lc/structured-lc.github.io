### Leetcode 2713 (Hard): Maximum Strictly Increasing Cells in a Matrix [Practice](https://leetcode.com/problems/maximum-strictly-increasing-cells-in-a-matrix)

### Description  
Given an m × n matrix of integers, you may begin at any cell. From the current cell, you can move **to any other cell in the same row or column** as long as its value is **strictly greater** than the current cell. Each move must always go to a cell with a higher value. You can continue moving as long as there are valid moves available. Find the **maximum number of cells** you can visit in such a strictly increasing path starting from any cell.

### Examples  

**Example 1:**  
Input: `matrix = [[3,1],[3,4]]`  
Output: `2`  
*Explanation: Start at (0,1) → (1,1), or (1,0) → (1,1). Both are strictly increasing, path length is 2.*

**Example 2:**  
Input: `matrix = [[1,1],[1,1]]`  
Output: `1`  
*Explanation: Any cell can only visit itself; there are no strictly greater values in any row or column.*

**Example 3:**  
Input: `matrix = [[7,5,3],[3,4,1],[8,6,2]]`  
Output: `4`  
*Explanation: Start at (1,0): 3 → (1,1): 4 → (0,0): 7 → (2,0): 8, so path length is 4.*  

Matrix for Example 3:
```
[7,5,3]
[3,4,1]
[8,6,2]
```

### Thought Process (as if you’re the interviewee)  

First, I would consider a brute-force approach: for each cell, try all possible paths using DFS or BFS, keeping track of visited cells and path lengths. However, this quickly becomes intractable for larger matrices since each cell can have up to m + n neighbors, and the number of paths grows rapidly.

Instead, I'll look for something more efficient, likely involving **dynamic programming (DP)**. Notice that transitions are only allowed to strictly greater cells in the same row or column. This hints that if we process the matrix in **increasing order of cell values**, then for each cell, we know that no path can come from a cell of equal or smaller value.

Plan:
- Group cells by value. For each value (in increasing order), process all cells of that value.
- For each cell, its best path is **rowMax[r]** or **colMax[c]** + 1, where rowMax and colMax represent the best answers so far for the given row and column (using only smaller values).
- After processing all cells of the current value, update the rowMax and colMax for their positions.

This is similar to "Longest Increasing Path in a Matrix" with restrictions, and ensures each cell is updated optimally.

Key trade-offs:
- Memory for DP arrays and grouping.
- Handle cases where values appear multiple times.

### Corner cases to consider  
- All numbers are the same: output should be 1.
- Matrix with only one row or one column.
- Matrix with strictly decreasing values: longest path is always 1.
- Multiple cells with the same value.
- Large matrices (test for time complexity).
- "Islands" of unreachable large values.

### Solution

```python
def maxIncreasingCells(matrix):
    """
    For each unique value (in order), update all cells with that value:
     - Their path length is one more than the best in their row and column so far (with smaller numbers only).
     - After all cells for the value, update the current row/col bests.
    """
    from collections import defaultdict

    m, n = len(matrix), len(matrix[0])
    value_cells = defaultdict(list)
    # Group cells by value for batch processing
    for r in range(m):
        for c in range(n):
            value_cells[matrix[r][c]].append((r, c))

    # DP to record max path ending at any row/col so far (for smaller values only)
    rowMax = [0] * m
    colMax = [0] * n
    ans = 1     # At minimum, any cell is a path of length 1

    # Process values in increasing order
    for value in sorted(value_cells):
        temp = {}
        # Phase 1: compute max path for all cells of this value
        for r, c in value_cells[value]:
            temp[(r, c)] = max(rowMax[r], colMax[c]) + 1
            ans = max(ans, temp[(r, c)])
        # Phase 2: update rowMax/colMax for this value only after all are computed
        for (r, c), v in temp.items():
            rowMax[r] = max(rowMax[r], v)
            colMax[c] = max(colMax[c], v)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n log(m × n))  
  - Grouping cells and sorting unique values takes up to m × n log(m × n).
  - Each cell is processed a constant number of times.

- **Space Complexity:** O(m × n)  
  - For grouping cells by value, and for temporary storage during processing.

### Potential follow-up questions (as if you’re the interviewer)

- How would you return the actual increasing path, not just its length?  
  *Hint: Track previous cells for each DP entry, and reconstruct the path backwards from a cell with maximum answer.*

- How would you handle the variant where moves are only allowed to adjacent (up/down/left/right) strictly larger cells?  
  *Hint: Apply DFS with memorization (classic longest increasing path in a grid).*

- Can you solve it in O(m × n) if values are bounded?  
  *Hint: Use counting sort over values to speed up batch processing.*

### Summary
This problem showcases an efficient DP approach for grid problems with row and column movement restrictions and monotonic value requirements. The main idea is to use grouping and process values in order, so that DP states can be built incrementally with correct dependencies. This is a general pattern used in 2D DP with monotonicity and preprocessing, which also appears in problems like "Longest Increasing Path in a Matrix" and row/column DP grid optimizations.