### Leetcode 2816 (Medium): Double a Number Represented as a Linked List [Practice](https://leetcode.com/problems/double-a-number-represented-as-a-linked-list)

### Description  
Given the head of a non-empty singly linked list representing a non-negative integer (with each node storing one digit and the most significant digit at the head), return the head of the linked list after **doubling** the represented number.  
Leading zeros are not allowed in the output.

### Examples  

**Example 1:**  
Input: `[1,8,9]`  
Output: `[3,7,8]`  
*Explanation:* The list `[1,8,9]` represents 189. 189 × 2 = 378, so return `[3,7,8]`.

**Example 2:**  
Input: `[9,9,9]`  
Output: `[1,9,9,8]`  
*Explanation:* The list `[9,9,9]` represents 999. 999 × 2 = 1998 ➔ `[1,9,9,8]`.

**Example 3:**  
Input: ``  
Output: ``  
*Explanation:* The list `` just doubles to 0.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Convert the linked list to an integer, double it, then build a new linked list from the doubled value.  
  *Problem:* If the number is very large (up to 10⁴ digits), this will cause overflow and is not allowed.

- **Optimized (Linked List)**:  
  Since each node only stores a single digit, we cannot create the integer directly.  
  Doubling a number involves multiplying each digit by 2 (starting from the least significant digit, i.e., the end of the list) and carrying over as needed.
  However, the list is **singly linked**, so to process from least-to-most significant, we either:
  - *Reverse the list*, process the doubling (with carry), then reverse again to restore order.
  - *Use recursion* to process from the end towards the head.
  
  **Trade-offs:**  
  - Reversing the list is simple and uses O(1) extra space (iterative, optimal for interviews).
  - Recursion is elegant but may use O(n) stack space.
  I’d choose the reversal + iteration approach for O(1) space, clarity, and constant space in interviews.

### Corner cases to consider  
- List with only a zero: ``
- Carry at the most significant digit (e.g., `[9,9,9]`)
- Single-digit (e.g., `[5]`)
- No carry at all (e.g., `[1,2,3]`)
- First digit results in an extra digit after doubling (e.g., `[8,9,9]`)
- All digits are zero (though guaranteed at most one zero at head due to no leading zeros)

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def doubleIt(head: ListNode) -> ListNode:
    # Helper function to reverse a linked list
    def reverse(node):
        prev = None
        while node:
            nxt = node.next
            node.next = prev
            prev = node
            node = nxt
        return prev

    # Step 1: Reverse the linked list to process from least significant digit
    head = reverse(head)

    curr = head
    carry = 0
    prev = None

    # Step 2: Double each digit and manage carry
    while curr:
        doubled = curr.val * 2 + carry
        curr.val = doubled % 10
        carry = doubled // 10
        prev = curr
        curr = curr.next

    # If there's a remaining carry, add a new node
    if carry:
        prev.next = ListNode(carry)

    # Step 3: Reverse back to restore original digit order
    return reverse(head)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) – We traverse the list three times (reverse, double, reverse), each linear in length n.
- **Space Complexity:** O(1) – Only constant extra pointers used (excluding input and output). (With recursion, space could be O(n).)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this if the list represented the number in *reverse* order (least significant digit first)?  
  *Hint: You could skip reversing, since processing is already from least-to-most significant.*

- How do you handle negative numbers (if allowed)?  
  *Hint: You'd need to store a sign and handle negatives at the list or node level.*

- If you could only use O(1) auxiliary space and no recursion, can you still solve for doubly large numbers (e.g., up to 10⁶ digits)?  
  *Hint: The in-place approach above generalizes to very large lists.*

### Summary
This problem leverages the **in-place linked list multiplication with carry**, a common coding pattern for implementing big integer math in primitive data structures.  
The main trick is to process digits from least-to-most significant, which is handled by reversing the list (since it's singly linked).  
Variations of this approach are often seen in *add two numbers* linked list problems, and are foundational for simulating arithmetic on large numbers stored as lists.


### Flashcard
Reverse linked list, double each digit with carry propagation, handle final carry, reverse result back—avoids integer overflow for large numbers.

### Tags
Linked List(#linked-list), Math(#math), Stack(#stack)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Plus One Linked List(plus-one-linked-list) (Medium)