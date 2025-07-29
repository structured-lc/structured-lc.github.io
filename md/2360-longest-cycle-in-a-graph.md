### Leetcode 2360 (Hard): Longest Cycle in a Graph [Practice](https://leetcode.com/problems/longest-cycle-in-a-graph)

### Description  
Given a **directed graph** with `n` nodes labeled `0` through `n-1`, where each node has at most one outgoing edge, you’re given an array `edges` of length `n`. If `edges[i] != -1`, there is an edge from `i` to `edges[i]`. If `edges[i] == -1`, node `i` has no outgoing edge.  
Your task: Return the **length of the longest cycle** in the graph. A cycle is a path that starts and ends at the same node, and all nodes along the path are unique except for the start/end. If no cycle exists, return `-1`.

### Examples  

**Example 1:**  
Input: `edges = [3,3,4,2,3]`  
Output: `3`  
Explanation:  
The longest cycle is `2 → 4 → 3 → 2`, with length 3.

```
List:  [3, 3, 4, 2, 3]

Visualization:
 0 → 3 → 2 → 4 ↘
 ↑           ↖    |
 |_______________|
```

**Example 2:**  
Input: `edges = [2,-1,3,1]`  
Output: `-1`  
Explanation:  
There are no cycles.

**Example 3:**  
Input: `edges = [1,2,0]`  
Output: `3`  
Explanation:  
0 → 1 → 2 → 0 forms a cycle of length 3.

```
List:  [1, 2, 0]

Visualization:
 0 → 1 → 2
 ↑       |
 |_______|
```

### Thought Process (as if you’re the interviewee)  

- The graph is directed, and each node has at most one outgoing edge.
- Every path from a node can be followed in a straight line until you hit a node with `edges[i] == -1` (dead end) or you see a node twice (cycle).
- **Brute-force:** For each node, follow the path and record visited nodes in a local set. If you revisit a node, check if it's part of your current path — if so, you found a cycle. Track the longest.
  - This repeats a lot of work, since most nodes can only be in exactly one simple path or cycle.
- **Optimization 1:**  
  Use a global `visited` array so you never re-traverse from a node you've already completely processed (i.e., it's in an already-accounted-for cycle or dead path).
- **Optimization 2:**  
  While traversing from a node, keep a `seen_at_step` dictionary to remember the first step you see a node at during this traversal. Cycle length = (current step - first_seen_step + 1) if you revisit a node on this path.
- **Why this approach?**  
  - Time and space are linear.
  - We never repeat work: every node is only ever actively traversed once.
  - No need for classic visited/recursion stack tracking for cycles — each path is straight and any node can only be in one cycle.

### Corner cases to consider  
- All edges are `-1`: no cycles, expect `-1`.
- One node points to itself: edges `` forms cycle of length 1.
- Multiple disconnected cycles: only care about the longest one.
- Paths that overlap but only cycle at certain points.
- Empty or single-node graph: not allowed here (`n ≥ 2`).
- edges[i] == -1 for all i: every node is isolated.

### Solution

```python
def longestCycle(edges):
    n = len(edges)
    visited = [False] * n  # Global visited: True if node is already fully processed
    res = -1

    for i in range(n):
        if visited[i]:
            continue
        # For every node, simulate walking down the path
        # Map: node -> step index seen in this traversal
        node_to_step = dict()
        curr = i
        step = 0
        while curr != -1 and not visited[curr]:
            node_to_step[curr] = step
            visited[curr] = True
            next_node = edges[curr]
            step += 1
            if next_node in node_to_step:
                # Found a cycle: length = current step - first step node seen
                cycle_length = step - node_to_step[next_node]
                res = max(res, cycle_length)
                break
            curr = next_node
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each node is visited at most once throughout all traversals. Each edge is followed at most once.
- **Space Complexity:** O(n)
  - The `visited` array uses O(n) space, as does the temporary `node_to_step` dictionary in the worst path (linear size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return the nodes in the longest cycle, not just its length?  
  *Hint: Store the nodes in order as you traverse, and slice out the cycle using the indices from the step mapping.*

- What if nodes could have multiple outgoing edges (i.e, a general graph)?  
  *Hint: Standard DFS with recursion stack tracking is needed for cycle detection.*

- Could this problem be solved with BFS?  
  *Hint: Since we care about cycles and specific node revisit points, DFS (or traversal with step tracking) is more natural and space-efficient.*

### Summary
This problem uses a **single-path/linked-list-style graph traversal** with marking and step tracking to detect cycles efficiently.  
It demonstrates a variant of **cycle detection** using path-mapping within DFS/BFS, but thanks to problem constraints (at most one outgoing edge), it behaves more like handling components in an array. The global `visited` ensures no repeated work — a common Linked List Cycle pattern adapted for the "single fork" digraph case.  
This trick is broadly useful in linked list cycle detection, path simulation, and "graph where each node only points to one other node" situations.