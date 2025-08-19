### Leetcode 1697 (Hard): Checking Existence of Edge Length Limited Paths [Practice](https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths)

### Description  
Given an undirected weighted graph with n nodes and integer edgeList (each edge: [u, v, w]), and an array queries where each query is [p, q, limit], return a boolean for each query: Is there a path from node p to q where all edges along the path are strictly less than limit?
- Large n, large edge/queries: need efficient solution.
- For each query: path should only use edges with weights < limit.

### Examples  

**Example 1:**  
Input: `n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8]], queries = [[0,2,5],[0,2,2]]`  
Output: `[true,false]`  
*Explanation: For [0,2,5], path 0→1→2 uses edges 2,4 (<5). For [0,2,2], there is no such path with weight <2.*

**Example 2:**  
Input: `n = 5, edgeList = [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], queries = [[0,4,14],[1,4,13]]`  
Output: `[true,false]`  
*Explanation: [0,4,14]: 10,5,9,13 → path exists up to weight <14. [1,4,13]: must use edge 13 (not <13), so return false.*

**Example 3:**  
Input: `n=2, edgeList=[], queries=[[0,1,1]]`  
Output: `[false]`  
*Explanation: No edges, so false.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each query, do BFS/DFS filtering edges; too slow given constraints.
- Optimize by processing queries sorted by limit, just as we process edges in order of weight. Use Union Find/DSU: as we process queries with increasing limits, keep joining components connected via edges < limit. For each query, check if p and q are connected so far.
- Key: Offline, sort queries by limit, process together with edges.

### Corner cases to consider  
- No path exists (disconnected graph)
- Multiple queries with same limit
- Edge weights exactly equal to limit (should not be included)
- Empty edgeList
- Self-query (p == q)

### Solution

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x
    def union(self, x, y):
        xr = self.find(x)
        yr = self.find(y)
        if xr != yr:
            self.parent[xr] = yr

def distanceLimitedPathsExist(n, edgeList, queries):
    queries = [q + [i] for i, q in enumerate(queries)] # add original index
    edgeList.sort(key=lambda x: x[2]) # sort by weight
    queries.sort(key=lambda x: x[2])  # sort by limit
    dsu = DSU(n)
    res = [False]*len(queries)
    i = 0
    for p, q, limit, idx in queries:
        while i < len(edgeList) and edgeList[i][2] < limit:
            dsu.union(edgeList[i][0], edgeList[i][1])
            i += 1
        if dsu.find(p) == dsu.find(q):
            res[idx] = True
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O((E + Q) log(E + Q)) for sorting, nearly O(1) union/find operations on amortized union-find for each edge and query.
- **Space Complexity:** O(n) for DSU, plus O(Q) for result array.

### Potential follow-up questions (as if you’re the interviewer)  
- How do you handle edge deletions or dynamic updates?  
  *Hint: Standard DSU does not support edge deletions efficiently, need more advanced data structures.*

- Can we answer queries online, not offline (as they arrive)?  
  *Hint: You'd need more complex structure, possibly dynamic connectivity or segment tree + DSU.*

- What if the queries ask for exact length = limit, not < limit?  
  *Hint: Change the comparison accordingly when joining edges or processing queries.*

### Summary
Classic offline union-find/DSU approach with sorting, used in Kruskal’s minimum/maximum spanning tree, component connectivity with edge limits, and batch-processing queries efficiently on static graphs.

### Tags
Array(#array), Two Pointers(#two-pointers), Union Find(#union-find), Graph(#graph), Sorting(#sorting)

### Similar Problems
- Checking Existence of Edge Length Limited Paths II(checking-existence-of-edge-length-limited-paths-ii) (Hard)
- Number of Good Paths(number-of-good-paths) (Hard)
- Minimum Score of a Path Between Two Cities(minimum-score-of-a-path-between-two-cities) (Medium)