### Leetcode 3108 (Hard): Minimum Cost Walk in Weighted Graph [Practice](https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph)

### Description  
Given an **undirected weighted graph** with `n` vertices (labeled from 0 to n-1) and a list of edges `edges[i] = [u, v, w]` where `u` and `v` are nodes, and `w` is the edge's weight, a **walk** is a sequence of edges that may repeat nodes and edges.  
For any walk from node `s` to node `t`, its **cost** is defined as the **bitwise AND** (`&`) of the weights along the path (e.g., if you traverse edges with weights w₀, w₁, w₂, ..., wₖ, then the cost is w₀ & w₁ & ... & wₖ).  
Given a list of `query[i] = [sᵢ, tᵢ]`, for each query, return the **minimum cost** of any walk from `sᵢ` to `tᵢ` (repetition allowed), or `-1` if it is impossible.

### Examples  

**Example 1:**  
Input:  
`n = 3`,  
`edges = [[0,1,4],[1,2,3],[0,2,7]]`,  
`query = [[0,2],[2,0]]`  
Output:  
`[3, 3]`  
Explanation:  
Possible walks from 0 → 2:  
- 0–2 (weight 7): cost = 7  
- 0–1–2 (weights 4,3): cost = 4 & 3 = 0  
But the goal is the **minimum**. However, as per the bitwise AND property, traversing both 4 and 3 gives 0, but since AND tends toward 0 as more diverse bits are added, but only when there’s a cycle and it helps, in the raw path here the best is direct 0–2 (cost 7) or 0–1–2 (cost 0).  
But for paths without cycles, you take all possible ANDs.

**Example 2:**  
Input:  
`n = 2`,  
`edges = [[0,1,1]]`,  
`query = [[0,1],[1,0],[1,1]]`  
Output:  
`[1, 1, 0]`  
Explanation:  
- 0→1: weight=1 (cost 1)  
- 1→0: weight=1 (cost 1)  
- 1→1: You can walk 1–0–1, indefinitely, AND of weights all 1, but repeated node walk so you can get 1.  

**Example 3:**  
Input:  
`n = 4`,  
`edges = [[0,1,1],[1,2,3],[2,3,7]]`,  
`query = [[0,3],[3,0],[0,2]]`  
Output:  
`[-1, -1, 1]`  
Explanation:  
- 0→3 is impossible, as there is no connected path.
- 3→0 is impossible.
- 0→2, 0–1 (1), 1–2 (3), cost=1 & 3=1.

### Thought Process (as if you’re the interviewee)  
- First, understand the special property: cost is **bitwise AND** of all walked edge weights. You can visit the same edge and node multiple times.
- Brute-force: Try all possible walks from s to t, compute AND for each, pick the minimum. But the walks can be infinitely many (due to cycles), so brute-force is not feasible.
- Since the AND operation can only stay the same or go down (never up), and since the AND of many numbers quickly approaches 0, it is best to find the smallest possible AND value along any possible walk from s to t.
- Key observation: If a walk between s and t exists which forms a cycle with AND 0, you can always walk cycles and reduce to 0. Otherwise, the minimum AND is the minimum over all possible ANDs along paths from s to t.
- Bitmask BFS idea: For each bit b from 0 to 31, filter the graph to only edges where bit b is present. If s and t are connected in that subgraph, the answer can retain bit b. So, the minimum cost is the **bitwise AND** over all edge weights in some walk from s to t.
- For efficiency, for each bit position, check connectivity in the graph made up only by edges that have that bit set. The set of common bits in all ANDs must be in some walk.

### Corner cases to consider  
- No valid path between s and t ⇒ output -1.
- s == t: zero-length walk, AND over empty set (ambiguous!). Should be the identity for AND, typically all-bits-1 (in code, maybe 2³¹-1). But if repeated cycles exist, smallest cost is min over possible cycles.
- All edges with zero weight.
- Multiple edges between same nodes.
- Large number of queries.
- Edges with weight where all bits are 1.

### Solution

```python
def minimumCost(n, edges, query):
    from collections import defaultdict, deque

    # Build graph: for each edge, record in adjacency list (undirected)
    graph = defaultdict(list)
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))
    
    res = []

    # Preprocess set of ANDs for all edges
    # For possible optimization: union-find for each bit position
    # For each query, find the min AND cost
    for s, t in query:
        visited = [{} for _ in range(n)]  # visited[node][and_value] = True

        # Start BFS from s
        queue = deque()
        # For all outgoing edges, start with their weights
        for nei, w in graph[s]:
            queue.append((nei, w))
            visited[nei][w] = True

        found = -1
        # Special case: s == t
        if s == t:
            found = 0  # You can take a walk from s to itself of cost 0 by just not moving, or by making cycles
        else:
            # For paths s ≠ t
            while queue:
                node, andv = queue.popleft()
                if node == t:
                    if found == -1 or andv < found:
                        found = andv
                for nei, w in graph[node]:
                    new_and = andv & w
                    if not visited[nei].get(new_and, False):
                        visited[nei][new_and] = True
                        queue.append((nei, new_and))
        res.append(found)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For each query: visiting all reachable paths, each state is (node, current AND value).  
    The number of unique AND states is at most the number of possible ANDs over edge weights (upper bounded by number of bits, but can be up to the number of distinct edge weights), times the number of nodes.  
    For large graphs and queries, worst-case is O(n × W × Q), where W is number of unique AND values (up to 10⁴–10⁵ typically).
- **Space Complexity:**  
  - Space for graph: O(n + e).  
  - Space for visited states: O(n × W) per query.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you further optimize if there are thousands of queries on a static graph?  
  *Hint: Precompute all-pairs minimum AND costs, or use memoization/dynamic programming per (s, t).*

- What changes if the graph is directed instead of undirected?  
  *Hint: BFS must only follow edge direction; answers may change as some walks become impossible.*

- How to handle very large edge weights (beyond 32 bits)?  
  *Hint: Optimize bitwise comparison, use bitset representation, or limit bitwise operations to encountered edge weights only.*

### Summary
This problem uses a **bitmask path enumeration** with BFS: for each query, traverse all possible paths, updating AND value along the way, and search for the smallest.  
It's a variant of single-source shortest-path where “distance” is bitwise AND rather than sum, requiring you to remember distinct (node, AND) states.  
This technique is common in bitmask graph problems, and similar ideas can be applied to other problems where cost accumulation is not linear (min, max, XOR, etc.).