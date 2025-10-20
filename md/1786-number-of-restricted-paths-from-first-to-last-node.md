### Leetcode 1786 (Medium): Number of Restricted Paths From First to Last Node [Practice](https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node)

### Description  
Given an undirected, connected, weighted graph with n nodes (labeled 1 to n), each edge is described as `[uᵢ, vᵢ, weightᵢ]`.  
A *restricted path* from node 1 to node n is a path where, at every step, the distance from the current node to node n (shortest possible, i.e., Dijkstra distance) **strictly decreases** with each move.  
Return the total number of such restricted paths from node 1 to node n, modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]]`  
Output: `3`  
*Explanation: There are 3 restricted paths:  
1 → 2 → 5  
1 → 2 → 3 → 5  
1 → 3 → 5  
At each step along any of these, the shortest distance-to-5 strictly decreases.*

**Example 2:**  
Input: `n = 4, edges = [[1,2,1],[2,3,2],[3,4,3],[1,4,4]]`  
Output: `1`  
*Explanation: Only one restricted path: 1 → 2 → 3 → 4, with strictly decreasing shortest distances to node 4.*

**Example 3:**  
Input: `n = 3, edges = [[1,2,2],[2,3,2],[1,3,3]]`  
Output: `1`  
*Explanation: Only one restricted path: 1 → 2 → 3. The direct path 1→3 is not restricted because the shortest distance to node 3 from 1 is 3, and from 3 (itself) is 0, so order is not strictly decreasing on that step.*

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to enumerate all possible paths from 1 to n and check the "strictly decreasing" distance property. But that's *very* inefficient for large graphs and will TLE.
- We need a way to *efficiently count* all such paths. Since the restriction depends on the *shortest distance* from each node to n, first compute these using Dijkstra's.
- Once we know the distance-to-n for every node, for every path, the next node must always have a smaller shortest distance to n than the current.
- This structure suggests DP: Let f(i) be the number of restricted paths from node i to n.
- f(n) = 1 (only path is staying at n).
- For every node i (moving "downhill" in distance-to-n order), for each neighbor j with dist[j] < dist[i], add f(j) to f(i).
- To avoid recomputation, process nodes in increasing order of dist-to-n, or use memoized DFS.
- This is a classic combination of graph/shortest-path, DP, and order-enforced traversal.

### Corner cases to consider  
- Single path from 1 to n (linear graph).
- All edge weights are the same.
- There are cycles, but restricted paths can't revisit nodes (paths, not walks).
- Edges list might have one-way paths in the undirected case.
- The entire graph is just two nodes connected directly.
- There is no restricted path (should return 0).
- All distances from 1 to n are equal except for node n.

### Solution

```python
from collections import defaultdict
import heapq

def countRestrictedPaths(n, edges):
    # Build graph: node -> list of (neighbor, weight)
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))

    # 1. Dijkstra from node n to all other nodes
    dist = [float('inf')] * (n + 1)
    dist[n] = 0
    min_heap = [(0, n)]  # (distance, node)
    while min_heap:
        d, node = heapq.heappop(min_heap)
        if d > dist[node]:
            continue
        for nei, weight in graph[node]:
            if dist[nei] > d + weight:
                dist[nei] = d + weight
                heapq.heappush(min_heap, (dist[nei], nei))

    # 2. DP: f[node] = number of restricted paths from node to n
    MOD = 10**9 + 7
    memo = [None] * (n + 1)

    def dfs(u):
        if u == n:
            return 1
        if memo[u] is not None:
            return memo[u]
        total = 0
        for v, _ in graph[u]:
            if dist[u] > dist[v]:  # only go 'downhill'
                total = (total + dfs(v)) % MOD
        memo[u] = total
        return total

    return dfs(1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Dijkstra's algorithm: O(m log n), where m = number of edges, n = number of nodes.  
  The DFS part visits each node/edge at most once: O(m).  
  Total: O(m log n)

- **Space Complexity:**  
  O(m+n) for the adjacency list, O(n) for distance and memo arrays, and O(n) for the recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if the graph could have negative edge weights?  
  *Hint: Dijkstra doesn't work; you’d need Bellman-Ford.*

- What if you had to output not just the count, but all the actual restricted paths (as node lists)?  
  *Hint: Use backtracking, but note the exponential number of paths for large graphs.*

- How can you optimize for extremely large graphs when n, m are up to 10⁶?  
  *Hint: Consider iterative DP instead of recursion and optimize space.*

### Summary
This problem combines Dijkstra's shortest path with dynamic programming over a DAG (directed by the "strictly decreasing" constraint). Key patterns involved are shortest-path preprocessing, then using topological-ordered DP or memoized DFS for counting valid paths. This technique appears in other problems where path choices are ordered by a numeric feature, such as "strictly increasing/decreasing subpaths" or "longest decreasing path in matrix".


### Flashcard
Use Dijkstra's algorithm to compute shortest distances to the last node and then count paths that strictly decrease in distance.

### Tags
Dynamic Programming(#dynamic-programming), Graph(#graph), Topological Sort(#topological-sort), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- All Ancestors of a Node in a Directed Acyclic Graph(all-ancestors-of-a-node-in-a-directed-acyclic-graph) (Medium)
- Design Graph With Shortest Path Calculator(design-graph-with-shortest-path-calculator) (Hard)
- Minimum Cost of a Path With Special Roads(minimum-cost-of-a-path-with-special-roads) (Medium)