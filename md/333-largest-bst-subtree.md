### Leetcode 333 (Medium): Largest BST Subtree [Practice](https://leetcode.com/problems/largest-bst-subtree)

### Description  
Given a binary tree (not necessarily a BST), you are asked to **find the size of the largest subtree that is a valid Binary Search Tree (BST)**.  
A **subtree** is defined as a node and all its descendants. The largest BST subtree is the one with the most nodes that still maintains BST properties (every node’s left descendants are < node value, every right descendant is > node value)[1][2].  
You must return the number of nodes in this largest BST subtree.

### Examples  

**Example 1:**  
Input: `[10,5,15,1,8,null,7]`  
Output: `3`  
*Explanation:*
```
      10
     /  \
    5    15
   / \     \
  1   8     7
```
Nodes `[5,1,8]` form the largest BST subtree (5 at root, 1 left, 8 right). Size = 3.

**Example 2:**  
Input: `[4,2,7,2,3,5,null,2,null,null,null,null,null,1]`  
Output: `2`  
*Explanation:*
```
        4
       / \
      2   7
     / \  /
    2  3 5
   /
  2
 /
1
```
Nodes `[2,3]` (the second level left child 2 and its right child 3) form a valid BST size = 2.

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation:*
Empty tree, so size is 0.

### Thought Process (as if you’re the interviewee)  

First, I would want to identify every subtree that forms a valid BST and track the size of the largest one.  
A **brute-force** approach could be: for every node, check if the subtree rooted at that node is a BST, and then count its size. That would mean validating each subtree, which is an O(n) operation for each node, leading to O(n²) time.

To **optimize**, I'll recall that in a bottom-up post-order traversal, I can collect information about each subtree as I process it:
- If left/right subtrees are BSTs, and current node value is > max in left and < min in right, the current subtree is also a BST.
- For each node, I store:  
  - IsBST (whether this subtree is a BST),  
  - Size (number of nodes in its BST subtree if valid),  
  - Min and Max values in this subtree.

Using post-order traversal, I can efficiently determine the largest BST in O(n) time by recursively checking each subtree, combining results as I return from recursion.

This means the **final approach uses DFS/post-order traversal**, collecting and combining BST property info for each subtree, with optimal O(n) time.

### Corner cases to consider  
- Empty tree
- All nodes have same value
- Single node tree
- Completely unbalanced tree (like a linked list)
- Multiple disjoint BST subtrees
- Tree where root is not part of largest BST

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def largestBSTSubtree(self, root: TreeNode) -> int:
        self.max_bst_size = 0

        def postorder(node):
            if not node:
                # For empty nodes: is BST, size 0, min = +inf, max = -inf
                return (True, 0, float('inf'), float('-inf'))

            left_is_bst, left_size, left_min, left_max = postorder(node.left)
            right_is_bst, right_size, right_min, right_max = postorder(node.right)

            # Check BST valid for this node
            if left_is_bst and right_is_bst and left_max < node.val < right_min:
                size = 1 + left_size + right_size
                # Update global max if this is the largest found BST so far
                self.max_bst_size = max(self.max_bst_size, size)
                # Return: is BST, size, min, max
                return (True,
                        size,
                        min(left_min, node.val),
                        max(right_max, node.val))
            else:
                # Not a BST, return indicator and carry dummy min/max
                return (False, 0, 0, 0)

        postorder(root)
        return self.max_bst_size
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of tree nodes. Each node is visited once, with constant work at each visit.
- **Space Complexity:** O(h), h = height of tree, due to recursion stack. For a balanced tree, that’s O(log n); for a skewed tree, O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- If duplicate values are allowed, how would the BST definition or logic change?
  *Hint: Would both sides allow =, or just one?*

- Can you modify the logic to print the actual subtree, not just return its size?
  *Hint: Store root pointers instead of just size.*

- Could you adapt this algorithm to work on n-ary trees?
  *Hint: How would BST concept extend to more than two children?*

### Summary
This problem uses the **DFS/post-order pattern** to gather and combine subtree properties efficiently. For each subtree, we check validity conditions and carry forward required info (isBST, min, max, size) to enable O(n) checks for BST status. This is a classic **tree-dp** problem, and the approach is generally applicable to problems where properties need to be gathered bottom-up and merged for parent nodes, e.g., checking for balanced trees, diameter, or validating other custom tree criteria.


### Flashcard
Use post-order traversal to gather min/max/size info for each subtree; return the largest size where the subtree is a valid BST.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
