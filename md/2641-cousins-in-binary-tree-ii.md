### Leetcode 2641 (Medium): Cousins in Binary Tree II [Practice](https://leetcode.com/problems/cousins-in-binary-tree-ii)

### Description  
Given the root of a binary tree, replace the value of each node with the sum of all its cousins' values. Two nodes are cousins if they are at the same level (depth) and do not share the same parent. The transformation should be done in-place, updating the original tree's node values with the sum of their cousins.

### Examples  

**Example 1:**  
Input: `[5,4,9,1,10,null,7]`  
Output: `[0,0,0,7,7,null,11]`  
Explanation:  
```
Original:
       5
     /   \
    4     9
   / \     \
  1  10     7

After update:
       0         ← 5 has no cousins at its level
     /   \
    0     0      ← 4 and 9 (level 1) have no cousins
   / \     \
  7   7    11    ← At level 2, cousins for 1 and 10 are 7, for 7 are 1 and 10 (sum: 7 and 11)
```

**Example 2:**  
Input: `[3,1,2]`  
Output: `[0,0,0]`  
Explanation:  
```
Original:
    3
   / \
  1   2

After update:
    0      ← root (3) has no cousin
   / \
  0   0   ← 1 and 2 have no cousin (no other sibling at level)
```

**Example 3:**  
Input: `[1]`  
Output: ``  
Explanation:  
Single-node tree. Root has no cousins, so updated value is 0.

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would be—for each node, traverse the entire tree, find all cousin nodes (same level, different parent), and sum their values. For every node, this results in O(n²) time which is very inefficient.
- To optimize, notice that:
  - At each level, all nodes' cousins are nodes at the same depth except for its own siblings (nodes with the same parent).
  - So for each level, compute the total sum of all node values at that level. For any node, its cousin sum is `levelSum - sum of its own siblings (including itself)`.
  - This suggests a BFS (level-order traversal) where at each level:
    - Record all nodes at that level.
    - For each parent, map their children's sum.
    - For each node, set value to `levelSum - parentChildrenSum[parent]` (so the siblings don't count as cousins).
  - This approach is O(n) since every node is processed once.
- The final approach: BFS, use a queue to process the tree level by level, track sums, and assign values in a second pass.

### Corner cases to consider  
- Empty tree (root is None)
- Single-node tree (root only)
- Non-perfect or unbalanced binary trees (some nodes may have only one child)
- Nodes with only one cousin or none at all
- Trees of depth 2 (level with leaves only)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque, defaultdict

def replaceValueInTree(root):
    if not root:
        return None

    queue = deque()
    queue.append((root, None))  # (node, parent)
    
    while queue:
        level = []
        parent_to_children_sum = defaultdict(int)
        for _ in range(len(queue)):
            node, parent = queue.popleft()
            level.append((node, parent))
            parent_to_children_sum[parent] += node.val
            if node.left:
                queue.append((node.left, node))
            if node.right:
                queue.append((node.right, node))
        
        # Calculate sum for this level
        level_sum = sum(node.val for node, _ in level)
        
        # Assign cousin sum for each node of this level
        for node, parent in level:
            # Cousins are all nodes at this level except siblings (same parent)
            node.val = level_sum - parent_to_children_sum[parent]
    
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited exactly once per level, and all operations per node are O(1).
- **Space Complexity:** O(n) — Queue stores up to one level of nodes, and the parent-to-children sum dictionary can be up to O(n) in the worst case (if each node is a direct child of the root).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if node values are not unique?
  *Hint: Is uniqueness of values required anywhere? Why or why not?*

- Can you solve this problem using recursion instead of iteration?
  *Hint: Consider passing level and parent info in DFS.*

- How would you implement the solution if you only wanted to update the leaf nodes?
  *Hint: Modify the BFS to only update nodes at maximum depth.*

### Summary
This problem showcases the **level order traversal (BFS) pattern** for trees, with a focus on aggregating data at each level and then updating node values based on relationships that depend on both level and parent. This pattern is re-usable anywhere you need to compute aggregates per tree level, such as "average of levels," "node with max value at each depth," etc. The core of the solution is identifying which nodes count as cousins and efficiently grouping and summing them per level.