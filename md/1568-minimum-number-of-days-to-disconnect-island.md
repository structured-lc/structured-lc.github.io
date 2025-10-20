### Leetcode 1568 (Hard): Minimum Number of Days to Disconnect Island [Practice](https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island)

### Description  
Given an m × n binary grid of 0s (water) and 1s (land), an island is a maximal group of 1s connected 4-directionally (up, down, left, right).  
A grid is considered **connected** if there is **exactly one** island.  
Each day, you can choose any cell and turn a land (1) into water (0).  
Return the minimum number of days required to make the grid **disconnected** (either zero islands, or more than one island).

### Examples  

**Example 1:**  
Input:  
`grid = [[1,1],[1,1]]`  
Output:  
`2`  
*Explanation: Removing one land doesn't break the connection, but after two removals, the island is split.*

**Example 2:**  
Input:  
`grid = [[1,1,0,1,1],[1,1,1,1,1],[1,1,0,1,1],[1,1,0,1,1]]`  
Output:  
`1`  
*Explanation: Removing a specific land cell immediately splits the grid into at least two islands.*

**Example 3:**  
Input:  
`grid = [[1,0,1,0],[0,1,0,1],[1,0,1,0]]`  
Output:  
`0`  
*Explanation: The grid is already disconnected (contains multiple islands), so no removals are needed.*

### Thought Process (as if you’re the interviewee)  

First, to make the grid "disconnected", we need it to either have zero islands or multiple islands.  
A naive brute-force would be:  
- For every land cell, try removing it, count islands, and see if disconnected.  
- That's O((mn)\*mn) since island counting using DFS/BFS is O(mn).

Optimal approach:
- First, check if the grid is **already disconnected** (zero or more than one island): then answer is 0.
- Next, for each land cell, **simulate removal** (set to 0), and check if grid becomes disconnected: if yes, answer is 1.
- If not possible for any cell, **by removing any two cells** it's always possible to disconnect (by removing two adjacent cells, especially a "bridge" cell and a neighbor), so answer is 2.
- Why at most 2? It’s related to graph theory: in any connected undirected graph, there are at least two nodes whose removal disconnects the graph (except for trivial graphs); specifically, for a 4-connected grid, removal of a "bridge" node or a separation point splits the grid.

Trade-offs:
- Not efficient to remove all combinations of two cells, but we don't have to! If not broken by single cell, two is guaranteed.

### Corner cases to consider  
- Empty grid (all zeros)
- Already disconnected islands (multiple islands or no islands)
- One land cell
- "Bridge" regions (removing a cut-point splits the grid instantly)
- Grid with no removable land
- Islands separated diagonally (not connected)

### Solution

```python
def minDays(grid):
    m, n = len(grid), len(grid[0])

    # Directions: Up, Down, Left, Right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]

    # Helper to count islands using DFS
    def count_islands():
        visited = [[False]*n for _ in range(m)]
        def dfs(x, y):
            stack = [(x, y)]
            while stack:
                i, j = stack.pop()
                for di, dj in dirs:
                    ni, nj = i+di, j+dj
                    if 0 <= ni < m and 0 <= nj < n and \
                            not visited[ni][nj] and grid[ni][nj] == 1:
                        visited[ni][nj] = True
                        stack.append((ni, nj))
        cnt = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1 and not visited[i][j]:
                    visited[i][j] = True
                    dfs(i, j)
                    cnt += 1
        return cnt

    # Step 1: already disconnected?
    if count_islands() != 1:
        return 0

    # Step 2: try removing each cell
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                grid[i][j] = 0
                num = count_islands()
                grid[i][j] = 1
                if num != 1:
                    return 1

    # Step 3: can't disconnect with 1; must be 2
    return 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((m×n)²)  
  For each land cell (O(m×n)), simulate its removal and count islands (O(m×n) DFS/BFS), so O((m×n)²).

- **Space Complexity:** O(m×n)  
  For the visited matrix in island-counting, plus recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to also return the coordinates of the land cell(s) to remove?
  *Hint: Track removed cell(s) during simulation, and output them.*

- Can you optimize for huge sparse grids with billions of cells but only a few land cells?
  *Hint: Store land coordinates in a set, use union-find (DSU) for islands.*

- What if diagonally connected 1's also count as connected?
  *Hint: Change connectivity logic to 8 directions.*

### Summary
This problem uses a **grid DFS/BFS island-counting pattern**, with simulation of cell removal to find "cut points".  
The key insight is checking if the grid is already disconnected, then simulating single removals, and leveraging the fact that with two removals, any 4-connected island can always be disconnected.  
This "try plus simulation plus theoretical shortcut" is a common approach for minimum-cut type grid questions.  
Patterns used here (DFS for island count, simulating removals) are also fundamental in problems dealing with "breaking" or "partitioning" graphs or grids.


### Flashcard
Check if already disconnected (0 days); try removing each land cell and recount islands—if disconnected after removal, return 1; else return 2 (articulation point logic).

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix), Strongly Connected Component(#strongly-connected-component)

### Similar Problems
- Disconnect Path in a Binary Matrix by at Most One Flip(disconnect-path-in-a-binary-matrix-by-at-most-one-flip) (Medium)
- Minimum Runes to Add to Cast Spell(minimum-runes-to-add-to-cast-spell) (Hard)