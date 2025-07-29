### Leetcode 83 (Easy): Remove Duplicates from Sorted List [Practice](https://leetcode.com/problems/remove-duplicates-from-sorted-list)

### Description  
Given the head of a **sorted** singly linked list, remove all duplicates so that each element appears only once.  
You need to return the head of the modified linked list.  
Duplicates will always be consecutive because the list is sorted.  
Only the next pointers need to be changed to ignore duplicate nodes; you cannot use extra space to build a new list.

### Examples  

**Example 1:**  
Input: `head = [1,1,2]`  
Output: `[1,2]`  
*Explanation: Start at the head. The first '1' has a duplicate next to it, so you skip the duplicate and point the first '1' to '2':  
```
1 → 1 → 2
↓
1 → 2
```
Result: `[1,2]`*

**Example 2:**  
Input: `head = [1,1,2,3,3]`  
Output: `[1,2,3]`  
*Explanation:  
Traverse the list:  
- The first '1' has a duplicate; remove it.  
- The '2' is not a duplicate.  
- The '3' has a duplicate; remove it.  
Final list:  
```
1 → 1 → 2 → 3 → 3
↓
1 → 2 → 3
```
Result: `[1,2,3]`*

**Example 3:**  
Input: `head = [1,2,2,2,3,4,4]`  
Output: `[1,2,3,4]`  
*Explanation:  
- '1' has no duplicate.
- '2' has two duplicates. Skip both. 
- '3' has no duplicate.
- '4' has a duplicate. Skip one.
Result: `[1,2,3,4]`*

### Thought Process (as if you’re the interviewee)  
- Since the list is sorted, any duplicates are guaranteed to be next to each other.
- I can iterate through the list with one pointer.
- For every node, I look at the next node:
  - If its value is the same, it is a duplicate, so I adjust the pointer to skip the next node (`current.next = current.next.next`).
  - If it’s different, move to the next node.
- This continues until I reach the end of the list.
- No need for extra space, as I can modify the list in-place.
- This single-pass approach is efficient: O(n) time and O(1) space.
- Trade-offs: This approach is efficient and simple because of the sorted property. If the list were not sorted, I’d need additional data structures.

### Corner cases to consider  
- Empty list (`head = None`)
- List with only one node
- List where all values are unique
- List where all values are the same (e.g., `[2,2,2,2]`)
- Alternating duplicates (e.g., `[1,1,2,2,3,3]`)
- Duplicates only at the end of the list

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteDuplicates(head):
    # Handle the case where the list is empty or has only one node
    current = head
    while current:
        # While next node exists and is a duplicate, skip it
        while current.next and current.val == current.next.val:
            current.next = current.next.next
        # Move to next node (which is now guaranteed to have a different value)
        current = current.next
    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. Each node is visited once.
- **Space Complexity:** O(1), since we are modifying the list in-place and not using any extra space (except for a pointer variable).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list is not sorted?  
  *Hint: Can you detect duplicates in a single scan if they're not consecutive?*

- Could you implement this if the list was doubly linked?  
  *Hint: Updates to backward pointers?*

- What if you had to remove **all** occurrences of duplicates (i.e., only nodes that appear once stay)?  
  *Hint: Use a sentinel node and an extra pass to build a new list.*

### Summary
This problem is a classic example of the "Linked List in-place update" pattern, leveraging the fact that the list is sorted. It's a canonical use of fast/slow or single-pointer traversal to process duplicates efficiently in a linear scan. This technique can be applied to other sorted structure deduplication scenarios and helps practice pointer manipulation in linked lists.