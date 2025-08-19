### Leetcode 117 (Medium): Populating Next Right Pointers in Each Node II [Practice](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii)

### Description  
Given a binary tree where each node has a `next` pointer, set each node’s `next` pointer to its immediate right node on the same level. If there is no right neighbor, the `next` pointer should be set to `None`. The tree is not necessarily perfect or full, so you must handle missing children gracefully. Initially, all `next` pointers are set to `None`.

You may only use constant extra space (implicit recursion stack doesn’t count).

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,null,7]`  
Output: `[1,#,2,3,#,4,5,7,#]`  
*Explanation: The tree is:*  
```
        1
       / \
      2   3
     / \   \
    4   5   7
```
*Connect nodes at each level:*  
- 1→None  
- 2→3, 3→None  
- 4→5, 5→7, 7→None  

**Example 2:**  
Input: `[]`  
Output: `[]`  
*Explanation: Empty tree returns nothing to connect.*

**Example 3:**  
Input: `[1]`  
Output: `[1,#]`  
*Explanation: Single node; its next remains None.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Use a queue for level-order traversal (BFS). At each level, iterate over nodes, setting each node’s next pointer to the next node in the queue. This uses O(n) extra space.
- **Optimized approach:** Can we do this in O(1) extra space?  
  Yes! We can leverage the next pointers as we build them.  
  At each level, iterate from left to right using already established next pointers. While walking the current level, use a dummy "head" node to build the correct next pointers for the level below. When done, descend to the next level using the head’s next pointer.

- **Why this is optimal:**  
  - No extra queue/storage  
  - O(n) time: Each node visited once  
  - O(1) extra space: Only a few pointers regardless of tree size

### Corner cases to consider  
- Empty tree (`root=None`)
- Single node tree
- Nodes with only a left or only a right child
- Unbalanced trees
- Full/perfect trees (for completeness check)
- All children missing on some nodes

### Solution

```python
class Node:
    def __init__(self, val: int, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

def connect(root: 'Node') -> 'Node':
    if not root:
        return None
    
    curr = root
    while curr:
        dummy = Node(0)  # Dummy node to start the next level
        tail = dummy     # Tail to build the level's linked list
        # Walk the current level
        while curr:
            if curr.left:
                tail.next = curr.left
                tail = tail.next
            if curr.right:
                tail.next = curr.right
                tail = tail.next
            curr = curr.next  # Move to next node in the current level
        curr = dummy.next  # Move to next level (first node in next level)
    return root
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Every node is visited once as we traverse level by level and within each level node by node.
- **Space Complexity:** O(1) extra space, since only a fixed number of pointers are used regardless of tree size. The recursion stack is avoided by the iterative method.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were allowed to use O(n) extra space?  
  *Hint: Try level-order traversal via queue.*

- How would you solve this recursively?  
  *Hint: Recursively connect left and right children, passing along the "next" node.*

- How can you print the tree level by level using only the next pointers?  
  *Hint: After setting next pointers, traverse each level using next pointer linking, starting from leftmost node.*

### Summary
This problem is a classic use case for level-order traversal without extra space by harnessing the next pointers as they're built. We use a dummy node at each level to simplify pointer manipulation for the next row. This "constant space BFS" trick applies to any linked structure where inter-level navigation is needed without queues or additional structures, such as "flatten binary tree" problems or "connect a doubly linked list at each level".

### Tags
Linked List(#linked-list), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Binary Tree(#binary-tree)

### Similar Problems
- Populating Next Right Pointers in Each Node(populating-next-right-pointers-in-each-node) (Medium)