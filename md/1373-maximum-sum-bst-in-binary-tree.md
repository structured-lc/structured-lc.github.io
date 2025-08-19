### Leetcode 1373 (Hard): Maximum Sum BST in Binary Tree [Practice](https://leetcode.com/problems/maximum-sum-bst-in-binary-tree)

### Description  
Given the **root** of a binary tree, find the **maximum sum** of all keys of any subtree which is also a **Binary Search Tree (BST)**. 

A subtree of a tree is any node plus all its descendants. The sum of a subtree is the sum of all its nodes' values. The subtree must be a valid BST, which means for each node all values in the left subtree < node.val < all values in the right subtree.

### Examples  

**Example 1:**  
Input: root = `[1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]`

Tree:
```
       1
     /   \
    4     3
   / \   / \
  2   4 2   5
             / \
            4   6
```
Output: `20`
*Explanation: The subtree rooted at the second 3 is a BST with sum 20: [3,2,5,null,null,4,6].*

**Example 2:**  
Input: root = `[4,3,null,1,2]`

Tree:
```
    4
   /
  3
 / \
1   2
```
Output: `2`
*Explanation: Only the 2 is a valid BST subtree (since 3->1->2 is not BST), so max sum is 2.*

**Example 3:**  
Input: root = `[-4,-2,-5]`

Tree:
```
   -4
   /
 -2
 /
-5
```
Output: `0`
*Explanation: All BSTs here have negative sums, but per the problem, you can also pick an empty subtree with sum 0.*

### Thought Process (as if you’re the interviewee)  
A brute-force approach would be to check every subtree, see if it's a BST, sum its values. But that's O(n²) and too slow.

To optimize: 
- Use **post-order traversal** (process children before parent).
- At each node, gather: 
  - if its left/right subtrees are BSTs
  - min and max in each subtree
  - sum of the subtree

If left and right are both BSTs and `left_max < node.val < right_min`, then the subtree rooted at this node is a BST.
- Track the largest sum each time we find a BST.
- If not a BST, return info disallowing parent merges.

This can be done in O(n) as every node is visited once.

### Corner cases to consider  
- Single node trees
- Trees where all values are negative
- Trees with no BST subtree (other than empty)
- Empty trees (should return 0)
- Duplicates (BST cannot have duplicates in left/right positions)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxSumBST(root: TreeNode) -> int:
    max_sum = 0  # Store the maximum BST sum

    def postorder(node):
        nonlocal max_sum
        if not node:
            # isBST, min, max, sum
            return True, float('inf'), float('-inf'), 0
        l_is_bst, l_min, l_max, l_sum = postorder(node.left)
        r_is_bst, r_min, r_max, r_sum = postorder(node.right)
        # Current node forms BST if left/right are BSTs and vals in order
        if l_is_bst and r_is_bst and l_max < node.val < r_min:
            cur_sum = l_sum + node.val + r_sum
            max_sum = max(max_sum, cur_sum)
            # Update min/max for parent
            return True, min(l_min, node.val), max(r_max, node.val), cur_sum
        # Not BST: return dummy min/max so parent can't combine
        return False, 0, 0, 0

    postorder(root)
    return max_sum
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n): Each node is visited once via post-order.
- **Space Complexity:** O(h): Maximum depth of recursion = tree height (h), unless using stack for explicit traversal.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change your code if you needed to **return the subtree itself** (not just the sum)?  
  *Hint: Track start node when updating max_sum.*

- What if you need to find **all** maximal BST subtrees, not just the one with the largest sum?  
  *Hint: Collect nodes/sum each time you update max.*

- How does your code adapt for duplicate values if BST allows duplicates on left or right?  
  *Hint: Change the comparison to handle = depending on BST definition.*

### Summary
The post-order traversal plus tuple return pattern is common for subtree-aggregating problems. At each node, you check its children's info, and "bubble up" constraints (like BST or not, range, sum) efficiently. You see similar approaches in validation (isBST), diameter, or bottom-up sum/height tree problems.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
