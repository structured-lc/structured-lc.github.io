### Leetcode 1379 (Easy): Find a Corresponding Node of a Binary Tree in a Clone of That Tree [Practice](https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree)

### Description  
Given two identical binary trees, **original** and **cloned**, and a reference to a node, **target**, in the original tree, return the reference to the **corresponding node** in the cloned tree.
- The cloned tree is an exact copy of the original (node values can repeat).
- You are not allowed to change trees or the target node.

### Examples  

**Example 1:**  
Input: `original = [7,4,3,null,null,6,19]`, `cloned = [7,4,3,null,null,6,19]`, `target = Node with value 3`
Output: `Node with value 3`
*Explanation: The structure and values are identical. The target's corresponding node in the cloned tree also has value 3.*

Tree structure:
```
    7
   / \
  4   3
     / \
    6   19
```

**Example 2:**  
Input: `original = `, `cloned = `, `target = Node with value 7`
Output: `Node with value 7`
*Explanation: Single node tree: only root node.*

**Example 3:**  
Input: `original = [8,null,6,null,5,null,4,null,3,null,2,null,1]`, `cloned = same`, `target = Node with value 4`
Output: `Node with value 4`
*Explanation: Skewed tree. Traverse down the right children until you find the 4.*

Tree structure:
```
8
 \
 6
  \
  5
   \
    4
     \
      3
       \
        2
         \
          1
```

### Thought Process (as if you’re the interviewee)  
- The two trees are identical in both structure and node values. 
- Nodes may have duplicate values; comparing by value is **NOT sufficient**.
- The key is to traverse both trees **simultaneously** (in any order: DFS or BFS) and find the node in the cloned tree that matches the *position* of the target node in the original tree.
- Brute-force: Traverse the original tree to find the target, then traverse cloned to find a node with matching value. But with duplicate values, this is unreliable.
- **Optimal approach**: Traverse both trees (DFS or BFS) together. When the current node in the original matches target (by pointer/reference), return the current node in cloned.
- Either pre-order, in-order, post-order; as long as traversed in the same order, both trees stay synchronized.

### Corner cases to consider  
- Trees with only one node.
- Target is the root.
- Trees with duplicate values.
- Left or right skewed trees.
- Target node at a leaf.
- Trees with maximum depth specified by constraints.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# DFS (pre-order traversal): traverse both trees together

def getTargetCopy(original, cloned, target):
    if original is None:
        return None
    if original is target:
        return cloned
    # Traverse left subtree
    left = getTargetCopy(original.left, cloned.left, target)
    if left:
        return left
    # Traverse right subtree
    return getTargetCopy(original.right, cloned.right, target)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Every node may be visited once, where n is the number of nodes.
- **Space Complexity:** O(h) — Due to recursion stack, where h is the height of the tree (O(n) in worst-case skewed, O(log n) in balanced).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree node values are NOT unique?
  *Hint: You should match by reference, not value.*

- Can you do it iteratively (without recursion)?
  *Hint: Use two stacks or queues to traverse both trees in parallel.*

- How would you solve if only node values are provided (not references)?
  *Hint: In this case, matching by value could work if all values are unique, but not otherwise. You'd need additional info marked for target.*

### Summary
This problem uses the **tree traversal (DFS/BFS)** coding pattern. You traverse both trees in lockstep and match by pointer to the target. The pattern appears in tree comparison, cloning, structural synchrony, and more. The pointer-based comparison is critical when values may be duplicated.