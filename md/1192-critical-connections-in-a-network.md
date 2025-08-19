### Leetcode 1192 (Hard): Critical Connections in a Network [Practice](https://leetcode.com/problems/critical-connections-in-a-network)

### Description  
Given an undirected network of **n servers** (labeled 0 to n-1) connected by a list of bidirectional connections, you need to find all **critical connections** in the network. A *critical connection* is any connection that, if removed, will disconnect the network (i.e., some servers will become unreachable from others). These edges are also called *bridges* in graph theory: an edge that does not belong to any cycle.

### Examples  

**Example 1:**  
Input:  
n = 4, connections = `[[0,1],[1,2],[2,0],[1,3]]`  
Output: `[[1,3]]`  
Explanation: Removing edge [1,3] disconnects node 3 from the rest of the network. The network then splits into two components: {0,1,2} and {3}.

**Example 2:**  
Input:  
n = 5, connections = `[[0,1],[1,2],[2,0],[1,3],[3,4]]`  
Output: `[[1,3],[3,4]]`  
Explanation: Removing [1,3] or [3,4] increases the number of components of the network.

**Example 3:**  
Input:  
n = 3, connections = `[[0,1],[1,2],[2,0]]`  
Output: `[]`  
Explanation: Every edge is part of a cycle. Removing any one edge still leaves the network connected. So, there are no critical connections.


### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try removing each edge, then run BFS or DFS to check if the graph remains fully connected. Time complexity would be O(E\*(N+E)), where E is the number of edges. This is far too slow for large graphs.

- **Optimized Approach**:  
  This is a classic “find all bridges in a graph” problem. A *bridge* is an edge whose removal increases the number of connected components.

  Tarjan’s Algorithm can efficiently find all bridges in O(N+E) time using DFS traversal.

  - Assign each node two numbers during DFS traversal:
    - Discovery time (the order you visit nodes)
    - Lowest discovery time reachable via back-edges or subtree edges
    
  - If for edge (u,v), `low[v] > disc[u]`, then (u,v) is a bridge.

  Trade-offs: This approach is slightly tricky to code, but much more efficient than brute force.


### Corner cases to consider  
- A single node (n=1), no edges
- Disconnected input (assume per description, initially fully connected)
- Multiple bridges at once
- No bridges (graph is a cycle)
- Duplicate edges (per constraints, edges are unique)


### Solution

```python
def critical_connections(n, connections):
    # Build the adjacency list
    graph = [[] for _ in range(n)]
    for u, v in connections:
        graph[u].append(v)
        graph[v].append(u)

    res = []
    disc = [0] * n         # Discovery times of nodes
    low = [0] * n          # Lowest discovery times
    time = [1]             # Mutable time counter to share across recursion

    def dfs(u, parent):
        disc[u] = low[u] = time[0]
        time[0] += 1
        for v in graph[u]:
            if v == parent:
                continue
            if disc[v] == 0:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                # If v couldn't reach back to u or higher, it's a bridge.
                if low[v] > disc[u]:
                    res.append([u, v])
            else:
                low[u] = min(low[u], disc[v])

    dfs(0, -1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + E), where N is the number of nodes and E is the number of edges. Each node and edge is visited at most once during the DFS traversal.
- **Space Complexity:** O(N + E) for the adjacency list, and O(N) for the disc and low arrays and the recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph could initially be disconnected?  
  *Hint: Should you call DFS for every component/root?*

- How would you modify the solution to return bridges with nodes sorted in each pair, or sorted overall?  
  *Hint: Sort at collection or at the end, depending on requirements.*

- Can you find all the articulation points (critical nodes) in the network?  
  *Hint: The same DFS tree approach, but with slightly different update rules for recording cut vertices.*


### Summary
This problem is a classic example of **bridge-finding in undirected graphs**, solved efficiently with **Tarjan’s Algorithm (DFS + low-link values)**. The core pattern is traversing the graph, recording discovery and lowest reachable times, then detecting when a child node cannot reach ancestors without its parent. This pattern is common for detecting bridges, articulation points, and strongly connected components in networks.

### Tags
Depth-First Search(#depth-first-search), Graph(#graph), Biconnected Component(#biconnected-component)

### Similar Problems
