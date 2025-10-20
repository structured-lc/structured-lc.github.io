### Leetcode 92 (Medium): Reverse Linked List II [Practice](https://leetcode.com/problems/reverse-linked-list-ii)

### Description  
Given a singly linked list and two integers, **left** and **right** (1-indexed, with left ≤ right), reverse the nodes of the list from the leftᵗʰ node to the rightᵗʰ node (inclusive), and return the head of the modified list. The rest of the list should remain unchanged. You must reverse the nodes in-place without creating new nodes.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5], left = 2, right = 4`  
Output: `[1,4,3,2,5]`  
*Explanation: Nodes from position 2 to 4 are 2→3→4; after reversal, it becomes 4→3→2. So the list becomes 1→4→3→2→5.*  
Tree representation:
```
[1, 2, 3, 4, 5]
```
becomes
```
[1, 4, 3, 2, 5]
```

**Example 2:**  
Input: `head = [5], left = 1, right = 1`  
Output: `[5]`  
*Explanation: The sublist to reverse has only one node. No change.*

**Example 3:**  
Input: `head = [1,2,3], left = 1, right = 2`  
Output: `[2,1,3]`  
*Explanation: Reverse the first two nodes. List becomes 2→1→3.*  
Tree representation:
```
[1, 2, 3]
```
becomes
```
[2, 1, 3]
```

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Store the node values in an array, reverse the subarray from left−1 to right−1, then reconstruct the list.  
  - Downsides: Not in-place, uses O(n) extra space.
- **Optimized in-place:**  
  - Traverse to the node just *before* the leftᵗʰ position (call it pre).
  - Use three pointers (pre, curr, next). Reverse the links from left to right:
    - For each node in [left, right], redirect curr.next to its predecessor.
  - After reversing the sublist, reconnect its head and tail with pre and next parts of the list.
  - Using a dummy node simplifies edge cases (e.g., when left = 1).
- **Why this approach:**  
  - O(1) space, single traversal, only pointer manipulation.  
  - Works for all edge cases, including reversal at head or tail.

### Corner cases to consider  
- List with one node (reversal is no-op).
- left == right (no-op as only one node is targeted).
- Reversal at the head (left = 1).
- Reversal at the end (right = length of list).
- Empty list.

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseBetween(head, left, right):
    # Edge case: empty list or left == right (no change needed)
    if not head or left == right:
        return head

    # Dummy node simplifies handling head reversal
    dummy = ListNode(0)
    dummy.next = head

    # Step 1: move 'prev' to node before leftᵗʰ
    prev = dummy
    for _ in range(left - 1):
        prev = prev.next

    # curr points at leftᵗʰ node, to become the tail after reversal
    curr = prev.next

    # Step 2: reverse nodes between left and right
    for _ in range(right - left):
        temp = curr.next
        # Remove temp from its place, and insert after prev
        curr.next = temp.next
        temp.next = prev.next
        prev.next = temp

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the list. We do a single pass for traversal, and up to (right - left) node moves.
- **Space Complexity:** O(1), since all operations are in-place with only a few extra pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to reverse multiple non-overlapping sublists?  
  *Hint: What if you were provided a list of (left, right) pairs? Think about update order and connectivity for reversals.*

- Can you reverse nodes in k-sized groups throughout the list (i.e., Leetcode 25)?  
  *Hint: Think of how you might generalize the reversal step to fixed-width blocks.*

- How would you implement this recursively?  
  *Hint: Consider simulating the same pointer-reversal process using recursion.*

### Summary
This problem uses the **linked list reversal** pattern, especially “reverse a sublist in-place” with pointer manipulation. The dummy node trick is a standard way to handle head/tail edge cases in linked lists. Similar techniques are broadly useful for problems requiring sublist or groupwise operations, e.g., reversing nodes in k-groups, rotating lists, or swapping nodes in pairs.


### Flashcard
Use a dummy node and reverse the sublist in-place by iteratively moving nodes in the [left, right] range to the front of the sublist.

### Tags
Linked List(#linked-list)

### Similar Problems
- Reverse Linked List(reverse-linked-list) (Easy)