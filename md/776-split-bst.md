### Leetcode 776 (Medium): Split BST [Practice](https://leetcode.com/problems/split-bst)

### Description  
Given the root of a **binary search tree (BST)** and an integer **target**, split the BST into two new subtrees:
- The **first subtree** has all nodes with values **≤ target**.
- The **second subtree** has all nodes with values **> target**.

Most of the original tree's structure must remain. For any original parent-child relationship, if both end up in the same subtree, they must preserve their relationship. Return the root nodes of both subtrees in a list (`[left_subtree_root, right_subtree_root]`). The tree may not contain the target value.

### Examples  

**Example 1:**  
Input: `[4,2,6,1,3,5,7]`, target=`2`  
Output: `[[2,1],[4,3,6,null,null,5,7]]`  
*Explanation:*
```
Original:         4
                /   \
               2     6
              / \   / \
             1   3 5   7

Subtree ≤2:   2
              /
             1

Subtree >2:        4
                  / \
                 3   6
                    / \
                   5   7

List representation:
[2,1] and [4,3,6,null,null,5,7]
```

**Example 2:**  
Input: `[1]`, target=`1`  
Output: `[[1],[]]`  
*Explanation:*
```
Original:    1

Subtree ≤1:  1
Subtree >1:  (empty)
```

**Example 3:**  
Input: `[3,1,4,null,2]`, target=`2`  
Output: `[[1,null,2],[3,null,4]]`  
*Explanation:*
```
Original:     3
             / \
            1   4
             \
              2

Subtree ≤2:   1
               \
                2

Subtree >2:     3
                  \
                   4

List representation:
[1,null,2], [3,null,4]
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Traverse the original BST, collect values in two lists according to node value, then reconstruct two new BSTs.  
  - **Drawbacks:** O(n) node insertions and building new trees destroys original structure and relationships.

- **Optimal approach:**  
  Use **recursion** to split the tree in-place:
  - If node.val ≤ target, current node will be in the **left** result (≤ target). Its right child may have values both ≤ and > target, so **split the right subtree**, and attach the returned left subtree to node.right.
  - If node.val > target, current node will be in the **right** result (> target). Its left child may have values both ≤ and > target, so **split the left subtree**, and attach the returned right subtree to node.left.
  - Always preserve original left/right pointers to avoid unnecessary copies.

- **Why optimal:**  
  - Each node visits only once, splits are local and pointers reused: preserves structure and avoids extra memory.
  - Simpler code and clear recursion.  
  - Time: O(h), only traversing relevant height of tree.

### Corner cases to consider  
- Tree has **only one node**.
- **All values** ≤ target (right subtree should be empty).
- **All values** > target (left subtree should be empty).
- Target **not present** in tree.
- Tree with **duplicate values** (if allowed by definition; usually BSTs don't, but check).
- Tree is **unbalanced**.
- Target between two existing values.

### Solution

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def splitBST(root, target):
    # Base case: empty tree
    if not root:
        return [None, None]
    
    if root.val <= target:
        # Root and all in left subtree belong to left split
        left_split, right_split = splitBST(root.right, target)
        root.right = left_split
        return [root, right_split]
    else:
        # Root and all in right subtree belong to right split
        left_split, right_split = splitBST(root.left, target)
        root.left = right_split
        return [left_split, root]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h), where h is the height of the BST. Each recursion step moves down one level.
- **Space Complexity:** O(h) for the recursive call stack (no extra data structures created, just stack frames).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input tree is **not a BST**?  
  *Hint: How would you need to adjust to accommodate arbitrary binary trees?*

- Can you perform the split **iteratively**?  
  *Hint: Use a loop or manual stack to mimic recursion.*

- How do you handle **duplicates** if the BST allows them?  
  *Hint: Define whether duplicates go left or right and account in split logic.*

### Summary
This problem uses the **recursion and divide & conquer** pattern to split a BST, keeping in-place node relationships intact. The approach only modifies child pointers and never creates new nodes, making it both efficient and structural-preserving. The same logic can be applied to tree-partitioning and other BST modification tasks where minimal change to original structure is desired.