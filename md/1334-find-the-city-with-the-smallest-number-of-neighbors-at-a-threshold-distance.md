### Leetcode 1334 (Medium): Find the City With the Smallest Number of Neighbors at a Threshold Distance [Practice](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance)

### Description  
Given a graph with n cities (0 to n−1) and bidirectional edges (each with a cost/distance), find the city with the smallest number of other cities reachable within a given threshold distance t. If multiple cities have the same minimal reachable count, return the city with the **greatest index**.

### Examples  
**Example 1:**  
Input: `n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4`  
Output: `3`  
*Explanation: Shortest distances from each node: 0 can reach 1 (3), 2 (4); 1 can reach 0 (3), 2 (1), 3 (4); 2 can reach 1 (1), 3 (1), 0 (4); 3 can reach 2 (1), 1 (4). Node 3 can reach 2 and 1 (<=4), so 2 reachable. Cities 0 and 3 tie (2 neighbors), but 3 has greater index.*

**Example 2:**  
Input: `n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2`  
Output: `0`  
*Explanation: Node 0 can only reach 1 (2).*

### Thought Process (as if you’re the interviewee)  
- The core task is to compute, for every city, how many other cities are reachable with path cost ≤ threshold.
- Since graph is small (n ≤ 100), can use Floyd-Warshall to compute all-pairs shortest paths.
- For each city, count how many cities are in threshold.
- If there's a tie, return the city with greatest number.

### Corner cases to consider  
- Disconnected nodes.
- Edge weights equal to threshold.
- Multiple nodes have same minimum reachable count.
- Single node (answer is 0).

### Solution

```python
from typing import List

def findTheCity(n: int, edges: List[List[int]], distanceThreshold: int) -> int:
    # Initialize distance matrix
    INF = float('inf')
    dist = [[INF] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = min(dist[u][v], w)
        dist[v][u] = min(dist[v][u], w)
    # Floyd-Warshall all-pairs shortest paths
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][j] > dist[i][k] + dist[k][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    # Now find city with smallest neighbor count <= threshold
    res_city = -1
    min_neighbors = float('inf')
    for city in range(n):
        count = 0
        for nb in range(n):
            if city != nb and dist[city][nb] <= distanceThreshold:
                count += 1
        if count <= min_neighbors:
            min_neighbors = count
            res_city = city
    return res_city
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³) (Floyd-Warshall triple nested loop; fine for n ≤ 100).
- **Space Complexity:** O(n²) (distance matrix to hold all-pairs shortest paths).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is very sparse but large (n up to 10⁴)?  
  *Hint: Use Dijkstra for each city instead of FW; reduce space/time.*

- How to return the actual list of reachable cities for the answer node?  
  *Hint: Store the list/sorted order during counting phase.*

- If edge weights can be negative (no negative cycles), how does your approach change?  
  *Hint: Floyd-Warshall still works for negative edges!*  

### Summary
This is a classic application of the **all-pairs shortest path** algorithm (Floyd-Warshall) for small graphs, then picking minimum by a custom key. The counting + tie-breaking step is also common in similar aggregate neighbor problems.