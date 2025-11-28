### Leetcode 3543 (Medium): Maximum Weighted K-Edge Path [Practice](https://leetcode.com/problems/maximum-weighted-k-edge-path)

### Description  
Given a directed graph with **n** nodes labeled from 0 to n-1 (possibly containing cycles), and a list of edges where each edge is given as [u, v, w] (edge from node u to node v with weight w), you are also given integers k and t.

Find the **maximum sum of edge weights** of any path that:
- contains **exactly k edges**
- **the total sum is strictly less than t**

Return the maximum sum found, or -1 if no such path exists.

Paths may revisit nodes (cycles allowed), but edges count individually towards the k total.

### Examples  

**Example 1:**  
Input: `n=4, edges=[[0,1,2],[1,2,3],[2,3,4],[0,2,1]], k=2, t=7`  
Output: `5`  
Explanation:  
Valid paths of 2 edges and sum < 7:  
- 0→1→2: 2 + 3 = 5  
- 0→2→3: 1 + 4 = 5  
Both are valid, output is 5.

**Example 2:**  
Input: `n=3, edges=[[0,1,5],[1,2,5],[2,0,5]], k=3, t=15`  
Output: `14`  
Explanation:  
All 3-edges paths sum to 15, but must be **strictly less**, so only valid if we pick cycles that produce 5+5+4=14. If there's no such, return -1.

**Example 3:**  
Input: `n=2, edges=[[0,1,10]], k=2, t=15`  
Output: `-1`  
Explanation:  
The only path would reuse the same edge (cycle allowed), but can't use it enough times to get 2 edges (no 1→0). No valid path, output -1.

### Thought Process (as if you’re the interviewee)  
First, I would clarify:
- Paths can include the same node multiple times because the graph may have cycles.
- The path length in edges must be **exactly** k.
- The sum must be strictly less than t.

The brute-force approach would be to try all possible paths of k edges and sum their weights, but this would be exponential and not feasible for n up to 50.

#### Optimizing:
- Since only the number of edges and the sum < t matter (not visiting nodes), we can use **dynamic programming**.
- State: (current node, number of edges used, current sum)
- For each node, at each step i (number of edges used), keep a set of possible path sums less than t that can be achieved.
- For each possible transition, explore moving to neighbors, increasing the edge count by 1, and accumulating sum.
- At the end, check all possible dp[node][k] for all nodes and select the maximum sum.

**Trade-offs:**  
- Storing all possible path sums can be memory-intensive; use set/hashmap to avoid re-processing the same sum.
- Time and space are polynomial in (n×k×t) if pruned by sum < t, or by only tracking unique achievable sums at each (node, edge count).

### Corner cases to consider  
- k > n: When k is so large that it can only be achieved via cycles.
- Edge weights are 0 or negative (does the problem say all positive?).
- t is very small, making all paths invalid.
- Disconnected graph or isolated nodes.
- Multiple edges between same nodes (parallel edges).
- Cyclic graph: unlimited cycles, but must be strictly less than t and exactly k edges.

### Solution

```python
def maxWeight(n, edges, k, t):
    from collections import defaultdict, deque

    # Build adjacency list
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))

    # dp[node][steps]: the set of possible path sums arriving at node with 'steps' edges
    dp = [defaultdict(set) for _ in range(n)]
    for i in range(n):
        dp[i][0].add(0)  # Path of length 0 at each node, sum = 0

    for steps in range(k):
        for u in range(n):
            if steps in dp[u]:
                for curr_sum in dp[u][steps]:
                    for v, w in graph[u]:
                        new_sum = curr_sum + w
                        if new_sum < t:  # strictly less than t
                            dp[v][steps+1].add(new_sum)
    ans = -1
    for u in range(n):
        if k in dp[u]:
            ans = max(ans, max(dp[u][k]))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each of k steps, for each node (n), over all possible sums (bounded by number of unique achievable sums, potentially up to n×t, but pruned). In worst-case: O(n×k×(#possible sums per node per steps)×(avg degree)). But due to pruning by sum < t, it's often tractable for small k or t.

- **Space Complexity:**  
  O(n×k×(#unique path sums per node per step)), since we store possible path sums for each (node, steps) pair.

### Potential follow-up questions (as if you’re the interviewer)  

- What if t is very large—how would you reduce memory usage?
  *Hint: Can you prune non-optimal sums or use best-so-far strategies per node and step?*

- How does the approach change if negative cycles exist?
  *Hint: Consider unbounded sum possibilities or cycle detection logic.*

- How would you return the actual path, not just the sum?
  *Hint: Track parent information for each (node, steps, sum) state while building dp.*

### Summary
This problem uses the **dynamic programming on graphs** pattern, similar to k-shortest or bounded paths problems. Key ideas are managing state with (node, step, sum) and efficiently tracking unique, feasible path sums using hash maps/sets. This DP-over-edges technique applies to many bounded path/cost/cycle problems on graphs.


### Flashcard
Use DP with state dp[node][edges_used] = maximum weight reachable; for each state, try extending to neighbors within k edges and sum < t constraint.

### Tags
Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Graph(#graph)

### Similar Problems
