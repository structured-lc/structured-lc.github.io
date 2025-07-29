### Leetcode 100 (Easy): Same Tree [Practice](https://leetcode.com/problems/same-tree)

### Description  
Given the roots of two binary trees, determine if they are exactly the same. Two binary trees are considered the same if they have the same structure and all corresponding nodes have the same value. This means every node must have a matching counterpart in the other tree, and values at each position must match perfectly.

### Examples  

**Example 1:**  
Input:  
```
Tree 1:   1
         / \
        2   3
Tree 2:   1
         / \
        2   3
```
Output: `True`  
*Explanation: Both trees have the same structure and values at all positions.*

**Example 2:**  
Input:  
```
Tree 1:   1
         / 
        2   
Tree 2:   1
           \
            2
```
Output: `False`  
*Explanation: Tree structures are different; the 2 is a left child in Tree 1 and a right child in Tree 2.*

**Example 3:**  
Input:  
```
Tree 1:   1
         / \
        2   1
Tree 2:   1
         / \
        1   2
```
Output: `False`  
*Explanation: Though the structure is the same, the values of corresponding nodes differ.*

### Thought Process (as if you’re the interviewee)  
My initial approach is to compare the trees node-by-node using recursion (DFS). At each position, I check if:
- Both nodes are `None` ⇒ continue, they're identical at this spot.
- Only one is `None` ⇒ not identical, return False.
- Both have a value, but values are different ⇒ return False.

Next, I recursively compare the left subtrees and the right subtrees of the current nodes. If all comparisons succeed, the trees are the same.

This recursive approach is clear and directly mirrors how I would compare the trees by hand, making it easy to write and understand. The trade-off is limited to stack space for the recursion, which is acceptable for interview-level tree depths.

### Corner cases to consider  
- Both trees are `None` (empty): should return True.
- One tree is `None`, the other is not: should return False.
- Identical structure, but different values at any node.
- Trees of different depths/shapes.
- Single-node trees, identical or not.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSameTree(p: TreeNode, q: TreeNode) -> bool:
    # If both nodes are None, the trees match at this position
    if not p and not q:
        return True
    # If only one is None or values differ, trees do not match
    if not p or not q or p.val != q.val:
        return False
    # Recursively check left and right subtrees
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the smaller tree  
  Every node is checked exactly once to compare its value and structure.

- **Space Complexity:** O(h), where h is the maximum height of the trees  
  This accounts for the maximum number of frames on the Python call stack during recursion. In the worst case (e.g., trees are skewed), this could be as large as O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the trees are very large—how would you avoid recursion stack overflow?  
  *Hint: Try writing an iterative version using your own stack.*

- How would you compare two trees to check if they are mirror images (i.e., symmetric)?  
  *Hint: Instead of comparing left-to-left and right-to-right, compare crosswise children.*

- Could you modify your method to compare only the values but ignore structure differences?  
  *Hint: Consider traversing both trees and comparing value sequences.*

### Summary
This is a classic **recursive DFS tree comparison** problem, using a straightforward approach: check node equality and recursively proceed to children. The pattern is broadly applicable—for example, in validating binary tree equality checks, mirroring, or subtree matching problems. Recognizing places where structure and values both matter (vs. just values) is a common requirement in tree-based coding interviews.