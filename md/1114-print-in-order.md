### Leetcode 1114 (Easy): Print in Order [Practice](https://leetcode.com/problems/print-in-order)

### Description  
You are asked to design a class Foo with three methods: `first()`, `second()`, and `third()`. Each of these is intended to be run by a different thread. Implement the methods so that, no matter which thread starts first or what order the operating system schedules them, the output always happens in the order: `first()`, then `second()`, then `third()`. Each method receives as argument a function to call (e.g., `printFirst`, `printSecond`, `printThird`), which should be executed in the correct order.

### Examples  

**Example 1:**  
Input:  
Thread A calls `first(printFirst)`,  
Thread B calls `second(printSecond)`,  
Thread C calls `third(printThird)`,  
Threads may be scheduled in any order.  
Output:  
`firstsecondthird`  
Explanation. Even if thread C (third) starts first, it waits until `second()` is done, which waits for `first()`.

**Example 2:**  
Input:  
All threads start nearly at the same time but in different orders on repeated runs.  
Output:  
`firstsecondthird`  
Explanation. The class must ensure threads wait for their rightful turn, regardless of scheduler behavior.

**Example 3:**  
Input:  
Thread B starts slightly before thread A, but both are ready.  
Output:  
`firstsecondthird`  
Explanation. Even if second tries to print first, it cannot proceed until `first()` completes.

### Thought Process (as if you’re the interviewee)  
The heart of this problem is **thread synchronization**. Since threads may be scheduled in any order and may race, we need a way for:
- `second()` to wait for `first()`
- `third()` to wait for `second()`

Brute-force: Spin in a loop checking flags, but that’s inefficient (busy-waiting wastes CPU).

Better: Use synchronization primitives:
- **Locks/condition variables**: Can lock shared variables and use `.wait()`/`.notify()` to coordinate.
- **Semaphores**: Each method releases a permit for the next one.
- **CountDownLatch or similar**: Each method only continues when latch is released for its turn.

Approach:
- Use two semaphores (or threading.Events if in Python):  
  - `second` waits on `first_done`  
  - `third` waits on `second_done`  
  Only allow each method to proceed when its predecessor has completed.

This is cleaner and avoids busy-waiting. Nearly all interview-standard solutions use Events/Semaphores/condition variables for this.

### Corner cases to consider  
- Threads may start in any order.
- Delays between thread starts.
- All threads start simultaneously.
- System is single-core, threads rapidly context-switch.
- Correctness regardless of repeated runs.
- No guarantee that methods are called only once.

### Solution

```python
import threading

class Foo:
    def __init__(self):
        # Create two events
        self.first_done = threading.Event()
        self.second_done = threading.Event()

    def first(self, printFirst):
        # printFirst() outputs "first"
        printFirst()
        # Signal that first is done
        self.first_done.set()

    def second(self, printSecond):
        # Wait until first() is done
        self.first_done.wait()
        printSecond()
        # Signal that second is done
        self.second_done.set()

    def third(self, printThird):
        # Wait until second() is done
        self.second_done.wait()
        printThird()
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each method runs in O(1), since we only signal/wait and print—no loops or extra processing.
- **Space Complexity:** O(1) for the two event or semaphore objects; no significant extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you extend your solution to N methods in order, not just three?  
  *Hint: Think of an array/list of events or counting semaphores for N-1 barriers.*

- Can you do this without using language-provided synchronization (implement your own primitive)?  
  *Hint: Busy-waiting on shared flags/variables and careful ordering, but at the cost of CPU efficiency.*

- How does your approach behave under spurious wakeups or exceptions?  
  *Hint: Are `.wait()` operations safe against random returns? Consider robust waiting techniques.*

### Summary
This is a classic **concurrency coordination pattern**: "ensure N threads run in sequence." The pattern uses signaling primitives like Events or Semaphores to orchestrate strict execution order. It's foundational in thread synchronization and appears often in parallel task orchestration, pipeline processing, or when splitting complex workflows into ordered stages.