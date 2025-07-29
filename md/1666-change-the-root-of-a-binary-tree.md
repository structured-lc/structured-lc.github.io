### Leetcode 1666 (Medium): Change the Root of a Binary Tree [Practice](https://leetcode.com/problems/change-the-root-of-a-binary-tree)

### Description  
You are given a binary tree and a node `leaf` which always exists in the tree. Change the tree so that `leaf` becomes the new root and every parent points to their child as parent—reversing the path from root to leaf. All other subtrees belonging to nodes on the path should become right subtrees.

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4,5], leaf = 4`
Tree:
```
    1
   / \
  2   3
 / \
4   5
```
Output:
```
    4
     \
      2
       \
        1
         \
          3
           \
            5
```
*Explanation: The path 1-2-4 is reversed. Each parent becomes the right child. Left subtrees along the path (such as 5) become right children of the new nodes.*

List representation changes from `[1,2,3,4,5]` to `[4,null,2,null,1,null,3,null,5]`.

**Example 2:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 7`
Tree:
```
      3
     / \
    5   1
   / \ / \
  6 2 0  8
    / \
   7  4
```
Output:
```
7
 \
 2
  \
   5
    \
     3
      \
       1
        \
         0
          \
           8
            \
             4
```

Tree after root change: `[7,null,2,null,5,null,3,null,1,null,0,null,8,null,4]`

### Thought Process (as if you’re the interviewee)  
The core problem is to **reverse the parent pointers** along the path from the original root to the `leaf`. Think of traversing down to the leaf, then as the call stack unwinds, each parent becomes the right child of its child.
- *Left* child along the path becomes right child in the new tree.
- Other subtrees of the node along the path should be attached as the rightmost children below, ensuring valid structure.
- Recursion is a natural fit: traverse until you reach leaf, then backtracking—detaching and re-attaching pointers as required.

### Corner cases to consider  
- The tree is a single node (root == leaf)
- The leaf is already the leftmost node
- Sparse trees (some children missing)
- Trees with only right or only left children

### Solution

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def flipBinaryTree(root, leaf):
    # Helper to traverse and flip path
    def dfs(node, parent=None):
        if node is None or node == leaf:
            return node
        # Search left and right subtrees
        if node.left:
            res = dfs(node.left, node)
            if res:  # path found
                node.left = None
                res.right = node
                if node.right:
                    # Attach right subtree as rightmost child
                    tmp = res
                    while tmp.right:
                        tmp = tmp.right
                    tmp.right = node.right
                    node.right = None
                return res
        if node.right:
            res = dfs(node.right, node)
            if res:
                node.right = None
                res.right = node
                return res
        return None
    return dfs(root)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), must traverse the tree to find and flip path.
- **Space Complexity:** O(h), recursive stack height (where h is the height of the tree).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you perform this in iterative fashion (not recursion)?  
  *Hint: Use parent mapping and pointer rewiring in a loop.*

- How would you reverse a path to any node, not just a leaf?  
  *Hint: Generalize the recursion to stop at any target node.*

- How do you verify if the leaf node exists in the tree up front?  
  *Hint: Perform a traversal checking for leaf.*

### Summary
This uses **tree path reversal** and pointer manipulation—an example of recursion along a unique path with careful parent/child rewiring. Related to **tree root changing and path reversal** interview patterns.