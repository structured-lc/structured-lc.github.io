### Leetcode 155 (Medium): Min Stack [Practice](https://leetcode.com/problems/min-stack)

### Description  
Design a stack that, in addition to standard stack operations (push, pop, top), supports retrieving the minimum element in constant time. All operations — push(x), pop(), top(), and getMin() — must run in O(1) time.

### Examples  

**Example 1:**  
Input: `["MinStack","push","push","push","getMin","pop","top","getMin"]`, `[[],[-2],,[-3],[],[],[],[]]`  
Output: `[null,null,null,null,-3,null,0,-2]`  
*Explanation: Initialize MinStack, push -2, 0, -3. `getMin` returns -3. Pop removes -3, then `top` returns 0. `getMin` now returns -2.*

**Example 2:**  
Input:  
`push(5)` → Min=5  
`push(3)` → Min=3  
`push(7)` → Min=3  
`pop()` (pops 7) → Min=3  
`getMin()` → Output:`3`  
*Explanation: After each step, min is tracked. After popping, min remains 3.*

**Example 3:**  
Input:  
`push(2)`  
`getMin()` → Output:`2`  
`pop()`  
`getMin()` → Output:`Stack is empty or error`  
*Explanation: Handle edge when popping last element; stack becomes empty.*

### Thought Process (as if you’re the interviewee)  
My first instinct is to use a regular stack and, whenever asked for the minimum, scan the stack to find it. But this would take O(n) time for `getMin()`, which violates the constant time requirement.

To optimize, I need a way to track the minimum at each step. The classic approach is to maintain two stacks:
- The main stack holds all values.
- The min stack keeps track of the current minimums.

Every time I push a new value, I compare it with the current min (top of min stack). If it’s smaller or equal, I also push it to the min stack. When I pop, if the popped value equals the min stack’s top, I pop from min stack as well. This ensures the min stack’s top always reflects the current stack minimum. All operations are then O(1).

There’s also a constant-space trick using mathematical encoding, but for clarity and interviews, the two-stack method is preferred since it's intuitive and foolproof.

### Corner cases to consider  
- Popping from an empty stack
- Getting the min/top from an empty stack
- Pushing duplicate minimums (e.g., [2,2,2])
- Pushing and then popping a single element
- Sequence of min increasing then decreasing
- Negative and positive numbers intermixed

### Solution

```python
class MinStack:
    def __init__(self):
        # Stack for all values
        self.stack = []
        # Stack for current min values
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        # If min_stack is empty or new val ≤ current min, also push to min_stack
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if not self.stack:
            return  # Or raise exception
        val = self.stack.pop()
        # Pop from min_stack if it matches the value being removed
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        if not self.stack:
            return None  # Or raise exception
        return self.stack[-1]

    def getMin(self) -> int:
        if not self.min_stack:
            return None  # Or raise exception
        return self.min_stack[-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** All stack operations (push, pop, top, getMin) are O(1) because stack operations are constant time, and we sync the min stack in parallel.
- **Space Complexity:** O(n), where n is the number of elements in the stack. In the worst case (strictly decreasing/increasing stack), the min stack can be size n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this structure to support retrieving the maximum in O(1)?
  *Hint: Think about how you're tracking the min; can you do the same for max?*

- Can you optimize the space usage if many duplicate minimums are present?
  *Hint: Can you compress the min stack with counts, or rethink when you store new min values?*

- What if you wanted to support an arbitrary number of getMinAt(i) calls for any element index i?
  *Hint: Might need a different data structure, like a Segment Tree or other RMQ approach.*

### Summary
This problem leverages the “two stack” pattern, where one stack stores all items and the other tracks an auxiliary property (here, the minimum). It’s a classic for introducing auxiliary stacks and can be applied to similar problems like Max Stack, or designing advanced stacks with O(1) access to secondary properties. Common in stack/queue tracker interview questions.


### Flashcard
Use two stacks—main stack for values, min stack for current minimums—to support O(1) getMin().

### Tags
Stack(#stack), Design(#design)

### Similar Problems
- Sliding Window Maximum(sliding-window-maximum) (Hard)
- Max Stack(max-stack) (Hard)