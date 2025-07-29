### Leetcode 144 (Easy): Binary Tree Preorder Traversal [Practice](https://leetcode.com/problems/binary-tree-preorder-traversal)

### Description  
Given the root of a binary tree, return a list of values representing the preorder traversal of its nodes.  
Preorder traversal visits nodes in this order:
- Visit the **root**
- Traverse the **left subtree**
- Traverse the **right subtree**  
For each node, process it before its subtrees. If a subtree is empty, skip it and move on[3][4].

### Examples  

**Example 1:**  
Input: `root = [1,null,2,3]`  
Output: `[1,2,3]`  
*Explanation: Visit 1 (root), then 2 (as right child of 1), then 3 (as left child of 2).  
Tree:
```
    1
     \
      2
     /
    3
```
Preorder = [1, 2, 3].*

**Example 2:**  
Input: `root = []`  
Output: `[]`  
*Explanation: The tree is empty, so there are no nodes to visit.*

**Example 3:**  
Input: `root = [1,2,3,4,5]`  
Output: `[1,2,4,5,3]`  
*Explanation:
```
    1
   / \
  2   3
 / \
4   5
```
Preorder: root (1), left subtree [2,4,5], right subtree [3]. Visit order: 1, 2, 4, 5, 3.*

### Thought Process (as if you’re the interviewee)  
To solve preorder traversal, I’ll use the definition:
Process the root, then traverse left, then right.  
A **recursive** approach works naturally, as each subtree is just another binary tree.  
In the recursive case:
- If the node is null, return.
- Otherwise:
  1. Visit the current node (append value).
  2. Traverse left.
  3. Traverse right.
Alternatively, for an **iterative** solution, I can emulate the call stack using an explicit stack:
- Push the root node.
- While the stack isn’t empty, pop a node, record its value, push the right child (if any), then left child (if any)—so left is processed before right.  
Recursive is concise but uses stack space.  
Iterative avoids recursion and is preferred if call stack size is a concern[3][4].

### Corner cases to consider  
- Tree is empty (root is None).
- Tree has only one node.
- Tree where all nodes have only left children.
- Tree where all nodes have only right children.
- Tree with complex/imbalanced structures.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorderTraversal(root):
    # Recursive preorder traversal (Root, Left, Right)
    result = []
    def helper(node):
        if not node:
            return
        result.append(node.val)         # Visit node
        helper(node.left)               # Traverse left subtree
        helper(node.right)              # Traverse right subtree
    helper(root)
    return result

# Iterative version, for completeness:
def preorderTraversalIterative(root):
    if not root:
        return []
    result = []
    stack = [root]
    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push right first so left is processed next
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is visited exactly once, where n = number of nodes.

- **Space Complexity:**  
  - Recursive: O(h), h = height of tree, due to the call stack (worst case O(n), average case O(⌊log n⌋) for balanced trees).
  - Iterative: O(h) for stack in the best case (O(n) worst case if tree is skewed).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can’t use recursion—how would you do this iteratively?  
  *Hint: Try to simulate recursion with an explicit stack.*

- How would you implement preorder traversal without using extra space (Morris traversal)?  
  *Hint: Modify tree links temporarily to avoid stack/recursion.*

- How would you generalize this for k-ary trees?  
  *Hint: Consider children as a list, traverse them in order after root.*

### Summary
The approach uses the **preorder traversal pattern**: process root, left, then right. It is a fundamental DFS traversal scheme.  
Both recursive and iterative forms are direct; recursive is more elegant, and iterative is robust for deep trees.  
This pattern underpins many tree problems, including tree cloning, serialization, and evaluating/printing hierarchies.