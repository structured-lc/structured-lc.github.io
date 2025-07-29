### Leetcode 708 (Medium): Insert into a Sorted Circular Linked List [Practice](https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list)

### Description  
You are given a node from a **sorted circular linked list** (non-decreasing order). The head node provided may be **any node** in the circle; you can't assume it's the smallest. Your task: **insert a new value** (`insertVal`) into the proper place so that the list remains **circular and sorted**.  
- If the list is **empty** (`head` is `None`), create a new one-node circular list storing `insertVal`.  
- If the list has multiple valid spots (e.g., duplicates), you may insert `insertVal` anywhere it fits.

### Examples  

**Example 1:**  
Input: `head = [3,4,1], insertVal = 2`  
Output: `[3,4,1,2]`  
*Explanation: The list forms 3 → 4 → 1 → 3. 2 fits between 1 and 3: 3 → 4 → 1 → 2 → 3.*

**Example 2:**  
Input: `head = [], insertVal = 5`  
Output: `[5]`  
*Explanation: The list is empty, so create a one-node circle: 5 → 5.*

**Example 3:**  
Input: `head = [1,1,1], insertVal = 2`  
Output: `[1,1,1,2]`  
*Explanation: All values are equal. 2 can be inserted anywhere. Example placement: 1 → 1 → 1 → 2 → 1.*

### Thought Process (as if you’re the interviewee)  
- **First thoughts:**  
  - Need to traverse the circular list and look for the **right insertion spot**. Since the list may wrap back to the start, pointer management is key to avoid infinite loops.
  - If `head` is `None`, just build the node self-loop and return.
  - For the general case, use two pointers: `prev` and `curr`. Start at any node (e.g., `head`, `head.next`). Keep moving until you find "insertVal fits between prev and curr".

- **When do I insert?**
  - If `prev.val ≤ insertVal ≤ curr.val`, `insertVal` fits between them (standard case in sorted order).
  - If at the "turnaround" in the circle (`prev.val > curr.val`), insert if `insertVal` is either >= prev.val (greater than existing max), or ≤ curr.val (less than min).
  - If haven't found a place after a full loop (e.g., all values are the same), insert anywhere (e.g., after `head`).

- **Edge Handling:**  
  - Empty list: create new self-loop.
  - Duplicates: safe to insert anywhere after traversal if no place found.

- **Why this works:**  
  - The single traversal (never more than one full circle) handles all possible placements while maintaining O(1) extra space.

### Corner cases to consider  
- Empty list (`head is None`)
- Only one node in the list
- All nodes have the same value
- Insert value is less than current minimum
- Insert value is greater than current maximum
- Insert value is a duplicate of existing values
- List with multiple nodes in non-trivial circular order (not starting at min or max)

### Solution

```python
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def insert(head, insertVal):
    # Case 1: Empty list, make a self-referencing node
    if not head:
        new_node = Node(insertVal)
        new_node.next = new_node
        return new_node

    prev, curr = head, head.next
    inserted = False

    while True:
        # Standard case: insertVal goes between prev and curr
        if prev.val <= insertVal <= curr.val:
            inserted = True

        # At the "turnaround" point: prev is max, curr is min
        elif prev.val > curr.val:
            # insertVal is new min or new max
            if insertVal >= prev.val or insertVal <= curr.val:
                inserted = True

        if inserted:
            prev.next = Node(insertVal, curr)
            return head
        
        prev, curr = curr, curr.next
        # Went a full circle without inserting
        if prev == head:
            break

    # All nodes have equal value or didn't fit, insert after head (arbitrary)
    prev.next = Node(insertVal, curr)
    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - In the worst case, traverse every node in the list once (where n = number of nodes).
- **Space Complexity:** O(1)  
  - Only a constant number of pointers for traversal and a single new node allocated.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list were **doubly** circular instead of singly?
  *Hint: How would insertion logic differ with prev pointers available?*

- How to **delete** a given value from the sorted circular list?
  *Hint: What happens if target is not present or appears multiple times?*

- What if instead of **inserting just one value**, you had to insert an array of values efficiently?
  *Hint: How could you minimize traversals or combine insertions?*

### Summary
This solution revolves around **circular linked list traversal** with careful pointer management. The key pattern is recognizing the **transition point** between maximum and minimum values and handling edge cases (empty, all-equal, min/max position). This traversal and pointer patching approach is common in various data structure manipulation problems involving circular or tricky pointer links, and applying it here reliably maintains sorted order through single pass O(n) logic.