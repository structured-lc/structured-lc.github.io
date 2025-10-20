### Leetcode 2556 (Medium): Disconnect Path in a Binary Matrix by at Most One Flip [Practice](https://leetcode.com/problems/disconnect-path-in-a-binary-matrix-by-at-most-one-flip)

### Description  
Given an m × n binary matrix `grid` where each cell is either 1 (open) or 0 (blocked), you can move right or down from each cell on value 1. The goal is to determine if it's possible to disconnect any path from the top-left (0,0) to the bottom-right (m-1,n-1) by flipping **at most one** cell (but not the start or end cell). “Disconnect” means no possible path remains between start and end.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,1],[1,0,1],[1,1,1]]`  
Output: `True`  
*Explanation:*  
There are two paths from (0,0) to (2,2): down then right, or right then down. Flipping the center cell (1,1) from 0 to 1 connects more paths, but since it's 0, only two unique paths exist. If you flip either (0,1), (1,0), (1,2), or (2,1) from 1 to 0, you disconnect the path. So, it's possible.

**Example 2:**  
Input: `grid = [[1,1,0],[0,1,1],[1,1,1]]`  
Output: `False`  
*Explanation:*  
There is only one path from (0,0) to (2,2): (0,0)→(0,1)→(1,1)→(1,2)→(2,2). Flipping any cell except (0,0) or (2,2) will block the only path. But that is exactly what we want! However, check closely: you cannot flip (0,1) or (1,1) without blocking too soon, and since you can't flip start/end, it's impossible to disconnect the grid with one flip.

**Example 3:**  
Input: `grid = [[1,0],[0,1]]`  
Output: `True`  
*Explanation:*  
No path exists initially. The grid is already disconnected; thus, it is trivially possible to "disconnect" (it's already disconnected), so output is True.

### Thought Process (as if you’re the interviewee)  
First, check if a path from (0,0) to (m-1,n-1) exists at all.  
- If not, it's already disconnected, so return True.

If a path exists, we want to know: can we disconnect all possible paths by flipping at most one non-endpoint cell from 1 to 0? 

Brute-force approach:
- For every cell (except endpoints), flip it and check if a path remains.
- This is **O(m\*n)** flips; each requiring a path-finding run (e.g., DFS/BFS) — not optimal.

Observation:
- If there is only **one unique path**, flipping any cell in it will disconnect the grid.
- If there are **multiple disjoint paths**, we may have to flip a “shared” cell.
- **Key trick**: If after removing the first path (e.g., marking all visited 1's to 0, except start/end), there is still a path, then you cannot disconnect with one flip.

Optimized plan:
- Find a path with DFS from (0,0); mark the path.
- Try again: is there still a path (despite that removal)? 
  - If YES, cannot disconnect with one flip (need 2 flips to block both).
  - If NO, then there must be a “critical” cell whose flip will disconnect.

This has only 2 DFS traversals.

### Corner cases to consider  
- The grid is already disconnected (no path exists).
- The grid size is very small (1×1, 2×2).
- Start or end cell is 0.
- Multiple paths vs only one path.
- Corner cells (cannot flip start/end).
- All cells are 1.

### Solution

```python
def isPossibleToCutPath(grid):
    m, n = len(grid), len(grid[0])

    # Helper: DFS; marks visited 1's as 0 to destroy path
    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 0:
            return False
        if (i, j) == (m-1, n-1):
            return True
        # Mark as visited (temporarily 0)
        grid[i][j] = 0
        # Try moving down or right (since only allowed moves)
        found = dfs(i+1, j) or dfs(i, j+1)
        # If not exit, no need to reset
        return found

    # First pass: remove one path
    path1_exists = dfs(0, 0)

    # If no path from start, already disconnected
    if not path1_exists:
        return True

    # Reset the start and end, since they can't be "cut"
    grid[0][0] = 1
    grid[m-1][n-1] = 1

    # Second pass: try again; if another path exists, can't disconnect with one flip
    path2_exists = dfs(0, 0)

    return not path2_exists
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n)  
  Runs DFS at most twice, and each visit marks cells, so total O(m × n).
- **Space Complexity:** O(m × n)  
  Due to call stack in worst-case for large grid and recursion (or visited matrix if iterative).

### Potential follow-up questions (as if you’re the interviewer)  

- If allowed to flip *k* cells (instead of one), how would the solution change?  
  *Hint: Consider BFS with state (“flips used”), or dynamic programming.*

- What if you can move in all 4 directions (up, down, left, right)?  
  *Hint: Need to consider revisiting states, or graph cuts.*

- How to solve if you cannot modify the original grid in place?  
  *Hint: Use a visited matrix or copy grid before DFS.*

### Summary
This approach uses **path erasure / double DFS** to find if more than one disjoint path exists. It's a common trick for minimal cut/path disconnection in grid/graph problems. The pattern often applies to questions involving “removing minimal nodes to disconnect source and sink,” which shows up in both binary grid and general graph scenarios. Efficient, since it reduces a potential brute-force O((mn)²) to O(mn).


### Flashcard
If there’s only one unique path, flipping any non-endpoint cell on it disconnects the matrix; otherwise, check if any single flip disconnects all paths.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Number of Submatrices That Sum to Target(number-of-submatrices-that-sum-to-target) (Hard)
- Minimum Cost to Make at Least One Valid Path in a Grid(minimum-cost-to-make-at-least-one-valid-path-in-a-grid) (Hard)
- Minimum Number of Days to Disconnect Island(minimum-number-of-days-to-disconnect-island) (Hard)
- Minimum Weighted Subgraph With the Required Paths(minimum-weighted-subgraph-with-the-required-paths) (Hard)