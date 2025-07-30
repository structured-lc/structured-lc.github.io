### Leetcode 3619 (Medium): Count Islands With Total Value Divisible by K [Practice](https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k)

### Description  
Given an m×n integer grid and an integer k, count the number of **islands** in the grid whose **total value** is divisible by k.  
- An island is a group of positive integers (land) connected 4-directionally (up, down, left, right), totally isolated from water (0s or non-positive values).
- The **value of an island** is the sum of its land cell values.
- Only count islands where **island value % k == 0**.

### Examples  

**Example 1:**  
Input: `grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5`  
Output: `2`  
*Explanation:  
Islands and their sums:  
- [2,1,1,4,7,2] = 17  
- [5] = 5 (divisible by 5)  
- [5] = 5 (divisible by 5)  
-  = 8  
Only the two single-cell islands (both 5) count. So, output is 2.*

**Example 2:**  
Input: `grid = [[0, 0, 0], [1, 2, 0], [0, 0, 3]], k = 2`  
Output: `1`  
*Explanation:  
Islands: [1,2] (sum=3), [3] (sum=3). No single island sum divisible by 2.*

**Example 3:**  
Input: `grid = [[4, 0], [0, 4]], k = 4`  
Output: `2`  
*Explanation:  
Two islands: [4] and [4], sums are both 4 (divisible by 4). Output is 2.*

### Thought Process (as if you're the interviewee)  
First, let’s clarify that an island is only made of **positive-valued** cells, connected 4-directionally. Island sum = sum of all its land cells. We must count how many islands have sums divisible by k.

**Brute force idea:**  
- For every cell, if it’s land and not yet visited, run a DFS/BFS to gather all connected land cells, sum their values, and mark visited.
- After visiting an island, check if its sum modulo k == 0; if so, increment the answer.

**Why this is optimal:**  
- Both DFS and BFS will visit each cell at most once. The major extra work is just summing the values, so total work is linear in the number of cells.
- There isn’t a shortcut: every cell has to be checked at least once to avoid missing islands or double-counting.

**Trade-offs:**  
- DFS can cause stack overflow on large grids; BFS is safer.
- Union-Find isn’t suitable, as we also need to compute the value sum for each connected component.

**Final approach:**  
- Iterate grid, trigger BFS for every unvisited land cell, sum island, check for divisibility, count.

### Corner cases to consider  
- All cells zero or negative (should return 0).
- Single cell positive (should return 1 if divisible by k).
- Grid full of land, but only total sum is not divisible by k (should return 0).
- Non-square grids (grids of size m×1 or 1×n).
- Multiple single-cell islands.
- Large k (greater than any island sum, should return 0).

### Solution

```python
from collections import deque

def count_islands_with_value_divisible_by_k(grid, k):
    if not grid or not grid[0] or k <= 0:
        return 0

    m, n = len(grid), len(grid[0])
    visited = [[False] * n for _ in range(m)]
    count = 0

    def bfs(row, col):
        # Start BFS from this land cell
        queue = deque()
        queue.append((row, col))
        visited[row][col] = True
        island_sum = grid[row][col]

        while queue:
            r, c = queue.popleft()
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if (0 <= nr < m and 0 <= nc < n and
                    grid[nr][nc] > 0 and not visited[nr][nc]):
                    visited[nr][nc] = True
                    island_sum += grid[nr][nc]
                    queue.append((nr, nc))
        return island_sum

    for i in range(m):
        for j in range(n):
            if grid[i][j] > 0 and not visited[i][j]:
                total = bfs(i, j)
                if total % k == 0:
                    count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), because every cell is visited exactly once and each BFS traversal visits an island fully with no repeats.
- **Space Complexity:** O(m × n) for the visited array and, in the worst case, the BFS queue might hold O(m × n) elements (all land in one island).

### Follow-up questions  
- How would you handle very large grids where recursion stack is a concern? (Switch to BFS instead of DFS.)
- What if "land" included negative values, or non-zero values were allowed? How would you adjust the approach?  
- How to handle diagonal connections (8-way connectivity) instead of 4-way?