### Leetcode 2487 (Medium): Remove Nodes From Linked List [Practice](https://leetcode.com/problems/remove-nodes-from-linked-list)

### Description  
Given a singly-linked list, remove every node that has a node with a strictly greater value anywhere to its right.  
Return the linked list after these removals, preserving the original order of the remaining nodes.  
For example, given [5,2,13,3,8], the nodes 5, 2, and 3 are removed because there's a greater value later in the list.

### Examples  

**Example 1:**  
Input: `[5,2,13,3,8]`  
Output: `[13,8]`  
*Explanation: 5 is removed because 13 is to the right and is greater.  
2 is removed because 13 is to the right.  
13 stays (only 3 and 8 follow, both smaller).  
3 is removed (8 is to its right and greater).  
8 stays (no values to the right).*

**Example 2:**  
Input: `[1,1,1,1]`  
Output: `[1,1,1,1]`  
*Explanation: Every node has the same value, so none are removed.*

**Example 3:**  
Input: `[7,4,3,2]`  
Output: `[7,4,3,2]`  
*Explanation: The list is strictly decreasing, so none is removed as no right value is greater in any case.*

### Thought Process (as if you’re the interviewee)  
First, I interpret the problem as: for every node, if there's a strictly greater value anywhere to the right, remove that node.  
A brute-force way would be: for every node, scan all nodes to its right and check if a greater value exists. This would be O(n²) time.  
But we can do better.  
Key idea: The problem is similar to removing elements that are smaller than the maximum on their right.  
If we could process the list from right-to-left, always keeping the current maximum, we could delete nodes whose value is less than this maximum.  
However, since it's singly linked, we can't move right-to-left easily—but we can reverse the list first, so we can traverse as needed.  
While traversing the reversed list, we keep a running max.  
- If current node's value ≥ max so far, we keep it and update max so far.  
- Otherwise, we remove it.

After this one pass, we reverse back the filtered list to restore original order.  
Alternative: We could use a stack (monotonic) to keep track of relevant nodes, but the reverse-and-compare approach is typically simpler for interviews.

### Corner cases to consider  
- Empty linked list: should return None.
- Single node: should return list unchanged.
- All increasing order: only last node survives.
- All decreasing order: list unchanged.
- All equal values: list unchanged.
- Nodes with duplicates but larger to their right (make sure strict "greater" comparison).

### Solution

```python
# Definition for singly-linked list:
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNodes(head: ListNode) -> ListNode:
    # Helper to reverse linked list
    def reverse(node):
        prev = None
        while node:
            next_node = node.next
            node.next = prev
            prev = node
            node = next_node
        return prev

    # Step 1: Reverse the list to process from right to left
    head = reverse(head)

    # Step 2: Process nodes, keeping only those >= max_so_far
    max_so_far = float('-inf')
    dummy = ListNode(0)
    curr, tail = head, dummy
    while curr:
        if curr.val >= max_so_far:
            tail.next = curr
            tail = curr
            max_so_far = curr.val
        curr = curr.next
    tail.next = None # Cut off any remaining nodes

    # Step 3: Reverse again to restore original order
    return reverse(dummy.next)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes.  
  Each pass (reverse, filter, reverse again) takes O(n).
- **Space Complexity:** O(1) extra space (ignoring recursion stack or output list), as we operate in-place by relinking nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list was doubly linked?  
  *Hint: Could you process it right-to-left without reversal?*

- How would you solve this if each node could have a gigantic value field (greater than available memory for a stack/array)?  
  *Hint: Can you still use O(1) auxiliary space?*

- How do you adapt this if you need to remove nodes with values ‘less than or equal to’ a node to the right instead of ‘strictly less’?  
  *Hint: Adjust your comparison logic.*

### Summary
This problem uses the classic "reverse, process, reverse" pattern to simulate a right-to-left scan in a singly-linked list, enabling a one-pass in-place solution.  
Filtering nodes based on the maximum-to-right value comes up in various 'remove inferior elements' questions and is related to monotonic stack and reverse traversal techniques.  
This is a great example of space-efficient data structure traversal and relinking, and the monotonic stack approach also applies to problems like Largest Rectangle in Histogram and Stock Span.

### Tags
Linked List(#linked-list), Stack(#stack), Recursion(#recursion), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Reverse Linked List(reverse-linked-list) (Easy)
- Delete Node in a Linked List(delete-node-in-a-linked-list) (Medium)
- Next Greater Element I(next-greater-element-i) (Easy)
- Delete Nodes From Linked List Present in Array(delete-nodes-from-linked-list-present-in-array) (Medium)