### Leetcode 3248 (Easy): Snake in Matrix [Practice](https://leetcode.com/problems/snake-in-matrix)

### Description  
Given a n × n grid where each cell is labeled as grid[i][j] = (i × n) + j, a "snake" (or cursor) starts at the top-left corner (cell 0). You are given a list of movement commands (`"UP"`, `"DOWN"`, `"LEFT"`, `"RIGHT"`), and each command moves the snake exactly one cell in that direction. The snake is guaranteed to remain inside the grid after every move. Return the final cell index (as defined above) where the snake ends up after performing all commands.


### Examples  

**Example 1:**  
Input: `n = 2, commands = ["RIGHT","DOWN"]`  
Output: `3`  
*Explanation: Start at (0, 0) → RIGHT → (0, 1) → DOWN → (1, 1). Cell index = 1 × 2 + 1 = 3.*

**Example 2:**  
Input: `n = 3, commands = ["DOWN","DOWN","RIGHT","RIGHT"]`  
Output: `8`  
*Explanation: Start at (0, 0) → (1, 0) → (2, 0) → (2, 1) → (2, 2). Cell index = 2 × 3 + 2 = 8.*

**Example 3:**  
Input: `n = 4, commands = ["RIGHT","RIGHT","DOWN","LEFT"]`  
Output: `5`  
*Explanation: (0, 0) → (0, 1) → (0, 2) → (1, 2) → (1, 1). Cell index = 1 × 4 + 1 = 5.*


### Thought Process (as if you’re the interviewee)  
Let’s break the problem down:
- The snake moves step by step based on commands. The grid is indexed row-wise by grid[i][j] = i \* n + j.
- Start position is always (0, 0).
- For each command, update either row (x) or column (y). No boundary check needed (guaranteed).
  - "UP": x -= 1  
  - "DOWN": x += 1  
  - "LEFT": y -= 1  
  - "RIGHT": y += 1
- At the end, return the index: x \* n + y.

This is a pure simulation problem with basic arithmetic. Brute-force = step through commands one by one. There's no possible optimization, since every command must be processed, but it’s already O(len(commands)) — optimal.


### Corner cases to consider  
- commands is empty: Snake remains at (0, 0).
- Only one command, any direction.
- n = 1 (trivial 1×1 grid, snake can’t move).
- commands move in circles or revisit earlier cells (does not affect final index).
- All commands of one direction only.


### Solution

```python
def final_position_of_snake(n, commands):
    # Start at the top-left corner
    x, y = 0, 0
    
    # Mapping each command to its movement offset
    direction = {
        "UP":    (-1, 0),
        "DOWN":  (1, 0),
        "LEFT":  (0, -1),
        "RIGHT": (0, 1)
    }
    
    # Apply each command in order
    for cmd in commands:
        dx, dy = direction[cmd]
        x += dx
        y += dy
    
    # Final index in 1D grid representation
    return x * n + y
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k = len(commands), because we process each command exactly once.
- **Space Complexity:** O(1), only a few variables used for coordinates and the direction map, regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the commands might move the snake out of bounds?
  *Hint: Add boundary checks for x and y after each move.*

- What if the grid is not square, but m × n?
  *Hint: Track two separate sizes, and adjust final index calculation to x \* n + y.*

- Can you track the full path or detect if the snake revisits a cell?
  *Hint: Use a set to track visited positions; add each (x, y) as you go. If it’s in the set, then revisit occurred.*

### Summary
This is a classic simulation problem involving coordinates manipulation on a grid. The approach is linear scan and incremental calculation, a common pattern for movement/grid problems. The same methodology applies to robot path, spiral matrices, and grid traversals where boundary or path tracking is relevant.