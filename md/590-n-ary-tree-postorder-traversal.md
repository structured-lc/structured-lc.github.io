### Leetcode 590 (Easy): N-ary Tree Postorder Traversal [Practice](https://leetcode.com/problems/n-ary-tree-postorder-traversal)

### Description  
Given the **root** of an N-ary tree, return the **postorder traversal** of its nodes' values.  
In postorder traversal for an N-ary tree, you:
- Traverse all the children of the node (from left to right),
- Then visit the node itself.

So for each node, always process all its children with a postorder traversal first before adding the node itself to the result.


### Examples  

**Example 1:**  
Input:  
```
       1
     / | \
    3  2  4
   / \
  5   6

root = [1, [3,2,4], [5,6]]
```
Output: `[5, 6, 3, 2, 4, 1]`  
*Explanation:*
- Visit children of node 1: [3,2,4]
- For 3: visit its children [5,6] ⇒ visit 5, visit 6, then visit 3
- 2 and 4 have no children, so visit them directly after their positions
- Finally, visit the root node (1).


**Example 2:**  
Input:  
```
    1
root = [1, []]
```
Output: `[1]`  
*Explanation:*  
- Tree has only the root; postorder traversal is just `[1]`.


**Example 3:**  
Input:  
```
       1
     / | \
    2  3  4
           |
           5

root = [1, [2,3,4], [], [], [5], []]
```
Output: `[2, 3, 5, 4, 1]`  
*Explanation:*  
- Visit children of root in order: 2, 3, 4  
- 2 and 3 have no children  
- 4 has one child 5: process 5, then 4  
- Finally visit 1.


### Thought Process (as if you’re the interviewee)  
- **First thoughts:**  
  For postorder traversal in binary trees, we process all left and right children before the node. In N-ary, that generalizes to “process all children, then the node.”
- **Recursive idea:**  
  - For each node: For each child, recursively postorder the child, then append node's value.
  - This would be super clean and matches the definition. But recursion can be limited by stack size for deep trees.

- **Iterative approach:**  
  - Since recursion uses the call stack, we can simulate this with our own stack for an iterative solution.
  - For binary trees, iterative postorder is tricky, but for N-ary, we can reverse the process of preorder:
    - In preorder, process node then children.
    - In postorder, process children then node.
    - We can process nodes as per preorder, but then reverse the order to get postorder.
  - So:
    - Use a stack, start from root.
    - Pop node, append value to result list.
    - Push its children (left to right) to stack.
    - After traversal, reverse the result list.

- **Why pick the iterative-reverse approach?**
  - It avoids recursion depth limits and is efficient.
  - Simple logic since children are naturally handled "before parent" by the reverse.

### Corner cases to consider  
- Tree is empty (`root` is `None`) ⇒ Should return `[]`.
- Root has no children.
- Root has many children, but all are leaves.
- Highly unbalanced tree (deep one branch).
- Nodes with empty children arrays in random positions.
- Very large/deep tree (test stack size safety).

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def postorder(root):
    # If tree is empty
    if not root:
        return []
    
    stack = [root]
    result = []
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push all children to stack (left to right)
        stack.extend(node.children)
        
    # The traversal above gives us root -> children (reverse postorder),
    # so we need to reverse to get the actual postorder
    return result[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is processed exactly once; we visit each node and its children just like a simple tree traversal.

- **Space Complexity:** O(n)  
  - Output list stores all node values (size n).
  - The stack can hold at most n nodes if all are in the stack at once (e.g., a degenerate tree).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this recursively?  
  *Hint: Use a helper function; for each node, call postorder on each child, then record the current node.*

- Can you do this without reversing the result at the end?  
  *Hint: Try inserting elements at the start of the result list, but be careful of O(n²) performance if using normal lists in Python.*

- How would you handle an input where nodes have references to their parent as well as children?  
  *Hint: Be careful not to revisit parent nodes; track visited nodes if the tree is not guaranteed acyclic.*

### Summary
This approach uses an **iterative DFS with postprocessing (reverse)** to compute the postorder traversal for N-ary trees. The logic is a standard pattern for tree traversals where recursion is simulated by an explicit stack. The pattern of “push node, store value, append children, then reverse at the end” comes up in many iterative tree traversals (postorder for binary and N-ary). This can be applied to any variant where the definition of "visit children before parent" holds.

### Tags
Stack(#stack), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Binary Tree Postorder Traversal(binary-tree-postorder-traversal) (Easy)
- N-ary Tree Level Order Traversal(n-ary-tree-level-order-traversal) (Medium)
- N-ary Tree Preorder Traversal(n-ary-tree-preorder-traversal) (Easy)