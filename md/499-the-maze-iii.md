### Leetcode 499 (Hard): The Maze III [Practice](https://leetcode.com/problems/the-maze-iii)

### Description  
Given a 2D **maze** represented as a grid, where `0` means empty spaces and `1` means walls, you have a **ball** at a starting position, and a **hole** positioned somewhere in the maze. The ball can roll in any of the four cardinal directions (`u`=up, `d`=down, `l`=left, `r`=right), but it continues to roll in that direction until it hits a wall or falls into the hole. The ball cannot stop mid-way in open spaces. The goal is to find the **shortest sequence of moves** for the ball to reach the hole. If multiple shortest paths exist, return the **lexicographically smallest** one. If it's impossible to reach the hole, return `"impossible"`.

### Examples  

**Example 1:**  
Input:  
maze=`[[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]]`,  
ball=`[4,3]`,  
hole=`[0,1]`  
Output: `"lul"`  
*Explanation: The ball rolls left, up, left, and falls into the hole at the shortest distance, and among possible paths this is lex smallest.*  

**Example 2:**  
Input:  
maze=`[[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]]`,  
ball=`[4,3]`,  
hole=`[3,0]`  
Output: `"impossible"`  
*Explanation: The hole at [3,0] cannot be reached from the starting ball's position because all possible paths are blocked by walls.*[4]

**Example 3:**  
Input:  
maze=`[[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,0,0,0,0]]`,  
ball=`[4,5]`,  
hole=`[1,1]`  
Output: `drul`  
*Explanation: The shortest lex smallest path rolls down, right, up, and left into the hole.*


### Thought Process (as if you’re the interviewee)  
Start with **brute-force**: Try all possible paths by DFS/BFS, simulating the ball's rolling motion—at each stop, try all directions. But this is too slow and may revisit the same spot with longer or lexicographically worse paths.

**Optimization:**  
- Each state (position in maze) should encode the **minimum distance** and **lex smallest path** to reach it.  
- **Dijkstra’s algorithm** fits perfectly: Use a priority queue (min-heap) ordered by total distance, then lex order of path string.  
- For every dequeue from the heap:
  - If at the hole, return path.
  - For each direction: "roll" the ball as far as possible (or until falling into the hole), counting cells traversed. If the new position is better (shorter path, or same but lex smaller), enqueue it with its updated path and distance.  
- Only store the shortest/lex smallest path to each cell to avoid unnecessary revisits.[1][3]

**Why Dijkstra over BFS?** Because the step count to reach a cell may vary based on the roll due to the ball traveling in straight lines—greedy by step count; if tie, by lex order.

### Corner cases to consider  
- Ball starts at the hole (should return an empty string).
- Impossible to reach the hole (surrounded by walls).
- Multiple shortest paths: must return lex smallest one.
- Very small mazes (1×1), ball/hole at maze edge, or corner.
- Ball or hole directly adjacent to wall.

### Solution

```python
import heapq

def findShortestWay(maze, ball, hole):
    from collections import defaultdict

    m, n = len(maze), len(maze[0])
    dirs = [(-1,0,'u'), (1,0,'d'), (0,-1,'l'), (0,1,'r')]

    heap = []
    # (dist, path, row, col)
    heapq.heappush(heap, (0, "", ball[0], ball[1]))

    visited = dict()  # (row, col): (dist, path)

    while heap:
        dist, path, x, y = heapq.heappop(heap)
        # If already found this pos with shorter or same dist/lex smaller path, skip
        if (x, y) in visited and (visited[(x, y)][0] < dist or
                                  (visited[(x, y)][0] == dist and visited[(x, y)][1] <= path)):
            continue
        visited[(x, y)] = (dist, path)

        if [x, y] == hole:
            return path

        for dx, dy, dchar in dirs:
            nx, ny = x, y
            steps = 0
            # Advance in current direction until hitting wall or falling into hole
            while 0 <= nx + dx < m and 0 <= ny + dy < n and maze[nx + dx][ny + dy] == 0:
                nx += dx
                ny += dy
                steps += 1
                if [nx, ny] == hole:
                    break
            # Add to heap if not worse
            if ((nx, ny) not in visited or
                dist + steps < visited[(nx, ny)][0] or
                (dist + steps == visited[(nx, ny)][0] and path + dchar < visited[(nx, ny)][1])):
                heapq.heappush(heap, (dist + steps, path + dchar, nx, ny))

    return "impossible"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n×4×max(m,n)), since each cell in the maze can potentially be visited in up to 4 directions, and each roll in a direction may cost up to max(m, n) steps.
- **Space Complexity:** O(m×n), for storing the shortest path to each unique (row, col) cell.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple holes, and you want the nearest?
  *Hint: Modify target condition or search for the closest one during traversal.*

- How would you return the number of different shortest paths instead of just one?
  *Hint: Instead of saving only smallest lex path, keep a counter for each cell for number of shortest arrival paths.*

- Could you optimize for memory if the maze is much larger?
  *Hint: Consider bidirectional search, or pruning repeated state visits more aggressively. Also compress visited state with coordinate hashing.*

### Summary
This is a **graph search** problem with an atypical movement pattern (rolling till stop). It’s a variant of Dijkstra’s algorithm with a lexicographical tie-breaker: maintain a priority queue ordered by distance and then path string. This pattern appears in "maze" or "robot rolling" problems on grids, and is a great template whenever shortest path is not grid-adjacency but can "slide" or "roll" to destination.