### Leetcode 3157 (Medium): Find the Level of Tree with Minimum Sum [Practice](https://leetcode.com/problems/find-the-level-of-tree-with-minimum-sum)

### Description  
Given a binary tree, return the level number (starting at 1 for the root) which has the **minimum sum** of node values among all tree levels.  
If multiple levels have the same minimum sum, return the smallest level number (the one closest to the root).

The “level” of a node is its distance from the root + 1 (so root is level 1, root's children are level 2, etc).

### Examples  

**Example 1:**  
Input: `[50,6,2,30,80,7]`  
Output: `2`  
*Explanation:*
```
        50
       /  \
      6    2
     / \   /
   30 80  7
```
Level sums:  
Level 1: 50  
Level 2: 6 + 2 = 8 (**minimum**)  
Level 3: 30 + 80 + 7 = 117  
So the smallest is at level 2.

**Example 2:**  
Input: `[36,17,10,null,null,24]`  
Output: `3`  
*Explanation:*  
```
      36
     /  \
   17   10
        /
      24
```
Level sums:  
Level 1: 36  
Level 2: 17 + 10 = 27  
Level 3: 24 (**minimum**)  
Minimum sum is at level 3.

**Example 3:**  
Input: `[5,null,5,null,5]`  
Output: `1`  
*Explanation:*
```
    5
     \
      5
       \
        5
```
Level sums:  
Level 1: 5 (**minimum**)  
Level 2: 5  
Level 3: 5  
All levels sum to 5, so we return the smallest level, which is 1.

### Thought Process (as if you’re the interviewee)  
- I need to find the tree level with the minimum sum of node values (pick the lowest level if there are ties).
- The classic way to process levels in a tree is using **Breadth-First Search (BFS)** since it visits one full level at a time.
- For BFS, I use a queue:  
  - Enqueue the root and process till the queue is empty.
  - For each level, keep track of the sum.
  - After processing each level, compare the level’s sum to the previous minimum. If it’s lower, note that level.
- If more than one level has the same sum, I return the *smallest* (earliest) such level — so only update the answer if the new sum is strictly lower, or ignore if equal.
- At the end, return the level number (root is level 1).

**Why BFS?**  
- Processes the tree one level at a time, so calculating per-level stats is straightforward.
- Memory use is \(O(\text{max width of tree})\), which is optimal for this use case.

### Corner cases to consider  
- Tree with only one node.
- Tree where all nodes have the same value.
- Multiple levels have the same minimum sum.
- Deep skewed trees (all left or right).
- Nodes with 0 value (if input permits).
- Large input size, but constraints guarantee manageable node count.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

def findLevelWithMinimumSum(root):
    if not root:
        return 0  # The problem definition says at least one node, but just in case.

    queue = deque([root])
    min_sum = float('inf')
    min_level = 1
    current_level = 1

    while queue:
        level_size = len(queue)
        level_sum = 0

        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.val

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        if level_sum < min_sum:
            min_sum = level_sum
            min_level = current_level

        current_level += 1

    return min_level
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the tree.  
  Every node is visited once.
- **Space Complexity:** O(w), where w is the maximum width of the tree (number of nodes at the widest level).  
  The queue holds at most all the nodes at a single level at any time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if, instead of the minimum sum, we wanted the maximum sum level?
  *Hint: Replace the comparison with greater-than instead of less-than.*

- What if the tree is extremely deep (unbalanced)? How would you optimize for space?
  *Hint: Could process level sums without storing parent nodes, but BFS is still optimal for levels.*

- Can you return not just the level, but also which nodes formed that minimal sum?
  *Hint: Store node values explicitly for the minimal level during traversal.*

### Summary

This problem leverages the **BFS level-order traversal** pattern, ideal for all problems where computation must be done per tree level (e.g., level order sums, finding largest/lowest value in each level, etc).  
This approach is commonly used in questions about level-based properties of trees, such as “Max Level Sum of a Binary Tree,” or “Average of Levels in Binary Tree.”  
The BFS solution is simple, efficient (O(n)), and easy to extend for related problems.