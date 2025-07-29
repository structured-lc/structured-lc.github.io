### Leetcode 3341 (Medium): Find Minimum Time to Reach Last Room I [Practice](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i)

### Description  
Given a dungeon represented by an n × m grid, you start at the top-left room (0, 0) at time 0. Each room (i, j) in the grid has an integer moveTime[i][j] representing the **earliest** time you can enter that room. You may only move one cell up, down, left, or right in 1 second per move. Your goal is to determine the **minimum time** needed to reach the bottom-right room (n-1, m-1) following all movement constraints.

### Examples  

**Example 1:**  
Input:  
`moveTime = [[0,1,3],[2,5,1],[4,2,0]]`  
Output: `7`  
*Explanation:  
Start at (0,0) at t=0.  
- Move to (0,1): Earliest entry is t=1 (moveTime[1]=1), move takes 1s → t=1.  
- (0,2): Earliest is t=3 (moveTime[2]=3), need to wait till t=3.  
Continue through the optimal path, always moving as soon as possible, possibly waiting if you arrive early. Total minimum time to reach (2,2) is 7.*

**Example 2:**  
Input:  
`moveTime = [[0,2],[1,0]]`  
Output: `3`  
*Explanation:  
(0,0) → (1,0) → (1,1), must wait till allowed in each cell.*

**Example 3:**  
Input:  
`moveTime = [[0,0,0],[0,0,0],[0,0,0]]`  
Output: `4`  
*Explanation:  
Can move every second, standard shortest path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2), takes 4 seconds as there are 4 moves.*

### Thought Process (as if you’re the interviewee)  
First, observe that this is a **shortest path** problem on a grid, with a twist: You can only enter a room at certain restricted times (moveTime[i][j]). A simple BFS isn’t sufficient because you might have to wait at a room before moving, and entering a room early is forbidden.

A brute-force approach would be to consider all paths (DFS/BFS) but this is too slow for big grids. Instead, each move has a "cost": max(curr time + 1, moveTime[next cell]) — you might need to wait, so earliest possible time at each cell matters.

This hints at using **Dijkstra’s algorithm** because we want the minimum time to each cell, and "waiting" works like a weighted edge. We use a min-heap (priority queue) to always expand the least-time cell next, tracking the earliest time we've reached each cell to avoid unnecessary revisits.

Key trade-off: Dijkstra’s speed compared to BFS. BFS is only optimal if all moves have identical cost, but here the cost to enter a cell varies.

### Corner cases to consider  
- All move times are zero (classic shortest path).
- All move times are large/late (must wait every move).
- It’s faster to take a longer path with lower wait times than a shorter path with high wait times.
- Single-row or single-column grid.
- Only one room: grid size 1×1.
- No possible way to reach (should not occur in valid input as per constraints).

### Solution

```python
import heapq

def findMinimumTime(moveTime):
    n = len(moveTime)
    m = len(moveTime[0])
    
    # minTime[i][j]: earliest time we can reach cell (i, j)
    minTime = [[float('inf')] * m for _ in range(n)]
    minTime[0][0] = 0

    # (curr_time, row, col)
    heap = [(0, 0, 0)]

    # Directions: up, down, left, right
    directions = [(-1,0),(1,0),(0,-1),(0,1)]

    while heap:
        curr_time, row, col = heapq.heappop(heap)
        # If we've reached the end, return time
        if row == n-1 and col == m-1:
            return curr_time
        # Early stop if we've already found a better path
        if curr_time > minTime[row][col]:
            continue
        for dr, dc in directions:
            nr, nc = row + dr, col + dc
            if 0 <= nr < n and 0 <= nc < m:
                # Time when we could enter this cell
                next_time = max(curr_time + 1, moveTime[nr][nc])
                if next_time < minTime[nr][nc]:
                    minTime[nr][nc] = next_time
                    heapq.heappush(heap, (next_time, nr, nc))
    return -1  # grid guaranteed reachable by problem statement
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × log(n × m))  
  Each cell may be entered at most once with a better time (due to Dijkstra). Heap operations per cell cost log(n × m).

- **Space Complexity:** O(n × m)  
  For the minTime matrix and the heap, proportional to the grid size.

### Potential follow-up questions (as if you’re the interviewer)  

- If the maze has some impassable walls (cells you can't enter at all), how would your approach change?  
  *Hint: Skip those cells in neighbor checks — treat as impassable or blocked.*

- How would you return the actual minimum-time path, not just the total time?  
  *Hint: Add a parent pointer structure or backtrack from the end cell.*

- What would you change if the move time restriction instead stated the room must be entered at an **exact** time?  
  *Hint: Revise time calculation so you must wait until exactly `moveTime[i][j]` at each room.*

### Summary
This problem is a classic **shortest path on a weighted grid**, but instead of variable weights, the "waiting time" on each cell forms the cost. **Dijkstra's algorithm** is the optimal fit due to variable wait times ("move costs"). This pattern is highly applicable to grid traversal with delay or unlock constraints, and is a common variant in scheduling, networking, or game pathfinding problems.