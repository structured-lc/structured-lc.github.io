### Leetcode 1195 (Medium): Fizz Buzz Multithreaded [Practice](https://leetcode.com/problems/fizz-buzz-multithreaded)

### Description  
You are given a classic FizzBuzz task: print the numbers from 1 to n, but with rules:
- For numbers divisible by 3 only, print "fizz" instead of the number.
- For numbers divisible by 5 only, print "buzz" instead of the number.
- For numbers divisible by both 3 and 5, print "fizzbuzz" instead of the number.
- Otherwise, print the number itself.

The twist: you must implement this in a multithreaded way, using four threads – one thread prints "fizz", one prints "buzz", one prints "fizzbuzz", and one prints numbers. Each thread should print its output in the correct order, and only when it's allowed according to the current number. Threads must fully coordinate to produce the standard FizzBuzz sequence without overlaps, race conditions, or out-of-order outputs.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `1, 2, fizz, 4, buzz`  
*Explanation: For i = 1, 2 print number. 3 → "fizz" (divisible by 3). 4 → 4. 5 → "buzz" (divisible by 5).*

**Example 2:**  
Input: `n = 15`  
Output: `1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz`  
*Explanation: At every multiple of 3 but not 5 print "fizz", at every multiple of 5 but not 3 print "buzz", at multiples of both print "fizzbuzz", otherwise print the number.*

**Example 3:**  
Input: `n = 3`  
Output: `1, 2, fizz`  
*Explanation: 1 and 2 just print the numbers, 3 prints "fizz".*

### Thought Process (as if you’re the interviewee)  

Start with **brute force**: Each thread could loop over the range 1 to n, check if it should print for each i, print if allowed.  
- **Problem:** Threads can race; prints may go out of order, or a number may be printed by two threads.

**Synchronization** is needed.  
- One idea: Use a shared counter and a synchronization object, like a Condition or Semaphore.  
- Each thread waits until the current number matches what it should handle. E.g., the fizz thread waits until the counter is divisible by 3 but not 5.  
- After any thread prints, increment the counter and notify all waiting threads to check if they can act next.  
- Loop continues until counter > n.

**Trade-offs:**  
- This uses locking and wait/notify, but keeps the logic and output correct and in-order.
- Semaphores could also be used so only the correct thread wakes at each step, but care is needed to maintain the right wakeups.

I prefer the synchronized shared counter with methods for each thread, as it is simple and commonly used for coordination in multithreaded patterns.

### Corner cases to consider  
- n = 0 or negative → nothing should be printed
- n = 1 (no "fizz", "buzz", or "fizzbuzz")
- n = 3 or 5 (only one special case occurs)
- Large n (thread safety, performance)
- Multiple threads spurious wakeups (real CPython locks handle this, but must be ready for signaling issues)
- Output order: strict sequence

### Solution

```python
import threading

class FizzBuzz:
    def __init__(self, n: int):
        self.n = n
        self.current = 1
        self.lock = threading.Condition()
        
    # printFizz() outputs "fizz"
    def fizz(self, printFizz):
        while True:
            with self.lock:
                while self.current <= self.n and \
                    (self.current % 3 != 0 or self.current % 5 == 0):
                    self.lock.wait()
                if self.current > self.n:
                    self.lock.notify_all()
                    return
                printFizz()
                self.current += 1
                self.lock.notify_all()
        
    # printBuzz() outputs "buzz"
    def buzz(self, printBuzz):
        while True:
            with self.lock:
                while self.current <= self.n and \
                    (self.current % 5 != 0 or self.current % 3 == 0):
                    self.lock.wait()
                if self.current > self.n:
                    self.lock.notify_all()
                    return
                printBuzz()
                self.current += 1
                self.lock.notify_all()
        
    # printFizzBuzz() outputs "fizzbuzz"
    def fizzbuzz(self, printFizzBuzz):
        while True:
            with self.lock:
                while self.current <= self.n and \
                    (self.current % 3 != 0 or self.current % 5 != 0):
                    self.lock.wait()
                if self.current > self.n:
                    self.lock.notify_all()
                    return
                printFizzBuzz()
                self.current += 1
                self.lock.notify_all()
        
    # printNumber(x) outputs "x", where x is an integer.
    def number(self, printNumber):
        while True:
            with self.lock:
                while self.current <= self.n and \
                    (self.current % 3 == 0 or self.current % 5 == 0):
                    self.lock.wait()
                if self.current > self.n:
                    self.lock.notify_all()
                    return
                printNumber(self.current)
                self.current += 1
                self.lock.notify_all()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each number from 1 to n is processed exactly once, one print per step.
- **Space Complexity:** O(1) — No extra storage beyond the shared counter, lock, and control variables regardless of n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you add a new rule?  
  *Hint: How would you generalize the structure to handle additional custom rules for output, possibly with more threads?*

- How would it change if multiple FizzBuzz sequences run in parallel?  
  *Hint: Think about resource sharing, thread safety, and isolation.*

- Could you implement using lower-level synchronization primitives (Semaphores or Events)?  
  *Hint: How would the solution change if you restrict the use of threading.Condition?*

### Summary
This problem uses the classic **multi-condition, multi-thread, producer pattern**. The solution applies coordination via a shared state and synchronized condition variables, allowing exactly one appropriate thread to act at each point. This pattern is broadly useful for ordered processing by multiple actors, queue consumers, or thread-driven pipelines with strict sequencing requirements.

### Tags
Concurrency(#concurrency)

### Similar Problems
- Fizz Buzz(fizz-buzz) (Easy)
- Print Zero Even Odd(print-zero-even-odd) (Medium)