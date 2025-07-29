### Leetcode 1579 (Hard): Remove Max Number of Edges to Keep Graph Fully Traversable [Practice](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable)

### Description  
Given a graph with `n` nodes and `edges`, where each edge is of type 1 (Alice only), 2 (Bob only), or 3 (shared), remove as many edges as possible while ensuring both Alice and Bob can still traverse the entire graph (i.e., the graph remains connected for both when considering allowed edges for each). Return the maximum number of edges you can remove. If full traversal is impossible for either Alice or Bob, return −1.

### Examples  

**Example 1:**  
Input: `n = 4`, `edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]`  
Output: `2`  
*Explanation: Remove two edges ([1,1,2], [2,3,4]) and both Alice and Bob can still traverse all nodes.*

**Example 2:**  
Input: `n = 4`, `edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]`  
Output: `0`  
*Explanation: Cannot remove any edges, all needed for connectivity.*

**Example 3:**  
Input: `n = 4`, `edges = [[3,2,3],[1,1,2],[2,3,4]]`  
Output: `-1`  
*Explanation: Not all nodes are reachable for Alice or Bob; return -1.*

### Thought Process (as if you’re the interviewee)  
We need to maximize the number of removable edges, but both Alice and Bob must remain fully connected using their edge types. The key is to:
- Use a Union-Find (Disjoint Set Union, DSU) to track connectivity for Alice and Bob.
- **Process all type 3 (shared) edges first** — since both can use them, they provide greatest connectivity.
- Then process type 1 (Alice only) for Alice, and type 2 (Bob only) for Bob.
For each edge, if the two nodes are already connected in the respective graph, then it's redundant and can be removed (counted towards the answer).
Finally, check that both Alice and Bob's graphs are connected (one connected component each). If not, return −1.

### Corner cases to consider  
- Disconnected graph at the start.
- All edges are shared (type 3).
- Just enough edges for connectivity for both.
- Multiple edges between the same nodes.

### Solution

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n + 1))
        self.rank = [0] * (n + 1)
        self.components = n
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    def union(self, x, y):
        xr, yr = self.find(x), self.find(y)
        if xr == yr:
            return False
        if self.rank[xr] < self.rank[yr]:
            self.parent[xr] = yr
        else:
            self.parent[yr] = xr
            if self.rank[xr] == self.rank[yr]:
                self.rank[xr] += 1
        self.components -= 1
        return True

def maxNumEdgesToRemove(n, edges):
    alice = DSU(n)
    bob = DSU(n)
    res = 0
    # Type 3: shared edges first
    for t, u, v in edges:
        if t == 3:
            shared = alice.union(u, v) | bob.union(u, v)
            if not shared:
                res += 1
    # Type 1: Alice-only
    for t, u, v in edges:
        if t == 1:
            if not alice.union(u, v):
                res += 1
    # Type 2: Bob-only
    for t, u, v in edges:
        if t == 2:
            if not bob.union(u, v):
                res += 1
    if alice.components > 1 or bob.components > 1:
        return -1
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(E × α(N)), where E is the number of edges and α is the inverse Ackermann function (near constant for DSU).
- **Space Complexity:** O(N) for two DSU structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are weighted edges and we want to minimize total removal cost?
  *Hint: Greedily remove highest cost while maintaining connectivity.*
- Can you solve using a single DSU by tracking types?
  *Hint: Try using shared structure and marking edge usage per type.*
- What if some nodes are only accessible via a certain type?
  *Hint: Carefully check component roots after unions.*

### Summary
This is a union-find/DSU pattern, maximizing redundant edges by connecting with shared edges first and then the unique edges for each user. It's a classic graph problem where edge types and component tracking are combined efficiently.
