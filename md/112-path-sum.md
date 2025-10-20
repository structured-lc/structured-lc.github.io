### Leetcode 112 (Easy): Path Sum [Practice](https://leetcode.com/problems/path-sum)

### Description  
Given the root node of a binary tree and an integer `targetSum`, determine if there exists any **root-to-leaf path** in the tree such that the sum of all the node values along the path is exactly equal to `targetSum`. A **leaf** node is a node with no children.  
You need to return `True` if such a path exists, otherwise return `False`.

### Examples  

**Example 1:**  
Input: `root = [5,4,8,11,null,13,4,7,2,null,null,null,1]`, `targetSum = 22`  
Output: `True`  
Explanation:  
One root-to-leaf path is 5 → 4 → 11 → 2, whose sum is 5 + 4 + 11 + 2 = 22. So the function returns `True`.
```
    5
   / \
  4   8
 /   / \
11  13  4
/ \        \
7  2        1
```

**Example 2:**  
Input: `root = [1,2,3]`, `targetSum = 5`  
Output: `False`  
Explanation:  
Both paths 1→2 and 1→3 have sums 3 and 4 respectively. Neither add up to 5.

**Example 3:**  
Input: `root = []`, `targetSum = 0`  
Output: `False`  
Explanation:  
The tree is empty (no nodes), so there can be no path.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every root-to-leaf path, compute the sum. If any equals `targetSum`, return `True`.  
  This naturally suggests a **DFS traversal**—preorder is common for this type of sum-checking.

- At each call, subtract the current node’s value from the remaining target, and recurse left and right.  
  When reaching a leaf, check if the remainder is exactly zero (meaning the path sum equals `targetSum`).  
  If any path returns `True`, we can return early.

- **Why recursion and not iteration?**  
  Recursion matches the tree structure closely, making the logic concise.  
  Iterative DFS with a stack is also possible, but slightly less readable for simple path problems.

- **Trade-offs:**  
  - DFS (preorder) is simple and clear for detecting a *single* valid path.
  - If we need to collect *all* such paths, logic would change.
  - Recursion uses stack space (up to the height of the tree).

### Corner cases to consider  
- Tree is empty (`root` is None)
- Only one node (`root` is leaf):  
  - targetSum equals root’s value  
  - targetSum does not equal root’s value
- Paths where the sum of non-leaf nodes matches targetSum, but only root-to-leaf is valid
- Negative node values  
- targetSum is negative or zero

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def hasPathSum(root, targetSum):
    # If the tree is empty, return False immediately
    if not root:
        return False

    # If we're at a leaf node, check if the remaining sum equals the node value
    if not root.left and not root.right:
        return targetSum == root.val

    # Otherwise, recursively check left and right subtrees,
    # subtracting the current node's value from targetSum
    left_has_sum = hasPathSum(root.left, targetSum - root.val)
    right_has_sum = hasPathSum(root.right, targetSum - root.val)
    return left_has_sum or right_has_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We visit each node once. In the worst case (unbalanced tree), every node may be on a root-to-leaf path.

- **Space Complexity:** O(h)  
  Where h is the height of the tree. This is due to the recursion stack. For a balanced tree, h ≈ log n; for a skewed tree, h ≈ n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return all such root-to-leaf paths whose sums equal targetSum?  
  *Hint: Use a path list to remember nodes as you traverse, and store paths when reaching a valid leaf.*

- Could you solve this iteratively (without recursion)?  
  *Hint: Use a stack for DFS: store (node, current_sum) pairs.*

- If node values can be floats or very large numbers, does the approach change?  
  *Hint: Consider potential precision loss or integer overflow, but basic recursion logic remains the same.*

### Summary
This problem is a classic application of the **DFS traversal** pattern with an early exit condition. The recursive approach checks all root-to-leaf paths, ensuring the sum matches `targetSum` only at leaves. The same pattern is used in related problems like finding maximum root-to-leaf sums or collecting all root-to-leaf paths, demonstrating the power of recursion in binary tree problems.


### Flashcard
Use DFS subtracting current node value from target, return true when reaching a leaf with remaining sum exactly zero.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Path Sum II(path-sum-ii) (Medium)
- Binary Tree Maximum Path Sum(binary-tree-maximum-path-sum) (Hard)
- Sum Root to Leaf Numbers(sum-root-to-leaf-numbers) (Medium)
- Path Sum III(path-sum-iii) (Medium)
- Path Sum IV(path-sum-iv) (Medium)