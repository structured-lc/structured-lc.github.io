### Leetcode 1905 (Medium): Count Sub Islands [Practice](https://leetcode.com/problems/count-sub-islands)

### Description  
You are given two m × n binary matrices, **grid1** and **grid2**, filled with 0s (water) and 1s (land). An **island** is a group of 1s connected 4-directionally (up, down, left, right).  
An island in **grid2** is considered a **sub island** if every cell of that island is also land (1) in the corresponding position of **grid1**.  
Your goal: **count the number of sub islands in grid2**.

### Examples  

**Example 1:**  
Input:  
grid1 =  
```
[ [1,1,1,0,0],
  [0,1,1,1,1],
  [0,0,0,0,0],
  [1,0,0,0,0],
  [1,1,0,1,1] ]
```
grid2 =  
```
[ [1,1,1,0,0],
  [0,0,1,1,1],
  [0,1,0,0,0],
  [1,0,1,1,0],
  [0,1,0,1,0] ]
```
Output: `3`  
*Explanation: There are 3 sub islands in grid2 whose every land cell aligns with a land cell in grid1.*

**Example 2:**  
Input:  
grid1 =  
```
[ [1,0,1,0,1],
  [1,1,1,1,1],
  [0,1,0,0,0],
  [1,0,1,1,1],
  [0,1,0,1,0] ]
```
grid2 =  
```
[ [0,0,1,0,1],
  [1,1,1,1,1],
  [0,1,0,0,0],
  [1,0,1,1,0],
  [0,1,0,0,0] ]
```
Output: `2`  
*Explanation: Only 2 sub islands in grid2 are entirely within land cells of grid1.*

**Example 3:**  
Input:  
grid1 =  
```
[ [1,1,1],
  [0,1,1],
  [0,0,1] ] 
```
grid2 =  
```
[ [1,1,1],
  [0,0,1],
  [0,0,1] ]
```
Output: `1`  
*Explanation: There is 1 sub island – the big one on the right side completely contained in both grids.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each island in grid2, check all its cells; if every land cell in this island matches a land cell in grid1, then it's a sub island.
- **How to identify islands:** Use DFS or BFS to traverse ('flood-fill') every land cell in grid2, marking visited cells, and ensuring we only traverse connected land.
- While traversing each island in grid2, keep a flag: if you ever visit a cell where grid2 is land but grid1 is water, mark this island as not a sub island.
- Count the number of islands in grid2 for which all land cells are also land in grid1.
- **Why this approach:** It avoids the need to first list all islands, which would take extra space and complexity. By combining "finding islands" with "subisland validation", we traverse each cell once.
- **Trade-off:** O(mn) traversal; no precomputation or extra data structures except visited marking.


### Corner cases to consider  
- Both grids are empty (0 rows or 0 cols).
- All cells are water (all 0s).
- All cells are land (all 1s).
- Islands in grid2 that partially or fully overlap water in grid1 (should not be counted).
- Disconnected 1-cell islands.
- Islands in grid2 that cross over two or more separate islands in grid1 (should not matter, as long as all grid2 land aligns with grid1 land).


### Solution

```python
def countSubIslands(grid1, grid2):
    rows, cols = len(grid1), len(grid1[0])
    
    def dfs(r, c):
        # Out of bounds or water in grid2
        if r < 0 or r >= rows or c < 0 or c >= cols or grid2[r][c] == 0:
            return True
        # Mark visited in grid2
        grid2[r][c] = 0
        
        # Assume this cell is initially valid for sub-island
        is_sub = True
        # If this grid2 cell is land but grid1 is water in same spot, not sub-island
        if grid1[r][c] == 0:
            is_sub = False

        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            if not dfs(r + dr, c + dc):
                is_sub = False
        return is_sub

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid2[r][c] == 1:
                if dfs(r, c):
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  Each cell is visited at most once by DFS, and every DFS call that touches a land cell marks it as visited.
- **Space Complexity:** O(m × n) in the worst case due to the DFS recursion stack (if the entire grid is land).


### Potential follow-up questions (as if you’re the interviewer)  

- What if the islands could be diagonal?  
  *Hint: Change the directions explored in the DFS to include diagonal moves.*

- How would you solve this without modifying grid2?  
  *Hint: Use a separate visited matrix instead of marking cells.*

- Can this be parallelized?  
  *Hint: Each island can be processed independently if there are no shared cells.*

### Summary
This problem uses the **DFS flood-fill coding pattern** to identify and validate islands—a foundational technique for 2D grid traversal.  
The approach is closely related to many other "island" and "connected component" problems (e.g., Number of Islands, Max Area of Island), so practicing this enhances general graph/DFS intuition for interviews.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Number of Distinct Islands(number-of-distinct-islands) (Medium)
- Find All Groups of Farmland(find-all-groups-of-farmland) (Medium)