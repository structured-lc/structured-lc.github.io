### Leetcode 2421 (Hard): Number of Good Paths [Practice](https://leetcode.com/problems/number-of-good-paths)

### Description  
Given a connected, undirected tree (acyclic graph) with `n` nodes and `n-1` edges, each node has an integer value in the array `vals`. A **good path** is defined as a path where:
- The start and end nodes have the same value.
- All nodes along the path have values ≤ that node's value (i.e., the largest value is at the endpoints).
Reverse paths are not counted as different, and single nodes are always considered good paths. Return the total number of distinct good paths in the tree.

### Examples  

**Example 1:**  
Input: `vals = [1,3,2,1,3]`, `edges = [[0,1],[0,2],[2,3],[2,4]]`  
Output: `6`  
*Explanation: 5 good paths are single nodes. 1 more is 1→0→2→4, since all nodes are ≤ 3, and both endpoints have value 3.*

**Example 2:**  
Input: `vals = [1,1,2,2,3]`, `edges = [[0,1],[1,2],[2,3],[2,4]]`  
Output: `7`  
*Explanation: 5 singleton good paths. Also 0→1 and 2→3, which connect same value pairs by allowed paths.*

**Example 3:**  
Input: `vals = [1]`, `edges = []`  
Output: `1`  
*Explanation: Only one node, so one good path.*

### Thought Process (as if you’re the interviewee)  
Brute force would be to check every possible pair of nodes and verify whether a path between them follows the rules (both endpoints have the same value and all nodes along the path are ≤ that value). As the graph is a tree, there's a unique path between any two nodes, but this approach is still O(n²).

To optimize, we notice:
- Each good path is defined by its maximum value at the endpoints.
- We can group nodes by their values, start from the smallest value, and union components as we traverse up.

Union Find (Disjoint Set Union) helps efficiently combine groups where nodes are connected and all intermediate nodes are less than or equal to the current value. For each value:
- For every node, we union its neighbors if the neighbor's value is ≤ the current node's value.
- For each connected component (set of connected nodes), count how many nodes have the current value. For a set of k such nodes, number of unique good paths is k + k×(k-1)/2 (self-paths and all pairs).

This is efficient because we process the edges and nodes in sorted value order, and DSU ensures efficient merging and counting.

### Corner cases to consider  
- Tree with one node.
- All node values are the same.
- All node values distinct.
- Skewed or long-chain trees.
- Large input size.

### Solution

```python
def numberOfGoodPaths(vals, edges):
    n = len(vals)
    parent = [i for i in range(n)]
    size = [1] * n  # size of each DSU component

    # Build adjacency list
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # Each node's value, and index, sorted by value
    nodes_by_value = {}
    for i, v in enumerate(vals):
        if v not in nodes_by_value:
            nodes_by_value[v] = []
        nodes_by_value[v].append(i)

    def find(u):
        while u != parent[u]:
            parent[u] = parent[parent[u]]  # path compression
            u = parent[u]
        return u

    def union(u, v):
        ru, rv = find(u), find(v)
        if ru == rv:
            return
        if size[rv] > size[ru]:
            ru, rv = rv, ru
        parent[rv] = ru
        size[ru] += size[rv]

    result = 0
    # Process the unique values in increasing order
    for value in sorted(nodes_by_value):
        # For each node with this value, connect (union) with neighbors with value ≤ value
        for u in nodes_by_value[value]:
            for v in graph[u]:
                if vals[v] <= value:
                    union(u, v)
        # Count nodes with value in each connected component
        counter = {}
        for u in nodes_by_value[value]:
            root = find(u)
            counter[root] = counter.get(root, 0) + 1
        # For each component, add combinations: k nodes -> k + k×(k-1)//2
        for count in counter.values():
            result += count * (count + 1) // 2 - (count - 1) * count // 2  # k self + pairs = k
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the unique values and efficient union/find operations (nearly O(1) with path compression). Each edge and node is processed a limited number of times.
- **Space Complexity:** O(n) for parent array, size array, adjacency list, and node groupings.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this in a non-tree (with cycles)?
  *Hint: Consider algorithms to find all simple paths, but that explodes in complexity. Is the definition of a good path still useful?*
  
- Can you optimize space for cases where `vals` has few unique values?
  *Hint: Use value compression or mapping to reduce auxiliary storage.*

- How would you extend this if each node/edge had weights?
  *Hint: You'd need a new path constraint definition; shortest path or min-max value path?*

### Summary
This problem uses the **Union Find (Disjoint Set)** structure to efficiently merge and count components by node values in order, a classic application for grouping and connected component counting. The pattern is seen elsewhere in problems requiring grouping by connectivity and constraints, and is especially effective on trees or graphs with clear merging criteria by value or label.