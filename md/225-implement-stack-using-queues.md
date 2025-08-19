### Leetcode 225 (Easy): Implement Stack using Queues [Practice](https://leetcode.com/problems/implement-stack-using-queues)

### Description  
Implement a **stack** (Last-In-First-Out, LIFO) data structure using only the operations of a **queue** (First-In-First-Out, FIFO).  
You must simulate the four stack operations — `push(x)`, `pop()`, `top()`, and `empty()` — using only standard queue methods: enqueue/push to back, dequeue/pop from front, check if empty, and get size.  
The stack should behave exactly like a real stack:  
- `push(x)`: add `x` to the top  
- `pop()`: remove and return the top element  
- `top()`: return the top element  
- `empty()`: return true if empty, else false

### Examples  

**Example 1:**  
Input: `push(1), push(2), top(), pop(), empty()`  
Output: `2, 2, false`  
*Explanation: First push 1 and 2 onto the structure (2 will be on top). Calling top() returns 2, then pop() removes and returns 2, and finally empty() checks if anything remains (it's not empty yet).*

**Example 2:**  
Input: `push(4), top(), pop(), empty()`  
Output: `4, 4, true`  
*Explanation: Push 4, top() returns 4, pop() removes and returns 4, empty() returns true as nothing remains.*

**Example 3:**  
Input: `empty()`  
Output: `true`  
*Explanation: Directly checking if the stack is empty before any push returns true.*

### Thought Process (as if you’re the interviewee)  

First, realize the core challenge: queues are FIFO, but stacks are LIFO.  
Ideally, we'd like the most recent push to always be available at the front of our simulated stack for quick pop/top.  
I can use **two queues**:  
- Use one as the main queue (`q1`), and another as a helper (`q2`).  
- For every `push(x)`, enqueue x into `q2`, then dequeue all elements from `q1` and enqueue them into `q2`.  
- Swap names: `q1` becomes `q2`, and `q2` is now empty for the next operation.  
This way, the last element pushed is always at the front of `q1`.  
This method makes `push` O(n) but makes `pop` and `top` O(1).  
Alternatively, with one queue, after each `push`, rotate the queue so that the last element is always at the front (but this is less intuitive for interviewers).  
Two queues is clearer, so I’ll go with that for readability.

### Corner cases to consider  
- Empty stack (`pop()` or `top()` should not fail — assume input is always legal)
- Pushing only one element, then popping it
- Multiple pushes in a row
- Calling `empty()` on an empty stack and on a stack with elements

### Solution

```python
from collections import deque

class MyStack:
    def __init__(self):
        # Two queues for simulating stack order
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x: int) -> None:
        # Push to helper queue first
        self.q2.append(x)
        # Move all current elements from q1 to q2, preserving LIFO order
        while self.q1:
            self.q2.append(self.q1.popleft())
        # Swap references - q1 always holds all elements in stack order
        self.q1, self.q2 = self.q2, self.q1

    def pop(self) -> int:
        # Remove from front of q1 (top of stack)
        return self.q1.popleft()

    def top(self) -> int:
        # Peek front of q1 (top of stack)
        return self.q1[0]

    def empty(self) -> bool:
        # Stack is empty if q1 is empty
        return not self.q1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - `push(x)`: O(n), as all elements are moved on each push.  
    - `pop()`: O(1), directly dequeues from front.  
    - `top()`: O(1), direct lookup.  
    - `empty()`: O(1).
- **Space Complexity:**  
    - O(n), since two queues are used, but each value exists only once at any time.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you implement the same using just **one queue**?  
  *Hint: What if you always rotate the queue each time you push?*

- What if you want all stack operations to be **amortized O(1)**?  
  *Hint: Explore using other data structures like a deque, or accept that with queues pure O(1) is not possible.*

- How would you handle **multi-threaded** access to the stack?  
  *Hint: Consider locking or thread synchronization.*

### Summary
This problem leverages the classic technique of simulating one data structure (**stack**) with another (**queue**). The trick is to always maintain stack order — so the most recently added is always the first out.  
This is a great example of the **queue-to-stack simulation** pattern, which can also be inverted (stack-to-queue) and is a common interview topic to test understanding of abstract data structure operations.

### Tags
Stack(#stack), Design(#design), Queue(#queue)

### Similar Problems
- Implement Queue using Stacks(implement-queue-using-stacks) (Easy)