### Leetcode 148 (Medium): Sort List [Practice](https://leetcode.com/problems/sort-list)

### Description  
Given the head of a singly-linked list, sort the list in ascending order and return its head.  
You are required to do this **in O(n log n) time and constant space**.  
Imagine you are given a linked list as an array of nodes—since random access is not possible, you need a sorting strategy that leverages the linked structure.

### Examples  

**Example 1:**  
Input: `[4,2,1,3]`  
Output: `[1,2,3,4]`  
*Explanation: The list is broken down into sublists `[4,2]` and `[1,3]`, which are sorted recursively and then merged to form `[1,2,3,4]`.*

**Example 2:**  
Input: `[-1,5,3,4,0]`  
Output: `[-1,0,3,4,5]`  
*Explanation: The list is recursively divided and sorted. Merge sort guarantees stable sorting and good time complexity for linked lists.*

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation: An empty list remains empty after sorting.*

### Thought Process (as if you’re the interviewee)  
- First idea: Convert the linked list to an array, sort it, and rebuild. But that uses extra space and is not optimal for a pure linked list.
- Since linked lists have O(1) insert/delete but O(n) random access, **merge sort** is suitable, not quicksort or heapsort.
- Merge sort works by recursively splitting the list into halves (find the middle using **fast and slow pointers**), sorting each half, and merging them.
- This approach guarantees O(n log n) time, and because we rearrange nodes in place while merging, space is O(log n) for recursion stack (not extra nodes).
- Trade-offs: Other approaches (like insertion sort) are O(n²), which is too slow. Merge sort operates well with the pointer structure.

### Corner cases to consider  
- Empty list (`head = None`)
- List with one node only (`[x]`)
- List with all equal elements (`[2,2,2,2]`)
- Already sorted list (`[1,2,3,4]`)
- Reverse sorted list (`[4,3,2,1]`)
- List with negative and positive integers

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def sortList(head):
    # Base case: 0 or 1 node
    if not head or not head.next:
        return head

    # Step 1: Split the list into two halves
    prev, slow, fast = None, head, head
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next
    # Disconnect left half from right
    prev.next = None

    # Step 2: Sort each half recursively
    left = sortList(head)
    right = sortList(slow)

    # Step 3: Merge the sorted halves
    return merge(left, right)

def merge(l1, l2):
    dummy = ListNode(0)
    current = dummy
    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    # One of l1 or l2 could be non-null at this point
    current.next = l1 if l1 else l2
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  Each split divides the list in half (log n levels), and merging across the entire list at each level costs O(n).
- **Space Complexity:** O(log n).  
  Only the recursion stack is used for splitting, since merging is in-place and does not use extra nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you implement the sort iteratively to avoid recursion stack space?  
  *Hint: Consider bottom-up merge sort implementation for linked list.*

- How would your method change if the list was doubly-linked?  
  *Hint: With prev pointers available, splitting can be easier and merging may be more efficient.*

- What changes if the input is a circular linked list?  
  *Hint: Be careful with the terminating condition; remember to break the cycle for sorting and re-link after.*

### Summary
This problem illustrates the **divide and conquer** approach on a linked list using **merge sort**, a classic interview pattern for efficient in-place sorting when random access is not possible. The pointer-based splitting/merging is commonly re-used for other linked list manipulations, such as reordering, partitioning, and k-group reversal.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers), Divide and Conquer(#divide-and-conquer), Sorting(#sorting), Merge Sort(#merge-sort)

### Similar Problems
- Merge Two Sorted Lists(merge-two-sorted-lists) (Easy)
- Sort Colors(sort-colors) (Medium)
- Insertion Sort List(insertion-sort-list) (Medium)
- Sort Linked List Already Sorted Using Absolute Values(sort-linked-list-already-sorted-using-absolute-values) (Medium)