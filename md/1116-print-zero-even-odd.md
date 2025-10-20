### Leetcode 1116 (Medium): Print Zero Even Odd [Practice](https://leetcode.com/problems/print-zero-even-odd)

### Description  
Implement a class that controls *three threads*:  
- One thread prints only **0**,
- One thread prints only **even** numbers,
- One thread prints only **odd** numbers.

Given an integer **n**, print the sequence: `0 1 0 2 0 3 ... 0 n` (i.e., alternating zeros followed by the next odd/even number), so that the output has length `2n`. Each thread should only print its designated values, and prints must happen strictly in the pattern: 0, 1, 0, 2, 0, 3, ..., up to n. Thread execution and output order must be synchronized to form the correct sequence.  

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `0102`  
*Explanation: Threads print: 0 (zero thread), 1 (odd thread), 0 (zero thread), 2 (even thread).*

**Example 2:**  
Input: `n = 3`  
Output: `010203`  
*Explanation: Prints sequence: 0 1 0 2 0 3. Each 0 is always followed by alternating odd/even numbers.*

**Example 3:**  
Input: `n = 1`  
Output: `01`  
*Explanation: Only 0 (zero thread) and 1 (odd thread) are printed, since 1 is the only number in range.*

### Thought Process (as if you’re the interviewee)  
To synchronize three threads so that they print in the required alternating order, we need a way to **coordinate access** so that:
- Zero is always printed first.
- No thread prints out of turn.
- The even and odd threads only print after zero has been printed.

A simple brute-force idea with busy waiting (checking conditions in a loop) isn't efficient and could cause wasted CPU cycles (spinlocks), and may interleave outputs incorrectly due to race conditions.

A **better approach** is to use synchronization primitives, such as semaphores or locks/condition variables. Semaphores allow us to control which thread should proceed:
- Use three semaphores/flags:
    - One for the zero thread (starting unlocked).
    - One for the odd thread (locked).
    - One for the even thread (locked).
- The zero thread prints a 0, then releases either the odd or even semaphore, depending on what number comes next.
- Odd/even threads print their number, then unlock the zero semaphore for the next round.

This guarantees mutual exclusion and preserves the required order. Trade-off: slightly more complex than naive approaches, but very efficient and robust for thread coordination.

### Corner cases to consider  
- n = 1 (only odd thread will print after zero; no even number).
- Large n (check for deadlocks or race conditions).
- Output is strictly in the order: 0 x 0 x 0 x ... (alternates perfectly).
- Ensure no extra prints or missed numbers at the ends.

### Solution

```python
import threading

class ZeroEvenOdd:
    def __init__(self, n):
        self.n = n
        self.zero_sem = threading.Semaphore(1)
        self.even_sem = threading.Semaphore(0)
        self.odd_sem = threading.Semaphore(0)

    def zero(self, printNumber):
        for i in range(1, self.n + 1):
            self.zero_sem.acquire()
            printNumber(0)
            if i % 2 == 1:
                self.odd_sem.release()
            else:
                self.even_sem.release()

    def even(self, printNumber):
        for i in range(2, self.n + 1, 2):
            self.even_sem.acquire()
            printNumber(i)
            self.zero_sem.release()

    def odd(self, printNumber):
        for i in range(1, self.n + 1, 2):
            self.odd_sem.acquire()
            printNumber(i)
            self.zero_sem.release()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each thread prints exactly the numbers required (0 to n), and synchronizations are O(1) per print.

- **Space Complexity:** O(1)  
  Only a fixed number of semaphores and variables are used regardless of input size n.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this solution for more than three kinds of threads (e.g., print “0”, “1”, “2”, ...) in order?  
  *Hint: How would you structure the semaphores to enforce order for arbitrary patterns?*

- How would the solution change if you had to collect the numbers in a list or string instead of directly printing?  
  *Hint: Consider thread safety in shared data structure writes. Use thread-safe structures or additional synchronization.*

- If one thread is significantly slower than the others, how would your design behave?  
  *Hint: Analyze for potential bottlenecks or starvation. Semaphores force waiting—no thread can get ahead.*

### Summary
This problem is a classic example of the **Thread Coordination/Alternation** pattern using **semaphores**. It requires precise ordering of actions by different threads, a common need in producer-consumer or reader-writer problems. This pattern applies broadly for synchronizing threads for interleaved or round-robin output, and can be adapted for more complex concurrent workflows.


### Flashcard
Use three semaphores to coordinate: zero prints and alternately releases even/odd semaphore based on current number parity.

### Tags
Concurrency(#concurrency)

### Similar Problems
- Print FooBar Alternately(print-foobar-alternately) (Medium)
- Fizz Buzz Multithreaded(fizz-buzz-multithreaded) (Medium)