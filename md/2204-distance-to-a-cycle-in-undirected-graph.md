### Leetcode 2204 (Hard): Distance to a Cycle in Undirected Graph [Practice](https://leetcode.com/problems/distance-to-a-cycle-in-undirected-graph)

### Description  
Given a connected undirected graph with **n** nodes (numbered from 0 to n−1) and **edges**, where the graph contains **exactly one cycle** (all other parts are trees), return an integer array **ans** of size n.  
**ans[i]** is the minimum number of edges from node i to **any node in the cycle**.  
That is, for each node, compute its distance to the nearest node that’s part of the graph’s unique cycle.

### Examples  

**Example 1:**  
Input: `n = 7, edges = [[1,2],[2,3],[3,1],[3,4],[4,5],[5,6]]`  
Output: `[1,0,0,0,1,2,3]`  
Explanation.  
Nodes 1, 2, 3 form the cycle (1-2-3-1).  
Nodes 4, 5, 6 are connected outwards from 3.  
- Nodes 1, 2, 3 are on the cycle, so ans = 0 for each.  
- Node 4 is one step from 3 (cycle) → ans[4] = 1.  
- Node 5 is two steps: 5→4→3 → ans[5]=2.  
- Node 6 is three steps: 6→5→4→3 → ans=3.
- Node 0 not present.

**Example 2:**  
Input: `n = 5, edges = [[0,1],[1,2],[2,3],[3,4],[4,1]]`  
Output: `[2,0,1,1,0]`  
Explanation.  
Nodes 1, 4 form the cycle with nodes 2, 3. Cycle is 1-2-3-4-1.  
- Node 0 is outside: path 0→1 (cycle) → ans=1.  
  Correction: Node 0 is one edge from cycle, but if cycles includes 1,2,3,4, the output should be `[1,0,0,0,0]`.

**Example 3:**  
Input: `n = 3, edges = [[0,1],[1,2],[2,0]]`  
Output: `[0,0,0]`  
Explanation.  
All nodes are part of the only cycle (triangle), so all distances are 0.


### Thought Process (as if you’re the interviewee)  
- The graph is **connected** and contains **exactly one cycle**.
- For each node, find its minimum distance to the cycle.
- **Brute force:** For each node, BFS to find shortest path to any cycle node. Inefficient: O(n²), since each node can require a full traversal.
- **Optimized approach:**
  - First, identify all nodes on the cycle.
    - Remove leaves (nodes of degree 1) repeatedly: those not on the cycle will be gradually stripped away, leaving only the cycle.
  - Second, for each node, find its distance to the nearest cycle node.
    - BFS from all cycle nodes at once; distance for cycle nodes is 0. For each neighbor, record its distance as parent+1.
  - Efficiency: O(n) since each node and edge is visited at most twice.

**Why this works:**  
- Stripping leaves reduces the problem to the cycle.  
- Multi-source BFS is efficient for finding shortest path to any of multiple sources.

### Corner cases to consider  
- All nodes are in the cycle (the graph is a simple cycle/ring).
- Only one node is in the cycle (n=1, edge self-loop), but per constraints, cycles must have ≥3 nodes.
- Long chain connected to a single point in the cycle.
- Nodes not connected (invalid by problem, since graph is connected).
- Disconnected leaves.
- Cycle is at start, end, or middle of the graph.

### Solution

```python
def distanceToCycle(n, edges):
    # Step 1: Build adjacency list
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    # Step 2: Find nodes on the cycle via leaf stripping
    from collections import deque
    
    degree = [len(graph[i]) for i in range(n)]
    queue = deque()
    visited = [False] * n
    for i in range(n):
        if degree[i] == 1:
            queue.append(i)
            visited[i] = True
    
    # BFS to remove all leaves (not cycle nodes)
    while queue:
        node = queue.popleft()
        for nei in graph[node]:
            degree[nei] -= 1
            if not visited[nei] and degree[nei] == 1:
                queue.append(nei)
                visited[nei] = True
    
    # Now, degree[i] > 1 == nodes in cycle (not visited after stripping)
    is_cycle = [not visited[i] for i in range(n)]
    
    # Step 3: Multi-source BFS from cycle nodes to assign distance
    dist = [-1] * n
    queue = deque()
    for i in range(n):
        if is_cycle[i]:
            dist[i] = 0
            queue.append(i)
    
    # BFS outwards
    while queue:
        node = queue.popleft()
        for nei in graph[node]:
            if dist[nei] == -1:
                dist[nei] = dist[node] + 1
                queue.append(nei)
    return dist
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each node is enqueued and processed at most twice (once for leaf stripping, once for BFS).  
  - The number of edges is O(n) since it's a connected graph with one cycle.
- **Space Complexity:** O(n)  
  - Adjacency list: O(n).  
  - Auxiliary arrays for degree, visited, in-cycle, and ans: O(n).  
  - Queue space: O(n) in worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph can contain multiple cycles?
  *Hint: Cycle detection (DFS back-edge marking), careful with disconnected “cycle components”.*

- How to find all nodes on all cycles in a general undirected graph?
  *Hint: Use low-link DFS or union-find to detect all cycles, then BFS as above.*

- How to output the actual shortest path from a node to the cycle, not just the distance?
  *Hint: During BFS, keep ‘parent’ pointers; reconstruct path upon reaching a cycle node.*


### Summary
- The key patterns are **multi-source BFS** and cycle-finding via **iterative leaf stripping (topological-like approach for undirected graphs)**.
- This combination allows efficient O(n) computation of distances to a cycle for each node, and generalizations appear in “shortest distance to special subset”, “cycle detection”, and BFS-based shortest path problems.


### Flashcard
For each node, find its shortest distance to the cycle; first identify cycle nodes by repeatedly removing leaves, then BFS from the cycle to all other nodes.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Paths in Maze That Lead to Same Room(paths-in-maze-that-lead-to-same-room) (Medium)