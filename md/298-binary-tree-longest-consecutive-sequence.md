### Leetcode 298 (Medium): Binary Tree Longest Consecutive Sequence [Practice](https://leetcode.com/problems/binary-tree-longest-consecutive-sequence)

### Description  
Given a binary tree, find the length of the **longest consecutive sequence** path, where each child differs by exactly +1 from its parent.  
The path can start from any node, but only moves from parent to child (not the reverse, and not siblings).  
For example, in the tree below, the sequence 3 → 4 → 5 is valid (length = 3), but 2 → 3 → 2 is not because the direction reverses at some point.

### Examples  

**Example 1:**  
Input:  
```  
    1
     \
      3
     / \
    2   4
         \
          5
```  
Output: `3`  
*Explanation: The longest consecutive path is 3 → 4 → 5 (length 3).*

**Example 2:**  
Input:  
```  
    2
     \
      3
     /
    2
   /
  1
```  
Output: `2`  
*Explanation: The longest consecutive path is 2 → 3 (length 2), since 3 → 2 → 1 is not increasing consecutively through the parent-child relationship.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Only one node, so the length is 1.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  For every node, perform a DFS to find the longest consecutive increasing path starting from that node. This would have a lot of repeated work and would be inefficient (O(n²) worst case).
- **Optimized Idea:**  
  Instead, do a single DFS traversal of the tree. At each node, keep track of:
  - the length of the current sequence (compare with parent’s value: if parent and current node differs by 1, increase length; else reset length to 1).
  - Maintain a global variable to keep track of the maximum sequence length found so far.
  - Pass the current node and its parent value in the recursion.  
  This is efficient because each node is visited once, and the recursion just tracks (node, parent, current length).

- **Why this approach?:**  
  DFS is well-suited because it allows you to pass contextual information (previous value and running length) as you move down the tree. Only O(n) time and O(h) space (for recursion, h = tree height).


### Corner cases to consider  
- Empty tree (null root): should return 0.
- Tree with a single node.
- All node values are equal (longest consecutive = 1).
- Tree is strictly decreasing or increasing but with jumps greater than 1 (no consecutive path > 1).
- Multiple consecutive sequences—only the longest matters.
- Paths can start at any node, not just root.


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
        def dfs(node, parent_val, curr_len):
            if not node:
                return curr_len
            # If current node is consecutive to parent, increment length
            if parent_val is not None and node.val == parent_val + 1:
                length = curr_len + 1
            else:
                length = 1  # Reset if not consecutive
            # Explore both children
            left_len = dfs(node.left, node.val, length)
            right_len = dfs(node.right, node.val, length)
            # Return the maximum from current, left and right
            return max(length, left_len, right_len)
        # Edge: If tree is empty
        if not root:
            return 0
        return dfs(root, None, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Every node is visited only once in the DFS.
- **Space Complexity:** O(h), where h is the height of the tree (due to recursion stack). In the worst case (unbalanced), h = n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to find the **longest consecutive sequence in any direction** (increasing or decreasing, even reversing at each node)?  
  *Hint: Does the definition of consecutive path still remain directional? You may need to consider paths that go both up and down the tree.*

- Can you also **recover the sequence itself, not just its length**?  
  *Hint: You’d need to record parent chains or paths during DFS.*

- How would you solve this if the **binary tree was extremely large** and couldn’t fit in memory?
  *Hint: Think about how you could process the nodes in a streamed or serialized fashion.*

### Summary
This approach uses **DFS and parent-tracking**—a classic recursion pattern for tree path property problems. It avoids redundant computation by passing critical state (parent value and running length) during the descent and compares for consecutiveness at each step. This pattern is common in other **tree path-based** questions (max depth, path sum, etc.).


### Flashcard
Single DFS tracking current sequence length; compare each node with parent (if value = parent+1, extend length, else reset to 1), update global max.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Longest Consecutive Sequence(longest-consecutive-sequence) (Medium)
- Binary Tree Longest Consecutive Sequence II(binary-tree-longest-consecutive-sequence-ii) (Medium)
- Check if an Array Is Consecutive(check-if-an-array-is-consecutive) (Easy)