### Leetcode 897 (Easy): Increasing Order Search Tree [Practice](https://leetcode.com/problems/increasing-order-search-tree)

### Description  
Given a binary search tree (BST), rearrange it so that the smallest node becomes the new root and every node only has a right child, forming a tree that is essentially a sorted linked list. The relative in-order order of the nodes should be preserved (i.e., ascending order as in an in-order traversal of the given BST).

### Examples  

**Example 1:**  
Input:  
Tree:
```
    5
   / \
  3   6
 / \   \
2   4   8
/      / \
1      7  9
```
List representation: `[5,3,6,2,4,null,8,1,null,null,null,7,9]`  
Output:  
Tree:
```
1
 \
 2
  \
  3
   \
   4
    \
     5
      \
       6
        \
         7
          \
           8
            \
             9
```
List representation: `[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]`  
*Explanation: In-order traversal is 1,2,3,4,5,6,7,8,9, and each node only has a right child in the output.*

**Example 2:**  
Input:  
Tree:
```
1
 \
  2
   \
    3
```
List representation: `[1,null,2,null,3]`  
Output: 
Tree:
```
1
 \
  2
   \
    3
```
List representation: `[1,null,2,null,3]`  
*Explanation: The input is already in the desired format; it is returned as-is.*

**Example 3:**  
Input:  
Tree:
```
2
/ \
1  3
```
List representation: `[2,1,3]`  
Output:
Tree:
```
1
 \
  2
   \
    3
```
List representation: `[1,null,2,null,3]`  
*Explanation: Nodes rearranged in ascending order, only right children present.*

### Thought Process (as if you’re the interviewee)  
The main point is to output a right-skewed tree reflecting the in-order traversal of the original BST.  
- **Brute-force:** Traverse the BST in-order and store all the nodes in a list, then re-link all the nodes accordingly to form the increasing order tree.  
- **Optimization:** We can achieve this in-place using recursion:
  - Recursively traverse left, process the current node, then recursively traverse right.
  - Relink the left child to null and right child to the next node in the in-order sequence as we traverse.
  - This preserves the order and only uses stack space (no extra array storage).

Trade-offs:
- Storing values and reconstructing a tree uses O(n) space for the array and possibly O(n) time.
- The recursive in-place pointer re-linking approach is optimal for both time and extra space (just the call stack).

### Corner cases to consider  
- Empty tree (input is `None`)
- Single-node tree
- Tree where each node only has a left child (descending chain)
- Tree where each node only has a right child (already in increasing form)
- Duplicate values (if any, though BST usually has unique values)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def increasingBST(root):
    # Helper function for in-order traversal
    def inorder(node, tail):
        if not node:
            return tail
        # First recur on left subtree
        res = inorder(node.left, node)
        # Set left to None since we only want right children in the result
        node.left = None
        # The result of the right subtree is the new 'tail'
        node.right = inorder(node.right, tail)
        return res

    return inorder(root, None)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) because we traverse every node exactly once.
- **Space Complexity:** O(h), where h is the height of the tree (due to recursion stack). For a balanced tree, h = log₂n. No extra space beyond call stack is needed for in-place pointer manipulation.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this iteratively without recursion?  
  *Hint: Try using an explicit stack to simulate in-order traversal and pointer rewiring.*

- How would you adapt the function if duplicate values are allowed in the BST?  
  *Hint: Ensure the in-order property and pointer rewiring still work with duplicates.*

- Can you return a list instead of a tree for fast queries of the kᵗʰ smallest element?  
  *Hint: Convert in-order traversal directly into a list.*

### Summary
This problem is a classic application of in-order DFS traversal for BSTs, reflecting the *flatten* and *threaded tree* patterns. The recursive in-place approach is memory-efficient and well-suited for problems asking you to output a "linked list" view of tree structure. This pattern is common in problems seeking ordered traversals or conversions between tree and list forms.

### Tags
Stack(#stack), Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
