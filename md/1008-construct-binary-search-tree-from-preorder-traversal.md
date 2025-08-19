### Leetcode 1008 (Medium): Construct Binary Search Tree from Preorder Traversal [Practice](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal)

### Description  
Given the preorder traversal of a binary search tree (BST), reconstruct the original BST and return its root node.

A **BST** is a binary tree where:
- For each node, values in the left subtree are strictly less than the node’s value.
- Values in the right subtree are strictly greater.

A **preorder traversal** visits nodes in the order: root, left subtree, then right subtree.

You’re given a list `preorder` representing this traversal with all unique values. You need to construct the BST that would produce this traversal.

### Examples  

**Example 1:**  
Input: `[8,5,1,7,10,12]`  
Output: `[8,5,10,1,7,null,12]`  
*Explanation:  
- The BST structure (with list representation `[8,5,10,1,7,null,12]`) is:  
  ```
      8
     / \
    5   10
   / \    \
  1   7   12
  ```
  In preorder: 8 → 5 → 1 → 7 → 10 → 12.*

**Example 2:**  
Input: `[1,3]`  
Output: `[1,null,3]`  
*Explanation:  
- The tree:  
  ```
   1
    \
     3
  ```
  is consistent with preorder: 1, 3.*

**Example 3:**  
Input: `[5]`  
Output: `[5]`  
*Explanation:  
- Single node tree `5`.*

### Thought Process (as if you’re the interviewee)  
First, observe that in preorder, the first element is always the root.  
- All subsequent elements less than root will be in the left subtree.  
- All greater elements are in the right subtree.

**Brute-force idea:**  
- Repeatedly find the split point for left/right children by scanning the subarray.  
- For each recursive call, partition the slice: root | lefts | rights.
- Time: O(n²).

**Optimized approach:**  
- Use index pointers so we never copy arrays.
- Use upper/lower bounds to define valid BST value range at each recursion.
- Each node is only created once, only O(n) work.
- Maintain a global `index` as we walk the preorder, with recursive dfs(lower, upper):

    - If current value ∉ (lower, upper), it's not in this subtree.
    - Otherwise, create node and recursively build left, then right.

This approach is both efficient (O(n)) and simple.

### Corner cases to consider  
- Empty array: return None.
- All elements strictly increasing: becomes a right-skewed tree.
- All elements strictly decreasing: becomes a left-skewed tree.
- Only one node.
- BST with only left or only right child at any node.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bstFromPreorder(preorder):
    # Helper function uses upper/lower bound and current index
    def dfs(lower, upper):
        nonlocal idx
        if idx == len(preorder):
            return None
        val = preorder[idx]
        if val < lower or val > upper:
            return None

        idx += 1
        root = TreeNode(val)
        root.left = dfs(lower, val-1)
        root.right = dfs(val+1, upper)
        return root

    idx = 0
    # Since constraints are all distinct, min/max of int range is fine
    return dfs(float('-inf'), float('inf'))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes.  
  Each value from preorder is processed exactly once, and all operations inside dfs are constant-time.

- **Space Complexity:** O(n) for the recursion stack (as in the worst case, the BST may be skewed), and O(n) for the output tree nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this approach for inorder traversal input?  
  *Hint: Recall that inorder traversal of a BST is sorted, so structure information is lost.*

- Can you construct the BST if duplicates are allowed?  
  *Hint: Where do you place duplicates: left or right?*

- What are the iterative approaches for this problem?  
  *Hint: Try simulating the insertions one-by-one using a stack.*

### Summary
This problem centers on **recursively constructing a BST** from its preorder traversal using value bounds, a classic "build tree from traversal" pattern. This upper/lower bound method is widely applicable in tree deserialization and construction tasks, where order encodes the tree shape. Understanding efficient pointer/index management and range-limiting recursion is crucial for making your solution both optimal and elegant.

### Tags
Array(#array), Stack(#stack), Tree(#tree), Binary Search Tree(#binary-search-tree), Monotonic Stack(#monotonic-stack), Binary Tree(#binary-tree)

### Similar Problems
