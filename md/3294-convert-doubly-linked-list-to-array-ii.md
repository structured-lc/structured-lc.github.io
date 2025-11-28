### Leetcode 3294 (Medium): Convert Doubly Linked List to Array II [Practice](https://leetcode.com/problems/convert-doubly-linked-list-to-array-ii)

### Description  
Given an arbitrary node from a **doubly linked list**—which means each node has both `next` and `prev` pointers—return an integer array with the list's values in **order from the head to the tail**.  
The catch: you’re *not* given the head node—just any node in the list.  
You must reconstruct the full order as if you were traversing from head, even if your starting node is from the middle or end.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5], node = 5`  
Output: `[1,2,3,4,5]`  
*Explanation: Start at node 5, move backwards with prev pointers to node 1 (head), then traverse forward to build the array.*

**Example 2:**  
Input: `head = [4,5,6,7,8], node = 8`  
Output: `[4,5,6,7,8]`  
*Explanation: Start at node 8, move back to node 4 (head), then go forward collecting values in order.*

**Example 3:**  
Input: `head = , node = 99`  
Output: ``  
*Explanation: Single node is both head and tail, so just return its value in a one-element array.*

### Thought Process (as if you’re the interviewee)  
First, clarify: we are given *any* node, not necessarily the head—which means we must find the head first.  
- Since this is a doubly linked list, every node `n` has both `n.prev` (points left/back) and `n.next` (points right/forward).
- To find the head: keep moving left via `prev` while `prev` is not None.  
- Once we reach a node whose `prev` is None, it's the head.  
- From there, traverse forward with `next`, collecting values into our array.  
- Stop when `next` becomes None.

A brute force or "too clever" approach isn’t needed. Doubly linked list means traversing in either direction—finding the head, then moving right, is both optimal and clear.  
There’s no need for extra data structures beyond the output array; the process is linear.

Trade-offs:  
- This approach is O(n) and in-place (no extra copying except output—required anyway).
- There’s no way to avoid the double traversal (back then forward), but that's still linear.

### Corner cases to consider  
- The input node is already the head (its `prev` is None).
- The input node is the tail (its `next` is None).
- The list contains only one node.
- The middle node is given.
- Node values are all unique, but not sequential.
- Input node is None (if not in constraints; the problem says always size ≥ 1).

### Solution

```python
# Definition for a Doubly Linked List node.
class Node:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

def toArray(node):
    # Step 1: Find the head
    while node.prev is not None:
        node = node.prev

    result = []
    # Step 2: Traverse forward from head, collecting values
    while node is not None:
        result.append(node.val)
        node = node.next

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes in the list.  
  - We may traverse up to n-1 nodes backward, and then n nodes forward.
  - But total steps are still proportional to n.
- **Space Complexity:** O(n) for the output array (since it must return all list elements).
  - No extra space beyond output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each node also holds references to random nodes (like in a random pointer list)?  
  *Hint: How would you reconstruct the linear order? Which pointers do you follow for the array?*

- If instead, you could only move forward (like if the prev pointers were missing), how would your answer change?  
  *Hint: Can you recover the ordered array if given only a non-head node and no backward access?*

- If you want the array in reverse order (from tail to head), how would you modify your approach?  
  *Hint: Find the tail first and move backwards via prev pointers.*

### Summary
This problem applies the **"traverse a linked list from a non-head node"** pattern, leveraging the bidirectional pointers of a doubly linked list.  
It’s a fundamental linear scan problem: first walk left to find the head, then scan right to generate the output.  
This pattern is common in problems involving doubly linked structures and is useful in data structures where you may start traversal from the middle or any arbitrary node.


### Flashcard
Traverse left via prev pointers until reaching the head (prev is None); then traverse right via next pointers, collecting all values into an array.

### Tags
Array(#array), Linked List(#linked-list), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
- Remove Linked List Elements(remove-linked-list-elements) (Easy)