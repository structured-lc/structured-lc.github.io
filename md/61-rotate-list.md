### Leetcode 61 (Medium): Rotate List [Practice](https://leetcode.com/problems/rotate-list)

### Description  
Given a singly linked list and an integer k, rotate the list to the right by k places. Rotating means that on each rotation, the last element moves to the head. For example, if k = 1 and the list is 1→2→3, then after rotation it becomes 3→1→2. The value of k can be any non-negative integer, even larger than the length of the list.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5]`, `k = 2`  
Output: `[4,5,1,2,3]`  
*Explanation: Rotate twice: [1,2,3,4,5] → [5,1,2,3,4] → [4,5,1,2,3]*

**Example 2:**  
Input: `head = [0,1,2]`, `k = 4`  
Output: `[2,0,1]`  
*Explanation: List length is 3, so rotate 4 times is same as rotating once. [0,1,2] → [2,0,1]*

**Example 3:**  
Input: `head = []`, `k = 1`  
Output: `[]`  
*Explanation: Empty list remains unchanged.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Rotate one by one k times. For each rotation, move the last node to the front. This would require k × n time, which is inefficient especially for large k.
- **Optimize:**
    - First, find the length (n) of the linked list by traversing once.
    - Since rotating n times brings the list back to the original, the effective number of rotations is k % n.
    - If the effective k is 0, just return the head.
    - Otherwise, find the (n–k)ᵗʰ node, which will become the new tail; the node after it is the new head.
    - Detach the new tail, and connect the original end of the list to the original head.
- This is much more efficient: only a couple passes through the list regardless of k.

### Corner cases to consider  
- Empty list (head is None)
- k = 0 (no rotation needed)
- List with only one node
- k is a multiple of the list length (no net rotation)
- k is much larger than the length of the list

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def rotateRight(head, k):
    # Edge: empty list or single node or no rotation needed
    if not head or not head.next or k == 0:
        return head

    # 1. Compute the length and get the last node
    length = 1
    tail = head
    while tail.next:
        tail = tail.next
        length += 1

    # 2. Make it a ring
    tail.next = head

    # 3. Find the new tail at position (length - k % length - 1)
    k = k % length
    if k == 0:
        tail.next = None  # break the ring
        return head
    steps_to_new_tail = length - k
    new_tail = head
    for _ in range(steps_to_new_tail - 1):
        new_tail = new_tail.next

    # 4. Set new head and break the ring
    new_head = new_tail.next
    new_tail.next = None
    return new_head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
    - One pass to count the length, another pass to find the new tail. All other work is constant time.
- **Space Complexity:** O(1)  
    - Only uses a few pointers and variables. No extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this in a doubly linked list?  
  *Hint: How does backtracking make this easier?*

- Can you do this recursively?  
  *Hint: What state would you need to pass down the stack?*

- What if you had to rotate to the left instead of the right?  
  *Hint: How would the formula change for the new head?*

### Summary
This problem is an example of the **"linked list manipulation and rotation"** pattern, which comes up in linked list problems involving breaking and reconnecting segments. The main insight is to reduce redundant work by normalizing k, and only rearrange pointers once after finding the correct new head and tail positions. This two-pass, O(n) approach is common for problems involving cycles or rotations in linked structures.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Rotate Array(rotate-array) (Medium)
- Split Linked List in Parts(split-linked-list-in-parts) (Medium)