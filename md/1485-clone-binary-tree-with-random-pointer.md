### Leetcode 1485 (Medium): Clone Binary Tree With Random Pointer [Practice](https://leetcode.com/problems/clone-binary-tree-with-random-pointer)

### Description  
Given a binary tree where each node has an extra `random` pointer (which may point to any node, or null), create a deep copy of the entire tree. The "clone" should have the same structure, values, and random pointers as the original.

Input: The root of the binary tree. Each node has `val`, `left`, `right`, and `random`.
Output: The root of the cloned tree. Nodes in the cloned tree must not be references to nodes in the original tree.

### Examples  

**Example 1:**  
Input: node representation 
```
      1
     / \
    2   3
random: [1.random → 3, 2.random → 1, 3.random → null]
```
Output:
A deep copy of the above tree, with cloned random pointers.
*Explanation: All pointers (left, right, random) must reference nodes in the new tree, not the original.*

**Example 2:**  
Input: 
```
  1
random: 1.random → null
```
Output: Copied tree with a single node 1, and random pointer null.
*Explanation: This checks the single-node case.*

**Example 3:**  
Input:
  null
Output: null
*Explanation: Tree is empty; output should also be null.*

### Thought Process (as if you’re the interviewee)  
- The challenge is similar to copying a graph: relationships can be arbitrary due to the random pointer.
- We need to ensure that when cloning, each original node is mapped to its cloned node (so random pointers are correct).
- Common approach: Use a hash map to keep track of the cloned version of each node (original → clone).
- First pass: clone all nodes (just val) and build the mapping.
- Second pass: set up left, right, and random pointers for each node using the mapping.
- Alternatively, use recursion with memoization.

### Corner cases to consider  
- Empty tree (root = None)
- Null random pointers
- Self-loops (node.random points to itself)
- Multiple nodes with random pointers to the same node
- Random pointer forms a cycle with pointers

### Solution

```python
# Definition for Node:
# class Node:
#     def __init__(self, val = 0, left = None, right = None, random = None):
#         self.val = val
#         self.left = left
#         self.right = right
#         self.random = random

def copyRandomBinaryTree(root):
    # Map from original node to cloned node
    old_to_new = {}
    
    def clone(node):
        if not node:
            return None
        if node in old_to_new:
            return old_to_new[node]
        # Copy the node (but not children/random yet)
        copy = Node(node.val)
        old_to_new[node] = copy
        # Recursively build left/right/random connections
        copy.left = clone(node.left)
        copy.right = clone(node.right)
        copy.random = clone(node.random)
        return copy
    return clone(root)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of tree nodes; each node visited once for clone & pointers.
- **Space Complexity:** O(N), storing mapping from original nodes to their clones.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do it with O(1) extra space (excluding recursion stack)?  
  *Hint: Think about how to interleave the cloned nodes into the original tree temporarily, similar to linked list copy with random pointer.*
- How would you handle very deep trees (avoid recursion stack overflow)?  
  *Hint: Use iterative DFS or BFS.*
- If random pointers only point downward, can you optimize?  
  *Hint: Layered traversal helps eliminate the hash map.*

### Summary
This problem follows the classic "clone graph with random pointer" pattern. Use a hash map to relate original to cloned nodes, enabling accurate reconstruction of arbitrary/random connections. This is a common data structure clone/copy scenario and is widely applicable in serialization and deep-copy use-cases.