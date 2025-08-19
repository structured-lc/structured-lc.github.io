### Leetcode 2846 (Hard): Minimum Edge Weight Equilibrium Queries in a Tree [Practice](https://leetcode.com/problems/minimum-edge-weight-equilibrium-queries-in-a-tree)

### Description  
We have an undirected tree with n nodes labeled from 0 to n-1, and each edge has a weight from 1 to 26. You're given the edges of the tree and a list of queries, where each query asks: Given nodes a and b, what is the **minimum number of operations needed to make all the edge weights along the path from a to b equal**?  
An operation lets you change any edge weight on the path to any value. Each query is independent.

### Examples  

**Example 1:**  
Input:  
edges = `[[0,1,1], [1,2,2], [1,3,2], [3,4,1]]`,  
queries = `[[2,4], [0,3], [4,2]]`  
Output: `[1,1,1]`  
*Explanation: Path 2→1→3→4 has edge weights [2,2,1]. We can change the edge [3,4] from 1→2 using 1 operation. Similarly, minimal changes for other queries are 1.*

**Example 2:**  
Input:  
edges = `[[0,1,1],[1,2,1],[2,3,1]]`,  
queries = `[[0,3],[1,2]]`  
Output: `[0,0]`  
*Explanation: All path edges already have the same weights, so 0 operations are required.*

**Example 3:**  
Input:  
edges = `[[0,1,2],[1,2,2],[2,3,3],[3,4,3],[4,5,2]]`,  
queries = `[[0,5],[1,4]]`  
Output: `[3,2]`  
*Explanation: Path 0→1→2→3→4→5 has edge weights [2,2,3,3,2]. Change three of the edges to any value (like 2) → answer is 3. For path 1→2→3→4, weights [2,3,3], need to change 1st to 3 or the others to 2 → 2 ops needed.*

### Thought Process (as if you’re the interviewee)  
Let's clarify:  
- We have queries of the form (a, b). For each, we find the path from a to b and want to minimize the number of edge changes needed so that all its edge weights are equal.  
- Minimal changes = path length – maximum count of any weight on that path (because we can keep the most common weight).

Brute-force:  
- For each query, DFS/BFS to find the path.
- Count weights on path; subtract max count from total.
- But for up to 2×10⁴ queries and n=10⁴, that's too slow.

Optimized approach:  
- Preprocess tree:  
  - DFS from root, record parent, depth, and prefix frequency count of edge weights up to each node.
- For each query:  
  - Find LCA of a and b.
  - Path from a→b = (a→lca) + (b→lca), no double-count of LCA.
  - The edge weights on a→b path can be computed by subtracting prefix frequency arrays.
  - Compute weight frequency on the path, find the most frequent one.
  - Answer = number of edges in the path − highest frequency.

We need:
- LCA support (binary lifting for O(log n) queries)
- For each node, freq[1…26] of edge weights from root.

This approach brings query time to O(26 + log n), which is efficient.

### Corner cases to consider  
- a == b (zero edges in the path, so answer is 0)
- All edges have the same weight (answer always 0)
- Path with all different weights (answer = path length − 1)
- Tree is just 1 or 2 nodes

### Solution

```python
def minOperationsQueries(n, edges, queries):
    # Build adjacency list: u: [(v, weight),...]
    from collections import defaultdict
    adj = defaultdict(list)
    for u, v, w in edges:
        adj[u].append((v, w))
        adj[v].append((u, w))
    
    MAX_LOG = 15  # Since n ≤ 10^4, log2(1e4) ≈ 14
    
    # parent[u][d]: the 2^d-th ancestor of node u
    parent = [[-1]*MAX_LOG for _ in range(n)]
    depth = [0]*n
    # freq_weight[u][w]: # of edges with weight w (1..26) from root to u
    freq_weight = [[0]*27 for _ in range(n)]
    
    def dfs(u, par):
        for v, w in adj[u]:
            if v == par:
                continue
            parent[v][0] = u
            depth[v] = depth[u]+1
            freq_weight[v][:] = freq_weight[u][:]
            freq_weight[v][w] += 1
            dfs(v, u)
    
    dfs(0, -1)
    # binary lifting
    for k in range(1, MAX_LOG):
        for u in range(n):
            if parent[u][k-1] != -1:
                parent[u][k] = parent[parent[u][k-1]][k-1]
                
    def get_lca(u, v):
        if depth[u] < depth[v]:
            u, v = v, u
        # bring u up to depth of v
        for k in range(MAX_LOG-1, -1, -1):
            if parent[u][k] != -1 and depth[parent[u][k]] >= depth[v]:
                u = parent[u][k]
        if u == v:
            return u
        for k in range(MAX_LOG-1, -1, -1):
            if parent[u][k] != -1 and parent[u][k] != parent[v][k]:
                u, v = parent[u][k], parent[v][k]
        return parent[u][0]
    
    res = []
    for a, b in queries:
        lca = get_lca(a, b)
        maxfreq = 0
        num_edges = depth[a] + depth[b] - 2*depth[lca]
        # For each weight, count freq in path
        for w in range(1, 27):
            freq = freq_weight[a][w] + freq_weight[b][w] - 2*freq_weight[lca][w]
            maxfreq = max(maxfreq, freq)
        res.append(num_edges - maxfreq)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing: O(n log n) for DFS + binary lifting table.
  - For each query: O(26 + log n) (LCA query and weight frequencies for 1…26)
  - So, **overall: O(n log n + q(26 + log n))**

- **Space Complexity:**  
  - O(n log n) for parent table, plus O(n) for freq arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if edge weights were not limited to 1–26 but could be any integer?
  *Hint: Frequency tracking becomes less efficient; might need other techniques.*

- Could you do this if queries or tree updates could modify the tree between queries?
  *Hint: Would need persistent data structures or Heavy-Light Decomposition (HLD).*

- What if you needed to support path updates instead of only queries?
  *Hint: Segment trees or HLD with lazy propagation for efficient updates.*

### Summary
This problem uses classic **tree LCA (Lowest Common Ancestor)** and **root-to-node prefix queries** techniques, along with frequency arrays for efficient path queries.  
It's a template for many path query problems on trees (count, max, freq, xor, etc), especially when the query is “path a–b” and preprocessing is allowed.  
Key patterns: **DFS tree preprocessing, binary lifting, prefix sum/freq arrays, LCA query.**

### Tags
Array(#array), Tree(#tree), Graph(#graph), Strongly Connected Component(#strongly-connected-component)

### Similar Problems
- Kth Ancestor of a Tree Node(kth-ancestor-of-a-tree-node) (Hard)
- Minimum Runes to Add to Cast Spell(minimum-runes-to-add-to-cast-spell) (Hard)