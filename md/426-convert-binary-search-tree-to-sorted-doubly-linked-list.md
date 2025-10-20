### Leetcode 426 (Medium): Convert Binary Search Tree to Sorted Doubly Linked List [Practice](https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list)

### Description  
Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place. The left and right pointers in nodes should be used as previous and next pointers respectively. The converted list should be sorted in ascending order, and the head and tail should be connected to make it circular.

### Examples  

**Example 1:**  
Input: `root = [4,2,5,1,3]`  
Output: `Circular doubly linked list: 1<->2<->3<->4<->5 (circular)`  
*Explanation: The BST is converted to a sorted circular doubly linked list where each node's left pointer points to previous node and right pointer points to next node.*

**Example 2:**  
Input: `root = [2,1,3]`  
Output: `Circular doubly linked list: 1<->2<->3 (circular)`  
*Explanation: A simple BST converted to circular doubly linked list.*

### Thought Process (as if you're the interviewee)  
This problem combines BST inorder traversal with linked list manipulation. The key insight is that inorder traversal of BST gives sorted order, which is exactly what we need for the doubly linked list.

Approaches:
1. **Inorder with array**: Do inorder traversal, store nodes in array, then convert to doubly linked list
2. **Modified inorder**: During inorder traversal, directly build the doubly linked list connections
3. **Recursive approach**: Use recursion to handle left subtree, current node, then right subtree

I'll use approach 2 as it's more space-efficient and elegant.

### Corner cases to consider  
- Empty tree (null root)
- Single node tree
- Only left children (essentially a linked list)
- Only right children (essentially a linked list)
- Balanced BST
- Making the list properly circular

### Solution

```python
def treeToDoublyList(root):
    if not root:
        return None
    
    # Global variables to track first and last nodes
    first = None
    last = None
    
    def inorder(node):
        nonlocal first, last
        
        if not node:
            return
        
        # Process left subtree
        inorder(node.left)
        
        # Process current node
        if last:
            # Link the previous node with current node
            last.right = node
            node.left = last
        else:
            # This is the first node (leftmost)
            first = node
        
        # Update last to current node
        last = node
        
        # Process right subtree
        inorder(node.right)
    
    # Perform inorder traversal
    inorder(root)
    
    # Make the list circular
    if first and last:
        last.right = first
        first.left = last
    
    return first

# Alternative iterative solution using stack
def treeToDoublyListIterative(root):
    if not root:
        return None
    
    stack = []
    current = root
    first = None
    last = None
    
    while stack or current:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left
        
        # Process current node
        current = stack.pop()
        
        if last:
            last.right = current
            current.left = last
        else:
            first = current
        
        last = current
        
        # Move to right subtree
        current = current.right
    
    # Make circular
    if first and last:
        last.right = first
        first.left = last
    
    return first
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the number of nodes, as we visit each node exactly once during inorder traversal.
- **Space Complexity:** O(h) where h is the height of the tree for recursion stack. In worst case (skewed tree), this is O(n), but for balanced tree it's O(log n).

### Potential follow-up questions (as if you're the interviewer)  

- How would you verify that the resulting list is correctly formed and circular?  
  *Hint: Traverse the list forward and backward, checking that you can reach all nodes and return to start.*

- Can you solve this without using extra variables to track first and last?  
  *Hint: Use the fact that the leftmost and rightmost nodes in the result will be the head and tail.*

- What if the tree was not a BST but just needed to be converted based on any traversal order?  
  *Hint: The same approach works, just change the traversal method (preorder, postorder, level-order).*

### Summary
This problem demonstrates the elegant combination of tree traversal with linked list manipulation. The key insight is leveraging inorder traversal's sorted property for BSTs and building connections on-the-fly rather than storing intermediate results. This pattern appears in tree serialization, tree flattening, and converting between different data structure representations.


### Flashcard
Inorder traversal of BST yields sorted order; link nodes during traversal to form a sorted doubly linked list in-place.

### Tags
Linked List(#linked-list), Stack(#stack), Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)