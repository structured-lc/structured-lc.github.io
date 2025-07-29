### Leetcode 2277 (Hard): Closest Node to Path in Tree [Practice](https://leetcode.com/problems/closest-node-to-path-in-tree)

### Description  
Given a tree with n nodes (labeled 0 to n-1) represented as an edge list, you are to answer m queries. Each query is `[start, end, node]`, and you must find the node on the path from `start` to `end` that is **closest** to `node` (in terms of the number of edges). If there are multiple closest nodes, return the one with the smallest value.  
In other words: For each query, return the node on the simple path from `start` to `end` whose distance to `node` is minimized.

### Examples  

**Example 1:**  
Input=`n=5, edges=[[0,1],[1,2],[1,3],[3,4]], queries=[[0,4,2],[4,0,2]]`,  
Output=`[1,1]`  
*Explanation:  
Tree is:  
```
    0
    |
    1
   / \
  2   3
        \
         4
```
For both queries, the path from `0` to `4` is [0,1,3,4]. The distances to node 2 are: [2,1,3,4]. Node 1 (distance 1) is the closest.*

**Example 2:**  
Input=`n=6, edges=[[0,1],[0,2],[2,3],[2,4],[4,5]], queries=[[0,5,2],[3,1,4]]`,  
Output=`[2,2]`  
*Explanation:  
Tree:  
```
    0
   / \
  1   2
     / \
    3   4
          \
           5
```
1st query: path 0→2→4→5, distances from 2: [1,0,1,2] → node 2 (closest).  
2nd query: path 3→2→0→1, distances from 4: [2,1,2,3] → node 2 (closest).*

**Example 3:**  
Input=`n=4, edges=[[0,1],[1,2],[2,3]], queries=[[0,3,1],[2,1,3]]`,  
Output=`[1,1]`  
*Explanation:  
Tree:  
```
0—1—2—3
```
Query 1: path 0→1→2→3, distances to 1: [1,0,1,2]; closest node is 1.  
Query 2: path 2→1, distances to 3: [1,2]; closest node is 2, but 1 is tested (distances: 2,1), so 1 (since both have distance 1 but node 1 < 2).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each query, reconstruct the path from `start` to `end` (via parent pointers or DFS), then for each node on the path, compute its distance to `node` using BFS/DFS. Return the node with smallest distance (and value, in case of tie). This would be very slow for large trees or many queries.

- **Optimization:**  
  Since the tree is static and not very large (`n ≤ 10⁴`), precompute all-pairs shortest paths is possible with BFS for each node (O(n²)), or precompute the parent/depth/LCA for fast path finding and distance queries.

  - For each query, reconstruct the path using parent mapping—use LCA to get the path nodes efficiently.
  - For all nodes on the path, calculate the distance to target node using precomputed depths and LCA, since `dist(u, v) = depth[u] + depth[v] - 2 × depth[lca(u, v)]`.
  - Find the node on path with minimal distance to target node.

- **Why this approach:**  
  tree distance queries are fast with depth and LCA precomputation (O(log n)), and reconstructing path using parent and LCA is efficient. This drastically improves performance for many queries.

### Corner cases to consider  
- Tree with a single node, or only two nodes.
- Query where `start == end` (the path is a single node).
- `node` is itself on the path.
- Multiple nodes on path at same min distance (return smallest value).
- Node indices at edges (0 or n-1).
- Unbalanced/deep tree.

### Solution

```python
def closestNode(n, edges, queries):
    # Build tree
    from collections import defaultdict, deque

    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    # Precompute parent and depth for LCA
    LOG = 15  # since n <= 10^4, log2(10^4) ~ 14
    parent = [[-1] * n for _ in range(LOG)]
    depth = [0] * n
    
    def dfs(u, p):
        parent[0][u] = p
        for v in graph[u]:
            if v != p:
                depth[v] = depth[u] + 1
                dfs(v, u)
    dfs(0, -1)

    # Binary lifting table
    for k in range(1, LOG):
        for v in range(n):
            if parent[k-1][v] != -1:
                parent[k][v] = parent[k-1][parent[k-1][v]]
    
    # LCA query
    def lca(u, v):
        if depth[u] < depth[v]:
            u, v = v, u
        for k in reversed(range(LOG)):
            if parent[k][u] != -1 and depth[parent[k][u]] >= depth[v]:
                u = parent[k][u]
        if u == v:
            return u
        for k in reversed(range(LOG)):
            if parent[k][u] != -1 and parent[k][u] != parent[k][v]:
                u = parent[k][u]
                v = parent[k][v]
        return parent[0][u]
    
    # Path from u to v (inclusive)
    def path_nodes(u, v):
        l = lca(u, v)
        path = []
        # u to lca
        cur = u
        while cur != l:
            path.append(cur)
            cur = parent[0][cur]
        # lca to v
        stack = []
        cur = v
        while cur != l:
            stack.append(cur)
            cur = parent[0][cur]
        path.append(l)
        while stack:
            path.append(stack.pop())
        return path
    
    # Distance in tree
    def dist(u, v):
        l = lca(u, v)
        return depth[u] + depth[v] - 2 * depth[l]
    
    res = []
    for start, end, node in queries:
        pth = path_nodes(start, end)
        min_dist = float('inf')
        min_node = None
        for v in pth:
            d = dist(v, node)
            if d < min_dist or (d == min_dist and v < min_node):
                min_dist = d
                min_node = v
        res.append(min_node)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing (building tree, LCA, depth): O(n log n)
  - For each query: path reconstruction O(path len), but overall up to O(m n) (in the worst case), LCA/dist O(log n) per comparison, so total O(m n) in worst case.
  - Overall: O(n log n + m n)
- **Space Complexity:**  
  - Tree, parent table, depth: O(n log n)
  - Paths: up to O(n) in worst query.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree changes (edges are inserted/deleted) and there are dynamic queries?  
  *Hint: Think about dynamic LCA structures or dynamic connectivity.*

- How would you handle even larger values of n (e.g. n > 10⁵) with many queries?  
  *Hint: Could you avoid reconstructing paths or use tree decompositions or heavy-light decomposition?*

- How to modify your method if the graph is not guaranteed to be a tree?  
  *Hint: What breaks—consider disconnected components/cycles and how to handle shortest paths efficiently.*

### Summary
This problem leverages the classic **tree LCA, depth, and path-reconstruction** patterns to solve efficient multi-query tree distance and path-node problems. The pattern is a standard **offline tree query** approach (binary lifting) and can be seen in problems involving **distance queries, subtree queries, and path property queries** on trees.