### Leetcode 1102 (Medium): Path With Maximum Minimum Value [Practice](https://leetcode.com/problems/path-with-maximum-minimum-value)

### Description  
Given a grid with R rows and C columns, each cell contains an integer. Your goal is to move from the **top-left corner (0, 0) to the bottom-right corner (R-1, C-1)**, moving only in four cardinal directions (up, down, left, right). A *path* is any sequence of moves connecting these two cells. The **score of a path** is the *minimum value* along that path (including both the start and end cell). Among all possible paths, output the **maximum possible score** you can get (i.e., maximize the minimum value along any valid path)[3][4].

### Examples  

**Example 1:**  
Input: `[[5,4,5],[1,2,6],[7,4,6]]`  
Output: `4`  
*Explanation: One of the best paths is 5→4→5→6→6, minimum along the path is 4.*

**Example 2:**  
Input: `[[2,2,1,2,2,2],[1,2,2,2,1,2]]`  
Output: `2`  
*Explanation: As you travel, the lowest number you are forced to pass through is 2 (can avoid the 1’s).*

**Example 3:**  
Input: `[[3,4,6,3,4],[0,2,1,1,7],[8,8,3,2,7],[3,2,4,9,8],[4,1,2,0,0],[4,6,5,4,3]]`  
Output: `3`  
*Explanation: There is a path (possibly zig-zag) where the minimal value along the path is 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths from (0,0) to (R-1,C-1), calculate the minimal value along each, and pick the max of these minimums. This is not feasible for large grids due to an exponential number of paths.
- **Optimization:**  
  - This is a special graph optimization: for each path, we want to maximize the minimum value encountered.
  - Two optimized approaches:
    1. **Binary search + BFS/DFS:**  
       - Binary search on possible answer (the minimum value along the path).
       - For a given value `k`, check whether there exists a path where all cells in the path are at least `k` (doable via BFS/DFS).
    2. **Max-heap (Priority Queue) / Dijkstra’s:**  
       - Start at (0,0), always expand the cell with the highest *current* min value (i.e., max-heap on the min-so-far along the path to that cell).
       - Whenever reaching (R-1,C-1), the value is the answer.
  - **Union-Find:**  
    - Another alternative: sort all cells by value decreasing. Activate cells, connect to active neighbors, and check when start & end connect[1][2].

- **I would prefer the max-heap/Dijkstra's approach** — it's intuitive (always pick the path with the largest min-so-far), easy to implement, and more efficient than brute-force.

### Corner cases to consider  
- Grids with one cell
- Grids where all values are identical
- Grids where there is no possible path (should not happen as per constraints)
- Minimum/maximum values at the borders or only at the corners
- Large grids or grids filled with 0 or very large/small values

### Solution

```python
import heapq

def maximumMinimumPath(grid):
    rows, cols = len(grid), len(grid[0])
    # max-heap: (-min_so_far, row, col)
    heap = [(-grid[0][0], 0, 0)]
    visited = [[False]*cols for _ in range(rows)]
    visited[0][0] = True

    directions = [(1,0), (-1,0), (0,1), (0,-1)]
    
    while heap:
        # Pop cell with highest min_so_far
        min_so_far, r, c = heapq.heappop(heap)
        min_so_far = -min_so_far
        # If end cell reached, return
        if (r, c) == (rows-1, cols-1):
            return min_so_far
        # Visit neighbors
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                visited[nr][nc] = True
                # New path's min value is the smaller of current and new cell
                next_min = min(min_so_far, grid[nr][nc])
                heapq.heappush(heap, (-next_min, nr, nc))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(R × C × log(R × C))  
  Each cell can be put in the heap at most once, and the heap contains up to R × C elements; heap operations are log(R × C).
- **Space Complexity:** O(R × C)  
  We maintain a visited grid and the heap could contain up to all cells in the grid.

### Potential follow-up questions (as if you’re the interviewer)  

- If multiple paths can achieve the same minimal value, how would you output one such path?  
  *Hint: Add parent pointers while traversing to reconstruct the path.*

- Could you solve this for other path cost metrics, e.g., sum along the path?  
  *Hint: This is standard Dijkstra (total cost), but maximizing the minimum requires these modified rules.*

- How can you optimize further for large sparse grids, or if grid values are constrained?  
  *Hint: Bucket sort for the values, or process in order by value using Union-Find.*

### Summary
This problem uses the **modified Dijkstra pattern** (with the max-heap prioritizing the maximal minimum along the path). The logic is similar to Dijkstra’s shortest path but instead of summing costs, you track the minimum along the path and always expand the most promising path first. This pattern is common in path-finding where the cost is not additive, such as finding *paths that maximize the smallest step* (also appears as "minimum bottleneck path" in graph theory).

### Tags
Array(#array), Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
- Path With Minimum Effort(path-with-minimum-effort) (Medium)