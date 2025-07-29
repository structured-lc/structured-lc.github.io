### Leetcode 25 (Hard): Reverse Nodes in k-Group [Practice](https://leetcode.com/problems/reverse-nodes-in-k-group)

### Description  
Given a singly-linked list, you need to reverse every group of k nodes in the list. If the number of nodes left at the end is less than k, those nodes remain in the same order. Each group must be reversed in-place, using only O(1) extra memory.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5], k = 2`  
Output: `[2,1,4,3,5]`  
*Explanation: Reverse the first two nodes (1,2) → (2,1), then next two (3,4) → (4,3), node 5 left as is.*

**Example 2:**  
Input: `head = [1,2,3,4,5], k = 3`  
Output: `[3,2,1,4,5]`  
*Explanation: Reverse the first three nodes (1,2,3) → (3,2,1). Next group (4,5) has fewer than k nodes, so remains unchanged.*

**Example 3:**  
Input: `head = [1,2,3,4,5], k = 1`  
Output: `[1,2,3,4,5]`  
*Explanation: With k=1, each group is a single node, so the list remains unchanged.*


### Thought Process (as if you’re the interviewee)  
First, I’d describe a brute-force approach where for each k nodes, I’d clone or create a new reversed list, but this would violate the O(1) extra space requirement and mutate the node values, which isn’t allowed.

Instead, the optimal way is to reverse the nodes in-place, group by group. For each group of k nodes:
- Check if enough nodes remain to form a group. If not, leave the rest as is.
- If enough nodes exist, reverse the pointers for this group using 3 pointers: prev, curr, and next.
- Connect the reversed portion to the already-processed portion and to the next group.
- Continue processing until no more full k-sized groups remain.

Pointers must be managed carefully to handle connecting the end of each block to the next part of the list, and the very first reversed group must update the head pointer.

This approach keeps both time and space complexity optimal and handles all edge cases with clean logic.

### Corner cases to consider  
- Empty list `[]` should return `[]`.
- k = 1: List remains unchanged.
- k greater than or equal to the length of list: Either reverse the whole list (if length == k) or leave unchanged.
- Tail group with fewer than k nodes: Remains in original order.
- List with only one node and k > 1.
- Mutating node values is not allowed—must change links only.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseKGroup(head, k):
    # Function to get the kᵗʰ node starting from curr
    def get_kth(curr, k):
        while curr and k > 0:
            curr = curr.next
            k -= 1
        return curr

    # Dummy node simplifies boundary conditions
    dummy = ListNode(0, head)
    group_prev = dummy

    while True:
        # Find the group's kᵗʰ node
        kth = get_kth(group_prev, k)
        if not kth:
            break

        group_next = kth.next  # The node after the k-group
        
        # Reverse this group
        prev, curr = group_next, group_prev.next
        for _ in range(k):
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp

        # Pointers rearranged: prev points to kth node
        temp = group_prev.next        # group_prev.next points to old group's head
        group_prev.next = kth        # Link previous group to new group's head
        group_prev = temp            # Move group_prev pointer for next group

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited exactly once, performing constant work per node.
- **Space Complexity:** O(1) — Only pointers and a dummy node are used; no extra storage proportional to input size.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the situation if you had to reverse the last group even if it's less than k nodes?  
  *Hint: Change group size check logic, always reverse every group.*

- Can you solve the problem if the linked list is a doubly linked list?  
  *Hint: You could reverse the previous pointers as well as next pointers.*

- How would the algorithm be affected if each ListNode held a reference to its parent node, or there was a cycle?  
  *Hint: Parent or cycle recognition might impact pointer redirection or require cycle detection.*

### Summary
The problem uses the **k-group linked list reversal** pattern, utilizing dummy nodes and pointer manipulation to reverse linked list segments efficiently and robustly. The approach ensures only node connections are changed (not values), in O(n) time and O(1) space. This pattern appears in variants where parts of a linked list must be reversed or reorganized, such as “Reverse Linked List II,” “Swap Nodes in Pairs,” etc.