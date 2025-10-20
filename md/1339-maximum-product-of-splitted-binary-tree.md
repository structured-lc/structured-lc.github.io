### Leetcode 1339 (Medium): Maximum Product of Splitted Binary Tree [Practice](https://leetcode.com/problems/maximum-product-of-splitted-binary-tree)

### Description  
Given a binary tree with each node containing an integer value, split the tree into two subtrees by removing one edge. The product of the sum of the two resulting subtrees should be maximized. Return the maximum product achievable, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `root = [1,2,3,4,5,6]`

Tree:
```
       1
      / \
     2   3
    / \ / \
   4  5 6
```
Output: `110`
*Explanation: Remove edge between 1 and 2. Sum of subtree rooted at 2: 2+4+5=11, rest is 1+3+6=10. Product: 11×10=110 (maximum).*  

**Example 2:**  
Input: `root = [1,null,2,3,4,null,null,5,6]`

Tree:
```
    1
     \
      2
     / \
    3   4
       / \
      5   6
```
Output: `90`
*Explanation: Remove edge between 2 and 4.  Subtree sums: 4+5+6=15; rest is 1+2+3=6. Product: 15×6=90.*


### Thought Process (as if you’re the interviewee)  
- The key idea is: try removing every edge, compute the sums on both sides, get the product, and record the max.
- To do this efficiently, find the sum of every subtree.
- First, do a post-order DFS to compute and store the sum of each subtree.
- For every subtree, calculate product = subtree_sum × (total_sum - subtree_sum).
- Track the maximum such product.

### Corner cases to consider  
- Skewed tree (all left/right)
- All nodes have the same value
- Very large values or deep trees
- Single node tree (no edge to split)
- Negative values (if allowed)

### Solution

```python
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxProduct(root: Optional['TreeNode']) -> int:
    mod = 10**9+7
    subtree_sums = []
    
    def compute_subtree_sum(node):
        if not node:
            return 0
        s = node.val + compute_subtree_sum(node.left) + compute_subtree_sum(node.right)
        subtree_sums.append(s)
        return s

    total_sum = compute_subtree_sum(root)
    max_prod = 0
    for s in subtree_sums:
        max_prod = max(max_prod, s * (total_sum - s))
    return max_prod % mod
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), n = # of nodes (DFS traverses all nodes)
- **Space Complexity:** O(n), to store subtree sums

### Potential follow-up questions (as if you’re the interviewer)  

- Could you do this without storing all subtree sums?  
  *Hint: Track max on the fly during DFS.*
- What if there can be negative node values?  
  *Hint: Product may be maximized by the smallest/largest.*
- What if splitting is restricted to only one side (left or right)?  
  *Hint: Modify DFS accordingly.*

### Summary
This is a tree DP / post-order traversal problem. The core is computing subtree sums and maximizing a derived property (subtree_sum × rest). This pattern is useful in subtree-splitting or divide-and-conquer DP.


### Flashcard
Use postorder DFS to compute subtree sums; for each, calculate product of subtree_sum × (total_sum − subtree_sum), and track the maximum.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Count Nodes With the Highest Score(count-nodes-with-the-highest-score) (Medium)