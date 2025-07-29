### Leetcode 2814 (Hard): Minimum Time Takes to Reach Destination Without Drowning [Practice](https://leetcode.com/problems/minimum-time-takes-to-reach-destination-without-drowning)

### Description  
You are given a 2D grid where:
- 'S' is your starting position,
- 'D' is your destination,
- '.' is an empty cell you can walk on,
- 'X' is a stone you can never walk on,
- '*' is a flooded cell (impassable, and you drown if you move onto it).

Every second:
- You may move to an adjacent (up/down/left/right) empty cell.
- Then, **any empty cell adjacent to a flooded cell ('*') becomes flooded** for the next second.
- You cannot move onto a cell that is being flooded at that same moment.
- You must reach 'D' before you get trapped or drowned.
Return the minimum time (seconds) to reach 'D' from 'S' before water overtakes your path, or -1 if not possible.

### Examples  

**Example 1:**  
Input:  
```
["S..",
 ".X*",
 "...",
 "..D"]
```  
Output: `5`  
*Explanation: Start at (0,0). Reach (3,2) in 5 moves before flood spreads to block your route.*

**Example 2:**  
Input:  
```
["S*.",
 "X..",
 "..D"]
```  
Output: `-1`  
*Explanation: The only open path gets flooded too quickly for you to reach 'D'.*

**Example 3:**  
Input:  
```
["S.*",
 "X..",
 "..D"]
```  
Output: `4`  
*Explanation: You must carefully avoid the flood; the quickest route to 'D' takes 4 seconds.*

### Thought Process (as if you’re the interviewee)  
First, brute-force would be to simulate step by step: at every second, try all possible moves and expand the flooded cells, but that's too slow.

This is a classic shortest-path problem with a dynamic/expanding hazard (the floods). A good strategy is:
- Precompute, for each cell, **when does it get flooded** (if ever).
- Use BFS from the starting point 'S', but at each step only allow visiting a cell at time `t` if you arrive **before the flood** reaches that cell.
- The BFS state is `(row, col, current_time)`.

To precompute the flood time for each cell, perform a BFS from all initial flooded '*' cells. For each cell, store the earliest second it will be flooded.

Run a second BFS from 'S', for each cell do not step in if arrival time is not less than flood time, and avoid obstacles 'X'.  
This two-phase BFS ensures shortest path with respect to the flooding hazard.

If the destination 'D' is reached, return the time. If BFS exhausts without reaching 'D', it's impossible: return -1.

Chose this approach because BFS naturally gives the shortest path and the precomputation of flooding times efficiently avoids per-step simulation.

### Corner cases to consider  
- The starting cell is immediately next to a flood.
- The destination cell 'D' is surrounded by stones or water.
- The flood never reaches 'D' (guaranteed by problem).
- Multiple starting flood '*' cells.
- Grid with no flood at all.
- Very narrow corridors.
- The path gets cut off by flood before you can cross.
- Path requires waiting (not optimal here, but care for off-by-one flood).

### Solution

```python
from collections import deque

def minimum_seconds_to_destination(grid):
    # Convert grid to list of lists
    rows, cols = len(grid), len(grid[0])
    g = [list(r) for r in grid]

    # Directions: up, down, left, right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]

    # Step 1: Precompute flood time for each cell using BFS from all '*' cells
    flood_time = [[float('inf')] * cols for _ in range(rows)]
    q = deque()
    for r in range(rows):
        for c in range(cols):
            if g[r][c] == '*':
                flood_time[r][c] = 0
                q.append((r, c, 0))

    while q:
        r, c, t = q.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if (0 ≤ nr < rows and 0 ≤ nc < cols and
                g[nr][nc] == '.' and flood_time[nr][nc] == float('inf')):
                flood_time[nr][nc] = t + 1
                q.append((nr, nc, t+1))

    # Step 2: BFS from S to D, avoid water and stones, don't step into a cell at time ≥ its flood_time
    for r in range(rows):
        for c in range(cols):
            if g[r][c] == 'S':
                start = (r, c)
            if g[r][c] == 'D':
                dest = (r, c)

    visited = [[False]*cols for _ in range(rows)]
    q = deque()
    q.append((start[0], start[1], 0))
    visited[start[0]][start[1]] = True

    while q:
        r, c, t = q.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if (0 ≤ nr < rows and 0 ≤ nc < cols):
                if (g[nr][nc] == 'D'):
                    return t + 1
                if (g[nr][nc] == '.' and
                    not visited[nr][nc] and
                    flood_time[nr][nc] > t + 1):
                    visited[nr][nc] = True
                    q.append((nr, nc, t + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n) for each BFS (flood and shortest path) where m = rows, n = cols, total O(m × n). Each cell is visited at most twice (once per BFS).  
- **Space Complexity:**  
  O(m × n) for the flood_time and visited arrays, and O(m × n) for BFS queue in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the flood spreads diagonally?
  *Hint: Adjust directions in both BFS to include diagonals.*

- What if you can move onto the cell at the exact moment it gets flooded?
  *Hint: Carefully analyze simultaneous step and flood expansion order.*

- How would you handle a dynamically changing grid size (infinite grid)?
  *Hint: Use a set for visited and bounds checks, avoid arrays sized by grid.*

### Summary
This is a **two-phase BFS** algorithm:
- First BFS precomputes when each cell will be flooded.
- Second BFS finds the shortest safe path from 'S' to 'D', avoiding entering a cell after it floods.
This is a classical pattern for grid problems with "dynamic hazard"—applicable to other pathfinding under spreading obstacles (like fire, poison, etc.).