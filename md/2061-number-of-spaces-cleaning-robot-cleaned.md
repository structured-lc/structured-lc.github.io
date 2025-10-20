### Leetcode 2061 (Medium): Number of Spaces Cleaning Robot Cleaned [Practice](https://leetcode.com/problems/number-of-spaces-cleaning-robot-cleaned)

### Description  
Given a room represented as a 2D grid of 0s and 1s (0 = empty space, 1 = obstacle), a cleaning robot starts at the top-left cell (0,0) facing right. The robot cleans each cell it visits and moves forward in its current direction. If it hits an obstacle or the border, it turns 90° clockwise and tries again. The simulation stops if the robot enters a cell in the same direction it has already visited. Return the number of unique spaces the robot cleans.

### Examples  

**Example 1:**  
Input: `room = [[0,0,1],[0,0,0],[1,0,0]]`  
Output: `7`  
*Explanation:  
The robot starts at (0,0) facing right. It moves and cleans these cells in order: (0,0), (0,1), (1,1), (1,2), (2,2), (2,1), (2,0). It can no longer continue without revisiting a cell in the same direction.*

**Example 2:**  
Input: `room = [[0,1],[0,0]]`  
Output: `3`  
*Explanation:  
The robot starts at (0,0) → right to boundary, turns down, moves to (1,0), right to (1,1). Next step would be up into obstacle, so it can’t proceed.*

**Example 3:**  
Input: `room = []`  
Output: `1`  
*Explanation:  
Only one cell, and the robot stands still and cleans (0,0).*

### Thought Process (as if you’re the interviewee)  

- The robot’s path is fully determined by the turn-and-move rules.
- Each cell can be visited from up to four directions; once we revisit a cell from the same direction, it means we’re in a loop and should stop.
- Use a set to store visited (row, col, direction) states to avoid infinite loops.
- For each step: try to move forward; if not possible, rotate right (clockwise).
- The answer is the total number of unique cells that have been cleaned.

Brute-force idea:
- Simulate movement, but may revisit the same cell from a different direction.

Optimal:
- Track (row, col, direction) in a set so we never repeat and loop endlessly.
- Count unique (row, col) for the result.

### Corner cases to consider  
- All cells are obstacles except the starting cell.
- Single-row or single-column grids.
- The robot immediately surrounded by obstacles.
- Larger grids where turn cycles could occur.
- All empty cells (no obstacles).
- Robot can only go in small circle.

### Solution

```python
def numberOfCleanRooms(room):
    # Directions: right, down, left, up
    moves = [(0,1), (1,0), (0,-1), (-1,0)]
    m, n = len(room), len(room[0])
    
    # Set for (row, col, direction)
    visited = set()
    # Set for unique cleaned cells
    cleaned = set()
    
    # Initial state
    x, y, d = 0, 0, 0
    
    while (x, y, d) not in visited:
        visited.add((x, y, d))
        cleaned.add((x, y))
        # Move forward
        nx, ny = x + moves[d][0], y + moves[d][1]
        if 0 <= nx < m and 0 <= ny < n and room[nx][ny] == 0:
            x, y = nx, ny
        else:
            # Turn right (clockwise)
            d = (d + 1) % 4
    
    return len(cleaned)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × 4)  
  Each cell can be visited from each of the four directions, so worst-case behavior is 4 × m × n steps. Realistically, we only traverse unique states.
- **Space Complexity:** O(m × n)  
  Cleaned and visited sets are proportional to total cells and directions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the robot can start at any arbitrary cell, not just (0,0)?  
  *Hint: Allow (start_x, start_y) as input parameter.*

- Can you optimize space, if only the count is needed, not the path?  
  *Hint: Visited state needs all (row, col, direction) for correctness.*

- If obstacles can appear/disappear while the robot moves, how would your design change?  
  *Hint: Must recheck the room grid at each step.*

### Summary
This problem illustrates *simulation with state tracking*, using a set for (position, direction) to prevent infinite loops. It's a classic grid robot/path simulation problem, and this pattern (track (cell, direction)) is widely applicable to grid exploration, stateful automata, and similar simulation problems where direction and position matter.


### Flashcard
Track visited states to avoid infinite loops and count unique cells cleaned by the robot.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Robot Room Cleaner(robot-room-cleaner) (Hard)