### Leetcode 1022 (Easy): Sum of Root To Leaf Binary Numbers [Practice](https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers)

### Description  
Given a **binary tree** where every node contains a digit (0 or 1), interpret each **root-to-leaf path** as a binary number. *The root node is the most significant bit*.  
You need to return the **sum of all such numbers** formed by every root-to-leaf path.

For example:  
If a path from root to leaf is 1→0→1, it forms the binary number 101, which is 5 in decimal.

### Examples  

**Example 1:**  
Input: `[1,0,1,0,1,0,1]`  
Output: `22`  
*Explanation: The root-to-leaf paths represent binary numbers:  
- 100 (4),  
- 101 (5),  
- 110 (6),  
- 111 (7).  
Sum: 4 + 5 + 6 + 7 = 22.*

Tree representation:
```
      1
     / \
    0   1
   / \ / \
  0  1 0  1
```

**Example 2:**  
Input: ``  
Output: `0`  
*Explanation: Only one node, so only path: 0 → Value: 0.*

Tree:
```
0
```

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Only one node, binary number is 1 → Value: 1.*

Tree:
```
1
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  - Traverse all root-to-leaf paths.
  - For each path, collect node values in a list, construct the binary string, then convert to decimal and sum up.
  - This is inefficient because building/maintaining each path explicitly is unnecessary.

- **Optimal Approach**:  
  - Use **DFS recursion**.
  - As we traverse, keep track of the current binary value (`curr_sum`). For each node, update as: `curr_sum = curr_sum × 2 + node.val`.
  - When reaching a **leaf node** (no left/right children), add `curr_sum` to total sum.
  - This avoids building the path lists and does conversion **on the fly**.
  - Trade-offs:  
    - Simple code.
    - Stack space for recursion (`O(h)` where `h` is height of tree).
    - No extra space to store paths.

### Corner cases to consider  
- Tree has only one node.
- Tree is skewed (all left or all right).
- All node values are 0 (sum should still be zero regardless of path count).
- Large deep trees (test recursion/iteration depth).
- Unbalanced trees where some leaves are much deeper than others.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sumRootToLeaf(root):
    # Helper function for DFS traversal.
    def dfs(node, curr_sum):
        if not node:
            # Null node, contribute nothing.
            return 0
        # Update current sum: left-shift bits and add current node value.
        curr_sum = (curr_sum << 1) | node.val
        # Check if leaf node.
        if not node.left and not node.right:
            return curr_sum
        # Recurse for both children, sum results.
        return dfs(node.left, curr_sum) + dfs(node.right, curr_sum)
    
    return dfs(root, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once, n is the number of nodes.

- **Space Complexity:** O(h)  
  h is the height of the tree (function call stack in recursion). In the worst case (linear tree), h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this using **iteration** instead of recursion?  
  *Hint: Simulate the DFS using an explicit stack and maintain current sum for each path.*

- How would you handle the case where **node values are not restricted to 0/1**?  
  *Hint: The problem logic depends on the binary representation, which only works for 0/1.*

- What if the tree is very deep and recursion exceeds the stack limit?  
  *Hint: Rewrite the solution with an explicit stack for iterative DFS or use a queue for BFS.*

### Summary
This problem uses the **DFS + path accumulation** coding pattern, where you traverse the tree while maintaining a running value (representing the binary number along the path).  
It’s a great example of converting path-based information while traversing, updating state without extra structures, and is similar to tree-path-sum and root-to-leaf encoding problems.


### Flashcard
Use DFS to traverse tree, passing current value as curr_sum×2+node.val; sum curr_sum at leaves for total.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
