### Leetcode 1973 (Medium): Count Nodes Equal to Sum of Descendants [Practice](https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants)

### Description  
Given the root of a binary tree, count how many nodes in the tree have a value equal to the sum of **all of their descendants’ values** (all nodes below them).  
A *descendant* of a node x means any node in the subtree rooted at x, except x itself. For a leaf node, this sum is 0.  
Return the number of nodes for which node.val == (left_subtree_sum + right_subtree_sum).

### Examples  

**Example 1:**  
Input: `[10,3,4,2,1]`  
Output: `2`  
Explanation:  
The tree is:  
```
      10
     /  \
    3    4
   / \
  2   1
```
- Node 10: Descendants are 3,4,2,1 → sum=10. 10==10, so count one.
- Node 3: Descendants are 2,1 → sum=3. 3==3, count one.
- Other nodes don’t satisfy.

**Example 2:**  
Input: `[2,3,null,2,null]`  
Output: `0`  
Explanation:  
The tree is:  
```
    2
   /
  3
 /
2
```
- Node 2: Descendants are 3,2 → sum=5≠2.
- Node 3: Descendants are 2 → sum=2≠3.
- Node 2 (leaf): No descendants → sum=0≠2.

**Example 3:**  
Input: ``  
Output: `1`  
Explanation:  
Single node (a leaf): descendant sum=0, so it qualifies (0==0).

### Thought Process (as if you’re the interviewee)  
- First, I need to compute the sum of all descendants for each node.
- Brute-force: For each node, traverse all nodes in its subtree to sum values. But this is O(n²) and slow.
- Optimize: Since subtree sums are needed, use **DFS postorder traversal** — first compute left/right subtree sums recursively, use these to compute descendant sum for current node, and compare.
- This way, every subtree sum is calculated only once — O(n).
- For leaf nodes: descendant sum is 0, so node qualifies iff value==0.
- Will use helper DFS returning subtree sum, and count matches as we go.

### Corner cases to consider  
- Single node tree (leaf): should count if the node value is 0.
- All values are zero — every node could qualify if internal nodes.
- Very large/sparse trees (deep left/right only).
- Repeated values.
- Nodes with only one child.
- Unbalanced trees.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def equalToDescendants(root):
    count = 0

    def dfs(node):
        nonlocal count
        if not node:
            return 0
        # recurse on children
        left_sum = dfs(node.left)
        right_sum = dfs(node.right)
        descendants_sum = left_sum + right_sum
        if node.val == descendants_sum:
            count += 1
        # return subtree sum = node's value + descendants_sum
        return node.val + descendants_sum

    dfs(root)
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited exactly once for subtree sum calculation.
- **Space Complexity:** O(h) — h is the tree height, due to recursion stack. In worst case (chain or skewed tree), h=n; in balanced tree, h=log n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of sum, the node must equal the *product* or *max* of its descendants?  
  *Hint: Change the aggregation operation inside DFS (but beware: product may cause overflow).*

- How would you print the actual nodes (not just count) that satisfy the property?  
  *Hint: Instead of counting, append nodes to a list.*

- Could you solve this iteratively instead of recursively?  
  *Hint: Use an explicit stack to simulate postorder traversal.*

### Summary
This problem uses the **postorder DFS pattern** for trees, which is a classic approach whenever child-to-parent aggregation is required (bottom-up). The same pattern is seen in sum-of-subtree, diameter of tree, and balanced tree checking problems. It’s efficient (O(n)), clear, and robust for all binary tree structures.


### Flashcard
DFS postorder traversal computes subtree sum for each node; count nodes where node value equals sum of all descendant values (excluding node itself).

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Most Frequent Subtree Sum(most-frequent-subtree-sum) (Medium)
- Maximum Average Subtree(maximum-average-subtree) (Medium)
- Count Nodes Equal to Average of Subtree(count-nodes-equal-to-average-of-subtree) (Medium)