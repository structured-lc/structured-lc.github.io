### Leetcode 2265 (Medium): Count Nodes Equal to Average of Subtree [Practice](https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree)

### Description  
Given a binary tree where each node contains an integer value, count how many nodes have a value equal to the average value of all nodes in their subtree (including themselves).  
- The average is computed as the sum of all subtree node values divided by the total number of nodes in that subtree, rounded down to the nearest integer.  
- Each node is the root of its own subtree for this computation.

### Examples  

**Example 1:**  
Input: `[4,8,5,0,1,null,6]`  
Output: `5`  
*Explanation:*

The tree structure:
```
        4
       / \
      8   5
     / \   \
    0   1   6
```
- Node 4: (4+8+5+0+1+6) / 6 = 24 / 6 = 4
- Node 8: (8+0+1) / 3 = 9 / 3 = 3
- Node 5: (5+6) / 2 = 11 / 2 = 5
- Node 0: 0 / 1 = 0
- Node 1: 1 / 1 = 1
- Node 6: 6 / 1 = 6  
Nodes 4, 5, 0, 1, 6 all match their subtree average.

**Example 2:**  
Input: `[1]`  
Output: `1`  
*Explanation:*  
Single node: 1 / 1 = 1. The root matches its own subtree average.

**Example 3:**  
Input: `[2,2,2]`  
Output: `3`  
*Explanation:*

The tree structure:
```
    2
   / \
  2   2
```
All nodes' value = (sum of subtree) / (count), so every node matches the average.

### Thought Process (as if you’re the interviewee)  

- Brute force:  
  For each node, traverse its entire subtree to compute the sum and count, then check if value matches average.  
  For \( n \) nodes, this can be highly inefficient (O(n²)) as many subtrees overlap.

- Optimize with post-order DFS:  
  Use depth-first search to compute and return both (sum, count) for every subtree in a bottom-up manner (post-order traversal). This way, for every node, you can easily compute its subtree sum and node count in O(1).  
  Compare node's value to ⌊subtree_sum / subtree_count⌋.  
  This reduces the time complexity to O(n) as every node is visited just once.

- Trade-offs:  
  DFS recursion may use up to O(h) stack space (where h is tree height), but offers optimal speed.  
  This is the standard recursion/DFS pattern for accumulating subtree aggregates, often used in tree DP.

### Corner cases to consider  
- Tree with a single node.
- All node values are the same.
- All values are distinct.
- Nodes with value 0.
- Very unbalanced trees (linked list shape).
- Large value ranges (0 to 1000 as per constraints).
- Subtrees whose sum isn't divisible by their count.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def averageOfSubtree(self, root: TreeNode) -> int:
        # Counter for result
        self.count = 0
        
        # Helper: returns (subtree_sum, subtree_count)
        def dfs(node):
            if not node:
                return (0, 0)
            
            left_sum, left_count = dfs(node.left)
            right_sum, right_count = dfs(node.right)
            
            subtree_sum = node.val + left_sum + right_sum
            subtree_count = 1 + left_count + right_count
            
            # Floor division for average as per definition
            average = subtree_sum // subtree_count
            
            if node.val == average:
                self.count += 1
            
            return (subtree_sum, subtree_count)
        
        dfs(root)
        return self.count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n), since we visit every node once, and all operations at each node are O(1).

- **Space Complexity:**  
  O(h), where h is the height of the tree, due to the recursion stack. In the worst case (skewed tree), h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the value range is large, or negative?  
  *Hint: Only arithmetic and integer division are used; no problem unless integer overflow is possible (Python handles big ints).*

- Can you do this iteratively, without recursion?  
  *Hint: Implement post-order DFS using your own stack.*

- What if the average needed to be rounded up instead of down?  
  *Hint: Use (sum + count - 1) // count for ceiling division.*

### Summary
This problem is a classic example of post-order DFS in a binary tree to aggregate information from child subtrees before handling the parent. The approach is a common pattern for "attribute of subtree" problems (computing subtree sum, count, min, max, etc.) and can be repurposed for many variations involving tree DP or post-order aggregation.


### Flashcard
Use post-order DFS to compute subtree sum and count in O(n) time; compare node value to average at each step.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Maximum Average Subtree(maximum-average-subtree) (Medium)
- Insufficient Nodes in Root to Leaf Paths(insufficient-nodes-in-root-to-leaf-paths) (Medium)
- Count Nodes Equal to Sum of Descendants(count-nodes-equal-to-sum-of-descendants) (Medium)