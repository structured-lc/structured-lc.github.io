### Leetcode 329 (Hard): Longest Increasing Path in a Matrix [Practice](https://leetcode.com/problems/longest-increasing-path-in-a-matrix)

### Description  
Given an m×n grid of integers (matrix), you are to determine the length of the **longest strictly increasing path** in the matrix. You can move from each cell in **four directions**: up, down, left, or right, but not diagonally and not outside the matrix boundaries. The path must move only to adjacent cells containing a **strictly greater** value than the current cell.

### Examples  

**Example 1:**  
Input: `matrix = [[9,9,4],[6,6,8],[2,1,1]]`  
Output: `4`  
*Explanation: The longest increasing path is 1 → 2 → 6 → 9.*

**Example 2:**  
Input: `matrix = [[3,4,5],[3,2,6],[2,2,1]]`  
Output: `4`  
*Explanation: The longest increasing path is 3 → 4 → 5 → 6. You cannot move diagonally or revisit cells.*

**Example 3:**  
Input: `matrix = []`  
Output: `1`  
*Explanation: A single cell has a path of length 1 by itself (no moves possible).*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  For each cell, start a DFS to find the longest increasing path from that cell. Try every possible move (up, down, left, right), recursively explore, and keep track of the best.
- **Problems with brute force:**  
  This approach repeats a lot of work, recalculating paths starting from the same cell multiple times, and time complexity grows exponentially.
- **Optimization with memoization:**  
  To solve these overlapping subproblems, cache (memoize) the length of the longest path starting from each cell.  
  On each call from a cell, if we have already computed and stored the answer, return it directly.  
  Do DFS from every cell, and for each, remember/return the memoized result.
- **Why memoized DFS over BFS or DP?:**  
  The structure is such that paths depend on “what’s higher from here,” so DFS naturally explores each path. Memoization ensures efficiency since no cell’s answer is calculated more than once.
- **Tradeoff:**  
  Time complexity comes down to O(m×n) since each cell’s result is computed once, and each DFS explores up to 4 directions per call.  
  Space involves both the memoization structure and the recursion stack, but is quite manageable for reasonable inputs.

### Corner cases to consider  
- Empty matrix (no cells)
- Single-element matrix
- All matrix values equal (no increasing moves possible, return 1)
- Matrix with strictly decreasing values (all paths length 1)
- Multiple equally long increasing paths
- Large matrices (performance, stack depth)

### Solution

```python
# Memoized DFS solution
def longestIncreasingPath(matrix):
    if not matrix or not matrix[0]:
        return 0

    rows, cols = len(matrix), len(matrix[0])
    # Cache to save the max chain starting at (i, j)
    cache = [[0] * cols for _ in range(rows)]
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right

    def dfs(r, c):
        if cache[r][c] != 0:
            return cache[r][c]
        max_len = 1
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            # Only move if the neighbor is within bounds and bigger
            if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > matrix[r][c]:
                length = 1 + dfs(nr, nc)
                max_len = max(max_len, length)
        cache[r][c] = max_len
        return max_len

    result = 0
    for i in range(rows):
        for j in range(cols):
            result = max(result, dfs(i, j))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n).  
  Each cell is the root of at most one DFS traversal, since once found, memoization prevents re-computation. Four possible directions per cell, but total unique DFS calls is m×n.
- **Space Complexity:** O(m×n) for the memoization cache, plus O(m×n) stack usage in the worst case (if the recursion is very deep).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return not just the length, but the actual path itself?
  *Hint: Track and reconstruct the sequence during DFS, or store parent pointers.*

- How would you modify your solution if diagonal movement was allowed?
  *Hint: Adjust directions to include diagonals, be careful with boundaries.*

- How does your solution behave on very large matrices (e.g., 10,000 × 10,000)? What improvements are needed?
  *Hint: Discuss stack overflow risk, possibility for iterative DFS/BFS.*

### Summary
The approach uses the classic pattern of **DFS with memoization** (“top-down DP”) on a 2D grid. This pattern—using recursive exploration with caching per state—is very common for matrix problems involving longest paths, islands, or reachability. The same pattern can be applied to word ladders, grid games, and problems involving unique state transitions on graphs.


### Flashcard
Use DFS with memoization to cache the longest increasing path from each cell, avoiding redundant work for O(m×n) time.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort), Memoization(#memoization), Matrix(#matrix)

### Similar Problems
- Number of Increasing Paths in a Grid(number-of-increasing-paths-in-a-grid) (Hard)