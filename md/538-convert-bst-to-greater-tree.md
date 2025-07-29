### Leetcode 538 (Medium): Convert BST to Greater Tree [Practice](https://leetcode.com/problems/convert-bst-to-greater-tree)

### Description  
Given the root of a **Binary Search Tree (BST)**, transform it into a **Greater Tree**.  
In this new tree, each node’s value should be updated to the original value **plus the sum of all keys greater than the original key** in the BST.

A Binary Search Tree is a special tree where:
- The left subtree contains only nodes with keys less than the parent node.
- The right subtree contains only nodes with keys greater than the parent node.
- Both left and right subtrees must themselves be BSTs.

The resulting tree should retain the structure of the original BST but with the updated values.

### Examples  

**Example 1:**  
Input: `[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]`  
Output: `[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]`  
*Explanation:*  
- Original BST:  
  ```
      4
     / \
    1   6
   / \ / \
  0  2 5 7
      \   \
       3   8
  ```
- After conversion:  
  ```
     30
    /  \
   36  21
  / \  / \
36 35 26 15
      \   \
      33   8
  ```
- For example, node `4` becomes `4+6+5+7+8 = 30` (sum of itself plus all keys greater than 4).

**Example 2:**  
Input: `[5,2,13]`  
Output: `[18,20,13]`  
*Explanation:*  
- Original BST:  
  ```
   5
  / \
 2  13
  ```
- After conversion:  
  ```
   18
  / \
20 13
  ```
- Node `5` becomes `5 + 13 = 18`, node `2` becomes `2 + 5 + 13 = 20`, node `13` remains `13`.

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation:*  
- The tree is empty, so nothing needs to be changed.

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to, for each node, traverse the entire tree and add up all values greater than the current node. This is very inefficient, as for `n` nodes, each could take up to `O(n)` time (overall O(n²)).
- Given it's a BST, we know **in-order traversal** yields sorted order (smallest to largest). If we reverse that (right → node → left), we get nodes from largest to smallest.
- We can keep a running sum as we traverse – for every node, we accumulate the total of all nodes we've already visited (which are all greater).  
- For each node:
  - Traverse right subtree first (larger values).
  - Update the running sum and the current node.
  - Then traverse left subtree.
- This efficiently ensures that each node is updated with the sum of all greater keys.

### Corner cases to consider  
- Tree is empty (`root` is `None`)
- Tree has only one node
- All nodes in a straight line (skewed tree)
- All node values are the same (not possible in BST but good to mention)
- Large trees (validate recursion doesn't blow the stack)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def convertBST(root):
    # Running total for accumulating greater values
    total = 0

    def reverse_inorder(node):
        nonlocal total
        if not node:
            return
        # Traverse right subtree first (greater values)
        reverse_inorder(node.right)
        # Update node value with the accumulated total
        total += node.val
        node.val = total
        # Traverse left subtree after updating value
        reverse_inorder(node.left)

    reverse_inorder(root)
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once.

- **Space Complexity:** O(h)  
  Where `h` is the height of the tree (due to recursion stack). In the worst case (skewed tree), this is O(n); in a balanced tree, O(log n). No extra data structures are used beyond recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this iteratively without recursion?  
  *Hint: Use a stack to mimic reverse in-order traversal.*

- What if the BST contains duplicate values?  
  *Hint: Classic BSTs do not, but if allowed, decide whether “greater” includes equal values.*

- Could you compute the greater sum efficiently if the input was a doubly linked list sorted in ascending order (instead of BST)?  
  *Hint: Traverse backwards, keeping a running sum like in the tree.*

### Summary
This problem uses **reverse in-order traversal** (right → node → left), a classic tree traversal variation tailored for BSTs where nodes must be processed from largest to smallest. The running sum pattern is frequently applied to “all greater nodes” problems, and the recursive solution is both intuitive and compact. This pattern is broadly applicable for cumulative sum calculations in trees and lists ordered by value.