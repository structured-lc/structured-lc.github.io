### Leetcode 684 (Medium): Redundant Connection [Practice](https://leetcode.com/problems/redundant-connection)

### Description  
Given an undirected graph that started as a tree (connected, no cycles), we’re given one extra edge that creates exactly one cycle.  
Our job is to **find the redundant edge** (the one causing the cycle) such that if we remove it, the resulting graph is a tree again.  
If there are multiple redundant edges (possible if the cycle is longer), return the one that appears last in the edge list.  
Each edge is represented as a pair [u, v], meaning u and v are connected.

### Examples  

**Example 1:**  
Input: `edges = [[1,2],[1,3],[2,3]]`  
Output: `[2,3]`  
*Explanation: The first two edges create a tree. The edge [2,3] forms a cycle: 1—2—3—1. Removing [2,3] breaks the cycle and leaves a tree.*

**Example 2:**  
Input: `edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]`  
Output: `[1,4]`  
*Explanation: The edges up to [3,4] form a tree. Adding [1,4] creates a 4-node cycle: 1—2—3—4—1. Removing [1,4] restores the tree with all nodes connected.*

**Example 3:**  
Input: `edges = [[1,2],[2,3],[3,1]]`  
Output: `[3,1]`  
*Explanation: This is a triangle (1-2-3-1). Removing [3,1] breaks the cycle and leaves a tree.*

### Thought Process (as if you’re the interviewee)  
Let’s approach this step by step:
- **Naive approach:** For each edge, temporarily remove it and check if the rest forms a tree using DFS/BFS.  
  - But removing and checking for every edge means O(n²) time—not optimal.
- **Optimal approach:** 
  - Since we’re dealing with cycles, use **Union-Find (Disjoint Set)** to track connectivity.
  - For each edge [u, v], if u and v are already connected (have same root), then adding [u, v] creates a cycle—that’s the redundant edge.
  - Otherwise, union them and proceed.
- Union-Find with **path compression** and optional union by rank gives us nearly O(n) performance.
- The Union-Find method also naturally gives us the last added redundant edge, as we process edges in order.

### Corner cases to consider  
- Edges are labeled from 1 to n (not zero-based!).
- The cycle may be at the end (last edge).
- The input will always have exactly one redundant edge.
- No repeated edges, and no self-loops.
- Graph is always initially valid (starts as a tree plus one extra edge).

### Solution

```python
def findRedundantConnection(edges):
    # Helper function to find the root of node x
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]

    # Helper function to union two nodes, returns False if cycle detected
    def union(x, y):
        root_x = find(x)
        root_y = find(y)
        if root_x == root_y:
            return False  # x and y already connected: adding edge creates a cycle!
        parent[root_y] = root_x
        return True

    n = len(edges)
    parent = [i for i in range(n+1)]  # 1-based index; parent[0] unused

    for u, v in edges:
        if not union(u, v):
            return [u, v]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × α(n)), where α is the inverse Ackermann function (almost constant for n ≤ 1000).  
  Each `find` and `union` uses path compression for efficiency.
- **Space Complexity:** O(n) for the parent array used to track the components.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input could have multiple redundant edges?  
  *Hint: Think about detecting all cycles, not just the last to appear.*

- How would your solution change if the graph could have self-loops or parallel edges?  
  *Hint: You’d need to detect and handle forbidden edges before running Union-Find.*

- Can you return all edges that, if removed, would break cycles (not just the last one)?  
  *Hint: Store all edges where union fails, not just the last one.*

### Summary
This is a classic **cycle detection in undirected graph** problem, efficiently solved using the **Union-Find (Disjoint Set)** algorithm.  
Union-Find is a common coding pattern for questions involving connected components, cycles, network connectivity, and is widely used in Kruskal’s MST and other graph problems.  
The problem demonstrates how to efficiently detect cycles in a streaming manner, with O(n) performance and minimal storage.


### Flashcard
Use Union-Find to detect cycles; the first edge that connects two nodes already in the same set is the redundant connection.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Redundant Connection II(redundant-connection-ii) (Hard)
- Accounts Merge(accounts-merge) (Medium)
- Maximum Employees to Be Invited to a Meeting(maximum-employees-to-be-invited-to-a-meeting) (Hard)
- Shortest Cycle in a Graph(shortest-cycle-in-a-graph) (Hard)