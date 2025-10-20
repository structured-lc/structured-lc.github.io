### Leetcode 2676 (Medium): Throttle [Practice](https://leetcode.com/problems/throttle)

### Description  
Given a function `fn` and a time interval `t` in milliseconds, return a **throttled** version of `fn`.  
A throttled function executes *immediately* on the first call, but then *blocks* further executions for `t` ms.  
- If the throttled function is called again during that interval, save the latest arguments.  
- Once the interval ends, execute `fn` with the **latest saved arguments**, if any, and start a new interval.  
- This process repeats: only the first call in a window is immediate, and subsequent calls are coalesced and executed as one at the end of the interval using the *latest* arguments.

### Examples  

**Example 1:**  
Input: `t = 100, calls = [{"t":20,"inputs":[1]}]`  
Output: `[{"t":20,"inputs":[1]}]`  
*Explanation:  
The function is called at 20ms with input 1 — executes immediately.*

**Example 2:**  
Input: `t = 50, calls = [{"t":30,"inputs":[2]}, {"t":40,"inputs":[3]}, {"t":60,"inputs":[4]}]`  
Output: `[{"t":30,"inputs":[2]}, {"t":80,"inputs":[4]}]`  
*Explanation:  
- 30ms: Executes immediately with 2.  
- 40ms: Is within throttle window; stores `inputs=[3]`.  
- 60ms: Still within throttle; overwrites stored to `inputs=[4]`.  
- 80ms: Throttle ends; executes with latest stored (4).*

**Example 3:**  
Input: `t = 300, calls = [{"t":0,"inputs":[5]}, {"t":100,"inputs":}, {"t":400,"inputs":}, {"t":500,"inputs":}]`  
Output: `[{"t":0,"inputs":[5]}, {"t":300,"inputs":}, {"t":700,"inputs":}]`  
*Explanation:  
- 0ms: Executes immediately (5).  
- 100ms: Throttled; stored (6).  
- 400ms: Throttle ended at 300ms; executes stored (6).  
- 500ms: Throttled; stored (8).  
- 700ms: Throttle ended; executes stored (8).*

### Thought Process (as if you’re the interviewee)  
- The brute-force solution is to block all calls except the first in each window of t ms.  
- But since we need to execute fn again after t ms with the **latest arguments** from any calls during throttling, we need to:
  - Track if we’re in throttle period (simple boolean flag).
  - On first call, execute immediately and start the timer (setTimeout).
  - On reentry during the throttle, record latest arguments.
  - When the timer expires: If pending arguments recorded, execute fn with those, and restart throttle for another t ms. Clear stored arguments.
- Repeat above: If there are no new calls in throttle period, nothing more to do.
- This is more complex than debounce, because we allow *regular* execution every t ms, but always with the *latest* coalesced call within each window.
- Use minimal state: isThrottled, pendingArgs, timer reference.

**Trade-offs**:
- Each window might cause an "extra" execution, but always with the *latest* arguments.
- State management is simple, and only one timer is ever active.

### Corner cases to consider  
- Only one function call ever (should just run immediately).
- Multiple calls but all ≥ t ms apart (all run immediately; no throttling).
- Multiple calls in quick succession (all but first and last coalesced/discarded).
- No pending call when throttle interval ends (should not do anything).
- Inputs can be non-primitive (need to store as reference, not by value).

### Solution

```python
# We must write a throttle function that takes `fn` and `t` (ms).
# The returned function, when invoked, behaves as described above.
from threading import Timer

def throttle(fn, t):
    is_throttled = False     # Are we in throttle period?
    pending_args = None      # Arguments for next scheduled execution
    timer = None             # Reference to Timer object

    def run_pending():
        nonlocal pending_args, is_throttled, timer
        if pending_args is not None:
            # Execute with last pending arguments
            fn(*pending_args)
            pending_args = None
            # Restart throttle and timer
            timer = Timer(t / 1000, run_pending)
            timer.start()
        else:
            # No pending work: clear throttle state
            is_throttled = False

    def throttled(*args):
        nonlocal is_throttled, timer, pending_args
        if not is_throttled:
            # Run function immediately
            fn(*args)
            is_throttled = True
            # Start timer
            timer = Timer(t / 1000, run_pending)
            timer.start()
        else:
            # Throttle period: overwrite with latest arguments
            pending_args = args

    return throttled
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each call is O(1), except when executing `fn`, which costs whatever `fn` itself does.
  - Over n calls, at most O(n) in total, but only O(1) extra per call for throttling logic.

- **Space Complexity:**  
  - O(1): We only store a fixed set of variables per throttled function (pending_args, flags, timer), never scaling with the number of calls.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this in JavaScript, given `setTimeout` and closures?  
  *Hint: Think about capturing state via closure, and clearing/restarting timers as needed.*

- How would you modify to drop all calls during the throttle window, rather than saving latest?  
  *Hint: Omit the pending_args logic and always ignore calls during throttle.*

- How do you make this reusable for async functions that return promises?  
  *Hint: Chain or queue the promises for correct result invocation and error reporting.*

### Summary
This problem uses the **throttling** pattern for rate-limiting function executions, a common tool in UI and event handling (debounce, throttle). The key coding technique is careful management of pending state and timers to ensure only the *first* and *latest* events fire in each throttle window. This pattern applies in scroll listeners, search-as-you-type, or network polling control.


### Flashcard
Execute fn immediately on first call and start timer; during throttle period, store latest arguments; when timer expires, execute fn with stored arguments if any, then reset throttle flag.

### Tags

### Similar Problems
- Debounce(debounce) (Medium)
- Promise Time Limit(promise-time-limit) (Medium)
- Promise Pool(promise-pool) (Medium)