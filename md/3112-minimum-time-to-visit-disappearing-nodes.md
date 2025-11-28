### Leetcode 3112 (Medium): Minimum Time to Visit Disappearing Nodes [Practice](https://leetcode.com/problems/minimum-time-to-visit-disappearing-nodes)

### Description  
You are given an undirected graph with **n** nodes (0-indexed) and an array **edges**, where each edge is an array of the form [u, v, w] meaning there is an undirected edge between nodes u and v with traversal time w.  
Each node \( i \) has a value **disappear[i]**, which means node \( i \) will *disappear* and be unreachable at time **disappear[i]**.  
You start at node 0 at time 0. You can move along the edges, but if you reach a node at a time **≥ disappear[i]**, you cannot visit it (it's already disappeared).  
Return an array where the \( i^{th} \) value is the **minimum time** required to reach node \( i \), or -1 if unreachable **(because of disappearance)**.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[0,1,1],[1,2,2],[0,3,4]], disappear = [5,1,5,5]`  
Output: `[0, 1, 3, 4]`  
*Explanation:*
- You start at node 0, time 0.
- Edge 0→1 (weight 1): arrive at 1 at time 1, before disappear[1]=1, so it's exactly on time.
- Edge 1→2 (weight 2): time so far is 1+2=3 < disappear[2]=5.
- Edge 0→3 (weight 4): time 4 < disappear[3]=5.
- All nodes are reachable just before they disappear.

**Example 2:**  
Input: `n = 5, edges = [[0,1,2],[1,2,2],[0,3,1],[3,4,1]], disappear = [3,2,5,4,3]`  
Output: `[0, 2, -1, 1, 2]`  
*Explanation:*
- Node 2: To reach, need path 0→1→2: time = 2+2=4, but disappear[2]=5, so in time, but
- Node 1: 0→1 (2), arrive at 2, but disappear[1]=2, so exactly at the edge.
- Node 3: 0→3 (1), time=1, disappear[3]=4; node 4: 0→3→4 (1+1=2), before disappear[4]=3.
- Node 2 can't be reached before node 1 disappears (since 1 is used in path).

**Example 3:**  
Input: `n = 3, edges = [[0,1,10],[1,2,10]], disappear = [5,5,5]`  
Output: `[0, -1, -1]`  
*Explanation:*  
- Node 1: 0→1 takes 10, which is already ≥ disappear[1]=5, so unreachable.
- Similarly, node 2 unreachable.

### Thought Process (as if you’re the interviewee)  

The question asks for the shortest *time* to reach each node from node 0, **provided that you arrive before/disappear**.

**Brute-force:**  
Try all possible paths recursively with backtracking, rejecting any that reach a node at or after its disappear time, and track shortest times. This will be far too slow (exponential).

**Graph insight:**  
This is a classic **single-source shortest path** problem, but with an added *node expiry* constraint.  
Normally, Dijkstra works: use a min-heap to always expand next minimum-time front.  
But here, when extending to a neighbor, you must check: "Will I reach this node before it disappears?"

**So:**  
- For each node, maintain the earliest time you can get there (`dist[]`), start with dist=0.
- At each Dijkstra step: pop node with current minimum time.
- For each neighbor, if the arrival time is *before* its `disappear[]`, and if that's a better (smaller) time than previously known, enqueue it.
- If can't reach before disappearance, don't enqueue.
- After Dijkstra, set dist[i]=-1 for any unreachable node (still at ∞).

**Optimizations:**  
- Only update if arrival time at neighbor is <disappear[neighbor] and <dist[neighbor].
- Priority queue maintains best frontiers.

**Trade-offs:**  
- Dijkstra with extra constraint is still efficient: O((V+E) × log V)

### Corner cases to consider  
- **Node disappears at time 0:** Can never be reached (unless it's node 0 itself and disappear>0).
- **No path to a node:** Standard unreachable case, should return -1.
- **Path arrives exactly at disappear[i]:** Not allowed, must be strictly *before* disappear[i].
- **Graph with cycles:** Shouldn't cause issues; must prevent re-updating nodes with worse arrival times.
- **Edges with zero weight:** Can’t skip disappearance check.
- **Multiple edges between same nodes:** Should take the minimum path.

### Solution

```python
import heapq

def minimumTime(n, edges, disappear):
    # Build the adjacency list
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append( (v, w) )
        graph[v].append( (u, w) )

    # Dijkstra - min-heap with (time_so_far, node)
    inf = float('inf')
    dist = [inf] * n
    dist[0] = 0

    h = [(0, 0)]  # (current_time, node)
    while h:
        current_time, u = heapq.heappop(h)
        if current_time > dist[u]:
            continue  # Already found a better way
        # Must arrive strictly before disappear[u]
        if current_time >= disappear[u]:
            continue  # Node already disappeared, can't use it
        for v, w in graph[u]:
            arrival = current_time + w
            # Must reach strictly before disappear[v]
            if arrival < disappear[v] and arrival < dist[v]:
                dist[v] = arrival
                heapq.heappush(h, (arrival, v))

    # Convert unreached to -1
    for i in range(n):
        if dist[i] == inf:
            dist[i] = -1
    return dist
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((V + E) × log V), since each edge processed at most once, and heap operations are log V.
- **Space Complexity:** O(V + E), due to adjacency list (O(E)), distance array (O(V)), and heap up to O(V).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **dynamic disappear times** (changing during traversal)?  
  *Hint: What parts of the algorithm depend on disappear times being fixed?*

- How would you process **multiple starting nodes**?  
  *Hint: Try simulating a “virtual” source node connecting to all starts with zero-weight edges.*

- How to return the **actual path** (not just the time) to each node?  
  *Hint: Keep a parent pointer array during Dijkstra.*

### Summary
This problem is a variant of **single-source shortest path** (Dijkstra’s algorithm) with a **node expiry constraint**.  
Common pattern: shortest path with additional node/edge availability conditions.  
This logic can be adapted for problems where *nodes or edges vanish* after certain periods—useful in network reliability, real-time systems, and simulated/active graphs.


### Flashcard
Classic shortest-path problem with node expiry constraint. Use Dijkstra's algorithm, but only relax edges to nodes if arrival time < disappear_time.

### Tags
Array(#array), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- Find the Last Marked Nodes in Tree(find-the-last-marked-nodes-in-tree) (Hard)