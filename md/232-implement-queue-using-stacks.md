### Leetcode 232 (Easy): Implement Queue using Stacks [Practice](https://leetcode.com/problems/implement-queue-using-stacks)

### Description  
Implement a **queue** (FIFO data structure) using only standard **stack** operations (LIFO: push, pop, top, empty).  
You must support the standard queue operations:
- **push(x):** Add element x to the back of the queue.
- **pop():** Remove and return the element from the front of the queue.
- **peek():** Get the element at the front of the queue.
- **empty():** Return true if the queue is empty, else false.

No cheating: only use built-in stack methods.

### Examples  

**Example 1:**  
Input:  
```
queue = MyQueue()
queue.push(1)
queue.push(2)
queue.peek()      # returns 1
queue.pop()       # returns 1
queue.empty()     # returns False
```
Output:  
```
1
1
False
```
*Explanation: 1 is pushed first, so it is at the front. After pop, 2 is at front, queue is not empty.*

**Example 2:**  
Input:  
```
queue = MyQueue()
queue.push(3)
queue.pop()
queue.empty()
```
Output:  
```
3
True
```
*Explanation: Only one element. After pop(), queue becomes empty.*

**Example 3:**  
Input:  
```
queue = MyQueue()
queue.empty()
```
Output:  
```
True
```
*Explanation: No elements. Queue is empty.*

### Thought Process (as if you’re the interviewee)  
First, I would recall the difference between a **stack** (LIFO: last-in-first-out) and a **queue** (FIFO: first-in-first-out).  
Since I can only use stack operations, I need to “reverse” the order of elements to simulate the queue’s FIFO behavior.

**Brute-force idea:**  
- Use a single stack.
- For push, always pop everything out into a temp stack, push the new element, then push everything back.
- This keeps the front at the top, but both push and pop become O(n).  
- Not efficient!

**Optimal approach:**  
- Use two stacks (`in_stack` and `out_stack`):
  - For push(x): push into `in_stack`.
  - For pop()/peek(): if `out_stack` is empty, move all elements from `in_stack` to `out_stack` (this reverses the order), then pop/peek from `out_stack`.
  - If `out_stack` not empty, pop/peek from it directly.
- By transferring only when needed, each element moves at most twice. This gives **amortized O(1)** per operation.
- This is the most common and efficient way in practice[1][3][4].

**Trade-offs:**  
- Slightly higher space (two stacks), but major gain in speed.

### Corner cases to consider  
- Popping/peeking from an empty queue.
- Pushing after popping everything out.
- Alternating push and pop operations.
- Multiple pushes without pops, then multiple pops.
- All queue operations when both stacks are empty.

### Solution

```python
class MyQueue:
    def __init__(self):
        # in_stack for enqueue, out_stack for dequeue
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        # always push to in_stack
        self.in_stack.append(x)
    
    def pop(self) -> int:
        # move elements to out_stack if empty, then pop
        self.move()
        return self.out_stack.pop()

    def peek(self) -> int:
        # move elements to out_stack if empty, then peek
        self.move()
        return self.out_stack[-1]

    def empty(self) -> bool:
        # both stacks must be empty
        return not self.in_stack and not self.out_stack

    def move(self):
        # transfer only when out_stack is empty
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - **Each operation:** Amortized O(1). Each element is moved from `in_stack` to `out_stack` at most once, so while `move` can take O(n), the average is O(1) per operation.
- **Space Complexity:**  
  - O(n): Two stacks storing up to n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this if you only had one stack?  
  *Hint: Use recursion to retrieve the oldest element during pop/peek.*

- How would you implement a stack using two queues?  
  *Hint: Choose one queue to push new elements; on pop, transfer elements to the other queue except for the last.*

- Can you make any of the operations (push/pop/peek) O(1) worst case rather than amortized?  
  *Hint: Maintain a front variable or consider other data structures.*

### Summary
This problem uses the **two-stack simulation** technique to invert LIFO behavior and achieve FIFO queuing, showcasing the common “in-out stack pairing” pattern.  
It’s a classic interview favorite and can be applied wherever order-reversal is required, such as queue implementation or undo-redo systems.  
The core insight is leveraging stacks’ reversal property to manage queue state efficiently and with low overhead.

### Tags
Stack(#stack), Design(#design), Queue(#queue)

### Similar Problems
- Implement Stack using Queues(implement-stack-using-queues) (Easy)