### Leetcode 1019 (Medium): Next Greater Node In Linked List [Practice](https://leetcode.com/problems/next-greater-node-in-linked-list)

### Description  
Given the head of a singly linked list, for each node, you need to find the value of the first node *after it* that has a value **strictly greater** than its own. The result should be an array, where result[i] corresponds to the next greater value for the iᵗʰ node. If there is no next greater node, use 0.

For example, if the input list is 2 → 1 → 5: for the first node (2), the next greater node is 5, for the second node (1), it is also 5, and for 5 (the last node), there is none, so the answer is 0.  

### Examples  

**Example 1:**  
Input: `[2,1,5]`  
Output: `[5,5,0]`  
*Explanation:*
- Node 2: next greater is 5
- Node 1: next greater is 5
- Node 5: no greater node, so 0

**Example 2:**  
Input: `[2,7,4,3,5]`  
Output: `[7,0,5,5,0]`  
*Explanation:*
- Node 2: next greater is 7  
- Node 7: no greater, so 0  
- Node 4: next greater is 5  
- Node 3: next greater is 5  
- Node 5: no greater, so 0

**Example 3:**  
Input: `[1,7,5,1,9,2,5,1]`  
Output: `[7,9,9,9,0,5,0,0]`  
*Explanation:*
- Node 1: next greater is 7  
- Node 7: next greater is 9  
- Node 5: next greater is 9  
- Node 1: next greater is 9  
- Node 9: no greater, so 0  
- Node 2: next greater is 5  
- Node 5: no greater, so 0  
- Node 1: no greater, so 0  

### Thought Process (as if you’re the interviewee)  
- First, brute-force: For each node, scan all nodes after it for the next greater value. This takes O(n²) time, which is not efficient for large input lists.
- Instead, I notice that this is similar to the "Next Greater Element" problem, which is efficiently solved using a stack.
- So, I'll:
  - Convert the linked list to an array for ease of access.
  - Use a stack to keep indices of nodes whose next greater node hasn't been found yet.
  - Iterate over the array: for each value, pop indices from the stack as long as the current value is greater than what’s at these indices, and set their answer to the current value.
  - Push the current index onto the stack.
- This approach is O(n): each node is pushed and popped at most once.

### Corner cases to consider  
- Empty linked list (should return an empty array)
- All nodes have the same value (all result values will be 0)
- Strictly increasing list (each node's next is greater except the last)
- Strictly decreasing list (all result values will be 0 except maybe the first)
- One element (should return )

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def nextLargerNodes(head):
    # Convert linked list to array for easy indexing
    values = []
    curr = head
    while curr:
        values.append(curr.val)
        curr = curr.next

    res = [0] * len(values)   # Initialize result array
    stack = []                # Stack holds indices

    for i, val in enumerate(values):
        # Check whether current value is next greater for any previous node
        while stack and values[stack[-1]] < val:
            idx = stack.pop()
            res[idx] = val
        stack.append(i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each node is pushed and popped from the stack at most once; we traverse the array once.
- **Space Complexity:** O(n). We use O(n) for the array and O(n) for the stack in the worst case (strictly decreasing order).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you can’t use extra space for an array or stack?
  *Hint: In-place reversal? Reverse traversal?*
- How would you handle a doubly linked list version?
  *Hint: You can traverse backward as well as forward.*
- Can you handle multiple queries efficiently for different segments of the list?
  *Hint: Preprocessing with segment trees or other RMQ structures.*

### Summary
This problem uses the monotonic stack pattern, which is common in "Next Greater Element" problems. Converting the list to an array helps apply this pattern for O(n) efficiency. This stack pattern is broadly applicable in many problems needing “nearest greater/smaller to left/right,” including daily temperatures, stock span, and histogram area problems.

### Tags
Array(#array), Linked List(#linked-list), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
