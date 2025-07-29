### Leetcode 1290 (Easy): Convert Binary Number in a Linked List to Integer [Practice](https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer)

### Description  
Given a singly-linked list where each node contains a binary digit (0 or 1), return its decimal integer value. The most significant bit comes first (head of the list).

### Examples  
**Example 1:**  
Input: `head = [1,0,1]`  
Output: `5`  
*Explanation: 1→0→1 is binary 101 = 5*

**Example 2:**  
Input: `head = `  
Output: `0`  
*Explanation: Only one 0, value is 0*

**Example 3:**  
Input: `head = [1,1,1,1]`  
Output: `15`  
*Explanation: Binary 1111 = 15*

### Thought Process (as if you’re the interviewee)  
Follow the standard conversion logic: For each node, shift accumulated value left by 1 bit (multiply by 2) and add the node's digit. Traverse list, updating as we proceed left to right.

Alternatively, store all bits in array, then parse, but O(1) memory scan is easier and faster.

### Corner cases to consider  
- Single element list
- All zeros
- Empty list (if allowed)
- Leading zeros

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def getDecimalValue(head):
    num = 0
    while head:
        # Shift bits left and add new digit
        num = (num << 1) | head.val
        head = head.next
    return num
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) for n nodes, one pass.
- **Space Complexity:** O(1), just a few variables for accumulation.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the list is very long (more than 31 bits)?  
  *Hint: Consider integer overflow or use arbitrary-length int (Python OK)*

- What changes for list stored in reverse order?  
  *Hint: Need to reverse first or accumulate with position counting*

- Could you solve it recursively?  
  *Hint: Use recursion to reach tail, then build up answer*

### Summary
This is a classic **linked list traversal and bit manipulation** pattern where each node contributes a bit. Simplifies binary-to-decimal conversion, and same logic can be used for other base conversions or parsing problems.