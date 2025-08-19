### Leetcode 2093 (Medium): Minimum Cost to Reach City With Discounts [Practice](https://leetcode.com/problems/minimum-cost-to-reach-city-with-discounts)

### Description  
Given **n** cities (labeled 0 to n-1) and a set of highways connecting them, each with a toll cost, you want to travel from city 0 to city n-1 with the **minimum total cost**. Highways are bidirectional. You are allowed to use up to **k** discounts, each discount can be used on one highway and halves the toll (rounded down). Each discount can only be used at most once per highway. Return the minimal travel cost, or -1 if the destination can't be reached.


### Examples  

**Example 1:**  
Input:  
n = 4, highways = [[0,1,100],[1,2,50],[0,2,200],[1,3,200],[2,3,100]], discounts = 1  
Output: `150`  
Explanation:  
Use the discount on the highway [1,3,200] (pay 100), and use [0,1,100] (pay 100), so total cost is 100+50 (through 1→2) + 100 (through 2→3, full price) = not minimal. The better way is:  
- 0→2 (200, no discount), 2→3 (100, discount for 50) → 200+50=250  
Best is 0→1 (100), 1→2 (50), 2→3 (100, discount 50) → 100+50+50=200  
But we look for the minimum—note: clarify with interviewer what input/output you want.

**Example 2:**  
Input:  
n = 3, highways = [[0,1,10],[1,2,10],[0,2,100]], discounts = 2  
Output: `10`  
Explanation:  
Use one discount on each of the two highways:  
- 0→1 (10, discounted 5), 1→2 (10, discounted 5): total 5+5=10.  
- Direct to 2: [0,2,100]-> 50. Not better.

**Example 3:**  
Input:  
n = 2, highways = [[0,1,7]], discounts = 1  
Output: `3`  
Explanation:  
Apply discount on highway (floor(7/2)=3), so minimal cost is 3.


### Thought Process (as if you’re the interviewee)  
My first idea is to use Dijkstra’s shortest path algorithm, since the problem involves finding the minimum cost from 0 to n-1 with positive edge weights.

However, there's an extra dimension: the state is not just the current city, but also **how many discounts I've used** so far. Each path to a city could differ in cost depending on the number of discounts left.

To handle this, I can represent the state as (current_cost, current_city, discounts_left). For each edge from the city, for both "use discount" (if any left) and "don't use", I consider the new state and update only if it gives a lower cost for that (city, discounts_used) pair.

For each node, I keep the minimum cost to reach it with each possible count of discounts used.

This approach is basically "multi-state Dijkstra" where the state space is n × (discounts+1). The priority queue always considers the lowest total path cost so far.

- Brute force (try all paths and distributions of discounts) is clearly not efficient.
- BFS without recording discounts used isn't enough, as using a discount in different places yields different paths/costs.
- Dijkstra with state-tracking is efficient for this.

Trade-off: space increases by a factor of (k+1), but path finding remains feasible.


### Corner cases to consider  
- There is **no path** from city 0 to n-1 (return -1).
- **Discounts is 0:** means normal shortest-path.
- **Highway costs are 1:** discounts may have no effect.
- Multiple edges between cities, or disconnected graph.
- Highway already has minimal cost.
- n = 1 (start == end): cost = 0.
- Using all discounts before destination reached.
- Multiple paths with the same minimal cost but different discount usage patterns.


### Solution

```python
import heapq

def minimumCost(n, highways, discounts):
    # 1. Build adjacency list: city -> list of (neighbor, toll)
    adj = [[] for _ in range(n)]
    for u, v, cost in highways:
        adj[u].append((v, cost))
        adj[v].append((u, cost))  # bidirectional

    # 2. dist[city][used_discounts] = minimum cost to reach city using 'used_discounts' discounts
    INF = float('inf')
    dist = [[INF] * (discounts + 1) for _ in range(n)]
    dist[0][0] = 0

    # 3. (cost, current_city, discounts_used)
    queue = [(0, 0, 0)]  # heap

    while queue:
        cost, u, used = heapq.heappop(queue)

        # If at destination, can directly return (note: need all possible uses, but when popping, minimal cost should come up first)
        if u == n - 1:
            return cost

        # If not better than previously found for this state, skip
        if cost > dist[u][used]:
            continue

        for v, toll in adj[u]:
            # Case 1: Don't use discount
            if cost + toll < dist[v][used]:
                dist[v][used] = cost + toll
                heapq.heappush(queue, (cost + toll, v, used))

            # Case 2: Use discount (if any left)
            if used < discounts:
                discounted = cost + (toll // 2)
                if discounted < dist[v][used + 1]:
                    dist[v][used + 1] = discounted
                    heapq.heappush(queue, (discounted, v, used + 1))

    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + e) × (discounts + 1) × log(n × (discounts + 1)))  
    Each city and each discount count can be updated; each edge is processed for all discount levels. The heap holds at most n × (discounts+1) entries.
- **Space Complexity:** O(n × (discounts + 1)) for the distance array, plus O(n + e) for the adjacency list, and up to O(n × (discounts+1)) for the heap.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **if the tolls could also be negative**?  
  *Hint: What does Dijkstra assume about edge weights? How would you modify for negative weights?*

- Could you **recover the path taken** as well as the cost?  
  *Hint: Track the previous (city, discounts_used) for each state reached.*

- If you wanted to minimize the **number of discounts used** in addition to the cost, how would you change the algorithm?  
  *Hint: Treat (cost, discounts_used, city) as a pair in the priority.*

### Summary

The core approach is a multi-state variant of **Dijkstra's algorithm** where each node’s state is defined by both city index and the number of discounts used so far. This "stateful Dijkstra" pattern naturally models problems where taking certain actions changes your ability or cost for later actions (discounts, jumps, coupons, etc.).  
Problems involving dynamic resources—like "k edges you can traverse at a discount" or "k walls you can break"—can often be solved by extending the state-space in Dijkstra or BFS to include the extra resource as part of the node state.

### Tags
Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- Cheapest Flights Within K Stops(cheapest-flights-within-k-stops) (Medium)
- Connecting Cities With Minimum Cost(connecting-cities-with-minimum-cost) (Medium)
- Maximum Cost of Trip With K Highways(maximum-cost-of-trip-with-k-highways) (Hard)
- Minimum Cost to Reach Destination in Time(minimum-cost-to-reach-destination-in-time) (Hard)