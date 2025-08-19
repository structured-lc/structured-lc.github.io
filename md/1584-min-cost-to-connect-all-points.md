### Leetcode 1584 (Medium): Min Cost to Connect All Points [Practice](https://leetcode.com/problems/min-cost-to-connect-all-points)

### Description  
Given n points in the plane, return the minimum cost to connect all points using only horizontal/vertical lines. The cost between any two points is their Manhattan distance: |x₁-x₂| + |y₁-y₂|. The result forms a minimum spanning tree (MST) of the points, connecting them at least once.

### Examples  
**Example 1:**  
Input: `points = [[0,0],[2,2],[3,10],[5,2],[7,0]]`  
Output: `20`  
*Explanation: Connect points with cost sum 20 (by MST — see problem for step-by-step connections).*  

**Example 2:**  
Input: `points = [[3,12],[-2,5],[-4,1]]`  
Output: `18`  
*Explanation: Minimum connecting cost = 18.*

### Thought Process (as if you’re the interviewee)  
- The brute-force solution is to consider all possible ways to connect points (which is factorial and infeasible). But the task reduces to building a minimum spanning tree in a graph with edge weight as Manhattan distance.
- Two classical algorithms: Kruskal's or Prim's. For dense graphs, Prim's is efficient: start at any node, grow the MST by adding the closest unconnected point at every step.
- Use a min-heap or array to pick the lowest cost next point.
- Keep track of connected/unconnected status for each node.

### Corner cases to consider  
- All points at same position: zero cost.
- Points in line, or duplicate points.
- Minimum of 2 points.

### Solution

```python
import heapq

def minCostConnectPoints(points):
    n = len(points)
    visited = [False] * n
    min_dist = [float('inf')] * n
    min_dist[0] = 0
    total_cost = 0
    for _ in range(n):
        u = -1
        for v in range(n):
            if not visited[v] and (u == -1 or min_dist[v] < min_dist[u]):
                u = v
        total_cost += min_dist[u]
        visited[u] = True
        for v in range(n):
            if not visited[v]:
                dist = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                if dist < min_dist[v]:
                    min_dist[v] = dist
    return total_cost
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²), as we check all pairs in each step for nearest point updates.
- **Space Complexity:** O(n), for visited and min_dist arrays (no explicit edge lists needed).

### Potential follow-up questions (as if you’re the interviewer)  
- How would you speed this up for huge n?  
  *Hint: Could you avoid O(n²) comparisons?*

- How would the solution change for Euclidean distances?  
  *Hint: Use sqrt distance for cost comparison.*

### Summary
This is a classic Minimum Spanning Tree (MST) problem under Manhattan metric. Prim's algorithm is used here (greedy), and the method is broadly applicable in network design, circuits, and transportation.

### Tags
Array(#array), Union Find(#union-find), Graph(#graph), Minimum Spanning Tree(#minimum-spanning-tree)

### Similar Problems
- Minimum Number of Lines to Cover Points(minimum-number-of-lines-to-cover-points) (Medium)