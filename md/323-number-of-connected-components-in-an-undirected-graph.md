### Leetcode 323 (Medium): Number of Connected Components in an Undirected Graph [Practice](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph)

### Description  
We are given an undirected graph with **n** nodes, labeled from 0 to n-1, and a list of undirected edges, where each edge connects two nodes. The task is to **find the number of connected components** in the graph.  
A connected component is a set of nodes where each pair of nodes is connected by a path, and which is not connected to additional nodes in the rest of the graph.

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[0,1],[1,2],[3,4]]`  
Output: `2`  
*Explanation: Nodes 0-1-2 are connected (component 1), and nodes 3-4 are connected (component 2).*

```
Graph:       0   3
             |   |
             1   4
             |
             2

List: [0,1,2],[3,4]
```

**Example 2:**  
Input: `n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]`  
Output: `1`  
*Explanation: All nodes are connected in a single chain.*

```
Graph:    0 - 1 - 2 - 3 - 4

List: [0,1,2,3,4]
```

**Example 3:**  
Input: `n = 3, edges = []`  
Output: `3`  
*Explanation: No edges, so each node is its own component.*

```
Graph: 0   1   2

List: [0],[1],[2]
```

### Thought Process (as if you’re the interviewee)  
Since this is a **connectivity** problem on an undirected unweighted graph, the key is to identify separate groups of nodes that are internally connected but have no links to other groups.  

- **Brute-force:** For every node, run DFS/BFS and mark all reachable nodes. Count how many times a fresh DFS/BFS is started.  
  - Inefficiency: Without visited marking, we'd revisit many nodes repeatedly.

- **Optimal approach:**  
  - Build an adjacency list for the graph.
  - Use a `visited` set or array.
  - For each unvisited node, start a DFS/BFS and mark all reachable nodes as visited.
  - Count the number of times you start a search—each corresponds to a connected component.
  
- **Union-Find:** Another efficient approach, especially if the graph is dynamic or you’re asked about connectivity multiple times. Use a Disjoint Set Union data structure to keep track of components.

Both DFS/BFS and Union-Find approaches are valid, but DFS/BFS is often more intuitive and easier for interview settings unless there are specific requirements favoring Union-Find.

### Corner cases to consider  
- `n = 0` (no nodes, should return 0)
- No edges (each node is its own component)
- Single node (should return 1)
- Fully connected graph (result is 1)
- Graph with multiple isolated nodes and some connected clusters

### Solution

```python
def countComponents(n, edges):
    # Build adjacency list
    graph = {i: [] for i in range(n)}
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
        
    visited = set()
    components = 0

    def dfs(node):
        # Mark all nodes in this component as visited
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    for i in range(n):
        if i not in visited:
            dfs(i)
            components += 1
    return components
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n + e), where n is the number of nodes and e is the number of edges.
    - Each node and edge is visited once in DFS.

- **Space Complexity:**  
  - O(n + e) for the adjacency list and visited set/array.
    - Extra: The recursion stack could be up to O(n) in the worst case (e.g., a long chain).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the edges list is very large (sparse graph)?  
  *Hint: Which traversal uses less space—adjacency matrix or adjacency list?*

- Can you solve this using Union-Find?  
  *Hint: Think about parent pointers and component counts as you union edges.*

- How would the solution change if the graph were directed?  
  *Hint: How does the definition of "connected component" differ for directed graphs?*

### Summary
This problem is a classic application of the graph traversal pattern—using DFS or BFS to explore all nodes in a connected component. The same pattern can be used for island counting (grid problems), finding friend circles, and general flood-fill algorithms. Union-Find is also a widely applicable pattern for component tracking, especially in dynamic connectivity problems.