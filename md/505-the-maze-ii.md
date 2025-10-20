### Leetcode 505 (Medium): The Maze II [Practice](https://leetcode.com/problems/the-maze-ii)

### Description  
You are given a 2D maze where `'0'` represents open cells and `'1'` represents walls. A ball, placed at a `start` cell, can be rolled in one of four directions (up, down, left, right). Once pushed, the ball continues to roll in the chosen direction until it hits a wall, then it stops and can be pushed in any of the four directions again.  
Your task is to calculate the **minimum distance** (number of empty cells passed, excluding the starting cell, including the destination cell) required to move the ball from the **start** cell to the **destination** cell, following the rolling rules. If the ball can't reach the destination, return `-1`.

### Examples  

**Example 1:**  
Input:  
maze = `[[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]]`,  
start = `[0,4]`,  
destination = `[4,4]`  
Output: `12`  
*Explanation: The shortest distance is by rolling left, down, left, down, right, down, and right (recalculated each roll until hitting walls). Total steps = 12.*

**Example 2:**  
Input:  
maze = `[[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]]`,  
start = `[0,4]`,  
destination = `[3,2]`  
Output: `-1`  
*Explanation: The ball cannot get to the destination because all possible routes are blocked by walls.*

**Example 3:**  
Input:  
maze = `[[0,0,0,0,0],[1,1,0,1,1],[0,0,0,0,0],[0,1,0,1,0],[0,1,0,0,0]]`,  
start = `[4,3]`,  
destination = `[0,1]`  
Output: `-1`  
*Explanation: There is no path that the rolling ball can take from start to destination according to the rolling rules.*

### Thought Process (as if you’re the interviewee)  
The core of the problem is **finding the shortest path in a grid, but with the twist that the ball rolls until it hits a wall**.  
- Initial idea: Brute force all possible paths, but the rolling behavior means many redundant checks and exponential time in the worst case.
- Observing the problem, this is a *shortest-path problem on a grid where each roll is a weighted move* (the weight is the number of cells rolled over in each straight move).
- **Dijkstra's algorithm** fits best: treat each cell as a node, and each “roll” as an edge with a cost equal to the distance rolled.
- Use a priority queue to always expand the next cell with the least distance accumulated so far.
- Track the best known (shortest) distance to each cell, and *prune* longer paths.
- Trade-offs: BFS could also work, but standard BFS assumes unweighted edges—here, each edge (roll) can have different lengths, so Dijkstra is more optimal.

### Corner cases to consider  
- The start and destination are the same.
- The start or destination cell is a wall.
- There are no open paths at all.
- Very large grids (up to 100×100), so efficiency matters.
- Multiple minimal-length paths to the destination.
- Cells reached by rolling must be minimal (cannot stop before hitting the wall).
- Minimum solution may not be unique, but only the distance is required.

### Solution

```python
import heapq

def shortestDistance(maze, start, destination):
    rows, cols = len(maze), len(maze[0])
    dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right

    # Distance to each cell, initialized to infinity
    dist = [[float('inf')] * cols for _ in range(rows)]
    dist[start[0]][start[1]] = 0

    # Priority Queue: (distance_so_far, row, col)
    heap = [(0, start[0], start[1])]

    while heap:
        d, x, y = heapq.heappop(heap)
        # Stop if we reach destination with shortest path already
        if [x, y] == destination:
            return d
        # If we've already found a shorter path to this cell, skip
        if d > dist[x][y]:
            continue
        for dx, dy in dirs:
            nx, ny, nd = x, y, 0
            # Roll ball until it hits a wall
            while 0 <= nx + dx < rows and 0 <= ny + dy < cols and maze[nx + dx][ny + dy] == 0:
                nx += dx
                ny += dy
                nd += 1
            # If a shorter path to (nx,ny) is found, update and push to queue
            if dist[x][y] + nd < dist[nx][ny]:
                dist[nx][ny] = dist[x][y] + nd
                heapq.heappush(heap, (dist[nx][ny], nx, ny))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × log(m × n)), where m and n are the maze dimensions. Each cell can be entered up to 4 times (from each direction), and we use a heap for efficient min-extraction.
- **Space Complexity:** O(m × n) for the distance table and the priority queue’s size in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to return the actual **path** taken, not just its length?  
  *Hint: Store predecessors for each cell and backtrack once the shortest distance is found.*

- How would you modify the solution to return **all minimum-length paths**?  
  *Hint: Use BFS layer tracking or adapt Dijkstra with parent-lists, but this increases complexity.*

- How does the time complexity change if we use **BFS without a priority queue**?  
  *Hint: Without a heap, BFS explores in simple layers, but since moves are not unit-cost, it may process non-minimum paths—so Dijkstra with a heap is optimal here.*

### Summary
This problem is a classic example of **shortest path in a grid with custom movement rules**—specifically, rolling until walls, not moving cell-by-cell. The **graph traversal pattern with Dijkstra’s algorithm** and a priority queue ensures minimum distance is found efficiently. This approach is broadly applicable to shortest path problems where edge costs (step sizes) vary, such as games, robots in a room, or automated navigation puzzles.


### Flashcard
Use Dijkstra’s algorithm with a priority queue to find the shortest distance, treating each straight roll as a weighted move until hitting a wall.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Shortest Path(#shortest-path)

### Similar Problems
- The Maze(the-maze) (Medium)
- The Maze III(the-maze-iii) (Hard)