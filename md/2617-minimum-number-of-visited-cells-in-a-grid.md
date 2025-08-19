### Leetcode 2617 (Hard): Minimum Number of Visited Cells in a Grid [Practice](https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid)

### Description  
You are given a 0-indexed `m × n` integer matrix `grid`. Start at the top-left cell `(0, 0)`. From the current cell `(i, j)`:
- You can move *right* to any `(i, k)` where `j < k ≤ j + grid[i][j]`.
- Or move *down* to any `(k, j)` where `i < k ≤ i + grid[i][j]`.
Your objective is to reach the bottom-right cell `(m-1, n-1)` in as *few* cell visits as possible (each move visits exactly one cell, including the start and end). Return the **minimum number of cells visited** to reach the target, or `-1` if it's impossible.

### Examples  

**Example 1:**  
Input: `grid = [[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]`  
Output: `4`  
*Explanation: Path: (0,0) → (0,1) → (1,1) → (3,1). Each step obeys the movement rule: from (0,0) with 3, visit cols 1/2/3; continue, reach the target in 4 moves.*

**Example 2:**  
Input: `grid = [[3,4,2,1],[4,2,1,1],[2,1,1,0],[3,4,1,0]]`  
Output: `3`  
*Explanation: Path: (0,0) → (0,1) → (3,1). Uses values to jump quickly via allowed right/down moves.*

**Example 3:**  
Input: `grid = [[2,1,0],[1,0,0]]`  
Output: `-1`  
*Explanation: No valid path to bottom-right: allowable steps never reach the goal.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  BFS from `(0,0)`, with each cell as a node. For each, branch to every rightward/downdard target allowed by its value. This finds the minimum path, but can be slow: too many repeated states and redundant queueing.
- **Optimizing:**  
  The bottleneck is the number of possible moves from each cell (could be up to n or m per cell), especially in larger grids. To accelerate:
  - Use BFS (or Dijkstra, since all moves have same "cost"), but avoid revisiting cells and prune redundant paths.
  - Maintain a visited matrix so we visit each cell at most once—and only with the shortest path length found so far.
  - To avoid iterating over already visited columns/rows repeatedly, use sets/lists for each row/column to keep track of which unvisited columns remain. Remove them once visited.
- **Final Approach Trade-offs:**  
  - BFS with per-row and per-column sets is fast and avoids redundant work.
  - Can be further optimized with deque for queue, but for constraints, visited sets and normal queue work.
  - Dijkstra's-like approach is slightly overkill since all step "costs" are 1, so classic BFS suffices.

### Corner cases to consider  
- Completely blocked (all zeros except start/end, or walls).
- Direct reach: one row/col with big enough values for a single move.
- Multiple shortest paths: ensure not overcounting or revisiting.
- Smallest grid: 1×1, or 1×n/ n×1.
- Non-square grid: e.g. m ≠ n.
- Target unreachable even if some movement is possible.
- Grid with maximum allowed value at some cell (test boundaries).

### Solution

```python
from collections import deque

def minimumVisitedCells(grid):
    m, n = len(grid), len(grid[0])

    # Track unvisited columns in each row and unvisited rows in each column
    row_unvisited = [set(range(n)) for _ in range(m)]
    col_unvisited = [set(range(m)) for _ in range(n)]
    visited = [[False] * n for _ in range(m)]

    # BFS queue: (i, j, distance)
    queue = deque()
    queue.append((0, 0, 1))
    visited[0][0] = True
    row_unvisited[0].discard(0)
    col_unvisited[0].discard(0)

    while queue:
        i, j, dist = queue.popleft()
        # If at the goal, return answer
        if i == m - 1 and j == n - 1:
            return dist

        # All rightward cells from (i, j)
        max_right = min(j + grid[i][j], n - 1)
        to_remove = []
        for k in range(j + 1, max_right + 1):
            if k in row_unvisited[i]:
                queue.append((i, k, dist + 1))
                visited[i][k] = True
                to_remove.append(k)
        for k in to_remove:
            row_unvisited[i].remove(k)
            col_unvisited[k].discard(i)

        # All downward cells from (i, j)
        max_down = min(i + grid[i][j], m - 1)
        to_remove = []
        for k in range(i + 1, max_down + 1):
            if k in col_unvisited[j]:
                queue.append((k, j, dist + 1))
                visited[k][j] = True
                to_remove.append(k)
        for k in to_remove:
            col_unvisited[j].remove(k)
            row_unvisited[k].discard(j)

    # Target not reached
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)
    - Each cell is visited at most once due to marking and pruning with row/col sets.
    - For each visit, we may look at up to n (right) + m (down) cells, but total number of queue insertions is O(m×n).
- **Space Complexity:** O(m × n)
    - Space for queue, visited grid, and sets for each row + column.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further for larger grids?
  *Hint: Consider range queries and faster lookup of next unvisited cells (e.g., with segment trees or skip lists).*

- What if the cost to move to each cell is different (not always 1)?
  *Hint: Consider Dijkstra or a priority queue.*

- How would you find the number of *distinct* minimum paths?
  *Hint: Augment BFS with a count at each cell.*

### Summary
This problem uses the **BFS shortest-path in a grid** pattern, but applied with coordinate-based movement rules instead of adjacent moves. The pruning using sets per row and column is a strong optimization to avoid visiting dead or duplicate states, which is crucial for performance. The pattern is common in grid pathfinding with variable jumps, like in "jump game" and puzzle/board games with special moves.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Stack(#stack), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Jump Game(jump-game) (Medium)