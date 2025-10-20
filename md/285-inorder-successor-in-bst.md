### Leetcode 285 (Medium): Inorder Successor in BST [Practice](https://leetcode.com/problems/inorder-successor-in-bst)

### Description  
Given a binary search tree and a node \(p\) within it, find the **inorder successor** of that node.  
The **inorder successor** of a node is the node with the smallest key greater than \(p\)ʼs value.  
If no such node exists (i.e., \(p\) is the largest node), return `null`.  
This leverages BST properties: the left subtree contains lesser values, the right subtree contains greater values.

### Examples  

**Example 1:**  
Input: root = `[2,1,3]`, p = `1`  
Output: `2`  
*Explanation: Inorder traversal: 1 → 2 → 3. 2 is the next greater node after 1 (1ʼs successor).*

**Tree:**  
```
  2
 / \
1   3
```

**Example 2:**  
Input: root = `[5,3,6,2,4,null,null,1]`, p = `6`  
Output: `null`  
*Explanation: Inorder: 1 → 2 → 3 → 4 → 5 → 6. 6 is the largest node, so it doesnʼt have a successor.*

**Tree:**  
```
      5
     / \
    3   6
   / \
  2   4
 /
1
```

**Example 3:**  
Input: root = `[5,3,6,2,4,null,null,1]`, p = `4`  
Output: `5`  
*Explanation: Traversal yields: 1 → 2 → 3 → 4 → 5 → 6. After 4 comes 5, its inorder successor.*

### Thought Process (as if you’re the interviewee)  
- **Brute-Force Approach:**  
  - Do a full **inorder traversal** to get all nodes sorted.  
  - Track previous node; when previous is `p`, the current node is the successor.
  - This approach uses extra space to store node sequence or requires tracking traversal order.
- **Optimize with BST properties:**  
  - Because it’s a BST, at every node:
    - If `root.val` \> `p.val`: root could be a potential successor; go left for a closer one.
    - If `root.val` ≤ `p.val`: go right, as any successor must be greater.
  - Stop when root is null; last candidate held is the answer.
  - **If `p` has a right child:** successor is the leftmost node in the right subtree.
- **Why prefer this optimization?**  
  - O(h) time (h = tree height); does not require traversal of the whole tree.
  - No extra array/list to store nodes; uses only O(1) extra space (if iterative).

### Corner cases to consider  
- Tree is empty (`root = null`).
- Node `p` is the largest in the tree (should return `null`).
- Node `p` is the smallest, or has no right child.
- Node `p` exists multiple times (BSTs normally don’t by definition, but check input constraints).
- Tree size of 1 node.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorderSuccessor(root, p):
    successor = None
    while root:
        # If root's value > p's value, root could be successor
        if root.val > p.val:
            successor = root     # Potential answer; go left for a closer one
            root = root.left
        else:
            # root's value ≤ p's value, successor can't be in left; move right
            root = root.right
    return successor
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(h), where h is the tree’s height. Each while loop moves down the tree once — worst case is O(n) if skewed or O(log n) if balanced.
- **Space Complexity:**  
  - O(1) if iterative (as above), since no extra data structures are used beyond a variable for the successor.

### Potential follow-up questions (as if you’re the interviewer)  

- What if this is a general binary tree, not necessarily a BST?  
  *Hint: BST ordering no longer applies; may need parent pointers or a full traversal.*

- How would you solve this recursively?  
  *Hint: Use recursion to mimic the iterative logic and choose left/right subtree appropriately.*

- Can you do this if the nodes have parent pointers?  
  *Hint: Move up the parent chain until you find a node that is a left child of its parent; that parent is the successor.*

### Summary
This problem utilizes the **BST property** that all right-side descendants are greater for efficient searching.  
It follows a classic “candidate update” pattern — whenever a node is greater than `p`, consider it and search left for a better fit.  
This approach avoids full traversal and unnecessary extra space, making it ideal for large BSTs.  
The pattern is broadly used in BST problems involving “closest value” or “range” searches.


### Flashcard
Use BST property: traverse tree tracking potential successor; when root.val > p.val, update successor and go left, else go right.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)
- Binary Search Tree Iterator(binary-search-tree-iterator) (Medium)
- Inorder Successor in BST II(inorder-successor-in-bst-ii) (Medium)