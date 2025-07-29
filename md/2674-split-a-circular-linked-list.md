### Leetcode 2674 (Medium): Split a Circular Linked List [Practice](https://leetcode.com/problems/split-a-circular-linked-list)

### Description  
Given a **circular singly linked list**, split it into two separate **circular linked lists**:
- The **first list** should contain the first ⌈n/2⌉ nodes (if n is odd, the first list gets the extra node).
- The **second list** contains the rest.
Both resulting lists must maintain the circular property, with each list’s last node pointing back to its head. The order of nodes in both lists should stay the same as the original list.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4]`  
Output: `[[1,2],[3,4]]`  
*Explanation: n = 4. First half (nodes 1,2), second half (nodes 3,4). Both halves are circular.*

**Example 2:**  
Input: `head = [5,6,7]`  
Output: `[[5,6],]`  
*Explanation: n = 3 (odd). First half: 2 nodes (5,6), second: 1 node (7). Both are circular `5→6→5` and `7→7`.*

**Example 3:**  
Input: `head = `  
Output: `[,[]]`  
*Explanation: Only one node exists, so the first list contains 10 in its own circular list, and the second list is empty.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Traverse the list to count length n. Iterate again to split after ⌈n/2⌉.  
- **Optimized:** Use the **hare and tortoise (fast and slow pointer)** method to find the middle in a single traversal—a classic approach for splitting linked lists.  
- For circular lists:  
  - Both `fast` and `slow` start at head.  
  - Move `slow` 1 step, `fast` 2 steps, until you complete a cycle.
  - The slow pointer will be at the “midpoint” of the list.  
  - Modify only a few pointers to split and preserve circularity.
- Choose optimized: O(n) time, O(1) space—efficient and concise.

### Corner cases to consider  
- Empty list (`head=None`)
- Single node (should only appear in the first list, second is empty)
- Two nodes (split 1/1)
- Odd and even total nodes (verify ⌈n/2⌉ and ⌊n/2⌋ logic)
- List pointers aligned properly—avoid cycles/leaks

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def splitCircularLinkedList(head):
    if not head:
        return [None, None]
    if head.next == head:
        return [head, None]
    
    slow, fast = head, head
    # Find mid (slow), and last (fast)
    while fast.next != head and fast.next.next != head:
        slow = slow.next
        fast = fast.next.next
        
    # For even nodes, move fast to last node
    if fast.next.next == head:
        fast = fast.next
        
    head1 = head          # First half head
    head2 = slow.next     # Second half head
    fast.next = slow.next # Last node of list points to head2 to close 2nd circle
    slow.next = head      # 'slow' node closes 1st circle
    
    return [head1, head2]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we traverse the list at most twice (once to find mid/last, once to fix pointers).
- **Space Complexity:** O(1), aside from output references. No auxiliary data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to split into *k* nearly equal circular lists?  
  *Hint: Use division logic, keep track of remainders, adjust pointer breaks accordingly.*

- Can you do this if the linked list is doubly or not circular?  
  *Hint: Adjust split logic, pay attention to loop termination and tail pointer handling.*

- How would you handle *in-place* modification if node values must remain unchanged?  
  *Hint: Only adjust pointers, don’t allocate new nodes.*

### Summary
We used the **two-pointer (hare & tortoise) technique** to efficiently split a circular singly linked list into two separate circular lists. This is a classic fast–slow pointer pattern. The method avoids extra space, handles all edge cases, and can be adapted for k-way or non-circular splits—common in linked list splitting or partitioning scenarios.