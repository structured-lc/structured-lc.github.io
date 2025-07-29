### Leetcode 617 (Easy): Merge Two Binary Trees [Practice](https://leetcode.com/problems/merge-two-binary-trees)

### Description  
Given two binary trees, merge them by adding overlapping nodes’ values. If both nodes exist at the same position, sum their values to create a new node. If only one exists, use its value directly. Traverse both trees in tandem, merging or passing through as applicable. Return a new merged binary tree.

### Examples  

**Example 1:**  
Input:  
Tree 1:  
```
   1
  / \
 3   2
/
5
```
Tree 2:
```
   2
  / \
 1   3
 \   \
  4   7
```

Output:  
```
   3
  / \
 4   5
/ \   \
5  4   7
```
Explanation.  
- Merge root (1+2=3), left (3+1=4), right (2+3=5), left-left (5+0=5), left-right (null+4=4), right-right (null+7=7).

**Example 2:**  
Input:  
Tree 1:  
```
  1
 /
2
```
Tree 2:
```
  3
   \
    4
```
Output:  
```
  4
 / \
2   4
```
Explanation.  
- Merge root (1+3=4), left (2+null=2), right (null+4=4).

**Example 3:**  
Input:  
Tree 1: `[]`  
Tree 2:  
```
 1
```
Output:  
```
 1
```
Explanation.  
- Only Tree 2 exists, so output is Tree 2.

### Thought Process (as if you’re the interviewee)  
I recognize that binary trees often require recursive solutions.  
- The **brute-force** idea: At each node pair, add their values if both exist, else take the non-null node. Recursively merge left and right children.  
- **Optimization:** There isn’t much repeat work here, so recursion is clean and optimal. An iterative approach with a stack/queue is also possible but doesn’t reduce complexity or improve clarity much.  
- **Trade-offs:** Recursion is easy to implement and read. In languages with low recursion stack limits, iterative solutions help—otherwise, recursion is standard.  
- **Implementation detail:** The problem can be solved in-place (modifying one tree and attaching nodes from another) or, more typically, by constructing a new tree for clarity and safety.

### Corner cases to consider  
- Both trees are empty.
- One tree is empty.
- Trees of different heights.
- Trees with only left or only right children.
- Same tree objects as input (should not alias).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def mergeTrees(t1, t2):
    # If either tree is missing, return the other (base case)
    if not t1:
        return t2
    if not t2:
        return t1
    
    # Merge current nodes
    merged = TreeNode(t1.val + t2.val)
    
    # Recursively merge left subtrees
    merged.left = mergeTrees(t1.left, t2.left)
    # Recursively merge right subtrees
    merged.right = mergeTrees(t1.right, t2.right)
    
    return merged
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n and m are the number of nodes in the two trees. Each node in both trees is visited once.
- **Space Complexity:** O(h), where h is the height of the merged tree, due to the recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you merge the trees in-place to save space?  
  *Hint: Do not allocate new nodes; attach nodes from one tree to the other when possible.*

- How would you implement an iterative solution?  
  *Hint: Use a stack or queue to traverse both trees in parallel.*

- What if the input trees are not binary trees but general trees?  
  *Hint: Adapt logic for n-child traversal instead of strictly left/right.*

### Summary
This problem is a classic **tree DFS recursion** problem. The merge operation is performed top-down, making recursion especially natural. This approach—visiting nodes in tandem and merging—can be adapted for problems involving “combining” or “mirroring” trees, and applies to various tree-based interview questions (like tree addition, symmetry, or manipulation problems).