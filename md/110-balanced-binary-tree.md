### Leetcode 110 (Easy): Balanced Binary Tree [Practice](https://leetcode.com/problems/balanced-binary-tree)

### Description  
Given a binary tree, determine if it is **height-balanced**. A binary tree is considered height-balanced if for every node, the difference in depth (height) of its left and right subtrees is at most 1. In other words, at no node in the tree do the left and right subtrees differ in height by more than one.

### Examples  

**Example 1:**  
Input: `[3,9,20,null,null,15,7]`  
Output: `true`  
*Explanation: The tree is:*
```
    3
   / \
  9  20
     / \
    15  7
```
*Both the left and right subtrees of every node differ by at most 1 in height, so the tree is balanced.*

**Example 2:**  
Input: `[1,2,2,3,3,null,null,4,4]`  
Output: `false`  
*Explanation: The tree is:*
```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```
*The left subtree has height 3 and the right has height 1 for the node 1, difference is 2, which is more than 1.*

**Example 3:**  
Input: `[]`  
Output: `true`  
*Explanation: An empty tree is balanced by definition.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify the definition of a balanced tree: for every node, the heights of left and right subtrees differ by no more than 1.

-Brute force approach: 
   - For each node, recursively compute the height of left and right subtrees, and check if difference is ≤ 1.
   - If every node is balanced, return true; otherwise, false.
   - Downside: The same heights are repeatedly recalculated, making it O(n²) time.

-Optimized approach:
  - Use a bottom-up recursion: For each subtree, return both:
    - Whether it’s balanced
    - Its height
  - At each node, if the left and right subtrees are balanced and their height difference is at most 1, the node is balanced.
  - This way, each node's height is only computed once, ensuring O(n) time complexity.

Trade-offs: The bottom-up recursive solution is both clearer (clean separation of logic) and faster (no redundant height calculations).

### Corner cases to consider  
- Empty tree (should return true)
- Single node (should return true)
- Skewed trees (e.g., every node has only one child) — should be unbalanced if the skew is more than 1
- Subtree differences only at the leaf nodes
- Tree is balanced except for a deep subtree

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isBalanced(root):
    # Helper function to check balance and return height
    def check(node):
        if not node:
            # An empty node is balanced, height is 0
            return True, 0
        
        left_balanced, left_height = check(node.left)
        right_balanced, right_height = check(node.right)
        
        # Current node is balanced if both subtrees are balanced
        # and their heights differ by no more than 1
        balanced = left_balanced and right_balanced and abs(left_height - right_height) <= 1
        
        # Height of current node is 1 + max height of subtrees
        height = 1 + max(left_height, right_height)
        return balanced, height
    
    balanced, _ = check(root)
    return balanced
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited only once; subtree heights are not recomputed.
- **Space Complexity:** O(h), where h is the height of the tree, due to recursion stack. In the worst case (completely unbalanced), h = n; for balanced, h = log n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the height of the tree as well?  
  *Hint: Extend the helper so it returns both the balance status and the height in one pass.*

- How would you do this iteratively?  
  *Hint: Perform a post-order traversal with an explicit stack, managing return values of children.*

- How does this relate to checking if a tree is a valid Binary Search Tree?  
  *Hint: Both can be done recursively; think about what info propagates at each level.*

### Summary
This problem uses the **post-order traversal** recursion pattern and demonstrates how to return multiple values (balance status and height) from helper functions. This bottom-up approach is efficient for problems involving accumulating information from subtrees. It's a standard pattern for "tree status + summary" checks, also applicable in AVL tree construction, path-sum problems, and more.