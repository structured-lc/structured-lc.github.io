### Leetcode 510 (Medium): Inorder Successor in BST II [Practice](https://leetcode.com/problems/inorder-successor-in-bst-ii)

### Description  
Given a node in a binary search tree (BST) where each node has pointers to its left and right children as well as its parent, you are asked to find the **inorder successor** of the given node.  
The inorder successor of a node is the node with the smallest key greater than the key of the input node when traversed in-order (left, root, right).  
You have direct access to the node, but not necessarily the tree's root.

### Examples  

**Example 1:**  
Input: `Node with value 10 in BST: [20,10,30,5,15]`  
Output: `Node with value 15`  
Explanation:  
Inorder traversal: [5, 10, 15, 20, 30].  
The successor of 10 is 15.

**Example 2:**  
Input: `Node with value 15 in BST: [20,10,30,5,15]`  
Output: `Node with value 20`  
Explanation:  
Inorder traversal: [5, 10, 15, 20, 30].  
The successor of 15 is 20.

**Example 3:**  
Input: `Node with value 30 in BST: [20,10,30,5,15]`  
Output: `null`  
Explanation:  
Inorder traversal: [5, 10, 15, 20, 30].  
30 is the largest node, so it does not have a successor.

Visual Example for [20,10,30,5,15]:
```
    20
   /  \
 10    30
 / \
5  15
```

### Thought Process (as if you’re the interviewee)  
Start by recalling that the inorder successor is defined as the next node in the inorder traversal sequence.  
With direct access to the node (not the root) and having parent pointers, I should handle two main cases:

- If the node has a right child:  
  The successor will be the leftmost child of the right subtree.  
- If the node does **not** have a right child:  
  The successor is one of its ancestors. Walk up the parent pointers until moving up from a left child—at that point, the parent is the successor.

Brute-force idea would have been to do an in-order traversal from the tree's root, but the absence of root access and the presence of parent pointers makes this unnecessary.  
Optimized approach leverages the structure and pointers to find the successor directly in O(h) time.

### Corner cases to consider  
- The input node is the **rightmost/largest** node (returns `null`).
- The input node **has no right child and is itself a right child** repeatedly up to the root.
- The input node has a **right child, but the subtree is a single node**.
- BST of **size 1** (node has no successor).

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val=0, left=None, right=None, parent=None):
        self.val = val
        self.left = left
        self.right = right
        self.parent = parent

def inorderSuccessor(node: 'Node') -> 'Node':
    # Case 1: Node has right child.
    if node.right:
        # Go one step right, then keep going left.
        curr = node.right
        while curr.left:
            curr = curr.left
        return curr
    
    # Case 2: No right child.
    # Move up to parent until node is a left child of its parent.
    while node.parent and node.parent.right == node:
        node = node.parent
    # Can return None if no successor exists.
    return node.parent
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h), where h is the height of the tree.  
  - In worst case, we may go from leaf to root (for leftward traversal up parent pointers), or traverse down the full right subtree.
- **Space Complexity:** O(1), since only a fixed number of pointers/variables are used, and there’s no recursion or additional storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the parent pointer is not available?  
  *Hint: Would need access to the root and a full tree traversal/ancestor search.*

- How would you find the inorder **predecessor** instead of the successor?  
  *Hint: Symmetric logic—check left child and rightmost descendant, else move up until node is a right child.*

- Suppose you needed to **print all successors** of a given node in order, not just one.  
  *Hint: Inorder traversal from the node forward, using parent pointers.*

### Summary
This approach exploits the **parent pointer** for efficient O(h) search, following the binary search tree and inorder properties.  
The solution is a classic example of searching ancestors or descendants for a node’s next or previous value.  
This pattern appears frequently in tree traversal, successor/predecessor queries, and questions about relationships in binary trees.


### Flashcard
If node has right child, successor is its leftmost descendant; otherwise, walk up parent pointers until moving up from a left child.

### Tags
Tree(#tree), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Inorder Successor in BST(inorder-successor-in-bst) (Medium)