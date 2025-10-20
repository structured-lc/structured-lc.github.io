### Leetcode 124 (Hard): Binary Tree Maximum Path Sum [Practice](https://leetcode.com/problems/binary-tree-maximum-path-sum)

### Description  
Given a binary tree, find the **maximum sum you can get by summing up values along any path**.  
- A *path* can start and end at any node, but it must go downwards (parent to child connections only).
- The path **does not have to pass through the root** and **each node can appear at most once** in the path.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `6`  
*Explanation: The optimal path is 2 → 1 → 3 with sum 2 + 1 + 3 = 6.*  
Tree:
```
    1
   / \
  2   3
```

**Example 2:**  
Input: `[-10,9,20,null,null,15,7]`  
Output: `42`  
*Explanation: The optimal path is 15 → 20 → 7 with sum 15 + 20 + 7 = 42.*  
Tree:
```
    -10
    /  \
   9   20
      /  \
     15   7
```

**Example 3:**  
Input: `[5,4,8,11,null,13,4,7,2,null,null,null,1]`  
Output: `48`  
*Explanation: The optimal path is 7 → 11 → 4 → 5 → 8 → 13 with sum 7 + 11 + 4 + 5 + 8 + 13 = 48.*  
Tree:
```
         5
        / \
       4   8
      /   / \
     11  13  4
    / \        \
   7   2        1
```

### Thought Process (as if you’re the interviewee)  
- **First, brute force idea:** For each node, try all possible paths that include it. This would mean considering all parent-to-child paths, which leads to recalculating subproblems multiple times, so the time complexity would be exponential.
- **Optimization thoughts:** Realize that at each node, the *maximum path sum* must either:
   - Use the **node alone**
   - Use the node and extend **one side** (either left or right)
   - Use the node as a "bridge" to both **left and right** (combining max path from left and right subtrees through the node)
- **Key insight:** When propagating *upwards* (recursion), you can only pick one path (left or right), not both, because you can't "fork" upwards.
- **Algorithm plan:**  
   - Use DFS post-order traversal, where for each node:
      1. Compute max downward path sum for left and right (treating only *one* path can be extended upwards).
      2. Compute local maximum using "node + left + right" (may become the global answer, but not to return upwards).
      3. Return `node + max(left, right, 0)` upwards (if left/right < 0, best to skip).
- **Why this is correct:** This avoids repeated work and ensures the path is always valid (does not revisit nodes or go upwards after descending any node).

### Corner cases to consider  
- Empty tree (should not occur: problem says ≥1 node)
- All nodes negative: Should still return maximum single-node value.
- Linear tree (skewed left/right)
- Tree with large positive/negative values
- Only single node present
- Left/right child is null

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxPathSum(root):
    # Holds the global maximum path sum
    max_sum = float('-inf')
    
    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        
        # Recursively find the maximum path sum for left and right subtrees
        left = max(dfs(node.left), 0)   # Do not include negative paths
        right = max(dfs(node.right), 0)
        
        # Update global maximum: path could pass through this node, including both children
        current_sum = node.val + left + right
        max_sum = max(max_sum, current_sum)
        
        # When returning to parent, only one side can be chosen (cannot fork)
        return node.val + max(left, right)
    
    dfs(root)
    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes in tree. Each node is visited once.
- **Space Complexity:** O(h), where h = height of the tree (recursion stack). In worst case (skewed tree), h = n; in best (balanced), h = log n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need the *actual path* as a list, not just the sum?  
  *Hint: Maintain path lists at each call; store the path when max is updated.*

- How would you handle extremely large trees that don't fit in memory?  
  *Hint: Consider traversal strategies such as iterative DFS; process nodes on-demand if the tree is streamed.*

- How would you adapt the solution if the tree could have cycles (i.e., it is a graph)?  
  *Hint: Need to mark visited nodes to avoid infinite loops.*

### Summary
This is a classic tree **DFS recursion with post-order traversal** problem, using an auxiliary variable to track a global optimum. The key logic is that *while calculating the local maximum at each node (could fork in both directions), you can only pick one direction to propagate upwards*. This pattern reappears in many "maximum path sum"-style problems for trees and graphs, and closely relates to DP on trees—often called "tree DP."


### Flashcard
Use post-order recursion where each node calculates max single-path gain to return upward, while updating global maximum by considering node as bridge between left and right paths.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Path Sum(path-sum) (Easy)
- Sum Root to Leaf Numbers(sum-root-to-leaf-numbers) (Medium)
- Path Sum IV(path-sum-iv) (Medium)
- Longest Univalue Path(longest-univalue-path) (Medium)
- Time Needed to Inform All Employees(time-needed-to-inform-all-employees) (Medium)
- Difference Between Maximum and Minimum Price Sum(difference-between-maximum-and-minimum-price-sum) (Hard)