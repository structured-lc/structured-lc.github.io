### Leetcode 987 (Hard): Vertical Order Traversal of a Binary Tree [Practice](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree)

### Description  
Given a binary tree, return the vertical order traversal of its nodes' values. In this traversal, imagine the root is positioned at (row=0, col=0). For every node at (row, col), its left child is at (row+1, col-1), and its right child is at (row+1, col+1).  
Group nodes by each `col` (i.e., vertical line), then sort:
- Top to bottom (increasing row)
- If nodes are in the same row and same column, their values are sorted in ascending order

Return a list of lists, where each inner list corresponds to one column from leftmost to rightmost, and contains the ordered node values from top to bottom.

### Examples  

**Example 1:**  
Input: `root = [3,9,20,null,null,15,7]`  
Output: `[,[3,15],,]`  
*Explanation:*

```
    3
   / \
  9  20
     / \
    15  7
```
- Column -1: 
- Column  0: [3, 15]
- Column  1: 
- Column  2: 

**Example 2:**  
Input: `root = [1,2,3,4,5,6,7]`  
Output: `[[4],[2],[1,5,6],[3],]`  
*Explanation:*

```
       1
     /   \
    2     3
   / \   / \
  4   5 6   7
```
- Column -2: [4]
- Column -1: [2]
- Column  0: [1,5,6]
- Column  1: [3]
- Column  2: 

**Example 3:**  
Input: `root = [1,2,3,4,6,5,7]`  
Output: `[[4],[2],[1,5,6],[3],]`  
*Explanation:*

```
       1
     /   \
    2     3
   / \   / \
  4   6 5   7
```
- Column -2: [4]
- Column -1: [2]
- Column  0: [1,5,6] (since 5 and 6 are same row, sorted as 5, 6)
- Column  1: [3]
- Column  2: 


### Thought Process (as if you’re the interviewee)  
At first glance, this problem is about simulating a traversal with spatial row/col properties for each node, grouping by columns, and then sorting appropriately.  
**Brute-force approach:**  
- Traverse every node, record its position (row, col) and value.
- Gather all nodes for each column, then sort by row, value.

*But*
- We need an efficient way to map nodes to columns and handle sorting within each column.

**Optimized approach:**  
- Use DFS or BFS to traverse the tree, keeping track of row and col at each node.
- Use a `map` from col to a list of (row, value).
- After traversal, for each column, sort the list by row then value.

**Trade-offs:**  
- BFS gives natural top-down row order, but DFS can work if you record (row, col, value) for all nodes and sort at the end.
- Need extra storage to track positions, but ensures the desired order and sorting.

*Why this approach:*
- It leverages structured traversal plus controlled collection and sorting, which matches the problem constraints and is reliable for duplicate and overlapping positions.

### Corner cases to consider  
- Tree with only one node  
- Empty tree (root is None)  
- Multiple nodes at the same (row, col) with same values  
- Tree that is completely skewed (all left or all right)  
- Nodes with duplicate values in different positions  
- Negative/zero/positive column indices are possible

### Solution

```python
from collections import defaultdict, deque

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def verticalTraversal(root):
    # Dictionary to hold mapping: col -> list of (row, value)
    col_table = defaultdict(list)
    # Queue for BFS: stores (node, row, col)
    queue = deque()
    queue.append((root, 0, 0))

    while queue:
        node, row, col = queue.popleft()
        if node:
            # Add the current node's position and value
            col_table[col].append((row, node.val))
            # Left child: row+1, col-1
            if node.left:
                queue.append((node.left, row+1, col-1))
            # Right child: row+1, col+1
            if node.right:
                queue.append((node.right, row+1, col+1))

    # Prepare the result: for each col in order, sort by row, then value
    result = []
    for col in sorted(col_table):
        # Sort first by row, then value
        column_nodes = sorted(col_table[col], key=lambda x: (x[0], x[1]))
        result.append([val for row, val in column_nodes])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N)
    - Each node is put into a list; then, we sort all nodes per column (total sorting is O(N log N) for all nodes combined).
- **Space Complexity:** O(N)
    - We store every node's (row, value) in a list; space for the output is proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a sparse tree with millions of nodes and limited memory?  
  *Hint: Can you process/release data incrementally per column or use disk-based storage?*

- If you couldn't sort at the end, how would you keep each column always ordered by row and value during traversal?  
  *Hint: Consider a priority queue for each column as you go.*

- Could you do this with O(N) time if the tree is guaranteed to be complete or balanced?  
  *Hint: Is row/col position predictable enough to avoid sorting?*

### Summary
This solution uses the **column-table pattern** for two-dimensional traversals, combining BFS (or DFS) and structured collection with sorting to manage overlapping and ordering rules. It's a classic application of positional mapping and can apply to problems where elements must be grouped and ordered by two or more attributes (e.g., matrix-like grouping, skyline problems, directional traversals).