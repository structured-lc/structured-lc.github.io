### Leetcode 675 (Hard): Cut Off Trees for Golf Event [Practice](https://leetcode.com/problems/cut-off-trees-for-golf-event)

### Description  
Given a 2D grid representing a forest, each cell has:
- **0**: an obstacle, cannot be walked through
- **1**: walkable ground
- **\>1**: a tree, height is the cell's value  
You start at (0,0) and need to cut all trees in *ascending* order of their heights. After a tree is cut, its cell becomes ground (1). You may move up, down, left, or right, but cannot move onto a 0.  
Return the minimum steps needed to cut all trees *in order*. If impossible, return -1.

### Examples  

**Example 1:**  
Input: `[[1,2,3],[0,0,4],[7,6,5]]`  
Output: `6`  
*Explanation: Start at (0,0). Go to (0,1) [2 steps], (0,2) [1 step], (1,2) [1 step], (2,2) [1 step], (2,1) [1 step]. Total = 6 steps.*

**Example 2:**  
Input: `[[1,2,3],[0,0,0],[7,6,5]]`  
Output: `-1`  
*Explanation: Cannot reach the lower half (there’s a wall of 0’s).*

**Example 3:**  
Input: `[[2,3,4],[0,0,5],[8,7,6]]`  
Output: `6`  
*Explanation: Start at (0,0) which is a tree, cut immediately (no steps). Then in height order visit (0,1), (0,2), (1,2), (2,2), (2,1), (2,0) totaling 6 steps.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each tree (in sorted order by height), run BFS or DFS from current position to the next tree’s location. On each trip, mark the tree as cut, turn it into 1, then proceed to the next one.
- **Why not DFS?**  
  The problem is to find *minimum* steps. DFS can get stuck and may not find shortest paths, especially with obstacles.  
  BFS (Breadth-First Search) is best for shortest paths on unweighted grids.
- **Optimized idea:**  
  Preprocess a list of all tree positions and heights. Sort trees by height.
  Iterate through each tree: from current position, use BFS to reach the next tree. If at any time a tree cannot be reached, return -1.
  Accumulate path lengths.
- **Trade-offs:**  
  Each BFS may traverse a substantial portion of the grid, and we potentially repeat similar searches, but the grid size (≤ 50×50) keeps the approach feasible.

### Corner cases to consider  
- Start position is blocked (forest==0).
- Some trees are unreachable due to 0’s surrounding them.
- Trees are already cut (grid full of 1’s).
- Very long path required to reach a tree (walk nearly every cell).
- Only one tree present at starting cell.

### Solution

```python
from collections import deque

class Solution:
    def cutOffTree(self, forest):
        if not forest or not forest[0]:
            return -1

        rows, cols = len(forest), len(forest[0])

        # Collect all trees: (height, r, c)
        trees = []
        for r in range(rows):
            for c in range(cols):
                if forest[r][c] > 1:
                    trees.append((forest[r][c], r, c))

        # Sort trees by height (ascending)
        trees.sort()

        def bfs(start_r, start_c, target_r, target_c):
            # BFS: shortest path from (start_r, start_c) to (target_r, target_c)
            if start_r == target_r and start_c == target_c:
                return 0
            visited = [[False]*cols for _ in range(rows)]
            q = deque()
            q.append((start_r, start_c, 0))
            visited[start_r][start_c] = True
            directions = [(-1,0), (1,0), (0,-1), (0,1)]
            while q:
                r, c, steps = q.popleft()
                for dr, dc in directions:
                    nr, nc = r+dr, c+dc
                    if 0 <= nr < rows and 0 <= nc < cols:
                        if not visited[nr][nc] and forest[nr][nc] != 0:
                            if nr == target_r and nc == target_c:
                                return steps+1
                            visited[nr][nc] = True
                            q.append((nr, nc, steps+1))
            return -1  # unreachable

        total_steps = 0
        curr_r, curr_c = 0, 0
        for height, tr, tc in trees:
            steps = bfs(curr_r, curr_c, tr, tc)
            if steps == -1:
                return -1
            total_steps += steps
            curr_r, curr_c = tr, tc

        return total_steps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K × (R×C)),  
  where K is the number of trees, and each BFS traverses at most every cell (R×C). Sorting trees is O(K log K), which is dominated by the BFSes.
- **Space Complexity:** O(R×C)  
  For BFS queue and visited matrix per search.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the forest is much larger, say 1,000 × 1,000?  
  *Hint: Can you reuse visited arrays, precompute shortest paths, or prune unreachable regions?*

- Can you think of a way to avoid redundant BFS searches?  
  *Hint: Consider pathfinding between multiple points efficiently (all-pairs shortest paths, A* search, etc.)*

- What if we had obstacles or trees appearing/disappearing dynamically?  
  *Hint: Update strategies, incremental algorithms, or advanced pathfinding approaches.*

### Summary
This is a classic **multi-stage shortest-path problem** where you need to repeatedly compute shortest paths among sorted targets, commonly solved with BFS for grid-based minimum pathing. The central theme is *stateful traversal* and *incremental search* using BFS. The same pattern applies to robot pathing, video game AI movement, or logistics planning on grids.