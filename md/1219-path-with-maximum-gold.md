### Leetcode 1219 (Medium): Path with Maximum Gold [Practice](https://leetcode.com/problems/path-with-maximum-gold)

### Description  
You are given an **m × n** grid representing a gold mine. Each cell contains either a positive integer (the amount of gold) or zero (no gold).  
**Rules:**
- You can **start and stop at any cell that contains gold** (nonzero).
- From a cell, you can move **one step up, down, left, or right** to another cell.
- You **cannot visit the same cell twice** in a path.
- You **cannot visit or pass through cells with zero gold**.
- At each cell, you **collect** all the gold in that cell.

Return the **maximum gold** you can collect following these rules.


### Examples  

**Example 1:**  
Input: `grid = [[0,6,0],[5,8,7],[0,9,0]]`  
Output: `24`  
*Explanation: Start at (1,1) with 8 → right to (1,2) (7) → down to (2,1) (9). Total: 8 + 7 + 9 = 24.*

**Example 2:**  
Input: `grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]`  
Output: `28`  
*Explanation: Start at (3,1) with 3 → up to (2,1) (4) → right to (2,2) (5) → down to (3,2) (0, invalid) → up to (1,2) (6) → up to (0,2) (7). Path: 3 + 4 + 5 + 6 + 7 + 3 = 28.*

**Example 3:**  
Input: `grid = [[0,0,0],[0,0,0],[0,0,0]]`  
Output: `0`  
*Explanation: No gold to collect.*


### Thought Process (as if you’re the interviewee)  
Since we can start and stop anywhere with gold, and only move up/down/left/right, this is a **search problem** across all gold cells.  
- My first idea is to try all possible starting locations and **explore all paths** from there, collecting gold and marking cells as visited.
- A brute-force solution would be to try every path from every gold cell using either DFS or BFS, avoiding cells already visited and zeros.  
- Since the board can be small (≤25×25 usually), a recursive DFS/backtracking approach is feasible.
- For each gold cell, attempt to move in four directions, marking cells visited by temporarily setting their value to 0, undoing afterwards for backtracking.
- Keep track of the maximum gold collected across all possible paths.

This approach is preferred because:
- It cleanly explores all potential maximal paths.
- Extra space used is minimal; everything can be done in-place.
- No cycles, since cells can't be revisited.


### Corner cases to consider  
- **All zeros**: No gold anywhere.
- **Single gold cell**: Only one cell with gold; max is that cell's value.
- **Disconnected gold islands**: Gold is isolated, so only small clusters can be collected at once.
- **Long snake**: Path is only along a line, must not revisit.
- **Edge gold**: Paths that hug the border of the grid.
- **Grid with all gold**: All cells are gold (maximal path).
- **Single row/column grid**.


### Solution

```python
def getMaximumGold(grid):
    # Directions: right, down, left, up
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    rows = len(grid)
    cols = len(grid[0])
    res = 0

    def dfs(r, c):
        # Gather gold at current cell, mark as visited (set to 0)
        gold = grid[r][c]
        grid[r][c] = 0
        max_path = 0
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            # Check bounds + must be unvisited and contain gold
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] > 0:
                max_path = max(max_path, dfs(nr, nc))
        # Backtrack: unmark this cell
        grid[r][c] = gold
        return gold + max_path

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] > 0:
                res = max(res, dfs(r, c))
    return res
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × 4ᵏ) where k = number of nonzero cells (worst case explores all paths from all starting points, each path tries up to 4 directions at each step).
- **Space Complexity:** O(k) where k = max path length, for the recursion stack and marking visited in-place.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you can move diagonally as well?
  *Hint: Add four more directions to your recursive step.*

- How would you handle grids too large for brute-force DFS?
  *Hint: Consider dynamic programming or pruning, or limit depth/search by memoization.*

- What if the grid is mutable and gold respawns over time?
  *Hint: Think about recalculating or updating only affected regions when gold appears/disappears.*


### Summary
This problem is a classic example of **backtracking/DFS** with pruning.  
- You recursively explore all valid paths while marking and unmarking visited cells to avoid cycles.
- This pattern is common for **grid traversal** problems (e.g., word search, island count, robot movement) and is broadly applicable wherever you need to enumerate all solutions with path constraints.