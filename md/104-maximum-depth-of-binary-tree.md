### Leetcode 104 (Easy): Maximum Depth of Binary Tree [Practice](https://leetcode.com/problems/maximum-depth-of-binary-tree)

### Description  
Given a **binary tree** (each node has up to two children), determine its **maximum depth**—the number of nodes along the longest path from the root node down to the farthest leaf node. A leaf is a node with no children. For example, a single-node tree has a depth of 1. The task is to compute the greatest number of nodes encountered along any root-to-leaf path.

### Examples  

**Example 1:**  
Input: `[3,5,1,6,2,0,8,null,null,7,4]`  
Output: `4`  
*Explanation: The longest path is 3 → 5 → 2 → 7 or 3 → 5 → 2 → 4, each with depth 4.*

```
        3
      /   \
     5     1
    / \   / \
   6   2 0   8
      / \
     7   4
```

**Example 2:**  
Input: `[1,null,2]`  
Output: `2`  
*Explanation: The path is 1 → 2, so depth is 2.*

```
    1
     \
      2
```

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation: The tree is empty, so the depth is 0.*

### Thought Process (as if you’re the interviewee)  
- First, realize "maximum depth" means the longest path to a leaf (measured in nodes).
- A brute-force idea is to traverse every path and track the longest, but there's a simpler recursive pattern:  
    - For any given node, **the max depth is 1 + the maximum depth of its left or right subtrees**.
    - If a node is `null`, depth is 0 (base case).
- This recursive post-order approach is natural for trees.
- Alternatively, a **BFS (level-order)** strategy could work: traverse level by level and count levels.
- I’d use a recursive DFS for clarity and brevity; it’s optimal for this problem since every node needs visiting, and the call stack depth is tolerable unless the tree is extremely unbalanced.
- Time complexity is \(O(n)\), space is \(O(h)\), where \(h\) is maximum tree depth due to recursion.

### Corner cases to consider  
- Empty tree (root is `null`)
- Tree with only one node
- Skewed tree (all nodes left or all right)
- Perfectly balanced tree
- Tree with varying depths on each side

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root):
    # Base case: if tree is empty, depth is 0
    if not root:
        return 0

    # Recursively compute the depth of left and right subtrees
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)

    # Add 1 for the current node, and return the greater depth
    return 1 + max(left_depth, right_depth)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is visited once to compute its depth.

- **Space Complexity:** O(h), where h is the maximum depth  
  The call stack grows up to the height of the tree in the worst case (completely unbalanced). For a balanced tree, h ≈ log₂ n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the path (not just depth) of the deepest leaf?
  *Hint: Track the path during recursion and return the longest.*

- How could you write this iteratively (no recursion allowed)?
  *Hint: Use a stack for DFS, or queue for BFS with level counters.*

- What if tree nodes have parent pointers—could you do it without recursion or explicit stack/queue?
  *Hint: You might simulate traversal using parent pointers.*

### Summary
This problem is a classic use of the **recursive DFS/post-order traversal pattern** for trees. It demonstrates how to aggregate results up from child nodes to their parent, and consolidates the template for measuring tree depth or height. This approach is broadly useful for any "depth-like" tree calculations and can easily adapt to finding properties like tree diameter, balance, or longest path.