### Leetcode 2236 (Easy): Root Equals Sum of Children [Practice](https://leetcode.com/problems/root-equals-sum-of-children)

### Description  
You are given the root of a binary tree with exactly **three nodes**: a root node, its left child, and its right child. Your task is to **return True if the value of the root node equals the sum of the values of its two children**, or **False** otherwise.  
This requires a simple check of root.val == root.left.val + root.right.val. Each child is guaranteed to exist.

### Examples  

**Example 1:**  
Input: `[10,4,6]`  
Output: `True`  
*Explanation: root=10, left=4, right=6; 4+6 = 10, so return True.*

**Example 2:**  
Input: `[5,3,1]`  
Output: `False`  
*Explanation: root=5, left=3, right=1; 3+1 = 4 ≠ 5, so return False.*

**Example 3:**  
Input: `[0,-1,1]`  
Output: `True`  
*Explanation: root=0, left=-1, right=1; -1+1 = 0, so return True.*


### Thought Process (as if you’re the interviewee)  
Since the tree only has three nodes—the root plus its two children—the solution is extremely simple.  
- **Brute-force / direct:** Just directly check if root.val == root.left.val + root.right.val.  
- **Why not traversal?** There is no need for recursion, iteration, or tree traversal, because both children are always present.
- **Trade-offs:** There are no real trade-offs. The code is O(1) in both time and space, and this is as good as it gets.

### Corner cases to consider  
- Negative values (children or root can be negative)
- Both children or the root are zero
- Large positive or negative values
- Both children have the same value (e.g., [4,2,2])
- Both children have negative values summing to a negative root

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def checkTree(root):
    # Check if the root value is equal to the sum of its two children's values.
    return root.val == root.left.val + root.right.val
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Only a single arithmetic operation and one comparison are made, regardless of input values.
- **Space Complexity:** O(1)  
  No extra space is used beyond the variables already present.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree could have more than one level?
  *Hint: Think about using recursion or traversal for larger trees.*

- How would you handle the case if the left or right child could be missing (i.e., possibly None)?
  *Hint: Add null-checks to the children's existence before accessing their values.*

- What if you wanted to check this property at every node in a larger binary tree?
  *Hint: Consider recursively applying the same check at every internal node.*

### Summary
This problem is a direct property check on a small binary tree. The solution is a classic example of *direct access* of node values without traversal, recursion, or extra data structures.  
It helps reinforce the importance of reading constraints carefully and choosing solutions that fit minimal input—it’s never needed to overcomplicate with tree traversal when simple arithmetic and value checks suffice.  
Patterns like this show up when dealing with fixed-size trees or direct parent-child value relationships.