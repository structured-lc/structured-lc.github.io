### Leetcode 1263 (Hard): Minimum Moves to Move a Box to Their Target Location [Practice](https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location)

### Description  
Given a 2D grid representing a warehouse with walls (`#`), empty spaces (`.`), one **box** (`B`), one **target** (`T`), and one **player** (`S`), your goal is to determine the **minimum number of pushes** needed for the player to move the box onto the target location.  
- The player can move in four directions (up, down, left, right) on empty cells only.
- The player **cannot move through walls or the box**.
- To push the box, the player must stand on a cell adjacent to the box and move towards the box, pushing it into a free cell.
- Only **pushes** (not the player's movement) count as moves.  
Return the minimum number of pushes required, or -1 if it is impossible.

### Examples  

**Example 1:**  
Input:  
```
grid = [["#","#","#","#","#","#"],
        ["#","T","#","#","#","#"],
        ["#",".",".","B",".","#"],
        ["#",".","#","#",".","#"],
        ["#",".",".",".","S","#"],
        ["#","#","#","#","#","#"]]
```
Output: `3`  
Explanation:  
- Player moves to the left of the box, pushes right (1)
- Moves above the box, pushes down (2)
- Moves left of the box, pushes right to the target (3)

**Example 2:**  
Input:  
```
grid = [["#","#","#","#","#","#"],
        ["#","T","#","#","#","#"],
        ["#",".",".","B",".","#"],
        ["#","#","#","#",".","#"],
        ["#",".",".",".","S","#"],
        ["#","#","#","#","#","#"]]
```
Output: `-1`  
Explanation:  
- The box is blocked by walls and cannot reach the target.

**Example 3:**  
Input:  
```
grid = [["#","#","#","#","#","#"],
        ["#","T",".",".","#","#"],
        ["#",".","#","B",".","#"],
        ["#",".",".",".",".","#"],
        ["#",".",".",".","S","#"],
        ["#","#","#","#","#","#"]]
```
Output: `5`  
Explanation:  
- Pushes sequence: down, left, left, up, up.

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to simulate every possible sequence of moves the player can make, keeping track of their position, the box's position, and how many pushes have been made. This quickly becomes unmanageable due to the vast number of combinations.  
To optimize, the key insight is to focus on **minimal pushes**, not player's steps. So, we treat each state as a pair: (box position, player position), and use **BFS** to explore states in increasing number of box pushes.  
- At each step, if the player can get next to the box in a certain position, from there a push is possible (if the new box location is empty).  
- We'll need a BFS inside a BFS: one to check if the player can reach the needed position without moving the box; the other is the main search over box and player positions and number of pushes.  
- Each state can be represented as (box_row, box_col, player_row, player_col).  
This avoids unnecessary repetitions and guarantees searching for the shortest sequence of pushes.

### Corner cases to consider  
- The box or player is surrounded by walls.
- The box is initially on the target.
- No path exists for the player to ever get behind the box.
- Player starts on the box or target position.
- Multiple possible ways to reach the target: need minimum **number of pushes** (not minimal player walking steps).

### Solution

```python
from collections import deque

def min_push_box(grid):
    # Directions: [Up, Down, Left, Right]
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    m, n = len(grid), len(grid[0])

    # Find initial positions for box, player, and target
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 'S':
                player = (i, j)
            elif grid[i][j] == 'B':
                box = (i, j)
            elif grid[i][j] == 'T':
                target = (i, j)

    def in_bounds(x, y):
        return 0 <= x < m and 0 <= y < n and grid[x][y] != '#'

    # Check if the player can reach (tx, ty) from (sx, sy) without crossing the box
    def can_reach(sx, sy, tx, ty, box_x, box_y):
        visited = [[False]*n for _ in range(m)]
        dq = deque()
        dq.append((sx, sy))
        visited[sx][sy] = True
        while dq:
            x, y = dq.popleft()
            if (x, y) == (tx, ty):
                return True
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                # Can't walk over box or walls
                if in_bounds(nx, ny) and not visited[nx][ny] and (nx, ny) != (box_x, box_y):
                    visited[nx][ny] = True
                    dq.append((nx, ny))
        return False

    # BFS to find minimum number of pushes
    dq = deque()
    dq.append( (box[0], box[1], player[0], player[1], 0) )
    visited = set()
    visited.add( (box[0], box[1], player[0], player[1]) )

    while dq:
        bx, by, px, py, pushes = dq.popleft()
        if (bx, by) == target:
            return pushes
        for dx, dy in dirs:
            nbx, nby = bx + dx, by + dy
            pxx, pyy = bx - dx, by - dy  # The cell where player must stand to push
            # Box can be pushed only if destination is open and player can reach right place
            if in_bounds(nbx, nby) and in_bounds(pxx, pyy):
                if can_reach(px, py, pxx, pyy, bx, by):
                    state = (nbx, nby, bx, by)
                    if state not in visited:
                        visited.add(state)
                        dq.append( (nbx, nby, bx, by, pushes+1) )
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m² × n² × m × n). There are O(m × n) choices for box position and for player each, and for each state, we may run BFS through up to m × n cells.
- **Space Complexity:**  
  O(m² × n²). The visited set for storing all (box_row, box_col, player_row, player_col) combinations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle multiple boxes?
  *Hint: Would need state representation for every box position. Consider exponential explosion of state space.*

- Can you optimize further for a large grid but sparse obstacles?
  *Hint: Heuristic/A\* search prioritizing states close to the target location.*

- How do you reconstruct the path of pushes?
  *Hint: Keep parent pointers in the BFS.*

### Summary
This problem uses a **state space BFS** pattern, treating (box, player) as a compound state, and explores with the goal of minimum box pushes. A BFS within BFS is used for reachability validation. This is a classic algorithmic technique applicable to similar “push/pull box” puzzles, robot motion planning, and grid navigation with move restrictions.


### Flashcard
Use BFS on (box position, player position) states, prioritizing minimal box pushes; only push when player can reach the box's push position.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
