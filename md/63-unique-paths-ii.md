### Leetcode 63 (Medium): Unique Paths II [Practice](https://leetcode.com/problems/unique-paths-ii)

### Description  
Given an m × n grid where each cell is either empty (0) or has an obstacle (1), a robot starts at the top-left corner and must reach the bottom-right corner. The robot can only move **down** or **right** at any step and cannot move through obstacles. Return the count of unique ways the robot can reach the destination, or 0 if it’s impossible.

### Examples  

**Example 1:**  
Input: `obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]`  
Output: `2`  
*Explanation: There are two unique paths:  
1 → right→right→down→down  
2 → down→down→right→right  
The cell (1,1) is an obstacle, so paths cannot go through it.*

**Example 2:**  
Input: `obstacleGrid = [[0,1],[0,0]]`  
Output: `1`  
*Explanation: Only one path: down→right. The top row’s second cell is blocked.*

**Example 3:**  
Input: `obstacleGrid = [[1]]`  
Output: `0`  
*Explanation: The robot starts on an obstacle, so no paths are possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force (DFS):** Try all possible paths from (0,0) to (m-1,n-1) recursively, exploring right and down, and stop at obstacles or out of bounds. Inefficient and will cause TLE for large grids.
- **Dynamic Programming:** Define `dp[i][j]` as the number of unique paths to cell (i,j).  
  - Base cases:
    - Start cell: if obstacle, dp = 0, else dp = 1.
    - For first row and first column: any obstacle blocks remaining cells in that row/col.
  - Transition: For other cells,  
    `if obstacle: dp[i][j] = 0`  
    `else: dp[i][j] = dp[i-1][j] + dp[i][j-1]`
  - Fill dp table row-wise.
- **Why DP?**  
  - Each state only depends on left and top cells; overlapping subproblems exist.
  - Time and space is manageable (m×n), much better than exponential paths in brute-force.

### Corner cases to consider  
- Grid is empty (0×0)  
- Single cell, with/without obstacle  
- Blocked start or end cell  
- Obstacles fill a full row or column (no possible path)  
- Grids with only one row/column  
- Obstacles on the edge, preventing movement along that row/col

### Solution

```python
def uniquePathsWithObstacles(obstacleGrid):
    m = len(obstacleGrid)
    n = len(obstacleGrid[0]) if m > 0 else 0

    # If starting or ending cell has an obstacle, there are no paths
    if m == 0 or n == 0 or obstacleGrid[0][0] == 1 or obstacleGrid[m - 1][n - 1] == 1:
        return 0

    # dp[i][j]: number of unique paths to (i, j)
    dp = [[0]*n for _ in range(m)]
    
    # Start cell
    dp[0][0] = 1

    # Fill first column
    for i in range(1, m):
        dp[i][0] = int(dp[i-1][0] == 1 and obstacleGrid[i][0] == 0)
    
    # Fill first row
    for j in range(1, n):
        dp[0][j] = int(dp[0][j-1] == 1 and obstacleGrid[0][j] == 0)

    # Fill rest of matrix
    for i in range(1, m):
        for j in range(1, n):
            if obstacleGrid[i][j] == 0:
                dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m=#rows, n=#cols, since each cell is computed once.
- **Space Complexity:** O(m × n) for the DP table.  
  - Could be reduced to O(n) using a single array for the current row if desired.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return **all unique paths** (not just the count)?
  *Hint: Consider backtracking and storing paths as lists of coordinates.*

- Can you optimize the space complexity even further?
  *Hint: Try updating one row in place instead of the full matrix.*

- How does this solution adapt if diagonal moves (down-right) are allowed?
  *Hint: Update transition relation to include dp[i-1][j-1].*

### Summary
This solution demonstrates a classic **dynamic programming grid traversal** pattern: each DP state depends only on top and left, making it ideal for 2D array DP. Recognizing that obstacles change transition behavior is key. This pattern is common in grid-based path problems (e.g., variations with costs, matching, or with more restricted movement).


### Flashcard
Use DP with obstacles: dp[i][j] = 0 if obstacle, else sum of top and left cells; handle first row/col carefully.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Unique Paths(unique-paths) (Medium)
- Unique Paths III(unique-paths-iii) (Hard)
- Minimum Path Cost in a Grid(minimum-path-cost-in-a-grid) (Medium)
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)