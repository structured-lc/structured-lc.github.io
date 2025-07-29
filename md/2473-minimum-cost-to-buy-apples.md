### Leetcode 2473 (Medium): Minimum Cost to Buy Apples [Practice](https://leetcode.com/problems/minimum-cost-to-buy-apples)

### Description  
You are given `n` cities numbered from 1 to n, connected by bidirectional roads (edges) with given costs. Each city has a known cost to buy an apple. You can start at any city \( i \), travel to another city \( j \) via a series of roads, buy exactly one apple there (paying its cost), and return back to city \( i \).  
The twist: on your return trip, the cost of traversing each road is multiplied by integer k (e.g., increased tolls after your purchase).  
Your task: For each starting city \( i \), compute the minimum total cost to *go buy* an apple somewhere (including there if you like) and return to \( i \), following the best possible path.

### Examples  

**Example 1:**  
Input:  
`n = 4`,  
`roads = [[1,2,4],[2,3,2],[2,4,5],[3,4,1],[1,3,4]]`,  
`appleCost = [56,42,102,301]`,  
`k = 2`  
Output:  
`[54,42,48,51]`  
*Explanation:*
- Start at city 1:  
  1 → 2 (cost 4), buy at city 2 (cost 42), return path is 2 → 1 (cost 4 × 2 = 8). Total: 4 + 42 + 8 = 54.
- Start at city 2:  
  Buy at city 2 directly (cost 42).
- Start at city 3:  
  3 → 2 (cost 2), buy at city 2 (cost 42), return 2 → 3 (2 × 2 = 4). Total: 2 + 42 + 4 = 48.
- Start at city 4:  
  4 → 3 (1) → 2 (2): total cost to 2 is 3. Buy at 2 (42). Reverse path costs: 2 → 3 (2 × 2 = 4), 3 → 4 (1 × 2 = 2), total 6. Total: 3 + 42 + 6 = 51.

**Example 2:**  
Input:  
`n = 3`,  
`roads = [[1,2,1],[2,3,3]]`,  
`appleCost = [10,20,30]`,  
`k = 1`  
Output:  
`[10,20,30]`  
*Explanation:*  
With k=1, there's no penalty for the return trip. The cheapest option for each city is just to buy at their own city (10, 20, 30).

**Example 3:**  
Input:  
`n = 2`,  
`roads = [[1,2,1000]]`,  
`appleCost = [1,2]`,  
`k = 4`  
Output:  
`[1,2]`  
*Explanation:*  
Although the road is expensive, it's still cheapest for both cities to just buy apples at their own city.

### Thought Process (as if you’re the interviewee)  

First, I observe that for each city i, I need the cost to reach any other city j, buy an apple there, and return, accounting for the increased return cost (each road on the return costs k times as much). The naive brute-force would be: for each i, try every possible j, compute shortest i→j and j→i paths (with different edge weights), and pick the minimal total. But that’s O(n²) Dijkstra runs, which is slow for large n.

**Optimization:**  
Notice:
- Returning along the same path as the outbound makes calculations predictable (though not always optimal, but it's safe due to non-negative edge weights).
- We can precompute, for every i, the cheapest path costs to all j (using standard Dijkstra with normal edge weights).
- Separately, precompute for every i, the cost to all j with edge costs multiplied by k (Dijkstra again; think of edge weights as cost × k).

So for each starting city i:
- For every possible apple city j:
    - outbound = cost to go from i to j (with original edge weights)
    - inbound = cost to go from j to i (with k-inflated edge weights)
    - total = outbound + appleCost[j] + inbound
    - minimum over all j

But to optimize further, since all graphs are undirected, and k ≥ 1, the optimal apple-buying city is often the cheapest accessible after cost inflation.  
Solution boils down to:  
- For each city j, run Dijkstra twice: once with normal edge weights (for the outbound leg from every i to j), once with edge weights multiplied by k (for the return).

Final process:
- For each city, compute shortest-to-all (normal weights), and shortest-from-all (k× weights).
- For each city i, answer[i] = min over all j of (normal[i][j] + appleCost[j] + k×[j][i]).

### Corner cases to consider  
- Only one city (should not need to travel).
- No roads at all (each city can only buy at itself).
- Multiple apples have the exact same minimum cost.
- Large k values (which may make it never worth traveling).
- Roads with zero or very large cost.
- Disconnected graphs (where some cities can't reach others: must only buy at reachable cities).
- Edge cases where k=1 (outbound and inbound are equal).

### Solution

```python
import heapq

def minimumCost(n, roads, appleCost, k):
    # n: number of cities, labeled 1..n
    # roads: list of [u, v, cost], 1-based
    # appleCost: list of n elements, appleCost[i] is for city (i+1)
    # k: multiplier for return trip
    
    # Build adjacency list (0-based)
    adj = [[] for _ in range(n)]
    for u, v, cost in roads:
        adj[u - 1].append( (v - 1, cost) )
        adj[v - 1].append( (u - 1, cost) )
    
    # Dijkstra's algorithm for single-source shortest distances
    def dijkstra(start, weight_multiplier=1):
        dist = [float('inf')] * n
        dist[start] = 0
        heap = [(0, start)]
        while heap:
            curr_cost, u = heapq.heappop(heap)
            if curr_cost > dist[u]:
                continue
            for v, c in adj[u]:
                new_cost = curr_cost + c * weight_multiplier
                if new_cost < dist[v]:
                    dist[v] = new_cost
                    heapq.heappush(heap, (new_cost, v))
        return dist

    # For each city compute shortest distances to every other (normal weights)
    shortest_normal = [dijkstra(i, 1) for i in range(n)]
    # For each city compute shortest distances (k× weights)
    shortest_k = [dijkstra(i, k) for i in range(n)]

    ans = []
    for i in range(n):
        min_total = float('inf')
        for j in range(n):
            outbound = shortest_normal[i][j]
            inbound = shortest_k[j][i]
            total = outbound + appleCost[j] + inbound
            min_total = min(min_total, total)
        ans.append(min_total)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each city, Dijkstra’s algorithm takes O((E + n) log n). We run it 2n times (once for each starting city with two weightings), so overall time is O(n(E + n) log n).  
  (E is number of roads; n is number of cities.)

- **Space Complexity:**  
  We store two n×n tables for distances (normal, multiplied), so O(n²) space, plus O(E + n) for adjacency list and Dijkstra’s heap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if roads can be one-way instead of bidirectional?  
  *Hint: Adjust adjacency structure: treat them as directed edges in Dijkstra.*

- How to handle graphs where some cities are unreachable from others?  
  *Hint: Check for infinite distances. Ensure you only compare reachable pairs.*

- Suppose k changes per road, not globally. How would you adapt your approach?  
  *Hint: Two different edge-weight mappings: outbound uses costs as normal, inbound uses road-specific k multipliers.*

### Summary
This problem uses a classic **graph shortest path** pattern, but requires *two passes* with different cost regimes (normal vs. return with inflation). The main pattern is **multi-source Dijkstra with customized edge weights**, and combining the outbound/inbound paths for each city. This approach is similar to problems involving round-trip or asymmetric travel costs, and is especially relevant for questions with "return trip" penalties or benefits, e.g., package delivery with tolls, or cost-splitting over flexible paths.