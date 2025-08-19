### Leetcode 1036 (Hard): Escape a Large Maze [Practice](https://leetcode.com/problems/escape-a-large-maze)

### Description  
Given a 1,000,000 × 1,000,000 grid, you start at a **source** cell and want to reach a **target** cell by moving in any of the four directions (up, down, left, right). Some cells are **blocked** and cannot be entered. Given a list of **blocked** cells (up to 200), return `True` if there exists a path from source to target, otherwise return `False`.  
Cells outside the grid are off limits.  

### Examples  

**Example 1:**  
Input: `blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]`  
Output: `False`  
Explanation:  
The source at (0,0) cannot reach the target at (0,2) due to the surrounding blocked cells and grid boundaries.

**Example 2:**  
Input: `blocked = [], source = [0,0], target = [999999,999999]`  
Output: `True`  
Explanation:  
With no blocked cells, you can walk to any cell, including the opposite corner of the grid.

**Example 3:**  
Input: `blocked = [[0,1],[1,0],[1,2],[2,1]], source = [0,0], target = [2,2]`  
Output: `False`  
Explanation:  
The blocked cells surround both the source and the target, making it impossible to reach.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try to do BFS or DFS from source to target on this huge grid. Quickly infeasible since grid is 10⁶ × 10⁶!

- **Blocked cell observation:**  
  The number of blocked cells is at most 200. The only way to actually "trap" the source or target is to isolate it inside a small region using the blockers (think of maximum area that 200 blockers can surround).

- **Key insight:**  
  200 blockers can at most enclose a region of size ≈19900 (strict upper bound based on combinatorics: maximal area that k blockers can fence off is k×(k-1)/2).  
  So:  
  - *If* we can reach either the target, or escape farther than this area when we BFS from the source (and vice versa from target), then there's a guarantee we won't be fenced in--the blockers can't possibly enclose a huge region.

- **Algorithm:**  
  - Use BFS from both the source and the target.
  - Stop BFS if:
    - You reach the target, return True.
    - You visit more than a "safe threshold" (around 20,000 cells), return True (not trapped).
    - If you visit fewer, return False (trapped inside blockers).

- **Tradeoffs:**  
  - Only searching a small number of cells, not the whole grid.
  - Both source and target must not be trapped, so check from both ends.

### Corner cases to consider  
- No blocked cells: grid fully open, always reachable.
- Source or target exactly surrounded (even if region is very small).
- Blocked cells in corners or at grid edges.
- Source or target coincides with a blocked cell.
- Source is the same as Target.

### Solution

```python
from collections import deque

def isEscapePossible(blocked, source, target):
    GRID_SIZE = 10 ** 6
    BLOCKED_SET = {tuple(b) for b in blocked}
    MAX_VISIT = len(blocked) * (len(blocked) - 1) // 2 if blocked else 0
    if MAX_VISIT == 0:
        MAX_VISIT = 20000  # safe threshold

    # Helper: BFS from start, see if can reach finish or escape the region
    def bfs(start, finish):
        queue = deque()
        queue.append(tuple(start))
        visited = set()
        visited.add(tuple(start))
        directions = [(-1,0), (1,0), (0,-1), (0,1)]
        step = 0
        while queue and step < MAX_VISIT:
            x, y = queue.popleft()
            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                next_cell = (nx, ny)
                if 0 <= nx < GRID_SIZE and 0 <= ny < GRID_SIZE:
                    if next_cell in BLOCKED_SET or next_cell in visited:
                        continue
                    if next_cell == tuple(finish):
                        return True
                    queue.append(next_cell)
                    visited.add(next_cell)
            step += 1
        # If we've escaped the worst-case area, not trapped
        return step >= MAX_VISIT
    
    # Must be able to escape from both source and target
    return bfs(source, target) and bfs(target, source)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(K²), where K = len(blocked) (at most 200), because both BFSs search up to about 20,000 cells.  
  Never traverses the entire grid.

- **Space Complexity:**  
  O(K²) for the visited sets in both BFS explorations, since they cap at about MAX_VISIT size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if blocked could be larger, say up to 10⁴ cells?
  *Hint: Explore possible optimizations, but with high density blocking the approach must change.*

- What if we have weighted costs for moving through different cells?
  *Hint: Dijkstra’s algorithm could generalize this.*

- Can you return the actual path taken, not just True/False?
  *Hint: Backtrack breadcrumbs (parent map) during BFS.*

### Summary
This approach applies the **bounded-region search pattern**, commonly seen when restrictions make global search intractable but local trapping is possible. It leverages the grid's sparseness (very few blockers) and guarantees from combinatorial geometry to ensure tractable runtime.  
The method is a variant of BFS with an early exit condition (once outside potential trapping, we're "free"), and is a powerful tool for grid pathfinding with sparse obstacles.  
Similar logic can be applied to large graphs or sparse maps where full search is infeasible but small-locale exhaustiveness is possible.

### Tags
Array(#array), Hash Table(#hash-table), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
