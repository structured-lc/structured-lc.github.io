### Leetcode 2435 (Hard): Paths in Matrix Whose Sum Is Divisible by K [Practice](https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k)

### Description  
Given a grid (a 2D integer matrix) with m rows and n columns, and an integer k, find **the number of distinct paths from the top-left (0,0) to the bottom-right (m-1, n-1) where you only move right or down, and the sum of all values along the path is divisible by k**.  
Return the answer modulo 10⁹+7 because the output can be very large.

### Examples  

**Example 1:**  
Input: `grid = [[5,2,4],[3,0,5],[0,7,2]]`, `k = 3`  
Output: `2`  
Explanation:  
There are two paths from (0,0) to (2,2) whose sum is divisible by 3:  
- Path 1: 5→2→0→7→2, sum = 16, 16 % 3 = 1 (not achievable, see next)  
- Path 2: 5→2→4→5→2, sum = 18, 18 % 3 = 0  
- Path 3: 5→3→0→7→2, sum = 17, 17 % 3 = 2  
- Two possible valid paths give the correct modulus.  

**Example 2:**  
Input: `grid = [[0,0]], k = 5`  
Output: `1`  
Explanation:  
There is only one path, (0,0)→(0,1), sum = 0. 0 % 5 = 0, so answer is 1.

**Example 3:**  
Input: `grid = [[7,1,3],[2,5,2],[4,6,1]]`, `k = 4`  
Output: `0`  
Explanation:  
There are no paths whose sum is divisible by 4.


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible paths from (0,0) to (m-1,n-1), summing path values, and count when sum % k == 0. But number of paths is exponentially large (approximately 2^(m+n)), so brute force is not practical.
- **Optimization:**
  - Notice that the sum’s remainder modulo k is all that matters at each cell.
  - For each cell (i,j) and a remainder rem, store the number of ways to reach (i,j) with sum % k == rem.
  - Use DP: dp[i][j][rem] = number of ways to reach (i,j), current path sum % k == rem.
  - For each cell, update from top or left (down or right moves only).
  - At each step, when moving into (i,j), update the new remainder: new_rem = (rem + grid[i][j]) % k.
  - The answer is dp[m-1][n-1], ways to end at (m-1, n-1) with sum divisible by k.
- **Why this works?** For each prefix path, only remainder and position matter, so DP prevents recomputation.

### Corner cases to consider  
- Grid has only one cell.
- k = 1 (all paths should be valid, since any number % 1 == 0).
- Cell values can be zero, negative, or very large.
- Multiple paths with the same sum.
- Large grids to check performance.

### Solution

```python
def numberOfPaths(grid, k):
    MOD = 10**9 + 7
    m, n = len(grid), len(grid[0])
    
    # dp[i][j][rem] = #ways to reach (i,j) with sum % k == rem
    dp = [[[0 for _ in range(k)] for _ in range(n)] for _ in range(m)]
    dp[0][0][grid[0][0] % k] = 1  # Initialize starting cell
    
    for i in range(m):
        for j in range(n):
            for rem in range(k):
                current = dp[i][j][rem]
                if current == 0:
                    continue
                # move down
                if i + 1 < m:
                    new_rem = (rem + grid[i+1][j]) % k
                    dp[i+1][j][new_rem] = (dp[i+1][j][new_rem] + current) % MOD
                # move right
                if j + 1 < n:
                    new_rem = (rem + grid[i][j+1]) % k
                    dp[i][j+1][new_rem] = (dp[i][j+1][new_rem] + current) % MOD
    return dp[m-1][n-1][0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × k)  
  - For each cell (m × n), we loop over possible remainders (k), and for each, process two directions (right, down).
- **Space Complexity:** O(m × n × k)  
  - We maintain a 3D DP table of size m × n × k.

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal moves are allowed as well?  
  *Hint: Extend DP transitions to diagonal neighbors.*

- Can you optimize space?  
  *Hint: Use two layers (previous and current rows) since transitions only depend on immediate neighbors.*

- What if cell values can be negative?  
  *Hint: Be careful with Python’s modulo behavior for negative numbers. Use (rem + k) % k to guarantee remainder is between 0 and k-1.*

### Summary
This is a classic **dynamic programming on grid** problem with an extra state dimension (modulo sum). The main pattern is **DP with extra state** (value modulo k), where only the current sum's remainder affects future state. This pattern appears in problems with "modulo constraint" on path or subsequence problems, such as subset sum modulo, or counting paths with parity or divisibility constraints. Common optimizations involve reducing DP dimensions when only recent rows/columns matter.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Unique Paths(unique-paths) (Medium)
- Unique Paths II(unique-paths-ii) (Medium)
- Minimum Path Sum(minimum-path-sum) (Medium)
- Dungeon Game(dungeon-game) (Hard)
- Cherry Pickup(cherry-pickup) (Hard)
- Shortest Path in Binary Matrix(shortest-path-in-binary-matrix) (Medium)
- Minimum Cost Homecoming of a Robot in a Grid(minimum-cost-homecoming-of-a-robot-in-a-grid) (Medium)
- Check if There is a Path With Equal Number of 0's And 1's(check-if-there-is-a-path-with-equal-number-of-0s-and-1s) (Medium)