### Leetcode 968 (Hard): Binary Tree Cameras [Practice](https://leetcode.com/problems/binary-tree-cameras)

### Description  
Given a binary tree, place cameras on some of the tree's nodes so that every node is monitored.  
Each camera can monitor its parent, itself, and its immediate children.  
Determine the **minimum number of cameras** needed to ensure **every node** in the binary tree is under surveillance.  
The tree is defined with its `root` node.

### Examples  

**Example 1:**  
Input: `root = [0,0,null,0,0]`  
Output: `1`  
*Explanation: Placing a camera at node index 1 covers the entire tree.*

```
    0
   /
  0
   \
    0
   /
  0
```

**Example 2:**  
Input: `root = [0,0,null,0,null,0,null,null,0]`  
Output: `2`  
*Explanation: One camera at node index 1 (covers left subtree), and one at node index 4 (covers right leaf).*

```
    0
   /
  0
   \
    0
     \
      0
     /
    0
```

**Example 3:**  
Input: `root = `  
Output: `1`  
*Explanation: The tree has only one node, so one camera is needed.*

```
0
```

### Thought Process (as if you’re the interviewee)  
My first thought is to try placing cameras greedily at every node, but that's obviously not optimal, especially for large or skewed trees—placing cameras at leaf nodes is wasteful since they can't monitor anything below them.

Instead, it's better to **cover the tree from the leaf level moving upwards.**  
If a node is a leaf, we prefer to place the camera at its parent rather than the leaf itself; this covers more nodes.  
So, I think of using a **bottom-up post-order DFS.**  
At each node, we decide:

- If either child needs to be covered, we place a camera here.
- If any child has a camera, this node is already covered.
- If both children are covered but none has a camera, this node is *not* covered and should signal to its parent that it needs coverage.

This approach is locally optimal (“greedy”) and global-optimal due to tree structure symmetry. It efficiently avoids duplicating coverage.

### Corner cases to consider  
- Empty tree (root is None).
- Single node tree.
- Complete binary tree.
- Skewed trees (all nodes to the left or right).
- Deep tree with several leaves not on the same level.
- Nodes having only one child (left or right).
- Largest allowed tree (performance).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    # State codes:
    # 0 = node needs to be covered
    # 1 = node has a camera
    # 2 = node is covered

    def minCameraCover(self, root: TreeNode) -> int:
        self.cameras = 0

        def dfs(node):
            if not node:
                # Null nodes are "covered" by default, do not need cameras
                return 2

            left = dfs(node.left)
            right = dfs(node.right)

            # If any child needs coverage, place a camera here
            if left == 0 or right == 0:
                self.cameras += 1
                return 1

            # If a child has a camera, this node is covered
            if left == 1 or right == 1:
                return 2

            # If children are covered but have no camera, this node needs coverage
            return 0

        # If after DFS the root needs coverage, add a camera at the root
        if dfs(root) == 0:
            self.cameras += 1

        return self.cameras
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of nodes. Each node is visited exactly once.
- **Space Complexity:** O(H), where H = height of the tree (recursion stack).  
  In the worst-case (skewed tree), this is O(N); for a balanced tree, O(log N).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if each camera costs differently at each node?  
  *Hint: This reduces to DP with cost minimization at each node, considering alternative placements.*

- What if each camera had a limited range (not just immediate parent/child)?  
  *Hint: You’ll have to expand the covered nodes logic, probably use BFS for k-distance coverage.*

- Can you modify the algorithm to return the actual placement of cameras?  
  *Hint: Track camera placement in a list during DFS and return it.*

### Summary
This problem uses the **post-order DFS** and a **greedy bottom-up strategy** to minimize resource placement in a tree.  
The pattern appears often in covering problems, guard placements, sensor coverage, or dynamic programming on trees.  
Key insight: *maximize coverage per camera placement* and process leaf-to-root. Very efficient for hierarchical resource allocation and tree-based DP.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Distribute Coins in Binary Tree(distribute-coins-in-binary-tree) (Medium)
- Choose Edges to Maximize Score in a Tree(choose-edges-to-maximize-score-in-a-tree) (Medium)