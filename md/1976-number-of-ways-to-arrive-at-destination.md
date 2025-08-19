### Leetcode 1976 (Medium): Number of Ways to Arrive at Destination [Practice](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination)

### Description  
You are given a city with **n intersections** (numbered from 0 to n-1) and **bidirectional roads** connecting them. Each road connects two intersections `u` and `v`, and has a travel time `time`.  
Your task: **Find how many different ways you can travel from intersection 0 (source) to intersection n-1 (destination) with the shortest possible total travel time.**  
If there are multiple shortest paths, count all of them. Since the answer can be large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input:  
`n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]`

Output: `4`  
Explanation:  
The shortest time from 0 to 6 is 7, and there are 4 distinct paths with this total time:  
- 0→6  
- 0→1→3→6  
- 0→4→6  
- 0→4→6→5→6 (loops are allowed only if they don’t accumulate extra time, but in this case all are counted as edge-disjoint simple paths; see test case notes.)

**Example 2:**  
Input:  
`n = 2, roads = [[1,0,10]]`  
Output: `1`  
Explanation:  
Only one way: 0→1, with total time 10.

**Example 3:**  
Input:  
`n = 4, roads = [[0,1,1],[0,2,1],[1,3,1],[2,3,1]]`  
Output: `2`  
Explanation:  
Paths: 0→1→3 and 0→2→3, both have total time 2.

### Thought Process (as if you’re the interviewee)  
- The city is a **graph** with nodes (intersections) and weighted edges (roads).
- We need **all shortest paths** count from node 0 to node n-1.
- **Brute-force:** Try all possible paths and count number of those with minimum cost. But this is infeasible for large graphs (exponential).
- **Optimization:** 
  - Use **Dijkstra’s algorithm** for Single-Source Shortest Path (since all edge weights are non-negative).  
  - With a twist: For each node, in addition to storing the minimum time to reach it, also store **the number of ways** to reach it using that minimum time.
  - Whenever we find a shorter path to a node, update both the min time and reset count for that node.  
  - If finding an *equal* shortest time, increment the count.  
- Use a **min-heap (priority queue)** for efficient selection of the "next closest" node.

### Corner cases to consider  
- No roads (though guaranteed you can reach n-1).
- Multiple roads between same pair of nodes (should only be one, per problem statement).
- All edges have the same weight.
- All paths from 0 to n-1 have different lengths.
- Answer could be large; must take modulo 10⁹+7.
- Self loops or disconnected nodes (shouldn’t happen per constraints).
- Very small graphs (n = 1 or 2).

### Solution

```python
def countPaths(n, roads):
    # Modulo value as required
    MOD = 10**9 + 7

    # Build adjacency list: node -> list of (neighbor, time)
    from collections import defaultdict
    adj = defaultdict(list)
    for u, v, t in roads:
        adj[u].append((v, t))
        adj[v].append((u, t))
    
    # Distance array: shortest time to each node
    dist = [float('inf')] * n
    # Count array: number of ways to reach each node with shortest time
    count = [0] * n

    # Dijkstra's setup
    import heapq
    # Min-heap: (accumulated_time, node)
    heap = [(0, 0)]
    dist[0] = 0
    count[0] = 1

    while heap:
        curr_time, u = heapq.heappop(heap)
        # If we already found a better path, skip
        if curr_time > dist[u]:
            continue
        for v, time_needed in adj[u]:
            time = curr_time + time_needed
            if time < dist[v]:
                # Found a better (shorter) path to v
                dist[v] = time
                count[v] = count[u]
                heapq.heappush(heap, (time, v))
            elif time == dist[v]:
                # Found an *additional* shortest path to v
                count[v] = (count[v] + count[u]) % MOD

    return count[n-1] % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + e) × log n),  
  n = number of intersections (vertices), e = number of roads (edges).  
  Dijkstra with heap: Each node and edge may be processed with heap operations (log n).
- **Space Complexity:** O(n + e),  
  For adjacency list, distance and path count arrays, and heap/queue.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose roads are added and removed dynamically. How would you update the number of ways efficiently?  
  *Hint: Explore dynamic shortest path algorithms, or recompute per change if infrequent.*

- Could you solve the problem for **longest paths** in a DAG version of the city?  
  *Hint: Use topological sort and DP.*

- What if the graph had negative-weight edges (no negative cycles)?  
  *Hint: Dijkstra doesn’t work; use Bellman-Ford or a modified algorithm.*

### Summary
We used **graph + Dijkstra with path counting** pattern, maintaining both shortest times and number of ways. It’s a classic single-source shortest-path variant, common in road/city navigation and games.  
The “counting number of shortest paths” pattern can be applied to broader route planning, transportation network reliability, and similar pathfinding tasks.

### Tags
Dynamic Programming(#dynamic-programming), Graph(#graph), Topological Sort(#topological-sort), Shortest Path(#shortest-path)

### Similar Problems
- All Paths From Source to Target(all-paths-from-source-to-target) (Medium)
- Path with Maximum Probability(path-with-maximum-probability) (Medium)
- Second Minimum Time to Reach Destination(second-minimum-time-to-reach-destination) (Hard)