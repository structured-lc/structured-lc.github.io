### Leetcode 1028 (Hard): Recover a Tree From Preorder Traversal [Practice](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal)

### Description  
Given a string that encodes a binary tree's preorder traversal, where the depth of each node is represented by a number of preceding '-' (dash) characters, reconstruct the original binary tree.

- The string always starts with the value of the root node (which has zero dashes before it).
- Each group of dashes followed by a number specifies a node, its value, and its depth.
- If a node has only one child, it's guaranteed to be the left child[1][3].

### Examples  

**Example 1:**  
Input: `"1-2--3--4-5--6--7"`  
Output:  
```
      1
     / \
    2   5
   / \ / \
  3  4 6  7
```
Explanation:  
- The root node is `1` (no dashes, depth 0).
- `2` is at depth 1, so left child of `1`.
- `3` and `4` at depth 2, so `3` is left and `4` is right child of `2`.
- `5` at depth 1, right child of `1`.
- `6` and `7` at depth 2, children of `5`.

**Example 2:**  
Input: `"1-401--349---90-88"`  
Output:  
```
      1
     /
   401
   /  \
 349   88
 /
90
```
Explanation:  
- The root is `1`.
- `401` at depth 1, left child of `1`.
- `349` at depth 2, left child of `401`.
- `90` at depth 3, left child of `349`.
- `88` at depth 2, right child of `401`[3].

**Example 3:**  
Input: `"1-2--3---4----5"`  
Output:  
```
  1
 /
2
/
3
/
4
/
5
```
Explanation:  
- Each node is the left child of its parent, increasing depth by one each time.

### Thought Process (as if you’re the interviewee)

Start by parsing the string into a list of (depth, value) pairs.  
Use a stack to keep track of the current path from the root to the current node based on depth.

- For each parsed (depth, value):
  - If the stack length is greater than depth, pop until stack length equals depth.
  - The new node is a child of the last node in the stack:  
    - If the parent’s left child is None, attach it there; else to right.
  - Push the new node onto the stack.
- The bottom of the stack is the root of the tree.

This approach works as preorder traversal follows root → left → right, and the depth representation allows reconstructing the tree structure iteratively in O(n) time and space[3].

### Corner cases to consider  
- Empty input string (should not occur per constraints, but worth noting)
- Single node tree: e.g. `"1"`
- All nodes only have left children: e.g. `"1-2--3---4"`
- Trees where both left and right children exist at the same level
- Numbers with multiple digits
- Repeated values/nodes with similar depth

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def recoverFromPreorder(traversal: str) -> TreeNode:
    stack = []
    i = 0
    n = len(traversal)

    while i < n:
        depth = 0
        # Count dashes to determine the depth
        while i < n and traversal[i] == '-':
            depth += 1
            i += 1
        # Read the value (may have multiple digits)
        val = 0
        while i < n and traversal[i].isdigit():
            val = val * 10 + int(traversal[i])
            i += 1
        node = TreeNode(val)
        # Pop to reach the correct parent depth
        while len(stack) > depth:
            stack.pop()
        if stack:
            parent = stack[-1]
            if not parent.left:
                parent.left = node
            else:
                parent.right = node
        stack.append(node)
    # The root will be at the bottom of the stack
    return stack[0] if stack else None
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We traverse each character once, and each node is pushed/popped at most once from the stack.
- **Space Complexity:** O(h), where h is the height of the tree (stack size). In the worst case (e.g., skewed tree), this is O(n) due to the stack; otherwise, it’s O(log n) for balanced trees.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return an in-order or level-order traversal of the reconstructed tree?  
  *Hint: Think standard tree traversals.*

- What changes would be needed if the traversal string could include missing children explicitly?  
  *Hint: What if dashes could also represent null nodes?*

- Can you recover the tree if the traversal string order isn’t preorder?  
  *Hint: What if postorder or inorder, with depths, is given? Can it always be uniquely reconstructed?*

### Summary
This problem uses a **stack + preorder traversal simulation** pattern, parsing a depth-annotated path and reconstructing the parent-child relationships incrementally. The stack keeps track of the current ancestors according to node depths, and the approach runs in linear time. This parsing/stack strategy can be applied to problems involving sequence-based hierarchical reconstruction, such as deserializing trees or parsing indented outlines.

### Tags
String(#string), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
