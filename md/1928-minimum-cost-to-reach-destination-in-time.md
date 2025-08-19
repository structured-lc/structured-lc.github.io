### Leetcode 1928 (Hard): Minimum Cost to Reach Destination in Time [Practice](https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time)

### Description  
Given n cities (0-indexed), connected by bi-directional roads described in edges. Each edge is [x, y, time], indicating the time to travel from city x to y. Every city has a passing fee (passingFees[i]). Starting at city 0, you want to reach city n-1 in at most maxTime minutes, paying the fee at each city you visit (including start and end). Return the minimum total fee if you can reach the destination within maxTime, otherwise return -1.

### Examples  

**Example 1:**  
Input: `maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]`  
Output: `11`  
*Explanation: Path 0 → 1 → 2 → 5 takes 10+10+10 = 30 minutes. Passing fees sum up to 5+1+2+3=11.*

**Example 2:**  
Input: `maxTime = 29, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]`  
Output: `48`  
*Explanation: Only path within 29 minutes is 0 → 3 → 4 → 5, which takes 1+10+15=26 minutes but passing fees are 5+20+20+3=48.*

**Example 3:**  
Input: `maxTime = 25, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]`  
Output: `-1`  
*Explanation: No path from 0 to 5 can be completed in ≤25 minutes.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible paths from 0 to n-1, track cost (fees) and accumulated time, only accept those within maxTime.  
  → This is too slow (too many possible paths, exponential).
- **Optimization:** We need lowest cost among all paths with total time ≤ maxTime. This is like shortest-path with *dual* constraints (fee = cost, time = edge weight limit).
- **Dijkstra's algorithm:** Standard Dijkstra only optimizes for single metric (lowest cost), here we must include both time and cost.
- **Solution:** Use a modified Dijkstra (or BFS with priority queue):  
    - Each node in the queue contains: (current cost, current time, current node).
    - For each move:  
        - Only push to queue if time so far ≤ maxTime and if reaching this city at this time is cheaper than before at this (or lower) time.
    - Use a min-heap by cost for decisions.
- **Why this works:**  
    - We prune worse (more expensive, same/larger time) states.
    - Solves for the minimum cost to reach end, under time constraint.

### Corner cases to consider  
- No path reaches n-1 within maxTime.
- Multiple roads between same pairs with different travel times.
- Road with very high passing fee but faster path.
- Loops/cycles do not reduce cost (fees always accumulate, even on revisits).
- One city case (start = end).
- Edge where destination cheaper but needs detour for less overall fee.

### Solution

```python
import heapq

def minCost(maxTime, edges, passingFees):
    from collections import defaultdict

    # Build adjacency list: city -> list of (neighbor, time)
    graph = defaultdict(list)
    for x, y, t in edges:
        graph[x].append((y, t))
        graph[y].append((x, t))

    n = len(passingFees)
    # At each city, record minimum cost to reach with certain time
    min_time = [float('inf')] * n

    # Heap: (total_cost_so_far, time_so_far, city)
    heap = [(passingFees[0], 0, 0)]
    min_time[0] = 0

    while heap:
        cost, time, city = heapq.heappop(heap)

        # If destination reached within maxTime, return cost
        if city == n - 1:
            return cost

        # Skip if there is already a cheaper/faster way to this city
        if time > min_time[city]:
            continue

        # Explore neighbors
        for neighbor, travel in graph[city]:
            next_time = time + travel
            next_cost = cost + passingFees[neighbor]
            # If time within limit and new time is better
            if next_time <= maxTime and next_time < min_time[neighbor]:
                min_time[neighbor] = next_time
                heapq.heappush(heap, (next_cost, next_time, neighbor))

    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(E × T) where E is number of edges, and T is maxTime. In the worst case, for each node and each minute, we consider the next possible step.
- **Space Complexity:**  
  O(N + E + N × T): Graph adjacency list O(N+E), and per-city time/cost tracking up to O(N × T).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the actual path, not just the minimum cost?  
  *Hint: Track predecessors for each (city, time) entry, reconstruct path backwards.*

- What if passing fees change over time?  
  *Hint: Now the problem is time-dependent shortest path — must track cost as a function of time, more complex state.*

- What if you can revisit cities without paying their fee again?  
  *Hint: Mark visited cities, only add passing fee the first time.*

### Summary
This problem uses a **modified Dijkstra's algorithm** to handle dual metrics: *minimizing cost subject to a total time constraint*. The key trick is to use a priority queue on cost and prune states where no improvement on time occurs. This algorithmic pattern—constrained shortest path with state tracking—is valuable for routing problems with extra constraints (e.g., time, budget, or resource limits).

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Graph(#graph)

### Similar Problems
- Maximum Cost of Trip With K Highways(maximum-cost-of-trip-with-k-highways) (Hard)
- Maximum Path Quality of a Graph(maximum-path-quality-of-a-graph) (Hard)
- Minimum Cost to Reach City With Discounts(minimum-cost-to-reach-city-with-discounts) (Medium)
- Find Minimum Time to Reach Last Room I(find-minimum-time-to-reach-last-room-i) (Medium)
- Find Minimum Time to Reach Last Room II(find-minimum-time-to-reach-last-room-ii) (Medium)
- Minimum Cost Path with Edge Reversals(minimum-cost-path-with-edge-reversals) (Medium)