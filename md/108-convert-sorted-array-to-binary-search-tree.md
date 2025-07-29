### Leetcode 108 (Easy): Convert Sorted Array to Binary Search Tree [Practice](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree)

### Description  
Given a sorted array of integers in ascending order, convert it into a height-balanced binary search tree (BST). A height-balanced tree ensures that the depths of the left and right subtrees of every node differ by no more than one.  
The goal is to construct the BST so that for any node, all elements in its left subtree are less, and all elements in its right subtree are greater, and the resulting binary tree has minimum height.

### Examples  

**Example 1:**  
Input: `[1, 2, 3]`  
Output:  
```
    2
   / \
  1   3
```
Explanation. Choose middle element 2 as root, left subarray `[1]` for left child, right subarray `[3]` for right child.

**Example 2:**  
Input: `[-10, -3, 0, 5, 9]`  
Output:  
```
      0
     / \
  -10   5
    \     \
    -3     9
```
Explanation. Middle element 0 becomes root, left is `[-10, -3]`, right is `[5, 9]`; this pattern recurses.

**Example 3:**  
Input: `[1]`  
Output:  
```
1
```
Explanation. Single node tree, since only one element.

### Thought Process (as if you’re the interviewee)  
Start by recognizing that to keep the tree balanced, we should always pick the middle element of any subarray as the root for that subtree. Because the array is sorted, picking the midpoint guarantees elements left are less (left subtree), elements right are more (right subtree).

- Brute force: One could repeatedly pick various roots and build subtrees, but this is unnecessary and inefficient.
- Optimal approach: Use a recursive divide-and-conquer strategy:
  - Find the middle element to be the root.
  - Recursively build the left subtree from the left slice, and right subtree from the right slice.
  - This ensures the heights of subtrees differ by at most one.

This recursive approach divides the array until all elements are placed, ensuring both the BST and balancing properties are preserved.

### Corner cases to consider  
- Empty array (`[]`) ⇒ should return `None` (empty tree)
- Single element array (`[x]`) ⇒ should return TreeNode(`x`) with no children
- Two elements (`[x, y]`) ⇒ can be either balanced, depending on which is chosen as root
- Large arrays to check recursion depth
- Arrays with negative numbers, zeros, positive numbers

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sortedArrayToBST(nums):
    # Helper function that builds BST using left and right boundaries
    def build(left, right):
        if left > right:
            return None
        mid = (left + right) // 2
        node = TreeNode(nums[mid])
        # Recursively build left and right subtrees
        node.left = build(left, mid - 1)
        node.right = build(mid + 1, right)
        return node
    
    return build(0, len(nums) - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is created once for each element in the input array.
- **Space Complexity:** O(log n) — Due to recursion stack in a balanced BST, as the recursion depth is ⌊log n⌋. The function does not use extra data structures for copying input, and the space for output tree nodes is not counted as extra.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the array was not already sorted?  
  *Hint: Would you need to sort first? What would that do to your time complexity?*

- Can you construct the tree iteratively instead of recursively?  
  *Hint: Use a queue to mimic call stack behavior and subarray bounds.*

- How would you convert a sorted linked list to a height-balanced BST with the same approach?  
  *Hint: Linked list does not support indexed access; think about slow/fast pointers to find mid.*

### Summary  
This problem demonstrates the **divide and conquer** pattern, showcasing how recursion and careful selection (always using the midpoint) lead to a balanced BST from a sorted source. This template is common in tree problems, especially construction from sorted data, and applies to linked lists, arrays, and scenarios requiring conversions while maintaining balance.