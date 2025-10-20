### Leetcode 2123 (Hard): Minimum Operations to Remove Adjacent Ones in Matrix [Practice](https://leetcode.com/problems/minimum-operations-to-remove-adjacent-ones-in-matrix)

### Description  
Given a binary matrix (a 2D grid containing only 0 and 1), we need to transform the matrix so that **no two 1s are 4-directionally adjacent** (no two 1s share an edge). In each operation, we can choose any 1 in the matrix and flip it to 0. The goal is to return the **minimum number of operations required** to make the matrix "well-isolated" (no horizontally or vertically adjacent 1s).

### Examples  

**Example 1:**  
Input: `grid = [[1,1,0],[0,1,1],[1,0,1]]`  
Output: `2`  
*Explanation: Flip the 1s at positions (1,1) and (1,2) or (1,2) and (2,2) to 0. No two 1s are now adjacent.*

**Example 2:**  
Input: `grid = [[1,0],[1,1]]`  
Output: `1`  
*Explanation: Flip the 1 at (1,1) or (1,0). Only one flip is required to isolate all 1s.*

**Example 3:**  
Input: `grid = [[0,0,0],[0,0,0]]`  
Output: `0`  
*Explanation: There are no 1s, so the matrix is already well-isolated.*

### Thought Process (as if you’re the interviewee)  

To solve this, first, I’d consider the brute-force approach:  
- Enumerate all possible ways to flip 1s such that after flipping, no 1s remain adjacent.
- Clearly, this is exponential in number of 1s and not feasible for large matrices.

Let’s look for a better structure. Notice that in order to remove all adjacent pairs of 1s, for each such pair, **at least one 1 must be flipped**.

This is essentially a problem of removing minimal 1s so that nothing remains adjacent. We can model this as a **graph problem**:
- Build a graph where “nodes” are the positions of 1s. Draw an edge between two 1s if they are adjacent.
- The minimum set of 1s we need to flip so that no edge remains is called the **minimum vertex cover**.

For a bipartite graph (which our grid is, coloring like a chessboard), the **minimum vertex cover** has a well-known solution:  
the minimum vertex cover size = maximum matching size (König’s theorem).

So, color the grid like a chessboard (alternate squares), and for every pair of adjacent 1s, connect them as an edge between “black” and “white” squares. Then, the answer is the size of the maximum matching — that is, the minimum number of 1s we need to flip so that there are no adjacent 1s left.

This allows for an efficient maximum bipartite matching algorithm, such as DFS-based Hungarian algorithm.

### Corner cases to consider  
- The matrix has all 0s — return 0.
- The matrix has no adjacent 1s — return 0.
- The matrix is empty or 1×1 — return 0 (or min(1, value) if single cell with 1).
- The matrix is long and thin (single row or column).
- The grid has isolated groups (clusters) of adjacent 1s.

### Solution

```python
def minimumOperations(grid):
    # Dimensions
    m, n = len(grid), len(grid[0])

    # Each cell is colored as (i + j) % 2 (like a chessboard)
    # Build edge list: between black and white nodes (i, j with grid[i][j] == 1)
    from collections import defaultdict

    graph = defaultdict(list)  # u: [v, ...]
    left_nodes = []  # (i, j) where (i + j) % 2 == 0 and grid[i][j] == 1

    # Step 1: Build the bipartite graph
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                if (i + j) % 2 == 0:
                    left_nodes.append((i, j))
                # Check only 4-directional neighbors (up, down, left, right)
                for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                    ni, nj = i + dx, j + dy
                    if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] == 1:
                        # Only connect "chessboard black → white"
                        if (i + j) % 2 == 0:
                            graph[(i, j)].append((ni, nj))

    # Step 2: Bipartite matching using DFS (Hungarian algorithm)
    match = dict()  # (r, c) on the right → (r, c) on the left

    def dfs(u, visited):
        for v in graph[u]:
            if v in visited:
                continue
            visited.add(v)
            if v not in match or dfs(match[v], visited):
                match[v] = u
                return True
        return False

    res = 0
    for u in left_nodes:
        visited = set()
        if dfs(u, visited):
            res += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n × (number of edges)). In the worst case, scanning all nodes, building the graph, and running the Hungarian algorithm. For each unmatched node, at most O(number of edges) per DFS.

- **Space Complexity:**  
  O(m × n) for the adjacency graph, match dictionary, and visited sets. All storage is proportional to the grid size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the matrix is not bipartite (e.g., allow diagonal adjacency)?  
  *Hint: Minimum vertex cover is NP-hard in general, so the problem becomes much harder without the bipartite property.*

- Can you return which specific 1s to flip, rather than just the count?  
  *Hint: Track the matching pairs and for each matched edge, record one of the endpoints.*

- How would your solution change if you could only flip a limited number of 1s per operation (batch flip)?  
  *Hint: Adjust problem to reflect the new constraint; may require greedy or batch dynamic programming.*

### Summary
The key insight is that this problem is a minimum vertex cover in a bipartite graph induced by assigning colors to the grid cells (like a chessboard). This enables using fast bipartite matching algorithms, making the approach optimal and efficient. The pattern of **reducing grid-adjacency problems to classic graph theory** is useful and arises in problems involving 2D constraints and local interactions. This approach is widely applicable, especially when the underlying graph is bipartite.


### Flashcard
Model as a minimum vertex cover on the graph of adjacent 1s; use DP or matching to find the minimal set of 1s to flip.

### Tags
Array(#array), Graph(#graph), Matrix(#matrix)

### Similar Problems
- Set Matrix Zeroes(set-matrix-zeroes) (Medium)
- 01 Matrix(01-matrix) (Medium)
- Minimum Number of Flips to Convert Binary Matrix to Zero Matrix(minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix) (Hard)
- Remove All Ones With Row and Column Flips(remove-all-ones-with-row-and-column-flips) (Medium)