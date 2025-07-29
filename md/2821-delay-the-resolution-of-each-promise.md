### Leetcode 2821 (Medium): Delay the Resolution of Each Promise [Practice](https://leetcode.com/problems/delay-the-resolution-of-each-promise)

### Description  
Given an array of functions, where each function returns a promise when called, and an integer `ms` (milliseconds), return a new array of functions. When any function from this new array is called, it should wait an **extra `ms` milliseconds** before resolving or rejecting—regardless of how soon the original promise settles.  
The delayed function should preserve the same resolution/rejection and value/error as the original.  
Return the new array of delayed functions.

### Examples  

**Example 1:**  
Input: `functions = [() => Promise.resolve(5)]`, `ms = 100`  
Output: `[delayedFunction]`  
*Explanation: Calling `delayedFunction()` will return a promise that will resolve with value `5` after at least 100 ms.*

**Example 2:**  
Input: `functions = [() => Promise.reject("err")]`, `ms = 50`  
Output: `[delayedFunction]`  
*Explanation: Calling `delayedFunction()` will return a promise that will reject with "err" after at least 50 ms.*

**Example 3:**  
Input: `functions = [() => new Promise(resolve => setTimeout(() => resolve(10), 30))]`, `ms = 50`  
Output: `[delayedFunction]`  
*Explanation: Calling `delayedFunction()` will resolve with value `10` after about 80 ms (30 ms for original promise, plus 50 ms extra delay).*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to wrap every original function with a new function that:
    - Runs the original and waits for it to finish.
    - Regardless of resolve or reject, waits another `ms` ms before finally settling.
- This means handling both resolve and reject cases identically.
- We can create a helper `delay` function that returns a promise resolving after `ms` ms.
- For each original function, create a new async function that:
    - Waits for the original promise to settle (using `.then/.catch` or async/await + try/catch).
    - Waits an additional `ms` ms (with our delay helper).
    - Then resolves/rejects with the correct value/error.
- This makes sure the delay applies after the original promise has completed, and does not impact order.
- There are no dependencies between the delayed functions; each is independent.

### Corner cases to consider  
- Input array is empty.  
- Functions that throw synchronously instead of returning a promise.  
- Functions that return promises that already resolve immediately.  
- Both resolved and rejected original promises.  
- Functions whose returned promises take longer or shorter than `ms`.  
- One element case (only one function).

### Solution

```python
from typing import List, Callable
import asyncio

def delayAll(functions: List[Callable[[], 'asyncio.Future']], ms: int) -> List[Callable[[], 'asyncio.Future']]:
    # Helper coroutine to perform a delay
    async def delay(ms: int):
        await asyncio.sleep(ms / 1000)

    delayed_functions = []

    for fn in functions:
        async def delayed_fn(fn=fn):  # capture fn with default argument
            try:
                # Await the original promise (function)
                result = await fn()
            except Exception as err:
                # Wait the extra delay and re-raise error
                await delay(ms)
                raise err
            # Wait the extra delay and resolve normally
            await delay(ms)
            return result
        delayed_functions.append(delayed_fn)

    return delayed_functions
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for wrapping each function, where n is the number of functions.  
  Each delayed function, when called, adds a constant-time wrapper and the underlying original promise execution (unchanged).

- **Space Complexity:** O(n) for constructing the new array of functions. No extra data proportional to input size besides this.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to stagger the calls so that each delayed function only begins after the previous one resolves?
  *Hint: Consider passing a shared Promise that each function can await; or chaining them together.*

- Can you implement this for synchronous (non-promise) functions too?
  *Hint: Wrap them in a `Promise.resolve(fn())` or in a coroutine, so the delay can still be chained.*

- How would you unit-test this logic?  
  *Hint: Mock time using fake timers, or use precise timing assertions with the event loop.*

### Summary
This problem uses the "wrapper/higher-order function" coding pattern: return a new function that augments the behavior of an existing one.  
Here, the extra logic is simply to enforce a minimum settlement delay. The pattern is common for timeouts, retry logic, debouncing, and similar controls, in both synchronous and asynchronous settings.  
It's a foundational technique in both functional programming and concurrency control.