### Leetcode 1254 (Medium): Number of Closed Islands [Practice](https://leetcode.com/problems/number-of-closed-islands)

### Description  
Given a 2D grid of 0s (land) and 1s (water), a *closed island* is a group of 0s fully surrounded by 1s (top, bottom, left, right)—*not* touching the grid's boundary. Count the number of such closed islands.

### Examples  
**Example 1:**  
Input: `grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]`  
Output: `2`  
*Explanation: There are two regions of 0s completely surrounded by 1s (excluding edges).*

**Example 2:**  
Input: `grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]`  
Output: `1`  
*Explanation: One central group of land is completely surrounded by water, except for the edges which don't count as closed islands.*

**Example 3:**  
Input: `grid = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]]`  
Output: `2`  
*Explanation: There are two closed islands in the middle—none touch the grid edges.*

### Thought Process (as if you’re the interviewee)  
- First, clarify the definition of closed islands: groups of 0s not connected to the grid border.
- Brute-force idea: For each unvisited 0, run DFS to see if it's part of a closed island. If any cell in this DFS touches the border, it's not closed.
- Before counting, quickly mark all border-connected 0s as visited (since they can never be closed islands).
- Then, for each remaining internal 0, do DFS/BFS, marking visited. If it doesn't touch the edge, increment the closed islands count.
- We use DFS for convenience (recursive or stack-based). The algorithm is O(n × m), since each cell is visited at most once.
- Chose DFS because it's a common pattern for region marking, easy to implement, and grid fits in memory.

### Corner cases to consider  
- Empty grid
- Grid with all land or all water
- Islands touching only corners or edges
- Isolated single 0 in the middle
- Long, thin grids (1-row/1-column)

### Solution

```python
# 0 = land, 1 = water

def closedIsland(grid):
    rows = len(grid)
    cols = len(grid[0])

    def dfs(r, c):
        # If out of bounds, this land cell touches the border (not closed)
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if grid[r][c] == 1:
            return True
        # Mark visited
        grid[r][c] = 1
        closed = True
        # Visit all 4 directions
        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
            if not dfs(r + dr, c + dc):
                closed = False
        return closed

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 0:
                if dfs(r, c):
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), since every cell is visited at most once (dfs only proceeds through unvisited 0s and marks them visited).
- **Space Complexity:** O(n × m) in the worst case for recursion stack or stack (for a grid completely filled with land, all cells could be placed on the recursion stack).

### Potential follow-up questions (as if you’re the interviewer)  

- How can you avoid stack overflow for very large grids?
  *Hint: Use an explicit stack for DFS (iterative), or BFS with a queue.*

- What if you wanted to count "open islands" (touch grid edges)?
  *Hint: Label boundary-connected islands first, then count non-boundary.*

- Could you handle diagonal connections instead of 4-directional?
  *Hint: Modify DFS to check all 8 neighbors for diagonal adjacency.*

### Summary
Classical grid DFS/BFS pattern for counting closed islands. The core idea is marking boundary-connected land as unclosed, then counting internal, fully surrounded land regions. This approach generalizes to grid-surrounded region marking and is a variant of "flood fill" problems frequently seen in interviews.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
