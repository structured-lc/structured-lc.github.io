### Leetcode 94 (Easy): Binary Tree Inorder Traversal [Practice](https://leetcode.com/problems/binary-tree-inorder-traversal)

### Description  
Given the root of a binary tree, return the inorder traversal of its node values in a list.  
Inorder traversal means:  
- Visit the left subtree  
- Visit the root node  
- Visit the right subtree  
Repeat this recursively (or iteratively) for every subtree.  
If the tree is a Binary Search Tree (BST), the inorder traversal will return the keys in ascending order.  

### Examples  

**Example 1:**  
Input: `[1,null,2,3]`  
Output: `[1,3,2]`  
*Explanation: Start at root (1). Left child is null (nothing to process). Visit 1. Move to right child (2). In 2's left subtree, visit 3, then visit 2.*

Tree:
```
    1
     \
      2
     /
    3
```

**Example 2:**  
Input: `[]`  
Output: `[]`  
*Explanation: Empty tree, so nothing to process.*

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
*Explanation: Single-node tree. Only node 1 is visited.*

Tree:
```
1
```

### Thought Process (as if you’re the interviewee)  

First, I'm given a binary tree and need to return its node values using inorder traversal.  
I know inorder means: left, node, right. This can be easily coded recursively.  
- **Brute-force:** Use recursion:
  - Traverse left, append current node's value, traverse right.
  - Simple and elegant but uses call stack memory (which can go up to n in a worst-case skewed tree).
- **Iterative:** Use a stack to simulate the call stack:
  - Start at the root, keep traversing left, pushing nodes onto the stack.
  - Pop a node, process it, and move right.
  - This avoids recursion and works identically in order.

Trade-offs:
- The recursive solution is concise and easy to read.  
- The iterative version avoids recursion stack overflow for very deep trees, and can be more robust in interviews.

If I was asked for constant space (excluding output), I'd look into Morris Traversal, but it's rare in interviews for "Easy" problems.

### Corner cases to consider  
- Empty tree (`root` is `None`)  
- Single node tree  
- Skewed trees (all left, all right)  
- Trees with duplicate values  
- Balanced vs. unbalanced trees  
- Tree with multiple `null` children  
- Deep (linked-list like) trees that test stack depth

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorderTraversal(root):
    # Iterative approach using a stack
    result = []
    stack = []
    current = root
    
    while current or stack:
        # Traverse to the leftmost node
        while current:
            stack.append(current)
            current = current.left
        # current is None here, backtrack one step
        current = stack.pop()
        result.append(current.val)
        # Visit right subtree
        current = current.right
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each of the n nodes is visited exactly once.
- **Space Complexity:** O(n) — In the worst case (completely unbalanced tree), the stack can hold up to n nodes. The output list also uses O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep? Could recursion cause a stack overflow?  
  *Hint: Think about call stack depth in large or skewed binary trees.*

- Can you solve it using O(1) extra space (excluding the result list)?  
  *Hint: Research Morris Traversal and how threaded binary trees work.*

- How would you adapt your code to support preorder or postorder traversals?  
  *Hint: Change the order of node processing in the code.*

### Summary
We explored recursive and iterative (using a stack) solutions to perform inorder traversal on a binary tree.  
This is a classic DFS/tree traversal pattern which often shows up in binary tree problems — and understanding both approaches is helpful for similar problems, such as preorder, postorder traversals, or variants like "kth smallest in BST", "Validate BST", etc.  
For more advanced follow-ups, Morris Traversal allows O(1) space traversal using tree threading, but it’s less common for "easy" interview screens.

### Tags
Stack(#stack), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Validate Binary Search Tree(validate-binary-search-tree) (Medium)
- Binary Tree Preorder Traversal(binary-tree-preorder-traversal) (Easy)
- Binary Tree Postorder Traversal(binary-tree-postorder-traversal) (Easy)
- Binary Search Tree Iterator(binary-search-tree-iterator) (Medium)
- Kth Smallest Element in a BST(kth-smallest-element-in-a-bst) (Medium)
- Closest Binary Search Tree Value II(closest-binary-search-tree-value-ii) (Hard)
- Inorder Successor in BST(inorder-successor-in-bst) (Medium)
- Convert Binary Search Tree to Sorted Doubly Linked List(convert-binary-search-tree-to-sorted-doubly-linked-list) (Medium)
- Minimum Distance Between BST Nodes(minimum-distance-between-bst-nodes) (Easy)