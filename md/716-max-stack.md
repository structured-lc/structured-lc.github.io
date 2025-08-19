### Leetcode 716 (Hard): Max Stack [Practice](https://leetcode.com/problems/max-stack)

### Description  
Design a data structure called **Max Stack** that supports the following operations efficiently:
- **push(x):** Insert element x onto the stack.
- **pop():** Remove and return the top element of the stack.
- **top():** Return the element currently on top of the stack without removing it.
- **peekMax():** Return the maximum element currently in the stack.
- **popMax():** Remove and return the maximum element in the stack. If there are multiple maximum elements, only the **top-most one** should be removed.

Unlike a standard stack, `peekMax()` and `popMax()` must support retrieving and removing the current maximum value even if that value is not at the top of the stack.

### Examples  

**Example 1:**  
Input:  
`MaxStack stack = new MaxStack();`  
`stack.push(5); stack.push(1); stack.push(5);`  
`stack.top();       // returns 5`  
`stack.popMax();    // returns 5 (top-most 5)`  
`stack.top();       // returns 1`  
`stack.peekMax();   // returns 5`  
`stack.pop();       // returns 1`  
`stack.top();       // returns 5`  
Output:  
`5`  
`5`  
`1`  
`5`  
`1`  
`5`  
Explanation:  
After pushing 5, 1, 5, the stack looks like [5, 1, 5].  
- `top()` returns the top (last) element (5).  
- `popMax()` removes the top-most 5, stack becomes [5, 1].  
- `top()` returns 1.  
- `peekMax()` returns 5 (still in the stack).  
- `pop()` removes 1, stack is [5].  
- `top()` returns 5.

**Example 2:**  
Input:  
`stack.push(3); stack.push(1); stack.push(2); stack.push(2);`  
`stack.popMax();`  
`stack.peekMax();`  
Output:  
`2`  
`3`  
Explanation:  
Push 3, 1, 2, 2: stack = [3, 1, 2, 2]  
- `popMax()` removes the top-most 2, new stack = [3, 1, 2]  
- `peekMax()` gives 3

**Example 3:**  
Input:  
`stack.push(5); stack.pop(); stack.top();`  
Output:  
Error/exception (if you call `top` on empty stack)  
Explanation:  
After one push and one pop, the stack is empty. Calling `top()` should be invalid.

### Thought Process (as if you’re the interviewee)  
A stack supports efficient last-in-first-out operations.  
To support `peekMax` and `popMax`, we need to efficiently find and remove the current maximum, but only remove the top-most one if there are duplicates.

**Brute-force:**  
- For `peekMax`: scan stack for the max (O(n)).
- For `popMax`: scan for max, pop off all elements above it, remove it, then push kept elements back (O(n)).

**Optimization:**  
- Using **two stacks:**  
  - Main stack for normal `push`/`pop`.
  - Second stack stores the current max at each level.
  - `push(x)` pushes to both, comparing against current max.
  - `peekMax` is O(1) by peeking top of max stack.
  - `popMax` is still O(n) (need to pop off until find max, then restore elements).
  - Tradeoff: `push`, `pop`, `top`, `peekMax` O(1). `popMax` O(n) — practical and interview-acceptable for up to 10⁴ operations.

**Advanced:**  
- Use a doubly-linked list + a balanced BST/TreeMap that maps values to nodes (keep track of all positions for handling duplicates quickly). This can bring `popMax` to O(log n), but is complex and often not required for standard interviews.

Final: Use the two-stack version for clarity, maintain max at each push for efficient `peekMax`, and linear scan for `popMax`.

### Corner cases to consider  
- Removing the last (or only) element with `pop` or `popMax`
- Stack with all equal elements (multiple maxes)
- Repeatedly calling `popMax` until stack is empty
- Calling any method on an empty stack (handle exceptions properly)
- Push, pop, and manipulate negative or large numbers

### Solution

```python
class MaxStack:
    def __init__(self):
        # Main stack stores values
        self.stack = []
        # Max stack stores current max at every level
        self.max_stack = []

    def push(self, x: int) -> None:
        self.stack.append(x)
        # Add max between current and new value
        if self.max_stack:
            self.max_stack.append(max(x, self.max_stack[-1]))
        else:
            self.max_stack.append(x)

    def pop(self) -> int:
        if not self.stack:
            raise IndexError("pop from empty stack")
        self.max_stack.pop()
        return self.stack.pop()

    def top(self) -> int:
        if not self.stack:
            raise IndexError("top from empty stack")
        return self.stack[-1]

    def peekMax(self) -> int:
        if not self.max_stack:
            raise IndexError("peekMax from empty stack")
        return self.max_stack[-1]

    def popMax(self) -> int:
        if not self.max_stack:
            raise IndexError("popMax from empty stack")
        max_val = self.peekMax()
        buffer = []
        # Remove elements until we find top-most max
        while self.top() != max_val:
            buffer.append(self.pop())
        # Pop the max itself
        self.pop()
        # Restore the other elements
        while buffer:
            self.push(buffer.pop())
        return max_val
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - `push`, `pop`, `top`, `peekMax`: O(1) each (due to use of the second stack)
  - `popMax`: O(n) in worst case (if max is at bottom of the stack, as we process every element above it and then restore them)
- **Space Complexity:**
  - O(n) extra storage: each stack stores up to n elements, so 2n overall

### Potential follow-up questions (as if you’re the interviewer)  

- How would you improve popMax to O(log n)?
  *Hint: Consider using a doubly-linked list with a sorted map from value to all stack node locations*

- What if you need to support both min stack and max stack operations efficiently?
  *Hint: Apply similar patterns as Max Stack, but track min as well.*

- How would you support many concurrent stacks, each with max functionality?
  *Hint: Think about separation of data versus metadata for scaling and shared state.*

### Summary
We used the **two-stack** pattern: one for normal stack operations, another for tracking the current maximum at every push. This enables O(1) for `push`, `pop`, `top`, and `peekMax`, while `popMax` is O(n). This is a classical approach seen in Min Stack (Leetcode 155), and is widely applicable to problems asking to track max/min/other aggregates alongside traditional stack operations. For more optimized requirements (all ops in O(log n)), one should consider advanced data structures like a doubly-linked list plus a balanced BST or TreeMap.

### Tags
Linked List(#linked-list), Stack(#stack), Design(#design), Doubly-Linked List(#doubly-linked-list), Ordered Set(#ordered-set)

### Similar Problems
- Min Stack(min-stack) (Medium)