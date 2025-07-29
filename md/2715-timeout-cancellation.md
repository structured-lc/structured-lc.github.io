### Leetcode 2715 (Easy): Timeout Cancellation [Practice](https://leetcode.com/problems/timeout-cancellation)

### Description  
Given a function fn, an array of arguments args, and a timeout in milliseconds t, implement a function cancellable that schedules a call to fn(...args) after t milliseconds. It must return a cancel function that can be called before t milliseconds to prevent fn from executing.  
In other words:  
- If cancel() is called before t ms elapse, fn is never called.  
- If cancel() is not called within t ms, fn is called exactly once with the provided args.

### Examples  

**Example 1:**  
Input: `fn = log, args = ['Hello'], t = 1000`  
Output:  
*(Logs 'Hello' after 1 second)*  
*Explanation: The cancellable function returns a cancel function. If cancel is *not* called within 1000ms, fn('Hello') runs after 1s.*

**Example 2:**  
Input: `fn = add, args = [2, 4], t = 3000`, then `cancel()` called after 1000ms  
Output:  
*(No output)*  
*Explanation: Since cancel was called after 1000ms (before t=3000ms), the scheduled execution of fn(2,4) was canceled.*

**Example 3:**  
Input: `fn = sayHi, args = ['Obi-Wan'], t = 2000`, call `cancel()` after 2100ms  
Output:  
*(Logs 'Hi, Obi-Wan' after 2 seconds)*  
*Explanation: cancel() was called after t elapsed, so it had no effect. The function executed after 2s as scheduled.*

### Thought Process (as if you’re the interviewee)  
At first glance, this is a typical use case for setTimeout. You'd use setTimeout to schedule fn(...args) after t milliseconds. However, we also need to return a cancel function that can potentially prevent fn from executing.  
The brute-force solution is to store the identifier returned by setTimeout, then use clearTimeout in the cancel function to cancel the scheduled execution.  
This relies on JavaScript's built-in timer handling.  
For interview readiness, I would:  
- Store the timer id from setTimeout.  
- In the cancel function, call clearTimeout(timerId) to cancel the timeout.

This approach is optimal because:  
- setTimeout/clearTimeout are O(1) operations.  
- No extra data structures or complex logic is needed.  
- The closure allows us to access timerId within the cancel function.

### Corner cases to consider  
- t = 0 (should execute immediately unless canceled right away)
- cancel called more than once (should be idempotent; clearTimeout on an already-cleared id is fine)
- fn throws an error (shouldn't crash the cancel logic)
- args is empty (should pass no arguments to fn)
- cancel is never called (fn should always execute unless canceled)
- cancel called after the timeout fires (should have no effect)
- fn is asynchronous or synchronous

### Solution

```python
def cancellable(fn, args, t):
    """
    Schedules fn(*args) for execution in t milliseconds.
    Returns a cancel function to stop fn from executing if called before t ms.
    """
    import threading

    # Store a flag to know if cancelled
    cancelled = {"flag": False}

    def wrapper():
        # Only run fn if not cancelled
        if not cancelled["flag"]:
            fn(*args)

    # Start the timer
    timer = threading.Timer(t / 1000, wrapper)
    timer.start()

    def cancel():
        cancelled["flag"] = True
        timer.cancel()

    return cancel
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for scheduling and canceling (setTimeout/clearTimeout or threading.Timer/cancel are constant time).
- **Space Complexity:** O(1), as only a timer reference and a small dict are stored regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to support rescheduling to a new timeout?
  *Hint: Think about storing additional state in the closure or class and how to restart the timer safely.*

- What if you want the cancel function to indicate if it successfully canceled the execution?
  *Hint: Have cancel return a boolean indicating whether cancellation succeeded before execution began.*

- How would you implement this for repeated execution (like setInterval) instead of once?
  *Hint: Consider how to restart the timer repeatedly and how cancellation should end all pending scheduled runs.*

### Summary
This is a classic use of closures to encapsulate a reference to a timer, making it possible to cancel scheduled asynchronous work. The pattern appears frequently in user interfaces (debounced actions, delayed notifications) and is foundational to event-driven programming.