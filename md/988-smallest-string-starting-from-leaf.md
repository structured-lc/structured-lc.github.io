### Leetcode 988 (Medium): Smallest String Starting From Leaf [Practice](https://leetcode.com/problems/smallest-string-starting-from-leaf)

### Description  
Given a binary tree where each node contains a value from 0 to 25 representing the letters 'a' to 'z' (0→'a', 1→'b', ..., 25→'z'), return the **lexicographically smallest string** that starts at any leaf and ends at the root.  
- A **leaf** is a node with no children.
- You must build the string from **leaf to root** (not the other way).  
- Lexicographical order is like dictionary order; shorter prefixes are always smaller (e.g., "ab" < "aba").


### Examples  

**Example 1:**  
Input: `[0,1,2,3,4,3,4]`  
Output: `"dba"`  
*Explanation: The path from the leaf (3) to root is "dba", which is smaller than all other leaf–root paths.*

**Example 2:**  
Input: `[25,1,3,1,3,0,2]`  
Output: `"adz"`  
*Explanation: "adz" is the smallest among all strings from a leaf up to the root.*

**Example 3:**  
Input: `[2,2,1,null,1,0,null,0]`  
Output: `"abc"`  
*Explanation: The path where leaf (0) goes up through node (1) and then (2): "cba" and "abc", and "abc" is the smallest.*

Visualizing the first tree:
```
      0
    /   \
   1     2
  / \   / \
 3   4 3   4
```
Leaf-to-root paths:  
- 3→1→0 = "dba"  
- 4→1→0 = "eba"  
- 3→2→0 = "dca"  
- 4→2→0 = "eca"  
Smallest: "dba"



### Thought Process (as if you’re the interviewee)  
- The key is to check every leaf–root path and convert the node values along the way to characters.
- Brute-force approach: find all paths from every **leaf** to the **root**, build corresponding strings, and pick the smallest one.
- Since it's a tree, a post-order DFS works well: for each node, as we return from recursion, accumulate the path. When at a leaf, form a string from leaf up to root and compare against the current minimum.
- String comparison is efficient, and because tree paths are not excessively deep (max 8500 nodes), this is tractable.
- Trade-offs:  
  - DFS uses call stack space proportional to depth.  
  - We can also use BFS from root, but DFS is more direct for backtracking and path building.  
  - Avoid global variables by passing path as an argument and comparing as we reach leaves.  
- We choose DFS with string building for its clarity and simplicity.


### Corner cases to consider  
- Only one node in the tree (single root/leaf node): should return its character.
- Tree with all nodes having the same value (e.g., all zeros = "aaa...a").
- Skewed tree (e.g., all left or all right children).
- Deep paths where the smallest string is not the shortest.
- Nodes with values at bounds (0 and 25).
- Multiple leaf–root paths yield the same string.
- Non-balanced trees with various depth leaves.


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def smallestFromLeaf(self, root: TreeNode) -> str:
        # Helper function: DFS traverses node, building path up to root
        def dfs(node, path):
            if not node:
                return
            # Convert value to corresponding character & prepend to path
            char = chr(ord('a') + node.val)
            new_path = char + path
            # If leaf, check if this path is lexicographically smaller
            if not node.left and not node.right:
                paths.append(new_path)
                return
            if node.left:
                dfs(node.left, new_path)
            if node.right:
                dfs(node.right, new_path)
        
        paths = []
        dfs(root, "")
        # Return the smallest string among all paths
        return min(paths)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of nodes. We visit each node once, and for each leaf, we build a string whose length is at most height of tree. Since total number of leaves ≤ N, the total work (even with path copying) is linear relative to nodes.
- **Space Complexity:** O(H) for recursion stack, where H is the height of the tree. Extra O(L\*H) for the list of strings (L = number of leaves), each up to height H, but total is O(N) since leaves ≤ N.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep (e.g., maximum height)?    
  *Hint: How does recursion stack or path storage scale? Would iteration help?*

- Can you return the path nodes instead of the string?  
  *Hint: Store paths as lists of nodes or values, then reconstruct the string.*

- Could you do this using BFS instead of DFS?  
  *Hint: Try to build paths by prepending each level’s character during BFS.*

### Summary
This problem is a classic **root-to-leaf path enumeration** scenario with a lexicographic minimum applied. The main technique is DFS (Depth-First Search) with backtracking and path building, where string or sequence comparison is fundamental. This strategy generalizes to problems requiring "find the path with minimum/maximum [property]" for trees—one of the most frequent interview themes.