### Leetcode 337 (Medium): House Robber III [Practice](https://leetcode.com/problems/house-robber-iii)

### Description  
Given a **binary tree** where each node represents a house with a certain amount of money, determine the maximum amount of money a thief can steal *without robbing two directly-linked (parent-child) houses on the same night*. The thief must choose a subset of the houses in such a way that no two directly-connected houses are robbed at the same time. Return the highest possible sum.

### Examples  

**Example 1:**  
Input: `[3,2,3,null,3,null,1]`  
Output: `7`  
*Explanation: Rob houses with amount 3 (root), 3 (left.right), and 1 (right.right). Cannot rob the root’s children if robbing root. 3 + 3 + 1 = 7*  
```
    3
   / \
  2   3
   \    \
    3    1
```

**Example 2:**  
Input: `[3,4,5,1,3,null,1]`  
Output: `9`  
*Explanation: Rob houses with 4 (left), and 5 (right). 4 + 5 = 9. If we pick a child of root, we cannot pick the root itself.*  
```
     3
    / \
   4   5
  / \    \
 1   3    1
```

**Example 3:**  
Input: `[4,null,5,1,null,null,3]`  
Output: `8`  
*Explanation: Rob 4 (root) and 3 (right.right). Alternatively, 5 + 1 = 6, which is less than 7.*  
```
   4
    \
     5
    / \
   1   3
```

### Thought Process (as if you’re the interviewee)  
My goal is to maximize the sum of node values, but I can’t rob both a node and its direct children.  
- **Brute-force:** Try all subsets where no two adjacent nodes are included. For each node, make the decision to rob it or not, recursively applying the rule. This is exponential since we branch at every node and subtree.  
- **Better:** Notice that at every node, there are two choices:
  - *Rob this node:* Then, cannot rob its children, but can rob its grandchildren.
  - *Don’t rob this node:* Then, can rob its children (and next sublevels follow the same rule).
- This gives rise to **optimal substructure**, so we can use **DFS + memoization** (dynamic programming) with recursion. At each node, we track two values: max money if we rob this node or if we don’t.

For each call, instead of returning a single value, I return a tuple/list:  
- (max when we rob this node, max when we don’t rob this node).

**Why is this the best:**  
- Every decision at each node depends only on its children’s subproblems, not other parts of the tree.
- Memoization ensures we don’t recompute solutions for the same nodes.  
- Time complexity is O(N) for N nodes.

### Corner cases to consider  
- Empty tree (`root is None`): Should return 0.  
- Single node: Should return that node’s value.  
- All 0-valued nodes: Should return 0.  
- Tree with negative values (per constraints, values are ≥0, but checking non-positive cases is good practice).  
- Skewed tree (like a linked list).  
- Full binary tree: Should correctly alternate levels when needed.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def rob(root: TreeNode) -> int:
    # Helper function returns: (money when robbing this node, when not robbing it)
    def dfs(node):
        if not node:
            return (0, 0)
        
        left = dfs(node.left)
        right = dfs(node.right)
        
        # If robbing this node, cannot rob immediate children
        rob_this = node.val + left[1] + right[1]
        # If not robbing this node, can choose (rob or not) for children
        not_rob_this = max(left) + max(right)
        
        return (rob_this, not_rob_this)
    
    return max(dfs(root))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of nodes.  
  Each node is visited exactly once, and at each visit we do constant work.

- **Space Complexity:** O(N), due to recursion stack in the worst case (i.e., tree is completely unbalanced), and no extra data structures except for function call stack.


### Potential follow-up questions (as if you’re the interviewer)  

- Suppose houses are not organized in a tree but in a graph (cycles allowed).  
  *Hint: What’s the difference between trees and general graphs for such DP? Cycles introduce complications—think about max-weight independent set in a graph, which is NP-hard.*

- Can you optimize your solution further for extremely deep or wide trees?  
  *Hint: Consider iterative DFS/BFS to control stack usage, or Morris traversal for very large trees.*

- If house values can be negative, how would your logic change?  
  *Hint: When does it make sense to “rob” a house if the value is negative? You may want to treat negatives as not robbing at all.*

### Summary
This is a typical **DFS + DP on Trees** problem, using the "choose or skip" principle at each node. The pattern of returning two values for each subtree (rob, not rob) is often used for tree DP where strict parent-child constraints exist. This approach generalizes to many problems with mutually exclusive choices at hierarchical (tree or DAG) relationships.


### Flashcard
Use DFS to compute two values at each node: max if you rob it (can't rob children) and max if you don't (can rob children); return the larger.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- House Robber(house-robber) (Medium)
- House Robber II(house-robber-ii) (Medium)