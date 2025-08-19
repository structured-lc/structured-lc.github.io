### Leetcode 1120 (Medium): Maximum Average Subtree [Practice](https://leetcode.com/problems/maximum-average-subtree)

### Description  
Given the root node of a **binary tree**, return the **maximum average value** among all possible subtrees.  
A *subtree* is any node in the tree plus all its descendants. The **average value of a subtree** is the sum of all nodes' values in the subtree divided by the number of nodes in that subtree.

### Examples  

**Example 1:**  
Input: `[5,6,1]`  
Output: `6.0`  
*Explanation: There are three subtrees:*
- *The subtree `[5,6,1]` with average (5+6+1)/3 = 4*
- *The subtree `` with average 6*
- *The subtree `[1]` with average 1*  
*The maximum average is 6 (from the subtree with just node 6).*

```
    5
   / \
  6   1
```

**Example 2:**  
Input: `[0,1,null]`  
Output: `1.0`  
*Explanation: The subtree `[0,1]` has average (0+1)/2 = 0.5, the subtree `[1]` has average 1, and `` has average 0. The maximum is 1 (node 1 itself).*

```
  0
 /
1
```

**Example 3:**  
Input: `[3,null,7]`  
Output: `7.0`  
*Explanation: The subtree `[3,7]` has average (3+7)/2 = 5, `[3]` has 3, `` has 7. Maximum is 7.*

```
  3
   \
    7
```

### Thought Process (as if you’re the interviewee)  

1. **Brute-force approach:**  
   - For every possible subtree, compute the sum and count of nodes, then calculate the average.  
   - Check all \( O(n) \) subtrees, and for each, traverse their nodes (\( O(n) \)), leading to \( O(n^2) \) time.
   - This is inefficient for large trees.

2. **Optimized approach:**  
   - Use **post-order DFS traversal**.
   - For each node, recursively get the sum and node-count from left and right children.
   - Compute the sum and count including the current node.
   - Calculate the average for that subtree, and update the result if it’s higher than the current maximum.
   - Each node is visited once, so total time is \( O(n) \).

**Why this approach?**  
- Trees are naturally recursive. Post-order traversal allows collecting data from children before processing the current node. This enables sum and count accumulation bottom-up and direct computation.

### Corner cases to consider  
- Tree with only **one node** (single root).
- All nodes have the **same value**.
- Tree skewed left or right (e.g., all nodes only in left children).
- Negative node values.
- Tree with **null** children.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maximumAverageSubtree(self, root: TreeNode) -> float:
        self.max_avg = 0.0

        def dfs(node):
            # Returns (sum_of_subtree, count_of_subtree)
            if not node:
                return (0, 0)
            
            left_sum, left_count = dfs(node.left)
            right_sum, right_count = dfs(node.right)
            
            subtotal = node.val + left_sum + right_sum
            total_count = 1 + left_count + right_count
            
            avg = subtotal / total_count
            self.max_avg = max(self.max_avg, avg)
            
            return (subtotal, total_count)
        
        dfs(root)
        return self.max_avg
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each node is visited exactly **once** during the DFS traversal.
  - Calculations per node take O(1).  
  - **Total time: O(n)**, where n is the number of nodes.

- **Space Complexity:**  
  - **O(h)** due to the recursion stack, where h is the height of the tree.
  - **O(n)** in the worst case (skewed tree); **O(log n)** for balanced trees.
  - Negligible extra space other than recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if node values can be **negative**, how does this affect the result?  
  *Hint: Think about how averages with negative numbers change, and check if your code supports it without error.*

- How can you **recover the subtree** that gives the maximum average?  
  *Hint: Modify your DFS to store and return the subtree root whenever a new maximum is found.*

- Can you solve this **iteratively** without recursion?  
  *Hint: Simulate the postorder traversal using a stack; track sum and count for each node.*

### Summary
This uses a **postorder DFS traversal** with bottom-up aggregation to compute subtree sums and sizes, then calculates averages efficiently in one pass. The coding pattern (DFS aggregation) is common for tree-based problems where each node’s result depends on its descendants, and is reusable in problems like computing tree diameters, subtree sums, or most frequent subtree sums.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Count Nodes Equal to Sum of Descendants(count-nodes-equal-to-sum-of-descendants) (Medium)
- Count Nodes Equal to Average of Subtree(count-nodes-equal-to-average-of-subtree) (Medium)