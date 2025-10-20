### Leetcode 272 (Hard): Closest Binary Search Tree Value II [Practice](https://leetcode.com/problems/closest-binary-search-tree-value-ii)

### Description  
Given a binary search tree (BST), a floating-point target value, and an integer `k`, you are to return exactly `k` values from the BST that are numerically closest to the target.  
- The return order does **not** matter.
- The tree is non-empty.
- There is one unique set of `k` closest values for any valid input.  
Imagine being shown a BST and needing to recommend the nearest `k` values to a given number. This is common in recommendation or matching engines, where closest matches are more useful than exact.

### Examples  

**Example 1:**  
Input: `root = [4,2,5,1,3]`, `target = 3.714286`, `k = 2`  
Output: `[4,3]`  
*Explanation: The BST is:*
```
    4
   / \
  2   5
 / \
1   3
```
*Both 3 (|3.714286 - 3| ≈ 0.714) and 4 (|3.714286 - 4| ≈ 0.286) are closest to the target. Return any order.*

**Example 2:**  
Input: `root = [1]`, `target = 0.0`, `k = 1`  
Output: `[1]`  
*Explanation: Only one node exists. Its value, 1, is closest to the target 0.*

**Example 3:**  
Input: `root = [3,1,4,null,2]`, `target = 2.9`, `k = 2`  
Output: `[3,2]`  
*Explanation: The BST is:*
```
    3
   / \
  1   4
   \
    2
```
*Both 3 (|2.9 - 3| = 0.1) and 2 (|2.9 - 2| = 0.9) are closest. Return any order.*

### Thought Process (as if you’re the interviewee)  

Let's start with brute force:
- **In-order Traverse entire BST** (O(n)) to generate a sorted array of values.
- Compute the absolute difference of all values from target.
- Sort those differences and pick the k smallest.

**Optimization:**  
- Since the BST is already sorted via in-order traversal, we can:
  - Use in-order traversal to avoid unnecessary work.
  - Use a buffer (size k) as a sliding window to keep track of k closest as we traverse.
  - If buffer exceeds k, check if the new value is closer to the target than the farthest one in our buffer. If yes, remove the farthest and keep the new one.

**Further Optimization (Ask if BST is balanced):**  
- Use two stacks ("predecessors" and "successors"):
  - Move towards target, then gather up to k smallest in both directions using these stacks.
  - Merge-k-sorted-arrays pattern: at each step, pick closer of predecessor and successor.

I’d choose the in-order with a sliding window or the dual-stack method, depending on allowed complexity and BST balance.  
- **Trade-offs:**  
  - Simpler to code: in-order with buffer (O(n) time, O(n) space).
  - Faster if BST is balanced and random access is costly: dual stack method (can approach O(k log n)).

### Corner cases to consider  
- Empty BST (should not occur, per problem statement)
- k > number of unique values in tree (not allowed by constraints)
- Duplicate values in BST (problem guarantees unique result, so not possible)
- Very large or small target (extreme float, far from all tree values)
- Target exactly equals a node's value
- k = 1
- Entire tree has only one node

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

def closestKValues(root, target, k):
    # Helper: in-order traverse to collect values in ascending order
    def inorder(node, vals):
        if not node:
            return
        inorder(node.left, vals)
        vals.append(node.val)
        inorder(node.right, vals)

    # 1. Collect all values in BST in sorted order
    vals = []
    inorder(root, vals)

    # 2. Use two pointers to do a window of size k with minimal sum(|vals[i] - target|)
    left, right = 0, len(vals) - 1
    while right - left + 1 > k:
        if abs(vals[left] - target) > abs(vals[right] - target):
            left += 1
        else:
            right -= 1
    return vals[left:right+1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes (full traversal of BST is required for general BSTs, as there is no guarantee of subtree skipping).
- **Space Complexity:** O(n), for storing the sorted array of all values.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you improve this if the BST is **very large** and you want to avoid O(n) space?
  *Hint: Use iterative in-order and maintain a buffer of just k elements.*

- What if multiple nodes had **duplicate values**?
  *Hint: Think about set semantics or handling ties.*

- How would the solution change if values can be **inserted or deleted** frequently while supporting efficient closest-k queries?
  *Hint: Consider data structures like Balanced BSTs with augmented data, or skip-lists.*

### Summary
The core approach is a **tree traversal with k-window maintenance**—a sliding window of closest values, leveraging BST’s in-order property to get sorted values. This is a classic "window on sorted data" pattern, also common in two-pointer problems over arrays, and can be adapted to find k closest in other sorted contexts (arrays, heaps, external storage). Techniques from this problem generalize to real-time recommendation systems and top-k query engines.


### Flashcard
Closest Binary Search Tree Value II

### Tags
Two Pointers(#two-pointers), Stack(#stack), Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Heap (Priority Queue)(#heap-priority-queue), Binary Tree(#binary-tree)

### Similar Problems
- Binary Tree Inorder Traversal(binary-tree-inorder-traversal) (Easy)
- Closest Binary Search Tree Value(closest-binary-search-tree-value) (Easy)
- Closest Nodes Queries in a Binary Search Tree(closest-nodes-queries-in-a-binary-search-tree) (Medium)