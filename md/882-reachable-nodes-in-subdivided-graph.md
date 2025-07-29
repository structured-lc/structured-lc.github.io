### Leetcode 882 (Hard): Reachable Nodes In Subdivided Graph [Practice](https://leetcode.com/problems/reachable-nodes-in-subdivided-graph)

### Description  
Given an **undirected graph** of `n` nodes (numbered 0 to n-1) and a list that defines **edges**. Each edge is specified as `[u, v, cnt]`, meaning that between nodes u and v, the edge is subdivided by inserting `cnt` new nodes (creating a chain of `cnt+1` edges). Starting from node 0, and given `maxMoves`—the maximum number of edge traversals allowed—return the total count of **nodes reachable** from node 0 in the expanded (subdivided) graph.  
- **Reachable** means a node you can visit using ≤ maxMoves edges starting from 0.
- The subdivided nodes between every original edge are also counted.

### Examples  

**Example 1:**  
Input: `edges=[[0,1,10],[0,2,1],[1,2,2]]`, `maxMoves=6`, `n=3`  
Output: `13`  
Explanation.  
Original nodes: 0, 1, 2.  
- Edge 0-1: subdivided into 10 new nodes between 0 and 1 (chain length 11).
- Edge 0-2: 1 new node between 0 and 2 (chain length 2).
- Edge 1-2: 2 new nodes between 1 and 2 (chain length 3).

Reachable nodes with up to 6 moves include:
- All original nodes that can be reached directly (0, 1, 2)
- All subdivided nodes on edges that can be visited within 6 moves.
In total: 13 unique nodes (all reachable within 6 steps).

**Example 2:**  
Input: `edges=[[0,1,4],[1,2,6],[0,2,8]]`, `maxMoves=10`, `n=3`  
Output: `23`  
Explanation.  
- 0-1: 4 new nodes (5 length)
- 1-2: 6 new nodes (7 length)
- 0-2: 8 new nodes (9 length)
With maxMoves=10, nearly all subdivided/intermediate nodes and originals can be reached.

**Example 3:**  
Input: `edges=[[1,2,4],[1,4,5],[1,3,1],[2,3,4],[0,3,1]]`, `maxMoves=7`, `n=5`  
Output: `13`  
Explanation.  
Graph is more complex. From 0 (via 0-3 edge), you can reach node 3 and spread to others within 7 moves, accounting for subdivided nodes.


### Thought Process (as if you’re the interviewee)  

- **Naive approach:**  
  Actually generating the full subdivided graph and then doing BFS/Dijkstra from 0, counting reachables, but this is **unscalable**—the real (expanded) node count could be huge (as high as sum of all cnt in the input).

- **Efficient approach:**  
  - Don’t actually build every intermediate node.  
  - Instead, use **Dijkstra’s shortest path** to compute minimum moves needed to reach each original node.
  - For each *edge* (`u`, `v`, `cnt`), calculate:
    - How far (moves used) can I reach into the subdivided segment from u and v?
    - The total number of subdivided nodes reached from both endpoints = min(cnt, moves_left_from_u + moves_left_from_v).
  - The answer = 
    - (number of original nodes within reach)
    - plus (sum above for subdivided nodes across all edges).

- **Why Dijkstra?**  
  Because edge traversal cost is always 1, and the shortest path gives us the minimal number of moves needed to reach every node.

- **Tradeoff:**  
  Avoids building the massive expanded graph, only tracks reachable ranges per edge.

### Corner cases to consider  
- maxMoves = 0: Only node 0 is reachable  
- Disconnected graph: Only nodes connected to node 0 matter  
- cnt = 0 on edge: No subdivided node on some edge  
- Edge loops or duplicates  
- Very high cnt: Algorithm should not build the full expanded graph  
- maxMoves is much larger than required to reach all
  
### Solution

```python
import heapq

def reachableNodes(edges, maxMoves, n):
    # Build adjacency list with edge counts
    graph = [[] for _ in range(n)]
    for u, v, cnt in edges:
        graph[u].append((v, cnt))
        graph[v].append((u, cnt))

    # Dijkstra: distance from 0 to every node (min-moves needed)
    dist = [float('inf')] * n
    dist[0] = 0
    heap = [(0, 0)]  # (moves_used, node)
    while heap:
        moves, node = heapq.heappop(heap)
        if moves > dist[node]:
            continue
        for nei, cnt in graph[node]:
            cost = moves + cnt + 1  # To reach other endpoint
            if cost < dist[nei]:
                dist[nei] = cost
                heapq.heappush(heap, (cost, nei))

    # Count the original nodes we can reach
    ans = sum(1 for d in dist if d <= maxMoves)

    # For each edge, count reachable intermediate nodes
    # From u: at most maxMoves - dist[u], same for v
    used = {}
    for u, v, cnt in edges:
        a = max(0, maxMoves - dist[u])
        b = max(0, maxMoves - dist[v])
        ans += min(cnt, a + b)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Dijkstra’s for n nodes, up to O((n + E)⋅log n), where E = number of edges.
  - For each edge, extra O(1) calc.
  - **Total:** O((n + E)·log n)

- **Space Complexity:**  
  - O(n + E): adjacency list
  - O(n): distance array, heap
  - O(1): No explicit expanded graph, only constant work per edge

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **directed** edges in this model?  
  *Hint: Adjust adjacency list and edge traversal logic.*

- What if edges had **variable traversal costs** (not just 1 per segment)?  
  *Hint: Adjust Dijkstra's cost calculation to edge weights.*

- Suppose you wanted to **enumerate which subdivided nodes** are actually reachable, not just count?  
  *Hint: Track the number of steps used from each endpoint for every edge.*

### Summary
The approach uses **Dijkstra’s shortest path algorithm** for the original nodes, and only simulates reach into subdivided nodes via math—never builds the exponentially larger expanded graph. This is a classic **shortest-path + counting reachability** problem and the math for intermediate (subdivided) nodes is a neat application of combining Dijkstra with per-edge logic. This pattern frequently appears in problems where an implicit graph expansion would be intractable, but local edge calculations suffice.