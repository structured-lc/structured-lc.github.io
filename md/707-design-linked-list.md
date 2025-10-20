### Leetcode 707 (Medium): Design Linked List [Practice](https://leetcode.com/problems/design-linked-list)

### Description  
Design a singly (or doubly) linked list class with the following operations:
- `get(index)`: Return the value at the indexᵗʰ node (0-indexed), or -1 if the index is invalid.
- `addAtHead(val)`: Add a node with value val at the beginning of the list.
- `addAtTail(val)`: Add a node with value val at the end of the list.
- `addAtIndex(index, val)`: Add a node with value val just before the indexᵗʰ node. If index equals the list's length, the node goes at the end. If index is greater than the length, the node is not inserted.
- `deleteAtIndex(index)`: Delete the indexᵗʰ node if the index is valid.

You may use either a singly or a doubly linked list implementation. Nodes are 0-indexed.  

### Examples  

**Example 1:**  
Input:  
`MyLinkedList(); addAtHead(1); addAtTail(3); addAtIndex(1,2); get(1); deleteAtIndex(1); get(1)`  
Output:  
`null, null, null, null, 2, null, 3`  
Explanation:  
- The list starts empty.
- addAtHead(1): List is [1]
- addAtTail(3): List is [1,3]
- addAtIndex(1,2): List is [1,2,3] (2 inserted before index 1)
- get(1): returns 2
- deleteAtIndex(1): List is [1,3]
- get(1): returns 3

**Example 2:**  
Input:  
`MyLinkedList(); get(0)`
Output:  
`null, -1`  
Explanation:  
- The list is empty. Any get returns -1.

**Example 3:**  
Input:  
`MyLinkedList(); addAtIndex(1,5); get(0)`
Output:  
`null, null, -1`  
Explanation:  
- Attempted to add at index beyond current length (list is empty). Nothing inserted. get(0) returns -1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force / Conceptual:**  
  I need to implement a linked list from scratch, supporting standard operations.  
  For `get(index)`, I traverse the list from head node, moving step by step till reaching the desired node or end.  
  For `addAtHead`, I create a new node, set its next to the head, and update head.  
  For `addAtTail`, I traverse to the last node, then append the new node.  
  For `addAtIndex`, I traverse to the node before the target index, adjusting pointers for insertion; special handling if at head.  
  For `deleteAtIndex`, I traverse to the node before the target index and adjust pointers to remove the target node; special handling if deleting head.  
  I will track the size for quick checks on valid indices.

- **Optimization / Trade-offs:**  
  Using a helper dummy/head node simplifies edge cases for head/tail insertions/deletions.  
  With singly linked list, all operations except tail/head insertions and deletions are O(n).  
  Maintaining a tail pointer allows O(1) tail insert, but makes deleting the last node O(n) unless using a doubly linked list.  
  I’ll choose singly linked list due to simplicity unless bi-directional traversal is required.

### Corner cases to consider  
- Operations on an **empty list** (get or delete returns -1 or no-op)
- **Adding** at index 0 (should use addAtHead, updates head)
- **Deleting** at index 0 (updates head)
- **Adding** at list size (should append at tail, valid)
- **Adding** at index > size (no insertion)
- **Deleting** at index ≥ size (no deletion)
- Negative indices (should be invalid for all operations)
- Single-element list delete (becomes empty)
- get on negative indices or beyond length

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class MyLinkedList:
    def __init__(self):
        # Dummy head to simplify insert/delete edge cases
        self.head = ListNode(0)
        self.size = 0

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        curr = self.head.next  # skip dummy head
        for _ in range(index):
            curr = curr.next
        return curr.val

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0 or index > self.size:
            return
        prev = self.head
        for _ in range(index):
            prev = prev.next
        new_node = ListNode(val, prev.next)
        prev.next = new_node
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        prev = self.head
        for _ in range(index):
            prev = prev.next
        prev.next = prev.next.next
        self.size -= 1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  All operations *except* `addAtHead` and `addAtTail` are O(n) in the worst case due to needed traversal (where n = list length).  
  - `get(index)`: O(n)  
  - `addAtHead(val)`: O(1), since always inserts at beginning  
  - `addAtTail(val)`: O(n), since must go to tail (unless a tail pointer is maintained)  
  - `addAtIndex(index, val)`: O(n) (may need to walk ⌊n/2⌋ elements in the average case)  
  - `deleteAtIndex(index)`: O(n) (walk to node before)  

- **Space Complexity:**  
  O(n) — Each added node takes O(1) space; total space grows linearly with the number of elements in the list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support O(1) addAtTail?  
  *Hint: Maintain a tail pointer and update it on insertions/deletions at the tail.*

- How could you design this as a doubly linked list?  
  *Hint: Each node would have prev and next. This makes deleteAtIndex and addAtTail O(1), but uses extra space.*

- What if you need random access often—could you do better than O(n)?  
  *Hint: Array-based approaches provide O(1) random access but slow insert/delete in middle; trade-offs involved.*

### Summary
This problem uses the **linked list pattern**, fundamental for understanding pointer manipulation and dynamic memory in lists. The presented approach uses a singly linked list with a dummy head and size counter to simplify operations and boundary checks. This pattern is common and directly applicable in problems involving dynamic sequences, undo buffers, or implementing other data structures like LRU caches.


### Flashcard
Implement a singly linked list with nodes; traverse for get/addAtIndex, adjust pointers for addAtHead, addAtTail, and deleteAtIndex.

### Tags
Linked List(#linked-list), Design(#design)

### Similar Problems
- Design Skiplist(design-skiplist) (Hard)