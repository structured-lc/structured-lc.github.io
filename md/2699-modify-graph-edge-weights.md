### Leetcode 2699 (Hard): Modify Graph Edge Weights [Practice](https://leetcode.com/problems/modify-graph-edge-weights)

### Description  
Given an **undirected**, **connected**, weighted graph with `n` nodes (`0...n-1`) and edges `edges` where each edge is `[u, v, w]`:
- Some edges have unknown weights (`w = -1`). The task is to replace all `-1` weights with **positive integers** between 1 and 2 × 10⁹, so that:
    - The **shortest path distance** from node `source` to node `destination` is **exactly equal** to a given `target` value.
    - If possible, modify the `-1` edges and return the full edge list (with modifications).
    - If impossible, return an empty array.
- Edges with positive non-`-1` weights **cannot** be modified.

### Examples  

**Example 1:**  
Input:  
`n=5`,  
`edges=[[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]]`,  
`source=0`,  
`destination=1`,  
`target=5`  
Output:  
`[[4,1,1],[2,0,1],[0,3,3],[4,3,1]]`  
*Explanation: Assign weights of 1, 1, 3, 1 to the `-1` edges so that the shortest path from 0 to 1 is 5.*

**Example 2:**  
Input:  
`n=3`,  
`edges=[[0,1,-1],[0,2,5]]`,  
`source=0`,  
`destination=2`,  
`target=6`  
Output:  
`[]`  
*Explanation: It’s impossible to assign a positive integer to edge [0,1,-1] such that the shortest path from 0 to 2 is 6.*

**Example 3:**  
Input:  
`n=4`,  
`edges=[[1,0,4],[1,2,3],[2,3,5],[0,3,-1]]`,  
`source=0`,  
`destination=2`,  
`target=6`  
Output:  
`[[1,0,4],[1,2,3],[2,3,5],[0,3,1]]`  
*Explanation: Assign 1 to [0,3,-1], yielding the desired path 0-3-2 of length 1+5=6.*

### Thought Process (as if you’re the interviewee)  

First, I’d clarify the requirements:
- Edges with weight `-1` must be replaced with **positive integers**.
- Only those edges can be changed; all others are fixed.
- The **shortest path length** from `source` to `destination` after these assignments must match `target`.

#### Brute-force:
Try all possible assignments to each `-1` edge. This is obviously infeasible since each can take up to 2 × 10⁹ values.

#### Observations:
- The path from `source` to `destination` will be determined by how we assign weights to the `-1` edges.
- We can use **Dijkstra’s algorithm** to compute shortest paths if all edges are non-negative.
- If we treat all `-1` weights as `1`, we get the **smallest possible shortest path**.
- If we treat all `-1` as a large value, we get the **largest possible shortest path**.  
  This allows us to tell if the target is even **possible**:
  - If `min_possible > target` or `max_possible < target`, return an empty array.

#### Approach:
1. **First Dijkstra:** Set all `-1` weights to 1, compute shortest path `min_path`.
    - If `min_path > target`: Impossible!
2. **Second Dijkstra:** Set all `-1` weights to a very large value (to minimize their participation), compute shortest path `max_path`.
    - If `max_path < target`: Impossible!
3. Otherwise, we can adjust the `-1` edges so that the shortest path becomes `target`.
    - For each `-1` edge, greedily try to assign enough weight to one (so the shortest path stretches to `target`), while assigning `1` to the rest.
    - For every iteration in Dijkstra’s, when encountering a `-1` edge, keep track of which ones are used on the shortest path.
    - On the **last used `-1` edge** on the path, assign it a weight that accounts for the **difference** required to reach `target`.

#### Why is this efficient and valid?
- Changing unused edges to a large value avoids new shorter paths.
- Only the set of `-1` edges **on the shortest path** require careful adjustment.

### Corner cases to consider  
- All edges are `-1`.
- There is no feasible way to reach `target` due to fixed positive weights.
- The graph is already at `target` (path already matches).
- Multiple shortest paths of the same length (must ensure adjustment works for at least one path).
- The source equals destination (path length 0).
- Only one edge, and it is `-1`.
- Disconnected edge if we accidentally raise its weight too high.

### Solution

```python
import heapq

def modifyGraphEdges(n, edges, source, destination, target):
    import collections

    # Build adjacency list, remembering edge indices for modification
    adj = collections.defaultdict(list)
    for idx, (u, v, w) in enumerate(edges):
        adj[u].append( (v, w, idx) )
        adj[v].append( (u, w, idx) )

    # Helper to run Dijkstra with custom weights for -1 edges
    def dijkstra(override_weight):
        dist = [float('inf')] * n
        prev = [-1] * n
        how = [None] * n  # (from, edge_idx)
        dist[source] = 0
        heap = [(0, source)]
        while heap:
            curr_d, u = heapq.heappop(heap)
            if curr_d > dist[u]:
                continue
            for v, w, idx in adj[u]:
                if edges[idx][2] == -1:
                    w_used = override_weight if isinstance(override_weight, int) else override_weight(idx, u, v)
                else:
                    w_used = edges[idx][2]
                if w_used < 1:
                    continue
                if dist[v] > dist[u] + w_used:
                    dist[v] = dist[u] + w_used
                    prev[v] = u
                    how[v] = idx
                    heapq.heappush(heap, (dist[v], v))
        return dist, prev, how

    # 1. If min possible > target or max possible < target, impossible
    min_dist, _, _ = dijkstra(1)
    if min_dist[destination] > target:
        return []
    max_dist, _, _ = dijkstra(2_000_000_000)
    if max_dist[destination] < target:
        return []

    # 2. Binary search/Dijkstra to assign weights
    # Start with all -1 edges = 1
    result = [row[:] for row in edges]
    def assign_weight(idx, u, v):
        return weight_assign.get(idx, 1)
    weight_assign = {}
    # Run Dijkstra again, adjusting -1 edges on the path
    curr_dist, prev, how = dijkstra(1)
    diff = target - curr_dist[destination]
    if diff == 0:
        # Path already matches; assign 1 to all -1 edges
        for i in range(len(edges)):
            if edges[i][2] == -1:
                result[i][2] = 1
        return result
    # Backtrack to find the indices of -1 edges on the shortest path
    path = []
    node = destination
    while prev[node] != -1:
        idx = how[node]
        path.append(idx)
        node = prev[node]
    path = path[::-1]  # source to dest
    used = False
    for idx in path:
        if edges[idx][2] == -1:
            # Assign enough weight here
            result[idx][2] = 1 + diff
            weight_assign[idx] = 1 + diff
            used = True
            break
    # For the rest -1 edges, assign 1 or a big value so they don't impact shortest path
    for i in range(len(edges)):
        if edges[i][2] == -1 and i not in weight_assign:
            result[i][2] = 2_000_000_000
    # Validate
    check_dist, _, _ = dijkstra(lambda idx,u,v: result[idx][2])
    if check_dist[destination] != target:
        return []
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Dijkstra’s algorithm: O((n + m) × log n), run at most 3 times.  
  - (n = number of nodes, m = number of edges)
  - Copying arrays, backtracking path: O(n).
  - Overall: O(m log n)
- **Space Complexity:**  
  - Adjacency list: O(m)
  - Extra arrays/dist, prev, how: O(n)
  - Result list: O(m)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the edge weights could also be 0 or negative?
  *Hint: Dijkstra won’t work with negative weights; would need Bellman-Ford.*

- How would you handle the scenario if there are multiple source-destination pairs, each with separate targets?
  *Hint: Would need to adapt search to multi-pair constraints, possibly via linear programming.*

- Can you return all possible solutions, not just one?
  *Hint: Would require path enumeration and systematic assignment of weights, likely exponential in worst case.*

### Summary
This problem combines **shortest path search (Dijkstra)** with **one-shot graph modification** of certain edges for target reachability. The approach is a greedy, carefully validated local adjustment, common in constrained path-reweighting problems. The pattern appears in network routing, constraint-based graph design, and minimum-cost path construction with modifiable elements.


### Flashcard
Run Dijkstra twice: first with all −1 edges set to infinity to check if path > target (impossible case); then binary search or greedily adjust −1 edges to make shortest path exactly target, using Dijkstra after each adjustment.

### Tags
Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
