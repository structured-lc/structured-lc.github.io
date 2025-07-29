### Leetcode 2378 (Medium): Choose Edges to Maximize Score in a Tree [Practice](https://leetcode.com/problems/choose-edges-to-maximize-score-in-a-tree)

### Description  
Given a rooted tree with \( n \) nodes labeled from 0 to \( n-1 \), where node 0 is the root, and each node (except the root) has exactly one parent and is connected with a weighted edge, you need to select a subset of edges such that **no two selected edges are adjacent** (they cannot share a node). The goal is to maximize the sum of the weights of the selected edges. Output the maximum sum you can obtain.

Restated: You’re given a tree where each edge has a weight, and you need to pick some edges (possibly none), with the constraint that no two picked edges are adjacent (do not touch at any node), to maximize the sum of their weights.

### Examples  

**Example 1:**  
Input:  
`edges = [[-1,-1], [0,3], [0,2], [1,5], [1,1], [2,4]]`  
Output:  
`9`  
*Explanation: Select edges (3 → 1) with weight 3, and (4 → 1) with weight 1, and (5 → 2) with weight 4. But since (1 → 3) and (1 → 4) are both connected to 1, you can't take both. The optimal is to select (3 → 1) and (5 → 2): 3 + 4 = 7, or (1 → 3) and (2 → 0) (root edge doesn’t exist). The correct max is (1 → 3) and (5 → 2): 3 + 4 = 7.*

**Example 2:**  
Input:  
`edges = [[-1,-1], [0,5], [0,2], [1,3], [1,1], [2,4], [2,6]]`  
Output:  
`11`  
*Explanation: The best is to pick edges [1,5] (parent 0, weight 5) and [6,2] (parent 2, weight 6), 5+6=11. No two share an endpoint.*

**Example 3:**  
Input:  
`edges = [[-1,-1]]`  
Output:  
`0`  
*Explanation: Only root exists, so no edges to pick.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Try all combinations of including or excluding each edge, but with the no-adjacent constraint. This is exponential in the number of edges.
- **Optimization:** Since the structure is a tree (connected, acyclic), we can leverage **Dynamic Programming on trees** using DFS traversal.
- **Key State:** For each node, consider two cases:  
  1. The edge connecting to its parent is **selected**.  
  2. The edge connecting to its parent is **not selected**.

If the parent edge is **not selected**, we can freely choose for each child to either pick the edge connecting it or not. If the parent edge **is** selected, we cannot pick edges connecting children to this node.

- **Recurrence:**  
  For a node:
  - `dp0 = maximum score in its subtree when the edge to its parent is NOT picked`
  - `dp1 = maximum score in its subtree when the edge to its parent IS picked`
  - At root, only `dp0` matters, root's parent doesn't exist.
  - Propagate values from leaves up using DFS.

This is a classic "max-weight matching" on trees problem—sometimes called "tree DP, not adjacent selection".

### Corner cases to consider  
- Single node (root only, no edges).
- Chains (tree is a straight line).
- All edges have zero weight.
- Multiple edges have the same endpoint.
- Highly unbalanced trees.
- Large negative or large positive weights.

### Solution

```python
def maxScore(edges):
    from collections import defaultdict

    n = len(edges)
    tree = defaultdict(list)
    for i in range(1, n):
        parent, w = edges[i]
        tree[parent].append((i, w))

    # dp[node] = (score_with_no_parent_edge, score_with_parent_edge)
    def dfs(node):
        include = 0  # score if parent edge IS picked (can't pick edges to children)
        exclude = 0  # score if parent edge is NOT picked (children may pick)

        for child, w in tree[node]:
            excl_c, incl_c = dfs(child)
            # If we don't pick parent edge, for this child, choose max(include, exclude)
            exclude += max(excl_c, incl_c)
            # If we pick edge to child, we must not pick edge from that child downward
            include += excl_c + w  # must not pick child's parent edge downward

        return (exclude, include)

    ans0, ans1 = dfs(0)
    # At the root, we can't pick a parent edge, only the 'exclude' value counts
    return ans0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each node is visited once in dfs, and work per node is constant.
- **Space Complexity:** O(n), due to recursion stack and the implicit tree structure.

### Potential follow-up questions (as if you’re the interviewer)  

- If each node could have an individual value instead of the edges, can you design a similar solution?
  *Hint: What changes if the selection is node-based rather than edge-based?*
  
- Can you reconstruct the subset of edges chosen for the optimal score?
  *Hint: Try augmenting the state to store choices during DFS traversal.*

- What if the tree is very wide or very deep (highly unbalanced), how does that affect your recursion?
  *Hint: Stack overflow and iterative vs. recursive traversal.*

### Summary
This problem uses the classic **Dynamic Programming on Trees** pattern, specifically handling the constraint where chosen elements (edges) must not be adjacent. By propagating optimal subproblem solutions upward via DFS, we efficiently maximize the non-adjacent edge subset sum. This pattern is broadly useful, e.g., "House Robber III" or vertex/edge selection under adjacency constraints in trees.