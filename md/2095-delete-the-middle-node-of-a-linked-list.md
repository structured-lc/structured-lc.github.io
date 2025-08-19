### Leetcode 2095 (Medium): Delete the Middle Node of a Linked List [Practice](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list)

### Description  
Given the **head** of a singly linked list, delete its **middle node** and return the head of the modified linked list.  
- If the list has an odd number of nodes, delete the ⌊n/2⌋-th node (0-indexed).
- For an even number of nodes, delete the node at position n//2 (i.e., the second middle).
- If the list only has one node, return `None`.
You are only allowed to traverse the linked list once.

### Examples  

**Example 1:**  
Input: `[1,3,4,7,1,2,6]`  
Output: `[1,3,4,1,2,6]`  
*Explanation: The middle node is **7** (it's the ⌊7/2⌋ = 3rd node, 0-indexed). Remove it.*

**Visual:**  
```
Index: 0   1   2   3   4   5   6
Nodes: 1 → 3 → 4 → 7 → 1 → 2 → 6
                           ↑
                       Delete this
```

**Example 2:**  
Input: `[1,2,3,4]`  
Output: `[1,2,4]`  
*Explanation: The middle node is **3** (n=4, so delete node at index 2).*

**Visual:**  
```
Index: 0   1   2   3
Nodes: 1 → 2 → 3 → 4
                 ↑
             Delete this
```

**Example 3:**  
Input: `[2,1]`  
Output: `[2]`  
*Explanation: The middle node is the second node (n=2, so delete node at index 1).*

**Example 4:**  
Input: `[1]`  
Output: `[]`  
*Explanation: Only one node—after deletion, the list is empty.*

### Thought Process (as if you’re the interviewee)  
- Brute-force:  
  - Count the length n first.
  - Find the (n//2)-th node and remove it.
  - Requires two passes (one to count, one to delete).
- Optimize:  
  - Use **two pointers**: fast and slow.
    - Move fast by 2 and slow by 1 each step.
    - When fast reaches end, slow is at or just before the middle.
    - Keep a `prev` pointer to the node before slow for deletion.
    - Edge case: When just one node, return `None`.
- Single pass and \(O(1)\) space.  
- Chose this method for optimal time/space and one traversal constraint[2][3][4].

### Corner cases to consider  
- List has only one node ⇒ return None.  
- List has two nodes ⇒ delete the second node (return only head).  
- Even- and odd-length linked lists.
- Null (empty) list (problem constraints may guarantee at least one node, but should still handle).  

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteMiddle(head: ListNode) -> ListNode:
    # If the list has only one node, return None.
    if not head or not head.next:
        return None

    # Initialize slow, fast, and previous pointers.
    slow = head
    fast = head
    prev = None

    # Move fast by 2 and slow by 1. Track previous for deletion.
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    # Delete the middle node.
    prev.next = slow.next

    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each node is visited at most once (§n = number of nodes)[2][3][4].
- **Space Complexity:** O(1)  
  - Uses only a few pointers, no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- If this is a doubly linked list, can you do it differently?  
  *Hint: Can you delete the node in place using backward pointers?*

- How would you generalize to delete the ⎣n/3⎦-th node?  
  *Hint: Adjust how you find the target node's index and traversal logic.*

- How do you handle multiple deletions—e.g., delete k middle nodes?  
  *Hint: Think about impact as nodes are removed and index recalculation.*

### Summary
This problem is a classic **two-pointer/tortoise-and-hare** technique for single-pass mid-point detection. The solution modifies pointers in-place and doesn't require extra memory, so it's both efficient and a common pattern in linked list manipulation—useful for problems like finding palindromes in lists, cycle detection, and splitting lists at midpoint.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Remove Nth Node From End of List(remove-nth-node-from-end-of-list) (Medium)
- Reorder List(reorder-list) (Medium)
- Remove Linked List Elements(remove-linked-list-elements) (Easy)
- Middle of the Linked List(middle-of-the-linked-list) (Easy)