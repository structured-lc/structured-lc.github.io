### Leetcode 543 (Easy): Diameter of Binary Tree [Practice](https://leetcode.com/problems/diameter-of-binary-tree)

### Description  
The **Diameter of a Binary Tree** problem asks you to find the longest path between any two nodes in a given binary tree. The path may or may not pass through the root of the tree, and the length of the path is determined by the number of edges between the nodes, not the number of nodes themselves.

### Examples  

**Example 1:**  
Input=`[1,2,3,4,5]`  
Tree:  
```
    1
   / \
  2   3
 / \
4   5
```
Output=`3`  
Explanation: The longest path is from node 4 to node 5, which involves traveling through nodes 4 to 2 to 1 to 3 to 5, giving a path length of 3.

**Example 2:**  
Input=`[1,2,3,4,5,6,7]`  
Tree:  
```
  1
/
2
 \
  3
 / \
4   5
    /
   6
  /
 7
```
Output=`4`  
Explanation: The diameter is the longest path between nodes 4 and 7, which involves nodes 4 to 3 to 5 to 6 to 7, but since the path must be between two nodes, the longest path is actually along the edges from 4 to 5 to 6 to 7, giving a length of 3. However, the longest path in this tree structure is from node 4 to node 7, and the actual longest path in this specific structure should be reconsidered based on the correct longest path definition.

**Example 3:**  
Input=`[1,2]`  
Tree:  
```
1
 \
  2
```
Output=`1`  
Explanation: The longest path is directly from node 1 to node 2, which has a length of 1.

### Thought Process  
To solve this problem, you can initially consider a brute-force approach where you calculate the longest path starting from every node. However, this is inefficient. A more optimized approach involves using **Depth-First Search (DFS)**. DFS allows you to recursively calculate the height of the left and right subtrees for each node and update the diameter whenever you find a longer path. This approach is more efficient because it avoids redundant calculations.

1. **Brute-Force Idea:** Calculate all possible paths from every node to every other node and keep track of the longest one. This approach is highly inefficient due to its exponential time complexity.

2. **Optimized Approach:** Use DFS to calculate the height of the left and right subtrees for each node. Update the diameter if the sum of these heights is greater than the current diameter.

### Corner Cases to Consider  
- **Empty Tree:** If the tree is empty (i.e., no nodes), the diameter is 0.
- **Single Node:** If the tree has only one node, the diameter is 0.
- **Unbalanced Tree:** Trees where one side is much deeper than the other.

### Solution

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        self.diameter = 0
        
        def dfs(node):
            if not node:
                return 0
            # Calculate the height of the left subtree
            left_height = dfs(node.left)
            # Calculate the height of the right subtree
            right_height = dfs(node.right)
            # Update the diameter if the current path is longer
            self.diameter = max(self.diameter, left_height + right_height)
            # Return the height of the current subtree
            return max(left_height, right_height) + 1
        
        dfs(root)
        return self.diameter
```

### Time and Space Complexity Analysis  
- **Time Complexity:** O(N), where N is the number of nodes in the tree. This is because we visit each node once during the DFS traversal.
- **Space Complexity:** O(H), where H is the height of the tree. This represents the maximum depth of the recursion stack at any point during the DFS traversal. In the worst case (a skewed tree), H = N.

### Potential Follow-Up Questions  

1. **How would you handle this problem if you could only use a specific programming language?**  
   *Hint: Consider how different languages handle recursion and stack management.*

2. **Can you optimize the space complexity further?**  
   *Hint: Consider using an iterative approach.*

3. **How would you extend this problem to other types of trees or graphs?**  
   *Hint: Consider how different graph structures might affect the algorithm's efficiency.*

### Summary
The approach used here is a common pattern for solving problems involving tree traversals, especially those requiring maximum or minimum path lengths. The key is to use DFS to efficiently explore the tree and update relevant metrics (in this case, the diameter) as you traverse. This pattern can be applied to various tree-based problems, making it a useful skill for any developer working with graph data structures.


### Flashcard
DFS calculates subtree heights, updating max diameter whenever left + right height exceeds current max.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Diameter of N-Ary Tree(diameter-of-n-ary-tree) (Medium)
- Longest Path With Different Adjacent Characters(longest-path-with-different-adjacent-characters) (Hard)