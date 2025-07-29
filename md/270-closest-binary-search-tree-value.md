### Leetcode 270 (Easy): Closest Binary Search Tree Value [Practice](https://leetcode.com/problems/closest-binary-search-tree-value)

### Description  
Given the root of a **binary search tree (BST)** and a floating point **target** value, return the *value in the BST* that is closest to the target.  
This means: Among all node values in the tree, find the one with the minimum absolute difference to the target.  
You may assume there is *at least one node* in the BST.

### Examples  

**Example 1:**  
Input: `root = [4,2,5,1,3]`, `target = 3.714286`  
Output: `4`  
*Explanation: The BST contains values 1, 2, 3, 4, 5. 4 is the closest to 3.714286 (|4 - 3.714286| = 0.2857, which is the minimum).*

BST:
```
    4
   / \
  2   5
 / \
1   3
```

**Example 2:**  
Input: `root = [1]`, `target = 2.3`  
Output: `1`  
*Explanation: There is only one node, so 1 is the closest by default.*

BST:
```
1
```

**Example 3:**  
Input: `root = [4,2,5,1,3]`, `target = 0.1`  
Output: `1`  
*Explanation: 1, being the lowest value, is closest to 0.1 (difference is 0.9, smaller than for other nodes).*

BST:
```
    4
   / \
  2   5
 / \
1   3
```

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach**:  
  Traverse the whole tree (using inorder traversal), keep track of the node value with the smallest absolute difference to the target. This works but doesn't exploit the BST property.  

- **Optimized approach using BST property**:  
  Since it’s a BST, for any node:  
  - If target < node value ⇒ the closest could be on the *left subtree*.
  - If target > node value ⇒ the closest could be on the *right subtree*.
  - At each step, update the candidate nearest value.

  This gives us an O(h) time (where h is the height of the tree), much better than O(n) for unbalanced trees.  
  Both iterative and recursive versions are possible. Iterative is often preferred due to stack space.

- **Trade-offs**:  
  - Iterative avoids recursion stack, but both are acceptable.
  - This method scales with the height, so if the BST is balanced, that's optimal.

### Corner cases to consider  
- Tree with *only one node* (single node is always the answer)  
- Target *equals* a node value (return that value immediately)  
- Target *well outside* the tree’s range (return leaf node closest to target)  
- Negative and positive values mixed  
- The BST is *skewed* (left-skewed or right-skewed)

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def closestValue(root: TreeNode, target: float) -> int:
    # Initialize the closest value with the root's value
    closest = root.val

    while root:
        # If current is closer, update closest
        if abs(root.val - target) < abs(closest - target):
            closest = root.val
        # Go left or right depending on BST property
        if target < root.val:
            root = root.left
        elif target > root.val:
            root = root.right
        else:
            # Exact match found
            return root.val

    return closest
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(h), where h is the height of the tree (log₂n for balanced, n for skewed trees).  
  - At each step, you discard half of the tree along the path.

- **Space Complexity:**  
  - O(1) for the iterative approach (no extra storage beyond variables).  
  - O(h) for the recursive solution (recursion stack).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need the k values closest to the target?  
  *Hint: Can you adapt inorder traversal using a heap or sliding window?*

- How would your code change if duplicates are allowed in the BST?  
  *Hint: Consider both subtrees that might share the same value as target.*

- If the BST is stored as a balanced tree, can you guarantee O(log n) performance?  
  *Hint: What about degenerate (linked-list) forms?*

### Summary
This problem uses the classic **BST search** pattern, efficiently narrowing down the search space using BST properties to achieve O(h) time. Recognizing how to prune subtrees quickly is important, not just for finding values but for a wide variety of interval/count/range queries in BST-style interview questions. This pattern appears in problems requiring fast "closest" or "range" value lookups in sorted data structures.