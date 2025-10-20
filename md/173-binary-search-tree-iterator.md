### Leetcode 173 (Medium): Binary Search Tree Iterator [Practice](https://leetcode.com/problems/binary-search-tree-iterator)

### Description  
You need to design a class, `BSTIterator`, that works as an *in-order iterator* over a Binary Search Tree (BST). The iterator should support:
- `next()`: returns the next smallest number in the BST.
- `hasNext()`: returns whether the next smallest number exists.  
On initialization with the tree root, the iterator should prepare itself so that it can efficiently deliver the next in-order node at each `next()` call, using O(h) space (where h is the height of the tree) and average O(1) time per operation.  
You may assume there will always be a next number to return when `next()` is called.

### Examples  

**Example 1:**  
Input:  
```
BST:     7
        / \
       3   15
           / \
         9    20
Operations: 
iterator = BSTIterator(root)
iterator.next()      # returns 3
iterator.next()      # returns 7
iterator.hasNext()   # returns True
iterator.next()      # returns 9
iterator.hasNext()   # returns True
iterator.next()      # returns 15
iterator.hasNext()   # returns True
iterator.next()      # returns 20
iterator.hasNext()   # returns False
```
Output:  
```
3, 7, True, 9, True, 15, True, 20, False
```
*Explanation: Each call to `next()` returns the nodes of the BST in ascending in-order sequence. `hasNext()` indicates if a next value exists.*

**Example 2:**  
Input:  
```
BST: [2, 1, 3]
Operations:
iterator = BSTIterator(root)
iterator.next()      # returns 1
iterator.next()      # returns 2
iterator.next()      # returns 3
iterator.hasNext()   # returns False
```
Output:  
```
1, 2, 3, False
```
*Explanation: Simple three-node BST, visited left-to-right.*

**Example 3:**  
Input:  
```
BST: [3]
Operations:
iterator = BSTIterator(root)
iterator.next()      # returns 3
iterator.hasNext()   # returns False
```
Output:  
```
3, False
```
*Explanation: Only one value to iterate.*

### Thought Process (as if you’re the interviewee)  

First, for in-order traversal, the most naive approach is to traverse and flatten the BST into an array during initialization, then iterate through it linearly. However, that takes O(N) space, which is suboptimal for large trees.

A better approach is to use a stack:
- The stack keeps track of the path to the next smallest unvisited node.
- On initialization, push all leftmost nodes from the root to the stack.
- For `next()`, pop the stack (this is the next in-order node), and if it has a right child, push all its left descendants to the stack.
- For `hasNext()`, simply check if the stack is non-empty.

This approach uses O(h) space and ensures average-case O(1) time per operation since each node is pushed and popped at most once. This design is optimal and standard for implementing constant-memory tree iterators.

### Corner cases to consider  
- The tree is empty.
- The tree contains only one node.
- All nodes are only left or only right children (degenerate/tree-like a linked list).
- Left- or right-heavy trees.
- Nodes have duplicate values.
- Has `next()` interleaved with `hasNext()` calls.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:
    def __init__(self, root: TreeNode):
        # Stack for the traversal state
        self.stack = []
        # Initialize by pushing all leftmost nodes from the root
        self._push_left_path(root)
    
    def _push_left_path(self, node):
        # Helper to go as left as possible and push all nodes on path
        while node:
            self.stack.append(node)
            node = node.left

    def hasNext(self) -> bool:
        # There are more nodes if stack is not empty
        return len(self.stack) > 0

    def next(self) -> int:
        # Pop the next node in in-order
        node = self.stack.pop()
        result = node.val
        # If it has a right subtree, process its leftmost path next
        if node.right:
            self._push_left_path(node.right)
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each `next()` and `hasNext()` operation runs in average O(1) time.
    - Each node is pushed to and popped from the stack only once during the iteration.

- **Space Complexity:**  
  - O(h), where h is the height of the tree (minimum stack needed to traverse leftmost path at any moment).
  - In a balanced tree, h = ⌊log₂n⌋; in a skewed tree, h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement an iterator for a general binary tree (not BST)?
  *Hint: You can't assume next node is always the leftmost unvisited one.*

- Can you implement both forward and backward iterators (supporting previous as well)?
  *Hint: You need to record the path or already-visited nodes.*

- How would you handle concurrent modifications to the BST after the iterator is created?
  *Hint: Iterators in some languages (like Java) throw errors if tree changes, or you need to cache sequence.*

### Summary
This problem is a classical use of the *in-order iterative traversal* pattern using a stack for a BST. The pattern allows traversal with minimal memory (O(h)) and enables average O(1) stepping through the tree. This design, decoupling state-of-traversal from the tree structure, is widely useful for tree traversal problems, flattening iterators, and scenarios requiring partial traversal or pausing/resuming tree walks.


### Flashcard
Use a stack to simulate in-order traversal; push all leftmost nodes, pop for next(), and push right child’s leftmost path as needed.

### Tags
Stack(#stack), Tree(#tree), Design(#design), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree), Iterator(#iterator)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)
- Flatten 2D Vector(flatten-2d-vector) (Medium)
- Zigzag Iterator(zigzag-iterator) (Medium)
- Peeking Iterator(peeking-iterator) (Medium)
- Inorder Successor in BST(inorder-successor-in-bst) (Medium)
- Binary Search Tree Iterator II(binary-search-tree-iterator-ii) (Medium)