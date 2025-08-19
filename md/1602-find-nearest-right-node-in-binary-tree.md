### Leetcode 1602 (Medium): Find Nearest Right Node in Binary Tree [Practice](https://leetcode.com/problems/find-nearest-right-node-in-binary-tree)

### Description  
Given a binary tree and a target node u, find the node immediately to the right of u in the same level (if any), or return null if u is at the far right of its level. 

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4,null,null,5]`, `u = 4`  
Output: `null`
*Explanation: Level order is 4 at depth 2, and there are no nodes after it on this level.*

Binary Tree:
```
      1
     / \
    2   3
   /     \
  4       5
```
List representation: [1,2,3,4,null,null,5]

**Example 2:**  
Input: `root = [1,2,3,null,4,5,6]`, `u = 5`
Output: `6`
*Explanation: In level 2, after 5 comes 6.*

Binary Tree:
```
      1
     / \
    2   3
     \  / \
      4 5 6
```
List representation: [1,2,3,null,4,5,6]

**Example 3:**  
Input: `root = `, `u = 7`
Output: `null`
*Explanation: The node is the only one at its level.*

### Thought Process (as if you’re the interviewee)  
- Since we’re interested in nodes at the same depth/level as u, level order traversal (BFS) is a natural fit.
- Traverse the tree level by level, and for each level scan from left to right. Keep nodes in a queue.
- For each node, check if the current node is u. If so, then the next node in the queue (at this level) is the answer, unless u is the last node at that level (in which case return null).
- Using BFS guarantees each node is visited once.

### Corner cases to consider  
- u is the rightmost node in its level
- u is the only node in the tree
- u not present in tree (should return null or nothing)
- tree height is 1

### Solution

```python
from collections import deque

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findNearestRightNode(root: TreeNode, u: TreeNode) -> TreeNode:
    if not root:
        return None
    queue = deque([root])
    while queue:
        size = len(queue)
        for i in range(size):
            node = queue.popleft()
            if node == u:
                # If not last in level, next is nearest right
                return queue[0] if i < size - 1 else None
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return None
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is processed once.
- **Space Complexity:** O(w), where w is the maximum width of the tree (BFS queue), in the worst case O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it using DFS with level info?  
  *Hint: Track levels and parent nodes recursively.*

- What if the tree is very deep (skewed)?  
  *Hint: Watch space usage with recursion or use iterative methods.*

- What if u is not guaranteed to be in the tree?  
  *Hint: How do you validate its presence?*

### Summary
Level order traversal (BFS) is the standard approach to questions involving nodes at the same tree depth. The technique is also used in problems asking for "right/next sibling", "level order successor", or printing the tree by rows.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
