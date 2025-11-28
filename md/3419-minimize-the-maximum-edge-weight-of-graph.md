### Leetcode 3419 (Medium): Minimize the Maximum Edge Weight of Graph [Practice](https://leetcode.com/problems/minimize-the-maximum-edge-weight-of-graph)

### Description  
Given a **directed, weighted graph** of n nodes (labeled from 0 to n-1) and a list of edges (from, to, weight), you can **remove any subset of edges**. You must ensure that **every node can reach node 0** and that **no node has more than 'threshold' outgoing edges**.  
Your goal is to remove edges so that these two properties hold, and the **maximum edge weight** remaining in the graph is minimized. If it's impossible, return -1.

### Examples  

**Example 1:**  
Input:  
n = 4, threshold = 2,  
edges = [[0,1,3], [1,2,4], [2,3,5], [3,0,10]]  
Output:  
`5`  
*Explanation: Remove the edge [3,0,10] (weight 10). Now the reachable max weight is 5 (from edge [2,3,5]), and the properties still hold. This is the minimum possible.*

**Example 2:**  
Input:  
n = 3, threshold = 1,  
edges = [[0,1,1], [1,0,2], [1,2,3], [2,1,1000]]  
Output:  
`3`  
*Explanation: Remove [2,1,1000] and [1,0,2]. The only max outgoing edges per node is 1. Node 0 is reachable from all.*

**Example 3:**  
Input:  
n = 2, threshold = 0,  
edges = [[1,0,2]]  
Output:  
`2`  
*Explanation: Only one edge, which must stay. Out-degree is 0 everywhere except node 1 directly to 0. This is valid.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try every subset of edges: too slow (2ᵐ subsets).
- **Key Observations**:  
  - Lower max edge weight → possibly stricter and harder to connect all nodes.
  - Must check:  
    - Each node (except 0) has a path to 0  
    - No node has more than 'threshold' outgoing edges
- **Binary Search on Answer:**  
  - Since lower max edge weight is better, binary search the minimum possible max edge weight W:
    - For mid = some weight, keep only edges with weight ≤ mid, then:
      - *For every node*, is there a directed path to 0?
      - Does any node exceed the threshold of outgoing edges?
    - If yes, try a smaller mid. If no, try a bigger mid.
- **Connectivity Direction:**  
  - Since we need reachability from each node to 0, perform reverse BFS/DFS starting from 0.
  - The subgraph should be such that all nodes can reach 0 (i.e., 0 is reachable from every node in the reversed graph).

- **Complexity:** Each binary search step is connectivity + threshold check (O(n+m)). Binary search over edge weights (log(max_weight)).  
  - Total: O((n+m) × log(max_weight)).

### Corner cases to consider  
- Empty graph: n = 1, no edges  
- Isolated nodes that cannot reach 0, even with full graph  
- threshold = 0 (all nodes must have 0 outgoing edges)  
- Multiple edges between same nodes  
- Huge edge weights (test against integer overflow)  
- Self loops

### Solution

```python
def min_max_edge_weight(n, edges, threshold):
    # Helper: for a maxWeight, is it possible to pick edges <= maxWeight
    # so that (1) each node can reach 0 and (2) ≤ threshold out-degree per node?

    from collections import defaultdict, deque

    def is_possible(max_w):
        # Build graph only with edges <= max_w
        out_deg = [0] * n
        graph = defaultdict(list)
        rev_graph = defaultdict(list)  # For reverse reachability check

        for u, v, w in edges:
            if w <= max_w:
                graph[u].append(v)
                rev_graph[v].append(u)
                out_deg[u] += 1

        # Check out-degree constraint
        for deg in out_deg:
            if deg > threshold:
                return False

        # Check if all nodes can reach node 0 in reversed graph (i.e., 0 can reach all nodes)
        visited = [False] * n
        queue = deque([0])
        visited[0] = True
        count = 1

        while queue:
            node = queue.popleft()
            for neighbor in rev_graph[node]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    queue.append(neighbor)
                    count += 1

        return count == n

    # Binary search on possible max edge weights
    unique_weights = sorted(set(w for _, _, w in edges))
    l, r = 0, len(unique_weights)-1
    ans = -1

    while l <= r:
        mid = (l + r) // 2
        max_w = unique_weights[mid]
        if is_possible(max_w):
            ans = max_w
            r = mid - 1
        else:
            l = mid + 1

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + m) × log(m)),  
  where n is nodes, m is edges.  
  log(m) is for binary search over unique weights (≤ m unique weights).
  
- **Space Complexity:** O(n + m): adjacency lists, degree arrays, and visited set in BFS/DFS.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is **undirected**?  
  *Hint: How does checking “all nodes reach 0” change?*

- What if the **edge removal is costly** (not free)?  
  *Hint: Can you combine weight and removal cost in a joint optimization?*

- How would you handle **multiple sources** for reachability (e.g., all nodes must reach any of several nodes)?  
  *Hint: Multi-target BFS or reverse graph adjustment may help.*

### Summary
This problem uses the **binary search + BFS/DFS validation** template, common for "minimize the maximum... under constraints" style questions. The trick is to search for the minimum feasible max weight, and for each guess, verify the *connectivity* and *degree* conditions by simulating allowed edges and running a linear scan / traversal. This approach appears in various Leetcode problems involving *threshold minimization* on graphs or arrays.


### Flashcard
Binary search on the maximum edge weight; for each candidate weight, keep only edges ≤ that weight and check if all nodes can reach node 0 with degree ≤ threshold.

### Tags
Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Shortest Path(#shortest-path)

### Similar Problems
