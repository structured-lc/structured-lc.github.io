### Leetcode 1305 (Medium): All Elements in Two Binary Search Trees [Practice](https://leetcode.com/problems/all-elements-in-two-binary-search-trees)

### Description  
Given the roots of two binary search trees, return a sorted array containing all elements from both trees.

### Examples  
**Example 1:**  
Input: `root1 = [2,1,4], root2 = [1,0,3]`  
Output: `[0,1,1,2,3,4]`  
*Explanation: Inorder traversal and merging yields sorted collection.*

**Example 2:**  
Input: `root1 = [1,null,8], root2 = [8,1]`  
Output: `[1,1,8,8]`  
*Explanation: All elements from both BSTs collected and sorted.*

**Example 3:**  
Input: `root1 = [], root2 = [5,1,7,0,2]`  
Output: `[0,1,2,5,7]`  
*Explanation: Only use non-empty tree, in sorted order.*

Visual:
```
Tree 1:   2       Tree 2:   1
         / \                / \
        1   4              0   3
[2,1,4]             [1,0,3]
```

### Thought Process (as if you’re the interviewee)  
- Both trees are BSTs, so in-order traversal of each yields sorted sequences.
- So: perform in-order traversal on both roots, collect both lists.
- Then merge the two sorted lists (like merge step of merge sort).
- Since total size is up to n1 + n2, both traversals and merge are O(n) in total.
- Returns one output array; extra space allowed.

### Corner cases to consider  
- One or both trees empty.
- Both trees share values (duplicates allowed in output).
- One tree is much larger than the other.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def getAllElements(root1, root2):
    # Helper for in-order traversal
    def inorder(node):
        return inorder(node.left) + [node.val] + inorder(node.right) if node else []

    list1 = inorder(root1)
    list2 = inorder(root2)
    res = []
    i = j = 0
    while i < len(list1) and j < len(list2):
        if list1[i] < list2[j]:
            res.append(list1[i])
            i += 1
        else:
            res.append(list2[j])
            j += 1
    res.extend(list1[i:])
    res.extend(list2[j:])
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n₁ + n₂), where n₁, n₂ are sizes of each tree (traverse and merge both sorted lists).
- **Space Complexity:** O(n₁ + n₂), to hold the output and two sorted lists.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you do this with only O(1) extra space beyond output?  
  *Hint: Use in-order traversal with generators and merge two iterators.*

- How would you maintain sorted stream if trees are updated online?
  *Hint: BST iterators and heaps may apply for streaming new values.*

- What if the trees weren’t BSTs?
  *Hint: You would have to prepare unsorted traverse and then sort overall.*

### Summary
This is a classic combination of **in-order tree traversal** and **merge two sorted arrays**. This two-step pattern is a staple in merge algorithms and takes advantage of the BST property directly.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Binary Search Tree(#binary-search-tree), Sorting(#sorting), Binary Tree(#binary-tree)

### Similar Problems
