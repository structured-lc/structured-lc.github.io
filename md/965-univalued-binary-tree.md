### Leetcode 965 (Easy): Univalued Binary Tree [Practice](https://leetcode.com/problems/univalued-binary-tree)

### Description  
Given a binary tree, determine if it is **univalued**—that is, if every node in the entire tree has the same value.  
You’re provided with the root node; you must check every node recursively or iteratively to see if all their values match the root’s value.  
Return `True` if all nodes have the same value; otherwise, return `False`.

### Examples  

**Example 1:**  
Input: `[1,1,1,1,1,null,1]`  
Output: `True`  
*Explanation: All nodes in the tree have the value 1.*  
```
     1
   /   \
  1     1
 / \     \
1   1     1
```

**Example 2:**  
Input: `[2,2,2,5,2]`  
Output: `False`  
*Explanation: All nodes except one (left child of the left node) have value 2, so the tree is not univalued.*  
```
    2
   / \
  2   2
 / 
5   
```

**Example 3:**  
Input: `[1]`  
Output: `True`  
*Explanation: Single-node trees are vacuously univalued.*  
```
  1
```

### Thought Process (as if you’re the interviewee)  
- My first thought is to traverse the entire tree and compare each node’s value to the root’s value.
- The most straightforward approach: use Depth-First Search (DFS), either recursively (my preferred method for clarity).
- At each node:  
  - If the node is `None`, it’s valid by default.
  - If the node’s value doesn’t equal the root’s value, immediately return `False`.
  - Otherwise, recursively check left and right children.
- This approach ensures **O(n)** time, visiting every node exactly once.
- Trade-offs:  
  - **Iterative** traversal (using a stack) is possible, useful for very deep trees where recursion could hit stack limits.
  - **Storing all values in a collection** and then comparing could also work, but uses more space (O(n)), so recursion with early return is better.

### Corner cases to consider  
- Tree with only one node.
- Tree is empty (`root = None`)—should return `True` as there are no differing values.
- Tree with two or more nodes, all with same value.
- Tree with one node that differs.
- Tree where a leaf deep in the tree has a different value.
- Skewed (linked-list like) trees, both left- and right-skewed.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isUnivalTree(root):
    # Helper function to recursively check all nodes
    def dfs(node, value):
        if node is None:
            # Null nodes are always considered valid
            return True
        if node.val != value:
            # Found a different value; not univalued
            return False
        # Check left and right subtrees
        return dfs(node.left, value) and dfs(node.right, value)
    
    return dfs(root, root.val) if root else True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where *n* is the number of nodes. We must check every node to ensure they have the same value.
- **Space Complexity:** O(h), where *h* is the height of the tree (recursion stack). In the worst case (completely unbalanced), this can be O(n); in balanced trees, O(log n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a tree where node values are very large or negative?  
  *Hint: Are equality comparisons affected by type or value range?*

- Can you solve this iteratively?  
  *Hint: Use a stack (DFS) or queue (BFS) to traverse and compare each node’s value to the root’s.*

- How would you return the value that breaks the univalued property, if any?  
  *Hint: Store and report the first mismatching value as you traverse.*

### Summary
This problem follows a classic **tree traversal** pattern and is a textbook example of DFS with an early return on failure. It’s commonly applied to problems where a single property must be checked across all nodes, such as symmetry, BST validity, or computing maximum depth. Mastering recursive (and iterative) traversals of binary trees is essential for coding interviews.