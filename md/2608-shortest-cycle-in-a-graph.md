### Leetcode 2608 (Hard): Shortest Cycle in a Graph [Practice](https://leetcode.com/problems/shortest-cycle-in-a-graph)

### Description  
Given an undirected, unweighted graph with n nodes labeled from 0 to n−1 and a list of bidirectional edges (no self-loops or parallel edges), find the length of the *shortest cycle* in the graph.  
A cycle is a path that starts and ends at the same node, with all edges and nodes distinct (except the first and last node).  
If no cycle exists, return −1.  
This is like finding the smallest possible circle in the graph, which represents the “shortest loop”.

### Examples  

**Example 1:**  
Input: `n = 7, edges = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]`  
Output: `3`  
Explanation: The smallest cycle is 0 → 1 → 2 → 0, which has length 3.

**Example 2:**  
Input: `n = 4, edges = [[0,1],[0,2]]`  
Output: `-1`  
Explanation: No cycles exist in this component.

**Example 3:**  
Input: `n = 5, edges = [[0,1],[1,2],[2,3],[3,1],[1,4]]`  
Output: `3`  
Explanation: The smallest cycle is 1 → 2 → 3 → 1.

### Thought Process (as if you’re the interviewee)  
- **Naive/Brute-force idea:**  
  - Enumerate all possible cycles – but there are exponentially many; too slow.
  - You could try to remove each edge and check connectivity, but this is inefficient for big n.

- **Optimized idea (BFS per node):**  
  - For each node, run BFS to visit other nodes and keep track of the distance to each node.
  - If you revisit a node (encounter it from a neighbor that's not its parent), then a cycle exists, and you can compute its length as curr_distance + neighbor_distance + 1.
  - Keep updating the best cycle length seen so far.
  - Since we repeat BFS from every node, and every edge could be part of a different smallest cycle, this finds the global minimum.
  - Why BFS? Because it finds shortest paths; so, first time you revisit a node, you have a cycle with minimal length through that node.

- **Trade-offs:**  
  - BFS from every node is O(n \* m) as each BFS explores O(m) edges, and we do it for each of n nodes.
  - This is efficient enough for n, m ≤ 1000.
  - Code remains simple and generalizes well to undirected graphs.

### Corner cases to consider  
- Empty edge list (no cycles).
- Graph not connected but some components have cycles, others do not.
- Multiple cycles, only consider the shortest.
- n = 2, single edge, no cycle.
- Graph is already a simple cycle (like a ring); shortest cycle involves all nodes.

### Solution

```python
def findShortestCycle(n, edges):
    # Build the adjacency list for undirected graph
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    min_cycle = float('inf')

    for start in range(n):
        # For each BFS, store distance and parent for each node
        dist = [None] * n
        par = [None] * n

        from collections import deque
        q = deque()
        dist[start] = 0
        q.append(start)

        while q:
            node = q.popleft()
            for neighbor in graph[node]:
                if dist[neighbor] is None:
                    # Not visited yet; normal BFS
                    dist[neighbor] = dist[node] + 1
                    par[neighbor] = node
                    q.append(neighbor)
                elif par[node] != neighbor:
                    # Found a cycle (not coming back to immediate parent)
                    cycle_len = dist[node] + dist[neighbor] + 1
                    min_cycle = min(min_cycle, cycle_len)

    return min_cycle if min_cycle != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  For each of the n nodes, we perform a BFS which can visit up to m edges.
- **Space Complexity:** O(n + m)  
  To store adjacency list and per-BFS distance/parent arrays; at most O(n) for each, O(m) for the adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify this to recover the actual shortest cycle path, not just its length?  
  *Hint: Backtrack parent pointers after detecting a cycle.*

- How would you handle this in a directed graph?  
  *Hint: Watch out for directions when detecting cycles (use coloring or ancestor tracking).*

- What if the graph is very large (millions of nodes/edges)?  
  *Hint: Consider external memory approaches or limit BFS depth.*

### Summary
This problem is a classic *undirected graph* “shortest cycle” pattern. The key is observing that BFS efficiently finds shortest cycles because it processes nodes layer by layer.  
This technique generalizes: to detect shortest cycles in any *unweighted undirected* graph, perform BFS from each node and look for “cross-edges” (back edges not to parent) that close a cycle.  
This pattern shows up in cycle detection, shortest path, and connectivity problems in unweighted graphs.

### Tags
Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Redundant Connection(redundant-connection) (Medium)
- Longest Cycle in a Graph(longest-cycle-in-a-graph) (Hard)
- Divide Nodes Into the Maximum Number of Groups(divide-nodes-into-the-maximum-number-of-groups) (Hard)