### Leetcode 1038 (Medium): Binary Search Tree to Greater Sum Tree [Practice](https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree)

### Description  
Given a **binary search tree (BST)**, modify it so that each node’s value becomes the sum of all values in the original tree greater than or equal to the node’s current value.  
- For every node, its new value should be its original value plus the sum of values of all nodes that have greater keys in the BST.
- The structure of the tree remains unchanged.

For example, if a node has value 4, and values greater than 4 in the tree are 5, 6, 7, and 8, it should be updated to 4 + 5 + 6 + 7 + 8 = 30.

### Examples  

**Example 1:**  
Input: `[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]`  
Output: `[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]`  
*Explanation:*
```
      4                      30
     / \                    /  \
    1   6     →           36   21
   / \ / \                / \   / \
  0  2 5 7              36 35 26 15
       \                      \
        3                     33
                                    8
```
Each node’s value is replaced by the sum of its value and the values of all greater nodes.

**Example 2:**  
Input: `[1,0,2]`  
Output: `[3,3,2]`  
*Explanation:*
```
   1            3
  / \   →      / \
 0   2        3   2
```
- Node 2: values ≥ 2 → [2], sum = 2
- Node 1: values ≥ 1 → [1,2], sum = 3
- Node 0: values ≥ 0 → [0,1,2], sum = 3

**Example 3:**  
Input: `[3,2,4,1]`  
Output: `[7,9,4,10]`  
*Explanation:*
```
    3                7
   / \      →       / \
  2   4           9   4
 /               /
1               10
```
- Node 1: values ≥ 1 → [1,2,3,4], sum = 10
- Node 2: values ≥ 2 → [2,3,4], sum = 9
- Node 3: values ≥ 3 → [3,4], sum = 7
- Node 4: values ≥ 4 → [4], sum = 4

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  For each node, traverse the whole tree, sum all values greater than or equal to it, and update its value.
  - This leads to O(n²) time because for each node we could visit all nodes.

- **Optimize using BST properties**:  
  In a BST, an **in-order traversal** gives nodes in ascending order. If we traverse **reverse in-order (right, node, left)**, we visit greater values first, allowing us to carry a running sum as we go.
  - At each node:  
    - Visit right → have the sum of all greater values so far.
    - Update node by adding sum so far.
    - Move to left, continuing with new sum.
  - This gives O(n) time and O(h) space (for recursion stack), h = tree height.
  - Trade-off: Recursion uses stack space, but far more efficient than brute force.

### Corner cases to consider  
- Empty tree (`root` is `None`)
- Single-node tree
- Tree where all nodes are left children (descending order)
- Tree where all nodes are right children (ascending order)
- Negative or zero values (although per constraints, values are ≥0)
- All nodes have the same value (not possible as values are distinct per problem statement)
- Minimum and maximum possible tree sizes (1 or 100 nodes)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bstToGst(root):
    # We use a running sum, updating as we go
    total = 0

    def reverse_inorder(node):
        nonlocal total
        if not node:
            return

        # Traverse right subtree (greater values first)
        reverse_inorder(node.right)

        # Update value with running total
        total += node.val
        node.val = total

        # Traverse left subtree (smaller values)
        reverse_inorder(node.left)

    reverse_inorder(root)
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes.
  - Each node is visited once.
- **Space Complexity:** O(h), where h is the height of the tree.
  - Recursion stack for the traversal.
  - For a balanced BST, h = log n; for a skewed tree, h = n.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this iteratively to avoid recursion stack overflow for very deep trees?  
  *Hint: Consider using an explicit stack and simulate reverse in-order traversal.*

- What if duplicate values were allowed in the BST?   
  *Hint: Think about how the traversal order and updating logic might need to change if equal values can appear in different branches.*

- How would you implement this using Morris Traversal for O(1) extra space?  
  *Hint: Review how Morris Traversal reuses tree structure to avoid stack/recursion while simulating in-order/reverse in-order traversal.*

### Summary
This problem uses the **reverse in-order traversal** coding pattern, leveraging the BST's in-order properties. Carrying a running sum during traversal naturally fits the requirement of summing greater or equal values. This is a classic tree-accumulation problem and similar patterns can be applied in any situation requiring dynamic aggregates during traversal, such as finding suffix sums in trees or augmenting trees for range queries.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
