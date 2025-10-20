### Leetcode 749 (Hard): Contain Virus [Practice](https://leetcode.com/problems/contain-virus)

### Description  
You're given a 2D grid representing a world where a **virus** is spreading.  
- Each cell can be:
  - 0: Uninfected
  - 1: Infected (virus present)
  - -1: Quarantined (wall placed; cannot spread)
- Each day, you can **build walls around only one region**—specifically, the infected region that would otherwise infect the most uninfected (zero) cells in the next wave.
- After walling this region, the virus in other regions spreads **to all unblocked, four-directionally adjacent cells** before the next day.
- The process repeats until the virus cannot spread further.
- **Return the total number of walls built**.

### Examples  

**Example 1:**  
Input:  
```
isInfected = [
  [0,1,0,0,0,0,0,1],
  [0,1,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,1],
]
```
Output: `10`  
*Explanation:  
- On day 1, wall off the region at (0,1). It would infect 3 cells if left unchecked. Build 5 walls around it.
- Next, wall off the region at (0,7). It would infect 2 cells. Build 5 more walls.
- The remaining region can't infect uninfected cells, stop.*

**Example 2:**  
Input:  
```
isInfected = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
```
Output: `4`  
*Explanation:  
- On day 1, wall off the center region, which threatens the middle (1,1) cell; build 4 walls.
- Virus can't spread anymore as all are quarantined or surrounded.*

**Example 3:**  
Input:  
```
isInfected = [
  [1,1,1,0,0,0,0,0,0],
  [1,0,1,0,1,1,1,1,1],
  [1,1,1,0,0,0,0,0,0]
]
```
Output: `13`  
*Explanation: Wall off the most threatening region each time, sum up required wall segments each day.*


### Thought Process (as if you’re the interviewee)  

- **Simulate step by step:**  
  Each round:  
  1. Identify all contaminated regions via DFS/BFS (find all connected groups of ‘1’s).
  2. For each region, evaluate:
     - Which **uninfected (0) cells** each region could infect next (using a set to avoid counting duplicates).
     - **Count number of walls needed** to quarantine each region this day.
  3. **Choose the region** whose infection would affect the most uninfected cells.
  4. Place walls: mark these cells as quarantined (e.g., -1).
  5. For all other regions, **spread the virus** to their adjacent uninfected cells.
  6. Repeat, accumulating wall count, until no infection can propagate.
- **Why DFS/BFS?**  
  Each step requires traversing the grid to find regions: graph connectivity, so DFS or BFS is apt.
- **Trade-offs:**  
  - Brute force is unavoidable for region finding each day, but each grid cell is visited O(1) per iteration.
  - Use **sets** or marking grids to avoid double-counting newly threatened cells and cells already walled off.
- **Final approach:**  
  Use DFS to enumerate regions, select the most threatening, quarantine, then propagate infection from others.

### Corner cases to consider  
- Entire grid already infected: output is 0.
- Grid has no infected cells: output is 0.
- Grid is very small (1×1, 1×n, n×1).
- Multiple infected regions, each isolated.
- Infection is already surrounded by previously placed walls (-1).
- Grid contains cycles or nontrivial shapes.

### Solution

```python
def containVirus(isInfected):
    from collections import deque, defaultdict

    m, n = len(isInfected), len(isInfected[0])
    total_walls = 0

    while True:
        regions = []
        frontiers = []
        walls_needed = []

        visited = [[False]*n for _ in range(m)]
        
        # Find all regions via DFS
        for i in range(m):
            for j in range(n):
                if isInfected[i][j] == 1 and not visited[i][j]:
                    region = []
                    frontier = set()
                    walls = 0
                    stack = [(i,j)]
                    visited[i][j] = True
                    while stack:
                        x, y = stack.pop()
                        region.append((x,y))
                        for dx,dy in ((0,1),(1,0),(0,-1),(-1,0)):
                            nx, ny = x+dx, y+dy
                            if 0 <= nx < m and 0 <= ny < n:
                                if isInfected[nx][ny] == 0:
                                    frontier.add( (nx,ny) )
                                    walls += 1
                                elif isInfected[nx][ny] == 1 and not visited[nx][ny]:
                                    visited[nx][ny] = True
                                    stack.append( (nx,ny) )
                    regions.append(region)
                    frontiers.append(frontier)
                    walls_needed.append(walls)
        
        # If no regions, done
        if not regions:
            break
        
        # Find region with max possible infections
        max_idx = 0
        for i in range(1, len(frontiers)):
            if len(frontiers[i]) > len(frontiers[max_idx]):
                max_idx = i

        # Add walls needed for the worst region
        total_walls += walls_needed[max_idx]
        
        # Quarantine this region: set its cells to -1 (walls)
        for x, y in regions[max_idx]:
            isInfected[x][y] = -1
        
        # Spread virus for other regions
        for i in range(len(regions)):
            if i == max_idx:
                continue
            for x,y in frontiers[i]:
                isInfected[x][y] = 1

    return total_walls
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each cell may be visited multiple times, but no more than O(m\*n) per round, total O((m\*n)²) worst case.
  - For every round (max O(m\*n)), finding regions and updating takes O(m\*n).

- **Space Complexity:**  
  - O(m\*n): for visited grid, region/frontier lists, recursion/stack frames.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were allowed to build walls around *more than one* region per day?
  *Hint: Would a greedy strategy still work or would you need dynamic programming?*
- How would you handle “diagonal adjacency” instead of strictly four directions?
  *Hint: Would the BFS/DFS be much different?*
- What if the grid is *very large* (e.g., 10⁶ cells)?  
  *Hint: How would you optimize the per-step simulation or use better data structures?*

### Summary
This problem combines **graph traversal** (for region detection using DFS/BFS), **greedy selection** (always wall off the most threatening region), and **simulation** (stepwise virus spreading). The pattern is a generic connected region expansion and containment scenario, often seen in grid-based problems (such as island, flooding, or contagion simulation challenges).


### Flashcard
Each day, identify all infected regions via DFS, compute walls needed and threatened cells per region; quarantine region threatening most cells, repeat until no spread.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Count the Number of Infection Sequences(count-the-number-of-infection-sequences) (Hard)