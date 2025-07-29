### Leetcode 114 (Medium): Flatten Binary Tree to Linked List [Practice](https://leetcode.com/problems/flatten-binary-tree-to-linked-list)

### Description  
Given a binary tree, modify it **in place** to "flatten" it into a singly linked list, following these rules:
- The linked list must use the existing TreeNode class.
- Each node's **right** pointer should point to the next node in the linked list.
- All **left** pointers should be set to null.
- The order of nodes in the linked list must correspond to the order they would be visited in a **pre-order traversal** (root, left, right) of the tree.
- No extra data structures should be created.

In other words, after flattening:
- Root becomes the head of the list.
- The entire tree is restructured only with right pointers, traversing as the pre-order sequence.
- All left pointers are removed (set to None).

Example tree `[1,2,5,3,4,null,6]` is represented as:
```
    1
   / \
  2   5
 / \   \
3   4   6
```

After flattening, it becomes:
```
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

### Examples  

**Example 1:**  
Input: `[1,2,5,3,4,null,6]`  
Output: `[1,null,2,null,3,null,4,null,5,null,6]`  
*Explanation:  
The initial tree is:*
```
    1
   / \
  2   5
 / \   \
3   4   6
```
*Flattened tree (listing right children):*
```
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

**Example 2:**  
Input: `[]`  
Output: `[]`  
*Explanation:  
Empty tree remains empty.*

**Example 3:**  
Input: ``  
Output: ``  
*Explanation:  
Single node tree stays as is (no change needed).*
```
0
```

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Pre-order traverse the tree and store all nodes in a list. Then, re-link each node's right pointer to the next node in the list, and set left pointers to null.
  - Downside: uses O(n) extra space for the list, which isn’t allowed by the problem constraints.

- **Recursive DFS:**  
  Since the problem asks for in-place flattening and follows pre-order, I can use post-order (reverse preorder: right, left, root) and a variable to keep track of the “previous” node as I traverse back up the recursion stack.
  - For each node, recursively flatten its right and left subtrees. Then set node.right = previous, node.left = None, and update previous to this node.

- **Iterative with stack:**  
  Simulate pre-order traversal with a stack. At each step, pop the node, push right child then left child to the stack (since stack is LIFO), and always set node.right = stack[-1] (if available), node.left = None.

- **Optimized (Morris Traversal O(1) space):**  
  - For each node, if it has a left child, find its **rightmost** node in the left subtree (predecessor).  
  - Set the predecessor’s right pointer to node.right.  
  - Move node.left subtree to node.right and set node.left to None.  
  - Move to node.right and repeat.

**Chosen approach:**  
- The recursive solution is intuitive and acceptable for most interviews, with O(n) time and O(h) space (for recursion stack).
- If the interviewer insists on O(1) space, use the Morris Traversal approach.

### Corner cases to consider  
- The tree is empty (`root is None`)
- Tree has only one node
- The tree is already a flat right-skewed list
- Tree with every node only having left children
- Tree with every node only having right children
- Nodes have duplicate values
- Nodes at maximum depth (very skewed, deep trees)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: 'TreeNode') -> None:
        """
        Do not return anything, modify root in-place.
        """
        # We'll use a reverse postorder (right -> left -> root)
        # and a nonlocal variable to keep track of the last visited node.

        prev = None
        
        def helper(node):
            nonlocal prev
            if not node:
                return
            helper(node.right)
            helper(node.left)
            # On unwind, set right to prev and left to None
            node.right = prev
            node.left = None
            prev = node
        
        helper(root)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of nodes. Every node is visited once for restructuring.
- **Space Complexity:** O(h), where h is the height of the tree, due to recursion stack. For a balanced tree h = ⌊log₂n⌋, in the worst case (skewed) it's O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you flatten the tree **without recursion or extra stack space**?
  *Hint: Think about using parent-child relationships directly—consider Morris Traversal.*

- How would you **restore** the binary tree to its original structure, if at all possible?
  *Hint: Once pointers are changed and left children are dropped, information may be lost.*

- What if the tree nodes contained a reference to their **parent**? Could you do this more efficiently?
  *Hint: Parent pointers could allow bottom-up traversals.*

### Summary
This is a classic **tree transformation** and **in-place modification** problem using **preorder traversal** and the **DFS pattern**. The recursive method is elegant and works seamlessly with the unwinding order of recursion. Morris Traversal allows for O(1) extra space by rewiring pointers, showcasing advanced pointer manipulation. Similar in-place modification patterns show up in tree problems like right-side view, connecting next right pointers, or flattening/serializing trees for storage.