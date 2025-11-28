### Leetcode 3217 (Medium): Delete Nodes From Linked List Present in Array [Practice](https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array)

### Description  
Given a singly linked list and an array of unique integers `nums`, remove every node from the linked list whose value appears in `nums`.  
Return the modified linked list's head after these deletions are performed.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`, `head = [1, 2, 3, 4, 5]`  
Output: `[4, 5]`  
*Explanation: Remove nodes with values 1, 2, and 3 since they're present in nums.*

**Example 2:**  
Input: `nums = [1]`, `head = [1, 2, 1, 2, 1, 2]`  
Output: `[2, 2, 2]`  
*Explanation: Remove all nodes with the value 1; only nodes with value 2 remain.*

**Example 3:**  
Input: `nums = [5]`, `head = [1, 2, 3, 4]`  
Output: `[1, 2, 3, 4]`  
*Explanation: No node matches the value 5 in nums, so the list is unchanged.*

### Thought Process (as if you’re the interviewee)  

- **Naive/brute-force:**  
  For each node in the linked list, loop through `nums` to check if node.val matches any value in `nums`. If it does, remove it.  
  - This approach has O(n × m) time complexity (where n = length of list, m = length of nums), which is inefficient for larger data sizes.

- **Optimized approach:**  
  Store all elements of `nums` in a set for O(1) value lookup.  
  - Traverse the list with a dummy node as the predecessor of head (to handle head removals conveniently).
  - For each node, if its value is in the set, unlink (remove) it by skipping it in the previous node's next pointer. Otherwise, advance to the next node.
  - Using a set allows O(1) avg lookup per node and the dummy node simplifies head-edge case logic.

- **Why this is preferred:**  
  This method brings overall time complexity down to O(n + m) and no nested loops. Using a set for constant-time lookup is a common optimal pattern for "remove if exists" type questions.

### Corner cases to consider  
- The head node's value is to be deleted (one or multiple times in a row).
- No nodes to delete (nums contains no list values).
- All list nodes are to be deleted (nums covers every value in the list).
- The linked list contains only one node.
- `nums` has only one value.
- Duplicate node values in the linked list.
- After deletions, the resulting list is empty.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteNodes(head, nums):
    # Convert nums array to a set for O(1) lookups
    remove_set = set(nums)
    
    # Initialize a dummy node to handle deletions at the head
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    current = head
    
    while current:
        if current.val in remove_set:
            # Remove current node by adjusting pointers
            prev.next = current.next
        else:
            # Move prev only if current node is not deleted
            prev = current
        current = current.next

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the number of linked list nodes and m is the size of nums.  
  - Creating the set costs O(m).
  - Traversing the list and removals cost O(n).

- **Space Complexity:** O(m), for storing nums as a set.  
  - No extra space used per node in the linked list aside from the dummy node and set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input list can contain extremely large values or negative values?  
  *Hint: Would the space usage of the set solution still scale well?*

- How would you delete nodes if you didn’t have unique values in nums?  
  *Hint: How would lookup/set logic change?*

- Can you perform the operation in-place with O(1) additional memory if `nums` is guaranteed to be very small?  
  *Hint: Direct (possibly repeated) linear scans on the array may be acceptable for small fixed sizes.*

- How does your approach handle a cyclic linked list?  
  *Hint: Would the algorithm terminate?*

### Summary
This problem demonstrates the two-pointer/deletion pattern for singly linked lists, using a dummy node for simpler head management and a set for fast existence checks.  
It's a staple of linked list manipulation, and the set-based lookup pattern applies in any scenario where removal or filtering is based on a value set (examples: delete duplicates, whitelist/blacklist filtering, etc).


### Flashcard
Store nums in a set for O(1) lookup; traverse linked list with dummy node, skipping nodes whose values are in the set.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list)

### Similar Problems
- Remove Linked List Elements(remove-linked-list-elements) (Easy)
- Delete Node in a Linked List(delete-node-in-a-linked-list) (Medium)
- Remove Nodes From Linked List(remove-nodes-from-linked-list) (Medium)