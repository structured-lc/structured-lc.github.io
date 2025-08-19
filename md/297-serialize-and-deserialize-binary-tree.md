### Leetcode 297 (Hard): Serialize and Deserialize Binary Tree [Practice](https://leetcode.com/problems/serialize-and-deserialize-binary-tree)

### Description  
Given the root of a binary tree, design an algorithm to serialize (convert) the tree to a single string, and deserialize (reconstruct) the original tree from that string. The format used for serialization and deserialization does not have to match LeetCode’s, as long as you can reliably regenerate the *exact* original structure. The goal is to support storing and restoring general binary trees, including those with missing children—so that the structure, not just the values, is preserved.

### Examples  

**Example 1:**  
Input:  
Tree:
```
    1
   / \
  2   3
     / \
    4   5
```
Output (serialized string):  
`"1,2,#,#,3,4,#,#,5,#,#"`  
*Explanation: Preorder traversal: Each node is visited, if node is None output '#', and commas separate values. Deserializing the string reconstructs the original tree exactly.*

**Example 2:**  
Input:  
Tree:
```
    1
   /
  2
```
Output (serialized string):  
`"1,2,#,#,#"`  
*Explanation: Node '1' has left child '2', which has no children, and '1' has no right child. Serialization fully describes structure including missing branches.*

**Example 3:**  
Input:  
Tree: (empty)
```
null
```
Output (serialized string):  
`"#"`  
*Explanation: The tree is empty. The string `"#"` represents a null node. Deserialization returns an empty tree.*

### Thought Process (as if you’re the interviewee)  

- First, we want a serialization that allows us to unambiguously reconstruct *any* binary tree structure.  
- My first brute-force idea: do a breadth-first traversal (level-order) using a queue, and at every node include value or a special marker (like '#' or 'null') for missing children, separating by commas. This works, but if there are trailing nulls, the representation is longer than necessary.
- A more concise method is **preorder traversal (DFS)**, encoding left and right children recursively and marking missing children. This naturally captures *structure*—so, for every node, output its value, then recursively serialize left, then right. A missing child is encoded as '#'. When deserializing, process tokens recursively: consume value, build left, build right.
- Preorder DFS makes both serialization and deserialization simple and efficient, and is canonical for tree encoding.
- BFS (level-order) works, but is slightly more clunky to implement recursively.
- I’d choose **preorder DFS** because the code is compact, recursion mirrors the tree, and it handles all edge cases naturally.

### Corner cases to consider  
- Empty tree (root is None).
- Tree with only left (or only right) children.
- Perfect binary tree (full, all nodes).
- Single-node tree (root only).
- Trees with negative, zero, or duplicate values.
- Unbalanced or skewed trees.
- Very deep/narrow trees (check recursion stack).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    # Encodes a tree to a single string.
    def serialize(self, root):
        def dfs(node):
            if not node:
                vals.append('#')
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        vals = []
        dfs(root)
        # Join with ','
        return ','.join(vals)

    # Decodes your encoded data to tree.
    def deserialize(self, data):
        def dfs():
            val = next(vals)
            if val == '#':
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        vals = iter(data.split(','))
        return dfs()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes. We visit every node once in both serialization and deserialization.
- **Space Complexity:** O(n). We store all n nodes (and null markers) in the serialized string. The recursion stack during traversal can go up to O(n) in worst case (e.g. skewed tree).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you implement this without recursion?  
  *Hint: Try using an explicit stack for preorder traversal and iterative tree building for deserialization.*

- How would you handle trees with very large values or with cycles (malformed input)?  
  *Hint: Validation and error checking on deserialization, or using a more robust format with value escaping.*

- How would you make this more space-efficient, especially for very deep or mostly complete trees?  
  *Hint: Consider more compact encodings, or skip unnecessary trailing nulls with a delimiter.*

### Summary
This problem is a classic use of the "Tree DFS — Serialize/Deserialize" pattern, where preorder traversal and explicit null encoding guarantees a single-string representation of any binary tree. The approach generalizes to other structures requiring reliable save/restore, and is commonly used in distributed systems, file formats, and network protocols. The code pattern closely mirrors recursive tree traversal, and is highly reusable for binary tree problems.

### Tags
String(#string), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Design(#design), Binary Tree(#binary-tree)

### Similar Problems
- Encode and Decode Strings(encode-and-decode-strings) (Medium)
- Serialize and Deserialize BST(serialize-and-deserialize-bst) (Medium)
- Find Duplicate Subtrees(find-duplicate-subtrees) (Medium)
- Serialize and Deserialize N-ary Tree(serialize-and-deserialize-n-ary-tree) (Hard)