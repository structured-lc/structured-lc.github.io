### Leetcode 3493 (Medium): Properties Graph [Practice](https://leetcode.com/problems/properties-graph)

### Description  
Given a list of properties, where each property is a list of integers, model these properties as nodes in an undirected graph. Draw an edge between node i and node j when their property lists share at least k distinct integer values. The goal is to return the number of **connected components** in this graph—the count of groups where each node is reachable from every other in its group via these rules.

### Examples  

**Example 1:**  
Input: `properties = [[1,2,3], [2,3,4], [4,5,6], [5,6,7]]`, `k = 2`  
Output: `2`  
*Explanation:*
- Property sets: `{1,2,3}`, `{2,3,4}`, `{4,5,6}`, `{5,6,7}`
- `(0,1)` share `{2,3}` (size 2 ≥ k), so edge.
- `(2,3)` share `{5,6}` (size 2 ≥ k), so edge.
- No other pairs overlap with ≥ 2 elements.
- Two connected components: nodes 0–1, and nodes 2–3.

**Example 2:**  
Input: `properties = [[1,2],[2,3],[3,1]]`, `k = 1`  
Output: `1`  
*Explanation:*
- All pairs overlap on at least 1 element.
- The entire graph is connected; only 1 component.

**Example 3:**  
Input: `properties = [[1],[2],[3]]`, `k = 1`  
Output: `3`  
*Explanation:*
- No overlaps; every node is isolated.
- Three components.

### Thought Process (as if you’re the interviewee)  
- The brute-force way is: for every pair (i, j), form sets and count their intersection; if it's ≥ k, draw an edge between i and j. Then, count connected components using BFS/DFS or Union-Find.
- Optimizations:
  - Since properties can be turned to sets, intersection checks are O(property length).
  - Rather than explicitly building the edge list, we can use Union-Find to merge connected nodes on the fly, saving memory and time.
  - With n nodes, there are n×(n-1)/2 pairs. For small n, this is fine; for large properties, may be slow but constraints likely permit it.
- Tradeoff:
  - Union-Find is space efficient (tracks parents), and with path compression and union by rank, finds/counts components efficiently.

### Corner cases to consider  
- Empty properties list (`properties = []`) ⇒ should return 0.
- All properties completely disjoint ⇒ each node is its own component.
- k is 0 ⇒ all nodes connected (since intersection size 0 always true).
- k larger than any possible intersection ⇒ all nodes separate.
- Multiple nodes with identical properties.
- Single element in properties.

### Solution

```python
from typing import List

class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x: int) -> int:
        # Path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a: int, b: int):
        rootA = self.find(a)
        rootB = self.find(b)
        if rootA == rootB:
            return
        # Union by rank
        if self.rank[rootA] < self.rank[rootB]:
            self.parent[rootA] = rootB
        elif self.rank[rootA] > self.rank[rootB]:
            self.parent[rootB] = rootA
        else:
            self.parent[rootB] = rootA
            self.rank[rootA] += 1
        self.count -= 1

    def get_count(self) -> int:
        return self.count

def numberOfComponents(properties: List[List[int]], k: int) -> int:
    n = len(properties)
    if n == 0:
        return 0

    uf = UnionFind(n)
    # Convert each property list to a set
    property_sets = [set(lst) for lst in properties]

    for i in range(n):
        for j in range(i + 1, n):
            # Check size of intersection
            if len(property_sets[i] & property_sets[j]) >= k:
                uf.union(i, j)

    return uf.get_count()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × m),  
  - n = number of property lists, m = average property list size.
  - There are n(n-1)/2 pairs, and for each, set-intersection cost is O(m).
- **Space Complexity:** O(n × m),  
  - Each property converted to set of size ≈ m.
  - Union-Find uses O(n) for parent/rank arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the size of each property list is huge—can we optimize intersection checks?
  *Hint: Use hash-based counting or mapping from value → indices to only compare necessary pairs.*

- How to answer queries (dynamic scenario) where properties arrive over time and we need to update components?
  *Hint: Use dynamic Union-Find with support for merges.*

- If allowed to preprocess, is there a faster way to quickly find overlapping properties?
  *Hint: Invert map: map value → property indices. Only compare pairs that share values.*

### Summary
This problem uses the **Connected Components** pattern, leveraging **Union-Find (Disjoint Set Union)** for efficient merging and counting of groups.  
It's a common approach for grouping by similarity (here, intersection size), and appears in graph, grouping, and clustering problems where connectivity must be tracked without explicit graph construction.  
The mapping-to-sets and pairwise intersection ideas are broadly applicable, especially in "group by shared property" interview questions.


### Flashcard
Use Union-Find to merge nodes whose property sets intersect in ≥ k elements, then count connected components.

### Tags
Array(#array), Hash Table(#hash-table), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
