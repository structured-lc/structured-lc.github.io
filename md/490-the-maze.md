### Leetcode 490 (Medium): The Maze [Practice](https://leetcode.com/problems/the-maze)

### Description  
Given a maze as a 2D grid where `0` represents empty spaces and `1` represents walls, there is a ball at the **start position** which can roll in any of the four directions (up, down, left, right). Once the ball starts rolling, it continues in that direction until it hits a wall; it cannot stop in the middle of empty spaces. After stopping, the ball can then choose a new direction to start rolling again. The task is to determine if the ball can stop exactly at the **destination** position, following these movement constraints.

### Examples  

**Example 1:**  
Input: `maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]]`, `start = [0,4]`, `destination = [4,4]`  
Output: `True`  
*Explanation: The ball rolls left to (0,1), down to (4,1), right to (4,4). It can stop at the destination.*

**Example 2:**  
Input: `maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]]`, `start = [0,4]`, `destination = [3,2]`  
Output: `False`  
*Explanation: Every path the ball can follow either leads to a wall or can't stop at (3,2).*

**Example 3:**  
Input: `maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]]`, `start = [0,4]`, `destination = [0,4]`  
Output: `True`  
*Explanation: The start and destination are the same cell; by definition, the ball is already stopped at the destination (special case).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each move, simulate rolling in all four directions from the current position until the ball cannot move further (hits a wall). Repeat from each new stop position. Backtracking (DFS) or BFS can be used to explore all possibilities.
- **Optimization:**  
   - Use **BFS** to avoid redundant searches and infinite loops, since we want to explore level by level and ensure shortest reachability.
   - Keep a visited set to record the cells where the ball has already stopped.
   - At each visited cell, roll the ball in each direction until it hits a wall. Stop, check if it's destination, and continue if not.
- **Final approach:** BFS is intuitive for shortest path/reachability; ensures we check all possible stopping points efficiently without recursion stack depth concerns.

### Corner cases to consider  
- Maze is empty or only has one cell.
- Start equals destination (should return True immediately).
- Ball is surrounded by walls and cannot roll in any direction.
- Walls around or at destination.
- Multiple paths, but none lead to the destination.
- Large maze performance/stopping at corners.

### Solution

```python
from collections import deque

def hasPath(maze, start, destination):
    # Dimensions of the maze
    m, n = len(maze), len(maze[0])
    
    # Directions: left, right, up, down
    directions = [ (0, -1), (0, 1), (-1, 0), (1, 0) ]
    
    # Visited cells where ball has stopped
    visited = set()
    start_tuple = tuple(start)
    visited.add(start_tuple)
    
    queue = deque([start_tuple])
    
    while queue:
        curr = queue.popleft()
        if curr == tuple(destination):
            return True
        for dx, dy in directions:
            x, y = curr
            # Roll the ball until it hits a wall
            while 0 <= x + dx < m and 0 <= y + dy < n and maze[x + dx][y + dy] == 0:
                x += dx
                y += dy
            next_stop = (x, y)
            if next_stop not in visited:
                visited.add(next_stop)
                queue.append(next_stop)
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited at most once per stopping location, and every time we roll in a direction, we end up at a new border location. There are m × n possible stopping points.
- **Space Complexity:** O(m × n)  
  Because of the visited set and the queue, in the worst case we store all stopping points (one per cell if all are empty).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must return the **minimum number of turns** or moves required to reach the destination?  
  *Hint: Count turns or moves as you do BFS; store the move count in the BFS queue/state.*

- How would your solution need to change if the ball can only roll **diagonally**?  
  *Hint: Update the directions’ representation; adjust conditions to check all 8 directions.*

- If the maze is **huge** (10000×10000), how can you optimize further?  
  *Hint: Use more space-efficient structures, or bidirectional BFS if start/dest are far.*

### Summary
This problem is a classic **graph search** disguised as a maze simulation and leverages **BFS** to efficiently explore all possible stopping points that the ball can reach under rolling constraints, avoiding cycles with a visited set. The coding pattern used (BFS, directional movement simulation) is applicable in pathfinding, grid traversal (robot movement, game puzzles), and other constraint-based search problems.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- The Maze III(the-maze-iii) (Hard)
- The Maze II(the-maze-ii) (Medium)