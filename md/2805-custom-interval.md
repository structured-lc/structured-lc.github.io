### Leetcode 2805 (Medium): Custom Interval [Practice](https://leetcode.com/problems/custom-interval)

### Description  
Implement two functions:

- **customInterval(fn, delay, period)**: Schedules repeated invocation of a function `fn`. The first execution happens after `delay` milliseconds. Each subsequent execution happens after an interval that increases linearly by `period` milliseconds each time. The formula for the \(c^{th}\) execution (where \(c = 0, 1, 2, ...\)) is:  
  **Time till execution = delay + period × count**  
  Returns a unique `id` that can be used to clear this interval.
  
- **customClearInterval(id)**: Stops further execution of the function associated with the `id` returned by `customInterval`.

Think of it as a custom alternative to setInterval/setTimeout, but the interval between each execution gets larger by a constant amount each time.

### Examples  

**Example 1:**  
Input: `delay = 50`, `period = 20`, stop after 225ms  
Output: `[50, 120, 210]`  
*Explanation:*  
- 1st: 50 + 20×0 = 50 (at 50ms, call executed)  
- 2nd: 50 + 20×1 = 70 (70ms after last call; total so far: 120ms)  
- 3rd: 50 + 20×2 = 90 (90ms after last call; total so far: 210ms)  
- Stop at 225ms, so 3 calls.

**Example 2:**  
Input: `delay = 1000`, `period = 500`, stop after 2800ms  
Output: `[1000, 2500]`  
*Explanation:*  
- 1st call at 1000ms (delay + 0×period),  
- 2nd call at 1000 + 1000+500 = 2500ms,  
- Next would be at 1000+500+1000 = 3000+500=3500ms which is beyond stopTime. So, only two calls within 2800ms.

**Example 3:**  
Input: `delay = 100`, `period = 0`, stop after 250ms  
Output: `[100, 200, 300, ...]`  
*Explanation:*  
- All intervals are 100ms apart: 100, 200, 300, ... but stop after 250ms, so only two calls at 100ms and 200ms.

### Thought Process (as if you’re the interviewee)  
1. **Brute force**:  
   - Recursively use `setTimeout` for each tick; schedule the next call while the previous is running. For each one, compute how long to wait: delay + period × count.
   - Maintain an id-to-timeout mapping to allow canceling future executions with customClearInterval.
2. **Optimizations**:  
   - Consider only launching the next timeout after the current one triggers (to capture drift from slow execution).
   - Use a global map for managing ids to reference timeouts and latest count.
   - Trade-off: Works for async and handles drift, but if `fn` is very slow, intervals may accumulate drift.
3. **Final approach**:  
   - Use `setTimeout` to schedule next execution, so each delay is dynamically calculated and robust to varying time between executions.
   - Use a global object (dictionary) for interval bookkeeping and clearTimeout in customClearInterval.
   - This pattern is robust and standard for variable-delay interval simulation.

### Corner cases to consider  
- delay = 0, period = 0 (immediate, continuous looping).
- period = 0 (acts like setInterval).
- Stopping interval just before the next tick triggers; ensure no extra call is made.
- Repeated calls to customClearInterval with same/different ids.
- Scheduling functions that throw errors or take longer than scheduled periods.
- Multiple customInterval calls running simultaneously.

### Solution

```python
# Use unique ids and a dict to store timeout references
# Works similar to setInterval/setTimeout cancellation bookkeeping

import threading
import time

_interval_map = {}
_next_id = [0]  # mutable for closure

def customInterval(fn, delay, period):
    """
    Schedules fn to be called at times: delay, delay + period, delay + 2*period, ...
    Returns a unique id for later cancellation.
    """
    _next_id[0] += 1
    id_ = _next_id[0]
    _interval_map[id_] = {'cancel': False}
    count = [0]  # use list for mutable counter
    
    def schedule_next():
        if _interval_map[id_]['cancel']:
            return
        t = threading.Timer(delay/1000 + period/1000 * count[0], run_once)
        _interval_map[id_]['timer'] = t
        t.start()

    def run_once():
        if _interval_map[id_]['cancel']:
            return
        fn()
        count[0] += 1
        # Now schedule the next run with next period
        t = threading.Timer(period/1000, run_once)
        _interval_map[id_]['timer'] = t
        t.start()
    
    # Initial schedule
    t = threading.Timer(delay/1000, run_once)
    _interval_map[id_]['timer'] = t
    t.start()
    return id_

def customClearInterval(id_):
    """
    Cancels interval scheduled with given id.
    """
    info = _interval_map.get(id_)
    if info:
        info['cancel'] = True
        timer = info.get('timer')
        if timer:
            timer.cancel()
        del _interval_map[id_]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(1) per function call for scheduling, O(1) for cancellation.  
  The actual function `fn` is called as scheduled; cost depends on what `fn` does.

- **Space Complexity:**  
  O(1) per active interval (each interval uses a small record in the global dict). Space grows linearly with the number of live intervals.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you ensure no memory leaks when customClearInterval is never called?  
  *Hint: Use weak references or remove map entry upon natural completion.*

- How would you support intervals in a single-threaded environment (like browsers) instead of threads?  
  *Hint: Use setTimeout recursively, not setInterval; schedule with dynamic delay.*

- How do you handle `fn` taking longer than the interval?  
  *Hint: Schedule each next firing after prior run, so no overlap, and delay is always based on end of execution.*

### Summary
This problem is a great example of **simulating variable-delay scheduling** by chaining recursive timeouts and storing interval handles for cancellation, similar to emulating setInterval with dynamic timing. It's a basic yet foundational concurrency and scheduling pattern common in timers, throttlers, debouncers, and periodic pollers. You may encounter this pattern in any async task scheduling, custom rate limiters, or animation loops where delay is not fixed.