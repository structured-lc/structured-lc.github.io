### Leetcode 1557 (Medium): Minimum Number of Vertices to Reach All Nodes [Practice](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes)

### Description  
Given a directed acyclic graph (DAG) with n nodes labeled from 0 to n-1, and a list of directed edges, find the smallest set of vertices from which all nodes in the graph are reachable.  
Return any such set in any order.

> In essence: For each node, if there is no way to reach it from another node (i.e., no incoming edges), then you must start from that node to guarantee all nodes can be reached. So, find all vertices with no incoming edges.

### Examples  

**Example 1:**  
Input: `n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]`  
Output: `[0,3]`  
*Explanation: Nodes 0 and 3 have no incoming edges. Every node can be reached from 0 or 3 (0 can reach 1, 2, and 5; 3 can reach 4, which can reach 2 and then 5).*

**Example 2:**  
Input: `n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]`  
Output: `[0,2,3]`  
*Explanation: Nodes 0, 2, 3 have no incoming edges. Starting from these ensures all nodes are reachable: 0→1→4, 2→1→4, 3→1→4.*

**Example 3:**  
Input: `n = 3, edges = []`  
Output: `[0,1,2]`  
*Explanation: No edges means no nodes are reachable except starting from each; each node must be included.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - For each node, try to see if it can be reached from another node by traversing the graph. This could require BFS/DFS from each node, which is inefficient (O(n × (n+e))).
- **Optimization insight:**  
  - In a DAG, nodes with no incoming edges (in-degree 0) cannot be reached from any other node.
  - If we start from these nodes, we can (via directed edges) reach all nodes that can be reached in the graph.
  - All other nodes (with in-degree ≥1) can be reached using incoming edges, so we do not need to start from them.
- **Final approach:**
  - Track in-degree (number of incoming edges) for each node.
  - Return the list of nodes with in-degree 0.
- **Trade-offs:**  
  - Fast and space-efficient; no traversal or recursion, only a single pass over the edges and nodes.

### Corner cases to consider  
- No edges: all nodes must be included (nothing is reachable except from itself).
- Fully connected DAG (each node has incoming edges from at least one other): only the root or nodes with in-degree 0 need to be included.
- Single node: output should be .
- Edges forming chains or trees: only the roots.
- Duplicate edges or self-loops (not allowed per problem statement, but worth noting).

### Solution

```python
def findSmallestSetOfVertices(n, edges):
    # Step 1: For each node, track if it has any incoming edge
    has_incoming = [False] * n

    for src, dst in edges:
        has_incoming[dst] = True

    # Step 2: All nodes with no incoming edge are mandatory starting points
    result = []
    for i in range(n):
        if not has_incoming[i]:
            result.append(i)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E + N), where E = number of edges, N = number of nodes. We loop through all edges to update in-degree counts, then loop through all nodes to collect those with 0 in-degree.
- **Space Complexity:** O(N) for the incoming-edge tracking array and the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the graph is not a DAG?
  *Hint: How does the presence of cycles affect reachability and the definition of sources?*

- How would you handle a dynamic scenario where edges can be added/removed?
  *Hint: Consider how to maintain in-degree counts efficiently when graph changes.*

- Can you handle the case where, instead of all nodes being reachable, only a subset is required to be reachable?
  *Hint: Think about how to restrict the in-degree check to specific target nodes only.*

### Summary
This problem uses the pattern of finding sources in a directed graph—nodes with no incoming edges. It showcases the application of tracking in-degree in DAGs and is a common subroutine in topological sorting, transitive closure, and minimum set cover problems in graphs. The strategy is simple, highly efficient, and is generally applicable for finding starting points in reachability questions in DAGs.


### Flashcard
Find all nodes with in-degree 0 (no incoming edges); these form minimal set to reach all reachable nodes in directed acyclic graph.

### Tags
Graph(#graph)

### Similar Problems
