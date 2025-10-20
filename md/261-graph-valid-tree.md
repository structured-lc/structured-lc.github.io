### Leetcode 261 (Medium): Graph Valid Tree [Practice](https://leetcode.com/problems/graph-valid-tree)

### Description  
Given an undirected graph with n nodes labeled 0 to n-1 and a list of edges (where each edge connects two nodes), determine if the graph forms a valid tree.  
A *tree* must be:
- **Connected:** There’s a path between every pair of nodes.
- **Acyclic:** There are no cycles.
Think: Each node reachable from any other; no path can loop back to itself.  
You’ll be given n and edges (a list of n-1 or fewer edge pairs).

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]`  
Output: `True`  
*Explanation: All nodes are connected, and there are no cycles. The edge count is 4 (which is 5-1), so it’s a valid tree.*

**Example 2:**  
Input: `n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]`  
Output: `False`  
*Explanation: There is a cycle (1–2–3–1), so it’s not a tree.*

**Example 3:**  
Input: `n = 4, edges = [[0,1],[2,3]]`  
Output: `False`  
*Explanation: There are two disconnected components: 0–1 and 2–3. So, graph is not connected and not a tree.*

### Thought Process (as if you’re the interviewee)  
Start by recalling that a tree with n nodes must have n-1 edges and be connected (every node must be reachable) and acyclic (no cycles).

- **Brute-force:**  
  Try detecting cycles and checking for connectivity using DFS or BFS for each component. Not efficient for large n.

- **Better idea:**  
  Two main checks:
  1. **Edge count:** Must be exactly n-1 (if too few–disconnected; too many–cycle exists).
  2. **Connectivity check:** Start DFS/BFS from node 0. If you visit every node, it’s connected. Or, use Union-Find to detect cycles as you build the graph.

- **Why this approach:**  
  - If n-1 edges? Only one component if connected and no cycles.
  - Using Union-Find is efficient for detecting cycles and merging components.
  - Alternatively, DFS with a visited set–if you revisit a visited node (parent excluded), it’s a cycle.

### Corner cases to consider  
- n = 0 (empty graph—no nodes)
- n = 1, edges = [] (single node, valid tree)
- Disconnected nodes (edges too few)
- Extra edges (edges ≥ n)
- Node in edge is out of range [0, n-1]
- Multiple edges between same nodes (multi-edges)
- Self-loops (edge from i to i)

### Solution

```python
def valid_tree(n, edges):
    # Tree must have exactly n - 1 edges
    if len(edges) != n - 1:
        return False

    parent = [i for i in range(n)]

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # Path compression
            x = parent[x]
        return x

    def union(x, y):
        root_x, root_y = find(x), find(y)
        if root_x == root_y:
            # Cycle found
            return False
        parent[root_x] = root_y
        return True

    for u, v in edges:
        if not union(u, v):
            return False

    # Connected, no cycles, exactly n-1 edges
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each union/find operation is nearly constant (amortized by path compression). We process n-1 edges.
- **Space Complexity:** O(n) for the parent array.

### Potential follow-up questions (as if you’re the interviewer)  

- If the graph is given as an adjacency matrix or list, how would you adapt the solution?  
  *Hint: Build edge list from adjacency representation.*

- How would you return the cycle nodes if the graph is not a tree?  
  *Hint: Store parent pointers and reconstruct the path on cycle detection.*

- Can you validate if the input is a forest (a collection of trees) instead of a single tree?  
  *Hint: Count connected components with DFS/Union-Find.*

### Summary
This is a classic example of the **Union-Find (Disjoint Set Union) pattern** for detecting cycles and managing connected components in graphs. The edge-counting trick (n-1 edges for trees) provides a quick sanity check. This coding pattern is widely applicable to problems about connectivity, cycles, and equivalence relations in graphs.


### Flashcard
Graph Valid Tree

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Course Schedule(course-schedule) (Medium)
- Number of Connected Components in an Undirected Graph(number-of-connected-components-in-an-undirected-graph) (Medium)
- Keys and Rooms(keys-and-rooms) (Medium)