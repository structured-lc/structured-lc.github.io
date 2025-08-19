### Leetcode 1145 (Medium): Binary Tree Coloring Game [Practice](https://leetcode.com/problems/binary-tree-coloring-game)

### Description  
Given a binary tree with n nodes (numbered 1 to n), two players take turns coloring nodes.  
- Player 1 chooses a node x and colors it red.  
- Player 2 then chooses a node y (y ≠ x) and colors it blue.  
- After this, players alternate turns, coloring an adjacent uncolored node with their own color.  
- The game ends when all nodes are colored.  
- **Whoever colors more than half of the nodes wins.**  

The task: Given the root of the tree, total nodes n, and the node x selected by Player 1, determine if Player 2 can guarantee a win regardless of how Player 1 plays.

### Examples  

**Example 1:**  
Input:  
- n = 11  
- x = 3  
- tree = [1,2,3,4,5,6,7,8,9,10,11]  

Output: `True`  
*Explanation: If Player 2 picks y = 2 or y = 4, they can control a region with more than ⌊11/2⌋ = 5 nodes. By picking a node in the biggest subtree not containing x, Player 2 controls the majority.*

**Example 2:**  
Input:  
- n = 3  
- x = 1  
- tree = [1,2,3]  

Output: `False`  
*Explanation: Whatever Player 2 picks, Player 1 can always reach enough nodes to tie or win, so Player 2 cannot win.*

**Example 3:**  
Input:  
- n = 5  
- x = 2  
- tree = [1,2,3,null,null,4,5]  
```
    1
   / \
  2   3
     / \
    4   5
```
Output: `True`  
*Explanation: If Player 2 picks node 3, they can control at least 3 nodes, which is more than ⌊5/2⌋ = 2 nodes.*

### Thought Process (as if you’re the interviewee)  

- First, analyze how the nodes spread from Player 1’s choice.
- When Player 1 picks node x, from x, there are three regions:  
  1. x's left subtree  
  2. x's right subtree  
  3. The "parent side" (all nodes not in x’s subtree), i.e., the rest of the tree above x
- The strategy for Player 2 is to pick a node in the region with the largest number of nodes not containing x.  
- If **any region contains more than half of the nodes** (i.e., > ⌊n/2⌋), Player 2 can pick a node in that region and win—because Player 1 can only expand from x and cannot block all pathways.  
- So, the key is: compute the size of x’s left subtree (l), right subtree (r), and “rest” region (p = n - l - r - 1), and check if any is > ⌊n/2⌋.

### Corner cases to consider  
- Skewed trees (all left or all right children)
- x is root, leaf, or internal node
- Tiny trees: n = 1 or 2
- Trees where all regions are ≤ ⌊n/2⌋
- Player 2 forced to pick from smaller region (loses by default)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def btreeGameWinningMove(root, n, x):
    # Helper to find sizes of left and right subtree of node x
    def count(node):
        if not node: 
            return 0
        left = count(node.left)
        right = count(node.right)
        if node.val == x:
            # Capture the sizes at node x
            self.left_size = left
            self.right_size = right
        return left + right + 1

    self = type('', (), {})() # local state object
    self.left_size = 0
    self.right_size = 0
    total = count(root)
    # Parent region = rest of nodes not in x's subtree or x itself
    parent_size = n - self.left_size - self.right_size - 1
    # Can Player 2 control a region of more than n//2 nodes?
    return max(self.left_size, self.right_size, parent_size) > n // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We traverse all nodes once to get subtree sizes.
- **Space Complexity:** O(h), where h = height of tree, due to recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is not binary?  
  *Hint: Generalize the region concept and count subtrees for multiway trees.*

- Can you describe/test the strategy on a very unbalanced tree?  
  *Hint: Probe worst-case expansions and possible blockades.*

- How would limiting allowed moves change the outcome?  
  *Hint: Consider if restricted to only immediate neighbors, or only leaf expansions.*

### Summary
This problem is an application of **binary tree traversal** and strategic partitioning.  
By counting **regions around Player 1’s pick**, we transform the game to a region-maximization problem: if Player 2 can start in the largest region (with more than half the nodes), they can guarantee a win.  
The pattern—divide the tree at a node and analyze the sizes of partitions—applies to problems like tree balance checks, "kth smallest in binary tree subregion," and network control simulations.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
