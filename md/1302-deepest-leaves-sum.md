### Leetcode 1302 (Medium): Deepest Leaves Sum [Practice](https://leetcode.com/problems/deepest-leaves-sum)

### Description  
Given the root of a **binary tree**, find the sum of all nodes that are deepest in the tree (i.e., at the maximum depth from the root). A leaf is a node with no children. The challenge is to add up the values of those leaves found at the greatest depth.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,null,6,7,null,null,null,null,8]`  
Output: `15`  
*Explanation: The tree is:*

```
        1
      /   \
     2     3
    / \     \
   4   5     6
  /           \
 7             8
```
*Deepest leaves are 7 and 8 (both at level 4), so sum = 7 + 8 = 15.*

**Example 2:**  
Input: `[6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]`  
Output: `19`  
*Explanation: The tree is:*

```
          6
        /   \
      7       8
     / \     / \
    2   7   1   3
   /   / \       \
  9   1   4       5
```
*Deepest leaves: 9, 1, 4, 5 (all at level 4), sum = 9 + 1 + 4 + 5 = 19.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Tree has only one node at depth 1, so the sum is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:**  
  - Traverse the tree and track nodes at each depth. Store nodes level-wise, then add those from the deepest level after the traversal.
  - This is memory-inefficient since we record all levels just to get the last.
- **Optimized Approach:**
  - Perform a **Breadth-First Search (BFS)** to traverse the tree level-by-level.
  - At each level, overwrite a running sum with the sum of all nodes in that level.
  - When we finish processing the last level, our sum variable holds the answer.
  - Alternatively, using **Depth-First Search (DFS)**:
    - Track **max depth** reached, and when encountering a leaf at that depth, update the sum.
    - If a node is deeper than previous, reset the sum.
    - Both BFS and DFS are viable. BFS is more intuitive for level-tracking; DFS may use less extra space in average cases.

### Corner cases to consider  
- Empty tree (root is None).
- All nodes only on one side (e.g., skewed tree).
- Only root exists (single node).
- Multiple deepest nodes at the same maximum depth.
- All nodes have the same value.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

def deepestLeavesSum(root):
    # Use BFS to traverse level by level
    if not root:
        return 0

    queue = deque([root])
    while queue:
        level_sum = 0
        level_size = len(queue)
        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    # level_sum now contains sum of the deepest level
    return level_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the total number of nodes.
  - Each node is visited once.
- **Space Complexity:** O(W), where W is the maximum width of the tree (the number of nodes at the largest level, which, in the worst case, could be N/2).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely large and does not fit in memory?  
  *Hint: Can traversal be streamed or performed chunk-wise?*

- Can you do this with only a DFS and no BFS?  
  *Hint: Track both current depth and max depth during one traversal.*

- What if nodes also had pointers to their parent?  
  *Hint: How could you leverage parent pointers to avoid recursion or use two passes?*

### Summary
The main pattern used here is **level-order traversal (BFS)** in binary trees, focusing on the last visited layer for the solution. It’s a classic example of where BFS cleanly surfaces the answer, and similar techniques apply to other “last level” or “level sum” tree problems, such as "bottom-up level order traversal" and "average of levels in tree".