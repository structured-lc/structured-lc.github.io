### Leetcode 86 (Medium): Partition List [Practice](https://leetcode.com/problems/partition-list)

### Description  
Given the head of a singly linked list and an integer x, reorder the list so that all nodes with values **less than x** come before all nodes with values **greater than or equal to x**.  
You must **preserve the original relative order** of the nodes in both groups.

### Examples  

**Example 1:**  
Input: `head = [1,4,3,2,5,2], x = 3`  
Output: `[1,2,2,4,3,5]`  
*Explanation:  
Nodes less than 3: 1, 2, 2 (order preserved).  
Nodes ≥ 3: 4, 3, 5 (order preserved).  
Final list: concatenate those groups as [1,2,2,4,3,5].*

**Example 2:**  
Input: `head = [2,1], x = 2`  
Output: `[1,2]`  
*Explanation:  
Nodes less than 2: 1  
Nodes ≥ 2: 2  
Order preserved; result [1,2].*

**Example 3:**  
Input: `head = [2,3,5,2,6,1], x = 4`  
Output: `[2,3,2,1,5,6]`  
*Explanation:  
Nodes less than 4: 2, 3, 2, 1  
Nodes ≥ 4: 5, 6  
Result: [2,3,2,1,5,6].*

### Thought Process (as if you’re the interviewee)  
To solve this problem:
- **Brute-force idea:**  
  We could extract all node values to two arrays—one for nodes < x, and one for nodes ≥ x—then build a new linked list from both.  
  Downside: loses list structure, uses extra space; not optimal.

- **Efficient optimal approach:**  
  Use two dummy nodes to create two linked lists while traversing:  
  - One for nodes < x  
  - One for nodes ≥ x  
  For each node, append to the correct list.  
  At the end, connect the tail of the left list to the head of the right list.  
  This preserves original order in each partition, only iterates once (O(n)), and reuses nodes (O(1) extra space, besides a few pointers).

- **Why this approach:**  
  - Preserves stable order inside each partition (crucial!)  
  - Simple and clean pointer manipulation—no value copying, only relinking nodes.

### Corner cases to consider  
- List is empty (`head = None`)
- List has only one node
- All nodes < x
- All nodes ≥ x
- Nodes with value exactly equal to x mixed with smaller/greater
- x smaller or larger than all node values
- Duplicate values

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def partition(head: ListNode, x: int) -> ListNode:
    # Create two dummy heads for less and greater/equal partitions
    less_dummy = ListNode(0)
    greater_dummy = ListNode(0)
    
    # Pointers for the end of the 'less' and 'greater' partitions
    less = less_dummy
    greater = greater_dummy
    
    # Traverse the original list
    current = head
    while current:
        if current.val < x:
            # Append to less partition
            less.next = current
            less = less.next
        else:
            # Append to greater partition
            greater.next = current
            greater = greater.next
        current = current.next

    # Concatenate the two partitions
    less.next = greater_dummy.next
    # Important: terminate the last node
    greater.next = None
    
    # Return new head (skipping the dummy)
    return less_dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Visits each node exactly once.  
- **Space Complexity:** O(1) — Uses only a few pointers (dummies and runners), no extra list or arrays. The original nodes are rearranged in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this if the list must be partitioned **in-place**, without using any extra dummy nodes?  
  *Hint: You can adjust `next` pointers on the fly but careful with order and head management.*

- How would you extend this if you needed to partition based on **more than one value** (e.g., 3-way partition around two values)?  
  *Hint: Use three dummy nodes and connect sublists accordingly.*

- What if you are given a **doubly linked list**?  
  *Hint: You can use the same partitioning approach; remember to maintain both `next` and `prev` pointers.*

### Summary
This is a classic **two-pointer (dummy node)** or **partitioning** problem commonly seen in linked list questions. The pattern—building two lists and merging—is reusable in problems requiring stable partitioning while preserving order, and is widely applicable in interview scenarios that deal with in-place node rearrangements.