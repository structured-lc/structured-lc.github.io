### Leetcode 1171 (Medium): Remove Zero Sum Consecutive Nodes from Linked List [Practice](https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list)

### Description  
Given the head of a singly linked list, remove all **consecutive sequences** of nodes that sum to 0.  
Repeat this process until there are no more such sequences left in the list.  
Return the head of the resulting linked list.

You must deal with the fact that removing one zero-sum sequence may create a new zero-sum sequence, so the operation is repeated until the list is stable.

### Examples  

**Example 1:**  
Input: `head = [1,2,-3,3,1]`  
Output: `[3,1]`  
*Explanation: The sequence `[2,-3,3]` sums to 2 + (-3) + 3 = 2. However, `[1,2,-3]` sums to 0, so these three nodes are removed first, giving `[3,1]`.*

**Example 2:**  
Input: `head = [1,2,3,-3,4]`  
Output: `[1,2,4]`  
*Explanation: `[3,-3]` sums to 0 and is removed, leaving `[1,2,4]`.*

**Example 3:**  
Input: `head = [1,2,3,-3,-2]`  
Output: `[1]`  
*Explanation: The sequence `[2,3,-3,-2]` sums to 0 and is removed, leaving only `[1]`.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  For every possible pair of start and end nodes in the linked list, compute the sum of the sublist. If it’s zero, remove those nodes. Do this repeatedly until no more sequences can be removed.  
  Trade-off: This is **O(n³)** and infeasible for large lists.
  
- **Optimized Approach (Prefix Sums + Hash Map):**  
  - The key trick is to use **prefix sums**:  
    - Traverse the list, keeping a running sum (the prefix sum).
    - If the same prefix sum is seen again at a later node, the nodes in between sum to zero.
    - Use a hash map to record the latest occurrence of each prefix sum.
  - In the first pass, build a map from prefix sum value to node.
  - In the second pass, again calculate prefix sums and use the map to "jump" over zero-sum sequences by adjusting the `next` pointers.
  - This gives **O(n) time** and **O(n) space**.
  
- **Why this works:**  
  Since we always keep the latest occurrence of each prefix sum, all nodes in between must sum to zero.

### Corner cases to consider  
- The entire list sums to zero: `[1,-1]` ⇒ `[]`
- No zero-sum subarrays: `[5,6,7]` ⇒ `[5,6,7]`
- Multiple overlapping zero-sum sequences: `[0,0]`, `[1,2,-3,3,1]`
- Leading or trailing zero-sum sequences: `[0,1,2]` or `[1,2,0]`
- Single node with value 0: `` ⇒ `[]`
- All negative or all positive values

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeZeroSumSublists(head: ListNode) -> ListNode:
    # Dummy node to simplify edge case handling
    dummy = ListNode(0)
    dummy.next = head

    # First pass: compute prefix sums and remember their last occurrence
    prefix_sum = 0
    node = dummy
    prefix_map = {}
    while node:
        prefix_sum += node.val
        prefix_map[prefix_sum] = node
        node = node.next

    # Second pass: remove zero-sum sequences
    prefix_sum = 0
    node = dummy
    while node:
        prefix_sum += node.val
        # Jump to the last occurrence of this prefix sum
        # Everything in between sums to zero, so skip them
        node.next = prefix_map[prefix_sum].next
        node = node.next

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Two full passes through the list; each pass is linear in the number of nodes.

- **Space Complexity:** O(n)  
  The hash map stores a prefix sum for each unique position in the list. Additional constant space for pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adjust the solution if you needed to **return all zero-sum segments** instead of removing them?  
  *Hint: Store start and end pointers for each zero-sum segment found during prefix sum traversal.*

- Can you solve this with **O(1) extra space** (not counting input/output)?
  *Hint: Think about in-place manipulations, but be wary of efficiency trade-offs.*

- How does this concept apply to arrays?  
  *Hint: The prefix sum hash map approach is directly applicable to arrays.*

### Summary
This problem uses the "prefix sum with hashmap" pattern, a powerful tool for detecting zero-sum subarrays and efficiently skipping or removing them in linear time. The approach is broadly useful for many subarray/sublist sum detection problems, both in lists and arrays. The two-pass method (building a lookup, then making actual modifications) is also a common interview technique for problems requiring complex skip logic without backing up data structures.


### Flashcard
Use prefix sums and a hash map to detect and remove zero-sum consecutive node sequences in a single pass over the linked list.

### Tags
Hash Table(#hash-table), Linked List(#linked-list)

### Similar Problems
- Delete N Nodes After M Nodes of a Linked List(delete-n-nodes-after-m-nodes-of-a-linked-list) (Easy)