### Leetcode 641 (Medium): Design Circular Deque [Practice](https://leetcode.com/problems/design-circular-deque)

### Description  
You are asked to design a **circular double-ended queue (deque)** data structure with a fixed size `k`.  
The deque allows insertions and deletions from both the front and the rear, and must use O(1) time for all operations.  
The class must provide these methods:

- `MyCircularDeque(k)`: Initialize deque with capacity k.
- `insertFront(value)`: Add value to the front. Return True if successful, False otherwise.
- `insertLast(value)`: Add value to the rear. Return True if successful, False otherwise.
- `deleteFront()`: Delete item from front. Return True if successful.
- `deleteLast()`: Delete item from rear. Return True if successful.
- `getFront()`: Get the front item. Return -1 if deque is empty.
- `getRear()`: Get the last item. Return -1 if empty.
- `isEmpty()`: Return True if empty.
- `isFull()`: Return True if full.

The circular property means that when you reach the end of the buffer, the next operation should continue from the start.

### Examples  

**Example 1:**  
Input:  
`circularDeque = MyCircularDeque(3)`  
`circularDeque.insertLast(1)`  
`circularDeque.insertLast(2)`  
`circularDeque.insertFront(3)`  
`circularDeque.insertFront(4)`  
`circularDeque.getRear()`  
`circularDeque.isFull()`  
`circularDeque.deleteLast()`  
`circularDeque.insertFront(4)`  
`circularDeque.getFront()`  
Output:  
`True, True, True, False, 2, True, True, True, 4`  
Explanation.  
- Add 1 to the rear → [1]  
- Add 2 to the rear → [1,2]  
- Add 3 to the front → [3,1,2]  
- Try to add 4 to the front → deque is full, returns False  
- `getRear()` → 2  
- `isFull()` → True  
- `deleteLast()` → removes 2, deque is [3,1]  
- `insertFront(4)` → adds 4 in front, deque is [4,3,1]  
- `getFront()` → 4

**Example 2:**  
Input:  
`circularDeque = MyCircularDeque(1)`  
`circularDeque.insertFront(10)`  
`circularDeque.deleteFront()`  
`circularDeque.getFront()`  
Output:  
`True, True, -1`  
Explanation.  
- Add 10 to the front →   
- Delete from front → deque is empty  
- Get front → -1

**Example 3:**  
Input:  
`circularDeque = MyCircularDeque(2)`  
`circularDeque.insertRear(5)`  
`circularDeque.insertFront(3)`  
`circularDeque.insertFront(6)`  
`circularDeque.getFront()`  
`circularDeque.getRear()`  
Output:  
`True, True, False, 3, 5`  
Explanation.  
- Add 5 to rear → [5]  
- Add 3 to front → [3,5]  
- Try to add 6 to front → deque is full, returns False  
- Get front → 3  
- Get rear → 5

### Thought Process (as if you’re the interviewee)  
To efficiently support O(1) operations for both ends with a fixed capacity, I’d want a data structure that supports fast insert/remove at both ends and is fixed-size.  
Brute-force: Use Python’s list with pop/push at both ends, but list’s insert(0,...) or pop(0) is O(n), and using doubly-linked list with size k results in extra pointer overhead.

Optimal: Use a **fixed-size array** and two pointers (`front` and `rear`).  
- On insertions or deletions, move the pointers using modulo arithmetic to wrap around (“circular”).
- Maintain a counter for current size to quickly check fullness/emptiness.
- For `insertFront`, move front backward then fill; for `insertLast`, move rear forward then fill.
- For `deleteFront` and `deleteLast`, adjust the appropriate pointer.
- Ensure pointer arithmetic is correct, especially with wrap-around at endpoints.

This gives O(1) for each operation and ensures space stays at O(k).

### Corner cases to consider  
- Inserting into a full deque (should fail).
- Deleting from an empty deque (should fail).
- Wrap-around pointers when k=1 or at physical ends of the buffer.
- Accessing front/rear when deque is empty (should return -1).
- Edge of empty/full detection (distinguish correctly using size counter).

### Solution

```python
class MyCircularDeque:
    def __init__(self, k: int):
        # Underlying array holds k items
        self.k = k
        self.deque = [0] * k
        # front points to the next position to insert at the front
        # rear points to the next position to insert at the rear
        self.front = 0
        self.rear = 0
        # Track number of elements
        self.size = 0

    def insertFront(self, value: int) -> bool:
        if self.size == self.k:
            return False
        # Move front pointer backward (circularly)
        self.front = (self.front - 1 + self.k) % self.k
        self.deque[self.front] = value
        self.size += 1
        return True

    def insertLast(self, value: int) -> bool:
        if self.size == self.k:
            return False
        # Place at rear, then advance pointer (circularly)
        self.deque[self.rear] = value
        self.rear = (self.rear + 1) % self.k
        self.size += 1
        return True

    def deleteFront(self) -> bool:
        if self.size == 0:
            return False
        # Advance front pointer (circularly)
        self.front = (self.front + 1) % self.k
        self.size -= 1
        return True

    def deleteLast(self) -> bool:
        if self.size == 0:
            return False
        # Move rear pointer backward (circularly)
        self.rear = (self.rear - 1 + self.k) % self.k
        self.size -= 1
        return True

    def getFront(self) -> int:
        if self.size == 0:
            return -1
        return self.deque[self.front]

    def getRear(self) -> int:
        if self.size == 0:
            return -1
        # The last element is just before rear
        return self.deque[(self.rear - 1 + self.k) % self.k]

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.k
```

### Time and Space complexity Analysis  

- **Time Complexity:** All operations are O(1) time, since all index manipulation is via modular arithmetic and directly accessing an array.
- **Space Complexity:** O(k) for the internal array of size k and a few integer pointers; no extra data structures are used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the max size k can be extremely large?
  *Hint: Can you make it work with a linked list, sacrificing some memory locality for flexibility?*

- What if you had to allow resizing the capacity dynamically?
  *Hint: Think about re-allocating the buffer and updating pointers for correctness.*

- How would your implementation change if you need to support concurrent enqueue/dequeue?
  *Hint: Consider thread-safety mechanisms or atomic operations for lock-free queues.*

### Summary
This problem leverages the fixed-size **circular buffer** pattern to allow efficient double-ended O(1) operations by careful pointer arithmetic. It’s a classic example of how ring buffers work for producer-consumer queues and circular scheduling.  
The same pattern is used for classic circular queues, round-robin tasks, and some memory-mapped applications.


### Flashcard
Use a fixed-size array and two pointers (front, rear) to implement circular deque with O(1) insert/delete at both ends.

### Tags
Array(#array), Linked List(#linked-list), Design(#design), Queue(#queue)

### Similar Problems
- Design Circular Queue(design-circular-queue) (Medium)
- Design Front Middle Back Queue(design-front-middle-back-queue) (Medium)