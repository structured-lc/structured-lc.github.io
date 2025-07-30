### Leetcode 3619 (Medium): Count Islands With Total Value Divisible by K [Practice](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k)

### Description  
You are given an m × n grid (matrix) of integers where a cell is "land" if its value is a positive integer, and "water" if its value is 0 or negative. An **island** is a group of land cells connected 4-directionally (up, down, left, right). The **total value** of an island is the sum of its land cells.  
Your task: **Count the number of islands whose total value is divisible by k** (i.e., total % k == 0).

### Examples  

**Example 1:**  
Input: `grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5`  
Output: `2`  
*Explanation: Islands are:*
- `{2,1,1,4,7,2}` sum=17 (not divisible by 5)
- `{5}` sum=5 (divisible by 5)
- `{5}` sum=5 (divisible by 5)
- `{8}` sum=8 (not divisible by 5)  
*So, output is 2.*

**Example 2:**  
Input: `grid = [[1,0,0],[0,2,2],[0,0,0]], k = 3`  
Output: `1`  
*Explanation: Islands:*
- `{1}` sum=1 (not divisible)
- `{2,2}` sum=4 (not divisible)  
*No islands sum to 3, 6, ... So output is 0.*

**Example 3:**  
Input: `grid = [[3,-1,3],[0,0,0],[6,0,3]], k = 3`  
Output: `3`  
*Explanation: Islands:*
- Top-left `{3}` sum=3 (divisible)
- Top-right `{3}` sum=3 (divisible)
- Bottom-left/bottom-right `{6}`, `{3}` sum=6,3 (both divisible)  
*So, output is 3.*

### Thought Process (as if you’re the interviewee)  
- Start by **identifying islands**: This is a classic grid DFS/BFS problem. Each positive cell not yet visited is the start of a new island, explore all connected positive cells using DFS or BFS.
- While traversing, **sum the values** for each island.
- After fully traversing an island, **check if sum % k == 0** to increment the result.
- Brute-force: Try floods from each cell, but that repeats work.  
- **Optimized:** Mark cells as visited so every cell is part of exactly one search.  
- Tradeoffs: DFS is conceptually simple, but for large grids BFS may be better to avoid stack overflow.

### Corner cases to consider  
- Empty grid or all cells ≤ 0 (should return 0).
- Large values of k (no islands' total may be divisible).
- Each land cell isolated (many 1-cell islands).
- All cells form one big island.
- Negative numbers in grid (treat as water).

### Solution

```python
def count_islands_with_total_value_divisible_by_k(grid, k):
    # Edge case: empty grid
    if not grid or not grid[0]:
        return 0

    m, n = len(grid), len(grid[0])
    visited = [[False] * n for _ in range(m)]

    def dfs(r, c):
        # If out of bounds or not land or already visited
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] <= 0 or visited[r][c]:
            return 0
        visited[r][c] = True
        # Sum for this cell
        total = grid[r][c]
        # Explore 4 directions
        total += dfs(r+1, c)
        total += dfs(r-1, c)
        total += dfs(r, c+1)
        total += dfs(r, c-1)
        return total

    count = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] > 0 and not visited[i][j]:
                island_sum = dfs(i, j)
                if island_sum % k == 0:
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Each cell is visited at most once, and each DFS touches only unvisited land cells.
- **Space Complexity:** O(m × n)  
  For the visited matrix, and potentially up to O(m × n) recursion stack for DFS (or queue for BFS).

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonally-connected lands should be considered part of the same island?  
  *Hint: Change the directions checked from 4 to 8 neighbors.*

- How to avoid exceeding recursion limits on large grids?  
  *Hint: Use Breadth-First Search (BFS) with a queue instead of recursion.*

- What if you also need the list of all such islands, not just their count?  
  *Hint: Store coordinates while exploring each island, return their lists where total value is divisible by k.*

### Summary
This problem is a **classic grid-connected component** search using DFS (or BFS), augmented by summing cell values and filtering by divisibility.  
This pattern applies to similar "island" or "region" counting/count-then-filter problems, such as Number of Islands, Max Area of Island, or Perimeter/Property sum on grid components.