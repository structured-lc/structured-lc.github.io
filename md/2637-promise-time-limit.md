### Leetcode 2637 (Medium): Promise Time Limit [Practice](https://leetcode.com/problems/promise-time-limit)

### Description  
Implement a **wrapper** for an asynchronous function so it enforces a timeout.  
You’re given an async function `fn` (could take any arguments), and an integer `t` (milliseconds).  
Return a new function that, when called, runs `fn`.  
- If `fn(...args)` resolves or rejects within `t` ms, return the result or error as normal.  
- If `fn(...args)` does **not** settle within `t` ms, **reject** with `"Time Limit Exceeded"` (as a string—not an Error object).  
It should behave identically to the original unless it takes too long.

### Examples  

**Example 1:**  
Input: `fn = async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; }`, `inputs=[5]`, `t=50`  
Output: `{"rejected":"Time Limit Exceeded", "time":50}`  
Explanation.  
- The function waits 100ms before returning 25 (5\*5).
- Since the allowed time (`t=50`) is less than 100ms, the wrapper rejects after 50ms with `"Time Limit Exceeded"`.  

**Example 2:**  
Input: `fn = async (n) => { await new Promise(res => setTimeout(res, 100)); return n * n; }`, `inputs=[5]`, `t=150`  
Output: `{"resolved":25, "time":100}`  
Explanation.  
- Function takes 100ms to return 25.  
- Allocated time is 150ms.  
- The wrapper lets the original function resolve, returning 25 after 100ms.

**Example 3:**  
Input: `fn = async () => { throw "Oops" }`, `inputs=[]`, `t=1000`  
Output: `{"rejected":"Oops", "time":0}`  
Explanation.  
- Function immediately rejects with "Oops".
- Wrapper passes the rejection as is (no time limit reached).

### Thought Process (as if you’re the interviewee)  
- The brute-force solution:  
  Manually manage a flag to know if the original promise resolves in time, and use setTimeout for the deadline.  
  But this gets messy for cancellation and overlapping async results.

- Cleaner approach:  
  Race the original promise against a timeout promise.  
  - Create a promise that rejects with `"Time Limit Exceeded"` after `t` ms.
  - Use `Promise.race()` to settle on whichever finishes first (result, exception, or timeout).
  - The trade-off: Even if timeout triggers, the original function *might* still run in the background if not cancellable—but we don’t care for this problem.

- Why this is optimal:  
  - `Promise.race()` is the cleanest and safest concurrency control for timeouts in JavaScript/TypeScript.  
  - No side effects, just returns the first result.

### Corner cases to consider  
- Function that resolves **exactly at** `t` ms: (should count as "within" time, so must be careful with strict `<`/`≤` logic)
- Function that throws immediately/rejects.
- Time limit is **0** ms (always immediately timeout unless fn is synchronous + resolves before timeout triggers).
- `fn` takes no arguments.
- Multiple quick consecutive calls (ensure they don’t interfere).
- `fn` is not asynchronous but returns a value (should be wrapped as a resolved promise).

### Solution

```python
def timeLimit(fn, t):
    """
    Wraps async function 'fn' so it will reject with 'Time Limit Exceeded'
    if not settled in t ms.
    """
    import asyncio

    async def wrapper(*args, **kwargs):
        # Promise that rejects with "Time Limit Exceeded" after t ms
        async def timeout():
            await asyncio.sleep(t / 1000)
            raise Exception("Time Limit Exceeded")

        # Run fn and timeout concurrently
        try:
            # asyncio.wait returns when the FIRST finishes (like Promise.race)
            done, pending = await asyncio.wait(
                [fn(*args, **kwargs), timeout()],
                return_when=asyncio.FIRST_COMPLETED
            )
            # Get the result -- either fn finishes or timeout triggers
            result_task = done.pop()
            return await result_task
        except Exception as e:
            # Propagate the rejection (time limit or function error)
            raise e

    return wrapper
```

> In JavaScript (the most common interview language for this problem), the solution is:
>
> ```javascript
> var timeLimit = function(fn, t) {
>   return async function(...args) {
>     // Timeout Promise that rejects after t ms
>     const timeout = new Promise((_, reject) =>
>       setTimeout(() => reject("Time Limit Exceeded"), t)
>     );
>     // Run both and return whichever settles first
>     return Promise.race([ fn(...args), timeout ]);
>   }
> }
> ```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) overhead from the wrapper logic. Actual runtime equals the shorter of `fn(...args)` run time or `t` ms. The main cost is in the original function.
- **Space Complexity:** O(1) extra — a timeout promise and function call stack are constant; no significant data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you cancel or abort the original function after timing out?  
  *Hint: Use AbortController or signal-aware APIs where possible.*
  
- How would this behave if the original function is synchronous?  
  *Hint: All synchronous errors or results will resolve/reject before the timeout promise fires.*

- What if `fn` returns a rejected promise?  
  *Hint: The wrapper should not convert errors—pass them as is, unless it was a timeout.*

### Summary
This problem is a classic example of controlling asynchronous execution and enforcing deadlines using **Promise.race (or asyncio.wait in Python)**.  
The pattern appears frequently in **timeouts, debouncing, throttling, and resilience patterns** in modern async/server code.  
It teaches clean async composition, edge cases, and explains when and how to enforce time limits.