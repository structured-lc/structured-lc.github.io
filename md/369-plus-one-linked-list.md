### Leetcode 369 (Medium): Plus One Linked List [Practice](https://leetcode.com/problems/plus-one-linked-list)

### Description  
You're given a **singly linked list** in which each node represents a single digit (0–9) of a non-negative integer, with the **most significant digit at the head** of the list. The task is to **increment the number by one** and return the head of the resulting linked list. The solution must handle any size of input (from 1 up to 10,000 nodes), manage carries (like 9→0), and if necessary, add a new digit at the head (e.g., 999 + 1 → 1000).

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `[1,2,4]`  
*Explanation: 123 + 1 = 124. Only the last digit changes since there is no carryover.*

**Example 2:**  
Input: `[9,9,9]`  
Output: `[1,0,0,0]`  
*Explanation: 999 + 1 = 1000. A carryover propagates through all digits, so a new leading 1 is added.*

**Example 3:**  
Input: ``  
Output: `[1]`  
*Explanation: 0 + 1 = 1. Simple increment with no carry.*

### Thought Process (as if you’re the interviewee)  

First, if I could convert the list into an integer, do the addition, and build the list again, it would be easy. But that’s not practical or allowed due to possible overflows (with lists up to 10,000 digits).  
Since the list is singly linked and the least significant digit is at the tail, moving backwards is not possible.  
To solve this in-place, **I have two main approaches**:

- **Reverse the list**, add one (propagating the carry from least to most significant digit), then reverse again to restore the original order.
- Or, **use recursion** to propagate the carry from the tail back up to the head without reversing.
- Optionally, I could iterate and find the *rightmost* node that is not 9 (since only that node and following nodes may change), and increment it in a single pass with a dummy head for safety.

**I’ll choose the reversal method** as it’s easy to implement iteratively, handles any size, and avoids extra stack space.  
Key steps:
- Reverse the list.
- Traverse, add one, propagate carry.
- Reverse back.

### Corner cases to consider  
- All digits are 9: `[9,9,9] → [1,0,0,0]`.
- Single-node, maximum digit: ` → [1,0]`.
- No carry at all: `[1,2,3] → [1,2,4]`.
- The list is just ``.
- Linked list with length=1.
- Carries only propagate through some digits, not all.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def plusOne(head: ListNode) -> ListNode:
    # Helper to reverse linked list
    def reverse(node):
        prev = None
        while node:
            nxt = node.next
            node.next = prev
            prev = node
            node = nxt
        return prev

    # Step 1: Reverse the list so we can process from least significant digit
    head = reverse(head)

    # Step 2: Add one with carry
    curr = head
    carry = 1
    while curr:
        new_val = curr.val + carry
        curr.val = new_val % 10
        carry = new_val // 10

        # If at last node and have carry, add a new node
        if not curr.next and carry:
            curr.next = ListNode(carry)
            carry = 0
        curr = curr.next

    # Step 3: Reverse the list again to original order
    return reverse(head)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we traverse the list three times: once to reverse, once to add one, and once more to reverse back.
- **Space Complexity:** O(1) (if recursive solution is not used), because all operations are in-place except possible new node allocation; no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this **without reversing the list**?
  *Hint: Consider recursion to process from the tail (least significant digit) upward.*

- What if the list was **doubly linked**?
  *Hint: You could traverse backwards directly for efficient carry management.*

- How would you **extend to arbitrary base (not just base 10)**?
  *Hint: Use the same logic but replace 10 with the base where relevant (val % base, val // base).*

### Summary
The key challenge is that the least significant digit is at the end of a singly linked list. The **reversal pattern** allows us to efficiently handle carry propagations (like adding digits), which is a common trick for linked list arithmetic (see also reverse-add-two-numbers, multiply-lists, etc). Using a dummy head for simplicity and handling edge cases like all-9s is standard for robust linked list manipulation. This problem is a strong exercise in in-place, iterative list algebra.


### Flashcard
Reverse the list to add one from least significant digit, or use recursion to propagate carry from the tail forward.

### Tags
Linked List(#linked-list), Math(#math)

### Similar Problems
- Plus One(plus-one) (Easy)
- Double a Number Represented as a Linked List(double-a-number-represented-as-a-linked-list) (Medium)