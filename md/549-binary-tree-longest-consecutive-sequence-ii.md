### Leetcode 549 (Medium): Binary Tree Longest Consecutive Sequence II [Practice](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii)

### Description  
Given the root of a **binary tree**, find the length of the longest path in the tree where the path is made of **consecutive values** that are either strictly increasing or strictly decreasing, and each pair of consecutive nodes in the path differ by exactly 1.  
The path does **not** need to be in parent-child order and can “bounce” at a parent node (e.g., child–parent–child).  
For example:  
If the path is [2, 1, 0], each number differs from its neighbors by 1 (decreasing sequence).  
If the path is [1, 2, 3], each number increases by 1.

### Examples  

**Example 1:**  
Input:  
```
    1
   / \
  2   3
```
Output: `2`  
Explanation: The longest consecutive path is [1, 2] or [2, 1]. Either increasing or decreasing by 1.

**Example 2:**  
Input:  
```
    2
   / \
  1   3
```
Output: `3`  
Explanation: The longest consecutive path is [1, 2, 3] or [3, 2, 1]. Both are valid increasing or decreasing consecutive paths.

**Example 3:**  
Input:  
```
   3
  /
 2
/
1
```
Output: `3`  
Explanation: The path [1, 2, 3] is a valid consecutive increasing path.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try every possible path in the tree, checking if it forms a valid consecutive sequence (increasing or decreasing).  
  - For every node, recursively enumerate all possible paths—this is very inefficient (exponential time).
- **Optimization**: Since we care about *increasing* and *decreasing* paths at every node, we can **use DFS** and, for each node, compute:  
  - The longest increasing path starting at this node.
  - The longest decreasing path starting at this node.
- **Key observation**:  
  - For each node, the *longest path* passing through that node is:  
    *left (inc) + right (dec) - 1* or *left (dec) + right (inc) - 1*  
    (combine left increasing with right decreasing, etc.)
  - At each node, update a global maximum.
- **Algorithm walk-through**:  
  1. Use DFS; for each node, get (inc, dec) for its children.
  2. If child differs by 1 up or down, increment corresponding count.
  3. Check combining left/right via the parent for maximum.
  4. Return (inc, dec) from every node to its parent for further computation.
- **Trade-offs**:  
  - Time is O(n), space is O(h)—efficient for trees.

### Corner cases to consider  
- Tree is empty (root is None)
- All node values are the same → longest = 1
- Only one node in tree
- Zig-zag/crossover sequences where a valid path alternates between left and right subtrees (must check both sides)
- Negative values, large positive values

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestConsecutive(self, root: TreeNode) -> int:
        if not root:
            return 0

        # Global variable to track the max length
        self.max_length = 0

        def dfs(node):
            if not node:
                # Return (inc, dec): tuple of int
                return (0, 0)
            
            inc = dec = 1  # at least the node itself
            
            # Check left child
            if node.left:
                left_inc, left_dec = dfs(node.left)
                if node.val == node.left.val + 1:
                    dec = max(dec, left_dec + 1)
                elif node.val == node.left.val - 1:
                    inc = max(inc, left_inc + 1)
                    
            # Check right child
            if node.right:
                right_inc, right_dec = dfs(node.right)
                if node.val == node.right.val + 1:
                    dec = max(dec, right_dec + 1)
                elif node.val == node.right.val - 1:
                    inc = max(inc, right_inc + 1)

            # Update the answer with the path passing through the node
            self.max_length = max(self.max_length, inc + dec - 1)
            
            return (inc, dec)

        dfs(root)
        return self.max_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once; each operation per node is constant time.
- **Space Complexity:** O(h), where h is the height of the tree (because of recursion stack). For a skewed tree, this could be O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to report the actual path, not just its length?  
  *Hint: Use parent pointers or store the path along with the counts in DFS.*

- How to handle duplicate values in nodes?  
  *Hint: Since consecutive means values differ by 1, duplicates cannot be part of the same consecutive path.*

- What about a k-ary tree (non-binary)?  
  *Hint: Generalize the code to check each child in a loop, not just left/right.*

### Summary
This problem uses the **DFS with backtracking** pattern for trees, maintaining and combining counts for increasing and decreasing paths at each node. Techniques here—computing values on the way back up the tree, and merging child results at their parent—are common in binary tree “consecutive path,” “diameter,” and “single/dual path” problems (like longest path, balanced tree checks, etc.). Great to remember for any tree path dynamic programming variant.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Longest Consecutive Sequence(binary-tree-longest-consecutive-sequence) (Medium)
- Check if an Array Is Consecutive(check-if-an-array-is-consecutive) (Easy)