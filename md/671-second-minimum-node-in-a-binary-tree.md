### Leetcode 671 (Easy): Second Minimum Node In a Binary Tree [Practice](https://leetcode.com/problems/second-minimum-node-in-a-binary-tree)

### Description  
Given a special **binary tree** where each node has either two or zero children, and for any node with two children, its value is always the smaller of its two children's values (i.e., `root.val = min(root.left.val, root.right.val)`).  
Your task is to **find the second smallest value** among all nodes in the tree. If such a value doesn't exist (i.e., all values are the same), return -1.

### Examples  

**Example 1:**  
Input: `[2,2,5,null,null,5,7]`  
Output: `5`  
*Explanation: The minimum value is 2. The values are [2, 2, 5, 5, 7]; the second smallest is 5.*

Tree:
```
    2
   / \
  2   5
     / \
    5   7
```
List: [2,2,5,null,null,5,7]


**Example 2:**  
Input: `[2,2,2]`  
Output: `-1`  
*Explanation: All node values are 2. There is no second minimum.*

Tree:
```
    2
   / \
  2   2
```
List: [2,2,2]


**Example 3:**  
Input: `[5,8,5]`  
Output: `8`  
*Explanation: Values are [5,8,5]; smallest is 5, second smallest is 8.*

Tree:
```
    5
   / \
  8   5
```
List: [5,8,5]


### Thought Process (as if you’re the interviewee)  
Let's restate: the smallest value is always `root.val`. The task is to find the smallest value in the tree that is **greater than the root's value**.

**Brute-force idea:**  
- Collect all the values in the tree (e.g., via BFS or DFS), sort, and scan to find the second unique value.

**Optimizations:**  
- Given the tree property, **root.val is always the minimum**, so any value > root.val is a candidate.
- We can traverse the tree (DFS or BFS) and track only those values > root.val, keeping the smallest such value found.
- As soon as we find a node with value > root.val, if it’s smaller than the current second min, update our result.
- When traversing, if a node's value > root.val, **prune** its children since due to the property, all descendants will be ≥ this value.

**Why stick to DFS with pruning?**
- Clean solution with O(N) time in the worst case, but many branches are pruned for efficiency.

Trade-offs:
- BFS + set is easy, but not as efficient.
- DFS with pruning is optimal for interview: simple, performs well due to tree property, and avoids storing all values.

### Corner cases to consider  
- Only one unique value (e.g., [1,1,1]) → output -1.
- All nodes are leaves (i.e., a single node) → no second minimum.
- Second minimum at various depths (ensure search does not stop at shallow level).
- Very skewed trees (e.g., all left/right).
- All nodes with two children, but all values same.
- Duplicate values except one larger number.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findSecondMinimumValue(root):
    # Edge: if root is None, return -1 (problem guarantee: non-empty tree)
    if not root:
        return -1

    # Save the smallest value
    min_val = root.val
    self.ans = float('inf')

    def dfs(node):
        if not node:
            return
        # If a value is found that's bigger than min_val but less than current ans, update
        if min_val < node.val < self.ans:
            self.ans = node.val
        # Only need to recurse if node's value == min_val
        elif node.val == min_val:
            dfs(node.left)
            dfs(node.right)
        # If node.val > self.ans, prune; (implicit by the conditions)

    dfs(root)
    return self.ans if self.ans < float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of nodes. Each node is visited at most once. Pruning helps in reducing the actual traversal in practice.
- **Space Complexity:** O(H), where H is the height of the tree, due to the recursion stack. In worst case (skewed tree), H ≈ N; for balanced trees, H ≈ log N. No extra data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the algorithm if asked for the third smallest value?
  *Hint: Consider keeping track of multiple unique candidates, perhaps in a set or via custom traversal logic.*

- Can this approach be applied if the tree does not guarantee the min-property?
  *Hint: You may need to revert to a brute-force collect-all-values solution.*

- What if the tree is not binary (e.g., n-ary)?
  *Hint: DFS/BFS generalizes; adjust traversal accordingly.*

### Summary
This problem is a classic **tree traversal with pruning** pattern. The binary tree's special property enables pruning of unnecessary paths, making the solution efficient and clear.  
The approach—searching for the smallest qualifying value strictly greater than the minimum—is similar to the "second minimum/unique value" problems, which commonly appear in both trees and arrays.  
The **pattern** applies to other scenarios where finding the "runner-up" value under monotonicity properties is required.