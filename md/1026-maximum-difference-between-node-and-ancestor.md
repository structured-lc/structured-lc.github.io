### Leetcode 1026 (Medium): Maximum Difference Between Node and Ancestor [Practice](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor)

### Description  
Given the root of a binary tree, find the maximum value V for which there exist different nodes A and B such that V = |A.val - B.val| and A is an ancestor of B.  
In other words, for every ancestor–descendant node pair, compute the absolute difference of their values, and return the largest such value.  
A node is considered an ancestor of another if it is higher up in the tree (could be its parent, grandparent, etc.).  

### Examples  

**Example 1:**  
Input: `[8,3,10,1,6,null,14,null,null,4,7,13]`  
Output: `7`  
Explanation: |8 - 1| = 7 is the largest ancestor–descendant difference.  
Tree:
```
        8
      /   \
     3    10
    / \     \
   1   6     14
      / \    /
     4   7  13
```
The possible differences include:  
|8 - 3|=5, |3 - 7|=4, |8 - 1|=7, |10 - 13|=3, etc.

**Example 2:**  
Input: `[1,null,2,null,0,3]`  
Output: `3`  
Explanation:  
Tree:
```
    1
     \
      2
     / \
    0   3
```
Possible differences: |1-0|=1, |2-0|=2, |2-3|=1, |1-3|=2, |1-2|=1, |3-0|=3

**Example 3:**  
Input: `[4,2,6,1,3,5,7]`  
Output: `3`  
Explanation:  
Tree:
```
      4
     / \
    2   6
   / \  / \
  1  3 5   7
```
Maximum difference is |4 - 1| = 3 or |4 - 7| = 3.

### Thought Process (as if you’re the interviewee)  
First, observe that any pair of ancestor and descendant nodes could potentially provide the maximum difference.  
A brute-force idea involves, for each node, traversing all its descendants, computing the difference, and tracking the max. But this would be O(n²), which is inefficient for large trees.  

A better idea is to realize that for each path from root down to a leaf, the difference between the maximum and minimum values seen along the path gives the largest ancestor–descendant differences for that part of the tree.  
So, use DFS (depth-first search) traversal, carrying along the current min and max value from ancestors for each recursive call.  
At each node:  
- Update the min and max values to include the node’s value.
- At leaves (or every node), compute max difference as max - min.
- Return the overall largest difference found.  

This uses O(n) time and O(h) space (where h is tree height, for the recursion stack).

### Corner cases to consider  
- Empty tree (root is None): should return 0.
- Tree has only one node: no ancestor–descendant pairs, so 0.
- All nodes have same value: max diff is 0.
- Highly unbalanced tree (like a linked list).
- Negative values in tree.
- Minimum/maximum values at root or at leaves.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def maxAncestorDiff(root):
    # Helper function to do DFS traversal.
    # Carries min_val and max_val along the path.
    def dfs(node, min_val, max_val):
        if not node:
            # Base case: return the difference seen on that path
            return max_val - min_val
        
        # Update the current path's min and max with this node's value
        min_val = min(min_val, node.val)
        max_val = max(max_val, node.val)

        # Continue DFS left and right
        left = dfs(node.left, min_val, max_val)
        right = dfs(node.right, min_val, max_val)

        # The max of the two subtrees
        return max(left, right)
    
    if not root:
        return 0
    return dfs(root, root.val, root.val)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once, and all operations at each step are O(1).

- **Space Complexity:** O(h)  
  Where h is the height of the tree — due to recursion stack (O(log n) for balanced, O(n) for skewed).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you do it iteratively (without recursion)?  
  *Hint: Use an explicit stack to simulate DFS traversal while tracking min and max.*

- What if the tree is very deep (skewed and recursion stack may cause overflow)?  
  *Hint: Iterative approach, or tail recursion optimization if language supports.*

- If you had to return not just the value but also the actual pair of nodes, what would you change?  
  *Hint: Track and store the nodes when the new max is found.*

### Summary
This is a classic recursive DFS problem where you carry state along the path (min and max values from ancestor nodes) to determine the answer at each position. The "carry state through recursion" or "backtracking with path state" pattern is common in binary tree ancestor/descendant or path problems, such as path sum, path min/max, or finding paths with specific properties. This approach avoids unnecessary recomputation and makes it efficient for large trees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
