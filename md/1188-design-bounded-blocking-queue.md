### Leetcode 1188 (Medium): Design Bounded Blocking Queue [Practice](https://leetcode.com/problems/design-bounded-blocking-queue)

### Description  
Implement a thread-safe **bounded blocking queue** with a fixed maximum size.  
- When you **enqueue** an element and the queue is full, the calling thread should block until space becomes available.
- When you **dequeue** and the queue is empty, the calling thread should block until an element is available.
- The queue must support:
  - Initialization with a positive integer `capacity`.
  - `enqueue(int element)` — adds to the queue, blocks if full.
  - `dequeue()` — removes and returns the oldest element, blocks if empty.
  - `size()` — returns the number of items currently in the queue.
All operations must be **thread-safe** as this is tested in a multi-threaded environment. Do **not** use any built-in bounded blocking queue from standard libraries.

### Examples  

**Example 1:**  
Input:  
`["BoundedBlockingQueue","enqueue","enqueue","dequeue","size"]`,  
`[[2],[1],[2],[],[]]`  
Output:  
`[null,null,null,1,1]`  
*Explanation:  
- Create queue with capacity=2.  
- Enqueue 1, Enqueue 2; now the queue is [1,2].  
- Dequeue removes 1; queue becomes [2].  
- Size returns 1.*

**Example 2:**  
Input:  
`["BoundedBlockingQueue","enqueue","enqueue","enqueue","dequeue","dequeue","dequeue","enqueue","size"]`  
`[[3],[1],,[2],[],[],[],[3],[]]`  
Output:  
`[null,null,null,null,1,0,2,null,1]`  
*Explanation:  
- Init with capacity=3.  
- Enqueue 1, 0, and 2 (queue is [1, 0, 2]).  
- Dequeue three times, outputs: 1, 0, 2.  
- Enqueue 3 (queue is [3]).  
- Size returns 1.*

**Example 3:**  
Input:  
`["BoundedBlockingQueue","dequeue","enqueue","enqueue","dequeue"]`,  
`[[2],[],[1],[2],[]]`  
Output:  
`[null,blocks,null,null,1]`  
*Explanation:  
- Attempting to dequeue from empty queue will block.  
- Once an item is enqueued, the blocked consumer will proceed and return it (1).*

### Thought Process (as if you’re the interviewee)  
My goal is to safely manage a queue where producers (enqueue) and consumers (dequeue) operate concurrently, but are **blocked** if the queue is full or empty respectively.  
- Naive single-threaded implementations won't suffice here, as the queue must guarantee safety across multiple threads.
- The pattern for this is **producer-consumer** using rendezvous — this typically means using **locks + condition variables**, or **semaphores** to synchronize the threads.
- I will use:
  - A **lock** for synchronized access to the queue's internals.
  - Two **condition variables** (or two semaphores): one for "not full" (so producers can wait), and one for "not empty" (so consumers can wait).
- When **enqueue** is called and the queue is full, the producer waits on "not full".  
- When **dequeue** is called and the queue is empty, the consumer waits on "not empty".
- When either operation modifies the queue, we notify the other condition if useful (e.g., after enqueuing, notify "not empty").
- This ensures correctness and avoids busy-waiting.

### Corner cases to consider  
- Enqueue when queue is full (producer blocks, no busy-looping)
- Dequeue when queue is empty (consumer blocks)
- Multiple producers or consumers waking and racing for slots/space
- Correctness of size/count under high concurrency
- Spurious wakeups on condition variables
- Queue of capacity 1 (classic edge case for blocking)
- Rapid sequences of enqueue/dequeue causing constant churn

### Solution

```python
import threading

class BoundedBlockingQueue:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.queue = []
        self.lock = threading.Lock()
        self.not_empty = threading.Condition(self.lock)
        self.not_full = threading.Condition(self.lock)
        
    def enqueue(self, element: int) -> None:
        with self.not_full:
            # Wait until queue is not full
            while len(self.queue) == self.capacity:
                self.not_full.wait()
            self.queue.append(element)
            # Notify a waiting consumer that there's at least one item
            self.not_empty.notify()
        
    def dequeue(self) -> int:
        with self.not_empty:
            # Wait until queue is not empty
            while len(self.queue) == 0:
                self.not_empty.wait()
            result = self.queue.pop(0)
            # Notify a waiting producer that there's space
            self.not_full.notify()
            return result
        
    def size(self) -> int:
        with self.lock:
            return len(self.queue)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `enqueue` and `dequeue` are O(1) **amortized** (list pop(0) is O(n), but using deque makes it O(1); in interviews you can mention collections.deque if allowed).  
  - `size` is O(1).
- **Space Complexity:**  
  - O(n), where n = capacity, as that's the max number of elements held in the queue at once.

### Potential follow-up questions (as if you’re the interviewer)  

- What if multiple producers/consumers are adding/removing at the same time? How does your implementation prevent race conditions?  
  *Hint: Focus on how the lock and condition variables guarantee exclusivity and avoid missed signals.*

- How would you implement this queue to guarantee fairness (FIFO) for blocked producers/consumers?  
  *Hint: Consider queueing the waiting threads themselves or use fair locks where possible.*

- How would you avoid busy-waiting or lost wakeups?  
  *Hint: Explore the importance of using proper condition wait/notify patterns and possible use of semaphores.*

### Summary
This solution uses the **producer-consumer pattern** with a lock and two condition variables to manage coordination between threads. It's a classic **concurrency pattern** for resource pools, buffers, and scheduling, and appears in problems involving thread-safe bounded buffers, task queues, and cross-thread data exchange. The core technique is applicable anywhere you need to synchronize access to fixed-size shared resources among competing threads.