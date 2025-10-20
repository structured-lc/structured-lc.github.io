### Leetcode 1676 (Medium): Lowest Common Ancestor of a Binary Tree IV [Practice](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv)

### Description  
Given the root of a binary tree and an array of node references (TreeNode objects) from the tree, return the **lowest common ancestor (LCA)** of all the nodes in the array. The LCA of n nodes is the deepest node in the tree that has each node in the array as a (possibly direct) descendant. The LCA node can also be one of the target nodes itself.

### Examples  

**Example 1:**  
Input:  
Tree =  
```
    3
   / \
  5   1
 / \ / \
6  2 0  8
  / \
 7   4
```
nodes = `[6,4]`  
Output: `TreeNode(5)`  
Explanation: The path from root to 6 passes through 5, and path from root to 4 also passes through 5. So, their LCA is 5.

**Example 2:**  
Input:  
Tree =  
```
    3
   / \
  5   1
 / \
6   2
    /
   7
```
nodes = `[6,7]`  
Output: `TreeNode(5)`  
Explanation: 6 and 7 both share 5 as their deepest common ancestor.

**Example 3:**  
Input:  
Tree =  
```
    3
   / \
  5   1
     / \
    0   8
```
nodes = `[1,0,8]`  
Output: `TreeNode(1)`  
Explanation: 1 is the ancestor of 0 and 8, and is also in the list itself.

### Thought Process (as if you’re the interviewee)  
- The classic LCA problem is for two nodes. Here, the problem generalizes to *multiple* nodes.  
- Naive solution: For each pair of target nodes, find LCA, then repeat with the result and next node.  
  - This is not efficient due to repeated traversals.
- Optimal approach:  
  - Observe that a single post-order DFS traversal can find the LCA for multiple nodes by checking at each node if it is an ancestor for all the targets.
  - Use a set for quick lookup of the target nodes.
  - At each recursive call, check how many of the children/subtrees contain the targets. If the current subtree contains all nodes, this node is a potential LCA.
  - Standard post-order traversal (DFS): process left child, right child, then current.
- Benefits: Single traversal, no extra repeated LCA computations.

### Corner cases to consider  
- nodes contains only one node → LCA is that node itself.
- All nodes are descendants of one node that is also in the list.
- Some nodes are direct ancestors/descendants of each other.
- The nodes array has duplicate references (shouldn't by constraints, but safe to check).
- The tree has only a single node, and that node is in the nodes array.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowestCommonAncestor(root, nodes):
    # Store target nodes in a set for O(1) lookup
    targets = set(nodes)
    
    def dfs(node):
        if not node:
            return None
        
        # If this node is one of the targets, it might be the LCA
        if node in targets:
            return node
        
        # Recurse on left and right subtrees
        left = dfs(node.left)
        right = dfs(node.right)
        
        # If both left and right returned non-None, current node is LCA
        if left and right:
            return node
        # If only one is non-None, propagate it upward
        return left if left else right
    
    return dfs(root)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the binary tree. Each node is visited once in the post-order DFS.
- **Space Complexity:** O(n). The recursive stack can be up to n in the worst case (skewed tree), and the set of target nodes uses O(k) space where k is the number of targets (k ≤ n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the nodes array can contain duplicates?  
  *Hint: Convert the array into a set before traversal to avoid redundant work.*

- How would you modify the solution if the tree does not have unique node values?  
  *Hint: You would need to rely on node references (not values) to identify targets.*

- Can you solve this iteratively to avoid recursion stack overflow?  
  *Hint: Use an explicit stack to perform post-order traversal and keep a parent map.*

### Summary
We used a **Tree DFS / post-order traversal** pattern to find the LCA of k nodes with a single pass, extending the standard two-node LCA method. The algorithm efficiently checks, for every node, whether all targets are present in its subtrees. This is a classic DFS application in tree problems and is widely used wherever subtree-based checks are required. The approach generalizes to any number of target nodes and can be adapted for various tree ancestry queries.


### Flashcard
Lowest Common Ancestor of a Binary Tree IV

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Lowest Common Ancestor of a Binary Search Tree(lowest-common-ancestor-of-a-binary-search-tree) (Medium)
- Lowest Common Ancestor of a Binary Tree(lowest-common-ancestor-of-a-binary-tree) (Medium)
- Lowest Common Ancestor of Deepest Leaves(lowest-common-ancestor-of-deepest-leaves) (Medium)
- Lowest Common Ancestor of a Binary Tree II(lowest-common-ancestor-of-a-binary-tree-ii) (Medium)
- Lowest Common Ancestor of a Binary Tree III(lowest-common-ancestor-of-a-binary-tree-iii) (Medium)
- Lowest Common Ancestor of a Binary Tree IV(lowest-common-ancestor-of-a-binary-tree-iv) (Medium)