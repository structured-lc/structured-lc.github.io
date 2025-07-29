### Leetcode 872 (Easy): Leaf-Similar Trees [Practice](https://leetcode.com/problems/leaf-similar-trees)

### Description  
Given two binary trees, determine whether they are **leaf-similar**.  
Two binary trees are leaf-similar if the sequence of their leaf nodes' values (from left to right) is identical in both trees.  
A *leaf node* is defined as a node with no left or right children.  
The task is to traverse both trees, collect their leaf node values in left-to-right order, and compare these sequences for equality.

### Examples  

**Example 1:**  
Input:  
```
Tree 1:      [3,5,1,6,2,0,8,null,null,7,4]
Tree 2:      [3,5,1,6,7,4,2,null,null,null,null,null,null,0,8]
Tree 1:
      3
     / \
    5   1
   / \ / \
  6  2 0 8
    / \
   7   4

Tree 2:
       3
     /   \
    5     1
   / \   / \
  6  7  4   2
               / \
              0   8
```
Output: `True`  
*Explanation:  
- Leaves from left to right:  
  Tree 1: `[6, 7, 4, 0, 8]`  
  Tree 2: `[6, 7, 4, 0, 8]`  
- Sequences are identical.*

**Example 2:**  
Input:  
```
Tree 1: [1,2,3]
Tree 2: [1,3,2]

Tree 1:
   1
  / \
 2   3

Tree 2:
   1
  / \
 3   2
```
Output: `False`  
*Explanation:  
- Leaves:  
  Tree 1: `[2, 3]`  
  Tree 2: `[3, 2]`  
- Sequences are not identical.*

**Example 3:**  
Input:  
```
Tree 1: [1]
Tree 2: [1]
Tree:
  1
```
Output: `True`  
*Explanation: Both trees have a single node, which is also a leaf.*

### Thought Process (as if you’re the interviewee)  
To determine if two trees are leaf-similar:
- For both trees, traverse them and collect all leaf nodes' values in left-to-right order.
- The simplest way is to use a **DFS (Depth-First Search)**, passing an array to collect leaf values as you go.
- After collecting both sequences, compare them.
- If they are identical, return True; otherwise, return False.
- This approach is straightforward, efficient, and easy to implement.

**Brute-force idea:**  
Traverse both trees and flatten all nodes to a list, then filter for leaves.  
But this does unnecessary work—traversing internal nodes' values.

**Optimized approach:**  
During traversal, only collect leaf values.  
Use recursive DFS, which naturally goes left-to-right if you traverse the left child first.
This uses O(⌊n/2⌋) extra space per tree at most (for leaves), and O(n) time.

**Trade-offs:**  
DFS (either pre-order or in-order, as long as it's left before right) ensures the left-to-right order.  
BFS is less natural for this use case, as you want "first all left leaves, then right".  
So, DFS is the preferred choice for traversal and collecting leaves.

### Corner cases to consider  
- Either or both trees are `None` (empty trees).
- One tree taller, but same leaf sequence as the other (structural difference doesn't matter).
- Trees have only single node (root is also leaf).
- Different numbers of leaves.
- Leaves with same values, but in different order.
- Duplicates among leaf values (sequence, not set, matters).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def leafSimilar(root1, root2):
    # Helper function to collect leaf values in order
    def get_leaves(node, leaves):
        if not node:
            return
        # If node is a leaf, append its value
        if not node.left and not node.right:
            leaves.append(node.val)
            return
        # Traverse left and right children
        get_leaves(node.left, leaves)
        get_leaves(node.right, leaves)
    
    leaves1 = []
    leaves2 = []
    get_leaves(root1, leaves1)
    get_leaves(root2, leaves2)
    # Compare the two leaf sequences
    return leaves1 == leaves2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  n is the total number of nodes across both trees.  
  Each node is visited once during DFS traversal.

- **Space Complexity:** O(⌊n/2⌋)  
  At most, all leaf nodes are stored (worst case: half of the nodes are leaves in a full binary tree).  
  Also, recursive stack space may be O(h) where h is the height; in worst case O(n) for a skewed tree, else O(log n) for balanced.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the leaf values are very large, or the trees are extremely large (out-of-memory concern)?  
  *Hint: Consider generators/yield to compare values one by one, instead of storing all leaves.*

- How would you adapt this to k-ary trees (not just binary)?  
  *Hint: Adjust the traversal to handle multiple children.*

- Can you compare leaf sequences in O(1) extra space (not counting call stack)?  
  *Hint: Use iterative pattern, or compare on-the-fly with generators.*

### Summary
This problem uses a **recursive DFS pattern** to traverse binary trees, targeting only the leaf nodes. Collecting leaves in left-to-right order and directly comparing the resulting lists is a common approach for sequence comparison in trees.  
The core coding pattern (collect-and-compare-leaf traversal) can also be applied to problems requiring subtree patterns, tree serialization, or path/value comparison problems.