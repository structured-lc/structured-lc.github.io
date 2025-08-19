### Leetcode 145 (Easy): Binary Tree Postorder Traversal [Practice](https://leetcode.com/problems/binary-tree-postorder-traversal)

### Description  
Given the root of a binary tree, return a list of node values in *postorder traversal* order. In postorder, you visit **left subtree** first, then **right subtree**, and finally the **node itself**. This is a fundamental tree traversal pattern, often explained as "left-right-root".  
You are required to return the sequence of visited node values in this order.

### Examples  

**Example 1:**  
Input: `root = [1, null, 2, 3]`  
Output: `[3, 2, 1]`  
*Explanation: The tree structure is:*
```
    1
     \
      2
     /
    3
```
*Step-by-step: Traverse left of 1 (none); Traverse right of 1 (2): go left of 2 (3): left and right children are none, so record 3. Back to 2, traverse right (none), record 2. Back to 1, record 1.*

**Example 2:**  
Input: `root = []`  
Output: `[]`  
*Explanation: The tree is empty, so no nodes to visit.*

**Example 3:**  
Input: `root = [1]`  
Output: `[1]`  
*Explanation: The tree is just a single node, so output just that value.*

### Thought Process (as if you’re the interviewee)  
To approach this, I recall that **postorder traversal** means visiting nodes left, right, then root. The most intuitive and clean way to do this for a binary tree is with recursion:
- Define a helper function that recursively visits left, then right, then records the value.
- If the current node is `None`, just return (base case for null subtrees).

This works well since every subtree in a binary tree is itself a binary tree, so recursion matches the shape of the problem.  
If an interviewer asks for **iterative**, that gets trickier—classic approach uses a stack and tracks processing order (can also reverse a "root-right-left" preorder result).

I would first code the recursive solution for clarity and correctness, then mention how to convert to iterative for environments where recursion stack depth may be a concern.

### Corner cases to consider  
- **Empty tree input** (`root = None`): Should return `[]`.
- **Single node tree**: Should return `[root.val]`.
- **Tree with only left or only right children**.
- **Skewed tree** (linear like a linked list).
- **Deep but narrow tree** (to show recursion depth).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def postorderTraversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        # Traverse left subtree
        dfs(node.left)
        # Traverse right subtree
        dfs(node.right)
        # Visit the node itself
        result.append(node.val)
    
    dfs(root)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node in the tree is visited *once* (n is total nodes).  
- **Space Complexity:** O(n)  
  - In the *worst case* (completely unbalanced tree), the recursion stack reaches depth n.
  - The output list also stores n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you implement this **iteratively**, without recursion?  
  *Hint: Use a stack, simulate postorder by pushing nodes and tracking visit order. You may need to process root after its subtrees by using a second stack or reversing.*

- What if the **tree depth** could exceed recursion limits?  
  *Hint: Ask about iterative approaches, tail-call optimization, or Morris traversal.*

- How would you handle a **n-ary tree** instead of binary?  
  *Hint: Generalize the traversal by looping over all children before visiting the node.*

### Summary  
This problem uses the classic **Depth-First Search** (DFS) traversal pattern for trees, specifically the "left-right-root" postorder variant. It’s a staple recursion technique for tree-based problems, helpful for solving problems involving subtree calculations, deletions, and post-processing scenarios.  
Recursive DFS is the most straightforward approach, but understanding iterative methods is valuable for environments with recursion depth limits.

### Tags
Stack(#stack), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)
- N-ary Tree Postorder Traversal(n-ary-tree-postorder-traversal) (Easy)
- Minimum Fuel Cost to Report to the Capital(minimum-fuel-cost-to-report-to-the-capital) (Medium)