### Leetcode 147 (Medium): Insertion Sort List [Practice](https://leetcode.com/problems/insertion-sort-list)

### Description  
Given the **head** of a singly linked list, sort the list using **insertion sort**, and return the head of the sorted list.

Insertion sort processes each node of the list one-by-one. At each step:
- It “removes” one node from the original list,
- Finds its correct position in an already-sorted part of the list,
- Inserts it there.

You keep growing the sorted portion until all nodes from the original list have been processed. This is especially natural for linked lists, as insertions and removals do not require shifting other elements.

### Examples  

**Example 1:**  
Input: `head = [4,2,1,3]`  
Output: `[1,2,3,4]`  
*Explanation:  
Start with 4 (sorted list: 4).  
Pick 2: insert before 4 (sorted: 2→4).  
Pick 1: insert at start (sorted: 1→2→4).  
Pick 3: insert between 2 and 4 (sorted: 1→2→3→4).*

**Example 2:**  
Input: `head = [-1,5,3,4,0]`  
Output: `[-1,0,3,4,5]`  
*Explanation:  
Start with -1 (sorted: -1).  
Pick 5: insert after -1 (sorted: -1→5).  
Pick 3: insert between -1 and 5 (sorted: -1→3→5).  
Pick 4: insert between 3 and 5 (sorted: -1→3→4→5).  
Pick 0: insert before -1 (sorted: 0→-1→3→4→5).*

**Example 3:**  
Input: `head = [1]`  
Output: `[1]`  
*Explanation:  
Single node is already sorted.*

### Thought Process (as if you’re the interviewee)  
Let’s walk through an approach:

- **Brute-force:**  
  For each node, find where it fits in the already sorted part. This feels very natural on linked lists.
- **Implementation concerns:**
  - We need careful pointer manipulation, especially for inserting at head or middle.
  - Use a *dummy pre-head* node to handle head insertions smoothly.
- **Why insertion sort is suitable:**  
  Unlike arrays (where insertions shift many elements), linked lists allow constant time inserts/relinks if you have the right pointer.
- We walk the full sorted part for each insertion, so this will be O(n²) in the worst case.  
- Simpler than alternatives (e.g., merge sort for O(n log n)), but that’s not required here.

### Corner cases to consider  
- Empty list (`head=None`).
- Single-node list.
- Already sorted list.
- List sorted in full reverse order.
- All elements equal.
- Nodes with negative or very large/small values.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def insertionSortList(head):
    # Dummy node simplifies edge cases (like inserting at head)
    dummy = ListNode(0)
    curr = head
    
    while curr:
        prev = dummy
        # Find where to insert the current node
        while prev.next and prev.next.val < curr.val:
            prev = prev.next
        
        # Save next node to process before rearrangement
        next_temp = curr.next
        # Insert curr between prev and prev.next
        curr.next = prev.next
        prev.next = curr
        # Move to the next node in original list
        curr = next_temp
    
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²) in the worst case (e.g., reverse-sorted input), because for each of n nodes, we may scan up to n nodes to find the insertion position.
- **Space Complexity:**  
  O(1) extra space (besides input), since sorting is done in-place using only a few pointer variables (dummy, curr, prev, next_temp).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you sort the linked list in O(n log n) time?
  *Hint: What is a good O(n log n) sort for linked lists? Think merge sort using recursion and list splitting.*
- Can this solution be adapted for a doubly linked list? Is it more efficient?
  *Hint: You can traverse in both directions, but for insertion, forward traversal suffices.*
- How would you sort the list if values could be extremely large or unknown in range?
  *Hint: Does that affect the algorithm choice? What if you wanted to use counting/radix sort?*

### Summary
We used the **insertion sort** algorithm, leveraging the flexibility of linked lists to perform in-place inserts efficiently. This problem is a classic for practicing pointer manipulation and careful edge case handling with dummy nodes. The pattern—using dummy nodes for easy head insertions and stepwise building of a sorted partial list—is common, and appears in several linked list sorting and manipulation problems.


### Flashcard
For each node, find its correct spot in the sorted part using pointer manipulation; use a dummy head to simplify insertions.

### Tags
Linked List(#linked-list), Sorting(#sorting)

### Similar Problems
- Sort List(sort-list) (Medium)
- Insert into a Sorted Circular Linked List(insert-into-a-sorted-circular-linked-list) (Medium)