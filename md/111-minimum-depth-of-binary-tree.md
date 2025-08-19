### Leetcode 111 (Easy): Minimum Depth of Binary Tree [Practice](https://leetcode.com/problems/minimum-depth-of-binary-tree)

### Description  
Given a **binary tree**, return its **minimum depth**. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.  
A **leaf** is a node with no children.  
In other words, starting from the root, what's the minimum number of nodes you'd encounter before hitting any leaf node in the tree?

### Examples  

**Example 1:**  
Input: `[3,9,20,null,null,15,7]`  
Output: `2`  
*Explanation: The tree looks like  
```
    3
   / \
  9  20
     / \
    15  7
```
Leaf nodes are 9, 15, 7. The shortest path is: 3 → 9 (length 2), so minimum depth is 2.*

**Example 2:**  
Input: `[2,null,3,null,4,null,5,null,6]`  
Output: `5`  
*Explanation: The tree is  
```
    2
     \
      3
       \
        4
         \
          5
           \
            6
```
The only path is down the right; the minimum depth is 5 (2 → 3 → 4 → 5 → 6).*

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation: Empty tree, so minimum depth is 0.*  

### Thought Process (as if you’re the interviewee)  
Start by noticing what “minimum depth” means: the number of nodes in the shortest path from root to any **leaf**.  
- A **brute-force** approach could do a DFS from the root and track the depth at each leaf, finally picking the minimum.
- **Recursion** is a natural fit—at each node, if it's `null`, depth is 0. If both left and right are present, take the min of both sides. If only one child is present, the path must go down that child.
- **BFS** could also be used, since the first leaf node hit during level-order traversal will be at minimum depth.
- I'll choose **recursion**: it cleanly models the tree, and is simple to code.  
- Watch out: If one subtree is missing (`null`), only consider the non-null side (since a missing child doesn't terminate a path!).

### Corner cases to consider  
- Tree is empty (`root` is `None`).
- Tree has only one node (root is a leaf).
- The tree is unbalanced, e.g., all left children or all right children.
- A node has only one child (must make sure not to take a `min()` with `0`).
- Large, skewed trees (performance/stack depth).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def minDepth(root):
    # If root is None, the tree is empty, so depth = 0
    if not root:
        return 0
    
    # If left is None, recurse only right
    if not root.left:
        return minDepth(root.right) + 1
    
    # If right is None, recurse only left
    if not root.right:
        return minDepth(root.left) + 1
    
    # If both left and right exist, take the minimum of both
    return min(minDepth(root.left), minDepth(root.right)) + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Every node is visited once in the worst case.
- **Space Complexity:** O(h), where h is the height of the tree (because of the recursion stack). In the worst case (completely unbalanced), h ≈ n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this using an **iterative approach**?
  *Hint: Use BFS, and return as soon as you hit a leaf node in level-order traversal.*
- What if the tree is very deep and you encounter **stack overflow**?
  *Hint: Use an iterative approach to avoid recursion stack depth issues.*
- How would you handle it if tree nodes had **parent pointers** or were **n-ary** trees?
  *Hint: Generalize the approach, adjust leaf node identification and traversal logic.*

### Summary
This problem uses a classic **DFS/recursion on trees** pattern. The important detail is to handle missing children carefully—if a child is missing, avoid taking `min()` with 0.  
It's a common template that applies to many tree-video problems, e.g., computing maximum depth, balanced tree checks, etc.  
A BFS/level-order solution also works, and is sometimes preferred for very broad or deep trees to avoid recursion limits.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Level Order Traversal(binary-tree-level-order-traversal) (Medium)
- Maximum Depth of Binary Tree(maximum-depth-of-binary-tree) (Easy)