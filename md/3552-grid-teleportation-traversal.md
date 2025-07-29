### Leetcode 3552 (Medium): Grid Teleportation Traversal [Practice](https://leetcode.com/problems/grid-teleportation-traversal)

### Description  
Given an m × n grid where:
- Each cell is either:
  - **'.'**: an empty cell  
  - **'#'**: an obstacle (cannot walk through)
  - **'A'-'Z'**: a *portal* letter (teleportation portal; there may be multiple portals with the same letter)
- You **start at (0, 0)** (top-left cell) and need to **reach (m-1, n-1)** (bottom-right cell).
- Each move, you can go **up, down, left, or right** to an adjacent cell **if it’s in-bounds and not an obstacle**.
- If you step onto a **portal cell** and have **not used that letter’s teleportation yet**, you can *instantly* jump to any other cell with the same letter (anywhere in the grid) — but **each portal letter can only be used for teleportation once** for your entire journey.
- The goal: **find the minimum number of moves** required to go from top-left to bottom-right. If it’s impossible, return -1.

### Examples  

**Example 1:**  
Input:  
grid =  
```
["A..",
 ".#B",
 "..A"]
```  
Output: `3`  
Explanation:  
Start at (0,0):  
- Move to (1,0)  
- Move to (2,0)  
- Step on (2,0) = '.'  
- Move to (2,1), then (2,2)  
But we can use portal 'A': from (0,0) teleport instantly to (2,2) and then one move left to (2,1) and then (2,2), for **a shorter route in 3 moves**.

**Example 2:**  
Input:  
grid =  
```
["A#A",
 ".#.",
 "A#A"]
```  
Output: `-1`  
Explanation:  
All paths from (0,0) to (2,2) are blocked by obstacles (#). Even with portals, you can’t reach the bottom-right.

**Example 3:**  
Input:  
grid =  
```
["A.B",
 "...",
 "B.A"]
```  
Output: `3`  
Explanation:  
- Start at (0,0), use portal 'A' to teleport to (2,2) (finish). 0 moves for teleport, but start counts as a step, so answer is **3** steps after BFS.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible paths (DFS for every combination), track used portals, prune cycles — but far too slow (combinatorial explosion).
- **Optimal**: Use **BFS**, because we want the shortest path on uniform-weight grid.  
  - For every cell, track the state: position ⟶ (i, j), **plus which portal letters have been used so far**.
  - The *state* is (i, j, portal_used_bitmask): portal_used is a 26-bit integer (since only A-Z).
  - For each cell:
    - Try moving in 4 directions if not obstacle.
    - If current cell is a portal, and we haven’t used this portal letter, try teleporting to all other cells with the same letter (don't count as a move); then mark that portal letter as used, to avoid reusing.
  - To avoid cycles, mark (i, j, portal_used_bitmask) as visited.
- **Trade-offs**: Key is to track *state* both by position and portal usage, else we’ll over-count or revisit states.

### Corner cases to consider  
- Start/end positions are obstacles: return -1.
- All cells are obstacles except the start (no path).
- A portal exists only once (no teleport option for that letter).
- Multiple portal letters vs. only one portal letter.
- Use of a portal not always optimal.
- Minimum-size grids (1×1, 1×n, n×1).
- Adjacent portals with same letter.
- Using teleport *prevents* using a better regular path.

### Solution

```python
from collections import deque, defaultdict

def min_moves_to_reach_end(grid):
    if not grid or not grid[0]:
        return -1

    m, n = len(grid), len(grid[0])
    # Make sure start and end cells are not obstacles
    if grid[0][0] == '#' or grid[m-1][n-1] == '#':
        return -1

    # Pre-calculate all portal locations for each letter
    portal_cells = defaultdict(list)
    for r in range(m):
        for c in range(n):
            ch = grid[r][c]
            if ch.isalpha():
                portal_cells[ch].append((r, c))
                
    # BFS: (row, col, used_portal_mask)
    start_mask = 0  # 26 bits for 'A'-'Z'
    queue = deque()
    queue.append((0, 0, start_mask, 0))  # row, col, used_portals_bitmask, steps
    visited = set()
    visited.add((0, 0, start_mask))

    while queue:
        row, col, mask, steps = queue.popleft()
        if (row, col) == (m-1, n-1):
            return steps
        # Move in 4 directions
        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            nr, nc = row + dr, col + dc
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != '#':
                state = (nr, nc, mask)
                if state not in visited:
                    visited.add(state)
                    queue.append((nr, nc, mask, steps + 1))
        # Try portal teleport
        ch = grid[row][col]
        if ch.isalpha():
            idx = ord(ch) - ord('A')
            if not (mask & (1 << idx)):
                # Use teleport: go to all other same-letter portals
                for pr, pc in portal_cells[ch]:
                    if (pr, pc) != (row, col):
                        new_mask = mask | (1 << idx)
                        state = (pr, pc, new_mask)
                        if state not in visited:
                            visited.add(state)
                            queue.appendleft((pr, pc, new_mask, steps))  # Teleport: same step count
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m \* n \* 2²⁶) in the worst case, because for each cell, the portal-used state can vary over 2²⁶ bitmasks. In practical grids, the number of unique portals is usually much smaller, so it’s faster in practice.
- **Space Complexity:** O(m \* n \* 2²⁶) for the visited set, and portal dictionary. The queue can grow similarly in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can use every portal **multiple times**?  
  *Hint: You’d drop portal usage from state tracking. BFS becomes faster.*

- What if teleporting **costs a move** (just like walking)?  
  *Hint: When teleporting, increment steps; BFS structure stays similar.*

- What if you need to **return the actual path**, not just the move count?  
  *Hint: Store parent pointers in BFS and reconstruct the path backwards.*

### Summary
We used **0-1 BFS** with state = (cell position, portals used mask) because each portal can be used only once and teleportation is “free”. The key coding pattern is **BFS with stateful visited tracking**, common in grid shortest path problems with power-ups, keys, or other stateful objects. This approach is robust for stateful graph search and also appears in puzzles, mazes with keys/doors, and similar game-style search problems.