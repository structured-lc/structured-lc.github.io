### Leetcode 107 (Medium): Binary Tree Level Order Traversal II [Practice](https://leetcode.com/problems/binary-tree-level-order-traversal-ii)

### Description  
Given a **binary tree**, return the values of its nodes as a *level-order (breadth-first)* traversal, but **from bottom level to top**. Instead of reporting nodes from the root down, report them from the leaf level up, with each level’s nodes from left to right.

### Examples  

**Example 1:**  
Input: `[3,9,20,null,null,15,7]`  
Output: `[[15,7], [9,20], [3]]`  
*Explanation:*

Tree:  
```
    3
   / \
  9  20
    /  \
   15   7
```

Levels bottom-up:  
Level 2 → [15,7]  
Level 1 → [9,20]  
Level 0 → [3]


**Example 2:**  
Input: `[]`  
Output: `[]`  
*Explanation: The tree is empty, so there are no levels to return.*

**Example 3:**  
Input: `[1]`  
Output: `[[1]]`  
*Explanation:*

Tree:  
```
1
```
Only one node, so single level.


### Thought Process (as if you’re the interviewee)  
I need to traverse the tree *level by level*, but build the result from the bottom up.

Naive idea:  
- Perform a level-order traversal (BFS) as usual, storing each level in a list/queue.
- After collecting all levels (from top down), **reverse** the list of levels.

Why BFS?  
- BFS is ideal for level-order traversal, as it naturally gathers nodes by level using a queue.

Alternatives:  
- DFS with keeping track of depth: with recursion, I can build the result by inserting new levels at the front, but this is less straightforward and can be trickier to debug, so I would prefer simple BFS.

**Trade-offs:**  
- BFS is straightforward and avoids tricky index manipulation.
- Reversing the list of levels at the end is an O(L) operation (L = number of levels), which is negligible compared to the O(n) traversal.

### Corner cases to consider  
- Empty tree (`root is None`): should return `[]`.
- Tree with only one node.
- Tree with only left or only right children at each level (skewed tree).
- Tree where all leaves are at the same depth.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrderBottom(root):
    # Result will hold lists of values at each level
    result = []
    if not root:
        return result

    # Standard BFS setup
    queue = [root]
    while queue:
        # Gather all nodes at current level
        level = []
        next_queue = []
        for node in queue:
            level.append(node.val)
            if node.left:
                next_queue.append(node.left)
            if node.right:
                next_queue.append(node.right)
        # Append current level to result
        result.append(level)
        # Move to next level
        queue = next_queue

    # We want bottom-up order, so reverse at end
    return result[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is processed once as we traverse the tree.
- **Space Complexity:** O(n) — Storing all node references in the queue (for a complete tree, the last level can have about n/2 nodes), and result stores all n values as well.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this using DFS recursion instead of BFS?
  *Hint: Use the call stack to track depth, and insert new levels at the front of your result list.*

- How would you handle if the tree is extremely wide at some levels (memory concerns)?
  *Hint: Consider streaming levels if possible or pruning unnecessary parts.*

- What if you only want the values at the kᵗʰ-to-last level?
  *Hint: Do a single BFS and just extract that single level from your reversed list.*

### Summary
This approach uses the classic **BFS traversal pattern**, collecting levels as we would for top-down traversal, then simply reversing the levels at the end for a bottom-up result. This is a common tree traversal pattern and the same logic applies to other problems like standard level-order traversal or zigzag level-order traversal, differing only in output arrangement.