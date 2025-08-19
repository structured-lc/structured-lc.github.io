### Leetcode 101 (Easy): Symmetric Tree [Practice](https://leetcode.com/problems/symmetric-tree)

### Description  
Given the root of a binary tree, determine whether it is *symmetric* around its center. In other words, check if the tree is a mirror image of itself when split down the middle.  
This means every node on the left subtree must exactly mirror its corresponding node on the right subtree—for both structure and value. If either the structure or the values differ, the tree is not symmetric.

### Examples  

**Example 1:**  
Input: `[1,2,2,3,4,4,3]`  
Output: `True`  
*Explanation:*
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```
Comparing the left and right subtrees node by node, all mirror pairs are equal (values and structure), so the tree is symmetric.

**Example 2:**  
Input: `[1,2,2,null,3,null,3]`  
Output: `False`  
*Explanation:*
```
    1
   / \
  2   2
   \    \
    3    3
```
Left subtree has a right child (3) but no left, the right subtree has a right child (3) but no left—so their structures don’t mirror; the tree is not symmetric.

**Example 3:**  
Input: `[]`  
Output: `True`  
*Explanation:*
Empty tree is symmetric by definition.

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to perform a traversal left-to-right and right-to-left and compare the corresponding nodes at every level. For every pair of nodes, the left node in the left subtree should equal the right node in the right subtree (and vice versa).

A recursive approach feels natural—define a helper function that takes two nodes and checks:
- If both are null ⇒ symmetric at this position.
- If only one is null, or values differ ⇒ not symmetric.
- Otherwise, recursively check the left of the first vs right of the second and right of the first vs left of the second.

Alternatively, you could do this iteratively with two queues or stacks, comparing nodes in mirrored order at each step, as each left child must match the corresponding right child and vice versa.

Recursion is elegant, but for deep trees, stack overflow is possible. Iterative (queue) solution uses similar logic, offering better stack safety.

Ultimately, both methods are valid; recursion is best for clarity, iterative is robust for large input. Both give O(n) time and space (since every node must be visited and we can temporarily store up to n/2 nodes at once).

### Corner cases to consider  
- Empty tree.
- Tree with only one node.
- Trees with various structures but equal values (e.g., left-right child mismatches).
- Trees with only left-side or right-side children.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSymmetric(root: TreeNode) -> bool:
    # Helper function to check mirror symmetry between two nodes
    def isMirror(left, right):
        # Both nodes are None ⇒ symmetric here
        if left is None and right is None:
            return True
        # Only one node is None or values don't match ⇒ not symmetric
        if left is None or right is None or left.val != right.val:
            return False
        # Check if left's left and right's right are mirror,
        # and left's right and right's left are mirror
        return isMirror(left.left, right.right) and isMirror(left.right, right.left)
    
    # Start by comparing left and right subtrees of root
    return isMirror(root.left, root.right) if root else True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — All n nodes are visited once to check symmetry.
- **Space Complexity:** O(h) for recursion stack, where h is the tree’s height. In the worst case (completely unbalanced), this could be up to O(n); for a balanced tree, O(log n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this iteratively instead of recursively?  
  *Hint: Use two queues or stacks, pushing children in mirrored order.*

- What if the tree is very deep and recursion causes a stack overflow?  
  *Hint: How would an iterative traversal help?*

- Could you check symmetry for an n-ary tree?  
  *Hint: What property would constitute a “mirror” for more than two children?*

### Summary
This problem uses the *mirror comparison* pattern and is a classic application of tree recursion. Recognizing that checking mirroring is essentially comparing nodes in symmetric positions is key.  
The approach—either recursive or iterative—is a foundational pattern for tree problems and can be generalized for checking structural symmetry or “mirroredness” in other tree-like data structures.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
