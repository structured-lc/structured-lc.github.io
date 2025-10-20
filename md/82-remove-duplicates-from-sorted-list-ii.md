### Leetcode 82 (Medium): Remove Duplicates from Sorted List II [Practice](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii)

### Description  
Given the head of a sorted linked list, remove all nodes that contain duplicate numbers, leaving only distinct numbers from the original list. In other words, if a number appears more than once in the original list, all its occurrences should be removed. Return the new head of the modified linked list, which should remain sorted.

### Examples  

**Example 1:**  
Input: `1→2→3→3→4→4→5`  
Output: `1→2→5`  
*Explanation: The values 3 and 4 appear more than once, so remove all their nodes. Only nodes with values 1, 2, and 5 remain.*

**Example 2:**  
Input: `1→1→1→2→3`  
Output: `2→3`  
*Explanation: The value 1 appears three times, so remove all nodes with value 1. Only nodes with values 2 and 3 remain.*

**Example 3:**  
Input: `1→1`  
Output: *(empty list)*  
*Explanation: Both nodes have value 1, which is duplicated, so all are removed.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  I could use a hash map or dictionary to count occurrences of each value, then do a second pass to build a new list with only values with count 1. However, this uses extra storage and doesn’t leverage the fact that the list is already sorted.

- **Optimized approach:**  
  Since the list is sorted, duplicate values are always adjacent.  
  - I’ll use a dummy node before head for easy edge case handling.  
  - Maintain a pointer (`prev`) before the sequence being examined and another (`cur`) to traverse the list.  
  - As I move through the list, whenever I find nodes where cur.val == cur.next.val, I’ll detect all nodes with that value and skip the entire block.  
  - If there’s no duplicate (i.e., single occurrence), move prev forward.  
  - This is done in one pass and with constant extra space.  
  - Dummy node helps remove duplicates at the head of the list.

**Trade-offs:**  
- No extra data structure is needed; uses O(1) space.
- Handles all cases in a single sweep.

### Corner cases to consider  
- List is empty (`head = None`)
- All values are unique
- All values are duplicates (should return empty list)
- Only one node in the list
- Duplicates at the start or end of the list
- Long streak of duplicates
- Only two nodes, both the same

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteDuplicates(head):
    # Dummy node to handle edge cases easily
    dummy = ListNode(0)
    dummy.next = head

    # prev - last confirmed unique node
    prev = dummy
    cur = head

    while cur:
        # Detect duplicates
        duplicate = False
        while cur.next and cur.val == cur.next.val:
            # Skip nodes with same value
            cur = cur.next
            duplicate = True

        if duplicate:
            # Skip all duplicates
            prev.next = cur.next
        else:
            # Attach prev to current unique node
            prev = prev.next
        cur = cur.next

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the list. Each node is visited at most twice: once when scanning for duplicates and (if unique) when linking.
- **Space Complexity:** O(1) extra space. Only constant pointers are used; the list is modified in place.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the list is **not sorted**?  
  *Hint: You might have to use a hashmap to count frequencies in O(n) space and two passes through the list.*

- Can you remove duplicates **in place without extra space** for an unsorted list?  
  *Hint: It's tricky — for singly linked, you'd need O(n²) time if you avoid extra space.*

- How would you solve it if you can only make **one pass**, but you must not create or use a dummy node?  
  *Hint: Watch out for head pointer manipulation and early duplicate blocks.*

### Summary
This problem uses the **linked list two-pointer** pattern with a **dummy node** for edge-case handling. It leverages the sorted property to detect duplicates efficiently. The exact logic can be reused in other linked list deduplication or node-removal tasks, especially when adjacent groupings of data must be processed. Patterns like dummy node usage, one-pass traversal, and skip-over/rewire are very common for linked list questions.


### Flashcard
Use a dummy node and pointers to skip all nodes with duplicate values, ensuring only unique elements remain in the sorted list.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Remove Duplicates from Sorted List(remove-duplicates-from-sorted-list) (Easy)
- Remove Duplicates From an Unsorted Linked List(remove-duplicates-from-an-unsorted-linked-list) (Medium)