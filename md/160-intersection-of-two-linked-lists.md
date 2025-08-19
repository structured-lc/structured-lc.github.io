### Leetcode 160 (Easy): Intersection of Two Linked Lists [Practice](https://leetcode.com/problems/intersection-of-two-linked-lists)

### Description  
Given the heads of two singly linked lists, determine if the two lists intersect and return the node where the intersection begins. Intersection is defined by reference, not by value: nodes are considered intersecting if they are the *same* object in memory, not just equal in value. The linked lists may have different lengths, and there are no cycles in either list. If the lists do not intersect, return `None`.

### Examples  

**Example 1:**  
Input:  
`ListA = [4,1,8,4,5], ListB = [5,0,1,8,4,5]`  
intersection at value `8`  
Output: `Node(8)`  
*Explanation: Traversing from the head of A: 4 → 1 → 8 → 4 → 5.  
Traversing from the head of B: 5 → 0 → 1 → 8 → 4 → 5.  
Both lists merge at node with value 8.*

``` 
ListA: 4 → 1
             ↘
               8 → 4 → 5
             ↗
ListB: 5 → 0 → 1
```

**Example 2:**  
Input:  
`ListA = [0,9,1,2,4], ListB = [3,2,4]`  
intersection at value `2`  
Output: `Node(2)`  
*Explanation:  
ListA: 0 → 9 → 1 → 2 → 4  
ListB: 3 → 2 → 4  
Lists merge at node with value 2.*

```
ListA: 0 → 9 → 1
               ↘
                 2 → 4
               ↗
ListB:     3
```

**Example 3:**  
Input:  
`ListA = [2,6,4], ListB = [1,5]`  
Output: `None`  
*Explanation: No intersection between the two lists. Both lists are disjoint.*

```
ListA: 2 → 6 → 4

ListB: 1 → 5
```

### Thought Process (as if you’re the interviewee)  
- First, the brute-force approach is to compare each node from ListA to each node in ListB to see if any node addresses match. This results in O(m \* n) time complexity, which is inefficient for large lists.
- A better approach involves the following insight: If you traverse both lists and align their ends, the intersection, if any, will occur when the two pointers reference the same node for the first time.
- One simple method to do this is to use two pointers, `a` and `b`, starting at the heads of each list. As you traverse, whenever a pointer reaches the end of one list, redirect it to the head of the other list. By the time both pointers have traversed the same number of nodes (m + n), either both will meet at the intersection or both reach the end (`None`).
- This approach works because switching heads synchronizes the remaining lengths for both pointers, effectively skipping the difference in list sizes without explicitly computing lengths.
- The trade-off: It is easy to implement, needs no extra space, and is optimal in both time and space. No modifications to the input lists are needed.

### Corner cases to consider  
- One or both lists are empty (head is `None`)
- No intersection at all (disjoint lists)
- Lists intersect right at the head node (full overlap)
- Intersection occurs at the last node
- Lists of very different lengths

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def getIntersectionNode(headA: ListNode, headB: ListNode) -> ListNode:
    # Use two pointers
    if not headA or not headB:
        return None
    a, b = headA, headB
    
    # Traverse both lists. On reaching the end, jump to the other head.
    # If lists intersect, pointers meet at intersection; else, both reach None.
    while a is not b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a  # Intersection node or None
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m and n are the lengths of the two lists. Each pointer traverses each list exactly once.
- **Space Complexity:** O(1), since no extra space is used beyond the two pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the linked lists may have cycles?
  *Hint: Can you detect cycles and handle them before searching for intersection?*

- How would you approach if the lists are extremely long and space is not an issue?
  *Hint: Using a hash set to store seen nodes may make it easier.*

- Can you find all intersection points if the lists intersect more than once (hypothetical)?
  *Hint: Review the structure of singly linked lists; is this even possible?*

### Summary
This problem leverages the **two-pointer** technique, a common pattern in linked lists for efficiently detecting intersections, cycles, or synchronization. The approach avoids explicit list length calculations and extra space, making it optimal for both time and memory. The pointer-switching trick is reusable for problems involving unequal length data structures and detecting overlap in list traversal.

### Tags
Hash Table(#hash-table), Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Minimum Index Sum of Two Lists(minimum-index-sum-of-two-lists) (Easy)