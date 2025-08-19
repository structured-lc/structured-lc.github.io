### Leetcode 404 (Easy): Sum of Left Leaves [Practice](https://leetcode.com/problems/sum-of-left-leaves)

### Description  
Given the root of a binary tree, find the sum of all **left leaves**.  
A **left leaf** is a node that is both a **left child of its parent** and **has no children** (i.e., both left and right are None).  
If the tree is empty, the sum is 0.  

### Examples  

**Example 1:**  
Input: `[3,9,20,null,null,15,7]`  
Output: `24`  
*Explanation: The tree is:*
```
    3
   / \
  9  20
    /  \
   15   7
```
- Leaves: 9, 15, 7  
- Left leaves: 9 (left child of 3), 15 (left child of 20)  
- Sum: 9 + 15 = 24

**Example 2:**  
Input: `[1]`  
Output: `0`  
*Explanation:*
```
  1
```
- No children, so no left leaf

**Example 3:**  
Input: `[1,2,3,4,5]`  
Output: `4`  
*Explanation: The tree is:*
```
      1
     / \
    2   3
   / \
  4   5
```
- Leaves: 4 (left leaf under 2), 5 (right leaf under 2), 3 (right leaf of 1, but not a left leaf)  
- Only left leaf is 4

### Thought Process (as if you’re the interviewee)  
- First, I need to traverse the entire binary tree to examine all nodes.  
- For each node, I need to determine if its left child is a leaf node (i.e., has no children). If so, I add its value to my running sum.  
- Two common ways to traverse a tree: Depth-First Search (DFS) and Breadth-First Search (BFS). Here, DFS fits well, since it matches the recursive structure of trees, and I can easily carry down context (like: "is this a left child?").
- Brute force idea: At each node, check if the left child is a leaf; if so, add. For both left and right children, recursively repeat the check.
- Optimization: Both DFS (recursive) and iterative approaches work, but recursion is succinct and directly leverages tree structure.
- Trade-off: Recursive DFS is intuitive and concise for trees of this size (≤ 1000 nodes). For very large trees, stack overflow could be a concern, but it's not for this constraint.

### Corner cases to consider  
- Empty tree (root is None)
- Single node (no children)
- Root with only right child (no left leaves)
- Tree with all left/right children
- Negative values in nodes (sum should handle negatives)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sumOfLeftLeaves(root):
    # Helper function to check if a node is a leaf
    def is_leaf(node):
        return node and not node.left and not node.right

    def dfs(node):
        if not node:
            return 0
        total = 0
        # Check if left child exists and is a leaf
        if node.left and is_leaf(node.left):
            total += node.left.val
        # Recursively process left and right children
        total += dfs(node.left)
        total += dfs(node.right)
        return total

    return dfs(root)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We visit every node *once*, where n is the number of nodes (since each node is checked for left leaf status and processed recursively).
- **Space Complexity:** O(h)  
  Where h is the height of the tree, due to recursion stack. In worst case (skewed tree), h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the sum of **right leaves**?
  *Hint: Adapt the same method—look for right children that are leaves.*

- How would you write an **iterative version** using a stack?
  *Hint: Simulate DFS with an explicit stack, pushing node and is_left context.*

- If the tree is extremely large (deep), how can you avoid stack overflow?
  *Hint: Use an iterative stack-based traversal instead of recursion.*

### Summary
This problem is a classic use of binary tree traversal with a **conditional sum** pattern. The recursive DFS approach clearly matches both the tree structure and the "filter" step for left leaf detection. This pattern is common in LeetCode problems involving summation or aggregation of node values based on position (e.g., sum of left/right boundary, deepest leaves, etc.).

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
