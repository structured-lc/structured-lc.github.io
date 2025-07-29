### Leetcode 2773 (Medium): Height of Special Binary Tree [Practice](https://leetcode.com/problems/height-of-special-binary-tree)

### Description  
Given the root of a *special binary tree*, compute its height.  
This tree is special because every non-leaf node has exactly two children, and every leaf node has a unique structure:
- Each leaf `bᵢ` (where 1 ≤ i ≤ k) may have its right child set as the next leaf in order (bᵢ₊₁), unless it is the last leaf `bₖ`, in which case its right child is b₁ (looping back).
- Similarly, the left child of a leaf `bᵢ` can point to the previous leaf (bᵢ₋₁), wrapping to bₖ if i = 1.
Despite these connections, *the height* is defined as the number of nodes on the longest path *from root to a real (non-special) leaf*, not following any cycles.  
Your task: Given the root, return the height of this tree.

### Examples  

**Example 1:**  
Input: `[1]`  
Output: `1`  
Explanation: The tree has just one node.  
```
1
```
The path is just the root itself.

**Example 2:**  
Input: `[1,2,3]`  
Output: `2`  
Explanation: The tree is:  
```
  1
 / \
2   3
```
The height is 2, as the longest root-to-leaf path has 2 nodes (1 → 2 or 1 → 3).

**Example 3:**  
Input: `[1,2,null,3]`  
Output: `3`  
Explanation: The tree is:  
```
    1
   /
  2
 /
3
```
The single root-to-leaf path is 1 → 2 → 3, which gives a height of 3.

### Thought Process (as if you’re the interviewee)  
First, clarify "height": it is the number of nodes in the longest downward path from the root to any leaf.  
The special property of leaves forming a cycle (via left/right pointers) is tricky. If we simply perform a DFS, we must avoid incorrectly following the cyclical pointers on leaves that could cause infinite recursion.

My brute-force idea is to recursively compute height from the root:
- For each node, height = 1 + max(left subtree height, right subtree height).
- But at a leaf node, we shouldn't follow pointers that are part of the special cycle.  
So, for any node, if it's a "cycle leaf" (its left/right pointers make a cycle back to another leaf), we treat it as a leaf for height counting.

Optimization:
- In code, if `node.left` is not null *and* `node.left.right == node`, it's part of a leaf cycle; treat as leaf and do not recurse further.
- Otherwise, recurse left/right and return 1 + max(subtree heights).

Trade-offs:  
This approach avoids revisiting cycle-leaf pointers, ensuring we do not recurse infinitely and properly count height without error.

### Corner cases to consider  
- Empty tree (root is None)  
- Single node  
- Deeply nested left or right branches  
- Trees where all leaves are involved in the special cycle  
- Trees with only two levels  
- Binary trees with only one leaf node  
- Trees where left/right pointers at leaves connect unusually

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def heightOfTree(root):
    # Base case: if node is None, the height is 0
    if root is None:
        return 0

    # If this node is a "cycle leaf" (special property), treat as leaf:
    # node.left is not None AND node.left.right == node
    if root.left and root.left.right == root:
        # Do not traverse further; this is a leaf by definition
        return 1

    # Otherwise, compute heights recursively for left and right subtrees
    left_h = heightOfTree(root.left)
    right_h = heightOfTree(root.right)

    # Height = 1 (current node) + max of subtrees
    return 1 + max(left_h, right_h)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once in the DFS. n is number of nodes.
- **Space Complexity:** O(h)  
  The recursion stack will be proportional to the height h of the tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very deep? How would you avoid stack overflow?  
  *Hint: Can you implement the traversal iteratively instead of recursively?*

- How would you handle the case where additional data (like parent pointers) are available?  
  *Hint: Could you detect cycles or backtrack more efficiently?*

- Can you generalize the solution to k-ary trees with similar "special" leaf connections?  
  *Hint: What conditions mark leaves and how do cycles form in higher-degree trees?*

### Summary
The problem uses the standard **DFS / binary tree recursion** pattern, with extra care taken to recognize the special-cycled leaves and stop recursion at those. This pattern is widely used in tree problems where we need to aggregate information from leaves back up to the root. The main twist here is correct leaf/cycle detection for the special case, which can also appear in problems dealing with tree modifications or unconventional linkages.