### Leetcode 787 (Medium): Cheapest Flights Within K Stops [Practice](https://leetcode.com/problems/cheapest-flights-within-k-stops)

### Description  
You are given n cities labeled from 0 to n-1, and a list of flights where each flight is represented as (fromᵢ, toᵢ, priceᵢ), meaning there is a direct flight from fromᵢ to toᵢ with cost priceᵢ. You are also given three integers: src (the starting city), dst (the destination), and k (the maximum number of stops allowed between src and dst, excluding the source and destination themselves). Find the cheapest price from src to dst with at most k stops.  
If there’s no such route within k stops, return -1.

### Examples  

**Example 1:**  
Input: n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1  
Output: `700`  
*Explanation: The optimal path with at most 1 stop is 0 → 1 → 3. The total cost is 100 + 600 = 700.*

**Example 2:**  
Input: n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=0  
Output: `500`  
*Explanation: You can only take direct flights since k=0. The cheapest direct flight from 0 to 2 costs 500.*

**Example 3:**  
Input: n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1  
Output: `200`  
*Explanation: You are allowed to have up to 1 stop, so you can take 0 → 1 → 2, with total cost 100 + 100 = 200.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths from src to dst, count the stops, and keep track of the cost. This quickly gets out of hand because the number of combinations explodes with the number of cities and stops.
- **Dijkstra's Algorithm:** Normally used for shortest path, but it doesn't easily handle the constraint on max number of stops, since standard Dijkstra can revisit nodes in fewer steps, which may not be valid here.
- **Bellman-Ford Algorithm:** This is a good fit since it can handle up to k edges. The process is to relax each flight up to k+1 times (representing up to k stops, i.e., k+1 flights). At each step, use a backup of the previous distances so that within an iteration the relaxations use the previous values, thus avoiding using an updated value created within that same iteration.
- **Why Bellman-Ford is preferred:** It’s simple to implement for this problem and naturally accommodates the stop constraint by running for k+1 rounds. The main trade-off is that it's less efficient than Dijkstra’s on sparse graphs, but for the constraint in this problem, it’s a strong choice[1][3][4].

### Corner cases to consider  
- No flights available at all (empty flights list).
- Source and destination are the same.
- No possible route from src to dst within k stops.
- Multiple flights between same cities with different prices.
- Flights are available but all require more than k stops.
- Flights where cost is 0.
- k = 0 (only direct flights allowed).
- n = 1 (only one city).

### Solution

```python
def findCheapestPrice(n, flights, src, dst, k):
    # Set up "infinity" for unreachable cities
    INF = float('inf')
    # Distance array: cheapest cost to each city
    dist = [INF] * n
    dist[src] = 0

    # Iterate k+1 times (k stops means k+1 flights)
    for stops in range(k + 1):
        # Use a copy so that changes in this round do not affect other relaxations
        prev_dist = dist[:]
        for from_city, to_city, cost in flights:
            if prev_dist[from_city] == INF:
                continue
            # If arriving at to_city from from_city is cheaper, relax the edge
            if dist[to_city] > prev_dist[from_city] + cost:
                dist[to_city] = prev_dist[from_city] + cost

    return dist[dst] if dist[dst] != INF else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × E), where E is the number of flights. Each iteration (up to k+1) processes all edges once.
- **Space Complexity:** O(n), where n is the number of cities. This is for the distance arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to return the actual flight path, not just the cost?  
  *Hint: Track predecessors for each city in every round and reconstruct the path at the end.*

- Can the graph contain cycles (for example, zero- or negative-cost cycles)?  
  *Hint: For flights with non-negative costs, cycles cannot decrease the total cost. If negative cost cycles are allowed, Bellman-Ford normally detects them, but the stop limit imposes a stricter bound here.*

- How would the approach change for a very large number of cities (n is large)?  
  *Hint: Consider using A* or a min-heap Dijkstra variant with (city, stops, cost) tuples and possibly pruning less promising paths.*

### Summary  
This problem demonstrates a modified **Bellman-Ford** dynamic programming approach for shortest path with bounded stops—a variation not directly handled by Dijkstra’s algorithm because of the extra constraint. The technique of iterating k+1 times and using backup arrays ensures correctness under the stop constraint. This pattern is commonly used in **"shortest path with extra constraints"** problems, appearing in networking and itinerary-planning contexts.

### Tags
Dynamic Programming(#dynamic-programming), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- Maximum Vacation Days(maximum-vacation-days) (Hard)
- Minimum Cost to Reach City With Discounts(minimum-cost-to-reach-city-with-discounts) (Medium)