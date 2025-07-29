### Leetcode 1516 (Hard): Move Sub-Tree of N-Ary Tree [Practice](https://leetcode.com/problems/move-sub-tree-of-n-ary-tree)

### Description  
Given the root of an N-ary tree and two nodes, p and q, you need to move the subtree rooted at node p to become a direct child of node q. If q is a descendant of p, p's original parent should directly connect to q instead, swapping their roles. The tree is guaranteed not to have cycles before or after.

Return the new root after this modification.

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4], p = 2, q = 3`  
Output: `[1,3,2,4]`  
*Explanation: Move subtree rooted at 2 under 3. Tree before:*
```
   1
 / | \
2  3 4
```
*Tree after:*
```
   1
  / \
 3   4
 |
 2
```

**Example 2:**  
Input: `root = [1,2,null,3], p=2, q=3`  
Output: `[1,3,2]`  
*Explanation: Move subtree of 2 as child of 3.*

**Example 3:**  
Input: `root = [1,2,3], p=3, q=2`  
Output: `[1,2,3]`
*Explanation: Now 3 is attached under 2.*

### Thought Process (as if you’re the interviewee)  
First, understand parent–child relationships in the N-ary tree. We need to:
- Remove p from its current parent
- Attach p as a child of q

Special case: if q is a descendant of p, exchanging roles avoids a cycle. Otherwise, it's a standard subtree move. Traverse the tree to record parent pointers, find p and q, and update references.

If p is a root, after moving, root only changes if we swap (when q is in p's subtree). Otherwise, the structure is preserved.

Trade-off: Careful traversal is necessary to detect the ancestor-descendant relation and update parents correctly.

### Corner cases to consider  
- p is the root
- q is a direct child/grandchild of p (descendant)
- p and q are siblings
- p and q are the same node (should not happen by constraints)

### Solution

```python
from typing import List, Optional

class Node:
    def __init__(self, val):
        self.val = val
        self.children = []

def moveSubTree(root: 'Node', p: 'Node', q: 'Node') -> 'Node':
    parent_map = {}
    def dfs(node, parent=None):
        if node:
            parent_map[node] = parent
            for child in node.children:
                dfs(child, node)
    dfs(root)

    # Check if q is descendant of p
    cur = q
    is_descendant = False
    while cur:
        if cur == p:
            is_descendant = True
            break
        cur = parent_map[cur]

    if not is_descendant:
        # Remove p from its parent
        parent_p = parent_map[p]
        if parent_p:
            parent_p.children.remove(p)
        # Add p as q's child
        q.children.append(p)
        return root
    else:
        # Case: q is in p's subtree
        # Remove q from its parent
        parent_q = parent_map[q]
        if parent_q:
            parent_q.children.remove(q)
        # Add q as child of p's parent
        parent_p = parent_map[p]
        if parent_p:
            parent_p.children.remove(p)
            parent_p.children.append(q)
        # Now, add p as child of q
        q.children.append(p)
        if parent_p:
            return root
        else:
            return q
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), because we traverse the tree once to build parent mapping, plus a few O(h) operations.
- **Space Complexity:** O(n), for parent map storing one entry per node.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the tree was binary and nodes had pointers to parents?  
  *Hint: The parent lookup becomes O(1), simplifying move operations.*

- How would you handle multiple subtree moves efficiently?  
  *Hint: Build and modify the parent/children relationships in bulk.*

- How to print or serialize the N-ary tree post-move?  
  *Hint: Use preorder traversal serialization or level-order flat list.*

### Summary
The main idea is to maintain parent pointers with a traversal, then update child lists according to the problem scenario (depending on whether p and q are in ancestor/descendant relationship). Tree manipulation and ancestor checks are common interview themes, often using traversal and intermediate mappings for flexibility.