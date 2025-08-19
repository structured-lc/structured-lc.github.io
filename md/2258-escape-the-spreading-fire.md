### Leetcode 2258 (Hard): Escape the Spreading Fire [Practice](https://leetcode.com/problems/escape-the-spreading-fire)

### Description  
Given a grid, each cell is either:
- **0 → grass** (can step on),
- **1 → fire** (will spread every minute to adjacent grass cells, but not through walls),
- **2 → wall** (impassable for both fire and you).

You start at the **top-left** (0,0) and want to reach the **bottom-right corner** (the safehouse).  
Every minute you can move to any adjacent grass cell (up/down/left/right). Fire starts spreading from all '1' cells at the same time.  
You want to choose the **maximum integer t**:  
- Wait t minutes at the start (0,0),
- Then move (as above) to reach the safehouse **before the fire does**.

**Return:**
- The *largest* time `t` that lets you safely reach the safehouse (**not touching or entering a cell at the same time as fire**).  
- If it’s impossible to reach, return **-1**.
- If any large wait time works (can always outpace fire), return **10⁹**.

### Examples  

**Example 1:**  
Input: `grid = [[0,2,0,0,0],[0,2,0,2,1],[0,0,0,2,0],[0,2,2,0,0],[0,0,0,0,0]]`  
Output: `3`  
*Explanation: Fire starts at (1,4). After 3 min, you can go around the fires/walls and reach (4,4) safely.*

**Example 2:**  
Input: `grid = [[0,0,0],[0,1,0],[0,2,0]]`  
Output: `-1`  
*Explanation: Fire blocks any path to safehouse.*

**Example 3:**  
Input: `grid = [[0,0,0],[2,2,0],[0,0,0]]`  
Output: `10**9`  
*Explanation: Walls completely block fire from ever reaching the path; you can wait as long as you like.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible wait times (from 0 up to some upper bound like 10⁹), and for each, simulate fire spread and then try to move to the safehouse, **avoiding any cell the fire reaches before or at the same time**. This would be far too slow, as the search space is huge.

- **Key Insight:**  
  - Both your movement and fire spread behave in "waves" (breadth-first).
  - For *any* cell, we can compute:  
    - The earliest time **fire** reaches it, and  
    - The earliest time **you** can reach it (having waited t minutes first).
  - Once we know the fire reach times for every cell, checking "can I reach the safehouse after waiting t?" is a pathfinding problem with an extra constraint:  
    - At step s, at cell (x,y), time = t+s. You must have (t+s) < fire_arrival_time[(x,y)].

- **Binary Search + BFS:**  
  - Precompute the time fire reaches each cell (multi-source BFS from all fire sources).
  - Use **binary search** on t (the wait time). For each candidate t:
    - Simulate your own BFS path (after waiting t), **never stepping into a cell if you’d be there at or after the fire arrives**.
    - If you reach the safehouse, try a higher t; if not, lower t.
  - Binary search gives O(log(max_time)) iterations, each BFS costs O(m\*n).
  - Why binary search? Because if you can make it with t, you can do so for smaller t; so answer is monotonic.

- **Edge:**  
  If the fire cannot ever block your path, return 1,000,000,000.

### Corner cases to consider  
- No path due to walls.
- Immediate fire at start or end cell.
- Safehouse is surrounded by walls.
- Fire entirely blocked by walls (so you can always wait).
- Start and end are the same cell.
- Multiple fire sources.
- Grid of size 1×1.

### Solution

```python
from collections import deque

def maximumMinutes(grid):
    # Dimensions
    m, n = len(grid), len(grid[0])
    
    # Directions: up, down, left, right
    dirs = [(-1,0),(1,0),(0,-1),(0,1)]
    
    # Step 1: Multi-source BFS to get fire reach time for every cell
    fireTime = [[float('inf')] * n for _ in range(m)]
    fire_q = deque()
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                fire_q.append((i,j,0))
                fireTime[i][j] = 0
                
    while fire_q:
        x, y, t = fire_q.popleft()
        for dx, dy in dirs:
            nx, ny = x+dx, y+dy
            if 0<=nx<m and 0<=ny<n and grid[nx][ny]==0 and fireTime[nx][ny] == float('inf'):
                fireTime[nx][ny] = t+1
                fire_q.append((nx, ny, t+1))
    
    # Helper: can you reach (m-1, n-1) if you wait wait_time at start?
    def can_escape(wait_time):
        if fireTime[0][0] <= wait_time:
            return False  # fire already arrived before/at your start
        vis = [[-1]*n for _ in range(m)]
        q = deque()
        q.append((0,0,wait_time))  # position, time
        vis[0][0] = wait_time
        while q:
            x, y, t = q.popleft()
            # At the goal cell:
            if (x, y) == (m-1, n-1):
                # You can arrive at the same minute as fire
                if t <= fireTime[x][y]:
                    return True
                else:
                    continue
            for dx, dy in dirs:
                nx, ny = x+dx, y+dy
                # Valid cell, grass, not visited with an earlier time
                if (0<=nx<m and 0<=ny<n and grid[nx][ny]==0
                    and (vis[nx][ny]==-1 or t+1 < vis[nx][ny])):
                    arrive = t+1
                    # Need to arrive before fire
                    if arrive < fireTime[nx][ny]:
                        vis[nx][ny] = arrive
                        q.append((nx, ny, arrive))
                    elif (nx, ny) == (m-1, n-1) and arrive == fireTime[nx][ny]:
                        # Allowed to arrive at safehouse *same* time as fire
                        vis[nx][ny] = arrive
                        q.append((nx, ny, arrive))
        return False
    
    # Binary search max t so that can_escape(t) holds
    left, right, ans = 0, 10**9, -1
    while left <= right:
        mid = (left + right)//2
        if can_escape(mid):
            ans = mid
            left = mid + 1
        else:
            right = mid - 1
            
    if ans == 10**9:
        return 10**9
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **Fire BFS:** O(m×n)
  - Each **binary search** iteration: O(m×n) BFS
  - Binary search log₂(10⁹) ≈ 30
  - **Total:** O((m×n) × log(max_time)), with max_time up to 10⁹.

- **Space Complexity:**  
  - **O(m×n)** for fire reach times and visited arrays (no recursion stack).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if fire can spread diagonally?
  *Hint: Add diagonal directions in the BFS steps for both fire/person.*

- What if there are multiple safehouses (multiple possible exits)?
  *Hint: In can_escape, allow the person to exit upon reaching any allowed exit cell.*

- Can you optimize for the *shortest* path if fire is spreading, not the maximum wait time?
  *Hint: Remove binary search; just do BFS with dynamic danger windows.*

### Summary
This problem demonstrates the **BFS + binary search** technique:  
- Use BFS for "wave-like" propagation (fire, person) and  
- Use binary search when answers are monotonic with respect to some parameter (wait time).  
This pattern appears often in problems involving *moving obstacles*, *escaping spreading danger*, or *min/max pathing under monotone constraints*.

### Tags
Array(#array), Binary Search(#binary-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Rotting Oranges(rotting-oranges) (Medium)
- Last Day Where You Can Still Cross(last-day-where-you-can-still-cross) (Hard)
- Minimum Weighted Subgraph With the Required Paths(minimum-weighted-subgraph-with-the-required-paths) (Hard)
- Maximum Number of Points From Grid Queries(maximum-number-of-points-from-grid-queries) (Hard)