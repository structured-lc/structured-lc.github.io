### Leetcode 106 (Medium): Construct Binary Tree from Inorder and Postorder Traversal [Practice](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal)

### Description  
Given the inorder and postorder traversals of a binary tree (with unique node values), reconstruct the original binary tree.  
- **Inorder**: left subtree → root → right subtree  
- **Postorder**: left subtree → right subtree → root  
You're asked to build and return the binary tree structure.  

### Examples  

**Example 1:**  
Input: `inorder = [9,3,15,20,7]`, `postorder = [9,15,7,20,3]`  
Output:  
```
    3
   / \
  9  20
    /  \
   15   7
```  
*Explanation:  
- The last element of postorder (`3`) is the root.  
- `3` splits inorder at index 1:  
  `` (left subtree), `[15,20,7]` (right subtree).  
- Repeat recursively for left/right parts:  
  Left: `inorder=`, `postorder=` → root `9`.  
  Right: `inorder=[15,20,7]`, `postorder=[15,7,20]` → root `20`.  
  - Left: `inorder=`, `postorder=` → root `15`  
  - Right: `inorder=`, `postorder=` → root `7`  
- Assemble tree as shown above.*

**Example 2:**  
Input: `inorder = [2,1]`, `postorder = [2,1]`  
Output:  
```
  1
 /
2
```  
*Explanation: Root is `1`, left child is `2` (since `2` is before `1` in inorder).*

**Example 3:**  
Input: `inorder = [1]`, `postorder = [1]`  
Output:  
```
1
```  
*Explanation: Single node tree.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each postorder root, search for its index in inorder (O(n) each time), partition the arrays, and build left/right recursively. This leads to O(n²) time complexity due to repeated lookups and array copies.
- **Optimized approach:**  
  - Use a hashmap to map value → index for inorder traversal, so we can look up root positions in O(1).
  - Avoid copying arrays by passing indices (start/end) for current subarrays.
  - The last element of the current postorder segment is always the root.
  - Recursively, partition inorder into left/right with the root's index, and postorder accordingly.
  - Build the right subtree **after** the left, because the postorder array is being traversed from the end.

This uses a classic recursive divide-and-conquer pattern, and hashmap optimizes the look-up.

### Corner cases to consider  
- Empty arrays (no nodes)  
- Arrays of length 1 (single node trees)  
- Completely skewed trees (all left or all right)  
- Invalid input (mismatched contents or lengths – assume valid for this problem)  
- All values unique, as per constraints

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(inorder, postorder):
    # Map value to its index in inorder for O(1) lookup
    val_to_idx = {val: idx for idx, val in enumerate(inorder)}

    # Helper function with indices to avoid array copying
    def helper(in_left, in_right, post_left, post_right):
        if in_left > in_right or post_left > post_right:
            return None

        # Root is the last element in the current postorder segment
        root_val = postorder[post_right]
        root = TreeNode(root_val)

        # Find the root in inorder to separate left/right subtrees
        idx = val_to_idx[root_val]
        # Number of nodes in left subtree
        left_size = idx - in_left

        # Recursively build left and right subtrees
        root.left = helper(in_left, idx-1, post_left, post_left + left_size - 1)
        root.right = helper(idx+1, in_right, post_left + left_size, post_right - 1)

        return root

    n = len(inorder)
    return helper(0, n-1, 0, n-1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is processed once, and hashmap enables O(1) lookups for root positions.
- **Space Complexity:** O(n) for the hashmap and the recursion stack (can be O(n) deep in degenerate cases like skewed trees).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree can have duplicate values?  
  *Hint: How would you uniquely identify each subtree's correct split?*

- Can you reconstruct a unique tree from preorder and inorder/postorder?  
  *Hint: For certain traversals and no duplicates, yes; but if there are duplicates, ambiguity arises.*

- Can you do it iteratively instead of recursively?  
  *Hint: Consider simulating the call stack or using explicit stack-based construction.*

### Summary
This problem is a textbook example of **tree reconstruction from traversal orders**, specifically combining **inorder** with **postorder**. The key insight is that postorder's last node is always the root, and inorder naturally partitions subtrees. Mapping values to indices and careful index handling avoid inefficiency. This recursive D&C pattern, and hashmap optimization, is widely applicable in other tree construction or subtree identification problems.