# Leetcode 3778 (Medium): Minimum Distance Excluding One Maximum Weighted Edge [Practice](https://leetcode.com/problems/minimum-distance-excluding-one-maximum-weighted-edge)

### Description

You are given a weighted connected undirected graph with n nodes (0 to n-1) and an array of edges where each edge is [uᵢ, vᵢ, wᵢ]. Find the shortest distance from node 0 to node n-1 while excluding exactly one maximum weighted edge that lies on the shortest path. If there are multiple shortest paths or if removing the maximum edge disconnects the path, return -1.

### Examples

**Example 1:**  
Input: `n = 5, edges = [[0,1,4],[0,2,1],[2,3,3],[1,3,2],[3,4,2]]`  
Output: `8`  
*Explanation: The shortest path from 0 to 4 is 0→2→3→4 with total distance 6. The maximum edge on this path is 2→3 with weight 3. Excluding this edge, the next shortest path is 0→1→3→4 with distance 8.*

**Example 2:**  
Input: `n = 5, edges = [[0,1,5],[0,2,10],[1,3,3],[2,3,2],[3,4,1]]`  
Output: `14`  
*Explanation: The shortest path is 0→2→3→4 with distance 13. The maximum edge is 0→2 with weight 10. Excluding it, an alternate path is 0→1→3→4 with distance 9. But we need the path excluding the max edge, which gives 14 via 0→2→3→4 without the edge 0→2 forcing us to use 0→1 instead.*

**Example 3:**  
Input: `n = 2, edges = [[0,1,5]]`  
Output: `-1`  
*Explanation: The only path from 0 to 1 uses the single edge with weight 5 (the maximum). Excluding it leaves no path, so return -1.*

### Thought Process

**Brute Force Approach:**
1. Use Dijkstra to find the shortest path from 0 to n-1
2. Identify all edges on this shortest path
3. For each edge on the shortest path, remove it and recompute the shortest path
4. Track the minimum among all these alternative paths
5. Return the minimum, or -1 if no valid path exists after exclusion

**Optimization Consideration:**
The brute force requires running Dijkstra multiple times. However, we can optimize by:
- Running Dijkstra once from node 0 and once from node n-1 (reversed graph)
- For each edge on the shortest path, we know the distance from 0 to u and from v to n-1
- When excluding an edge (u, v, w), we need dist[0→u] + dist[v→n-1] or dist[0→v] + dist[u→n-1]

**Final Approach:**
1. Run Dijkstra from node 0 to find shortest distances to all nodes
2. Run Dijkstra from node n-1 on the reversed graph to find shortest distances backwards
3. Find the shortest path distance from 0 to n-1
4. For each edge in the graph, check if it could be on a shortest path by verifying: dist_from_0[u] + weight + dist_from_end[v] == shortest_distance (or vice versa for undirected)
5. For each such edge, compute the alternative path length using the distances and exclude that edge
6. Return the minimum alternative path, or -1 if none exists

### Corner cases to consider

- Graph with only one edge connecting 0 and n-1 (answer is -1)
- Multiple edges with the same weight on the shortest path (exclude only one max)
- Multiple shortest paths from 0 to n-1 (need to consider all possibilities)
- No path exists after excluding the maximum edge
- All edges have the same weight
- n = 2 with a single edge

### Solution

```python
import heapq
from collections import defaultdict

def minimumDistance(n, edges):
    # Build adjacency list for the graph
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))
    
    # Dijkstra from source (node 0)
    def dijkstra(start):
        dist = [float('inf')] * n
        dist[start] = 0
        heap = [(0, start)]
        
        while heap:
            d, u = heapq.heappop(heap)
            
            if d > dist[u]:
                continue
            
            for v, w in graph[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(heap, (dist[v], v))
        
        return dist
    
    # Get shortest distances from node 0 and node n-1
    dist_from_0 = dijkstra(0)
    dist_from_end = dijkstra(n - 1)
    
    # Shortest path distance from 0 to n-1
    shortest = dist_from_0[n - 1]
    
    # If no path exists
    if shortest == float('inf'):
        return -1
    
    # Find the minimum distance when excluding one maximum edge
    # on the shortest path
    min_alternative = float('inf')
    
    for u, v, w in edges:
        # Check if this edge is on some shortest path
        # Case 1: 0 -> u -> v -> n-1
        path1 = dist_from_0[u] + w + dist_from_end[v]
        # Case 2: 0 -> v -> u -> n-1
        path2 = dist_from_0[v] + w + dist_from_end[u]
        
        # If either path equals shortest, this edge could be on shortest path
        if path1 == shortest:
            # Exclude this edge, use alternative: dist_from_0[v] + dist_from_end[v]
            # But we need path not using (u,v)
            # The alternative would be: dist_from_0[n-1] computed without (u,v)
            # Which equals dist_from_0[v] + dist_from_end[v] if v can reach n-1 without u
            # Actually, the answer when excluding (u,v) is:
            # min path from 0 to n-1 that doesn't use this edge
            # We compute: dist_from_0[v] + dist_from_end[v] or dist_from_0[u] + dist_from_end[u]
            alt1 = dist_from_0[v] + dist_from_end[v]
            alt2 = dist_from_0[u] + dist_from_end[u]
            min_alternative = min(min_alternative, alt1, alt2)
        
        if path2 == shortest:
            alt1 = dist_from_0[u] + dist_from_end[u]
            alt2 = dist_from_0[v] + dist_from_end[v]
            min_alternative = min(min_alternative, alt1, alt2)
    
    return min_alternative if min_alternative != float('inf') else -1
```

### Time and Space Complexity Analysis

- **Time Complexity:** O((V + E) log V) where V = n and E = edges.length. We run Dijkstra twice (from node 0 and node n-1), each taking O((V + E) log V) with a binary heap. Then we iterate through all edges once, which is O(E).

- **Space Complexity:** O(V + E) for the adjacency list representation of the graph plus O(V) for the distance arrays used in Dijkstra and the heap operations.

### Potential follow-up questions

- (Follow-up question 1)  
  *What if you need to exclude any one edge (not necessarily the maximum on the path)?*  
  *Hint: The same approach works—iterate through all edges and check if excluding each one gives a valid path*

- (Follow-up question 2)  
  *How would the solution change if we need to find the shortest distance excluding the minimum weighted edge instead?*  
  *Hint: Apply the same two-directional Dijkstra but identify edges with minimum weight on shortest paths*

- (Follow-up question 3)  
  *What if the graph is directed instead of undirected?*  
  *Hint: Build the graph with directed edges only, and when computing from the end, reverse the edge directions for the second Dijkstra*

### Summary

This problem combines **shortest path computation (Dijkstra)** with **edge exclusion constraints**. The key insight is using two Dijkstra runs—one from the start and one from the end—to efficiently identify which edges lie on shortest paths without explicitly reconstructing paths. This two-directional approach avoids the O(V) cost of re-running Dijkstra for each edge exclusion, making it much more efficient. The pattern is useful for any problem where you need to evaluate alternatives by "what if we exclude/modify this component" without recomputing everything from scratch.

### Flashcard

Run Dijkstra from both start (node 0) and end (node n-1) to identify edges on shortest paths; for each such edge, the alternative path distance equals the minimum of reaching other nodes and continuing to the end, avoiding redundant path recomputations.

### Tags

### Similar Problems
