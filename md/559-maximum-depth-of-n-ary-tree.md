### Leetcode 559 (Easy): Maximum Depth of N-ary Tree [Practice](https://leetcode.com/problems/maximum-depth-of-n-ary-tree)

### Description  
Given an **n-ary tree** (where each node can have zero or more children), find its **maximum depth**, defined as the number of nodes along the longest path from the root down to any leaf.  
The root itself counts as depth 1. If the tree is empty (root is `None`), the depth is 0. The input tree is typically serialized as a list using level order traversal, with children of each node grouped and separated by a `null` marker.

### Examples  

**Example 1:**  
Input: `[1,null,3,2,4,null,5,6]`  
Output: `3`  
*Explanation: The tree looks like:*
```
        1
      / | \
     3  2  4
    / \
   5   6
```
*The longest path from 1 → 3 → 5 (or 1 → 3 → 6) has 3 nodes. Depth is 3.*

**Example 2:**  
Input: `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  
Output: `5`  
*Explanation: The tree is much deeper and the longest path has 5 nodes.*

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation: The tree is empty, so depth is 0.*

### Thought Process (as if you’re the interviewee)  
I’d start by clarifying what depth means for an n-ary tree: it’s the count of nodes from root to the farthest leaf.  
A natural way is to use **Depth-First Search (DFS)**:  
- For each node, recursively find the maximum depth among its children.
- The depth at a leaf node is 1.
- Keep track of the maximum depth found among all child subtrees.
- Base case: if the node is `None`, return 0.

A **Breadth-First Search (BFS)** using a queue could also work, processing level by level, but DFS recursion is simpler for depth calculation since you can just compute max(child depths) + 1 per node.

*Trade-offs*:  
- DFS uses recursion (call stack depth up to the height of the tree), but is concise.
- BFS avoids recursion stack, but requires explicit queue and level counting.

DFS works especially well since we are only interested in the maximum, not summaries per level.

### Corner cases to consider  
- The tree is empty (`root` is `None`): return 0.
- The tree is a single node: return 1.
- Highly unbalanced tree with only leftmost or rightmost children.
- Very wide trees where nodes have many children but only shallow depth.
- Deep trees (to check for recursion stack issues; given constraints guarantee reasonable height).

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def maxDepth(root):
    # If the tree is empty
    if root is None:
        return 0

    # If the node has no children, it's a leaf node
    if not root.children:
        return 1

    # Recursively find the max depth among all children
    max_child_depth = 0
    for child in root.children:
        child_depth = maxDepth(child)
        if child_depth > max_child_depth:
            max_child_depth = child_depth

    # Add 1 for the current node
    return 1 + max_child_depth
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the total number of nodes. Each node is visited once to compute its depth.
- **Space Complexity:** O(h), where h is the height of the tree, due to the recursion stack. In the worst case (a completely unbalanced tree), h ≈ n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you write an **iterative** solution to avoid recursion stack overflow?  
  *Hint: Consider BFS level traversal with a queue, incrementing depth after each level.*

- If the tree nodes also stored pointers to their **parent**, how could you use that to calculate depth from any node?  
  *Hint: Trace back up from the node to the root, counting steps.*

- What if each node could have **millions of children**—how would you handle memory and performance?  
  *Hint: Consider lazy loading and processing children in batches rather than all at once.*

### Summary
This problem is a classic **Tree/DFS** pattern. The key is recursive post-order traversal to compute and compare depths.  
This coding pattern recurs frequently in tree problems: finding max/min path, validating structure, evaluating subtrees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Maximum Depth of Binary Tree(maximum-depth-of-binary-tree) (Easy)
- The Time When the Network Becomes Idle(the-time-when-the-network-becomes-idle) (Medium)
- Count the Number of Good Nodes(count-the-number-of-good-nodes) (Medium)