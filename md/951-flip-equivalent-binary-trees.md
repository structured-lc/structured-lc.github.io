### Leetcode 951 (Medium): Flip Equivalent Binary Trees [Practice](https://leetcode.com/problems/flip-equivalent-binary-trees)

### Description  
Given two binary trees, determine if they are **flip equivalent**. Two trees are flip equivalent if we can make them equal by flipping (swapping) any number of left and right children at any nodes.  
A *flip operation* at any node swaps its left and right child subtrees. We can perform any number of such operations, at any nodes, in any order.  
Return `True` if the two trees can be made identical in structure and values after any number (possibly zero) of flips; otherwise, return `False`.

### Examples  

**Example 1:**  
Input:  
root1 = `[1,2,3,4,5,6,null,null,null,7,8]`  
root2 = `[1,3,2,null,6,4,5,null,null,null,null,8,7]`  
Output: `True`  
Explanation:  
We can flip at nodes with values 1, 3, and 5 to make both trees look the same.

Drawn trees:
```
root1:                root2:
    1                     1
   / \                   / \
  2   3                 3   2
 / \   \                 \  / \
4   5   6               6 4   5
   / \                       / \
  7   8                     8   7
```

**Example 2:**  
Input:  
root1 = `[1,2,3]`  
root2 = `[1,2,4]`  
Output: `False`  
Explanation:  
The right subtree’s values differ (3 vs 4). No sequence of flips can make them equal.

**Example 3:**  
Input:  
root1 = `[]`  
root2 = `[]`  
Output: `True`  
Explanation:  
Both trees are empty; by definition, they are flip equivalent.

### Thought Process (as if you’re the interviewee)  
- Since a flip can be performed at any node, we want to recursively check if two subtrees are **identical** either directly or after swapping their children.
- For each corresponding pair of nodes:
  - If they are both null, they match.
  - If one is null, or their values differ, return False.
  - Otherwise, check both subtree possibilities:
    - (left, left) and (right, right)  
    - (left, right) and (right, left)
- The brute-force approach works since we only need to check these two combinations recursively for every pair of nodes. Time complexity is acceptable as we visit every node once: O(n).
- We use depth-first search (DFS) recursion for this.

### Corner cases to consider  
- Both trees are empty (should return True).
- One tree is empty, the other is not (should return False).
- Trees with only one node (should return True if values match).
- Identical trees, no flip needed.
- Trees with same set of values but impossible to align via any series of flip operations (different structure beneath nodes).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def flipEquiv(root1: TreeNode, root2: TreeNode) -> bool:
    # If both nodes are None, they are equivalent at this subtree
    if root1 is root2:
        return True
    # If either is None or values don't match, not equivalent
    if not root1 or not root2 or root1.val != root2.val:
        return False

    # Check if subtrees are flip equivalent:
    # 1. No flip: left with left & right with right
    # 2. Flip: left with right & right with left
    same = flipEquiv(root1.left, root2.left) and flipEquiv(root1.right, root2.right)
    flipped = flipEquiv(root1.left, root2.right) and flipEquiv(root1.right, root2.left)

    return same or flipped
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited once (with two subtree comparisons per node), where n is the total number of nodes in both trees.

- **Space Complexity:** O(h)  
  Only the recursion stack uses extra space, which at most is the height of the trees (h). In the worst case for a skewed tree, h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose values can repeat in the tree. How would your solution need to change?  
  *Hint: Be careful that matching by value is not sufficient if there are duplicates; structure matching remains necessary.*

- Can you solve it iteratively without recursion?  
  *Hint: Use a stack for DFS, and compare corresponding node pairs as in the recursive solution.*

- What if you also wanted to print the sequence of nodes at which flips must be performed?  
  *Hint: Track the path and compare which branches are being swapped at each subtree call.*

### Summary
This problem uses a classic **DFS with recursion** for **simultaneous tree traversal** and comparison. The core pattern is checking all meaningful subtree arrangements (flip/no-flip) at each node. Similar logic can be applied to problems involving structural tree equivalence with allowed transformations (like symmetry, mirrored trees, tree isomorphism).

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
