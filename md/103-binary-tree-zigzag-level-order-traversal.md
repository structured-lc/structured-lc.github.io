### Leetcode 103 (Medium): Binary Tree Zigzag Level Order Traversal [Practice](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal)

### Description  
Given the root of a binary tree, return its zigzag (spiral) level order traversal as a list of lists. This means:
- Traverse nodes level-by-level (BFS order), but
- For each odd-numbered level (1ˢᵗ, 3ʳᵈ, ...), reverse the order you collect node values.
You alternate directions: left-to-right on the first level, then right-to-left on the next, and so on.

### Examples  

**Example 1:**  
Input: `[3,9,20,null,null,15,7]`  
Output: `[[3],[20,9],[15,7]]`  
*Explanation:*

The tree:
```
    3
   / \
  9  20
     / \
    15  7
```
Level 0: left→right, [3]  
Level 1: right→left, [20, 9]  
Level 2: left→right, [15, 7]  

**Example 2:**  
Input: `[]`  
Output: `[]`  
*Explanation:*  
Empty tree—no levels, so return an empty list.

**Example 3:**  
Input: `[1,2,3,4,null,null,5]`  
Output: `[[1],[3,2],[4,5]]`  
*Explanation:*

The tree:
```
    1
   / \
  2   3
 /     \
4       5
```
Level 0: left→right, [1]  
Level 1: right→left, [3, 2]  
Level 2: left→right, [4, 5]  

### Thought Process (as if you’re the interviewee)  
Start with classic level order traversal (BFS) using a queue:
- Use a queue to process nodes level by level.
- For each level, collect the node values in an array.
- After each level is traversed, reverse the array if it’s at an odd depth.

To achieve the zigzag effect, we can:
- Use a boolean or integer flag to keep track of the direction.
- For each level, either append node values to the end (left→right) or insert them at the beginning (right→left).
    - Alternatively, just collect them left→right always, and reverse at the appropriate level.
- After processing a level, toggle the direction flag.

This approach leverages the efficient BFS provided by a queue (no tree recursion needed), and reversing short arrays is a minor cost given each node is visited once.

### Corner cases to consider  
- Empty tree (root is None): should return `[]`.
- Single node tree: should return `[[val]]`.
- Trees with only one child (e.g., only left or right branch, zigzags should still alternate).
- Deep unbalanced trees.
- Large balanced trees (performance/efficiency).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def zigzagLevelOrder(root):
    if not root:
        return []
    
    # Queue for BFS
    queue = [root]
    result = []
    left_to_right = True  # flag to control direction
    
    while queue:
        level = []
        next_queue = []
        for node in queue:
            level.append(node.val)
            # Add children for the next level
            if node.left:
                next_queue.append(node.left)
            if node.right:
                next_queue.append(node.right)
        # Reverse the current level if needed
        if not left_to_right:
            level.reverse()
        result.append(level)
        queue = next_queue
        left_to_right = not left_to_right  # toggle direction each level
        
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Every node is visited exactly once, and reversing each level takes O(k) where k is the width of the level; in total across all levels that’s O(n).
- **Space Complexity:** O(n), for the result list and the queue holding nodes at the current level (in the worst case, when the tree is a complete binary tree, a level could have about n/2 nodes).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement zigzag traversal *in-place* without reversing arrays?
  *Hint: Use a deque so you can append/pop from both ends efficiently during traversal.*

- Can you perform the traversal recursively?
  *Hint: Pass a level parameter during DFS and insert node values at the correct position per level and direction.*

- How would the solution change if you wanted a flat list (not nested arrays), in zigzag order?
  *Hint: Flatten the result at the end, or use a single list during traversal and insert accordingly.*

### Summary
This problem is a classic application of **level order (BFS) traversal** with an alternating direction twist ("zigzag"). It reinforces the queue-based BFS pattern, direction toggling, and manipulating arrays/lists for traversal output. The zigzag pattern appears in other problems (printing N-ary trees, spiral order in matrices, etc.), so mastering this helps across tree-based and traversal question variants.


### Flashcard
Perform standard BFS level-order traversal, but toggle direction at each level—either append normally or reverse the level's values before adding to result.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Level Order Traversal(binary-tree-level-order-traversal) (Medium)
- Zigzag Grid Traversal With Skip(zigzag-grid-traversal-with-skip) (Easy)