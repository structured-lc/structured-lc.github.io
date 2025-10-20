### Leetcode 513 (Medium): Find Bottom Left Tree Value [Practice](https://leetcode.com/problems/find-bottom-left-tree-value)

### Description  
Given the root of a **binary tree**, return the **leftmost value in the last row** (bottom-most level) of the tree.  
In other words, traverse the tree level by level (from top to bottom). In the bottommost level, return the node’s value that is farthest to the left.

### Examples  

**Example 1:**  
Input: `[2,1,3]`  
Output: `1`  
*Explanation: The binary tree is:*
```
    2
   / \
  1   3
```
*Bottom-most level is `[1,3]`, leftmost is `1`.*

**Example 2:**  
Input: `[1,2,3,4,null,5,6,null,null,7]`  
Output: `7`  
*Explanation: The binary tree is:*
```
       1
      / \
     2   3
    /   / \
   4   5   6
      /
     7
```
*Bottom-most level is ``, leftmost is `7`.*

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Only 1 node, so the leftmost of the last row is `1`.*

### Thought Process (as if you’re the interviewee)  
To solve this problem, I think of level-order (BFS) traversal because it naturally explores the tree in levels, allowing me to identify the leftmost node at the deepest level.

- **Brute force:**  
  Traverse every level, keep storing all nodes at each level, and at the last level, get the leftmost (first) value.  
  However, this can be optimized by not storing all nodes: only record the first node in each level.

- **Optimized approach (BFS):**  
  - Use a queue to do level-order traversal.
  - For each level, record the value of the first node (which will be the leftmost for that level).
  - After traversing all levels, the last leftmost value seen is the answer.

- **DFS alternative:**  
  - Do a depth-first search, always explore left before right.
  - Keep track of the maximum depth reached and the first node seen at each new depth (the leftmost at that level).
  - At the end, the value stored at the deepest depth is the answer.

**Trade-offs:**  
- BFS uses extra space for the queue but is easier to reason about for level-oriented problems.
- DFS uses space proportional to the height (recursion stack), might be prone to stack overflow for deep trees.

I’d choose **BFS** as it’s more intuitive for this problem and handles all cases cleanly.

### Corner cases to consider  
- Tree with only 1 node.
- Tree is skewed (all nodes only have left or right child).
- Last row has multiple nodes—must pick the *leftmost*.
- Tree with null children.
- Very deep tree (test space complexity).

### Solution

```python
# Definition for a binary tree node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findBottomLeftValue(root):
    # Level-order traversal using a queue
    from collections import deque
    queue = deque([root])
    leftmost = root.val

    while queue:
        level_size = len(queue)
        # The first node in the level is the leftmost for this level
        leftmost = queue[0].val
        for _ in range(level_size):
            node = queue.popleft()
            # Add children to queue for next level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    # After last level, leftmost holds the result
    return leftmost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once (where n is the number of nodes).

- **Space Complexity:** O(w)  
  At most, the queue holds all nodes at the *widest* level (w = max width of tree). In the worst case (complete binary tree), this is O(n/2) = O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep—how can you avoid stack overflow?  
  *Hint: Use BFS (iterative) instead of DFS (recursive).*

- Can you solve this using DFS instead of BFS?  
  *Hint: Track both depth and node value when you reach new maximum depth while exploring left before right.*

- How would you update the logic if you needed the rightmost value in the last row?  
  *Hint: Track the last node in each level or traverse right before left.*

### Summary
This problem uses the **BFS/level-order traversal** pattern. It’s a classic technique for any problem requiring "level by level" answers in trees, such as finding leftmost/rightmost nodes, bottom views, or average values per level. The overloaded queue approach (per-level processing) is a pattern frequently seen in binary tree BFS problems.


### Flashcard
Use BFS level-order traversal and record the first node at the last level as the bottom-left value.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
