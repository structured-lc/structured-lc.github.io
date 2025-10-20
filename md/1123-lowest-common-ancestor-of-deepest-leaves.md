### Leetcode 1123 (Medium): Lowest Common Ancestor of Deepest Leaves [Practice](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves)

### Description  
Given the root of a binary tree, return the lowest common ancestor (LCA) of its deepest leaves.  
A **deepest leaf** is a node at the greatest depth from the root — i.e., the farthest from the root node.  
The **LCA** of a set of nodes S is the *deepest* node A such that every node in S is in the subtree rooted at A.  

In short:  
- Find all leaves at maximum depth, and return their LCA node (not a list!).

### Examples  

**Example 1:**  
Input: `[3,5,1,6,2,0,8,null,null,7,4]`  
Output: `2`  
*Explanation:  
Deepest leaves: 7 and 4, both at depth 3.  
Their lowest common ancestor is 2 (it's their immediate parent).*  

Tree:  
```
    3
   / \
  5   1
 /|   |\
6 2   0 8
  / \
 7  4
```

**Example 2:**  
Input: `[1]`  
Output: `1`  
*Explanation:  
The single node is itself the deepest and thus its own ancestor.*  

Tree:  
```
1
```

**Example 3:**  
Input: `[0,1,3,null,2]`  
Output: `2`  
*Explanation:  
Deepest leaf: 2, at depth 2.  
The LCA of just one leaf is the leaf itself.*  

Tree:  
```
  0
 / \
1   3
 \
  2
```

### Thought Process (as if you’re the interviewee)  

First, to find the LCA of the deepest leaves, I need to:
- **Find the deepest level** (maximum depth) in the tree.
- **Identify all nodes at that level (deepest leaves).**
- **Find their LCA.**

**Brute force:**  
- Traverse tree to find max depth and gather all deepest leaves.
- For all deepest leaves, trace paths to the root and find their LCA upward.
- This approach could use extra space to store all paths and all deepest leaves.

**Optimized (DFS):**  
- Do one postorder DFS pass.
- At each node, compute the max depth in its left and right subtree.
- If left and right subtree reach the same maximum depth, the current node is an ancestor of leaves at that depth.  
- Return (1) the maximum depth and (2) the candidate LCA found in the subtree.
- At root, the returned LCA covers all deepest leaves.

**Why this works:**  
- If both left and right children reach the max depth, their ancestor is where their deepest leaves “meet”.
- The recursion brings back both depth and LCA upward in the call stack.

**Trade-offs:**  
- One traversal, O(n) time and O(n) space (recursion stack).
- Very concise and clean, with no need to track all deepest nodes explicitly.

### Corner cases to consider  
- Tree with a single node.
- All leaves at the same depth.
- Tree skewed to one side (like a linked list).
- Multiple deepest leaves but in only one subtree.
- Empty tree (if allowed by problem).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def lcaDeepestLeaves(self, root: TreeNode) -> TreeNode:
        # Helper function returns (max_depth_below, lca)
        def dfs(node):
            if not node:
                return (0, None)
            left_depth, left_lca = dfs(node.left)
            right_depth, right_lca = dfs(node.right)
            if left_depth > right_depth:
                return (left_depth + 1, left_lca)
            elif right_depth > left_depth:
                return (right_depth + 1, right_lca)
            else:
                # Both sides are equal depth; current node is their LCA
                return (left_depth + 1, node)
        # We only need the lca from dfs(root)
        return dfs(root)[1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Every node is visited once.
- **Space Complexity:** O(n) worst case (recursion stack for a skewed tree).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle this if the tree can be extremely deep (much larger than fits on call stack)?
  *Hint: Consider iterative DFS using explicit stack to avoid recursion limit.*

- Can you extend this solution to an n-ary tree (not just binary)?
  *Hint: Generalize DFS to loop over all children, comparing depths.*

- What if the tree is not rooted, but you have an adjacency list and can start from any node?
  *Hint: Pick a root, find max depth, then adapt the logic from there.*

### Summary

This problem is a classic application of **DFS/Postorder Traversal** for trees, combining computation of **height (depth)** with identifying the **lowest common ancestor** as deepest branches converge.  
It highlights patterns like recursive divide-and-conquer, LCA logic, and is broadly useful for binary/related tree problems.  
This strategy is widely reusable for other “deepest node” and “LCA” related challenges.


### Flashcard
Post-order DFS returning (LCA, depth); if left_depth = right_depth = max, LCA is current node; otherwise return deeper subtree's result.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Lowest Common Ancestor of a Binary Tree IV(lowest-common-ancestor-of-a-binary-tree-iv) (Medium)