### Leetcode 3515 (Hard): Shortest Path in a Weighted Tree [Practice](https://leetcode.com/problems/shortest-path-in-a-weighted-tree)

### Description  
Given an undirected, connected, weighted tree with `n` nodes (nodes are 1-indexed), you are to support two types of queries:
- **Type 1:** Change the weight of a specific edge between nodes `u` and `v` to a new value `w`.
- **Type 2:** Report the length of the shortest path from the root node (1) to a given node `x`.

Each query must be handled efficiently, especially accounting for multiple dynamic edge weight changes.

### Examples  

**Example 1:**  
Input:  
n = 3, edges = [[1,2,2],[2,3,3]], queries = [[2,3],[1,2,3,1],[2,3]]  
Output:  
`5,4`  
*Explanation:  
- Initial tree: 1 —2→ 2 —3→ 3.  
- Query 1: Shortest path from 1→3 is 2 + 3 = 5.  
- Query 2: Update edge (2,3) weight to 1. Tree now: 1 —2→ 2 —1→ 3.  
- Query 3: Shortest path from 1→3 is 2 + 1 = 3.*

**Example 2:**  
Input:  
n = 2, edges = [[1,2,10]], queries = [[2,2],[1,1,2,3],[2,2]]  
Output:  
`10,3`  
*Explanation:  
- Initial: 1 —10→ 2  
- Query 1: Path to 2 is 10.  
- Query 2: Change edge (1,2) weight to 3.  
- Query 3: Path to 2 is 3.*

**Example 3:**  
Input:  
n = 5, edges = [[1,2,1],[1,3,2],[2,4,10],[3,5,5]], queries = [[2,4],[1,2,4,1],[2,4],[1,3,5,4],[2,5]]  
Output:  
`11,2,6`  
*Explanation:  
- Path to 4: 1 → 2 (1) → 4 (10) = 11.  
- Update edge (2,4) to 1.  
- Path to 4: 1 → 2 (1) → 4 (1) = 2.  
- Update edge (3,5) to 4.  
- Path to 5: 1 → 3 (2) → 5 (4) = 6.*

### Thought Process (as if you’re the interviewee)  
Start by realizing that a tree has exactly n-1 edges and only one path between any two nodes. Brute-force recalculation for each query is too slow if q is large or there are many updates.  
- **Brute force:** For each path query, run DFS or BFS to compute the path from 1 to x. For each update, change the weight in the representation. This is O(n) per query.
- **Optimization:** Since the tree never changes shape, only edge weights, we can preprocess parent/child and subtree information:
    - Precompute initial distances from root (1) to every node (using DFS).
    - For an edge weight update, only paths through that edge (i.e., the entire subtree of the child node) are affected.
    - To efficiently handle range updates and queries, flatten the tree using Euler Tour or DFS-in/out times, then use a segment tree or Binary Indexed Tree (Fenwick tree) for range add and point query.
    - Updates become O(log n); queries also O(log n).

This is a classic "tree range update and point query" after flattening.

### Corner cases to consider  
- Single node, no edges (n=1).
- Query to update a non-existing edge (should not occur by problem description).
- Repeated edge weight updates on the same edge.
- Very deep or very unbalanced trees (long chains).
- Large number of queries.

### Solution

```python
# n: number of nodes.
# edges: List of [u, v, w]
# queries: List of [type, ...]
# Returns: List of results for each type 2 query.

def shortestPathInWeightedTree(n, edges, queries):
    # Build adjacency list and edge map
    from collections import defaultdict

    adj = defaultdict(list)
    edge_id = {}  # key: (min(u,v), max(u,v)) → idx in weights

    weights = {}
    for idx, (u, v, w) in enumerate(edges):
        adj[u].append((v, w))
        adj[v].append((u, w))
        weights[(min(u, v), max(u, v))] = w

    # DFS to assign in, out times and build parent, initial distance arrays
    in_time = [0] * (n+1)
    out_time = [0] * (n+1)
    dist = [0] * (n+1)
    parent = [0] * (n+1)
    flat = []
    t = [0]

    def dfs(u, p, d):
        in_time[u] = t[0]
        flat.append(u)
        dist[u] = d
        parent[u] = p
        t[0] += 1
        for v, w in adj[u]:
            if v != p:
                dfs(v, u, d + w)
        out_time[u] = t[0]

    dfs(1, 0, 0)
    
    # Binary Indexed Tree (Fenwick tree) for range add, point sum
    class Fenwick:
        def __init__(self, size):
            self.N = size + 2
            self.ft = [0] * (self.N)
        def update(self, l, r, val):
            self._add(l, val)
            self._add(r, -val)
        def _add(self, idx, val):
            idx += 1
            while idx < self.N:
                self.ft[idx] += val
                idx += idx & -idx
        def query(self, idx):
            idx += 1
            res = 0
            while idx > 0:
                res += self.ft[idx]
                idx -= idx & -idx
            return res

    bit = Fenwick(n+2)
    res = []

    # Map edges to child node
    edge_to_child = {}
    for u, v, w in edges:
        if parent[v] == u:
            edge_to_child[(min(u, v), max(u, v))] = v
        else:
            edge_to_child[(min(u, v), max(u, v))] = u

    for q in queries:
        if q[0] == 1:
            _, u, v, w = q
            key = (min(u,v), max(u,v))
            ch = edge_to_child[key]  # child node (subtree root)
            old = weights[key]
            diff = w - old
            weights[key] = w
            # Update subtree distances
            bit.update(in_time[ch], out_time[ch], diff)
        else:
            _, x = q
            result = dist[x] + bit.query(in_time[x])
            res.append(result)

    return res

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing (DFS): O(n)  
  - Each query: O(log n) for both update (range add) and path sum (point query) using Fenwick.
  - Overall: O(n + q log n)

- **Space Complexity:**
  - O(n) for storing tree, flattening, Fenwick tree, and auxiliary arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you support edge addition or deletion?
  *Hint: Now the tree changes, and you can't flatten once; consider dynamic trees like Link-Cut Tree.*

- How would you answer queries about the shortest path between any two nodes (not just from root)?
  *Hint: Precompute LCA, path sum formulas; more complex if edge weights are updated dynamically.*

- How would you support batch updates efficiently?
  *Hint: Analyze if lazy propagation or block decomposition helps for multiple updates.*

### Summary
This problem uses the "Euler Tour" or "Flatten the tree" pattern with a Fenwick/Segment Tree to perform range updates and point queries efficiently on trees. This is common in problems involving "subtree updates/queries" and path calculations, especially in competitive programming and advanced data structure scenarios. This approach can be applied in other scenarios requiring efficient batch updates or point queries on trees, such as subtree value addition, subtree min/max queries, or path sum after edge updates.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
