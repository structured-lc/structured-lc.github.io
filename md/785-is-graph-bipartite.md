### Leetcode 785 (Medium): Is Graph Bipartite? [Practice](https://leetcode.com/problems/is-graph-bipartite)

### Description  
Given an undirected graph, represented as an adjacency list, determine if the graph is **bipartite**. A graph is bipartite if you can split all its nodes into two groups (sets) such that no two nodes within the same group are connected directly by an edge.  
Think of it as coloring the graph with two colors: no two adjacent nodes can share the same color. The graph may have multiple disconnected components, may be empty, and always contains no self-edges or duplicate edges.

### Examples  

**Example 1:**  
Input: `graph = [[1,2,3],[0,2],[0,1,3],[0,2]]`  
Output: `False`  
Explanation:  
- The graph can't be colored using only two groups so that every edge joins nodes from different groups.  
- At least one cycle of odd length (triangle 0-1-2-0), forcing a color clash.

**Example 2:**  
Input: `graph = [[1,3],[0,2],[1,3],[0,2]]`  
Output: `True`  
Explanation:  
- Nodes `{0, 2}` can be colored with one group, `{1, 3}` with the other.  
- Every edge links nodes from opposite groups: a valid bipartition.

**Example 3:**  
Input: `graph = [[]]`  
Output: `True`  
Explanation:  
- A single node with no edges is trivially bipartite. (No color conflicts since there are no connections.)

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- Try all possible partitions—exponential, not feasible for large `n`.

Optimized approach:  
- Model this as a coloring problem. Try to assign one of two colors (0 or 1) to every node, ensuring that no two adjacent nodes receive the same color.
- Use BFS or DFS for coloring:
  - For each node, assign a color if not already colored.
  - For every neighbor, assign the opposite color.
  - If a neighbor already has the same color as the current node, the graph is **not bipartite**.
  - Handle all components: for disconnected graphs, repeat for every uncolored node.

Why this works:  
- If you ever have to assign the same color to two connected nodes, you must have a cycle of odd length—classic bipartite property violation.
- Both DFS and BFS will work. DFS is more natural in Python for recursion, while BFS avoids recursion depth issues.

Trade-offs:  
- BFS has slightly more overhead, but both are O(n + e).
- Must remember to loop over all nodes (since disconnected graphs are possible).

### Corner cases to consider  
- Empty graph (`[]` or all inner lists empty): should return `True`
- Single node, no edges
- Disconnected components (multiple isolated subgraphs)
- Odd cycles (cannot be bipartite)
- Even cycles (can be bipartite)
- Fully connected graph with more than 2 nodes (not bipartite)
- Multiple edges not present, but still be cautious in logic

### Solution

```python
def isBipartite(graph):
    # colors[node] == 0 or 1 -> colored; -1 -> uncolored
    n = len(graph)
    colors = [-1] * n
    
    def dfs(node, color):
        colors[node] = color
        for neighbor in graph[node]:
            if colors[neighbor] == -1:
                # Recursively color neighbor with opposite color
                if not dfs(neighbor, 1 - color):
                    return False
            elif colors[neighbor] == color:
                # Found neighbor with same color: not bipartite
                return False
        return True

    for i in range(n):
        if colors[i] == -1:
            if not dfs(i, 0):
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + e), where n is the number of nodes and e is the number of edges. Each node and edge is visited at most once during coloring.
- **Space Complexity:** O(n) extra for the coloring array and recursion stack (worst case linear in number of nodes).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input graph is huge (e.g., millions of nodes)?
  *Hint: Consider iterative BFS to avoid recursion stack overflow.*

- How would you modify this to return the actual groups (partition sets), not just True/False?
  *Hint: Trace which nodes you colored as 0 and which as 1, then output the two sets.*

- Can you detect an odd-length cycle and output one, if the graph is not bipartite?
  *Hint: Keep parent pointers during BFS/DFS to reconstruct cycles upon clash.*

### Summary
This problem is a classic **two-coloring / graph traversal** paradigm. The DFS/BFS coloring pattern is widely applicable to problems requiring "partitioning" or "separation" of connected items subject to adjacency constraints—for example, checking bipartite status, scheduling problems, or separating conflicting tasks. Recognizing odd cycles as key obstructions is fundamental in graph theory.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Divide Nodes Into the Maximum Number of Groups(divide-nodes-into-the-maximum-number-of-groups) (Hard)