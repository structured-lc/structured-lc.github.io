### Leetcode 865 (Medium): Smallest Subtree with all the Deepest Nodes [Practice](https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes)

### Description  
Given a binary tree, **find the smallest subtree that contains all the deepest nodes**.  
- The *depth* of a node is its distance from the root (root has depth 0).
- A node is *deepest* if it is at the greatest depth in the tree.
- The *smallest subtree* should be the lowest common ancestor (LCA) of all deepest nodes—i.e., the minimal node in the tree such that every deepest node is in its subtree.

You are to **return the root of this smallest subtree**.

### Examples  

**Example 1:**  
Input: `[3,5,1,6,2,0,8,null,null,7,4]`  
Output: `2`  
Explanation:  
Tree representation:  
```
    3
   / \
  5   1
 / \ / \
6  2 0  8
   / \
  7   4
```
Deepest nodes are 7 and 4 (both at depth 3). Their lowest common ancestor is 2, so return node 2.

**Example 2:**  
Input: `[1]`  
Output: `1`  
Explanation:  
Tree representation:  
```
1
```
There is only one node. It is also the deepest node and contains itself.

**Example 3:**  
Input: `[0,1,3,null,2]`  
Output: `2`  
Explanation:  
Tree representation:  
```
   0
  / \
 1   3
  \
   2
```
The deepest node is 2 (at depth 2); thus, return 2.

### Thought Process (as if you’re the interviewee)  

To approach this:
- **Brute-force idea:**  
  First, find all deepest nodes by traversing the tree and tracking node depths, then find their lowest common ancestor (LCA). However, collecting all deepest nodes and then running a general LCA algorithm can be inefficient and requires extra space.

- **Optimized idea:**  
  Instead, use a **post-order traversal (DFS)** to walk the tree.  
  - For each node, return two things: the node containing all the deepest nodes in its subtree, and the max depth below it.
  - For a given node:
    - If the left and right subtrees have the same max depth, this node is the ancestor of all deepest nodes in that subtree.
    - If one subtree is deeper, propagate the result of that deeper side up.
  - This way, we only traverse the tree once: as the recursion unwinds, every node reports the LCA of its deepest leaves, bubbling up the answer.

This approach is clean, avoids unnecessary storage, and leverages recursion stack as needed.

### Corner cases to consider  
- Tree contains just one node (single node is its own deepest ancestor).
- Tree is skewed to one side (all nodes are deepest, ancestor is the last node).
- Multiple deepest nodes, but only one common ancestor (root).
- Empty tree (function may return `None`).
- Trees with duplicate depths but only one deepest node.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def subtreeWithAllDeepest(self, root: TreeNode) -> TreeNode:
        # Helper function: returns (subtree_root, max_depth)
        def dfs(node):
            if not node:
                return (None, 0)
            left_subtree, left_depth = dfs(node.left)
            right_subtree, right_depth = dfs(node.right)
            
            # If both sides have equal depth, current node is the common ancestor
            if left_depth == right_depth:
                return (node, left_depth + 1)
            # One side is deeper, propagate up that side
            elif left_depth > right_depth:
                return (left_subtree, left_depth + 1)
            else:
                return (right_subtree, right_depth + 1)
        
        # Only subtree_root is needed for the answer
        subtree_root, _ = dfs(root)
        return subtree_root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited exactly once during the DFS traversal (n is the number of nodes).
- **Space Complexity:** O(h) — Where h is the height of the tree (call stack for DFS). In worst case (skewed tree), h = n; in balanced case, h = log n. No extra data structures or lists stored.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very large and recursion depth is an issue?  
  *Hint: Consider using an explicit stack for iterative DFS instead of recursion.*

- How would you modify this if node values were not unique and you need to return all such smallest subtrees?  
  *Hint: Instead of returning just one node, gather all nodes where left and right subtree depths match equal to the maximum possible.*

- Can you extend this to N-ary trees?  
  *Hint: Generalize by comparing depths of all child subtrees, finding the set of children having max depth.*

### Summary
This problem leverages the **lowest common ancestor** pattern for multiple (possibly >2) nodes at maximum depth in a tree, efficiently solved via **post-order DFS** that bubbles up both depth and ancestor info at each call. This approach is common for tree-based subtree/LCA type problems, and can be adapted for variants involving multiple target nodes, substrings, or multi-way trees.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
