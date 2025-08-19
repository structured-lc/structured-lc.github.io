### Leetcode 429 (Medium): N-ary Tree Level Order Traversal [Practice](https://leetcode.com/problems/n-ary-tree-level-order-traversal)

### Description  
Given an n-ary tree, return the level order traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value.

### Examples  

**Example 1:**  
Input: `root = [1,null,3,2,4,null,5,6]`  
Output: `[[1],[3,2,4],[5,6]]`  
*Explanation: The tree has 3 levels: root=1, second level=[3,2,4], third level=[5,6].*

**Example 2:**  
Input: `root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  
Output: `[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]`  

### Thought Process (as if you're the interviewee)  
This is a level order traversal problem for n-ary trees, similar to binary tree level order traversal but each node can have any number of children.

Approaches:
1. **BFS with queue**: Use a queue to process nodes level by level
2. **DFS with level tracking**: Use recursion with depth parameter to group nodes by level
3. **Two-queue approach**: Use two queues to separate current and next level

The BFS approach is most intuitive and efficient for level order traversal.

### Corner cases to consider  
- Empty tree (root is None)
- Single node tree
- Tree with only one level
- Unbalanced tree with varying depths
- Nodes with no children vs many children

### Solution

```python
# Definition for a Node in N-ary tree
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.pop(0)
            current_level.append(node.val)
            
            # Add all children to queue for next level
            for child in node.children:
                queue.append(child)
        
        result.append(current_level)
    
    return result

# Alternative approach using collections.deque for better performance
from collections import deque

def levelOrderOptimized(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            # Extend queue with all children
            queue.extend(node.children)
        
        result.append(current_level)
    
    return result

# DFS approach with level tracking
def levelOrderDFS(root):
    if not root:
        return []
    
    result = []
    
    def dfs(node, level):
        # Extend result if we reach a new level
        if level >= len(result):
            result.append([])
        
        # Add current node to its level
        result[level].append(node.val)
        
        # Recursively process all children at next level
        for child in node.children:
            dfs(child, level + 1)
    
    dfs(root, 0)
    return result

# Two-queue approach for clarity
def levelOrderTwoQueues(root):
    if not root:
        return []
    
    result = []
    current_level = [root]
    
    while current_level:
        next_level = []
        current_values = []
        
        for node in current_level:
            current_values.append(node.val)
            next_level.extend(node.children)
        
        result.append(current_values)
        current_level = next_level
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the number of nodes. We visit each node exactly once.
- **Space Complexity:** O(n) for the result array and O(w) for the queue where w is the maximum width of the tree. In worst case, w can be O(n).

### Potential follow-up questions (as if you're the interviewer)  

- How would you implement reverse level order traversal (bottom-up)?  
  *Hint: Use the same approach but reverse the result at the end, or use a stack instead of queue.*

- What if you needed to find the average value at each level?  
  *Hint: Calculate sum and count for each level, then compute average.*

- How would you handle a tree where some nodes have null children mixed with valid children?  
  *Hint: Filter out null children before adding to queue.*

- Can you implement this iteratively without using extra space for the queue?  
  *Hint: This is challenging for n-ary trees due to variable number of children.*

### Summary
N-ary tree level order traversal extends the classic binary tree approach to handle nodes with variable numbers of children. The BFS approach with a queue remains the most intuitive solution, processing one level at a time. The key insight is tracking the number of nodes at each level to properly separate levels in the result. This pattern is fundamental for tree traversal problems and can be adapted for various tree-related tasks like finding tree width, depth, or level-specific operations.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Binary Tree Level Order Traversal(binary-tree-level-order-traversal) (Medium)
- N-ary Tree Preorder Traversal(n-ary-tree-preorder-traversal) (Easy)
- N-ary Tree Postorder Traversal(n-ary-tree-postorder-traversal) (Easy)
- The Time When the Network Becomes Idle(the-time-when-the-network-becomes-idle) (Medium)