### Leetcode 2046 (Medium): Sort Linked List Already Sorted Using Absolute Values [Practice](https://leetcode.com/problems/sort-linked-list-already-sorted-using-absolute-values)

### Description  
Given a singly linked list, each node's value is *sorted by the absolute values* in non-decreasing order. Your task is to re-sort the list so that it's sorted by the *actual values* in non-decreasing order.  
For example, values like -2 and 2 are both considered “2” for the original sort; after sorting, all negatives must come before positives.

### Examples  

**Example 1:**  
Input: `[0,2,-5,5,10,-10]`  
Output: `[-10,-5,0,2,5,10]`  
*Explanation: By absolute value, the nodes are sorted as [0,2,-5,5,10,-10]. Sorting by actual values gives [-10,-5,0,2,5,10].*

**Example 2:**  
Input: `[0,1,2]`  
Output: `[0,1,2]`  
*Explanation: The list is already sorted by value, so no change.*

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
*Explanation: Single node, nothing to change.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Copy all values, sort, and rebuild the linked list, but that uses O(n) space for the copy and O(n log n) time for sorting.
- **Optimized:** Given the absolute value sorting, all negative values (if any) appear after their positive counterparts and are in decreasing order. If we traverse the list, *whenever we find a negative*, it must be moved to the head (like reversing their order).  
- Walk the list from the second node:
  - If curr is negative, detach curr and insert it before head.
  - Otherwise, move the pointer forward.
- This approach only needs a single pass and O(1) space because we reverse the negative segment in place by inserting negatives at the head.  
- This solves the problem in O(n) time and O(1) space, which is optimal given constraints.

### Corner cases to consider  
- All elements positive.
- All elements negative.
- Mixed negatives and positives.
- Zeroes included.
- Only one element.
- List already sorted by value.
- Large list (performance).

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def sortLinkedList(head):
    # If the list is empty or has one node, it's already sorted
    if not head or not head.next:
        return head

    # prev: last examined node, curr: current node
    prev = head
    curr = head.next

    while curr:
        if curr.val < 0:
            # Remove curr from its place
            prev.next = curr.next
            # Insert curr at head
            curr.next = head
            head = curr
            # curr moves to the next after prev, since prev didn't move
            curr = prev.next
        else:
            # Move both pointers forward
            prev = curr
            curr = curr.next

    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each node is visited once and (possibly) moved once.
- **Space Complexity:** O(1), since the algorithm modifies the list in place and only uses a constant number of pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you adapt this solution if the list was doubly-linked?  
  *Hint: You get previous pointers, so moving is easier. Would your logic change?*

- What if you were not allowed to mutate the list and had to return a new sorted list?  
  *Hint: Consider two lists, and merge like in merge sort.*

- Could you handle the case where the list is sorted in absolute value but decreasing rather than increasing?  
  *Hint: What changes in your traversal direction or insertion?*

### Summary
This approach uses in-place pointer manipulation and a single traversal, which is a common pattern in linked list problems requiring reordering, such as reversing a sublist or partitioning based on a condition. Recognizing the structural property (negative numbers already in reverse order) allows us to achieve O(n) time and O(1) space efficiently. The in-place head insertion trick can be applied in problems like reverse linked list or partition list.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Sort List(sort-list) (Medium)