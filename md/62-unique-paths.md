### Leetcode 62 (Medium): Unique Paths [Practice](https://leetcode.com/problems/unique-paths)

### Description  
Given an **m × n** grid, a robot starts at the top-left cell (0,0). At each step, the robot can **only move either right or down**. The goal is to reach the bottom-right cell (m-1, n-1). You need to calculate the total number of unique paths the robot can take from start to finish.

### Examples  

**Example 1:**  
Input: `m = 3, n = 7`  
Output: `28`  
*Explanation: There are 28 distinct ways for the robot to reach the bottom-right by only moving right or down. For instance, one path could be right six times, then down twice; another could be down once, right three times, down once, then right three times, etc. The sum of all such combinations is 28.*

**Example 2:**  
Input: `m = 3, n = 2`  
Output: `3`  
*Explanation: The three unique paths are:  
- Right → Down → Down  
- Down → Down → Right  
- Down → Right → Down*

**Example 3:**  
Input: `m = 7, n = 3`  
Output: `28`  
*Explanation: There are 28 unique ways for the robot to move from (0,0) to (6,2) using only right and down moves.*

### Thought Process (as if you’re the interviewee)  
For a brute-force approach, I could use recursion to try all possible moves, but this would be highly inefficient due to overlapping subproblems.

A more optimal way is to use **dynamic programming (DP)**:
- Each cell (i,j) can be reached either from the cell above (i−1,j) or from the cell on the left (i,j−1).
- The number of unique paths to (i,j) = paths to (i−1,j) + paths to (i,j−1).
- Initialize the first row and first column with 1, as there's only one way to move strictly right (for the first row) or strictly down (for the first column).
- Fill the rest of the grid iteratively using these rules.

To save space, we notice we only need the current and previous rows or even a single 1D array, since each update only requires the value to the left and the current value.

Alternatively, since the robot must move right (n-1) times and down (m-1) times, the number of unique paths is a **combinatorial problem**:  
\[
\text{Unique paths} = \binom{(m+n-2)}{(n-1)}
\]
However, in most interviews, DP implementation is preferred unless stated otherwise.

### Corner cases to consider  
- When either **m** or **n** is 1 (single row or column): only one path exists.
- Very large **m** and **n**: check for integer overflows if using combinatorics.
- Non-square grids (m ≠ n).
- Minimum allowed grid size (e.g., m=n=1).

### Solution

```python
def uniquePaths(m, n):
    # Initialize a 1D DP array where dp[j] is the number of paths to cell (i, j)
    dp = [1] * n  # There's only one way to fill the first row
    
    for i in range(1, m):         # Start from the second row
        for j in range(1, n):     # Start from the second column
            # The number of ways to get to dp[j] is the sum of the ways from
            # the cell above (dp[j]) and from the left cell (dp[j-1])
            dp[j] += dp[j - 1]
    return dp[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m⋅n). We fill every cell in an m × n grid exactly once.
- **Space Complexity:** O(n), since we use a 1D array that only stores one row at a time.

### Potential follow-up questions (as if you’re the interviewer)  

- If some grid cells are obstacles (the robot cannot enter), how do you modify the approach?  
  *Hint: Set dp[i][j]=0 for those cells and continue DP as above.*

- Can you use combinatorics for even faster solution?  
  *Hint: Use binomial coefficients to compute C(m+n−2, m−1).*

- What if moves can also go **diagonally down-right**?  
  *Hint: dp[i][j]=dp[i-1][j]+dp[i][j-1]+dp[i-1][j-1]*

### Summary
This problem uses the **dynamic programming (DP) - grid traversal** pattern. It’s a classic interview favorite and can be found in variations such as "unique paths with obstacles" or "minimum path sum" problems. The solution relies on breaking down a big problem (total paths) into smaller subproblems (paths to each cell) and building up using the relationships between subproblems. This pattern commonly appears in grid-based DP problems, robot movement, word search in a matrix, etc.


### Flashcard
Use DP: unique paths to cell (i,j) = paths from above + paths from left; fill the grid row by row.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
- Unique Paths II(unique-paths-ii) (Medium)
- Minimum Path Sum(minimum-path-sum) (Medium)
- Dungeon Game(dungeon-game) (Hard)
- Minimum Path Cost in a Grid(minimum-path-cost-in-a-grid) (Medium)
- Minimum Cost Homecoming of a Robot in a Grid(minimum-cost-homecoming-of-a-robot-in-a-grid) (Medium)
- Number of Ways to Reach a Position After Exactly k Steps(number-of-ways-to-reach-a-position-after-exactly-k-steps) (Medium)
- Paths in Matrix Whose Sum Is Divisible by K(paths-in-matrix-whose-sum-is-divisible-by-k) (Hard)