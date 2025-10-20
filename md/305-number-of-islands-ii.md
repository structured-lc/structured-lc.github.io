### Leetcode 305 (Hard): Number of Islands II [Practice](https://leetcode.com/problems/number-of-islands-ii)

### Description  
Given an m × n grid initially filled with water, you're given a list of positions where you turn the cell at position (r, c) into land (one by one). After each operation, report the current number of connected islands. An island is a group of horizontally or vertically connected land cells.  
Positions may repeat (i.e., turning an already-land cell into land again has no effect).

### Examples  

**Example 1:**  
Input: `m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]`  
Output: `[1,1,2,3]`  
*Explanation:*  
- Add land at (0,0): 1 island  
- Add land at (0,1): connects to (0,0), still 1 island  
- Add land at (1,2): new island, total 2  
- Add land at (2,1): new island, total 3  

**Example 2:**  
Input: `m = 1, n = 1, positions = [[0,0],[0,0]]`  
Output: `[1,1]`  
*Explanation:*  
- First add creates a new island  
- Second add is a repeat, so still 1 island  

**Example 3:**  
Input: `m = 2, n = 2, positions = [[0,0],[1,1],[0,1]]`  
Output: `[1,2,1]`  
*Explanation:*  
- (0,0): 1 island  
- (1,1): new, 2 islands  
- (0,1): connects to (0,0), merges with island at (1,1) if vertically adjacent, so islands go from 2 to 1  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each "add land" operation, scan the entire grid and count islands using DFS/BFS.  
  This is too slow: each operation could take O(m×n), and there could be up to 10⁴ operations.

- **Optimized (Union-Find / Disjoint Set):**  
  Each newly added cell starts as its own island. For each addition, check all 4 neighbors (up, down, left, right).  
  - If a neighbor is also land, union (merge) the corresponding sets.  
  - Keep track of the number of disjoint sets (island count), incrementing when you add new land, and decrementing for each successful union with a different neighbor.  
  - Use path compression and union by rank to keep union-find operations nearly constant time.

  Trade-off:  
  - Space usage is O(m×n) to store parent pointers and ranks.
  - Time is almost O(1) per operation, leading to O(k) total if optimized correctly.

### Corner cases to consider  
- Repeated positions (add land to the same cell multiple times—should not increment island count).
- Grid edge boundaries (neighbors outside grid).
- No positions given (empty positions list).
- Only 1 cell (m = n = 1).
- All positions result in isolated islands (never connect).
- All positions ultimately become fully connected.

### Solution

```python
def numIslands2(m, n, positions):
    # Helper to convert (r,c) to unique index
    def get_idx(r, c):
        return r * n + c

    parent = {}
    rank = {}
    res = []
    count = 0   # Number of islands
    land = set()

    # 4 directions: up, down, left, right
    dirs = [(-1,0),(1,0),(0,-1),(0,1)]

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # path compression
            x = parent[x]
        return x

    def union(x, y):
        xroot, yroot = find(x), find(y)
        if xroot == yroot:
            return False
        # union by rank for efficiency
        if rank[xroot] < rank[yroot]:
            parent[xroot] = yroot
        else:
            parent[yroot] = xroot
            if rank[xroot] == rank[yroot]:
                rank[xroot] += 1
        return True

    for r, c in positions:
        idx = get_idx(r, c)
        if idx in land:
            res.append(count)
            continue
        parent[idx] = idx
        rank[idx] = 0
        land.add(idx)
        count += 1

        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            nidx = get_idx(nr, nc)
            if 0 <= nr < m and 0 <= nc < n and nidx in land:
                if union(idx, nidx):
                    count -= 1
        res.append(count)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(k * α(m×n)), where k = number of positions, α = inverse Ackermann function (effectively constant for practical input), as union and find with path compression are nearly constant time.  
- **Space Complexity:**  
  O(m×n), since we store parent and rank for each cell which has ever become land (worst-case, all cells become land).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you had to support diagonal adjacency in islands?  
  *Hint: Instead of 4 neighbors, check 8 directions (adjust dirs array).*

- What if you want to rollback to previous states (e.g., undo land addition)?  
  *Hint: Consider persistent data structures or store historical parent/rank info.*

- Can you optimize space if the grid is extremely large but sparse?  
  *Hint: Use a hashmap/dictionary for parent/rank only for cells that have become land.*

### Summary
This problem is a classic application of the Disjoint Set (Union-Find) data structure—specifically dynamic connectivity. The coding pattern is the union-find with path compression and rank optimization, frequently used in graph connectivity challenges and Kruskal’s MST algorithm. Managing component counts in a dynamic, 2D setting is a valuable technique for grid-based algorithm problems.


### Flashcard
Employ Union-Find to efficiently merge islands as new land is added, tracking the number of disjoint sets.

### Tags
Array(#array), Hash Table(#hash-table), Union Find(#union-find)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)
- Process Restricted Friend Requests(process-restricted-friend-requests) (Hard)