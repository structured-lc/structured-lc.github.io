### Leetcode 1059 (Medium): All Paths from Source Lead to Destination [Practice](https://leetcode.com/problems/all-paths-from-source-lead-to-destination)

### Description  
Given a **directed graph** represented as a list of pairs (edges), a `source` node, and a `destination` node, determine if **every** path starting from `source` eventually ends at `destination`.  
The requirements are:
- There must be **at least one path** from `source` to `destination`.
- If a path leads to a node with **no outgoing edges** (a dead end), that node must be `destination`.
- There must be **no cycle** such that some path from `source` could go on infinitely (infinite paths are not allowed).

The function should return `True` if all these conditions are met.

### Examples  

**Example 1:**  
Input:  
`n = 3, edges = [[0,1],[0,2]], source = 0, destination = 2`  
Output:  
`False`  
*Explanation: From 0, you can go to 1 (which is a dead end, not destination), or to 2. Since there's a dead end at 1 that's not destination, answer is False.*

**Example 2:**  
Input:  
`n = 4, edges = [[0,1],[1,2],[2,3]], source = 0, destination = 3`  
Output:  
`True`  
*Explanation: Only one path from 0→1→2→3, and 3 is the only dead end. Every path ends at destination.*

**Example 3:**  
Input:  
`n = 4, edges = [[0,1],[1,2],[2,1]], source = 0, destination = 3`  
Output:  
`False`  
*Explanation: There is a cycle between 1 and 2, so there's an infinite path and 3 is never reached. The answer is False.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try exploring every path from source using DFS. For every path, ensure it ends at destination and never at a different dead end. This is inefficient if cycles exist.
- **Cycle detection:** Since cycles cause infinite paths, I must detect them. Standard DFS with a visited set (recursion stack) helps detect cycles.
- **Dead end check:** If I visit a node with no outgoing edges, check if it's destination. If not, fail.
- **Memoization:** To avoid redundant computation, use memoization or state flags: mark nodes as unvisited, visiting, or safe.
- **Why DFS:** DFS is natural for paths, and allows me to manage the recursion stack to detect cycles, as well as to check leaf nodes when encountered.

### Corner cases to consider  
- No outgoing edges from source except cycles.
- Multiple paths, some valid ending at destination but others dead-end or cycle.
- Disconnected graph—destination not reachable.
- Self-loop or two-node loop (cycle including source or destination).
- Graph where destination itself has outgoing edges (should return False).

### Solution

```python
def leadsToDestination(n, edges, source, destination):
    from collections import defaultdict
    
    # Build adjacency list
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
    
    state = [0] * n  # 0=unvisited, 1=visiting, 2=safe

    def dfs(node):
        if state[node] == 1:
            # Detected a cycle
            return False
        if state[node] == 2:
            # Already confirmed safe
            return True
        if not graph[node]:
            # Dead end: must be destination
            return node == destination
        state[node] = 1  # Mark as visiting
        for nei in graph[node]:
            if not dfs(nei):
                return False
        state[node] = 2  # Mark as safe
        return True

    return dfs(source)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E + N), where E = number of edges and N = number of nodes. Each node and edge processed at most once, thanks to `state` memoization.
- **Space Complexity:** O(N + E) for adjacency list, and O(N) for recursion stack in worst case (for path graph / deepest path).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change for an **undirected graph**?  
  *Hint: You'd need to track parent to avoid trivial cycles and adjust leaf/end detection.*

- How to return **all different valid paths** from source to destination?  
  *Hint: Use path list, backtracking, and yield when you hit destination.*

- What if the edges are arriving as a stream, and you can't build the whole graph in memory?  
  *Hint: You'd need online algorithms, possibly with pruning, but exhaustive check may not be feasible.*

### Summary
The approach uses pattern matching for **graph cycle detection** (standard DFS with state flags) and **leaf/dead-end validation**. This is the classic cycle-detection and post-order marking technique commonly used for topological sorting, deadlock detection, safe path checking, and "eventual safety" problems in directed graphs.