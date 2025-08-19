### Leetcode 2146 (Medium): K Highest Ranked Items Within a Price Range [Practice](https://leetcode.com/problems/k-highest-ranked-items-within-a-price-range)

### Description  
Given a shop layout as a 2D grid of integers, each cell represents either:
- `0`: a wall (impassable),
- `1`: an empty space (movable, but no item), or
- a positive integer >1: an item with that price (movable),
you start at a given cell and are interested in finding up to `k` items whose prices are within a given range `[low, high]`.  
An item is *higher ranked* if it is closer (by shortest path distance from the start), then by lower price, then by smaller row number, then by smaller column number.  
You must return the coordinates of the k highest-ranked items in increasing rank order.

### Examples  

**Example 1:**  
Input:  
```
grid = [
 [1, 2, 0, 1],
 [1, 3, 4, 1],
 [0, 1, 5, 1]
]
pricing = [2, 5]
start = [0, 0]
k = 3
```  
Output: `[[0,1], [1,1], [2,1]]`  
*Explanation: Items with price 2 (at (0,1)), price 3 (at (1,1)), and price 5 (at (2,2)) all fit in [2,5]. Their distances from the start: (0,1) has distance 1, (1,1) is 2, (2,2) is 4. The closest k valid are (0,1), (1,1), and (2,1) (needs to go through (1,1)). Their positions by rules: (0,1), (1,1), (2,1).*

**Example 2:**  
Input:  
```
grid = [
 [1, 2, 0, 1],
 [1, 3, 4, 1],
 [0, 1, 5, 1]
]
pricing = [2, 3]
start = [0, 0]
k = 2
```  
Output: `[[0,1], [1,1]]`  
*Explanation: Only (0,1) and (1,1) have prices in [2,3]. By distance, (0,1) then (1,1).*

**Example 3:**  
Input:  
```
grid = [
 [1, 1, 0, 1],
 [1, 1, 1, 1],
 [0, 1, 1, 1]
]
pricing = [2, 5]
start = [0,0]
k = 3
```  
Output: `[]`  
*Explanation: There are no items with prices in [2,5].*

### Thought Process (as if you’re the interviewee)  
- Start by identifying all items reachable from the start.  
- For each cell, if the price falls within the range [low, high], store its location with rank information.  
- To ensure minimum distances (and good tie-breaking), try BFS (breadth-first search) from the start.  
- Track: current distance, and when you reach an item with valid price, add it to result candidates.  
- After BFS, sort candidates by distance, then price, then row, then col and return the first k.  
- Brute force would be to collect all possible items, calculate path from start to every such cell, but this would be slow (O(m\*n) path computations); BFS finds all at shortest distance one pass.  
- This approach is optimal because BFS visits in distance order and guarantees the shortest path to each cell is found first.

### Corner cases to consider  
- Empty grid or grid with no valid items in range.
- Start cell is itself an item and should be counted if its price in range.
- Items blocked by walls (unreachable).
- k larger than number of reachable items.
- Multiple items with same price/distance; row and column tie-breakers.
- Items with price at exact low or high boundary.

### Solution

```python
from collections import deque

def highestRankedKItems(grid, pricing, start, k):
    m, n = len(grid), len(grid[0])
    low, high = pricing
    sr, sc = start
    
    # Track visited cells to avoid cycles
    visited = [[False] * n for _ in range(m)]
    queue = deque()
    queue.append((sr, sc, 0))  # (row, col, distance)
    visited[sr][sc] = True

    candidates = []

    while queue:
        r, c, dist = queue.popleft()
        
        val = grid[r][c]
        if val >= low and val <= high:
            candidates.append( (dist, val, r, c) )
        
        # Move to adjacent cells
        for dr, dc in ((0,1), (1,0), (0,-1), (-1,0)):
            nr, nc = r+dr, c+dc
            # In grid bounds and not wall and not visited
            if 0<=nr<m and 0<=nc<n and not visited[nr][nc] and grid[nr][nc]!=0:
                visited[nr][nc] = True
                queue.append( (nr, nc, dist + 1) )

    # Sort by: distance (asc), price (asc), row (asc), column (asc)
    candidates.sort()
    
    # Return top k locations
    return [[r, c] for (_, _, r, c) in candidates[:k]]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n + s log s), where s is the number of reachable and valid items; BFS traverses every cell once, collecting candidates, then sorting at most m\*n candidates.
- **Space Complexity:** O(m × n) for visited grid and queue; O(s) for the candidate items.

### Potential follow-up questions (as if you’re the interviewer)  

- What if items can only be picked once (require marking them as collected)?
  *Hint: Would you need to update the grid and revisit BFS after each pick?*

- How do you handle multiple starts (e.g., multiple customers looking at the same items)?
  *Hint: Would you run BFS from each start, or can you preprocess distances?*

- Can you do this without the sorting step?  
  *Hint: Can you keep a top-k heap as you scan items during BFS, or is there an order guarantee?*

### Summary
This problem is a classic BFS + multi-key sorting application, common for pathfinding with tie-breaker ranking conditions. BFS is preferred because it ensures shortest paths (so distance is always minimal), and sorting is needed for tie-breaking beyond distance. This coding pattern (BFS for minimum distance; sorting for custom ranking) shows up in variant grid-based ranking/search problems, e.g., shortest path with priorities or nearest resource by multiple rules.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix)

### Similar Problems
- Kth Largest Element in an Array(kth-largest-element-in-an-array) (Medium)
- As Far from Land as Possible(as-far-from-land-as-possible) (Medium)
- Reward Top K Students(reward-top-k-students) (Medium)