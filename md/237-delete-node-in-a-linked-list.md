### Leetcode 237 (Medium): Delete Node in a Linked List [Practice](https://leetcode.com/problems/delete-node-in-a-linked-list)

### Description  
You are given a reference to a node in the middle of a **singly-linked list** (not the first or last node, and all values are unique). **Delete this node** from the list, given only access to the node itself, and not to the head.  
You cannot change any other nodes before it, and you have to adjust the list so that the node no longer appears in the sequence.

### Examples  

**Example 1:**  
Input: `head = [4,5,1,9]`, node to delete = node with value `5`  
Output: `[4,1,9]`  
*Explanation: After deleting 5, the linked list sequence becomes:*

```
  4 → 5 → 1 → 9
      │
      ⤷ delete
  4 → 1 → 9
```

**Example 2:**  
Input: `head = [1,2,3,4]`, node to delete = node with value `3`  
Output: `[1,2,4]`  
*Explanation: Deleting node with value 3 updates list:*

```
  1 → 2 → 3 → 4
            │
            ⤷ delete
  1 → 2 → 4
```

**Example 3:**  
Input: `head = [0,1]`, node to delete = node with value `1`  
Output: ``  
*Explanation: After deleting 1, only the head node 0 remains:*

```
  0 → 1
       │
       ⤷ delete
  0
```

### Thought Process (as if you’re the interviewee)  

- The problem is unusual because you’re not given the **head**, just the exact node to be deleted in the singly-linked list.
- Usually, for singly-linked lists, to delete a node, you need to update the *previous* node’s `next` to skip the node to delete. Since you don't have access to the previous node, you **can’t change its pointer**.
- But, you’re guaranteed:
  - Node to delete is **not the tail** (it has a next).
  - Value of all nodes is unique.
- If you can't remove the actual node, you can **overwrite the node’s value with its next node’s value**, then change its `next` pointer to skip the next node.
- In other words, copy the data from node.next into node, and then delete node.next by adjusting pointers.
- It’s a neat trick: not truly deleting the input node, but making it look as if we deleted it by removing its value from the list sequence.

### Corner cases to consider  
- Node is **right before the tail** (but never the tail itself).
- **List of only two nodes** (delete the second node).
- Deleting a node with a unique value not repeated elsewhere.
- Confirm that overwriting value doesn’t affect nodes with duplicate values (the problem guarantees uniqueness).
- Large lists (ensure O(1) solution).

### Solution

```python
# Definition for singly-linked list node.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteNode(node):
    """
    Deletes the given node (which is not the tail) from the linked list.
    We only have access to this node.
    """
    # Copy data from the next node into the current node
    node.val = node.next.val
    
    # Link this node to the node after its next (deleting the next node)
    node.next = node.next.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)
  - Only a constant number of operations: Overwrite node value and change one pointer, regardless of list size.
- **Space Complexity:** O(1)
  - No extra storage or recursion; modifies nodes in place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you’re given the **tail** node or a list with only one node?
  *Hint: Think about possible ways to delete a node when you cannot access any node after it or previous pointers.*
- Could this approach work if **values are not unique**?
  *Hint: If node values can repeat, does overwriting still leave no ambiguity?*
- How would you do this for a **doubly linked list** (where you have prev pointers)?
  *Hint: You’d have access to previous nodes — can you now manipulate the list as usual?*
  
### Summary
The approach leverages pointer and value overwriting to "delete" a node from a singly linked list **without access to the head** or previous node.  
This is a classic linked list in-place update trick that comes up in interview scenarios where pointer manipulation is restricted. The coding pattern applies whenever you’re constrained from accessing previous nodes in **singly-linked structures**—useful in interview questions about node-level access and pointer operations.