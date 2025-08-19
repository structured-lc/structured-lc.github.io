### Leetcode 1469 (Easy): Find All The Lonely Nodes [Practice](https://leetcode.com/problems/find-all-the-lonely-nodes)

### Description  
Given the root of a binary tree, return an array containing the values of all **lonely nodes** in the tree (in any order). A node is lonely if it is the only child of its parent. The root is never lonely.

### Examples  
**Example 1:**  
Input: `[1,2,3,null,4]`  
Output: `[4]`  
*Explanation: Only 2's right child is missing; 4 is the only child of 2, so it's lonely.*

Tree:
```
    1
   / \
  2   3
   \
    4
```

**Example 2:**  
Input: `[7,1,4,6,null,5,3,null,null,null,null,null,2]`  
Output: `[6,2]`  
*Explanation: 6 is the only left child of 1, and 2 is the only right child of 5. Both are lonely.*

Tree:
```
        7
      /   \
     1     4
    /     / \
   6     5   3
              \
               2
```

**Example 3:**  
Input: `[1,null,2,3,null,4]`  
Output: `[2,3,4]`  
*Explanation: Each node in the right chain except the root is the only child of its parent.*

Tree:
```
    1
     \
      2
     /
    3
     \
      4
```

### Thought Process (as if you’re the interviewee)  
The lonely node is defined as a single child of its parent. Thus, for every non-root node, if its parent only has it as a child (i.e., parent.left == None XOR parent.right == None), it's lonely.

A brute-force solution: At every parent, if only one child exists, add its value to the result. Traverse the tree (DFS or BFS), checking each node's children.

Optimized: Use DFS (recursive or stack) from root, for every node, if one child exists, add that child to the lonely list, and recurse.

### Corner cases to consider  
- Only root node (no output)
- All nodes have two children (no lonely nodes)
- Skewed tree (all left or all right)
- Tree with one lonely node

### Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def find_lonely_nodes(root):
    lonely = []

    def dfs(node):
        if not node:
            return
        if node.left and not node.right:
            lonely.append(node.left.val)
        if node.right and not node.left:
            lonely.append(node.right.val)
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return lonely
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once.
- **Space Complexity:** O(h), h is the height of the tree (recursion stack).

### Potential follow-up questions (as if you’re the interviewer)  

- (Can you do it iteratively?)  
  *Hint: Use a queue for BFS, or a stack for explicit DFS.*

- (What if the tree is very large/deep?)  
  *Hint: Tail recursion or iterative to avoid recursion stack overflow.*

- (Return the output sorted?)  
  *Hint: Just call sorted() on the result before returning.*

### Summary
The problem fits the tree traversal (DFS/BFS) pattern. Recognizing tree parent-child relationships and checking for existence of a single child is a classic binary tree interview pattern. Variations frequently occur in tree path, sibling, or relationship questions.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Tilt(binary-tree-tilt) (Easy)
- Univalued Binary Tree(univalued-binary-tree) (Easy)