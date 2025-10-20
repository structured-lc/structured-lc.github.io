### Leetcode 143 (Medium): Reorder List [Practice](https://leetcode.com/problems/reorder-list)

### Description  
Given the head of a singly linked list, reorder the list so that the new sequence alternates nodes from the start and the end. Specifically, after reordering, the list should be:  
L₀ → Lₙ → L₁ → Lₙ₋₁ → L₂ → Lₙ₋₂ → …  
You must **reorder the list in-place** (only change node pointers, not node values).

### Examples  

**Example 1:**  
Input: `[1, 2, 3, 4]`  
Output: `[1, 4, 2, 3]`  
*Explanation: First node (1), then last node (4), then second node (2), then third node (3).*

**Example 2:**  
Input: `[1, 2, 3, 4, 5]`  
Output: `[1, 5, 2, 4, 3]`  
*Explanation: Start at head (1), then last (5), then next (2), then second last (4), lastly the middle node (3).*

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
*Explanation: Only one node, so no changes.*

Illustration for `[1,2,3,4,5]`:
```
   1
    \
     2
      \
       3
        \
         4
          \
           5

=> Reordered:

   1
    \
     5
      \
       2
        \
         4
          \
           3
```

### Thought Process (as if you’re the interviewee)  
Let's work through the algorithm step by step:

1. **Brute-force idea:**  
   We could collect all nodes into an array, then rebuild the list by alternating from the start and end of the array. However, this would use O(n) extra space, which isn't allowed.

2. **Optimal approach (O(1) extra space):**  
   - **Find the middle:** Use slow and fast pointers. Slow pointer moves one at a time, fast moves two. When fast hits the end, slow is at the middle.
   - **Reverse the second half:** Starting from the middle's next node, reverse links so the second half runs backwards.
   - **Merge two halves:** Merge first and reversed second half, alternating nodes until all are merged.

   This approach is in-place and efficient. We do each part in linear time and only use constant extra space for pointers.

   **Trade-offs:**  
   - The approach is efficient and in-place, matching the problem’s constraints.
   - Requires careful edge case handling (even/odd nodes).

### Corner cases to consider  
- Empty list (`None`)
- List of length 1 (single node)
- List of length 2 (just swap or leave unchanged)
- Lists with repeated or negative values
- Even/odd number of nodes

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reorderList(head):
    if not head or not head.next or not head.next.next:
        return

    # Step 1: Find the middle using slow and fast pointers
    slow = head
    fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Step 2: Reverse the second half of the list
    prev = None
    curr = slow.next
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    slow.next = None  # split the list

    # Step 3: Merge the two halves, one from start, one from reversed second half
    first = head
    second = prev  # head of reversed list
    while second:
        tmp1 = first.next
        tmp2 = second.next

        first.next = second
        second.next = tmp1

        first = tmp1
        second = tmp2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each step (find middle, reverse, merge) iterates through at most all nodes.

- **Space Complexity:** O(1)  
  Only a constant number of pointers; no extra data structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle this if you were allowed to use extra memory?
  *Hint: Can you collect all nodes in a list and rebuild?*

- Can you adapt this for a doubly linked list?
  *Hint: How would reversing and merging change?*

- How would you extend this if the elements had to be grouped not alternately but by some function of position?
  *Hint: Generalize the process of merging.*

### Summary
This problem uses the **fast & slow pointer** pattern to find the middle, **in-place reversal** for the second half, and **two-pointer merging**. These are common interview techniques for linked lists and apply to questions like reverse a list, check for palindrome in a list, and alternate merge of two lists. Proper pointer manipulation and edge case awareness are key.


### Flashcard
Find the middle with slow/fast pointers, reverse the second half, then merge nodes from start and end alternately for in-place reorder.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers), Stack(#stack), Recursion(#recursion)

### Similar Problems
- Delete the Middle Node of a Linked List(delete-the-middle-node-of-a-linked-list) (Medium)
- Take K of Each Character From Left and Right(take-k-of-each-character-from-left-and-right) (Medium)