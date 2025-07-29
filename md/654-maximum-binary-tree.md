### Leetcode 654 (Medium): Maximum Binary Tree [Practice](https://leetcode.com/problems/maximum-binary-tree)

### Description  
Given an integer array `nums` with no duplicates, construct a **maximum binary tree** as follows:
- The **root node** is the maximum number in the array.
- The **left subtree** is recursively built from the subarray left of the maximum value.
- The **right subtree** is recursively built from the subarray right of the maximum value.
Return the root of the binary tree constructed from `nums`.

### Examples  

**Example 1:**  
Input: `[3,2,1,6,0,5]`  
Output:  
```
      6
    /   \
   3     5
    \    /
     2  0
      \
       1
```
*Explanation:*
- 6 is the maximum, becomes root.
- Left part `[3,2,1]` builds left subtree; right part `[0,5]` builds right subtree.
- Build left:
  - 3 is max, left child.
  - `[2,1]`: 2 is max, right child of 3.
  - `[1]`: 1 is max, right child of 2.
- Build right:
  - 5 is max, right child.
  - ``: 0 is max, left child of 5.

**Example 2:**  
Input: `[1,2,3]`  
Output:  
```
    3
   /
  2
 /
1
```
*Explanation:*
- 3 is the maximum, the root.
- Left side `[1,2]` recursively builds subtree.
- 2 is max, left child.
- 1 is max in `[1]`, left child of 2.
- No right side for each.

**Example 3:**  
Input: `[3,1,2]`  
Output:  
```
  3
    \
     2
    /
   1
```
*Explanation:*
- 3 is the maximum, the root.
- Right part `[1,2]` builds right subtree.
- 2 is max, right child of 3.
- 1 is max in `[1]`, left child of 2.

### Thought Process (as if you’re the interviewee)  

For each subarray, the maximum element becomes the root of the (sub)tree. The process is repeated recursively for elements to the left and right of the max.  
**Brute-force**: At each recursion, scan for the max (O(n)), then recurse on left and right (splitting the list, so O(n log n) average, worse if already sorted).
- Pros: Simple, clear recursive structure similar to QuickSort's partitioning.
- Cons: Scanning for the max each time may be redundant.

**Optimization**: Stack-based approaches can build the tree in linear time by maintaining parent-child relationships while traversing, but the recursive approach is often sufficient and clearest for interviews unless O(n) is required.

I’d use divide-and-conquer for clarity, as it directly mirrors the problem statement and is easy to reason about.

### Corner cases to consider  
- The input array is empty (`[]`). Should return `None`.
- Array contains only one element (`[x]`). Tree is just a node.
- All elements in increasing/decreasing order (degenerate left/right tree).
- Large input size (test for stack overflow).

### Solution

```python
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def constructMaximumBinaryTree(nums: List[int]) -> Optional[TreeNode]:
    # Recursive helper function to construct tree from subarray nums[l:r+1]
    def build(left, right):
        if left > right:
            return None
        # Find index of max value in nums[left:right+1]
        max_i = left
        for i in range(left+1, right+1):
            if nums[i] > nums[max_i]:
                max_i = i
        # Create the root node for this subarray
        root = TreeNode(nums[max_i])
        # Build left and right subtrees recursively
        root.left = build(left, max_i - 1)
        root.right = build(max_i + 1, right)
        return root

    return build(0, len(nums) - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) worst-case (array sorted ascending/descending, unbalanced), O(n log n) average/etc. Each recursive call scans subarray for max.
- **Space Complexity:** O(n) for recursion stack and tree nodes (O(h) stack, h = height of tree, max O(n) in worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you build the tree in O(n) time?
  *Hint: Consider using a stack to maintain parent-child relationships during a single left-to-right scan.*
  
- Can you reconstruct the original array from only the tree?
  *Hint: Try traversing the tree in-order—what property about the structure helps?*
  
- How does this relate to Cartesian Trees, and where might they be used?
  *Hint: This structure is closely related; think about RMQ data structures.*

### Summary
This problem uses **recursive divide-and-conquer** and mirrors algorithms like QuickSort. It’s a classic tree construction problem. The coding pattern applies in other recursive binary tree constructions where subtree relationships are defined by extremal values, such as building Cartesian Trees or some RMQ preprocessors.