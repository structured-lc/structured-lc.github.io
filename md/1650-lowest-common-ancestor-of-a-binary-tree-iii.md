### Leetcode 1650 (Medium): Lowest Common Ancestor of a Binary Tree III [Practice](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii)

### Description  
Given a binary tree where each node has a pointer to its parent, and given two nodes, p and q, return their **lowest common ancestor (LCA)**. The LCA is the deepest node that is an ancestor of both p and q (a node can be a descendant of itself).  
Unlike regular binary tree LCA questions, here you don’t have access to the root, but each node does have a parent pointer.

### Examples  

**Example 1:**  
Input:  
```
Tree:    3
       /   \
      5     1
     / \   / \
    6   2 0   8
       / \
      7   4
p = 5, q = 1
```
Output: `3`  
Explanation: The paths to the root for both nodes are 5→3 and 1→3, so their LCA is 3.

**Example 2:**  
Input:  
```
Tree:    3
       /   \
      5     1
     / \   / \
    6   2 0   8
       / \
      7   4
p = 5, q = 4
```
Output: `5`  
Explanation: The path for 4 is 4→2→5→3 and for 5 is 5→3. The lowest common ancestor is 5 (since a node can be a descendant of itself).

**Example 3:**  
Input:  
```
Tree:    3
       /   \
      5     1
     / \   / \
    6   2 0   8
       / \
      7   4
p = 7, q = 8
```
Output: `3`  
Explanation: The path for 7 is 7→2→5→3, for 8 is 8→1→3; they merge at 3.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Track all ancestors of node p in a set. Walk up from q, checking for the first shared ancestor in the set. This uses O(h) space, where h is tree height.

- **Optimized idea:**  
  Since we can traverse from both p and q via parent pointers, we can simulate two runners ("pointers") moving upwards simultaneously. If one hits the root, redirect it to start from the other node. This guarantees both pointers traverse equal distances, aligning them to meet at the LCA. This two-pointer technique eliminates extra space and is similar to solving the intersection of two linked lists.

- **Why pick the optimized approach:**  
  - Runs in O(h) time with O(1) space.
  - Clean, intuitive, and avoids additional data structures.
  - Works even if p and q are at different depths.

### Corner cases to consider  
- One node is the root.
- Both nodes are the same (LCA is the node itself).
- The tree is a straight line (degenerate case).
- p and q have the same parent node.
- Only two nodes in the tree, and p is parent of q or vice versa.

### Solution

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = self.parent = None

def lowestCommonAncestor(p, q):
    # Use two pointers starting at p and q
    a, b = p, q
    # Loop until they meet
    while a != b:
        # If a is not None, move up to parent; else restart from q
        a = a.parent if a else q
        # If b is not None, move up to parent; else restart from p
        b = b.parent if b else p
    # a == b is the LCA (can be None if both are None, but per constraints will not happen)
    return a
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h)  
  Each pointer can traverse up to 2×h nodes (h = height from node to root), so still O(h) overall.
- **Space Complexity:** O(1)  
  Only a constant number of pointers are used; no extra data structures are required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the nodes do not have parent pointers?  
  *Hint: Must search from root, and store paths or use recursion.*

- How would you handle if the nodes are guaranteed not to be in the same tree?  
  *Hint: Need to check for None root or terminate when traversal doesn't match.*

- If you wanted to return path from p to q, not just the LCA, how would you approach that?  
  *Hint: Trace up both paths to the LCA, store, then concatenate appropriately.*

### Summary
This problem leverages the **two-pointer technique** (common in linked list intersection problems) due to the parent pointer in each node. Recognizing that you can traverse from any node up to the root allows elegant O(1) space and O(h) time. This pattern—tracing ancestors with parent links and resetting pointers—is widely applicable in tree traversal when upward navigation is available.