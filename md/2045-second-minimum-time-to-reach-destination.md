### Leetcode 2045 (Hard): Second Minimum Time to Reach Destination [Practice](https://leetcode.com/problems/second-minimum-time-to-reach-destination)

### Description  
Given a city represented by an undirected graph with n intersections (labeled 1 to n) and roads between them, each road takes exactly `time` minutes to cross. Every intersection has a traffic signal that switches every `change` minutes between green and red cycles. Green always starts on time 0 for all signals simultaneously.  
You can start right away from intersection 1 (signal just turned green). You may pass an intersection multiple times. Whenever you arrive at a vertex, you may only depart if the signal is green; otherwise, you must wait for it to turn green.  
Find the **second minimum time** (strictly greater than the shortest possible time) to reach intersection n from intersection 1.

### Examples  

**Example 1:**  
Input: `n=5, edges=[[1,2],[1,3],[1,4],[3,4],[4,5]], time=3, change=5`  
Output: `13`  
*Explanation:  
1. Path 1→4→5: Shortest time = 9  
    - At t=0: leave 1 (green), arrive 4 at t=3  
    - At t=3: leave 4 (green), arrive 5 at t=6.  
    - But at t=6, the next green at 4 is at t=10 (since each cycle is 5 minutes, t=6 is in red), so you must wait till t=10 to depart, then arrive at 5 at t=13.  
    - So, the **first minimum time** = 13.  
    - But suppose 1→3→4→5: Same idea, but second minimum time = 13.*

**Example 2:**  
Input: `n=2, edges=[[1,2]], time=3, change=2`  
Output: `6`  
*Explanation:  
- Path: 1→2  
- At t=0: green, travel to 2 (arrive t=3)  
- But first minimum time is 3 (you can directly go), but for **second minimum**, one must wait one cycle due to signals, arriving at 6. *

**Example 3:**  
Input: `n=4, edges=[[1,2],[1,3],[1,4],[2,3],[3,4]], time=2, change=4`  
Output: `8`  
*Explanation:  
- 1→3→4 and 1→4 both possible.  
- First minimum: 1→4, time = 2 (no wait, first arrival at t=2)  
- Next minimum: take 1→3→4, at some point you must wait for green, so total ends at t=8.*

### Thought Process (as if you’re the interviewee)  
To solve this, I first think of standard BFS for shortest path in an unweighted graph, but with traffic lights, we also have to consider waiting times and the possibility that the same node can be revisited at different times.  
- **Naive brute force:** Try all paths and track the times, which is exponential and not feasible.
- **Optimized approach:** Modify BFS:
  - For each node, maintain two best times it can be reached.
  - For each neighbor, compute earliest possible departure (including waiting for green).
  - Use a queue to simulate BFS, but do *not* revisit a node at the same time.
  - Track for each node two arrival times (for shortest and second shortest), so that we can return the second time destination is reached.
  - Whenever adding a new time for a node, only add if it's less than the current two known times for that node and keep both (first and second min).
  - Stop when destination node n is reached for the second time (because paths can have the same cost due to signal waiting).

Why not Dijkstra? All edge costs are equal and waits are dependent on time modulo the signal; BFS plus explicit time handling is appropriate.

### Corner cases to consider  
- There may be multiple shortest paths of equal time.
- The cycles for green/red may perfectly align with arrival times, or may cause unavoidable waits.
- It's possible to revisit nodes multiple times, so state must be (node, time).
- The graph may have multiple edges between two nodes.
- Small n (e.g. n=2).
- Time or change is 1.
- The “second minimum” may be simply forced by signal wait, not by a longer path.
- Arrival at node with time greater than currently stored second minimum.

### Solution

```python
from collections import deque, defaultdict

def secondMinimum(n, edges, time, change):
    # Build adjacency list
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    # Tracks the two smallest times at which node i has been reached
    first = [float('inf')] * (n + 1)
    second = [float('inf')] * (n + 1)
    queue = deque()
    queue.append((1, 0))  # (node, current_time)
    first[1] = 0

    while queue:
        node, curr_time = queue.popleft()
        for neighbor in adj[node]:
            next_time = curr_time

            # Calculate if we need to wait for green
            phase = (next_time // change) % 2
            if phase == 1:  # red, need to wait
                wait_time = change - (next_time % change)
                next_time += wait_time

            next_time += time  # travel

            # Add this time as one of the two arrival times for 'neighbor'
            if next_time < first[neighbor]:
                second[neighbor] = first[neighbor]
                first[neighbor] = next_time
                queue.append((neighbor, next_time))
            elif first[neighbor] < next_time < second[neighbor]:
                second[neighbor] = next_time
                queue.append((neighbor, next_time))

    return second[n]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each node can have at most two different arrival times processed, so total number of processed states is O(2 × n × degree) ≈ O(n + E) (since each edge is examined up to twice). Each operation inside the loop is O(1).
- **Space Complexity:**  
  O(n + E) for the adjacency list and arrival-time arrays, plus O(n) for the queue at peak.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the signals at all intersections did not start synchronized?  
  *Hint: You'd need to track signal offset per node, increasing the state space.*

- Can we generalize this for \( k^{th} \) minimum time?  
  *Hint: You'd need to track the best k times per node; priority queue may help.*

- How would the algorithm change if edges had different traversal times?  
  *Hint: Standard Dijkstra needed, and time modulo needs to be tracked as state.*

### Summary
We used a **BFS-style search with explicit timing** and careful state (node, arrival time) tracking to find the second minimum time given dynamic traffic signal constraints. The key pattern is **multi-state BFS** with signal-aware time calculation, a technique broadly applicable any time pathfinding requires modeling dynamic costs or “timer” state beyond just static edge weights.