### Leetcode 1617 (Hard): Count Subtrees With Max Distance Between Cities [Practice](https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities)

### Description  
Given n cities labeled from 1 to n, connected by n−1 undirected edges, you are given a tree (a connected acyclic graph). Each city is a node and cities are connected by roads (edges). For every 1 ≤ d < n, you need to count the number of *connected subtrees* (a subset of nodes forming a connected induced subgraph) that have a maximum distance between any two nodes within the subtree exactly equal to d. Return a list of length n−1 where the iᵗʰ element is the number of subtrees with maximum distance (diameter) exactly equal to i+1.

**Key terms:**  
- Subtree: Connected subset of cities (nodes), i.e., an induced connected subgraph.
- Maximum distance (diameter): The greatest number of edges between any two nodes in the subgraph.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[1,2],[2,3],[2,4]]`  
Output: `[3,4,0]`  
*Explanation:  
- Possible subtrees with diameter 1: `[1,2], [2,3], [2,4]` (3 ways)  
- Diameter 2: `[1,2,3], [1,2,4], [3,2,4], [2,3,4]` (4 ways)  
- Diameter 3: None (not possible with 4 nodes in this tree)*

**Example 2:**  
Input: `n = 2, edges = [[1,2]]`  
Output: `[1]`  
*Explanation:  
- The only subtree with diameter 1 is: `[1,2]`*

**Example 3:**  
Input: `n = 3, edges = [[1,2],[2,3]]`  
Output: `[2,1]`  
*Explanation:  
- Diameter 1: `[1,2], [2,3]`  
- Diameter 2: `[1,2,3]` which is the entire tree (distance between 1 and 3 is 2)*

### Thought Process (as if you’re the interviewee)  
First, brute force:  
- For each possible subset of nodes (excluding size 1), check if it's connected.
- If connected, compute all-pairs shortest paths in the induced subgraph.
- Find the maximum distance. If equal to d, increment count for d.

Since n can be up to 15, 2ⁿ subsets is feasible to enumerate.  
To efficiently check connectivity for each subset, perform BFS/DFS from any node in the subset and ensure all nodes are visited.

To find the maximum distance, perform BFS from every node in the subset and track the farthest distance (the "diameter" of the induced subgraph).

Optimizations and tradeoffs:  
- Use bitmasking to represent subsets, which is efficient for up to n = 15.
- Only consider connected components; skip others early.
- For each connected mask, precompute node list and subgraph edges to make diameters easier to compute.

Finally, iterate through all possible masks/subsets of size ≥ 2.

### Corner cases to consider  
- n = 2 (smallest possible tree)
- Highly unbalanced trees (e.g., chains/paths vs. stars)
- Subtree size 2 (must be diameter 1)
- Subset is disconnected (not counted)
- All nodes selected (diameter = original tree's diameter)
- Multiple subtrees with same diameter but different node sets

### Solution

```python
def countSubgraphsForEachDiameter(n, edges):
    from collections import deque, defaultdict

    # Build adjacency list (0-based)
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u-1].append(v-1)
        graph[v-1].append(u-1)

    result = [0] * (n-1)

    def is_connected(submask):
        # Check if submask (bitmask of nodes) forms a connected subgraph
        nodes = [i for i in range(n) if (submask >> i) & 1]
        if len(nodes) <= 1:
            return False
        visited = set()
        q = deque([nodes[0]])
        visited.add(nodes[0])
        in_sub = set(nodes)
        while q:
            u = q.popleft()
            for v in graph[u]:
                if v in in_sub and v not in visited:
                    visited.add(v)
                    q.append(v)
        return len(visited) == len(nodes)

    def max_distance_in_subgraph(submask):
        nodes = [i for i in range(n) if (submask >> i) & 1]
        max_dist = 0
        # For each node in the subset, do BFS within the subset
        for start in nodes:
            visited = [False] * n
            q = deque([(start, 0)])
            visited[start] = True
            while q:
                u, d = q.popleft()
                for v in graph[u]:
                    if ((submask >> v) & 1) and not visited[v]:
                        visited[v] = True
                        q.append((v, d+1))
                        max_dist = max(max_dist, d+1)
        return max_dist

    for mask in range(1, 1 << n):
        # Only consider subsets with ≥2 nodes
        if bin(mask).count('1') < 2:
            continue
        if not is_connected(mask):
            continue
        d = max_distance_in_subgraph(mask)
        if 1 <= d <= n-1:
            result[d - 1] += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n²)  
    For each of 2ⁿ subsets, potentially do n² work (BFS or connectivity/distance for potentially n nodes). Justified since n ≤ 15.

- **Space Complexity:** O(n²)  
    Used for adjacency list and temporary visited structures during BFS.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you optimize for sparse or dense trees?
  *Hint: Can you exploit tree properties, or precompute distances efficiently for chains or stars?*

- How would you approach a version where n is much larger (e.g., n ≤ 100)?
  *Hint: Try to avoid enumerating all subsets; can you use DP or substructure reuse?*

- What if subtrees could be disconnected and the problem asked for all subsets?
  *Hint: Ignore connectivity checks, but note that diameter is only defined for connected graphs.*

### Summary
This problem uses **bitmask subset enumeration** combined with BFS for connectivity and diameter in induced subgraphs—a "brute-force on small input" strategy. This coding pattern appears in problems involving exhaustive search over sets with size constraints (like small n). It can be applied elsewhere where graphs/subgraphs must be constructed and properties analyzed, such as counting connected induced subgraphs, or when using DP over bitmask states is possible.