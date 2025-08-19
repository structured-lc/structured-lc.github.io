### Leetcode 687 (Medium): Longest Univalue Path [Practice](https://leetcode.com/problems/longest-univalue-path)

### Description  
Given the root of a binary tree, find the length of the longest path in which every node in the path has the same value. The path can start and end at any node and does not have to pass through the root. The length of a path is measured by the number of edges between the nodes. That is, for a sequence of nodes with the same value, return the maximum number of edges connecting them.

### Examples  

**Example 1:**  
Input: `[5,4,5,1,1,null,5]`  
Output: `2`  
*Explanation: The path is: 5 → 5 → 5. There are 2 edges between these three nodes.*

```
    5
   / \
  4   5
 / \   \
1   1   5
```

**Example 2:**  
Input: `[1,4,5,4,4,null,5]`  
Output: `2`  
*Explanation: The path is: 4 → 4 → 4. There are 2 edges between these three nodes.*

```
    1
   / \
  4   5
 / \   \
4   4   5
```

**Example 3:**  
Input: `[1]`  
Output: `0`  
*Explanation: A single node does not form any path (edges), so the answer is 0.*

```
1
```

### Thought Process (as if you’re the interviewee)  
- First, try to brute-force all paths in the tree and check if nodes along each path have the same value, returning the maximum length found. But generating all possible paths is very inefficient for large trees.
- Since a *path* can start and end at any node, observe that each node may act as a "pivot"—the longest univalue path can either pass through the node (as a center) or lie entirely in one of its subtrees.
- A recursive approach is ideal: for each node, determine the longest path in the left and right subtrees with the same value as the current node. If a child has a value matching the node, increment the path length; otherwise, the path "breaks".
- At each node, the sum of the longest left and right univalue paths (with the same value as the node) gives the result if the path passes through that node.
- Use a DFS/post-order traversal to ensure children are fully processed before updating the parent's path. Maintain a global variable to update the answer[1][2][5]. Trade-offs: O(n) time is best possible since all nodes must be visited.

### Corner cases to consider  
- Empty tree (root is None)
- Tree with only one node
- All nodes have distinct values (no valid univalue edges)
- All nodes have the same value (entire tree forms one long path)
- Highly unbalanced trees (one-sided chains)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestUnivaluePath(self, root: TreeNode) -> int:
        self.max_length = 0

        def dfs(node):
            if not node:
                return 0
            left_len = dfs(node.left)
            right_len = dfs(node.right)

            left_arrow = right_arrow = 0

            # Only extend the path if child exists and has the same value
            if node.left and node.left.val == node.val:
                left_arrow = left_len + 1
            if node.right and node.right.val == node.val:
                right_arrow = right_len + 1

            # Update max_length considering both directions at current node
            self.max_length = max(self.max_length, left_arrow + right_arrow)
            # Return the longer one to parent (cannot go left and right simultaneously)
            return max(left_arrow, right_arrow)

        dfs(root)
        return self.max_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each node is visited exactly once in the DFS.
- **Space Complexity:** O(h), where h is the tree height (due to recursion stack). In the worst case (skewed tree), h = n; in a balanced tree, h = log n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep?  
  *Hint: Could recursion depth cause stack overflow? How would you avoid it?*

- Can you output the actual path, not just the length?  
  *Hint: Trace the path as you recurse, and track nodes with the same value.*

- What if you want the answer for all possible values, i.e., the longest path for each unique value in the tree?  
  *Hint: Use a hash map where key = value and value = max path seen so far for that node value.*

### Summary
The approach uses post-order DFS and tracks the longest path with consecutive, identical node values, updating a global maximum. It's a classic example of the *"tree dynamic programming / bottom-up DFS"* pattern, commonly used for subtree or path-based computations in trees. This recursive method is both efficient and easy to generalize to similar path problems on trees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Maximum Path Sum(binary-tree-maximum-path-sum) (Hard)
- Count Univalue Subtrees(count-univalue-subtrees) (Medium)
- Path Sum III(path-sum-iii) (Medium)
- Longest Path With Different Adjacent Characters(longest-path-with-different-adjacent-characters) (Hard)