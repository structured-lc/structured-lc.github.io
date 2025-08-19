### Leetcode 1706 (Medium): Where Will the Ball Fall [Practice](https://leetcode.com/problems/where-will-the-ball-fall)

### Description  
Given an m × n grid representing a box, each cell contains a 'diagonal' board (either 1 or -1):  
- `1` means the board redirects the ball to the right,  
- `-1` means the board redirects the ball to the left.

You drop n balls — one from the top of each column (column 0 through n-1).  
For each ball, simulate its fall:  
- At every row, the ball gets redirected by the cell’s board.
- If it moves right but is at the right edge, or if it moves left but is at the left edge, or if it enters a "V" pattern (adjacent boards forming walls), the ball gets stuck.
- Otherwise, it continues to the next row, possibly moving left or right.
  
Return an array where the iᵗʰ element is the column where the iᵗʰ ball falls out at the bottom, or -1 if it's stuck.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]`  
Output: ` [1,-1,-1,-1,-1] `
*Explanation:*
- Ball 0: path is right, right, left, right, left → exits at column 1.
- Ball 1: path immediately gets stuck in a "V" at the second row.
- Balls 2 to 4: all get stuck — either by hitting sidewalls or forming a "V".

**Example 2:**  
Input: `grid = [[-1]]`  
Output: ` [-1] `
*Explanation:*
- Ball 0: tries to move left from column 0, out of bounds → stuck.

**Example 3:**  
Input: `grid = [[1,1,1,1,1,1],[ -1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[ -1,-1,-1,-1,-1,-1]]`  
Output: ` [0,1,2,3,4,5] `
*Explanation:*
- Each ball zigzags down but always stays within the columns. None get stuck.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each ball starting at column j, simulate its trajectory row by row. At each step, check the direction:
  - If grid[row][col] == 1, check if col+1 is valid and if grid[row][col+1] also == 1.  
  - If grid[row][col] == -1, check if col-1 is valid and if grid[row][col-1] also == -1.  
  If not, the ball is stuck; otherwise, move accordingly.
- **Why not dynamic programming?**  
  The balls move independently, and each path depends only on state (row, col) at each moment.
- **Optimized approach:**  
  Simulation is \( O(m \times n) \) — for each of n balls, simulate at most m steps. This is efficient enough for problem constraints.

### Corner cases to consider  
- Empty grid (m = 0 or n = 0)
- Grid of size 1 × 1
- Ball is immediately redirected off the grid (sidewalls)
- "V" shaped blockage: grid[row][col] = 1 and grid[row][col+1] = -1, or grid[row][col] = -1 and grid[row][col-1] = 1
- Multiple consecutive rows of same direction
- Large grid, all boards point to one side
- Balls never get stuck (all output valid)

### Solution

```python
def findBall(grid):
    m, n = len(grid), len(grid[0])
    answer = [-1] * n  # Initialize output: -1 means stuck

    for start_col in range(n):
        col = start_col
        for row in range(m):
            dir = grid[row][col]
            next_col = col + dir
            # Check if next move is out of bounds
            if next_col < 0 or next_col >= n:
                col = -1  # stuck
                break
            # Check for "V" shape blockage
            if grid[row][next_col] != dir:
                col = -1
                break
            # Move ball to next cell
            col = next_col
        if col != -1:
            answer[start_col] = col  # Ball exits at this column
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n), since each of the n balls visits at most m rows.

- **Space Complexity:**  
  O(n): output array; no other significant storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a much larger grid where m or n is up to 10⁵?  
  *Hint: Is it possible to precompute "endings" for certain columns?*

- Can you optimize space if you are only allowed to use O(1) extra beyond input and output?  
  *Hint: Output can be written in place for each column, but you must simulate for each ball.*

- How would you modify the solution to also return the specific path for each ball until it gets stuck or exits?  
  *Hint: Trace and record the visited (row, col) cells for each ball.*

### Summary
This problem is a classic simulation pattern: follow the state for each unit (ball) step by step through a grid, making decisions based on cell content and neighbors. The approach applies to grid navigation, physics simulations, and path prediction problems. Recognizing early-exit conditions and "local neighborhood" blockages is generally useful in similar matrix/grid pathfinding problems.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
