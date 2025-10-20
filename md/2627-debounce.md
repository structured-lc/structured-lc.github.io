### Leetcode 2627 (Medium): Debounce [Practice](https://leetcode.com/problems/debounce)

### Description  
Given a function `fn` and an integer `t` in milliseconds, implement a **debounced** version of `fn`.  
A debounced function delays its execution by `t` ms after each call.  
If the debounced function is called again **within** the delay window, the previous pending execution is **canceled** and the timer resets.  
Only the last call in a burst of rapid calls will actually execute, exactly `t` ms after the last call.  
The debounced function must accept any number of arguments, and call the original `fn` with them after the wait.  
This is often used to improve efficiency, e.g., in search bars to limit requests after a user stops typing.  


### Examples  

**Example 1:**  
Input:  
```js
debouncedFn = debounce(fn, 50)
debouncedFn("A") at 30ms  
debouncedFn("B") at 60ms  
debouncedFn("C") at 100ms  
```
Output:  
`fn("C")` runs at 150ms  
*Explanation: Each call resets the 50ms timer. Only the last call, "C" at 100ms, isn't interrupted, so `fn("C")` runs at 150ms.*

**Example 2:**  
Input:  
```js
debouncedFn = debounce(fn, 35)
debouncedFn("X") at 30ms  
debouncedFn("Y") at 60ms  
debouncedFn("Z") at 100ms  
```
Output:  
`fn("Y")` runs at 95ms  
`fn("Z")` runs at 135ms  
*Explanation: "X" at 30ms is canceled by "Y" at 60ms. "Y" isn't canceled in 35ms (next call at 100ms), so `fn("Y")` runs at 95ms. Similarly, "Z" at 100ms isn't canceled, so runs at 135ms.*

**Example 3:**  
Input:  
```js
debouncedFn = debounce(fn, 250)
debouncedFn("search") at 400ms  
```
Output:  
`fn("search")` runs at 650ms  
*Explanation: A single call, so it runs after a 250ms delay at 650ms.*

### Thought Process (as if you’re the interviewee)  
First, understand what a debounce operation must accomplish:
- Delay execution until _after_ t ms have passed since the last call.
- Cancel any pending execution if the debounced function is called again within t ms.
- Save the latest set of arguments for the original function.

**Brute-force:**  
On each call, start a `setTimeout` to run after t ms, but there's no way to cancel old timers, so previous invocations could still run — not correct.

**Correct approach:**  
We need a single active timer at any moment.  
On every call:
- `clearTimeout` any existing timer, so prior pending executions are canceled.
- Store the latest arguments.
- Set a new `setTimeout` for t ms.
When the timer fires, call `fn` with the stored arguments.

This pattern makes sure only the last call will cause `fn` to run after t ms of inactivity.

**Trade-offs:**  
- Simple and reliable — each call is O(1).
- Only the "latest" values are saved.
- Covers corner cases such as rapid/frequent invocations and argument handling.

### Corner cases to consider  
- Function is never called (nothing should happen).
- Function is called only once (should run after the delay).
- Multiple calls before delay expires (only last one matters).
- Original `fn` is async/sync (should just pass arguments along, no special async handling needed).
- Calls with different arguments (only the latest arguments at debounce expiry matter).
- Large debounce interval (timer management must be robust).

### Solution

```python
# Although problem is for JavaScript, here's a Python version using similar timing logic.
# Note: For real asynchronous timing in Python, threading.Timer is used instead of setTimeout.

import threading

def debounce(fn, t):
    """
    Returns a debounced version of fn, delayed by t ms after the last call.
    """
    timer = None  # Keep track of the current timer
    lock = threading.Lock()  # To prevent race conditions in multithreaded calls

    def debounced(*args, **kwargs):
        nonlocal timer
        def run():
            fn(*args, **kwargs)

        with lock:
            if timer:
                timer.cancel()  # Cancel the pending call if any
            timer = threading.Timer(t / 1000.0, run)
            timer.start()

    return debounced
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(1) per function call. Timer creation and cancellation are both O(1) operations.

- **Space Complexity:**  
  O(1) additional space. Only a reference to the current timer and the latest arguments are stored, regardless of number of calls.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support a "leading edge" debounce, where the function can run immediately on the first call, then block further calls for t ms?  
  *Hint: Add a flag to control whether to execute immediately or after delay.*

- How would you cancel a pending execution if you need to remove the debouncer entirely?  
  *Hint: Expose a `.cancel()` method on the debounced function to clear the timer.*

- Can you throttle instead of debounce, i.e., guarantee the function runs at most once per t ms, but not _only_ at the trailing edge?  
  *Hint: Use timestamps to keep track of last execution time.*

### Summary
This problem is a classic use of **the debounce pattern**, useful in UI, search bars, and event-driven "burst" activity.  
It requires understanding of timers, closures, and stateful function wrappers.  
The core idea is "reset and delay" — ensuring only the last call within a window takes effect.  
This is a standard interview pattern, with applications in both frontend (JS) and backend (async jobs, rate limiting).  
Patterns learned here generalize to throttling, batching, or any "defer and coalesce" workflow.


### Flashcard
Debounce a function by delaying execution until after a specified time `t` has passed since the last call, canceling any pending execution if called again within `t` ms.

### Tags

### Similar Problems
- Promise Time Limit(promise-time-limit) (Medium)
- Cache With Time Limit(cache-with-time-limit) (Medium)
- Throttle(throttle) (Medium)