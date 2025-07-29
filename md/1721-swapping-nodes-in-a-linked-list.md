### Leetcode 1721 (Medium): Swapping Nodes in a Linked List [Practice](https://leetcode.com/problems/swapping-nodes-in-a-linked-list)

### Description  
Given the head of a singly linked list and an integer k, swap the values of the kᵗʰ node from the start and the kᵗʰ node from the end, and return the linked list.  
You don't swap the nodes themselves—just their values. You cannot use extra arrays or convert to arrays, and you should aim for O(1) extra space.  
For example, if k = 2 and the list is [1,2,3,4,5], the 2ⁿᵈ node from the start is 2, and the 2ⁿᵈ node from the end is 4; these should be swapped.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5], k = 2`  
Output: `[1,4,3,2,5]`  
*Explanation: 2 is the 2ⁿᵈ node from the start, and 4 is the 2ⁿᵈ node from the end. Swap their values: [1,4,3,2,5].*

**Example 2:**  
Input: `head = [7,9,6,6,7,8,3,0,9,5], k = 5`  
Output: `[7,9,6,6,8,7,3,0,9,5]`  
*Explanation: 5 is the 5ᵗʰ node from the start (7), and 5 is the 5ᵗʰ node from the end (8). Swap their values: [7,9,6,6,8,7,3,0,9,5].*

**Example 3:**  
Input: `head = [1], k = 1`  
Output: `[1]`  
*Explanation: The list has just one node; nothing changes.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  First, I could traverse the linked list to store all nodes or values in an array, swap the kᵗʰ and (n-k+1)ᵗʰ elements, and copy values back.  
  This works, but it uses O(n) extra space, which isn’t optimal for an in-place linked list question.

- **Optimized:**  
  Since arrays aren’t allowed, I’ll instead aim to find both target nodes in a single pass if possible, or two passes at worst.  
  1. First, traverse the list to get the length (n).
  2. Find the kᵗʰ node from start by moving k-1 steps from head.
  3. Find the kᵗʰ node from end, which is the (n-k)ᵗʰ node from head.
  4. Swap their values.

  To do it in one pass:  
  - Use two pointers: advance one pointer k-1 steps for the front node.
  - Use another pointer that stays k behind as you continue to end, landing at the kᵗʰ node from end at the right moment.

- **Trade-offs:**  
  - Array method is easier but uses more space.
  - Pointer method is O(1) space and O(n) time; a typical pattern for in-place linked list problems and best for this question.

### Corner cases to consider  
- List has only **one node**.
- **k** is the first or last node (k = 1 or k = n).
- **k** is more than half the length but less than or equal to n.
- List is **very short** (e.g., length 2).
- The **two nodes are actually the same node** (if n is odd and k = ⌊n/2⌋ + 1).

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def swapNodes(head: 'ListNode', k: int) -> 'ListNode':
    # Step 1: Find the length of the list
    n = 0
    curr = head
    while curr:
        n += 1
        curr = curr.next
    
    # Step 2: Find the kᵗʰ node from start (front) and kᵗʰ from end (back)
    front = head
    for _ in range(k - 1):
        front = front.next
    
    back = head
    for _ in range(n - k):
        back = back.next
    
    # Step 3: Swap their values
    front.val, back.val = back.val, front.val
    
    # Step 4: Return the head (unchanged structure)
    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - First pass counts the nodes (O(n)).  
  - Second and third passes to reach kᵗʰ and (n-k+1)ᵗʰ nodes (O(k) + O(n-k) = O(n)).
- **Space Complexity:** O(1)  
  - No extra storage is used except a few pointers.  
  - The structure of the list is unchanged.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only traverse the list **once**?
  *Hint: Try the two pointer (runner) technique—advance one pointer k steps ahead and let a second start later, meeting the criteria at the right times.*

- How would you adapt the logic if asked to actually **swap the nodes themselves**, not just values?
  *Hint: Rewiring node.next pointers requires careful tracking of previous pointers—what changes if the two nodes are adjacent or the same?*

- Can you generalize to **swap the kᵗʰ node from the start and lᵗʰ node from the end** (not necessarily the same k)?
  *Hint: Same logic, just change which node from the end you target.*

### Summary
This problem uses the common two-pointer technique for linked lists to find specific nodes in place without extra memory, which is a key interview pattern for singly linked lists.  
It's useful for swapping or accessing nodes at relative positions and can be generalized to many in-place node manipulation problems, such as reversing nodes in k-groups.