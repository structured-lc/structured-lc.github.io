### Leetcode 1489 (Hard): Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree [Practice](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree)

### Description  
Given an undirected, connected weighted graph with `n` nodes labeled from `0` to `n-1` and a list of edges where each edge is defined as `[u, v, weight]`, find the edges that are **critical** and **pseudo-critical** in the context of Minimum Spanning Trees (MST):
- **Critical edge:** Removing this edge increases the weight of all MSTs or disconnects the graph, i.e., this edge must be in any MST.
- **Pseudo-critical edge:** This edge can be in some MSTs, but excluding it does not necessarily increase the MST's weight.

Return a list containing two sublists: the indices of the critical edges and the indices of the pseudo-critical edges in any order.

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]`  
Output: `[[0,1],[2,3,4,5]]`  
*Explanation: Edges 0 and 1 are present in every MST. Edges 2,3,4,5 can appear in at least one MST but are not mandatory in all.*

**Example 2:**  
Input: `n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]`  
Output: `[[],[0,1,2,3]]`  
*Explanation: All edges can be included in some MST, but none is required in every MST, so all are pseudo-critical.*

**Example 3:**  
Input: `n = 3, edges = [[0,1,1],[1,2,2],[0,2,3]]`  
Output: `[,[1]]`  
*Explanation: Edge 0 is in every MST (removing it increases weight); edge 1 is pseudo-critical (can appear in at least one MST).*

### Thought Process (as if you’re the interviewee)  

- **First**, I need to compute the MST of the entire graph and record its total weight as the baseline.
- **Critical Edge:** To check if an edge is critical, I exclude it and try to find a new MST. If the new MST's weight is higher or if the graph becomes disconnected, that edge is critical (must be present for minimality).
- **Pseudo-Critical Edge:** For this, I forcibly include the edge and then build the MST. If the weight remains the same as the baseline, this edge can participate in at least one MST but is not strictly required.

**Brute-force idea:**  
For each edge, try removing it and record if MST cost increases. Separately, try forcibly adding each edge and check if MST cost is still baseline.  
But, rebuilding MST n times for each edge is expensive.

**Optimized approach:**  
Use **Kruskal’s algorithm** (with Union-Find/DSU) because it’s efficient for MST and can be adapted to include/exclude edges easily.  
- Assign an index to each edge for result reporting.
- For each edge i:
  - Exclude i, run Kruskal: if MST cost increases or graph is disconnected ⇒ edge is critical.
  - Include i forcefully at the start, then Kruskal as normal: if MST cost is baseline ⇒ pseudo-critical.
Kruskal fits this approach perfectly as edge inclusion/exclusion can be controlled, and edge order is determined by weight.

### Corner cases to consider  
- Graph has multiple edges with same weight.
- MST isn’t unique: pseudo-critical edges can exist.
- An edge not present in any MST (never used).
- Edge list is empty (no edges), or n = 1 (no edges at all).
- Graph is a single cycle: all edges can be pseudo-critical.
- Edges with large weights not affecting final MST.

### Solution

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
        self.components = n
        
    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x
        
    def union(self, x, y):
        xr = self.find(x)
        yr = self.find(y)
        if xr == yr:
            return False
        if self.rank[xr] < self.rank[yr]:
            self.parent[xr] = yr
        elif self.rank[xr] > self.rank[yr]:
            self.parent[yr] = xr
        else:
            self.parent[yr] = xr
            self.rank[xr] += 1
        self.components -= 1
        return True

def findCriticalAndPseudoCriticalEdges(n, edges):
    # Add original index to each edge
    edges_with_idx = [e + [i] for i, e in enumerate(edges)]
    # Sort edges by weight
    edges_with_idx.sort(key=lambda x: x[2])
    
    def kruskal(exclude_edge_idx = -1, force_include = None):
        uf = DSU(n)
        total = 0
        if force_include is not None:
            u, v, w, idx = edges_with_idx[force_include]
            if uf.union(u, v):
                total += w
        for u, v, w, idx in edges_with_idx:
            if idx == exclude_edge_idx:
                continue
            if force_include is not None and idx == edges_with_idx[force_include][3]:
                continue  # Already included
            if uf.union(u, v):
                total += w
        # Only spanning if all nodes connected
        return total if uf.components == 1 else float('inf')
    
    # Base MST weight
    base_weight = kruskal()
    
    critical = []
    pseudo_critical = []
    
    for i in range(len(edges)):
        # 1. Check if edge is critical (exclude it)
        if kruskal(exclude_edge_idx = edges_with_idx[i][3]) > base_weight:
            critical.append(edges_with_idx[i][3])
        else:
            # 2. Check if edge is pseudo-critical (force include)
            if kruskal(force_include = i) == base_weight:
                pseudo_critical.append(edges_with_idx[i][3])
    
    return [critical, pseudo_critical]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(E² × α(N)), where E = number of edges, N = nodes, α = inverse Ackermann (from DSU).  
  For each edge, two Kruskal runs are required, each O(E × α(N)).
- **Space Complexity:**  
  O(E + N).  
  Edge list and DSU data structures are linear in edges and nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if the input graph is disconnected?
  *Hint: Can an MST exist in that case? What would you return?*

- How do pseudo-critical edges relate to the uniqueness of the MST?
  *Hint: Try thinking of situations when MST is not unique.*

- Can the solution be parallelized to increase performance for large graphs?
  *Hint: Consider processing different edges independently.*

### Summary
This problem showcases a classic **Kruskal’s MST pattern** with extensions for forced inclusion and exclusion to analyze edge importance.  
The key insight is treating MST computation as a “what if” simulation: forcibly leave out or include edges and compare outcomes to the baseline minimum.  
Variants of this pattern arise in network reliability, circuit design, and understanding graph sensitivities. The solution is also a strong Union-Find application, helpful for many competitive programming and coding interviews.


### Flashcard
Compute MST weight; for each edge, exclude it to check if MST weight increases (critical), and forcibly include it to check if MST weight stays same (pseudo-critical).

### Tags
Union Find(#union-find), Graph(#graph), Sorting(#sorting), Minimum Spanning Tree(#minimum-spanning-tree), Strongly Connected Component(#strongly-connected-component)

### Similar Problems
