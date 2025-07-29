### Leetcode 876 (Easy): Middle of the Linked List [Practice](https://leetcode.com/problems/middle-of-the-linked-list)

### Description  
Given the head of a singly linked list, your task is to return **the middle node** of the list. If the total number of nodes is odd, return the exact middle node. If the list has an even number of nodes (so there are two middle nodes), you must return the **second** middle node, as defined by the problem.

For example, if the input list is `[1, 2, 3, 4, 5, 6]`, you'd return the node with value `4` and the output would be `[4, 5, 6]` (the linked list from the returned node to the end) [1][3].

### Examples  

**Example 1:**  
Input: `[1, 2, 3, 4, 5]`  
Output: `[3, 4, 5]`  
*Explanation: The list has 5 elements (odd). The middle node is the 3rd node (value 3). The output represents the list starting at this middle node.*

**Example 2:**  
Input: `[1, 2, 3, 4, 5, 6]`  
Output: `[4, 5, 6]`  
*Explanation: The list has 6 elements (even). The two middle nodes are 3 (left) and 4 (right). By the problem's rule, we return the second middle node (value 4). The sublist from this node is `[4, 5, 6]`.*

**Example 3:**  
Input: `[1, 2]`  
Output: `[2]`  
*Explanation: With two nodes, the second one is considered the "middle" for this problem, so return the node with value 2 and its following sublist (which is just `[2]`).*

### Thought Process (as if you’re the interviewee)  
First, I need to find the middle node of a singly linked list. In the case of an even-length list, the problem asks for the second middle node (so for `[1,2,3,4]`, I should return node `3`, skipping over the first "middle").

**Brute-force idea:**  
- Traverse the entire list once to count the total number of nodes (`n`).
- Compute the middle as ⌊n/2⌋ (since lists use zero-based indexing).
- Traverse again to reach this node, then return it.

**Downsides:** Two passes through the list and uses O(1) extra space, but can we do even better?

**Optimized approach (two pointers, "fast and slow" method):**  
- Use two pointers:
  - `slow` moves one node at a time.
  - `fast` moves two nodes at a time.
- When `fast` reaches the end, `slow` is at the middle node.
- This works for both odd and even-length lists. For even-length, since the second middle node is required, the `slow` pointer will naturally land on the second of the two middle nodes due to how the loop terminates.

**Trade-offs:**  
- Fast and slow pointer approach is preferable for being single-pass O(n) and requiring only O(1) additional space.
- It's clean and common in coding interviews [2][3][4].

### Corner cases to consider  
- List has just one node: Only possible node is the middle node.
- List has two nodes: Second node is the middle.
- All node values are the same.
- Large number of nodes (stress test for performance).
- Typical odd/even number of nodes.

### Solution

```python
# Definition for singly-linked list node.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def middleNode(head):
    # Initialize two pointers both at the head
    slow = head
    fast = head

    # Move fast by 2 steps and slow by 1 step each time
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # When fast reaches the end, slow is at the middle
    return slow
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the list. Each node is visited at most once by both pointers.
- **Space Complexity:** O(1), since only pointers are used and there is no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you could not use extra pointers or variables?
  *Hint: Think recursion or modifying the list structure.*  

- Can you return the first middle node instead of the second if the list has even length?
  *Hint: Can you tweak the loop condition or how you initialize pointers?*  

- How would you solve this if the list was doubly linked, or circular?
  *Hint: Does having previous pointers or a loop impact traversal?*

### Summary  
This is a classic example of the fast-and-slow pointer ("runner") pattern, commonly used for linked list problems where you need to find a midpoint or detect cycles. The pattern is efficient, requires minimal space, and can be applied to problems such as checking for a palindrome, finding the start of a cycle, etc. The key interview takeaway: using two pointers at different speeds is often a fast path to midpoints and intersections in linked lists.