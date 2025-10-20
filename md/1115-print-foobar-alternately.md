### Leetcode 1115 (Medium): Print FooBar Alternately [Practice](https://leetcode.com/problems/print-foobar-alternately)

### Description  
You are given two methods, foo() and bar(), each running in separate threads. Each method should print "foo" or "bar" respectively, n times. However, the output must always alternate as "foobar" n times (e.g., "foobarfoobar..." for n=2). You must synchronize these two threads so the correct order is always achieved, regardless of the threads' execution speed or scheduling.  
This is a classic thread synchronization problem where you must ensure strict alternation between the outputs of the two methods.

### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `foobar`  
*Explanation: Two threads run foo() and bar(). The output should be "foobar" once, with "foo" always immediately followed by "bar".*

**Example 2:**  
Input: `n = 2`  
Output: `foobarfoobar`  
*Explanation: The output must alternate, producing "foo" then "bar" for each of the 2 repetitions, so the final output is "foobarfoobar".*

**Example 3:**  
Input: `n = 3`  
Output: `foobarfoobarfoobar`  
*Explanation: Thread-safe alternation still holds for any n. Each "foo" must be followed by a "bar".*

### Thought Process (as if you’re the interviewee)  
To solve this, my first thought was to use some form of locking or signaling between the threads to enforce the strict order. Brute-force busy-waiting or simple locking would be inefficient or error-prone. Python threading primitives let us coordinate threads safely.

A good way is to use synchronizing primitives like Semaphores:
- Initialize `foo`'s permit to 1 (so it prints first) and `bar`'s permit to 0.
- When foo() prints "foo", it releases a permit for bar(). bar() waits for its permit, prints "bar", and then releases to foo().
- This ensures "foo" and "bar" always alternate, no matter how the OS schedules the threads.
- Alternatives like Locks or Condition variables could also work, but semaphores keep the code clean and easy to understand.

Trade-offs:
- Semaphore-based design is clean and minimal in memory usage, avoids busy-waiting, and shows clear signaling.

### Corner cases to consider  
- n = 1 (only one pair should be printed)
- n large (order and correctness must still hold for n=1000)
- Thread scheduling: ensure correctness regardless of execution order or delays
- Atomicity: print actions and semaphore releases must not be reordered

### Solution

```python
import threading

class FooBar:
    def __init__(self, n):
        self.n = n
        # foo_semaphore starts unlocked to let foo print first; bar_semaphore is locked
        self.foo_semaphore = threading.Semaphore(1)
        self.bar_semaphore = threading.Semaphore(0)

    def foo(self, printFoo):
        for _ in range(self.n):
            self.foo_semaphore.acquire()
            # printFoo() outputs "foo"
            printFoo()
            # Let bar() run next
            self.bar_semaphore.release()

    def bar(self, printBar):
        for _ in range(self.n):
            self.bar_semaphore.acquire()
            # printBar() outputs "bar"
            printBar()
            # Let foo() run next
            self.foo_semaphore.release()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each thread loops n times, doing constant-time synchronization and printing work per iteration.

- **Space Complexity:** O(1)  
  Only two semaphore objects and a couple of counters are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify your approach to print "foo" and "bar" alternately, but with k repetitions of "foo" followed by k repetitions of "bar" for each alternation?  
  *Hint: Consider using additional state or variables to count, or change the release order.*

- What changes if you need to support three threads for "foo", "bar", and "baz", printing "foobarbaz" repeatedly?  
  *Hint: Sequence your semaphores or condition variables circularly for three.*

- How would you handle the scenario if printFoo and printBar could sometimes throw exceptions?  
  *Hint: Ensure semaphore state remains consistent by using try/finally blocks.*

### Summary
This problem is a classic example of thread synchronization, using the Semaphore pattern to enforce strict alternation. The key coding pattern is signaling (or "turn-taking") between threads, which also appears in problems like "Print Zero Even Odd" or three-thread alternation. Core ideas: efficient mutual exclusion, no busy-waiting, and clean, minimal resources. This problem builds strong understanding of concurrency primitives and concepts.


### Flashcard
Use two semaphores (foo starts at 1, bar at 0); foo prints then releases bar, bar prints then releases foo.

### Tags
Concurrency(#concurrency)

### Similar Problems
- Print in Order(print-in-order) (Easy)
- Print Zero Even Odd(print-zero-even-odd) (Medium)