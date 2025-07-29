### Leetcode 1210 (Hard): Minimum Moves to Reach Target with Rotations [Practice](https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations)

### Description  
You are given an `n × n` grid where a **snake** (occupying two adjacent cells) starts in the top-left corner in a horizontal position (cells `(0,0)` and `(0,1)`). Cells can be empty (`0`) or blocked (`1`). The goal is to move the snake so it occupies the **bottom-right corner** (cells `(n-1, n-2)` and `(n-1, n-1)` in horizontal position), using the smallest number of moves.

Possible **moves**:
- **Move right** (if both cells to the right are empty).
- **Move down** (if both lower cells are empty).
- **Rotate clockwise** (horizontal to vertical, tail anchored, if the cells below both ends are empty).
- **Rotate counterclockwise** (vertical to horizontal, if cells to the right of both ends are empty).

Return the minimum moves needed to reach the goal. Return `-1` if impossible.

### Examples  

**Example 1:**  
Input:  
```
grid = [
  [0,0,0,0,0,1],
  [1,1,0,0,1,0],
  [0,0,0,0,1,1],
  [0,0,1,0,1,0],
  [0,1,1,0,0,0],
  [0,1,1,0,0,0]
]
```
Output: `11`  
*Explanation: The snake maneuvers via right, down, and rotation moves, reaching the target in 11 moves.*

**Example 2:**  
Input:  
```
grid = [
  [0,0,1,0,0,0],
  [0,0,0,0,1,0],
  [0,0,0,0,1,0],
  [0,0,0,0,1,0],
  [0,0,0,0,1,0],
  [0,0,0,0,0,0]
]
```
Output: `9`  
*Explanation: The snake can only progress via right and down movements, avoiding obstacles, reaching target in 9 moves.*

**Example 3:**  
Input:  
```
grid = [
  [0,0,1,0],
  [0,0,1,0],
  [0,0,1,0],
  [0,0,0,0]
]
```
Output: `-1`  
*Explanation: The snake is blocked by a column of obstacles and cannot reach the target.*

### Thought Process (as if you’re the interviewee)  
At first glance, this problem involves:
- Navigation in a grid.
- Keeping track of the **snake's position and orientation** (horizontal or vertical).
- Validating possible moves (including rotations).

A brute-force solution would try all possible moves recursively. However, due to potentially exponential paths, that’s not feasible.

An **optimal approach is BFS**:
- Each state is defined by: head coordinates **(x, y)** and orientation (**horizontal/vertical**).
- BFS ensures shortest path (minimum moves) is found.
- For each state, check all possible moves:
    - Move right
    - Move down
    - Rotate (clockwise/counterclockwise, depending on orientation)
- Use a **visited set** (to avoid revisiting states).

Trade-off: BFS uses more memory (to hold the queue and visited set), but guarantees shortest path.

### Corner cases to consider  
- Grid too small (snake doesn't fit).
- Grid full of obstacles.
- Early obstacles immediately block right/down/rotations.
- Start or end cell blocked.
- Already at goal (start state is the goal).
- Rotations blocked due to edge or adjacent obstacles.

### Solution

```python
from collections import deque

def minimumMoves(grid):
    n = len(grid)
    # orientation: 0 = horizontal, 1 = vertical
    # state: (x, y, orientation), where (x, y) is the head of the snake
    start = (0, 1, 0)  # Snake starts at (0,0)-(0,1), horizontal, head at (0,1)
    target = (n-1, n-1, 0)  # End at (n-1, n-2)-(n-1, n-1), horizontal

    visited = set()
    queue = deque()
    queue.append( (0, start) )  # (moves_so_far, state)

    visited.add(start)

    while queue:
        moves, (x, y, o) = queue.popleft()

        if (x, y, o) == target:
            return moves

        # Move right
        if o == 0:
            # horizontal: tail is (x, y-1)
            if y + 1 < n and grid[x][y+1] == 0 and grid[x][y-1] == 0:
                next_state = (x, y+1, 0)
                if next_state not in visited and grid[x][y] == 0:
                    visited.add(next_state)
                    queue.append( (moves+1, next_state) )
            # Move down
            if x + 1 < n and grid[x+1][y] == 0 and grid[x+1][y-1] == 0:
                next_state = (x+1, y, 0)
                if next_state not in visited:
                    visited.add(next_state)
                    queue.append( (moves+1, next_state) )
            # Rotate clockwise (horizontal -> vertical)
            if x+1 < n and grid[x+1][y] == 0 and grid[x+1][y-1] == 0 and grid[x][y] == 0 and grid[x][y-1] == 0:
                next_state = (x+1, y-1, 1)
                if next_state not in visited:
                    visited.add(next_state)
                    queue.append( (moves+1, next_state) )
        else:
            # vertical: tail is (x-1, y)
            # Move down
            if x + 1 < n and grid[x+1][y] == 0:
                next_state = (x+1, y, 1)
                if next_state not in visited:
                    visited.add(next_state)
                    queue.append( (moves+1, next_state) )
            # Move right
            if y + 1 < n and grid[x][y+1] == 0 and grid[x-1][y+1] == 0:
                next_state = (x, y+1, 1)
                if next_state not in visited:
                    visited.add(next_state)
                    queue.append( (moves+1, next_state) )
            # Rotate counterclockwise (vertical -> horizontal)
            if y+1 < n and grid[x][y+1] == 0 and grid[x-1][y+1] == 0 and grid[x][y] == 0 and grid[x-1][y] == 0:
                next_state = (x, y+1, 0)
                if next_state not in visited:
                    visited.add(next_state)
                    queue.append( (moves+1, next_state) )

    return -1  # Target unreachable
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
    - Each state (cell, orientation) is processed at most once (2 × n × n).
    - For every state, a constant number of possible moves.
- **Space Complexity:** O(n²).  
    - The queue and visited set hold up to 2 × n × n states.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the grid was extremely large but sparse?  
  *Hint: Use lazy evaluation/generation or compress state representation.*

- Can the concept be generalized to longer snakes?  
  *Hint: Track positions for entire body, similar to classic snake game.*

- What if the snake was allowed to shrink/grow or change shape?  
  *Hint: Dynamically track positions, possibly with variable length tuples.*

### Summary
This is a classic **shortest path in state space** problem, using BFS to find minimal steps efficiently. The essential insight is to encode both **position and orientation**. Recognizing the grid as a type of implicit graph is broadly useful: this BFS + state modeling shows up in puzzles, robot movement, and sliding block problems.