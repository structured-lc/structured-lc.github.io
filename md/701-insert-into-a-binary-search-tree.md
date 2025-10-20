### Leetcode 701 (Medium): Insert into a Binary Search Tree [Practice](https://leetcode.com/problems/insert-into-a-binary-search-tree)

### Description  
Given the root node of a **binary search tree (BST)** and an integer value `val`, insert `val` into the BST such that the BST property is maintained:

- For each node, all values in its left subtree are **less** than the node's value, and all values in its right subtree are **greater**.
- You must return the root of the updated BST.
- Assume all values in the BST are unique and `val` is not already present.

### Examples  

**Example 1:**  
Input: `root = [4,2,7,1,3]`, `val = 5`  
Output: `[4,2,7,1,3,5]`  
*Explanation: Insert 5 into the BST. The resulting tree is:*
```
    4
   / \
  2   7
 / \  /
1  3 5
```

**Example 2:**  
Input: `root = [40,20,60,10,30,50,70]`, `val = 25`  
Output: `[40,20,60,10,30,50,70,null,null,25]`  
*Explanation: Insert 25 as the left child of 30:*
```
         40
        /  \
      20    60
     / \    / \
   10  30  50 70
        /
      25
```

**Example 3:**  
Input: `root = [4,2,7,1,3]`, `val = 8`  
Output: `[4,2,7,1,3,null,8]`  
*Explanation: 8 is greater than every existing node, so it becomes the right child of 7:*
```
    4
   / \
  2   7
 / \   \
1  3    8
```

### Thought Process (as if you’re the interviewee)  
To solve this, I need to find the **correct spot** in the BST for the new value so that the BST property holds:

1. **Brute-force idea:**  
   - Traverse all nodes, compare `val` with each, and try to insert somewhere.  
   - This ignores the BST property and has unnecessary checks.

2. **Leverage BST property:**  
   - Start from the root.
   - If `val` < current node, recursively insert into the left subtree.
   - If `val` > current node, recursively insert into the right subtree.
   - If hitting a null (empty spot), create a new node with `val` there.

3. **Recursive vs. Iterative:**  
   - Recursion naturally fits binary trees for readability and simplicity.  
   - Iterative approach could avoid stack cost, but recursion is concise for interviews.

I choose the **recursive approach** for its clarity, and it directly mirrors the BST insertion logic. This approach is proven and widely accepted.

### Corner cases to consider  
- Inserting into an **empty tree** (root is null).
- Inserting a value **smaller than the smallest node** (goes into the leftmost position).
- Inserting a value **greater than the largest node** (goes into the rightmost position).
- Normal case: Insert deep in a non-trivial tree.
- Trees with only **one node**.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def insertIntoBST(root, val):
    # Base case: If current subtree is empty, insert here
    if root is None:
        return TreeNode(val)
    # If value < current node, go left
    if val < root.val:
        root.left = insertIntoBST(root.left, val)
    else:
        # If value > current node, go right
        root.right = insertIntoBST(root.right, val)
    # Return (possibly unchanged) root node
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - In the worst case (highly unbalanced tree, like a chain), time is O(n) because we traverse from root to the bottom (n nodes).
  - In the best/average case (balanced tree), time is O(log n) for each insertion, as we halve the tree at each step.

- **Space Complexity:**  
  - O(n) in the worst case due to recursion stack for a skewed tree (like a linked list).
  - O(log n) for balanced trees (recursion follows tree height).
  - No extra data structures are used; just recursion stack and basic variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this **iteratively** instead of recursively?  
  *Hint: Use a `while` loop instead of recursion; track parent node and set the left or right child.*

- What if the BST allows **duplicate values**?  
  *Hint: Decide a convention, e.g. duplicates always go to the left or right. Adjust the condition accordingly.*

- How would you modify the function to return the **path** to the inserted node as a list?  
  *Hint: Keep a list and append each node's value as you descend during insertion.*

### Summary  
This problem is a classic example of **binary search tree manipulation** using recursion, which relies on the BST property to ensure efficient insertion. The recursive approach closely reflects the logical structure of decision-making in a BST, and this coding pattern—traverse left/right based on comparisons—arises frequently in tree problems such as searching, validating BSTs, or deleting nodes.


### Flashcard
Recursively insert val into BST: go left if val < node, right if val > node, insert at null child to maintain BST property.

### Tags
Tree(#tree), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Search in a Binary Search Tree(search-in-a-binary-search-tree) (Easy)