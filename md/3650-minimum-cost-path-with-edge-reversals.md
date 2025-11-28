### Leetcode 3650 (Medium): Minimum Cost Path with Edge Reversals [Practice](https://leetcode.com/problems/minimum-cost-path-with-edge-reversals)

### Description  
You are given a graph where each edge is a directed edge with a non-negative cost. You want to travel from a starting node (often node 0) to an ending node (often node n-1), and you are allowed to reverse the direction of any edge at any time — but reversing an edge costs the same as traversing it. The goal is to find the minimum total cost to get from the source to the target, potentially reversing some edges along the way.

More formally:  
- Given directed edges with costs, you may travel along a directed edge (paying its cost), or reverse it (paying the *same* cost) and then travel.
- Find the minimum cost to go from the source to the target with any number of reversals.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[0,1,1],[1,2,1],[2,3,1]]`  
Output: `3`  
*Explanation: Path is 0 → 1 → 2 → 3 (no reversals needed, total cost 1 + 1 + 1 = 3).*

**Example 2:**  
Input: `n = 4, edges = [[1,0,1], [2,1,1], [3,2,1]]`  
Output: `3`  
*Explanation: Need to reverse every edge (so 0 ← 1 ← 2 ← 3). To reach from 0 to 3:  
- Reverse [1,0], [2,1], [3,2]: cost = 1 + 1 + 1 = 3. So path is 0→1→2→3 after reversals.*

**Example 3:**  
Input: `n = 3, edges = [[0,2,3],[1,2,1],[1,0,1]]`  
Output: `2`  
*Explanation: Path is 0 → 2 (cost 3, direct), but to reach 1 we can use [1,0,1] reversed, so reverse [1,0,1]: 0→1 (cost 1). So shortest path 0→1 (via reverse, cost 1), 1→2 (cost 1): total 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try all combinations of edge reversals, using BFS or DFS. But this explodes exponentially—too slow.
- **Key realization:** Every directed edge can be used “forwards” or “reversed”—so for each edge [u, v, w], add edges `u→v` (cost w) and `v→u` (cost w) in an undirected sense.
- **Graph modeling:** Transform the graph by adding a “reverse” edge for every given edge with the same cost.
- **Run Dijkstra’s algorithm** from the source to the destination, since all edge weights are non-negative. This guarantees optimality, and is efficient for sparse graphs, O((n + m) log n).
- **Reasoning:** By doubling the edges with the same cost, Dijkstra explores all minimal-cost paths, including those that require reversals, with no need to track reversal state.

### Corner cases to consider  
- Only one node: source = target.
- No possible path (even with reversals): disconnected components.
- Multiple edges between nodes.
- Self-loops: shouldn’t help connectivity, but test.
- Large cost differences on parallel edges.
- Source equals target.
- Path requires a mix of “forward” and “reversed” edges for optimality.

### Solution

```python
import heapq

def minCost(n, edges, source=0, target=None):
    # If target not specified, assume last node
    if target is None:
        target = n - 1

    # Build the graph: for each edge, add both directions with the same cost
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        # Original edge
        graph[u].append((v, w))
        # Reversed edge (cost to reverse and traverse)
        graph[v].append((u, w))
    
    # Dijkstra's Algorithm
    heap = [(0, source)]
    dist = [float('inf')] * n
    dist[source] = 0
    
    while heap:
        cost, node = heapq.heappop(heap)
        if node == target:
            return cost
        if cost > dist[node]:
            continue
        for nei, w in graph[node]:
            if cost + w < dist[nei]:
                dist[nei] = cost + w
                heapq.heappush(heap, (cost + w, nei))
    return -1  # Unreachable
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + m) log n), where n = number of nodes, m = number of edges (original + reversed), due to Dijkstra’s with a min-heap.
- **Space Complexity:** O(n + m), for the adjacency list (storing both forward and reversed edges) and Dijkstra’s `dist` array/heap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some reversals have a different cost than forward traversals?  
  *Hint: Store separate costs for “reversed” and “forward” directions in your graph model.*

- How would you reconstruct the actual minimum-cost path, not just the cost?  
  *Hint: Store parent pointers during Dijkstra and trace back from the target.*

- Can you handle negative costs (no negative cycles)?  
  *Hint: Dijkstra doesn’t work with negatives, so use Bellman-Ford.*

### Summary
This problem is a classic **graph shortest-path** problem with a twist: you can traverse or reverse any edge at the same cost. The solution uses the **Dijkstra’s algorithm** coding pattern, efficiently finding the minimum path in O((n + m) log n) time. The technique of “expanding the state space” (modeling reversible edges explicitly) is broadly applicable to graphs with flexible edge operations, reward/penalty dynamics, and bidirectional search problems.


### Flashcard
Transform directed graph by adding reverse edges with same cost. Run Dijkstra from source to destination on the augmented graph.

### Tags
Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- Minimum Cost to Reach Destination in Time(minimum-cost-to-reach-destination-in-time) (Hard)