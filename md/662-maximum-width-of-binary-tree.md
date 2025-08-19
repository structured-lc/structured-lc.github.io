### Leetcode 662 (Medium): Maximum Width of Binary Tree [Practice](https://leetcode.com/problems/maximum-width-of-binary-tree)

### Description  
Given a binary tree, return its **maximum width**. The width of a binary tree at a given level is the length between the leftmost and rightmost non-null nodes, **counting the null nodes in between** based on the tree's structure if it were a full binary tree. This means you take the "positions" the nodes would have in a complete tree, include all the possible nulls between them, and calculate the distance. The maximum width is the widest of all such levels.

### Examples  

**Example 1:**  
Input:  
```
      1
     / \
    3   2
   /     \
  5       9
 /         \
6           7
```
Output: `8`  
Explanation: The fourth level has nodes at positions 6 and 7, but counting all possible spots from 6 to 13 (if the tree were complete), there are 8 positions: (6, null, null, null, null, null, null, 7).

**Example 2:**  
Input:  
```
    1
   / 
  3   
 / \
5   3
```
Output: `2`  
Explanation: The lowest level has nodes 5 and 3, so width = 2 (no gaps).

**Example 3:**  
Input:  
```
    1
   / \
  3   2
 /
5   
```
Output: `2`  
Explanation: The second level has nodes 3 and 2, so width = 2 (positions 2 and 3).

### Thought Process (as if you’re the interviewee)  
First, the naive way would be to count actual non-null nodes at each level, but the problem specifies we need to count the potential spaces for null nodes as well.

The better approach is to perform a **BFS (breadth-first search) traversal**. While traversing level by level, we assign an index to every node, as if the tree were full:
- Root gets index 0.
- For a node at index i: left child gets 2\*i, right child gets 2\*i+1.

For every level, the width will then be  
width = rightmost index - leftmost index + 1.

This pattern helps us directly calculate the width including imaginary nulls.

Trade-offs: BFS is chosen over DFS for easy level-wise segregation and avoiding explicit recursion stack management.

### Corner cases to consider  
- Empty tree (root is None): width should be 0.
- Tree with only a single node.
- Very skewed trees (all left or all right).
- Trees with nodes having only one child (sparse trees).
- Large, wide trees with missing nodes deep inside.

### Solution

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def widthOfBinaryTree(root):
    if not root:
        return 0
    # Queue will hold pairs: (node, index)
    max_width = 0
    queue = deque([(root, 0)])
    
    while queue:
        level_length = len(queue)
        # Track the first index at this level
        _, first_idx = queue[0]
        # Iterate over the current level
        for _ in range(level_length):
            node, idx = queue.popleft()
            # Normalize idx to avoid large numbers
            idx -= first_idx
            if node.left:
                queue.append((node.left, 2 * idx))
            if node.right:
                queue.append((node.right, 2 * idx + 1))
        # Last node's index at the level
        last_idx = idx
        # Width: last index - first index + 1
        max_width = max(max_width, idx + 1)
    return max_width
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the total number of nodes. Every node is visited once in BFS.
- **Space Complexity:** O(n) in the worst case (the queue might hold all nodes at the largest level).

### Potential follow-up questions (as if you’re the interviewer)  

- How does your solution behave for an unbalanced but deep tree?
  *Hint: Consider index normalization on each level to prevent integer overflow.*

- Can you solve the problem using DFS instead of BFS?
  *Hint: Track the leftmost index per depth and compute width recursively.*

- What if node values are not unique or don't follow BST properties?
  *Hint: Solution relies only on structure, not on node values.*

### Summary
This problem uses the **BFS + position indexing** pattern to map nodes as if in a complete binary tree and easily measure the maximum width at each level. This level-index assignment trick is reusable in other scenarios where the tree's sparse structure must be encoded as a full structure, such as serializing trees or reconstructing tree levels.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
