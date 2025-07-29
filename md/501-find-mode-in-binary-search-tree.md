### Leetcode 501 (Easy): Find Mode in Binary Search Tree [Practice](https://leetcode.com/problems/find-mode-in-binary-search-tree)

### Description  
Given a binary search tree (BST), **find all the mode(s)**—the value(s) that appear most frequently in the BST. The BST may contain duplicate values. The result can be in any order.

- **BST property:** For any node, its left subtree contains values ≤ the node, and the right subtree contains values ≥ the node.
- **Mode:** The value (or values) that occur(s) most frequently in the tree.
- Return all such values; if multiple values tie for most frequent, return all of them.

### Examples  

**Example 1:**  
Input: `[1,null,2,2]`  
Output: `[2]`  
*Explanation: Tree:*

```
  1
   \
    2
   /
  2
```
*2 appears twice—more than any other value, so the mode is 2.*

**Example 2:**  
Input: `[3,1,4,null,2,2]`  
Output: `[2]`  
*Explanation: Tree:*

```
    3
   / \
  1   4
   \
    2
   /
  2
```
*2 occurs twice; 1, 3, and 4 occur once. The mode is 2.*

**Example 3:**  
Input: `[1,null,2]`  
Output: `[1,2]`  
*Explanation: Tree:*

```
  1
   \
    2
```
*Both 1 and 2 occur once; both are modes.*

### Thought Process (as if you’re the interviewee)  

The problem asks for the value(s) that appear the most times in a BST.  
- **Brute Force:** The simplest approach is to traverse the whole tree, count the frequency of each value using a hash map or dictionary, then return all values with maximum frequency.
- **Optimizing for BST Properties:** Since it's a BST and an in-order traversal visits values in non-decreasing order, we can track frequencies of consecutive values in one pass, often avoiding hash maps (thus improving space usage).
- **Space Concerns:** If we're allowed extra space, a hashmap is easiest. But if constraint is to use no extra space (except recursion stack), we can use *in-order traversal* and track:
  - current value and its running count
  - current maximum frequency
  - a result list for all values that reach the current maximum
- This may require two passes: one to find the max frequency, another to collect modes. (Or—if we maintain results during traversal—we can do it in one pass.)

### Corner cases to consider  
- Empty tree (root is None): should return an empty list.
- All identical values in the tree (e.g., `[2,2,2]`): only one mode.
- Each value appears once (all unique): all values are modes.
- Multiple values tie for mode.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def findMode(root):
    # Helper function: in-order traversal to update count of each value
    def inorder(node):
        nonlocal prev, count, max_count, modes
        if not node:
            return

        inorder(node.left)  # traverse left subtree

        # Process current node
        if prev is None or prev != node.val:
            count = 1  # first occurrence of a new value
        else:
            count += 1  # consecutive occurrence

        if count > max_count:
            max_count = count
            modes = [node.val]
        elif count == max_count:
            modes.append(node.val)

        prev = node.val

        inorder(node.right)  # traverse right subtree

    # Initialization
    prev = None         # Previously visited value
    count = 0           # Count of current value's occurrences
    max_count = 0       # Highest frequency seen so far
    modes = []          # Result list

    inorder(root)
    return modes
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the tree. Every node is visited exactly once.
- **Space Complexity:** O(h), where h is the height of the tree due to recursion stack for traversal (not counting output or small variables). No extra hashmap or set is required; only a small constant number of variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were not allowed to use recursion (avoid stack overflow for deep trees)?  
  *Hint: Could you use Morris traversal for O(1) space in-order traversal?*

- Can you solve it in one pass if each node could have a very large value range (so hash maps are expensive)?  
  *Hint: Use the property of sorted in-order traversal to count runs, avoiding maps.*

- What if the tree is not a BST, just a general binary tree?  
  *Hint: Hash map or dictionary would be required, as values are unsorted.*

### Summary
This problem uses the **in-order traversal** pattern, which leverages the BST’s sorted structure by visiting nodes in order. Counting consecutive runs allows solving the problem without extra space for a hashmap, making the approach efficient and elegant for BSTs. This pattern applies in other settings, e.g., finding duplicates in a BST or performing range-queries.