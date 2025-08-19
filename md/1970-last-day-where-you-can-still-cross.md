### Leetcode 1970 (Hard): Last Day Where You Can Still Cross [Practice](https://leetcode.com/problems/last-day-where-you-can-still-cross)

### Description  
You are given a grid with `row` rows and `col` columns, which starts fully as land (`0`). Over time, cells turn to water (`1`) following the order in a 1-based list `cells`, where each entry represents the cell to flood on that day. Your task is to find the **last possible day** it is still possible to walk from **any cell in the top row to any cell in the bottom row**, moving only through land cells (up, down, left, right). After this day, it should be impossible to make such a crossing due to water blocking all possible top-to-bottom paths.

### Examples  

**Example 1:**  
Input: `row=2, col=2, cells=[[1,1],[2,1],[1,2],[2,2]]`  
Output: `2`  
*Explanation:  
- Day 0: all land  
- Day 1: (1,1) is water  
- Day 2: (2,1) is water
- At end of day 2, you can cross (path: (1,2) → (2,2)), but not after day 2.*

**Example 2:**  
Input: `row=2, col=2, cells=[[1,1],[1,2],[2,1],[2,2]]`  
Output: `1`  
*Explanation:  
- Day 1: (1,1) flooded, but (1,2) and (2,1) allow a path; after day 1, no paths exist.*

**Example 3:**  
Input: `row=3, col=3, cells=[[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,1],[3,2]]`  
Output: `3`  
*Explanation:  
- You can cross from top to bottom for up to day 3; after that, every top-to-bottom route is blocked by water.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each day, simulate the water cells, check if there’s a path from the top to the bottom using BFS/DFS. This would be extremely slow for large grids since it would repeat a lot of work.

- **Optimized approach:**  
  Since we’re looking for the last *possible* day, we can use **binary search** on the day.  
    - For each mid day, construct the grid after flooding those cells, and check if a path exists from any top cell to any bottom cell using BFS/DFS.
    - The check function: For a given grid (on some day), start BFS/DFS from every land cell in the top row. See if any path can reach any land cell in the bottom row.
  - If crossing is possible on day mid, try a later day; if not possible, try earlier days.

- **Trade-offs:**  
  BFS/DFS per check is O(row × col), but binary search drops the number of checks logarithmically. So overall complexity is much improved.  
  Union-find ("reverse water filling") is also possible, but binary search + BFS/DFS is more intuitive and commonly used in interviews for dynamic path-existence questions.

### Corner cases to consider  
- Single cell grid
- All cells become water immediately (crossing never possible)
- Only one row or one column
- Very large grids (performance)
- All cells never become water (can always cross)
- Floods block all top cells before blocking any connects from top to bottom

### Solution

```python
from typing import List
from collections import deque

def latestDayToCross(row: int, col: int, cells: List[List[int]]) -> int:
    # Directions: up, down, left, right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    
    def can_cross(day):
        # Build the grid as of this day: flooded cells marked 1; land is 0
        grid = [[0] * col for _ in range(row)]
        for i in range(day):
            r, c = cells[i]
            grid[r-1][c-1] = 1
        
        # BFS from all land cells in the top row
        queue = deque()
        visited = [[False]*col for _ in range(row)]
        for c_idx in range(col):
            if grid[0][c_idx] == 0:
                queue.append((0, c_idx))
                visited[0][c_idx] = True
        
        while queue:
            r, c = queue.popleft()
            # If we reach bottom row, crossing possible
            if r == row - 1:
                return True
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                # Check bounds and only expand if land and not visited
                if 0 <= nr < row and 0 <= nc < col and not visited[nr][nc] and grid[nr][nc] == 0:
                    visited[nr][nc] = True
                    queue.append((nr, nc))
        # No path from top to bottom
        return False
    
    # Binary search on last day (1-indexed, since days are 0 to len(cells))
    left, right = 1, len(cells)
    answer = 0
    while left <= right:
        mid = left + (right - left) // 2
        if can_cross(mid):
            answer = mid
            left = mid + 1   # try later
        else:
            right = mid - 1  # try earlier
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(row × col × log(row × col))
  - Each BFS/DFS in can_cross is O(row × col), and we do at most log₂(number of days) = log₂(row × col).
- **Space Complexity:** O(row × col) for the grid, visited matrix, and BFS queue; no recursion stack risk as BFS is used.

### Potential follow-up questions (as if you’re the interviewer)  

- If the list `cells` is extremely large, can you reduce memory usage further?  
  *Hint: Avoid deep copies of grid; try marking cells by day and use sets for visited.*

- Can you adapt the method for diagonal movements or other grid shapes?  
  *Hint: BFS directions list; modify it to allow 8 directions or other neighbor logic.*

- Could you solve this using Union Find / Disjoint Set Union instead of BFS/DFS?  
  *Hint: Simulate un-filling (“filling back” from the last day), and join land regions as they appear.*

### Summary
This problem uses the classic **binary search + BFS/DFS** pattern to find an earliest/latest day for a conditional path. The main twist is efficient simulation of a time-evolving grid and checking for dynamic connectivity. It is a fundamental grid traversal variation often seen in maze, island, or percolation-type interview questions. This problem is great practice for binary search on answers and flood/DFS/BFS patterns.

### Tags
Array(#array), Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
- Bricks Falling When Hit(bricks-falling-when-hit) (Hard)
- Escape the Spreading Fire(escape-the-spreading-fire) (Hard)