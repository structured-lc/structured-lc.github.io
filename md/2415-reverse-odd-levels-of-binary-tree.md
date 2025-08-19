### Leetcode 2415 (Medium): Reverse Odd Levels of Binary Tree [Practice](https://leetcode.com/problems/reverse-odd-levels-of-binary-tree)

### Description  
Given the root of a **perfect** binary tree, reverse the values of the nodes at every odd-numbered level (where the root is considered level 0). Only the values are reversed—tree structure remains unchanged. For each odd level, swap the node values symmetrically (left with right, etc.) across the level.

A **perfect binary tree**:  
- all internal nodes have 2 children  
- all leaves are at the same (bottom-most) level

Return the root of the modified tree.

### Examples  

**Example 1:**  
Input: `[2,3,5,8,13,21,34]`  
Output: `[2,5,3,8,13,21,34]`  
*Explanation: Level 1 has nodes 3 and 5. After reversing, level 1 becomes 5 and 3. Tree:*
```
      2
     / \
    5   3
   /|   |\
  8 13 21 34
```

**Example 2:**  
Input: `[7,13,15,18,7,9,8]`  
Output: `[7,15,13,18,7,9,8]`  
*Explanation: Reverse values at level 1: nodes 13 and 15 → 15 and 13. Tree:*
```
    7
   / \
 15   13
/|   |\
18 7 9 8
```

**Example 3:**  
Input: `[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]`  
Output: `[1,3,2,4,5,6,7,8,9,10,11,12,13,14,15]`  
*Explanation: Only level 1 (values 2, 3) is reversed. Rest remain.*

### Thought Process (as if you’re the interviewee)  
- Since we're dealing with a perfect binary tree, each level is completely filled, making symmetry and reversal simple.
- The brute-force method is **level order traversal (BFS)**:  
  Traverse level by level and for every odd level, collect all nodes, then reverse their values.
- At each odd level, swap the values across the level (first with last, second with second-last, etc.).
- We could also use a **DFS** method, if we always traverse mirrored nodes together. That is, for nodes at the same depth but mirrored (left subtree's left with right subtree's right, and left subtree's right with right subtree's left).
- BFS is easier to reason about, but DFS with two pointers is more elegant.
- Both approaches avoid changing the structure—**only values change**.

### Corner cases to consider  
- Tree with **only root node**: no odd levels, so return as is.
- Tree with **two levels**: only need to reverse level 1.
- Tree with multiple levels: need to reverse all odd levels.
- All node values equal: structural change will be unnoticeable but should still process.
- Input is `None`: return `None`.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def reverseOddLevels(root):
    # Use BFS to traverse tree level by level.
    if not root:
        return None

    from collections import deque
    queue = deque([root])
    level = 0

    while queue:
        size = len(queue)
        nodes = []
        # Collect all nodes at current level.
        for _ in range(size):
            node = queue.popleft()
            nodes.append(node)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        # Reverse values if level is odd.
        if level % 2 == 1:
            i, j = 0, len(nodes) - 1
            while i < j:
                nodes[i].val, nodes[j].val = nodes[j].val, nodes[i].val
                i += 1
                j -= 1
        level += 1

    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once.
- **Space Complexity:** O(w), where w is the maximum width of the tree (at the last level), for BFS queue and storing nodes at each level.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reverse **even levels** instead?
  *Hint: Change the parity check for which level to reverse.*

- Could you solve this recursively, in **O(h)** space, where h is height?
  *Hint: Use DFS, always pass mirrored nodes together and swap on odd levels.*

- If the tree wasn't perfect, would your solution still work?
  *Hint: No, because symmetry is required for proper reversal.*

### Summary
This problem applies a **level order traversal (BFS)** to manipulate a tree based on levels, specifically reversing values at odd-numbered levels. It's a classic example of **tree modification by level**, a pattern that appears in inverting trees, level reversals, and zigzag traversals. Mastering both BFS and DFS for such structured symmetric problems is widely applicable in tree-based interview questions.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Invert Binary Tree(invert-binary-tree) (Easy)