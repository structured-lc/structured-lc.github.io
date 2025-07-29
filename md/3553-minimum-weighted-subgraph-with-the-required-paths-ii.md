### Leetcode 3553 (Hard): Minimum Weighted Subgraph With the Required Paths II [Practice](https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths-ii)

### Description  
Given an undirected tree with n nodes (labeled 0 to n-1), each edge has an integer weight. You are given three distinct nodes: src1, src2, and dest. Your task is to find the minimum total weight of a **connected subgraph** that contains all three required nodes, i.e., a tree containing src1, src2, dest, and any other necessary nodes. In other words, determine the smallest total weight among all subtrees of the input tree such that the subtree contains src1, src2, and dest.

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[0,1,2],[1,2,3],[1,3,2],[3,4,4]], src1 = 0, src2 = 2, dest = 4`  
Output: `11`  
*Explanation: The minimal subtree contains nodes 0-1-2-3-4 using edges (0-1, 1-2, 1-3, 3-4), total weight = 2+3+2+4 = 11. All three required nodes are included.*

**Example 2:**  
Input: `n = 6, edges = [[0,1,1],[1,2,1],[1,3,2],[3,4,1],[3,5,2]], src1 = 2, src2 = 4, dest = 5`  
Output: `6`  
*Explanation: The minimal subtree is 2-1-3-4-5, using edges (1-2, 1-3, 3-4, 3-5), total weight = 1+2+1+2 = 6.*

**Example 3:**  
Input: `n = 4, edges = [[0,1,10],[1,2,10],[1,3,1]], src1 = 0, src2 = 2, dest = 3`  
Output: `21`  
*Explanation: The minimal subtree must include 0-1-2-3 (edges 0-1, 1-2, 1-3), total = 10+10+1 = 21.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Since the input is a tree, there is a unique path between any pair of nodes (no cycles). Thus, the minimal subtree containing src1, src2, dest is exactly the union of the paths:  
    - src1 ↔ src2  
    - src1 ↔ dest  
    - src2 ↔ dest  
  However, taking the union of all three paths may double-count some edges.  

- **Optimization:**  
  - Observing the unique path property of trees, the problem reduces to finding the **minimal subtree** containing all three nodes. In tree theory, this is the union of the individual pairwise paths, which in turn is the path from src1 to LCA, src2 to LCA, dest to LCA, for the **lowest common ancestor (LCA)** of src1, src2, dest.
  - So, the optimal solution is to:  
    1. Compute the sum of weights along the paths from `src1` to each node, `src2` to each node, and `dest` to each node (DFS from root to get subtree sums and depth).
    2. For every node u, compute the **total weight of the subtree** spanning all three using:  
       - weight(src1, u) + weight(src2, u) + weight(dest, u) - 2 × weight(root, u)  
       (where weight(x, y) is the path sum from x to y, which can be computed with LCA.)
    3. Minimize over all possible LCAs u.

  - To implement efficiently:
    - Preprocess parent & depth for every node (DFS).
    - For LCA, use Binary Lifting for O(log n) queries.
    - For each query, try each possible LCA; or directly compute with the formulas using previously computed parent/depth/path sums.

  - **Why optimal:**  
    - Because the minimal subtree connecting any three nodes in a tree is the union of the paths, and its total weight can be determined via the root-to-node sums and LCA.

### Corner cases to consider  
- n = 3, tree is a straight path, required nodes are all different.
- One node is the ancestor of the others.
- The three required nodes are nearby or identical (though problem says distinct).
- Deep or large trees: test performance with n up to 1e5.
- All edge weights are equal or have large values.
- Disconnected node inputs (invalid, should never happen in a tree).
- Long, linear chain vs. star-shaped tree.

### Solution

```python
def minimum_weighted_subgraph(n, edges, src1, src2, dest):
    # Build adjacency list
    tree = [[] for _ in range(n)]
    for u, v, w in edges:
        tree[u].append((v, w))
        tree[v].append((u, w))
    
    LOGN = 17  # since n ≤ 1e5, log2(1e5) < 17
    parent = [[-1]*n for _ in range(LOGN)]  # parent[k][v]: 2^k-th ancestor of v
    depth = [0]*n
    sum_to_root = [0]*n
    
    def dfs(u, p):
        for v, w in tree[u]:
            if v == p:
                continue
            parent[0][v] = u
            depth[v] = depth[u] + 1
            sum_to_root[v] = sum_to_root[u] + w
            dfs(v, u)
    
    # Preprocessing: root at any node, say 0
    dfs(0, -1)
    for k in range(1, LOGN):
        for v in range(n):
            if parent[k-1][v] != -1:
                parent[k][v] = parent[k-1][parent[k-1][v]]
    
    def lca(u, v):
        # Make u deeper than v
        if depth[u] < depth[v]:
            u, v = v, u
        for k in reversed(range(LOGN)):
            if parent[k][u] != -1 and depth[parent[k][u]] >= depth[v]:
                u = parent[k][u]
        if u == v:
            return u
        for k in reversed(range(LOGN)):
            if parent[k][u] != -1 and parent[k][u] != parent[k][v]:
                u = parent[k][u]
                v = parent[k][v]
        return parent[0][u]
    
    def dist(u, v):
        # Distance between u and v is sum_to_root[u] + sum_to_root[v] - 2 * sum_to_root[lca(u, v)]
        L = lca(u, v)
        return sum_to_root[u] + sum_to_root[v] - 2 * sum_to_root[L]
    
    min_sum = float('inf')
    for u in range(n):
        cur = (dist(u, src1) + dist(u, src2) + dist(u, dest)) // 2
        min_sum = min(min_sum, cur)
    return min_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building tree: O(n)  
  - Preprocessing parent/depth arrays: O(n log n)  
  - For each node, calculating the sum involves three LCA queries (each O(log n)), for n nodes: O(n log n)  
  - **Overall:** O(n log n)

- **Space Complexity:**  
  - Tree structure: O(n)  
  - Parent table: O(n log n)  
  - Depth and sum-to-root arrays: O(n)  
  - **Overall:** O(n log n) (dominated by the parent sparse table for LCA queries)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is not a tree but just any undirected graph?
  *Hint: The shortest subtree becomes the Steiner Tree, an NP-hard problem. Would need approximation or DP over subsets.*

- How would you efficiently handle multiple queries (many sets of required nodes) on the same tree?
  *Hint: Optimize LCA and preprocess path sums for O(log n) query. Batch process to avoid recomputation.*

- What if you allow edge updates or weight changes between queries?
  *Hint: Consider heavy-light decomposition, or dynamic LCA and path-sum structures (segment tree, etc).*

### Summary
This problem is a classic example of **LCA and path sum** queries in a tree. The coding pattern relies heavily on **Binary Lifting** for LCA and **DFS** for preprocessing. The technique here applies anywhere you need minimal subtrees containing arbitrary nodes in a tree, e.g., in network design, subtree queries, and some dynamic programming on trees. It leverages unique paths in a tree and LCA to minimize overlap in included edges, a frequent need for combinatorial optimization on tree graphs.