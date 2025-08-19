### Leetcode 3604 (Medium): Minimum Time to Reach Destination in Directed Graph [Practice](https://leetcode.com/problems/minimum-time-to-reach-destination-in-directed-graph)

### Description  
Given a directed graph (may have cycles), each edge has a positive integer cost. Start at node s and must reach node t with the minimum total cost (sum of edge costs), i.e., **find the minimum time to go from s to t**. Return -1 if it's impossible.

### Examples  
**Example 1:**  
Input: `n=3, edges=[[0,1,4],[1,2,7],[0,2,10]], s=0, t=2`  
Output: `9`  
*Explanation: Path 0 → 1 → 2, cost 4+7=11, but 0→2 direct is 10; pick the min (10 < 11), output is 10.*

**Example 2:**  
Input: `n=4, edges=[[0,1,2],[1,2,2],[2,3,2]], s=0, t=3`  
Output: `6`  
*Explanation: Path: 0→1→2→3, cost=2+2+2=6.*

**Example 3:**  
Input: `n=2, edges=[[0,1,2]], s=1, t=0`  
Output: `-1`  
*Explanation: Cannot reach 0 from 1 over the given edges.*

### Thought Process (as if you’re the interviewee)  
- We're looking for the shortest path from s to t in a **directed weighted graph**.
- Since edge costs > 0 and cycles are allowed, standard Dijkstra's algorithm is best.
- Construct adjacency list, initialize min cost for each node as infinity, push start node into min-heap.
- For every node popped, expand its outgoing edges, updating costs if a better path is found.
- If t is reached, output the cost. If the heap empties before t is found, return -1.

### Corner cases to consider  
- t not reachable from s.
- s == t (cost is 0).
- Multiple edges between same nodes (pick the smaller cost).
- Large graphs.

### Solution

```python
import heapq

def minimum_time_to_reach_destination(n, edges, s, t):
    from collections import defaultdict
    g = defaultdict(list)
    for u, v, w in edges:
        g[u].append((v, w))
    INF = 1 << 60
    dist = [INF] * n
    dist[s] = 0
    heap = [(0, s)]
    while heap:
        cost, u = heapq.heappop(heap)
        if u == t:
            return cost
        if cost > dist[u]:
            continue
        for v, w in g[u]:
            if dist[v] > cost + w:
                dist[v] = cost + w
                heapq.heappush(heap, (dist[v], v))
    return -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(E log n) (E=edges, Dijkstra's heap for n nodes)
- **Space Complexity:** O(n + E) (dist list and adjacency list)

### Potential follow-up questions (as if you’re the interviewer)  

- What if some edge costs are zero?
  *Hint: 0-cost edges can be handled by using a deque for 0-1 BFS.*

- What if negative-weight edges are allowed, but no negative cycles?
  *Hint: Use Bellman-Ford or SPFA, not Dijkstra.*

- Can you return the actual path (nodes), not just the cost?
  *Hint: Track a parent pointer for each node, backtrack at the end.*

### Summary
Classic shortest path problem with Dijkstra’s, handles any non-negative edge weights, cycles, disconnected components, and is an interview staple for directed/undirected graphs.

### Tags
Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
