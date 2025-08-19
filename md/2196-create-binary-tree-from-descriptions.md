### Leetcode 2196 (Medium): Create Binary Tree From Descriptions [Practice](https://leetcode.com/problems/create-binary-tree-from-descriptions)

### Description  
You are given a list of descriptions, where each description is a triplet `[parent, child, isLeft]`:
- `parent` is the value of a parent node,
- `child` is the value of a child node,
- `isLeft` is 1 if `child` is the left child of `parent`, or 0 if it's the right child.

You need to reconstruct the binary tree specified by these descriptions and return the root node. Each value in the tree is unique and the input always forms a valid binary tree.

### Examples  

**Example 1:**  
Input: `descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]`  
Output:  
Tree:
```
    50
   /  \
 20    80
 / \   /
15 17 19
```
*Explanation: 
- 20 is left child of 50, 80 is right child of 50  
- 15 is left child of 20, 17 right child of 20  
- 19 is left child of 80  
- 50 is not a child of anyone, so it's the root.*

**Example 2:**  
Input: `descriptions = [[1,2,1],[1,3,0],[2,4,1]]`  
Output:  
Tree:
```
  1
 / \
2   3
/
4
```
*Explanation:
- 2 is left of 1, 3 is right of 1, 4 is left of 2.
- 1 is the root, as it appears only as parent and never as child.*

**Example 3:**  
Input: `descriptions = [[6,8,1],[6,4,0],[8,2,0],[4,3,1]]`  
Output:
Tree:
```
   6
  / \
 8   4
  \  /
   2 3
```
*Explanation:
- 8 left of 6, 4 right of 6,
- 2 right of 8, 3 left of 4,
- 6 is root as only parent.*

### Thought Process (as if you’re the interviewee)  

First, I want to build all the unique nodes. I'll map node values to TreeNode objects.  
Next, I'll process the descriptions to link each child to its parent on either the left or right depending on isLeft.  
To find the root: Since every node except the root appears as a child, I'll record all seen parents and all children, and the node that's a parent but never a child is the root.  
This approach uses dictionaries for O(1) node lookups and a set to find the root efficiently.  
It's straightforward, avoids recursion and is efficient as we only traverse the description list a couple of times.

### Corner cases to consider  
- Only one node in the tree (`descriptions` length 0, or all describe the same parent).
- Disjoint input (guaranteed not to happen by problem, but good to check).
- Long chains (e.g., left-skewed or right-skewed input).
- Node values are non-consecutive or large integers.
- All left or all right children.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
def createBinaryTree(descriptions):
    node_map = {}         # val → TreeNode
    children = set()      # record all values that are children

    # Build nodes and connections
    for parent, child, isLeft in descriptions:
        if parent not in node_map:
            node_map[parent] = TreeNode(parent)
        if child not in node_map:
            node_map[child] = TreeNode(child)
        # Attach child to parent
        if isLeft == 1:
            node_map[parent].left = node_map[child]
        else:
            node_map[parent].right = node_map[child]
        children.add(child)   # record child

    # The root is the one node that's not a child
    for val in node_map:
        if val not in children:
            return node_map[val]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of descriptions.  
  - Each description is processed once to create or fetch nodes and set pointers.
  - Finding the root is O(N) as we check at most N node values.
- **Space Complexity:** O(N), storing up to 2N unique node values (parent and child are unique), and the set for children.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct the tree if some parent/child values repeat?
  *Hint: What if duplicate node values violate binary tree uniqueness?*

- How would you print the tree in level-order after building it?
  *Hint: Use a queue for breadth-first traversal.*

- Is it possible to solve without using extra space for the set of child nodes?
  *Hint: Can you mark TreeNodes themselves to indicate root status as you build?*

### Summary
This problem is a typical example of **"construct from parent-child relations"** and uses a dictionary for quick node lookup and a set to distinguish the root.  
It's a common pattern in tree-building questions and can apply in constructing graphs, parsing expression trees, or organizing organizational hierarchies. The approach is efficient, clear, and readable, and uses only basic data structures.

### Tags
Array(#array), Hash Table(#hash-table), Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
- Convert Sorted List to Binary Search Tree(convert-sorted-list-to-binary-search-tree) (Medium)
- Number Of Ways To Reconstruct A Tree(number-of-ways-to-reconstruct-a-tree) (Hard)