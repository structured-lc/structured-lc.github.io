### Leetcode 222 (Easy): Count Complete Tree Nodes [Practice](https://leetcode.com/problems/count-complete-tree-nodes)

### Description  
Given the root of a **complete binary tree**, count and return the total number of nodes in the tree.

A **complete binary tree** has every level completely filled, except possibly for the last level, and all nodes in the last level are as far left as possible. Instead of traversing all nodes in the tree, can you use the properties of a complete binary tree to do better than O(n)?

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,6]`  
Output: `6`  
*Explanation:*
```
      1
    /   \
   2     3
  / \   /
 4   5 6
```
All levels except the last are filled. All nodes on the last level are to the left. Count = 6.

**Example 2:**  
Input: `[]`  
Output: `0`  
*Explanation:*
An empty tree has 0 nodes.

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation:*
A single node tree. Count = 1.

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Traverse all nodes using BFS or DFS and count: O(n) time.

- **Optimized (using complete tree properties):**  
  If a subtree is perfect (all its levels are full), number of nodes = 2ʰ - 1, where h is the tree height.  
  For a given root, measure its leftmost depth and rightmost depth:
    - If left depth == right depth, it's a perfect tree. Count them directly.
    - Otherwise, recursively count in the left and right subtree.
  This avoids traversing all nodes, only traversing enough to calculate for incomplete levels.

- **Why choose this approach:**  
  It reduces the number of recursive calls, especially for large perfect subtrees, giving O(log² n) time instead of O(n).

### Corner cases to consider  
- Empty tree (`root is None`)
- Perfectly filled (all levels full)
- Last level missing only rightmost nodes
- Only one node
- Only left or right child at last level

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def countNodes(root: TreeNode) -> int:
    # Helper to compute the left-most depth
    def leftDepth(node):
        depth = 0
        while node:
            depth += 1
            node = node.left
        return depth

    # Helper to compute the right-most depth
    def rightDepth(node):
        depth = 0
        while node:
            depth += 1
            node = node.right
        return depth

    if not root:
        return 0

    left = leftDepth(root)
    right = rightDepth(root)

    # If left and right depth are the same, it's a perfect tree
    if left == right:
        # Number of nodes in perfect binary tree = 2ⁿ - 1
        return (1 << left) - 1

    # If not perfect, count recursively for left and right subtree
    return 1 + countNodes(root.left) + countNodes(root.right)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(log² n).  
  Each level: compute left and right depth (O(log n)), and recurse O(log n) times (tree height).

- **Space Complexity:**  
  O(log n) due to recursion stack (height of tree).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is not complete?  
  *Hint: Without complete tree property, you must traverse every node (O(n)).*

- Can you solve it iteratively?  
  *Hint: Use a loop for depth calculation and stack for traversal.*

- How do you count nodes if only left or right subtrees are complete?  
  *Hint: Still use depth comparisons at each step.*

### Summary
This problem uses the **complete binary tree** structural property to improve upon the brute-force O(n) counting. By comparing leftmost and rightmost paths, we can detect perfect subtrees and count their nodes in constant time, leading to a classic **"divide and conquer + bit manipulation"** coding pattern. This pattern is also applicable to problems where “quick computations for perfect (sub)structure” can save traversal—like checking if a subtree is balanced or perfect, calculating power-of-two-related properties, etc.


### Flashcard
For each subtree, if left and right depths are equal, count nodes as 2ʰ-1; else, recurse left and right for total count.

### Tags
Binary Search(#binary-search), Bit Manipulation(#bit-manipulation), Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
- Closest Binary Search Tree Value(closest-binary-search-tree-value) (Easy)