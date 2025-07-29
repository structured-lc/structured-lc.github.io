### Leetcode 314 (Medium): Binary Tree Vertical Order Traversal [Practice](https://leetcode.com/problems/binary-tree-vertical-order-traversal)

### Description  
Given the root of a binary tree, return its **vertical order traversal**: group all node values by vertical column, from the leftmost column to the rightmost. Within each column, nodes are listed top to bottom. If multiple nodes share the same row and column, list them in left-to-right order.
- The root node is at column 0.
- A left child node has column index `parent’s column - 1`; right child: `parent’s column + 1`.

### Examples  

**Example 1:**  
Input: `root = [3,9,20,null,null,15,7]`  
Output: `[,[3,15],,]`  
Explanation:  
```
    3
   / \
  9  20
     / \
    15  7
```
Columns from left to right:  
- Col -1:   
- Col  0: [3, 15]  
- Col +1:   
- Col +2:   

**Example 2:**  
Input: `root = [1,2,3,4,5,6,7]`  
Output: `[[4],[2],[1,5,6],[3],]`  
Explanation:  
```
      1
     / \
    2   3
   / \ / \
  4  5 6  7
```
Columns from left to right:  
- Col -2: [4]  
- Col -1: [2]  
- Col  0: [1, 5, 6]  
- Col +1: [3]  
- Col +2:   

**Example 3:**  
Input: `root = []`  
Output: `[]`  
Explanation: The tree is empty.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - Compute positions for every node (column, row) and sort all nodes by column, then by row (top to bottom), then by left-to-right order.  
  - This would require two passes—one to collect, one to sort/group.
- **Optimized approach:**  
  - Use a **BFS traversal** because it naturally explores top-to-bottom and left-to-right per level.
  - Assign each node a `column` index along with the node in the BFS queue.
  - Use a hash map: `{ column: list of node values }`
  - Track the smallest and largest column indices so we can return columns in order at the end.
  - After traversal, return the values grouped by each column in order from smallest to largest.

### Corner cases to consider  
- The tree is empty (`root = None`): should return `[]`.
- All nodes are left children (one-sided tree).
- All nodes are right children (skewed tree).
- Multiple nodes at the same column/row level.
- Trees with negative and positive values.
- Only one node in the tree.
- Columns with multiple nodes in the *same row*: must be listed left to right.

### Solution

```python
from collections import defaultdict, deque

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def verticalOrder(root):
    # Edge case: empty tree
    if not root:
        return []
    
    # Dictionary to hold column index -> list of values
    col_table = defaultdict(list)
    # Track min and max column to assemble output later
    min_col = max_col = 0
    
    # BFS queue: stores tuples of (node, column_index)
    queue = deque([(root, 0)])
    
    while queue:
        node, col = queue.popleft()
        # Add the value to the correct column
        col_table[col].append(node.val)
        
        # Update bounds for columns seen
        min_col = min(min_col, col)
        max_col = max(max_col, col)
        
        # Add left child with col - 1
        if node.left:
            queue.append((node.left, col - 1))
        # Add right child with col + 1
        if node.right:
            queue.append((node.right, col + 1))
    
    # Extract the columns in order from leftmost to rightmost
    return [col_table[x] for x in range(min_col, max_col + 1)]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n), where n = number of nodes. Each node is visited once.
- **Space Complexity:**  
  - O(n) for the hash map/dictionary storing node values by column.
  - O(n) for the BFS queue in the worst case (all nodes in one level).

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the tree is not binary (k-ary)?  
  *Hint: Generalize the notion of "column" index and update logic for more than two children.*

- How would you return node coordinates (row, col) as well for each value?  
  *Hint: Track level (row) with each node in the queue.*

- Could we do this with DFS instead of BFS?  
  *Hint: Would need to track row/column, then sort nodes at the end for proper order.*

### Summary
This problem uses the **BFS (level order traversal)** pattern with an additional tracking of each node's column index. BFS ensures nodes are processed top-to-bottom and left-to-right at each level, matching the problem’s requirements.  
This pattern is also commonly applied in related problems like:
- "Binary Tree Level Order Traversal"
- "Diagonal Traversal"
- Any problem where node grouping depends on position or depth properties.