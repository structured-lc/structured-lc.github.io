### Leetcode 328 (Medium): Odd Even Linked List [Practice](https://leetcode.com/problems/odd-even-linked-list)

### Description  
Given the head of a singly linked list, **rearrange the nodes so that all nodes at odd indices come before the nodes at even indices**, preserving their original relative order. Note: Indices begin from 1 (the first node is "odd", the second is "even"), and your rearrangement should be *in-place* (no extra space for another list).  
Return the modified linked list's head.

### Examples  

**Example 1:**  
Input: `1 -> 2 -> 3 -> 4 -> 5`  
Output: `1 -> 3 -> 5 -> 2 -> 4`  
*Explanation: Odd-indexed nodes (1, 3, 5) are grouped before even-indexed nodes (2, 4), and relative order is preserved.*

**Example 2:**  
Input: `2 -> 1 -> 3 -> 5 -> 6 -> 4 -> 7`  
Output: `2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4`  
*Explanation: Odd positions: 2, 3, 6, 7; Even positions: 1, 5, 4.*

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation: The input is empty, so nothing to rearrange.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Copy the values into two separate lists (one for odd, one for even indices), then overwrite the original list in two passes: first with odd-indexed node values, then even. This is simple, but it uses extra space (not optimal).

- **Optimal Solution:**  
  Rearranging *in-place* is possible by using pointers.  
  - Maintain three pointers:
    - `odd`: Last node in the odd-indexed segment (starts at head)
    - `even`: Last node in the even-indexed segment (starts at head.next)
    - `even_head`: Stores the head of the even-indexed nodes (needed for connection at the end)
  - Iterate while both `even` and `even.next` are valid:
    - Point `odd.next` to `even.next` (next odd node)
    - Move `odd` ahead
    - Point `even.next` to `odd.next` (next even node)
    - Move `even` ahead
  - After loop, attach the even list to the end of the odd list.
  - This avoids extra space and preserves the required order.

- **Trade-offs:**  
  - Brute-force: Simpler, but O(n) extra space.
  - In-place: O(1) extra space and O(n) time, but requires careful pointer updates.

### Corner cases to consider  
- The list is empty.
- The list has only one node.
- The list has only two nodes.
- All nodes have the same value.
- List with odd or even number of nodes.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def oddEvenList(head):
    # If the list is empty or has only one node, just return it
    if not head or not head.next:
        return head

    # odd points to first node, even to second
    odd = head
    even = head.next
    even_head = even  # keep for connection later

    while even and even.next:
        # Link odd to the next odd-index node
        odd.next = even.next
        odd = odd.next

        # Link even to the next even-index node
        even.next = odd.next
        even = even.next

    # After the end of loop, odd is at the last odd-index node
    # Attach even list after odd list
    odd.next = even_head

    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the list node-by-node only once, with simple pointer reassignments.

- **Space Complexity:** O(1)  
  Only a few extra pointers, no usage scaling with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can use O(n) space? Could you solve this with an array for easier implementation?  
  *Hint: Think about storing values or nodes in two separate lists and merging them.*

- How would you modify your solution if the list was doubly linked?  
  *Hint: Consider both next and prev when adjusting connections.*

- Could you do this if indices are defined as zero-based instead of one-based?  
  *Hint: Just adjust the way you classify odd and even positions in your implementation.*

### Summary
This problem uses the **linked list pointer manipulation** pattern, especially the two-pointer approach to preserve the original order within groups while grouping nodes in a single pass and constant space. The technique is common in linked list reordering problems—variants may include segregating nodes by value or partitioning at a certain node. Efficient pointer manipulation and keeping track of group heads are critical, which also makes this a useful pattern for track-and-merge, partition, or split-and-merge linked list problems.