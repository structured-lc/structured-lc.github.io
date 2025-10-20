### Leetcode 1669 (Medium): Merge In Between Linked Lists [Practice](https://leetcode.com/problems/merge-in-between-linked-lists)

### Description  
Given two singly-linked lists, `list1` and `list2`, and two integers `a` and `b`, remove nodes from the aᵗʰ node to the bᵗʰ node (inclusive, both zero-indexed) from `list1` and insert the entire `list2` in their place. Return the resulting list's head.

### Examples  

**Example 1:**  
Input: `list1 = [0,1,2,3,4,5]`, `a = 3`, `b = 4`, `list2 = [1000000,1000001,1000002]`  
Output: `[0,1,2,1000000,1000001,1000002,5]`  
*Explanation: Remove nodes with indices 3 and 4 (values 3 and 4), connect node at index 2 to head of `list2`, tail of `list2` to node at index 5 (value 5).*  
Tree:
```
0 → 1 → 2 → 3 → 4 → 5
                 │
       ︙         ↓
   1000000 → 1000001 → 1000002
```

**Example 2:**  
Input: `list1 = [0,1,2,3,4,5,6,7,8,9]`, `a = 2`, `b = 5`, `list2 = [10,11,12]`  
Output: `[0,1,10,11,12,6,7,8,9]`  
*Explanation: Remove indices 2-5, insert list2, reconnect to index 6 (value 6).*

**Example 3:**  
Input: `list1 = [1,2]`, `a = 0`, `b = 1`, `list2 = [9, 99]`  
Output: `[9,99]`  
*Explanation: Remove both nodes, insert list2 in their place.*


### Thought Process (as if you’re the interviewee)  
- Need to find pointers to:
  - Node just before aᵗʰ (let's call it `prev_a`)
  - Node after bᵗʰ (let's call it `after_b`)
- Connect `prev_a.next` to head of `list2`.
- Find tail of `list2` and connect its `.next` to `after_b`.
- Need to handle if a = 0 (head changes), and if b is at tail.
- Single pass to find both positions (can traverse to `a-1` and `b`).


### Corner cases to consider  
- `a = 0` (entire start of `list1` replaced, so new head is `list2` head)
- `list2` is empty
- `list1` is very short (check for out-of-bounds)
- Removing till end of `list1` (b at last node)
- `a` and `b` are next to each other or equal


### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeInBetween(list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:
    # 1. Find node before the aᵗʰ node
    prev_a = list1
    if a == 0:
        prev_a = None
    else:
        for _ in range(a - 1):
            prev_a = prev_a.next
    # 2. Find node after the bᵗʰ node
    curr = list1 if prev_a is None else prev_a.next
    for _ in range(b - a + 1):
        curr = curr.next
    after_b = curr
    # 3. Connect prev_a to list2 head; or set head = list2 if a == 0
    if prev_a:
        prev_a.next = list2
        head = list1
    else:
        head = list2
    # 4. Go to tail of list2
    tail2 = list2
    while tail2.next:
        tail2 = tail2.next
    # 5. Connect tail2 to after_b
    tail2.next = after_b
    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L₁ + L₂), L₁ = len(list1), L₂ = len(list2). Each traversed at most once.
- **Space Complexity:** O(1), modifies in place. Only uses constant pointers, not extra storage.


### Potential follow-up questions (as if you’re the interviewer)  

- Can you do the merge if list2 is a circular linked list?
  *Hint: Watch for traversing indefinitely, terminate at tail.*

- What if a > b or indices are out of bounds?
  *Hint: Input validation or exception handling.*

- Could you implement with recursive approach?
  *Hint: Think carefully about tail connection—may not be as clear!*

### Summary
This is a classic linked list manipulation problem: pointer updates, edge cases around head/tail, handling external sublists. It's a key test of pointer skills for merging/splicing lists. This coding pattern is used for segment replacement, cutting and pasting linked list parts, and many interview variants.


### Flashcard
Find the nodes before aᵗʰ and after bᵗʰ in list1, then splice list2 in between them.

### Tags
Linked List(#linked-list)

### Similar Problems
