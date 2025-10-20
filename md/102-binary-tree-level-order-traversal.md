### Leetcode 102 (Medium): Binary Tree Level Order Traversal [Practice](https://leetcode.com/problems/binary-tree-level-order-traversal)

### Description  
Given a **binary tree**, return a list of lists where each inner list contains the node values at each level of the tree, from top to bottom and left to right.  
You must traverse the tree **level by level**. For each level, gather the values of all nodes at that level (from leftmost to rightmost) and add them to a list. Return all these lists in order, one for each level.

### Examples  

**Example 1:**  
Input: `[3,9,20,null,null,15,7]`  
Output: `[[3],[9,20],[15,7]]`  
Explanation:  
```
      3
     / \
    9  20
      /  \
     15   7
```
- Level 0: [3]  
- Level 1: [9, 20]  
- Level 2: [15, 7]

**Example 2:**  
Input: `[1]`  
Output: `[[1]]`  
Explanation:  
```
1
```
Tree has only one node, so the only level is [1].

**Example 3:**  
Input: `[]`  
Output: `[]`  
Explanation:  
Empty tree has no levels, so output is an empty list.

### Thought Process (as if you’re the interviewee)  
- The problem wants the tree visited level by level.  
- **Brute-force idea:** Use recursion (DFS) and keep track of each node’s depth, appending values to lists based on depth.  
    - Downsides: This works but isn’t as intuitive as using breadth-first order.
- **Optimal idea:** Level order naturally fits a **Breadth-First Search (BFS)**.  
    - Use a queue to keep track of nodes at the current level.  
    - For each level, process all nodes currently in the queue (which represent nodes at that level), and enqueue their children for the next level.  
    - After processing a level, add the collected values to the result list.
- **Trade-offs:**  
    - BFS matches the order required by the problem.  
    - Time and space complexities are optimal for visiting every node once; no extra computation.

### Corner cases to consider  
- The tree is empty (`[]` input, `root=None`).  
- Tree with only **one node** (single-level tree).  
- Tree that is **completely unbalanced** (e.g., all left or all right children).  
- Node values are duplicated.  
- Very large or very deep tree (to ensure no infinite or stack overflow).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    # Result list to store the values level by level
    result = []
    # Base case: empty tree
    if not root:
        return result

    # Queue for BFS, starting with the root
    queue = [root]

    while queue:
        # List to hold values of the current level
        level = []
        # Number of nodes in this level
        level_size = len(queue)
        # Process all nodes in current level
        for _ in range(level_size):
            node = queue.pop(0)
            level.append(node.val)
            # Enqueue the left and right children if they exist
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        # Add the current level to result
        result.append(level)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
    - Each tree node is visited exactly once during BFS.
- **Space Complexity:** O(n)  
    - In the worst-case, the queue will hold up to n/2 = ⌊n/2⌋ nodes (the widest level in a binary tree is at the bottom), and we store O(n) space in the output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this using **recursion** instead of iteration?  
  *Hint: You can use DFS with a parameter for the current depth, and extend the result list as you go.*

- What if you want to return the **bottom-up** level traversal (from leaves up to root)?  
  *Hint: Collect levels just as now, then reverse the final result list before returning.*

- Can you solve this in-place or optimize for minimal space?  
  *Hint: Think if you really need to store all nodes/levels at once, or if you can stream them or reuse existing structures.*

### Summary  
This problem is a classic example of the **Breadth-First Search (BFS) pattern** for trees. Using a queue to process nodes level by level cleanly separates each depth. The code pattern used here is a template for many binary tree problems involving “by levels” or “shortest path” style of traversal. This method is also applicable for problems such as finding the minimum depth, average of each level, or connecting nodes at the same level.


### Flashcard
Use BFS with a queue to process nodes level by level, collecting values at each level into separate lists for the result.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Zigzag Level Order Traversal(binary-tree-zigzag-level-order-traversal) (Medium)
- Binary Tree Level Order Traversal II(binary-tree-level-order-traversal-ii) (Medium)
- Minimum Depth of Binary Tree(minimum-depth-of-binary-tree) (Easy)
- Binary Tree Vertical Order Traversal(binary-tree-vertical-order-traversal) (Medium)
- Average of Levels in Binary Tree(average-of-levels-in-binary-tree) (Easy)
- N-ary Tree Level Order Traversal(n-ary-tree-level-order-traversal) (Medium)
- Cousins in Binary Tree(cousins-in-binary-tree) (Easy)
- Minimum Number of Operations to Sort a Binary Tree by Level(minimum-number-of-operations-to-sort-a-binary-tree-by-level) (Medium)
- Divide Nodes Into the Maximum Number of Groups(divide-nodes-into-the-maximum-number-of-groups) (Hard)