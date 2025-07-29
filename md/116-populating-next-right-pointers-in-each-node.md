### Leetcode 116 (Medium): Populating Next Right Pointers in Each Node [Practice](https://leetcode.com/problems/populating-next-right-pointers-in-each-node)

### Description  
You are given a **perfect binary tree** (every parent has exactly two children and all leaves are at the same level). Each node contains a `val`, `left`, `right`, and a `next` pointer. The task is to populate each node’s `next` pointer to point to its immediate right neighbor at the same level. If there’s no neighbor, set `next` to `null`.  
You must do it using **constant extra space** (recursive stack does not count).  
Think of each level as a row—connect all nodes in the row from left to right.

### Examples  

**Example 1:**  
Input:  
Tree in list form: `[1,2,3,4,5,6,7]`  
Tree Diagram:  
```
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
```
Output:  
After calling `connect`, the tree connections are:  
```
1 → NULL
/      \
2  →  3 → NULL
/ \    / \
4→5→6→7→NULL
```
Explanation:  
- Node 1's `next` is `null` (last in level).
- Node 2’s `next` points to 3.
- Node 3’s `next` is `null`.
- Node 4→5→6→7 each point to their immediate right, 7’s `next` is `null`.

**Example 2:**  
Input: `[ ]`  
Output:  `[]`  
Explanation:  
The tree is empty, so return `None`.

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
Explanation:  
A single root node—no `next` to connect, remains `null`.

### Thought Process (as if you’re the interviewee)  
- For a **brute-force solution**, consider performing BFS using a queue. For each level, connect each node’s `next` to the next node in the queue, and the last node's `next` becomes `null`. This needs O(n) space for the queue.
- The optimal solution leverages the "perfect tree" property:
  - While traversing the leftmost node at each level, connect each node's left child’s `next` to its right child.
  - Then, if there’s a `next` (parent has a neighbor), also set the right child’s `next` to parent’s neighbor’s left child.
  - Move level by level, always beginning with the leftmost node.
- This approach requires constant extra space, since we use the existing `next` pointers to traverse each level.

### Corner cases to consider  
- Tree is **empty** (root is `null`).
- Tree has only **one node**.
- The lowest level (leaf nodes): every `next` should be `null`.
- Confirm all nodes always have two children (because “perfect” tree), so don’t check for missing children.

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val: int, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

def connect(root: 'Node') -> 'Node':
    # Start with the leftmost node at the current level
    leftmost = root
    
    # Continue until we reach the leaves (no left child)
    while leftmost and leftmost.left:
        head = leftmost
        while head:
            # Connect left -> right child
            head.left.next = head.right
            
            # Connect right child -> next node's left child, if next exists
            if head.next:
                head.right.next = head.next.left
            # Move to the next node in the current level
            head = head.next
        # Move down to the next level
        leftmost = leftmost.left
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Every node is visited a constant number of times (in the outer and inner loops), where n is the number of nodes.

- **Space Complexity:** O(1)  
  No extra data structures are used—just pointers. Recursion stack is not used here; this is iterative.  
  (If using the recursive approach, stack goes to the tree’s height O(log n).)

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the tree was not perfect (not all levels fully filled)?  
  *Hint: You’d need a general connection mechanism, maybe with BFS or more conditional checks.*

- Can you implement this using **recursion** instead of iteration?  
  *Hint: Pass from parent to children, and recurse down with connections set at each call.*

- How would you solve this if you were allowed O(n) extra space?  
  *Hint: Breadth-first traversal with a queue, process level by level.*

### Summary
The approach uses the **Linked List Level Traversal** pattern, leveraging the perfect binary tree structure. By connecting each node’s left and right children, and linking children between neighboring parents, you efficiently build next pointers without any extra data structures. This in-place method with constant space is powerful in trees with known structure and is a common pattern in similar tree-pointer problems.