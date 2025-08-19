### Leetcode 200 (Medium): Number of Islands [Practice](https://leetcode.com/problems/number-of-islands)

### Description  
Given an m × n 2D grid map filled with `'1'`s (representing land) and `'0'`s (water), count the number of **islands**. An island is surrounded by water and is formed by connecting adjacent lands **horizontally or vertically**. You may assume all four edges of the grid are surrounded by water.

- Adjacent means only up, down, left, or right; diagonals do not connect land.
- Each `'1'` belongs to one and only one island; once counted, do not count again.

### Examples  

**Example 1:**  
Input:  
```
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
```
Output: `1`  
*Explanation: All the '1's in the top-left are connected and form a single island. The remaining '0's are water.*

**Example 2:**  
Input:  
```
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
```
Output: `3`  
*Explanation: One island at top-left, one single cell (2,2), one at bottom-right (3,3 + 3,4).*

**Example 3:**  
Input:  
```
grid = [
  ["0","0","0","0","0"]
]
```
Output: `0`  
*Explanation: No land exists, so no islands.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  - Iterate through each cell. When encountering a `'1'`, increment a counter (for an island), then traverse all connected `'1'`s to mark them as visited (so they aren't counted again).
  - To mark visited, we can mutate the grid cell to `'0'` (or use a separate visited set/matrix).
- **Traversal Choice:**  
  - Use **DFS** or **BFS** to traverse all adjacent `'1'`s. Both work, but DFS (recursive or stack) is straightforward for 4-directional adjacency.
  - For every cell, if it's a `'1'`, DFS all its neighbors recursively, marking as visited, so you never double-count.
- **Final Decision:**  
  - I’d use DFS changing visited land to `'0'` for clean, in-place marking, which avoids extra space for a visited set or matrix.

### Corner cases to consider  
- Empty grid (`grid=[]` or grid with empty rows)
- No land (`'1'` never appears)
- All land (single massive island)
- Single cell grids (`1×1`, either `'1'` or `'0'`)
- Islands that are single-cell `'1'`
- Large grids with many disconnected `'1'`

### Solution

```python
def numIslands(grid):
    if not grid or not grid[0]:
        return 0

    m = len(grid)
    n = len(grid[0])
    islands = 0

    def dfs(i, j):
        # If out-of-bounds or water, return
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == '0':
            return

        # Mark current as visited
        grid[i][j] = '0'

        # Visit all 4 neighbors
        dfs(i + 1, j)  # down
        dfs(i - 1, j)  # up
        dfs(i, j + 1)  # right
        dfs(i, j - 1)  # left

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                islands += 1
                dfs(i, j)

    return islands
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  - Each cell is visited **once** (either as part of an island or as water), and each visit takes O(1).
- **Space Complexity:**  
  - O(1) **extra** space, if we are allowed to mutate the grid.
  - O(m × n) **recursion stack** in the worst case (if the island turns out to be the whole grid—a single massive island).
  - If using an explicit stack for DFS, space would be worst-case O(m × n) as well.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve the problem if you're **not allowed to modify the input grid**?  
  *Hint: Use an explicit visited set or matrix to keep track of visited cells.*

- Can you find the **maximum area of an island** as a variant of this problem?  
  *Hint: Track area size in the DFS and keep a running max.*

- How would you solve this with **BFS instead of DFS**?  
  *Hint: Use a queue and iterate over the four neighbors without recursion.*

### Summary

This problem is a classic usage of **graph traversal (DFS/BFS) on a grid**. The key is to mark connected pieces of land as visited so each island is only counted once. This pattern—visiting all connected neighbors and marking visited—is very common and also is applied in problems like **flood fill**, **closed islands**, and **counting connected components in a graph**. Understanding this “infect and mark” approach is essential for many graph/grid problems.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix)

### Similar Problems
- Surrounded Regions(surrounded-regions) (Medium)
- Walls and Gates(walls-and-gates) (Medium)
- Number of Islands II(number-of-islands-ii) (Hard)
- Number of Connected Components in an Undirected Graph(number-of-connected-components-in-an-undirected-graph) (Medium)
- Battleships in a Board(battleships-in-a-board) (Medium)
- Number of Distinct Islands(number-of-distinct-islands) (Medium)
- Max Area of Island(max-area-of-island) (Medium)
- Count Sub Islands(count-sub-islands) (Medium)
- Find All Groups of Farmland(find-all-groups-of-farmland) (Medium)
- Count Unreachable Pairs of Nodes in an Undirected Graph(count-unreachable-pairs-of-nodes-in-an-undirected-graph) (Medium)
- Maximum Number of Fish in a Grid(maximum-number-of-fish-in-a-grid) (Medium)
- Count Islands With Total Value Divisible by K(count-islands-with-total-value-divisible-by-k) (Medium)