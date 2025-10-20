### Leetcode 428 (Hard): Serialize and Deserialize N-ary Tree [Practice](https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree)

### Description  
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.

### Examples  

**Example 1:**  
Input: `root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  
Output: `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  

**Example 2:**  
Input: `root = [1,null,3,2,4,null,5,6]`  
Output: `[1,null,3,2,4,null,5,6]`  

**Example 3:**  
Input: `root = []`  
Output: `[]`  

### Thought Process (as if you're the interviewee)  
This problem requires designing both serialization and deserialization for N-ary trees. Key challenges:

1. **Variable number of children**: Unlike binary trees, each node can have any number of children
2. **Structure preservation**: Must maintain parent-child relationships
3. **Efficient representation**: Balance between space and parsing complexity

Approaches:
1. **Preorder with child count**: Store node value followed by number of children
2. **Level order with markers**: Use level-order traversal with null markers
3. **Parentheses notation**: Use nested parentheses to represent structure
4. **JSON-like format**: Store as nested objects/arrays

The preorder approach with child count is most efficient and intuitive.

### Corner cases to consider  
- Empty tree (root is None)
- Single node tree
- Tree with nodes having zero children (leaf nodes)
- Tree with nodes having maximum children
- Large values that might need special encoding
- Trees with duplicate values

### Solution

```python
# Definition for a Node
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string."""
        if not root:
            return ""
        
        result = []
        
        def preorder(node):
            if not node:
                return
            
            # Add node value and number of children
            result.append(str(node.val))
            result.append(str(len(node.children)))
            
            # Recursively serialize all children
            for child in node.children:
                preorder(child)
        
        preorder(root)
        return ",".join(result)
    
    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        if not data:
            return None
        
        values = data.split(",")
        index = [0]  # Use list to make it mutable in nested function
        
        def build_tree():
            if index[0] >= len(values):
                return None
            
            # Get node value and number of children
            val = int(values[index[0]])
            index[0] += 1
            children_count = int(values[index[0]])
            index[0] += 1
            
            # Create node
            node = Node(val)
            
            # Recursively build all children
            for _ in range(children_count):
                child = build_tree()
                if child:
                    node.children.append(child)
            
            return node
        
        return build_tree()

# Alternative approach using level-order traversal
class CodecLevelOrder:
    def serialize(self, root):
        if not root:
            return ""
        
        from collections import deque
        result = []
        queue = deque([root])
        
        while queue:
            node = queue.popleft()
            if node:
                result.append(str(node.val))
                result.append(str(len(node.children)))
                queue.extend(node.children)
            else:
                result.append("null")
        
        return ",".join(result)
    
    def deserialize(self, data):
        if not data:
            return None
        
        from collections import deque
        values = data.split(",")
        
        if values[0] == "null":
            return None
        
        root = Node(int(values[0]))
        children_count = int(values[1])
        queue = deque([(root, children_count)])
        index = 2
        
        while queue and index < len(values):
            parent, remaining_children = queue.popleft()
            
            for _ in range(remaining_children):
                if index >= len(values):
                    break
                
                if values[index] != "null":
                    child = Node(int(values[index]))
                    child_count = int(values[index + 1])
                    parent.children.append(child)
                    queue.append((child, child_count))
                    index += 2
                else:
                    index += 1
        
        return root

# Parentheses notation approach
class CodecParentheses:
    def serialize(self, root):
        if not root:
            return ""
        
        def preorder(node):
            if not node:
                return ""
            
            result = str(node.val)
            if node.children:
                result += "("
                child_results = []
                for child in node.children:
                    child_results.append(preorder(child))
                result += ",".join(child_results)
                result += ")"
            
            return result
        
        return preorder(root)
    
    def deserialize(self, data):
        if not data:
            return None
        
        index = [0]
        
        def parse():
            if index[0] >= len(data):
                return None
            
            # Parse node value
            start = index[0]
            while index[0] < len(data) and data[index[0]].isdigit():
                index[0] += 1
            
            if start == index[0]:
                return None
            
            val = int(data[start:index[0]])
            node = Node(val)
            
            # Check for children
            if index[0] < len(data) and data[index[0]] == '(':
                index[0] += 1  # Skip '('
                
                while index[0] < len(data) and data[index[0]] != ')':
                    child = parse()
                    if child:
                        node.children.append(child)
                    
                    # Skip comma
                    if index[0] < len(data) and data[index[0]] == ',':
                        index[0] += 1
                
                if index[0] < len(data):
                    index[0] += 1  # Skip ')'
            
            return node
        
        return parse()

# JSON-like approach
import json

class CodecJSON:
    def serialize(self, root):
        def to_dict(node):
            if not node:
                return None
            
            return {
                "val": node.val,
                "children": [to_dict(child) for child in node.children]
            }
        
        return json.dumps(to_dict(root))
    
    def deserialize(self, data):
        def from_dict(d):
            if d is None:
                return None
            
            node = Node(d["val"])
            node.children = [from_dict(child) for child in d["children"]]
            return node
        
        return from_dict(json.loads(data))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for both serialization and deserialization, where n is the number of nodes.
- **Space Complexity:** O(n) for the serialized string and O(h) for recursion stack where h is the height of the tree.

### Potential follow-up questions (as if you're the interviewer)  

- How would you handle very large trees that don't fit in memory?  
  *Hint: Implement streaming serialization/deserialization with iterative approaches.*

- What if the tree contained duplicate values? How would you ensure correctness?  
  *Hint: The structure is preserved regardless of duplicate values, but you might need unique identifiers for specific use cases.*

- How would you optimize for space if the tree had many nodes with similar subtree structures?  
  *Hint: Implement subtree deduplication or compression techniques.*

- Can you modify this to handle trees where children have a specific order that must be preserved?  
  *Hint: The current solution already preserves order, but you might need to add explicit ordering metadata.*

### Summary
N-ary tree serialization requires careful handling of variable node degrees. The preorder traversal with child count provides an efficient solution that preserves structure while maintaining linear time complexity. This problem demonstrates important concepts in tree serialization, data structure design, and the trade-offs between different encoding schemes. Understanding these patterns is crucial for designing persistent storage systems and network protocols that handle hierarchical data.


### Flashcard
Serialize N-ary tree with preorder and child count; deserialize by reading value, then recursively building children.

### Tags
String(#string), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Serialize and Deserialize Binary Tree(serialize-and-deserialize-binary-tree) (Hard)
- Serialize and Deserialize BST(serialize-and-deserialize-bst) (Medium)
- Encode N-ary Tree to Binary Tree(encode-n-ary-tree-to-binary-tree) (Hard)