### Leetcode 2192 (Medium): All Ancestors of a Node in a Directed Acyclic Graph [Practice](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph)

### Description  
Given a directed acyclic graph (DAG) with **n** nodes labeled from 0 to n-1 and a list of directed edges, find the **list of all ancestors** for every node.  
An ancestor of node *v* is a node *u* such that there is a path from *u* to *v* (u ≠ v).  
Return `result`, where `result[i]` is a sorted list of all ancestors of node *i*.

### Examples  

**Example 1:**  
Input: `n = 8, edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]`  
Output: `[[ ], [ ], [ ], [0,1], [0,2], [0,1,3], [0,1,2,3,4], [0,1,2,3]]`  
*Explanation:*
- Node 3: Path from 0→3 and 1→3, so ancestors are 0,1.
- Node 4: Path from 0→4 and 2→4, so ancestors are 0,2.
- Node 5: Paths are 0→3→5 and 1→3→5, so ancestors are 0,1,3.
- Node 6: 0,1,2,3,4 can all reach 6 through various paths.
- Node 7: 0,1,2,3 can reach 7.
- Nodes 0,1,2 have no ancestors.

**Example 2:**  
Input: `n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]`  
Output: `[[], , [0,1], [0,1,2], [0,1,2,3]]`  
*Explanation:*
- Chain: each node’s ancestors are all nodes before it.

**Example 3:**  
Input: `n = 3, edges = [[1,2],[2,0]]`  
Output: `[ [1,2], [], [1] ]`  
*Explanation:*
- Node 0: Ancestors 1 (via 2) and 2 (direct).
- Node 1: no ancestors.
- Node 2: only 1 is its ancestor.

### Thought Process (as if you’re the interviewee)  
- First, brute-force: For each node \(i\), do a traversal starting from **every other node** to see if there's a path to \(i\). This would be very slow (\(O(n^3)\) time).
- Optimization:
    - Since the graph is a DAG, we can use **topological sorting** and traverse the graph in a way that all ancestors are discovered before a node is processed.
    - For every node, keep a set of its ancestors. For each node, for every child, child.ancestors = child.ancestors ∪ (current node and current node's ancestors).
    - Traverse in topological order: This ensures before node *v* is processed, all possible ancestor info for its parents already exists.
    - After traversing, sort ancestor lists for the output.
- Trade-offs:
    - Using sets for ancestors prevents duplicates and makes unions fast, but increases space.
    - Time is \(O(n + m + n^2)\) at worst, but it's manageable for reasonable *n* (n ≤ 1000).

### Corner cases to consider  
- **Empty Graph:** n = 0, edges = []
- **Isolated Nodes:** Some nodes have no incoming or outgoing edges.
- **Multiple parents:** Nodes with multiple incoming edges.
- **Disconnected components:** Not all nodes are reachable from each other.
- **Chains and Trees:** Simple path or tree structure.
- **All nodes are sources:** All nodes have indegree 0.

### Solution

```python
from collections import defaultdict, deque

def getAncestors(n, edges):
    # Build graph and in-degree array for topological sort
    graph = defaultdict(list)
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    # Each node's ancestors will be stored as a set to avoid duplicates
    ancestors = [set() for _ in range(n)]

    # Start with nodes with indegree 0 (sources)
    queue = deque([i for i in range(n) if indegree[i] == 0])

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            # Add this node and all its ancestors to the neighbor's ancestor set
            ancestors[neighbor].add(node)
            ancestors[neighbor].update(ancestors[node])
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    # Convert each ancestor set to a sorted list as required
    return [sorted(list(ancestor_set)) for ancestor_set in ancestors]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + n²)
  - Building graph: O(m)
  - Topological sorting: O(n + m)
  - For each edge, set union might require up to O(n), and total of n² ancestor relationships in worst case.
- **Space Complexity:** O(n²)
  - Each node holds a set/list of up to n ancestors in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large graphs efficiently?
  *Hint: Can you preprocess or compress ancestor sets? Is a sparse representation helpful?*

- What if the graph was not acyclic (general directed graph)?
  *Hint: What changes if cycles are present—do you need cycle detection?*

- How to return only the **number** of ancestors instead of the full list?
  *Hint: Count ancestors instead of storing sets—much less memory.*

### Summary
This problem leverages **topological sorting** and ancestor propagation in a DAG. The key coding pattern is **propagating information through BFS or topological order using graph traversal**. This approach (set-merging, topological sort in DAGs) is widely used in dependency graph/tree problems, Kahn's algorithm, and many static analysis tasks in compilers and build systems.