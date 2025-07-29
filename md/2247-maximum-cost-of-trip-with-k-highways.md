### Leetcode 2247 (Hard): Maximum Cost of Trip With K Highways [Practice](https://leetcode.com/problems/maximum-cost-of-trip-with-k-highways)

### Description  
You are given **n cities** labeled from 0 to n−1, connected by a list of **highways**. Each highway is given as a triplet [cityA, cityB, toll], meaning there's a highway between cityA and cityB with cost=toll.  
Your task: **Plan a trip that uses exactly k highways**, starting from any city, where each city is visited at most once.  
Return the *maximum possible cost* for such a trip.  
If it is impossible to take a trip of exactly k highways without re-visiting cities, return `-1`.


### Examples  

**Example 1:**  
Input:  
`n=3, highways=[[0,1,4],[1,2,5],[0,2,1]], k=2`  
Output:  
`9`  
*Explanation: Possible trips of 2 highways:  
- 0→1→2: Cost = 4 (0↔1) + 5 (1↔2) = 9  
- 0→2→1: Cost = 1 (0↔2) + 5 (1↔2) = 6  
- 1→0→2: 4+1=5  
- Maximum = 9*

**Example 2:**  
Input:  
`n=4, highways=[[0,1,100],[1,2,100],[2,3,100]], k=2`  
Output:  
`200`  
*Explanation:  
- Possible: 0→1→2 (100+100=200); 1→2→3 (100+100=200); etc. Maximum cost is 200.*

**Example 3:**  
Input:  
`n=3, highways=[[0,1,4],[1,2,5]], k=3`  
Output:  
`-1`  
*Explanation:  
- You need 4 cities to use exactly 3 highways without revisiting cities. Only 3 cities, so answer is -1*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  Try all possible paths of length k (edges), starting from every city. But the number of possible paths grows factorially: it is not scalable for n up to 15. And we must avoid revisiting any city.

- **Graph modeling:**  
  Each city is a node. Each edge is a highway (with cost). Since highways are bidirectional, the graph is undirected.

- **Optimization intuition:**  
  This problem is like a "maximum path with exactly k edges and no revisited vertices." If n is small (≤15), typical approach would be DP with bitmasking (store which cities have been visited in a bitmask).

- **DP State:**  
  - dp[mask][city][cnt]: max cost to reach 'city', visited cities represented by 'mask', used cnt highways.
  - Transition: from (mask, city, cnt), for each neighbor, if not visited, go to (mask', neighbor, cnt+1) and update value.
  - But since 'k' is much smaller than 'n', we can further optimize and only track 'cnt' up to 'k'.

- **Implementation:**  
  - Build adjacency list from highways.
  - Initialize dp[mask][city][cnt] = -1 for all.
  - For every starting city, set dp[startMask][start]=0.
  - Use BFS or DP iterations to check reachable states.
  - Answer is the maximum among all dp[mask][city][k], for any mask, city.

- **Why this approach:**  
  - Handles the "no revisit" constraint perfectly.
  - For n≤15, bitmask DP is feasible (complexity ≈ n×2ⁿ×k).

### Corner cases to consider  
- If k+1 > n, impossible to have such a trip.
- Disconnected graph (no way to take required number of highways).
- Multiple highways between the same pair: only the highest value matters.
- Highways with zero or negative cost.
- k=0 (answer 0).
- n=1 (answer 0 if k=0, else -1).

### Solution

```python
def maximumCost(n, highways, k):
    # If k+1 > n, impossible to visit (since each city can be visited at most once)
    if k + 1 > n:
        return -1

    # Build adjacency list: city -> [(neighbor, cost)]
    from collections import defaultdict, deque

    adj = defaultdict(list)
    for a, b, cost in highways:
        adj[a].append((b, cost))
        adj[b].append((a, cost))  # Highways are bidirectional

    # DP table: dp[mask][city] = max cost to arrive at 'city', having visited 'mask' cities
    dp = [ [ -1 for _ in range(n) ] for _ in range(1 << n) ]

    # Initialize: starting from each city
    for city in range(n):
        mask = 1 << city
        dp[mask][city] = 0

    for step in range(k):
        # next_dp prevents overcounting within the same step
        next_dp = [row[:] for row in dp]
        for mask in range(1 << n):
            for u in range(n):
                if dp[mask][u] == -1:
                    continue
                for v, cost in adj[u]:
                    if not (mask & (1 << v)):
                        new_mask = mask | (1 << v)
                        if next_dp[new_mask][v] < dp[mask][u] + cost:
                            next_dp[new_mask][v] = dp[mask][u] + cost
        dp = next_dp

    ans = -1
    for mask in range(1 << n):
        for city in range(n):
            if dp[mask][city] > ans:
                # Ensure path length = k highways: mask should have k+1 bits set
                if bin(mask).count('1') == k + 1:
                    ans = dp[mask][city]

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 2ⁿ + |highways|)  
  For each of k steps (≤n), we process all subsets (2ⁿ masks); for each, loop over cities (n), and for each, loop over neighbors (n in worst case).
- **Space Complexity:** O(n × 2ⁿ)  
  DP table stores maximum cost for each subset and end-city. Adjacency list storage is O(|highways|).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where revisiting cities is allowed?
  *Hint: Modify the visited mask logic, possibly ignore it.*

- Can you return all such maximum-cost paths (not just the cost)?
  *Hint: Store predecessors at each DP step for traceback.*

- How does the solution scale if n becomes much larger (e.g., n=100)?
  *Hint: Bitmask DP would not work; need new approach, possibly heuristic or approximation.*

### Summary

This problem is a textbook example of **bitmask DP on graphs** to enumerate all possible non-revisiting paths of exact length (k highways).  
It appears in variants of the "travel salesman" and "exact path" problems, which frequently show up in interviews when n is small (≤20).  
Core patterns: State compression, dynamic programming with mask, k-length path search in undirected graphs.