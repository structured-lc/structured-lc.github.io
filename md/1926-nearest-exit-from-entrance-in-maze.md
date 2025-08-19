### Leetcode 1926 (Medium): Nearest Exit from Entrance in Maze [Practice](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze)

### Description  
Given a 2D maze consisting of `'.'` (open spaces) and `'+'` (walls), and an **entrance** position, find the minimum number of steps to reach the nearest **exit**. An **exit** is any empty cell on the border of the maze **except the entrance itself**. You can move up, down, left, or right, and cannot move through walls. Return the minimum steps to the nearest exit, or -1 if no exit can be reached.

### Examples  

**Example 1:**  
Input:  
maze =  
[["+","+",".","+"],  
 [".",".",".","+"],  
 ["+","+","+","."]],  
entrance = [1,2]  
Output: `1`  
*Explanation: The entrance is at (1,2). Moving right to (1,3) is the nearest exit.*

**Example 2:**  
Input:  
maze =  
[["+","+","+","+"],  
 [".",".",".","+"],  
 ["+","+",".","."]],  
entrance = [1,2]  
Output: `2`  
*Explanation: The shortest path is from (1,2) → (2,2) → (2,3), which is an exit at the border.*

**Example 3:**  
Input:  
maze =  
[["+","+","+"],  
 [".",".","."],  
 ["+","+","+"]],  
entrance = [1,0]  
Output: `-1`  
*Explanation: There's no exit on the border you can reach other than the entrance.*

### Thought Process (as if you’re the interviewee)  
- The problem reduces to finding the **shortest path** from entrance to the nearest exit (border cell) in a maze, where all moves have equal cost and can be made in four directions.
- The brute-force approach would be to use **DFS from the entrance**, checking all possibilities, but this would be inefficient and could visit the same cell multiple times.
- Since we're searching for the minimum steps (shortest path), **BFS (Breadth-First Search)** is the optimal strategy, as it explores all closer cells before further ones.
- I'll use a queue to perform BFS from the entrance:
  - For each step, expand to all reachable, unvisited adjacent cells.
  - Mark cells as visited (e.g., set `'+'`), so they're not revisited.
  - The first time we reach a border cell (not the entrance), we return the current step count.
- Edge case: If the entrance itself is on the border, it should NOT be considered an exit.
- Trade-off: BFS uses extra space for the queue and visitation marking, but guarantees shortest path.

### Corner cases to consider  
- Maze is only 1 cell (1x1 grid).
- Entrance is on the border.
- No exits are reachable.
- All cells are walls except entrance.
- Multiple exits at the same minimum distance.
- Large maze to test efficiency.

### Solution

```python
from collections import deque

def nearestExit(maze, entrance):
    m, n = len(maze), len(maze[0])
    q = deque()
    
    # Start BFS from the entrance
    ex, ey = entrance
    q.append((ex, ey, 0))  # (row, col, distance)
    maze[ex][ey] = '+'     # Mark as visited
    
    # Directions: left, right, up, down
    directions = [(-1,0), (1,0), (0,-1), (0,1)]
    
    while q:
        x, y, steps = q.popleft()
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            
            # Check within bounds and open space
            if 0 <= nx < m and 0 <= ny < n and maze[nx][ny] == '.':
                # Check if it's a border and not the entrance
                if nx == 0 or nx == m-1 or ny == 0 or ny == n-1:
                    # Not the entrance position
                    if [nx, ny] != entrance:
                        return steps + 1
                # Mark as visited and add to queue
                maze[nx][ny] = '+'
                q.append((nx, ny, steps + 1))
    
    # No exit found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m is the number of rows and n is the number of columns. In the worst case, every cell is traversed once in BFS.
- **Space Complexity:** O(m × n) for the queue and to mark cells as visited.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if diagonal movement was allowed?  
  *Hint: Add diagonal directions to your movement vector.*

- What if the maze changes during traversal (some walls open or close)?  
  *Hint: Implement dynamic maze handling or re-check statuses before each move.*

- How would you return the path (list of coordinates) instead of just the distance?  
  *Hint: Record the parent of each cell during BFS and reconstruct the path backward.*

### Summary
This problem is a classic application of **Breadth-First Search (BFS)** in a 2D grid for shortest path finding. The BFS pattern is common for all scenarios where the shortest transformation sequence, minimum moves, or nearest exit is required in grids or unweighted graphs. Recognizing the immediate applicability of BFS here is crucial, as seen in problems like "Shortest Path in Binary Matrix", "Word Ladder", etc.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
