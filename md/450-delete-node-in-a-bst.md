### Leetcode 450 (Medium): Delete Node in a BST [Practice](https://leetcode.com/problems/delete-node-in-a-bst)

### Description  
Given the root of a binary search tree (**BST**) and a key, delete the node with the given key (if present) while maintaining the BST property.  
When deleting a node, you need to handle the following cases:
- The node is a leaf node (no children).
- The node has one child.
- The node has two children (replace with in-order successor or predecessor).

Return the root of the modified BST. The function should handle empty trees and return the valid new root.

### Examples  

**Example 1:**  
Input: `root = [5,3,6,2,4,null,7], key = 3`  
Output: `[5,4,6,2,null,null,7]`  
*Explanation: Node 3 is deleted. It had two children (2 and 4). Replace node 3 with its in-order successor (node 4).
  
BST before:  
```
    5
   / \
  3   6
 / \   \
2   4   7
```
BST after:  
```
    5
   / \
  4   6
 /     \
2       7
```
List: `[5,4,6,2,null,null,7]`

**Example 2:**  
Input: `root = [5,3,6,2,4,null,7], key = 0`  
Output: `[5,3,6,2,4,null,7]`  
*Explanation: Node 0 does not exist, so the tree remains unchanged.

**Example 3:**  
Input: `root = [], key = 0`  
Output: `[]`  
*Explanation: Tree is empty, so nothing to delete.

### Thought Process (as if you’re the interviewee)  
First, I need to locate the node with value `key`.  
- Start at the root:  
  - If `key < node.val`, go left.
  - If `key > node.val`, go right.
  - If `key == node.val`, this is the node to delete.

Now, handle deletion:
- If node has **no children**: return `None`.
- If only **one child**: return that child, replacing current node.
- If **two children**: find the node’s in-order successor (smallest node in the right subtree), replace node value with the successor’s value, and then recursively delete that successor from the right subtree.

This preserves BST invariants.  
- **Brute-force:** Flatten tree to list, remove value, rebuild BST—inefficient.
- **Better:** Use recursion to find and delete in one pass.

This approach is efficient and widely used for BST node deletion. It directly maintains the tree structure.

### Corner cases to consider  
- Empty tree (`root` is `None`)
- `key` not in BST
- Deleting the root node
- Deleting a node with only one child (left or right)
- Deleting a leaf node (no children)
- Deleting a node with two children
- All node values are unique

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
        # Helper to find the node with minimum value in tree (leftmost)
        def findMin(node):
            while node.left:
                node = node.left
            return node

        if not root:
            return None

        # Traverse the tree to find the node to delete
        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            # Node with key found
            if not root.left:
                # No left child, promote right child
                return root.right
            elif not root.right:
                # No right child, promote left child
                return root.left
            else:
                # Two children: Replace value with in-order successor
                min_larger_node = findMin(root.right)
                root.val = min_larger_node.val
                # Delete the in-order successor
                root.right = self.deleteNode(root.right, min_larger_node.val)
        return root
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **O(H)**, where H is the height of the tree (best/average: O(logₙ), worst: O(n) in a skewed tree). Each recursive call advances one level down.
- **Space Complexity:**  
  - **O(H)** for recursion stack, due to the path from root to leaf during recursion; no extra structures created.

### Potential follow-up questions (as if you’re the interviewer)  

- If the BST is not balanced, what’s the worst-case time complexity?  
  *Hint: Consider a highly skewed tree (linked-list form).*

- How can you balance the BST after repeated deletions and insertions?  
  *Hint: Consider AVL, Red-Black, or other self-balancing trees.*

- Can you perform this deletion iteratively instead of recursively?  
  *Hint: Use a loop and pointers; helps to avoid stack overflow for very deep trees.*

### Summary
The approach uses **BST traversal with recursion** to efficiently find and remove a node while preserving BST properties. Uses the in-order successor for cases with two children. This pattern—find, modify subtree if needed, return root—is **common for tree modification problems** (insert, delete). The recursion framework for BSTs is widely used for tree-based questions.


### Flashcard
To delete a node in a BST, find the node, then: if it has no children, remove it; if one child, replace with its child; if two children, replace with its in-order successor (smallest in right subtree) and delete the successor.

### Tags
Tree(#tree), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Split BST(split-bst) (Medium)