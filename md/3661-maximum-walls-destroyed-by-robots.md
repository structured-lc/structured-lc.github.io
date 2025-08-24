### Leetcode 3661 (Hard): Maximum Walls Destroyed by Robots [Practice](https://leetcode.com/problems/maximum-walls-destroyed-by-robots)

### Description  
Given a grid with robots and walls, each robot can fire lasers in any of the four cardinal directions to destroy walls. Each wall requires a certain number of hits to be destroyed. Robots can only stand still and fire—no movement. The problem asks: What is the **maximum number of walls** that can be destroyed if robots use their lasers optimally, possibly coordinating (timing or firing direction), so that as many walls as possible are destroyed?

### Examples  

**Example 1:**  
Input:  
grid =  
```
[['R','.','W'],  
 ['.','.','.'],  
 ['W','.','R']]
```
Output: `2`  
*Explanation: Both robots fire lasers toward the closest wall (upward or downward). Each wall gets enough hits to be destroyed by a robot.*

**Example 2:**  
Input:  
grid =  
```
[['.','W','R','.'],  
 ['R','.','.','W']]
```
Output: `2`  
*Explanation: Each robot fires in the direction of the nearest wall. Each wall is destroyed.*

**Example 3:**  
Input:  
grid =  
```
[['R','.','W','W'],  
 ['.','W','.','R'],  
 ['W','.','.','.']]
```
Output: `3`  
*Explanation: Robots can coordinate to fire at different walls. By choosing optimal directions, a maximum of 3 walls are destroyed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every possible direction each robot can fire (up, down, left, right), simulate all combinations. For each, count destroyed walls. Very slow for large grids—complexity grows exponentially (4ᴿ if R robots).

- **Observation:**  
  - A wall is destroyed if at least as many robots as its hit need are aligned with it in the same row or column, with nothing blocking their line of sight.  
  - It’s best for each robot to pick the *closest* wall in their firing direction, since firing at empty cells has no use.
  - Each wall can only be destroyed once.  
  - Robots firing at the same wall in the same time step is allowed if no wall blocks the way.

- **Optimization:**  
  - For each robot, precompute which walls it can shoot at directly (no blocks in between).  
  - Model as bipartite graph: robots on one side, walls on the other, edges if robot can hit the wall. 
  - The problem reduces to **maximum matching** in the bipartite graph, maximizing the number of walls destroyed.  
  - Use DFS/BFS for matching (Hopcroft-Karp or Hungarian algorithm, though DFS suffices for small grids).

- **Final Approach:**  
  - Build graph: For each robot, find all reachable walls directly (one in each direction per robot).
  - Each robot can “match” to one wall.
  - Return the size of the max matching = max number of walls destroyed.

### Corner cases to consider  
- No robots present ⇒ answer = 0  
- No walls on grid ⇒ answer = 0  
- All walls surrounded by other walls/unreachable to robots ⇒ answer = 0  
- Multiple robots aligned with same wall ⇒ only one can destroy (if wall needs 1 hit), unless war requires >= hits  
- Minimum (1×1) and maximum grid sizes  
- Robots with no line of sight to any wall  
- Walls needing 0 hits (should be ignored)

### Solution

```python
def max_walls_destroyed_by_robots(grid):
    # Dimensions
    m, n = len(grid), len(grid[0])
    
    robots = []
    walls = []
    wall_positions = {}
    
    # Gather robots and walls
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 'R':
                robots.append((i, j))
            elif grid[i][j] == 'W':
                walls.append((i, j))
                wall_positions[(i, j)] = len(walls) - 1  # Map to index
    
    # For each robot, find all walls it can shoot (direct line, 4 ways)
    from collections import defaultdict

    can_hit = [set() for _ in range(len(robots))]  # robot_idx -> set of wall_idx
    
    for idx, (x, y) in enumerate(robots):
        # Up
        i = x - 1
        while i >= 0:
            if grid[i][y] == 'W':
                can_hit[idx].add(wall_positions[(i, y)])
                break
            if grid[i][y] == 'R':
                break
            i -= 1
        # Down
        i = x + 1
        while i < m:
            if grid[i][y] == 'W':
                can_hit[idx].add(wall_positions[(i, y)])
                break
            if grid[i][y] == 'R':
                break
            i += 1
        # Left
        j = y - 1
        while j >= 0:
            if grid[x][j] == 'W':
                can_hit[idx].add(wall_positions[(x, j)])
                break
            if grid[x][j] == 'R':
                break
            j -= 1
        # Right
        j = y + 1
        while j < n:
            if grid[x][j] == 'W':
                can_hit[idx].add(wall_positions[(x, j)])
                break
            if grid[x][j] == 'R':
                break
            j += 1

    # Maximal Bipartite Matching: robots -> walls, each robot to one wall
    def bpm(u, visited, match_walls):
        for v in can_hit[u]:
            if not visited[v]:
                visited[v] = True
                if match_walls[v] == -1 or bpm(match_walls[v], visited, match_walls):
                    match_walls[v] = u
                    return True
        return False

    res = 0
    match_walls = [-1] * len(walls)
    for u in range(len(robots)):
        visited = [False] * len(walls)
        if bpm(u, visited, match_walls):
            res += 1
    return res

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R × W²), where R = number of robots, W = number of walls  
  - For each robot, need to check up to 4 directions (O(1)), and in matching, potentially all walls need to be checked per robot. Standard bipartite DFS matching is O(R × W).
- **Space Complexity:** O(R × W), for the adjacency lists, and O(W) for matching storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each wall needs *k* laser hits to be destroyed?  
  *Hint: Let each wall have k slots, and allow up to k robots to be matched to it (i.e., expand walls in bipartite graph).*

- Can each robot fire more than once, possibly at different walls?  
  *Hint: Now, treat each robot as having multiple shots, duplicate in matching or adjust the graph accordingly.*

- How to optimize if the grid size is much larger, but number of robots and walls is small?  
  *Hint: Precompute lines of sight; use sparse graph matching.*

### Summary
This problem is a classic **maximum bipartite matching** (graph) question, with a twist: edges depend on dynamic line-of-sight in a grid. The approach is akin to finding maximum assignments, and the coding pattern is often used in assignment and matching problems, network flow, or team assignment situations. Problems like “assign workers to jobs” or “max tasks fulfilled” often use similar techniques.

### Tags


### Similar Problems
