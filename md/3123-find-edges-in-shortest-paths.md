### Leetcode 3123 (Hard): Find Edges in Shortest Paths [Practice](https://leetcode.com/problems/find-edges-in-shortest-paths)

### Description  
Given an undirected, weighted graph with n nodes (numbered 0 to n-1) and a list of m edges — each edge given as `[a, b, w]` meaning edge between nodes `a` and `b` of weight `w` — find all the edges that are part of at least one shortest path from node 0 to node n-1. 
Return a boolean array `answer` where `answer[i]` is `True` if edge `edges[i]` is on **any** shortest path from `0` to `n-1`, else `False`.
Note: The graph may be disconnected, i.e., there may be no path from 0 to n-1.

### Examples  

**Example 1:**  
Input:  
``n = 6, edges = [[0,1,4],[0,2,1],[1,3,2],[1,4,3],[1,5,1],[2,3,1],[3,5,3],[4,5,2]]``  
Output:  
``[True, True, False, False, True, True, False, False]``  
Explanation.  
Shortest distance from 0 to 5:  
Paths with total weight 4:  
- 0-2-3-5 (via edges 1,5,6) of length 1+1+3 = 5  
- 0-2-3-1-5 (via edges 1,5,2,4) is 1+1+2+1 = 5, etc.
But shortest 0-5 path is 0-2-3-5 (edges 1,5,6), but edge indices refer to the original position. For all paths that match length 4, mark edges used.

**Example 2:**  
Input:  
``n = 3, edges = [[0,1,2],[1,2,2],[0,2,5]]``  
Output:  
``[True, True, False]``  
Explanation.  
Shortest path: 0-1-2 with total weight 4. Edge [0,2,5] is not part of any shortest path.

**Example 3:**  
Input:  
``n = 4, edges = [[0,1,1],[2,3,2]]``  
Output:  
``[False, False]``  
Explanation.  
No path exists from 0 to 3, so answer for all edges is False.

### Thought Process (as if you’re the interviewee)  

First, let's clarify: for each edge, we need to check if it lies on any shortest path from node 0 to n-1. Not all edges on *any* path, only those specifically involved in one or more shortest paths.

**Brute-force approach:**  
- Generate all paths from 0 to n-1; find all that are shortest.
- For each such path, mark all edges involved.
- Too slow: number of paths might be exponential.

**Optimized approach:**  
- Use Dijkstra’s algorithm to get the shortest distance from 0 to all nodes (`dist_from_start`).
- To check if an edge (u,v,w) is part of a shortest path, observe:
    - If there is a shortest path where 0→u, then use edge u→v (of weight w), then v→n-1, whose total equals the shortest distance from 0 to n-1.
    - So, compute shortest distance from n-1 **to** all nodes (`dist_from_end`).

For each edge (u, v, w):
- Check if  
   `dist_from_start[u] + w + dist_from_end[v] == shortest_distance`
   **or**
   `dist_from_start[v] + w + dist_from_end[u] == shortest_distance`  
   If so, mark edge as used.

Choice: Dijkstra’s algorithm twice, since all weights ≥ 0.  
Trade-off: O(M log N) for each Dijkstra, acceptable for tight constraints.

### Corner cases to consider  
- No path from 0 to n-1 (return all False).
- Multiple paths of same shortest length.
- Edge directly connects 0 and n-1.
- Edges with same endpoints but different weights.
- Disconnected graph.
- Single node graph.
- Loops/self-edges (should not exist, but must handle gracefully).

### Solution

```python
def findAnswer(n, edges):
    # Step 1: Build the adjacency list
    from collections import defaultdict
    import heapq

    graph = defaultdict(list)
    for idx, (u, v, w) in enumerate(edges):
        graph[u].append((v, w))
        graph[v].append((u, w))

    def dijkstra(start):
        # Returns list: distance[i] = shortest distance from start to i
        dist = [float('inf')] * n
        dist[start] = 0
        pq = [(0, start)]
        while pq:
            curr_d, u = heapq.heappop(pq)
            if curr_d > dist[u]:
                continue
            for v, w in graph[u]:
                if dist[v] > curr_d + w:
                    dist[v] = curr_d + w
                    heapq.heappush(pq, (dist[v], v))
        return dist

    # Dijkstra from 0 to all nodes
    dist_from_start = dijkstra(0)
    # Dijkstra from n-1 to all nodes
    dist_from_end = dijkstra(n-1)
    min_dist = dist_from_start[n-1]
    
    answer = [False] * len(edges)
    for idx, (u, v, w) in enumerate(edges):
        # Check both directions, since graph is undirected
        if (dist_from_start[u] + w + dist_from_end[v] == min_dist or
            dist_from_start[v] + w + dist_from_end[u] == min_dist):
            answer[idx] = True
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M log N), where M is the number of edges and N is the number of nodes.  
  Justification: Dijkstra's algorithm is used twice (from 0 and from n-1). For each edge, we do O(1) check to see if it can appear in any shortest path.
- **Space Complexity:** O(M + N), for the adjacency list and distance arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph was directed?
  *Hint: You only need to perform the backwards Dijkstra on the transpose (reverse edges) graph.*

- Can you reconstruct **all** distinct shortest paths, not just mark edges?
  *Hint: You'd need to store parents/predecessors for all minimal distance relaxations, and use BFS/DFS to enumerate unique shortest paths.*

- How would you handle negative edge weights?
  *Hint: Dijkstra is not safe; Bellman-Ford is needed. (But beware: with negative cycles, shortest paths might not exist.)*

### Summary
This problem applies the **Shortest Path** pattern; specifically, Dijkstra's algorithm to compute minimum distances from both start and end nodes. We use these distances to efficiently identify all edges lying on at least one shortest path, checking each in O(1). This approach is widely applicable to problems concerning all shortest routes in a positive-weight undirected graph (like alternative route tracking, logistics/checkpoint audit, etc).

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
