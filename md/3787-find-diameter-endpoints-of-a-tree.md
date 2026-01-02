### Leetcode 3787 (Medium): Find Diameter Endpoints of a Tree [Practice](https://leetcode.com/problems/find-diameter-endpoints-of-a-tree)

### Description  
Given an undirected tree with n nodes numbered 0 to n-1 and a list of edges, return any two nodes that are endpoints of a longest path (diameter) in the tree. The tree has exactly one path between any two nodes, and a diameter is the longest such path measured by number of edges.

### Examples  

**Example 1:**  
Input: `n = 6, edges = [[0,1],[1,2],[2,3],[3,4],[4,5]]`  
Output: `[0,5]`  
*Explanation: The tree is a straight line 0-1-2-3-4-5. The longest path has 5 edges from node 0 to node 5.*

**Example 2:**  
Input: `n = 4, edges = [[0,1],[0,2],[0,3]]`  
Output: `[1,2]` or `[1,3]` or `[2,3]`  
*Explanation: The tree is a star with center 0. Any two leaves form a diameter of length 2.*

**Example 3:**  
Input: `n = 2, edges = [[0,1]]`  
Output: `[0,1]`  
*Explanation: The only path is between 0 and 1, which is the diameter.*


### Thought Process (as if you’re the interviewee)  
First, I recognize this is an undirected tree, so no cycles, and diameter is the longest path. Brute force: for every pair of nodes, compute distance via BFS/DFS (O(n) per pair), total O(n³)—too slow for n up to 10⁵.  

Optimize: In trees, diameter endpoints are leaves or found via two-BFS method. Start BFS from any node (say 0), find farthest node u. Then BFS from u to find farthest node v. The path u-v is a diameter, and u,v are endpoints. This works because farthest from arbitrary node leads to one endpoint, then from there to the other.  

Why this over DFS height computation? BFS is intuitive for unweighted trees, handles general trees (not binary), uses adjacency list. Trade-off: Two BFS passes (O(n) each) vs single DFS, but BFS is straightforward for interviews. Confirm with examples: line tree gives correct ends, star gives leaf pair.

### Corner cases to consider  
- n=1: No edges, but problem likely assumes n≥2; return [-1,-1] or handle as no diameter.  
- n=2: Single edge, endpoints are the two nodes.  
- Star tree: Center with many leaves; any two leaves work.  
- Skewed line: Ends are correct farthest nodes.  
- Disconnected? No, tree is connected by definition.

### Solution

```python
from typing import List
from collections import deque

def findDiameterEndpoints(n: int, edges: List[List[int]]) -> List[int]:
    # Build adjacency list for undirected tree
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    # BFS helper: return farthest node from start and its distance
    def farthest(start):
        visited = [-1] * n
        visited[start] = 0
        q = deque([start])
        far_node, far_dist = start, 0
        
        while q:
            node = q.popleft()
            for nei in adj[node]:
                if visited[nei] == -1:
                    visited[nei] = visited[node] + 1
                    if visited[nei] > far_dist:
                        far_dist = visited[nei]
                        far_node = nei
                    q.append(nei)
        return far_node
    
    # Step 1: BFS from node 0 to find one endpoint u
    u = farthest(0)
    
    # Step 2: BFS from u to find other endpoint v
    v = farthest(u)
    
    return [u, v]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Two BFS traversals visit each node and edge once (tree has n-1 edges).  
- **Space Complexity:** O(n) — Adjacency list O(n), queue and visited array O(n) worst-case (skewed tree).


### Potential follow-up questions (as if you’re the interviewer)  

- Return the diameter length along with endpoints.  
  *Hint: Track max distance in second BFS; compare to standard tree diameter via heights.*

- Find all possible diameter endpoints if multiple diameters exist.  
  *Hint: From u, collect all nodes at max distance; verify pairs between them.*

- Given weighted edges, adapt to find weighted diameter endpoints.  
  *Hint: Use Dijkstra instead of BFS; priority queue makes it O(n log n).*

### Summary
Use two BFS passes on the tree: from arbitrary node to one endpoint, then from there to the other. This is a classic tree diameter pattern, commonly applied in graph/tree problems like longest path in undirected acyclic graphs.

### Flashcard
Start BFS from any node to find farthest u, then BFS from u to find farthest v—u and v are diameter endpoints in O(n) time.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
