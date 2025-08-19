### Leetcode 1971 (Easy): Find if Path Exists in Graph [Practice](https://leetcode.com/problems/find-if-path-exists-in-graph)

### Description  
Given an undirected graph with `n` nodes numbered from `0` to `n-1` and a list of edges, determine if there is **any valid path** between a given `source` node and a `destination` node.  
Each edge `[u, v]` means there's a two-way connection between `u` and `v`.  
**Return** `True` if it is possible to travel from the source to the destination, moving through the edges as many times as needed, otherwise return `False`.  
There are no self-loops or duplicate edges.

### Examples  

**Example 1:**  
Input: `n=3, edges=[[0,1],[1,2],[2,0]], source=0, destination=2`  
Output: `True`  
*Explanation: You can go from 0→1→2 or 0→2 directly, so a path exists.*

**Example 2:**  
Input: `n=6, edges=[[0,1],[0,2],[3,5],[5,4],[4,3]], source=0, destination=5`  
Output: `False`  
*Explanation: The graph is split into two components. Nodes 0,1,2 are connected; nodes 3,4,5 are connected. There is no path from 0 to 5.*

**Example 3:**  
Input: `n=2, edges=[], source=0, destination=1`  
Output: `False`  
*Explanation: There are two nodes and no edges, so no path connects 0 to 1.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible paths from `source` to `destination` using DFS or BFS. For each node, visit its neighbors recursively/iteratively and see if we eventually reach `destination`.  
- **Optimization:** Avoid re-visiting nodes by keeping a `visited` set.  
- **Trade-offs:**  
  - DFS is easy for recursion, but risks stack overflow for large graphs.
  - BFS uses an explicit queue and finds the shortest path, though we only care about *existence*.
- **Alternative approach:** As this is undirected, we can also use Union-Find (Disjoint Set Union) to quickly determine if two nodes are in the same connected component after building sets from all edges (major performance benefit for multiple queries or large graphs).  
- For a single query, BFS/DFS and Union-Find are both efficient.

For this problem, I’ll use **BFS** for clarity and simplicity.


### Corner cases to consider  
- Graph has **no edges** (disconnected nodes).
- **Source equals destination** (trivially True).
- Nodes are part of **different connected components**.
- **Self-loops** are not possible by problem constraints.
- **Empty graph** (`n=0`).
- **Large graphs** with many nodes but few edges.


### Solution

```python
def validPath(n, edges, source, destination):
    # Build adjacency list for undirected graph
    from collections import defaultdict, deque

    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # Early exit if source == destination
    if source == destination:
        return True

    visited = set()
    queue = deque([source])

    while queue:
        node = queue.popleft()
        if node == destination:
            return True
        if node in visited:
            continue
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                queue.append(neighbor)

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = number of nodes and m = number of edges.  
  - Each node is visited at most once; each edge is traversed twice.
- **Space Complexity:** O(n + m) for the adjacency list, visited set, and queue.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to answer *multiple* queries for different source/destination pairs efficiently?  
  *Hint: Consider building the union-find (disjoint set) structure once, then answering each query in nearly O(1) time.*

- What if the edges are added or removed dynamically?  
  *Hint: Think about how to update connected components efficiently. DSU with union by rank and path compression can help.*

- How would you handle a graph with *millions* of nodes but very few edges?  
  *Hint: Sparse adjacency lists, and watch your space complexity in BFS/DFS.*


### Summary
This problem is a classic **graph traversal** question, falling under the *path-existence* or *connected components* category. Common patterns used here are **BFS**, **DFS**, or **Union-Find** for fast connectivity checks.  
This pattern is directly applicable to tasks such as checking network connectivity, determining if two people are connected in a social network, or ensuring communication in distributed systems.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Valid Arrangement of Pairs(valid-arrangement-of-pairs) (Hard)
- Paths in Maze That Lead to Same Room(paths-in-maze-that-lead-to-same-room) (Medium)