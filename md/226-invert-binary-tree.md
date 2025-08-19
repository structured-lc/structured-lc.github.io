### Leetcode 226 (Easy): Invert Binary Tree [Practice](https://leetcode.com/problems/invert-binary-tree)

### Description  
Given the root of a binary tree, invert the tree and return its root.  
Inverting a binary tree means swapping the left and right child of every node in the tree, producing a mirror image. This process is applied recursively to every node in the tree.  
In other words, for each node, its left child becomes its right child, and its right child becomes its left child, for every level of the tree.

### Examples  

**Example 1:**  
Input:  
List representation: `[4,2,7,1,3,6,9]`  
Tree:
```
    4
   / \
  2   7
 / \ / \
1  3 6  9
```
Output:  
List representation: `[4,7,2,9,6,3,1]`  
Tree:
```
    4
   / \
  7   2
 / \ / \
9  6 3  1
```
*Explanation: Each left-right subtree at every node is swapped. The structure becomes a mirror image.*

**Example 2:**  
Input: `[2,1,3]`  
Tree:
```
  2
 / \
1   3
```
Output: `[2,3,1]`  
Tree:
```
  2
 / \
3   1
```
*Explanation: Left and right children swapped at the root, resulting in a mirror.*

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation: Empty tree remains empty after inversion.*


### Thought Process (as if you’re the interviewee)  
First, I recognize that I need to swap every node’s left and right children recursively.

- **Brute-force / Manual way**:  
  I could try to traverse the tree and rebuild a new tree from scratch, swapping left and right as I go.  
  But this is unnecessary because the swap can be performed in-place.

- **Recursive approach**:  
  Since the operation (swap left and right child) is the same at every node, recursion is natural:
  - For the current node, swap left and right children.
  - Then recurse on the (now swapped) left and right children.

- **Iterative (BFS/DFS) approach**:  
  Alternatively, I could use BFS (queue) or DFS (stack) iteratively to traverse and swap at every node.  
  However, recursion is simpler, with more intuitive code for this pattern.

I’ll use recursion for clarity and simplicity. The main trade-off is stack space (due to recursion), but for a balanced or small tree, this is not a concern.


### Corner cases to consider  
- Tree is empty (`root is None`)
- Tree has only one node (should not error, should return node itself)
- Tree is highly unbalanced (degenerates to a linked list)
- Tree where all the left or right children are `None`
- Tree with duplicate values (should still invert structure, not values themselves)


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invertTree(root):
    # Base case: if the node is None, there is nothing to invert.
    if root is None:
        return None

    # Swap the left and right children.
    root.left, root.right = root.right, root.left

    # Recurse on the left subtree (which was root.right before swapping).
    invertTree(root.left)
    # Recurse on the right subtree (which was root.left before swapping).
    invertTree(root.right)

    # Return the root node after inverting its subtrees.
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node in the tree is visited exactly once, and swapping pointers is a constant-time operation. n = number of nodes in the tree.

- **Space Complexity:** O(h)  
  Where h is the height of the tree. This is the maximum depth of the recursion stack. Worst case O(n) (completely unbalanced tree), best case O(log n) (balanced tree). No extra storage beyond recursive call stack.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you invert the tree iteratively without recursion?  
  *Hint: Use a stack or queue to traverse nodes level by level or depth-first, swapping children at each step.*

- What happens if the tree is extremely deep?  
  *Hint: Consider recursion stack overflow; iterative approach avoids this limitation.*

- How would you invert only a subtree rooted at a given node?  
  *Hint: Apply the inversion logic starting from that node as root.*


### Summary  
This problem applies a classic **recursive tree traversal** pattern, specifically Preorder (process node, then children). The approach is simple and leverages the natural recursive structure of trees. It can be adapted to an iterative method with a stack or queue. This pattern is commonly found in problems involving subtree manipulations, such as cloning, mirroring, or modifying every node in a tree.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Reverse Odd Levels of Binary Tree(reverse-odd-levels-of-binary-tree) (Medium)