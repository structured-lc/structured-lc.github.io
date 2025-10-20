### Leetcode 1474 (Easy): Delete N Nodes After M Nodes of a Linked List [Practice](https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list)

### Description  
Given a linked list, repeatedly skip m nodes and then delete next n nodes, until the end of the list. Return the modified list's head.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5,6,7,8,9,10], m = 2, n = 3`  
Output: `[1,2,6,7]`  
*Explanation: Keep 1,2, delete 3,4,5; keep 6,7, delete 8,9,10*

**Example 2:**  
Input: `head = [1,2,3,4,5], m = 1, n = 1`  
Output: `[1,3,5]`  
*Explanation: Keep 1, delete 2; keep 3, delete 4; keep 5*

**Example 3:**  
Input: `head = [1,2], m = 1, n = 2`  
Output: `[1]`  
*Explanation: Keep 1, delete 2*

### Thought Process (as if you’re the interviewee)  
It's a standard simulation problem. Start from head, for each segment: skip m nodes (move pointer m-1 times), then delete n nodes (unlink from list by adjusting next pointer), and repeat until list end. Careful with pointer movement and null checks.

### Corner cases to consider  
- n = 0 (do not delete, so original list)
- m = 0 (start deleting immediately)
- List shorter than m or m+n nodes
- Deleting at end — avoid null pointer dereference

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteNodes(head, m, n):
    curr = head
    while curr:
        # Skip m-1 nodes (keep m nodes)
        for i in range(1, m):
            if curr is None:
                return head
            curr = curr.next
        if curr is None:
            break
        # Delete next n nodes
        temp = curr
        for i in range(n):
            if temp.next:
                temp = temp.next
            else:
                temp = None
                break
        # Connect
        curr.next = temp.next if temp else None
        curr = curr.next
    return head
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(L), one pass over list of length L.
- **Space Complexity:** O(1), only pointer manipulation.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you solve it recursively?  
  *Hint: Each call handles m keeps and n deletes recursively.*
- Can you do it in-place without extra space?  
  *Hint: Yes, if you avoid any extra arrays — only pointers.*
- What if you wanted to delete nodes in a circular linked list version?  
  *Hint: Be careful with stopping condition.*

### Summary
This is a classic linked list pointer manipulation, exercising careful movement and connection skipping. Recognizing typical "pointer walking" patterns is key for interview problems involving sublist deletions, group reversals, or spaced traversals.


### Flashcard
Iterate through the list, skip m nodes, then delete next n nodes by adjusting pointers; repeat until end.

### Tags
Linked List(#linked-list)

### Similar Problems
- Remove Nth Node From End of List(remove-nth-node-from-end-of-list) (Medium)
- Remove Zero Sum Consecutive Nodes from Linked List(remove-zero-sum-consecutive-nodes-from-linked-list) (Medium)