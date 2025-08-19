### Leetcode 783 (Easy): Minimum Distance Between BST Nodes [Practice](https://leetcode.com/problems/minimum-distance-between-bst-nodes)

### Description  
Given the root of a Binary Search Tree (BST), find the minimum difference in value between any two different nodes in the tree.  
A BST ensures for any node:  
- All values in the left subtree are less than the node’s value  
- All values in the right subtree are greater than the node’s value  
The minimum difference will always be between two consecutive values in the sorted (in-order traversal) order of the BST.  
Return that minimum difference as an integer.

### Examples  

**Example 1:**  
Input: `[4,2,6,1,3]`  
Output: `1`  
*Explanation:  
In-order traversal gives [1,2,3,4,6].  
Minimum difference is min(2-1, 3-2, 4-3, 6-4) = 1.*

Tree:
```
    4
   / \
  2   6
 / \
1   3
```

**Example 2:**  
Input: `[1,0,48,null,null,12,49]`  
Output: `1`  
*Explanation:  
In-order traversal: [0,1,12,48,49].  
min(1-0 = 1, 12-1 = 11, 48-12 = 36, 49-48 = 1).  
So output is 1.*

Tree:
```
    1
   / \
  0  48
     / \
   12  49
```

**Example 3:**  
Input: `[90,69,null,49,89,null,52]`  
Output: `1`  
*Explanation:  
In-order traversal: [49,52,69,89,90].  
min differences: 52-49=3, 69-52=17, 89-69=20, 90-89=1.  
So output is 1.*

Tree:
```
    90
   /
  69
 /  \
49  89
    /
   52
```

### Thought Process (as if you’re the interviewee)  

Brute-force idea:
- Traverse the tree, collect all node values  
- Compare all pairs (N² comparisons), and find the minimum difference  
- Time: O(N²), Space: O(N)  

Optimized for BST:
- An in-order traversal gives node values in sorted order  
- The minimum difference can only be between two consecutive numbers in this order  
- Walk the tree in-order, and for each node, compute the difference with the previous node  
- Track the minimum of these differences  
- Time: O(N), Space: O(H) for recursion stack, where H is tree height  

This approach is preferred because it is both optimal and leverages the BST property, leading to a much faster solution compared to brute-force.

### Corner cases to consider  
- Tree has only one node: return something per constraints (problem doesn't specify, might never be called in this case)
- Tree is severely skewed (like a linked list)
- All node values are the same? (BST requires unique values)
- Large ranges in node values (e.g., negative, zero, and positive values)
- Nodes are all positive/negative  
- Minimum at the bottom-most level  
- Disconnected/consecutive numbers at leaf nodes

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def minDiffInBST(root):
    # Initialize previous value and answer
    prev = None
    min_diff = float('inf')
    
    # Helper function for in-order traversal
    def inorder(node):
        nonlocal prev, min_diff
        if not node:
            return
        # Visit left subtree
        inorder(node.left)
        # Check difference with previous value, if any
        if prev is not None:
            min_diff = min(min_diff, node.val - prev)
        prev = node.val
        # Visit right subtree
        inorder(node.right)
    
    inorder(root)
    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  Walks each node exactly once during in-order traversal.
- **Space Complexity:** O(H)  
  Recursion stack uses H = height of tree. For balanced tree, O(log N), for skewed O(N). No extra storage beyond call stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the BST allows duplicate values?  
  *Hint: Think about how you'd treat consecutive duplicate nodes in the in-order sequence.*

- How would you solve the problem if given a regular binary tree, not a BST?  
  *Hint: Since no order, you'd need to compare every pair or flatten to an array first.*

- Could you do this without recursion (iterative/stack approach)?  
  *Hint: Use a stack for in-order traversal and compare consecutive nodes as you pop.*

### Summary
This problem demonstrates the classic *in-order traversal* pattern for binary search trees, leveraging their property that in-order returns nodes in sorted order. By updating the minimum found difference during traversal, we avoid extra storage and redundant comparisons. This strategy is broadly useful for any BST problem requiring sorted order or adjacency, and the in-order traversal pattern is commonly applied in many tree-based problems.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)