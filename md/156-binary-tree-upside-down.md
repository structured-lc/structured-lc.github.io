### Leetcode 156 (Medium): Binary Tree Upside Down [Practice](https://leetcode.com/problems/binary-tree-upside-down)

### Description  
Given the root of a binary tree, "upside down" the tree so that the original **leftmost node** becomes the new root, and for each original parent, its original right child becomes the new left child, and itself becomes the new right child. It's guaranteed that every right node has a sibling (a left node with the same parent) and has no children (right nodes are always leaves or null).  
In other words:  
- The **left child becomes the new root**.
- The **original right child becomes the new left child**.
- The **original parent becomes the new right child**.  
This transformation is applied recursively to the left subtree.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5]`  
Output: `[4,5,2,null,null,3,1]`  
*Explanation:*  
Original tree:
```
    1
   / \
  2   3
 / \
4   5
```
Flipped:
```
    4
   / \
  5   2
     / \
    3   1
```
List: `[4,5,2,null,null,3,1]` (visual: new root is 4, then left is 5, right is 2, etc.)

**Example 2:**  
Input: `[]`  
Output: `[]`  
*Explanation:*  
Empty tree remains empty.

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
*Explanation:*  
Single node stays as the root.

### Thought Process (as if you’re the interviewee)  
I'd start by observing that only left children can have further children, and all right children are leaves (or null), so the tree is left-linear. To solve the problem:
- **Brute-force**: I could try rearranging the pointers at each level, but it's messy and error-prone.
- **Optimized recursive approach**:  
  - Traverse to the leftmost node (which will be the new root).
  - As the recursion unwinds, rearrange pointers such that for each node:
    - left.left = right (original right child becomes the new left)
    - left.right = node (original parent becomes new right)
    - node.left, node.right = None (break old pointers)
- **Iterative approach**:  
  - Could also do this iteratively with three pointers: prev, curr, tempRight, but recursion maps more clearly to the "unwind" and pointer re-wiring for each subtree.

Recursive inversion is clean, fits the constraints, and pointer manipulation is intuitive at each unwinding step.

### Corner cases to consider  
- Empty tree (`root == None`).
- Tree with only one node.
- Tree with a long left spine (all nodes only have left children).
- Tree is already 'upside down' (leftmost leaf is root).
- A node's right child is always a leaf or null.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def upsideDownBinaryTree(root):
    # Base case: if the tree is empty or has no left child, return root
    if not root or not root.left:
        return root
    # Recursively flip left subtree
    newRoot = upsideDownBinaryTree(root.left)
    # Re-wire pointers as per problem statement:
    # left child's left becomes original right
    root.left.left = root.right
    # left child's right becomes original parent
    root.left.right = root
    # Disconnect original parent from its left/right (to prevent cycles)
    root.left = None
    root.right = None
    return newRoot
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We visit every node exactly once in a post-order traversal.

- **Space Complexity:** O(h)  
  Where h is the height of the tree (up to O(n) if skewed). This comes from the recursion stack; no additional data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you do this **iteratively**?  
  *Hint: Use three pointers and process the left spine as a list.*

- What if the tree had "random" structure and not all right nodes are leaves with siblings?  
  *Hint: The transformation logic relies on problem-specific guarantees; otherwise, you would invalidate the structure.*

- Could you invert a **linked list** in a similar way?  
  *Hint: The recursion and rewiring are related to how we reverse a linked list.*

### Summary
The solution uses a **post-order recursive traversal** pattern to rewire parent/child pointers as we unwind recursion. This approach is commonly seen in problems involving transformation or reconstruction of trees, such as converting a binary tree to another form or flattening trees. Patterns here are similar to inverting linked lists, but node children are manipulated in pairs (left/right), which is unique to binary trees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Reverse Linked List(reverse-linked-list) (Easy)