### Leetcode 802 (Medium): Find Eventual Safe States [Practice](https://leetcode.com/problems/find-eventual-safe-states)

### Description  
We are given a directed graph with n nodes labeled from 0 to n-1. The graph is represented as an adjacency list, where `graph[i]` gives a list of nodes j such that there is a directed edge from i to j.  
A terminal node is defined as a node with no outgoing edges.  
A node is called a "safe node" if, for every possible path starting from that node, the path eventually terminates at a terminal node (i.e., no path leads to a cycle).  
Return a sorted list of all safe nodes in ascending order.

### Examples  

**Example 1:**  
Input: `graph = [[1,2],[2,3],[5],,[5],[],[]]`  
Output: `[2,4,5,6]`  
*Explanation:*
- Node 2's paths lead to 5 (terminal),
- Node 4's only edge leads to 5 (terminal),
- Nodes 5 and 6 are already terminal.
- Other nodes can reach cycles.

**Example 2:**  
Input: `graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]`  
Output: `[4]`  
*Explanation:*
- Node 4 is the only terminal node. All other nodes participate in cycles or reach cycles.

**Example 3:**  
Input: `graph = [[]]`  
Output: ``  
*Explanation:*
- The only node is terminal (no outgoing edges), so it's safe.

### Thought Process (as if you’re the interviewee)  
First, I recognize that nodes that can potentially reach a cycle are unsafe. Safe nodes are those that cannot reach any cycle, directly or indirectly.

**Brute-force idea:**  
For each node, DFS and check if any path enters a cycle. If no cycle is found from this node on any path, mark as safe. But this repeats a lot of work across nodes.

**Optimized approach:**  
Use DFS with coloring/marking to remember nodes:
- 0 = unvisited
- 1 = visiting (on current path – if we revisit, cycle detected)
- 2 = safe (guaranteed no cycle reachable from here)

This way, we memoize state, avoid repeated checks, and efficiently propagate safety upwards.

**Alternative:**  
Reverse graph and use BFS (Kahn's algorithm, topological sort):  
- Start from terminal nodes, mark nodes whose all out-edges lead to already-safe nodes as safe.
Both are efficient; I'll use DFS with coloring for clarity.

### Corner cases to consider  
- Empty graph (no nodes).
- Single terminal node.
- Multiple disconnected terminal nodes.
- Multiple cycles.
- Graph where all nodes are part of a cycle.
- Chain ending at a cycle.

### Solution

```python
def eventualSafeNodes(graph):
    n = len(graph)
    color = [0] * n  # 0 = unvisited, 1 = visiting, 2 = safe

    def dfs(node):
        if color[node] != 0:
            # If already processed, not unvisited.
            return color[node] == 2  # True if safe
        color[node] = 1  # Mark as visiting
        for nei in graph[node]:
            if color[nei] == 2:
                continue  # Neighbor already proven safe
            if color[nei] == 1 or not dfs(nei):
                # Found a back edge or neighbor is unsafe
                return False
        color[node] = 2  # Mark as safe
        return True

    res = []
    for i in range(n):
        if dfs(i):
            res.append(i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(V + E), where V = number of nodes, E = number of edges.  
  Each node and edge is explored at most once due to coloring/memoization.
- **Space Complexity:** O(V), for color array and recursion stack (up to V in the worst-case path).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it iteratively using BFS/Topological Sort?
  *Hint: Try working with the reverse graph to track in-degrees/direct ancestors.*

- How would you modify the approach to report at least one cycle (if any)?
  *Hint: Track which nodes enter a revisited “visiting” state in DFS.*

- How does this handle extremely large graphs where recursion depth may be a problem?
  *Hint: Either use iterative DFS or BFS to avoid recursion stack overflow.*

### Summary
This solution uses the classical DFS coloring method for cycle detection in directed graphs. The “safe node set propagation” pattern helps solve similar questions where nodes are only valid if all their out-edges or descendants are valid (think: eventual safety, dead-end propagation).  
This idea is also fundamental for problems like detecting cycles, topological sorting, and course schedule/ordering tasks.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Build a Matrix With Conditions(build-a-matrix-with-conditions) (Hard)