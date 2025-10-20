### Leetcode 129 (Medium): Sum Root to Leaf Numbers [Practice](https://leetcode.com/problems/sum-root-to-leaf-numbers)

### Description  
Given a **binary tree** where each node contains a digit `0-9`, each **root-to-leaf path** forms a number by concatenating the digits along the path. Your task is to **return the total sum of all root-to-leaf numbers**.

A *leaf* is any node with no children.

For example, for this tree:
```
    1
   / \
  2   3
```
The root-to-leaf numbers are 12 (from path 1→2) and 13 (from path 1→3), so you should return 25.

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `25`  
*Explanation: Paths are 1→2 = 12 and 1→3 = 13. Sum = 12 + 13 = 25.*  

Tree:

```
  1
 / \
2   3
```

**Example 2:**  
Input: `[4,9,0,5,1]`  
Output: `1026`  
*Explanation:  
Paths: 4→9→5 = 495, 4→9→1 = 491, 4→0 = 40. Sum = 495 + 491 + 40 = 1026.*  

Tree:
```
    4
   / \
  9   0
 / \
5   1
```

**Example 3:**  
Input: `[1]`  
Output: `1`  
*Explanation: Single node, root-to-leaf path is just 1.*  

Tree:
```
1
```

### Thought Process (as if you’re the interviewee)  
- First, I realize I need to visit **every root-to-leaf path** and "read" the number as I go from root down to leaf, **concatenating the digits**.
- The brute-force idea is to generate every path from root to leaf, convert that path to a number, and sum them all.
- Instead of building strings, I can keep an integer for the current path value, updating it at each step:
  - If my current value is `s` and I visit a child with value `v`, the new path sum is `s*10 + v`.
- I will use **Depth-First Search (DFS)** since tree traversal is natural for root-to-leaf path generation.
- When I reach a leaf node, I add its current accumulated number to a running total.
- This approach is efficient because:
  - Each node is visited once (`O(n)`).
  - Only need to keep the current path sum at each step (`O(h)` stack space where `h` = tree height).

### Corner cases to consider  
- The tree has **only a single node** (root is also a leaf).
- **All digits are zero** (e.g., [0,0,0]).
- An **unbalanced tree** (deep on one side).
- Tree with only **left or only right children**.
- **Null/empty tree** (may not occur as per constraints).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sumNumbers(root):
    # Helper function to perform DFS
    def dfs(node, current_sum):
        if not node:
            return 0
        
        # Update current path value by appending this node's digit
        new_sum = current_sum * 10 + node.val

        # If it's a leaf node, return the computed number
        if not node.left and not node.right:
            return new_sum
        
        # Otherwise, keep traversing the left and right branches
        return dfs(node.left, new_sum) + dfs(node.right, new_sum)
    
    return dfs(root, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each node is visited exactly once (n = number of nodes).
- **Space Complexity:** O(h)
  - The recursion stack goes as deep as the height of the tree (h is height).
  - No other extra storage is required aside from parameters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement it **iteratively** instead of using recursion?  
  *Hint: Use your own stack to simulate DFS traversal; carry along the current number.*

- How would you handle the case where nodes can have **more than one digit**?  
  *Hint: Instead of `val`, maybe require another representation or modify how numbers are built.*

- What if the tree is **very deep** (e.g., 10,000 nodes in a single path)? How would you address stack overflow?  
  *Hint: Consider using an explicit stack to avoid recursion depth issues.*

### Summary
This solution uses a classic **DFS backtracking** pattern for trees. It demonstrates how to pass partial results down the call stack and aggregate results conditionally (when a leaf is hit). It’s a foundational binary tree traversal technique with wide applicability whenever you need to accumulate or aggregate data along root-to-leaf paths, including path sum, path concatenation, and many other tree problems.


### Flashcard
Traverse all root-to-leaf paths, accumulating the current number as you go (path ×10 + node value), and sum all leaf numbers.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Path Sum(path-sum) (Easy)
- Binary Tree Maximum Path Sum(binary-tree-maximum-path-sum) (Hard)
- Smallest String Starting From Leaf(smallest-string-starting-from-leaf) (Medium)