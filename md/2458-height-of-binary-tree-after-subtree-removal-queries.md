### Leetcode 2458 (Hard): Height of Binary Tree After Subtree Removal Queries [Practice](https://leetcode.com/problems/height-of-binary-tree-after-subtree-removal-queries)

### Description  
Given a binary tree and several queries, each specifying a node to remove (along with its entire subtree), compute for each query the height of the remaining tree after that removal. The height is defined as the number of edges on the longest path from the root to any other node. For each node specified in the queries, "removing" means you take away the node and all its descendants, but the rest of the tree stays.

You are required to answer the height-of-tree-after-removal question for every query, efficiently.

### Examples  

**Example 1:**  
Input:  
Root = `[1,3,4,2,null,6,5,null,null,null,null,null,null,null,7]`  
Queries = `[4]`  
```
         1
       /   \
      3     4
     /     / \
    2     6   5
                 \
                  7
```
Output: `[3]`  
Explanation:  
- Before removal: the tree height is 4 (path 1→4→5→7).
- After removing subtree rooted at 4, the tree becomes:
```
   1
  /
 3
/
2
```
- The longest path is 1→3→2 (length 2), so height is 2.  
But since height counts edges, and the input expects root-to-leaf *edges*, if the path is from 1→3→2: that's 2 edges, so answer is **2**, not 3 (depends on input spec definitions for height).

**Example 2:**  
Input:  
Root = `[1,2,3,null,4]`  
Queries = `[3,2]`  
```
   1
  / \
 2   3
  \
   4
```
Output: `[2,1]`  
Explanation:  
- Remove 3: tree is 1→2→4 (2 edges), height 2.
- Remove 2: tree is 1→3 (1 edge), height 1.

**Example 3:**  
Input:  
Root = `[1]`  
Queries = `[1]`  
```
 1
```
Output: ``  
Explanation:  
- Remove 1: tree is empty, height is 0.

### Thought Process (as if you’re the interviewee)  

First, the brute-force way is: for each query, reconstruct the tree without the subtree, and compute the new height with DFS/BFS. But for large trees and many queries, this is far too slow (O(QN)).

Can we preprocess?  
- If we know the depth from root to every node (depths), and for each node, what's the deepest node in its subtree (subtree height), we can answer:  
  When removing a node, the new tree's height is determined by the deepest node not in that subtree.  
- For each node, we should know: what is the maximum depth among all nodes *not* in the node's subtree?

Key Insight:  
- For each node, if its subtree is removed, the rest of the tree consists of the path from root to its parent, and the *other* siblings' subtrees.
- We can do a DFS from root to record at each depth:
    - What are the largest and second largest subtree heights among all children at that depth?
- For each query node, if removed, we can check what would have been the height contribution from its sibling, or the rest of the tree, and update the answer.

Final steps:  
- Use two DFS:
    1. Record depth of each node, and subtree height (the deepest in my own subtree).
    2. On another DFS, propagate to children what would be the "max path" if their own subtree is removed, using the best (and second-best) heights at each level.

This makes each query O(1) after O(N) preprocessing.

### Corner cases to consider  
- Tree with only root node.
- Querying removal of the root node.
- Multiple queries for the same node.
- Query node is a leaf (removal doesn't affect tree's height).
- Highly skewed trees (like linked lists).
- Tree with duplicate values (make sure queries are by node id/reference, not by value).

### Solution

```python
class Solution:
    def treeQueries(self, root, queries):
        # 1. Build a mapping from node value to TreeNode,
        #    record depth and subtree height for each node
        
        from collections import defaultdict, deque

        # Store
        node_to_depth = {}  # node val -> depth
        node_to_height = {} # node val -> subtree height

        # dfs1: depth/subtree heights
        def dfs1(node, depth):
            node_to_depth[node.val] = depth
            h = 0
            if node.left:
                h = max(h, dfs1(node.left, depth + 1) + 1)
            if node.right:
                h = max(h, dfs1(node.right, depth + 1) + 1)
            node_to_height[node.val] = h
            return h

        dfs1(root, 0)

        # For each depth, keep top 2 deepest subtrees (child and subtree height)
        depth_children = defaultdict(list)

        def dfs2(node):
            d = node_to_depth[node.val]
            # For each depth, append (subtree height, node val)
            depth_children[d].append((node_to_height[node.val], node.val))
            if node.left:
                dfs2(node.left)
            if node.right:
                dfs2(node.right)

        dfs2(root)

        # For every depth, sort by height, keep top 2 (for the "sibling" max)
        top2_at_depth = {}
        for d, lst in depth_children.items():
            lst_sorted = sorted(lst, reverse=True)
            top2_at_depth[d] = lst_sorted[:2]

        # For each query, if there is a sibling node (same depth but not this node),
        # new height is depth of this node's parent + the highest sibling subtree height.
        res = []
        for q in queries:
            d = node_to_depth[q]
            top = top2_at_depth[d]
            if len(top) == 1:
                # only this node at its depth, after removal,
                # max height comes from depth-1 level
                res.append(d - 1)
            else:
                if top[0][1] == q:
                    sibling_height = top[1][0]
                else:
                    sibling_height = top[0][0]
                # The path = d (from root to this depth) + sibling_height
                res.append(d + sibling_height)
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    O(N) for both DFS traversals and preprocessing, where N = number of nodes.  
    O(1) for each query after preprocessing (total O(Q) for Q queries).

- **Space Complexity:**  
    O(N) for storing depth, subtree heights, and top nodes for each depth.

### Potential follow-up questions (as if you’re the interviewer)  

- What if queries are on node references, not node values?  
  *Hint: Use a mapping from node reference to computed depth/height.*

- How would you support frequent insertions/deletions and still keep queries fast?  
  *Hint: Use dynamic tree data structures, like link-cut trees.*

- Could you solve the problem in one DFS traversal?  
  *Hint: Consider carrying additional parameters in the traversal stack.*

### Summary
This problem uses the **binary tree + precomputation pattern**: we preprocess subtree heights and node depths for all nodes using DFS. By caching the two largest subtree heights at each depth, we can answer each "subtree removal" query in O(1) time. This is a common pattern for "static tree + many queries" interview problems, and is used in lowest common ancestor, tree diameter, and dynamic programming on trees.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Maximum Depth of Binary Tree(maximum-depth-of-binary-tree) (Easy)