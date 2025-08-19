### Leetcode 1080 (Medium): Insufficient Nodes in Root to Leaf Paths [Practice](https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths)

### Description  
Given a **binary tree** and an integer **limit**, remove all nodes that are “insufficient”.  
A node is **insufficient** if **every** root-to-leaf path passing through that node has a sum **strictly less** than limit. After deleting such nodes, the resulting tree should only contain sufficient nodes.  
Return the root of the pruned tree (which might be `None`).  
It is guaranteed that the answer is unique.

_(In other words: You must prune nodes layer by layer if you discover that, after pruning children, the parent now only leads to insufficient paths and should itself be pruned as well.)_

### Examples  

**Example 1:**  
Input:  
Tree:  
```
      1
     / \
    2   3
   /   / \
  4   5   6
```
limit = 8  
Output:  
```
   1
    \
     3
    /
   5
```
Explanation:  
- Path 1→2→4: sum=7 < 8 → insufficient  
- Path 1→3→5: sum=9 ≥ 8 → sufficient  
- Path 1→3→6: sum=10 ≥ 8 → sufficient  
- Node 2 and 4 are removed since every path through them is insufficient.  

**Example 2:**  
Input:  
Tree:  
```
           5
          / \
        4    8
       /    / \
      11   13  4
     /  \        \
    7    1        1
```
limit = 22  
Output:  
```
      5
     / \
   4    8
  /    / 
11    13
/  
7 
```
Explanation:  
- Only 5→4→11→7 = 27 ≥ 22, and 5→8→13 = 26 ≥ 22 are sufficient.  
- The "1" and "4→1" parts are removed.  

**Example 3:**  
Input:  
Tree: `[]` (empty)  
limit = 1  
Output:  
`[]`  
Explanation:  
Empty input yields an empty output.  

### Thought Process (as if you’re the interviewee)  
First, observe that a node is insufficient **only if all root-to-leaf paths through that node** sum to less than the limit.  
- The brute-force way would be to gather all root-to-leaf paths, but that would be highly inefficient.
- Instead, a **post-order DFS** is best:  
  - For each node, recursively prune its children before itself.
  - For each leaf, check if accumulated sum is sufficient (otherwise, prune).
  - For internal nodes, if both left and right are pruned, prune the node as well.

Key realization: At each step, _subtract the current node's value from the required limit_ and recursively continue down the children. This way, by the time you reach a leaf, you know what sum still needs to be met.

This leads to a recursive solution that is:
- Simple (no tracking path arrays).
- Efficient (O(n)), as every node is visited once.

### Corner cases to consider  
- The root gets pruned (entire tree pruned away).
- All nodes are sufficient (tree remains unchanged).
- Limit is negative or zero.
- Only one branch is sufficient.
- Deep trees with negative values.
- Only one node (root), check if it’s sufficient.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sufficientSubset(self, root: TreeNode, limit: int) -> TreeNode:
        # Helper function with recursive pruning
        def dfs(node, accLimit):
            if not node:
                return None
            # If leaf, check if the path sum including this node meets the requirement
            if not node.left and not node.right:
                return node if node.val >= accLimit else None
            # Update remaining limit for children: subtract this node's value
            node.left = dfs(node.left, accLimit - node.val)
            node.right = dfs(node.right, accLimit - node.val)
            # If both children are pruned, node is also pruned
            if not node.left and not node.right:
                return None
            return node
        return dfs(root, limit)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes in the tree. Each node is visited exactly once.
- **Space Complexity:** O(h), where h = height of the tree, due to recursion stack. For balanced trees h ≈ log₂n, for skewed trees h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this if you also wanted to return the number of nodes pruned?
  *Hint: Use a helper return value or an accumulator variable.*

- Can you do this non-recursively (iterative solution)?
  *Hint: Use explicit stack for post-order DFS.*

- How does the solution change if node values can be negative?
  *Hint: The recursive logic still works, but test with both negative and positive values to ensure correctness.*

### Summary
This problem demonstrates a classic **post-order traversal with pruning**. At each node, you decide whether to keep or remove it based on the results from its children. No need to build explicit path lists; updating “remaining limit” in recursion suffices.  
This pattern is common for tree pruning problems where child existence determines parent’s fate, and can be generalized to solve other conditional-tree-trimming challenges.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Count Nodes Equal to Average of Subtree(count-nodes-equal-to-average-of-subtree) (Medium)