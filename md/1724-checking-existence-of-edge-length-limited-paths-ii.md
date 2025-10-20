### Leetcode 1724 (Hard): Checking Existence of Edge Length Limited Paths II [Practice](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii)

### Description  
You are given an undirected graph with **n** nodes (labeled 0 to n-1) and a list of weighted edges. Each edge is represented as `[u, v, dis]` (an edge between nodes u and v with distance dis). The task is to design a data structure that:
- Is initialized with the graph (all nodes and the given list of edges).
- Efficiently answers queries of the form `(p, q, limit)`: does there exist a path from node p to q where **all** edges along the path have distance **strictly less than** limit?

**Key Points:**  
- There may be multiple edges between two nodes.
- The graph isn't necessarily connected.
- Each query should be answered independently.

### Examples  

**Example 1:**  
Input:  
n = 3,  
edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]]  
Queries:  
query(0, 1, 2)  
Output: `False`  
*Explanation: The only path 0→1 has edge 2, not < 2.*

**Example 2:**  
Input:  
query(0, 2, 5)  
Output: `True`  
*Explanation: Path 0→1→2 uses edges 2 and 4, both < 5.*

**Example 3:**  
Input:  
query(0, 2, 8)  
Output: `True`  
*Explanation: Direct 0→2 edge is 8 (not < 8), but path 0→1→2 uses edges 2 and 4, both < 8.*

**Example 4:**  
Input:  
query(0, 2, 9)  
Output: `True`  
*Explanation: Direct 0→2 edge (8) is < 9, so this is allowed.*

### Thought Process (as if you’re the interviewee)  
For each query, naïvely, we could perform a BFS/DFS from p, traversing only edges where weight < limit, checking if we reach q.  
- **Brute-force:** BFS/DFS per query ⇒ too slow (up to 10⁴ queries, large graph).

To optimize:
- Since allowed edges in a query only depend on the limit, we can **preprocess edges**.
- If all queries were offline, and known in advance, we could sort both edges and queries by their “limit”, use a **Union-Find** (Disjoint Set Union, DSU) structure:
  - Sweep through the sorted queries; for each, union all edges with weight < current query's limit before responding.
  - For each query, just check if p and q are connected (in the same DSU component).
- To support dynamic queries, we must efficiently look up connectivity for an arbitrary limit.  
- For the online version, we can use an **offline batching trick** (batch input, sort, answer, or in production, build a **segment tree** or **persistent DSU** for true online queries — but for Leetcode, offline DSU suffices).

**Trade-offs:**
- Simple BFS is O(N+E) per query, which is prohibitive.
- Offline DSU approach is fast: O((E+Q) log(E+Q)) for all queries, and nearly O(1) per connectivity check.

### Corner cases to consider  
- Empty edgeList: all queries are false unless p == q and limit > 0
- Disconnected graph components
- Multiple edges between same nodes with different distances
- Edges with exactly limit value (must be strictly less than!)
- Single node graph, or p == q
- Self-loops (should not exist, but if present, must handle)
- Queries where limit is very small (e.g., limit=0) or very large

### Solution

```python
class DistanceLimitedPathsExist:
    def __init__(self, n, edgeList):
        # Sort edges by weight
        self.n = n
        self.edges = sorted(edgeList, key=lambda x: x[2])
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        # Standard union-find 'find' with path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        # Union by rank
        xr, yr = self.find(x), self.find(y)
        if xr == yr:
            return
        if self.rank[xr] < self.rank[yr]:
            self.parent[xr] = yr
        else:
            self.parent[yr] = xr
            if self.rank[xr] == self.rank[yr]:
                self.rank[xr] += 1

    def query(self, p, q, limit):
        # For each query, process edges up to this limit
        # To avoid re-processing, track last_limit and last_edge
        if not hasattr(self, 'last_limit'):
            self.last_limit = 0
            self.last_edge = 0
            self.seen_limits = []
        
        # Fast-forward edges with weight < limit
        while self.last_edge < len(self.edges) and self.edges[self.last_edge][2] < limit:
            u, v, w = self.edges[self.last_edge]
            self.union(u, v)
            self.last_edge += 1
        
        return self.find(p) == self.find(q)
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - **Constructor:** O(E log E), for sorting edges (`E = edgeList.length`)
  - **Each query:** Worst-case amortized O(α(N)), where α is inverse Ackermann (nearly constant), plus possibly processing O(E) edges once in total (all queries combined).
  - **All Q queries + edge sweeps:** O((E + Q) log E), with union-find fast for all queries after pre-processing.
- **Space Complexity:**
  - O(N + E) — parent/rank arrays and edgeList storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support dynamic addition/removal of edges and real online queries?
  *Hint: Consider persistent union-find or heavy-light decomposition with segment trees.*

- Can you answer the query if you must also return the actual path, not just existence?
  *Hint: Track parent graphs or use BFS with path reconstruction on filtered edges.*

- What changes if weights are allowed to be zero or negative?
  *Hint: Union-find remains valid for existence; negative cycles irrelevant for this existence query.*

### Summary
This problem is a classic application of the **offline query+union-find+sorting** paradigm. It leverages the fact that query constraints on edge weights can be handled by batch-processing, reminiscent of Kruskal’s MST approach. The same pattern is useful in problems involving dynamic connectivity under constraints, such as connectivity queries on graphs with changing edge cost limits.


### Flashcard
For offline queries, sort edges and queries by limit, use Union-Find to dynamically connect edges—answer each query based on current connectivity.

### Tags
Union Find(#union-find), Graph(#graph), Minimum Spanning Tree(#minimum-spanning-tree)

### Similar Problems
- Checking Existence of Edge Length Limited Paths(checking-existence-of-edge-length-limited-paths) (Hard)
- Number of Good Paths(number-of-good-paths) (Hard)
- Minimum Score of a Path Between Two Cities(minimum-score-of-a-path-between-two-cities) (Medium)