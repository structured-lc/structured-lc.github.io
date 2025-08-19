### Leetcode 234 (Easy): Palindrome Linked List [Practice](https://leetcode.com/problems/palindrome-linked-list)

### Description  
Given the head of a singly linked list, determine if the linked list is a palindrome.  
A palindrome means the node values read the same forwards and backwards.  
That is, the first node equals the last node, the second node equals the second-last, etc.  
You may not alter the node values, but you can alter the node connections.

### Examples  

**Example 1:**  
Input: `[1,2,2,1]`  
Output: `True`  
*Explanation: Forwards: 1→2→2→1. Backwards: 1→2→2→1. Both are the same, so it is a palindrome.*

**Example 2:**  
Input: `[1,2]`  
Output: `False`  
*Explanation: Forwards: 1→2. Backwards: 2→1. Not the same, so not a palindrome.*

**Example 3:**  
Input: `[1,2,3,2,1]`  
Output: `True`  
*Explanation: Forwards: 1→2→3→2→1. Backwards: 1→2→3→2→1. Both are the same, so it is a palindrome.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force Idea**:  
  - Store all node values in an array or stack during a traversal. Then check if the array is the same forwards and backwards (either by reversing or using two pointers).  
  - Space complexity is O(n), which is not optimal.
- **Optimized Approach**:  
  - Use the two-pointer technique (slow and fast pointers) to find the midpoint of the linked list.
  - Reverse the second half of the list in place.
  - Compare the first half and the reversed second half node by node.
  - If all corresponding values are equal, it's a palindrome.
  - This method has O(1) extra space beyond a few pointers.
- **Why this approach?**  
  - Avoids extra space for node values, meeting the interview follow-up for “O(1) space.”
  - Reversing only half the list is possible in one pass, and comparison is straightforward.
  - Only slight structural changes to the list, easily reverted if needed.

### Corner cases to consider  
- Empty list (`[]`): Palindrome by definition (trivially true).
- Single node (`[a]`): Always a palindrome.
- Odd/even number of nodes: Works for both.
- List with all equal values: Palindrome (e.g., `[7,7,7,7]`).
- Reverting the reversed half if restoring the input list is required.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        if not head or not head.next:
            # Empty or single node is always palindrome
            return True
        
        # Step 1: Find midpoint using slow and fast pointers
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Step 2: Reverse the second half
        prev = None
        curr = slow
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        
        # Step 3: Compare both halves
        first, second = head, prev
        while second:
            if first.val != second.val:
                return False
            first = first.next
            second = second.next
        
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n)  
  - One pass to find the middle (⌊n/2⌋ steps).
  - One pass to reverse the second half (⌊n/2⌋ steps).
  - One pass to compare (up to n/2 steps).
- **Space Complexity:**  
  O(1)  
  - Only a few pointers used; no extra space for node values.

### Potential follow-up questions (as if you’re the interviewer)  

- If you must restore the input list after checking, can you still do it in O(1) space?  
  *Hint: Try reversing the second half again after the check.*

- How would you solve the problem if you can’t modify the input list at all?  
  *Hint: A stack or array is the only option—can you do it in O(n) space?*

- Can you do it recursively, and what is the space cost?  
  *Hint: Consider call stack depth relative to list length.*

### Summary
The approach uses the classic two-pointer (slow/fast) technique for linked list middle finding, followed by in-place reversal and two-pointer comparison.  
This O(1) space trick is a staple in linked list patterns—also useful for problems involving list reordering, pairing, and cycle detection.  
Common patterns: slow/fast pointers, in-place reversal, and pairwise comparison.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers), Stack(#stack), Recursion(#recursion)

### Similar Problems
- Palindrome Number(palindrome-number) (Easy)
- Valid Palindrome(valid-palindrome) (Easy)
- Reverse Linked List(reverse-linked-list) (Easy)
- Maximum Twin Sum of a Linked List(maximum-twin-sum-of-a-linked-list) (Medium)