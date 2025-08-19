### Leetcode 700 (Easy): Search in a Binary Search Tree [Practice](https://leetcode.com/problems/search-in-a-binary-search-tree)

### Description  
Given the root of a **binary search tree** (BST) and an integer `val`, find the node in the BST whose value equals `val` and return the subtree rooted at that node. If the node doesn’t exist, return `null`.

A **BST** has the property that for any node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater.

### Examples  

**Example 1:**  
Input: `root = [4,2,7,1,3]`, `val = 2`  
Output: `[2,1,3]`  
*Explanation: Search for 2, find node 2 in the BST, and return the subtree rooted at 2.*

Graphical view:  
```
     4
   /   \
  2     7
 / \
1   3
```
Return subtree:
```
  2
 / \
1   3
```

**Example 2:**  
Input: `root = [4,2,7,1,3]`, `val = 5`  
Output: `[]`  
*Explanation: Search for 5, but there's no node with value 5, so return null/empty.*

**Example 3:**  
Input: `root = [8,3,10,1,6,null,14,null,null,4,7,13]`, `val = 10`  
Output: `[10,null,14,13]`  
*Explanation: Search for 10, find the node, and return the subtree rooted at 10.*
  
Graphical view:  
```
        8
      /   \
     3    10
    / \     \
   1   6     14
      / \    /
     4   7  13
```
Return subtree:
```
  10
    \
    14
   /
 13
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** In any binary tree, to search for a value, you might traverse all nodes. But since this is a *BST*, we can do better.
- **Optimized (BST property):**
  - At each node, compare its value with `val`.
  - If equal, return the node.
  - If `val` is less, search the left subtree (all those values are smaller).
  - If `val` is more, search the right subtree.
- This pattern mimics **binary search** in trees, yielding much better performance than scanning all nodes.

**Iterative vs Recursive:**  
A recursive solution is clear and natural for tree problems. An iterative one with a loop avoids extra stack usage, but both are valid.

**Trade-offs:**  
- Recursion gives cleaner code but can have stack overflow if the tree is very deep (unbalanced).
- Iterative avoids recursion depth limits.

### Corner cases to consider  
- Tree is empty (`root = None`)
- Node with value `val` is not present
- Only one node exists in tree
- Node to be found is at root, at leaf, or somewhere in between
- All nodes have unique values (guaranteed in BST, but worth confirming)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def searchBST(self, root: TreeNode, val: int) -> TreeNode:
        # Traverse the tree recursively using the BST property
        if not root:
            return None  # Base case: not found
        if root.val == val:
            return root  # Found the node
        if val < root.val:
            return self.searchBST(root.left, val)  # Search left subtree
        else:
            return self.searchBST(root.right, val)  # Search right subtree
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h), where *h* is the height of the tree.
    - *Best case* (balanced BST): O(log n)
    - *Worst case* (skewed tree): O(n)
- **Space Complexity:**
    - O(h) due to recursion stack (depth of the call stack).
    - If implemented iteratively, space can be reduced to O(1) excluding input/tree storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is not a BST, but just a generic binary tree?  
  *Hint: You would need to traverse the whole tree (O(n)).*

- How do you handle duplicate values in the BST?  
  *Hint: Standard BSTs usually do not have duplicates; if allowed, clarify insert/search semantics.*

- Can you implement the same function iteratively to avoid recursion stack overflow?  
  *Hint: Simulate the recursion using a loop, tracking the current node.*

### Summary
This problem demonstrates the **binary search tree traversal** pattern, leveraging the BST property to guide search efficiently. It's a key example of applying divide-and-conquer and recursive/iterative strategies for trees. This approach generalizes to other BST operations (insert, delete, lower/upper bound, etc.), and the core logic mirrors classic binary search.

### Tags
Tree(#tree), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Closest Binary Search Tree Value(closest-binary-search-tree-value) (Easy)
- Insert into a Binary Search Tree(insert-into-a-binary-search-tree) (Medium)
- Closest Nodes Queries in a Binary Search Tree(closest-nodes-queries-in-a-binary-search-tree) (Medium)