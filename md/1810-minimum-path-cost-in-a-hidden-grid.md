### Leetcode 1810 (Medium): Minimum Path Cost in a Hidden Grid [Practice](https://leetcode.com/problems/minimum-path-cost-in-a-hidden-grid)

### Description  
You control a robot on a hidden, unknown m × n grid. Each cell has a movement cost (cannot be accessed directly), and the goal is to move the robot from its unknown starting cell to the hidden target cell with the minimum total cost. The only way to interact with the grid is via a `GridMaster` interface with:
- `canMove(direction)`: Can you move in 'U', 'D', 'L', or 'R' directions from the current cell?
- `move(direction)`: Moves the robot in that direction, returns the cost to enter the new cell.
- `isTarget()`: Returns True if the current cell is the target.

You don’t know the grid boundaries, start location, or the target's location. The robot can only reveal new cells by moving or checking possible directions from its current spot. You must find the minimum cost to reach the target or return -1 if unreachable.

### Examples  

**Example 1:**  
Input: `grid = [[0, 1], [2, 0]]` (hidden, only accessible through API),  
Robot at unknown point, Target at unknown point  
Output: `1`  
Explanation: Let's say start at (0,0), target at (0,1). Move right, cost = 1.

**Example 2:**  
Input: `grid = [[0,3,1],[3,4,2],[1,2,0]], r1=2, c1=0, r2=0, c2=2`  
Output: `9`  
Explanation: Minimum path: (2,0) → (2,1)[2] → (1,1)[4] → (1,2)[2] → (0,2)[1]; costs sum to 9.

**Example 3:**  
Input: `grid = [[1,0],[0,1]]`  
Output: `-1`  
Explanation: Target is not reachable from the starting point.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Since the grid is hidden and boundaries are unknown, we cannot do a direct BFS or Dijkstra.  
- **Step 1 — Mapping:** First, I must **explore** the grid by simulating moves from the start using DFS/backtracking. I need to record for each position (relative to start, e.g., (x,y)), the cost to reach it and whether it's the target.
    - Since we can't revisit, I need to "undo" moves during backtracking (move back to previous cell after recursion).
    - Build a graph: each unique (x,y) maps to (cost, is_target).
- **Step 2 — Shortest Path:** Once grid mapping is complete, run a shortest-path algorithm (Dijkstra, since all edge weights are non-negative) from the start to the target cell within the discovered graph.
    - Why not BFS? Costs may be different per edge, so Dijkstra is necessary.
    - Each node: (x,y), neighbors: accessible adjacent positions, edge weight: cost of moving *to* that cell.
- **Trade-off:** First step is necessary to discover all walkable cells, second step to find optimal path. Can't do Dijkstra while exploring (unknown space, possible cycles/backtracking).

### Corner cases to consider  
- Only one cell: the start is the target.
- The grid is fully blocked: no moves possible.
- The target is completely isolated.
- Multiple paths: check if Dijkstra picks the minimal one.
- Very large grid but small accessible region ("islands").
- Negative or zero costs? (Assume all costs are ≥ 0 as per problem constraints.)

### Solution

```python
# Provided class APIs:
# class GridMaster:
#     def canMove(self, direction: str) -> bool: ...
#     def move(self, direction: str) -> int: ...
#     def isTarget(self) -> bool: ...

from collections import deque
import heapq

class Solution:
    def findShortestPath(self, master: 'GridMaster') -> int:
        # Directions and their inverse for backtracking
        DIRS = {'U': (-1, 0), 'D': (1, 0), 'L': (0, -1), 'R': (0, 1)}
        OPPOSITE = {'U': 'D', 'D': 'U', 'L': 'R', 'R': 'L'}

        # Step 1: Explore the grid using DFS and map it
        grid = {}  # (x, y): (cost, is_target)
        target = None

        def dfs(x, y):
            if master.isTarget():
                nonlocal target
                target = (x, y)
            for dirc, (dx, dy) in DIRS.items():
                nx, ny = x+dx, y+dy
                if (nx, ny) in grid:
                    continue
                if master.canMove(dirc):
                    cost = master.move(dirc)
                    grid[(nx, ny)] = (cost, master.isTarget())
                    dfs(nx, ny)
                    # Backtrack to previous cell
                    master.move(OPPOSITE[dirc])

        # Starting position: arbitrarily assign origin (0,0). Starting cost is 0.
        grid[(0, 0)] = (0, master.isTarget())
        dfs(0, 0)

        if not target:
            return -1  # Target is not reachable

        # Step 2: Dijkstra's from start (0,0) to target
        heap = [(0, 0, 0)]  # (total_cost, x, y)
        dist = {(0, 0): 0}

        while heap:
            cost, x, y = heapq.heappop(heap)
            if (x, y) == target:
                return cost
            for dirc, (dx, dy) in DIRS.items():
                nx, ny = x+dx, y+dy
                if (nx, ny) not in grid:
                    continue
                ncost, _ = grid[(nx, ny)]
                new_cost = cost + ncost
                if (nx, ny) not in dist or new_cost < dist[(nx, ny)]:
                    dist[(nx, ny)] = new_cost
                    heapq.heappush(heap, (new_cost, nx, ny))
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n \* log(m×n)), where m,n are reachable region dimensions.  
  - DFS explores each reachable cell once.
  - Dijkstra is O(nodes \* log nodes) because each cell acts as a node.
- **Space Complexity:** O(m×n), to store all visited cells' state and Dijkstra's data.

### Potential follow-up questions (as if you’re the interviewer)  

- Can we optimize to avoid mapping the whole accessible region if the target is nearby?
  *Hint: Is it possible to combine grid discovery and Dijkstra using A* or a single queue?*

- What if movement costs can be negative?
  *Hint: Can you adjust the algorithm if Dijkstra is not suitable? Bellman-Ford?*

- How could you handle multiple targets or finds all minimal-cost targets within k steps?
  *Hint: Think BFS with cost tracking and early cutoff.*

### Summary
This problem is solved in two phases:  
1. **Backtracking/DFS** to **reveal and store** the accessible portion of the grid as a graph, since direct access to the grid isn’t possible.
2. **Dijkstra's algorithm** to **compute the minimum path** from the start to the target within the mapped region.

This mapping-followed-by-pathfinding split is a common pattern in grid-related interactive or partially observable search problems—including robot navigation and maze exploration. The coding pattern applies to any situation where direct, global grid access is unavailable, but local exploration is allowed.