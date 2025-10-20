### Leetcode 1631 (Medium): Path With Minimum Effort [Practice](https://leetcode.com/problems/path-with-minimum-effort)

### Description  
Given a 2D grid 'heights', where each element represents the height of a cell, you start at the top-left (0,0) and need to reach the bottom-right (m-1, n-1). You may move up, down, left, or right to neighboring cells. The **effort** of a path is defined as the maximum absolute difference in heights between any two consecutive cells of the route. Your goal: find a path with the minimum possible effort from start to end.

### Examples  

**Example 1:**  
Input: `heights = [[1,2,2],[3,8,2],[5,3,5]]`  
Output: `2`  
*Explanation: Path = [(0,0)->(0,1)->(1,2)->(2,2)], largest difference is max(|1-2|, |2-2|, |2-5|) = 2.*

**Example 2:**  
Input: `heights = [[1,2,3],[3,8,4],[5,3,5]]`  
Output: `1`  
*Explanation: Path = [(0,0)->(0,1)->(0,2)->(1,2)->(2,2)], largest diff: max(|1-2|,|2-3|,|3-4|,|4-5|) = 1.*

**Example 3:**  
Input: `heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]`  
Output: `0`  
*Explanation: Possible to always move to adjacent cell with same height. So max diff is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible paths and record their effort, then take the minimum. But the number of paths can be exponential; infeasible for larger grids.
- **Key observation:** Instead of summing up costs, a path's cost is determined by the largest edge in that path. So, minimizing the path means picking a route where the largest such difference is as small as possible.
- **Optimized approach:**
  - You can turn this into a path-finding problem where "the effort" is the weight of an edge between two adjacent cells.
  - Use Dijkstra's algorithm for grid traversal, where instead of distance sum, the value you're trying to minimize is the maximum difference encountered so far on the path.
  - Alternatively, a binary search over the possible effort values (from 0 up to the grid's max diff) and for each value, do BFS/DFS to check if a path exists with only steps ≤ current effort.
  - Both approaches work, but Dijkstra with min-heap is typically cleaner and faster for this problem.

### Corner cases to consider  
- Single cell grid: start is end, effort is 0.
- All cells have same height: effort is 0.
- Only one possible path (e.g., single row/column).
- Tallest peak or deepest pit right between start and end.
- Large grids: optimize for both time and space.

### Solution

```python
import heapq

def minimumEffortPath(heights):
    m, n = len(heights), len(heights[0])
    # Directions: up, down, left, right
    dirs = [(-1,0), (1,0), (0,-1), (0,1)]
    # effort[r][c] = minimal effort to reach (r,c)
    effort = [[float('inf')] * n for _ in range(m)]
    effort[0][0] = 0
    # Min-heap: (current max effort so far, r, c)
    min_heap = [(0, 0, 0)]
    
    while min_heap:
        curr_eff, r, c = heapq.heappop(min_heap)
        # Stop when we reach the goal
        if r == m - 1 and c == n - 1:
            return curr_eff
        # Visit adjacent cells
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n:
                next_eff = max(curr_eff, abs(heights[nr][nc] - heights[r][c]))
                if next_eff < effort[nr][nc]:
                    effort[nr][nc] = next_eff
                    heapq.heappush(min_heap, (next_eff, nr, nc))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × log(m × n))
  - Each cell is pushed into the heap at most once with the optimal effort. Each heap operation costs log(m × n).
- **Space Complexity:** O(m × n) 
  - For the effort matrix plus the heap, both store up to m × n elements.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is too large to fit in memory?  
  *Hint: Can you use external memory search or optimize representation?*
- How would your solution change if diagonal moves were allowed?  
  *Hint: Update directions and check all 8 adjacent cells per step.*
- Can you return **the actual path** not just the effort value?  
  *Hint: Track parent pointers during Dijkstra traversal.*

### Summary
Dijkstra's algorithm with a custom "maximum-so-far" updating rule solves this problem efficiently. It demonstrates the classic **Graph/Heap** pattern for minimum path finding with custom edge relaxations. The same technique is widely applicable to other grid-based or weighted path optimization problems.


### Flashcard
Use a path-finding approach to minimize the maximum effort along a path in a grid.

### Tags
Array(#array), Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
- Swim in Rising Water(swim-in-rising-water) (Hard)
- Path With Maximum Minimum Value(path-with-maximum-minimum-value) (Medium)
- Find the Safest Path in a Grid(find-the-safest-path-in-a-grid) (Medium)