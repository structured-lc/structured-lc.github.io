### Leetcode 2074 (Medium): Reverse Nodes in Even Length Groups [Practice](https://leetcode.com/problems/reverse-nodes-in-even-length-groups)

### Description  
Given the head of a singly-linked list, rearrange the list in groups. The first group contains 1 node, the second group contains 2 nodes, the third contains 3, etc.  
For each group:  
- If the group’s length is even, reverse the nodes in that group.
- If it’s odd, leave it as is.  
If there are not enough nodes to complete a group, the last group will have all remaining nodes, and you still apply the above rules.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5,6]`  
Output: `[1,3,2,4,5,6]`  
*Explanation:  
Groups: [1], [2,3], [4,5,6]  
- Group 1: size 1 (odd) → [1]  
- Group 2: size 2 (even) → reverse: [3,2]  
- Group 3: size 3 (odd) → [4,5,6]  
Final: [1,3,2,4,5,6]*

**Example 2:**  
Input: `head = [1,2,3,4]`  
Output: `[1,3,2,4]`  
*Explanation:  
Groups: [1], [2,3], [4]  
- Group 1: size 1 (odd) → [1]  
- Group 2: size 2 (even) → reverse: [3,2]  
- Group 3: size 1 (odd) → [4]  
Final: [1,3,2,4]*

**Example 3:**  
Input: `head = [2,1]`  
Output: `[2,1]`  
*Explanation:  
Groups: [2], [1]  
- Both groups are size 1 (odd), so no change.*

---

### Thought Process (as if you’re the interviewee)  

Start by recognizing the group structure:  
- Group sizes increment from 1 upward: 1, 2, 3, 4, etc.
- For each group, when its length is even, we need to reverse that segment.

Brute-force approach:  
- For each group in the list, collect nodes in a buffer/array, reverse if size is even, and reconnect.  
But this would increase space complexity (using extra storage per group).

Optimal in-place solution:  
- Use pointers to traverse the list.
- For each group, check how many nodes are left and set group size.
- For even-sized groups, reverse directly in the list, taking care to reconnect pointers.
- For odd-sized groups, simply move the pointer.

Use a dummy node before head for easier edge case handling (start and reconnects).  
Reversal is done by pointer manipulations for a segment of linked list.  
Be careful with the last group; it may be shorter than expected.

Trade-offs:  
- Two-pass approaches or array buffers are easier but less space-efficient.
- In-place reversal maintains O(1) space.

---

### Corner cases to consider  
- Empty list (`head = []`)
- List with one node (`[x]`)
- List size less than the first few group sizes (e.g., `[a, b]`)
- Last group with fewer nodes than its expected size
- Multiple consecutive even groups in late portions of long lists

---

### Solution

```python
# Definition for singly-linked list:
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseEvenLengthGroups(self, head: ListNode) -> ListNode:
        # Dummy node for easier pointer manipulation
        dummy = ListNode(0)
        dummy.next = head
        
        prev = dummy
        curr = head
        group_size = 1
        
        while curr:
            group_tail = curr
            count = 1
            
            # Find true size of the group and the group's last node
            while count < group_size and group_tail.next:
                group_tail = group_tail.next
                count += 1
            
            next_group_head = group_tail.next
            
            # Check if group size is even
            if count % 2 == 0:
                # Reverse this group: from curr to group_tail
                prev_next = prev.next
                node = curr
                prev_sub = next_group_head
                # Reverse 'count' nodes
                for _ in range(count):
                    temp = node.next
                    node.next = prev_sub
                    prev_sub = node
                    node = temp
                # Connect previous group with reversed head
                prev.next = prev_sub
                prev = prev_next
            else:
                # Just move prev to the end of current group
                prev = group_tail
            
            curr = next_group_head
            group_size += 1
        
        return dummy.next
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each node is visited once as we traverse through the list and those inside reversals are also handled in O(1) per operation; total passes still sum to O(n).

- **Space Complexity:** O(1).  
  Only a handful of pointers and counters are used—the solution is in-place with respect to the list.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to reverse odd length groups instead?
  *Hint: Which condition currently triggers a reversal? How to toggle for odd-sized groups?*

- Can you do this if the list is doubly-linked? Would the reversal be easier?
  *Hint: Doubly-linked lists allow easier backward traversal, affecting reversal.*

- How would you modify the approach for a circular linked list?
  *Hint: Be careful with termination—the group finding logic will differ.*

---

### Summary

This problem uses the **Linked List Reversal in Segmented Groups** pattern, common in problems like "Reverse Nodes in k-Group". The main challenge is determining group sizes and in-place reversal for only even-length groups. The dummy node and careful pointer updates reduce edge case complexity. Group-based pointer manipulation is a versatile pattern for advanced linked list operations.


### Flashcard
Reverse even-length groups in-place using pointers.

### Tags
Linked List(#linked-list)

### Similar Problems
- Reverse Nodes in k-Group(reverse-nodes-in-k-group) (Hard)
- Reverse Linked List(reverse-linked-list) (Easy)