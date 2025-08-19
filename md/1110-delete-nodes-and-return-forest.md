### Leetcode 1110 (Medium): Delete Nodes And Return Forest [Practice](https://leetcode.com/problems/delete-nodes-and-return-forest)

### Description  
Given the root of a binary tree (with unique values) and a list of integers `to_delete`, remove every node whose value is in `to_delete`. When a node is deleted, its children (if any) are split off as new trees. Return the roots of all the trees left after deletions—that is, the resulting forest. Order does not matter.

In summary: **Given a binary tree and some nodes to delete, cut them from the tree. The children of deleted nodes become new roots if not deleted themselves. Return all resulting tree roots.**

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4,5,6,7], to_delete = [3,5]`  
Output: `[[1,2,null,4],,]`  
*Explanation: Delete nodes 3 and 5. Their children (6,7) become new trees. Tree now splits into three parts: one with root 1 (with children 2→4), one with root 6, one with root 7.*  
Drawn tree:
```
    1
   / \
  2   .
 /   / \
4   .   .
   / \
  .   .
```

**Example 2:**  
Input: `root = [1,2,4,null,3], to_delete = [3]`  
Output: `[[1,2,4]]`  
*Explanation: Only node 3 is deleted. The rest of the tree remains intact.*  
Drawn tree:
```
  1
 /
2
 \
  4
```

**Example 3:**  
Input: `root=[1], to_delete=[1]`  
Output: `[]`  
*Explanation: The single root node is deleted, so no trees remain.*

### Thought Process (as if you’re the interviewee)  
First, we need to traverse the tree and, whenever we reach a node that's in `to_delete`, we:
- Remove it and
- Mark its children as new roots (unless they're also being deleted).
For the traversal, a post-order DFS is best, because we need to process children before the parent (in case we delete the parent and need to add its children to the forest).

Main points:
- Use a set for quick `to_delete` lookups.
- If the current node is about to be deleted, consider its children for the result.
- If the current node isn't deleted and is a root (either the original root or just cut loose), add it to the answer.
- The recursion should "return" the node unless it's to be deleted, in which case we return None so it gets unlinked from its parent.

Optimizations:
- Using DFS with `to_delete` as a set for O(1) membership checks.
- Each node is visited only once.

Trade-offs:
- There's no better than O(n) time/space possible, due to tree size.

### Corner cases to consider  
- Empty tree (root is None)
- All nodes in `to_delete` (output: [])
- None of the nodes in `to_delete` (output: [original root])
- Tree is just a root ([1]) and root is deleted
- `to_delete` is empty (no deletion)
- Tree is skewed (e.g., all left or right children)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def delNodes(root, to_delete):
    # Convert the deletion list to a set for O(1) lookup
    to_delete_set = set(to_delete)
    # Result list to collect the roots of resulting forest
    forest = []

    def dfs(node, is_root):
        if not node:
            return None

        # Determine if this node is to be deleted
        deleted = node.val in to_delete_set

        # If node is a root and is not deleted, add to forest
        if is_root and not deleted:
            forest.append(node)

        # Recursively process children;
        # If node is deleted, children are 'new roots'
        node.left = dfs(node.left, deleted)
        node.right = dfs(node.right, deleted)

        # If deleted, return None so parent disconnects this node
        return None if deleted else node

    # Initial call: root is a root
    dfs(root, True)
    return forest
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited exactly once during DFS.
- **Space Complexity:** O(n) — For storing up to n roots in the worst case (every node is deleted except one child), and O(h) for the recursion stack (where h is the tree height).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input tree can have duplicate values?
  *Hint: Would the approach change if values aren't unique?*
- Can you solve this iteratively without recursion?
  *Hint: Consider using a stack for DFS (post-order traversal).*
- How would you handle updates if new deletions come after the first deletions?
  *Hint: Can you efficiently manage repeated deletions?*

### Summary
This problem is a classic **Tree DFS (post-order)** variation: you traverse, remove nodes, and dynamically split the tree into multiple forests. The key pattern is handling deletions by returning None to disconnect nodes, and adding new roots when subtrees become detached.  
This approach is widely applicable in problems involving *dynamic tree modifications*, *forest creation*, or *on-the-fly reparenting/disconnection* during traversal.

### Tags
Array(#array), Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Count Nodes With the Highest Score(count-nodes-with-the-highest-score) (Medium)