### Leetcode 1161 (Medium): Maximum Level Sum of a Binary Tree [Practice](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree)

### Description  
Given the root of a binary tree, determine which level (root is considered level 1) has the **maximum sum** of values among all its nodes. If there are multiple such levels, return the **smallest** level number.  
This means you must:
- Traverse the tree by levels,
- Calculate the sum of node values at each level,
- Return the level number (1-indexed) with the highest sum (if a tie, return the lowest such level).

### Examples  

**Example 1:**  
Input: `[1,7,0,7,-8,null,null]`  
Output: `2`  
*Explanation:*
- Tree:  
  ```
    1
   / \
  7   0
 / \
7  -8
  ```
- Level 1 sum: 1  
  Level 2 sum: 7+0=7  
  Level 3 sum: 7+(-8)=-1  
- Maximum sum is at level 2.

**Example 2:**  
Input: `[989,null,10250,98693,-89388,null,null,null,-32127]`  
Output: `2`  
*Explanation:*
- Tree:  
  ```
      989
        \
       10250
       /    \
   98693  -89388
             \
           -32127
  ```
- Level 1 sum: 989  
  Level 2 sum: 10250  
  Level 3 sum: 98693 + (-89388) = 9305  
  Level 4 sum: -32127  
- Maximum sum is at level 3 (9305); but according to most sources/LeetCode, it's 2 with sum 10250.

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation:*
- Tree:  
  ```
  1
  ```
- Only one level, so return 1.

### Thought Process (as if you’re the interviewee)  

I’ll start by needing to compute the sum of all node values at each level of the tree.  
The naive (but efficient) way to achieve this is via **level-order traversal (BFS)**:  
- Use a queue to process nodes, level by level.
- For each level, sum up all node values and record them (or just keep track of the maximum sum and corresponding level as we go).  
Alternatively, a **DFS approach with recursion** could be used:  
- Pass down the level as we recurse,
- Maintain an array/list where each index accumulates the sum at that particular level.

BFS is more direct, but DFS is also clean.  
For both approaches, time complexity is O(n), as each node is visited once.

I would select BFS for its simplicity in traversing by level and ease of implementation for this level-based sum problem.

### Corner cases to consider  
- Tree has only one node.
- Tree levels have negative and positive values.
- Multiple levels have the same sum (need to pick the smallest level).
- Tree is empty (should be handled with early return or clarify with interviewer).
- Complete, unbalanced, or very deep trees.

### Solution

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxLevelSum(root):
    # Base case: if tree is empty
    if not root:
        return 0

    q = deque([root])
    max_sum = float('-inf')  # Keep track of the largest sum
    max_level = 1            # Level with the current max sum
    current_level = 1

    while q:
        level_sum = 0
        # Process all nodes at the current level
        for _ in range(len(q)):
            node = q.popleft()
            level_sum += node.val  # Add current node's value to level sum
            # Add children for next level
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        # Update max sum and level if needed
        if level_sum > max_sum:
            max_sum = level_sum
            max_level = current_level
        current_level += 1

    return max_level
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes in the tree. Each node is enqueued and dequeued once.
- **Space Complexity:** O(w), where w = maximum width of the tree (largest number of nodes at any level), due to the queue used for BFS.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep but narrow?  
  *Hint: Can your BFS handle very deep trees, or would recursion stack/queue size be a concern?*

- Could you compute the maximum level product instead of sum?  
  *Hint: Adjust the aggregation operator at each level (product instead of sum).*

- How would this approach change if this was a N-ary tree?  
  *Hint: Allow each node to have multiple children; traverse all children per node at each step.*

### Summary
The problem is a classic example of level-order traversal (**BFS**) applied to a tree for level-based aggregation.  
This is a common pattern useful for questions involving level-wise processing, such as “largest value on each row,” “average of levels in BT,” or “zigzag traversal.”  
The space and time efficiency make it suitable even for large trees, given memory is sufficient for the tree’s width.  
Can also be solved (slightly less directly) by **DFS** with recursion and a list/array to track sums at each depth.


### Flashcard
Use BFS (level-order traversal) to compute the sum of node values at each tree level and return the level with the maximum sum.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Kth Largest Sum in a Binary Tree(kth-largest-sum-in-a-binary-tree) (Medium)
- Cousins in Binary Tree II(cousins-in-binary-tree-ii) (Medium)