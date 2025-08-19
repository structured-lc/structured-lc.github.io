### Leetcode 489 (Hard): Robot Room Cleaner [Practice](https://leetcode.com/problems/robot-room-cleaner)

### Description  
You control an automatic robot vacuum cleaner placed in a room, which is modeled as a grid of cells. Each cell is either empty or blocked by an obstacle. The robot:
- starts at an unknown position and direction,
- cannot access the room's map,
- can only interact through four API methods:
  - `move()`: If the cell in front is open, moves forward and returns True; otherwise returns False.
  - `turnLeft()` / `turnRight()`: Rotates the robot 90° left or right.
  - `clean()`: Cleans the current cell.

Your task is to design an algorithm, using **only** these methods, to clean all accessible cells in the room. The robot can only move up, down, left, or right, and doesn't know the room's bounds in advance.

### Examples  

**Example 1:**  
Input: Robot in the below room (1=open, 0=blocked)  
```
1 1 1 1
1 0 1 0
1 1 1 1
```
Output: All open (1) cells are cleaned.  
*Explanation: Robot systematically explores every reachable cell, using only `move()`, `turnLeft()`, `turnRight()`, and `clean()`.*

**Example 2:**  
Input:  
```
0 1 1
1 1 0
1 0 1
```
Output: All **connected** open cells starting from the robot's initial position are cleaned.  
*Explanation: Robot avoids blocked areas (0), never revisiting or getting stuck.*

**Example 3:**  
Input:  
A single row, e.g. `[1, 1, 0, 1]` (robot starts at position 0)  
Output: Cleans cells `[0,1]` and ignores blocked or disconnected cells like 3.  
*Explanation: The robot cannot cross blocked cells.*

### Thought Process (as if you’re the interviewee)  
- **Initial approach:**  
  - Since we don't know the room layout, size, or robot's starting direction, we must explore *blindly*.  
  - The systematic way is to treat this like "exploring a maze"—use **DFS (Depth-First Search)** and always mark visited cells.
  - At each cell, clean it, then try all 4 directions:
    - For each direction, move if possible, then recursively explore from new cell, backtrack afterwards.
    - If move fails (blocked or wall), try next direction.
  - Need to "remember" both positions (using a coordinate system relative to start, e.g. (0,0)) and which way the robot faces.
  - Make sure to turn robot back to the orientation and position before the recursive call.

- **Why not BFS?**  
  - We don't know the grid bounds or have a queue-friendly access. DFS is easier to implement with backtracking and local position memory.

- **Trade-offs:**  
  - DFS may use deeper recursion, but with no extra data structures.  
  - No prior map means care must be taken to track relative positions and visited locations.

### Corner cases to consider  
- Rooms with enclosed/unreachable blocked cells.
- Initial cell is an "island" (no access to any other cell).
- All cells are open (robot needs to clean every one).
- All cells except start are blocked (robot should not move).
- Non-rectangular accessible space.
- Robot starts next to a wall or in the corner.

### Solution

```python
# The Robot API is provided as:
# class Robot:
#     def move(self) -> bool
#     def turnLeft(self) -> None
#     def turnRight(self) -> None
#     def clean(self) -> None

def cleanRoom(robot):
    """
    :type robot: Robot
    :rtype: None
    """

    # Directions: up, right, down, left (in that order, to mimic turning right)
    directions = [(-1,0), (0,1), (1,0), (0,-1)]  # (dx, dy)
    visited = set()

    def go_back():
        # Turn around, move, and reset orientation
        robot.turnLeft()
        robot.turnLeft()
        robot.move()
        robot.turnLeft()
        robot.turnLeft()

    def dfs(x, y, d):
        # Mark current cell as visited and clean
        visited.add((x, y))
        robot.clean()

        # Try 4 directions
        for i in range(4):
            nd = (d + i) % 4
            nx, ny = x + directions[nd][0], y + directions[nd][1]
            # Only visit unvisited
            if (nx, ny) not in visited:
                if robot.move():
                    dfs(nx, ny, nd)
                    # Backtrack: return to old cell, same orientation
                    go_back()
            # Turn robot to next direction
            robot.turnRight()

    # Start from (0,0) facing 'up'/direction 0
    dfs(0, 0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(N), where N = number of accessible cells. Each cell is visited and cleaned exactly once, and each direction is checked at most once per cell.
- **Space Complexity:**  
  - O(N) for the visited set, and for recursive DFS stack (up to N frames in worst case, for a single snake-like path).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the robot had a limited battery and must return to the starting cell before running out?  
  *Hint: Think about tracking path to start and "recharging" points.*

- How would you minimize the number of extra turns or moves made by the robot?  
  *Hint: Consider different traversal strategies—try to maximize cleaning while minimizing unnecessary motion.*

- Can you clean the room **without using a visited set** (i.e., O(1) space)?  
  *Hint: Only possible in specific cases, or you may revisit cells—think about marking cells physically or via robot's internal memory.*

### Summary
This problem is a classic **backtracking DFS with position marking**—used to explore an unknown environment. The "blind maze exploration" pattern appears in robotics, pathfinding, and AI. Managing *relative positioning* and *robot state* is critical. The core coding pattern works for online search, vacuum, and navigation simulation tasks.

### Tags
Backtracking(#backtracking), Interactive(#interactive)

### Similar Problems
- Walls and Gates(walls-and-gates) (Medium)
- Shortest Path in a Hidden Grid(shortest-path-in-a-hidden-grid) (Medium)
- Minimum Path Cost in a Hidden Grid(minimum-path-cost-in-a-hidden-grid) (Medium)
- Number of Spaces Cleaning Robot Cleaned(number-of-spaces-cleaning-robot-cleaned) (Medium)