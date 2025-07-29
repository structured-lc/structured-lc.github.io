### Leetcode 1382 (Medium): Balance a Binary Search Tree [Practice](https://leetcode.com/problems/balance-a-binary-search-tree)

### Description  
Given the root of a binary search tree (BST), balance the tree so that the depth of the left and right subtrees of every node never differs by more than one. You need to return the root of any one possible balanced BST that contains all the original nodes. A BST is balanced if the depths of the subtrees of every node differ by at most 1 and the height is O(log n).

### Examples  

**Example 1:**  
Input: `[1,null,2,null,3,null,4,null,null]`  
Output: `[2,1,3,null,null,null,4]`  
*Explanation: The original tree is right-skewed. The balanced tree can have 2 as root, 1 as left child, and subtree [3,null,4] as right child.*

**Example 2:**  
Input: `[2,1,3]`  
Output: `[2,1,3]`  
*Explanation: The tree is already balanced, so it remains the same.*

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
*Explanation: A single node tree is always balanced.*

### Thought Process (as if you’re the interviewee)  
First, observe that we want a balanced BST with the same elements. Brute-force would be trying rotations, but that gets messy and inefficient. 
A smarter way uses in-order traversal:
- Since in-order traversal outputs BST values in sorted order, we first flatten the tree to a sorted list.
- Build a balanced BST from the list by always picking the middle element as root, recursively for subarrays (like the way we build BST from a sorted array).
- Since all values come from the tree, and construction always divides lists in half, the result is balanced.
- Trade-off: requires O(n) space to store the node pointers temporarily.

### Corner cases to consider  
- Empty tree input (root is None)
- Tree with only one node
- Skewed tree (all left or right children)
- Tree is already balanced

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def balanceBST(root):
    # Helper: In-order traversal to collect nodes
    def inorder(node, lst):
        if node:
            inorder(node.left, lst)
            lst.append(node)
            inorder(node.right, lst)

    # Helper: Build balanced BST from list of nodes
    def build_balanced(nodes, l, r):
        if l > r:
            return None
        mid = (l + r) // 2
        root = nodes[mid]
        root.left = build_balanced(nodes, l, mid-1)
        root.right = build_balanced(nodes, mid+1, r)
        return root

    nodes = []
    inorder(root, nodes)  # Collect nodes in sorted order
    return build_balanced(nodes, 0, len(nodes)-1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each node is visited once in both the in-order traversal and while constructing the balanced tree.
- **Space Complexity:** O(n), to temporarily store all node pointers in a list; recursion stack also O(log n) if the tree is already balanced, O(n) otherwise.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you balance the tree in-place to minimize extra space?  
  *Hint: Can you re-use the same nodes and pointers while reconstructing?*

- Can you balance a BST during insertions instead?  
  *Hint: Think about AVL or Red-Black trees!*

- If the input is a very large tree that doesn't fit in memory, how would you balance it?  
  *Hint: Consider external memory algorithms or chunking.*

### Summary
This approach first linearizes the BST into a sorted sequence using in-order traversal, then reconstructs a balanced BST by recursively picking the middle node as root—commonly called the "sorted array to BST" pattern. This is a classic divide-and-conquer technique and a fundamental interview pattern for balanced tree construction.