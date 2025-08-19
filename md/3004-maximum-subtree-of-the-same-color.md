### Leetcode 3004 (Medium): Maximum Subtree of the Same Color [Practice](https://leetcode.com/problems/maximum-subtree-of-the-same-color)

### Description  
Given a tree with n nodes labeled 0 to n-1 (the tree is connected and acyclic), where each node is assigned a color (as an integer), find the size of the largest subtree whose all nodes are the same color. The tree is provided as a list of edges and an array of colors. For any node v, the subtree rooted at v must contain only nodes with the same color for its size to be considered. Return the maximum size among all such homogeneous subtrees.

### Examples  

**Example 1:**  
Input: `edges = [[0,1],[0,2],[2,3],[2,4]], colors = [1,2,3,3,3]`  
Output: `3`  
Explanation:  
The subtree rooted at node 2 includes nodes 2, 3, and 4 — all with color 3.  
The tree:
```
      0
     / \
    1   2
       / \
      3   4
```
List representation: [0,1,2,3,4]  
Subtree rooted at 2: [2,3,4] are all color 3. No larger homogeneous subtree exists.

**Example 2:**  
Input: `edges = [[0,1],[1,2],[1,3]], colors = [5,5,5,5]`  
Output: `4`  
Explanation:  
Every node is color 5, so the whole tree (rooted at 0) is homogeneous. The size is 4.

**Example 3:**  
Input: `edges = [[0,1],[1,2],[2,3]], colors = [1,2,1,1]`  
Output: `2`  
Explanation:  
The subtree rooted at node 2 or node 3 (each a leaf or same color as its child) has size 2:  
Subtree [2,3] both with color 1.

### Thought Process (as if you’re the interviewee)  
Brute force: For each node, traverse its subtree to check if all nodes have the same color and report its size if so. This would result in O(n²) time, which is not efficient.

Optimized approach:  
Use DFS starting from the root.  
- For each node, recursively check its children to determine if their subtrees are homogeneous and share the same color as the current node.
- If all children pass the check and share the parent's color, mark this subtree as homogeneous and sum its size.
- Keep a global variable to track the maximum homogeneous subtree size.
- Adjacency list representation is used for efficient traversal.
- This guarantees that each node is visited once, and all relevant information is computed during the single traversal.

Trade-offs:  
- This approach is optimal for trees and leverages post-order DFS.
- Space is O(n) due to recursion stack and the adjacency list.

### Corner cases to consider  
- Single-node tree: Should return 1.
- All nodes have unique colors: Maximum is 1 (only leaves can be homogeneous).
- All nodes same color: The size of the entire tree.
- Chain/tree with alternating colors.
- Disconnected (but input guarantees connected tree).

### Solution

```python
def maximumSubtreeSize(edges, colors):
    n = len(colors)
    # Build the tree as adjacency list
    tree = [[] for _ in range(n)]
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)

    max_subtree = 1  # At least one node (every node is a homogeneous subtree itself)

    def dfs(node, parent):
        nonlocal max_subtree
        size = 1  # Start with the node itself
        homogeneous = True
        for child in tree[node]:
            if child == parent:
                continue
            child_homogeneous, child_size = dfs(child, node)
            # If any child subtree is not homogeneous or any color mismatch
            if not child_homogeneous or colors[child] != colors[node]:
                homogeneous = False
            size += child_size
        # If current subtree is homogeneous, try to update max_subtree
        if homogeneous:
            max_subtree = max(max_subtree, size)
        return homogeneous, size

    dfs(0, -1)
    return max_subtree
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each node is visited once and all its children are processed, leading to linear time in the number of nodes.
- **Space Complexity:** O(n), for the adjacency list and recursion stack (worst-case height is n for degenerate trees).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code to return the list of all roots of maximum homogeneous subtrees (not just their size)?  
  *Hint: Instead of tracking only the maximum size, also store node indices whenever a new maximum is found or matched.*

- Can you adapt for finding the smallest homogeneous subtree larger than 1?  
  *Hint: Track all subtree sizes, then filter and return the minimum > 1.*

- How would you solve this if the tree is extremely large and cannot fit in memory?  
  *Hint: Consider streaming/iterative traversal, or external memory/disk-based adjacency representation.*

### Summary
The problem applies the classic tree DFS/post-order traversal to propagate subtree information up from leaves to root. This is a standard recursive DP on trees technique to efficiently compute properties dependent on all descendants. The approach is common for problems like counting homogeneous/valid subtrees, evaluating conditions on subtrees, or computing tree-based aggregation features. The pattern is widely useful for tree-based dynamic programming and bottom-up calculations.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
