### Leetcode 827 (Hard): Making A Large Island [Practice](https://leetcode.com/problems/making-a-large-island)

### Description  
Given an n×n binary grid representing a map of water (0) and land (1), you are allowed to convert at most one water cell (0) into land (1). An **island** is formed by 1s connected *four-directionally* (up, down, left, right).  
*Return the size of the largest island possible* after making at most one such change.

### Examples  

**Example 1:**  
Input: `grid = [[1, 0], [0, 1]]`  
Output: `3`  
*Explanation: By flipping either zero to one, you connect the two existing islands into a single island of size 3.*

**Example 2:**  
Input: `grid = [[1, 1], [1, 0]]`  
Output: `4`  
*Explanation: Flipping the single zero connects it to the main island, forming an island of size 4.*

**Example 3:**  
Input: `grid = [[1, 1], [1, 1]]`  
Output: `4`  
*Explanation: The grid is already all land; flipping any zero (there's none) doesn't increase the island size—so just return the count of all land cells.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For every 0 in the grid, flip it to a 1, run DFS/BFS to find the size of the largest island. This is *very* inefficient: for each 0, DFS over the entire grid. Not scalable (n⁴ in worst case for n×n grid).

- **Optimized approach:**  
  1. **Preprocess:** Use DFS to label each island with a unique "color" (starting from 2) and record its area in a mapping: `island_color → size`.
  2. For each 0 cell in the grid:
     - Look at its four neighbors. Collect unique surrounding island colors.
     - The potential size after flipping this 0:  
       `potential_size = sum(sizes of unique neighbor colors) + 1`
     - Track the maximum possible size seen.
  3. *Handle edge case:* If the grid has no 0, just return the size of the whole grid.

  **Trade-offs:**  
  - Preprocessing islands only once makes subsequent queries (for each 0) much faster.
  - We ensure not to double-count neighboring islands by tracking seen colors per flip.

### Corner cases to consider  
- All 1's: No zeros to flip; just return n × n.
- All 0's: Flip any to 1; largest island will be size 1.
- 1×1 grid (either 0 or 1).
- Zero surrounded only by water; flip creates island of size 1.
- Zero touches multiple islands or the same island twice.
- Large grid with only one zero.

### Solution

```python
def largestIsland(grid):
    n = len(grid)
    color = 2  # colors start at 2, since 0/1 already used
    area = {}  # color: area mapping

    # Label all islands and compute their areas
    def dfs(r, c, color):
        stack = [(r, c)]
        grid[r][c] = color
        total = 1
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            pass  # Placeholder for direction tuples
        while stack:
            x, y = stack.pop()
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x + dr, y + dc
                if 0 <= nx < n and 0 <= ny < n and grid[nx][ny] == 1:
                    grid[nx][ny] = color
                    stack.append((nx, ny))
                    total += 1
        return total

    # 1. Label all existing islands
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 1:
                area[color] = dfs(r, c, color)
                color += 1

    # 2. For each 0, check which islands would connect if made 1
    max_area = max(area.values(), default=0)
    for r in range(n):
        for c in range(n):
            if grid[r][c] == 0:
                neighbor_colors = set()
                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                        neighbor_colors.add(grid[nr][nc])
                size = 1
                for clr in neighbor_colors:
                    size += area[clr]
                max_area = max(max_area, size)
    # If there was no zero, return area of full grid or any found
    return max_area if max_area else n * n
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - Each cell is processed at most twice (label all islands; scan all zeros).
  - DFS may touch every cell once.
- **Space Complexity:** O(n²)  
  - For coloring the grid and the area dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can flip *k* zeros instead of just one?  
  *Hint: Can you generalize the DP or use union-find for merged islands?*

- How would you handle updates in real time (flips multiple times)?  
  *Hint: Consider using Union Find (Disjoint Set) for dynamic merging and splits.*

- Can you do this in purely functional style or for sparse, huge grids?  
  *Hint: Use hashmaps and explicit coordinate processing instead of dense arrays.*

### Summary
This problem uses a **coloring/labeling islands** pattern—very common in matrix problems like "Number of Islands" or "Max Area of Island." The key optimization is not recomputing the area for each possible flip, but labeling first, then doing constant-time lookups for each 0.  
This approach is widely useful for problems involving grid connectivity, labeling, and one-step modifications.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
