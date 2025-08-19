### Leetcode 3263 (Easy): Convert Doubly Linked List to Array I [Practice](https://leetcode.com/problems/convert-doubly-linked-list-to-array-i)

### Description  
Given the head of a doubly linked list (where each node has a `next` pointer and a `prev` pointer), return an integer array containing all the node values in left-to-right order (from head’s node to last).  
You only need to follow the next pointers from the head; you do not need to use the prev pointers for this task.

### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,3,2,1]`  
Output: `[1,2,3,4,3,2,1]`  
*Explanation: Traverse the list starting at head. For each node, append the value to the array. Result: [1,2,3,4,3,2,1]*

**Example 2:**  
Input: `head = [2,2,2,2,2]`  
Output: `[2,2,2,2,2]`  
*Explanation: Every node has value 2. Collecting each gives [2,2,2,2,2].*

**Example 3:**  
Input: `head = [3,2,3,2,3,2]`  
Output: `[3,2,3,2,3,2]`  
*Explanation: Walk the list, append each value — order matches the list.*

### Thought Process (as if you’re the interviewee)  
- Start at the head of the linked list and walk through using the next pointer.
- For each node, add its value to a result array.
- When the next pointer is `None`, stop.
- This is a standard linked list traversal; since we only need to output values from head to tail, we never use the prev pointers.
- Time and space are both efficient within the linked list’s length (since we just visit each node once and append its value).

### Corner cases to consider  
- The list has only one node.
- All values are the same.
- List contains the maximum allowed number of nodes (test for performance but no special logic).
- Input list has alternating or repeating values.
- Although the list is doubly linked, we are guaranteed head is the start — so no empty input.
- The node values could be at the boundaries (1 or 50).

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

def toArray(head):
    # Initialize empty result array
    result = []
    # Start traversal from head
    current = head
    while current is not None:
        # Add current node's value to array
        result.append(current.val)
        # Move to next node
        current = current.next
    # Return the final array with all values
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the list. Each node is visited exactly once.
- **Space Complexity:** O(n), as we need to store n values in the output array. The traversal itself uses only a constant amount of extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were given a pointer to a random node, not necessarily the head?  
  *Hint: Use prev pointers to track back to the head, then proceed as normal.*

- How would you output the array in reverse order, from tail to head?  
  *Hint: Traverse to the tail first, then walk back using prev pointers.*

- Can you do this in-place without extra space?  
  *Hint: Not possible if you must return an array, but you could print in-place.*

### Summary
This problem demonstrates the standard *Linked List Traversal* pattern. You iteratively visit each node via `next` pointers and collect values, which is a foundational technique useful in many other linked list problems — such as detecting cycles, reversing lists, or copying lists. The solution is straightforward and efficient for singly or doubly linked lists alike whenever a simple, ordered collection of node values is needed.

### Tags
Array(#array), Linked List(#linked-list), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
- Remove Linked List Elements(remove-linked-list-elements) (Easy)