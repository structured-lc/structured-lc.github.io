### Leetcode 235 (Medium): Lowest Common Ancestor of a Binary Search Tree [Practice](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree)

### Description  
Given a **binary search tree** (BST) and two nodes `p` and `q`, find their **lowest common ancestor (LCA)**. The LCA of two nodes is the lowest node in the tree that has both `p` and `q` as descendants (a node can be a descendant of itself). The BST property means that for any node, all nodes in its left subtree have smaller values and all nodes in its right subtree have larger values.

### Examples  

**Example 1:**  
Input:  
Tree =  
```
        6
      /   \
     2     8
    / \   / \
   0   4 7   9
      / \
     3   5
```  
p = 2, q = 8  
Output: `6`  
*Explanation: The root (6) is the lowest node that is ancestor to both 2 and 8.*

**Example 2:**  
Input:  
Tree =  
```
        6
      /   \
     2     8
    / \   / \
   0   4 7   9
      / \
     3   5
```  
p = 2, q = 4  
Output: `2`  
*Explanation: 2 is an ancestor of 4 and itself. So LCA is 2.*

**Example 3:**  
Input:  
Tree =  
```
        2
       / \
      1   3
```  
p = 1, q = 3  
Output: `2`  
*Explanation: 2 is the lowest node with both 1 and 3 as descendants.*

### Thought Process (as if you’re the interviewee)  

To solve this, leverage the **BST property**:  
- If both `p` and `q` are less than the current node, LCA must be in the left subtree.  
- If both are greater, LCA must be in the right subtree.  
- Otherwise, current node splits `p` and `q` (either one equals to current node and the other is less/greater, or one in left and one in right). In this case, current node is the **LCA**.

**Brute-force approach:**  
- For a general binary tree (not BST), you’d do a full postorder traversal, keeping track of ancestors, which requires O(n) time.

**Optimized for BST:**  
- Move down from root, using BST properties to guide you, yielding O(h) time, where h is tree height, since at each node you discard half the tree.

### Corner cases to consider  
- Tree with only one node (LCA is the single node if `p`==`q`).
- `p` == `q` (LCA is `p`).
- Both `p` and `q` are not in tree (clarify constraints; for LeetCode 235, they **are** guaranteed).
- Unbalanced tree (asymmetric structure).
- LCA at the root.
- LCA is one of `p` or `q`.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    # Iterative solution utilizing BST property
    curr = root
    while curr:
        # Both nodes are smaller, so LCA in left subtree
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        # Both nodes are larger, so LCA in right subtree
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            # This node is where p and q split, or equals one of them
            return curr
    return None  # Only possible if p or q are not in tree, which LeetCode says won't happen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h), where h is the height of the BST. In best case (balanced), h ≈ log n; in worst (skewed), h ≈ n.
- **Space Complexity:** O(1) for the iterative solution—no extra stack except a few pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find LCA in a general binary tree (not BST)?  
  *Hint: Think about recursive DFS and postorder traversal, not reliant on node values.*

- What if the tree is extremely unbalanced?  
  *Hint: Consider cost in skewed trees; can you do anything if the tree is a linked list shape?*

- How could you adapt this for a situation where there are multiple queries for LCA?  
  *Hint: Preprocess with parent pointers, or use Tarjan’s least common ancestor algorithm?*

### Summary
The solution leverages the **BST property** for efficient searching, making the process much faster than the generic binary tree approach. The iterative method uses O(1) space, constantly narrowing the search based on the values of `p` and `q`. This problem follows the **LCA pattern**, applicable whenever you have find-common-ancestor type problems and tree structures—variations appear in general binary trees, n-ary trees, file systems, and organizational hierarchies.