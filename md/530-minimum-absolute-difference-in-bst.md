### Leetcode 530 (Easy): Minimum Absolute Difference in BST [Practice](https://leetcode.com/problems/minimum-absolute-difference-in-bst)

### Description  
Given the root of a binary search tree (BST), you are to find the **minimum absolute difference** between the values of any two **different** nodes in the tree. The BST is defined so that for any node, all values in its left subtree are less than its value, and all values in its right subtree are greater than its value.

### Examples  

**Example 1:**  
Input=
```
   1
    \
     3
    /
   2
```
 Output=1  
 Explanation: The possible absolute differences are |3 − 2| = 1, |2 − 1| = 1. The smallest is 1.

**Example 2:**  
Input=
```
   4
  / \
 2   6
/ \
1   3
```
 Output=1  
 Explanation: The minimum absolute differences: |2 − 1| = 1, |3 − 2| = 1, |4 − 3| = 1, |6 − 4| = 2. The smallest answer is 1.

**Example 3:**  
Input=
```
   4
  / \
 2   5
/ \
1   3
   /
 3
```
 Output=0  
 Explanation: There is a duplicate value (3), so the minimum absolute difference is zero.

### Thought Process (as if you’re the interviewee)  
**Brute-force approach:** Collect all node values into a list, sort it, and compare every adjacent pair to find the minimum difference.  
This works but is inefficient (O(n log n) due to sorting, O(n) space for the list).

**Optimized approach:** Leverage the **BST property**: inorder traversal yields values in sorted order. So, we can keep track of the previous node value during inorder traversal and update the minimum difference as we go. This gives O(n) time and O(h) stack space for recursion (h = tree height), or O(1) extra space if iterative (Morris).

**Trade-offs:**  
- **Brute-force:** Easy to implement but slower due to sorting, and uses extra storage for the list.
- **Optimal in-order:** Faster, elegant, directly uses BST property, and can be space-efficient with iterative traversal.

**Why choose in-order traversal:** Because the BST’s values are sorted in a list via in-order, you only need to compare adjacent values, which is both optimal and efficient.

### Corner cases to consider  
- **Only two nodes:** Straightforward, just compare them.
- **Duplicate values:** The minimum difference could be zero.
- **Very large tree:** Ensure the algorithm remains O(n) time and avoids stack overflow.
- **Tree with negative values:** Constraint says all values are non-negative, but in general, be aware of negative numbers when computing absolute differences.
- **Empty tree:** Not possible per problem constraints (there are at least two nodes).
- **Tree where all values are equal:** Minimum difference is always zero.
- **Single branch (no left or right):** Still, in-order traversal will visit all nodes in sorted order.

### Solution

```python
# Inorder traversal approach; comments explain each step
def getMinimumDifference(root):
    # Initialize global variables to track previous node value and minimum difference
    prev = None
    min_diff = float('inf')

    def inorder(node):
        nonlocal prev, min_diff
        if not node:
            return

        # Traverse left subtree
        inorder(node.left)

        # Process current node
        if prev is not None:
            min_diff = min(min_diff, node.val - prev)  # BST property: prev < node.val
        prev = node.val

        # Traverse right subtree
        inorder(node.right)

    inorder(root)
    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n): We visit each node exactly once during our inorder traversal.
- **Space Complexity:** O(h) for recursion stack, where h is the height of the tree. For a balanced BST, this is O(log n); worst case (unbalanced) is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

How would you solve this problem if the tree is **not** a BST, just a binary tree?  
 Hint: Consider collecting all node values into a sorted list, and then comparing adjacent pairs for the minimum difference.

If you could use extra space, is there a faster way to find the minimum difference beyond O(n)?  
 Hint: With O(n) space, in-order traversal is already optimal; the answer is no, you get Ω(n).

How would you solve this with **iterative in-order traversal** instead of recursion?  
 Hint: Use a stack to simulate the traversal and still maintain O(1) for tracking previous value and minimum.

### Summary  
This problem is efficiently solved using **in-order traversal** of a BST, leveraging its sorted property to find the minimum absolute difference between adjacent values. It is a classic example of where knowing the structure and properties of your data allows for optimal algorithms. This pattern—**in-order traversal on BSTs for sorted property analysis**—is common in BST-related problems, such as validating BSTs, k-th smallest element, or finding ranges.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- K-diff Pairs in an Array(k-diff-pairs-in-an-array) (Medium)