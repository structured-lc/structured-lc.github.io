### Leetcode 563 (Easy): Binary Tree Tilt [Practice](https://leetcode.com/problems/binary-tree-tilt)

### Description  
Given the root of a binary tree, compute the **total tilt** of the tree.  
The **tilt** of a tree node is the absolute difference between the sum of values in its left subtree and the sum in its right subtree. A subtree sum for a missing child is considered to be 0.  
Return the sum of every node's tilt in the entire tree.  
(You’re given a `TreeNode` class with `val`, `left`, and `right`.)

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `1`  
*Explanation:  
- For node 2: tilt = |0 - 0| = 0  
- For node 3: tilt = |0 - 0| = 0  
- For node 1: tilt = |2 - 3| = 1  
Total tilt = 0 + 0 + 1 = 1*

``` 
    1
   / \
  2   3
```

**Example 2:**  
Input: `[4,2,9,3,5,null,7]`  
Output: `15`  
*Explanation:  
- Node 3, 5, 7: leaf, tilt = 0  
- Node 2: tilt = |3 - 5| = 2  
- Node 9: tilt = |0 - 7| = 7  
- Node 4: tilt = |(3+2+5) - (9+7)| = |10 - 16| = 6  
Total tilt = 0+0+0+2+7+6 = 15*

```
      4
     / \
    2   9
   / \   \
  3   5   7
```

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation: The tree is empty, so the tilt is 0.*


### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to calculate the sum of the left and right subtrees of each node independently, then get their absolute difference and sum these across all nodes. But recalculating subtree sums repeatedly is inefficient (potentially ⨉n calls per node).

Instead, I would use a **post-order traversal** so that for each node, I:
- First get the sum of its left subtree
- Then get the sum of its right subtree
- Compute the tilt at this node (|left sum - right sum|) and add it to a running total
- Return the total sum of the subtree rooted at this node

This method avoids recalculating subtree sums and results in O(n) time.

### Corner cases to consider  
- The tree is empty (`root` is `None`) → Should return 0
- Only one node → Should return 0 (since both children are missing)
- All nodes are to the left or the right (highly skewed tree)
- All node values are 0 (tilts will be 0)


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def findTilt(self, root: TreeNode) -> int:
        # This will store the sum of tilts for all nodes
        self.total_tilt = 0

        def post_order_sum(node):
            if not node:
                return 0
            # Calculate sum of left and right subtrees
            left_sum = post_order_sum(node.left)
            right_sum = post_order_sum(node.right)
            # Calculate and add the tilt of current node
            tilt = abs(left_sum - right_sum)
            self.total_tilt += tilt
            # Return the sum of this subtree
            return node.val + left_sum + right_sum

        post_order_sum(root)
        return self.total_tilt
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited only once because every node’s subtree sum and tilt are computed in one pass.
- **Space Complexity:** O(h) where h is the tree height — due to recursion stack. In the worst case, h ≈ n (skewed tree), average case for balanced is O(log n). No extra storage aside from the stack and the tilt counter.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this iteratively, without recursion?  
  *Hint: Use an explicit stack to simulate post-order traversal.*

- Can you also return the tilt for each node, not just the total?  
  *Hint: Store values in a dictionary mapping node to its tilt.*

- What if node values could be negative?  
  *Hint: abs() will still ensure the tilt is non-negative.*

### Summary
This problem uses the **post-order traversal** pattern, which is especially useful when child information is required before processing the parent (as for sum and tilt calculations).  
This approach avoids redundant computations by ensuring each node’s sum and tilt are computed exactly once, making it a classic **tree DFS** pattern that applies to problems involving subtree aggregation (sums, heights, counts, etc).

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Find All The Lonely Nodes(find-all-the-lonely-nodes) (Easy)