### Leetcode 803 (Hard): Bricks Falling When Hit [Practice](https://leetcode.com/problems/bricks-falling-when-hit)

### Description  
Given a 2D grid representing a section of a wall, where **1** means a brick is present and **0** means the cell is empty, you are given a list of hits (brick erasures). Each hit specifies a coordinate where a brick is to be removed (if any is present). The **stability** of a brick depends on:

- A brick is **stable** if it is directly connected to the top row (*the "roof"*), or if it is connected to any brick that is stable via up, down, left, or right.
- When a brick is removed, some bricks may lose stability and "fall" (are removed from the grid).
- For each hit, return the number of bricks that fall (excluding the brick just hit/removed).

Your task: Simulate each hit and output an array where `res[i]` is the number of bricks that fell after the iᵗʰ hit (excluding the brick directly removed by the hit itself) [1][3][4].

### Examples  

**Example 1:**  
Input:  
`grid = [[1,0,0,0],[1,1,1,0]]`,  
`hits = [[1,0]]`  
Output:  
`[2]`  
Explanation: Removing the brick at (1,0) causes (1,1) and (1,2) to fall, as they are no longer connected to the roof.

**Example 2:**  
Input:  
`grid = [[1,0,0,0],[1,1,0,0]]`,  
`hits = [[1,1],[1,0]]`  
Output:  
`[0,0]`  
Explanation:  
- First hit (1,1): remove brick at that cell. No adjacent bricks lose stability.  
- Second hit (1,0): remove brick, but the only possible brick above is already gone. No bricks fall in either case[1].

**Example 3:**  
Input:  
`grid = [[1,1,1],[0,1,0],[0,0,0]]`,  
`hits = [[0,2],[2,0],[0,0],[1,1]]`  
Output:  
`[0,0,1,0]`  
Explanation:  
- Remove (0,2): still connected via (0,0)-(0,1)-(1,1).
- Remove (2,0): already empty, nothing falls.
- Remove (0,0): (0,1) loses connection to top and falls.
- Remove (1,1): after previous steps, nothing new falls.

### Thought Process (as if you’re the interviewee)  

- **Brute-force**: For each hit, remove the brick, run BFS/DFS from the top row to mark stable bricks, and count how many bricks fall (are no longer reachable from the roof).  
    - Problem: For each of H hits, BFS/DFS over the grid (each O(n×m)), so total is O(H×n×m) -- too slow for large grids and many hits.

- **Optimized Approach**:
    - **Reverse simulation**: Instead of processing hits and recomputing stability every time, do all hits first in the grid: mark all bricks to be hit as 0 (temporarily).
    - Use a **Union-Find (Disjoint Set Union, DSU)** data structure to keep track of which bricks are "connected to the roof".
    - After initial removals, union all currently stable bricks to the roof (first row) and to adjacent bricks.
    - Then process hits **in reverse order**: for each hit, if there was actually a brick at that location, restore it and union it with up/down/left/right neighbors. Compare the number of bricks now connected to the roof (before and after), and record how many extra bricks were connected (those are the ones that "would have fallen" if we did this hit forwards)[1].
    - Reverse the final answer array to match the original hit order.

- **Why this is better**: Union-Find is very efficient for dynamic connectivity queries, and we avoid repeated BFS/DFS traversals.

### Corner cases to consider  
- Hitting an empty cell -- should return 0 for that hit.
- Multiple hits on the same cell.
- All bricks already connected directly to roof (no brick will ever fall).
- Grid of all 0s or all 1s.
- Large grid; must avoid O(H×n×m) operations.
- Hits at the top row: the "roof" brick always stays unless it's hit.

### Solution

```python
# DSU/Union-Find based approach. Each brick is a node, plus a special "roof" node at index rows * cols.
# For each brick, if it's on the top row, connect it to the roof.
# When a brick is restored, union with its neighbors.
# For each "restore", the number of newly attached (non-roof) bricks is the answer for that hit.

class DSU:
    def __init__(self, N):
        self.parent = list(range(N))
        self.size = [1] * N
    
    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, x, y):
        xr = self.find(x)
        yr = self.find(y)
        if xr == yr:
            return 0
        if self.size[xr] < self.size[yr]:
            xr, yr = yr, xr
        self.parent[yr] = xr
        self.size[xr] += self.size[yr]
        return self.size[yr]

    def get_size(self, x):
        return self.size[self.find(x)]


def hitBricks(grid, hits):
    rows, cols = len(grid), len(grid[0])
    def index(r, c):
        return r * cols + c

    # Copy the grid so that we can modify it
    grid_cp = [row[:] for row in grid]
    for r, c in hits:
        if grid_cp[r][c] == 1:
            grid_cp[r][c] = 0  # Mark as removed

    dsu = DSU(rows * cols + 1)  # extra node for roof
    roof = rows * cols

    # Initial unions (stable after all removals)
    for r in range(rows):
        for c in range(cols):
            if grid_cp[r][c] == 1:
                if r == 0:
                    dsu.union(index(r,c), roof)
                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                    nr, nc = r+dr, c+dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid_cp[nr][nc] == 1:
                        dsu.union(index(r,c), index(nr,nc))

    ans = []
    for r, c in reversed(hits):
        before = dsu.get_size(roof)
        if grid[r][c] == 0:
            ans.append(0)
            continue
        # Restore the brick
        grid_cp[r][c] = 1
        # If on top row, connect to roof
        if r == 0:
            dsu.union(index(r,c), roof)
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < rows and 0 <= nc < cols and grid_cp[nr][nc] == 1:
                dsu.union(index(r,c), index(nr,nc))
        after = dsu.get_size(roof)
        fallen = max(0, after - before - 1)
        ans.append(fallen)

    return ans[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((rows × cols) + len(hits)) × α(N), where α(N) is the inverse Ackermann function (nearly constant in practice).  
    - Each union/find is almost constant time.  
    - Each cell is processed a constant number of times.

- **Space Complexity:** O(rows × cols), for the DSU parent and size arrays, and a copy of the grid.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid was infinite or very sparse?  
  *Hint: Can you use a hash-based DSU or other structure for sparse data?*

- How would you optimize further if hits were streaming in real-time?  
  *Hint: Consider persistent data structures or batch incremental processing.*

- Can this be adapted for random holes elsewhere—e.g., falling only if surrounded on all four sides?  
  *Hint: Revise the "stability" rule and see if the approach still applies.*

### Summary
This is a classic **reverse processing** union-find (DSU) problem. Instead of simulating each removal and propagation, we simulate in reverse, restoring bricks and joining them up. This can be seen in other dynamic connectivity problems, like dynamic graph connectivity and percolation/physics on grids. The **reverse restoration + DSU** pattern is particularly efficient for problems that require multiple queries about component stability or connectivity after a series of changes.