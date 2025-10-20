### Leetcode 98 (Medium): Validate Binary Search Tree [Practice](https://leetcode.com/problems/validate-binary-search-tree)

### Description  
Given the root of a binary tree, determine if it is a valid binary search tree (BST).  
A valid BST is defined as:
- The left subtree of a node contains only nodes with keys **strictly less** than the node's key.
- The right subtree of a node contains only nodes with keys **strictly greater** than the node's key.
- Both subtrees must also be binary search trees.

### Examples  

**Example 1:**  
Input: `[2,1,3]`  
Output: `True`  
Explanation:  
```
    2
   / \
  1   3
```
Both left and right children satisfy BST properties.

**Example 2:**  
Input: `[5,1,4,null,null,3,6]`  
Output: `False`  
Explanation:  
```
    5
   / \
  1   4
     / \
    3   6
```
4 is right child of 5 and must be >5, but 4 has left child 3, which violates the BST property as it appears in the right subtree of 5 but is less than 5.

**Example 3:**  
Input: `[10,5,15,null,null,6,20]`  
Output: `False`  
Explanation:  
```
    10
   /  \
  5    15
      /  \
     6    20
```
6 is in right subtree of 10 but less than 10, so the BST property fails.

### Thought Process (as if you’re the interviewee)  
Start by recalling the BST definition: for each node, all nodes in the left subtree must be less, and all in the right subtree must be greater. A naive solution checks only immediate children, but that's not enough since deep descendants may break BST rules.  
A robust approach is to use DFS recursion and track a valid value range (`min`, `max`) for each node: 
- For a given node, its value must be strictly between allowed `min` and `max`.
- Recursively check left with (`min`, node.val), right with (node.val, `max`).  
This ensures all descendants uphold proper bounds.  
In-order traversal is another valid approach: the sequence must strictly increase if the tree is a valid BST[1][3][4].

### Corner cases to consider  
- Empty tree (`root == None`) → should return `True`.
- One node → should return `True`.
- Tree with duplicate values → must return `False` (since "strictly" less/greater).
- Subtrees that are valid locally but break the rule with respect to ancestors.
- Skewed trees (all left or all right children).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isValidBST(root):
    # Helper function with current node, min, and max bounds.
    def is_valid(node, minn, maxx):
        if not node:
            return True  # Null node is valid

        if node.val <= minn or node.val >= maxx:
            return False  # Current value violates strict BST bounds

        # Left subtree: values < node.val
        # Right subtree: values > node.val
        return (
            is_valid(node.left, minn, node.val) and
            is_valid(node.right, node.val, maxx)
        )

    # Initial call: entire value range
    return is_valid(root, float('-inf'), float('inf'))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes. Each node is visited exactly once.
- **Space Complexity:** O(h), where h = height of the tree (due to recursion stack). In worst case (skewed tree), h ≈ n; best case (balanced), h ≈ log n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you validate the BST if the tree is modified frequently (insert/delete/lookup)?
  *Hint: Think about balancing, and data structures like AVL/Red-Black trees.*

- Can you write an iterative solution (without recursion) for BST validation?
  *Hint: Use a stack to perform in-order traversal and keep track of previous value.*

- How would you adapt this if duplicate values are allowed but must appear only in a certain subtree?
  *Hint: Adjust the comparison logic according to which side duplications appear.*

### Summary
This problem is a classic example of the **DFS with range constraint pattern**. The approach is core for verifying recursive global properties in trees, especially when each node depends not just on local but also ancestral constraints. Commonly used in BST validation and problems involving numeric boundaries on paths (e.g., path sum, Kth smallest/largest in BST).


### Flashcard
Use DFS with min/max bounds; for each node, ensure its value is within (min, max) and recursively validate left and right subtrees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)
- Find Mode in Binary Search Tree(find-mode-in-binary-search-tree) (Easy)