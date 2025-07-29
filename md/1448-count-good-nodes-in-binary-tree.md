### Leetcode 1448 (Medium): Count Good Nodes in Binary Tree [Practice](https://leetcode.com/problems/count-good-nodes-in-binary-tree)

### Description  
Given the root of a binary tree, count the number of "good" nodes in the tree.  
A node is considered **good** if, on the path from the root to that node, there are *no nodes* with a value greater than the current node’s value.  
For each node, you must check if its value is at least as large as every value you have seen so far on the way down from the root to that node.

### Examples  

**Example 1:**  
Input: `[3,1,4,3,null,1,5]`  
Tree:
```
     3
    / \
   1   4
  /   / \
 3   1   5
```
Output: `4`  
*Explanation: Good nodes are 3 (root), 4, 5, and left 3. Each has no ancestor greater than itself on the path from root.*

**Example 2:**  
Input: `[3,3,null,4,2]`  
Tree:
```
    3
   /
  3
 / \
4   2
```
Output: `3`  
*Explanation: Good nodes are 3 (root), left 3, and 4. Each is at least as large as all ancestors up to it.*

**Example 3:**  
Input: `[1]`  
Tree:  
`1`  
Output: `1`  
*Explanation: The root alone — always "good".*

### Thought Process (as if you’re the interviewee)  
To solve this, I see that for each node, I need to know the *maximum value* seen along the path from the root to that node. If a node’s value is at least as big as that maximum, then it’s "good".

- **Brute-force idea:** For each node, traverse from root to node and check if any ancestor is greater. That would require traversing the path for each node, which is inefficient.
- **Optimization:** Instead, do a **Depth-First Search (DFS)** where at each node, I carry the current maximum value observed so far from root to this node.  
  - When I visit a node:
    - If its value is at least the current max, it's "good".
    - I continue DFS to left and right children, updating the max (`max(new_max, node.val)`).
- This visits each node once, maintains only O(h) extra stack space for recursion, and efficiently checks the condition in a single pass.

### Corner cases to consider  
- Empty tree (not required by the problem: input always non-empty)
- Single-node tree (root is always good)
- All nodes have the same value
- Tree is skewed (all left or all right)
- A child is less than, equal to, or greater than its ancestor in any branch

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def goodNodes(root: TreeNode) -> int:
    # Helper function to perform DFS traversal
    def dfs(node, max_so_far):
        if not node:
            return 0
        # Check if current node is "good"
        is_good = 1 if node.val >= max_so_far else 0
        # Update max for children's path
        new_max = max(max_so_far, node.val)
        # Count good nodes in left and right subtrees
        left_good = dfs(node.left, new_max)
        right_good = dfs(node.right, new_max)
        return is_good + left_good + right_good

    # Start DFS from root, with initial max = root.val
    return dfs(root, root.val)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once during DFS traversal (where n is the number of nodes in the tree).

- **Space Complexity:** O(h)  
  *h* is the height of the tree (due to recursion stack).  
  In the worst case (skewed tree), this could be O(n); in the best/balanced tree, O(log n).  
  No extra storage is needed aside from recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- If the tree is extremely unbalanced, can you avoid recursion stack overflow?  
  *Hint: Use an explicit stack for iterative DFS or BFS.*

- How would you modify your solution if you needed to count and also return all good node values?  
  *Hint: Store good node values in a list during DFS.*

- Can you solve this problem in a single traversal without recursion?  
  *Hint: Use an iterative approach with a stack maintaining (node, max_so_far).*

### Summary
This problem uses the **DFS with path-parameter tracking** coding pattern: as you traverse, you carry information about the path (the current max). This approach is common for problems where ancestor/descendant relationships or path properties must be evaluated. Other similar problems include "Path Sum", "Maximum Depth", or "Longest ZigZag Path" in a tree.