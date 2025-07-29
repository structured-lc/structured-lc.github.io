### Leetcode 663 (Medium): Equal Tree Partition [Practice](https://leetcode.com/problems/equal-tree-partition)

### Description  
Given a binary tree, determine if you can **remove exactly one edge** to partition the tree into two subtrees with **equal sum** of node values. Each subtree must be non-empty after removal. You need to return `True` if such a split is possible, and `False` otherwise. Essentially, you can “cut” one branch and compare the total sums of the resulting two trees.

### Examples  

**Example 1:**  
Input: `[5,10,10,null,null,2,3]`  
Output: `True`  
*Explanation: Cutting the edge between root 5 and its left child 10 gives two subtrees. The left subtree sums to 10, and the remaining tree sums to 5+10+2+3=20, so this cut isn’t valid. But cutting the edge between the right child 10 and its left child 2 results in subtree sums 2 and 5+10+10+3=28, still not equal. However, if you sum all nodes the total is 30, so you search for any subtree with sum 15 to split.*  

**Example 2:**  
Input: `[1,2,10,null,null,2,20]`  
Output: `False`  
*Explanation: No matter which edge you remove, you cannot split the tree into two parts with equal sum of values. The total sum is 35 (odd), so split is impossible.*

**Example 3:**  
Input: `[0,1,1]`  
Output: `False`  
*Explanation: Total sum is 2, but removing any edge leaves one subtree summing to 1 and the other to 1 as well, but you must not count the whole tree, and no valid split exists where sums are equal after removing exactly one edge.*

Tree illustration for Example 1 with input: `[5,10,10,null,null,2,3]`  
```
      5
     / \
   10   10
        / \
       2   3
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try removing every possible edge, compute the sum of the two resulting subtrees, and check if they are equal. That’s O(n²), since we recompute subtree sums for every possible cut.
- **Observation:** The total sum of the whole tree must be even; otherwise, splitting into equal integer sums is impossible.
- **Optimization:** If the total sum is \( S \), we need to find **any subtree** whose sum is exactly \( S/2 \) (except the sum of the entire tree itself, since we must remove an edge).
- **DFS solution:** Use post-order DFS to compute sums of all subtrees, store them, then check if \( S/2 \) appears in these sums (ignoring the root’s full sum).
- **Why this approach:** Linear time, elegant, leverages recursive structure of trees, separating sum calculations and split feasibility.

### Corner cases to consider  
- Single-node tree: Cannot split into non-empty subtrees.
- Negative node values: Sums can be negative or zero.
- Tree sum is odd: Impossible to split.
- All zeros: Subtree sums can be zero, but we mustn't include the root as a potential cut.
- Highly unbalanced trees: (e.g., all nodes on one side).
- Multiple subtrees with the same sum.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def checkEqualTree(root):
    subtree_sums = []
    
    # Post-order DFS to compute all subtree sums
    def dfs(node):
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        total = node.val + left + right
        subtree_sums.append(total)
        return total

    total_sum = dfs(root)
    # Remove the full tree sum
    subtree_sums.pop()
    
    # If total is odd, cannot split equally
    if total_sum % 2 != 0:
        return False
    
    # Check if any subtree sums to total_sum // 2
    return (total_sum // 2) in subtree_sums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited once during DFS, and checking the array/set of subtree sums is O(1).
- **Space Complexity:** O(n) — Extra storage for subtree sums (up to n-1 entries), and recursion stack depth up to n in a skewed tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the edge to delete, not just a boolean?
  *Hint: Instead of just recording sums, track parent-child relationships as you compute subtree sums.*
- How would your solution handle trees with duplicate node values or with all values zero?
  *Hint: Ensure you don’t accidentally use the root sum itself to count a possible split.*
- Can you do this without storing all subtree sums in a list, but with O(1) extra space?
  *Hint: Consider early stopping in DFS if you find a suitable sum, though you’ll have to ensure correctness with multiple possible subtrees.*

### Summary
This problem uses the **DFS with subtree sum accumulation** pattern—classic in tree partitioning, path sums, and counting subtree properties. Computing all subtree sums in one post-order traversal is a common and powerful technique, especially when combined with problem-specific logic (such as checking for sum existence). This approach generalizes well to other problems about partitioning trees, cutting edges to optimize some property, or finding subtrees with specific characteristics.