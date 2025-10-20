### Leetcode 998 (Medium): Maximum Binary Tree II [Practice](https://leetcode.com/problems/maximum-binary-tree-ii)

### Description  
Given the root of a **maximum binary tree**—where every node's value is greater than all the values in its subtree—and an integer `val`, insert `val` into the tree as if you appended it to the end of the original array from which the tree was built.  
You do **not** have access to that original array.  
Update the tree structure (in-place or functionally) so it represents what would be the maximum binary tree built from the original plus `val` at the end.  
The rules:  
- At each step, the largest number in the array is the root.
- The left subtree is built from everything left of this maximum.
- The right subtree is built from everything right of this maximum.  
Return the updated tree.

### Examples  

**Example 1:**  
Input: `root = [4,1,3,null,null,2]`, `val = 5`  
Output: `[5,4,1,null,null,3,null,null,2]`  
*Explanation: Appending 5 forms [4,1,3,2,5]. Now 5 is the largest; it becomes the new root. The old tree is the left subtree.*

```
Input tree:
    4
   / \
  1   3
     /
    2

Output tree:
      5
     /
    4
   / \
  1   3
     /
    2
```

**Example 2:**  
Input: `root = [5,2,4,null,1]`, `val = 3`  
Output: `[5,2,4,null,1,3]`  
*Explanation: Appending 3 forms [5,2,4,1,3]. Traverse right-most; 3 becomes the right child of 4.*

```
Input tree:
    5
   / \
  2   4
   \
    1

Output tree:
    5
   / \
  2   4
   \    \
    1    3
```

**Example 3:**  
Input: `root = [5,2,3,null,1]`, `val = 4`  
Output: `[5,2,4,null,1,3]`  
*Explanation: Appending 4 forms [5,2,3,1,4]. 4 > 3, so 4 becomes the right child of 5, 3 as its left child.*

```
Input tree:
    5
   / \
  2   3
   \   /
    1

Output tree:
    5
   / \
  2   4
   \  /
    1 3
```

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** If I had the original array, I would append `val`, then reconstruct the max binary tree in O(n) time. But the array isn't given, only the tree.
- **Optimal approach:**  
  Since `val` was appended at the end, it only affects the rightmost path of the binary tree:
  - If `val` is **greater than root.val**, then `val` becomes the new root, and the entire current tree becomes its left child (as with Example 1).
  - Otherwise, recursively insert `val` into the **right subtree**.
- This leans on the property of how a max binary tree is constructed: appending at the end influences only the rightmost chain.
- Why not flatten and rebuild? Because that would be O(n), but recursion allows an O(h) solution (h = height of the tree).
- Tradeoff: Simple, clean recursion is fast and doesn’t require reconstructing arrays.

### Corner cases to consider  
- root is `None` (empty tree): output is a single node with `val`.
- val > all values in tree: `val` becomes new root.
- val < all rightmost nodes: becomes rightmost leaf.
- Tree is skewed (all left or all right).
- Tree with duplicates (if applicable; usually unique in max binary trees).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def insertIntoMaxTree(self, root: TreeNode, val: int) -> TreeNode:
        # If root is None, return a new node with val
        if not root:
            return TreeNode(val)
        
        # If val > root.val, new tree with val as the new root
        if val > root.val:
            return TreeNode(val, left=root)
        
        # Otherwise, insert val into the right subtree
        root.right = self.insertIntoMaxTree(root.right, val)
        return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h), where h is the height of the tree. Only traverses down the rightmost path (could be O(n) if skewed).
- **Space Complexity:** O(h) for recursion stack (no extra data structures). For a balanced tree, this is O(log n); worst case O(n) for a skewed tree.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the node values are **not unique**?
  *Hint: How does the construction change if values can repeat?*

- Can you implement this **iteratively** (without recursion)?
  *Hint: Use a while loop to find the right spot and update pointers.*

- If you were given the **original array** as well, could you optimize or reconstruct faster?
  *Hint: How would having both make your solution easier?*

### Summary
This problem exemplifies a **recursive traversal + structural insertion** pattern, recurring in BST and heap insertions. The key was recognizing only the rightmost chain is affected by an appended value in the max binary tree, allowing efficient in-place updates. The pattern is common for problems where modifications at the end of a "rooted" structure only influence extremal paths—useful for heap-like, max/min tree, or append-based tree operations.


### Flashcard
Recursively insert val into the rightmost path; if val > root, make val new root with old tree as left child.

### Tags
Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
- Maximum Binary Tree(maximum-binary-tree) (Medium)