### Leetcode 1381 (Medium): Design a Stack With Increment Operation [Practice](https://leetcode.com/problems/design-a-stack-with-increment-operation)

### Description  
Design a stack supporting push, pop, and increment operations:
- **push(x):** Push integer x onto stack if size < maxSize
- **pop():** Pop element from top; return -1 if stack is empty
- **increment(k, val):** Increment bottom k elements by val (if fewer than k elements, increment all)

Implement this data structure efficiently.

### Examples  

**Example 1:**  
Input: `CustomStack(3)`, `push(1)`, `push(2)`, `pop()`  
Output: `2`  
*Explanation: Push 1, push 2, then pop returns 2.*

**Example 2:**  
Input: `CustomStack(2)`, `push(2)`, `push(3)`, `push(4)`, `increment(5, 100)`, `pop()`, `pop()`, `pop()`
Output: `3, 102, -1`
*Explanation: Stack is [2,3] after pushes (third push ignored). Increment all by 100: [102,103]. Pops: 3→102, then 102→-1 (empty stack).* 

### Thought Process (as if you’re the interviewee)  
- Regular stack is easy, but increment must add val to bottom k efficiently.
- **Brute-force increment:** for every call, actually increment required elements (O(k)). But that can add up.
- **Optimal:** Use a lazy increment trick — defer increment to pop time using a separate array or stack that records increments for each layer.
- When popping, apply and propagate incremental values.
- This gives all operations O(1) time.

### Corner cases to consider  
- Stack at max size (push must do nothing)
- Pop from empty stack
- Increment on stack with fewer than k elements
- Multiple increment operations
- Stack with 1 element

### Solution

```python
class CustomStack:
    def __init__(self, maxSize):
        self.stack = []
        self.inc = [0] * maxSize
        self.maxSize = maxSize

    def push(self, x):
        if len(self.stack) < self.maxSize:
            self.stack.append(x)

    def pop(self):
        if not self.stack:
            return -1
        i = len(self.stack) - 1
        res = self.stack.pop() + self.inc[i]
        if i > 0:
            self.inc[i-1] += self.inc[i]
        self.inc[i] = 0
        return res

    def increment(self, k, val):
        min_k = min(k, len(self.stack))
        if min_k > 0:
            self.inc[min_k-1] += val
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) for push, pop, and increment.
- **Space Complexity:** O(n) for stack and inc array (n = maxSize).

### Potential follow-up questions (as if you’re the interviewer)  

- What if max stack size is not known upfront?
  *Hint: Use dynamic array instead of fixed-size for inc list.*

- How to make it thread-safe?
  *Hint: Synchronize access to the stack and inc structures.*

- Can you optimize further if increment is rarely used?
  *Hint: Consider naive O(k) increment if usage is low compared to push/pop.*

### Summary
This problem uses the **lazy propagation** trick for fast range updates, a common coding pattern seen in range sum/segment trees, and amortizing deferred work.

### Tags
Array(#array), Stack(#stack), Design(#design)

### Similar Problems
