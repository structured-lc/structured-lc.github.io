### Leetcode 1730 (Medium): Shortest Path to Get Food [Practice](https://leetcode.com/problems/shortest-path-to-get-food)

### Description  
Given a 2D grid representing a map, your goal is to find the shortest number of steps required to move from your starting position (marked with a '*') to any food cell (marked with '#'). The grid may contain open spaces ('O'), obstacles ('X'), and food. You can move up, down, left, or right, but not diagonally, and you cannot move through obstacles. If there are multiple food cells, return the length of the shortest path to any of them. If it is impossible to reach a food cell, return -1.

### Examples  

**Example 1:**  
Input=`[["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]`  
Output=`3`  
*Explanation: Start at (1,1), move right to (1,2), right to (1,3), down to (2,3) which is a food cell. Path length = 3.*

**Example 2:**  
Input=`[["X","X","X","X","X"],["X","*","X","O","X"],["X","O","O","#","X"],["X","X","X","X","X"]]`  
Output=`-1`  
*Explanation: There is no possible path from the start to any food cell.*

**Example 3:**  
Input=`[["X","*"],["#","X"]]`  
Output=`1`  
*Explanation: Start at (0,1), move down to (1,0) which is a food cell. Path length = 1.*

### Thought Process (as if you’re the interviewee)  
- The task can be mapped to finding the shortest path in a grid with obstacles, which is a classic Breadth-First Search (BFS) problem.
- A brute-force approach would be to try every possible path, but that is not efficient since the grid can be up to 200×200.
- Since we can move in four cardinal directions and every step has the same “cost”, BFS is ideal because it finds the shortest path in an unweighted grid.
- Steps:
  - Find the starting point '*'.
  - Use BFS to explore in all 4 directions. Add each adjacent, unvisited open space or food cell to the queue.
  - Mark visited cells (e.g., by changing them to 'X') to avoid revisiting.
  - As soon as we reach a '#' cell, return the path length.
  - If no path reaches food, return -1.
- BFS is chosen over DFS because BFS guarantees the first food cell we reach is the closest one (minimum steps).

### Corner cases to consider  
- The grid only contains obstacles and the start position ('*'), with no food.
- The food is directly adjacent to the starting cell.
- The grid is very small (1×1, 2×2), including cases where the start is surrounded by obstacles.
- Multiple food locations exist, but some are unreachable.
- The input grid is at maximum size (200×200).

### Solution

```python
from collections import deque

def getFood(grid):
    # Get grid dimensions
    rows = len(grid)
    cols = len(grid[0])
    
    # Find the starting position '*'
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '*':
                start_row, start_col = r, c
                break

    # Directions: up, down, left, right
    directions = [(-1,0), (1,0), (0,-1), (0,1)]

    # Queue for BFS: stores (row, col, distance)
    queue = deque()
    queue.append((start_row, start_col, 0))
    
    # Mark the starting cell as visited
    grid[start_row][start_col] = 'X'
    
    while queue:
        r, c, dist = queue.popleft()
        
        # Check all 4 directions
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            # Check bounds
            if 0 <= nr < rows and 0 <= nc < cols:
                if grid[nr][nc] == '#':
                    # Found food!
                    return dist + 1
                if grid[nr][nc] == 'O':
                    # Mark visited and add to queue
                    grid[nr][nc] = 'X'
                    queue.append((nr, nc, dist + 1))
    
    # No path to any food
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = number of rows and n = number of columns. In the worst case, we visit each cell once.
- **Space Complexity:** O(m × n) for the queue (BFS can hold all positions) and to mark visited cells (in-place, so no extra grid).

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal movements are also allowed?  
  *Hint: Extend the direction list to include diagonals.*

- What if some cells have different “step costs”—can the shortest path still be found with BFS?  
  *Hint: If cost varies, use Dijkstra’s algorithm instead of BFS.*

- What if you had to find the shortest path to all food cells and return all paths’ lengths?  
  *Hint: Track all paths and avoid early return. BFS will find the shortest for each as you encounter them.*

### Summary
This problem is a textbook application of the **BFS shortest path in a matrix/grid** pattern. BFS is chosen for its efficiency and guarantee of minimal path length in unweighted undirected grids. The problem is analogous to shortest path search in mazes, robot pathfinding, and can be extended for weighted graphs or other movement patterns (diagonal, knight’s moves, etc.).


### Flashcard
BFS from starting position '*' exploring 4 directions until reaching food '#'; return step count when food found, −1 if unreachable.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- 01 Matrix(01-matrix) (Medium)
- Shortest Path in a Grid with Obstacles Elimination(shortest-path-in-a-grid-with-obstacles-elimination) (Hard)
- Amount of Time for Binary Tree to Be Infected(amount-of-time-for-binary-tree-to-be-infected) (Medium)