### Leetcode 725 (Medium): Split Linked List in Parts [Practice](https://leetcode.com/problems/split-linked-list-in-parts)

### Description  
Given the head of a singly linked list and an integer k, split the list into k consecutive parts as equally as possible.  
- If the number of nodes is not a multiple of k, the earlier parts should have an extra node.  
- Parts must be ordered as in the original list, and any part corresponding to extra slots after the list runs out should be null.
- Return an array of k parts (heads of linked lists), where the size difference between parts is at most 1.  

### Examples  

**Example 1:**  
Input: head = `[1, 2, 3]`, k = `5`  
Output: `[[1], [2], [3], [], []]`  
*Explanation: The linked list has 3 nodes but k is 5. The first three parts get 1 node each, and the last two are empty.*

**Example 2:**  
Input: head = `[1,2,3,4,5,6,7,8,9,10]`, k = `3`  
Output: `[[1,2,3,4], [5,6,7], [8,9,10]]`  
*Explanation: 10 nodes split into 3 parts means each should get ⌊10/3⌋ = 3 nodes, with the first 10 % 3 = 1 part getting an extra node. So: 4,3,3 nodes respectively.*

**Example 3:**  
Input: head = `[]`, k = `3`  
Output: `[[], [], []]`  
*Explanation: Empty list, so each part is an empty list.*

### Thought Process (as if you’re the interviewee)  
- First, count the total number of nodes in the linked list.
- Use integer division to determine the minimum nodes per part: ⌊n/k⌋.
- The remainder (n % k) tells us how many parts should have an extra node; these will be the first r parts.
- Traverse the list again, chopping it into k parts:
  - For each part, set its length as base length + 1 if this part is among the first r.
  - Detach each part by setting the tail’s next to None.
- If k > n, fill the remaining parts with None.
- This approach is straightforward, and with two passes (count + split), it is highly efficient.

### Corner cases to consider  
- List is empty (head is None).
- k > number of nodes (some parts will be empty).
- k = 1 (return the entire list in one part).
- Number of nodes is a multiple of k (all parts are equal size).
- k = length of list (each node is its own part).
- List contains only one node.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def splitListToParts(head, k):
    # 1. Count total nodes
    n = 0
    curr = head
    while curr:
        n += 1
        curr = curr.next

    size, remainder = divmod(n, k)
    result = []
    curr = head

    for i in range(k):
        part_head = curr
        # Determine the length needed for this part
        length = size + (1 if i < remainder else 0)
        for j in range(length - 1):
            if curr:
                curr = curr.next

        if curr:
            next_part = curr.next
            curr.next = None  # Detach this part
            curr = next_part

        result.append(part_head)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — two full passes: one to count nodes, one to split.
  - Counting: O(n)
  - Splitting: O(n)
- **Space Complexity:** O(k) for the result list (excluding input/output), O(1) extra otherwise.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list is doubly linked?
  *Hint: Detaching is still O(1), but the splitting logic is similar.*

- What if the list is extremely large and cannot be fully stored in memory at once?
  *Hint: Think about streaming algorithms, but splitting in-place may be a challenge.*

- How would you modify the function if you must return deep copies of each part, rather than splitting in place?
  *Hint: Copy nodes while traversing and construct new lists instead of detaching originals.*

### Summary
The approach uses an initial traversal to count nodes, computes partition sizes using division and remainder, then splits the list with another pass, ensuring all parts’ sizes differ by no more than 1 and preserving order.  
This split-divide pattern (partitioning based on counts and remainders) is common and can be applied to string or array partitioning and work allocation problems.

### Tags
Linked List(#linked-list)

### Similar Problems
- Rotate List(rotate-list) (Medium)
- Odd Even Linked List(odd-even-linked-list) (Medium)
- Split a Circular Linked List(split-a-circular-linked-list) (Medium)