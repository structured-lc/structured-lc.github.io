### Leetcode 1490 (Medium): Clone N-ary Tree [Practice](https://leetcode.com/problems/clone-n-ary-tree)

### Description  
Given the root of an N-ary tree (where each node contains a value and a list of children), create a **deep copy** (clone) of the entire tree. The cloned tree must have all new nodes with the same structure and values—changes to one tree should not affect the other.

### Examples  
**Example 1:**  
Input: `root = [1, [3,2,4], [5,6]]`  
Output: `[1, [3,2,4], [5,6]]`  
*Explanation: The output is a new tree with the same structure as the input. If you print a preorder traversal it matches the original tree, but each node is a different object.*

**Example 2:**  
Input: `root = null`  
Output: `null`  
*Explanation: If the original tree is empty, the clone is also empty.*

**Example 3:**  
Input: `root = `  
Output: ``  
*Explanation: A single-node tree is cloned as a new node with the same value.*

### Thought Process (as if you’re the interviewee)  
First, I want to make a **deep copy**, not just references to original nodes. That means for each node, I need to create a new node with the same value, and recursively clone all its children as new nodes as well.

The brute-force way is to do a **Depth-First Search (DFS)** or **Breadth-First Search (BFS)**:
- For each node, create a copy.
- For each child, recursively clone it.
- Attach cloned children to the new parent copy.

For the recursive/daily used Python DFS solution: If the root is None, return None. Otherwise, create a new node and recurse on children.

Alternatively, a BFS (iterative) approach could be used by storing pairs of (original node, cloned node) and iterating through the tree similarly. Both work, but recursion is a quick, clean solution in Python.

### Corner cases to consider  
- Tree is empty (`root == None`).
- Single-node tree (no children).
- Node has no children (children array is empty).
- Deep trees (ensure no stack overflow for recursion).
- Multiple children at various levels.

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def cloneTree(root):
    if root is None:
        return None
    # Create a new node with same value as root
    new_node = Node(root.val)
    # Recursively clone all children, and add them to new_node.children
    new_node.children = [cloneTree(child) for child in root.children]
    return new_node
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), where N is the number of nodes—each node is visited exactly once to be cloned.
- **Space Complexity:** O(N) for the recursion stack (in the worst case, tree is a chain) and O(N) for the node copies in memory.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle cycles (if the input could have cycles)?  
  *Hint: Use a map from original to clone to prevent infinite loops.*

- How would you implement using BFS/Queue instead of recursion?  
  *Hint: Use a queue; enqueue (orig, copy) pairs, iterate level by level, copy children during dequeue.*

- If the Node class had extra random pointers (like Leetcode 138), how would that change your approach?  
  *Hint: Need an extra pass and a map to set up random links after clone.*

### Summary
This problem is a classic **tree recursion/deep cloning pattern**—clone the root, then recursively clone all children. The solution generalizes to copying any graph-like structure (with a hashmap for cycles), and commonly appears in problems involving deep copy, graph/tree traversal, or when duplicating entire data structures.