### Leetcode 874 (Medium): Walking Robot Simulation [Practice](https://leetcode.com/problems/walking-robot-simulation)

### Description  
Simulate a robot walking on an infinite 2D grid.  
- The robot starts at (0, 0), facing north.
- There are a series of commands:
  - `-2`: turn left 90°
  - `-1`: turn right 90°
  - `1`–`9`: move forward k steps (where k ∈ [1,9])
- There are obstacles at specific grid points. If the robot’s next step would hit an obstacle, it stays at its current spot for that command and continues with the next command.
- The goal is to compute the **maximum Euclidean distance squared** from the origin (0, 0) that the robot ever reaches during its movement.

### Examples  

**Example 1:**  
Input: `commands = [4,-1,3], obstacles = []`  
Output: `25`  
*Explanation: Move north 4 steps to (0,4). Turn right (face east). Move east 3 steps to (3,4). The furthest from the origin is at (3,4): 3² + 4² = 25.*

**Example 2:**  
Input: `commands = [4,-1,4,-2,4], obstacles = [[2,4]]`  
Output: `65`  
*Explanation:  
- Move north 4 steps to (0,4).  
- Turn right (face east).
- Move east, but at steps: (1,4), (2,4); at (2,4) there is an obstacle, stop at (1,4). 
- Turn left (now facing north).
- Move north 4 steps to (1,8).
- Max distance at (1,8): 1² + 8² = 65.*

**Example 3:**  
Input: `commands = [6,-1,5,-1,4], obstacles = [[0,2],[0,4],[2,1],[2,2]]`  
Output: `41`  
*Explanation:  
- Move north, but at (0,2) and (0,4) block path—will stop before hitting them.
- At each step, calculate distance from origin, track the max.*

### Thought Process (as if you’re the interviewee)  
I’d recognize this as a **simulation** problem:
- The robot can face 4 directions, so I’ll use vectors for movement (N, E, S, W).
- For turns, cycling through a list of directions is clean:  
  North = (0,1), East = (1,0), South = (0,-1), West = (-1,0).
- To efficiently check for obstacles, use a `set` of tuples for O(1) lookups.
- For each command: if movement, step one-by-one, check each square for obstacles. After each valid step, update the max distance squared.
- Return the largest distance squared observed.

Brute-force is fine because we process at most one move/check per grid cell per step; data bounds are tight (commands up to about hundreds), so *step-by-step* checking is acceptable.

### Corner cases to consider  
- No obstacles
- Obstacles directly at start (0,0) -- the robot never moves
- Obstacles adjacent to start -- first movement blocked
- Multiple consecutive turns with no movement
- All commands are turns
- Large numbers of movements without obstacles

### Solution

```python
def robotSim(commands, obstacles):
    # Store obstacles as a set of coordinate tuples for O(1) access
    obstacle_set = set(map(tuple, obstacles))
    
    # Directions: North, East, South, West (clockwise order)
    # Each as (dx, dy)
    directions = [(0,1), (1,0), (0,-1), (-1,0)]
    dir_idx = 0  # Start facing north
    
    # Start at (0,0)
    x, y = 0, 0
    max_distance_sq = 0
    
    for cmd in commands:
        if cmd == -2:  # Turn left 90°
            dir_idx = (dir_idx - 1) % 4
        elif cmd == -1:  # Turn right 90°
            dir_idx = (dir_idx + 1) % 4
        else:
            # Move forward cmd steps, check for obstacles one step at a time
            dx, dy = directions[dir_idx]
            for _ in range(cmd):
                next_x = x + dx
                next_y = y + dy
                if (next_x, next_y) in obstacle_set:
                    break  # Stop at obstacle
                x, y = next_x, next_y
                # Update max Euclidean distance squared
                max_distance_sq = max(max_distance_sq, x*x + y*y)
    return max_distance_sq
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k), where n = number of commands, k = total steps robot could take; each cell move and obstacle check is O(1); obstacles preprocessing is O(m), m = number of obstacles.
- **Space Complexity:** O(m) for the obstacle set; O(1) for variables; no extra output structure.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle *very large* lists of obstacles efficiently?
  *Hint: Consider spatial hashing or mapping obstacles by row/column for fast rejection.*

- Can you optimize further if the robot never visits the same cell twice?
  *Hint: Focus on quick stepping for long straight segments, avoiding per-step checks if no obstacles ahead.*

- Suppose diagonal moves are allowed or robot operates in 3D. How does your design change?
  *Hint: Adjust direction arrays and consider the obstacle data structure.*

### Summary
This problem is a classic **grid simulation** task involving direction tracking and efficient obstacle avoidance using a set.  
The solution demonstrates direct simulation, leveraging coordinate math and direction cycling—a common pattern in robot, maze, or movement simulation questions. This approach is broadly applicable for similar grid traversal and movement constraint problems.