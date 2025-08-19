### Leetcode 652 (Medium): Find Duplicate Subtrees [Practice](https://leetcode.com/problems/find-duplicate-subtrees)

### Description  
Given a **binary tree**, identify all the subtrees that appear **more than once** in the entire tree.  
A subtree consists of a node and all its descendants, and two subtrees are considered duplicates if they have the **same structure** and **node values**.  
You need to return a list containing the root nodes of every duplicated subtree—each type of duplicate should be included only **once** (even if it appears multiple times).

### Examples  

**Example 1:**  
Input:  
``` 
        1
       / \
      2   3
     /   / \
    4   2   4
       /
      4
```
List representation: `[1,2,3,4,null,2,4,null,null,4]`  
Output: `[2, 4]` (the roots of subtrees `2->4` and standalone `4`)  
Explanation:  
  - There are two distinct duplicate subtrees:  
    1. The subtree rooted at 4:   
       ```
       4
       ```
       Appears three times.
    2. The subtree rooted at 2:
       ```
         2
        /
       4
       ```
       Appears twice.

**Example 2:**  
Input:  
```
        2
       / \
      1   1
```
List representation: `[2,1,1]`  
Output: `[1]`  
Explanation:  
  - The subtree with root `1` appears twice as separate leaf nodes.

**Example 3:**  
Input:  
```
        0
       / \
      0   0
         / \
        0   0
```
List representation: `[0,0,0,null,null,0,0]`  
Output: `[0, 0]` (both left and right-leaf 0 subtrees)  
Explanation:  
  - There are two distinct duplicate subtrees:  
    1. The leaf node `0` appears multiple times.
    2. The right subtree:
       ```
         0
        / \
       0   0
       ```
       Appears once as a duplicate shape.


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Compare every subtree rooted at each node with every other subtree (using a helper to recursively check structure and values). This is highly inefficient—each comparison is O(n), and there are O(n) subtrees, yielding O(n²) or worse.

- **Observation:**  
  Rather than comparing trees node by node, encode or **serialize** each subtree into a unique string or hashable object representing its structure and values. This enables quick lookup for duplicates.

- **Optimized approach:**  
  - Use **DFS traversal** to serialize (encode) each subtree in a bottom-up fashion: for each node, the serialization is `(left_serialization, node_val, right_serialization)`.
  - Store each unique serialization in a dictionary with a count of appearances.
  - When a serialization is seen for the **second time**, add its root node to the result (to avoid duplicates in the answer).
  - Return all such root nodes at the end.

- **Trade-offs:**  
  - **Time:** O(n) if serialization is done efficiently (using either strings or integer IDs).
  - **Space:** Extra space for mappings and potentially for recursion stack.


### Corner cases to consider  
- The tree is empty (`root` is `None`).
- Trees with all identical values but different shapes.
- Multiple duplicate subtrees, but only one instance of each type should be returned.
- Trees where every node is unique—should return an empty list.
- Trees with only one node or just leaves.

### Solution

```python
from collections import defaultdict

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findDuplicateSubtrees(self, root):
        def serialize(node):
            if not node:
                # Null nodes are serialized as '#'
                return "#"
            # Serialize as: (left, node.val, right)
            serial = "{},{},{}".format(
                serialize(node.left), node.val, serialize(node.right)
            )
            # Count occurrences of this serialization
            count[serial] += 1
            # Only add when the count is exactly 2 (avoid duplicates in answer)
            if count[serial] == 2:
                result.append(node)
            return serial
        
        count = defaultdict(int)
        result = []
        serialize(root)
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once, and serialization (with memoization) is computed efficiently for each subtree.
- **Space Complexity:** O(n), for storing the serialization mapping, the results, and the recursion stack (which is O(h), with h being the tree height—O(n) worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the serialization so that you use integer IDs instead of strings?
  *Hint: Map each unique subtree serialization to an integer (using a dict) for faster comparison.*
  
- What if you needed to return not just the roots but all the nodes belonging to each duplicate subtree?
  *Hint: Store lists of all root nodes per duplicate serialization.*

- How would you modify your approach for very large trees where serialization strings might take too much memory?
  *Hint: Use hashing or assign and propagate unique integer identifiers.*

### Summary
This problem uses the **Tree Serialization + Hashing** pattern, where encoding subtree structures helps in fast duplicate detection. The DFS+serialization method is common for subtree or isomorphism problems, and can be applied to tree comparison, subtree checks, and similar problems where structural equality matters.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Serialize and Deserialize Binary Tree(serialize-and-deserialize-binary-tree) (Hard)
- Serialize and Deserialize BST(serialize-and-deserialize-bst) (Medium)
- Construct String from Binary Tree(construct-string-from-binary-tree) (Medium)
- Delete Duplicate Folders in System(delete-duplicate-folders-in-system) (Hard)