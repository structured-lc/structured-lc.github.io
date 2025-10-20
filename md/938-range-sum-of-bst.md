### Leetcode 938 (Easy): Range Sum of BST [Practice](https://leetcode.com/problems/range-sum-of-bst)

### Description  
Given the root of a binary search tree (BST) and two integers, low and high, return the sum of all node values in the tree that are within the inclusive range [low, high]. In a BST, for each node, values in the left subtree are smaller than the node’s value, and values in the right subtree are greater.  
You need to efficiently sum all nodes whose values satisfy low ≤ node.val ≤ high.

### Examples  

**Example 1:**  
Input: `root = [10,5,15,3,7,null,18], low = 7, high = 15`  
Output: `32`  
*Explanation: The nodes with values 7, 10, and 15 are within [7,15]. 7 + 10 + 15 = 32.*

Tree:
```
     10
    /  \
   5    15
  / \     \
 3   7    18
```

**Example 2:**  
Input: `root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10`  
Output: `23`  
*Explanation: The nodes with values 6, 7, and 10 are within [6,10]. 6 + 7 + 10 = 23.*

Tree:
```
        10
      /    \
     5      15
    / \    /  \
   3   7  13  18
  /     \
 1       6
```

**Example 3:**  
Input: `root = [3,2,4,1], low = 2, high = 3`  
Output: `5`  
*Explanation: Nodes 2 and 3 are in range. 2 + 3 = 5.*

Tree:
```
  3
 / \
2   4
/
1
```

### Thought Process (as if you’re the interviewee)  
First, brute force would be to traverse every node in the BST (using in-order, pre-order, or any traversal), check if node.val is within [low, high], and sum it up.

However, since the tree is a BST, I can optimize:
- If node.val < low, all left descendants are also < low (so skip left subtree).
- If node.val > high, all right descendants are also > high (so skip right subtree).
- If node.val is within [low, high], add it and continue to both subtrees.

This way, unnecessary nodes/subtrees are skipped, leading to faster runtime—especially for large, skewed trees.

Recursion is simple and clear for tree traversal. An iterative stack solution is also possible but recursion is usually clearer for interviews.

### Corner cases to consider  
- Tree has only one node and it’s inside/outside of range.
- All nodes are below low or all nodes are above high (sum should be 0).
- Tree is skewed (all left or right).
- Tree has no nodes in [low, high].
- low == high (want to find exact matches).
- Range covers all node values.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def rangeSumBST(root, low, high):
    # Base case: Empty node returns 0
    if not root:
        return 0

    # If node's value is less than low, whole left subtree is too small
    if root.val < low:
        return rangeSumBST(root.right, low, high)
    
    # If node's value is greater than high, whole right subtree is too large
    if root.val > high:
        return rangeSumBST(root.left, low, high)
    
    # Node's value is in range; add it and explore both children
    return (
        root.val +
        rangeSumBST(root.left, low, high) +
        rangeSumBST(root.right, low, high)
    )
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) in the worst case (no skipping: BST is flat or range is very wide), where n is the number of nodes in the tree. With optimal pruning, traversal may visit far fewer nodes.
- **Space Complexity:** O(h), where h is the height of the BST, due to recursion stack. In worst case (skewed tree), h ~ n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very large and recursion causes stack overflow?  
  *Hint: How can you implement this iteratively (using a stack)?*

- How would your solution change if the tree were not a BST, but just a binary tree?  
  *Hint: Pruning optimization relies on BST properties.*

- Can you return the count of nodes in range, or the nodes themselves, not just their sum?  
  *Hint: Adjust the return statement and base case.*

### Summary
This problem is a classic example of optimized BST traversal with range pruning—a fundamental interview pattern. By leveraging BST properties, unnecessary work is avoided. This recursive pruning approach also applies to finding/counting nodes within range, or other tree windowing questions. The tree recursion + pruning pattern is a common one found throughout coding interviews involving search and traversal.


### Flashcard
Traverse BST; skip left if node.val < low, skip right if node.val > high, else sum node and both subtrees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
