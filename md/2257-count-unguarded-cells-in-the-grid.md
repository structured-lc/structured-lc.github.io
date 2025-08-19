### Leetcode 2257 (Medium): Count Unguarded Cells in the Grid [Practice](https://leetcode.com/problems/count-unguarded-cells-in-the-grid)

### Description  
Given an m × n grid with some cells containing **guards** and some containing **walls**, count the number of unguarded, unoccupied cells. A guard can "see" any number of cells in the four cardinal directions from its position—up, down, left, right—unless its view is blocked by a wall or another guard. Guards and walls themselves are considered “occupied” and never unguarded.

**Your task:**  
Return the number of unoccupied cells that are **not guarded**.

### Examples  

**Example 1:**  
Input: `m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]`  
Output: `9`  
*Explanation:*
- Place guards and walls as marked in a 4×6 grid.
- For each guard, mark all cells in each of the 4 directions until you hit a wall/another guard/grid edge.
- Count the number of cells that are neither occupied (by guard/wall) nor covered by any guard. That is 9.

**Example 2:**  
Input: `m = 3, n = 3, guards = [[0,0],[2,2]], walls = [[1,1]]`  
Output: `4`  
*Explanation:*
- After marking guard surveillance and walls, there are 4 empty cells not seen by any guard and not occupied.

**Example 3:**  
Input: `m = 1, n = 2, guards = [[0,0]], walls = [[0,1]]`  
Output: `0`  
*Explanation:*
- Both cells are occupied—one by a guard, one by a wall. No unobserved spaces remain.

### Thought Process (as if you’re the interviewee)  
Start by simulating what a guard can see:  
- For each guard, look left, right, up, and down. Keep moving in that direction, marking cells “guarded”, until you run out of grid, hit a wall, or another guard.
- Make sure to distinguish between empty, guarded, wall, and guard cells.
- After the marking step, count how many empty cells remain unguarded and unoccupied.

Brute-force:  
- For each guard, scan in all 4 directions (O(m+n) per guard), marking guarded cells as you go.
- Track each cell's state in a grid: 0 = empty, 1 = guarded, 2 = guard, 3 = wall.

Optimizations:  
- Use a state grid to avoid redundant marking and avoid rescanning the same cell from different guards.
- For better cache-friendliness and code clarity, scan rows/columns fully per direction.

Trade-off:  
- Time is O(m×n), as we must check every cell.
- Space is O(m×n) for the grid, but required for this simulation.

### Corner cases to consider  
- All cells are walls or guards (so output is 0)
- No guards: every empty (non-wall, non-guard) cell is unguarded
- No walls: guards can look across the grid
- Guards/walls on the edge or in the same row/col
- Overlapping guard vision
- Minimum grid sizes (e.g., 1×1, 1×n)
- Multiple guards/walls at same coordinates

### Solution

```python
def countUnguarded(m, n, guards, walls):
    # 0: empty, 1: guarded, 2: guard, 3: wall
    grid = [[0] * n for _ in range(m)]

    # Place guards and walls
    for r, c in guards:
        grid[r][c] = 2
    for r, c in walls:
        grid[r][c] = 3

    # Directions: up, down, left, right
    DIRS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for r, c in guards:
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            # Mark cells in line of sight
            while 0 <= nr < m and 0 <= nc < n:
                if grid[nr][nc] == 3 or grid[nr][nc] == 2:
                    break
                if grid[nr][nc] == 0:
                    grid[nr][nc] = 1
                nr += dr
                nc += dc

    # Count unguarded, unoccupied cells
    res = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 0:
                res += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n).  
  Each guard, in worst case (no walls), could guard a linear number of cells per direction (at most m in a column/up-down, n in a row/left-right). But each cell is marked as guarded at most once, so total work per cell is constant, overall O(m×n).

- **Space Complexity:** O(m×n) for the grid, used to store the state of each cell.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are K types of guards with different viewing directions/ranges?  
  *Hint: Store “guard capabilities” and adapt the direction marking loop.*

- How to efficiently update if a wall/guard is added/removed later (online processing)?  
  *Hint: Explore using interval trees or segment trees per row/column, or reprocess vision lines only around updated cell.*

- Can this be solved without extra O(m×n) memory?  
  *Hint: Could encode the state in-place using bit flags, or process row-by-row using only guard positions.*

### Summary
This problem uses grid simulation and **multi-source scanline**: for each source (guard), mark visibility outwards until an obstacle is hit. Patterns used include grid state marking, multi-directional scanning, and in-place state update. The core logic—scanning in four directions from marked points until barriers are encountered—is a pattern also useful in ray casting simulations, visibility/illumination problems, or robot vacuum cleaner/path coverage algorithms.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Bomb Enemy(bomb-enemy) (Medium)
- Available Captures for Rook(available-captures-for-rook) (Easy)