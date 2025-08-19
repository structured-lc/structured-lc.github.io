### Leetcode 1530 (Medium): Number of Good Leaf Nodes Pairs [Practice](https://leetcode.com/problems/number-of-good-leaf-nodes-pairs)

### Description  
Given a binary tree and an integer `distance`, count the number of **good pairs** of leaf nodes. A pair of leaves is called "good" if the length (number of edges) of the shortest path between them is **less than or equal to** `distance`.  
You must return the number of such "good" leaf node pairs in the tree.

### Examples  

**Example 1:**  
Input: `root = [1,2,3,null,4]`, `distance = 3`  
Output: `1`  
*Explanation:  
Tree:  
```
   1
  / \
 2   3
  \
   4
```
Leaf nodes: 3, 4.  
Shortest path between 3 and 4: 2↗1↘3 OR 3↗1↘2↘4. The path length is 3.  
Only one pair (3,4) and it is "good" (path length 3 ≤ distance).*

**Example 2:**  
Input: `root = [1,2,3,4,5,6,7]`, `distance = 3`  
Output: `2`  
*Explanation:  
Tree:  
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
Leaf nodes: 4, 5, 6, 7.  
"Good" pairs: (4,5), (6,7). Each with path length 2 (≤ 3).  
Pairs like (4,6) have a path length 4 (> 3), so not "good".*

**Example 3:**  
Input: `root = [7,1,4,6,null,5,3,null,null,null,null,null,2]`, `distance = 3`  
Output: `1`  
*Explanation:  
Tree:  
```
       7
      / \
     1   4
    /   / \
   6   5   3
            \
             2
```
Leaf nodes: 6, 5, 2.  
"Good" pair: (2,5), path length 3 (2↗3↗4↙5). Only one pair is "good".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Gather all leaf nodes via tree traversal.  
  - For each pair of leaves, compute their shortest path distance (can be found using Lowest Common Ancestor or DFS from each leaf, etc). O(n²) leaf pairs × cost per pair: expensive for large trees.
- **Optimization:**  
  - Traverse the tree bottom-up (post-order).  
  - At every node, record a list: for each depth `d` (distance to leaves under this subtree), how many leaf nodes are exactly at depth `d`.  
  - For each node, count all pairs of leaves that live in the left and right subtree such that their combined distance (from this node) is ≤ `distance`. For each left depth `d₁` and right depth `d₂`, if (d₁ + d₂ + 2) ≤ distance, count left[d₁] × right[d₂].
  - Propagate depth counts up (add 1 as we go up each level).
  - This way, every pair of leaves is only counted at their lowest common ancestor and in a single traversal.  
- **Why this approach:**  
  - Reduces unnecessary repeated computation.  
  - Only consider leaf pairs from disjoint subtrees (no double counting).

### Corner cases to consider  
- Tree with one node (no leaf pairs, answer is 0).  
- Tree with no leaves (degenerate, but possible).  
- `distance` very small (e.g., distance = 1).  
- All leaves directly connected to the root (check if distances work).  
- Skewed (chain) trees, complete binary trees, unbalanced branches.

### Solution

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countPairs(self, root: TreeNode, distance: int) -> int:
        self.ans = 0

        # Post-order DFS; returns list where index i = count of leaves at depth i.
        def dfs(node):
            if not node:
                return [0] * (distance + 1)
            # If leaf: only depth 1 has count 1 (since edge count from parent).
            if not node.left and not node.right:
                arr = [0] * (distance + 1)
                arr[1] = 1
                return arr

            left = dfs(node.left)
            right = dfs(node.right)

            # Count good pairs between left and right leaf nodes
            for l in range(1, distance + 1):
                for r in range(1, distance + 1):
                    if l + r <= distance:
                        self.ans += left[l] * right[r]
            # Build new depth list for this node to pass up (add 1 to each depth)
            curr = [0] * (distance + 1)
            for d in range(1, distance):
                curr[d + 1] = left[d] + right[d]
            return curr

        dfs(root)
        return self.ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n), where n = number of nodes.  
    - Each node computes pairs for (≤ distance)² pairs (distance ≤ 10, so considered constant).
    - Tree is traversed once.

- **Space Complexity:**  
  - O(n), for recursion stack.  
  - Each node at most holds an array of size distance+1 (constant). Total: O(n) auxiliary due to recursion for a skewed tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the distance constraint is much larger?  
  *Hint: How can you avoid O(distance²) work per node? Is there a better way for large distance?*

- How would you adapt your solution if the tree was not binary, but k-ary?  
  *Hint: Would the cross-pairing step/generalization still work?*

- What if the tree was very large and you needed to return only the number of good pairs for an online stream of updates (dynamic tree)?  
  *Hint: Can you incrementally update counts, or do you always need to recompute for the subtree? Is there a data structure that helps?*

### Summary
This problem uses the "bottom-up post-order DFS, propagate auxiliary information" pattern, often seen in tree problems that require pairwise or subtree aggregate computations (e.g., count paths, sum distances, k-distant pairs between leaves).  
Instead of brute-force, focus on **passing depth metadata upward** and **counting only relevant subtree pairs** at the lowest common ancestor. This pattern is common and useful for counting pairs or paths in subtrees, and variants arise in problems like "sum of distances between nodes," path sum queries, or subtree aggregations.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
