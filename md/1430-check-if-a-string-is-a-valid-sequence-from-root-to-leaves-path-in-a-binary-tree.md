### Leetcode 1430 (Medium): Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree [Practice](https://leetcode.com/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree)

### Description  
Given a binary tree where each node contains a value (0-9) and an array 'arr', determine if the sequence of values in arr corresponds to a root-to-leaf path in the tree. All the values along the path from root to leaf must match the entire array in order.

### Examples  
**Example 1:**  
Input: `root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,0,1]`
Output: `true`
*Explanation: The path is 0 → 1 → 0 → 1 and leaf is reached before the end of the array.*

*Tree (with list representation):*
```
    0
   / \
  1   0
 / \  /
0  1 0
   / \ 
  1   0
```

**Example 2:**  
Input: `root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]`
Output: `false`
*Explanation: No path matching sequence 0 → 0 → 1.*

**Example 3:**  
Input: `root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]`
Output: `false`
*Explanation: No such path from root to leaf.*

### Thought Process (as if you’re the interviewee)  
Brute-force: Try all root-to-leaf paths and compare with array. Clearly inefficient for big trees.

Recursive DFS is a more elegant way: Walk the tree, at each level check if the current node matches arr[i]. If not, stop; if matched and at leaf and at arr end, return true. Otherwise, recur left and right. This way, we only traverse valid paths.

Alternatively, BFS could be used, but recursion is more natural here given tree structure and depth alignment with arr index.

### Corner cases to consider  
- Empty tree or empty array.
- Array longer than any root-to-leaf path.
- Not all leaves—must only succeed at a *leaf* node.
- Multiple possible paths but only one matches "root-to-leaf".
- Duplicates in node values.

### Solution

```python
class Solution:
    def isValidSequence(self, root, arr):
        def dfs(node, i):
            if not node or i >= len(arr) or node.val != arr[i]:
                return False
            # If leaf and at end of arr
            if not node.left and not node.right and i == len(arr) - 1:
                return True
            return dfs(node.left, i + 1) or dfs(node.right, i + 1)
        return dfs(root, 0)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), n being the number of nodes in the tree, in the worst case where all paths are explored.
- **Space Complexity:** O(h), h = tree height (recursion stack).

### Potential follow-up questions (as if you’re the interviewer)  
- What if the nodes could have values outside of 0-9?  
  *Hint: Your logic doesn't depend on values, just comparison.*

- What if arr is extremely long?  
  *Hint: Can you optimize to prune faster or avoid unnecessary recursive calls?*

- How would you adapt it for N-ary trees (not just binary)?  
  *Hint: Instead of left/right, loop over each child if node.children exists.*

### Summary
This is a classic DFS tree + path simulation problem. The logic (walk matching node to array, check at leaf and at correct index) is common for "path matches in tree" or "word search in tree" type interview scenarios.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
