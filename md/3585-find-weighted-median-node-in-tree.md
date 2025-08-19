### Leetcode 3585 (Hard): Find Weighted Median Node in Tree [Practice](https://leetcode.com/problems/find-weighted-median-node-in-tree)

### Description  
Given an undirected, connected, weighted tree with n nodes (numbered 0 to n-1, rooted at node 0), and a list of edges (each with weights), you are given several queries.  
Each query is a pair of nodes (u, v). For each query, you must find the **first node x on the path from u to v** such that the sum of edge weights from u to x is **greater than or equal to half** of the total path weight from u to v. This node x is called the **weighted median node** for that query.  
You must return the weighted median node for each query.

### Examples  

**Example 1:**  
Input:  
`n = 4, edges = [[0,1,2],[1,2,4],[1,3,2]], queries = [[2,3]]`  
Output:  
`[1]`  
*Explanation: Path from node 2 to 3 is [2, 1, 3] with edge weights [4, 2]. Total weight = 4 + 2 = 6.  
Half = 3. Path sum from 2 to 1 is 4 (≥3), so node 1 is the median node.*

**Example 2:**  
Input:  
`n = 6, edges = [[0,1,1],[1,2,2],[1,3,2],[2,4,4],[3,5,3]], queries = [[4,5]]`  
Output:  
`[1]`  
*Explanation: Path 4 → 2 → 1 → 3 → 5 has weights [4, 2, 2, 3] = total 11, half = 5.5.  
From 4: →2 (4). Next, →1 (4+2=6≥5.5), so node 1 is the earliest satisfying node.*

**Example 3:**  
Input:  
`n = 3, edges = [[0,1,10],[1,2,10]], queries = [[0,2],[2,0]]`  
Output:  
`[1,1]`  
*Explanation: Both paths 0-1-2 and 2-1-0 have total weight 20, half=10. Going from 0: 0→1 (10≥10), so node 1. From 2: 2→1 (10≥10), so node 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each query:
  - Reconstruct the path from u to v.
  - Calculate weights on the path, keep running sum from u, and return the first node where sum ≥ half of total path weight.
  - But this is O(n) per query with O(qn) total, which is too slow.
- **Optimization:**  
  - Since the tree is unrooted but given rooted at 0, we can use **Binary Lifting** and **Lowest Common Ancestor (LCA)** precomputation.
  - Precompute for each node:
    - Depth, parent at different 2ᶦ jumps, and the cumulative distance from root.
    - For each query (u, v):
      - Compute LCA(u, v).
      - The path [u → ... → LCA(u,v) → ... → v].
      - Calculate total path weight: dist(u) + dist(v) - 2 × dist(LCA).
      - Start from u, walk towards v, and use binary lifting to jump quickly towards the ½ sum.
      - At each jump up, check if the cumulative sum exceeds the required ½ total.
      - The goal is to locate the "turning point" on the path from u towards v, so that the cumulative distance from u just reaches/exceeds half.
  - This reduces the query to O(log n) using binary lifting.
- **Why this works:** Binary lifting plus LCA is the standard way to quickly move up/down in trees and answer path queries efficiently.

### Corner cases to consider  
- Tree with only one node and self-queries.
- Edge cases where u = v (path is empty/single node).
- All weights are equal.
- Heavily skewed trees (star, line).
- Queries requiring starting node as answer.
- Multiple paths with same "median" location.

### Solution

```python
def findWeightedMedian(n, edges, queries):
    # Build tree
    from collections import defaultdict

    tree = defaultdict(list)
    for u, v, w in edges:
        tree[u].append((v, w))
        tree[v].append((u, w))

    LOG = 17  # since n ≤ 1e5, log2(1e5) ≈ 17

    # Binary Lifting tables
    parent = [[-1] * n for _ in range(LOG)]
    depth = [0] * n
    dist = [0] * n  # dist from root 0

    def dfs(u, p):
        for v, w in tree[u]:
            if v != p:
                parent[0][v] = u
                depth[v] = depth[u] + 1
                dist[v] = dist[u] + w
                dfs(v, u)
    dfs(0, -1)

    # Build ancestors
    for k in range(1, LOG):
        for v in range(n):
            if parent[k-1][v] != -1:
                parent[k][v] = parent[k-1][parent[k-1][v]]

    def get_lca(u, v):
        # Ensure depth[u] ≥ depth[v]
        if depth[u] < depth[v]:
            u, v = v, u
        # Bring u up to depth[v]
        for k in reversed(range(LOG)):
            if parent[k][u] != -1 and depth[parent[k][u]] >= depth[v]:
                u = parent[k][u]
        if u == v:
            return u
        # Binary lift together
        for k in reversed(range(LOG)):
            if parent[k][u] != -1 and parent[k][u] != parent[k][v]:
                u = parent[k][u]
                v = parent[k][v]
        return parent[0][u]

    # Function to step up from u towards ancestor 'up', until dist reaches/exceeds S
    def jump_up(u, stop, req_dist):
        for k in reversed(range(LOG)):
            if parent[k][u] != -1 and depth[parent[k][u]] >= depth[stop]:
                # If going up does not exceed required distance
                if dist[u] - dist[parent[k][u]] < req_dist:
                    req_dist -= (dist[u] - dist[parent[k][u]])
                    u = parent[k][u]
        return u

    result = []
    for u, v in queries:
        if u == v:
            result.append(u)
            continue
        lca = get_lca(u, v)
        total = dist[u] + dist[v] - 2 * dist[lca]
        half = (total + 1) // 2 if total % 2 else total // 2
        # Move from u towards v (i.e., towards lca then down to v)
        # Path: u -> ... -> lca -> ... -> v

        # Try on path u -> lca
        cur = u
        cur_dist = 0
        jump = u
        for k in reversed(range(LOG)):
            if parent[k][jump] != -1 and depth[parent[k][jump]] >= depth[lca]:
                up_dist = dist[cur] - dist[parent[k][jump]]
                if cur_dist + up_dist < half:
                    cur_dist += up_dist
                    jump = parent[k][jump]
        if cur_dist + (dist[cur] - dist[parent[0][jump]] if parent[0][jump] != -1 else 0) >= half:
            # go one step up if possible
            result.append(parent[0][jump])
            continue
        # Otherwise, move down from lca towards v
        path = []
        def path_to_child(x, target, prev, acc):
            if x == target:
                return True
            for nei, w in tree[x]:
                if nei != prev:
                    path.append((nei, w))
                    if path_to_child(nei, target, x, acc + w):
                        return True
                    path.pop()
            return False

        # Let's find the path from lca to v while tracking weights
        path.clear()
        path_to_child(lca, v, -1, 0)
        acc = dist[u] - dist[lca]
        idx = 0
        x = lca
        while idx < len(path):
            ni, w = path[idx]
            acc += w
            if acc >= half:
                result.append(ni)
                break
            x = ni
            idx += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing: O(n log n) for binary lifting table and dfs traversal.
  - Each query: O(log n) for LCA and binary jumps; possible O(n) in worst-case path segment, but as the jumps down are small (because we're just seeking the crossing point), typically O(log n).  
  - Total: O(n log n + q log n)

- **Space Complexity:**  
  - O(n log n) for binary lifting tables.
  - O(n) for distance/depth arrays and the adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle edge updates (if weights on the tree change dynamically)?
  *Hint: Augment data structures with dynamic trees (e.g., Link-Cut Trees or Euler Tour Trees).*

- Can you output the exact path (not just the median node) for each query?
  *Hint: Track the actual path using parent pointers or reconstruct using dfs + LCA.*

- How would you handle multiple queries in parallel/multithreaded context?
  *Hint: Preprocessing is shared; queries can be processed independently if thread-safe data structures are used.*

### Summary
This problem uses the **binary lifting** and **lowest common ancestor (LCA)** pattern — a common approach for tree path queries that provides O(log n) query time after O(n log n) preprocessing. This coding pattern is standard for ancestry, jump, and path-related queries in trees and appears in segment path queries, k-th ancestor queries, and similar problems. Efficient traversal using distance accumulation and binary jumps is the key insight.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
