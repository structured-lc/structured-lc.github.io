### Leetcode 23 (Hard): Merge k Sorted Lists [Practice](https://leetcode.com/problems/merge-k-sorted-lists)

### Description  
Given an **array of k sorted linked lists**, merge all of them into a single sorted linked list and return its head.  
Each of the `k` lists is individually sorted in ascending order. The result should also be sorted.

### Examples  

**Example 1:**  
Input: `lists = [[1,4,5],[1,3,4],[2,6]]`  
Output: `[1,1,2,3,4,4,5,6]`  
*Explanation:*
- All input lists are already sorted.
- After merging, the full sorted list is: 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6.

**Example 2:**  
Input: `lists = []`  
Output: `[]`  
*Explanation:*
- No lists to merge, so the result is an empty list.

**Example 3:**  
Input: `lists = [[]]`  
Output: `[]`  
*Explanation:*
- The only input list is empty, so the result is empty.


### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  - Combine all linked lists into a single list.
  - Sort all node values.
  - Create and return a new sorted linked list.
  - *Downside:* This disregards that the input lists are sorted and takes O(n log n) time (where n is total nodes).

- **Iterative/Pairwise Merging (Merge Sort style):**  
  - Merge two lists at a time, pairwise, until all are merged.
  - Similar to the merging step in merge sort, thus more efficient.
  - *Time:* O(n log k) since we're always halving the number of lists.

- **Heap/Priority Queue Approach (Most Efficient):**  
  - Use a min-heap to always get the smallest head node across k lists.
  - Push the head of each non-empty list into the heap at the beginning.
  - Each extraction gives the smallest node; push the next node from the same list if not null.
  - This minimizes re-sorting and is optimal for merging multiple sorted inputs.
  - *Best for both time and space for this specific scenario.*  


### Corner cases to consider  
- All lists are empty: `lists = []`
- Some lists are empty: `lists = [[], [1], []]`
- Only one list: `lists = [[1,2,3]]`
- Lists with only one element
- Duplicate values across lists
- Very large k (number of lists)
- Different list lengths

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

import heapq

def mergeKLists(lists):
    # Heap will contain (node value, list index, node) to avoid comparing ListNode directly
    min_heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(min_heap, (node.val, i, node))  # (value, which list it came from, node)
    dummy = ListNode(0)
    current = dummy
    while min_heap:
        val, i, node = heapq.heappop(min_heap)
        current.next = node
        current = current.next
        if node.next:
            heapq.heappush(min_heap, (node.next.val, i, node.next))
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k)
  - Each node is pushed and popped from the heap once.
  - Heap size is at most k at any time.
  - There are n total nodes (sum of all list lengths).
  - For each node: push/pop cost is O(log k).

- **Space Complexity:** O(k)
  - The heap stores at most k elements at any time.
  - No extra storage outside of the output list.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input lists are very large and cannot be all held in memory?
  *Hint: Can you process lists as streams, or use external/iterative merging?*

- How would this change if the lists are not linked lists but sorted arrays?
  *Hint: Heaps and k-way array merge (like merge step of k-way mergesort) is still possible.*

- Could you do this in place, reusing the input nodes and not allocating new ones?
  *Hint: Can you adjust the pointers directly instead of creating a new node each time?*

### Summary
This problem is a classic **k-way merge**, most efficiently solved with a min-heap to always pick the smallest of the current list heads—yielding O(n log k) time.  
The pattern used here extends naturally to merging sorted arrays, external sorting, and streaming data sources.  
It’s a prototypical heap/priority queue and merge-sort application for algorithmic interviews and high-performance data merging.

### Tags
Linked List(#linked-list), Divide and Conquer(#divide-and-conquer), Heap (Priority Queue)(#heap-priority-queue), Merge Sort(#merge-sort)

### Similar Problems
- Merge Two Sorted Lists(merge-two-sorted-lists) (Easy)
- Ugly Number II(ugly-number-ii) (Medium)
- Smallest Subarrays With Maximum Bitwise OR(smallest-subarrays-with-maximum-bitwise-or) (Medium)