### Leetcode 257 (Easy): Binary Tree Paths [Practice](https://leetcode.com/problems/binary-tree-paths)

### Description  
Given a **binary tree**, return **all paths from the root node to every leaf node** as strings.  
Each path should be represented as a string with node values separated by "`->`" (e.g., `1->2->5`).  
A *leaf* is defined as a node with no left or right child.  
Return the list of paths in any order.

### Examples  

**Example 1:**  
Input:  
```python
# Tree:         1
#             /   \
#            2     3
#             \
#              5

root = [1,2,3,null,5]
```
Output: `["1->2->5","1->3"]`  
*Explanation: There are two leaf paths. The first is 1→2→5, the second is 1→3.*

Tree representation:
```
    1
   / \
  2   3
   \
    5
```

**Example 2:**  
Input:  
```python
# Tree:   2
#          \
#           4
root = [2,null,4]
```
Output: `["2->4"]`  
*Explanation: Only one path exists from the root (2) to the leaf (4): 2→4.*

Tree representation:
```
  2
   \
    4
```

**Example 3:**  
Input:  
```python
# Tree:  [1]
root = [1]
```
Output: `["1"]`  
*Explanation: There's only the root, which is also a leaf, so a single path exists: "1".*

Tree representation:
```
1
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Start at root and travel to all leaves, tracking the path. Each time we reach a leaf, we join the tracked values as a string and add it to the result list.
- **Recursion/DFS suit this problem** because binary trees are naturally recursive, and we need to search all *root-to-leaf* paths.
- Consider an auxiliary helper function (`dfs`) that takes the current node and the path string so far.
- If a node is a leaf, append the accumulated path (with node value) to results.
- Otherwise, recursively call `dfs` on its left and right children, extending the path.
- **Trade-offs:**  
  - DFS recurses to every leaf node and constructs the path, but memory usage is within acceptable bounds: we only need to track the current root-to-node path.
  - Using string concatenation is fine here because the paths are short per constraints.
- This approach can be implemented iteratively using stacks, but recursion with a helper is simplest and most natural.

### Corner cases to consider  
- Empty tree (`root = None`) ⇒ output is `[]`.
- Tree with only one node (root is leaf).
- Tree with only left or only right children.
- Tree with negative, zero, or very large values.
- Unbalanced skewed trees (very deep or shallow).

### Solution

```python
# Definition for a binary tree node:
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def binaryTreePaths(root):
    # List to collect all root-to-leaf paths as strings
    paths = []

    def dfs(node, path):
        if not node:
            return
        # If path is not empty, add '->'; else, just the node value
        if path:
            path += '->' + str(node.val)
        else:
            path = str(node.val)
        # If this is a leaf, add the current path to result
        if not node.left and not node.right:
            paths.append(path)
            return
        # Traverse left and right children
        if node.left:
            dfs(node.left, path)
        if node.right:
            dfs(node.right, path)

    if root:
        dfs(root, "")
    return paths
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  - We visit every node **once** to build every path, where N is the number of nodes.
- **Space Complexity:** O(N × H)  
  - At worst we have up to N paths (for a skewed tree, e.g. like a linked list), each of length at most H (tree height), but total output length (excluding recursion stack) is ∑(length of each path) ≤ N × H.
  - Recursion stack uses O(H) space (height of tree) for call stack, O(N) extra for output.

### Potential follow-up questions (as if you’re the interviewer)  

- How to return the answer as a list of **lists of integers** instead of strings?  
  *Hint: Instead of string concatenation, pass a list of node values and `.append(list(path))` at each leaf.*

- Can you solve this **iteratively** (without recursion)?  
  *Hint: Use an explicit stack; each stack entry contains (node, current_path_as_string).*

- What if the tree contains **cycles** (is not a proper tree)?  
  *Hint: Track visited nodes to avoid infinite loops, though classic trees do not have cycles.*

### Summary
This uses a classic **Depth-First Search (DFS)** traversing from root to leaves, accumulating the path with each step; at each leaf, we concatenate the path and record it. This **DFS/root-to-leaf-paths** pattern is common in tree problems and is broadly applicable: e.g. summing path values, printing all root-to-leaf paths for N-ary trees, or checking for a specific path sum.

### Tags
String(#string), Backtracking(#backtracking), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Path Sum II(path-sum-ii) (Medium)
- Smallest String Starting From Leaf(smallest-string-starting-from-leaf) (Medium)
- Step-By-Step Directions From a Binary Tree Node to Another(step-by-step-directions-from-a-binary-tree-node-to-another) (Medium)