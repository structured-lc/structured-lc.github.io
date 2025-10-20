### Leetcode 980 (Hard): Unique Paths III [Practice](https://leetcode.com/problems/unique-paths-iii)

### Description  
You’re given a 2D grid where:
- 1 is the **starting square** (exactly one in the grid),
- 2 is the **ending square** (exactly one in the grid),
- 0 marks **empty squares** you can walk over,
- -1 are **obstacles** you cannot pass.

Find the number of **unique paths** from the start to the end, moving only in 4 directions (up, down, left, right), where:
- Every empty square (i.e., each 0) is visited **exactly once** (and you can't visit it more than once),
- The path must start at 1 and end at 2,
- Obstacles (-1) cannot be visited or crossed,
- You may not go out of grid bounds.

### Examples  

**Example 1:**  
Input: `[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]`  
Output: `2`  
*Explanation:  
There are 2 unique paths that start at 1, visit every 0 exactly once, and end at 2.*

**Example 2:**  
Input: `[[1,0,0,0],[0,0,0,0],[0,0,0,2]]`  
Output: `4`  
*Explanation:  
4 unique paths available since there are no obstacles blocking any route.*

**Example 3:**  
Input: `[[0,1],[2,0]]`  
Output: `0`  
*Explanation:  
No valid path: it’s impossible to walk from 1 to 2 and visit every empty cell exactly once (grid too small and disconnected).*

### Thought Process (as if you’re the interviewee)  
- The naive/brute-force approach is to try all possible permutations of moves from the starting cell, avoiding obstacles and visited cells, and count paths that visit every empty cell exactly once and end at the end cell.
- Use **backtracking** (DFS with state):  
  - Start from the source cell.  
  - At every step, move to adjacent (up, down, left, right) non-obstacle and non-visited cells.  
  - Mark cell as visited before the recursive call, unmark after (backtrack).  
  - Keep track of the total number of empty cells (including the start, excluding obstacles and end).
  - When you reach the end cell, check that you have used every non-obstacle cell exactly once; if so, increment result.
- This approach ensures correctness because we only consider valid states (no revisiting, no stepping on obstacles).
- No need to optimize further (e.g., bitmask DP), because grid size is small (≤20 cells to fill).

### Corner cases to consider  
- Start or end not present, or more than one start/end (invalid input but assumed valid as per constraints)
- All cells are obstacles except start and end (impossible to reach target, should return 0)
- No possible way to cover all empty cells (e.g., some empty cells are separated by obstacles)
- Minimal grid (e.g., 1×2 or 2×1) where unique path is not possible
- Paths that form cycles (should not revisit a cell)

### Solution

```python
def uniquePathsIII(grid):
    rows, cols = len(grid), len(grid[0])
    empty = 0
    sx = sy = 0

    # Count empty cells and locate start
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == 0:
                empty += 1
            elif grid[i][j] == 1:
                sx, sy = i, j

    ans = 0

    def dfs(x, y, remain):
        nonlocal ans
        # If out of bounds or on obstacle, return
        if not (0 <= x < rows and 0 <= y < cols and grid[x][y] >= 0):
            return
        # If it's the end cell
        if grid[x][y] == 2:
            if remain == -1:  # All empty + start cells walked
                ans += 1
            return

        # Temporarily mark cell as visited
        temp = grid[x][y]
        grid[x][y] = -4

        # Explore 4 directions
        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
            dfs(x + dx, y + dy, remain - 1)

        # Backtrack: reset cell to original value
        grid[x][y] = temp

    # Start DFS with remain = number of empty cells + start
    dfs(sx, sy, empty)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(4ⁿ), where n is the number of non-obstacle cells  
   - Because for every cell you can branch in 4 directions, and you must visit each cell only once.
   - Tightest bound in practice is O(k!), k = number of empty + start cells (each permutation attempted once).
- **Space Complexity:** O(k) due to recursion stack (k = number of walkable cells)
   - Uses the grid itself for marking visited, no extra matrix needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is much larger (e.g., 50×50)?  
  *Hint: Can you use bitmask dynamic programming or memoization to store intermediate states?*

- Can you optimize for grids with a very high percentage of obstacles?  
  *Hint: Prune branches early if you detect disconnected regions or use BFS to check connectivity.*

- How would you return the actual paths, not just the count?  
  *Hint: Keep a list for the current path, append to result when a valid path is found.*

### Summary
This approach uses **backtracking and DFS** to enumerate all valid routes from the start cell, visiting every empty cell *exactly once*, and reaching the end. It's a classic stateful traversal problem, similar to "Hamiltonian Path" on a grid. The backtracking pattern is common for permutation and path-counting problems, especially when path-uniqueness or constraints are involved (e.g., Sudoku, word search, N-Queens).


### Flashcard
Use backtracking DFS to explore all paths from start to end, visiting each empty cell exactly once and counting valid paths.

### Tags
Array(#array), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Matrix(#matrix)

### Similar Problems
- Sudoku Solver(sudoku-solver) (Hard)
- Unique Paths II(unique-paths-ii) (Medium)
- Word Search II(word-search-ii) (Hard)