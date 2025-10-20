### Leetcode 1740 (Medium): Find Distance in a Binary Tree [Practice](https://leetcode.com/problems/find-distance-in-a-binary-tree)

### Description  
Given the root of a binary tree and two integers `p` and `q`, return the **distance between the nodes with value `p` and value `q`**.  
The **distance** is defined as the number of edges in the shortest path between the two nodes.

#### For example:  
Given binary tree:  
```
        3
      /   \
     5     1
    / \   / \
   6   2 0   8
      / \
     7   4
```
List representation: [3,5,1,6,2,0,8,null,null,7,4]

### Examples  

**Example 1:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 0`  
Output: `3`  
Explanation:  
There are three edges between 5 and 0:  
5–3–1–0

**Example 2:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 7`  
Output: `2`  
Explanation:  
There are two edges between 5 and 7:  
5–2–7

**Example 3:**  
Input: `root = [3,5,1,6,2,0,8,null,null,7,4]`, `p = 5`, `q = 5`  
Output: `0`  
Explanation:  
The distance between a node and itself is always 0.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each node, find the path from the root to `p` and `q`, then compare the paths to find their last common ancestor (LCA). The distance will be:  
  (distance from root to `p`) + (distance from root to `q`) − 2 × (distance from root to LCA).

- **Optimized idea:**  
  - First, find the lowest common ancestor (LCA) of `p` and `q` in the tree.
  - Then, compute the distance from LCA to `p` and from LCA to `q` separately.
  - The total distance is the sum of these two distances.

  **Why?** This approach only does at most two traversals, is much more efficient, and follows standard patterns for binary tree distance problems.

  **Trade-offs:**  
  - Brute force is easier to code, but has unnecessary repeated traversals and can be slow for large trees.
  - LCA-based algorithm leverages classic tree recursion and is much faster.

### Corner cases to consider  
- The tree contains only one node.
- `p` == `q` (distance is 0).
- `p` and `q` are at opposite sides of the tree (max distance).
- The tree is skewed (all nodes on one side).
- Very large, unbalanced tree.
- Values for `p` and `q` are not present (according to constraints, this cannot happen).
- One of `p` or `q` is the root.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findDistance(root: TreeNode, p: int, q: int) -> int:
    # Helper to find the Lowest Common Ancestor (LCA) of nodes with value p and q
    def lca(node):
        if not node or node.val == p or node.val == q:
            return node
        left = lca(node.left)
        right = lca(node.right)
        if left and right:
            return node
        return left or right

    # Helper to find the distance from given node to target value
    def distance_from(node, target):
        if not node:
            return -1
        if node.val == target:
            return 0
        left = distance_from(node.left, target)
        if left != -1:
            return left + 1
        right = distance_from(node.right, target)
        if right != -1:
            return right + 1
        return -1

    ancestor = lca(root)
    dist_p = distance_from(ancestor, p)
    dist_q = distance_from(ancestor, q)
    return dist_p + dist_q
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), where n is the number of nodes.  
  Both the LCA finding and the two distance searches cost O(n) each in the worst case, but constant factors are small since subproblems are pruned early.

- **Space Complexity:**  
  O(h), where h is the height of the tree (recursion stack). No additional major data structures are used; just recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree node structure doesn't guarantee unique values?
  *Hint: You would need to compare by node identity, not value alone—possibly traverse to get the node objects first.*

- Can this be improved for multiple queries on the same tree?
  *Hint: Preprocessing with parent pointers, or building depth and ancestor tables for O(1) LCA queries.*

- How would you adapt the solution for an N-ary tree?
  *Hint: LCA and distance ideas are similar, just generalize child access and traversal.*

### Summary
This problem uses the **LCA Pattern**—find the lowest common ancestor, then add up the individual depths for each node relative to the LCA. It's a classic approach for any "distance between nodes" tasks in trees, and the same technique appears in many interval or hierarchy tree problems such as organizational charts, file directory trees, and genealogy questions.


### Flashcard
Find lowest common ancestor (LCA) of p and q; distance = depth(p) + depth(q) − 2×depth(LCA) computed via recursive tree traversal.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Step-By-Step Directions From a Binary Tree Node to Another(step-by-step-directions-from-a-binary-tree-node-to-another) (Medium)