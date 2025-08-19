### Leetcode 1609 (Medium): Even Odd Tree [Practice](https://leetcode.com/problems/even-odd-tree)

### Description  
Given a binary tree, check whether the tree is an "even-odd" tree. This means:
- On even-indexed levels (starting from 0), all nodes' values must be **odd** integers and strictly **increasing** left to right.
- On odd-indexed levels, values must be **even** integers and strictly **decreasing** left to right.
Return True if the tree meets these properties for all levels; else, False.

### Examples  

**Example 1:**  
Input: `[1,10,4,3,null,7,9,12,8,6,null,null,2]`
Output: `True`
*Explanation:*
```
        1
      /   \
    10     4
   /      / \
  3     7   9
 / \       /
12  8     6  2
```
Level 0: [1] (odd)
Level 1: [10, 4] (even, 10 > 4)
Level 2: [3, 7, 9] (odd, increasing)
Level 3: [12, 8, 6, 2] (even, decreasing)

**Example 2:**  
Input: `[5,4,2,3,3,7]`
Output: `False`
*Explanation: Level 2 has two nodes with value 3; should be strictly increasing.*

**Example 3:**  
Input: `[1]`
Output: `True`

### Thought Process (as if you’re the interviewee)  
- Traverse breadth-first (level order).
- For each level, determine:
    - Parity constraint: even-indexed (odd values, increasing), odd-indexed (even values, decreasing).
    - Check all node values at that level for the parity and order constraint.
- If any rule violated, return False.

### Corner cases to consider  
- Single-node tree.
- Levels with only one node.
- Equal values at a level (should fail).
- Tree with missing nodes (nulls).

### Solution

```python
from collections import deque

def isEvenOddTree(root):
    queue = deque([root])
    level = 0
    while queue:
        size = len(queue)
        prev = None
        for _ in range(size):
            node = queue.popleft()
            val = node.val
            # Check parity
            if level % 2 == 0:
                if val % 2 == 0 or (prev is not None and val <= prev):
                    return False
            else:
                if val % 2 == 1 or (prev is not None and val >= prev):
                    return False
            prev = val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        level += 1
    return True
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) (every node visited once)
- **Space Complexity:** O(width of tree), for the queue (can be O(n/2) in worst case)

### Potential follow-up questions (as if you’re the interviewer)  
- How would you modify for an n-ary tree?   
  *Hint: Instead of left/right, branch over all children.*

- Can we do this with DFS instead of BFS?   
  *Hint: Pass current level as parameter in recursion, build an array per level, check constraints after traversal.*

- What if levels are defined by depth from root, not index?   
  *Hint: For binary trees, that's equivalent. (Same for most practical uses.)*

### Summary
Level order traversal with explicit parity and order constraints on each level. Pattern: *BFS by levels with custom checks.*
Useful for tree validation where properties alternate or depend on level index, such as Zebra trees, alternate value patterns, or level-dependent filters.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
