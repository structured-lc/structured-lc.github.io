### Leetcode 2685 (Medium): Count the Number of Complete Components [Practice](https://leetcode.com/problems/count-the-number-of-complete-components)

### Description  
Given an undirected graph with `n` vertices (labeled from `0` to `n-1`) and a list of edges, count how many connected components are **complete**.  
A **connected component** is a subset of nodes where any two nodes are connected directly or indirectly and none connects outside the subset.  
A component is **complete** if every possible pair of nodes within it shares an edge—in other words, it's a clique.

### Examples  

**Example 1:**  
Input: `n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]`  
Output: `3`  
*Explanation:  
Nodes 0,1,2 are all connected and every pair has an edge, so this is a complete component.  
Nodes 3,4 are connected (just two nodes; a single edge suffices).  
Node 5 is alone; a single node is trivially a complete component.  
So, there are 3 complete components: [0,1,2], [3,4], [5].*

**Example 2:**  
Input: `n = 5, edges = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]`  
Output: `2`  
*Explanation:  
Nodes 0,1,2,3 form a complete component: every node has an edge to every other.  
Node 4 is on its own and is also considered a complete component.*

**Example 3:**  
Input: `n = 4, edges = [[0,1],[1,2],[2,3]]`  
Output: `0`  
*Explanation:  
All nodes form a single connected component, but not every node is connected to every other (missing edge between 0-2, 0-3, etc).  
So, no complete components.*

### Thought Process (as if you’re the interviewee)  
- First, identify all **connected components** in the graph. This can be done using BFS or DFS.
- For each component, check if it forms a **complete graph** (a clique).  
  - In a complete graph with \( k \) nodes, there should be exactly \( k × (k-1) / 2 \) unique edges.
- Brute-force approach: Check every pair in the component for the presence of an edge (inefficient for large graphs).
- Optimal approach: For each component found via DFS/BFS, count nodes and edges.
  - If the number of edges equals \( k × (k-1) / 2 \), it's complete.
  - Remember undirected edges mean each edge counted twice if summing degrees.
- Chose this approach because finding components is quick with DFS/BFS, and checking completeness via counting nodes/edges is efficient and clean.

### Corner cases to consider  
- No edges: all nodes are isolated and each is its own complete component.
- Single node components: always complete.
- A component with just two nodes and one edge: also complete.
- Self-loops: not expected, skip unless specified.
- Disconnected nodes (not present in any edge).
- Multiple disconnected components with various sizes.

### Solution

```python
from collections import defaultdict, deque

def countCompleteComponents(n, edges):
    # Build adjacency list
    graph = defaultdict(set)
    for u, v in edges:
        graph[u].add(v)
        graph[v].add(u)
    
    visited = [False] * n
    complete_count = 0

    for i in range(n):
        if not visited[i]:
            # BFS/DFS to collect this component
            queue = deque([i])
            visited[i] = True
            nodes = []
            while queue:
                node = queue.popleft()
                nodes.append(node)
                for neighbor in graph[node]:
                    if not visited[neighbor]:
                        visited[neighbor] = True
                        queue.append(neighbor)
            k = len(nodes)
            # Count number of edges (sum degree for all, then halve)
            edge_count = 0
            for node in nodes:
                edge_count += len(graph[node])
            edge_count //= 2
            # A complete component of k nodes must have k × (k-1)//2 edges
            if edge_count == (k * (k - 1)) // 2:
                complete_count += 1

    return complete_count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building the adjacency list: O(E)  
  - BFS/DFS: visits each node and edge once → O(V + E)  
  - For each component: sum the degrees in O(V), so still O(V + E) overall.
- **Space Complexity:**  
  - O(V + E) for the adjacency list + O(V) for visited array + O(V) for BFS/DFS queue.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is very large and sparse?
  *Hint: Consider processing edges on the fly, or optimizing space usage (e.g., adjacency lists instead of dense matrices).*

- Can you solve the problem if the graph is represented as an adjacency matrix?
  *Hint: How would finding components and counting edges change?*

- How would the approach change for a **directed** graph?
  *Hint: What would “completeness” mean in a directed graph? Does directionality change your edge counting?*

### Summary
This problem uses the **connected components** and **component property-checking** pattern, common in graph algorithms. The solution is efficient because it leverages BFS/DFS to identify components and simple counting logic to check completeness, making it broadly applicable to other problems involving component-wise properties in graphs (e.g., finding cliques or dense subgraphs).


### Flashcard
Find connected components via DFS/BFS; for each component with k nodes, check if edge count equals k × (k−1) / 2 (complete graph condition), count valid components.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Number of Connected Components in an Undirected Graph(number-of-connected-components-in-an-undirected-graph) (Medium)