### Leetcode 310 (Medium): Minimum Height Trees [Practice](https://leetcode.com/problems/minimum-height-trees)

### Description  
You’re given a connected, undirected tree with n nodes labeled 0 to n-1 and a list of n-1 edges (each as a pair of nodes). The task is to find all nodes that, when used as the root, result in the tree having the minimum possible height. The height here means the largest distance from the root to any leaf node. Output all such nodes that can be roots of *minimum height trees*.

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[1,0],[1,2],[1,3]]`  
Output: `[1]`  
Explanation:  
If node 1 is chosen as root, all other nodes are at distance 1 from it.

```
    1
   /|\
  0 2 3
[1,0,2,3]
```

**Example 2:**  
Input: `n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]`  
Output: `[3, 4]`  
Explanation:  
Either node 3 or 4 as root gives the lowest tree height (=2).

```
    3        4
   /|\      / \
  0 1 2    3   5
      |    |
      4    0
     /
    5
[3,0,1,2,4,5]
```

**Example 3:**  
Input: `n = 1, edges = []`  
Output: ``  
Explanation:  
Only one node—height is 0, output is .

### Thought Process (as if you’re the interviewee)  
First, a brute-force approach would be:  
- For every node, treat it as root.  
- Do BFS/DFS from each node to compute the height of the tree.  
- Return all nodes with the minimum found height.

Downside: For each node (\(O(n)\)), doing a traversal (\(O(n)\)) results in \(O(n^2)\) time, which is too slow for n up to 20,000.

Optimized:  
- Since the graph is a tree, the *center* (one or two) of the tree always yields the minimum height.  
- We can identify the center(s) by iteratively removing leaves (nodes with degree 1):  
  - At each step, remove all leaves and update their neighbors.
  - Repeat until 1 or 2 nodes are left (these are the centers/root candidates).
- This mimics a topological "peeling" and works in \(O(n)\) time.

Trade-offs:  
- No need to compute all possible heights.
- Efficient and leverages tree structure.

### Corner cases to consider  
- n = 1 (just one node, no edges)
- n = 2 (two nodes connected by one edge; both can be root)
- Highly unbalanced trees (e.g., long chains)
- All leaves except one central node

### Solution

```python
def minHeightTrees(n, edges):
    # Special case: small trees
    if n <= 2:
        return [i for i in range(n)]
    
    # Build the adjacency list
    neighbors = [set() for _ in range(n)]
    for u,v in edges:
        neighbors[u].add(v)
        neighbors[v].add(u)
    
    # Initialize the first layer of leaves
    leaves = [i for i in range(n) if len(neighbors[i]) == 1]
    
    # Trim leaves layer by layer until 1 or 2 centers remain
    remaining_nodes = n
    while remaining_nodes > 2:
        remaining_nodes -= len(leaves)
        new_leaves = []
        for leaf in leaves:
            # Each leaf has exactly one neighbor
            neighbor = neighbors[leaf].pop()
            neighbors[neighbor].remove(leaf)  # Remove the leaf
            if len(neighbors[neighbor]) == 1:  # Neighbor becomes a leaf
                new_leaves.append(neighbor)
        leaves = new_leaves
    
    # Remaining nodes are centers of the graph
    return leaves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every edge and node is visited/removed at most once.

- **Space Complexity:** O(n) for the adjacency lists, and O(n) for the leaves queue and result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the graph could contain cycles or multiple components?
  *Hint: Discuss cycle-detection and connected component identification, e.g., via DFS or Union Find.*

- Can you explain why there are always at most two centers in a tree?
  *Hint: The center(s) of a tree lie(s) at the middle of the longest path (diameter), and it's always one or two nodes.*

- How would you return the actual minimum height (not just the roots)?
  *Hint: After finding the centers, perform BFS from one to compute height.*

### Summary
This problem uses the *topological trimming* or *layered leaf peel* pattern, which is closely related to finding the center(s) of a tree. The final algorithm is efficient (O(n)) and is especially relevant for tree topology analysis, such as in network design and data structure optimizations. The methodology can be applied to other problems requiring centroid/radial decomposition or multi-source BFS.