### Leetcode 572 (Easy): Subtree of Another Tree [Practice](https://leetcode.com/problems/subtree-of-another-tree)

### Description  
Given two binary trees, **root** and **subRoot**, determine if **subRoot** is a subtree of **root**.  
A subtree of a binary tree is any node in that tree, together with all its descendants, forming a tree. To qualify, **subRoot** must match **root** at some node, meaning both the structure and node values are identical.

### Examples  

**Example 1:**  
Input:  
root = `[3,4,5,1,2]`  
subRoot = `[4,1,2]`  
Output: `True`  
*Explanation:*

root:  
```
    3
   / \
  4   5
 / \
1   2
```
subRoot:  
```
  4
 / \
1   2
```
Starting from the node with value 4 in root, the tree matches subRoot in structure and values.

**Example 2:**  
Input:  
root = `[3,4,5,1,2,null,null,null,null,0]`  
subRoot = `[4,1,2]`  
Output: `False`  
*Explanation:*

root:  
```
      3
     / \
    4   5
   / \
  1   2
     /
    0
```
subRoot structure doesn't exist in root because the node 2 has a left child (0), which subRoot does not have.

**Example 3:**  
Input:  
root = `[1,2,3]`  
subRoot = `[2,3]`  
Output: `False`  
*Explanation:*

root:  
```
  1
 / \
2   3
```
subRoot:  
```
2
 \
  3
```
No subtree of root matches the structure and values of subRoot.

### Thought Process (as if you’re the interviewee)  
First, to check if subRoot is a subtree of root, we need to look for any node in root where the subtree matches subRoot exactly (both values and structure).

**Brute-force idea:**  
- For each node in root, check whether the subtree starting at that node exactly mirrors subRoot.
- To do this check, use a helper function that recursively compares two trees.

**Optimized idea:**  
- Although the brute-force approach already has optimal clarity, heavy optimization is usually unnecessary for this problem.  
- Each node in root could call the helper function, leading to more work than necessary if root is significantly large and subRoot is small.  
- Advanced optimization (like subtree hashing or serializing) is possible, but recursive comparison is clear and adequate for most cases, especially with typical binary tree interview constraints.

**Why this approach:**  
- Recursive DFS (Depth-First Search) matches the intuition of tree traversal and direct subtree comparison.
- Trade-off: Simplicity vs. performance — recursion is easy to write, understand, and debug for interview settings.

### Corner cases to consider  
- root or subRoot is `None`
- subRoot is a single node
- root and subRoot are identical
- subRoot has nodes with duplicate values
- subRoot's structure is not matched in root
- Both trees have non-overlapping ranges of values

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSubtree(root, subRoot):
    # Helper: checks if two trees are exactly identical
    def is_same_tree(s, t):
        if not s and not t:
            return True
        if not s or not t:
            return False
        if s.val != t.val:
            return False
        return is_same_tree(s.left, t.left) and is_same_tree(s.right, t.right)

    # Main: recursively check if subRoot matches at any node in root
    if not subRoot:
        return True
    if not root:
        return False
    if is_same_tree(root, subRoot):
        return True
    # Check left or right subtree of the current node
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  For each node in root (n nodes), you may compare up to m nodes in subRoot when checking for a match.  
- **Space Complexity:** O(n)  
  Due to recursion, the call stack could be as large as the height of the root tree in the worst case (skewed tree), plus the space for the recursion in comparing subtrees.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the trees are extremely large (millions of nodes)?  
  *Hint: Can you reduce repeated traversals or apply hashing techniques for efficiency?*

- How would you modify the approach if the tree nodes do not have unique values?  
  *Hint: Ensure that structure and not just values are used for comparison.*

- Can you describe an iterative solution for the same problem?  
  *Hint: Use stacks to simulate DFS.*

### Summary
This problem uses the **DFS tree pattern**: traversing nodes recursively and using helper methods to solve a subproblem (identical tree check).  
It showcases classic recursion for trees, and the pattern applies to any scenario where you need to compare structures or find patterns within tree or graph-like data (e.g., subgraph isomorphism, repeated subtree detection, "Same Tree" problem).