### Leetcode 19 (Medium): Remove Nth Node From End of List [Practice](https://leetcode.com/problems/remove-nth-node-from-end-of-list)

### Description  
Given the head of a singly linked list and an integer n, remove the **n**ᵗʰ node from the end of the list and return its head.  
You can only traverse the list in one direction, and you should minimize traversals. The node from the end means: count **n** steps backward from the tail, and remove that node.  
For example, in the list `1→2→3→4→5`, n=2 means remove '4', resulting in `1→2→3→5`.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5]`, `n = 2`  
Output: `[1,2,3,5]`  
*Explanation: The second node from the end is '4'. Remove it, the list becomes 1→2→3→5.*

**Example 2:**  
Input: `head = [1]`, `n = 1`  
Output: `[]`  
*Explanation: The only node is removed (n=1 means remove the first from end ⇒ whole list is empty).*

**Example 3:**  
Input: `head = [1,2]`, `n = 1`  
Output: `[1]`  
*Explanation: Remove the last node (`2`), list becomes 1.*

**Example 4:**  
Input: `head = [1,2]`, `n = 2`  
Output: `[2]`  
*Explanation: Remove the node in position 2 from end (i.e., the head), so the list becomes just 2.*

Visual for `[1,2,3,4,5]` before and after removing the 2ⁿᵈ from end:
```
Original: 1 -> 2 -> 3 -> 4 -> 5
Remove 2-nd from end ('4'):
Result:   1 -> 2 -> 3 -> 5
```

### Thought Process (as if you’re the interviewee)  
First, my brute-force idea would be:
- **Traverse once** to compute the length.
- **Second traversal**: move to (length-n)ᵗʰ node and unlink the nᵗʰ node from the end.  
Downside: requires 2 passes; can we do better?

Optimal idea (also known as the "two pointer" or "fast & slow" approach):
- Use 2 pointers: **fast** advances n steps ahead.
- Then move both pointers forward together until fast reaches end; **slow** will be just before the node to remove.
- Unlink the nᵗʰ node from end by changing slow.next.
This only takes **one pass** and requires no extra space.

Frequent in singly linked list problems, this "n-th from end" trick is clean, efficient, and minimizes pointer bugs.

### Corner cases to consider  
- The list has only one node and n = 1.
- The node to remove is the head (n == length of list).
- n is exactly the length of the list.
- n == 1 (remove tail node).
- Empty list (not expected in this problem, but good to note).
- List length < n (should never happen by constraints).
- Multiple consecutive nodes with the same value (should not matter as node identity is by pointer).

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    # Create a dummy node to handle edge cases easily (like removing the head)
    dummy = ListNode(0, head)
    fast = slow = dummy
    
    # Move fast pointer n+1 steps ahead (so slow ends up at node before the removal target)
    for _ in range(n + 1):
        fast = fast.next
    
    # Move both pointers until fast reaches the end
    while fast:
        fast = fast.next
        slow = slow.next
    
    # Remove the n-th node from the end
    slow.next = slow.next.next
    
    # Return the head (could have changed if original head was removed)
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each pointer (fast and slow) traverses the list only once.
- **Space Complexity:** O(1), uses a constant number of pointers regardless of input size. No recursion or extra structure.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve this problem if the list were doubly linked or circular?
  *Hint: How does access to prev pointers or a circular tail help traversal or removal?*

- How would you handle if multiple removals were queried in succession?
  *Hint: Is there a way to avoid repeated traversals if the structure doesn't change much?*

- What if you had to do this in a concurrent environment?
  *Hint: Consider locking or versioning pointers for thread safety.*

### Summary
This problem is a classic illustration of the "two pointers" or fast & slow pointer technique, which efficiently finds the position from the end in a singly linked list with O(1) space and O(n) time. It’s a recurring pattern for nth-from-end, detect cycles, or split lists, and is broadly useful in list processing and interview problems. Using a **dummy node** is a common coding pattern for reliably handling edge cases at the head of the list.


### Flashcard
Use two pointers; move the fast pointer n steps ahead, then move both until fast reaches the end to remove the nᵗʰ node from the end.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Swapping Nodes in a Linked List(swapping-nodes-in-a-linked-list) (Medium)
- Delete N Nodes After M Nodes of a Linked List(delete-n-nodes-after-m-nodes-of-a-linked-list) (Easy)
- Delete the Middle Node of a Linked List(delete-the-middle-node-of-a-linked-list) (Medium)