### Leetcode 2714 (Hard): Find Shortest Path with K Hops [Practice](https://leetcode.com/problems/find-shortest-path-with-k-hops)

### Description  
Given a connected, undirected, weighted graph with \(n\) nodes (labeled 0 to \(n-1\)), you are given a list of weighted edges. You are also given two nodes, \(s\) (start) and \(d\) (destination), and an integer \(k\).  
Find the minimum total cost to go from \(s\) to \(d\) where you can "hop over" up to \(k\) edges in the path (i.e., you may treat their weight as 0 for your path cost).  
Return this minimum cost.

### Examples  

**Example 1:**  
Input: `n=4, edges=[[0,1,1],[1,2,2],[0,2,4],[2,3,1]], s=0, d=3, k=1`  
Output: `2`  
Explanation:  
Possible path: 0→1→2→3.  
You can hop over edge [2,3,1] (cost becomes 0), so total cost is 1 (0→1, edge weight 1) + 2 (1→2, weight 2) + 0 ([2,3,1], used hop) = 3.  
But a better path is 0→2→3.  
You hop over edge [0,2,4] (so cost 0) + 1 (2→3, not hopped) = 1.  
But since only 1 hop is available, best path is 0→1 (1), 1→2 (2), 2→3 (hop, 0) = 1+2+0=2.

**Example 2:**  
Input: `n=3, edges=[[0,1,10],[1,2,10],[0,2,1]], s=0, d=2, k=2`  
Output: `0`  
Explanation:  
Use hops on both edges [0,1,10] and [1,2,10]: go 0→1→2, both edges are free.

**Example 3:**  
Input: `n=2, edges=[[0,1,100]], s=0, d=1, k=0`  
Output: `100`  
Explanation:  
No hops allowed, must pay full edge cost.

### Thought Process (as if you’re the interviewee)  

- **Brute Force Idea:**  
  Try all possible paths from \(s\) to \(d\) and, for each, apply up to \(k\) hops greedily on the largest-weighted edges. This is intractable (exponential number of paths).

- **Optimization:**  
  Modify Dijkstra's algorithm:  
  - Track not just the node and distance, but also the number of hops used to reach that node.
  - State becomes (node, hops_used). For each edge, consider both possibilities: pay its cost (hops_used unchanged), or hop (if hops_used < k, advance without paying edge cost and increment hops_used).
  - For every node, maintain the shortest path found for each possible hops_used (0 to k).
  - Use a min-heap (priority queue) for efficient path selection.

- **Why This Works:**  
  - We efficiently explore all possibilities of how and when to use hops.
  - The solution space is \(n \times (k+1)\), which is manageable for typical constraints.

### Corner cases to consider  
- Edge case where s = d (start and destination are same node). Should return 0.
- No hops allowed (k = 0): must fall back to ordinary Dijkstra.
- Graph with multiple edges between the same nodes.
- Hops allowed \(k\) greater than path length: don’t use more than needed.
- Disconnected graph (problem states “connected,” so usually not an issue).
- Heavy edges vs. light: Should prefer hopping the most expensive ones.
- Loops/self-edges.

### Solution

```python
import heapq

def shortest_path_with_k_hops(n, edges, s, d, k):
    # Build adjacency list: g[u] = [(v, weight), ...]
    g = [[] for _ in range(n)]
    for u, v, w in edges:
        g[u].append((v, w))
        g[v].append((u, w))

    # dist[node][hops_used]: shortest distance to node using 'hops_used' hops
    INF = float('inf')
    dist = [[INF] * (k + 1) for _ in range(n)]
    dist[s][0] = 0

    # heap: (distance_so_far, current_node, hops_used)
    heap = [(0, s, 0)]

    while heap:
        cost, u, hops = heapq.heappop(heap)
        # Early exit if at destination; continue to find all possible hops
        if u == d and hops == k:
            continue
        if cost > dist[u][hops]:
            continue  # obsolete outdated

        for v, w in g[u]:
            # Option 1: Take edge normally
            if dist[v][hops] > cost + w:
                dist[v][hops] = cost + w
                heapq.heappush(heap, (dist[v][hops], v, hops))
            # Option 2: Hop over edge (cost 0), only if hops < k
            if hops < k and dist[v][hops + 1] > cost:
                dist[v][hops + 1] = cost
                heapq.heappush(heap, (dist[v][hops + 1], v, hops + 1))

    # Answer: minimal distance to d across all 0..k hops
    return min(dist[d])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O((n + m) × k × log(n × k)), where n = number of nodes, m = number of edges.  
  For each node and hops_used(0..k), we potentially push into the heap. Each pop/push is log(n × k).

- **Space Complexity:**  
  O(n × k) for the dist table (since storing best distance to each node for 0..k hops).  
  O(n + m) for the graph adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is directed?  
  *Hint: Adjust adjacency list and modify only; no algorithmic change.*

- How would you reconstruct the path?  
  *Hint: Track parent for each (node, hops_used) state in the heap.*

- Can you further optimize if edge weights are all 1?  
  *Hint: Consider BFS instead of Dijkstra.*

### Summary
This problem uses a standard *Dijkstra with expanded state* pattern—here, tracking both location and number of hops used.  
This pattern is common for problems where states have multiple resources (e.g., limited teleports, fuel, obstacle removals).  
It’s directly applicable in any weighted graph where you must make k-cost-altering choices along shortest paths.  
The main insight is state augmentation and careful relaxation in Dijkstra’s algorithm.

### Tags
Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
