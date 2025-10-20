### Leetcode 99 (Medium): Recover Binary Search Tree [Practice](https://leetcode.com/problems/recover-binary-search-tree)

### Description  
You are given the root of a **binary search tree (BST)** where the values of exactly **two nodes have been swapped by mistake.** Your task is to **recover the tree by swapping these two nodes’ values back**. Do not change the tree’s structure—only correct the swapped node values.  
This means: If you perform an in-order traversal of a BST, you should get a sorted sequence. Two nodes were swapped, so the sequence has two “out of order” places. You need to find the two incorrect nodes and swap their values, restoring the BST property.

### Examples  

**Example 1:**  
Input: `[1,3,null,null,2]`  
Output: `[3,1,null,null,2]`  
*Explanation: In the given tree, 3 is the right child of 1, which is invalid since 3 > 1. Swapping 1 and 3 restores the BST.*

Visual:
```
  1
 /
3
 \
  2

After Swap:
  3
 /
1
 \
  2
```

**Example 2:**  
Input: `[3,1,4,null,null,2]`  
Output: `[2,1,4,null,null,3]`  
*Explanation: The in-order traversal is [3,1,4,2] instead of [1,2,3,4]. Swapping 2 and 3 makes the tree valid.*

Visual:
```
    3
   / \
  1   4
     /
    2

After Swap:
    2
   / \
  1   4
     /
    3
```

**Example 3:**  
Input: `[5,3,9,2,4,7,10,null,null,null,null,null,8]`  
Output: `[5,3,8,2,4,7,9,null,null,null,null,null,10]`  
*Explanation: 9 and 8 are swapped; swap them back to restore the BST property.*

Tree:
```
      5
    /   \
   3     9
  / \   / \
 2   4 7  10
         /
        8

After Swap:
      5
    /   \
   3     8
  / \   / \
 2   4 7   9
             \
             10
```

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  - Perform an in-order traversal, store all nodes in a list, and find the two places where the ordering is incorrect.
  - Swap the two wrong node values.
  - **Cons:** O(n) extra space is needed for the node list.

- **Optimize further:**  
  - Since the BST property means in-order traversal gives sorted values, the two swapped nodes will show up as two inversions.
  - As you traverse in-order, keep track of the previous visited node:
    - If current node’s value < previous node’s value, you’ve found an inversion.
    - The first inversion helps identify the first bad node; the second inversion gives the second node.
    - At the end, swap their values.
  - **Pros:** Only O(1) extra space needed beyond the recursion stack, since you’re only keeping three pointers (prev, first, second).

- **Advanced:**  
  - If you want truly O(1) space and avoid the recursion stack, use **Morris Traversal**.  
    But for interviews, standard recursive in-order is typically sufficient unless asked for O(1) space explicitly.

**Why choose in-order and pointer-tracking?**  
- It leverages the BST property for efficient detection.
- It doesn’t require extra storage for all nodes, just a few pointers.

### Corner cases to consider  
- Tree with only two nodes (they might be swapped)
- Tree where swapped nodes are not adjacent in in-order traversal
- Swapped nodes are (root and a leaf)
- Balanced vs skewed trees
- Tree with one node (no swap possible)
- No swapped nodes (already a BST)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def recoverTree(root):
    # Initialize pointers for the two nodes to swap, and the previous node in traversal
    first = second = prev = None
    # Use a stack for iterative in-order traversal (to avoid recursion)
    stack = []
    curr = root
    prev = None  # Previous node in in-order traversal

    # In-order traversal to find the two misplaced nodes
    while stack or curr:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        # Check for inversion in the expected BST order
        if prev and curr.val < prev.val:
            # First swap detected
            if not first:
                first = prev
            # Always update 'second' to the current node (handles adjacent and non-adjacent swaps)
            second = curr
        prev = curr
        curr = curr.right

    # Swap values of the misplaced nodes to recover the BST
    if first and second:
        first.val, second.val = second.val, first.val
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  You must visit every node in the tree once for in-order traversal.

- **Space Complexity:** O(h)  
  Where h = height of the tree (for stack). In worst case (skewed tree), h = n; for a balanced tree, h = ⌊n/2⌋.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you recover the tree with **O(1) space**?  
  *Hint: Consider Morris in-order traversal for true constant space.*

- How would you approach the solution if **more than two nodes** were incorrectly swapped?  
  *Hint: What is lost if the number of swaps is greater than two? Could you still correct them via in-order mismatch?*

- What changes if the tree was **not a BST** but a general binary tree?  
  *Hint: The in-order property applies only to BSTs, so you’d need a different strategy.*

### Summary
This solution uses the **in-order traversal** property of BSTs to detect and fix misplaced nodes in-place with O(h) space and O(n) time. The core idea—identifying inverted pairs during in-order traversal—is a classic interview pattern for problems involving sorted order in BSTs. The method is applicable in other contexts where you need to restore order with limited modifications, especially in binary tree and BST correctness/restoration problems.


### Flashcard
Inorder traverse to find two nodes out of order; swap their values to recover the BST without extra space.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
