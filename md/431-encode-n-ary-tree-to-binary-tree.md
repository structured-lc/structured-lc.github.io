### Leetcode 431 (Hard): Encode N-ary Tree to Binary Tree [Practice](https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree)

### Description  
Design an algorithm to encode an N-ary tree into a binary tree and decode the binary tree to get the original N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. Similarly, a binary tree is a rooted tree in which each node has no more than 2 children.

Your encoding/decoding algorithm should be stateless and run in linear time.

### Examples  

**Example 1:**  
Input: `N-ary tree = [1,null,3,2,4,null,5,6]`  
Output: `Binary tree that can be decoded back to the original N-ary tree`  

**Example 2:**  
Input: `N-ary tree = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  
Output: `Binary tree that can be decoded back to the original N-ary tree`  

### Thought Process (as if you're the interviewee)  
This problem requires converting between two different tree structures while preserving all information. The key insight is establishing a systematic mapping:

**Encoding Strategy:**
- First child → left child of binary tree
- Next siblings → right child chain in binary tree

This creates a "first child, next sibling" representation where:
- Left pointer: points to first child
- Right pointer: points to next sibling

Approaches:
1. **First child, next sibling**: Standard approach for this conversion
2. **Level-order encoding**: More complex but possible
3. **Preorder with reconstruction**: Serialize and embed in binary tree

The first child, next sibling approach is most natural and efficient.

### Corner cases to consider  
- Empty tree
- Single node tree
- Tree with only one child per node (linear structure)
- Tree with many children at root
- Deep tree vs wide tree
- Nodes with no children (leaf nodes)

### Solution

```python
# Definition for N-ary tree node
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

# Definition for binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def encode(self, root):
        """Encodes an n-ary tree to a binary tree."""
        if not root:
            return None
        
        # Create binary tree root with same value
        binary_root = TreeNode(root.val)
        
        # If there are children, encode them
        if root.children:
            # First child becomes left child
            binary_root.left = self.encode(root.children[0])
            
            # Connect siblings as right children chain
            current = binary_root.left
            for i in range(1, len(root.children)):
                current.right = self.encode(root.children[i])
                current = current.right
        
        return binary_root
    
    def decode(self, root):
        """Decodes your binary tree to an n-ary tree."""
        if not root:
            return None
        
        # Create N-ary tree root with same value
        nary_root = Node(root.val)
        
        # Decode children from left subtree and right chain
        if root.left:
            # Collect all children from the right chain
            children = []
            current = root.left
            
            while current:
                children.append(self.decode(current))
                current = current.right
            
            nary_root.children = children
        
        return nary_root

# Alternative implementation with helper functions
class CodecAlternative:
    def encode(self, root):
        if not root:
            return None
        
        return self._encode_recursive(root)
    
    def _encode_recursive(self, node):
        if not node:
            return None
        
        # Create binary node
        binary_node = TreeNode(node.val)
        
        # Encode children using first-child, next-sibling approach
        if node.children:
            # First child goes to left
            binary_node.left = self._encode_recursive(node.children[0])
            
            # Link siblings horizontally using right pointers
            current_binary = binary_node.left
            for i in range(1, len(node.children)):
                current_binary.right = self._encode_recursive(node.children[i])
                current_binary = current_binary.right
        
        return binary_node
    
    def decode(self, root):
        if not root:
            return None
        
        return self._decode_recursive(root)
    
    def _decode_recursive(self, binary_node):
        if not binary_node:
            return None
        
        # Create N-ary node
        nary_node = Node(binary_node.val)
        
        # Decode children from left subtree
        if binary_node.left:
            children = []
            current = binary_node.left
            
            # Traverse the sibling chain
            while current:
                children.append(self._decode_recursive(current))
                current = current.right
            
            nary_node.children = children
        
        return nary_node

# Iterative approach for encoding
class CodecIterative:
    def encode(self, root):
        if not root:
            return None
        
        from collections import deque
        
        # Use BFS to process N-ary tree
        binary_root = TreeNode(root.val)
        queue = deque([(root, binary_root)])
        
        while queue:
            nary_node, binary_node = queue.popleft()
            
            if nary_node.children:
                # First child becomes left child
                first_child = nary_node.children[0]
                binary_node.left = TreeNode(first_child.val)
                queue.append((first_child, binary_node.left))
                
                # Connect siblings as right chain
                current_binary = binary_node.left
                for i in range(1, len(nary_node.children)):
                    child = nary_node.children[i]
                    current_binary.right = TreeNode(child.val)
                    current_binary = current_binary.right
                    queue.append((child, current_binary))
        
        return binary_root
    
    def decode(self, root):
        if not root:
            return None
        
        from collections import deque
        
        # Use BFS to process binary tree
        nary_root = Node(root.val)
        queue = deque([(root, nary_root)])
        
        while queue:
            binary_node, nary_node = queue.popleft()
            
            if binary_node.left:
                children = []
                current = binary_node.left
                
                # Collect all siblings
                while current:
                    child = Node(current.val)
                    children.append(child)
                    queue.append((current, child))
                    current = current.right
                
                nary_node.children = children
        
        return nary_root

# Verification helper functions
def print_nary_tree(root):
    """Helper function to print N-ary tree structure."""
    if not root:
        return "None"
    
    result = [str(root.val)]
    if root.children:
        result.append("(")
        child_strs = []
        for child in root.children:
            child_strs.append(print_nary_tree(child))
        result.append(",".join(child_strs))
        result.append(")")
    
    return "".join(result)

def print_binary_tree(root):
    """Helper function to print binary tree structure."""
    if not root:
        return "None"
    
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
    
    return "[" + ",".join(result) + "]"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for both encoding and decoding, where n is the number of nodes. Each node is visited exactly once.
- **Space Complexity:** O(h) for recursion stack where h is the height of the tree. The binary tree has the same number of nodes as the N-ary tree.

### Potential follow-up questions (as if you're the interviewer)  

- How would you verify that the encoding/decoding is correct?  
  *Hint: Implement a function to compare two N-ary trees for structural and value equality.*

- What if the N-ary tree had millions of nodes? Any optimizations?  
  *Hint: Consider iterative approaches to avoid stack overflow and memory optimization techniques.*

- Could you encode additional metadata (like node IDs or weights) in the binary tree?  
  *Hint: Use additional fields in TreeNode or encode metadata in node values with a specific format.*

- How would this approach handle N-ary trees where children order doesn't matter?  
  *Hint: The current approach preserves order, but you could sort children before encoding if order doesn't matter.*

### Summary
This problem demonstrates a classic tree transformation technique using the "first child, next sibling" representation. The key insight is mapping the N-ary tree's multiple children to a binary tree's left-right structure systematically. This pattern is fundamental in compiler design, where ASTs (Abstract Syntax Trees) often need to be converted between different representations. The solution showcases how complex tree structures can be flattened into simpler binary representations while preserving all structural information, which is crucial for tree serialization and storage systems.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Design(#design), Binary Tree(#binary-tree)

### Similar Problems
- Serialize and Deserialize N-ary Tree(serialize-and-deserialize-n-ary-tree) (Hard)