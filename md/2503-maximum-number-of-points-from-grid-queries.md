### Leetcode 2503 (Hard): Maximum Number of Points From Grid Queries [Practice](https://leetcode.com/problems/maximum-number-of-points-from-grid-queries)

### Description  
Given an m × n grid of integers and a list of queries, for each query, starting from the top-left cell (0,0), you may move in four directions (up, down, left, right); you may only visit neighbors if their value is **strictly less than** the query value. Return how many unique cells can be visited for each query if you collect one point per unique cell you first visit (you may reuse cells across queries). The process repeats separately for each query.

### Examples  

**Example 1:**  
Input:  
`grid = [[1,3,1],[3,3,3],[3,3,3]]`,  
`queries = [4]`  
Output:  
`[3]`  
*Explanation: For query=4, you can visit cells with value <4.  
Start at (0,0): 1 (valid), right/down: 3 (valid), further moves blocked.  
Total: (0,0), (0,1), (1,0) ⇒ 3 cells.*

**Example 2:**  
Input:  
`grid = [[5,2,1],[3,1,6]]`,  
`queries = [2,6]`  
Output:  
`[0,5]`  
*Explanation:  
For query=2, only (0,0) has value 5 ≥2 (not allowed) ⇒ 0 cells.  
For query=6, visit cells with value <6.  
Start (0,0): 5 (valid), right (0,1): 2 (valid), right (0,2): 1 (valid)  
Down from (0,2): (1,2): 6 (not valid), from (0,1) down (1,1): 1 (valid), left (1,0): 3 (valid)  
Cells: (0,0),(0,1),(0,2),(1,1),(1,0) ⇒ 5 cells.*

**Example 3:**  
Input:  
`grid = [[1,2,3],[6,5,4],[7,8,9]]`  
`queries = [1,5,9]`  
Output:  
`[0,4,8]`  
*Explanation:  
- query=1: cannot move from (0,0) since 1 !< 1 → 0  
- query=5: can reach 4 cells: (0,0),(0,1),(0,2),(1,2)  
- query=9: all except cell 2,2 (which is 9, not <9) → 8 cells*


### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For each query, run a BFS/DFS from the top-left cell and keep a set of cells visited with value < query.  
  This is too slow for grid size up to 10⁵ or lots of queries, as it is O(K×MN).

- **Optimization with offline processing:**  
  Notice that queries only "raise the bar": for lower query values, fewer cells are eligible; for higher, more may be.  
  - Process all queries and grid cells in value-sorted order.  
  - Use a **priority queue (min-heap)** to always expand the next smallest cell value available, like a multi-source Dijkstra/BFS.  
  - For each query (sorted by value), "grow" our visited area as long as cell values < query; when the query value increases, expand further.

- **Implementation overview:**  
  - Sort queries with their indices.
  - Use a min-heap initialized at (0,0); mark visited.
  - Pop grid cells from heap whose value < current query; for each, add its unvisited neighbors to heap; count total visited.
  - For each query, record the count after expansion for that query value.
  - Restore original indices at the end.

- **Why choose this approach:**  
  - Each grid cell is processed once, only when its value is less than the current query.
  - Heavily reduces redundant BFS/DFS for each query.
  - Time: O(MN log MN + Q log Q) (for sort, for heap ops), very efficient.


### Corner cases to consider  
- Empty grid  
- Queries where all values in the grid are ≥ query (answer 0)  
- Only one cell grid  
- All grid values equal  
- Multiple queries with the same value  
- Query less than grid  
- Queries larger than all grid values

### Solution

```python
import heapq

def maxPoints(grid, queries):
    m, n = len(grid), len(grid[0])
    # Attach original query indices so we can return answers in order
    indexed_queries = sorted([(val, idx) for idx, val in enumerate(queries)])
    res = [0] * len(queries)
    visited = [[False]*n for _ in range(m)]
    heap = []
    
    # Start BFS/Heap from top-left cell if possible
    heapq.heappush(heap, (grid[0][0], 0, 0))
    visited[0][0] = True
    cnt = 0  # Running count of cells added for queries

    # For each query in ascending order
    for val, idx in indexed_queries:
        # Expand heap, adding cells while their value < query value
        while heap and heap[0][0] < val:
            cell_val, x, y = heapq.heappop(heap)
            cnt += 1
            # Visit neighbors
            for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x+dx, y+dy
                if 0 <= nx < m and 0 <= ny < n and not visited[nx][ny]:
                    heapq.heappush(heap, (grid[nx][ny], nx, ny))
                    visited[nx][ny] = True
        res[idx] = cnt
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(mn log(mn) + q log q)  
  Sorting queries → O(q log q)  
  Each grid cell is put into the heap at most once (O(mn)), and each heap operation is O(log(mn)), so O(mn log(mn)).  
  Processing is efficient per cell, not per query.

- **Space Complexity:** O(mn + q)  
  - visited array: O(mn)  
  - min-heap: O(mn) in worst case  
  - answer array: O(q)  


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle streaming queries (queries arriving after grid processing)?  
  *Hint: Need to store processed state or repeat traversal—can you preprocess for all possible thresholds (like DP or prefix regions)?*

- What if you could change the starting position for each query?  
  *Hint: Approach must efficiently expand from other starting points!*

- What if movement is allowed only in two directions (e.g., right and down)?  
  *Hint: Could dynamic programming be used?*


### Summary
This problem uses the **offline query processing** pattern with a **priority queue (heap BFS)**, efficiently grouping queries by threshold and growing the visited region incrementally.  
The same paradigm applies for "how many cells/regions/connected areas are reachable below a threshold" problems, and for offline event query problems where precomputing possible states greatly reduces repeated computation.


### Flashcard
Sort queries and grid cells by value, use min-heap and union-find to process offline – add cells while value < query, track component size from (0,0).

### Tags
Array(#array), Two Pointers(#two-pointers), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
- Trapping Rain Water II(trapping-rain-water-ii) (Hard)
- Escape the Spreading Fire(escape-the-spreading-fire) (Hard)