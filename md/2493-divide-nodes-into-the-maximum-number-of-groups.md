### Leetcode 2493 (Hard): Divide Nodes Into the Maximum Number of Groups [Practice](https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups)

### Description  
Given an undirected graph with **n** nodes (labeled 1 to n) and a list of bidirectional **edges**, divide the nodes into the maximum possible number of **m** groups (1-indexed) such that:
- Each node belongs to exactly one group.
- For every edge [a, b], if a belongs to group x and b belongs to group y, then |y - x| = 1 (i.e., connected nodes are always in adjacent groups).
Return the maximum number of groups into which you can divide the nodes while satisfying the above rules. If it's impossible, return -1. The graph may be disconnected.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[1,2],[2,3],[3,4]]`  
Output: `4`  
*Explanation: The graph is a path: 1-2-3-4. We can group them as 1, 2, 3, 4. Node 1 in group 1, 2 in group 2, 3 in group 3, 4 in group 4. Each edge connects nodes in consecutive groups.*

**Example 2:**  
Input: `n = 3, edges = [[1,2],[2,3],[3,1]]`  
Output: `-1`  
*Explanation: The graph is a cycle of length 3. It's not possible to assign groups such that all edges link only adjacent groups.*

**Example 3:**  
Input: `n = 5, edges = [[1,2],[3,4],[4,5]]`  
Output: `3`  
*Explanation: There are two components. One is 1-2 (requires 2 groups), and the other is 3-4-5 (can be grouped as 1, 2, 3). Maximum group needed across all components is 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible way to assign group numbers, which is exponential and infeasible for n up to 10⁵ due to combinatorics.

- **Key observations:**  
  - This is a **graph coloring problem**, but with stricter rules: connected nodes must differ by exactly 1 in their group assignments.
  - For each connected component:
    - If the component has an **odd-length cycle**, it's impossible to assign such groupings (no valid assignment).
    - For acyclic components (trees), or bipartite graphs, we can assign groups based on the distance from a starting node.
    - To maximize the group count, find the **longest shortest path** in each component (i.e., the diameter), and assign group indices by BFS level.

- **Optimized approach:**  
  1. For each connected component:
    - Use BFS to check for odd cycles (not bipartite ⇒ impossible), else:
    - For every node, run BFS to find the farthest node (the diameter).
    - The diameter + 1 is the number of groups for this component.
    - Keep the maximum number across all components.
  2. If any component is impossible, return -1.

- **Why this works:**  
  - The BFS levels guarantee group labels for adjacent nodes differ by exactly 1.
  - Diameter captures the maximum possible group count for a path within the component.
  - For cycles, odd cycles break the rule, so we must detect them.

### Corner cases to consider  
- Empty graph (n = 1, edges = []). Max group = 1.
- Disconnected graph with multiple components (some possible, some not).
- Graph with self-loops or parallel edges.
- Long chains vs. large complete graphs.
- Odd cycles (impossible) vs. even cycles (possible).
- Multiple equal-length "diameter" paths in the same component.

### Solution

```python
from collections import deque, defaultdict

def magnificent_sets(n, edges):
    # Build adjacency list (1-based)
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
        
    visited = [0] * (n + 1)  # 0: unvisited, >0: group id
    answer = 0

    for node in range(1, n + 1):
        if visited[node]:
            continue
        
        # Find all nodes in this component
        component = []
        queue = deque([node])
        visited[node] = 1
        while queue:
            u = queue.popleft()
            component.append(u)
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = 1
                    queue.append(v)
        
        # For this component, check possible and find max level
        max_group = 0
        # Try each node as a starting point; find the largest possible group count
        for start in component:
            level = {start: 1}
            queue = deque([start])
            ok = True
            while queue and ok:
                u = queue.popleft()
                for v in graph[u]:
                    if v not in level:
                        level[v] = level[u] + 1
                        queue.append(v)
                    else:
                        if abs(level[v] - level[u]) != 1:
                            ok = False
                            break
            if ok:
                max_group = max(max_group, max(level.values()))
            else:
                return -1
        
        answer += max_group

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst case (for each node in largest component, we BFS over the component); but typically better for sparse graphs.
- **Space Complexity:** O(n + m) for adjacency list, O(n) for visited and BFS structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize the repeated BFS from every node in a component for large graphs?  
  *Hint: The diameter of the graph can be found in two BFS runs.*

- What if the group gap required was not 1, but k?  
  *Hint: What property would change, and how would this affect coloring?*

- What changes if the graph is directed?  
  *Hint: The property of adjacency of groupings fundamentally changes for directed edges.*

### Summary
This problem uses **multi-source BFS**, **graph traversal**, and **component analysis** to maximize group assignments under edge constraints. The idea of checking for bipartition and calculating graph **diameter** is recurrent in many network, scheduling, and coloring problems. Being able to reduce "distance constrained grouping" to BFS layers is a useful graph interview pattern.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Binary Tree Level Order Traversal(binary-tree-level-order-traversal) (Medium)
- Is Graph Bipartite?(is-graph-bipartite) (Medium)
- Shortest Cycle in a Graph(shortest-cycle-in-a-graph) (Hard)