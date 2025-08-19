### Leetcode 3311 (Hard): Construct 2D Grid Matching Graph Layout [Practice](https://leetcode.com/problems/construct-2d-grid-matching-graph-layout)

### Description  
Given an undirected graph with `n` nodes (labeled `0` to `n-1`), where `edges[i] = [u, v]` denotes an edge between nodes `u` and `v`, construct a 2D grid (rows × cols) such that:  
- Each grid cell contains exactly one node and every node appears exactly once.  
- If and only if there is an edge between `u` and `v`, then `u` and `v` must be in adjacent grid cells (horizontally or vertically).  
- The input is guaranteed to form a graph suitable for such a grid.  
Return any grid that fulfills these constraints.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[0,1],[0,2],[1,3],[2,3]]`  
Output:  
```
[[0,1],
 [2,3]]
```  
*Explanation: 0 is connected to 1 (right), 0 to 2 (down), 1 to 3 (down), 2 to 3 (right). Each edge corresponds to adjacency in a 2D grid.*

**Example 2:**  
Input: `n = 6, edges = [[0,1],[1,2],[2,5],[5,4],[4,3],[3,0]]`  
Output:  
```
[[0,1,2],
 [3,4,5]]
```  
*Explanation: The nodes form a 2×3 grid cycle; each edge corresponds to adjacency.*

**Example 3:**  
Input: `n = 9, edges = [[0,1],[1,2],[2,5],[5,8],[7,8],[6,7],[3,6],[0,3],[3,4],[4,5],[6,7],[7,8]]`  
Output:  
```
[[0,1,2],
 [3,4,5],
 [6,7,8]]
```  
*Explanation: The nodes form a 3×3 grid; every grid adjacency matches an edge in the given list.*

### Thought Process (as if you’re the interviewee)  
- Brute force would be to try every possible grid configuration, but the number of permutations is factorial and not feasible.
- Since the graph represents a 2D grid (by guarantee), if we figure out the grid’s size (rows × cols), we can reconstruct the exact node mapping.
- From the number of nodes `n`, try all possible pairs `(rows, cols)` such that `rows × cols = n`. For each shape, try to lay out the graph accordingly.
- Use the graph connectivity:  
  - Each node has up to 4 neighbors (top, right, bottom, left) in a grid. The node degrees should match this property.
- Choose a node with degree ≤ 2 (likely a corner), and start grid traversal either row-wise or column-wise, using BFS or DFS.
- Reconstruct the grid step-by-step: for a starting node, use the neighbors to populate the grid along rows/cols, always making sure adjacencies match the given edge constraints.
- Backtrack if at any point a contradiction arises.

### Corner cases to consider  
- n is 1: single node
- The graph forms a rectangle ("line"), e.g., n=5, edges=[(0,1),(1,2),(2,3),(3,4)]
- The grid is not a square (e.g., n=6, 2×3 grid)
- Nodes given in edges are out of linear order, or edges list is shuffled
- Disconnected components (should not occur as graph is always a valid grid)
- Multiple valid layouts exist (the solution can return any)

### Solution

```python
def construct2DGrid(n, edges):
    # Build adjacency list
    from collections import defaultdict, deque

    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    # Find all possible (rows, cols) such that rows×cols = n
    possible_shapes = []
    for rows in range(1, n + 1):
        if n % rows == 0:
            cols = n // rows
            possible_shapes.append((rows, cols))

    def build_grid(start, rows, cols):
        # Try to reconstruct grid of given size using BFS
        grid = [[-1 for _ in range(cols)] for _ in range(rows)]
        used = set()
        q = deque()
        q.append((0, 0, start))
        grid[0][0] = start
        used.add(start)

        # directions: right, down, left, up
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        pos_map = {start: (0, 0)}

        while q:
            r, c, node = q.popleft()
            idx = 0
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == -1:
                    # Find neighbor not yet used that is connected
                    for neighbor in adj[node]:
                        if neighbor not in used:
                            grid[nr][nc] = neighbor
                            used.add(neighbor)
                            q.append((nr, nc, neighbor))
                            pos_map[neighbor] = (nr, nc)
                            break   # Move to next direction

        # Validate the grid
        grid_flat = [grid[r][c] for r in range(rows) for c in range(cols)]
        if len(set(grid_flat)) != n:
            return None
        for u in range(rows):
            for v in range(cols):
                node = grid[u][v]
                # For adjacent cells: check they are in edge list
                for dr, dc in [(0,1),(1,0)]:
                    nu, nc = u + dr, v + dc
                    if 0 <= nu < rows and 0 <= nc < cols:
                        nnode = grid[nu][nc]
                        if nnode not in adj[node]:
                            return None
        return grid

    # Try each possible shape and each possible start (corner) node
    corners = []
    for node in range(n):
        if len(adj[node]) <= 2:
            corners.append(node)

    for rows, cols in possible_shapes:
        for start in corners:
            grid = build_grid(start, rows, cols)
            if grid:
                return grid

    return []

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). For each valid (rows, cols) pair (there are O(√n)), we do BFS/DFS across n nodes, and for each node check up to 4 neighbors. So total is O(n√n) in the worst case, but since n ≤ 100, practical performance is fast.
- **Space Complexity:** O(n). We store adjacency lists, grid of size n, and some additional bookkeeping structures of linear size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case when the graph is not guaranteed to be grid-matchable?  
  *Hint: What are the necessary structural properties for such a layout?*

- Suppose you want to find all possible grid layouts for this graph, not just one.  
  *Hint: Backtrack on permutations or use graph isomorphism detection.*

- Could you reconstruct the layout with O(1) extra space if the grid is very large?  
  *Hint: Can node labels themselves help encode grid coordinates?*

### Summary
This problem is a classic example of reconstructing a grid-layout from graph adjacencies, leveraging graph traversal and geometric constraints. The core coding pattern is BFS/DFS with explicit grid position mapping. Similar approaches arise in matrix reconstruction, crossword construction, and some puzzle/tiling problems. Key insights include using degrees to identify corners, mapping adjacency directions, and validating the final configuration.

### Tags
Array(#array), Hash Table(#hash-table), Graph(#graph), Matrix(#matrix)

### Similar Problems
