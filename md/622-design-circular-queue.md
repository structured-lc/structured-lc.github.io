### Leetcode 622 (Medium): Design Circular Queue [Practice](https://leetcode.com/problems/design-circular-queue)

### Description  
Design a data structure for a fixed-size **circular queue**. This queue should support:
- **enQueue(value):** Insert value into the queue; return true if successful, false if the queue is full.
- **deQueue():** Remove the front item; return true if successful, false if the queue is empty.
- **Front():** Get the front item (without removing it); return -1 if the queue is empty.
- **Rear():** Get the last item (without removing it); return -1 if the queue is empty.
- **isEmpty():** Return true if the queue is empty.
- **isFull():** Return true if the queue is full.

The queue's maximum size is set at initialization and does not change. The structure *reuses* freed-up space (after dequeue) by "wrapping around" to the start of the buffer (i.e., circularly).

### Examples  

**Example 1:**  
Input:  
```
MyCircularQueue circularQueue = new MyCircularQueue(3)
circularQueue.enQueue(1)      # true
circularQueue.enQueue(2)      # true
circularQueue.enQueue(3)      # true
circularQueue.enQueue(4)      # false (queue is full)
circularQueue.Rear()          # 3
circularQueue.isFull()        # true
circularQueue.deQueue()       # true
circularQueue.enQueue(4)      # true
circularQueue.Rear()          # 4
```
Output:  
```
[true, true, true, false, 3, true, true, true, 4]
```
*Explanation: The queue reaches capacity after three enqueues, rejects the fourth, rear points to 3, is full; after dequeue, another enqueue (4) is possible, rear now points to 4.*

**Example 2:**  
Input:  
```
MyCircularQueue q = new MyCircularQueue(2)
q.enQueue(5)      # true
q.enQueue(6)      # true
q.enQueue(7)      # false
q.Front()         # 5
q.Rear()          # 6
q.deQueue()       # true
q.Front()         # 6
q.isEmpty()       # false
q.deQueue()       # true
q.isEmpty()       # true
```
Output:  
```
[true, true, false, 5, 6, true, 6, false, true, true]
```
*Explanation. Only two elements are allowed, trying to add a third fails. Dequeue operations update front accordingly.*

**Example 3:**  
Input:  
```
MyCircularQueue q = new MyCircularQueue(1)
q.deQueue()       # false
q.enQueue(10)     # true
q.Front()         # 10
q.deQueue()       # true
q.Front()         # -1
q.Rear()          # -1
q.isEmpty()       # true
q.isFull()        # false
```
Output:  
```
[false, true, 10, true, -1, -1, true, false]
```
*Explanation. Queue of size 1, empty case handling, after removing element returns to empty state with -1 for front/rear.*

### Thought Process (as if you’re the interviewee)  
My first thought is to use a basic array and shift elements for every dequeue, but that would be inefficient (O(n) for dequeue).  
Instead, **optimal is an array with two pointers**:  
- One (`front`) points to the index of the front item.
- Another (`rear`) points to the next insertion index.
- Track a `size` to differentiate empty from full (when front == rear).
- All operations can then be handled in O(1) time and use O(k) extra space.

On enqueue:
- If not full, place the new value at rear, advance rear (modulo capacity), increment size.

On dequeue:
- If not empty, advance front (modulo capacity), decrement size.

For Front/Rear:
- Use the pointers for lookup (with special care for empty cases).

This approach is classic for fixed-size ring data structures and avoids unnecessary shifting, *maximizing efficiency*.

### Corner cases to consider  
- Queue empty (should return -1 for Front, Rear; reject dequeue)
- Queue full (should return false for enqueue)
- Wrap-around where rear or front pointer cycles past the array's bounds (correct use of mod)
- One element only (edge initialization and removal)
- Multiple enqueue/dequeue with full wrap-around

### Solution

```python
class MyCircularQueue:
    def __init__(self, k: int):
        # Store queue elements
        self.q = [0] * k
        self.capacity = k
        # Pointers for front and rear (next insert position)
        self.front = 0
        self.rear = 0
        # Number of elements in queue
        self.size = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        self.q[self.rear] = value
        # Move rear pointer in circular fashion
        self.rear = (self.rear + 1) % self.capacity
        self.size += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        # Move front pointer in circular fashion
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.q[self.front]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        # Rear points to next insertion index, so last element is at (rear - 1) % capacity
        return self.q[(self.rear - 1 + self.capacity) % self.capacity]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.capacity
```

### Time and Space complexity Analysis  

- **Time Complexity:** All operations (enqueue, dequeue, front, rear, isEmpty, isFull) run in O(1) time due to constant-time index and pointer updates.
- **Space Complexity:** O(k) extra space, where k is the queue size (fixed), for the array and constant extra variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement a circular queue for arbitrary capacity without using extra space for a size counter?  
  *Hint: Use front/rear pointer relationships, or leave one slot unused to distinguish full from empty.*

- Suppose this needs to be thread-safe. How would you modify your implementation?  
  *Hint: Think about synchronizing access to enqueue/dequeue or using locks.*

- How does a circular queue differ from a doubly-ended queue (deque), and when would you prefer one over the other?  
  *Hint: Consider use cases—FIFO vs. allowing insertion/removal at both ends.*

### Summary
The **array-based circular queue with front/rear pointers** is a classic data structure pattern, providing maximum efficiency for fixed-size ring buffers. It's widely used in scenarios like producer/consumer buffering, network packet processing, and IO streaming—anywhere a bounded buffer with wrap-around is critical. This problem is an excellent way to practice handling **circular array** logic and pointer arithmetic.