### Leetcode 3534 (Hard): Path Existence Queries in a Graph II [Practice](https://leetcode.com/problems/path-existence-queries-in-a-graph-ii)

### Description  
Given an integer `n` (number of nodes, labeled from 0 to n-1), a list of undirected edges, and a list of path queries, each query asks whether there exists a path from node `u` to node `v` using **at most** `limit` edges per move. The edges are unweighted. For each query `(u, v, limit)`, return `true` if such a path exists and `false` otherwise. Multiple queries are to be answered efficiently for a potentially large input. The key is to determine *existence* of a path between nodes under a step constraint.

### Examples  

**Example 1:**  
Input:  
n = 5,  
edges = [[0,1],[1,2],[2,3],[3,4]],  
queries = [[0,4,2],[0,4,4]]  
Output: `[False, True]`  
*Explanation: For query `(0,4,2)`, the shortest path length from 0 to 4 is 4, so cannot reach in 2 moves.  
For query `(0,4,4)`, length is 4, so exactly fits the limit: possible.*

**Example 2:**  
Input:  
n = 3,  
edges = [[0,1],[1,2]],  
queries = [[0,2,1],[1,2,1],[0,2,5]]  
Output: `[False, True, True]`  
*Explanation: From 0 to 2, minimum steps = 2: cannot in 1 move (`False`),  
from 1 to 2 takes 1 step, so possible (`True`),  
from 0 to 2 in 5 moves: possible since we allow extra walks (`True`).*

**Example 3:**  
Input:  
n = 4,  
edges = [],  
queries = [[1,2,1]]  
Output: `[False]`  
*Explanation: No edges, the nodes are disconnected. No path exists.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  For each query, run BFS from `u` to `v` and check if the destination is reachable within `limit` steps.  
  For q queries, this is too slow: O(q × (n + e)), not feasible for large q or n.

- **Optimization:**  
  Precompute all-pairs shortest paths (using BFS from each node), so you can answer any `(u,v,limit)` in O(1) time.  
  But storing all n × n distances costs O(n²) space, infeasible for large n (up to 10⁵).

- **Further optimization:**  
  Realize that the input may require batch processing of queries.  
  Process all queries with the same limit (or batch by limit), and use BFS up to limit from each source node—but this is still expensive.

- **Efficient approach:**  
  Use **offline processing**:  
  - Sort queries by their `limit`.
  - Process edges by increasing path length and unite connected components using **Union-Find** (DSU).
  - For each query with limit `L`, all edges up to L are considered; if `u` and `v` are in the same component, a path ≤ L exists.

  But in the current problem, the graph is **unweighted**, so the shortest path is determined only by the number of edges.  
  - If we process a BFS from every node, we run into O(n²).
  - Since only *existence* of path ≤ limit is needed, and path length is unique because the edges are unweighted, the BFS-from-each trick fits only if n is small.

- **Final approach:**  
  BFS from every node is infeasible. Instead, if queries are small and the edge limit is small, you can BFS lazily. However, most efficient is to process only queried pairs: run BFS from `u` up to `limit` for each query, caching answers for repeat queries.

  **For interview:**
  - If n is small: BFS or Floyd–Warshall.
  - If queries are offline: batch queries, do multi-source BFS (meet-in-the-middle if possible).
  - If only path existence up to limit: BFS from `u` up to limit steps suffices.

### Corner cases to consider  
- Empty edge list (no paths possible unless u == v).
- limit == 0 (can only reach self node or not move).
- u == v (always True if limit ≥ 0).
- Disconnected components.
- Multiple queries for the same (u,v,limit) (possible to cache).
- Graph with cycles (does not affect shortest paths).

### Solution

```python
from collections import deque, defaultdict

def pathExistenceQueries(n, edges, queries):
    # Build adjacency list
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    res = []
    # Optionally, cache answers to avoid repeat computation
    cache = {}
    
    for u, v, limit in queries:
        if (u, v, limit) in cache:
            res.append(cache[(u, v, limit)])
            continue
        if u == v:
            cache[(u, v, limit)] = True
            res.append(True)
            continue
        found = False
        visited = [False] * n
        q = deque()
        q.append((u, 0))  # (node, distance_so_far)
        visited[u] = True
        while q:
            node, d = q.popleft()
            if d > limit:
                continue
            if node == v:
                found = True
                break
            for nei in adj[node]:
                if not visited[nei]:
                    visited[nei] = True
                    q.append((nei, d+1))
        cache[(u, v, limit)] = found
        res.append(found)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(q × (n + e)), where q is #queries, n is #nodes, and e is #edges (each query may BFS up to limit depth). In practice, much less if the limit is small or the graph is sparse.

- **Space Complexity:**  
  O(n + e + q), for adjacency list, visited array, result list, and optional cache.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if the limit is always small (e.g., ≤ 10)?  
  *Hint: Precompute BFS balls of radius 10 for each node.*

- What if the graph is static and queries are dynamic and numerous?  
  *Hint: Preprocess all-pairs shortest paths if n is small; otherwise, cache previous BFS results.*

- What if the queries may ask for minimum path length, not just under limit?  
  *Hint: Do Dijkstra's or BFS for unweighted graphs.*

### Summary
The problem is a classic case of **graph search with constraints**. Patterns: BFS for shortest paths in unweighted graphs, and caching results for repeated queries. Optimal for small limits or few queries; for huge graphs and numerous queries, requires advanced precomputation like all-pairs shortest paths or batch BFS. This approach and pattern appear in networking, pathfinding games, or reachability queries.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Bit Manipulation(#bit-manipulation), Graph(#graph), Sorting(#sorting)

### Similar Problems
