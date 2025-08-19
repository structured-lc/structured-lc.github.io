### Leetcode 971 (Medium): Flip Binary Tree To Match Preorder Traversal [Practice](https://leetcode.com/problems/flip-binary-tree-to-match-preorder-traversal)

### Description  
Given the root of a binary tree and a list `voyage` representing a desired preorder traversal, flip the minimum number of nodes (by swapping their left and right subtrees) such that the tree's actual preorder matches `voyage`. If it’s impossible, return `[-1]`. Only unique node values from 1 to n are allowed, and you may not revisit nodes.

### Examples  

**Example 1:**  
Input: `root = [1,2], voyage = [2,1]`  
Output: `[-1]`  
Explanation: The root value is `1`, but the first in the voyage is `2`, so the traversal can never match—return `[-1]`.

**Example 2:**  
Input: `root = [1,2,3], voyage = [1,3,2]`  
Output: `[1]`  
Explanation: Preorder starts at `1`. The next voyage value is `3`, not the left child (`2`). So, flip node `1` to make `3` the left child. Now preorder is `[1,3,2]`, matching the voyage.

**Example 3:**  
Input: `root = [1,2,3], voyage = [1,2,3]`  
Output: `[]`  
Explanation: The tree’s natural preorder already matches the voyage—no flips are needed.

### Thought Process (as if you’re the interviewee)  
A brute-force solution would try all possible flip combinations, but this quickly becomes infeasible due to exponential possibilities. Instead, since preorder always goes root → left → right, if the next voyage value doesn’t match the current node's left child, a flip is needed.

- Track the index (`i`) in voyage as you traverse preorder.
- If a node's value doesn't match voyage[i], it's impossible to match—return `[-1]`.
- If the left child's value doesn't match the next value in voyage, flip this node; traverse right child first, then left.
- Otherwise, continue as normal: root → left → right.

We only flip when necessary and abort early when impossible.

### Corner cases to consider  
- The tree is empty (`root` is `None`).
- The voyage starts with a value not matching the root.
- Nodes with no left or right child.
- Multiple flips in a single path.
- The result list must be `[-1]` if impossible—no partial or alternative outputs allowed.
- `voyage` length not matching the number of tree nodes.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def flipMatchVoyage(root, voyage):
    res = []
    i = 0  # Tracks index in voyage
    ok = True

    def dfs(node):
        nonlocal i, ok
        if not node or not ok:
            return
        if node.val != voyage[i]:
            ok = False
            return
        
        i += 1
        if (node.left and node.left.val != (voyage[i] if i < len(voyage) else None)):
            # Need to flip at this node
            res.append(node.val)
            # Visit right first, then left (because flipped)
            dfs(node.right)
            dfs(node.left)
        else:
            # No flip needed, do standard preorder
            dfs(node.left)
            dfs(node.right)

    dfs(root)
    return res if ok else [-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited once during preorder traversal.
- **Space Complexity:** O(h) — Where h is the height of the tree (from recursion stack), plus O(f) for the result list (f = number of flips, f ≤ n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if some nodes don’t have unique values?
  *Hint: Would have to adapt index matching logic, since value-based comparison would be ambiguous.*

- How would you handle matching for inorder or postorder traversal instead?
  *Hint: The flip decision logic would change accordingly, and not all sequences may be achievable by flipping.*

- What if you have to print the list of flips in order of traversal?
  *Hint: Current method already collects flips in preorder fashion, but clarify output requirements.*

### Summary
This problem uses a **preorder tree traversal + greedy flipping**, a common pattern for synchronization tasks between structure and target sequence. The DFS tightly syncs the current traversal with the expected voyage, flipping only when mismatched, and aborts early if impossible. Variations of this pattern appear in serialization, tree reconstruction, and guided tree transformations.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
