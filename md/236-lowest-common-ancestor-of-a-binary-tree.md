### Leetcode 236 (Medium): Lowest Common Ancestor of a Binary Tree [Practice](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree)

### Description  
Given the **root** of a binary tree and two nodes (**p** and **q**) from the tree, find their **lowest common ancestor (LCA)**. The LCA is the *deepest* node that is an ancestor of **both** nodes (*a node can be an ancestor of itself*). You'll be given the actual node references, not just values.

### Examples  

**Example 1:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 1`  
Output: `3`  
*Explanation:*  
The tree:  
```
        3
       / \
      5   1
     / \ / \
    6  2 0  8
      / \
     7   4
```
- The paths from root to 5 and 1 are `[3,5]` and `[3,1]`; their LCA is `3`.

**Example 2:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 4`  
Output: `5`  
*Explanation:*  
Tree is as above.
- Path to 5: `[3,5]`, path to 4: `[3,5,2,4]`; their LCA is `5` (since 5 is an ancestor of 4).

**Example 3:**  
Input: `root = [1,2]`, `p = 1`, `q = 2`  
Output: `1`  
*Explanation:*  
Tree:
```
    1
   /
  2
```
- LCA of 1 and 2 is `1` (since the root is an ancestor of both).

### Thought Process (as if you’re the interviewee)  

- **Brute Force Idea:**  
  Store the paths from root to each node (**p** and **q**) in a list/array.  
  Then, compare these paths until the last common node; that node is the LCA.

- **Optimized Approach (DFS):**  
  Use recursion to traverse the tree:
  - If the node is `None` or matches **p** or **q**, return it.
  - Recursively get the result from the left and right children.
  - If both left and right returned non-`None`, this node is the LCA.
  - Otherwise, pass up the non-null result.
  
  **Reasoning:**  
  This is a classic use-case for **post-order DFS traversal**, since we care about the subtrees' results before acting at the parent. If the current node is either **p** or **q**, or both p and q are found in different subtrees, this node is their lowest ancestor.

### Corner cases to consider  
- `p` and `q` are the same node.
- `p` is an ancestor of `q`, or vice versa.
- The tree is skewed (all left or all right).
- The tree only has root.
- One or both nodes are not in the tree (problem states you can assume both are always present).
- Tree contains only two nodes.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def lowestCommonAncestor(root, p, q):
    # Base cases: if we've hit the end of a path, or found one of the targets
    if not root or root == p or root == q:
        return root
    
    # Search left and right subtrees
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    # If both calls returned a non-null result, root is the LCA
    if left and right:
        return root
    
    # Otherwise, propagate the non-null result up
    return left if left else right
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(*n*)  
  Each node is visited at most once during recursion, where *n* is the number of nodes in the tree.

- **Space Complexity:** O(*h*)  
  *h* is the height of the tree; space comes from the recursion stack (max stack depth is the height). No extra storage other than recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree nodes contained parent pointers?
  *Hint: You can walk up the parent chain and use a set or two-pointer technique.*

- What if the input tree is a Binary Search Tree (BST)?
  *Hint: Utilize BST properties to make the LCA search more efficient (constant time per move).*

- If either p or q does not exist in the tree, how do you handle it safely?
  *Hint: Modify the recursion to verify both are found before returning an LCA.*

### Summary
This solution follows the **post-order DFS** recursion pattern, often used for descendant-based tree questions. It efficiently finds the LCA in **O(n)** time and **O(h)** space without revisiting nodes or storing paths. Variations of this approach are popular in problems involving ancestry, subtree computation, or bottom-up information propagation in trees. This same pattern appears in other problems like finding distance between nodes, counting subtrees, or propagating values upwards in general trees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Lowest Common Ancestor of a Binary Search Tree(lowest-common-ancestor-of-a-binary-search-tree) (Medium)
- Smallest Common Region(smallest-common-region) (Medium)
- Find Players With Zero or One Losses(find-players-with-zero-or-one-losses) (Medium)
- Lowest Common Ancestor of a Binary Tree II(lowest-common-ancestor-of-a-binary-tree-ii) (Medium)
- Lowest Common Ancestor of a Binary Tree III(lowest-common-ancestor-of-a-binary-tree-iii) (Medium)
- Lowest Common Ancestor of a Binary Tree IV(lowest-common-ancestor-of-a-binary-tree-iv) (Medium)
- Step-By-Step Directions From a Binary Tree Node to Another(step-by-step-directions-from-a-binary-tree-node-to-another) (Medium)
- Cycle Length Queries in a Tree(cycle-length-queries-in-a-tree) (Hard)