### Leetcode 1372 (Medium): Longest ZigZag Path in a Binary Tree [Practice](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree)

### Description  
Given the root of a binary tree, find the **length of the longest ZigZag path** in it.  
A ZigZag path starts from any node and moves to either the left or right child, and then alternates the direction at every subsequent step (left → right → left, etc.).  
The **path length** is the number of edges in the path, which is one less than the number of nodes visited.  
Return the length of the longest possible ZigZag path in the tree.

### Examples  

**Example 1:**  
Input: `[1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]`  
Tree:
```
    1
     \
      1
     / \
    1   1
       / \
      1   1
     /
    1
```
Output: `3`  
Explanation: The longest ZigZag path is (right → left → right), length = 3.  

**Example 2:**  
Input: `[1,1,1,null,1,null,null,1,1,null,1]`  
Tree:
```
    1
   / \
  1   1
   \
    1
   /
  1
   \
    1
```
Output: `4`  
Explanation: The longest ZigZag path is (left → right → left → right), length = 4.

**Example 3:**  
Input: `[1]`  
Tree:
```
1
```
Output: `0`  
Explanation: Only single node, so path length is zero.

### Thought Process (as if you’re the interviewee)  
First, I clarify the "ZigZag" path requirement:  
- At each step, the direction must change (left, then right, then left, etc.).
- We can start at any node and any direction, and must return the length (number of edges, not nodes).

Initial brute-force idea:  
- From every node, try all possible ZigZag paths starting both to the left and right, recursively alternate child direction.
- Update the maximum as we go.
- Although this covers all cases, it has a lot of redundant computation.

Optimization:  
- Use **DFS** (Depth-First Search).
- For each node, recursively return the longest ZigZag path if the previous step was to the left, and also if it was to the right.
- For each node, calculate both:
  - If we came from left: Length = 1 + ZigZag from the right child (must alternate).
  - If we came from right: Length = 1 + ZigZag from the left child.
- Track the global maximum during traversal.

Why DFS DFS suits this problem because it naturally explores all paths from each node, with simple state tracking (current direction, current length).  
DFS only visits each node twice (once for left, once for right direction), so it’s efficient.

### Corner cases to consider  
- Tree with only one node.
- Tree is a straight line (all left or all right).
- Completely balanced vs. uneven trees.
- All node values the same (values irrelevant for this problem).
- Nodes without both children.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestZigZag(self, root: TreeNode) -> int:
        self.max_len = 0  # Track the overall max ZigZag length
        
        def dfs(node, direction, length):
            # If node is None, end of path
            if not node:
                return

            # Update max_len at each step
            self.max_len = max(self.max_len, length)

            # If previous move was left, now must go right, and vice-versa
            if direction == 'left':
                dfs(node.left, 'right', length + 1)   # Continue ZigZag to left
                dfs(node.right, 'left', 1)            # Start new ZigZag from right child
            else:  # direction == 'right'
                dfs(node.right, 'left', length + 1)   # Continue ZigZag to right
                dfs(node.left, 'right', 1)            # Start new ZigZag from left child
        
        # Try from root, both starting with left and with right
        dfs(root.left, 'right', 1)
        dfs(root.right, 'left', 1)
        return self.max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** 𝒪(n)  
  Each node is visited a constant number of times (for both directions), so overall operations are linear in the number of nodes.

- **Space Complexity:** 𝒪(h), where h is the tree height  
  This is due to the recursion stack used in DFS. In the worst case (skewed tree), h ≈ n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very deep (e.g. millions of nodes)?  
  *Hint: Consider tail-recursive or iterative DFS to avoid stack overflow.*

- How would you extend this to return the actual path, not just its length?  
  *Hint: Store parent or path information during traversal.*

- How to find the starting node(s) of the longest ZigZag paths, not just the maximum length?  
  *Hint: Track the node id or value along with running maximum.*

### Summary
This approach uses **DFS** with a direction indicator and path length state.  
By exploring both left and right starts for every node, we ensure all possible ZigZag paths are considered.  
The pattern of passing state (direction, length) in recursion is a common binary tree DP technique and can be reused for diameter, balanced, or longest path problems.


### Flashcard
Recursively try ZigZag paths from each node in both directions; alternate left/right, track and update max length.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Zigzag Grid Traversal With Skip(zigzag-grid-traversal-with-skip) (Easy)