### Leetcode 255 (Medium): Verify Preorder Sequence in Binary Search Tree [Practice](https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree)

### Description  
Given an array of **unique** integers, determine if it could represent the **preorder traversal** sequence of a binary search tree (BST). Each value must conform to BST rules: all values in the left subtree are less than the node, all in the right are greater, and preorder means "root, left, right".

### Examples  

**Example 1:**  
Input: `preorder = [5,2,1,3,6]`  
Output: `true`  
*Explanation: One possible BST is:*
```
    5
   / \
  2   6
 / \
1   3
```
*This tree's preorder traversal matches the input.*

**Example 2:**  
Input: `preorder = [5,2,6,1,3]`  
Output: `false`  
*Explanation: After putting 5 as root, 2 as left child, 6 as right child:  
'1' appears after '6' but is smaller than root, so in a BST's preorder it can't appear in this position.*

**Example 3:**  
Input: `preorder = [8,5,1,7,10,12]`  
Output: `true`  
*Explanation: One possible BST is:*
```
     8
    / \
   5   10
  / \    \
 1   7    12
```
*Preorder of this tree is [8,5,1,7,10,12].*

### Thought Process (as if you’re the interviewee)  
Start by noting that **preorder** visits nodes as root, then left subtree, then right subtree. In a BST, for each node, left values must be less, right values greater.  
- **Brute force**: Try to reconstruct the tree using indices and recursion, checking bounds for each subtree. This is correct but costly and potentially uses stack space proportional to the tree height.
- **Optimization**: Since we process the list preceding left children before right subtree, track the lowest allowed value for the current node (using a stack & boundary).  
  - Use a **stack** to keep visited ancestors.
  - If a node is less than the most recent valid ancestor (boundary), it's invalid.
  - As soon as we move to a right subtree (value > stack top), repeatedly pop from stack; last popped value becomes new lower bound.

### Corner cases to consider  
- Empty array (`[]`) - should return `true`.
- Single element (`[number]`) - always valid.
- Strictly increasing - valid, only right children.
- Strictly decreasing - valid, only left children.
- Input where some later number is less than root after visiting a right subtree - invalid.
- Very large or very small values.

### Solution

```python
def verifyPreorder(preorder):
    stack = []
    lower_bound = float('-inf')
    for value in preorder:
        # If value is less than the allowed minimum, it's invalid
        if value < lower_bound:
            return False
        # When we find a value greater than stack top, we're moving to a right subtree
        while stack and value > stack[-1]:
            # Pop all ancestors smaller than value, last popped sets new lower bound
            lower_bound = stack.pop()
        stack.append(value)
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes. Each value is pushed/popped at most once.
- **Space Complexity:** O(n) worst case for stack (decreasing sequence), O(h) for average case if tree is balanced (h = height).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this in **constant space**?  
  *Hint: Try using indices and overwrite the input array to mimic stack behavior.*

- What if input values **aren't unique**?  
  *Hint: How will duplicates affect the BST/invariant?*

- How would your solution change if asked for **postorder** instead of preorder?  
  *Hint: Postorder is left, right, root—think about reverse traversal.*

### Summary
This problem leverages the vivid **BST properties** and the **preorder traversal pattern**. Using a stack to mimic ancestor-tracking allows efficient verification in linear time with minimal state. The pattern (stack to track ancestors and boundaries) is common in tree traversal validation and construction problems, and is useful for serializing/deserializing BSTs, as well as problems about next-greater elements.


### Flashcard
Verify Preorder Sequence in Binary Search Tree

### Tags
Array(#array), Stack(#stack), Tree(#tree), Binary Search Tree(#binary-search-tree), Recursion(#recursion), Monotonic Stack(#monotonic-stack), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Preorder Traversal(binary-tree-preorder-traversal) (Easy)