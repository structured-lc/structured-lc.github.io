### Leetcode 1129 (Medium): Shortest Path with Alternating Colors [Practice](https://leetcode.com/problems/shortest-path-with-alternating-colors)

### Description  
Given a **directed graph** with `n` nodes (labeled from 0 to n−1), and two types of directed edges: **red** and **blue**. Each red edge is given by `redEdges[i] = [from, to]` and each blue edge by `blueEdges[j] = [from, to]`.

You must find the shortest paths from node 0 to every other node, such that
- The edge colors along each path *alternate*: you cannot travel through two red edges back to back, or two blue edges back to back.

Return an array `answer` of length n, where `answer[x]` is the length of the shortest path from node 0 to node x with alternating colors. If such a path doesn’t exist, set `answer[x] = -1`.

### Examples  

**Example 1:**  
Input:  
n = 3, redEdges = [[0,1]], blueEdges = [[1,2]]  
Output:  
[0,1,2]  
*Explanation:*
- node 0: start, so distance is 0  
- node 1: take red edge from 0→1 (**length=1**, color: red)  
- node 2: 0→1 (red), then 1→2 (blue) (**length=2**, alternates: red→blue)

**Example 2:**  
Input:  
n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]  
Output:  
[0,1,-1]  
*Explanation:*
- node 0: 0
- node 1: reach via red edge 0→1 (length=1)
- node 2: no alternating path starting at 0 reaches 2, so answer is -1

**Example 3:**  
Input:  
n = 3, redEdges = [[1,0]], blueEdges = [[2,1]]  
Output:  
[0,-1,-1]  
*Explanation:*
- node 0: 0 (start)
- node 1: can't get there from 0 due to direction
- node 2: unreachable by alternating path

### Thought Process (as if you’re the interviewee)  
First, this is a **shortest path** question in a graph, but with the key constraint: **each edge must alternate color** with the previous one.

**Brute-force idea**:  
Try DFS from node 0 to every node, tracking edge colors. But:
- This is exponential; you might revisit states many times.

**Optimized approach**:  
Since all edges have "equal weight" (step cost = 1), we can use **Breadth-First Search (BFS)**. But since we must alternate, we must also track the color of the edge used to arrive at the current node.

**Key decisions for BFS**:
- Store for each (node, edge_color) state whether we have reached it, to prevent cycles.
- At each level, for each outgoing edge with a color *different* from how we arrived, add to queue.

**Implementation overview**:
- For each node, keep two shortest path values: one ending with a red edge, one with blue.
- Start BFS from node 0 with both color possibilities ("virtual", since first step can be any color).
- At end, for each node, pick the min between red/blue-ending distances for that node. If both are infinite/unreachable, set to -1.

**Tradeoffs**:
- BFS ensures shortest path in unweighted graphs.
- State is (cur_node, color_arrived_by), so up to 2n.
- Memory and runtime are both reasonable for n ≤ 100.

### Corner cases to consider  
- **No outgoing edges from 0**: every answer except answer is -1.
- **Self-loops** (edges like [0,0]).
- **Parallel edges** (multiple red or blue between two nodes).
- **Some nodes only accessible by one color;** can’t alternate.
- **Unreachable nodes** due to direction or missing alternate color steps.
- **Both red and blue edges exist for same node pair**.

### Solution

```python
from collections import deque, defaultdict

def shortestAlternatingPaths(n, redEdges, blueEdges):
    # Build adjacency lists for red and blue edges
    red_adj = defaultdict(list)
    blue_adj = defaultdict(list)
    for u, v in redEdges:
        red_adj[u].append(v)
    for u, v in blueEdges:
        blue_adj[u].append(v)
    
    # distances[node][color]: shortest distance to node, ending in color
    # color: 0=red, 1=blue
    distances = [[float('inf')] * 2 for _ in range(n)]
    distances[0][0] = 0  # Start at node 0, last edge was red (virtual)
    distances[0][1] = 0  # Start at node 0, last edge was blue (virtual)
    
    queue = deque()
    # (node, color) -- color means color of edge *just used* to arrive here
    queue.append((0, 0))  # Start as if we arrived using red edge
    queue.append((0, 1))  # Start as if we arrived using blue edge
    
    while queue:
        cur, color = queue.popleft()
        # Alternate color: if arrived by red, can use blue edges next, and vice versa
        next_color = 1 - color
        # Select adjacency list based on next edge color
        neighbors = blue_adj[cur] if next_color == 1 else red_adj[cur]
        for nxt in neighbors:
            # If we haven't visited nxt with next_color yet
            if distances[nxt][next_color] == float('inf'):
                distances[nxt][next_color] = distances[cur][color] + 1
                queue.append((nxt, next_color))
    
    result = []
    for red_dist, blue_dist in distances:
        min_dist = min(red_dist, blue_dist)
        result.append(min_dist if min_dist != float('inf') else -1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + e), where e = total number of edges (sum of all red and blue edges).  
    Each (node, color) pair is processed once; edges are traversed at most once in BFS.

- **Space Complexity:** O(n + e) for graph storage, and O(n) for queue/distances matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is **undirected**?  
  *Hint: Alternation still applies, but edges can be traversed both ways; carefully track direction and edge colors.*

- How would you modify the approach if you wanted to **find all possible shortest alternating paths**, not just lengths?  
  *Hint: Keep a parent map per (node, color) and reconstruct paths backwards.*

- What changes if you allow **variable edge weights** (not just length 1)?  
  *Hint: BFS no longer works; need Dijkstra's algorithm, but state is still (node, color).*

### Summary
We used a **BFS with an extended state (node, color)** to solve the shortest alternating path problem. This is a classic "BFS with extra state"-type pattern, applicable to situations where the path or transition has side-effects, like alternating steps or avoiding certain conditions. This approach is widely useful for grid and graph problems involving dependencies on prior steps, not just the current node.