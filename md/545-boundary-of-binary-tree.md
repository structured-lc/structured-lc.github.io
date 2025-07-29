### Leetcode 545 (Medium): Boundary of Binary Tree [Practice](https://leetcode.com/problems/boundary-of-binary-tree)

### Description  
Given a binary tree, return the list of node values along its **boundary** viewed in an anti-clockwise direction starting from the **root**. The boundary comprises:
- The **root node**.
- The **left boundary** (excluding leaves), which is the path from root to the left-most node.
- All **leaf nodes** (from left to right).
- The **right boundary** (excluding leaves and in reverse order from bottom to top), which is the path from root to the right-most node.

No duplicate nodes should appear in the output. For single-node or skewed trees, output still follows these definitions.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,null,6,null,null,7,8]`  
Output: `[1,2,4,7,8,6,3]`  
*Explanation:*
```
      1
     / \
    2   3
   / \   \
  4   5   6
     / \
    7   8
```
- Left boundary: 2, 4  
- Leaves: 4, 7, 8, 6  
- Right boundary (bottom up): 6, 3 (excluding leaf 6, include 3)  
- Output: 1, 2, 4, 7, 8, 6, 3  

**Example 2:**  
Input: `[1, null, 2, 3, 4]`  
Output: `[1,3,4,2]`  
*Explanation:*
```
  1
   \
    2
   / \
  3   4
```
- Left boundary: 1 (root, since no left child)  
- Leaves: 3, 4  
- Right boundary: 2 (excluding leaves)  
- Output: 1, 3, 4, 2

**Example 3:**  
Input: `[1,2,null,3,4]`  
Output: `[1,2,3,4]`  
*Explanation:*
```
    1
   /
  2
 / \
3   4
```
- Left boundary: 1, 2 (skewed)  
- Leaves: 3, 4  
- Right boundary: None  
- Output: 1, 2, 3, 4

### Thought Process (as if you’re the interviewee)  
At first glance, the task involves **traversing the tree** in a way that collects nodes lying at the "boundary." These must be collected in three distinct phases:
- Traverse the **left boundary** (excluding leaves).
- Gather all **leaves** (from left to right).
- Traverse the **right boundary** (excluding leaves), but add these in bottom-up order.

A brute-force approach might simply traverse all nodes, but this could cause repeated nodes and does not impose order.  
A better plan is to:
 - Use **three helper traversals**:
    - One for the left boundary: recursively go left, adding to list until a leaf is reached.
    - One for the leaves: in-order traversal, collect if node is leaf.
    - One for the right boundary: recursively go right, collect nodes in a **stack/list to reverse at the end** since output order is bottom-up.
 - **Edge Handling:** Make sure not to duplicate leaves by guarding left/right traversal from adding leaves.
 - Finally, concatenate: root + left boundary + leaves + reversed right boundary.

### Corner cases to consider  
- Empty tree: output `[]`.
- Tree with only root: output `[root]`.
- Degenerate (left-only or right-only) trees.
- Avoid duplicate leaves on boundaries.
- Single leaf referenced as both left/right boundary and leaf.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def boundaryOfBinaryTree(self, root: TreeNode):
        if not root:
            return []

        # Utility to check if a node is a leaf
        def is_leaf(node):
            return node.left is None and node.right is None

        # Add left boundary (excluding leaves)
        def add_left_boundary(node, res):
            curr = node.left
            while curr:
                if not is_leaf(curr):
                    res.append(curr.val)
                if curr.left:
                    curr = curr.left
                else:
                    curr = curr.right

        # Add all leaves (in L->R order)
        def add_leaves(node, res):
            if node is None:
                return
            if is_leaf(node):
                res.append(node.val)
            else:
                add_leaves(node.left, res)
                add_leaves(node.right, res)

        # Add right boundary (excluding leaves), reversed at the end
        def add_right_boundary(node, res):
            curr = node.right
            stack = []
            while curr:
                if not is_leaf(curr):
                    stack.append(curr.val)
                if curr.right:
                    curr = curr.right
                else:
                    curr = curr.left
            while stack:
                res.append(stack.pop())

        boundary = []
        if not is_leaf(root):
            boundary.append(root.val)

        add_left_boundary(root, boundary)
        add_leaves(root, boundary)
        add_right_boundary(root, boundary)

        return boundary
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  Each node in the tree is visited at most once: once when finding the left boundary, once as a potential leaf, and once on the right boundary. No node is duplicated.
- **Space Complexity:** O(H)  
  Where H is the height of the tree, due to recursion stack (adding leaves). Worse case, O(N) if the tree is skewed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the approach if the tree nodes can have duplicate values?  
  *Hint: You’d need to make sure comparisons or storage is by identity (references) and not values; use node pointers, not values.*

- How do you solve the problem iteratively without recursion?  
  *Hint: Simulate DFS with your own stack, or adapt using loops by carefully tracking left/right boundaries.*

- If the tree is very large and recursion risks stack overflow, what alternative strategy would you use?  
  *Hint: Use an explicit stack for your traversals instead of recursive calls.*

### Summary
This approach is a **variation of tree traversal problems** and uses helper DFS traversals to separately collect the three “boundary” components. The "gather-and-glue" strategy is often used in problems involving special order traversals or structural decomposition of trees, making this a recurring pattern in binary tree interviews (e.g., spiral order, vertical order, outer view).