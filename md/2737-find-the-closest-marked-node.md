### Leetcode 2737 (Medium): Find the Closest Marked Node [Practice](https://leetcode.com/problems/find-the-closest-marked-node)

### Description  
Given a directed, weighted graph with `n` nodes labeled `0` to `n-1` and an edge list `edges` where each entry is `[from, to, weight]`, you are also given a starting node `s` and a list `marked` containing some nodes.  
The task is to find the minimum distance from node `s` to any node in `marked`. The distance between two nodes is the sum of edge weights along the shortest path from `s` to that marked node. If no marked node is reachable from `s`, return `-1`.

### Examples  

**Example 1:**  
Input:  
edges = `[[0,1,2],[1,2,1],[0,2,4]]`,  
n = `3`, s = `0`, marked = `[2]`  
Output: `3`  
*Explanation: 0 → 1 (2) → 2 (1), so total distance = 2 + 1 = 3.*

**Example 2:**  
Input:  
edges = `[[0,1,5],[1,2,2],[2,3,1]]`,  
n = `4`, s = `0`, marked = `[3]`  
Output: `8`  
*Explanation: 0 → 1 (5) → 2 (2) → 3 (1), total distance = 5 + 2 + 1 = 8.*

**Example 3:**  
Input:  
edges = `[[0,1,1],[1,2,1],[2,0,1]]`,  
n = `3`, s = `2`, marked = `[1]`  
Output: `2`  
*Explanation: 2 → 0 (1) → 1 (1), total distance = 1 + 1 = 2.*

### Thought Process (as if you’re the interviewee)  
- The brute force approach would be to run a shortest-path algorithm from `s` to every marked node individually, but this is inefficient.
- Since we're looking for the minimum distance from a single source to any of multiple target nodes in a weighted graph, the optimal approach is Dijkstra's algorithm starting from `s`.
- After running Dijkstra from `s`, we get the minimum distance from `s` to every node. The answer will be the minimum of distances to all marked nodes.
- If no marked node is reachable (distance is infinity), return `-1`.
- Trade-offs: Dijkstra's algorithm with a priority queue is efficient for sparse graphs and handles varying edge weights.

### Corner cases to consider  
- The start node `s` is itself in `marked`.
- There is no path from `s` to any marked node (should return `-1`).
- Edge list is empty or contains disconnected nodes.
- Multiple marked nodes, only some of which are reachable.
- Multiple edges between the same pair of nodes with different weights.

### Solution

```python
import heapq

def find_closest_marked_node(n, edges, s, marked):
    # Build adjacency list
    adj = [[] for _ in range(n)]
    for frm, to, weight in edges:
        adj[frm].append((to, weight))
    
    # Dijkstra's algorithm from node s
    dist = [float('inf')] * n
    dist[s] = 0
    heap = [(0, s)]
    
    while heap:
        curr_dist, u = heapq.heappop(heap)
        if curr_dist > dist[u]:
            continue  # Already found a shorter path
        for v, weight in adj[u]:
            if dist[v] > curr_dist + weight:
                dist[v] = curr_dist + weight
                heapq.heappush(heap, (dist[v], v))
    
    answer = float('inf')
    for node in marked:
        if dist[node] < answer:
            answer = dist[node]
    return answer if answer != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((V + E) × log V), where V is the number of nodes and E is the number of edges.  
  Explanation: We build the adjacency list in O(E), and each node/edge is accessed a limited number of times in Dijkstra's algorithm with a heap, giving the above bound.
- **Space Complexity:** O(V + E) for the adjacency list, the distance array, and the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where there are many queries for different start nodes?
  *Hint: Preprocessing with all-pairs shortest path algorithms or multi-source Dijkstra/BFS.*

- What would change if the graph is undirected?
  *Hint: Add edges in both directions when building the adjacency list.*

- How do you efficiently handle negative edge weights?
  *Hint: Dijkstra cannot handle negatives. Consider Bellman-Ford for graphs with negative weights and no cycles.*

### Summary
This problem is a **classic single-source to multiple-target shortest-path** search in a weighted directed graph, solved optimally with Dijkstra's algorithm. Recognizing this graph pattern—especially searching from one node to a set of nodes—can speed up finding the right solution approach. This pattern appears frequently in network routing, GPS/maps, and multi-destination pathfinding problems.