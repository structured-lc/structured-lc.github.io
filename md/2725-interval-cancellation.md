### Leetcode 2725 (Easy): Interval Cancellation [Practice](https://leetcode.com/problems/interval-cancellation)

### Description  
Given a function `fn`, an array of arguments `args`, and a time interval `t` (in ms), return a cancel function.  
When called, your function should:
- **Immediately** invoke `fn` with given `args`.
- Then, **repeatedly** call `fn(args)` every `t` milliseconds until canceled (using the function you returned).
- The cancel function, when called, must **stop any further invocations** of `fn`.

This is similar to implementing a custom setInterval with a cancel/stop capability.

### Examples  

**Example 1:**  
Input:  
`fn = (x) => x * 2, args = [4], t = 35, cancelT = 150`  
Output:  
```
{"time": 0, "returned": 8}
{"time": 35, "returned": 8}
{"time": 70, "returned": 8}
{"time": 105, "returned": 8}
{"time": 140, "returned": 8}
```
*Explanation: fn is called immediately at 0ms and then at each 35ms interval.  
Cancelled at 150ms so no further calls after 140ms.*

**Example 2:**  
Input:  
`fn = (a, b) => a + b, args = [2, 3], t = 25, cancelT = 80`  
Output:  
```
{"time": 0, "returned": 5}
{"time": 25, "returned": 5}
{"time": 50, "returned": 5}
{"time": 75, "returned": 5}
```
*Explanation: Calls at 0ms, 25ms, 50ms, 75ms (total 4 calls). Cancelled at 80ms.*

**Example 3:**  
Input:  
`fn = (x1, x2, x3) => x1 + x2 + x3, args = [5, 1, 3], t = 50, cancelT = 180`  
Output:  
```
{"time": 0, "returned": 9}
{"time": 50, "returned": 9}
{"time": 100, "returned": 9}
{"time": 150, "returned": 9}
```
*Explanation: fn is first called at 0ms, and then every 50ms, but stopped at 180ms (so no call at 200ms).*

### Thought Process (as if you’re the interviewee)  
The core of this problem is to implement a repeatable timer with manual cancellation:
- When the main function is called, immediately execute `fn(args)`.
- Then, use a timer mechanism to repeatedly call `fn(args)` every `t` ms.
- Since JavaScript’s `setInterval` can be canceled by `clearInterval`, in pure Python, we could use threading with a Timer, but in an interview, we simulate this pattern.
- Key: Store an internal reference (like `interval_id`) to allow us to clear/stop the repeating action through the cancel function.
- Ensure calling the cancel function prevents any further calls.

Trade-offs:  
- setInterval vs recursive setTimeout: Either can work, but recursive setTimeout can avoid possible drift and allows more control for cancellation.

### Corner cases to consider  
- `t = 0` (shouldn't repeatedly call instantly forever, but by constraint, t > 0)
- Immediate call of cancel() after starting (should allow just one call to fn)
- Long or blocking `fn` (can cause unwanted delays but out of scope)
- Arguments list (`args`) is empty
- Only one call scheduled before cancel
- Multiple calls to cancel() function (should not throw error)

### Solution

```python
import threading

def cancellable(fn, args, t):
    # Internal flag to track cancellation state
    cancelled = False

    # A lock to ensure correct synchronization
    lock = threading.Lock()

    # Helper to invoke fn(args) safely
    def invoke():
        return fn(*args)

    # Start by calling fn immediately
    invoke()

    # This will store reference to the Timer object
    timer_ref = {}

    def schedule_next():
        with lock:
            if cancelled:
                return
            timer = threading.Timer(t / 1000.0, run)
            timer_ref['timer'] = timer
            timer.start()

    def run():
        if not is_cancelled():
            invoke()
            schedule_next()

    def is_cancelled():
        with lock:
            return cancelled

    # Schedule the first interval after t ms
    schedule_next()

    # The cancel function to be returned
    def cancel():
        nonlocal cancelled
        with lock:
            cancelled = True
            if 'timer' in timer_ref:
                timer_ref['timer'].cancel()

    return cancel
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each call to `fn` is O(1) (excluding the complexity of `fn` itself).
  - The scheduling and cancellation are constant time relative to number of invocations.

- **Space Complexity:**  
  - O(1), only minimal variables and a reference to the most recent Timer object are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify this to limit the number of invocations to k times?  
  *Hint: Track an extra counter and stop after k calls.*

- What if the function can take different arguments each time?  
  *Hint: Use a queue or generate arguments per call.*

- How to handle errors from fn so it doesn't stop future invocations?  
  *Hint: Use try/except around fn(*args) so exceptions don't break the schedule.*

### Summary
This problem is a classic example of the **timer/cancel pattern**, mimicking `setInterval`/`clearInterval` in JavaScript.  
It’s commonly seen in frontend event handling, polling, and tasks needing repeated execution with manual stop.  
It reinforces understanding of timers, concurrency, and cancellation semantics, which are applicable in both frontend and backend scheduling problems.