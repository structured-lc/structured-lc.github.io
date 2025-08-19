### Leetcode 515 (Medium): Find Largest Value in Each Tree Row [Practice](https://leetcode.com/problems/find-largest-value-in-each-tree-row)

### Description  
Given the `root` of a binary tree, return an array where each element represents the **largest value found in each row** of the tree. Each row corresponds to one level of the binary tree starting from the root, and you need to capture the maximum value for every level from top (level 0) to bottom.  
The binary tree is not necessarily a BST, so node values can be arbitrary.[1][2][3]

### Examples  

**Example 1:**  
Input:  
```
    1
   / \
  3   2
 / \   \
5   3   9
```
Output: `[1, 3, 9]`  
*Explanation:*
- Level 0: Only 1 → max = 1  
- Level 1: 3, 2 → max = 3  
- Level 2: 5, 3, 9 → max = 9

**Example 2:**  
Input:  
```
    -1
   /  \
 -2    0
         \
          5
```
Output: `[-1, 0, 5]`  
*Explanation:*
- Level 0: -1 → max = -1  
- Level 1: -2, 0 → max = 0  
- Level 2: 5 → max = 5

**Example 3:**  
Input:  
```
  2
   \
    3
     \
      7
```
Output: `[2, 3, 7]`  
*Explanation:*
- Level 0: 2 → max = 2  
- Level 1: 3 → max = 3  
- Level 2: 7 → max = 7

### Thought Process (as if you’re the interviewee)  
The goal is to get the largest value from each row (level) of a binary tree.  
My immediate thought is to **traverse the tree level by level**, collecting all node values at every level, and then pick the maximum from each group.  
- **Brute-force idea:**  
  Traverse the tree and, for each level, keep a running "max" value. Use a BFS approach (level order traversal with a queue) to easily access all nodes at each level together, or DFS with an extra level parameter and array.  
- **Optimized approach:**  
  Both BFS and DFS can be used.  
  - **BFS:** Standard level-order traversal, for each level, process all nodes, record max value.  
  - **DFS:** Recursively traverse tree, for each depth (level), keep updating the max for that level—extend result array when reaching a new level.  
  BFS is conceptually simpler and more natural for this problem, since we group nodes by level naturally.

### Corner cases to consider  
- Empty tree (`root == None`) → Should return an empty list `[]`
- All nodes have the same value
- Tree has only one node
- Tree is skewed (only left or only right children)
- Negative and positive values in the tree
- Maximum value appears more than once in a row

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def largestValues(root):
    # Edge case: empty tree
    if not root:
        return []
        
    result = []
    queue = [root]
    
    while queue:
        row_max = queue[0].val  # Start with the first node's value
        next_queue = []
        
        for node in queue:
            # Update row_max if a bigger value is found
            if node.val > row_max:
                row_max = node.val
            # Add left and right children for the next level
            if node.left:
                next_queue.append(node.left)
            if node.right:
                next_queue.append(node.right)
        
        result.append(row_max)
        queue = next_queue  # Move to the next level
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited once, where n is the total number of nodes in the tree.

- **Space Complexity:** O(n)  
  In the worst case, the last level could have up to n/2 nodes, so the queue can grow up to O(n) for a full binary tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep? How would you handle stack overflow/recursion depth in DFS approaches?
  *Hint: Consider iterative (BFS) implementations for trees with large height.*

- Could you solve the problem using DFS instead? How would your solution and space usage change?
  *Hint: Pass a 'level' parameter; use an array to store current max for each level.*

- What if you want the minimum (not maximum) value at each row?
  *Hint: Just replace the 'max' logic with 'min' accordingly.*

### Summary
This is a classic **tree traversal** problem, closely aligned with **level order traversal** or **BFS**. The approach of grouping nodes level by level and computing aggregates (e.g., max/min) is common and often appears in binary tree interview problems.  
Pattern applies to:  
- Left/right view of a tree  
- Tree zigzag or spiral order  
- Level-wise sums, averages, or other reduction operations

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
