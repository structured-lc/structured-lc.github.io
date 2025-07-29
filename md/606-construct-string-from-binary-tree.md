### Leetcode 606 (Medium): Construct String from Binary Tree [Practice](https://leetcode.com/problems/construct-string-from-binary-tree)

### Description  
Given a binary tree, **construct a string** consisting of parentheses and integers using a *preorder traversal* (root, left, right), following these rules:
- If a node has **no children**, just write its value.
- If a node has **only a left child**, include it in parentheses (right child parentheses are omitted).
- If a node has **only a right child**, represent the missing left child as an empty pair "()", then include the right child in parentheses.
- **Omit unnecessary empty parentheses** that don’t affect the one-to-one mapping of the string and the original tree.

### Examples  

**Example 1:**  
Input: `[1,2,3,4]`  
Output: `"1(2(4))(3)"`  
Explanation:  
Tree:
```
    1
   / \
  2   3
 /
4
```
Preorder: 1 → 2 → 4 → 3.  
- Node 1: Has both children, so write 1(…)(…)
- Node 2: Has left child (4) only, so write 2(4)
- Node 3: No children, just write 3
- Node 4: No children, just write 4  
Result: `1(2(4))(3)`  
*Unnecessary empty parentheses omitted.*[3]

**Example 2:**  
Input: `[1,2,3,null,4]`  
Output: `"1(2()(4))(3)"`  
Explanation:  
Tree:
```
    1
   / \
  2   3
   \
    4
```
Preorder: 1 → 2 → 4 → 3.  
- Node 1: Has both children, so 1(…)(…)
- Node 2: Right child only, so 2()(4)
- Node 3: No children, just 3  
Result: `1(2()(4))(3)`  
*Empty parentheses for missing left child are required to preserve structure.*[3]

**Example 3:**  
Input: `[1]`  
Output: `"1"`  
Explanation:  
Tree:
```
1
```
Single root node, no children, so just `1`.

### Thought Process (as if you’re the interviewee)  
First, I’ll perform a **preorder traversal** (root → left → right) and recursively build the string for each subtree.  
- **Base case:** If node is None, return an empty string.
- If both `left` and `right` are None, just return the value.
- If only `left` exists, return value + "(" + recurse left + ")".
- If only `right` exists, must show the missing left child, so use "()" for left and recurse right.
- If both children exist, recurse on both, enclosing each in parentheses.

The recursion naturally handles tree depth.  
This approach avoids unnecessary parenthesis, keeping the string compact but unambiguous.

### Corner cases to consider  
- **Empty tree**: Input node is None, return "".
- **Single node tree**: No parenthesis.
- **Node with only right child**: Add "()" for missing left.
- **Deeply nested one-sided trees**.
- **Parenthesis elimination:** Ensure structure is still one-to-one with original tree.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def tree2str(root):
    # Base case: if the node is None, return empty string
    if not root:
        return ""
    
    # Both children are None: just return value as string
    if not root.left and not root.right:
        return str(root.val)
    
    # Only right child missing: return left child
    if not root.right:
        return f"{root.val}({tree2str(root.left)})"
    
    # Right child exists: must add left (even if missing)
    # If left is missing, still need "()" to indicate structure
    return f"{root.val}({tree2str(root.left)})({tree2str(root.right)})"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once in preorder traversal.
- **Space Complexity:** O(n) due to recursion stack in the worst case (tree is completely unbalanced), and the string output also takes O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you build the **tree back from such a string**?  
  *Hint: Think about parsing parenthesis, recursion, and reconstructing left/right children.*

- Can you write this **iteratively** instead of recursively?  
  *Hint: Use a stack to simulate recursion and manage parentheses.*

- How does the function behave for **non-binary or N-ary trees**?  
  *Hint: Would need a more general approach to encode children.*

### Summary
This is a classic **binary tree + preorder traversal + string encoding** problem. The main challenge is getting the parentheses right to preserve the tree structure while omitting unnecessary empty ones. The pattern (recursive DFS, structural string construction) is common and appears in problems like: serialize/deserialize tree, or tree-to-array representations.