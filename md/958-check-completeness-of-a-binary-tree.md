### Leetcode 958 (Medium): Check Completeness of a Binary Tree [Practice](https://leetcode.com/problems/check-completeness-of-a-binary-tree)

### Description  
Given the root of a binary tree, determine **if the tree is a complete binary tree**.  
A **complete binary tree** is a binary tree in which:
- Every level, except possibly the last, is completely filled.
- All nodes in the last level are as far left as possible.

In other words, when filling nodes level by level from left to right, there must not be any "gaps" between nodes on the same level, and if a node on a level is missing, all subsequent nodes at that level and at later levels must also be missing (to its right).  
You must return **True** if the tree is complete, **False** otherwise.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,6]`  
Output: `True`  
Explanation:  
```
      1
     / \
    2   3
   / \ /
  4  5 6
```
All levels except possibly the last are fully filled, and the last level nodes (4, 5, 6) are as far left as possible[1][2].

**Example 2:**  
Input: `[1,2,3,4,5,null,7]`  
Output: `False`  
Explanation:  
```
      1
     / \
    2   3
   / \   \
  4   5   7
```
There is a missing node to the left of node 7. A non-null node appears after a null position, violating completeness[2].

**Example 3:**  
Input: `[1]`  
Output: `True`  
Explanation:  
A single-node tree is trivially complete.

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  One brute-force way is to label the positions of every node as if they were indices in an array representation of a complete binary tree (root = 1, left = parent\*2, right = parent\*2 + 1). After traversing all nodes, if the largest assigned index equals the number of nodes, then the tree is complete.  
  However, this can be more complex than necessary for interview settings.

- **Optimized approach:**  
  Use **level order traversal (BFS)**:
  - While doing BFS, enqueue children (including `None` if a child does not exist).
  - Once a `None` is encountered, every following node in BFS must also be `None` for the tree to be complete.
  - If any non-null node is found after `None`, the tree is not complete.
  This is an efficient and intuitive way to check completeness, as it directly matches how the property is defined[1][3].

- **Trade-offs:**  
  - BFS uses additional queue space (up to O(n)), but it is straightforward and easy to code up under interview constraints.
  - The array-index "labeling" trick is clever but can be overkill unless asked specifically.

### Corner cases to consider  
- Tree with only root node.
- Last level having missing nodes on the right, but not the left.
- Last level missing nodes in the middle.
- Gaps appear before the end of the tree.
- Root or any subtree is `None`.
- Skewed trees (all left or all right children).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

def isCompleteTree(root):
    # BFS queue, keep track of nodes (including None)
    queue = deque([root])
    seen_null = False

    while queue:
        node = queue.popleft()
        if node:
            # If we've seen a null before, the tree cannot be complete
            if seen_null:
                return False
            queue.append(node.left)
            queue.append(node.right)
        else:
            # Once we see a null, all future nodes must also be null
            seen_null = True

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the number of nodes. Each node is visited exactly once.

- **Space Complexity:**  
  O(n) for the queue in the worst case (for a full binary tree's last level).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find the number of missing nodes to make the tree a full binary tree?
  *Hint: Think about calculating the expected node count for a given height.*

- Can you check completeness using DFS instead of BFS?
  *Hint: Use index-based labeling or measure positions recursively.*

- How do you validate a perfect binary tree (all leaves at the same level, all inner nodes two children)?
  *Hint: Compare depths or node counts.*

### Summary
This problem uses the **level order traversal (BFS) pattern**, which is widely used for tree problems involving levels, widths, or completeness. The key pattern—detecting a `None` before any further non-null nodes—directly matches the property of a complete binary tree. Similar ideas apply to tree serialization, symmetry checks, and breadth-first searches for shortest paths or widest levels in a tree.