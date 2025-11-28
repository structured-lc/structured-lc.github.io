### Leetcode 3620 (Hard): Network Recovery Pathways [Practice](https://leetcode.com/problems/network-recovery-pathways)

### Description  
Given a directed acyclic graph (DAG) with `n` nodes (numbered from 0 to n-1) and a list of edges, where each edge is defined as `(u, v, cost)`, you want to find the highest possible minimum edge cost among all possible paths from node 0 (source) to node n-1 (target), but only considering paths:
- Where all intermediate nodes (excluding 0 and n-1) are "online" per a given `online` array,
- The total path cost is ≤ `k`.
Return the maximum possible minimum edge cost ("pathway score") among all valid paths between node 0 and node n-1 under these constraints.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[0,1,5],[1,3,5],[0,2,6],[2,3,6]], online = [True,True,True,True], k = 12`  
Output: `6`  
*Explanation: Both paths 0→1→3 (total cost: 10, min cost: 5) and 0→2→3 (total cost: 12, min cost: 6) are valid. Path 0→2→3 has the higher minimum (6).*

**Example 2:**  
Input: `n = 5, edges = [[0,1,3],[1,4,3],[0,2,2],[2,3,4],[3,4,7]], online = [True,False,True,True,True], k = 10`  
Output: `2`  
*Explanation: Intermediate node 1 is offline, so the path 0→1→4 is invalid. The only allowed path is 0→2→3→4 (cost: 2+4+7=13 > 10), so no valid path with total cost ≤ 10. Return 0.*

**Example 3:**  
Input: `n = 4, edges = [[0,1,2],[1,3,2],[0,2,2],[2,3,2]], online = [True,False,True,True], k = 5`  
Output: `2`  
*Explanation: Intermediate node 1 is offline, so only path 0→2→3 (cost: 4, min edge: 2) is valid.*

### Thought Process (as if you’re the interviewee)  
- First, I’d clarify constraints: The graph is acyclic, and only online nodes (except 0 and n-1) can be used as intermediates.
- Brute force: Enumerate all paths from 0 to n-1, filter for those where intermediates are online and sum ≤ k, and compute the minimum edge on each. Track the highest of these minimums. But the number of possible paths is exponential—this isn’t feasible for large graphs.
- Optimization: Since we want to **maximize the minimum edge weight** on a valid path, this is a classic "path-maximization under budget" problem.
    - **Binary search**: We can binary search on the possible minimum edge weight (the "score").
    - For each candidate score `x`, check if a path exists from 0 to n-1 using only edges with cost ≥ x and with total path cost ≤ k, and intermediates online.
    - To check this efficiently, use a modified Dijkstra’s algorithm (or BFS/DFS in a DAG) keeping track of path costs, only traversing valid edges/nodes for that threshold.
- Trade-offs: This approach reduces the search from exponential (all paths) to O(n log C), where C is the range of possible edge costs, and each search step uses Dijkstra/topological traversal.

### Corner cases to consider  
- The only valid path is through an offline node (return 0).
- Nodes 0 or n-1 are offline (not possible by constraints).
- k is so small that even the cheapest path exceeds k (return 0).
- Multiple edges between pairs (should only use those meeting edge weight constraints).
- All edges are below the minimum considered threshold.

### Solution

```python
from collections import defaultdict, deque
import heapq

def networkRecoveryPathways(n, edges, online, k):
    # Find range for binary search: min and max edge weights
    edge_weights = [w for u, v, w in edges]
    if not edge_weights:
        return 0
    left, right = min(edge_weights), max(edge_weights)
    answer = 0

    # Build adjacency list: only allow traversing from u to v
    adj = defaultdict(list)
    for u, v, w in edges:
        adj[u].append((v, w))

    def path_exists(threshold):
        # Modified Dijkstra: only use edges >= threshold, path cost ≤ k, intermediates online
        heap = [(0, 0)]  # (current_path_sum, node)
        visited = [float('inf')] * n  # Smallest cost to reach each node
        visited[0] = 0

        while heap:
            curr_cost, u = heapq.heappop(heap)
            if curr_cost > k:
                continue
            if u == n - 1:
                return True  # Found valid path
            for v, w in adj[u]:
                if w < threshold:
                    continue
                # Check online for intermediate nodes (except 0/n-1)
                if v != 0 and v != n - 1 and not online[v]:
                    continue
                new_cost = curr_cost + w
                if new_cost < visited[v]:
                    visited[v] = new_cost
                    heapq.heappush(heap, (new_cost, v))
        return False

    # Binary search on possible min edge weight
    while left <= right:
        mid = (left + right) // 2
        if path_exists(mid):
            answer = mid  # Try higher threshold
            left = mid + 1
        else:
            right = mid - 1
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Binary search over edge weights: O(log C), C=max(edge weight)
  - For each step, Dijkstra/best-path search: O((n + m) log n)
  - So overall: O((n + m) log n · log C)

- **Space Complexity:**  
  - Adjacency list: O(n + m)
  - Dijkstra’s storage: O(n)

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the graph had cycles?  
  *Hint: Dijkstra or Bellman-Ford may be needed; cycles may allow infinite cost, so path counting changes—add ‘visited’/recursion management.*

- What if the number of online/offline changes frequently in queries?  
  *Hint: Preprocessing or dynamic approaches; consider segment trees or lazy propagation.*

- Can you also output the actual path, not just the pathway score?  
  *Hint: Add parent tracking in Dijkstra’s search to reconstruct the path.*

### Summary
This problem uses the **binary search on the answer** technique combined with a modified **shortest path algorithm** (Dijkstra or BFS in DAG) to efficiently determine the highest possible minimum edge on a valid path under given constraints.  
This is a classic approach applicable in similar optimization/search problems: maximize (or minimize) a key metric along a path subject to complex constraints (edge/node properties, cost limits). Common in hard graph questions, especially in network routing, resource allocation, or reliability scenarios.


### Flashcard
Clarify constraints (acyclic graph, online nodes as intermediates); use dynamic programming or DFS to find all valid paths from 0 to n−1 where intermediates are online and sum ≤ k; maximize the minimum edge weight on each path.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Graph(#graph), Topological Sort(#topological-sort), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
