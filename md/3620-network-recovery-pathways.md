### Leetcode 3620 (Hard): Network Recovery Pathways [Practice](https://leetcode.com/problems/network-recovery-pathways)

### Description  
Given a weighted undirected graph representing a network with `n` nodes labeled `0` to `n-1` and a set of edges defined by `(u, v, cost)`, you need to find a path from node `0` to node `n-1` that meets two criteria:
- The *total cost* of the path is less than a given integer `k`.
- Among all such valid paths, choose the one where the *minimum edge cost* along the path is maximized (i.e., out of all valid paths, pick the one whose weakest link is as strong as possible).
Return the maximum possible minimum edge cost of any path from `0` to `n-1` with total cost < `k`. If no such path exists, return `-1`.

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[0,1,5],[1,4,7],[0,4,6],[0,2,3],[2,4,12]], k = 13`  
Output: `6`  
*Explanation:  
Possible paths from 0 to 4 with cost < 13:  
- 0→1→4 (cost: 5+7=12, min edge: 5)  
- 0→4 (cost: 6, min edge: 6)  
Among these, 0→4 has the highest minimum edge cost (6).*

**Example 2:**  
Input: `n = 3, edges = [[0,1,6],[1,2,8],[0,2,10]], k = 15`  
Output: `8`  
*Explanation:  
Possible paths from 0 to 2 with cost < 15:  
- 0→2 (cost: 10, min edge: 10)  
- 0→1→2 (cost: 6+8=14, min edge: 6)  
We pick 0→2, min edge = 10.*

**Example 3:**  
Input: `n = 3, edges = [[0,1,10],[1,2,10]], k = 15`  
Output: `-1`  
*Explanation:  
All paths from 0 to 2 have total cost ≥ 15. Return -1.*

### Thought Process (as if you're the interviewee)  
- **Brute-force idea:**  
  Try all possible paths from 0 to n−1, filter those with total cost < k, and return the max of `min(edge_cost)` among these paths. However, there are exponentially many paths, so this is not feasible for large graphs.

- **Observation:**  
  Unlike standard shortest paths, we want to maximize the minimum edge on the path, under a total cost constraint. This is a combination of binary search (for the minimum edge we can achieve) and pathfinding with cost constraints.

- **Optimized idea:**  
  Consider binary searching on the possible values for the "bottleneck" (the minimum edge on the path), say `mid`. For each candidate value, filter the graph to only include edges with cost ≥ `mid`. Then, check if there is a path from `0` to `n-1` whose *total cost* is < `k` in this filtered graph. This can be checked efficiently with a modified Dijkstra or BFS.

- **Why this works:**  
  Binary search gives O(log C) candidates (`C` = number of unique edge costs), and for each, we use Dijkstra's algorithm or BFS (since all costs are positive) to check path feasibility. Each such check is O((N+E) log N).

- **Trade-offs:**  
  This uses more memory and time than a single-path search, but is much more efficient than full enumeration.

### Corner cases to consider  
- No path from 0 to n-1 exists.
- All possible paths have cost ≥ k.
- All edges have the same weight.
- Multiple paths with same minimum edge; choose path with total cost < k.
- Edge cases: n = 2, only one edge.
- Disconnected graphs.

### Solution

```python
def max_min_edge_under_budget(n, edges, k):
    # Step 1: Get all distinct edge costs for binary search
    edge_costs = sorted(set(w for _, _, w in edges))
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))

    # Binary search helper: can we reach n-1 from 0 with only edges of at least 'min_edge'
    # and total cost < k?
    import heapq

    def can_achieve(min_edge):
        # Only use edges ≥ min_edge
        visited = [float('inf')] * n
        pq = [(0, 0)]  # (total_cost, node)
        visited[0] = 0
        while pq:
            total, u = heapq.heappop(pq)
            if u == n-1:
                return total < k
            for v, w in graph[u]:
                if w >= min_edge and total + w < visited[v] and total + w < k:
                    visited[v] = total + w
                    heapq.heappush(pq, (total + w, v))
        return False

    # Binary search for best achievable min_edge
    left, right = 0, len(edge_costs) - 1
    answer = -1
    while left <= right:
        mid = (left + right) // 2
        candidate = edge_costs[mid]
        if can_achieve(candidate):
            answer = candidate
            left = mid + 1  # try higher
        else:
            right = mid - 1  # try lower
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O((E + N) log C × log N)  
  - log C for binary search over possible bottleneck (distinct edge costs C ≤ E),  
  - For each search, we run modified Dijkstra up to all nodes, which is O((E + N) log N).

- **Space Complexity:**  
  O(E + N) for adjacency list and Dijkstra's state tracking.

### Follow-up questions  
- How would you handle dynamic updates to edge weights (online queries)?
- Can you adapt this for unweighted or directed graphs, or support negative edges (if all total costs are still positive)?