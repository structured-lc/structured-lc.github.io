### Leetcode 286 (Medium): Walls and Gates [Practice](https://leetcode.com/problems/walls-and-gates)

### Description  
You’re given an m×n grid representing rooms in a building.  
- **0** means a gate  
- **-1** means a wall or obstacle  
- **INF** (2,147,483,647) means an empty room

You need to fill each empty room with the distance to its **nearest gate**. If a room can’t reach any gate, it should stay as INF. Walls remain unchanged. You can only move up, down, left, or right.


### Examples  

**Example 1:**  
Input:  
```
rooms = [
  [INF, -1,  0, INF],
  [INF, INF, INF, -1],
  [INF, -1, INF, -1],
  [0,   -1, INF, INF]
]
```
Output:  
```
rooms = [
  [3, -1, 0, 1],
  [2, 2, 1, -1],
  [1, -1, 2, -1],
  [0, -1, 3, 4]
]
```
Explanation:  
Start BFS from every gate (cells with 0). For each adjacent empty room (INF), set distance = distance to gate + 1. Repeat until all rooms are filled with minimal distances.

**Example 2:**  
Input:  
```
rooms = [
  [0, INF],
  [INF, -1]
]
```
Output:  
```
rooms = [
  [0, 1],
  [1, -1]
]
```
Explanation:  
The only gate is at (0,0). All reachable rooms are filled with their minimal steps count.

**Example 3:**  
Input:  
```
rooms = [
  [-1, 0],
  [INF, -1]
]
```
Output:  
```
rooms = [
  [-1, 0],
  [1, -1]
]
```
Explanation:  
The room at (1,0) is 1 step away from the nearest gate at (0,1).


### Thought Process (as if you’re the interviewee)  
- Brute-force idea: For every empty room, perform BFS or DFS to find the nearest gate. That means O((m×n)\*(m×n)) time—very slow for large m, n.

- Better: Instead, **reverse the direction**.  
  - Start BFS from every gate simultaneously (“multi-source BFS”).  
  - Each time you move one step out, increment distance by 1.  
  - Fill rooms only if their current value is greater than the new computed distance (ensures minimal distance).  
  - This ensures we process each room the minimum number of times needed, with the shortest paths.

- Trade-off:  
  - BFS is ideal here: it always finds the shortest path in an unweighted grid.
  - DFS could be used but becomes inefficient since it may re-traverse the same rooms with longer distances.


### Corner cases to consider  
- Grid with **no gates**: All INF remain; no updates should happen.  
- Grid with **all walls**: Nothing to update.  
- Grid is **empty** or only contains gates/walls.  
- Rooms that are **completely surrounded by walls** (unreachable from any gate) remain INF.  
- Large grids: Algorithm must avoid TLE or stack overflow (avoid recursive DFS).


### Solution

```python
from collections import deque

def wallsAndGates(rooms):
    if not rooms or not rooms[0]:
        return

    m, n = len(rooms), len(rooms[0])
    INF = 2**31 - 1

    # Initialize BFS queue with all the gates.
    queue = deque()
    for i in range(m):
        for j in range(n):
            if rooms[i][j] == 0:   # gate
                queue.append((i, j))

    directions = [(-1,0), (1,0), (0,-1), (0,1)] # up, down, left, right

    while queue:
        i, j = queue.popleft()
        for di, dj in directions:
            ni, nj = i + di, j + dj

            # Check bounds and only visit empty rooms that haven't been filled yet
            if 0 <= ni < m and 0 <= nj < n and rooms[ni][nj] == INF:
                rooms[ni][nj] = rooms[i][j] + 1
                queue.append((ni, nj))
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(m × n) — Each cell is visited at most once. Gates add their neighbors only if they are empty rooms.

- **Space Complexity:**  
  - O(m × n) in the worst case, for the BFS queue if all rooms are empty. Otherwise, space is proportional to the number of rooms being processed.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if some cells had different step costs?  
  *Hint: Think about Dijkstra’s or priority queue BFS.*

- What if you had to find the actual shortest path (not just the length) to the nearest gate for each room?  
  *Hint: Backtrack or store parent pointers as you fill rooms.*

- Could you do this in-place if you weren’t allowed extra space except for constant-sized variables?  
  *Hint: Can you encode visited state + distance in the rooms grid itself, or use in-place traversal techniques?*


### Summary
This problem is a classic **multi-source BFS** on a grid, a core technique for shortest distance mapping with multiple sources. It’s similar to “rotting oranges”, “nearest exit in maze”, and other shortest-path-from-multiple-starts grid problems. It's highly applicable in pathfinding, networks, or map navigation interview scenarios and tests one's ability to optimize traversal by thinking about the *reverse* approach—starting from the destination(s).

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Surrounded Regions(surrounded-regions) (Medium)
- Number of Islands(number-of-islands) (Medium)
- Shortest Distance from All Buildings(shortest-distance-from-all-buildings) (Hard)
- Battleships in a Board(battleships-in-a-board) (Medium)
- Robot Room Cleaner(robot-room-cleaner) (Hard)
- Rotting Oranges(rotting-oranges) (Medium)
- Count the Number of Houses at a Certain Distance I(count-the-number-of-houses-at-a-certain-distance-i) (Medium)
- Count the Number of Houses at a Certain Distance II(count-the-number-of-houses-at-a-certain-distance-ii) (Hard)