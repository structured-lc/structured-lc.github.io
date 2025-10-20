### Leetcode 993 (Easy): Cousins in Binary Tree [Practice](https://leetcode.com/problems/cousins-in-binary-tree)

### Description  
Given the root of a binary tree with **unique values** and two distinct integers `x` and `y`, determine whether the nodes with those values are **cousins**.  
In a binary tree, two nodes are called cousins if:
- They are at the **same depth** (i.e., same level in the tree).
- They have **different parents**.

The root node has a depth of 0. The children of a node at depth k have depth k+1.

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4], x = 4, y = 3`  
Output: `false`  
*Explanation: Node 4 is at depth 2, 3 is at depth 1. Different depths, so not cousins.*  
Tree:  
```
    1
   / \
  2   3
 /
4
[1,2,3,4]
```

**Example 2:**  
Input: `root = [1,2,3,null,4,null,5], x = 5, y = 4`  
Output: `true`  
*Explanation: Both 4 and 5 are at depth 2, but have different parents (2 and 3).*  
Tree:  
```
    1
   / \
  2   3
   \     \
    4     5
[1,2,3,null,4,null,5]
```

**Example 3:**  
Input: `root = [1,2,3,null,4], x = 2, y = 3`  
Output: `false`  
*Explanation: 2 and 3 have the same parent (1), so they are siblings, not cousins.*  
Tree:  
```
  1
 / \
2   3
  \
   4
[1,2,3,null,4]
```

### Thought Process (as if you’re the interviewee)  
First, let's clarify what it means for two nodes to be cousins:
- They should be at the same depth.
- They shouldn’t have the same parent.

**Brute Force Approach:**  
Find both nodes, keep track of each node’s depth and parent. You can do this with two recursive searches—one for x and one for y.  
But this could traverse the tree multiple times; not optimal.

**Better Approach:**  
Use a **single traversal** and traverse the tree either using BFS (level order) or DFS.  
During traversal, capture for both x and y:
- Depth
- Parent node

After traversal, check for:
- Equal depth
- Different parents

Both DFS and BFS are viable.  
- **DFS** is intuitive for maintaining depth and parent info directly.
- **BFS** naturally processes nodes level by level, so finding x and y in the same queue pass ensures they’re at the same depth.

I’ll proceed with **DFS recursive solution** to simplify tracking parent and depth for both nodes.

### Corner cases to consider  
- Tree only has the root, or less than three nodes.
- x or y is not present (though problem says both always exist).
- x and y are direct siblings (must not be classified as cousins).
- x and y are at different depths.
- The tree is skewed (left-leaning or right-leaning).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def isCousins(root, x, y):
    # Helper: traverse tree and record parent and depth for x and y
    def dfs(node, parent, depth):
        if not node:
            return
        if node.val == x:
            infos['x'] = (parent, depth)
        if node.val == y:
            infos['y'] = (parent, depth)
        dfs(node.left, node, depth+1)
        dfs(node.right, node, depth+1)

    infos = {'x': None, 'y': None}
    dfs(root, None, 0)
    x_parent, x_depth = infos['x']
    y_parent, y_depth = infos['y']
    return (x_depth == y_depth) and (x_parent != y_parent)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Every node is visited once.
- **Space Complexity:** O(h) — For DFS, h is the height of the tree (recursion stack). In the worst case (unbalanced), can be O(n). For balanced tree, O(log n).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve this using **BFS or iterative traversal**?
  *Hint: Try processing the tree level by level, tracking parents for each node each level.*

- What if you had multiple queries for different x, y pairs on the same tree?
  *Hint: Preprocessing step to record all node parents and depths.*

- How would you extend this to check if more than two nodes are all cousins?
  *Hint: Check if all nodes are at the same depth and all have different parents.*

### Summary
This problem uses the **"root-to-node information gathering"** pattern common in tree problems: collect metadata (depth and parent) for targets during traversal, then compare.  
Both **DFS** and **BFS** approaches apply, but the key is single-pass metadata collection for efficient cousin verification. This pattern appears in problems involving finding relatives or relationships in trees (e.g., siblings, ancestors, distances).


### Flashcard
Use BFS or DFS to find both nodes’ depth and parent in one traversal; nodes are cousins if depths match and parents differ.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Level Order Traversal(binary-tree-level-order-traversal) (Medium)
- Cousins in Binary Tree II(cousins-in-binary-tree-ii) (Medium)