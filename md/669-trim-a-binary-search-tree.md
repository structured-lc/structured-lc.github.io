### Leetcode 669 (Medium): Trim a Binary Search Tree [Practice](https://leetcode.com/problems/trim-a-binary-search-tree)

### Description  
Given a **binary search tree** (BST) and two boundaries, **low** and **high**, trim the tree such that every node's value lies in the interval [low, high] (inclusive).  
The remaining tree should still be a valid BST, and the structure of the remaining nodes must be preserved (that is, descendants remain descendants).  
You may need to change the root of the tree if the original root is excluded by trimming.

### Examples  

**Example 1:**  
Input:  
BST:  
```
    1
   / \
  0   2
```
low = 1, high = 2  
Output:  
```
  1
   \
    2
```
Explanation:  
0 is less than 1, so it is removed. The subtree gets adjusted to keep 1 as the root with 2 as its right child.

**Example 2:**  
Input:  
BST:  
```
      3
     / \
    0   4
     \
      2
     /
    1
```
low = 1, high = 3  
Output:  
```
    3
   /
  2
 /
1
```
Explanation:  
Nodes with values 0 and 4 are outside [1, 3] and are removed. The rest are re-attached to form a valid BST.

**Example 3:**  
Input:  
BST:  
```
  2
```
low = 3, high = 4  
Output:  
(null)
Explanation:  
2 is outside the interval [3, 4], so the result is an empty tree.

### Thought Process (as if you’re the interviewee)  
- The brute-force idea would be: traverse the tree, collect all valid values, and build a new BST from the list. This would not preserve tree structure and might be inefficient.
- Instead, since it's a **BST**, for each node:
    - If node.val < low, only the right subtree could contain valid values (all left nodes are less than node.val ≤ low).
    - If node.val > high, only the left subtree could contain valid values.
    - If low ≤ node.val ≤ high, recursively trim left and right subtrees and keep the node.
- This **preserves the original structure** of the kept nodes and is highly efficient due to BST properties.
- Recursive DFS fits well here; each node is visited once, and subtrees are trimmed as we go back up.

### Corner cases to consider  
- The tree is empty (root is None).
- All nodes are out of [low, high]; expect None as the result.
- All nodes are within [low, high]; expect the original tree.
- Only one child (single-sided tree).
- Skewed tree (all left or all right).
- The root itself is out of range.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def trimBST(root, low, high):
    # Base case: If current node is None, return None.
    if not root:
        return None

    # If node value < low, only right subtree can have nodes in range.
    if root.val < low:
        return trimBST(root.right, low, high)

    # If node value > high, only left subtree can have nodes in range.
    if root.val > high:
        return trimBST(root.left, low, high)

    # Node is in [low, high], so recursively trim its subtrees.
    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once.
- **Space Complexity:** O(h), where h is the height of the tree, due to recursion stack.  
    - Worst case O(n) if the tree is skewed, O(log n) if balanced.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this without recursion?  
  *Hint: Use an explicit stack for iterative traversal similar to DFS.*

- Can you trim the BST in-place and avoid extra node allocations?  
  *Hint: Yes, since all changes are adjustments to existing node pointers.*

- What if the tree is not a BST but a regular binary tree?  
  *Hint: The BST property lets us prune entire subtrees earlier; for binary trees, you'd need a full traverse for every node.*

### Summary  
This is a **standard DFS / recursive tree manipulation pattern** that leverages BST properties to efficiently prune a tree.  
It’s highly reusable: similar logic applies in problems about searching, validation, or selective tree modification when the tree has sorted (BST) characteristics.  
The technique highlights how **recursive pruning** can shape data structures in-place with minimal overhead.


### Flashcard
Recursively trim BST; if node.val < low, return trimmed right subtree; if node.val > high, return trimmed left subtree; else trim both sides.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
