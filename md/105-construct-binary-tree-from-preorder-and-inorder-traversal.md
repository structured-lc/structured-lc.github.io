### Leetcode 105 (Medium): Construct Binary Tree from Preorder and Inorder Traversal [Practice](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal)

### Description  
Given two arrays, **preorder** and **inorder**, representing the preorder and inorder traversal results of a binary tree, **reconstruct** the original binary tree.  
- **Preorder** visits: root → left subtree → right subtree.
- **Inorder** visits: left subtree → root → right subtree.  
No node value repeats.  
The problem guarantees that the input is valid and corresponds to a unique binary tree.

### Examples  

**Example 1:**  
Input: `preorder = [3,9,20,15,7]`, `inorder = [9,3,15,20,7]`  
Output:  
```
    3
   / \
  9  20
     / \
    15  7
```
List representation: `[3,9,20,null,null,15,7]`  
Explanation:  
- 3 is the root (first from preorder).
- In inorder, 9 is to the left of 3 and [15, 20, 7] is to the right, so recursively build left and right subtrees.
- Left subtree: preorder = , inorder =  → root=9.
- Right subtree: preorder = [20,15,7], inorder = [15,20,7].
    - 20 is root (from preorder), 15 left, 7 right.
    - 15 subtree: preorder=, inorder= → root=15.
    - 7 subtree: preorder=, inorder= → root=7.

**Example 2:**  
Input: `preorder = [-1]`, `inorder = [-1]`  
Output:  
```
-1
```
List: `[-1]`  
Explanation:  
Tree has a single root node.

**Example 3:**  
Input: `preorder = [1,2]`, `inorder = [2,1]`  
Output:  
```
  1
 /
2
```
List: `[1,2]`  
Explanation:  
- 1 is root, 2 sits to its left (found before 1 in inorder), so it's a left-skewed tree.


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each subtree, find the root in preorder, scan inorder to find root's index, split arrays for left and right and repeat. This uses array slicing or copying, which is O(n²) overall.

- **Optimized approach:**  
  - Use a hash map for O(1) lookup of the root's index in inorder.
  - Keep track of the current `preorder` index globally, and partition the tree region in `inorder` by indices, so no array slicing.
  - For each recursive call:
    - Root is at current preorder index.
    - Find root in inorder using hash map.
    - Number of nodes in left subtree = root’s inorder index - left bound.
    - Build left and right subtrees recursively by adjusting boundaries and preorder cursor.
  - This way, every node and edge is visited once, so **O(n)** time and space.

- **Why this is unique:**  
  Preorder always gives the next root; inorder tells us boundary of left/right subtrees. The combo is guaranteed to uniquely reconstruct a binary tree with distinct nodes.

### Corner cases to consider  
- Empty arrays (should return None / null tree)
- Single node case (one value, both traversals)
- Completely skewed trees (all to one side)
- Large tree to check performance (due to recursion depth)
- Tree contains only left or only right children

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def buildTree(preorder, inorder):
    # Map inorder values to their indices for quick lookup
    idx_map = {v: i for i, v in enumerate(inorder)}
    pre_idx = 0  # Pointer to the next root in preorder

    def helper(left, right):
        nonlocal pre_idx
        if left == right:  # No elements in this subtree
            return None

        # Root value is always the next value in preorder
        root_val = preorder[pre_idx]
        root = TreeNode(root_val)

        # Find the root index in inorder
        index = idx_map[root_val]

        pre_idx += 1  # Move to the next root for recursive calls

        # Build left subtree from inorder[left : index]
        root.left = helper(left, index)
        # Build right subtree from inorder[index+1 : right]
        root.right = helper(index + 1, right)
        return root

    return helper(0, len(inorder))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of nodes. Each node is processed exactly once. The hash map allows O(1) find for root index.
- **Space Complexity:** O(n) for:
  - Hash map (O(n)).
  - Recursion stack (O(h)), worst case O(n) if the tree is very skewed.
  - Output tree nodes (O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if node values are not unique?  
  *Hint: Can you still use a hash map for indices?*

- What if the input was in postorder + inorder?  
  *Hint: Similar logic applies but use postorder's direction.*

- How can it be made iterative?  
  *Hint: Simulate recursion with an explicit stack.*

### Summary
This problem uses the **recursive tree construction** pattern, taking advantage of traversal properties and index hash mapping for speed. The trick is to keep your boundaries and pointer bookkeeping correct, so every call uses the right window without array copying. The same approach is widely applied in related problems such as reconstructing from inorder + postorder, serializing/deserializing trees, and parsing recursion divisions.