### Leetcode 199 (Medium): Binary Tree Right Side View [Practice](https://leetcode.com/problems/binary-tree-right-side-view)

### Description  
Given a **binary tree**, imagine you are standing on the *right* side of it. For each level of the tree, return the value of the node that is visible when looking from the right side. In other words, collect the rightmost node at every level from top to bottom.

### Examples  

**Example 1:**  
Input: `[1,2,3,null,5,null,4]`  
Output: `[1,3,4]`  
*Explanation:*

```
[1,2,3,null,5,null,4]
    1
   / \
  2   3
   \    \
    5    4
```
Right side view: *first level:* 1, *second level:* 3, *third level:* 4.

**Example 2:**  
Input: `[1,null,3]`  
Output: `[1,3]`  
*Explanation:*

```
[1,null,3]
  1
   \
    3
```
Right side view: 1, 3.

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation:* The tree is empty, so the right side view is also empty.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every level of the tree, traverse all nodes and keep updating the value for each level, so the last node processed per level would be the rightmost one.  
  However, this is inefficient.

- **Optimized Approach:**  
  Use **Breadth-First Search (BFS) / Level Order Traversal**.  
  - Traverse the tree level by level using a queue.  
  - For each level, the *last node* encountered in the queue is the one visible from the right side.  
  - Collect this node’s value for each level.

  Alternatively, one can use a **Depth-First Search (DFS)** starting with the right child, so the first node visited at each depth is the rightmost (and thus, visible from the right).

- I prefer the BFS approach since it’s easier to reason about the rightmost node at each level and naturally collects results level by level.  
- **Trade-offs:**  
  - The BFS approach uses a queue but is straightforward and ensures good readability.  
  - DFS is equally valid; using a hash map or array to record the first visit per level.

### Corner cases to consider  
- Empty tree (input `[]`)
- Tree with a single node
- Left-skewed trees (all nodes only have left children)
- Right-skewed trees (all nodes only have right children)
- Trees with multiple children per node, but some left or right children are `null` (uneven shapes)
- Duplicate values in nodes

### Solution

```python
from collections import deque

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rightSideView(self, root):
        # Result list
        right_side_view = []

        # Edge case: empty tree
        if root is None:
            return right_side_view

        # Queue for BFS
        queue = deque([root])

        while queue:
            level_size = len(queue)
            for i in range(level_size):
                node = queue.popleft()
                # If this is the last node in this level, add to result
                if i == level_size - 1:
                    right_side_view.append(node.val)
                # Add children to the queue in left-to-right order
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return right_side_view
```

### Time and Space complexity Analysis  

- **Time Complexity:** **𝑂(n)**.  
  Every node is visited exactly once during the level order traversal, where \( n \) is the number of nodes.

- **Space Complexity:** **𝑂(m)**, where \( m \) is the maximum number of nodes in any level (the queue size). For a balanced tree, this is approximately 𝑂(⌊n/2⌋).
  The output list takes 𝑂(h) space, where \( h \) is the height of the tree.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this with a recursive DFS approach?  
  *Hint: Track the depth of recursion, and traverse right children before left.*

- What would you do if the tree is extremely unbalanced?  
  *Hint: Think about potential stack overflow or memory issues.*

- Can you return the left side view instead?  
  *Hint: Just adjust which child to visit or which index to record at each level.*

### Summary
This problem is a classic use case for **level-order traversal (BFS)**, focusing on capturing the last node at each level to represent the right side view. It demonstrates the importance of queue-based traversal in trees and can also be adapted to depth-first recursive strategies, which is a common interview pattern. This approach also generalizes to views from any side or extracting specific level information.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Populating Next Right Pointers in Each Node(populating-next-right-pointers-in-each-node) (Medium)
- Boundary of Binary Tree(boundary-of-binary-tree) (Medium)