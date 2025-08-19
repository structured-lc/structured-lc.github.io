### Leetcode 817 (Medium): Linked List Components [Practice](https://leetcode.com/problems/linked-list-components)

### Description  
Given a singly linked list of **unique integer values**, and an integer array `nums` (which is a subset of the linked list's values), return the **number of connected components** in the linked list that are entirely made of nodes whose values are in `nums`.  
A **connected component** is defined as a maximal sequence of consecutive nodes in the linked list, all of whose values belong to `nums`. Two values are considered part of the same component if they are adjacent in the linked list and both appear in `nums`.

### Examples  

**Example 1:**  
Input: `head = [0,1,2,3]`, `nums = [0,1,3]`  
Output: `2`  
*Explanation: The linked list looks like `0 → 1 → 2 → 3`. The values from `nums` appear as `[0,1]` (consecutive) and `[3]` (alone). So, there are 2 connected components: [0,1] and [3].*

**Example 2:**  
Input: `head = [0,1,2,3,4]`, `nums = [0,3,1,4]`  
Output: `2`  
*Explanation: The linked list is `0 → 1 → 2 → 3 → 4`. The nodes from `nums` form the following components: [0,1] (consecutive) and [3,4] (consecutive). So, answer is 2.*

**Example 3:**  
Input: `head = [1,2,0,4,3]`, `nums = [3,4,0,2,1]`  
Output: `1`  
*Explanation: All elements in the linked list are included in `nums`, and are all connected, so there is a single connected component (the whole list).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each value in `nums`, scan the linked list, and for each node check if its value and any adjacent node also belong to `nums`. This is inefficient because we would scan the list repeatedly.

- **Optimized approach:**  
  Convert `nums` to a **set** for O(1) lookups.  
  Traverse the linked list **once**. Whenever a node's value is in the set, and either it's the start of the list or its previous node is not in the set, it's the **start of a new component**. Increment the component count in this case.

  **Trade-offs:**  
  - The set allows O(1) existence checks.
  - One traversal is O(N), where N is the length of the linked list.
  - No extra overhead except the set.

### Corner cases to consider  
- The linked list is empty (head is `None`).
- `nums` contains only one value.
- `nums` contains all values of the linked list.
- `nums` is empty (should return 0).
- All components are single-node (no two nums are adjacent in the list).
- The head or tail node is in `nums`.

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def numComponents(head, nums):
    # Store nums in a set for O(1) membership checking
    num_set = set(nums)
    count = 0
    in_component = False
    node = head

    while node:
        # If current node is in nums, check if it's the start of a component
        if node.val in num_set:
            if not in_component:
                count += 1
                in_component = True
        else:
            in_component = False
        node = node.next

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of nodes in the linked list. We only traverse the list once.
- **Space Complexity:** O(G), where G is the length of `nums`, used for the set storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the linked list values are not unique?  
  *Hint: How does this affect knowing which nodes belong to which components?*

- How would you change the solution if adjacency is defined not just as consecutive nodes, but by some other rule?  
  *Hint: Consider alternative component definitions (like edges given in an extra list).*

- Can you solve this problem in constant space (without using an additional set)?  
  *Hint: Is it possible if the values are in a limited range or if the list can be modified?*

### Summary
This approach uses the **set** pattern and a **linear traversal** with a simple state variable to detect transitions between inside/outside valid components. The pattern (set for O(1) membership, scan for state change) appears in component labeling, consecutive segment problems, and island counting in arrays/graphs. It's broadly applicable wherever we process intervals or groupings in linear data with membership criteria.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list)

### Similar Problems
- Merge Nodes in Between Zeros(merge-nodes-in-between-zeros) (Medium)