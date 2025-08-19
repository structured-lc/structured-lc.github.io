### Leetcode 979 (Medium): Distribute Coins in Binary Tree [Practice](https://leetcode.com/problems/distribute-coins-in-binary-tree)

### Description  
You are given the root of a binary tree where each node has a certain number of coins (`node.val`). The total coins in the tree equals the total number of nodes `n`. In one move, you may move a single coin between adjacent nodes (parent-child). Your goal is to return the **minimum number of moves** required so every node has exactly one coin.  
Explain how you'd ensure all nodes end up with exactly 1 coin, and how to minimize the total number of moves needed.

### Examples  

**Example 1:**  
Input: `[3,0,0]`  
Output: `2`  
*Explanation: The root node has 3 coins, both children have 0.  
Move one coin from root to each child (2 moves).*

```
  3
 / \
0   0
```

**Example 2:**  
Input: `[0,3,0]`  
Output: `3`  
*Explanation: The left child has 3 coins.  
Move 2 coins to the root, then 1 coin from root to the right child (3 moves).*

```
  0
 / \
3   0
```

**Example 3:**  
Input: `[1,0,2]`  
Output: `2`  
*Explanation:  
Move 1 coin from right child to root, and 1 coin from root to left child (2 moves).*

```
  1
 / \
0   2
```

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  I could try all possible ways to move coins, but the number of options grows extremely fast as the tree gets bigger. This wouldn't scale.

- **Observation:**  
  Each move only involves a parent and its child. Also, since there are as many coins as nodes, the "extra" or "missing" coins at a node can be computed as `node.val - 1`.

- **DFS Approach:**  
  The problem aligns naturally to a *post-order DFS* (process children before parent). If a node has surplus coins, they need to be sent up towards the root; if a node is missing coins, it needs to receive them from above. For each node, compute the extra coins needed or available:  
  - `excess = node.val - 1 + left_excess + right_excess`
  - The total number of moves is increased by `abs(left_excess) + abs(right_excess)` for each node, since these represent coins moving between child and parent.

- **Why DFS works:**  
  By treating each subtree independently and accumulating the moves needed as we pass coins up (or down), we get optimal moves because each coin only travels along the shortest path.

### Corner cases to consider  
- Single-node tree (already balanced, zero moves)
- All coins are already at the correct place (no moves)
- A skewed tree (all left/right children)
- Deep trees with coins concentrated at one extreme
- Tree where many nodes start with 0 coins

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def distributeCoins(self, root: 'TreeNode') -> int:
        self.moves = 0

        def dfs(node):
            if not node:
                return 0  # No excess coins at null node

            left = dfs(node.left)    # Excess from left subtree
            right = dfs(node.right)  # Excess from right subtree

            # Total moves += moves needed to balance left and right
            self.moves += abs(left) + abs(right)

            # Return this node's excess up to the parent
            return node.val - 1 + left + right

        dfs(root)
        return self.moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We visit every node once (DFS traversal).
- **Space Complexity:** O(h)  
  Where h is the height of the tree, due to recursion stack. In the worst case (skewed tree), h = n. No extra storage except the recursive calls.

### Potential follow-up questions (as if you’re the interviewer)  

- What if coins can only be moved from parent to child (not both directions)?  
  *Hint: Think about how this restriction changes the move calculation.*

- How would you extend the approach to an N-ary tree?  
  *Hint: Generalize the logic from two children to any number.*

- Can you modify the solution to output the sequence of moves, not just the number?  
  *Hint: Keep track of the path during DFS where coins are transferred.*

### Summary
This problem is a classic *post-order DFS* on trees, a pattern useful for many redistribution or bottom-up calculations (e.g., subtree sum, balances).  
The key is to propagate the "excess" of coins up the tree, accumulating the minimal move cost at each step.  
Patterns like this arise when distributing or collecting resources or when local corrections need to be bubbled up through a tree.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Sum of Distances in Tree(sum-of-distances-in-tree) (Hard)
- Binary Tree Cameras(binary-tree-cameras) (Hard)