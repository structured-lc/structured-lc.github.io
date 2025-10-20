### Leetcode 1719 (Hard): Number Of Ways To Reconstruct A Tree [Practice](https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree)

### Description  
Given a list of pairs `[xᵢ, yᵢ]`, where each pair indicates a possible ancestor-descendant relationship between nodes with unique values, determine **how many different rooted trees** can be reconstructed such that:
- Every edge in the tree respects the ancestor-descendant relationship given by the pairs.
- Each pair means either `xᵢ` is an ancestor of `yᵢ`, or vice versa.
- All nodes in the pairs must be included.
- Output should be:
  - **0**: Impossible to form any such tree.
  - **1**: There’s exactly one unique rooted tree.
  - **2**: There are **multiple** distinct rooted trees.

In other words: “Given ambiguous (not directed) ancestor relationships, find the number of different valid rooted trees. Return 0 if no tree is possible, 1 for exactly one, or 2 for more than one.”

### Examples  

**Example 1:**  
Input: `pairs = [[1,2],[2,3]]`  
Output: `1`  
*Explanation: Unique tree is 1 as root, 2 as its child, 3 as 2’s child:*
```
   1
   |
   2
   |
   3
```

**Example 2:**  
Input: `pairs = [[1,2],[2,3],[1,3]]`  
Output: `2`  
*Explanation: There are two possible trees:*

Tree 1  
```
   1
   |
   2
   |
   3
```
Tree 2  
```
   2
  / \
 1   3
```
*Both are valid since pairs allow for either 1↔2 or 2↔1, etc.*

**Example 3:**  
Input: `pairs = [[1,2],[2,3],[2,4],[1,5]]`  
Output: `1`  
*Explanation: Only possible tree:*
```
    1
   / \
  2   5
 / \
3   4
```

### Thought Process (as if you’re the interviewee)  
- Start with building a graph from the pairs: Treat every pair as an undirected edge since the ancestor relationship can go either way.
- Encourage: For a valid rooted tree:
  - There must be **a single root** (node with the maximum possible degree, connected to all others).
  - For each node, its “parent” in the rooted tree should have at least as many connections (neighbors) as it does, since the parent should be connected to all of child’s connections.
- *Brute force*: Generate every spanning tree, check ancestor-descendant validity against given pairs. But this is clearly exponential.
- **Optimized Strategy**:
  - For each node, sort all nodes by degree.
  - The root should be the one with maximum degree (connected to all others).
  - For each node, its possible parent candidates are those with higher degree *and* who have all of its neighbors as their neighbors.
  - If at any level, there are multiple candidates for parent (ties in degree and neighbor sets), then multiple trees are possible.
  - If the ancestor-descendant constraint is broken anywhere, it’s impossible (return 0).
  - Use adjacency matrix/set to quickly check the neighbor inclusion property.
- Return “2” if anywhere there is a genuine ambiguity (multiple valid parent candidates), otherwise “1” if unique, or "0" if inconsistent.

### Corner cases to consider  
- No pairs or only one node (trivial).
- Disconnected graphs (not all nodes connected): not a tree, return 0.
- Multiple roots (more than one node connected to all others): return 0.
- Cycle exists in the given relations: impossible.
- Multiple valid parent choices for any node.
- Pairs with the same nodes, or self-loops (invalid input).

### Solution

```python
def checkWays(pairs):
    from collections import defaultdict

    # 1. Build Graph (undirected, adjacency sets)
    neighbors = defaultdict(set)
    nodes = set()
    for x, y in pairs:
        neighbors[x].add(y)
        neighbors[y].add(x)
        nodes.add(x)
        nodes.add(y)
    
    # 2. Sort nodes by degree descending (root candidate first)
    node_list = list(nodes)
    node_list.sort(key=lambda x: -len(neighbors[x]))
    
    root = node_list[0]
    # The root must be connected to all others
    if len(neighbors[root]) != len(nodes) - 1:
        return 0

    result = 1 # 1 = unique tree so far, 2 = multiple possible trees

    # 3. For every non-root node, find its parent candidate
    for x in node_list[1:]:
        # Candidates are those nodes connected to all neighbors of x (including x), and higher degree
        parent = None
        parent_degree = float('inf')
        for y in neighbors[x]:
            # y should be strictly larger degree (or same degree, meaning ambiguity)
            if len(neighbors[y]) >= len(neighbors[x]):
                # Valid parent MUST include all of x's neighbors except x itself
                if neighbors[x] <= neighbors[y]:
                    if len(neighbors[y]) < parent_degree:
                        parent = y
                        parent_degree = len(neighbors[y])
        if parent is None:
            return 0
        # If degree is equal, multiple possible parent choices (ambiguity)
        if len(neighbors[x]) == len(neighbors[parent]):
            result = 2 # If ever ambiguous, flag as 2

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n = number of nodes (for each node, could check all neighbors).
- **Space Complexity:** O(n²) for the adjacency dictionary/set (sparse for small n, up to 500).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the ancestor-descendant relationship is *directed* and not ambiguous?  
  *Hint: Think about topological sorting and uniqueness of the tree.*

- If the input is guaranteed to form a binary tree, how would your approach change?  
  *Hint: Consider parent-child constraints and node degrees.*

- Could you optimize further for huge inputs where pairs are sparse?  
  *Hint: Try adjacency lists, and avoid redundant neighbor comparisons.*

### Summary
This problem uses a **graph+degree pattern, adjacency set checking, and greedy root assignment** to efficiently reconstruct possible trees from ambiguous ancestor-descendant constraints. The key insight is that the parent of each node should have all of its candidate’s neighbors, and the root must be universally connected. This pattern—**neighbor inclusion, degree sorting, and ambiguity detection**—can be applied to other tree reconstruction and hierarchy discovery problems from partial relationship data.


### Flashcard
Build graph from pairs; check for a single root connected to all, and for each node, parent must have ≥ neighbors—count valid rooted trees.

### Tags
Tree(#tree), Graph(#graph)

### Similar Problems
- Create Binary Tree From Descriptions(create-binary-tree-from-descriptions) (Medium)
- Maximum Star Sum of a Graph(maximum-star-sum-of-a-graph) (Medium)