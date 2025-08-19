### Leetcode 919 (Medium): Complete Binary Tree Inserter [Practice](https://leetcode.com/problems/complete-binary-tree-inserter)

### Description  
You are given the root of a **complete binary tree** (CBT), where every level (except possibly the last) is fully filled and all nodes are as far left as possible.  
Design a data structure called `CBTInserter` that allows you to:
- Initialize with the CBT's root.
- Insert a new node such that completeness is preserved after each insertion. The insert method returns the *parent node’s* value where the new node was attached.
- Retrieve the current root of the tree.  

The main operations are:
- `CBTInserter(TreeNode root)`: initializes the data structure with the tree root.
- `insert(int val)`: inserts a new node with value `val`, returning the parent node's value.
- `get_root()`: returns the root of the tree.


### Examples  

**Example 1:**  
Input: `["CBTInserter", "insert", "insert", "get_root"]`,  
   `[[[1,2]], [3], [4], []]`  
Output: `[null, 1, 2, [1,2,3,4]]`  
*Explanation:  
- Initialize CBTInserter with [1,2], producing:*
```
    1
   /
  2
```
- *insert(3): Adds 3 as right child of 1, returns 1.*
- *insert(4): Adds 4 as left child of 2, returns 2.*
- *get_root: Tree is now [1,2,3,4]:*
```
    1
   / \
  2   3
 /
4
```

**Example 2:**  
Input: `["CBTInserter", "insert", "get_root"]`,  
   `[[[1]], [2], []]`  
Output: `[null, 1, [1,2]]`  
*Explanation:  
- Start with [1].*
```
1
```
- *insert(2): Adds 2 as left child of 1, returns 1.*
- *get_root: Tree is [1,2]:*
```
  1
 /
2
```

**Example 3:**  
Input: `["CBTInserter", "insert", "insert", "get_root"]`,  
   `[[[1,2,3,4,5,6]],,,[]]`  
Output: `[null,3,4,[1,2,3,4,5,6,7,8]]`  
*Explanation:  
- Start with [1,2,3,4,5,6]:*
```
      1
     / \
    2   3
   / \ /
  4  5 6
```
- *insert(7): Adds 7 as right child of 3, returns 3.*
- *insert(8): Adds 8 as left child of 4, returns 4.*
- *get_root: Tree is [1,2,3,4,5,6,7,8].*


### Thought Process (as if you’re the interviewee)  
First, recognize that to **insert efficiently** while maintaining completeness, the new node must be added as the leftmost empty child at the lowest possible level.

**Brute-force approach:**
- For each insertion, traverse the tree level-order until you find a node with an empty left/right child.
- Insert new node there.
- This is O(n) per insertion since you may scan all nodes at every insertion.

**Optimal approach:**
- Use a queue (BFS) to track nodes with available children.
- On initialization, level-order traverse the tree. For every node with missing children (less than 2), add it to the queue.
- For insert:
    - The node at the front of the queue is the one needing a child next.
    - Insert as its left if that is empty; else as its right.
    - If, after insert, the parent has two children, remove it from the queue.
    - Add the new node to the queue, since it may need children in future.
- Now each insertion is O(1) time.

**Trade-offs:**
- Preprocessing the tree at setup takes O(n) time and space to fill the queue, but each insert and get_root is O(1).
- Extremely efficient for repeated inserts.

### Corner cases to consider  
- Tree with only one node.
- Insertions cause a new last level to be created.
- Deep trees where children are only added to the leftmost branch.
- Insert after a node receives both left and right children (so it should not stay in the queue).
- Large number of insertions and space management.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

class CBTInserter:
    def __init__(self, root: TreeNode):
        # Queue for the current insertion candidates
        self.candidates = deque()
        # Ordinary BFS queue for tree traversal
        q = deque([root])
        while q:
            node = q.popleft()
            # If this node is missing any child, it's a candidate
            if not node.left or not node.right:
                self.candidates.append(node)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        self.root = root

    def insert(self, val: int) -> int:
        parent = self.candidates[0]
        new_node = TreeNode(val)
        if not parent.left:
            parent.left = new_node
        else:
            parent.right = new_node
            # Once a candidate has both children, remove from candidates
            self.candidates.popleft()
        # The new node could accept new children in future
        self.candidates.append(new_node)
        return parent.val

    def get_root(self) -> TreeNode:
        return self.root
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Initialization: O(n), visiting each node in the tree.
  - insert: O(1) per operation (constant-time to add child and maintain queue).
  - get_root: O(1).

- **Space Complexity:**  
  - O(n) to store candidate nodes and for tree traversal (queue).
  - The queue size is proportional to the width of the last level, which is O(n) in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are frequent deletions as well as insertions?  
  *Hint: How would you maintain completeness and efficiently update candidate nodes for both insert and delete?*

- Can you support efficient insert while keeping the API thread-safe?  
  *Hint: Consider locks for candidate queue or atomic update patterns.*

- How would you extend this to a distributed setting where different parts of the tree are operated on in parallel?  
  *Hint: How would you partition or synchronize?*


### Summary
This problem uses the **BFS traversal pattern**, commonly applied to level-order processing in binary trees. The main idea is to maintain a dynamic queue of nodes with empty child spots, allowing **O(1) insertions while preserving the completeness property**. This approach generalizes to problems where you need to always “fill from left to right, top to bottom,” and is a classic use of a queue to model pending candidates in a greedy layer-wise fashion.

### Tags
Tree(#tree), Breadth-First Search(#breadth-first-search), Design(#design), Binary Tree(#binary-tree)

### Similar Problems
