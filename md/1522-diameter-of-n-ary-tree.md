### Leetcode 1522 (Medium): Diameter of N-Ary Tree [Practice](https://leetcode.com/problems/diameter-of-n-ary-tree)

### Description  
Given the root of an N-ary tree (a tree where each node may have any number of children), determine the **diameter** of the tree. The diameter is the length (number of edges) of the longest path between any two nodes in the tree. This path does **not** have to pass through the root.

The input tree is serialized in level-order traversal, where a `null` value marks the end of children for a node.

### Examples  

**Example 1:**  
Input: `[1,null,3,2,4,null,5,6]`  
Output: `3`  
*Explanation: The longest path is from 5 → 3 → 1 → 2 or 6 → 3 → 1 → 2, both with length 3 (number of edges).*

Tree:
```
      1
    / | \
   3  2  4
  / \
 5   6
```

**Example 2:**  
Input: `[1,null,2,null,3,4,null,5,null,6]`  
Output: `4`  
*Explanation: The longest path is 6 → 4 → 3 → 2 → 1, with length 4 (edges).*

Tree:
```
    1
     |
     2
     |
     3
    / \
   4   5
  /
 6
```

**Example 3:**  
Input: `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  
Output: `7`  
*Explanation: The longest path covers 6 → 3 → 1 → 2 → 4 → 13 → 14, with 7 edges.*

Tree:
```
         1
   /   /   \   \
  2   3     4   5
     / \    |     \
    6   7   8     9 10
          /         \
         11         12
                   /  \
                 13   14
```

### Thought Process (as if you’re the interviewee)  
To find the diameter in a binary tree, we look for the longest path between any two nodes, which is essentially the sum of the heights of the two deepest subtrees under any node.

For an N-ary tree, the logic is similar, but each node can have many children. So, at each node, we need to keep track of the **two largest depths** from its children. The longest path through that node will be the sum of those two depths. The overall answer is the maximum such value encountered anywhere in the tree.

**Brute-force idea:**  
Try all pairs of nodes, find the path between each—this is O(n²) and too slow.

**Optimized approach:**  
Use DFS. For each node:
- Recursively compute the depths for all children.
- Find the top two largest depths among the children.
- Update the global diameter as the sum of these two depths (because the longest path through the node goes down to each of the two deepest children).
- Return the max depth + 1 for parent calls.

This is efficient, O(n), as each node is visited once.

**Trade-offs:**  
DFS is simple and avoids extra space except the recursion stack and tracking a few values.

### Corner cases to consider  
- Empty tree (root is `None`)
- Only one node (should return 0 diameter)
- Tree with only root and one child (diameter = 1)
- Highly unbalanced trees (like a line)
- Trees where longest path does **not** go through root

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def diameter(self, root: 'Node') -> int:
        self.ans = 0
        
        def dfs(node):
            # if node is None, no depth
            if not node:
                return 0
            
            # Store the top two maximum depths from all children
            max1, max2 = 0, 0
            for child in node.children:
                d = dfs(child)
                # Update first and second largest depths
                if d > max1:
                    max1, max2 = d, max1
                elif d > max2:
                    max2 = d
            # Update the overall diameter (may or may not pass through root)
            self.ans = max(self.ans, max1 + max2)
            # Depth from current node to its deepest leaf
            return max1 + 1
        
        dfs(root)
        return self.ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes. Each node is visited exactly once during DFS.
- **Space Complexity:** O(h), where h = height of the tree, due to the recursion stack. No extra data structures beyond a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you compute the **actual path** (not just the length) that constitutes the diameter?
  *Hint: Carry paths/parents or reconstruct from max-depth children.*

- Can you solve the problem **iteratively** (without recursion)?
  *Hint: Simulate DFS using stack; tricky to manage child depths.*

- What if the tree were **dynamic** (nodes added/removed frequently)?  
  *Hint: Need a structure for efficient diameter updates (heavy-light decomposition or dynamic trees).*

### Summary
This problem is a classic **Tree DFS (postorder)** application, where global information is updated using local results from each node. The key insight is always to track the **two largest depths among the children** at each step. This approach is reusable for other problems involving longest paths or combining subtree results (e.g., binary tree diameter, longest univalue path).


### Flashcard
Calculate the diameter of an N-ary tree by finding the longest path through any node, which is the sum of the two largest depths from its children.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Diameter of Binary Tree(diameter-of-binary-tree) (Easy)