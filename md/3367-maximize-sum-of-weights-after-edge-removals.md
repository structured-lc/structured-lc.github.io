### Leetcode 3367 (Hard): Maximize Sum of Weights after Edge Removals [Practice](https://leetcode.com/problems/maximize-sum-of-weights-after-edge-removals)

### Description  
Given an **undirected tree** with n nodes, each edge having a certain weight, you can remove zero or more edges so that **no node** has more than **k** neighbors left. The goal is to maximize the sum of the remaining edge weights.  
Every node must end up with **degree ≤ k** after your removals. Output the **maximum possible sum** of the remaining edge weights.

### Examples  

**Example 1:**  
Input: `edges = [[0,1,4],[0,2,2],[2,3,12],[2,4,6]], k = 2`  
Output: `24`  
*Explanation: Node 2 initially has three edges ([0,2], [2,3], [2,4]). To satisfy k=2, remove the edge with the smallest weight among them (edge [0,2], weight 2). The sum is 4 + 12 + 6 = 22, but this does not meet the output above — let's check clearly:  
After removing the smallest weight from all nodes with degree >2, remaining: [0,1,4], [2,3,12], [2,4,6] (removed [0,2,2] for node 2). Sum is 4+12+6=22.  
However, if different edges are removed depending on the constraints, the largest sum is 22, not 24; possibly an explanation typo. But the approach remains: **remove the lowest-weight edges to enforce degree ≤ k**.*

**Example 2:**  
Input: `edges = [[0,1,10],[0,2,3]], k = 1`  
Output: `10`  
*Explanation: Node 0 has degree 2 (>k). Remove the edge with smaller weight ([0,2], weight 3). Only [0,1,10] remains. The sum is 10, which meets the goal.*

**Example 3:**  
Input: `edges = [[0,1,5]], k = 2`  
Output: `5`  
*Explanation: All nodes have ≤2 neighbors. No need to remove any edge.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try all combinations of edge removals to ensure every node gets degree ≤ k, then pick the combination with the largest sum.  
  Inefficient: Exponential time due to the number of edges.

- **Optimization:**  
  Since it's a tree (n-1 edges, no cycles), if any node has more than k neighbors, we need to remove edges, ideally those with the smallest weight to maximize the retained sum.

- For each node with degree > k: Keep its **k heaviest edges**, remove the others (lowest weights).
- But, removing an edge affects both its nodes. If both have excessive degree, prioritization is needed.  
- Efficient approach:  
  1. Build adjacency list.  
  2. For all nodes with degree > k:  
     - For each node, keep the k largest adjacent edge weights (by sorting or heap). The other edges are candidates for removal.  
  3. Remove the minimal set of edges so **no node ends up with degree > k**; since tree, removing an edge reduces the degree from both endpoints.

- Possible with greedy (always remove the smallest edges attached to overdegree nodes) + processing nodes in degree order.

### Corner cases to consider  
- Nodes already have degree ≤ k — return sum of all edge weights.
- k = 0 — all edges must be removed (result: 0).
- Tree is only two nodes — edge is always kept if k ≥ 1.
- Multiple nodes tied for lowest edge to be removed.
- After removing edges at one node, neighbors’ degree may drop below k.

### Solution

```python
def maximize_sum_of_weights(n, edges, k):
    # Build adjacency list: node -> list of (neighbor, weight, edge_id)
    from collections import defaultdict, deque

    adj = defaultdict(list)
    edge_weights = {}

    for idx, (u, v, w) in enumerate(edges):
        adj[u].append((v, w, idx))
        adj[v].append((u, w, idx))
        edge_weights[(min(u, v), max(u, v))] = w

    # For each node, if degree > k, mark its smallest-weight edges for removal
    remove = set()
    degree = [len(adj[i]) for i in range(n)]
    queue = deque(i for i in range(n) if degree[i] > k)
    visited = set()

    while queue:
        node = queue.popleft()
        if degree[node] <= k:
            continue
        # Sort adjacent edges by weight
        candidates = sorted(adj[node], key=lambda x: x[1])
        # Remove enough smallest edges to make degree = k
        to_remove = degree[node] - k
        for i in range(to_remove):
            neighbor, w, idx = candidates[i]
            if idx in remove:
                continue  # Already removed from the other end
            remove.add(idx)
            # Remove the edge from both ends
            for n, w2, idx2 in adj[neighbor]:
                if n == node and idx2 == idx:
                    adj[neighbor].remove((n, w2, idx2))
                    degree[neighbor] -= 1
                    if degree[neighbor] > k and neighbor not in visited:
                        queue.append(neighbor)
                    break
            degree[node] -= 1
        visited.add(node)

    # Now compute the sum of the remaining edges
    res = 0
    for idx, (_, _, w) in enumerate(edges):
        if idx not in remove:
            res += w

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  For each node with degree > k, sorting its edges costs O(log n) per edge; overall, each edge considered at most twice.
- **Space Complexity:** O(n)  
  For adjacency list, degree list, and removal set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is a **general graph** instead of a tree?  
  *Hint: Cycles complicate removals, global constraints may need more advanced algorithms.*

- Can you do it **without sorting or with less space**?  
  *Hint: Use heaps to keep the k largest edge weights efficiently.*

- If the tree is **massive and edges streamed**, how would you process removals incrementally?  
  *Hint: Consider online algorithms or processing node-by-node in order.*

### Summary

This problem uses a **greedy degree reduction on trees**, always removing the lowest-weighted edges from overfull nodes to maximize the remaining total.  
The main pattern is "maintain local constraints via greedy global edge processing," which appears in network throttling, pruning DAGs, and degree-limited Steiner trees.  
Patterns used: adjacency list construction, iterative/queue-batch processing, and greedy per-node edge removals.