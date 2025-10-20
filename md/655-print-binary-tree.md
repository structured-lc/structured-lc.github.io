### Leetcode 655 (Medium): Print Binary Tree [Practice](https://leetcode.com/problems/print-binary-tree)

### Description  
Given the root of a binary tree, construct a 2D string matrix that visually “prints” the tree in a well-formatted way:
- The number of rows is the height of the tree plus one.
- The number of columns is always an odd number: for a tree of height h, columns = 2⁽ʰ⁺¹⁾ − 1.
- Each node value appears in the matrix, centered horizontally among empty strings.
- If there is no node at a position, leave it as an empty string.
- Each left/right child appears on the next row, halfway between its parent and the edge/middle.

The task is to fill the matrix according to this pattern for any given binary tree.

### Examples  

**Example 1:**  
Input: `[1,2]`  
Output:  
```
[["", "1", ""],
 ["2", "", ""]]
```
Explanation:  
The root node `1` is centered in the first row. Node `2` is the left child, so it appears in the left cell of the next row.

**Example 2:**  
Input: `[1,2,3,null,4]`  
Output:  
```
[["", "", "", "1", "", "", ""],
 ["", "2", "", "", "", "3", ""],
 ["", "", "4", "", "", "", ""]]
```
Explanation:  
Tree:
```
    1
   / \
  2   3
   \
    4
```
- The root `1` is in the mid column of the first row.
- `2` (left child) is centered left in the second row; `3` is right.
- `4` (right child of 2) is further placed appropriately.

**Example 3:**  
Input: `[3,5,1,6,2,0,8,null,null,7,4]`  
Output:  
```
[
 ["", "", "", "", "", "", "", "3", "", "", "", "", "", "", ""],
 ["", "", "", "5", "", "", "", "", "", "", "", "1", "", "", ""],
 ["", "6", "", "", "2", "", "", "", "", "", "0", "", "", "8", ""],
 ["", "", "7", "", "", "4", "", "", "", "", "", "", "", "", ""]
]
```
Explanation:  
Tree:
```
      3
     / \
    5   1
   / \ / \
  6  2 0  8
    / \
   7   4
```
Nodes are positioned recursively, always centering each subtree.


### Thought Process (as if you’re the interviewee)  
To display the tree, I first need to determine its **height** in order to size the grid:
- *Rows* = height + 1.
- *Columns* = 2⁽ʰ⁺¹⁾ − 1, ensuring all nodes can be placed centered across all levels.

Next, I need to traverse the tree, placing each node in the correct cell. The logic for position is recursive:
- The root goes in the center column.
- For any node at (row, col), its left child goes to (row+1, col − offset), and its right child to (row+1, col + offset), where offset = 2^(height − row − 1).

The recursive traversal (DFS) fits perfectly: for each node, I calculate the current cell for the value, then recurse for left and right children with calculated positions.

A brute-force approach just filling as you go does not center nodes or keep things symmetric; only with full knowledge of height and proper position calculation will this work efficiently.

**Why this approach?:**
- It’s systematic, clear, and exploits the recursive/tree structure.
- Trade-off: grid space is O(m × n), which is necessary to fit the format.


### Corner cases to consider  
- Empty tree (root is None): should return an empty grid.
- Tree with only root node.
- Tree is skewed (all left or all right).
- Full or perfect binary tree.
- Input has only one child at any node (unbalanced).


### Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def printTree(root):
    # Helper to compute the height of the tree
    def height(node):
        if not node:
            return -1   # For m rows, height = m-1; so -1 for empty tree
        return 1 + max(height(node.left), height(node.right))

    h = height(root)
    m = h + 1
    n = 2 ** (h + 1) - 1

    # Initialize grid with empty strings
    res = [["" for _ in range(n)] for _ in range(m)]

    # Place each node recursively
    def fill(node, row, col):
        if not node:
            return
        res[row][col] = str(node.val)
        # Calculate next offset for children
        offset = 2 ** (h - row - 1)
        if node.left:
            fill(node.left, row + 1, col - offset)
        if node.right:
            fill(node.right, row + 1, col + offset)

    fill(root, 0, (n - 1) // 2)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once for height calculation, and once for placement.
- **Space Complexity:** O(m × n), where m = rows and n = columns of the output grid. The number of columns may be much larger than n nodes for highly unbalanced trees (due to the formula), and the recursion stack is O(h) due to tree depth.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code to print the tree in level order, without formatting it into a grid?  
  *Hint: Try using BFS or a queue for traversal.*

- Can you adapt this approach if the node values are very large numbers or strings and may take more than 1 cell to display?  
  *Hint: Consider formatting and length of the node value.*

- How can you handle extremely unbalanced trees where the grid becomes very wide, possibly running out of space?  
  *Hint: Can you dynamically adjust column width or use a compact string representation?*

### Summary
This problem is a classic example of *tree recursion* and precise *grid placement* using mathematical position calculation. The recursive approach, with height-based row and column computation, makes it easy to keep all parts of the tree centered and visually balanced. This pattern is commonly useful for printing, visualizing, or laying out data that is inherently hierarchical, such as organization charts or directory trees.


### Flashcard
Compute tree height to size the grid, then recursively place each node at (row, col) with left/right children offset by powers of two for proper centering.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
