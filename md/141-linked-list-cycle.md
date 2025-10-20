### Leetcode 141 (Easy): Linked List Cycle [Practice](https://leetcode.com/problems/linked-list-cycle)

### Description  
Given the head node of a singly linked list, determine if the list contains a **cycle**—meaning, as you traverse the list via next pointers, at some point you visit the same node more than once. Return **True** if there is a cycle, and **False** otherwise.  
For example, a cycle exists if some node's next pointer points back to a previous node in the list, creating a loop that never reaches a null reference.

### Examples  

**Example 1:**  
Input: `head = [3,2,0,-4]`, tail connects to node index 1  
Output: `True`  
*Explanation: Traversing from 3→2→0→−4, the next pointer from -4 points back to 2, so you’ll loop forever if you keep following next.*

**Example 2:**  
Input: `head = [1,2,3,4]`, no cycle  
Output: `False`  
*Explanation: Traversing goes 1→2→3→4 and next from 4 is null, so there’s no repetition and the list ends.*

**Example 3:**  
Input: `head = [1]`, no cycle  
Output: `False`  
*Explanation: Single node, next is null, so no cycle exists.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - As we traverse the list, we could store every node we visit in a hash set (by reference).  
  - If we encounter a node already in the set, a cycle exists.
  - This is simple but uses O(n) extra memory.

- **Optimized approach:**  
  - Use Floyd’s Tortoise and Hare algorithm:
    - Define two pointers, **slow** and **fast**.  
    - Slow advances one step at a time, fast advances two steps.  
    - If there is a cycle, at some point, fast and slow will meet.
    - If there’s no cycle, fast will reach the null pointer before slow, so we return False.

- **Trade-offs:**  
  - Hash set: O(n) time, O(n) space.
  - Tortoise & Hare: O(n) time, O(1) extra space. This is the best for space efficiency.

### Corner cases to consider  
- Empty list (head is None)
- List with a single node (cycle and no cycle)
- All nodes with same value but no cycle (should return False)
- Very long list with no cycle (should terminate properly)
- Cycle not starting at head node (cycle deep in list)
- Cycle that starts at head itself

### Solution

```python
# Definition for singly-linked list node.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def hasCycle(head):
    # If the list is empty or only has one node, it can't have a cycle
    if head is None or head.next is None:
        return False

    slow = head      # Slow pointer advances 1 step per loop
    fast = head      # Fast pointer advances 2 steps per loop

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        # If both pointers meet, there's a cycle
        if slow == fast:
            return True
    # If fast reached the end, no cycle exists
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - In the worst case, we traverse each node at most twice (slow and fast pointers) before either pointers meet (cycle) or fast reaches the end (no cycle).

- **Space Complexity:** O(1)  
  - No extra data structures used, only two pointers regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return the node where the cycle begins?
  *Hint: Try resetting one pointer to head after intersection and move both one step at a time.*

- Can you solve the problem using O(n) space?  
  *Hint: Use a hash set to track visited nodes by reference.*

- How would you modify your approach if the nodes contained back pointers, or if the list was doubly linked?  
  *Hint: Analyze if extra information from prev pointers/links changes anything for detection.*

### Summary  
This problem uses the **Floyd's Tortoise and Hare** (two-pointer) pattern to efficiently detect cycles in linked lists. It's a fundamental pattern seen in many "cycle detection" problems in linked lists and graphs, and is a classic interview favorite due to its space efficiency and robustness. Recognizing when to apply two-pointer strategies is a key interview skill.


### Flashcard
Use Floyd’s Tortoise and Hare: advance slow by 1, fast by 2; if they meet, there’s a cycle, else if fast reaches null, no cycle.

### Tags
Hash Table(#hash-table), Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Linked List Cycle II(linked-list-cycle-ii) (Medium)
- Happy Number(happy-number) (Easy)