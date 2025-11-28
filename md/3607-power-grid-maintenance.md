### Leetcode 3607 (Medium): Power Grid Maintenance [Practice](https://leetcode.com/problems/power-grid-maintenance)

### Description  
Given a power grid represented as a graph (nodes and edges), you need to keep the grid connected after a sequence of maintenance operations that remove certain edges. For each removal, report whether the grid remains fully connected (i.e., there is a path between every pair of nodes).

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[0,1],[1,2],[2,3]], removals = [[1,2]]`  
Output: `[True]`  
*Explanation: After removing edge (1,2), the grid remains connected: 0-1-2-3.*

**Example 2:**  
Input: `n = 3, edges = [[0,1],[1,2]], removals = [[1,2],[0,1]]`  
Output: `[False, False]`  
*Explanation: After first removal, nodes 0-1 and 2 are disconnected; then all are disconnected.*

**Example 3:**  
Input: `n = 5, edges = [[0,1],[0,2],[0,3],[3,4]], removals = [[0,2],[0,3]]`  
Output: `[True, False]`  
*Explanation: After first, still connected; after second, node 4 disconnects.*

### Thought Process (as if you’re the interviewee)  
- Represent the grid as a graph.
- After each edge removal, check if the graph stays connected.
- Naive approach: Remove each edge, do BFS/DFS from a node and verify all reachable -> O(n^2).
- Optimize: Use Union Find (DSU) with edge removals reversed (offline algorithm), or maintain connectivity efficiently if possible by precomputing connected components, or process removals in reverse.

### Corner cases to consider  
- Disconnected initial grid.
- Multiple removals of same edge.
- Graph has cycles; removal might not disconnect.
- No removals.
- Only one node graph.

### Solution

```python
def powerGridMaintenance(n, edges, removals):
    from collections import defaultdict, deque
    edge_set = set((min(u, v), max(u, v)) for u, v in edges)
    to_remove = set((min(u, v), max(u, v)) for u, v in removals)
    # Final edge set after all removals
    final_edges = edge_set - to_remove
    # Build initial adj list after all deletions
    adj = defaultdict(list)
    for u, v in final_edges:
        adj[u].append(v)
        adj[v].append(u)
    # DSU structure
    parent = [i for i in range(n)]
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        fx, fy = find(x), find(y)
        if fx == fy:
            return
        parent[fx] = fy
    for u in adj:
        for v in adj[u]:
            union(u, v)
    # Process removals in reversed order (add edges back)
    ans = [False] * len(removals)
    for i in range(len(removals)-1, -1, -1):
        u, v = removals[i]
        union(u, v)
        # after adding this edge back, check connectivity
        roots = set(find(x) for x in range(n))
        ans[i] = (len(roots) == 1)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n + q × α(n)), with m=edges, n=nodes, q=removals; using DSU with path compression for fast unions.
- **Space Complexity:** O(n + m) for DSU and adjacencies.

### Potential follow-up questions (as if you’re the interviewer)  

- How to update connectivity efficiently for insertions and deletions in real time?  
  *Hint: Use dynamic connectivity data structures (e.g., Euler-tour trees).*  

- How to handle removal of nodes?  
  *Hint: Must update DSU or process removals via BFS/DFS from remaining nodes.*  

- How to report the size of each connected component after each removal?  
  *Hint: Track component sizes in DSU.*

### Summary
This problem uses the disjoint-set structure (DSU/Union-Find) and the offline processing pattern. This approach is commonly applied to dynamic graph connectivity and rollback problems.


### Flashcard
For each edge removal, check graph connectivity via BFS/DFS; optimize by processing removals in reverse with Union-Find (offline algorithm).

### Tags
Array(#array), Hash Table(#hash-table), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
