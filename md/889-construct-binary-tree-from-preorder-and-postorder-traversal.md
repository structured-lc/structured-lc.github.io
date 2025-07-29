### Leetcode 889 (Medium): Construct Binary Tree from Preorder and Postorder Traversal [Practice](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal)

### Description  
You are given the **preorder** and **postorder** traversal of a binary tree containing distinct values.  
Your task is to **reconstruct** and return the root of that binary tree.  
If multiple answers are possible (more than one valid tree exists for the given traversals), you can return any of them.

**Preorder** traversal: Root → Left → Right  
**Postorder** traversal: Left → Right → Root

### Examples  

**Example 1:**  
Input:  
preorder=`[1,2,4,5,3,6,7]`,  
postorder=`[4,5,2,6,7,3,1]`  
Output:  
``` 
    1
   / \
  2   3
 / \ / \
4  5 6  7
```
*Explanation:  
- The tree reconstructed fits both traversals:
  - preorder: [1,2,4,5,3,6,7] (root → left → right)
  - postorder: [4,5,2,6,7,3,1] (left → right → root)*

**Example 2:**  
Input:  
preorder=`[2,1,3]`,  
postorder=`[1,3,2]`  
Output:  
```
  2
 / \
1   3
```
*Explanation:  
- preorder: 2, 1, 3  
- postorder: 1, 3, 2*

**Example 3:**  
Input:  
preorder=`[1]`,  
postorder=`[1]`  
Output:  
```
1
```
*Explanation:  
- Single node tree, both traversals are just [1].*


### Thought Process (as if you’re the interviewee)  

- The **preorder traversal** always gives the root node as its first element.
- The **postorder traversal** always ends with the root node.
- To partition subtrees:
  - The second entry in preorder is the root of the left subtree (if it exists).
  - Find this node in postorder; everything before it (in postorder) is the left subtree.
- Recursively carve out left and right subtrees using indices.
- Build a hashmap for fast postorder index lookup to avoid linear scans each time.
- Base cases: When the current subtree consists of a single node, return a leaf.

**Brute-force idea:**  
For each recursion, use slicing on preorder and postorder to identify left and right subtree lists. This creates many copies—not efficient in space/time.

**Optimized approach:**  
Pass along indices (pre_start, pre_end, post_start, post_end), and avoid slicing/copying lists.  
Use a map to quickly find left subtree root position in postorder (O(1) each time).

**Choice/Trade-off:**  
Array index management keeps memory down and is more efficient. The recursive nature will use stack space proportional to tree height (can be O(n) in the worst case).


### Corner cases to consider  
- Empty arrays (should return None)
- Single element arrays (single-node tree)
- Trees with only a left or right child (skewed trees)
- Arrays where preorder or postorder length is 1 (minimal case)
- Invalid/inconsistent traversals (if the input is guaranteed valid, can ignore)


### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def constructFromPrePost(preorder, postorder):
    # Map from value to its index in postorder for quick lookup
    post_index = {val: i for i, val in enumerate(postorder)}
    
    def build(pre_start, pre_end, post_start, post_end):
        # Base case: if no elements, return None
        if pre_start > pre_end:
            return None
        # Base case: single node subtree
        if pre_start == pre_end:
            return TreeNode(preorder[pre_start])
        
        root_val = preorder[pre_start]
        root = TreeNode(root_val)
        # The next element in preorder is the left child
        left_root_val = preorder[pre_start + 1]
        # Find the left subtree size using postorder
        left_root_idx = post_index[left_root_val]
        left_size = left_root_idx - post_start + 1
        
        # Recursively build left and right subtrees
        root.left = build(pre_start + 1, pre_start + left_size,
                          post_start, left_root_idx)
        root.right = build(pre_start + left_size + 1, pre_end,
                           left_root_idx + 1, post_end - 1)
        return root
    
    return build(0, len(preorder) - 1, 0, len(postorder) - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is visited exactly once, and all lookups (using the hashmap) are O(1).

- **Space Complexity:** O(n)  
  - The hashmap uses O(n) space for indices.
  - The recursive stack at worst can be O(n) if the tree is skewed.
  - No extra copies of the subtree arrays are made; only indices and nodes.


### Potential follow-up questions (as if you’re the interviewer)  

- What if nodes are not distinct?  
  *Hint: How would you distinguish left and right subtree boundaries if values repeat?*

- Can you reconstruct a unique tree from preorder and postorder?  
  *Hint: In general, multiple binary trees can have the same preorder and postorder; think about why.*

- How would you do this iteratively instead of recursively?  
  *Hint: Could you simulate recursion with a stack and manage indices yourself?*


### Summary
This solution uses **recursion** and array index management, a common pattern for tree construction problems.  
It combines the properties of **preorder** (root first) and **postorder** (root last) and leverages a hashmap for fast splits. This “construct a tree from two traversals” approach appears in other LeetCode variants (e.g., preorder/inorder), and learning the pattern of dividing and conquering with traversal properties is broadly applicable in tree-based coding interviews.