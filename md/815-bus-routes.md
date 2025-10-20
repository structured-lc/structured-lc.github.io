### Leetcode 815 (Hard): Bus Routes [Practice](https://leetcode.com/problems/bus-routes)

### Description  
You are given a list where each element represents a bus route: `routes[i]` is a list of bus stops for the iᵗʰ bus, cycling indefinitely. You start at a given `source` bus stop and need to reach a `target` stop, only traveling by bus (no walking). At each stop, you can take any bus that stops there or transfer between buses at shared stops.  
Your task is to find the **minimum number of buses** needed to get from source to target, or return -1 if it is impossible.

### Examples  

**Example 1:**  
Input: `routes = [[1,2,7],[3,6,7]], source = 1, target = 6`  
Output: `2`  
Explanation: Take the first bus from stop 1 to 7, then switch to the second bus at stop 7 to reach 6.

**Example 2:**  
Input: `routes = [[7,12],[4,5,15],,[15,19],[9,12,13]], source = 15, target = 12`  
Output: `-1`  
Explanation: There is no combination of buses to get from stop 15 to stop 12, so return -1.

**Example 3:**  
Input: `routes = [[1,5,7],[3,6,7],[10,11]], source = 3, target = 10`  
Output: `-1`  
Explanation: No sequence of buses links those stops.

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Try every possible combination of buses from source to target. This would be computationally infeasible due to the massive search space.
- **Graph approach:**  
  - Treat each **bus route as a node** in a graph. Two nodes share an edge if the routes have a common stop—they are transfer points.
  - Alternatively, think of stops as nodes and routes as edges, but this will explode the graph size.
- **Optimized solution:**  
  - Map each **stop** to all the **routes** containing that stop (quick lookup).
  - Use **BFS** starting from the source stop:  
    - At each step, consider all bus routes passing through the current stop.
    - Enqueue all unvisited stops from that route.
    - Track the number of bus changes (levels of BFS = count of buses taken).
    - Avoid revisiting routes to prevent infinite loops.
  - BFS ensures we find the shortest path (minimum bus changes) to target.
- **Trade-offs:**  
  - Adjacency map for stops vs. routes for O(1) transfer lookup.
  - BFS guarantees optimality & reasonable performance due to possible pruning (tracking visited).

### Corner cases to consider  
- source == target: Return 0 (no bus needed).
- Source or target stop not present in any route.
- Disconnected bus groups: Cannot reach target (return -1).
- Multiple routes pass through source or target (correct use of BFS is essential).
- Redundant stops or duplicated bus routes.

### Solution

```python
from collections import defaultdict, deque

def numBusesToDestination(routes, source, target):
    if source == target:
        return 0
    
    # Map each stop to all buses (indices) that pass through it
    stop_to_routes = defaultdict(set)
    for i, route in enumerate(routes):
        for stop in route:
            stop_to_routes[stop].add(i)
    
    # Queue of (stop, buses_taken_so_far)
    queue = deque()
    queue.append((source, 0))
    
    visited_stops = set([source])      # Stops already visited
    visited_routes = set()             # Routes already used
    
    while queue:
        curr_stop, buses = queue.popleft()
        # For every route passing through this stop
        for route_i in stop_to_routes[curr_stop]:
            if route_i in visited_routes:
                continue
            visited_routes.add(route_i)
            for next_stop in routes[route_i]:
                if next_stop == target:
                    return buses + 1
                if next_stop not in visited_stops:
                    visited_stops.add(next_stop)
                    queue.append((next_stop, buses + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × K) where N is number of bus routes and K is the maximum stops per route.  
  - We may visit all stops across all routes in the worst case.
- **Space Complexity:** O(N × K) for the stop_to_routes map, visited sets, and the queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a transfer between buses takes time, and we want to minimize total time instead of bus changes?  
  *Hint: Consider Dijkstra's algorithm where each edge has a weight (time to transfer).*

- How would you handle dynamically changing routes (real-time add/remove)?  
  *Hint: Efficiently update stop-to-route mappings, perhaps using dynamic data structures or invalidation.*

- What if some stops are unreachable (no buses go there), or we want to report all minimum-bus paths?  
  *Hint: Track all parents in BFS, and reconstruct paths after.*

### Summary

This solution uses **BFS on a graph constructed from bus stops and routes**, mapping stops to possible bus routes for efficient transfer checks. The pattern—multi-source BFS with state (count of buses taken)—is common in shortest-path transportation network problems.  
This approach generalizes to any transfer minimization scenario, such as flights, trains, or any multi-stage routing problem.


### Flashcard
Model routes as a graph where nodes are bus routes; use BFS from all routes containing the source stop to reach any route with the target stop.

### Tags
Array(#array), Hash Table(#hash-table), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Minimum Costs Using the Train Line(minimum-costs-using-the-train-line) (Hard)