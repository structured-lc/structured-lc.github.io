### Leetcode 576 (Medium): Out of Boundary Paths [Practice](https://leetcode.com/problems/out-of-boundary-paths)

### Description  
You are given an m × n grid and a ball, starting at position (startRow, startColumn). You are allowed to move the ball at most maxMove times. Each move, the ball can travel one cell up, down, left, or right. Calculate *how many distinct paths* will take the ball out of the grid boundary within maxMove moves. Once the ball moves outside the grid, that's counted as a path and the process stops for that path. Return the total number modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0`  
Output: `6`  
*Explanation: The ball can exit the grid in 6 ways in at most 2 moves, such as by moving up or left in the first move, or down/right and then up/left in the second move.*

**Example 2:**  
Input: `m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1`  
Output: `12`  
*Explanation: There are 12 possible paths to move the ball out of the grid within 3 moves, starting from (0,1).*

**Example 3:**  
Input: `m = 3, n = 3, maxMove = 0, startRow = 1, startColumn = 1`  
Output: `0`  
*Explanation: No moves are allowed, so the ball stays inside the grid and no path escapes.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force idea:** Try every possible path using recursion. For each move, branch in all four directions. As soon as the ball goes out of bounds, count it as a successful path. Stop if maxMove hits zero.
    - **Downside:** Exponential time. Too slow for grids up to 50×50 and maxMove up to 50.

- **Optimization:** Notice that many subproblems repeat: The number of ways to escape from (row, col, moves left) is the same if you ever get to that cell with that move count, regardless of path. Use **Memoization (Top-Down DP)**: Cache the answer for each (moveLeft, row, col).

- **Further Optimization:** Can use **Bottom-Up DP (tabulation)**. Build rows for each number of moves left, update cells by looking up what happens in previous move "layers", accumulating boundary escapes.

- **Why Top-Down DP/Memoization?**  
    - Very natural, easy to code, and no need to manage large state arrays manually.  
    - Tradeoff: Recursion stack size O(maxMove × m × n).

- **Why Bottom-Up DP?**  
    - Prevents recursion stack overflow.  
    - Good fit when maxMove, m, n are small (all ≤ 50).
    - Slightly more space-efficient (eliminate DP for earlier steps).

### Corner cases to consider  
- m or n = 1 (single row/column grid)
- maxMove = 0 (no moves allowed)
- startRow/startColumn already at boundary (can escape on first move)
- Large values of maxMove, m, n (test efficiency and overflow)
- No possible escape (surrounded by grid and too few moves)
- Paths that revisit the same cell

### Solution

```python
# Problem constants
MOD = 10**9 + 7

def findPaths(m, n, maxMove, startRow, startColumn):
    # Memoization cache for (row, col, moves_left)
    dp = {}
    
    def dfs(row, col, moves_left):
        # If out of bounds: successful escape path!
        if row < 0 or row >= m or col < 0 or col >= n:
            return 1
        # No moves left: can't escape from here
        if moves_left == 0:
            return 0
        # Check cache
        key = (row, col, moves_left)
        if key in dp:
            return dp[key]
        
        ways = 0
        # Four directions
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            ways = (ways + dfs(row + dr, col + dc, moves_left - 1)) % MOD
        
        dp[key] = ways
        return ways
    
    return dfs(startRow, startColumn, maxMove)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × maxMove)  
    - There are at most m × n × (maxMove+1) unique (row, col, moves_left) states. Each is computed once due to memoization.

- **Space Complexity:** O(m × n × maxMove)  
    - Due to the memoization cache and the recursion stack (which can go up to maxMove depth).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you optimize for only counting paths starting at the *boundary*?
  *Hint: Think about if you could precompute escape potential by layer/backward stepwise.*

- How would the solution change if movement in some directions was not allowed?
  *Hint: Customize the "directions" array.*

- If the ball can revisit the same cell multiple times, is your memoization still valid?
  *Hint: Yes—since state is only (position, moves left), path memory not needed.*

### Summary
This problem uses the classic **DFS with memoization (Top-Down DP for grid state)** pattern. It's a standard "count all paths under constraints" problem, which appears often in grid walks, robot movement, and board games like chess. The idea of encoding the state by (cell, remaining moves) and caching results is powerful and broadly applicable to any path-counting or minimum-step problems on grids with limited actions.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Knight Probability in Chessboard(knight-probability-in-chessboard) (Medium)
- Execution of All Suffix Instructions Staying in a Grid(execution-of-all-suffix-instructions-staying-in-a-grid) (Medium)