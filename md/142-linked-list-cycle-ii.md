### Leetcode 142 (Medium): Linked List Cycle II [Practice](https://leetcode.com/problems/linked-list-cycle-ii)

### Description  
You are given the head of a singly linked list. Your task is to determine if the list contains a cycle. If a cycle exists, return the node where the cycle begins. If there is no cycle, return `None`. The input does not give you the position where the cycle begins (internally, the position may be used for testing but your implementation cannot access it or modify the list structure).

### Examples  

**Example 1:**  
Input: `head = [3,2,0,-4], pos = 1`  
Output: Node with value `2`  
*Explanation: The tail node (-4) points to the second node (index 1, value 2), so the cycle starts at node 2.*

List Representation:  
```  
3 → 2 → 0 → -4  
     ↑         ↓  
     +---------+  
```

**Example 2:**  
Input: `head = [1,2], pos = 0`  
Output: Node with value `1`  
*Explanation: The tail node (2) points to the first node (index 0, value 1), so the cycle starts at node 1.*

List Representation:  
```  
1 → 2  
↑    ↓  
+----+  
```

**Example 3:**  
Input: `head = [1], pos = -1`  
Output: `None`  
*Explanation: There is only one node, and `pos = -1` means no cycle, so return None.*

List Representation:  
```  
1  
```

### Thought Process (as if you’re the interviewee)  
First, I would try a brute-force approach by iterating through the linked list and storing all visited nodes in a set. If I ever visit a node that is already in the set, it means I found the start of the cycle. This method requires O(n) extra space for the set.

However, since the problem hints at better space efficiency, I’d use Floyd’s Cycle Detection Algorithm (Tortoise and Hare). This uses two pointers—slow advances one step, fast advances two steps. If there’s a cycle, these pointers will eventually meet.

After detecting the cycle, I reset one pointer to the head and move both pointers one step at a time. When they meet again, that node is the start of the cycle. This approach only uses O(1) extra space, which is optimal for this problem.

### Corner cases to consider  
- The list is empty (`head` is `None`)
- The list contains only one node  
- The list does not contain a cycle  
- The cycle starts at the head node  
- The cycle starts somewhere in the middle  
- The cycle is of length 1 (a node points to itself)

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def detectCycle(head):
    # Step 1: Detect cycle using Floyd's Tortoise and Hare
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next          # Move slow one step
        fast = fast.next.next     # Move fast two steps
        if slow == fast:
            # Cycle detected
            break
    else:
        # No cycle found
        return None

    # Step 2: Find the node where the cycle begins
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    return slow
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each pointer (slow and fast) traverses at most 2×n steps—detecting the cycle, then locating the start. So the overall time is linear.
- **Space Complexity:** O(1)  
  Only a couple of pointers are used, regardless of the list size. No auxiliary data structures are necessary.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you implement this with O(n) space to track visited nodes?  
  *Hint: Use a set to store node references and check for repeats.*

- How would you handle a linked list in which nodes do not expose a unique identity/address?  
  *Hint: You would need to enhance the data structure or use hashable properties.*

- If the list is extremely large, could you modify the structure to mark nodes as visited?  
  *Hint: In practice, that would require modifying node properties, which is not always allowed. Sometimes a color or flag is used.*

### Summary
This problem utilizes the Floyd’s Cycle (Tortoise and Hare) detection pattern, a powerful technique for detecting cycles and their starting point with O(1) space in linked structures. This pattern applies broadly to any singly linked structure where you need to detect cycles and find entry points, such as linked lists, graphs, and function iterators. It’s a classic and highly efficient approach in interview settings.

### Tags
Hash Table(#hash-table), Linked List(#linked-list), Two Pointers(#two-pointers)

### Similar Problems
- Linked List Cycle(linked-list-cycle) (Easy)
- Find the Duplicate Number(find-the-duplicate-number) (Medium)