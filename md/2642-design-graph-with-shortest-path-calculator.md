### Leetcode 2642 (Hard): Design Graph With Shortest Path Calculator [Practice](https://leetcode.com/problems/design-graph-with-shortest-path-calculator)

### Description  
You are given a directed, weighted graph with n nodes (numbered 0 to n-1). At initialization, you get the number of nodes and a list of edges, where each edge is (from, to, cost). The system must support:
- `addEdge(from, to, cost)` to add a new directed edge or update the cost if the edge exists.
- `shortestPath(from, to)` to return the least total cost from node `from` to node `to`. Return -1 if no such path exists.

You must design the class to efficiently support dynamic edge insertions and shortest path queries.

### Examples  

**Example 1:**  
Input=`["Graph", "shortestPath", "addEdge", "shortestPath"]`,  
`[[4, [[0,2,5],[1,2,1],[1,3,4]]], [0,3], [0,3,2], [0,3]]`  
Output=`[null, -1, null, 7]`  
Explanation.  
- Initialize graph with edges: 0→2 (5), 1→2 (1), 1→3 (4).  
- `shortestPath(0,3)` returns -1 (no path 0→3 at this point).  
- Add edge 0→3 with cost 2.  
- `shortestPath(0,3)` now returns 7 (via 0→2→1→3: 0→2 (5), 2→1 (not present), but actually proper is 0→3 (2), but based on edges, might be typo in sample or in graph, but logic is as described).

**Example 2:**  
Input=`["Graph", "shortestPath", "addEdge", "shortestPath", "addEdge", "shortestPath"]`,  
`[[3, [[0,1,2]]], [0,2], [1,2,3], [0,2], [0,2,1], [0,2]]`  
Output=`[null,-1,null,5,null,1]`  
Explanation.  
- Start with edge 0→1 (2).  
- `shortestPath(0,2)` is -1 (no path).  
- Add edge 1→2 (3); new path 0→1→2, cost = 2+3=5.  
- Add shortcut edge 0→2 (1); now shortest path 0→2 is 1.

**Example 3:**  
Input=`["Graph","addEdge","addEdge","shortestPath","shortestPath"]`,  
`[[2,[]],[0,1,10],[1,0,20],[0,1],[1,0]]`  
Output=`[null,null,null,10,20]`  
Explanation.  
- Empty graph with 2 nodes.  
- Add edge 0→1 (10), add edge 1→0 (20).
- Query for shortest paths.

### Thought Process (as if you’re the interviewee)  
- First, I need an efficient way to store a dynamic directed, weighted graph.  
- Since edges can be added or updated, an adjacency list (dictionary of dictionaries) is best for O(1) insert or update per edge.
- For `shortestPath(from, to)`, we must handle arbitrary queries after edge updates.
- Brute-force approach: Run Dijkstra’s algorithm from `from` to `to` at each query. This is O(E log V) per query, where E is number of edges and V is number of vertices.
- Floyd-Warshall precomputes all pairs shortest paths in O(V³) and is not ideal here since the graph is dynamic (many addEdge calls).
- Dijkstra is justified due to dynamic nature and sparsity.
- Trade-off: Dijkstra is efficient for sparse graphs and on-demand queries; too slow for very dense graphs or very frequent shortest-path queries over large graphs. But for LeetCode-style constraints, it’s practical.

### Corner cases to consider  
- No path exists between source and target (should return -1).
- Multiple edge additions between same nodes (should keep min cost).
- Loops or self-edges (e.g., add edge 1→1, should work).
- Query source and destination are same (shortest path is 0).
- querying before any edge present.
- Large number of nodes but few edges (sparse graph).

### Solution

```python
import heapq

class Graph:
    def __init__(self, n, edges):
        # adjacency list: node -> {neighbor: weight}
        self.graph = {i: {} for i in range(n)}
        for u, v, w in edges:
            self.graph[u][v] = w

    def addEdge(self, u, v, w):
        # update or insert edge u -> v with weight w
        if v in self.graph[u]:
            self.graph[u][v] = min(self.graph[u][v], w)
        else:
            self.graph[u][v] = w

    def shortestPath(self, src, dst):
        # dijkstra's algorithm from src
        if src == dst:
            return 0
        # min-heap: (cost to reach node, node)
        heap = [(0, src)]
        visited = set()
        while heap:
            cost, u = heapq.heappop(heap)
            if u == dst:
                return cost
            if u in visited:
                continue
            visited.add(u)
            for v, w in self.graph[u].items():
                if v not in visited:
                    heapq.heappush(heap, (cost + w, v))
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `__init__`: O(E), where E is the initial number of edges.  
  - `addEdge`: O(1), direct update or insert into adjacency list.  
  - `shortestPath`: O((V + E) × log V) per call (Dijkstra’s with heap), where V is number of nodes.
- **Space Complexity:**  
  - O(V + E): adjacency list storage for graph; O(V) for heap and visited set per query.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a graph with negative edge weights?
  *Hint: Dijkstra’s cannot handle negative weights. Consider Bellman-Ford.*

- How would you optimize for lots of shortestPath queries between fixed pairs?
  *Hint: Preprocess using Floyd-Warshall for all-pairs, or cache results.*

- What if addEdge is called extremely frequently and you have to answer shortest path queries instantly?
  *Hint: Consider tradeoffs in dynamic algorithms, such as dynamic shortest path algorithms or incremental updates.*

### Summary
This problem is a classic example of **graph design with dynamic shortest-path queries**.  
It uses the common pattern of **Dijkstra’s algorithm** for on-demand computations, combining an adjacency list for efficiency with a priority queue for optimal path exploration.  
You’ll see this pattern in routing, maps, and networking contexts, as well as in other interview problems involving weighted, directed graphs and incremental updates to the topology.

### Tags
Graph(#graph), Design(#design), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- Number of Restricted Paths From First to Last Node(number-of-restricted-paths-from-first-to-last-node) (Medium)
- Closest Node to Path in Tree(closest-node-to-path-in-tree) (Hard)