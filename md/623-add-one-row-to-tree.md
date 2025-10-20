### Leetcode 623 (Medium): Add One Row to Tree [Practice](https://leetcode.com/problems/add-one-row-to-tree)

### Description  
Given the root of a binary tree, and two integers `val` and `depth`, insert a new row of nodes with value `val` at the given `depth`.

- The root node is considered at depth 1.
- If `depth == 1`, create a new root with value `val`; the original root becomes its left child.
- Otherwise, at every node at depth `depth - 1`, add a new left child and/or right child with value `val`.  
  - The new left child becomes the parent of the original left child.
  - The new right child becomes the parent of the original right child.

This inserts a new row of `val`-valued nodes at the specified depth, pushing the original tree's nodes at that depth one level lower.

### Examples  

**Example 1:**  
Input: `root = [4,2,6,3,1,5], val = 1, depth = 2`  
Output: `[4,1,1,2,null,null,6,3,1,5]`  
*Explanation: Insert a row of 1s at depth 2. Node 2 and 6 become the left and right children of the left and right new nodes, respectively.*

```
Given Tree:
    4
   / \
  2   6
 / \  /
3  1 5

Result:
    4
   / \
  1   1
 /     \
2       6
/ \     /
3  1   5
```

**Example 2:**  
Input: `root = [4,2,null,3,1], val = 1, depth = 3`  
Output: `[4,2,null,3,1,1,null,null,1]`  
*Explanation: Add new row at depth 3 beneath 2; both left and right children at depth 3 become 1s.*

```
Given Tree:
    4
   /
  2
 / \
3   1

Result:
    4
   /
  2
 / \
1   1
/     \
3       1
```

**Example 3:**  
Input: `root = [1], val = 2, depth = 1`  
Output: `[2,1]`  
*Explanation: New root 2, original root 1 becomes left child.*

```
Given Tree:
  1

Result:
  2
 /
1
```

### Thought Process (as if you’re the interviewee)  

The problem is about inserting nodes at a specific depth. The first naive idea is to traverse the tree to `depth - 1` and, at each such node, insert new children with the target value and rewire the original subtrees below. The standard approaches for tree traversal work here: recursion (DFS) or iteration (BFS).

- **Brute-force:** Reconstruct the entire tree, copying nodes and inserting new nodes at the right levels. This is wasteful and unnecessary since we can modify in place.
- **Optimized approach:** Use DFS to reach all nodes at `depth - 1`. For each, insert a new left/right node with value `val`, and re-attach their original left/right children as children of the new nodes.  
- Special case: If `depth == 1`, simply create a new root.

I’d choose recursion for clarity, as tree problems are naturally expressed recursively. However, BFS (level-order) iteration is also possible, and may avoid deep recursion stack in very deep unbalanced trees. Trade-off: BFS uses a queue but recursion is more concise.

### Corner cases to consider  
- If `depth == 1`, must create a new root node and attach the original tree as its left child.
- Nodes that don’t have left or right children (i.e., `None`) at `depth - 1` — you still create a new node, just with no children attached.
- Completely empty tree (`root is None`) — if depth is 1, should return new node; for depth > 1, nothing needs to be done.
- Tree with only one node.
- Unbalanced trees — must not assume a perfect or complete binary tree.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def addOneRow(root, val, depth):
    # Special case: new row at root
    if depth == 1:
        new_root = TreeNode(val)
        new_root.left = root
        return new_root

    # Helper function: DFS with level tracking
    def dfs(node, cur_depth):
        if not node:
            return
        if cur_depth == depth - 1:
            # Insert new nodes with value 'val'
            old_left = node.left
            old_right = node.right
            node.left = TreeNode(val)
            node.right = TreeNode(val)
            node.left.left = old_left
            node.right.right = old_right
        else:
            dfs(node.left, cur_depth + 1)
            dfs(node.right, cur_depth + 1)
    dfs(root, 1)
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the tree. Every node is visited once in the DFS/BFS traversal.
- **Space Complexity:** O(h), where h is the height of the tree for the recursion stack. In the worst case (completely unbalanced tree), it becomes O(n). No extra data structures besides call stack are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very unbalanced (e.g., a skewed linked list)? Can you avoid stack overflow?
  *Hint: Use iterative BFS instead of recursion to avoid deep stacks.*

- How would you handle adding a row at depth that exceeds the height of the tree?
  *Hint: You should still create new nodes at the correct places, even if parent is a leaf.*

- Can you implement this with BFS instead of DFS? What changes?
  *Hint: Use a queue to visit each node by level, adding new children when you reach depth - 1.*

### Summary

This problem uses the **DFS with level tracking** pattern, a common technique for modifying tree structures at certain depths. The key idea is to find all nodes at the level just above where you want to insert new nodes, then splice in new nodes and rewire pointers accordingly. Variations of this pattern appear in various tree manipulation, serialization, or subtree cloning problems. Both recursive and iterative solutions are possible; the core insight is to re-link subtrees correctly to preserve structure.


### Flashcard
Traverse to depth-1, insert new nodes with given value as left/right children, and reattach original subtrees below.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
