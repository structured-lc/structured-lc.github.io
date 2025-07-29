### Leetcode 449 (Medium): Serialize and Deserialize BST [Practice](https://leetcode.com/problems/serialize-and-deserialize-bst)

### Description  
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

### Examples  

**Example 1:**  
Input: `root = [2,1,3]`  
Output: `[2,1,3]`  

**Example 2:**  
Input: `root = []`  
Output: `[]`  

### Thought Process (as if you're the interviewee)  
This problem is similar to general tree serialization but with the advantage that we're dealing with a BST. The BST property allows for more compact serialization:

Key insights:
1. **BST property**: Left subtree < root < right subtree
2. **Preorder uniqueness**: Preorder traversal uniquely determines a BST
3. **No null markers needed**: Can reconstruct without storing null values
4. **Compact representation**: Only store actual node values

Approaches:
1. **Preorder + bounds**: Serialize as preorder, deserialize using bounds
2. **Inorder + preorder**: Use both traversals (less compact)
3. **Level order**: Store level by level (need null markers)
4. **Postorder**: Another unique representation for BST

The preorder approach is most compact and efficient for BSTs.

### Corner cases to consider  
- Empty tree
- Single node tree
- Skewed tree (all left or all right)
- Balanced tree
- Duplicate values (if allowed)
- Large trees with many nodes

### Solution

```python
# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string."""
        if not root:
            return ""
        
        # Preorder traversal gives us enough info to reconstruct BST
        values = []
        
        def preorder(node):
            if node:
                values.append(str(node.val))
                preorder(node.left)
                preorder(node.right)
        
        preorder(root)
        return ",".join(values)
    
    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        if not data:
            return None
        
        values = [int(x) for x in data.split(",")]
        index = [0]  # Use list to make it mutable in nested function
        
        def build_tree(min_val, max_val):
            if index[0] >= len(values):
                return None
            
            val = values[index[0]]
            
            # Check if current value fits in the valid range for BST
            if val < min_val or val > max_val:
                return None
            
            # Consume the value
            index[0] += 1
            
            # Build the node and its subtrees
            node = TreeNode(val)
            node.left = build_tree(min_val, val)
            node.right = build_tree(val, max_val)
            
            return node
        
        return build_tree(float('-inf'), float('inf'))

# Alternative approach using stack-based deserialization
class CodecStack:
    def serialize(self, root):
        if not root:
            return ""
        
        result = []
        stack = [root]
        
        while stack:
            node = stack.pop()
            result.append(str(node.val))
            
            # Add right first so left is processed first
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
        
        return ",".join(result)
    
    def deserialize(self, data):
        if not data:
            return None
        
        values = [int(x) for x in data.split(",")]
        
        def build():
            if not values:
                return None
            
            root_val = values[0]
            root = TreeNode(root_val)
            
            # Find boundary between left and right subtrees
            i = 1
            while i < len(values) and values[i] < root_val:
                i += 1
            
            # Split values for left and right subtrees
            left_values = values[1:i]
            right_values = values[i:]
            
            # Store remaining values back
            values[:] = []
            
            # Recursively build subtrees
            if left_values:
                values[:] = left_values
                root.left = build()
            
            if right_values:
                values[:] = right_values
                root.right = build()
            
            return root
        
        return build()

# More efficient iterative deserialization
class CodecIterative:
    def serialize(self, root):
        if not root:
            return ""
        
        result = []
        
        def dfs(node):
            if node:
                result.append(str(node.val))
                dfs(node.left)
                dfs(node.right)
        
        dfs(root)
        return ",".join(result)
    
    def deserialize(self, data):
        if not data:
            return None
        
        values = list(map(int, data.split(",")))
        stack = []
        root = None
        
        for val in values:
            node = TreeNode(val)
            
            # Find correct position for this node
            last_popped = None
            
            # Pop nodes that are smaller than current value
            while stack and stack[-1].val < val:
                last_popped = stack.pop()
            
            if not stack:
                root = node
            elif not last_popped:
                # Current node goes to left of stack top
                stack[-1].left = node
            else:
                # Current node goes to right of last popped node
                last_popped.right = node
            
            stack.append(node)
        
        return root

# Postorder approach for comparison
class CodecPostorder:
    def serialize(self, root):
        if not root:
            return ""
        
        result = []
        
        def postorder(node):
            if node:
                postorder(node.left)
                postorder(node.right)
                result.append(str(node.val))
        
        postorder(root)
        return ",".join(result)
    
    def deserialize(self, data):
        if not data:
            return None
        
        values = [int(x) for x in data.split(",")]
        values.reverse()  # Process from end for postorder
        index = [0]
        
        def build_tree(min_val, max_val):
            if index[0] >= len(values):
                return None
            
            val = values[index[0]]
            
            if val < min_val or val > max_val:
                return None
            
            index[0] += 1
            
            # For postorder: build right subtree first, then left
            node = TreeNode(val)
            node.right = build_tree(val, max_val)
            node.left = build_tree(min_val, val)
            
            return node
        
        return build_tree(float('-inf'), float('inf'))

# Level order approach (less compact but works)
class CodecLevelOrder:
    def serialize(self, root):
        if not root:
            return ""
        
        from collections import deque
        queue = deque([root])
        result = []
        
        while queue:
            node = queue.popleft()
            if node:
                result.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                result.append("null")
        
        # Remove trailing nulls
        while result and result[-1] == "null":
            result.pop()
        
        return ",".join(result)
    
    def deserialize(self, data):
        if not data:
            return None
        
        from collections import deque
        values = data.split(",")
        
        root = TreeNode(int(values[0]))
        queue = deque([root])
        i = 1
        
        while queue and i < len(values):
            node = queue.popleft()
            
            # Left child
            if i < len(values) and values[i] != "null":
                node.left = TreeNode(int(values[i]))
                queue.append(node.left)
            i += 1
            
            # Right child
            if i < len(values) and values[i] != "null":
                node.right = TreeNode(int(values[i]))
                queue.append(node.right)
            i += 1
        
        return root

# Compact binary representation (advanced)
class CodecBinary:
    def serialize(self, root):
        import struct
        
        if not root:
            return ""
        
        values = []
        
        def preorder(node):
            if node:
                values.append(node.val)
                preorder(node.left)
                preorder(node.right)
        
        preorder(root)
        
        # Pack integers as binary
        return struct.pack(f'{len(values)}i', *values)
    
    def deserialize(self, data):
        import struct
        
        if not data:
            return None
        
        # Unpack binary data
        values = list(struct.unpack(f'{len(data)//4}i', data))
        index = [0]
        
        def build_tree(min_val, max_val):
            if index[0] >= len(values):
                return None
            
            val = values[index[0]]
            
            if val < min_val or val > max_val:
                return None
            
            index[0] += 1
            
            node = TreeNode(val)
            node.left = build_tree(min_val, val)
            node.right = build_tree(val, max_val)
            
            return node
        
        return build_tree(float('-inf'), float('inf'))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for both serialization and deserialization, where n is the number of nodes.
- **Space Complexity:** O(n) for storing the serialized data and O(h) for recursion stack where h is the height of the tree.

### Potential follow-up questions (as if you're the interviewer)  

- How would you handle duplicate values in the BST?  
  *Hint: Modify the bounds checking to use <= or >= appropriately, or store additional information about duplicates.*

- Can you make the serialization even more compact using binary encoding?  
  *Hint: Use binary representation of integers instead of string representation.*

- How would you modify this for a general binary tree (not BST)?  
  *Hint: Need to include null markers or use multiple traversals (preorder + inorder).*

- What if the tree had millions of nodes and you needed to serialize/deserialize efficiently?  
  *Hint: Consider streaming approaches, compression techniques, or incremental serialization.*

### Summary
BST serialization leverages the unique property that preorder traversal alone is sufficient to reconstruct the tree. This makes it more compact than general tree serialization. The bounds-based deserialization technique efficiently reconstructs the tree by using the BST property to determine where each node belongs. This pattern is fundamental in data persistence, network transmission of tree structures, and database index serialization. Understanding how to exploit data structure properties for more efficient serialization is crucial for system design and optimization problems.
