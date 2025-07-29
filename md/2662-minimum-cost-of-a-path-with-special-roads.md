### Leetcode 2662 (Medium): Minimum Cost of a Path With Special Roads [Practice](https://leetcode.com/problems/minimum-cost-of-a-path-with-special-roads)

### Description  
Given a start position and a target position on an infinite grid, you can move one step in any of the four cardinal directions at a cost of 1 per step (Manhattan distance). You are also given a list of special roads. Each special road allows you to travel from one specific position to another at a preset cost (not necessarily the Manhattan distance cost). You can use any special road any number of times. Determine the minimum cost required to reach the target position from the start, considering both regular grid moves and any special roads.

### Examples  

**Example 1:**  
Input: `start = [1,2], target = [3,3], specialRoads = [[1,2,3,3,2]]`  
Output: `2`  
*Explanation: Taking the special road directly from (1,2) to (3,3) costs only 2.*

**Example 2:**  
Input: `start = [3,1], target = [7,3], specialRoads = [[3,1,4,2,2], [4,2,7,3,3]]`  
Output: `5`  
*Explanation: Use the first special road from (3,1) to (4,2) for cost 2, then the second from (4,2) to (7,3) for cost 3. Total cost = 2 + 3 = 5.*

**Example 3:**  
Input: `start = [1,1], target = [10,10], specialRoads = []`  
Output: `18`  
*Explanation: No special roads. The cost is the Manhattan distance: |10-1| + |10-1| = 9+9=18.*

### Thought Process (as if you’re the interviewee)  
First, the simplest way is to just use Manhattan distance from start to target. But with special roads, we can sometimes do better.  
If we use any special road between its endpoints, we only pay the provided cost for that path, regardless of the Manhattan distance between its endpoints.

We can think of this as a graph where:
- Nodes: start, target, and all special road endpoints.
- Edges: 
    - Manhattan distance between any two positions (could be costly).
    - Special road edges (with their given costs).

But searching over the whole infinite grid is not practical. Instead, focus on just the start, target, and endpoints of all special roads.  
This reduces the number of positions to consider.

Approach:
- Treat positions (start, target, special endpoints) as nodes.
- Use Dijkstra’s algorithm starting from the start position.
    - For each node, consider moving by:
        - Taking a special road from its start (if current position matches);
        - Walking from current node to any other special road starting point or directly to the target using Manhattan distance.
- Stop when target is reached with the lowest cost.

This efficiently finds the minimum path, as we only need to consider a small fixed set of nodes and transitions.

### Corner cases to consider  
- No special roads given: Output is Manhattan distance.
- Special roads that do not improve cost (costly or pointless routes).
- Special roads connecting points not helpful towards the target.
- Start or target position coincides with a special road endpoint.
- Multiple special roads can be chained for an optimal path.

### Solution

```python
import heapq

def minimumCost(start, target, specialRoads):
    # Helper to compute manhattan distance
    def manhattan(a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    # Collect all key points: start, target, and all special road endpoints
    key_points = set()
    key_points.add(tuple(start))
    key_points.add(tuple(target))
    for x1, y1, x2, y2, _ in specialRoads:
        key_points.add((x1, y1))
        key_points.add((x2, y2))
    
    # Assign each key point an index for easier access
    points = list(key_points)
    idx = {p: i for i, p in enumerate(points)}
    
    # Build neighbors: for each key point, edges are
    # - walking to any other key point [cost: manhattan distance]
    # - take any special road starting at p [cost: special road cost, destination is the road's end]
    neighbors = [[] for _ in points]
    # Walking edges
    for i, pi in enumerate(points):
        for j, pj in enumerate(points):
            if i != j:
                neighbors[i].append((j, manhattan(pi, pj)))
    # Special roads as edges
    for x1, y1, x2, y2, cost in specialRoads:
        i = idx[(x1, y1)]
        j = idx[(x2, y2)]
        # Special road overrides walking if cheaper
        neighbors[i].append((j, cost))
    
    # Dijkstra's algorithm: cost from start to all points
    INF = float('inf')
    dist = [INF] * len(points)
    start_idx = idx[tuple(start)]
    target_idx = idx[tuple(target)]
    dist[start_idx] = 0
    hq = [(0, start_idx)]
    
    while hq:
        cur_cost, u = heapq.heappop(hq)
        if cur_cost > dist[u]:
            continue
        # Early stopping
        if u == target_idx:
            return cur_cost
        for v, cost in neighbors[u]:
            new_cost = cur_cost + cost
            if new_cost < dist[v]:
                dist[v] = new_cost
                heapq.heappush(hq, (new_cost, v))
    return dist[target_idx]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n² log n) where n is the number of unique points among the start, target, and all special road endpoints. Each point can connect to up to n-1 other points (by walking), and Dijkstra’s over n nodes with O(n²) edges costs O(n² log n) in total.

- **Space Complexity:**  
  O(n²) for the adjacency list of neighbors, and O(n) for storing distances and the heap. n is as above.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose coordinates can be very large, but the number of special roads remains small.  
  *Hint: Do we ever need to enumerate over all possible grid points?*

- How would your approach change if you could only use each special road once?  
  *Hint: Can you keep track of used roads in your state representation?*

- What if some special roads only work in one direction, or have negative cost?  
  *Hint: Is Dijkstra’s valid for graphs with negative-cost edges?*

### Summary
This problem is a classic example of **shortest path on a grid with special edges**, optimized by only considering essential nodes (via special roads).  
The core coding pattern is **Dijkstra’s algorithm** applied to a dynamic graph structure defined by key positions and special routes.  
This approach is general and can be applied to other shortest-path problems where movement is cheap and “teleport”/special moves supplement with varying cost.