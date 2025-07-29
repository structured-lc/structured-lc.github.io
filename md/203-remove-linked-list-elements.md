### Leetcode 203 (Easy): Remove Linked List Elements [Practice](https://leetcode.com/problems/remove-linked-list-elements)

### Description  
Given the head of a singly linked list and an integer `val`, remove all nodes from the list that have `Node.val == val`. Return the new head of the linked list.  
The challenge is that the value to be removed can appear anywhere in the list, including the head, tail, or consecutive nodes. We need to carefully adjust the pointers so that all such nodes are skipped and the list remains connected.

### Examples  

**Example 1:**  
Input: `head = [1,2,6,3,4,5,6]`, `val = 6`  
Output: `[1,2,3,4,5]`  
*Explanation: Nodes with value 6 are removed. List transforms as [1,2,6,3,4,5,6] → [1,2,3,4,5].*

**Example 2:**  
Input: `head = [7,7,7,7]`, `val = 7`  
Output: `[]`  
*Explanation: All nodes are 7, which should be removed, resulting in an empty list.*

**Example 3:**  
Input: `head = []`, `val = 1`  
Output: `[]`  
*Explanation: The list is already empty, so nothing changes.*

### Thought Process (as if you’re the interviewee)  
At first glance, a simple iterative solution comes to mind. To walk through the list, and at every node, if its value equals `val`, we adjust the previous node's `next` pointer to skip it.
However, it's tricky if the node to be deleted is at the head, or there are multiple consecutive deletions, especially at the start.

To simplify edge cases, I would use a **dummy node** that points to the head of the list—by starting from this dummy, I can always refer to a previous node, even when deleting the original head.

Here's my plan:
- Create a dummy node pointing to head.
- Use two pointers: `prev` (initially at dummy) and `curr` (starting at head).
- Traverse:
    - If `curr.val == val`, set `prev.next = curr.next` (deleting `curr`).
    - Else, move `prev` to `curr`.
    - Advance `curr` to the next node each time.
- Return `dummy.next` as the new head.

Trade-off: O(1) space, O(n) time, straightforward and avoids recursion stack overflow.

### Corner cases to consider  
- Empty list (`head` is None).
- All nodes need to be removed.
- Only the head node needs deletion.
- No nodes to remove (list remains unchanged).
- Consecutive nodes with the value to be removed.
- The last node has the value to be removed.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeElements(head: ListNode, val: int) -> ListNode:
    # Dummy node makes it easy to handle head removal scenarios
    dummy = ListNode(-1)
    dummy.next = head
    
    prev = dummy
    curr = head
    
    while curr:
        if curr.val == val:
            # Remove current node by skipping it
            prev.next = curr.next
        else:
            # Advance prev if not removing curr
            prev = curr
        curr = curr.next  # Move to next node
        
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We visit each node exactly once in a single pass through the list (where n = number of nodes).

- **Space Complexity:** O(1)  
  Only a few pointers are used for traversal. No extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What would change if it were a doubly linked list?  
  *Hint: Consider if you need to update both `prev` and `next` pointers for deleted nodes.*

- Can you solve this recursively?  
  *Hint: Think about the base case, and when to return `None`.*

- How would you modify the code to remove nodes with multiple possible values?  
  *Hint: What if instead of one `val`, you were given a list or set of values?*

### Summary
This approach uses the **dummy node** linked list pattern—a common way to handle cases where the head might be modified through deletions or insertions.  
It's a single-pass, in-place algorithm and demonstrates fundamental linked list manipulation techniques.  
Patterns here are helpful for similar problems: deleting a node, removing duplicates, partitioning a list, etc.