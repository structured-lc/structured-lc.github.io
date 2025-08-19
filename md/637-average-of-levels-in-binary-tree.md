### Leetcode 637 (Easy): Average of Levels in Binary Tree [Practice](https://leetcode.com/problems/average-of-levels-in-binary-tree)

### Description  
Given a binary tree, return a list where each element is the average value of all nodes on the same depth (i.e., the same tree level). The root node is at level 0, its children at level 1, and so on. Every level in the tree may have 1 or more nodes, and node values are 32-bit signed integers.

### Examples  

**Example 1:**  
Input:  
```  
    3
   / \
  9  20
     / \
    15  7
```
Output: `[3, 14.5, 11]`  
Explanation:  
- Level 0: [3]  ⇒ average = 3
- Level 1: [9, 20]  ⇒ average = (9 + 20) / 2 = 14.5
- Level 2: [15, 7]  ⇒ average = (15 + 7) / 2 = 11

**Example 2:**  
Input:  
```  
    1
```
Output: `[1]`  
Explanation:  
- Single node, so average is just 1.

**Example 3:**  
Input:  
```  
      2
     / \
    1   3
       /
      4
```
Output: `[2, 2, 4]`  
Explanation:  
- Level 0: [2] ⇒ 2
- Level 1: [1, 3] ⇒ (1 + 3) / 2 = 2
- Level 2: [4] ⇒ 4  

### Thought Process (as if you’re the interviewee)  
First, I’d note that this is a classic level-order traversal (BFS) problem, where at each level we need to compute the average.  
- The brute-force approach would use BFS, visiting each level, summing the values of nodes, then dividing by the node count per level.
- Starting with a queue containing only the root, we process nodes level by level: for each level, we:
  1. Record how many nodes are at the current level (queue size at this moment).
  2. Sum the values for those nodes as we dequeue them.
  3. Enqueue their non-null children for the next level.
  4. Compute the average for this level and append to the result list.
- This guarantees every node is visited exactly once, and uses only extra space proportional to the widest level in the tree.

Alternative approaches (using DFS with level/count arrays) are possible but more complex, as they require tracking sums and counts for each level separately.

### Corner cases to consider  
- Empty tree (input root is `None`)
- Tree with just one node
- Tree with only left or right children (stick/chain)
- Very deep but narrow trees, or very wide but shallow trees
- Negative values and zero in nodes
- Integer overflow (sums may exceed 32-bit, but averages are safe in Python with float division)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

def averageOfLevels(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level_sum = 0

        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.val

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        # Compute average for this level
        result.append(level_sum / level_size)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of nodes. Each node is visited exactly once, and all operations inside the while loop are O(1) per node.
- **Space Complexity:** O(M), where M is the maximum number of nodes at any one level (width of the tree) — for the queue holding the nodes at a level. The output list is O(H), where H is the height of the tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is extremely deep?  
  *Hint: What is the risk with recursion/DFS? How is BFS different regarding stack overflow?*

- Could you solve it using DFS instead of BFS?  
  *Hint: Use two lists: one for sum per level, one for count per level. Traverse while updating both.*

- How would you extend this to output the median (not average) of each level?  
  *Hint: Store all node values at each level and compute median per level at the end.*

### Summary
This problem is a direct application of the BFS (level-order traversal) coding pattern, frequently used when you need to process nodes level by level. The same approach is useful for other "per-level computation" tasks in trees, such as zigzag level order traversal, finding the largest value per level, or counting nodes per depth. The BFS approach is simple, robust for large input, and easy to maintain.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Level Order Traversal(binary-tree-level-order-traversal) (Medium)
- Binary Tree Level Order Traversal II(binary-tree-level-order-traversal-ii) (Medium)