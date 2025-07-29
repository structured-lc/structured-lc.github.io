### Leetcode 2331 (Easy): Evaluate Boolean Binary Tree [Practice](https://leetcode.com/problems/evaluate-boolean-binary-tree)

### Description  
Given the root of a *full binary tree*, where each node represents a boolean value or operation:
- **Leaf nodes** have value `0` (False) or `1` (True).
- **Non-leaf nodes** have value `2` (OR operation) or `3` (AND operation).
Your task is to evaluate the tree and return the boolean result of the root, where non-leaf nodes combine their two children's results using the indicated operation.

### Examples  

**Example 1:**  
Input: `[2,1,3,0,1]`  
Output: `True`  
*Explanation:*

Tree:
```
      2
     / \
    1   3
       / \
      0   1
```
- Left child (`1`) = True.
- Right child is an AND node: `0` AND `1` = False.
- Root is OR: True OR False = True.

**Example 2:**  
Input: ``  
Output: `False`  
*Explanation:*

Tree:
```
0
```
- Single leaf node: 0 → False.

**Example 3:**  
Input: `[3,3,2,0,1,1,0]`  
Output: `False`  
*Explanation:*

Tree:
```
      3
     / \
    3   2
   / \ / \
  0  1 1  0
```
- Left subtree, AND: `0 AND 1 = 0`
- Right subtree,  OR: `1 OR 0 = 1`
- Root, AND: `0 AND 1 = 0` (False)

### Thought Process (as if you’re the interviewee)  
First, I note this problem describes a binary tree where internal nodes are boolean operators (AND/OR) and leaves are boolean values (True/False). The goal is to evaluate the expression encoded in the tree.  
A simple approach is recursion:
- If the current node is a leaf (0 or 1), return its value.
- Otherwise:
  - Recursively evaluate left and right children.
  - If node is `2` (OR), return left OR right.
  - If node is `3` (AND), return left AND right.

This is analogous to a postorder traversal, as we must compute child values before applying the parent's operator.  
The brute-force solution is both simple and optimal due to tree traversal constraints; there's no repeated work or room for memoization.

### Corner cases to consider  
- Single node tree (just one value).
- All nodes are `1` (should return True for any AND/OR combination).
- All nodes are `0` (should return False for any AND/OR combination).
- Trees where operators return False as soon as possible (e.g., AND with one child False).
- Deep/nested trees to test recursion.
- Full binary tree property is always maintained.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def evaluateTree(root: TreeNode) -> bool:
    # Base case: leaf node (0 or 1)
    if root.left is None and root.right is None:
        return root.val == 1  # True if value is 1, else False

    # OR operator
    if root.val == 2:
        return evaluateTree(root.left) or evaluateTree(root.right)
    
    # AND operator
    if root.val == 3:
        return evaluateTree(root.left) and evaluateTree(root.right)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the tree. Each node is visited exactly once during the recursion.
- **Space Complexity:** O(h), where h is the height of the binary tree (due to the recursion stack). In the worst case (a skewed tree), h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- **Can you implement this without recursion?**  
  *Hint: Try using an explicit stack to simulate postorder traversal.*

- **If the node values could include XOR or NOT, how would you modify your solution?**  
  *Hint: Add support for more operators by extending the conditional logic.*

- **What if the tree was not a full binary tree?**  
  *Hint: Carefully handle cases where left or right child could be None.*

### Summary
This problem is a classic **expression tree evaluation**, following a *postorder traversal* pattern. The recursive approach is both simple and optimal for this structure. This coding pattern is common for evaluating arithmetic or boolean expression trees and parsing problems. It’s a foundational technique in compilers and calculators, and also appears in questions involving computation from tree leaves to root.