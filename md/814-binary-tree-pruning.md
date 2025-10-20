### Leetcode 814 (Medium): Binary Tree Pruning [Practice](https://leetcode.com/problems/binary-tree-pruning)

### Description  
Given the root of a **binary tree** where each node's value is either 0 or 1, remove every subtree (i.e., any node plus all its descendants) that **does not contain the value 1**. Return the pruned tree.  
In other words: for every node, if its entire subtree (including itself) has no node with value 1, remove that node from the tree.  
You are expected to prune the tree "bottom up" so decisions are based on the content of children first.

### Examples  

**Example 1:**  
Input: `[1,null,0,0,1]`  
Output: `[1,null,0,null,1]`  
*Explanation:  
The tree:  
```
    1
     \
      0
     / \
    0   1
```
Both the left child (`0`) and its left subtree are all zeros, so they are pruned. The resulting tree is:
```
    1
     \
      0
       \
        1
```
*

**Example 2:**  
Input: `[1,0,1,0,0,0,1]`  
Output: `[1,null,1,null,1]`  
*Explanation:  
Initial tree:
```
      1
     / \
    0   1
   / \ / \
  0  0 0  1
```
All subtrees not containing a 1 are pruned. Only nodes and parents leading to a 1 survive:
```
    1
     \
      1
       \
        1
```
*

**Example 3:**  
Input: `[1,1,0,1,1,0,1,0]`  
Output: `[1,1,0,1,1,null,1]`  
*Explanation:  
Tree representation:
```
        1
       / \
      1   0
     / \   \
    1   1   1
   /
  0
```
After pruning subtrees that are all 0, the final tree is:
```
        1
       / \
      1   0
     / \   \
    1   1   1
```
*

### Thought Process (as if you’re the interviewee)  
Let’s clarify requirements:  
- If a subtree contains only 0, we remove it.
- This should be done recursively, bottom-up, so that we only remove a node if both its subtrees have already been checked and possibly pruned.

**Approach:**  
- **Brute-force:**  
  For each node, check (using a separate function) if its entire subtree contains a 1. If not, remove it.  
  Problem: This would cause redundant traversals for the same nodes, leading to O(n²) time.

- **Optimal:**  
  Use **post-order traversal** (left, right, node).  
  - For each node, recursively prune both left and right subtrees first.
  - If after pruning, both left and right are null and node.val == 0, prune this node itself (i.e., return null).
  - Otherwise, keep the node.

**Why post-order?**  
We want to process children before the parent. If both children are gone and the node itself is zero, then the full subtree rooted here is all zeros.

This is a clean, one-pass, O(n) recursion.

### Corner cases to consider  
- An input tree with all node values zero should return an empty tree (null).
- Root itself may need to be pruned.
- Single-node trees: `[1]` → `[1]`, `` → `[]`.
- Non-balanced trees.
- Tree where values alternate between 0 and 1.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def pruneTree(root):
    # Helper function returns pruned subtree or None if should be pruned
    def prune(node):
        if not node:
            return None
        # prune left and right subtrees first
        node.left = prune(node.left)
        node.right = prune(node.right)
        # if node and its children are all 0, prune this node
        if node.val == 0 and node.left is None and node.right is None:
            return None
        return node

    return prune(root)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited once as we traverse the tree.

- **Space Complexity:** O(h)  
  Where h is the height of the tree (due to recursion stack). Worst case is O(n) if the tree is completely unbalanced; average is O(log n) for a balanced tree. No extra data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you do this iteratively?
  *Hint: Consider using an explicit stack to mimic post-order traversal.*

- How would you handle trees with millions of nodes where recursion depth is a problem?
  *Hint: Use iterative post-order to avoid stack overflow.*

- What if nodes can have values other than 0 or 1, and the condition for pruning changes?
  *Hint: Generalize the prune condition; make it a function or parameter.*

### Summary
This problem is a **classic binary tree pruning** question that uses a *post-order* DFS traversal. The recursive traversal ensures all decisions about pruning a node are based on the pruned subtrees below it. The approach is efficient, clear, and applicable to any tree pruning problem where information needs to be aggregated upward from children to parent. This problem type is common in tree traversals, dynamic programming on trees, and can also be adapted for filtering and reducing other hierarchical data structures.


### Flashcard
Recursively prune subtrees that contain only 0s in a post-order traversal; remove nodes whose left and right are both pruned and value is 0.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
