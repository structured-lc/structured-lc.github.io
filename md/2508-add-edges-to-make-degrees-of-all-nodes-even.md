### Leetcode 2508 (Hard): Add Edges to Make Degrees of All Nodes Even [Practice](https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even)

### Description  
Given an undirected graph with `n` nodes (labeled 1 to n) and a list of edges, you are allowed to add **at most** 2 new edges (between any two different nodes, but not between a node and itself and not if the edge already exists).  
**Your task:** Determine if it is possible to add at most 2 edges so that **all nodes** in the resulting graph have an even degree (even number of connected edges).

### Examples  

**Example 1:**  
Input: `n = 5, edges = [[1,2],[2,3],[3,4],[4,2]]`  
Output: `True`  
*Explanation:  
Build the degree for each node:  
1: 1, 2: 3, 3: 2, 4: 2, 5: 0.  
Add edge [1,5] (or [3,5]), now all degrees even:  
1: 2, 2: 3, 3: 2, 4: 2, 5: 1  
But 2: 3 and 5: 1 are still odd, so try adding a second edge: Add [2,5]:  
Now: 1:2, 2:4, 3:2, 4:2, 5:2. All degrees are now even.*

**Example 2:**  
Input: `n = 4, edges = [[1,2],[2,3],[3,4],[4,1]]`  
Output: `True`  
*Explanation:  
Each node has degree 2; all already even. No edges needed.*

**Example 3:**  
Input: `n = 4, edges = [[1,2],[2,3]]`  
Output: `False`  
*Explanation:  
Degrees: 1:1, 2:2, 3:1, 4:0.  
Odd degree nodes: [1,3,4] (three nodes with odd degrees).  
We can only fix graphs with 0, 2, or 4 odd degree nodes using up to two new edges. Can't fix three.*

### Thought Process (as if you’re the interviewee)  

- First, recall that in any undirected graph, a node's degree changes by 1 for every new or removed edge it's part of.
- **Goal:** Make every node have even degree by adding ≤2 new edges.
- Compute degree for each node.
- Identify all nodes with odd degrees. If their count is not 0, 2 or 4, it's impossible (since each new edge can fix at most 2 nodes' parity).
- If 0 odd nodes: done.
- If 2 odd nodes: Need to connect them (if not already connected), or connect each to a third node they're both not connected to.
- If 4 odd nodes: Need to pair them up into 2 edges, and both pairs must be possible to connect (i.e., edges between each pair must not already exist, and pairs must be between different nodes).
- Carefully check no duplicate edges or self-loops are created.
- For 1, 3, 5+ odd nodes: impossible, since each edge flips parity for 2 nodes only.

**Trade-Offs**  
- Brute force: Try all pairs of non-connected nodes for up to 2 new edges. But count of odd nodes is always small (≤4), so checking all 3 pairings of 4 nodes is fast.
- Final approach: efficient, since only a small subset of nodes ever needs pairing.

### Corner cases to consider  
- Graph is already even degree (0 odd degree nodes).
- 2 or 4 odd nodes but all possible new edges are already present in the graph.
- Multiple components/disconnected nodes.
- n = 1 or empty edge list.
- Self-loops or duplicate edges in input (shouldn't happen in well-formed undirected graphs).
- All possible new edges between odd degree nodes already exist.

### Solution

```python
def isPossible(n, edges):
    # Build graph and degree counts
    from collections import defaultdict

    adj = defaultdict(set)
    degree = [0] * (n + 1)

    for u, v in edges:
        adj[u].add(v)
        adj[v].add(u)
        degree[u] += 1
        degree[v] += 1

    # Find nodes with odd degrees
    odd = [i for i in range(1, n + 1) if degree[i] % 2 == 1]

    if len(odd) == 0:
        return True
    if len(odd) == 2:
        # Try to connect them directly or via a third node
        a, b = odd
        # Can we connect a and b directly?
        if b not in adj[a]:
            return True
        # Try connecting both to a third node c
        for c in range(1, n + 1):
            if c != a and c != b:
                if c not in adj[a] and c not in adj[b]:
                    return True
        return False
    if len(odd) == 4:
        # Try all 3 matchings of pairs
        a, b, c, d = odd
        pairs = [((a, b), (c, d)), ((a, c), (b, d)), ((a, d), (b, c))]
        for (x1, y1), (x2, y2) in pairs:
            # Edges can't already exist and no self-loops
            if (y1 not in adj[x1]) and (y2 not in adj[x2]):
                # Make sure pairs are distinct nodes
                if len({x1, y1, x2, y2}) == 4:
                    return True
        return False
    # With any other number (odd count not 0,2,4), impossible
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m). Need to build graph (edges), degree list (O(n)), and, for up to 4 odd nodes, try up to 6 pairings (constant time).
- **Space Complexity:** O(n + m) for adjacency list and degree count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could add more than 2 edges—how would the solution generalize?
  *Hint: Think about the node parities and matching odd-degree nodes; each edge can fix two nodes’ degrees.*

- How would your approach scale to very large graphs (say n > 10⁵)?
  *Hint: Is it still efficient if you focus only on the odd-degree nodes?*

- What if duplicate edges or self-loops could be added (multigraph)? Would your answer change?
  *Hint: Consider how adding duplicate edges could loosen the original restrictions.*

### Summary
This problem uses **parity and pairing** logic for node degrees in undirected graphs and explores **graph augmentation** with parity constraints.  
It applies a pattern similar to "matching odd-degree nodes to make all degrees even," a concept relevant in Chinese Postman (Eulerian path/circuit) problems and even-degree subgraph construction.  
Whenever a restricted number of edge insertions have to fix *global parity constraints*, analyzing parity and pairing remains a core scalable pattern.

### Tags
Hash Table(#hash-table), Graph(#graph)

### Similar Problems
- Minimum Degree of a Connected Trio in a Graph(minimum-degree-of-a-connected-trio-in-a-graph) (Hard)