### Leetcode 1644 (Medium): Lowest Common Ancestor of a Binary Tree II [Practice](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii)

### Description  
Given the root of a binary tree and two nodes p and q (which may or may not exist in the tree), find their lowest common ancestor (LCA). If either node is not present, return null; else, return the common ancestor (can be one of the nodes).

### Examples  
**Example 1:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 1`  
Output: `3`  
*Explanation: 
Tree:
```
        3
       / \
      5   1
     / \ / \
    6  2 0 8
      / \
     7   4
```
LCA of 5 and 1 is 3.*

**Example 2:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 4`  
Output: `5`  
*Explanation: Node 5 contains 4 in its subtree; return 5.*

**Example 3:**  
Input: `root = [1,2]`, `p = 1`, `q = 3`  
Output: `None`  
*Explanation: Node q is not present in the tree.*

### Thought Process (as if you’re the interviewee)  
Classic LCA via post-order traversal: At each node, check left and right for p/q. But here, p or q may be missing, so we must verify both are present in the subtree before returning an answer.

We can return (node, found_p, found_q), where node is the LCA if found, and flags indicate if p and q are found under this root. At the end, only return node if both found_p and found_q are true.

### Corner cases to consider  
- p or q is not in the tree
- p == q (returns p if found)
- p or q is the root
- Tree has only one node

### Solution

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowestCommonAncestor(root, p, q):
    def dfs(node):
        if not node:
            return (None, False, False)
        lca_left, fleft_p, fleft_q = dfs(node.left)
        lca_right, fright_p, fright_q = dfs(node.right)
        found_p = fleft_p or fright_p or node == p
        found_q = fleft_q or fright_q or node == q
        # If this is the split point for p and q
        if node == p or node == q:
            return (node, found_p, found_q)
        if lca_left and lca_right:
            return (node, found_p, found_q)
        if lca_left:
            return (lca_left, found_p, found_q)
        if lca_right:
            return (lca_right, found_p, found_q)
        return (None, found_p, found_q)

    lca, found_p, found_q = dfs(root)
    return lca if found_p and found_q else None
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), n is the number of nodes. Whole tree is traversed.
- **Space Complexity:** O(h), h is the height of the tree due to recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are k nodes (not just 2); find LCA for all?  
  *Hint: Return as soon as all k are found in a subtree.*

- Can you do it without recursion?  
  *Hint: Use parent pointers and BFS/DFS stack.*

- What if tree is not binary (k-ary tree)?  
  *Hint: Extend the recursion to all children, and merge flags for all branches.*

### Summary
Classic binary tree recursion/DFS problem, with modification to detect whether both targets are present. This pattern helps in "validate both nodes exist before returning their ancestor" questions.


### Flashcard
Find the lowest common ancestor in a binary tree, handling missing nodes.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Lowest Common Ancestor of a Binary Search Tree(lowest-common-ancestor-of-a-binary-search-tree) (Medium)
- Lowest Common Ancestor of a Binary Tree(lowest-common-ancestor-of-a-binary-tree) (Medium)
- Lowest Common Ancestor of a Binary Tree III(lowest-common-ancestor-of-a-binary-tree-iii) (Medium)
- Lowest Common Ancestor of a Binary Tree IV(lowest-common-ancestor-of-a-binary-tree-iv) (Medium)