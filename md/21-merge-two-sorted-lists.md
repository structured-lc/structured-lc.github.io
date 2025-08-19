### Leetcode 21 (Easy): Merge Two Sorted Lists [Practice](https://leetcode.com/problems/merge-two-sorted-lists)

### Description  
Given the heads of two **sorted** singly linked lists, merge them into a single sorted linked list by splicing together the nodes of the lists (do not create new nodes—rearrange existing ones). Return the head of the merged linked list.

### Examples  

**Example 1:**  
Input: `list1 = [1,2,4], list2 = [1,3,4]`  
Output: `[1,1,2,3,4,4]`  
*Explanation: Compare 1 and 1. Choose either, set as head. Next, compare 2 and 3. Pick smaller node each time, moving that list’s pointer forward, until both lists are exhausted. Result: merged sorted list.*

**Example 2:**  
Input: `list1 = [], list2 = []`  
Output: `[]`  
*Explanation: Both lists are empty. Return an empty list.*

**Example 3:**  
Input: `list1 = [], list2 = `  
Output: ``  
*Explanation: Only list2 has elements. Return list2 as is.*

### Thought Process (as if you’re the interviewee)  
First, since both lists are individually sorted in non-decreasing order, I can use a **two-pointer approach** with a dummy node (sentinel) to simplify list merging.

**Brute-force:**  
- Extract all values, combine into a Python list, sort and create a new linked list (inefficient, O(n log n) time and O(n) extra space—not allowed since node creation is restricted).

**Optimized (In-place merging):**  
- Walk through both lists with two pointers.
- At each step, compare the node values; choose the smaller, attach it to our merged list, and move that pointer forward.
- Continue until reaching the end of one list, then append the remainder of the other list directly (since it's already sorted).
- This reuses the existing nodes and ensures O(1) extra space (apart from the dummy node).

**Why this approach?**
- Simple, linear, only O(n + m) time (n, m = lengths of lists).
- O(1) space since we rearrange pointers and do not allocate new list nodes.

### Corner cases to consider  
- Both lists are empty.
- Only one of the lists is empty.
- All nodes in one list smaller than any in the other.
- Lists with duplicate, or all equal, elements.
- Lists with only 1 element.
- Negative values and large/small values at ends.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1, list2):
    # Dummy node to standardize the process
    dummy = ListNode()
    tail = dummy

    # Traverse both lists
    while list1 and list2:
        if list1.val < list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        # Move the tail forward
        tail = tail.next

    # If there are remaining nodes in either list, append them
    if list1:
        tail.next = list1
    elif list2:
        tail.next = list2

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), since we visit every node in both lists precisely once.
- **Space Complexity:** O(1), as we only use a few pointers (no new nodes or extra data structures).
  - This does **not** count input/output size; the only extra node is 'dummy', which is necessary for merging logic.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we had to merge _k_ sorted linked lists?
  *Hint: Could you use a min-heap to always get the smallest head node among all lists?*

- Can you do it recursively?
  *Hint: Try using recursion by picking the smaller head, then merging the rest—what’s the extra cost?*

- How would you merge two sorted doubly linked lists or circular lists in place?
  *Hint: How do pointer manipulations differ from singly linked list merging?*

### Summary
This problem demonstrates the **two-pointer** and **dummy node** design patterns, both commonly used for merging linked lists or solving problems that involve manipulating list nodes in-place. The approach makes use of the sorted property for efficient merging. The same principles apply when merging k sorted lists (often with a heap) or linked lists in various structures (doubly/circular, etc.), making this a foundational algorithm for data structure interviews.

### Tags
Linked List(#linked-list), Recursion(#recursion)

### Similar Problems
- Merge k Sorted Lists(merge-k-sorted-lists) (Hard)
- Merge Sorted Array(merge-sorted-array) (Easy)
- Sort List(sort-list) (Medium)
- Shortest Word Distance II(shortest-word-distance-ii) (Medium)
- Add Two Polynomials Represented as Linked Lists(add-two-polynomials-represented-as-linked-lists) (Medium)
- Longest Common Subsequence Between Sorted Arrays(longest-common-subsequence-between-sorted-arrays) (Medium)
- Merge Two 2D Arrays by Summing Values(merge-two-2d-arrays-by-summing-values) (Easy)