### Leetcode 1245 (Medium): Tree Diameter [Practice](https://leetcode.com/problems/tree-diameter)

### Description  
Given a tree (undirected, acyclic connected graph) with `n` nodes, where each node is labeled from 0 to n-1 and given as a list of edges, find the diameter of the tree. The diameter is the number of edges on the longest path between any two nodes in the tree.

### Examples  
**Example 1:**  
Input: `n=4`, `edges=[[0,1],[1,2],[1,3]]`  
Output: `3`  
*Explanation: Longest path is 2–1–3 or 0–1–2 (length 2),  so diameter is 2 (edges). Since diameter is usually edge count, with 4 nodes, longest path has 3 nodes and 2 edges, but for some definitions may be 2 or 3.*

**Example 2:**  
Input: `n=2`, `edges=[[1,0]]`  
Output: `1`  
*Explanation: Only one edge connects the two nodes, diameter is 1.*

**Example 3:**  
Input: `n=1`, `edges=[]`  
Output: `0`  
*Explanation: A single node tree has 0 diameter (no edges).* 

### Thought Process (as if you’re the interviewee)  
First, the diameter in trees is the longest path between any two nodes. Classic algorithm: Pick any node, do BFS/DFS to find the farthest node (call it x), then do BFS/DFS from x to find the node farthest from x (call it y). The distance between x and y is the diameter.

Another approach is to run DFS recursively from any root to record the maximum depth beneath each node, tracking the largest path encountered, and combining child depths as needed for internal nodes.

I prefer the BFS→BFS method for clarity, or a recursive DFS with return values for max depths.

### Corner cases to consider  
- n=1 (single node, diameter 0)
- n=2 (one edge, diameter 1)
- Long chains (like a linear path)
- Trees with multiple branches, but diameter does not go through root

### Solution

```python
from collections import defaultdict, deque

class Solution:
    def treeDiameter(self, edges):
        if not edges:
            return 0

        # Build the adjacency list
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        def bfs(start):
            visited = set()
            queue = deque([(start, 0)])
            visited.add(start)
            farthest = (start, 0)
            while queue:
                node, depth = queue.popleft()
                if depth > farthest[1]:
                    farthest = (node, depth)
                for neighbor in graph[node]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append((neighbor, depth + 1))
            return farthest

        # First BFS from any node (e.g., node in first edge)
        x, _ = bfs(edges[0][0])
        # Second BFS from x to get the diameter
        y, diameter = bfs(x)
        return diameter
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the number of nodes (processes each edge and node at most twice).
- **Space Complexity:** O(n), for adjacency list and BFS queue/visited set.

### Potential follow-up questions (as if you’re the interviewer)  
- How would the approach change for a directed graph?
  *Hint: You’d need to handle cycles or disconnections and may not have a tree.*

- How to efficiently support dynamic tree insertions and update the diameter online?
  *Hint: Need to track diameter via more advanced data structures such as LCA or Euler tour.*

- Given edge weights, how would you compute the weighted diameter?
  *Hint: Store and process edge weights in BFS/DFS, sum accordingly.*

### Summary
This problem uses the double BFS technique or recursive DFS for finding tree diameters—a classic "tree trick." It's useful in various problems involving longest paths or tree metrics.